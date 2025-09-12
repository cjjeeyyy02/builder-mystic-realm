import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SearchWithDropdown } from "@/components/ui/search-with-dropdown";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  ArrowLeft,
  ArrowRight,
  Check,
  Share2,
  MoreVertical,
  X,
  ChevronDown
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

// Search options for dropdowns
const candidateOptions = [
  { value: "all", label: "All Candidates" },
  { value: "jaya", label: "Jaya" },
  { value: "mark", label: "Mark" },
  { value: "john", label: "John" },
  { value: "sara", label: "Sara" },
  { value: "shruti", label: "Shruti" },
  { value: "robin", label: "Robin" },
  { value: "kayle", label: "Kayle" },
  { value: "vali", label: "Vali" },
  { value: "anne", label: "Anne" },
];

const countryOptions = [
  { value: "all", label: "All Countries" },
  { value: "india", label: "India" },
  { value: "usa", label: "USA" },
  { value: "europe", label: "Europe" },
  { value: "russia", label: "Russia" },
  { value: "china", label: "China" },
  { value: "canada", label: "Canada" },
];

const jobRoleOptions = [
  { value: "all", label: "All Roles" },
  { value: "senior-developer", label: "Senior Developer" },
  { value: "graphic-designer", label: "Graphic Designer" },
  { value: "content-writer", label: "Content Writer" },
  { value: "copywriter", label: "Copywriter" },
  { value: "sale-associate", label: "Sale Associate" },
  { value: "ai-engineer", label: "AI Engineer" },
  { value: "ml-engineer", label: "ML Engineer" },
  { value: "data-analyst", label: "Data Analyst" },
  { value: "finance-analyst", label: "Finance Analyst" },
];

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

  // Dropdown visibility states
  const [showCandidatesDropdown, setShowCandidatesDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showJobRoleDropdown, setShowJobRoleDropdown] = useState(false);
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

  // Step Type Enable/Disable States
  const [roundTypeEnabled, setRoundTypeEnabled] = useState({
    technical: true,
    "non-technical": true,
    final: true
  });

  // Email Screen States
  const [showEmailScreen, setShowEmailScreen] = useState(false);
  const [showRoundsEmailInterface, setShowRoundsEmailInterface] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [emailSearch, setEmailSearch] = useState("");
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [filteredEmails, setFilteredEmails] = useState<any[]>([]);
  const [activeEmailTab, setActiveEmailTab] = useState("");
  const [showEmailCompose, setShowEmailCompose] = useState(false);
  const [showEmailTemplatesPanel, setShowEmailTemplatesPanel] = useState(true);
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState("NEUTRAL");
  const [emailSidebarCollapsed, setEmailSidebarCollapsed] = useState(false);
  const [isEditingMessage, setIsEditingMessage] = useState(false);
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

  // Function to render message with clickable links
  const renderMessageWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href="#"
            className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors duration-200"
            onClick={(e) => {
              e.preventDefault();
              if (part.includes('schedule-interview-slot')) {
                // Navigate to scheduling page
                window.location.href = '/schedule-interview';
              } else {
                window.open(part, '_blank');
              }
            }}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  // Recruitment email data with applicant details
  const recruitmentEmailData = {
    inbox: [
      {
        id: "1",
        applicantName: "Sarah Mitchell",
        position: "Senior Developer",
        subject: "Application for Senior Developer - Request for Interview Scheduling",
        preview: "Thank you for considering my application. I'm available for the interview...",
        timestamp: "2 hours ago",
        checked: false,
        priority: "high"
      },
      {
        id: "2",
        applicantName: "Jaya Mishra",
        position: "Senior Developer",
        subject: "Proposed Interview Time - Availability Confirmation",
        preview: "I would like to confirm my availability for the interview scheduled...",
        timestamp: "4 hours ago",
        checked: false,
        priority: "normal"
      },
      {
        id: "3",
        applicantName: "Mark Johnson",
        position: "Graphic Designer",
        subject: "Portfolio Submission and Interview Request",
        preview: "Please find attached my portfolio. I'm excited about the opportunity...",
        timestamp: "6 hours ago",
        checked: false,
        priority: "normal"
      },
      {
        id: "4",
        applicantName: "Emily Chen",
        position: "UX Designer",
        subject: "Thank you for the interview - Next steps inquiry",
        preview: "Thank you for the wonderful interview yesterday. I wanted to follow up...",
        timestamp: "1 day ago",
        checked: false,
        priority: "low"
      },
      {
        id: "5",
        applicantName: "David Rodriguez",
        position: "Software Engineer",
        subject: "Technical Assessment Completion and Results",
        preview: "I have completed the technical assessment as requested...",
        timestamp: "2 days ago",
        checked: false,
        priority: "high"
      }
    ],
    sent: [
      {
        id: "s1",
        applicantName: "Jaya Mishra",
        position: "Senior Developer",
        subject: "Interview Invitation - Technical Round",
        preview: "We are pleased to invite you for the technical interview round...",
        timestamp: "3 hours ago",
        checked: false
      },
      {
        id: "s2",
        applicantName: "Mark Johnson",
        position: "Graphic Designer",
        subject: "Interview Confirmation and Meeting Details",
        preview: "This email confirms your interview scheduled for tomorrow...",
        timestamp: "1 day ago",
        checked: false
      },
      {
        id: "s3",
        applicantName: "Sarah Mitchell",
        position: "Senior Developer",
        subject: "Welcome to AI2AIM - Offer Letter Attached",
        preview: "Congratulations! We are delighted to extend an offer...",
        timestamp: "3 days ago",
        checked: false
      }
    ],
    spam: [
      {
        id: "sp1",
        applicantName: "Unknown Sender",
        position: "N/A",
        subject: "Urgent: Claim Your Prize Now!",
        preview: "You have won a million dollars! Click here to claim...",
        timestamp: "1 week ago",
        checked: false
      },
      {
        id: "sp2",
        applicantName: "Fake Recruiter",
        position: "N/A",
        subject: "Investment Opportunity - Limited Time",
        preview: "Make money fast with our investment scheme...",
        timestamp: "2 weeks ago",
        checked: false
      }
    ]
  };

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

  // Track selected round for each candidate
  const [selectedRounds, setSelectedRounds] = useState<{
    [candidateId: string]: number;
  }>({
    "001": 1,
    "002": 2,
    "003": 1,
    "004": 4,
    "005": 5,
    "006": 2,
    "007": 1,
    "008": 3,
    "009": 3,
  });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setShowCandidatesDropdown(false);
        setShowCountryDropdown(false);
        setShowJobRoleDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  // Recruitment email handlers
  const handleEmailDelete = (emailId: string) => {
    console.log("Deleting recruitment email:", emailId);
    // Remove from selected emails if it was selected
    setSelectedEmails(prev => prev.filter(id => id !== emailId));
  };

  const handleComposeEmail = () => {
    setShowEmailCompose(true);
    setActiveEmailTab("inbox");
    console.log("Composing new email to applicant");
  };

  const handleSaveAsDraft = () => {
    console.log("Saving recruitment email as draft:", emailForm);
    // Handle save as draft logic for applicant communication
  };

  const handleSendEmail = () => {
    console.log("Sending recruitment email:", emailForm);
    // Handle send email logic for applicant communication
    setShowEmailCompose(false);
  };

  const handleAttachFiles = () => {
    console.log("Attaching files to recruitment email");
    // Handle file attachment logic (interview docs, offer letters, etc.)
  };

  // Enhanced search for recruitment emails
  const searchRecruitmentEmails = (query: string, emailList: any[]) => {
    if (!query.trim()) return emailList;

    return emailList.filter(email => {
      const searchTerm = query.toLowerCase();
      return (
        email.applicantName.toLowerCase().includes(searchTerm) ||
        email.subject.toLowerCase().includes(searchTerm) ||
        email.position.toLowerCase().includes(searchTerm) ||
        email.preview.toLowerCase().includes(searchTerm)
      );
    });
  };

  // Bulk email actions
  const handleSelectAllEmails = (emailList: any[]) => {
    if (selectedEmails.length === emailList.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emailList.map(email => email.id));
    }
  };

  const handleBulkDelete = () => {
    console.log("Bulk deleting emails:", selectedEmails);
    setSelectedEmails([]);
    setShowBulkActions(false);
  };

  const handleBulkArchive = () => {
    console.log("Bulk archiving emails:", selectedEmails);
    setSelectedEmails([]);
    setShowBulkActions(false);
  };

  const handleBulkSendTemplate = () => {
    console.log("Sending interview template to selected applicants:", selectedEmails);
    setSelectedEmails([]);
    setShowBulkActions(false);
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

  // Menu action handlers
  const handleViewCandidateDetails = (candidateId: string, candidateName: string) => {
    console.log(`Opening candidate details for ${candidateName} (ID: ${candidateId})`);
    // TODO: Open candidate details modal/page with resume, notes, and history
  };

  // Timeline Management Modal States
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<string[]>([]);
  const [selectedCandidateForTimeline, setSelectedCandidateForTimeline] = useState<{
    id: string;
    name: string;
    position: string;
    reviewRoom: string;
    interviewers: string[];
    steps: Array<{
      id: string;
      title: string;
      date: string;
      time: string;
      interviewer: string;
      status: "Pending" | "Completed" | "In Progress";
      schedule?: string;
      notes?: string;
      history?: Array<{
        date: string;
        action: string;
        details: string;
      }>;
    }>;
  } | null>(null);

  const handleManageTimeline = (candidateId: string, candidateName: string) => {
    // Mock data for the candidate timeline with expanded information
    const candidateData = {
      id: candidateId,
      name: "Taylor Green",
      position: "Senior Frontend Engineer",
      reviewRoom: "Zoom — Interview Room A",
      interviewers: ["Alice", "Bob"],
      steps: [
        {
          id: "step1",
          title: "Technical",
          date: "2023-08-20",
          time: "10:00",
          interviewer: "Alice",
          status: "Pending" as const,
          schedule: "Technical coding assessment - 90 minutes",
          notes: "Focus on React, JavaScript fundamentals, and problem-solving approach. Candidate should demonstrate clean code practices.",
          history: [
            { date: "2023-08-19", action: "Scheduled", details: "Interview scheduled with Alice for technical assessment" },
            { date: "2023-08-18", action: "Assigned", details: "Technical round assigned to candidate" }
          ]
        },
        {
          id: "step2",
          title: "System Design",
          date: "2023-08-21",
          time: "14:00",
          interviewer: "Bob",
          status: "Pending" as const,
          schedule: "System design discussion - 60 minutes",
          notes: "Evaluate architectural thinking, scalability considerations, and communication skills. Present a real-world scenario.",
          history: [
            { date: "2023-08-19", action: "Scheduled", details: "System design round scheduled with Bob" },
            { date: "2023-08-18", action: "Assigned", details: "System design round assigned to candidate" }
          ]
        }
      ]
    };

    setSelectedCandidateForTimeline(candidateData);
    setExpandedSteps([]);
    setShowTimelineModal(true);
  };

  const toggleStepExpansion = (stepId: string) => {
    setExpandedSteps(prev =>
      prev.includes(stepId)
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs with Search */}
      <div className="border-b border-border">
        <div className="flex items-center justify-between">
          {/* Tabs hidden as requested - only Interview Status visible */}
        </div>

      </div>

      {/* Main Layout */}
      <div className="h-[calc(100vh-280px)]">
        {/* Main Content */}
        <div className="w-full overflow-y-auto">
          {activeMainTab === "interview-status" && (
            <div className="space-y-4">
              {/* Search Filters */}
              <div className="flex items-center gap-2 mb-4">
                <SearchWithDropdown
                  placeholder="SEARCH CANDIDATES"
                  value={searchCandidates}
                  onChange={setSearchCandidates}
                  options={candidateOptions}
                  className="w-40"
                  inputClassName="h-7 text-xs"
                />
              </div>

              {/* Interview Table based on provided image */}
              <Card className="border-0 shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30 border-b">
                        <TableHead className="text-center font-medium text-foreground py-2 text-xs">
                          JOB ID
                        </TableHead>
                        <TableHead className="font-medium text-foreground py-2 text-xs">
                          NAME
                        </TableHead>
                        <TableHead className="font-medium text-foreground py-2 text-xs">
                          COUNTRY
                        </TableHead>
                        <TableHead className="font-medium text-foreground py-2 text-xs">
                          APPLIED JOB ROLE
                        </TableHead>
                        <TableHead className="font-medium text-foreground py-2 text-xs">
                          CURRENT ROUND
                        </TableHead>
                        <TableHead className="font-medium text-foreground py-2 text-xs">
                          NEXT ROUND
                        </TableHead>
                        <TableHead className="font-medium text-foreground py-2 text-xs">
                          INTERVIEW PROGRESS
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
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewCandidateDetails('001', 'Jaya')}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Candidate Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleManageTimeline('001', 'Jaya')}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Manage Timeline (Steps)
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewCandidateDetails('002', 'Mark')}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Candidate Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleManageTimeline('002', 'Mark')}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Manage Timeline (Steps)
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewCandidateDetails('003', 'John')}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Candidate Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleManageTimeline('003', 'John')}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Manage Timeline (Steps)
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewCandidateDetails('004', 'Sara')}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Candidate Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleManageTimeline('004', 'Sara')}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Manage Timeline (Steps)
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewCandidateDetails('005', 'Shruti')}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Candidate Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleManageTimeline('005', 'Shruti')}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Manage Timeline (Steps)
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewCandidateDetails('006', 'Robin')}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Candidate Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleManageTimeline('006', 'Robin')}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Manage Timeline (Steps)
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewCandidateDetails('007', 'Kayle')}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Candidate Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleManageTimeline('007', 'Kayle')}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Manage Timeline (Steps)
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewCandidateDetails('008', 'Vali')}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Candidate Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleManageTimeline('008', 'Vali')}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Manage Timeline (Steps)
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewCandidateDetails('009', 'Anne')}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Candidate Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleManageTimeline('009', 'Anne')}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Manage Timeline (Steps)
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Email screen removed - no longer accessible */}
          {false && activeMainTab === "rounds-room" && showEmailScreen && (
            <div className="bg-white border rounded-lg h-full flex">
              {/* Left Sidebar - Email Tabs */}
              <div className="w-20 border-r bg-gray-50 flex flex-col">
                <Button
                  className={`h-7 text-xs font-medium rounded-none border-b ${
                    activeEmailTab === "inbox" || activeEmailTab === ""
                      ? "bg-black text-white"
                      : "bg-transparent text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveEmailTab("inbox")}
                >
                  INBOX
                </Button>
                <Button
                  className={`h-7 text-xs font-medium rounded-none border-b ${
                    activeEmailTab === "sent"
                      ? "bg-black text-white"
                      : "bg-transparent text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveEmailTab("sent")}
                >
                  SENT
                </Button>
                <Button
                  className={`h-7 text-xs font-medium rounded-none ${
                    activeEmailTab === "spam"
                      ? "bg-black text-white"
                      : "bg-transparent text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveEmailTab("spam")}
                >
                  SPAM
                </Button>
              </div>

              {/* Main Email Interface */}
              <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <div className="flex items-center justify-between p-3 border-b bg-white">
                  <Input
                    placeholder="SEARCH"
                    className="flex-1 max-w-md h-8 text-xs border-gray-300 rounded-md"
                    value={emailSearch}
                    onChange={(e) => setEmailSearch(e.target.value)}
                  />
                  <div className="flex items-center gap-3">
                    <Button className="bg-black hover:bg-gray-800 text-white h-8 px-4 text-xs font-medium">
                      COMPOSE EMAIL
                    </Button>
                    <span className="text-xs text-gray-600">1-50 of 1,263</span>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-600">
                        ◀
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-600">
                        ▶
                      </Button>
                    </div>
                    <Button variant="outline" className="h-8 w-8 p-0 rounded-full border-gray-300">
                      <span className="text-sm">👤</span>
                    </Button>
                  </div>
                </div>

                {/* Email List */}
                <div className="flex-1 flex">
                  <div className="flex-1 bg-white border-r">
                    {/* Template Navigation */}
                    <div className="flex items-center justify-center p-4 border-b bg-gray-50">
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-md hover:bg-gray-200">
                          <span className="text-gray-600">←</span>
                        </Button>
                        <span className="text-xs font-medium text-gray-900 px-3 py-1 bg-white border border-gray-300 rounded-md">
                          NEUTRAL TEMPLATE 1
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-md hover:bg-gray-200">
                          <span className="text-gray-600">→</span>
                        </Button>
                      </div>
                    </div>

                    {/* Email Form - REPLACED WITH SIMPLE LIST */}
                    <div className="divide-y divide-gray-200">
                      {emailData.map((email) => (
                        <div key={email.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 group">
                          <Checkbox
                            checked={selectedEmails.includes(email.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedEmails(prev => [...prev, email.id]);
                              } else {
                                setSelectedEmails(prev => prev.filter(id => id !== email.id));
                              }
                            }}
                            className="scale-90"
                          />
                          <div className="flex-1 text-sm text-gray-700 truncate pr-3">
                            {email.subject}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEmailDelete(email.id)}
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    {/* END REPLACED EMAIL LIST */}
                    {/* Email Interface Header */}
                    <div className="bg-gray-50 border-b border-gray-200 px-3 py-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-800">Email Templates</h3>
                          <p className="text-xs text-gray-600">Interview Communication</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 px-3 text-xs font-medium border-gray-300 hover:bg-gray-50"
                          >
                            <ArrowLeft className="w-3 h-3 mr-1" />
                            Back
                          </Button>
                          <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                            <User className="w-3 h-3 text-gray-600" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Template Navigation */}
                    <div className="flex items-center justify-between bg-white border-b border-gray-200 px-3 py-1.5">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 px-2 text-xs font-medium bg-gray-800 text-white hover:bg-gray-700"
                        >
                          NEUTRAL
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 px-2 text-xs font-medium text-gray-600 hover:bg-gray-100"
                        >
                          SENT
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 px-2 text-xs font-medium text-gray-600 hover:bg-gray-100"
                        >
                          SPAM
                        </Button>
                      </div>
                      <Button
                        onClick={handleComposeEmail}
                        className="bg-gray-800 hover:bg-gray-900 text-white h-5 px-2 text-xs font-medium"
                      >
                        COMPOSE
                      </Button>
                    </div>

                    {/* Template Selection */}
                    <div className="px-3 py-1 bg-gray-50 border-b border-gray-200">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-5 px-2 text-xs font-medium border-gray-300 bg-white"
                      >
                        <ArrowLeft className="w-3 h-3 mr-1" />
                        TEMPLATE 1
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>

                    <div className="p-2 space-y-1">
                      {/* Email Form */}
                      <div className="flex items-center py-1 border-b border-gray-100">
                        <label className="text-xs font-medium text-gray-700 w-10">To</label>
                        <Input
                          value={emailForm.to}
                          onChange={(e) => setEmailForm(prev => ({...prev, to: e.target.value}))}
                          className="flex-1 h-6 text-xs border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="jayamishra@gmail.com"
                        />
                      </div>

                      {/* Subject Field */}
                      <div className="flex items-center py-1 border-b border-gray-100">
                        <label className="text-xs font-medium text-gray-700 w-10">Subject</label>
                        <div className="flex-1 flex items-center gap-1">
                          <Input
                            value={emailForm.subject}
                            onChange={(e) => setEmailForm(prev => ({...prev, subject: e.target.value}))}
                            className="flex-1 h-6 text-xs border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Proposed Interview Time – Jaya Mishra"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 px-2 text-xs border-gray-300 hover:bg-gray-50"
                            onClick={handleAttachFiles}
                          >
                            ATTACH
                          </Button>
                        </div>
                      </div>

                      {/* Email Body */}
                      <div className="p-2">
                        <div className="border border-gray-300 rounded-md bg-white">
                          <Textarea
                            value={emailForm.message}
                            onChange={(e) => setEmailForm(prev => ({...prev, message: e.target.value}))}
                            className="w-full h-32 text-xs border-0 resize-none p-2 leading-normal focus:ring-0 focus:border-transparent"
                            placeholder="Hi Jaya Mishra,

Thank you for your interest in Senior Developer role at Google India.

To schedule your second round of interview, please use the link below to view our calendar and choose a time that works for you:
https://ai2aim.com/google-india/schedule-interview-slot

Note that the red slots are already booked, and the empty slots are still available.
Once you book a slot, you'll receive a confirmation with the interview details.

If none of the available times work for you, or if you run into any issues while booking, feel free to reply to this email and we'll try to accommodate. Looking forward to speaking with you.

Best regards,
Kayle Jenny
HR Associate
Google India"
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between px-2 py-1.5 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                        <div className="flex items-center gap-1">
                          <Button
                            onClick={handleSaveAsDraft}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white h-6 px-3 text-xs font-medium"
                          >
                            DRAFT
                          </Button>
                          <Button
                            onClick={handleSendEmail}
                            className="bg-blue-600 hover:bg-blue-700 text-white h-6 px-3 text-xs font-medium"
                          >
                            SEND
                          </Button>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0 rounded-full border-gray-300 hover:bg-gray-50"
                        >
                          <span className="text-blue-600">���</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Rounds Review content moved to separate page/component */}


          {/* Professional Email Interface with Enhanced Design */}
          {activeMainTab === "rounds-room" && showRoundsEmailInterface && (
            <div className="bg-white shadow-2xl border border-gray-200 rounded-2xl h-full flex overflow-hidden">
              {/* Enhanced Left Sidebar - Email Templates */}
              <div className={`${emailSidebarCollapsed ? 'w-14' : 'w-84'} border-r border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col transition-all duration-500 ease-in-out`}>
                {/* Premium Header with Toggle */}
                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50 shadow-md flex items-center justify-between">
                  <div className={`${emailSidebarCollapsed ? 'hidden' : 'block'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Mail className="w-4 h-4 text-green-600" />
                      <h3 className="font-semibold text-gray-800 text-base">Email Templates</h3>
                    </div>
                    <p className="text-xs text-gray-600 ml-6">Professional Interview Communications</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 rounded-lg hover:bg-green-100 hover:text-green-700 flex-shrink-0 transition-all duration-200 border border-gray-300"
                    onClick={() => setEmailSidebarCollapsed(!emailSidebarCollapsed)}
                  >
                    {emailSidebarCollapsed ? (
                      <ArrowRight className="w-3 h-3 text-gray-600" />
                    ) : (
                      <ArrowLeft className="w-3 h-3 text-gray-600" />
                    )}
                  </Button>
                </div>

                {/* Enhanced Template Navigation */}
                {!emailSidebarCollapsed && (
                  <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                      <div className="flex items-center justify-center gap-4">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-md hover:bg-green-100 border border-green-300">
                          <ArrowLeft className="w-3 h-3 text-green-600" />
                        </Button>
                        <div className="bg-white rounded-md px-3 py-1 shadow-sm border border-green-300">
                          <span className="text-xs font-medium text-green-800">NEUTRAL TEMPLATE</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-md hover:bg-green-100 border border-green-300">
                          <ArrowRight className="w-3 h-3 text-green-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Main Email Interface */}
              <div className="flex-1 flex flex-col bg-white">
                {/* Premium Top Navigation Bar */}
                <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200 bg-gradient-to-r from-white via-gray-50 to-white shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 border border-green-200">
                      <Mail className="w-4 h-4 text-green-600" />
                    </div>
                    <Input
                      placeholder="Search your emails..."
                      className="w-80 h-9 text-sm border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500/20 bg-white"
                      value={emailSearch}
                      onChange={(e) => setEmailSearch(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">1-50 of 1,263 emails</span>
                    <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg p-0.5 shadow-sm">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-600 hover:bg-gray-100 rounded-md">
                        <ArrowLeft className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-600 hover:bg-gray-100 rounded-md">
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md">
                      <span className="text-white text-xs font-bold">HR</span>
                    </div>
                  </div>
                </div>

                {/* White Email Navigation Buttons - Inbox, Sent, Spam */}
                <div className="flex items-center gap-3 px-8 py-4 border-b border-gray-200 bg-white">
                  <Button
                    className={`h-8 px-4 text-xs font-medium rounded-md transition-all duration-200 shadow-sm ${
                      activeEmailTab === "inbox"
                        ? "bg-green-600 text-white shadow-md border border-green-700"
                        : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                    onClick={() => setActiveEmailTab("inbox")}
                  >
                    <Mail className="w-3 h-3 mr-1" />
                    INBOX
                  </Button>
                  <Button
                    className={`h-8 px-4 text-xs font-medium rounded-md transition-all duration-200 shadow-sm ${
                      activeEmailTab === "sent"
                        ? "bg-green-600 text-white shadow-md border border-green-700"
                        : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                    onClick={() => setActiveEmailTab("sent")}
                  >
                    <Send className="w-3 h-3 mr-1" />
                    SENT
                  </Button>
                  <Button
                    className={`h-8 px-4 text-xs font-medium rounded-md transition-all duration-200 shadow-sm ${
                      activeEmailTab === "spam"
                        ? "bg-green-600 text-white shadow-md border border-green-700"
                        : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                    onClick={() => setActiveEmailTab("spam")}
                  >
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    SPAM
                  </Button>
                </div>

                {/* Enhanced Template Selection */}
                <div className="px-8 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-4 bg-white rounded-xl p-3 shadow-lg border-2 border-green-200">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-green-100">
                        <ArrowLeft className="w-4 h-4 text-green-600" />
                      </Button>
                      <span className="text-sm font-bold text-green-800 px-4 py-1 bg-green-100 rounded-lg">
                        NEUTRAL TEMPLATE 1
                      </span>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-green-100">
                        <ArrowRight className="w-4 h-4 text-green-600" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Professional Email Composition Form */}
                <div className="flex-1 bg-gradient-to-br from-white to-gray-50 overflow-y-auto">
                  <div className="p-10 space-y-8">
                    {/* Enhanced To Field */}
                    <div className="flex items-center gap-6">
                      <label className="text-sm font-bold text-gray-800 w-24 flex-shrink-0 flex items-center gap-2">
                        <Users className="w-4 h-4 text-green-600" />
                        To:
                      </label>
                      <Input
                        value={emailForm.to}
                        onChange={(e) => setEmailForm(prev => ({...prev, to: e.target.value}))}
                        className="flex-1 h-9 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 bg-white rounded-lg text-sm shadow-sm"
                        placeholder="Enter recipient email address..."
                      />
                    </div>

                    {/* Enhanced Subject Field */}
                    <div className="flex items-center gap-6">
                      <label className="text-sm font-bold text-gray-800 w-24 flex-shrink-0 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-green-600" />
                        Subject:
                      </label>
                      <Input
                        value={emailForm.subject}
                        onChange={(e) => setEmailForm(prev => ({...prev, subject: e.target.value}))}
                        className="flex-1 h-9 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 bg-white rounded-lg text-sm shadow-sm"
                        placeholder="Enter email subject line..."
                      />
                    </div>

                    {/* Enhanced Message Body */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-gray-800 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-green-600" />
                          Compose Message:
                        </label>
                        <Button
                          onClick={() => setIsEditingMessage(!isEditingMessage)}
                          variant="outline"
                          size="sm"
                          className="h-8 px-3 text-xs font-medium border-gray-300 text-gray-600 hover:bg-gray-50"
                        >
                          <Edit3 className="w-3 h-3 mr-1" />
                          {isEditingMessage ? 'Preview' : 'Edit'}
                        </Button>
                      </div>
                      <div className="bg-white rounded-lg border border-gray-300 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/20 shadow-md overflow-hidden">
                        {isEditingMessage ? (
                          <Textarea
                            value={emailForm.message}
                            onChange={(e) => setEmailForm(prev => ({...prev, message: e.target.value}))}
                            className="w-full h-96 text-sm border-0 rounded-xl p-6 leading-relaxed focus:ring-0 focus:border-0 bg-white resize-none"
                            placeholder="Compose your professional email message here..."
                          />
                        ) : (
                          <div className="w-full h-96 text-sm p-6 leading-relaxed bg-white whitespace-pre-wrap overflow-y-auto">
                            {renderMessageWithLinks(emailForm.message)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      {/* Left side - Save Draft and Send buttons */}
                      <div className="flex items-center gap-4">
                        <Button
                          onClick={handleSaveAsDraft}
                          variant="outline"
                          className="h-9 px-6 text-sm font-medium border border-green-600 hover:border-green-700 hover:bg-green-50 text-green-700 rounded-lg shadow-sm"
                        >
                          <FileText className="w-3 h-3 mr-2" />
                          Save Draft
                        </Button>
                        <Button
                          onClick={handleSendEmail}
                          className="h-9 px-8 text-sm font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg rounded-lg transition-all duration-200"
                        >
                          <Send className="w-3 h-3 mr-2" />
                          Send Email
                        </Button>
                      </div>

                      {/* Right side - Share button */}
                      <div className="flex items-center gap-4">
                        <Button
                          onClick={() => {
                            console.log('Sharing email template or content');
                            // Handle share functionality here
                          }}
                          variant="outline"
                          className="h-9 px-6 text-sm font-medium border border-blue-600 hover:border-blue-700 hover:bg-blue-50 text-blue-700 rounded-lg shadow-sm"
                        >
                          <Share2 className="w-3 h-3 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMainTab === "decision-room" && (
            <div className="space-y-2">
              {/* Search and Filter Bar */}
              <div className="flex items-center gap-2 mb-2">
                <SearchWithDropdown
                  placeholder="SEARCH CANDIDATES"
                  value={searchCandidates}
                  onChange={setSearchCandidates}
                  options={candidateOptions}
                  className="w-48"
                  inputClassName="h-6 text-xs"
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
                          <Select
                            value={selectedRounds["001"]?.toString() || "1"}
                            onValueChange={(value) => setSelectedRounds(prev => ({...prev, "001": parseInt(value)}))}
                          >
                            <SelectTrigger className="w-24 h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white border-0 font-medium shadow-sm rounded">
                              <SelectValue>
                                ROUND {selectedRounds["001"] || 1}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="shadow-lg border border-gray-200 rounded-md">
                              <SelectItem value="1" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 1</SelectItem>
                              <SelectItem value="2" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 2</SelectItem>
                              <SelectItem value="3" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 3</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button
                              onClick={() => handleDecisionClick("001", "Jaya", "YES", "round")}
                              className={getButtonStyles("001", "YES", "round")}
                            >
                              YES
                            </Button>
                            <Button
                              onClick={() => handleDecisionClick("001", "Jaya", "MAYBE", "round")}
                              className={getButtonStyles("001", "MAYBE", "round")}
                            >
                              MAYBE
                            </Button>
                            <Button
                              onClick={() => handleDecisionClick("001", "Jaya", "NO", "round")}
                              className={getButtonStyles("001", "NO", "round")}
                            >
                              NO
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button
                              onClick={() => handleDecisionClick("001", "Jaya", "YES", "final")}
                              className={getButtonStyles("001", "YES", "final")}
                            >
                              APPROVE
                            </Button>
                            <Button
                              onClick={() => handleDecisionClick("001", "Jaya", "NO", "final")}
                              className={getButtonStyles("001", "NO", "final")}
                            >
                              REJECT
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white h-5 px-2 text-xs rounded">
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
                          <Select
                            value={selectedRounds["002"]?.toString() || "2"}
                            onValueChange={(value) => setSelectedRounds(prev => ({...prev, "002": parseInt(value)}))}
                          >
                            <SelectTrigger className="w-24 h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white border-0 font-medium shadow-sm rounded">
                              <SelectValue>
                                ROUND {selectedRounds["002"] || 2}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="shadow-lg border border-gray-200 rounded-md">
                              <SelectItem value="1" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 1</SelectItem>
                              <SelectItem value="2" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 2</SelectItem>
                              <SelectItem value="3" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 3</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button
                              onClick={() => handleDecisionClick("002", "Mark", "YES", "round")}
                              className={getButtonStyles("002", "YES", "round")}
                            >
                              YES
                            </Button>
                            <Button
                              onClick={() => handleDecisionClick("002", "Mark", "MAYBE", "round")}
                              className={getButtonStyles("002", "MAYBE", "round")}
                            >
                              MAYBE
                            </Button>
                            <Button
                              onClick={() => handleDecisionClick("002", "Mark", "NO", "round")}
                              className={getButtonStyles("002", "NO", "round")}
                            >
                              NO
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button
                              onClick={() => handleDecisionClick("002", "Mark", "YES", "final")}
                              className={getButtonStyles("002", "YES", "final")}
                            >
                              APPROVE
                            </Button>
                            <Button
                              onClick={() => handleDecisionClick("002", "Mark", "NO", "final")}
                              className={getButtonStyles("002", "NO", "final")}
                            >
                              REJECT
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white h-5 px-2 text-xs rounded">
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
                          <Select
                            value={selectedRounds["003"]?.toString() || "1"}
                            onValueChange={(value) => setSelectedRounds(prev => ({...prev, "003": parseInt(value)}))}
                          >
                            <SelectTrigger className="w-24 h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white border-0 font-medium shadow-sm rounded">
                              <SelectValue>
                                ROUND {selectedRounds["003"] || 1}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="shadow-lg border border-gray-200 rounded-md">
                              <SelectItem value="1" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 1</SelectItem>
                              <SelectItem value="2" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 2</SelectItem>
                              <SelectItem value="3" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 3</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button
                              onClick={() => handleDecisionClick("003", "John", "YES", "round")}
                              className={getButtonStyles("003", "YES", "round")}
                            >
                              YES
                            </Button>
                            <Button
                              onClick={() => handleDecisionClick("003", "John", "MAYBE", "round")}
                              className={getButtonStyles("003", "MAYBE", "round")}
                            >
                              MAYBE
                            </Button>
                            <Button
                              onClick={() => handleDecisionClick("003", "John", "NO", "round")}
                              className={getButtonStyles("003", "NO", "round")}
                            >
                              NO
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <Button
                              onClick={() => handleDecisionClick("003", "John", "YES", "final")}
                              className={getButtonStyles("003", "YES", "final")}
                            >
                              APPROVE
                            </Button>
                            <Button
                              onClick={() => handleDecisionClick("003", "John", "NO", "final")}
                              className={getButtonStyles("003", "NO", "final")}
                            >
                              REJECT
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white h-5 px-2 text-xs rounded">
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
                          <Select
                            value={selectedRounds["004"]?.toString() || "4"}
                            onValueChange={(value) => setSelectedRounds(prev => ({...prev, "004": parseInt(value)}))}
                          >
                            <SelectTrigger className="w-24 h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white border-0 font-medium shadow-sm rounded">
                              <SelectValue>
                                ROUND {selectedRounds["004"] || 4}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="shadow-lg border border-gray-200 rounded-md">
                              <SelectItem value="1" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 1</SelectItem>
                              <SelectItem value="2" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 2</SelectItem>
                              <SelectItem value="3" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 3</SelectItem>
                            </SelectContent>
                          </Select>
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
                          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white h-5 px-2 text-xs rounded">
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
                          <Select
                            value={selectedRounds["005"]?.toString() || "5"}
                            onValueChange={(value) => setSelectedRounds(prev => ({...prev, "005": parseInt(value)}))}
                          >
                            <SelectTrigger className="w-24 h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white border-0 font-medium shadow-sm rounded">
                              <SelectValue>
                                ROUND {selectedRounds["005"] || 5}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="shadow-lg border border-gray-200 rounded-md">
                              <SelectItem value="1" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 1</SelectItem>
                              <SelectItem value="2" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 2</SelectItem>
                              <SelectItem value="3" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 3</SelectItem>
                            </SelectContent>
                          </Select>
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
                          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white h-5 px-2 text-xs rounded">
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
                          <Select
                            value={selectedRounds["006"]?.toString() || "2"}
                            onValueChange={(value) => setSelectedRounds(prev => ({...prev, "006": parseInt(value)}))}
                          >
                            <SelectTrigger className="w-24 h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white border-0 font-medium shadow-sm rounded">
                              <SelectValue>
                                ROUND {selectedRounds["006"] || 2}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="shadow-lg border border-gray-200 rounded-md">
                              <SelectItem value="1" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 1</SelectItem>
                              <SelectItem value="2" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 2</SelectItem>
                              <SelectItem value="3" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 3</SelectItem>
                            </SelectContent>
                          </Select>
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
                          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white h-5 px-2 text-xs rounded">
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
                          <Select
                            value={selectedRounds["007"]?.toString() || "1"}
                            onValueChange={(value) => setSelectedRounds(prev => ({...prev, "007": parseInt(value)}))}
                          >
                            <SelectTrigger className="w-24 h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white border-0 font-medium shadow-sm rounded">
                              <SelectValue>
                                ROUND {selectedRounds["007"] || 1}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="shadow-lg border border-gray-200 rounded-md">
                              <SelectItem value="1" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 1</SelectItem>
                              <SelectItem value="2" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 2</SelectItem>
                              <SelectItem value="3" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 3</SelectItem>
                            </SelectContent>
                          </Select>
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
                          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white h-5 px-2 text-xs rounded">
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
                          <Select
                            value={selectedRounds["008"]?.toString() || "3"}
                            onValueChange={(value) => setSelectedRounds(prev => ({...prev, "008": parseInt(value)}))}
                          >
                            <SelectTrigger className="w-24 h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white border-0 font-medium shadow-sm rounded">
                              <SelectValue>
                                ROUND {selectedRounds["008"] || 3}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="shadow-lg border border-gray-200 rounded-md">
                              <SelectItem value="1" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 1</SelectItem>
                              <SelectItem value="2" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 2</SelectItem>
                              <SelectItem value="3" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 3</SelectItem>
                            </SelectContent>
                          </Select>
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
                          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white h-5 px-2 text-xs rounded">
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
                          <Select
                            value={selectedRounds["009"]?.toString() || "3"}
                            onValueChange={(value) => setSelectedRounds(prev => ({...prev, "009": parseInt(value)}))}
                          >
                            <SelectTrigger className="w-24 h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white border-0 font-medium shadow-sm rounded">
                              <SelectValue>
                                ROUND {selectedRounds["009"] || 3}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="shadow-lg border border-gray-200 rounded-md">
                              <SelectItem value="1" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 1</SelectItem>
                              <SelectItem value="2" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 2</SelectItem>
                              <SelectItem value="3" className="text-xs font-medium hover:bg-blue-50 focus:bg-blue-50">STEP 3</SelectItem>
                            </SelectContent>
                          </Select>
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
                          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white h-5 px-2 text-xs rounded">
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
          <DialogHeader>
            <DialogTitle className="text-sm font-bold text-gray-800 uppercase tracking-wide text-center">
              CONFIRMATION
            </DialogTitle>
          </DialogHeader>
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4">
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-700">
                {selectedDecision ? (
                  selectedDecision.type === "final" ? (
                    selectedDecision.decision === "NO" ?
                      "Are you sure you want to reject this candidate?" :
                      "Are you sure you want to approve this candidate?"
                  ) : (
                    "Would you like to proceed with this candidate?"
                  )
                ) : (
                  "Would you like to proceed with this candidate?"
                )}
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
                  Step Name <span className="text-red-500">*</span>
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
                  Step Type <span className="text-red-500">*</span>
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

      {/* Timeline Management Modal */}
      <Dialog open={showTimelineModal} onOpenChange={setShowTimelineModal}>
        <DialogContent className="max-w-[80vw] w-full bg-white border border-gray-200 rounded-xl shadow-xl p-0 max-h-[90vh] overflow-hidden">
          {selectedCandidateForTimeline && (
            <div className="flex flex-col h-full">
              {/* Header - Fixed */}
              <div className="p-6 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      CA001
                    </h2>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {selectedCandidateForTimeline.name} — {selectedCandidateForTimeline.position}
                    </h1>
                    <p className="text-sm text-gray-600">
                      Review Room: <span className="text-blue-600 font-medium">{selectedCandidateForTimeline.reviewRoom}</span>
                    </p>
                    <div className="flex items-center gap-4 pt-2">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Assigned Interviewers</p>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedCandidateForTimeline.interviewers.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowTimelineModal(false)}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                    View Details
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                    Send Invitation
                  </Button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Interview Steps */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Timeline</h3>

                  {selectedCandidateForTimeline.steps.map((step, index) => (
                    <div key={step.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      {/* Step Header - Clickable */}
                      <div
                        className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                        onClick={() => toggleStepExpansion(step.id)}
                      >
                        <div className="space-y-1 flex-1">
                          <h4 className="text-base font-medium text-gray-900">
                            Step {index + 1} — {step.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {step.date} {step.time} — {step.interviewer}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className={`text-xs px-3 py-1 ${
                              step.status === 'Pending' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                              step.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' :
                              'bg-blue-50 text-blue-700 border-blue-200'
                            }`}
                          >
                            {step.status}
                            <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${
                              expandedSteps.includes(step.id) ? 'rotate-180' : ''
                            }`} />
                          </Button>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {expandedSteps.includes(step.id) && (
                        <div className="p-4 bg-white border-t border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Schedule & Notes */}
                            <div className="space-y-4">
                              <div>
                                <h5 className="text-sm font-semibold text-gray-700 mb-2">Schedule Details</h5>
                                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                                  {step.schedule}
                                </p>
                              </div>

                              <div>
                                <h5 className="text-sm font-semibold text-gray-700 mb-2">Interview Notes</h5>
                                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                                  {step.notes}
                                </p>
                              </div>
                            </div>

                            {/* History */}
                            <div>
                              <h5 className="text-sm font-semibold text-gray-700 mb-2">Activity History</h5>
                              <div className="space-y-2">
                                {step.history?.map((entry, idx) => (
                                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-medium text-gray-700">{entry.action}</span>
                                        <span className="text-xs text-gray-500">{entry.date}</span>
                                      </div>
                                      <p className="text-xs text-gray-600">{entry.details}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Step Actions */}
                          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                            <Button variant="outline" size="sm">
                              <Edit3 className="w-3 h-3 mr-1" />
                              Edit Step
                            </Button>
                            <Button variant="outline" size="sm">
                              <Calendar className="w-3 h-3 mr-1" />
                              Reschedule
                            </Button>
                            <Button variant="outline" size="sm">
                              <Mail className="w-3 h-3 mr-1" />
                              Send Reminder
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer Note */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                    Steps pending — decisions logged per step. Click on any step to view full details.
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
