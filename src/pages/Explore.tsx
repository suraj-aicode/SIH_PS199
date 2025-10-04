// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Card } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
// import { Search, ArrowLeft } from "lucide-react";
// import LanguageToggle from "@/components/LanguageToggle";
// import CourseCard from "@/components/CourseCard";

// const Explore = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [courses, setCourses] = useState<any[]>([]);
//   const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedSector, setSelectedSector] = useState<string>("all");
//   const [selectedLevel, setSelectedLevel] = useState<string>("all");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadCourses();
//   }, []);

//   useEffect(() => {
//     filterCourses();
//   }, [searchQuery, selectedSector, selectedLevel, courses]);

//   const loadCourses = async () => {
//     const { data, error } = await supabase
//       .from("courses")
//       .select("*")
//       .order("market_demand_score", { ascending: false });

//     if (error) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     } else {
//       setCourses(data || []);
//       setFilteredCourses(data || []);
//     }

//     setLoading(false);
//   };

//   const filterCourses = () => {
//     let filtered = [...courses];

//     if (searchQuery) {
//       filtered = filtered.filter(course =>
//         course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         course.description?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (selectedSector !== "all") {
//       filtered = filtered.filter(course => course.sector === selectedSector);
//     }

//     if (selectedLevel !== "all") {
//       filtered = filtered.filter(course => course.nsqf_level === selectedLevel);
//     }

//     setFilteredCourses(filtered);
//   };

//   const handleEnroll = async (courseId: string) => {
//     const { data: { session } } = await supabase.auth.getSession();
//     if (!session) {
//       navigate("/auth");
//       return;
//     }

//     const { error } = await supabase
//       .from("learner_progress")
//       .insert({
//         user_id: session.user.id,
//         course_id: courseId,
//         status: "in_progress",
//         started_at: new Date().toISOString(),
//       });

//     if (error) {
//       if (error.code === "23505") {
//         toast({
//           title: "Already Enrolled",
//           description: "You're already enrolled in this course.",
//         });
//       } else {
//         toast({
//           title: "Error",
//           description: error.message,
//           variant: "destructive",
//         });
//       }
//     } else {
//       toast({
//         title: "Enrolled!",
//         description: "You've been enrolled in this course.",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <header className="border-b bg-card">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
//               <ArrowLeft className="h-5 w-5" />
//             </Button>
//             <h1 className="text-2xl font-bold">Explore Courses</h1>
//           </div>
//           <LanguageToggle />
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         {/* Filters */}
//         <Card className="p-4 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search courses..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10"
//               />
//             </div>

//             <Select value={selectedSector} onValueChange={setSelectedSector}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Filter by sector" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Sectors</SelectItem>
//                 <SelectItem value="it">IT</SelectItem>
//                 <SelectItem value="healthcare">Healthcare</SelectItem>
//                 <SelectItem value="manufacturing">Manufacturing</SelectItem>
//                 <SelectItem value="agriculture">Agriculture</SelectItem>
//                 <SelectItem value="retail">Retail</SelectItem>
//                 <SelectItem value="hospitality">Hospitality</SelectItem>
//                 <SelectItem value="construction">Construction</SelectItem>
//                 <SelectItem value="education">Education</SelectItem>
//                 <SelectItem value="finance">Finance</SelectItem>
//                 <SelectItem value="other">Other</SelectItem>
//               </SelectContent>
//             </Select>

//             <Select value={selectedLevel} onValueChange={setSelectedLevel}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Filter by NSQF level" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Levels</SelectItem>
//                 <SelectItem value="level_1">Level 1</SelectItem>
//                 <SelectItem value="level_2">Level 2</SelectItem>
//                 <SelectItem value="level_3">Level 3</SelectItem>
//                 <SelectItem value="level_4">Level 4</SelectItem>
//                 <SelectItem value="level_5">Level 5</SelectItem>
//                 <SelectItem value="level_6">Level 6</SelectItem>
//                 <SelectItem value="level_7">Level 7</SelectItem>
//                 <SelectItem value="level_8">Level 8</SelectItem>
//                 <SelectItem value="level_9">Level 9</SelectItem>
//                 <SelectItem value="level_10">Level 10</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </Card>

//         {/* Results */}
//         {loading ? (
//           <p className="text-center text-muted-foreground">Loading courses...</p>
//         ) : filteredCourses.length === 0 ? (
//           <p className="text-center text-muted-foreground">No courses found matching your filters.</p>
//         ) : (
//           <>
//             <p className="text-sm text-muted-foreground mb-4">
//               Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""}
//             </p>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredCourses.map((course) => (
//                 <CourseCard
//                   key={course.id}
//                   course={course}
//                   onEnroll={handleEnroll}
//                 />
//               ))}
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Explore;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Search, ArrowLeft } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";
import CourseCard from "@/components/CourseCard";

const Explore = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [courses, setCourses] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [searchQuery, selectedSector, selectedLevel, courses]);

  const loadCourses = async () => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("market_demand_score", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setCourses(data || []);
      setFilteredCourses(data || []);
    }

    setLoading(false);
  };

  const filterCourses = () => {
    let filtered = [...courses];

    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSector !== "all") {
      filtered = filtered.filter((course) => course.sector === selectedSector);
    }

    if (selectedLevel !== "all") {
      filtered = filtered.filter(
        (course) => course.nsqf_level === selectedLevel
      );
    }

    setFilteredCourses(filtered);
  };

  const handleEnroll = async (courseId: string) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }

    const { error } = await supabase.from("learner_progress").insert({
      user_id: session.user.id,
      course_id: courseId,
      status: "in_progress",
      started_at: new Date().toISOString(),
    });

    if (error) {
      if (error.code === "23505") {
        toast({
          title: "Already Enrolled",
          description: "You're already enrolled in this course.",
        });
      } else {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Enrolled!",
        description: "You've been enrolled in this course.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] text-gray-100">
      <header className="border-b border-gray-700 bg-[#1f2937]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              className="bg-[#111827] hover:bg-[#272e3b] hover:scale-105 transition-all"
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="h-5 w-5 text-gray-100 hover:scale-105 transition-all " />
            </Button>
            <h1 className="text-2xl font-bold">Explore Courses</h1>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="p-4 mb-8 bg-[#1f2937] text-gray-100 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#111827] text-gray-100 placeholder-gray-400 border border-gray-600"
              />
            </div>

            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="bg-[#111827] text-gray-100 border border-gray-600">
                <SelectValue placeholder="Filter by sector" />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a3c] text-gray-100">
                <SelectItem value="all">All Sectors</SelectItem>
                <SelectItem value="it">IT</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="agriculture">Agriculture</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="hospitality">Hospitality</SelectItem>
                <SelectItem value="construction">Construction</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="bg-[#111827] text-gray-100 border border-gray-600">
                <SelectValue placeholder="Filter by NSQF level" />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a3c] text-gray-100">
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="level_1">Level 1</SelectItem>
                <SelectItem value="level_2">Level 2</SelectItem>
                <SelectItem value="level_3">Level 3</SelectItem>
                <SelectItem value="level_4">Level 4</SelectItem>
                <SelectItem value="level_5">Level 5</SelectItem>
                <SelectItem value="level_6">Level 6</SelectItem>
                <SelectItem value="level_7">Level 7</SelectItem>
                <SelectItem value="level_8">Level 8</SelectItem>
                <SelectItem value="level_9">Level 9</SelectItem>
                <SelectItem value="level_10">Level 10</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Results */}
        {loading ? (
          <p className="text-center text-gray-400">Loading courses...</p>
        ) : filteredCourses.length === 0 ? (
          <p className="text-center text-gray-400">
            No courses found matching your filters.
          </p>
        ) : (
          <>
            <p className="text-sm text-gray-400 mb-4">
              Showing {filteredCourses.length} course
              {filteredCourses.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnroll={handleEnroll}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Explore;
