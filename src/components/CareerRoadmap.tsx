import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle } from "lucide-react";

interface RoadmapStep {
  id: string;
  step_number: number;
  title: string;
  description: string;
  duration_estimate: string;
  is_completed: boolean;
  courses?: any;
}

interface CareerRoadmapProps {
  steps: RoadmapStep[];
}

const CareerRoadmap = ({ steps }: CareerRoadmapProps) => {
  if (steps.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          Your personalized career roadmap will appear here once generated.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex gap-4">
            {/* Icon */}
            <div className="relative z-10 flex-shrink-0">
              {step.is_completed ? (
                <CheckCircle2 className="h-12 w-12 text-primary" />
              ) : (
                <Circle className="h-12 w-12 text-muted-foreground" />
              )}
            </div>

            {/* Content */}
            <Card className={`flex-grow ${step.is_completed ? "bg-accent/50" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      Step {step.step_number}
                    </Badge>
                    <h4 className="text-lg font-semibold">{step.title}</h4>
                  </div>
                  {step.duration_estimate && (
                    <Badge variant="secondary">{step.duration_estimate}</Badge>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {step.description}
                </p>

                {step.courses && (
                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium">
                      Recommended Course: {step.courses.title}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerRoadmap;
