// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { ArrowRight, BookOpen, TrendingUp, Users, Target } from "lucide-react";

// const Index = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       if (session) {
//         navigate("/dashboard");
//       }
//     });
//   }, [navigate]);

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Hero Section */}
//       <section className="container mx-auto px-4 py-20 text-center">
//         <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
//           NSQF Voyage
//         </h1>
//         <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
//           Your personalized career navigator powered by AI. Discover courses, build your roadmap, and achieve your career goals.
//         </p>
//         <div className="flex gap-4 justify-center">
//           <Button size="lg" onClick={() => navigate("/auth")}>
//             Get Started
//             <ArrowRight className="ml-2 h-5 w-5" />
//           </Button>
//           <Button size="lg" variant="outline" onClick={() => navigate("/explore")}>
//             Explore Courses
//           </Button>
//         </div>
//       </section>

//       {/* Features */}
//       <section className="container mx-auto px-4 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <Card>
//             <CardHeader>
//               <BookOpen className="h-12 w-12 text-primary mb-4" />
//               <CardTitle>NSQF-Aligned Courses</CardTitle>
//               <CardDescription>
//                 Browse courses aligned with National Skills Qualifications Framework levels
//               </CardDescription>
//             </CardHeader>
//           </Card>

//           <Card>
//             <CardHeader>
//               <Target className="h-12 w-12 text-primary mb-4" />
//               <CardTitle>AI-Powered Recommendations</CardTitle>
//               <CardDescription>
//                 Get personalized course recommendations based on your profile and goals
//               </CardDescription>
//             </CardHeader>
//           </Card>

//           <Card>
//             <CardHeader>
//               <TrendingUp className="h-12 w-12 text-primary mb-4" />
//               <CardTitle>Career Roadmap</CardTitle>
//               <CardDescription>
//                 Follow a step-by-step roadmap from your current level to your dream career
//               </CardDescription>
//             </CardHeader>
//           </Card>

//           <Card>
//             <CardHeader>
//               <Users className="h-12 w-12 text-primary mb-4" />
//               <CardTitle>Inclusive Design</CardTitle>
//               <CardDescription>
//                 Multilingual support and accessible features for all learners
//               </CardDescription>
//             </CardHeader>
//           </Card>
//         </div>
//       </section>

//       {/* Sectors */}
//       <section className="container mx-auto px-4 py-16">
//         <h2 className="text-3xl font-bold text-center mb-12">Explore Career Sectors</h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//           {["IT", "Healthcare", "Manufacturing", "Hospitality", "Retail"].map((sector) => (
//             <Card key={sector} className="text-center cursor-pointer hover:bg-accent transition-colors">
//               <CardContent className="p-6">
//                 <p className="font-semibold">{sector}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="container mx-auto px-4 py-20 text-center">
//         <Card className="max-w-3xl mx-auto bg-primary text-primary-foreground">
//           <CardHeader>
//             <CardTitle className="text-3xl mb-4">Ready to Start Your Journey?</CardTitle>
//             <CardDescription className="text-primary-foreground/90 text-lg">
//               Join NSQF Voyage today and take the first step towards your dream career
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Button size="lg" variant="secondary" onClick={() => navigate("/auth")}>
//               Sign Up Now
//               <ArrowRight className="ml-2 h-5 w-5" />
//             </Button>
//           </CardContent>
//         </Card>
//       </section>

//       {/* Footer */}
//       <footer className="border-t py-8">
//         <div className="container mx-auto px-4 text-center text-muted-foreground">
//           <p>&copy; 2025 NSQF Voyage. Empowering learners nationwide.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Index;

import { useEffect } from "react";
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
import { ArrowRight, BookOpen, TrendingUp, Users, Target } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#1e1e2f] text-gray-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
          NSQF Voyage
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Your personalized career navigator powered by AI. Discover courses,
          build your roadmap, and achieve your career goals.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="bg-yellow-500 text-black hover:bg-yellow-400"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-gray-600 text-gray-100 hover:bg-gray-700 bg-[#1e1e2f]"
            onClick={() => navigate("/explore")}
          >
            Explore Courses
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-[#2a2a3c] border border-gray-700 text-gray-100">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-blue-400 mb-4" />
              <CardTitle>NSQF-Aligned Courses</CardTitle>
              <CardDescription>
                Browse courses aligned with National Skills Qualifications
                Framework levels
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-[#2a2a3c] border border-gray-700 text-gray-100">
            <CardHeader>
              <Target className="h-12 w-12 text-blue-400 mb-4" />
              <CardTitle>AI-Powered Recommendations</CardTitle>
              <CardDescription>
                Get personalized course recommendations based on your profile
                and goals
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-[#2a2a3c] border border-gray-700 text-gray-100">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-blue-400 mb-4" />
              <CardTitle>Career Roadmap</CardTitle>
              <CardDescription>
                Follow a step-by-step roadmap from your current level to your
                dream career
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-[#2a2a3c] border border-gray-700 text-gray-100">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-400 mb-4" />
              <CardTitle>Inclusive Design</CardTitle>
              <CardDescription>
                Multilingual support and accessible features for all learners
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Sectors */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-100">
          Explore Career Sectors
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {["IT", "Healthcare", "Manufacturing", "Hospitality", "Retail"].map(
            (sector) => (
              <Card
                key={sector}
                className="text-center cursor-pointer hover:bg-gray-700 transition-colors bg-[#2a2a3c] border border-gray-700 text-gray-100"
              >
                <CardContent className="p-6">
                  <p className="font-semibold">{sector}</p>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Card className="max-w-3xl mx-auto bg-blue-950 text-white">
          <CardHeader>
            <CardTitle className="text-3xl mb-4">
              Ready to Start Your Journey?
            </CardTitle>
            <CardDescription className="text-white/90 text-lg">
              Join NSQF Voyage today and take the first step towards your dream
              career
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              size="lg"
              variant="secondary"
              className="bg-yellow-500 text-black hover:bg-yellow-400"
              onClick={() => navigate("/auth")}
            >
              Sign Up Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2025 NSQF Voyage. Empowering learners nationwide.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
