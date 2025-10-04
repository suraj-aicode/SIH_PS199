import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, Briefcase } from "lucide-react";

interface CourseCardProps {
  course: any;
  onEnroll: (courseId: string) => void;
  recommendationScore?: number;
  reason?: string;
}

const CourseCard = ({ course, onEnroll, recommendationScore, reason }: CourseCardProps) => {
  const formatNsqfLevel = (level: string) => {
    return level.replace("level_", "Level ");
  };

  const formatSector = (sector: string) => {
    return sector.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  return (
    <Card
      className="h-full flex flex-col bg-gradient-to-r from-blue-200 to-indigo-300
"
    >
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary">
            {formatNsqfLevel(course.nsqf_level)}
          </Badge>
          {course.market_demand_score >= 80 && (
            <Badge variant="default" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              High Demand
            </Badge>
          )}
        </div>
        <CardTitle className="line-clamp-2">{course.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {course.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Briefcase className="h-4 w-4" />
          <span>{formatSector(course.sector)}</span>
        </div>

        {course.duration_months && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{course.duration_months} months</span>
          </div>
        )}

        {course.job_roles && course.job_roles.length > 0 && (
          <div className="space-y-1">
            <p className="text-sm font-medium">Job Roles:</p>
            <div className="flex flex-wrap gap-1">
              {course.job_roles.slice(0, 3).map((role: string) => (
                <Badge key={role} variant="outline" className="text-xs">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {recommendationScore && (
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Match Score:</span>
              <span className="font-semibold text-primary">
                {recommendationScore}%
              </span>
            </div>
            {reason && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {reason}
              </p>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button className="w-full" onClick={() => onEnroll(course.id)}>
          Enroll Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
