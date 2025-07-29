import { Mail, Phone, ExternalLink, Send, CheckCircle, Clock, MoreVertical, X, MapPin, Calendar, FileText } from "lucide-react";
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
  companyLocation: string;
  appliedDate: string;
  applicationStart: string;
  applicationEnd: string;
  status: "approved" | "reject" | "queue";
  isSelected?: boolean;
  avatar?: string;
}

const candidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Jane",
    position: "Operation Associate",
    email: "sarahjohnson@gmail.com",
    phone: "123-456-789",
    companyLocation: "Hyderabad, India",
    appliedDate: "07-07-2025",
    applicationStart: "07-02-2025",
    applicationEnd: "07-10-2025",
    status: "approved",
    isSelected: false,
  },
  {
    id: "2",
    name: "Sarah Jane",
    position: "Operation Associate",
    email: "michael.chen@gmail.com",
    phone: "123-456-790",
    companyLocation: "Hyderabad, India",
    appliedDate: "07-07-2025",
    applicationStart: "07-02-2025",
    applicationEnd: "07-10-2025",
    status: "queue",
    isSelected: true,
  },
  {
    id: "3",
    name: "Sarah Jane",
    position: "Operation Associate",
    email: "emily.rodriguez@gmail.com",
    phone: "123-456-791",
    companyLocation: "Hyderabad, India",
    appliedDate: "07-07-2025",
    applicationStart: "07-02-2025",
    applicationEnd: "07-10-2025",
    status: "reject",
    isSelected: false,
  },
  {
    id: "4",
    name: "Sarah Jane",
    position: "Operation Associate",
    email: "david.kim@gmail.com",
    phone: "123-456-792",
    companyLocation: "Hyderabad, India",
    appliedDate: "07-07-2025",
    applicationStart: "07-02-2025",
    applicationEnd: "07-10-2025",
    status: "approved",
    isSelected: false,
  },
  {
    id: "5",
    name: "Sarah Jane",
    position: "Operation Associate",
    email: "lisa.wang@gmail.com",
    phone: "123-456-793",
    companyLocation: "Hyderabad, India",
    appliedDate: "07-07-2025",
    applicationStart: "07-02-2025",
    applicationEnd: "07-10-2025",
    status: "queue",
    isSelected: false,
  },
  {
    id: "6",
    name: "Sarah Jane",
    position: "Operation Associate",
    email: "jane.smith@gmail.com",
    phone: "123-456-794",
    companyLocation: "Hyderabad, India",
    appliedDate: "07-07-2025",
    applicationStart: "07-02-2025",
    applicationEnd: "07-10-2025",
    status: "approved",
    isSelected: false,
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

export default function CandidateList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {candidates.map((candidate) => (
        <Card 
          key={candidate.id} 
          className={`hover:shadow-md transition-all duration-200 ${
            candidate.isSelected 
              ? 'border-primary border-2 shadow-md' 
              : 'border-border hover:border-primary/50'
          }`}
        >
          <CardContent className="p-6">
            {/* Header with Avatar and Info */}
            <div className="flex items-start gap-3 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-gray-100 text-gray-600">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-card-foreground text-base mb-1">
                  {candidate.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {candidate.position}
                </p>
              </div>
            </div>

            {/* Company Location */}
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Company Location: {candidate.companyLocation}
              </span>
            </div>

            {/* Applied Date */}
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Applied: {candidate.appliedDate}
              </span>
            </div>

            {/* Application Timeline */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Application Start: {candidate.applicationStart}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Application End: {candidate.applicationEnd}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-xs h-8"
              >
                Remote
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-xs h-8"
              >
                View Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
