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
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError) throw profileError;

    // Get all courses
    const { data: courses, error: coursesError } = await supabase
      .from("courses")
      .select("*");

    if (coursesError) throw coursesError;

    // Use Lovable AI to generate recommendations
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    const aiPrompt = `You are a career counselor. Based on the learner's profile, recommend 3-5 courses from the available list.

Learner Profile:
- Education: ${profile.education_level || "Not specified"}
- Location: ${profile.location || "Not specified"}
- Skills: ${profile.prior_skills?.join(", ") || "None"}
- Certifications: ${profile.certifications?.join(", ") || "None"}
- Career Goals: ${profile.career_aspirations || "Not specified"}
- Background: ${profile.socio_economic_background || "Not specified"}

Available Courses: ${JSON.stringify(courses.map(c => ({
  id: c.id,
  title: c.title,
  sector: c.sector,
  nsqf_level: c.nsqf_level,
  prerequisites: c.prerequisites,
  job_roles: c.job_roles,
})))}

For each recommended course, provide:
1. Course ID
2. Match score (0-100)
3. Brief reason for recommendation

Format your response as JSON array: [{"courseId": "...", "score": 85, "reason": "..."}]`;

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
    let recommendations: any[] = [];
    try {
      const jsonMatch = aiContent.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        recommendations = JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      // Fallback: recommend high-demand courses
      recommendations = courses
        .sort((a: any, b: any) => b.market_demand_score - a.market_demand_score)
        .slice(0, 5)
        .map((c: any) => ({
          courseId: c.id,
          score: c.market_demand_score,
          reason: `High market demand in ${c.sector}`,
        }));
    }

    // Delete old recommendations
    await supabase
      .from("recommendations")
      .delete()
      .eq("user_id", userId);

    // Insert new recommendations
    const recsToInsert = recommendations.map((rec: any) => ({
      user_id: userId,
      course_id: rec.courseId,
      recommendation_score: rec.score,
      reason: rec.reason,
    }));

    await supabase
      .from("recommendations")
      .insert(recsToInsert);

    // Fetch full recommendations with course details
    const { data: fullRecs } = await supabase
      .from("recommendations")
      .select(`
        *,
        courses (*)
      `)
      .eq("user_id", userId);

    return new Response(
      JSON.stringify({ recommendations: fullRecs }),
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
