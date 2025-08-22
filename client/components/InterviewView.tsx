import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
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
  Copy,
  ArrowRight,
  Check
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

  // Round Type Enable/Disable States
  const [roundTypeEnabled, setRoundTypeEnabled] = useState({
    technical: true,
    "non-technical": true,
    final: true
  });

  // Email Screen States
  const [showEmailScreen, setShowEmailScreen] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [emailSearch, setEmailSearch] = useState("");
  const [activeEmailTab, setActiveEmailTab] = useState("");
  const [showEmailCompose, setShowEmailCompose] = useState(false);
  const [emailForm, setEmailForm] = useState({
    to: "jayamishra@gmail.com",
    subject: "Proposed Interview Time - Jaya Mishra",
    message: `Hi Jaya Mishra,

Thank you for your interest in Senior Developer role at Google India.

To schedule your second round of interview, please use the link below to view our calendar and choose a time that works for you:
https://ai2aim.com/google-india/schedule-interview-slot

Note that the red slots are already booked, and the empty slots are still available.
Once you book a slot, you'll receive a confirmation with the interview details.

If none of the available times work for you, or if you run into any issues while booking, feel free to reply to this email and we'll try to accommodate. Looking forward to speaking with you.

Best regards,
Kayle Jenny
HR Associate
Google India`
  });

  // Sample email data
  const emailData = [
    {
      id: "1",
      subject: "Application for Senior Developer - Request for Interview Scheduling",
      checked: false
    },
    {
      id: "2",
      subject: "Proposed Interview Time - Jaya Mishra",
      checked: false
    },
    {
      id: "3",
      subject: "Availability for Interview - Senior Developer Application",
      checked: false
    },
    {
      id: "4",
      subject: "Scheduling Interview for Senior Developer Position",
      checked: false
    },
    {
      id: "5",
      subject: "Confirming Availability for Interview - Jaya Mishra",
      checked: false
    }
  ];

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

  // Decision Confirmation Modal States
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState<{
    candidateId: string;
    candidateName: string;
    decision: "YES" | "MAYBE" | "NO";
    type: "round" | "final";
  } | null>(null);

  // Track confirmed decisions for button styling
  const [confirmedDecisions, setConfirmedDecisions] = useState<{
    [key: string]: { decision: "YES" | "MAYBE" | "NO"; type: "round" | "final" }
  }>({});

  // Email modal handlers
  const handleEmailDelete = (emailId: string) => {
    console.log("Deleting email:", emailId);
  };

  const handleComposeEmail = () => {
    setShowEmailCompose(true);
    setActiveEmailTab("inbox");
  };

  const handleSaveAsDraft = () => {
    console.log("Saving as draft:", emailForm);
    // Handle save as draft logic
  };

  const handleSendEmail = () => {
    console.log("Sending email:", emailForm);
    // Handle send email logic
    setShowEmailCompose(false);
  };

  const handleAttachFiles = () => {
    console.log("Opening file attachment");
    // Handle file attachment logic
  };

  // Decision confirmation handlers
  const handleDecisionClick = (candidateId: string, candidateName: string, decision: "YES" | "MAYBE" | "NO", type: "round" | "final") => {
    setSelectedDecision({ candidateId, candidateName, decision, type });
    setShowDecisionModal(true);
  };

  const handleConfirmDecision = () => {
    if (selectedDecision) {
      console.log(`Decision confirmed: ${selectedDecision.decision} for ${selectedDecision.candidateName} (${selectedDecision.type})`);

      // Save the confirmed decision for button styling
      const decisionKey = `${selectedDecision.candidateId}-${selectedDecision.type}`;
      setConfirmedDecisions(prev => ({
        ...prev,
        [decisionKey]: {
          decision: selectedDecision.decision,
          type: selectedDecision.type
        }
      }));

      setShowDecisionModal(false);
      setSelectedDecision(null);
    }
  };

  const handleCancelDecision = () => {
    setShowDecisionModal(false);
    setSelectedDecision(null);
  };

  // Helper function to get button styles based on confirmed decisions
  const getButtonStyles = (candidateId: string, buttonDecision: "YES" | "MAYBE" | "NO", type: "round" | "final") => {
    const decisionKey = `${candidateId}-${type}`;
    const confirmedDecision = confirmedDecisions[decisionKey];

    // If this specific button was confirmed, show it as filled/shaded
    if (confirmedDecision && confirmedDecision.decision === buttonDecision) {
      switch (buttonDecision) {
        case "YES":
          return "bg-green-600 border border-green-600 text-white hover:bg-green-700 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm";
        case "MAYBE":
          return "bg-orange-500 border border-orange-500 text-white hover:bg-orange-600 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm";
        case "NO":
          return "bg-red-600 border border-red-600 text-white hover:bg-red-700 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm";
      }
    }

    // Default transparent style with colored border
    switch (buttonDecision) {
      case "YES":
        return "bg-transparent border border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm";
      case "MAYBE":
        return "bg-transparent border border-orange-400 text-orange-600 hover:bg-orange-50 hover:border-orange-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm";
      case "NO":
        return "bg-transparent border border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm";
      default:
        return "bg-transparent border border-gray-400 text-gray-600 hover:bg-gray-50 hover:border-gray-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm";
    }
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
              <TabsTrigger
                value="decision-room"
                className="relative border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-6 py-3"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Decision Room
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

          {activeMainTab === "rounds-room" && !showEmailScreen && (
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

                <Button
                  onClick={() => setShowEmailScreen(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white h-7 px-3 text-xs"
                >
                  ADD NEW ROUND
                </Button>
              </div>

              {/* Round Type Tabs */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Button
                    variant={activeRoundType === "technical" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveRoundType("technical")}
                    className={`h-6 px-3 text-xs ${
                      activeRoundType === "technical"
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    TECHNICAL
                  </Button>
                  <Button
                    variant={activeRoundType === "non-technical" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveRoundType("non-technical")}
                    className={`h-6 px-3 text-xs ${
                      activeRoundType === "non-technical"
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    NON-TECHNICAL
                  </Button>
                  <Button
                    variant={activeRoundType === "final" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveRoundType("final")}
                    className={`h-6 px-3 text-xs ${
                      activeRoundType === "final"
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    FINAL
                  </Button>
                </div>

                {/* Switches only for TECHNICAL and NON-TECHNICAL */}
                <div className="flex items-center gap-3">
                  {(activeRoundType === "technical" || activeRoundType === "non-technical") && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium text-gray-600">
                        {activeRoundType.toUpperCase()}
                      </span>
                      <Switch
                        checked={roundTypeEnabled[activeRoundType]}
                        onCheckedChange={(checked) =>
                          setRoundTypeEnabled(prev => ({ ...prev, [activeRoundType]: checked }))
                        }
                        className="scale-75"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Rounds */}
              <div className="space-y-2">
                {/* Show disabled message if current round type is disabled */}
                {!roundTypeEnabled[activeRoundType] ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="text-gray-500 space-y-2">
                      <p className="text-sm font-medium">
                        Sorry!! There are no rounds here. If you have disabled the round, please enable to see all the rounds.
                      </p>
                      <p className="text-xs">
                        Find the best that fits the role with AI2AIM EMS. We simplified your hiring roadmap.
                      </p>
                      <p className="text-xs">
                        If you have any issues with this system, write to us at info@ai2aim.com
                      </p>
                      <p className="text-xs font-medium text-gray-700">
                        Happy Hiring!!
                      </p>
                    </div>

                    <div className="mt-8 space-y-1">
                      <p className="text-gray-500 text-xs">Want to add another round?</p>
                      <p className="text-emerald-600 font-medium text-xs cursor-pointer hover:text-emerald-700">
                        Click "ADD NEW ROUND"
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* ROUND 1 - Expanded */}
                    <Card className="border-2 border-gray-300">
                      <CardContent className="p-2">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-xs">ROUND 1</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedRound(expandedRound === 1 ? 0 : 1)}
                            className="h-5 w-5 p-0"
                          >
                            {expandedRound === 1 ? "▲" : "▼"}
                          </Button>
                        </div>

                    {expandedRound === 1 && (
                      <div className="space-y-3">
                        {/* Form Grid */}
                        <div className="grid grid-cols-5 gap-1 text-xs">
                          <div>
                            <label className="block text-xs font-medium mb-1">Round Name</label>
                            <Select value={currentRoundForm.roundName} onValueChange={(value) => setCurrentRoundForm(prev => ({...prev, roundName: value}))}>
                              <SelectTrigger className="h-5 text-xs">
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
                              <SelectTrigger className="h-5 text-xs">
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
                              <SelectTrigger className="h-5 text-xs">
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
                              className="h-5 text-xs"
                              placeholder="MM/DD/YYY"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium mb-1">Scheduled Time</label>
                            <Input
                              type="time"
                              value={currentRoundForm.scheduledTime}
                              onChange={(e) => setCurrentRoundForm(prev => ({...prev, scheduledTime: e.target.value}))}
                              className="h-5 text-xs"
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
                            className="h-12 text-xs resize-none"
                            placeholder="Add Round Description Here"
                          />
                        </div>

                        {/* Additional Fields */}
                        <div className="grid grid-cols-2 gap-1">
                          <div>
                            <label className="block text-xs font-medium mb-1">Assignment Submission Deadline:</label>
                            <Input
                              type="date"
                              value={currentRoundForm.submissionDeadline}
                              onChange={(e) => setCurrentRoundForm(prev => ({...prev, submissionDeadline: e.target.value}))}
                              className="h-5 text-xs"
                              placeholder="Select the date from the calendar"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium mb-1">Send Round:</label>
                            <Select value={currentRoundForm.sendRound} onValueChange={(value) => setCurrentRoundForm(prev => ({...prev, sendRound: value}))}>
                              <SelectTrigger className="h-5 text-xs">
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
                        <div className="flex gap-1 mt-2">
                          <Button className="bg-black hover:bg-gray-800 text-white h-6 px-2 text-xs">
                            EDIT THIS TEMPLATE
                          </Button>
                          <Button className="bg-black hover:bg-gray-800 text-white h-6 px-2 text-xs">
                            SAVE ROUND
                          </Button>
                          <Button className="bg-black hover:bg-gray-800 text-white h-6 px-2 text-xs">
                            EMAIL
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* ROUND 2 - Collapsed */}
                <Card className="border-2 border-red-500 bg-red-600">
                  <CardContent className="p-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xs text-white">ROUND 2</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedRound(expandedRound === 2 ? 0 : 2)}
                        className="h-5 w-5 p-0 text-white hover:bg-red-700"
                      >
                        ▼
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* ROUND 3 - Collapsed */}
                <Card className="border-2 border-red-500 bg-red-600">
                  <CardContent className="p-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xs text-white">ROUND 3</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedRound(expandedRound === 3 ? 0 : 3)}
                        className="h-5 w-5 p-0 text-white hover:bg-red-700"
                      >
                        ▼
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* ROUND 4 - Collapsed */}
                <Card className="border-2 border-red-500 bg-red-600">
                  <CardContent className="p-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xs text-white">ROUND 4</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedRound(expandedRound === 4 ? 0 : 4)}
                        className="h-5 w-5 p-0 text-white hover:bg-red-700"
                      >
                        ▼
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Add New Round Text */}
                <div className="text-center mt-4 pt-2">
                  <p className="text-gray-500 text-xs mb-1">Want to add another round?</p>
                  <p className="text-emerald-600 font-medium text-xs cursor-pointer hover:text-emerald-700">
                    Click "ADD NEW ROUND"
                  </p>
                </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Email Screen when showEmailScreen is true */}
          {activeMainTab === "rounds-room" && showEmailScreen && (
            <div className="h-full flex flex-col">
              {/* Back Button */}
              <div className="mb-4">
                <Button
                  onClick={() => setShowEmailScreen(false)}
                  variant="outline"
                  size="sm"
                  className="h-6 px-3 text-xs"
                >
                  ← Back to Rounds
                </Button>
              </div>

              {/* Email Interface */}
              <div className="flex-1 flex border border-gray-200 rounded">
                {/* Email Sidebar */}
                <div className="w-20 border-r border-gray-200 flex flex-col">
                  <Button
                    variant={activeEmailTab === "inbox" && showEmailCompose ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      setActiveEmailTab("inbox");
                      setShowEmailCompose(true);
                    }}
                    className={`h-6 text-xs font-medium mb-1 rounded-none ${
                      activeEmailTab === "inbox" && showEmailCompose
                        ? "bg-black text-white hover:bg-gray-800"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    INBOX
                  </Button>
                  <Button
                    variant={activeEmailTab === "sent" && !showEmailCompose ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      setActiveEmailTab("sent");
                      setShowEmailCompose(false);
                    }}
                    className={`h-6 text-xs font-medium mb-1 rounded-none ${
                      activeEmailTab === "sent" && !showEmailCompose
                        ? "bg-black text-white hover:bg-gray-800"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    SENT
                  </Button>
                  <Button
                    variant={activeEmailTab === "spam" && !showEmailCompose ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      setActiveEmailTab("spam");
                      setShowEmailCompose(false);
                    }}
                    className={`h-6 text-xs font-medium rounded-none ${
                      activeEmailTab === "spam" && !showEmailCompose
                        ? "bg-black text-white hover:bg-gray-800"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    SPAM
                  </Button>
                </div>

                {/* Email Content */}
                <div className="flex-1 flex flex-col">
                  {showEmailCompose ? (
                    /* Email Composition Interface */
                    <div className="flex-1 flex flex-col">
                      {/* Template Header */}
                      <div className="flex items-center justify-between p-2 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600">Email Templates for Video Interviews</span>
                          <Select defaultValue="neutral">
                            <SelectTrigger className="w-32 h-5 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="neutral">Choose from the Template Styles</SelectItem>
                              <SelectItem value="formal">Formal</SelectItem>
                              <SelectItem value="casual">Casual</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                              ‹
                            </Button>
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                              ›
                            </Button>
                          </div>
                        </div>
                        <Button className="bg-black hover:bg-gray-800 text-white h-6 px-3 text-xs">
                          COMPOSE EMAIL
                        </Button>
                      </div>

                      {/* Template Selection */}
                      <div className="flex justify-center p-2 border-b border-gray-200">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                            ‹
                          </Button>
                          <Button variant="outline" size="sm" className="h-6 px-3 text-xs">
                            NEUTRAL TEMPLATE
                          </Button>
                          <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                            ›
                          </Button>
                        </div>
                      </div>

                      {/* Email Form */}
                      <div className="flex-1 p-3 space-y-2 overflow-y-auto">
                        {/* To Field */}
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-gray-700">To</label>
                          <Input
                            value={emailForm.to}
                            onChange={(e) => setEmailForm(prev => ({ ...prev, to: e.target.value }))}
                            className="h-6 text-xs"
                          />
                        </div>

                        {/* Subject Field */}
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-gray-700">Subject</label>
                          <Input
                            value={emailForm.subject}
                            onChange={(e) => setEmailForm(prev => ({ ...prev, subject: e.target.value }))}
                            className="h-6 text-xs"
                          />
                        </div>

                        {/* Message Field */}
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-medium text-gray-700">Message</label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleAttachFiles}
                              className="h-6 px-2 text-xs"
                            >
                              <Upload className="w-3 h-3 mr-1" />
                              ATTACH FILES
                            </Button>
                          </div>
                          <Textarea
                            value={emailForm.message}
                            onChange={(e) => setEmailForm(prev => ({ ...prev, message: e.target.value }))}
                            className="min-h-[300px] text-xs resize-none"
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 pt-2">
                          <Button
                            variant="outline"
                            onClick={handleSaveAsDraft}
                            className="bg-yellow-400 hover:bg-yellow-500 text-black h-7 px-3 text-xs"
                          >
                            SAVE AS DRAFT
                          </Button>
                          <Button
                            onClick={handleSendEmail}
                            className="bg-blue-600 hover:bg-blue-700 text-white h-7 px-3 text-xs"
                          >
                            SEND EMAIL
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleSendEmail}
                            className="h-7 w-7 p-0 ml-auto"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Default Email List View */
                    <>
                      {/* Search and Compose Header */}
                      <div className="flex items-center gap-2 p-2 border-b border-gray-200">
                        <Input
                          placeholder="SEARCH MAIL/CHAT"
                          value={emailSearch}
                          onChange={(e) => setEmailSearch(e.target.value)}
                          className="flex-1 h-6 text-xs"
                        />
                        <Button
                          onClick={handleComposeEmail}
                          className="bg-black hover:bg-gray-800 text-white h-6 px-3 text-xs"
                        >
                          COMPOSE EMAIL
                        </Button>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <span>1-50 of 1263</span>
                          <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                            ‹
                          </Button>
                          <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                            ›
                          </Button>
                        </div>
                      </div>

                      {/* Email List */}
                      <div className="flex-1 overflow-y-auto">
                        <div className="space-y-1 p-2">
                          {emailData.map((email) => (
                            <div key={email.id} className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded">
                              <Checkbox
                                checked={selectedEmails.includes(email.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedEmails(prev => [...prev, email.id]);
                                  } else {
                                    setSelectedEmails(prev => prev.filter(id => id !== email.id));
                                  }
                                }}
                                className="scale-75"
                              />
                              <div className="flex-1 text-xs text-gray-700 truncate">
                                {email.subject}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEmailDelete(email.id)}
                                className="h-5 w-5 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeMainTab === "decision-room" && (
            <div className="space-y-2">
              {/* Search and Filter Bar */}
              <div className="flex items-center gap-2 mb-2">
                <Input
                  placeholder="SEARCH CANDIDATES"
                  className="w-48 h-6 text-xs"
                />
                <Select>
                  <SelectTrigger className="w-24 h-6 text-xs">
                    <SelectValue placeholder="COUNTRY" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="usa">USA</SelectItem>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="europe">Europe</SelectItem>
                    <SelectItem value="russia">Russia</SelectItem>
                    <SelectItem value="china">China</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-32 h-6 text-xs">
                    <SelectValue placeholder="FINAL DECISION" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Decision Table */}
              <Card className="border-0 shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30 border-b">
                        <TableHead className="text-center font-medium text-foreground py-1 text-xs">JOB ID</TableHead>
                        <TableHead className="font-medium text-foreground py-1 text-xs">DATE</TableHead>
                        <TableHead className="font-medium text-foreground py-1 text-xs">NAME</TableHead>
                        <TableHead className="font-medium text-foreground py-1 text-xs">COUNTRY</TableHead>
                        <TableHead className="font-medium text-foreground py-1 text-xs">APPLIED JOB ROLE</TableHead>
                        <TableHead className="font-medium text-foreground py-1 text-xs">ROUNDS</TableHead>
                        <TableHead className="font-medium text-foreground py-1 text-xs">ROUNDS DECISION</TableHead>
                        <TableHead className="font-medium text-foreground py-1 text-xs">FINAL DECISION</TableHead>
                        <TableHead className="font-medium text-foreground py-1 text-xs">UPDATE</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="hover:bg-muted/20 transition-colors border-b border-border/40">
                        <TableCell className="text-center font-medium text-foreground py-2 text-xs">001</TableCell>
                        <TableCell className="py-2 text-xs">8/14/2025</TableCell>
                        <TableCell className="py-2 text-xs">Jaya</TableCell>
                        <TableCell className="py-2 text-xs">India</TableCell>
                        <TableCell className="py-2 text-xs">Senior Developer</TableCell>
                        <TableCell className="py-2">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white h-5 px-2 text-xs rounded">
                            ROUND 1
                          </Button>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button
                              onClick={() => handleDecisionClick("001", "Jaya", "YES", "round")}
                              className="bg-transparent border border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm"
                            >
                              YES
                            </Button>
                            <Button
                              onClick={() => handleDecisionClick("001", "Jaya", "MAYBE", "round")}
                              className="bg-transparent border border-orange-400 text-orange-600 hover:bg-orange-50 hover:border-orange-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm"
                            >
                              MAYBE
                            </Button>
                            <Button
                              onClick={() => handleDecisionClick("001", "Jaya", "NO", "round")}
                              className="bg-transparent border border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm"
                            >
                              NO
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button
                              onClick={() => handleDecisionClick("001", "Jaya", "YES", "final")}
                              className="bg-transparent border border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm"
                            >
                              APPROVE
                            </Button>
                            <Button
                              onClick={() => handleDecisionClick("001", "Jaya", "NO", "final")}
                              className="bg-transparent border border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm"
                            >
                              REJECT
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <Button className="bg-black hover:bg-gray-800 text-white h-5 px-2 text-xs rounded">
                            EMAIL
                          </Button>
                        </TableCell>
                      </TableRow>

                      <TableRow className="hover:bg-muted/20 transition-colors border-b border-border/40">
                        <TableCell className="text-center font-medium text-foreground py-2 text-xs">002</TableCell>
                        <TableCell className="py-2 text-xs">8/14/2025</TableCell>
                        <TableCell className="py-2 text-xs">Mark</TableCell>
                        <TableCell className="py-2 text-xs">USA</TableCell>
                        <TableCell className="py-2 text-xs">Graphic Designer</TableCell>
                        <TableCell className="py-2">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white h-5 px-2 text-xs rounded">
                            ROUND 2
                          </Button>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button
                              onClick={() => handleDecisionClick("002", "Mark", "YES", "round")}
                              className="bg-transparent border border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm"
                            >
                              YES
                            </Button>
                            <Button
                              onClick={() => handleDecisionClick("002", "Mark", "MAYBE", "round")}
                              className="bg-transparent border border-orange-400 text-orange-600 hover:bg-orange-50 hover:border-orange-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm"
                            >
                              MAYBE
                            </Button>
                            <Button
                              onClick={() => handleDecisionClick("002", "Mark", "NO", "round")}
                              className="bg-transparent border border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm"
                            >
                              NO
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button
                              onClick={() => handleDecisionClick("002", "Mark", "YES", "final")}
                              className="bg-transparent border border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm"
                            >
                              APPROVE
                            </Button>
                            <Button
                              onClick={() => handleDecisionClick("002", "Mark", "NO", "final")}
                              className="bg-transparent border border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm"
                            >
                              REJECT
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <Button className="bg-black hover:bg-gray-800 text-white h-5 px-2 text-xs rounded">
                            EMAIL
                          </Button>
                        </TableCell>
                      </TableRow>

                      <TableRow className="hover:bg-muted/20 transition-colors border-b border-border/40">
                        <TableCell className="text-center font-medium text-foreground py-2 text-xs">003</TableCell>
                        <TableCell className="py-2 text-xs">8/14/2025</TableCell>
                        <TableCell className="py-2 text-xs">John</TableCell>
                        <TableCell className="py-2 text-xs">USA</TableCell>
                        <TableCell className="py-2 text-xs">Content Writer</TableCell>
                        <TableCell className="py-2">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white h-5 px-2 text-xs rounded">
                            ROUND 1
                          </Button>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button
                              onClick={() => handleDecisionClick("003", "John", "YES", "round")}
                              className="bg-transparent border border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm"
                            >
                              YES
                            </Button>
                            <Button
                              onClick={() => handleDecisionClick("003", "John", "MAYBE", "round")}
                              className="bg-transparent border border-orange-400 text-orange-600 hover:bg-orange-50 hover:border-orange-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm"
                            >
                              MAYBE
                            </Button>
                            <Button
                              onClick={() => handleDecisionClick("003", "John", "NO", "round")}
                              className="bg-transparent border border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm"
                            >
                              NO
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button
                              onClick={() => handleDecisionClick("003", "John", "YES", "final")}
                              className="bg-transparent border border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm"
                            >
                              APPROVE
                            </Button>
                            <Button
                              onClick={() => handleDecisionClick("003", "John", "NO", "final")}
                              className="bg-transparent border border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm"
                            >
                              REJECT
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <Button className="bg-black hover:bg-gray-800 text-white h-5 px-2 text-xs rounded">
                            EMAIL
                          </Button>
                        </TableCell>
                      </TableRow>

                      <TableRow className="hover:bg-muted/20 transition-colors border-b border-border/40">
                        <TableCell className="text-center font-medium text-foreground py-2 text-xs">004</TableCell>
                        <TableCell className="py-2 text-xs">8/14/2025</TableCell>
                        <TableCell className="py-2 text-xs">Sara</TableCell>
                        <TableCell className="py-2 text-xs">Europe</TableCell>
                        <TableCell className="py-2 text-xs">Copywriter</TableCell>
                        <TableCell className="py-2">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white h-5 px-2 text-xs rounded">
                            ROUND 4
                          </Button>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button className="bg-transparent border border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              YES
                            </Button>
                            <Button className="bg-transparent border border-orange-400 text-orange-600 hover:bg-orange-50 hover:border-orange-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              MAYBE
                            </Button>
                            <Button className="bg-transparent border border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              NO
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button className="bg-transparent border border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              APPROVE
                            </Button>
                            <Button className="bg-transparent border border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              REJECT
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <Button className="bg-black hover:bg-gray-800 text-white h-5 px-2 text-xs rounded">
                            EMAIL
                          </Button>
                        </TableCell>
                      </TableRow>

                      <TableRow className="hover:bg-muted/20 transition-colors border-b border-border/40">
                        <TableCell className="text-center font-medium text-foreground py-2 text-xs">005</TableCell>
                        <TableCell className="py-2 text-xs">8/14/2025</TableCell>
                        <TableCell className="py-2 text-xs">Shruti</TableCell>
                        <TableCell className="py-2 text-xs">India</TableCell>
                        <TableCell className="py-2 text-xs">Sale Associate</TableCell>
                        <TableCell className="py-2">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white h-5 px-2 text-xs rounded">
                            ROUND 5
                          </Button>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button className="bg-transparent border border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              YES
                            </Button>
                            <Button className="bg-transparent border border-orange-400 text-orange-600 hover:bg-orange-50 hover:border-orange-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              MAYBE
                            </Button>
                            <Button className="bg-transparent border border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              NO
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button className="bg-transparent border border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              APPROVE
                            </Button>
                            <Button className="bg-transparent border border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              REJECT
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <Button className="bg-black hover:bg-gray-800 text-white h-5 px-2 text-xs rounded">
                            EMAIL
                          </Button>
                        </TableCell>
                      </TableRow>

                      <TableRow className="hover:bg-muted/20 transition-colors border-b border-border/40">
                        <TableCell className="text-center font-medium text-foreground py-2 text-xs">006</TableCell>
                        <TableCell className="py-2 text-xs">8/14/2025</TableCell>
                        <TableCell className="py-2 text-xs">Robin</TableCell>
                        <TableCell className="py-2 text-xs">Russia</TableCell>
                        <TableCell className="py-2 text-xs">AI Engineer</TableCell>
                        <TableCell className="py-2">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white h-5 px-2 text-xs rounded">
                            ROUND 2
                          </Button>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button className="bg-transparent border border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              YES
                            </Button>
                            <Button className="bg-transparent border border-orange-400 text-orange-600 hover:bg-orange-50 hover:border-orange-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              MAYBE
                            </Button>
                            <Button className="bg-transparent border border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              NO
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button className="bg-transparent border border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              APPROVE
                            </Button>
                            <Button className="bg-transparent border border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              REJECT
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <Button className="bg-black hover:bg-gray-800 text-white h-5 px-2 text-xs rounded">
                            EMAIL
                          </Button>
                        </TableCell>
                      </TableRow>

                      <TableRow className="hover:bg-muted/20 transition-colors border-b border-border/40">
                        <TableCell className="text-center font-medium text-foreground py-2 text-xs">007</TableCell>
                        <TableCell className="py-2 text-xs">8/14/2025</TableCell>
                        <TableCell className="py-2 text-xs">Kayle</TableCell>
                        <TableCell className="py-2 text-xs">Russia</TableCell>
                        <TableCell className="py-2 text-xs">ML Engineer</TableCell>
                        <TableCell className="py-2">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white h-5 px-2 text-xs rounded">
                            ROUND 1
                          </Button>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button className="bg-transparent border border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              YES
                            </Button>
                            <Button className="bg-transparent border border-orange-400 text-orange-600 hover:bg-orange-50 hover:border-orange-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              MAYBE
                            </Button>
                            <Button className="bg-transparent border border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              NO
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button className="bg-transparent border border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              APPROVE
                            </Button>
                            <Button className="bg-transparent border border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              REJECT
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <Button className="bg-black hover:bg-gray-800 text-white h-5 px-2 text-xs rounded">
                            EMAIL
                          </Button>
                        </TableCell>
                      </TableRow>

                      <TableRow className="hover:bg-muted/20 transition-colors border-b border-border/40">
                        <TableCell className="text-center font-medium text-foreground py-2 text-xs">008</TableCell>
                        <TableCell className="py-2 text-xs">8/14/2025</TableCell>
                        <TableCell className="py-2 text-xs">Vali</TableCell>
                        <TableCell className="py-2 text-xs">China</TableCell>
                        <TableCell className="py-2 text-xs">Data Analyst</TableCell>
                        <TableCell className="py-2">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white h-5 px-2 text-xs rounded">
                            ROUND 3
                          </Button>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button className="bg-transparent border border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              YES
                            </Button>
                            <Button className="bg-transparent border border-orange-400 text-orange-600 hover:bg-orange-50 hover:border-orange-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              MAYBE
                            </Button>
                            <Button className="bg-transparent border border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              NO
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button className="bg-transparent border border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              APPROVE
                            </Button>
                            <Button className="bg-transparent border border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              REJECT
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <Button className="bg-black hover:bg-gray-800 text-white h-5 px-2 text-xs rounded">
                            EMAIL
                          </Button>
                        </TableCell>
                      </TableRow>

                      <TableRow className="hover:bg-muted/20 transition-colors border-b border-border/40">
                        <TableCell className="text-center font-medium text-foreground py-2 text-xs">009</TableCell>
                        <TableCell className="py-2 text-xs">8/14/2025</TableCell>
                        <TableCell className="py-2 text-xs">Anne</TableCell>
                        <TableCell className="py-2 text-xs">Canada</TableCell>
                        <TableCell className="py-2 text-xs">Finance Analyst</TableCell>
                        <TableCell className="py-2">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white h-5 px-2 text-xs rounded">
                            ROUND 3
                          </Button>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button className="bg-transparent border border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              YES
                            </Button>
                            <Button className="bg-transparent border border-orange-400 text-orange-600 hover:bg-orange-50 hover:border-orange-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              MAYBE
                            </Button>
                            <Button className="bg-transparent border border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              NO
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button className="bg-transparent border border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              APPROVE
                            </Button>
                            <Button className="bg-transparent border border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500 h-6 px-3 text-xs font-medium rounded-md transition-all duration-200 shadow-sm">
                              REJECT
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <Button className="bg-black hover:bg-gray-800 text-white h-5 px-2 text-xs rounded">
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
        </div>
      </div>


      {/* Decision Confirmation Modal */}
      <Dialog open={showDecisionModal} onOpenChange={setShowDecisionModal}>
        <DialogContent className="w-96 max-w-sm">
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4">
            <div className="text-center space-y-4">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                CONFIRMATION
              </h3>
              <p className="text-sm text-gray-700">
                Would you like to proceed with this candidate?
              </p>
              {selectedDecision && (
                <p className="text-xs text-gray-600">
                  {selectedDecision.candidateName} - {selectedDecision.decision} ({selectedDecision.type === "round" ? "Round Decision" : "Final Decision"})
                </p>
              )}
              <div className="flex items-center justify-center gap-3 mt-4">
                <Button
                  onClick={handleConfirmDecision}
                  className="bg-green-600 hover:bg-green-700 text-white h-8 px-6 text-sm font-medium rounded"
                >
                  YES
                </Button>
                <Button
                  onClick={handleCancelDecision}
                  className="bg-black hover:bg-gray-800 text-white h-8 px-6 text-sm font-medium rounded"
                >
                  NO
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
