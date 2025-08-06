import React, { useState } from "react";
import {
  Mail,
  Phone,
  ExternalLink,
  Send,
  CheckCircle,
  Clock,
  MoreVertical,
  X,
  MapPin,
  Calendar,
  FileText,
  User,
  Download,
  Star,
  Award,
  Briefcase,
  GraduationCap,
  Globe,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  workType: "Remote" | "On-site" | "Hybrid";
  stage: "screening" | "interview" | "activation" | "hired";
  isSelected?: boolean;
  avatar?: string;
  // Enhanced profile information
  summary?: string;
  experience?: string;
  education?: string;
  skills?: string[];
  certifications?: string[];
  previousCompany?: string;
  salaryExpectation?: string;
  availability?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
  coverLetterUrl?: string;
  portfolioUrl?: string;
  rating?: number;
}

interface CandidateListProps {
  searchQuery?: string;
  selectedStage?: string;
}

const candidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    position: "Operation Associate",
    email: "sarahjohnson@gmail.com",
    phone: "123-456-789",
    companyLocation: "Hyderabad, India",
    appliedDate: "07-07-2025",
    applicationStart: "07-02-2025",
    applicationEnd: "07-10-2025",
    status: "approved",
    workType: "Remote",
    stage: "screening",
    isSelected: false,
    summary: "Experienced operations professional with 5+ years in supply chain management and process optimization. Proven track record of improving efficiency and reducing costs.",
    experience: "5 years",
    education: "Bachelor's in Business Administration, University of Hyderabad",
    skills: ["Supply Chain Management", "Process Optimization", "Data Analysis", "Project Management", "Microsoft Excel"],
    certifications: ["Six Sigma Green Belt", "PMP Certification"],
    previousCompany: "Tech Solutions India Pvt Ltd",
    salaryExpectation: "₹8-10 LPA",
    availability: "Immediate",
    linkedinUrl: "https://linkedin.com/in/sarahjohnson",
    resumeUrl: "/documents/sarah-johnson-resume.pdf",
    rating: 4.5,
  },
  {
    id: "2",
    name: "Michael Chen",
    position: "Operation Associate",
    email: "michael.chen@gmail.com",
    phone: "123-456-790",
    companyLocation: "Hyderabad, India",
    appliedDate: "07-07-2025",
    applicationStart: "07-02-2025",
    applicationEnd: "07-10-2025",
    status: "queue",
    workType: "On-site",
    stage: "interview",
    isSelected: true,
    summary: "Detail-oriented operations specialist with expertise in logistics and inventory management. Strong analytical skills and team leadership experience.",
    experience: "3 years",
    education: "Master's in Operations Management, IIT Hyderabad",
    skills: ["Logistics Management", "Inventory Control", "Team Leadership", "SQL", "Tableau"],
    certifications: ["APICS CSCP", "Google Analytics"],
    previousCompany: "Global Logistics Corp",
    salaryExpectation: "₹6-8 LPA",
    availability: "2 weeks notice",
    linkedinUrl: "https://linkedin.com/in/michaelchen",
    resumeUrl: "/documents/michael-chen-resume.pdf",
    coverLetterUrl: "/documents/michael-chen-cover-letter.pdf",
    rating: 4.2,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    position: "Operation Associate",
    email: "emily.rodriguez@gmail.com",
    phone: "123-456-791",
    companyLocation: "Hyderabad, India",
    appliedDate: "07-07-2025",
    applicationStart: "07-02-2025",
    applicationEnd: "07-10-2025",
    status: "reject",
    workType: "Hybrid",
    stage: "activation",
    isSelected: false,
  },
  {
    id: "4",
    name: "David Kim",
    position: "Operation Associate",
    email: "david.kim@gmail.com",
    phone: "123-456-792",
    companyLocation: "Hyderabad, India",
    appliedDate: "07-07-2025",
    applicationStart: "07-02-2025",
    applicationEnd: "07-10-2025",
    status: "approved",
    workType: "Remote",
    stage: "hired",
    isSelected: false,
  },
  {
    id: "5",
    name: "Lisa Wang",
    position: "Operation Associate",
    email: "lisa.wang@gmail.com",
    phone: "123-456-793",
    companyLocation: "Hyderabad, India",
    appliedDate: "07-07-2025",
    applicationStart: "07-02-2025",
    applicationEnd: "07-10-2025",
    status: "queue",
    workType: "Hybrid",
    stage: "screening",
    isSelected: false,
  },
  {
    id: "6",
    name: "Alex Thompson",
    position: "Operation Associate",
    email: "alex.thompson@gmail.com",
    phone: "123-456-794",
    companyLocation: "Hyderabad, India",
    appliedDate: "07-07-2025",
    applicationStart: "07-02-2025",
    applicationEnd: "07-10-2025",
    status: "approved",
    workType: "On-site",
    stage: "interview",
    isSelected: false,
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

export default function CandidateList({ searchQuery = "", selectedStage = "all" }: CandidateListProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleViewProfile = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowProfile(true);
  };

  // Filter candidates based on search query and selected stage
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = searchQuery === "" ||
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStage = selectedStage === "all" || candidate.stage === selectedStage;

    return matchesSearch && matchesStage;
  });

  return (
    <div className="space-y-4">
      {/* Filter Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredCandidates.length} of {candidates.length} candidates
          {selectedStage !== "all" && ` in ${selectedStage} stage`}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
        {selectedStage !== "all" && (
          <Badge variant="outline" className="text-xs">
            {selectedStage.charAt(0).toUpperCase() + selectedStage.slice(1)} Stage
          </Badge>
        )}
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCandidates.length > 0 ? filteredCandidates.map((candidate) => (
          <Card
            key={candidate.id}
            className={`group hover:shadow-lg transition-all duration-300 ${
              candidate.isSelected
                ? "ring-2 ring-primary shadow-lg"
                : "hover:border-primary/30"
            }`}
          >
            <CardContent className="p-5">
              {/* Header Section */}
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {candidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm leading-tight">
                    {candidate.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {candidate.position}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <Badge
                    variant={getStatusVariant(candidate.status)}
                    className="text-xs"
                  >
                    {getStatusIcon(candidate.status)}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {candidate.stage}
                  </Badge>
                </div>
              </div>

              {/* Info Section */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{candidate.companyLocation}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>Applied {candidate.appliedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FileText className="w-3 h-3" />
                  <span>Application Start: {candidate.applicationStart}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FileText className="w-3 h-3" />
                  <span>Application End: {candidate.applicationEnd}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-8 font-medium"
                >
                  {candidate.workType}
                </Button>
                <Button size="sm" className="text-xs h-8 font-medium">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No candidates found</h3>
            <p className="text-gray-500 max-w-sm">
              {searchQuery ? `No candidates match "${searchQuery}"` : `No candidates in ${selectedStage} stage`}
              {searchQuery && selectedStage !== "all" && ` in ${selectedStage} stage`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
