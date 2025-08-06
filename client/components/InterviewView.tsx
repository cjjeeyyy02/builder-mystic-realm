import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Plus,
  Edit3,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Users,
  Search,
  Upload,
  Trash2,
  MessageSquare,
  Settings,
  Eye,
  Send,
  RotateCcw
} from "lucide-react";

interface InterviewCandidate {
  id: string;
  applicantName: string;
  appliedPosition: string;
  department: string;
  currentRound: string;
  status: "in-progress" | "completed" | "pending";
  email?: string;
  phone?: string;
}

interface UpcomingInterview {
  id: string;
  sNo: number;
  applicantName: string;
  appliedPosition: string;
  department: string;
  interviewDateTime: string;
  interviewRound: string;
}

interface InterviewRound {
  id: string;
  roundHeader: string;
  roundName: string;
  roundType: "technical" | "non-technical" | "final";
  interviewMode: "online-assessment" | "video-call" | "in-person" | "oral-assessment" | "group-assessment";
  testDescription?: string;
  attachedFiles: string[];
  scheduledDate: string;
  scheduledTime: string;
  status: "completed" | "incomplete";
  candidates: string[];
}

interface AdminConfig {
  technical: {
    enabled: boolean;
    name: string;
    roundName: boolean;
    roundType: boolean;
    interviewMode: boolean;
  };
  nonTechnical: {
    enabled: boolean;
    name: string;
    roundName: boolean;
    roundType: boolean;
    interviewMode: boolean;
  };
  final: {
    enabled: boolean;
    name: string;
    roundName: boolean;
    roundType: boolean;
    interviewMode: boolean;
  };
}

const interviewCandidates: InterviewCandidate[] = [
  {
    id: "1",
    applicantName: "Sarah Mitchell",
    appliedPosition: "Senior Software Engineer",
    department: "Engineering",
    currentRound: "Technical Assessment - Final",
    status: "in-progress",
    email: "sarah.mitchell@email.com",
    phone: "+1 (555) 123-4567",
  },
  {
    id: "2",
    applicantName: "James Rodriguez",
    appliedPosition: "Product Manager",
    department: "Product",
    currentRound: "Behavioral Interview - Round 2",
    status: "completed",
    email: "james.rodriguez@email.com",
    phone: "+1 (555) 234-5678",
  },
  {
    id: "3",
    applicantName: "Emily Chen",
    appliedPosition: "UX Designer",
    department: "Design",
    currentRound: "Portfolio Review - Round 1",
    status: "pending",
    email: "emily.chen@email.com",
    phone: "+1 (555) 345-6789",
  },
  {
    id: "4",
    applicantName: "Michael Thompson",
    appliedPosition: "Data Analyst",
    department: "Analytics",
    currentRound: "Case Study Presentation",
    status: "in-progress",
    email: "michael.thompson@email.com",
    phone: "+1 (555) 456-7890",
  },
  {
    id: "5",
    applicantName: "Jessica Wang",
    appliedPosition: "Marketing Specialist",
    department: "Marketing",
    currentRound: "Campaign Strategy Review",
    status: "pending",
    email: "jessica.wang@email.com",
    phone: "+1 (555) 567-8901",
  },
  {
    id: "6",
    applicantName: "David Park",
    appliedPosition: "DevOps Engineer",
    department: "Engineering",
    currentRound: "System Design Interview",
    status: "in-progress",
    email: "david.park@email.com",
    phone: "+1 (555) 678-9012",
  },
  {
    id: "7",
    applicantName: "Amanda Foster",
    appliedPosition: "Business Analyst",
    department: "Operations",
    currentRound: "Process Optimization Case",
    status: "completed",
    email: "amanda.foster@email.com",
    phone: "+1 (555) 789-0123",
  },
];

// Admin Panel Configuration (simulated)
const adminConfig: AdminConfig = {
  technical: {
    enabled: true,
    name: "Technical",
    roundName: true,
    roundType: true,
    interviewMode: true,
  },
  nonTechnical: {
    enabled: true,
    name: "Non-Technical",
    roundName: true,
    roundType: true,
    interviewMode: true,
  },
  final: {
    enabled: true,
    name: "Final",
    roundName: true,
    roundType: true,
    interviewMode: true,
  },
};

// Sample Interview Rounds
const defaultInterviewRounds: InterviewRound[] = [
  {
    id: "tech-1",
    roundHeader: "Round 1",
    roundName: "Technical Assessment",
    roundType: "technical",
    interviewMode: "online-assessment",
    testDescription: "Core programming concepts and problem-solving skills",
    attachedFiles: ["technical-test.pdf", "coding-guidelines.doc"],
    scheduledDate: "2025-01-20",
    scheduledTime: "09:00",
    status: "incomplete",
    candidates: ["1", "4", "6"],
  },
  {
    id: "tech-2",
    roundHeader: "Round 2",
    roundName: "System Design Interview",
    roundType: "technical",
    interviewMode: "video-call",
    testDescription: "Architecture design and scalability concepts",
    attachedFiles: ["system-design-template.pdf"],
    scheduledDate: "2025-01-22",
    scheduledTime: "14:00",
    status: "incomplete",
    candidates: ["1", "6"],
  },
  {
    id: "nt-1",
    roundHeader: "Round 1",
    roundName: "Behavioral Interview",
    roundType: "non-technical",
    interviewMode: "video-call",
    testDescription: "Cultural fit and communication skills assessment",
    attachedFiles: [],
    scheduledDate: "2025-01-21",
    scheduledTime: "10:30",
    status: "incomplete",
    candidates: ["2", "3", "5"],
  },
  {
    id: "final-1",
    roundHeader: "Round 1",
    roundName: "Executive Interview",
    roundType: "final",
    interviewMode: "in-person",
    testDescription: "Final leadership and strategic thinking evaluation",
    attachedFiles: ["executive-interview-guide.pdf"],
    scheduledDate: "2025-01-25",
    scheduledTime: "15:00",
    status: "incomplete",
    candidates: ["2"],
  },
];

const upcomingInterviews: UpcomingInterview[] = [
  {
    id: "1",
    sNo: 1,
    applicantName: "Alexandra Rodriguez",
    appliedPosition: "Senior Software Engineer",
    department: "Engineering",
    interviewDateTime: "01-15-25 | 09:30 AM",
    interviewRound: "Technical Round 1",
  },
  {
    id: "2",
    sNo: 2,
    applicantName: "Marcus Thompson",
    appliedPosition: "Product Manager",
    department: "Product",
    interviewDateTime: "01-15-25 | 11:00 AM",
    interviewRound: "Final Round",
  },
  {
    id: "3",
    sNo: 3,
    applicantName: "Priya Patel",
    appliedPosition: "UX/UI Designer",
    department: "Design",
    interviewDateTime: "01-15-25 | 02:15 PM",
    interviewRound: "Non Technical Round 4",
  },
  {
    id: "4",
    sNo: 4,
    applicantName: "David Kim",
    appliedPosition: "Data Scientist",
    department: "Analytics",
    interviewDateTime: "01-16-25 | 10:45 AM",
    interviewRound: "Technical Round 1",
  },
  {
    id: "5",
    sNo: 5,
    applicantName: "Sofia Martinez",
    appliedPosition: "Marketing Specialist",
    department: "Marketing",
    interviewDateTime: "01-16-25 | 01:30 PM",
    interviewRound: "Final Round",
  },
  {
    id: "6",
    sNo: 6,
    applicantName: "James Wilson",
    appliedPosition: "DevOps Engineer",
    department: "Engineering",
    interviewDateTime: "01-16-25 | 03:45 PM",
    interviewRound: "Non Technical Round 4",
  },
  {
    id: "7",
    sNo: 7,
    applicantName: "Emma Johnson",
    appliedPosition: "Business Analyst",
    department: "Operations",
    interviewDateTime: "01-17-25 | 11:15 AM",
    interviewRound: "Technical Round 1",
  },
];

function getStatusColor(status: string): string {
  switch (status) {
    case "completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "in-progress":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

function getDepartmentColor(department: string): string {
  switch (department) {
    case "Engineering":
      return "bg-purple-50 text-purple-700";
    case "Product":
      return "bg-green-50 text-green-700";
    case "Design":
      return "bg-pink-50 text-pink-700";
    case "Analytics":
      return "bg-indigo-50 text-indigo-700";
    case "Marketing":
      return "bg-orange-50 text-orange-700";
    case "Operations":
      return "bg-teal-50 text-teal-700";
    default:
      return "bg-gray-50 text-gray-700";
  }
}

function getRoundContent(roundType: string, roundNumber: number) {
  const content = {
    technical: {
      1: { name: "Technical Round 1", mode: "Online Assessment", assessment: "Written Test" },
      2: { name: "Technical Round 2", mode: "Video Call", assessment: "Practical Test" },
      3: { name: "Technical Round 3", mode: "In-Person", assessment: "Oral Interview" }
    },
    nontechnical: {
      1: { name: "Non-Technical Round 1", mode: "Video Call", assessment: "Oral Interview" },
      2: { name: "Non-Technical Round 2", mode: "In-Person", assessment: "Oral Interview" },
      3: { name: "Non-Technical Round 3", mode: "Video Call", assessment: "Oral Interview" }
    },
    final: {
      1: { name: "Final Round 1", mode: "In-Person", assessment: "Oral Interview" },
      2: { name: "Final Round 2", mode: "Video Call", assessment: "Portfolio Review" },
      3: { name: "Final Round 3", mode: "In-Person", assessment: "Case Study" }
    }
  };

  return content[roundType as keyof typeof content]?.[roundNumber as keyof typeof content.technical] ||
         { name: "Interview Round", mode: "Online Assessment", assessment: "Written Test" };
}

export default function InterviewView() {
  // Main Panel States
  const [activeMainTab, setActiveMainTab] = useState("interview-status");
  const [activeInterviewTab, setActiveInterviewTab] = useState("ongoing");

  // Rounds Room States
  const [activeRoundType, setActiveRoundType] = useState<"technical" | "non-technical" | "final">("technical");
  const [rounds, setRounds] = useState<InterviewRound[]>(defaultInterviewRounds);
  const [selectedRound, setSelectedRound] = useState<InterviewRound | null>(null);
  const [showRoundModal, setShowRoundModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState(interviewCandidates);

  // Form States
  const [roundForm, setRoundForm] = useState({
    roundHeader: "",
    roundName: "",
    roundType: "technical" as "technical" | "non-technical" | "final",
    interviewMode: "online-assessment" as "online-assessment" | "video-call" | "in-person" | "oral-assessment" | "group-assessment",
    testDescription: "",
    scheduledDate: "",
    scheduledTime: "",
  });

  // Search functionality with fuzzy matching
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredCandidates(interviewCandidates);
      return;
    }

    const filtered = interviewCandidates.filter(candidate => {
      const searchTerms = query.toLowerCase().split(' ');
      const candidateText = `${candidate.applicantName} ${candidate.email} ${candidate.appliedPosition} ${candidate.department}`.toLowerCase();

      return searchTerms.every(term => {
        // Fuzzy matching - allow partial matches and typos
        return candidateText.includes(term) ||
               candidateText.split(' ').some(word =>
                 word.startsWith(term) ||
                 word.includes(term.substring(0, Math.max(2, term.length - 1)))
               );
      });
    });

    setFilteredCandidates(filtered);
  };

  // Get filtered rounds based on active type
  const getFilteredRounds = () => {
    return rounds.filter(round => round.roundType === activeRoundType);
  };

  // CRUD Operations
  const handleCreateRound = () => {
    const newRound: InterviewRound = {
      id: `${activeRoundType}-${Date.now()}`,
      roundHeader: roundForm.roundHeader || `Round ${getFilteredRounds().length + 1}`,
      roundName: roundForm.roundName,
      roundType: activeRoundType,
      interviewMode: roundForm.interviewMode,
      testDescription: roundForm.testDescription,
      attachedFiles: [],
      scheduledDate: roundForm.scheduledDate,
      scheduledTime: roundForm.scheduledTime,
      status: "incomplete",
      candidates: [],
    };

    setRounds(prev => [...prev, newRound]);
    resetForm();
    setShowRoundModal(false);
  };

  const handleUpdateRound = () => {
    if (!selectedRound) return;

    setRounds(prev => prev.map(round =>
      round.id === selectedRound.id
        ? { ...round, ...roundForm }
        : round
    ));

    resetForm();
    setSelectedRound(null);
    setIsEditing(false);
    setShowRoundModal(false);
  };

  const handleDeleteRound = (roundId: string) => {
    setRounds(prev => prev.filter(round => round.id !== roundId));
  };

  const handleEditRound = (round: InterviewRound) => {
    setSelectedRound(round);
    setRoundForm({
      roundHeader: round.roundHeader,
      roundName: round.roundName,
      roundType: round.roundType,
      interviewMode: round.interviewMode,
      testDescription: round.testDescription || "",
      scheduledDate: round.scheduledDate,
      scheduledTime: round.scheduledTime,
    });
    setIsEditing(true);
    setShowRoundModal(true);
  };

  const handleEmailRound = (round: InterviewRound) => {
    console.log(`Sending email for round: ${round.roundName}`);
    // Email notification logic would go here
  };

  const handleRescheduleRound = (round: InterviewRound) => {
    handleEditRound(round);
  };

  const toggleRoundStatus = (roundId: string) => {
    setRounds(prev => prev.map(round =>
      round.id === roundId
        ? { ...round, status: round.status === "completed" ? "incomplete" : "completed" }
        : round
    ));
  };

  const resetForm = () => {
    setRoundForm({
      roundHeader: "",
      roundName: "",
      roundType: activeRoundType,
      interviewMode: "online-assessment",
      testDescription: "",
      scheduledDate: "",
      scheduledTime: "",
    });
    setSelectedRound(null);
    setIsEditing(false);
  };

  return (
    <div className={activeMainTab === "interview-status" ? "space-y-6" : "flex gap-6 h-[calc(100vh-200px)]"}>
      {/* Left Side Panel - Hidden when Interview Status is active */}
      <div className={`w-80 flex-shrink-0 space-y-4 ${activeMainTab === "interview-status" ? "hidden" : ""}`}>
        {/* Main Panel Tabs and Search Bar in One Row */}
        <div className="flex gap-2 items-center">
          <Button
            variant={activeMainTab === "interview-status" ? "default" : "outline"}
            className="justify-start whitespace-nowrap"
            onClick={() => setActiveMainTab("interview-status")}
          >
            <Users className="w-4 h-4 mr-2" />
            Interview Status
          </Button>
          <Button
            variant={activeMainTab === "rounds-room" ? "default" : "outline"}
            className="justify-start whitespace-nowrap"
            onClick={() => setActiveMainTab("rounds-room")}
          >
            <Settings className="w-4 h-4 mr-2" />
            Rounds Room
          </Button>

          {/* Search Bar - Only shown when Interview Status is active */}
          <div className="relative flex-1">
            {activeMainTab === "interview-status" ? (
              <>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, job title..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </>
            ) : (
              <div className="h-10" /> // Maintain spacing when rounds room is active
            )}
          </div>
        </div>

        {/* Content based on active tab */}
        {activeMainTab === "rounds-room" && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Round Categories</h3>
              <div className="space-y-2">
                {adminConfig.technical.enabled && (
                  <Button
                    variant={activeRoundType === "technical" ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setActiveRoundType("technical")}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {adminConfig.technical.name}
                  </Button>
                )}
                {adminConfig.nonTechnical.enabled && (
                  <Button
                    variant={activeRoundType === "non-technical" ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setActiveRoundType("non-technical")}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {adminConfig.nonTechnical.name}
                  </Button>
                )}
                {adminConfig.final.enabled && (
                  <Button
                    variant={activeRoundType === "final" ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setActiveRoundType("final")}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {adminConfig.final.name}
                  </Button>
                )}
              </div>

              <Button
                className="w-full mt-4 bg-[#0065F8] hover:bg-[#0065F8]/90 text-white"
                onClick={() => {
                  resetForm();
                  setShowRoundModal(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Round
              </Button>
            </CardContent>
          </Card>
        )}

        {activeMainTab === "rounds-room" && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">
                {adminConfig[activeRoundType]?.name} Rounds
              </h3>
              <div className="space-y-2">
                {getFilteredRounds().map((round) => (
                  <div
                    key={round.id}
                    className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{round.roundHeader}</span>
                        <Badge
                          variant={round.status === "completed" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {round.status === "completed" ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {round.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditRound(round)}
                          className="h-6 w-6 p-0"
                        >
                          <Edit3 className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteRound(round.id)}
                          className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{round.roundName}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{round.scheduledDate} at {round.scheduledTime}</span>
                      <span>{round.candidates.length} candidates</span>
                    </div>
                  </div>
                ))}

                {getFilteredRounds().length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No rounds created yet</p>
                    <p className="text-xs">Click "Add New Round" to get started</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 space-y-6 overflow-y-auto">
        {activeMainTab === "interview-status" && (
          <>
            {/* Interview Status Header with Tabs */}
            <div className="flex items-center justify-between">
              <div className="flex gap-1 p-1 bg-muted rounded-lg">
                <Button
                  variant={activeInterviewTab === "ongoing" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveInterviewTab("ongoing")}
                  className="text-sm font-medium px-6 py-2"
                >
                  Ongoing Interview
                </Button>
                <Button
                  variant={activeInterviewTab === "upcoming" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveInterviewTab("upcoming")}
                  className="text-sm font-medium px-6 py-2"
                >
                  Upcoming Interview
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? 's' : ''} found
              </div>
            </div>

            {/* Summary Stats */}
            {activeInterviewTab === "ongoing" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {filteredCandidates.filter(c => c.status === "in-progress").length}
                  </div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </Card>
                <Card className="p-4">
                  <div className="text-2xl font-bold text-emerald-600">
                    {filteredCandidates.filter(c => c.status === "completed").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </Card>
                <Card className="p-4">
                  <div className="text-2xl font-bold text-amber-600">
                    {filteredCandidates.filter(c => c.status === "pending").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </Card>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="text-2xl font-bold text-[#0065F8]">
                    {upcomingInterviews.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Upcoming</div>
                </Card>
                <Card className="p-4">
                  <div className="text-2xl font-bold text-orange-600">
                    {upcomingInterviews.filter(i => i.department === "Engineering").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Engineering Dept.</div>
                </Card>
                <Card className="p-4">
                  <div className="text-2xl font-bold text-purple-600">
                    {upcomingInterviews.filter(i => i.interviewRound.includes("Final")).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Final Rounds</div>
                </Card>
              </div>
            )}

            {/* Interview Table */}
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 border-b">
                      <TableHead className="w-16 text-center font-semibold text-foreground py-4">
                        {activeInterviewTab === "upcoming" ? "S-No." : "#"}
                      </TableHead>
                      <TableHead className="font-semibold text-foreground py-4">
                        CANDIDATE NAME
                      </TableHead>
                      <TableHead className="font-semibold text-foreground py-4">
                        POSITION
                      </TableHead>
                      <TableHead className="font-semibold text-foreground py-4">
                        DEPARTMENT
                      </TableHead>
                      <TableHead className="font-semibold text-foreground py-4">
                        {activeInterviewTab === "upcoming" ? "INTERVIEW DATE | TIME" : "Interview Round"}
                      </TableHead>
                      <TableHead className="font-semibold text-foreground py-4">
                        {activeInterviewTab === "upcoming" ? "INTERVIEW ROUND" : "Status"}
                      </TableHead>
                      {activeInterviewTab === "upcoming" && (
                        <TableHead className="font-semibold text-foreground py-4">
                          QUICK UPDATE
                        </TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeInterviewTab === "ongoing" ? (
                      filteredCandidates.map((candidate, index) => (
                        <TableRow
                          key={candidate.id}
                          className="hover:bg-muted/20 transition-colors border-b border-border/40"
                        >
                          <TableCell className="text-center font-medium text-muted-foreground py-6">
                            {index + 1}
                          </TableCell>
                          <TableCell className="py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                                <span className="text-primary font-medium text-xs">
                                  {candidate.applicantName.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <div className="font-semibold text-foreground">
                                  {candidate.applicantName}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {candidate.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-6">
                            <div className="font-medium text-foreground">
                              {candidate.appliedPosition}
                            </div>
                          </TableCell>
                          <TableCell className="py-6">
                            <Badge
                              variant="secondary"
                              className={`font-medium ${getDepartmentColor(candidate.department)}`}
                            >
                              {candidate.department}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-6">
                            <div className="text-foreground font-medium">
                              {candidate.currentRound}
                            </div>
                          </TableCell>
                          <TableCell className="py-6">
                            <Badge
                              variant="outline"
                              className={`font-medium ${getStatusColor(candidate.status)}`}
                            >
                              {candidate.status === "in-progress"
                                ? "In Progress"
                                : candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      upcomingInterviews.map((interview) => (
                        <TableRow
                          key={interview.id}
                          className="hover:bg-muted/20 transition-colors border-b border-border/40"
                        >
                          <TableCell className="text-center font-medium text-foreground py-6">
                            {interview.sNo}
                          </TableCell>
                          <TableCell className="py-6">
                            <div className="font-medium text-foreground">
                              {interview.applicantName}
                            </div>
                          </TableCell>
                          <TableCell className="py-6">
                            <div className="font-medium text-foreground">
                              {interview.appliedPosition}
                            </div>
                          </TableCell>
                          <TableCell className="py-6">
                            <Badge
                              variant="secondary"
                              className={`font-medium ${getDepartmentColor(interview.department)}`}
                            >
                              {interview.department}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-6">
                            <div className="text-foreground font-medium">
                              {interview.interviewDateTime}
                            </div>
                          </TableCell>
                          <TableCell className="py-6">
                            <div className="text-foreground font-medium">
                              {interview.interviewRound}
                            </div>
                          </TableCell>
                          <TableCell className="py-6">
                            <Button
                              size="sm"
                              className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white font-medium px-3 py-1.5 text-xs h-8"
                            >
                              <Mail className="w-3 h-3 mr-1.5" />
                              SEND EMAIL
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}

        {/* Rounds Room Main Content */}
        {activeMainTab === "rounds-room" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                {adminConfig[activeRoundType]?.name} Rounds Management
              </h2>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm">
                  {getFilteredRounds().length} rounds configured
                </Badge>
                <Badge
                  variant="default"
                  className="text-sm bg-green-100 text-green-700 border-green-200"
                >
                  {getFilteredRounds().filter(r => r.status === "completed").length} completed
                </Badge>
              </div>
            </div>

            {/* Rounds Table */}
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 border-b">
                      <TableHead className="font-semibold text-foreground py-4">Round Header</TableHead>
                      <TableHead className="font-semibold text-foreground py-4">Round Name</TableHead>
                      <TableHead className="font-semibold text-foreground py-4">Interview Mode</TableHead>
                      <TableHead className="font-semibold text-foreground py-4">Scheduled Date/Time</TableHead>
                      <TableHead className="font-semibold text-foreground py-4">Status</TableHead>
                      <TableHead className="font-semibold text-foreground py-4">Candidates</TableHead>
                      <TableHead className="font-semibold text-foreground py-4">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredRounds().map((round) => (
                      <TableRow
                        key={round.id}
                        className="hover:bg-muted/20 transition-colors border-b border-border/40"
                      >
                        <TableCell className="py-6">
                          <div className="font-medium text-foreground">
                            {round.roundHeader}
                          </div>
                        </TableCell>
                        <TableCell className="py-6">
                          <div className="font-medium text-foreground">
                            {round.roundName}
                          </div>
                          {round.testDescription && (
                            <div className="text-xs text-gray-500 mt-1">
                              {round.testDescription}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="py-6">
                          <Badge variant="outline" className="text-xs">
                            {round.interviewMode.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-6">
                          <div className="text-sm">
                            <div className="font-medium">{round.scheduledDate}</div>
                            <div className="text-gray-500">{round.scheduledTime}</div>
                          </div>
                        </TableCell>
                        <TableCell className="py-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleRoundStatus(round.id)}
                            className="p-0"
                          >
                            <Badge
                              variant={round.status === "completed" ? "default" : "secondary"}
                              className="text-xs cursor-pointer hover:opacity-80"
                            >
                              {round.status === "completed" ? (
                                <CheckCircle className="w-3 h-3 mr-1" />
                              ) : (
                                <Clock className="w-3 h-3 mr-1" />
                              )}
                              {round.status}
                            </Badge>
                          </Button>
                        </TableCell>
                        <TableCell className="py-6">
                          <div className="text-sm font-medium text-blue-600">
                            {round.candidates.length} assigned
                          </div>
                        </TableCell>
                        <TableCell className="py-6">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEmailRound(round)}
                              className="text-xs"
                            >
                              <Send className="w-3 h-3 mr-1" />
                              Email
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditRound(round)}
                              className="text-xs"
                            >
                              <Edit3 className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRescheduleRound(round)}
                              className="text-xs"
                            >
                              <RotateCcw className="w-3 h-3 mr-1" />
                              Reschedule
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteRound(round.id)}
                              className="text-xs text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {getFilteredRounds().length === 0 && (
                  <div className="text-center py-12">
                    <Clock className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      No {adminConfig[activeRoundType]?.name} Rounds Yet
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Create your first {activeRoundType} round to get started with the interview process.
                    </p>
                    <Button
                      onClick={() => {
                        resetForm();
                        setShowRoundModal(true);
                      }}
                      className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create First Round
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Add/Edit Round Modal */}
      <Dialog open={showRoundModal} onOpenChange={setShowRoundModal}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Interview Round" : "Add New Interview Round"}
            </DialogTitle>
            <DialogDescription>
              Configure the interview round details and settings.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Round Header <span className="text-red-500">*</span>
                </label>
                <Input
                  value={roundForm.roundHeader}
                  onChange={(e) => setRoundForm(prev => ({ ...prev, roundHeader: e.target.value }))}
                  placeholder="e.g., Round 1, Round 2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Round Name <span className="text-red-500">*</span>
                </label>
                <Input
                  value={roundForm.roundName}
                  onChange={(e) => setRoundForm(prev => ({ ...prev, roundName: e.target.value }))}
                  placeholder="e.g., Technical Assessment"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Round Type <span className="text-red-500">*</span>
                </label>
                <Select
                  value={roundForm.roundType}
                  onValueChange={(value: any) => setRoundForm(prev => ({ ...prev, roundType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="non-technical">Non-Technical</SelectItem>
                    <SelectItem value="final">Final</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Interview Mode <span className="text-red-500">*</span>
                </label>
                <Select
                  value={roundForm.interviewMode}
                  onValueChange={(value: any) => setRoundForm(prev => ({ ...prev, interviewMode: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online-assessment">Online Assessment</SelectItem>
                    <SelectItem value="video-call">Video Call</SelectItem>
                    <SelectItem value="in-person">In-Person</SelectItem>
                    <SelectItem value="oral-assessment">Oral Assessment</SelectItem>
                    <SelectItem value="group-assessment">Group Assessment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Test Description
              </label>
              <Textarea
                value={roundForm.testDescription}
                onChange={(e) => setRoundForm(prev => ({ ...prev, testDescription: e.target.value }))}
                placeholder="Optional description of the test associated with the round"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Round Scheduled Date <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  value={roundForm.scheduledDate}
                  onChange={(e) => setRoundForm(prev => ({ ...prev, scheduledDate: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Round Schedule Time <span className="text-red-500">*</span>
                </label>
                <Input
                  type="time"
                  value={roundForm.scheduledTime}
                  onChange={(e) => setRoundForm(prev => ({ ...prev, scheduledTime: e.target.value }))}
                />
              </div>
            </div>

            {/* File Upload Section */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Attach Test Files
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload test documents or files</p>
                <p className="text-xs text-gray-500 mt-1">DOC, PDF, Excel, JPG, PNG, MP4, MP5</p>
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowRoundModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={isEditing ? handleUpdateRound : handleCreateRound}
              disabled={!roundForm.roundName || !roundForm.scheduledDate || !roundForm.scheduledTime}
              className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white"
            >
              {isEditing ? "Save Round" : "Add Round"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
