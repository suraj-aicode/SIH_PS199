import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId } = await req.json();

    if (!userId) {
      throw new Error("User ID is required");
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get user profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    // Get user's top recommendations
    const { data: recommendations } = await supabase
      .from("recommendations")
      .select(`
        *,
        courses (*)
      `)
      .eq("user_id", userId)
      .order("recommendation_score", { ascending: false })
      .limit(3);

    // Use Lovable AI to generate roadmap
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    const aiPrompt = `Create a career roadmap with 4-6 steps for this learner.

Learner Profile:
- Education: ${profile?.education_level || "Not specified"}
- Career Goals: ${profile?.career_aspirations || "Not specified"}
- Top Recommended Courses: ${recommendations?.map(r => r.courses.title).join(", ")}

Create a progressive roadmap from their current level to their career goal. Each step should include:
1. Step number (1-6)
2. Title
3. Description
4. Duration estimate (e.g., "3-6 months")
5. Course ID (if applicable, from the recommended courses)

Format as JSON array: [{"step": 1, "title": "...", "description": "...", "duration": "...", "courseId": "..."}]`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: aiPrompt }],
      }),
    });

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices[0].message.content;
    
    // Parse AI response
    let roadmapSteps: any[] = [];
    try {
      const jsonMatch = aiContent.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        roadmapSteps = JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      // Fallback: create basic roadmap
      roadmapSteps = [
        {
          step: 1,
          title: "Foundation Skills",
          description: "Build your foundational knowledge and skills",
          duration: "3-6 months",
          courseId: recommendations?.[0]?.course_id,
        },
        {
          step: 2,
          title: "Intermediate Training",
          description: "Advance your expertise with specialized training",
          duration: "6-12 months",
          courseId: recommendations?.[1]?.course_id,
        },
        {
          step: 3,
          title: "Advanced Certification",
          description: "Obtain advanced certifications",
          duration: "6-12 months",
          courseId: recommendations?.[2]?.course_id,
        },
        {
          step: 4,
          title: "Practical Experience",
          description: "Gain hands-on experience through internships or projects",
          duration: "6-12 months",
        },
        {
          step: 5,
          title: "Career Launch",
          description: "Apply for entry-level positions in your field",
          duration: "Ongoing",
        },
      ];
    }

    // Delete old roadmap
    await supabase
      .from("career_roadmap")
      .delete()
      .eq("user_id", userId);

    // Insert new roadmap
    const roadmapToInsert = roadmapSteps.map((step: any) => ({
      user_id: userId,
      step_number: step.step,
      title: step.title,
      description: step.description,
      duration_estimate: step.duration,
      course_id: step.courseId || null,
    }));

    await supabase
      .from("career_roadmap")
      .insert(roadmapToInsert);

    // Fetch full roadmap with course details
    const { data: fullRoadmap } = await supabase
      .from("career_roadmap")
      .select(`
        *,
        courses (*)
      `)
      .eq("user_id", userId)
      .order("step_number");

    return new Response(
      JSON.stringify({ roadmap: fullRoadmap }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
