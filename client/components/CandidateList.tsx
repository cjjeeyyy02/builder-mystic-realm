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
  status: "hired" | "reject" | "queue";
  workType: "Remote" | "On-site" | "Hybrid";
  stage: "screening" | "interview" | "activation" | "hired";
  applicationStatus: "open" | "close";
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
    status: "hired",
    workType: "Remote",
    stage: "screening",
    applicationStatus: "open",
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
    applicationStatus: "open",
    isSelected: false,
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
    applicationStatus: "close",
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
    status: "hired",
    workType: "Remote",
    stage: "hired",
    applicationStatus: "close",
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
    applicationStatus: "open",
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
    status: "hired",
    workType: "On-site",
    stage: "interview",
    applicationStatus: "open",
    isSelected: false,
  },
];

function getStatusVariant(
  status: string,
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "hired":
      return "default"; // This will be overridden by custom classes
    case "reject":
      return "destructive";
    case "queue":
      return "outline";
    default:
      return "secondary";
  }
}

function getStatusBadgeClasses(status: string): string {
  switch (status) {
    case "hired":
      return "bg-green-100 text-green-800 border-green-200 hover:bg-green-200";
    case "reject":
      return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200";
    case "queue":
      return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200";
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "hired":
      return <CheckCircle className="w-3 h-3" />;
    case "reject":
      return <X className="w-3 h-3" />;
    case "queue":
      return <Clock className="w-3 h-3" />;
    default:
      return <Clock className="w-3 h-3" />;
  }
}

function getDepartmentColor(workType: string): string {
  switch (workType) {
    case "Remote":
      return "bg-blue-50 text-blue-700";
    case "On-site":
      return "bg-green-50 text-green-700";
    case "Hybrid":
      return "bg-purple-50 text-purple-700";
    default:
      return "bg-gray-50 text-gray-700";
  }
}

function getApplicationStatusColor(status: string): string {
  switch (status) {
    case "open":
      return "bg-green-100 text-green-800 border-green-200";
    case "close":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
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

      {/* Candidates Grid - Clean Minimized Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCandidates.length > 0 ? filteredCandidates.map((candidate) => (
          <Card
            key={candidate.id}
            className={`relative overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ${
              candidate.isSelected
                ? "ring-2 ring-blue-500/20 border-blue-300"
                : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Applicant Name */}
                <div className="space-y-1">
                  <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">APPLICANT NAME</span>
                  <div className="text-sm font-semibold text-gray-900">{candidate.name}</div>
                </div>

                {/* Applied Position */}
                <div className="space-y-1">
                  <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">APPLIED POSITION</span>
                  <div className="text-xs font-medium text-gray-700">{candidate.position}</div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Job Type */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-medium text-gray-500 uppercase tracking-wide">JOB TYPE</span>
                    <div className="text-[11px] text-gray-700">{candidate.workType}</div>
                  </div>

                  {/* Applied Date */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-medium text-gray-500 uppercase tracking-wide">APPLIED</span>
                    <div className="text-[11px] text-gray-700">{candidate.appliedDate}</div>
                  </div>

                  {/* Location */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-medium text-gray-500 uppercase tracking-wide">LOCATION</span>
                    <div className="text-[11px] text-gray-700">{candidate.companyLocation}</div>
                  </div>

                  {/* Period */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-medium text-gray-500 uppercase tracking-wide">PERIOD</span>
                    <div className="text-[10px] text-gray-600">{candidate.applicationStart} - {candidate.applicationEnd}</div>
                  </div>
                </div>

                {/* Status and Action */}
                <div className="pt-2 space-y-2">
                  {/* Single Status Badge */}
                  <Badge
                    variant="outline"
                    className={`font-semibold text-[10px] uppercase px-3 py-1 w-full justify-center rounded ${getApplicationStatusColor(candidate.applicationStatus)}`}
                  >
                    {candidate.applicationStatus === "open" ? "QUEUE" :
                     candidate.applicationStatus === "close" ? "REJECT" :
                     candidate.status === "hired" ? "HIRED" : "QUEUE"}
                  </Badge>

                  {/* Action Button */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-[10px] font-medium uppercase tracking-wide border border-gray-300 hover:border-gray-400 hover:bg-gray-50 h-7 px-3 rounded"
                    onClick={() => handleViewProfile(candidate)}
                  >
                    VIEW PROFILE
                  </Button>
                </div>
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

      {/* View Profile Modal */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCandidate && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium text-lg">
                      {selectedCandidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold">{selectedCandidate.name}</h2>
                    <p className="text-gray-600">{selectedCandidate.position}</p>
                  </div>
                  <div className="ml-auto">
                    <Badge
                      variant={getStatusVariant(selectedCandidate.status)}
                      className={`text-sm ${getStatusBadgeClasses(selectedCandidate.status)}`}
                    >
                      {getStatusIcon(selectedCandidate.status)}
                      <span className="ml-1">{selectedCandidate.status === "reject" ? "rejected" : selectedCandidate.status}</span>
                    </Badge>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Quick Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Briefcase className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold">{selectedCandidate.experience}</div>
                      <div className="text-sm text-gray-600">Experience</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="font-semibold">{selectedCandidate.workType}</div>
                      <div className="text-sm text-gray-600">Work Preference</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <div className="font-semibold">{selectedCandidate.availability}</div>
                      <div className="text-sm text-gray-600">Availability</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Contact Information */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{selectedCandidate.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{selectedCandidate.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{selectedCandidate.companyLocation}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Building className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{selectedCandidate.previousCompany}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Globe className="w-4 h-4 text-gray-500" />
                          <a
                            href={selectedCandidate.linkedinUrl}
                            className="text-sm text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            LinkedIn Profile
                          </a>
                        </div>
                        {selectedCandidate.rating && (
                          <div className="flex items-center gap-3">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm">
                              {selectedCandidate.rating}/5.0 Rating
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Professional Summary */}
                {selectedCandidate.summary && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Professional Summary</h3>
                      <p className="text-gray-700 leading-relaxed">{selectedCandidate.summary}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Education & Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedCandidate.education && (
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <GraduationCap className="w-5 h-5" />
                          Education
                        </h3>
                        <p className="text-gray-700">{selectedCandidate.education}</p>
                      </CardContent>
                    </Card>
                  )}

                  {selectedCandidate.skills && selectedCandidate.skills.length > 0 && (
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedCandidate.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Certifications */}
                {selectedCandidate.certifications && selectedCandidate.certifications.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        Certifications
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline" className="text-sm">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Application Details */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Application Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Application Stage</label>
                          <div className="mt-1">
                            <Badge variant="secondary" className="text-sm">
                              {selectedCandidate.stage.charAt(0).toUpperCase() + selectedCandidate.stage.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Applied Date</label>
                          <p className="mt-1 text-sm">{selectedCandidate.appliedDate}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Application Period</label>
                          <p className="mt-1 text-sm">
                            {selectedCandidate.applicationStart} - {selectedCandidate.applicationEnd}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Salary Expectation</label>
                          <p className="mt-1 text-sm">{selectedCandidate.salaryExpectation}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Work Preference</label>
                          <p className="mt-1 text-sm">{selectedCandidate.workType}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Current Status</label>
                          <div className="mt-1">
                            <Badge
                              variant={getStatusVariant(selectedCandidate.status)}
                              className={`text-sm ${getStatusBadgeClasses(selectedCandidate.status)}`}
                            >
                              {selectedCandidate.status === "reject" ? "rejected" : selectedCandidate.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Documents */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Documents
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedCandidate.resumeUrl && (
                        <Button variant="outline" className="flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Resume
                        </Button>
                      )}
                      {selectedCandidate.coverLetterUrl && (
                        <Button variant="outline" className="flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Cover Letter
                        </Button>
                      )}
                      {selectedCandidate.portfolioUrl && (
                        <Button variant="outline" className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          Portfolio
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <DialogFooter className="flex gap-2">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
