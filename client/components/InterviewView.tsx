import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  RotateCcw,
  UserPlus,
  Filter,
  AlertTriangle,
  Target,
  Copy,
  ArrowRight,
  Check,
  Menu,
  PanelLeftClose
} from "lucide-react";

interface InterviewCandidate {
  id: string;
  applicantName: string;
  appliedPosition: string;
  department: string;
  currentRound: "Technical Assessment Round 1" | "Technical Round 2" | "Non Technical Round 2";
  status: "in-progress" | "completed" | "pending";
  email?: string;
  phone?: string;
  assignedRounds?: string[];
  missingRounds?: string[];
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

interface RoundTemplate {
  id: string;
  name: string;
  description: string;
  rounds: {
    roundName: string;
    roundType: "technical" | "non-technical" | "final";
    interviewMode: string;
    order: number;
  }[];
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
    currentRound: "Technical Assessment Round 1",
    status: "in-progress",
    email: "sarah.mitchell@email.com",
    phone: "+1 (555) 123-4567",
    assignedRounds: ["tech-1", "tech-2"],
    missingRounds: ["nt-1"],
  },
  {
    id: "2",
    applicantName: "James Rodriguez",
    appliedPosition: "Product Manager",
    department: "Product",
    currentRound: "Non Technical Round 2",
    status: "completed",
    email: "james.rodriguez@email.com",
    phone: "+1 (555) 234-5678",
    assignedRounds: ["nt-1", "final-1"],
    missingRounds: [],
  },
  {
    id: "3",
    applicantName: "Emily Chen",
    appliedPosition: "UX Designer",
    department: "Design",
    currentRound: "Technical Round 2",
    status: "pending",
    email: "emily.chen@email.com",
    phone: "+1 (555) 345-6789",
    assignedRounds: ["nt-1"],
    missingRounds: ["tech-1", "final-1"],
  },
  {
    id: "4",
    applicantName: "Michael Thompson",
    appliedPosition: "Data Analyst",
    department: "Analytics",
    currentRound: "Technical Assessment Round 1",
    status: "in-progress",
    email: "michael.thompson@email.com",
    phone: "+1 (555) 456-7890",
    assignedRounds: ["tech-1"],
    missingRounds: ["nt-1", "final-1"],
  },
  {
    id: "5",
    applicantName: "Jessica Wang",
    appliedPosition: "Marketing Specialist",
    department: "Marketing",
    currentRound: "Non Technical Round 2",
    status: "pending",
    email: "jessica.wang@email.com",
    phone: "+1 (555) 567-8901",
    assignedRounds: ["nt-1"],
    missingRounds: [],
  },
  {
    id: "6",
    applicantName: "David Park",
    appliedPosition: "DevOps Engineer",
    department: "Engineering",
    currentRound: "Technical Round 2",
    status: "in-progress",
    email: "david.park@email.com",
    phone: "+1 (555) 678-9012",
    assignedRounds: ["tech-1", "tech-2"],
    missingRounds: ["nt-1"],
  },
  {
    id: "7",
    applicantName: "Amanda Foster",
    appliedPosition: "Business Analyst",
    department: "Operations",
    currentRound: "Technical Assessment Round 1",
    status: "completed",
    email: "amanda.foster@email.com",
    phone: "+1 (555) 789-0123",
    assignedRounds: ["nt-1", "final-1"],
    missingRounds: [],
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
    candidates: ["2", "3", "7"],
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
    candidates: ["2", "7"],
  },
];

// Round Templates
const roundTemplates: RoundTemplate[] = [
  {
    id: "software-engineer",
    name: "Software Engineer Template",
    description: "Complete interview process for software engineering roles",
    rounds: [
      { roundName: "Technical Screening", roundType: "technical", interviewMode: "online-assessment", order: 1 },
      { roundName: "System Design", roundType: "technical", interviewMode: "video-call", order: 2 },
      { roundName: "Behavioral Interview", roundType: "non-technical", interviewMode: "video-call", order: 3 },
      { roundName: "Final Interview", roundType: "final", interviewMode: "in-person", order: 4 },
    ],
  },
  {
    id: "product-manager",
    name: "Product Manager Template",
    description: "Interview process for product management roles",
    rounds: [
      { roundName: "Product Case Study", roundType: "non-technical", interviewMode: "video-call", order: 1 },
      { roundName: "Strategy Discussion", roundType: "non-technical", interviewMode: "video-call", order: 2 },
      { roundName: "Executive Review", roundType: "final", interviewMode: "in-person", order: 3 },
    ],
  },
  {
    id: "designer",
    name: "Designer Template",
    description: "Interview process for design roles",
    rounds: [
      { roundName: "Portfolio Review", roundType: "non-technical", interviewMode: "video-call", order: 1 },
      { roundName: "Design Challenge", roundType: "technical", interviewMode: "video-call", order: 2 },
      { roundName: "Team Fit Interview", roundType: "final", interviewMode: "in-person", order: 3 },
    ],
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

export default function InterviewView() {
  // Main Panel States
  const [activeMainTab, setActiveMainTab] = useState("interview-status");

  // Rounds Room States
  const [activeRoundType, setActiveRoundType] = useState<"technical" | "non-technical" | "final">("technical");
  const [rounds, setRounds] = useState<InterviewRound[]>(defaultInterviewRounds);
  const [selectedRound, setSelectedRound] = useState<InterviewRound | null>(null);
  const [showRoundModal, setShowRoundModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Assignment States
  const [showBulkAssignModal, setShowBulkAssignModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedCandidatesForAssignment, setSelectedCandidatesForAssignment] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<RoundTemplate | null>(null);
  const [bulkSelectedRounds, setBulkSelectedRounds] = useState<string[]>([]);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState(interviewCandidates);
  const [assignmentFilter, setAssignmentFilter] = useState<"all" | "missing" | "partial" | "complete">("all");

  // New Rounds Room Interface States
  const [searchCandidates, setSearchCandidates] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [country, setCountry] = useState("");
  const [expandedRound, setExpandedRound] = useState<number>(1);
  const [currentRoundForm, setCurrentRoundForm] = useState({
    roundName: "Project Design",
    roundType: "Telephone",
    interviewMode: "Online Interview",
    scheduledDate: "",
    scheduledTime: "",
    roundDetails: "One-On-One Discussion with the Marketing Manager",
    submissionDeadline: "",
    sendRound: "Applicant, Group of Applicants, Job Role"
  });

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
    filterCandidates(query, assignmentFilter);
  };

  const filterCandidates = (query: string, filter: string) => {
    let candidates = interviewCandidates;

    // Apply search filter
    if (query.trim()) {
      candidates = candidates.filter(candidate => {
        const searchTerms = query.toLowerCase().split(' ');
        const candidateText = `${candidate.applicantName} ${candidate.email} ${candidate.appliedPosition} ${candidate.department}`.toLowerCase();

        return searchTerms.every(term => {
          return candidateText.includes(term) ||
                 candidateText.split(' ').some(word =>
                   word.startsWith(term) ||
                   word.includes(term.substring(0, Math.max(2, term.length - 1)))
                 );
        });
      });
    }

    // Apply assignment filter
    switch (filter) {
      case "missing":
        candidates = candidates.filter(c => !c.assignedRounds || c.assignedRounds.length === 0);
        break;
      case "partial":
        candidates = candidates.filter(c => c.missingRounds && c.missingRounds.length > 0 && c.assignedRounds && c.assignedRounds.length > 0);
        break;
      case "complete":
        candidates = candidates.filter(c => !c.missingRounds || c.missingRounds.length === 0);
        break;
    }

    setFilteredCandidates(candidates);
  };

  const handleAssignmentFilterChange = (filter: "all" | "missing" | "partial" | "complete") => {
    setAssignmentFilter(filter);
    filterCandidates(searchQuery, filter);
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

  // Assignment Functions
  const handleBulkAssign = () => {
    if (activeMainTab !== "rounds-room") return;
    setShowBulkAssignModal(true);
  };

  const handleCandidateSelectionToggle = (candidateId: string) => {
    setSelectedCandidatesForAssignment(prev =>
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleRoundSelectionToggle = (roundId: string) => {
    setBulkSelectedRounds(prev =>
      prev.includes(roundId)
        ? prev.filter(id => id !== roundId)
        : [...prev, roundId]
    );
  };

  const handleBulkAssignmentSave = () => {
    // Update rounds to include selected candidates
    setRounds(prev => prev.map(round => {
      if (bulkSelectedRounds.includes(round.id)) {
        const newCandidates = [...new Set([...round.candidates, ...selectedCandidatesForAssignment])];
        return { ...round, candidates: newCandidates };
      }
      return round;
    }));

    // Reset states
    setShowBulkAssignModal(false);
    setSelectedCandidatesForAssignment([]);
    setBulkSelectedRounds([]);
  };

  const handleTemplateAssign = (template: RoundTemplate) => {
    if (activeMainTab !== "rounds-room") return;
    setSelectedTemplate(template);
    setShowTemplateModal(true);
  };

  const applyTemplate = () => {
    if (!selectedTemplate || selectedCandidatesForAssignment.length === 0) return;

    // Create rounds from template if they don't exist
    const newRounds = selectedTemplate.rounds.map(templateRound => ({
      id: `${templateRound.roundType}-${Date.now()}-${templateRound.order}`,
      roundHeader: `Round ${templateRound.order}`,
      roundName: templateRound.roundName,
      roundType: templateRound.roundType,
      interviewMode: templateRound.interviewMode as any,
      testDescription: "",
      attachedFiles: [],
      scheduledDate: "",
      scheduledTime: "",
      status: "incomplete" as "completed" | "incomplete",
      candidates: selectedCandidatesForAssignment,
    }));

    setRounds(prev => [...prev, ...newRounds]);
    setShowTemplateModal(false);
    setSelectedTemplate(null);
    setSelectedCandidatesForAssignment([]);
  };

  // Get candidate details by ID
  const getCandidateById = (id: string) => {
    return interviewCandidates.find(candidate => candidate.id === id);
  };

  // Get assigned rounds for a candidate
  const getAssignedRounds = (candidateId: string) => {
    return rounds.filter(round => round.candidates.includes(candidateId));
  };

  // Get round progress for a candidate
  const getRoundProgress = (candidate: InterviewCandidate) => {
    const assigned = candidate.assignedRounds?.length || 0;
    const missing = candidate.missingRounds?.length || 0;
    const total = assigned + missing;
    return { assigned, missing, total, completion: total > 0 ? (assigned / total) * 100 : 0 };
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs with Search */}
      <div className="border-b border-border">
        <div className="flex items-center justify-between">
          <Tabs
            value={activeMainTab}
            onValueChange={setActiveMainTab}
            className="flex-1"
          >
            <TabsList className="h-auto p-0 bg-transparent border-0">
              <TabsTrigger
                value="interview-status"
                className="relative border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-6 py-3"
              >
                <Users className="w-4 h-4 mr-2" />
                Interview Status
              </TabsTrigger>
              <TabsTrigger
                value="rounds-room"
                className="relative border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-6 py-3"
              >
                <Settings className="w-4 h-4 mr-2" />
                Rounds Room
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Search Bar */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name, email, job title..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="h-[calc(100vh-200px)]">
        {/* Main Content */}
        <div className="w-full overflow-y-auto">
          {activeMainTab === "interview-status" && (
            <div className="space-y-4">
              {/* Interview Table based on provided image */}
              <Card className="border-0 shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30 border-b">
                        <TableHead className="text-center font-medium text-foreground py-2 text-xs">
                          JOB_ID
                        </TableHead>
                        <TableHead className="font-medium text-foreground py-2 text-xs">
                          NAME
                        </TableHead>
                        <TableHead className="font-medium text-foreground py-2 text-xs">
                          COUNTRY
                        </TableHead>
                        <TableHead className="font-medium text-foreground py-2 text-xs">
                          APPLIED_JOB_ROLE
                        </TableHead>
                        <TableHead className="font-medium text-foreground py-2 text-xs">
                          CURRENT_ROUND
                        </TableHead>
                        <TableHead className="font-medium text-foreground py-2 text-xs">
                          NEXT_ROUND
                        </TableHead>
                        <TableHead className="font-medium text-foreground py-2 text-xs">
                          INTERVIEW_PROGRESS
                        </TableHead>
                        <TableHead className="font-medium text-foreground py-2 text-xs">
                          UPDATE
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="hover:bg-muted/20 transition-colors border-b border-border/40">
                        <TableCell className="text-center font-medium text-foreground py-3 text-xs">001</TableCell>
                        <TableCell className="py-3 text-xs">Jaya</TableCell>
                        <TableCell className="py-3 text-xs">India</TableCell>
                        <TableCell className="py-3 text-xs">Senior Developer</TableCell>
                        <TableCell className="py-3 text-xs">Managerial - 4/5</TableCell>
                        <TableCell className="py-3 text-xs">Human Resources - 5/5</TableCell>
                        <TableCell className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full" style={{width: '90%'}}></div>
                            </div>
                            <span className="text-xs font-medium">90%</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <Button size="sm" className="bg-black hover:bg-gray-800 text-white font-medium px-2 py-1 text-xs h-6">
                            EMAIL
                          </Button>
                        </TableCell>
                      </TableRow>

                      <TableRow className="hover:bg-muted/20 transition-colors border-b border-border/40">
                        <TableCell className="text-center font-medium text-foreground py-3 text-xs">002</TableCell>
                        <TableCell className="py-3 text-xs">Mark</TableCell>
                        <TableCell className="py-3 text-xs">USA</TableCell>
                        <TableCell className="py-3 text-xs">Graphic Designer</TableCell>
                        <TableCell className="py-3 text-xs">Managerial - 4/5</TableCell>
                        <TableCell className="py-3 text-xs">Human Resources - 5/5</TableCell>
                        <TableCell className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full" style={{width: '90%'}}></div>
                            </div>
                            <span className="text-xs font-medium">90%</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <Button size="sm" className="bg-black hover:bg-gray-800 text-white font-medium px-2 py-1 text-xs h-6">
                            EMAIL
                          </Button>
                        </TableCell>
                      </TableRow>

                      <TableRow className="hover:bg-muted/20 transition-colors border-b border-border/40">
                        <TableCell className="text-center font-medium text-foreground py-3 text-xs">003</TableCell>
                        <TableCell className="py-3 text-xs">John</TableCell>
                        <TableCell className="py-3 text-xs">USA</TableCell>
                        <TableCell className="py-3 text-xs">Content writer</TableCell>
                        <TableCell className="py-3 text-xs">Human Resources - 5/5</TableCell>
                        <TableCell className="py-3 text-xs">NO ROUNDS</TableCell>
                        <TableCell className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                            </div>
                            <span className="text-xs font-medium">100%</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <Button size="sm" className="bg-black hover:bg-gray-800 text-white font-medium px-2 py-1 text-xs h-6">
                            EMAIL
                          </Button>
                        </TableCell>
                      </TableRow>

                      <TableRow className="hover:bg-muted/20 transition-colors border-b border-border/40">
                        <TableCell className="text-center font-medium text-foreground py-3 text-xs">004</TableCell>
                        <TableCell className="py-3 text-xs">Sara</TableCell>
                        <TableCell className="py-3 text-xs">Europe</TableCell>
                        <TableCell className="py-3 text-xs">Copywriter</TableCell>
                        <TableCell className="py-3 text-xs">Editing Test - 4/5</TableCell>
                        <TableCell className="py-3 text-xs">Human Resources - 5/5</TableCell>
                        <TableCell className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full" style={{width: '90%'}}></div>
                            </div>
                            <span className="text-xs font-medium">90%</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <Button size="sm" className="bg-black hover:bg-gray-800 text-white font-medium px-2 py-1 text-xs h-6">
                            EMAIL
                          </Button>
                        </TableCell>
                      </TableRow>

                      <TableRow className="hover:bg-muted/20 transition-colors border-b border-border/40">
                        <TableCell className="text-center font-medium text-foreground py-3 text-xs">005</TableCell>
                        <TableCell className="py-3 text-xs">Shruti</TableCell>
                        <TableCell className="py-3 text-xs">India</TableCell>
                        <TableCell className="py-3 text-xs">Sale Associate</TableCell>
                        <TableCell className="py-3 text-xs">Culture Test - 3/5</TableCell>
                        <TableCell className="py-3 text-xs">Case Study Debate - 4/5</TableCell>
                        <TableCell className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full" style={{width: '70%'}}></div>
                            </div>
                            <span className="text-xs font-medium">70%</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <Button size="sm" className="bg-black hover:bg-gray-800 text-white font-medium px-2 py-1 text-xs h-6">
                            EMAIL
                          </Button>
                        </TableCell>
                      </TableRow>

                      <TableRow className="hover:bg-muted/20 transition-colors border-b border-border/40">
                        <TableCell className="text-center font-medium text-foreground py-3 text-xs">006</TableCell>
                        <TableCell className="py-3 text-xs">Robin</TableCell>
                        <TableCell className="py-3 text-xs">Russia</TableCell>
                        <TableCell className="py-3 text-xs">AI Engineer</TableCell>
                        <TableCell className="py-3 text-xs">Project Design - 3/5</TableCell>
                        <TableCell className="py-3 text-xs">Behavioral - 4/5</TableCell>
                        <TableCell className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" style={{width: '60%'}}></div>
                            </div>
                            <span className="text-xs font-medium">60%</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <Button size="sm" className="bg-black hover:bg-gray-800 text-white font-medium px-2 py-1 text-xs h-6">
                            EMAIL
                          </Button>
                        </TableCell>
                      </TableRow>

                      <TableRow className="hover:bg-muted/20 transition-colors border-b border-border/40">
                        <TableCell className="text-center font-medium text-foreground py-3 text-xs">007</TableCell>
                        <TableCell className="py-3 text-xs">Kayle</TableCell>
                        <TableCell className="py-3 text-xs">Russia</TableCell>
                        <TableCell className="py-3 text-xs">ML Engineer</TableCell>
                        <TableCell className="py-3 text-xs">Human Resources - 5/5</TableCell>
                        <TableCell className="py-3 text-xs">NO ROUNDS</TableCell>
                        <TableCell className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                            </div>
                            <span className="text-xs font-medium">100%</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <Button size="sm" className="bg-black hover:bg-gray-800 text-white font-medium px-2 py-1 text-xs h-6">
                            EMAIL
                          </Button>
                        </TableCell>
                      </TableRow>

                      <TableRow className="hover:bg-muted/20 transition-colors border-b border-border/40">
                        <TableCell className="text-center font-medium text-foreground py-3 text-xs">008</TableCell>
                        <TableCell className="py-3 text-xs">Vali</TableCell>
                        <TableCell className="py-3 text-xs">China</TableCell>
                        <TableCell className="py-3 text-xs">Data Analyst</TableCell>
                        <TableCell className="py-3 text-xs">Data Analysis - 4/5</TableCell>
                        <TableCell className="py-3 text-xs">Human Resources - 5/5</TableCell>
                        <TableCell className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full" style={{width: '90%'}}></div>
                            </div>
                            <span className="text-xs font-medium">90%</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <Button size="sm" className="bg-black hover:bg-gray-800 text-white font-medium px-2 py-1 text-xs h-6">
                            EMAIL
                          </Button>
                        </TableCell>
                      </TableRow>

                      <TableRow className="hover:bg-muted/20 transition-colors border-b border-border/40">
                        <TableCell className="text-center font-medium text-foreground py-3 text-xs">009</TableCell>
                        <TableCell className="py-3 text-xs">Anne</TableCell>
                        <TableCell className="py-3 text-xs">Canada</TableCell>
                        <TableCell className="py-3 text-xs">Finance Analyst</TableCell>
                        <TableCell className="py-3 text-xs">Business Analysis - 2/5</TableCell>
                        <TableCell className="py-3 text-xs">Case Study Debate - 3/5</TableCell>
                        <TableCell className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full" style={{width: '40%'}}></div>
                            </div>
                            <span className="text-xs font-medium">40%</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <Button size="sm" className="bg-black hover:bg-gray-800 text-white font-medium px-2 py-1 text-xs h-6">
                            EMAIL
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeMainTab === "rounds-room" && (
            <div className="space-y-3">
              {/* Search Filters */}
              <div className="flex items-center gap-2 mb-4">
                <Select value={searchCandidates} onValueChange={setSearchCandidates}>
                  <SelectTrigger className="w-40 h-7 text-xs">
                    <SelectValue placeholder="SEARCH CANDIDATES" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Candidates</SelectItem>
                    <SelectItem value="selected">Selected</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={jobRole} onValueChange={setJobRole}>
                  <SelectTrigger className="w-32 h-7 text-xs">
                    <SelectValue placeholder="JOB_ROLE" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="w-32 h-7 text-xs">
                    <SelectValue placeholder="COUNTRY" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usa">USA</SelectItem>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="uk">UK</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white h-7 px-3 text-xs">
                  ADD NEW ROUND
                </Button>
              </div>

              {/* Round Type Tabs */}
              <div className="flex gap-1 mb-4">
                <Button
                  variant={activeRoundType === "technical" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveRoundType("technical")}
                  className="h-7 px-4 text-xs bg-red-600 text-white hover:bg-red-700"
                >
                  TECHNICAL
                </Button>
                <Button
                  variant={activeRoundType === "non-technical" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveRoundType("non-technical")}
                  className="h-7 px-4 text-xs"
                >
                  NON-TECHNICAL
                </Button>
                <Button
                  variant={activeRoundType === "final" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveRoundType("final")}
                  className="h-7 px-4 text-xs"
                >
                  FINAL
                </Button>
              </div>

              {/* Rounds */}
              <div className="space-y-2">
                {/* ROUND 1 - Expanded */}
                <Card className="border-2 border-gray-300">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-sm">ROUND 1</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedRound(expandedRound === 1 ? 0 : 1)}
                        className="h-6 w-6 p-0"
                      >
                        {expandedRound === 1 ? "▲" : "▼"}
                      </Button>
                    </div>

                    {expandedRound === 1 && (
                      <div className="space-y-3">
                        {/* Form Grid */}
                        <div className="grid grid-cols-5 gap-2 text-xs">
                          <div>
                            <label className="block text-xs font-medium mb-1">Round Name</label>
                            <Select value={currentRoundForm.roundName} onValueChange={(value) => setCurrentRoundForm(prev => ({...prev, roundName: value}))}>
                              <SelectTrigger className="h-6 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Project Design">Project Design</SelectItem>
                                <SelectItem value="System Design">System Design</SelectItem>
                                <SelectItem value="Code Review">Code Review</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="block text-xs font-medium mb-1">Round Type</label>
                            <Select value={currentRoundForm.roundType} onValueChange={(value) => setCurrentRoundForm(prev => ({...prev, roundType: value}))}>
                              <SelectTrigger className="h-6 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Telephone">Telephone</SelectItem>
                                <SelectItem value="Video Call">Video Call</SelectItem>
                                <SelectItem value="In Person">In Person</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="block text-xs font-medium mb-1">Interview Mode</label>
                            <Select value={currentRoundForm.interviewMode} onValueChange={(value) => setCurrentRoundForm(prev => ({...prev, interviewMode: value}))}>
                              <SelectTrigger className="h-6 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Online Interview">Online Interview</SelectItem>
                                <SelectItem value="Assessment">Assessment</SelectItem>
                                <SelectItem value="Presentation">Presentation</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="block text-xs font-medium mb-1">Scheduled Date</label>
                            <Input
                              type="date"
                              value={currentRoundForm.scheduledDate}
                              onChange={(e) => setCurrentRoundForm(prev => ({...prev, scheduledDate: e.target.value}))}
                              className="h-6 text-xs"
                              placeholder="MM/DD/YYY"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium mb-1">Scheduled Time</label>
                            <Input
                              type="time"
                              value={currentRoundForm.scheduledTime}
                              onChange={(e) => setCurrentRoundForm(prev => ({...prev, scheduledTime: e.target.value}))}
                              className="h-6 text-xs"
                              placeholder="HH:MM AM/PM"
                            />
                          </div>
                        </div>

                        {/* Round Details */}
                        <div>
                          <label className="block text-xs font-medium mb-1">Round Details</label>
                          <Textarea
                            value={currentRoundForm.roundDetails}
                            onChange={(e) => setCurrentRoundForm(prev => ({...prev, roundDetails: e.target.value}))}
                            className="h-16 text-xs resize-none"
                            placeholder="Add Round Description Here"
                          />
                        </div>

                        {/* Additional Fields */}
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-medium mb-1">Assignment Submission Deadline:</label>
                            <Input
                              type="date"
                              value={currentRoundForm.submissionDeadline}
                              onChange={(e) => setCurrentRoundForm(prev => ({...prev, submissionDeadline: e.target.value}))}
                              className="h-6 text-xs"
                              placeholder="Select the date from the calendar"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium mb-1">Send Round:</label>
                            <Select value={currentRoundForm.sendRound} onValueChange={(value) => setCurrentRoundForm(prev => ({...prev, sendRound: value}))}>
                              <SelectTrigger className="h-6 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Applicant, Group of Applicants, Job Role">Applicant, Group of Applicants, Job Role</SelectItem>
                                <SelectItem value="Individual Applicant">Individual Applicant</SelectItem>
                                <SelectItem value="Group of Applicants">Group of Applicants</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-3">
                          <Button className="bg-black hover:bg-gray-800 text-white h-7 px-3 text-xs">
                            EDIT THIS TEMPLATE
                          </Button>
                          <Button className="bg-black hover:bg-gray-800 text-white h-7 px-3 text-xs">
                            SAVE ROUND
                          </Button>
                          <Button className="bg-black hover:bg-gray-800 text-white h-7 px-3 text-xs">
                            EMAIL
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* ROUND 2 - Collapsed */}
                <Card className="border-2 border-red-500 bg-red-600">
                  <CardContent className="p-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-white">ROUND 2</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedRound(expandedRound === 2 ? 0 : 2)}
                        className="h-6 w-6 p-0 text-white hover:bg-red-700"
                      >
                        ▼
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* ROUND 3 - Collapsed */}
                <Card className="border-2 border-red-500 bg-red-600">
                  <CardContent className="p-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-white">ROUND 3</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedRound(expandedRound === 3 ? 0 : 3)}
                        className="h-6 w-6 p-0 text-white hover:bg-red-700"
                      >
                        ▼
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* ROUND 4 - Collapsed */}
                <Card className="border-2 border-red-500 bg-red-600">
                  <CardContent className="p-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-white">ROUND 4</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedRound(expandedRound === 4 ? 0 : 4)}
                        className="h-6 w-6 p-0 text-white hover:bg-red-700"
                      >
                        ▼
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Add New Round Text */}
              <div className="text-center mt-6 pt-4">
                <p className="text-gray-500 text-sm mb-1">Want to add another round?</p>
                <p className="text-emerald-600 font-medium text-sm cursor-pointer hover:text-emerald-700">
                  Click "ADD NEW ROUND"
                </p>
              </div>
            </div>
          )}
        </div>
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

      {/* Bulk Assignment Modal */}
      <Dialog open={showBulkAssignModal} onOpenChange={setShowBulkAssignModal}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Bulk Assign Rounds to Candidates
            </DialogTitle>
            <DialogDescription>
              Select candidates and rounds to create bulk assignments.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6">
            {/* Candidates Selection */}
            <div>
              <h3 className="font-semibold mb-4">Select Candidates ({selectedCandidatesForAssignment.length} selected)</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {interviewCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <Checkbox
                      checked={selectedCandidatesForAssignment.includes(candidate.id)}
                      onCheckedChange={() => handleCandidateSelectionToggle(candidate.id)}
                    />
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                      <span className="text-primary font-medium text-xs">
                        {candidate.applicantName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground text-sm">
                        {candidate.applicantName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {candidate.appliedPosition} • {candidate.department}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(candidate.status)}`}
                      >
                        {candidate.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rounds Selection */}
            <div>
              <h3 className="font-semibold mb-4">Select Rounds ({bulkSelectedRounds.length} selected)</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {rounds.map((round) => (
                  <div
                    key={round.id}
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <Checkbox
                      checked={bulkSelectedRounds.includes(round.id)}
                      onCheckedChange={() => handleRoundSelectionToggle(round.id)}
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-foreground text-sm">
                        {round.roundName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {round.roundType} • {round.interviewMode}
                      </div>
                      <div className="text-xs text-gray-500">
                        {round.scheduledDate} at {round.scheduledTime}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="text-xs">
                        {round.candidates.length} assigned
                      </Badge>
                      <Badge
                        variant={round.status === "completed" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {round.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          {selectedCandidatesForAssignment.length > 0 && bulkSelectedRounds.length > 0 && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">Assignment Summary</h4>
              <p className="text-sm text-blue-700">
                You are about to assign <strong>{bulkSelectedRounds.length} rounds</strong> to <strong>{selectedCandidatesForAssignment.length} candidates</strong>.
                This will create {selectedCandidatesForAssignment.length * bulkSelectedRounds.length} new assignments.
              </p>
            </div>
          )}

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowBulkAssignModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleBulkAssignmentSave}
              disabled={selectedCandidatesForAssignment.length === 0 || bulkSelectedRounds.length === 0}
              className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Assign Rounds
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Template Assignment Modal */}
      <Dialog open={showTemplateModal} onOpenChange={setShowTemplateModal}>
        <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Use Round Templates</DialogTitle>
            <DialogDescription>
              Apply pre-defined round templates to streamline your interview process.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Template Selection */}
            <div>
              <h3 className="font-semibold mb-4">Select Template</h3>
              <div className="grid gap-4">
                {roundTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all ${
                      selectedTemplate?.id === template.id
                        ? "ring-2 ring-primary bg-primary/5"
                        : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{template.name}</h4>
                          <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {template.rounds.map((round, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {round.order}. {round.roundName}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            selectedTemplate?.id === template.id 
                              ? "border-primary bg-primary" 
                              : "border-gray-300"
                          }`}>
                            {selectedTemplate?.id === template.id && (
                              <Check className="w-2 h-2 text-white m-0.5" />
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Candidate Selection for Template */}
            {selectedTemplate && (
              <div>
                <h3 className="font-semibold mb-4">Select Candidates for Template</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {interviewCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleCandidateSelectionToggle(candidate.id)}
                    >
                      <Checkbox
                        checked={selectedCandidatesForAssignment.includes(candidate.id)}
                        onCheckedChange={() => handleCandidateSelectionToggle(candidate.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                        <span className="text-primary font-medium text-xs">
                          {candidate.applicantName.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground text-sm">
                          {candidate.applicantName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {candidate.appliedPosition} • {candidate.department}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Template Preview */}
            {selectedTemplate && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-3">Template Preview: {selectedTemplate.name}</h4>
                <div className="space-y-2">
                  {selectedTemplate.rounds.map((round, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-medium text-xs">{round.order}</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{round.roundName}</div>
                        <div className="text-xs text-gray-500">{round.roundType} • {round.interviewMode}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => {
              setShowTemplateModal(false);
              setSelectedTemplate(null);
              setSelectedCandidatesForAssignment([]);
            }}>
              Cancel
            </Button>
            <Button
              onClick={applyTemplate}
              disabled={!selectedTemplate || selectedCandidatesForAssignment.length === 0}
              className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white"
            >
              <Copy className="w-4 h-4 mr-2" />
              Apply Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
