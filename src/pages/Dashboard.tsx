// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { useToast } from "@/hooks/use-toast";
// import { LogOut, BookOpen, TrendingUp, Award, Map } from "lucide-react";
// import LanguageToggle from "@/components/LanguageToggle";
// import CourseCard from "@/components/CourseCard";
// import CareerRoadmap from "@/components/CareerRoadmap";
// import Chatbot from "@/components/Chatbot";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState<any>(null);
//   const [recommendations, setRecommendations] = useState<any[]>([]);
//   const [progress, setProgress] = useState<any[]>([]);
//   const [roadmap, setRoadmap] = useState<any[]>([]);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     const { data: { session } } = await supabase.auth.getSession();
    
//     if (!session) {
//       navigate("/auth");
//       return;
//     }

//     // Load profile
//     const { data: profileData } = await supabase
//       .from("profiles")
//       .select("*")
//       .eq("id", session.user.id)
//       .single();

//     if (profileData && !profileData.education_level) {
//       navigate("/register");
//       return;
//     }

//     setProfile(profileData);

//     // Load recommendations with course details
//     const { data: recsData } = await supabase
//       .from("recommendations")
//       .select(`
//         *,
//         courses (*)
//       `)
//       .eq("user_id", session.user.id)
//       .order("recommendation_score", { ascending: false })
//       .limit(5);

//     setRecommendations(recsData || []);

//     // If no recommendations, generate them
//     if (!recsData || recsData.length === 0) {
//       await generateRecommendations(session.user.id);
//     }

//     // Load progress
//     const { data: progressData } = await supabase
//       .from("learner_progress")
//       .select(`
//         *,
//         courses (*)
//       `)
//       .eq("user_id", session.user.id);

//     setProgress(progressData || []);

//     // Load roadmap
//     const { data: roadmapData } = await supabase
//       .from("career_roadmap")
//       .select(`
//         *,
//         courses (*)
//       `)
//       .eq("user_id", session.user.id)
//       .order("step_number");

//     setRoadmap(roadmapData || []);

//     // If no roadmap, generate it
//     if (!roadmapData || roadmapData.length === 0) {
//       await generateRoadmap(session.user.id);
//     }

//     setLoading(false);
//   };

//   const generateRecommendations = async (userId: string) => {
//     try {
//       const { data, error } = await supabase.functions.invoke("generate-recommendations", {
//         body: { userId },
//       });

//       if (error) throw error;

//       if (data?.recommendations) {
//         setRecommendations(data.recommendations);
//         toast({
//           title: "Recommendations Generated",
//           description: "Your personalized course recommendations are ready!",
//         });
//       }
//     } catch (error) {
//       console.error("Error generating recommendations:", error);
//     }
//   };

//   const generateRoadmap = async (userId: string) => {
//     try {
//       const { data, error } = await supabase.functions.invoke("generate-roadmap", {
//         body: { userId },
//       });

//       if (error) throw error;

//       if (data?.roadmap) {
//         setRoadmap(data.roadmap);
//       }
//     } catch (error) {
//       console.error("Error generating roadmap:", error);
//     }
//   };

//   const handleSignOut = async () => {
//     await supabase.auth.signOut();
//     navigate("/auth");
//   };

//   const handleEnroll = async (courseId: string) => {
//     const { data: { session } } = await supabase.auth.getSession();
//     if (!session) return;

//     const { error } = await supabase
//       .from("learner_progress")
//       .insert({
//         user_id: session.user.id,
//         course_id: courseId,
//         status: "in_progress",
//         started_at: new Date().toISOString(),
//       });

//     if (error) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     } else {
//       toast({
//         title: "Enrolled!",
//         description: "You've been enrolled in this course.",
//       });
//       loadData();
//     }
//   };

//   // Loading DashBoard state

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <p className="text-muted-foreground">Loading your dashboard...</p>
//       </div>
//     );
//   }

//   const completedCourses = progress.filter(p => p.status === "completed").length;
//   const inProgressCourses = progress.filter(p => p.status === "in_progress").length;

//   return (
//     <div className="min-h-screen bg-[#dce0d9]">
//       <header className="border-b bg-[#6798c0]">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold">NSQF Voyage</h1>
//           <div className="flex items-center gap-4 ">
//             <LanguageToggle />
//             <Button
//               className="bg-[#fdc921]"
//               variant="ghost"
//               onClick={() => navigate("/explore")}
//             >
//               <BookOpen className="mr-2 h-4 w-4 " />
//               Explore
//             </Button>
//             <Button
//               className="bg-[#fdc921]"
//               variant="ghost"
//               onClick={() => navigate("/register")}
//             >
//               Profile
//             </Button>
//             <Button
//               className="bg-[#fdc921] border-[#fdc921]"
//               variant="outline"
//               onClick={handleSignOut}
//             >
//               <LogOut className="mr-2 h-4 w-4" />
//               Sign Out
//             </Button>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold mb-2">
//             Welcome back, {profile?.full_name}!
//           </h2>
//           <p className="text-[#7f5539]">Continue your learning journey</p>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium">
//                 Completed Courses
//               </CardTitle>
//               <Award className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{completedCourses}</div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium">In Progress</CardTitle>
//               <TrendingUp className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{inProgressCourses}</div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium">
//                 Roadmap Steps
//               </CardTitle>
//               <Map className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{roadmap.length}</div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* In Progress Courses */}
//         {inProgressCourses > 0 && (
//           <section className="mb-8">
//             <h3 className="text-xl font-semibold mb-4">Continue Learning</h3>
//             <div className="space-y-4">
//               {progress
//                 .filter((p) => p.status === "in_progress")
//                 .map((item) => (
//                   <Card key={item.id}>
//                     <CardHeader>
//                       <CardTitle>{item.courses.title}</CardTitle>
//                       <CardDescription>
//                         {item.courses.description}
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="space-y-2">
//                         <div className="flex justify-between text-sm">
//                           <span>Progress</span>
//                           <span>{item.progress_percentage}%</span>
//                         </div>
//                         <Progress value={item.progress_percentage} />
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//             </div>
//           </section>
//         )}

//         {/* Recommendations */}
//         <section className="mb-8">
//           <h3 className="text-xl font-semibold mb-4">Recommended for You</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {recommendations.map((rec) => (
//               <CourseCard
//                 key={rec.id}
//                 course={rec.courses}
//                 onEnroll={handleEnroll}
//                 recommendationScore={rec.recommendation_score}
//                 reason={rec.reason}
//               />
//             ))}
//           </div>
//         </section>

//         {/* Career Roadmap */}
//         <section className="mb-8">
//           <h3 className="text-xl font-semibold mb-4">Your Career Roadmap</h3>
//           <CareerRoadmap steps={roadmap} />
//         </section>
//       </main>

//       <Chatbot />
//     </div>
//   );
// };

// export default Dashboard;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { LogOut, BookOpen, TrendingUp, Award, Map } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";
import CourseCard from "@/components/CourseCard";
import CareerRoadmap from "@/components/CareerRoadmap";
import Chatbot from "@/components/Chatbot";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [roadmap, setRoadmap] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      navigate("/auth");
      return;
    }

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (profileData && !profileData.education_level) {
      navigate("/register");
      return;
    }

    setProfile(profileData);

    const { data: recsData } = await supabase
      .from("recommendations")
      .select("*, courses (*)")
      .eq("user_id", session.user.id)
      .order("recommendation_score", { ascending: false })
      .limit(5);

    setRecommendations(recsData || []);

    if (!recsData || recsData.length === 0) {
      await generateRecommendations(session.user.id);
    }

    const { data: progressData } = await supabase
      .from("learner_progress")
      .select("*, courses (*)")
      .eq("user_id", session.user.id);

    setProgress(progressData || []);

    const { data: roadmapData } = await supabase
      .from("career_roadmap")
      .select("*, courses (*)")
      .eq("user_id", session.user.id)
      .order("step_number");

    setRoadmap(roadmapData || []);

    if (!roadmapData || roadmapData.length === 0) {
      await generateRoadmap(session.user.id);
    }

    setLoading(false);
  };

  const generateRecommendations = async (userId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke(
        "generate-recommendations",
        { body: { userId } }
      );
      if (error) throw error;
      if (data?.recommendations) {
        setRecommendations(data.recommendations);
        toast({
          title: "Recommendations Generated",
          description: "Your personalized course recommendations are ready!",
        });
      }
    } catch (error) {
      console.error("Error generating recommendations:", error);
    }
  };

  const generateRoadmap = async (userId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke(
        "generate-roadmap",
        { body: { userId } }
      );
      if (error) throw error;
      if (data?.roadmap) setRoadmap(data.roadmap);
    } catch (error) {
      console.error("Error generating roadmap:", error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleEnroll = async (courseId: string) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    const { error } = await supabase.from("learner_progress").insert({
      user_id: session.user.id,
      course_id: courseId,
      status: "in_progress",
      started_at: new Date().toISOString(),
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Enrolled!",
        description: "You've been enrolled in this course.",
      });
      loadData();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111827]">
        <p className="text-gray-400">Loading your dashboard...</p>
      </div>
    );
  }

  const completedCourses = progress.filter(
    (p) => p.status === "completed"
  ).length;
  const inProgressCourses = progress.filter(
    (p) => p.status === "in_progress"
  ).length;

  return (
    <div className="min-h-screen bg-[#111827] text-gray-100">
      <header className="border-b border-gray-700 bg-[#1f2937]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#60a5fa]">NSQF Voyage</h1>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <Button
              className="bg-[#2563eb] text-white hover:bg-[#1d4ed8] hover:scale-105 transition-all"
              variant="ghost"
              onClick={() => navigate("/explore")}
            >
              <BookOpen className="mr-2 h-4 w-4 " /> Explore
            </Button>
            <Button
              className="bg-[#2563eb] text-white hover:bg-[#1d4ed8] hover:scale-105 transition-all"
              variant="ghost"
              onClick={() => navigate("/register")}
            >
              Profile
            </Button>
            <Button
              className="bg-transparent border border-[#2563eb] text-[#60a5fa] hover:bg-[#1e3a8a] hover:scale-105 transition-all"
              variant="outline"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-100">
            Welcome back, {profile?.full_name}!
          </h2>
          <p className="text-gray-400">Continue your learning journey</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-[#1f2937] border border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-100">
                Completed Courses
              </CardTitle>
              <Award className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{completedCourses}</div>
            </CardContent>
          </Card>
          <Card className="bg-[#1f2937] border border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-100">
                In Progress
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{inProgressCourses}</div>
            </CardContent>
          </Card>
          <Card className="bg-[#1f2937] border border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-100">
                Roadmap Steps
              </CardTitle>
              <Map className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{roadmap.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* In Progress Courses */}
        {inProgressCourses > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-100">
              Continue Learning
            </h3>
            <div className="space-y-4">
              {progress
                .filter((p) => p.status === "in_progress")
                .map((item) => (
                  <Card
                    key={item.id}
                    className="bg-[#1f2937] border border-gray-700"
                  >
                    <CardHeader>
                      <CardTitle className="text-gray-100">
                        {item.courses.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {item.courses.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-300">
                          <span>Progress</span>
                          <span>{item.progress_percentage}%</span>
                        </div>
                        <Progress
                          value={item.progress_percentage}
                          className="bg-gray-600"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </section>
        )}

        {/* Recommendations */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-100">
            Recommended for You
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((rec) => (
              <CourseCard
                key={rec.id}
                course={rec.courses}
                onEnroll={handleEnroll}
                recommendationScore={rec.recommendation_score}
                reason={rec.reason}
              />
            ))}
          </div>
        </section>

        {/* Career Roadmap */}

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-100">
            Your Career Roadmap
          </h3>
          <CareerRoadmap steps={roadmap} />
        </section>
      </main>

      <Chatbot />
    </div>
  );
};

export default Dashboard;
