import React, { useState } from "react";
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

interface ScreeningCandidate {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  totalExperience: string;
  relevantExperience: string;
  status: "approved" | "reject" | "queue";
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

const screeningCandidates: ScreeningCandidate[] = [
  {
    id: "1",
    name: "Emily Rodriguez",
    position: "UX Designer",
    email: "emily.rodriguez@gmail.com",
    phone: "123-456-791",
    totalExperience: "5 years",
    relevantExperience: "5 years",
    status: "reject",
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
    status: "approved",
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
    id: "3",
    name: "Lisa Wang",
    position: "Product Manager",
    email: "lisa.wang@gmail.com",
    phone: "123-456-793",
    totalExperience: "8 years",
    relevantExperience: "7 years",
    status: "queue",
    resumeUrl: "/documents/lisa-wang-resume.pdf",
    summary: "Strategic Product Manager with 8 years of experience driving product vision and execution. Proven track record of launching successful products and managing cross-functional teams.",
    education: "MBA from Wharton, BS in Engineering from MIT",
    workHistory: [
      {
        company: "Product Innovations Corp",
        position: "Senior Product Manager",
        duration: "2020 - Present",
        description: "Led product strategy for B2B SaaS platform. Increased customer retention by 35% and drove $5M ARR growth."
      },
      {
        company: "Tech Giant Co",
        position: "Product Manager",
        duration: "2018 - 2020",
        description: "Managed consumer mobile app with 1M+ users. Collaborated with engineering and design teams on feature development."
      }
    ],
    skills: ["Product Strategy", "Agile/Scrum", "Data Analysis", "A/B Testing", "Roadmap Planning", "Stakeholder Management"],
    certifications: ["Certified Scrum Product Owner", "Google Analytics Certified"],
    location: "New York, NY",
    salaryExpectation: "$140,000 - $160,000",
    availability: "1 month notice",
    rating: 4.6,
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
  const [selectedCandidate, setSelectedCandidate] = useState<ScreeningCandidate | null>(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [screeningNotes, setScreeningNotes] = useState("");

  const handleStatusChange = (
    candidateId: string,
    newStatus: "approved" | "reject" | "queue",
  ) => {
    console.log(`Changing candidate ${candidateId} status to ${newStatus}`);
    // Here you would implement the actual status change logic
  };

  const handleViewResume = (candidate: ScreeningCandidate) => {
    setSelectedCandidate(candidate);
    setShowResumeModal(true);
  };

  const handleDownloadResume = (candidate: ScreeningCandidate) => {
    if (candidate.resumeUrl) {
      // Simulate download
      console.log(`Downloading resume for ${candidate.name}`);
      // In a real implementation, you would trigger an actual download
    }
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
                  <div className="flex items-center">
                    <Button
                      variant="default"
                      size="sm"
                      className="gap-1 text-white font-medium h-8 px-3 rounded-r-none"
                      style={{ backgroundColor: "#0065F8" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#0052C6")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#0065F8")
                      }
                      onClick={() => handleViewResume(candidate)}
                    >
                      <Eye className="w-3 h-3" />
                      View Resume
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="gap-1 text-white font-medium h-8 px-2 rounded-l-none border-l border-white/20"
                      style={{ backgroundColor: "#0065F8" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#0052C6")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#0065F8")
                      }
                      onClick={() => handleDownloadResume(candidate)}
                    >
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
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
                    <Badge variant={getStatusVariant(selectedCandidate.status)} className="text-xs sm:text-sm">
                      {getStatusIcon(selectedCandidate.status)}
                      <span className="ml-1">{selectedCandidate.status}</span>
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

                {/* Right Panel - Screening Tools */}
                <div className="w-80 border-l pl-6 space-y-4">
                  <h3 className="font-semibold text-lg">Screening Assessment</h3>

                  {/* Quick Actions */}
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">Quick Actions</h4>
                      <div className="space-y-2">
                        <Button
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => handleDownloadResume(selectedCandidate)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Resume
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Interview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Candidate Details */}
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">Candidate Details</h4>
                      <div className="space-y-3 text-sm">
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
                            <Badge variant={getStatusVariant(selectedCandidate.status)} className="text-xs">
                              {selectedCandidate.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Screening Notes */}
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">Screening Notes</h4>
                      <Textarea
                        placeholder="Add your screening notes here..."
                        value={screeningNotes}
                        onChange={(e) => setScreeningNotes(e.target.value)}
                        className="min-h-[100px] text-sm"
                      />
                    </CardContent>
                  </Card>

                  {/* Status Actions */}
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">Update Status</h4>
                      <div className="space-y-2">
                        <Button
                          variant={selectedCandidate.status === "approved" ? "default" : "outline"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => handleStatusChange(selectedCandidate.id, "approved")}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve for Next Round
                        </Button>
                        <Button
                          variant={selectedCandidate.status === "queue" ? "secondary" : "outline"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => handleStatusChange(selectedCandidate.id, "queue")}
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          Put in Queue
                        </Button>
                        <Button
                          variant={selectedCandidate.status === "reject" ? "destructive" : "outline"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => handleStatusChange(selectedCandidate.id, "reject")}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Reject Application
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <DialogFooter className="flex gap-2">
                <Button variant="outline" onClick={() => setShowResumeModal(false)}>
                  Close
                </Button>
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  onClick={() => handleDownloadResume(selectedCandidate)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Candidate
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
