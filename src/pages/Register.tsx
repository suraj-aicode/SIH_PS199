// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";

// const Register = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [loading, setLoading] = useState(false);
//   const [userId, setUserId] = useState<string | null>(null);
  
//   const [formData, setFormData] = useState({
//     full_name: "",
//     age: "",
//     education_level: "",
//     location: "",
//     prior_skills: "",
//     certifications: "",
//     career_aspirations: "",
//     socio_economic_background: "",
//   });

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       if (!session) {
//         navigate("/auth");
//       } else {
//         setUserId(session.user.id);
//         // Check if profile already exists
//         supabase
//           .from("profiles")
//           .select("*")
//           .eq("id", session.user.id)
//           .single()
//           .then(({ data }) => {
//             if (data && data.education_level) {
//               navigate("/dashboard");
//             } else if (data) {
//               setFormData(prev => ({ ...prev, full_name: data.full_name || "" }));
//             }
//           });
//       }
//     });
//   }, [navigate]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!userId) return;
    
//     setLoading(true);

//     const { error } = await supabase
//       .from("profiles")
//       .update({
//         full_name: formData.full_name,
//         age: parseInt(formData.age) || null,
//         education_level: formData.education_level as any || null,
//         location: formData.location || null,
//         prior_skills: formData.prior_skills.split(",").map(s => s.trim()).filter(Boolean),
//         certifications: formData.certifications.split(",").map(s => s.trim()).filter(Boolean),
//         career_aspirations: formData.career_aspirations || null,
//         socio_economic_background: formData.socio_economic_background as any || null,
//       })
//       .eq("id", userId);

//     if (error) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     } else {
//       toast({
//         title: "Success",
//         description: "Profile completed successfully!",
//       });
//       navigate("/dashboard");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-background p-4 flex items-center justify-center">
//       <Card className="w-full max-w-2xl">
//         <CardHeader>
//           <CardTitle>Complete Your Profile</CardTitle>
//           <CardDescription>Help us understand your background and career goals</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="full_name">Full Name *</Label>
//               <Input
//                 id="full_name"
//                 value={formData.full_name}
//                 onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="age">Age</Label>
//                 <Input
//                   id="age"
//                   type="number"
//                   value={formData.age}
//                   onChange={(e) => setFormData({ ...formData, age: e.target.value })}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="education_level">Education Level</Label>
//                 <Select
//                   value={formData.education_level}
//                   onValueChange={(value) => setFormData({ ...formData, education_level: value })}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select level" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="below_10th">Below 10th</SelectItem>
//                     <SelectItem value="10th_pass">10th Pass</SelectItem>
//                     <SelectItem value="12th_pass">12th Pass</SelectItem>
//                     <SelectItem value="diploma">Diploma</SelectItem>
//                     <SelectItem value="graduate">Graduate</SelectItem>
//                     <SelectItem value="postgraduate">Postgraduate</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="location">Location</Label>
//               <Input
//                 id="location"
//                 value={formData.location}
//                 onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//                 placeholder="City, State"
//               />
//             </div>

//             <div>
//               <Label htmlFor="prior_skills">Prior Skills (comma separated)</Label>
//               <Input
//                 id="prior_skills"
//                 value={formData.prior_skills}
//                 onChange={(e) => setFormData({ ...formData, prior_skills: e.target.value })}
//                 placeholder="Programming, Communication, Problem Solving"
//               />
//             </div>

//             <div>
//               <Label htmlFor="certifications">Certifications (comma separated)</Label>
//               <Input
//                 id="certifications"
//                 value={formData.certifications}
//                 onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
//                 placeholder="Google Analytics, AWS Cloud Practitioner"
//               />
//             </div>

//             <div>
//               <Label htmlFor="career_aspirations">Career Aspirations</Label>
//               <Textarea
//                 id="career_aspirations"
//                 value={formData.career_aspirations}
//                 onChange={(e) => setFormData({ ...formData, career_aspirations: e.target.value })}
//                 placeholder="What are your career goals?"
//                 rows={3}
//               />
//             </div>

//             <div>
//               <Label htmlFor="socio_economic_background">Socio-Economic Background</Label>
//               <Select
//                 value={formData.socio_economic_background}
//                 onValueChange={(value) => setFormData({ ...formData, socio_economic_background: value })}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select background" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="low_income">Low Income</SelectItem>
//                   <SelectItem value="middle_income">Middle Income</SelectItem>
//                   <SelectItem value="high_income">High Income</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? "Saving..." : "Complete Profile"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Register;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";

// const Register = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [loading, setLoading] = useState(false);
//   const [userId, setUserId] = useState<string | null>(null);

//   const [formData, setFormData] = useState({
//     full_name: "",
//     age: "",
//     education_level: "",
//     location: "",
//     prior_skills: "",
//     certifications: "",
//     career_aspirations: "",
//     socio_economic_background: "",
//   });

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       if (!session) {
//         navigate("/auth");
//       } else {
//         setUserId(session.user.id);
//         supabase
//           .from("profiles")
//           .select("*")
//           .eq("id", session.user.id)
//           .single()
//           .then(({ data }) => {
//             if (data && data.education_level) {
//               navigate("/dashboard");
//             } else if (data) {
//               setFormData((prev) => ({
//                 ...prev,
//                 full_name: data.full_name || "",
//               }));
//             }
//           });
//       }
//     });
//   }, [navigate]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!userId) return;

//     setLoading(true);

//     const { error } = await supabase
//       .from("profiles")
//       .update({
//         full_name: formData.full_name,
//         age: parseInt(formData.age) || null,
//         education_level: (formData.education_level as any) || null,
//         location: formData.location || null,
//         prior_skills: formData.prior_skills
//           .split(",")
//           .map((s) => s.trim())
//           .filter(Boolean),
//         certifications: formData.certifications
//           .split(",")
//           .map((s) => s.trim())
//           .filter(Boolean),
//         career_aspirations: formData.career_aspirations || null,
//         socio_economic_background:
//           (formData.socio_economic_background as any) || null,
//       })
//       .eq("id", userId);

//     if (error) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     } else {
//       toast({
//         title: "Success",
//         description: "Profile completed successfully!",
//       });
//       navigate("/dashboard");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-[#111827] p-4 flex items-center justify-center">
//       <Card className="w-full max-w-2xl bg-[#1f2937] border border-gray-700 text-gray-100">
//         <CardHeader>
//           <CardTitle className="text-gray-100">Complete Your Profile</CardTitle>
//           <CardDescription className="text-gray-400">
//             Help us understand your background and career goals
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="full_name" className="text-gray-100">
//                 Full Name *
//               </Label>
//               <Input
//                 id="full_name"
//                 value={formData.full_name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, full_name: e.target.value })
//                 }
//                 required
//                 className="bg-[#111827] border border-gray-600 text-gray-100 placeholder-gray-400"
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="age" className="text-gray-100">
//                   Age
//                 </Label>
//                 <Input
//                   id="age"
//                   type="number"
//                   value={formData.age}
//                   onChange={(e) =>
//                     setFormData({ ...formData, age: e.target.value })
//                   }
//                   className="bg-[#111827] border border-gray-600 text-gray-100 placeholder-gray-400"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="education_level" className="text-gray-100">
//                   Education Level
//                 </Label>
//                 <Select
//                   value={formData.education_level}
//                   onValueChange={(value) =>
//                     setFormData({ ...formData, education_level: value })
//                   }
//                 >
//                   <SelectTrigger className="bg-[#111827] border border-gray-600 text-gray-100">
//                     <SelectValue placeholder="Select level" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-[#111827] text-gray-100">
//                     <SelectItem value="below_10th">Below 10th</SelectItem>
//                     <SelectItem value="10th_pass">10th Pass</SelectItem>
//                     <SelectItem value="12th_pass">12th Pass</SelectItem>
//                     <SelectItem value="diploma">Diploma</SelectItem>
//                     <SelectItem value="graduate">Graduate</SelectItem>
//                     <SelectItem value="postgraduate">Postgraduate</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="location" className="text-gray-100">
//                 Location
//               </Label>
//               <Input
//                 id="location"
//                 value={formData.location}
//                 onChange={(e) =>
//                   setFormData({ ...formData, location: e.target.value })
//                 }
//                 placeholder="City, State"
//                 className="bg-[#111827] border border-gray-600 text-gray-100 placeholder-gray-400"
//               />
//             </div>

//             <div>
//               <Label htmlFor="prior_skills" className="text-gray-100">
//                 Prior Skills (comma separated)
//               </Label>
//               <Input
//                 id="prior_skills"
//                 value={formData.prior_skills}
//                 onChange={(e) =>
//                   setFormData({ ...formData, prior_skills: e.target.value })
//                 }
//                 placeholder="Programming, Communication, Problem Solving"
//                 className="bg-[#111827] border border-gray-600 text-gray-100 placeholder-gray-400"
//               />
//             </div>

//             <div>
//               <Label htmlFor="certifications" className="text-gray-100">
//                 Certifications (comma separated)
//               </Label>
//               <Input
//                 id="certifications"
//                 value={formData.certifications}
//                 onChange={(e) =>
//                   setFormData({ ...formData, certifications: e.target.value })
//                 }
//                 placeholder="Google Analytics, AWS Cloud Practitioner"
//                 className="bg-[#111827] border border-gray-600 text-gray-100 placeholder-gray-400"
//               />
//             </div>

//             <div>
//               <Label htmlFor="career_aspirations" className="text-gray-100">
//                 Career Aspirations
//               </Label>
//               <Textarea
//                 id="career_aspirations"
//                 value={formData.career_aspirations}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     career_aspirations: e.target.value,
//                   })
//                 }
//                 placeholder="What are your career goals?"
//                 rows={3}
//                 className="bg-[#111827] border border-gray-600 text-gray-100 placeholder-gray-400"
//               />
//             </div>

//             <div>
//               <Label
//                 htmlFor="socio_economic_background"
//                 className="text-gray-100"
//               >
//                 Socio-Economic Background
//               </Label>
//               <Select
//                 value={formData.socio_economic_background}
//                 onValueChange={(value) =>
//                   setFormData({ ...formData, socio_economic_background: value })
//                 }
//               >
//                 <SelectTrigger className="bg-[#111827] border border-gray-600 text-gray-100">
//                   <SelectValue placeholder="Select background" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-[#111827] text-gray-100">
//                   <SelectItem value="low_income">Low Income</SelectItem>
//                   <SelectItem value="middle_income">Middle Income</SelectItem>
//                   <SelectItem value="high_income">High Income</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-yellow-500 text-black hover:bg-yellow-400"
//               disabled={loading}
//             >
//               {loading ? "Saving..." : "Complete Profile"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Register;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// ---- Animation library ----
import { motion } from "framer-motion"; // <---- Added

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    full_name: "",
    age: "",
    education_level: "",
    location: "",
    prior_skills: "",
    certifications: "",
    career_aspirations: "",
    socio_economic_background: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUserId(session.user.id);
        supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => {
            if (data && data.education_level) {
              navigate("/dashboard");
            } else if (data) {
              setFormData((prev) => ({
                ...prev,
                full_name: data.full_name || "",
              }));
            }
          });
      }
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name,
        age: parseInt(formData.age) || null,
        education_level: (formData.education_level as any) || null,
        location: formData.location || null,
        prior_skills: formData.prior_skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        certifications: formData.certifications
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        career_aspirations: formData.career_aspirations || null,
        socio_economic_background:
          (formData.socio_economic_background as any) || null,
      })
      .eq("id", userId);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Profile completed successfully!",
      });
      navigate("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#111827] p-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-[#1f2937] border border-gray-700 text-gray-100">
          <CardHeader>
            <CardTitle className="text-gray-100">
              Complete Your Profile
            </CardTitle>
            <CardDescription className="text-gray-400">
              Help us understand your background and career goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="full_name" className="text-gray-100">
                  Full Name *
                </Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                  required
                  className="bg-[#111827] border border-gray-600 text-gray-100 placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age" className="text-gray-100">
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    className="bg-[#111827] border border-gray-600 text-gray-100 placeholder-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="education_level" className="text-gray-100">
                    Education Level
                  </Label>
                  <Select
                    value={formData.education_level}
                    onValueChange={(value) =>
                      setFormData({ ...formData, education_level: value })
                    }
                  >
                    <SelectTrigger className="bg-[#111827] border border-gray-600 text-gray-100">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111827] text-gray-100">
                      <SelectItem value="below_10th">Below 10th</SelectItem>
                      <SelectItem value="10th_pass">10th Pass</SelectItem>
                      <SelectItem value="12th_pass">12th Pass</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                      <SelectItem value="postgraduate">Postgraduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="location" className="text-gray-100">
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="City, State"
                  className="bg-[#111827] border border-gray-600 text-gray-100 placeholder-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="prior_skills" className="text-gray-100">
                  Prior Skills (comma separated)
                </Label>
                <Input
                  id="prior_skills"
                  value={formData.prior_skills}
                  onChange={(e) =>
                    setFormData({ ...formData, prior_skills: e.target.value })
                  }
                  placeholder="Programming, Communication, Problem Solving"
                  className="bg-[#111827] border border-gray-600 text-gray-100 placeholder-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="certifications" className="text-gray-100">
                  Certifications (comma separated)
                </Label>
                <Input
                  id="certifications"
                  value={formData.certifications}
                  onChange={(e) =>
                    setFormData({ ...formData, certifications: e.target.value })
                  }
                  placeholder="Google Analytics, AWS Cloud Practitioner"
                  className="bg-[#111827] border border-gray-600 text-gray-100 placeholder-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="career_aspirations" className="text-gray-100">
                  Career Aspirations
                </Label>
                <Textarea
                  id="career_aspirations"
                  value={formData.career_aspirations}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      career_aspirations: e.target.value,
                    })
                  }
                  placeholder="What are your career goals?"
                  rows={3}
                  className="bg-[#111827] border border-gray-600 text-gray-100 placeholder-gray-400"
                />
              </div>

              <div>
                <Label
                  htmlFor="socio_economic_background"
                  className="text-gray-100"
                >
                  Socio-Economic Background
                </Label>
                <Select
                  value={formData.socio_economic_background}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      socio_economic_background: value,
                    })
                  }
                >
                  <SelectTrigger className="bg-[#111827] border border-gray-600 text-gray-100">
                    <SelectValue placeholder="Select background" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111827] text-gray-100">
                    <SelectItem value="low_income">Low Income</SelectItem>
                    <SelectItem value="middle_income">Middle Income</SelectItem>
                    <SelectItem value="high_income">High Income</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Animated button with scale on hover/focus */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-yellow-500 text-black hover:bg-yellow-400 transition-transform"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Complete Profile"}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
