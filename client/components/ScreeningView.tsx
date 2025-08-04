import {
  Mail,
  Phone,
  ExternalLink,
  Send,
  CheckCircle,
  Clock,
  X,
  Check,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface ScreeningCandidate {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  totalExperience: string;
  relevantExperience: string;
  status: "approved" | "reject" | "queue";
}

const screeningCandidates: ScreeningCandidate[] = [
  {
    id: "1",
    name: "Emily Rodriguez",
    position: "UX Designer",
    email: "Emily Rodriguez",
    phone: "123-456-791",
    totalExperience: "5 years",
    relevantExperience: "5 years",
    status: "reject",
  },
  {
    id: "2",
    name: "David Kim",
    position: "Backend Developer",
    email: "David Kim",
    phone: "123-456-792",
    totalExperience: "7 years",
    relevantExperience: "6 years",
    status: "approved",
  },
  {
    id: "3",
    name: "Lisa Wang",
    position: "Product Manager",
    email: "Lisa Wang",
    phone: "123-456-793",
    totalExperience: "8 years",
    relevantExperience: "7 years",
    status: "queue",
  },
];

function getStatusVariant(
  status: string,
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "approved":
      return "default";
    case "reject":
      return "destructive";
    case "queue":
      return "outline";
    default:
      return "secondary";
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "approved":
      return <CheckCircle className="w-3 h-3" />;
    case "reject":
      return <X className="w-3 h-3" />;
    case "queue":
      return <Clock className="w-3 h-3" />;
    default:
      return <Clock className="w-3 h-3" />;
  }
}

export default function ScreeningView() {
  const handleStatusChange = (
    candidateId: string,
    newStatus: "approved" | "reject" | "queue",
  ) => {
    console.log(`Changing candidate ${candidateId} status to ${newStatus}`);
    // Here you would implement the actual status change logic
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-600">
            {screeningCandidates.filter(c => c.status === "approved").length}
          </div>
          <div className="text-sm text-muted-foreground">Approved</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-red-600">
            {screeningCandidates.filter(c => c.status === "reject").length}
          </div>
          <div className="text-sm text-muted-foreground">Rejected</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {screeningCandidates.filter(c => c.status === "queue").length}
          </div>
          <div className="text-sm text-muted-foreground">In Queue</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-blue-600">
            {screeningCandidates.length}
          </div>
          <div className="text-sm text-muted-foreground">Total Candidates</div>
        </Card>
      </div>

      {/* Screening Candidates */}
      {screeningCandidates.map((candidate) => (
        <Card
          key={candidate.id}
          className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-transparent hover:border-l-primary/30"
        >
          <CardContent className="p-6">
            {/* Main Layout - Responsive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Section: Profile (Columns 1-4) */}
              <div className="lg:col-span-4 flex items-center gap-4">
                <Avatar className="h-14 w-14 flex-shrink-0 ring-2 ring-primary/10">
                  <AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/20 text-primary font-semibold text-base">
                    {candidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-foreground text-lg leading-tight truncate">
                      {candidate.name}
                    </h3>
                    <Badge
                      variant={getStatusVariant(candidate.status)}
                      className="gap-1 text-xs font-medium flex-shrink-0"
                    >
                      {getStatusIcon(candidate.status)}
                      {candidate.status.charAt(0).toUpperCase() +
                        candidate.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {candidate.position}
                  </p>
                </div>
              </div>

              {/* Middle Section: Experience Metrics (Columns 5-6) */}
              <div className="lg:col-span-2 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <div className="text-xs">
                    <div className="text-muted-foreground">
                      Total Experience
                    </div>
                    <div className="font-semibold text-foreground">
                      {candidate.totalExperience}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-purple-500 rounded-full flex-shrink-0"></div>
                  <div className="text-xs">
                    <div className="text-muted-foreground">
                      Relevant Experience
                    </div>
                    <div className="font-semibold text-foreground">
                      {candidate.relevantExperience}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Section (Columns 7-8) */}
              <div className="lg:col-span-2 space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0 text-primary/70" />
                  <span className="font-medium truncate">
                    {candidate.email}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone className="w-3.5 h-3.5 flex-shrink-0 text-primary/70" />
                  <span className="font-medium">{candidate.phone}</span>
                </div>
              </div>

              {/* Actions Section (Columns 9-12) */}
              <div className="lg:col-span-4 flex flex-wrap items-center gap-2 justify-end">
                {/* Status Action Buttons */}
                <div className="flex items-center gap-1.5">
                  <Button
                    variant={
                      candidate.status === "approved" ? "default" : "outline"
                    }
                    size="sm"
                    className="gap-1 text-xs font-medium h-8 px-3"
                    onClick={() => handleStatusChange(candidate.id, "approved")}
                  >
                    <Check className="w-3 h-3" />
                    Approve
                  </Button>
                  <Button
                    variant={
                      candidate.status === "queue" ? "secondary" : "outline"
                    }
                    size="sm"
                    className="gap-1 text-xs font-medium h-8 px-3"
                    onClick={() => handleStatusChange(candidate.id, "queue")}
                  >
                    <Timer className="w-3 h-3" />
                    Queue
                  </Button>
                  <Button
                    variant={
                      candidate.status === "reject" ? "destructive" : "outline"
                    }
                    size="sm"
                    className="gap-1 text-xs font-medium h-8 px-3"
                    onClick={() => handleStatusChange(candidate.id, "reject")}
                  >
                    <X className="w-3 h-3" />
                    Reject
                  </Button>
                </div>

                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* Primary Actions */}
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="default"
                    size="sm"
                    className="gap-1 text-white font-medium h-8 px-3"
                    style={{ backgroundColor: "#0065F8" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#0052C6")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#0065F8")
                    }
                  >
                    <ExternalLink className="w-3 h-3" />
                    Resume
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="gap-1 text-white font-medium h-8 px-3"
                    style={{ backgroundColor: "#0065F8" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#0052C6")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#0065F8")
                    }
                  >
                    <Send className="w-3 h-3" />
                    Message
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
