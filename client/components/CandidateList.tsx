import { Mail, Phone, ExternalLink, Send, CheckCircle, Clock, MoreVertical, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface Candidate {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  totalExperience: string;
  relevantExperience: string;
  status: "approved" | "reject" | "queue";
  avatar?: string;
}

const candidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    position: "Software Engineer",
    email: "sarahjohnson@gmail.com",
    phone: "123-456-789",
    totalExperience: "6 years",
    relevantExperience: "6 years",
    status: "approved",
  },
  {
    id: "2",
    name: "Michael Chen",
    position: "Frontend Developer",
    email: "michael.chen@gmail.com",
    phone: "123-456-790",
    totalExperience: "4 years",
    relevantExperience: "4 years",
    status: "queue",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    position: "UX Designer",
    email: "emily.rodriguez@gmail.com",
    phone: "123-456-791",
    totalExperience: "5 years",
    relevantExperience: "5 years",
    status: "reject",
  },
  {
    id: "4",
    name: "David Kim",
    position: "Backend Developer",
    email: "david.kim@gmail.com",
    phone: "123-456-792",
    totalExperience: "7 years",
    relevantExperience: "6 years",
    status: "approved",
  },
  {
    id: "5",
    name: "Lisa Wang",
    position: "Product Manager",
    email: "lisa.wang@gmail.com",
    phone: "123-456-793",
    totalExperience: "8 years",
    relevantExperience: "7 years",
    status: "review",
  },
];

function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "approved":
      return "default";
    case "pending":
      return "secondary";
    case "review":
      return "outline";
    default:
      return "secondary";
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "approved":
      return <CheckCircle className="w-3 h-3" />;
    case "pending":
      return <Clock className="w-3 h-3" />;
    case "review":
      return <Clock className="w-3 h-3" />;
    default:
      return <Clock className="w-3 h-3" />;
  }
}

export default function CandidateList() {
  return (
    <div className="space-y-4">
      {candidates.map((candidate) => (
        <Card key={candidate.id} className="hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-6">
            {/* Main Content Row */}
            <div className="flex items-center justify-between">
              {/* Left: Avatar + Basic Info */}
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary border border-primary/20">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-card-foreground">{candidate.name}</h3>
                    <Badge variant={getStatusVariant(candidate.status)} className="gap-1">
                      {getStatusIcon(candidate.status)}
                      {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{candidate.position}</p>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                <Button variant="default" size="sm" className="gap-1">
                  <ExternalLink className="w-3 h-3" />
                  Resume
                </Button>
                <Button variant="default" size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700">
                  <Send className="w-3 h-3" />
                  Message
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Bottom Row: Experience + Contact */}
            <div className="flex items-center justify-between">
              {/* Left: Experience */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Total Experience: {candidate.totalExperience}
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Relevant Experience: {candidate.relevantExperience}
                </span>
              </div>

              {/* Right: Contact */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-auto p-0 gap-1 hover:text-primary" 
                  title={candidate.email}
                >
                  <Mail className="w-3 h-3" />
                  <span className="hidden lg:inline">{candidate.name}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-auto p-0 gap-1 hover:text-primary"
                >
                  <Phone className="w-3 h-3" />
                  <span>{candidate.phone}</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
