import { Mail, Phone, ExternalLink, Send, CheckCircle, Clock, X, Check, Timer } from "lucide-react";
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

function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
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
  const handleStatusChange = (candidateId: string, newStatus: "approved" | "reject" | "queue") => {
    console.log(`Changing candidate ${candidateId} status to ${newStatus}`);
    // Here you would implement the actual status change logic
  };

  return (
    <div className="space-y-4">
      {screeningCandidates.map((candidate) => (
        <Card key={candidate.id} className="hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-6">
            {/* Main Content Row */}
            <div className="flex items-center justify-between">
              {/* Left Section: Avatar + Info */}
              <div className="flex items-center gap-4 flex-1">
                <Avatar className="h-12 w-12 flex-shrink-0">
                  <AvatarFallback className="bg-gray-100 text-gray-600 font-medium">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  {/* Name and Status Row */}
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-card-foreground text-base leading-tight">
                      {candidate.name}
                    </h3>
                    <Badge variant={getStatusVariant(candidate.status)} className="gap-1 text-xs flex-shrink-0">
                      {getStatusIcon(candidate.status)}
                      {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                    </Badge>
                  </div>

                  {/* Position */}
                  <p className="text-sm text-muted-foreground mb-3 leading-tight">
                    {candidate.position}
                  </p>
                  
                  {/* Experience Metrics - Well organized in a row */}
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">
                        Total Experience: <span className="font-medium text-foreground">{candidate.totalExperience}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">
                        Relevant Experience: <span className="font-medium text-foreground">{candidate.relevantExperience}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section: Contact + Actions */}
              <div className="flex items-center gap-6 flex-shrink-0">
                {/* Contact Information - Properly aligned */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium">{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium">{candidate.phone}</span>
                  </div>
                </div>

                {/* Status Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button 
                    variant={candidate.status === "approved" ? "default" : "outline"}
                    size="sm" 
                    className="gap-1 text-xs font-medium"
                    onClick={() => handleStatusChange(candidate.id, "approved")}
                  >
                    <UserCheck className="w-3 h-3" />
                    Approve
                  </Button>
                  <Button 
                    variant={candidate.status === "queue" ? "outline" : "outline"}
                    size="sm" 
                    className="gap-1 text-xs font-medium"
                    onClick={() => handleStatusChange(candidate.id, "queue")}
                  >
                    <UserClock className="w-3 h-3" />
                    Queue
                  </Button>
                  <Button 
                    variant={candidate.status === "reject" ? "destructive" : "outline"}
                    size="sm" 
                    className="gap-1 text-xs font-medium"
                    onClick={() => handleStatusChange(candidate.id, "reject")}
                  >
                    <UserX className="w-3 h-3" />
                    Reject
                  </Button>
                </div>

                {/* Original Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Resume
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
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
