// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useToast } from "@/hooks/use-toast";

// const Auth = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullName, setFullName] = useState("");

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       if (session) {
//         navigate("/dashboard");
//       }
//     });

//     const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
//       if (session) {
//         navigate("/dashboard");
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [navigate]);

//   const handleSignIn = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     } else {
//       toast({
//         title: "Success",
//         description: "Signed in successfully!",
//       });
//     }

//     setLoading(false);
//   };

//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const { error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: {
//           full_name: fullName,
//         },
//         emailRedirectTo: `${window.location.origin}/`,
//       },
//     });

//     if (error) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     } else {
//       toast({
//         title: "Success",
//         description: "Account created! Please complete your profile.",
//       });
//       navigate("/register");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle className="text-2xl">NSQF Voyage</CardTitle>
//           <CardDescription>Your career navigator</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Tabs defaultValue="signin">
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="signin">Sign In</TabsTrigger>
//               <TabsTrigger value="signup">Sign Up</TabsTrigger>
//             </TabsList>
            
//             <TabsContent value="signin">
//               <form onSubmit={handleSignIn} className="space-y-4">
//                 <div>
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="password">Password</Label>
//                   <Input
//                     id="password"
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <Button type="submit" className="w-full" disabled={loading}>
//                   {loading ? "Signing in..." : "Sign In"}
//                 </Button>
//               </form>
//             </TabsContent>
            
//             <TabsContent value="signup">
//               <form onSubmit={handleSignUp} className="space-y-4">
//                 <div>
//                   <Label htmlFor="fullname">Full Name</Label>
//                   <Input
//                     id="fullname"
//                     type="text"
//                     value={fullName}
//                     onChange={(e) => setFullName(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="signup-email">Email</Label>
//                   <Input
//                     id="signup-email"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="signup-password">Password</Label>
//                   <Input
//                     id="signup-password"
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     minLength={6}
//                   />
//                 </div>
//                 <Button type="submit" className="w-full" disabled={loading}>
//                   {loading ? "Creating account..." : "Sign Up"}
//                 </Button>
//               </form>
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Auth;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Signed in successfully!",
      });
    }

    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Account created! Please complete your profile.",
      });
      navigate("/register");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111827] p-4">
      <Card className="w-full max-w-md bg-[#1f2937] border border-gray-700 text-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-100">NSQF Voyage</CardTitle>
          <CardDescription className="text-gray-400">
            Your career navigator
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2 bg-[#111827] border-b border-gray-700 text-gray-100">
              <TabsTrigger value="signin" className="text-gray-100">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-gray-100">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-gray-100">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-[#111827] border border-gray-600 text-gray-100 placeholder-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-gray-100">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-[#111827] border border-gray-600 text-gray-100 placeholder-gray-400"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-yellow-500 text-black hover:bg-yellow-400"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <Label htmlFor="fullname" className="text-gray-100">
                    Full Name
                  </Label>
                  <Input
                    id="fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="bg-[#111827] border border-gray-600 text-gray-100 placeholder-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-email" className="text-gray-100">
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-[#111827] border border-gray-600 text-gray-100 placeholder-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-password" className="text-gray-100">
                    Password
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="bg-[#111827] border border-gray-600 text-gray-100 placeholder-gray-400"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-yellow-500 text-black hover:bg-yellow-400"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
