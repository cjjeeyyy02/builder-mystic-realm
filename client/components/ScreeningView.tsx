import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  FileText,
  Download,
  Eye,
  Star,
  Calendar,
  MapPin,
  Building,
  User,
  Award,
  Briefcase,
  GraduationCap,
  List,
  Grid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";

interface ScreeningCandidate {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  totalExperience: string;
  relevantExperience: string;
  // status now includes interview stage
  status: "approved" | "reject" | "pending" | "interview";
  // Optional rejection reason stored when candidate is rejected
  rejectionReason?: string;
  // Enhanced resume data
  resumeUrl?: string;
  summary?: string;
  education?: string;
  workHistory?: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  skills?: string[];
  certifications?: string[];
  location?: string;
  salaryExpectation?: string;
  availability?: string;
  rating?: number;
}

export const screeningCandidates: ScreeningCandidate[] = [
  {
    id: "1",
    name: "Emily Rodriguez",
    position: "UX Designer",
    email: "emily.rodriguez@gmail.com",
    phone: "123-456-791",
    totalExperience: "5 years",
    relevantExperience: "5 years",
    status: "pending",
    resumeUrl: "/documents/emily-rodriguez-resume.pdf",
    summary: "Creative UX Designer with 5+ years of experience in designing user-centered digital experiences. Proficient in design thinking, user research, and prototyping.",
    education: "Master's in Human-Computer Interaction, Stanford University",
    workHistory: [
      {
        company: "TechCorp Solutions",
        position: "Senior UX Designer",
        duration: "2022 - Present",
        description: "Led design for mobile banking app used by 2M+ users. Improved user satisfaction by 40% through redesign initiative."
      },
      {
        company: "Design Studio Inc",
        position: "UX Designer",
        duration: "2020 - 2022",
        description: "Designed web applications for e-commerce clients. Conducted user research and usability testing."
      }
    ],
    skills: ["Figma", "Sketch", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
    certifications: ["Google UX Design Certificate", "Adobe Certified Expert"],
    location: "San Francisco, CA",
    salaryExpectation: "$95,000 - $110,000",
    availability: "2 weeks notice",
    rating: 4.2,
  },
  {
    id: "2",
    name: "David Kim",
    position: "Backend Developer",
    email: "david.kim@gmail.com",
    phone: "123-456-792",
    totalExperience: "7 years",
    relevantExperience: "6 years",
    status: "pending",
    resumeUrl: "/documents/david-kim-resume.pdf",
    summary: "Experienced Backend Developer with expertise in scalable systems design and microservices architecture. Strong background in cloud technologies and API development.",
    education: "Bachelor's in Computer Science, UC Berkeley",
    workHistory: [
      {
        company: "CloudTech Inc",
        position: "Senior Backend Developer",
        duration: "2021 - Present",
        description: "Architected microservices handling 10M+ requests daily. Reduced system latency by 60% through optimization."
      },
      {
        company: "StartupXYZ",
        position: "Backend Developer",
        duration: "2019 - 2021",
        description: "Built RESTful APIs and implemented real-time features using WebSocket technology."
      }
    ],
    skills: ["Python", "Django", "PostgreSQL", "Docker", "AWS", "Redis", "GraphQL"],
    certifications: ["AWS Solutions Architect", "Google Cloud Professional"],
    location: "Seattle, WA",
    salaryExpectation: "$120,000 - $140,000",
    availability: "Immediate",
    rating: 4.8,
  },
  {
    id: "4",
    name: "Carlos Mendez",
    position: "Data Scientist",
    email: "carlos.mendez@example.com",
    phone: "123-555-002",
    totalExperience: "6 years",
    relevantExperience: "5 years",
    status: "pending",
    resumeUrl: "/documents/carlos-mendez-resume.pdf",
    summary: "Data Scientist experienced with production ML systems and data engineering.",
    education: "M.S. in Data Science, NYU",
    workHistory: [
      { company: "InsightAI", position: "Data Scientist", duration: "2020 - Present", description: "Productionized ML models and built data pipelines." }
    ],
    skills: ["Python", "PyTorch", "SQL", "ETL"],
    certifications: [],
    location: "New York, NY",
    salaryExpectation: "$130,000 - $150,000",
    availability: "Immediate",
    rating: 4.6,
  },
  {
    id: "5",
    name: "Maya Singh",
    position: "QA Engineer",
    email: "maya.singh@example.com",
    phone: "123-555-003",
    totalExperience: "3 years",
    relevantExperience: "3 years",
    status: "pending",
    resumeUrl: "/documents/maya-singh-resume.pdf",
    summary: "QA Engineer with experience in automation, integration testing, and CI/CD.",
    education: "B.S. in Information Systems, Georgia Tech",
    workHistory: [
      { company: "QualityWorks", position: "QA Engineer", duration: "2021 - Present", description: "Implemented automated test suites and reduced regression time." }
    ],
    skills: ["Selenium", "Cypress", "Jest"],
    certifications: [],
    location: "Atlanta, GA",
    salaryExpectation: "$70,000 - $85,000",
    availability: "1 month",
    rating: 4.0,
  },
  {
    id: "7",
    name: "Sofia Rossi",
    position: "Product Designer",
    email: "sofia.rossi@example.com",
    phone: "123-555-005",
    totalExperience: "6 years",
    relevantExperience: "6 years",
    status: "pending",
    resumeUrl: "/documents/sofia-rossi-resume.pdf",
    summary: "Product Designer with cross-functional experience in UX and visual design.",
    education: "B.A. in Design, Politecnico di Milano",
    workHistory: [
      { company: "StudioX", position: "Product Designer", duration: "2018 - Present", description: "Led cross-platform design initiatives." }
    ],
    skills: ["Figma", "Prototyping", "Design Systems"],
    certifications: [],
    location: "Milan, Italy",
    salaryExpectation: "€60,000 - €75,000",
    availability: "2 weeks",
    rating: 4.5,
  },
];

function getStatusVariant(
  status: string,
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "approved":
      return "default";
    case "interview":
      return "secondary";
    case "reject":
      return "destructive";
    case "pending":
      return "outline";
    default:
      return "outline";
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "approved":
      return <CheckCircle className="w-3 h-3" />;
    case "interview":
      return <Check className="w-3 h-3" />;
    case "reject":
      return <X className="w-3 h-3" />;
    case "pending":
      return <Clock className="w-3 h-3" />;
    default:
      return <Clock className="w-3 h-3" />;
  }
}

export default function ScreeningView() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<ScreeningCandidate[]>(screeningCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<ScreeningCandidate | null>(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [screeningNotes, setScreeningNotes] = useState("");

  // UI states
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Email side sheet
  const [showEmailSheet, setShowEmailSheet] = useState(false);
  const [emailCandidate, setEmailCandidate] = useState<ScreeningCandidate | null>(null);

  // Resume zoom
  const [resumeZoom, setResumeZoom] = useState<number>(1);

  // Approve/Reject modals state
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [modalCandidateId, setModalCandidateId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  // Resume viewer mode: 'view' or 'download'
  const [resumeMode, setResumeMode] = useState<"view" | "download">("view");

  const handleStatusChange = (
    candidateId: string,
    newStatus: "approved" | "reject",
  ) => {
    setCandidates(prevCandidates =>
      prevCandidates.map(candidate =>
        candidate.id === candidateId
          ? { ...candidate, status: newStatus }
          : candidate
      )
    );

    // Update selected candidate if it's currently open in modal
    if (selectedCandidate && selectedCandidate.id === candidateId) {
      setSelectedCandidate(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleViewResume = (candidate: ScreeningCandidate) => {
    setSelectedCandidate(candidate);
    setShowResumeModal(true);
  };

  const handleEmailCandidate = (candidate: ScreeningCandidate) => {
    setEmailCandidate(candidate);
    setShowEmailSheet(true);
  };

  return (
    <div className="space-y-2">

      {/* Controls: search + view toggle */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <input
            className="pl-10 h-10 w-full rounded-lg border border-gray-200 bg-white text-base shadow-sm"
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant={viewMode === "table" ? "default" : "outline"} onClick={() => setViewMode("table")}><List className="w-4 h-4" /></Button>
          <Button size="sm" variant={viewMode === "grid" ? "default" : "outline"} onClick={() => setViewMode("grid")}><Grid className="w-4 h-4" /></Button>
        </div>
      </div>

      {/* Screening Candidates */}

      {/* Table View */}
      {viewMode === "table" && (
        <div className="overflow-auto rounded-lg border border-gray-100 bg-white shadow-sm mb-4">
          <table className="w-full text-sm table-auto border-collapse">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b">
                <th className="py-2 px-4">Candidate</th>
                <th className="py-2 px-4">Position</th>
                <th className="py-2 px-4">Experience</th>
                <th className="py-2 px-4">Contact</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates
                .filter(c => {
                  const q = searchQuery.toLowerCase();
                  return (
                    !q ||
                    c.name.toLowerCase().includes(q) ||
                    c.position.toLowerCase().includes(q) ||
                    c.email.toLowerCase().includes(q)
                  );
                })
                .map((candidate) => (
                  <tr key={candidate.id} className="border-b last:border-b-0 hover:bg-gray-50 transition">
                    <td className="py-3 px-4">
                      <div className="font-medium">{candidate.name}</div>
                      <div className="text-xs text-muted-foreground">{candidate.location}</div>
                    </td>
                    <td className="py-3 px-4">{candidate.position}</td>
                    <td className="py-3 px-4">{candidate.totalExperience}</td>
                    <td className="py-3 px-4">{candidate.email}</td>
                    <td className="py-3 px-4">
                      <div className="inline-flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${candidate.status === 'approved' ? 'bg-green-100 text-green-700' : candidate.status === 'reject' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                          {candidate.status === 'approved' ? 'Approved' : candidate.status === 'reject' ? 'Rejected' : 'Pending'}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline">Actions</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => handleStatusChange(candidate.id, 'approved')} className="flex items-center gap-2"><Check className="w-3 h-3"/> Approve</DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleStatusChange(candidate.id, 'reject')} className="flex items-center gap-2 text-red-600"><X className="w-3 h-3"/> Reject</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewResume(candidate)} className="flex items-center gap-2"><Eye className="w-3 h-3"/> View Resume</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEmailCandidate(candidate)} className="flex items-center gap-2"><Send className="w-3 h-3"/> Email</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      {viewMode === 'grid' && candidates.map((candidate) => (
        <Card
          key={candidate.id}
          className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-transparent hover:border-l-primary/30"
        >
          <CardContent className="p-3">
            {/* Main Layout - Responsive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
              {/* Left Section: Profile (Columns 1-4) */}
              <div className="lg:col-span-4 flex items-center gap-4">
                <Avatar className="h-10 w-10 flex-shrink-0 ring-1 ring-primary/10">
                  <AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/20 text-primary font-semibold text-sm">
                    {candidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-foreground text-sm leading-tight truncate">
                      {candidate.name}
                    </h3>
                    {(candidate.status === "approved" || candidate.status === "reject") && (
                      <Badge
                        variant={getStatusVariant(candidate.status)}
                        className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                          candidate.status === "approved"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-red-100 text-red-700 border-red-200"
                        }`}
                      >
                        {candidate.status === "approved" ? "Approved" : "Rejected"}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">
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

              {/* Actions Section (Columns 9-12) - single Status dropdown */}
              <div className="lg:col-span-4 flex items-center justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 text-xs px-3">
                      Status
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => handleStatusChange(candidate.id, 'approved')} className="flex items-center gap-2">
                      <Check className="w-3 h-3" />
                      Approve
                    </DropdownMenuItem>


                    <DropdownMenuItem onClick={() => handleStatusChange(candidate.id, 'reject')} className="flex items-center gap-2 text-red-600">
                      <X className="w-3 h-3" />
                      Reject
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleViewResume(candidate)} className="flex items-center gap-2">
                      <Eye className="w-3 h-3" />
                      View Resume
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleEmailCandidate(candidate)} className="flex items-center gap-2">
                      <Send className="w-3 h-3" />
                      Email
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Resume Viewer Modal */}
      <Dialog open={showResumeModal} onOpenChange={setShowResumeModal}>
        <DialogContent className="w-[95vw] max-w-7xl h-[95vh] overflow-hidden p-0">
          {selectedCandidate && (
            <>
              <DialogHeader className="p-4 sm:p-6 border-b">
                <DialogTitle className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold">{selectedCandidate.name} - Resume</h2>
                      <p className="text-xs sm:text-sm text-gray-600 font-normal">{selectedCandidate.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:ml-auto">
                    {selectedCandidate.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                        <span className="text-xs sm:text-sm font-medium">{selectedCandidate.rating}/5</span>
                      </div>
                    )}
                    <Badge
                      variant={getStatusVariant(selectedCandidate.status)}
                      className={`text-xs sm:text-sm ${
                        selectedCandidate.status === "approved"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : selectedCandidate.status === "reject"
                          ? "bg-red-100 text-red-700 border-red-200"
                          : "bg-gray-100 text-gray-700 border-gray-200"
                      }`}
                    >
                      {getStatusIcon(selectedCandidate.status)}
                      <span className="ml-1">
                        {selectedCandidate.status === "approved" ? "Approved" :
                         selectedCandidate.status === "reject" ? "Rejected" :
                         "Pending"}
                      </span>
                    </Badge>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="flex flex-col xl:flex-row gap-4 xl:gap-6 h-[calc(95vh-180px)] overflow-hidden">
                {/* Main Panel - Resume Content */}
                <div className="flex-1 overflow-y-auto space-y-4 sm:space-y-6 px-4 sm:px-6 xl:pr-4">
                  {/* Quick Info Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mx-auto mb-1" />
                      <div className="font-semibold text-xs sm:text-sm">{selectedCandidate.totalExperience}</div>
                      <div className="text-xs text-gray-600">Total Experience</div>
                    </div>
                    <div className="text-center">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mx-auto mb-1" />
                      <div className="font-semibold text-xs sm:text-sm">{selectedCandidate.location}</div>
                      <div className="text-xs text-gray-600">Location</div>
                    </div>
                    <div className="text-center">
                      <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 mx-auto mb-1" />
                      <div className="font-semibold text-xs sm:text-sm">{selectedCandidate.availability}</div>
                      <div className="text-xs text-gray-600">Availability</div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <Card>
                    <CardContent className="p-3 sm:p-4">
                      <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                        <User className="w-4 h-4" />
                        Contact Information
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                          <span className="truncate">{selectedCandidate.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                          <span>{selectedCandidate.phone}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Professional Summary */}
                  {selectedCandidate.summary && (
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <h3 className="font-semibold mb-3 text-sm sm:text-base">Professional Summary</h3>
                        <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{selectedCandidate.summary}</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Work Experience */}
                  {selectedCandidate.workHistory && selectedCandidate.workHistory.length > 0 && (
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                          <Briefcase className="w-4 h-4" />
                          Work Experience
                        </h3>
                        <div className="space-y-3 sm:space-y-4">
                          {selectedCandidate.workHistory.map((job, index) => (
                            <div key={index} className="border-l-2 border-blue-200 pl-3 sm:pl-4 pb-3 sm:pb-4">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-1 sm:gap-2">
                                <div className="flex-1">
                                  <h4 className="font-medium text-xs sm:text-sm">{job.position}</h4>
                                  <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <Building className="w-3 h-3 flex-shrink-0" />
                                    <span className="truncate">{job.company}</span>
                                  </div>
                                </div>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded self-start">
                                  {job.duration}
                                </span>
                              </div>
                              <p className="text-xs text-gray-700 leading-relaxed">{job.description}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Education */}
                  {selectedCandidate.education && (
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                          <GraduationCap className="w-4 h-4" />
                          Education
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-700">{selectedCandidate.education}</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Skills */}
                  {selectedCandidate.skills && selectedCandidate.skills.length > 0 && (
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <h3 className="font-semibold mb-3 text-sm sm:text-base">Skills & Technologies</h3>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {selectedCandidate.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Certifications */}
                  {selectedCandidate.certifications && selectedCandidate.certifications.length > 0 && (
                    <Card>
                      <CardContent className="p-3 sm:p-4">
                        <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                          <Award className="w-4 h-4" />
                          Certifications
                        </h3>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {selectedCandidate.certifications.map((cert, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Screening Tools Panel */}
                <div className="w-full xl:w-80 xl:border-l xl:pl-6 px-4 sm:px-6 xl:px-0 space-y-3 sm:space-y-4">
                  <h3 className="font-semibold text-base sm:text-lg">Screening Assessment</h3>

                  {/* Quick Actions */}
                  <Card>
                    <CardContent className="p-3 sm:p-4">
                      <h4 className="font-medium mb-3 text-sm sm:text-base">Quick Actions</h4>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-xs sm:text-sm"
                          onClick={() => selectedCandidate && handleEmailCandidate(selectedCandidate)}
                        >
                          <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                          Send Email
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start text-xs sm:text-sm">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                          Schedule Interview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Candidate Details */}
                  <Card>
                    <CardContent className="p-3 sm:p-4">
                      <h4 className="font-medium mb-3 text-sm sm:text-base">Candidate Details</h4>
                      <div className="space-y-3 text-xs sm:text-sm">
                        <div>
                          <label className="text-gray-600 text-xs">Salary Expectation</label>
                          <p className="font-medium">{selectedCandidate.salaryExpectation}</p>
                        </div>
                        <div>
                          <label className="text-gray-600 text-xs">Total Experience</label>
                          <p className="font-medium">{selectedCandidate.totalExperience}</p>
                        </div>
                        <div>
                          <label className="text-gray-600 text-xs">Relevant Experience</label>
                          <p className="font-medium">{selectedCandidate.relevantExperience}</p>
                        </div>
                        <div>
                          <label className="text-gray-600 text-xs">Current Status</label>
                          <div className="mt-1">
                            <Badge
                              variant={getStatusVariant(selectedCandidate.status)}
                              className={`text-xs ${
                                selectedCandidate.status === "approved"
                                  ? "bg-green-100 text-green-700 border-green-200"
                                  : selectedCandidate.status === "reject"
                                  ? "bg-red-100 text-red-700 border-red-200"
                                  : "bg-gray-100 text-gray-700 border-gray-200"
                              }`}
                            >
                              {selectedCandidate.status === "approved" ? "Approved" :
                               selectedCandidate.status === "reject" ? "Rejected" :
                               "Pending"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Screening Notes */}
                  <Card>
                    <CardContent className="p-3 sm:p-4">
                      <h4 className="font-medium mb-3 text-sm sm:text-base">Screening Notes</h4>
                      <Textarea
                        placeholder="Add your screening notes here..."
                        value={screeningNotes}
                        onChange={(e) => setScreeningNotes(e.target.value)}
                        className="min-h-[80px] sm:min-h-[100px] text-xs sm:text-sm"
                      />
                    </CardContent>
                  </Card>

                  {/* Status Actions */}
                  <Card>
                    <CardContent className="p-3 sm:p-4">
                      <h4 className="font-medium mb-3 text-sm sm:text-base">Update Status</h4>
                      <div className="space-y-2">
                        <Button
                          variant={selectedCandidate.status === "approved" ? "default" : "outline"}
                          size="sm"
                          className={`w-full justify-start text-xs sm:text-sm transition-all duration-200 ${
                            selectedCandidate.status === "approved"
                              ? "bg-green-600 hover:bg-green-700 text-white border-green-600 shadow-md"
                              : "hover:bg-green-50 hover:border-green-300 hover:text-green-700"
                          }`}
                          onClick={() => handleStatusChange(selectedCandidate.id, "approved")}
                        >
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                          Approve for Next Round
                        </Button>
                        <Button
                          variant={selectedCandidate.status === "reject" ? "destructive" : "outline"}
                          size="sm"
                          className={`w-full justify-start text-xs sm:text-sm transition-all duration-200 ${
                            selectedCandidate.status === "reject"
                              ? "bg-red-600 hover:bg-red-700 text-white border-red-600 shadow-md"
                              : "hover:bg-red-50 hover:border-red-300 hover:text-red-700"
                          }`}
                          onClick={() => handleStatusChange(selectedCandidate.id, "reject")}
                        >
                          <X className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                          Reject Application
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-2 p-4 sm:p-6 border-t">
                <Button variant="outline" onClick={() => setShowResumeModal(false)} className="text-xs sm:text-sm">
                  Close
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Approve Candidate
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Email Side Sheet */}
      <Sheet open={showEmailSheet} onOpenChange={setShowEmailSheet}>
        <SheetContent side="right" className="w-full max-w-md">
          <SheetHeader>
            <h3 className="text-lg font-semibold">Email {emailCandidate?.name}</h3>
          </SheetHeader>

          <div className="p-4">
            <Label>To</Label>
            <Input value={emailCandidate?.email ?? ''} readOnly />
            <Label className="mt-3">Subject</Label>
            <Input placeholder={`Regarding ${emailCandidate?.position}`} />
            <Label className="mt-3">Message</Label>
            <Textarea className="min-h-[160px]" />
            <div className="flex items-center justify-end gap-2 mt-3">
              <Button variant="outline" onClick={() => setShowEmailSheet(false)}>Cancel</Button>
              <Button onClick={() => { setShowEmailSheet(false); setEmailCandidate(null); }}>Send</Button>
            </div>
          </div>

        </SheetContent>
      </Sheet>
    </div>
  );
}
