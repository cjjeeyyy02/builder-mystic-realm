import React, { useState, useEffect, useMemo, startTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
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
  Download,
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
  ChevronDown,
  Grid,
  List,
  Phone
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

export const interviewCandidates: InterviewCandidate[] = [
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


function formatMDYSlash(dateStr: string): string {
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  }
  const iso = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) return `${iso[2]}/${iso[3]}/${iso[1]}`;
  const dash = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (dash) return `${dash[1]}/${dash[2]}/${dash[3]}`;
  const slash = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (slash) return dateStr;
  return dateStr;
}

export default function InterviewView() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowTimelineSheet(false);
        setShowCandidateDetailsModal(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
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
  const [viewMode, setViewMode] = useState<"table" | "calendar" | "card">("table");
  // Calendar view state and helpers
  const [calendarDate, setCalendarDate] = useState(new Date());
  const formatDate = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };
  const getCalendarDays = (date: Date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const startDay = new Date(start);
    startDay.setDate(start.getDate() - start.getDay()); // back to Sunday
    const endDay = new Date(end);
    endDay.setDate(end.getDate() + (6 - end.getDay())); // forward to Saturday
    const days: Date[] = [];
    const cur = new Date(startDay);
    while (cur <= endDay) {
      days.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
    return days;
  };
  const calendarDays = useMemo(() => getCalendarDays(calendarDate), [calendarDate]);
  const [calendarView, setCalendarView] = useState<'week' | 'month'>('month');
  const [calendarSearch, setCalendarSearch] = useState('');

  // Calendar events and editor state
  type CalendarEvent = {
    id: string;
    title: string;
    organizer: string;
    attendees: string[];
    start: string; // ISO
    end: string;   // ISO
    allDay?: boolean;
    location?: string;
    description?: string;
  };
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [showEventPanel, setShowEventPanel] = useState(false);
  const [eventDraft, setEventDraft] = useState<CalendarEvent | null>(null);
  const openEventPanel = (draft: CalendarEvent) => { setEventDraft(draft); setShowEventPanel(true); };
  const closeEventPanel = () => { setShowEventPanel(false); setEventDraft(null); };

  const getStartOfWorkWeek = (d: Date) => {
    const date = new Date(d);
    const day = date.getDay();
    const diffToMonday = (day + 6) % 7;
    date.setDate(date.getDate() - diffToMonday);
    date.setHours(0,0,0,0);
    return date;
  };

  const WORK_HOURS_START = 8;
  const WORK_HOURS_END = 18;
  const SLOT_MINUTES = 30;

  const timeSlots: string[] = useMemo(() => {
    const slots: string[] = [];
    for (let h = WORK_HOURS_START; h < WORK_HOURS_END; h++) {
      for (let m = 0; m < 60; m += SLOT_MINUTES) {
        const hour12 = ((h + 11) % 12) + 1;
        const ampm = h < 12 ? 'AM' : 'PM';
        const mm = String(m).padStart(2, '0');
        slots.push(`${hour12}:${mm} ${ampm}`);
      }
    }
    return slots;
  }, []);

  const [isSelecting, setIsSelecting] = useState(false);
  const [selDayIdx, setSelDayIdx] = useState<number | null>(null);
  const [selStartIdx, setSelStartIdx] = useState<number | null>(null);
  const [selEndIdx, setSelEndIdx] = useState<number | null>(null);
  const resetSelection = () => { setIsSelecting(false); setSelDayIdx(null); setSelStartIdx(null); setSelEndIdx(null); };
  const commitSelectionToDraft = (weekStart: Date) => {
    if (selDayIdx == null || selStartIdx == null) return;
    const endIdx = selEndIdx != null ? selEndIdx : selStartIdx;
    const start = new Date(weekStart);
    start.setDate(weekStart.getDate() + selDayIdx);
    const startHour = WORK_HOURS_START + Math.floor(selStartIdx * SLOT_MINUTES / 60);
    const startMinute = (selStartIdx * SLOT_MINUTES) % 60;
    start.setHours(startHour, startMinute, 0, 0);

    const end = new Date(weekStart);
    end.setDate(weekStart.getDate() + selDayIdx);
    const endHour = WORK_HOURS_START + Math.floor((endIdx + 1) * SLOT_MINUTES / 60);
    const endMinute = ((endIdx + 1) * SLOT_MINUTES) % 60;
    end.setHours(endHour, endMinute, 0, 0);

    openEventPanel({
      id: `draft-${Date.now()}`,
      title: '',
      organizer: '',
      attendees: [],
      start: start.toISOString(),
      end: end.toISOString(),
      allDay: false,
      location: '',
      description: ''
    });
  };
  // Build events map by date from rounds and interviewCandidates
  const eventsByDate = useMemo(() => {
    const map: Record<string, { candidateName: string; appliedPosition: string; roundName: string; status: string; }[]> = {};
    const candidateById = Object.fromEntries(interviewCandidates.map(c => [c.id, c]));
    rounds.forEach(r => {
      (r.candidates || []).forEach(cid => {
        const c = candidateById[cid];
        if (!c) return;
        const key = r.scheduledDate;
        if (!map[key]) map[key] = [];
        map[key].push({
          candidateName: c.applicantName,
          appliedPosition: c.appliedPosition,
          roundName: r.roundName,
          status: c.status
        });
      });
    });
    return map;
  }, [rounds]);


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

  // Navigation
  const navigate = useNavigate();
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

  // Candidate Details Modal States
  const [showCandidateDetailsModal, setShowCandidateDetailsModal] = useState(false);
  const [selectedCandidateDetails, setSelectedCandidateDetails] = useState<{
    id: string;
    applicantName: string;
    appliedPosition: string;
    department: string;
    currentRound: string;
    status: string;
    email: string;
    phone: string;
    roomId: string;
    reviewRoom: string;
    assignedInterviewers: string[];
    interviewSteps: Array<{
      id: string;
      title: string;
      interviewer: string;
      description: string;
      date: string;
      time: string;
      status: string;
      remarks: string;
    }>;
  } | null>(null);

  // Menu action handlers
  const handleViewCandidateDetails = (candidateId: string, candidateName: string) => {
    // Mock candidate data based on ID
    const candidateDetails = {
      id: candidateId,
      applicantName: candidateName,
      appliedPosition: "Senior React Developer",
      department: "Engineering",
      currentRound: "System Design Interview",
      status: "in-progress",
      email: `${candidateName.toLowerCase().replace(' ', '.')}@example.com`,
      phone: "(555) 234-5678",
      roomId: `ROOM-${candidateId.padStart(3, '0')}`,
      reviewRoom: "https://zoom.us/j/123456789",
      assignedInterviewers: ["David Wilson", "Lisa Chen"],
      interviewSteps: [
        {
          id: "step1",
          title: "Technical Interview",
          interviewer: "David Wilson, Tech Lead",
          description: "Assessment of technical skills and problem-solving abilities",
          date: "2023-05-20",
          time: "10:00 AM",
          status: "Completed",
          remarks: "Strong technical skills, especially in React and TypeScript. Solved all problems efficiently."
        },
        {
          id: "step2",
          title: "System Design Interview",
          interviewer: "Lisa Chen, Senior Architect",
          description: "Evaluation of system design and architecture knowledge",
          date: "2023-05-22",
          time: "2:00 PM",
          status: "Scheduled",
          remarks: ""
        }
      ]
    };

    setTimeout(() => {
      startTransition(() => {
        setSelectedCandidateDetails(candidateDetails);
        setShowCandidateDetailsModal(true);
      });
    }, 0);
  };

  // Timeline Management Side Sheet States
  const [showTimelineSheet, setShowTimelineSheet] = useState(false);
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
      remarks?: string;
      score?: number;
      history?: Array<{
        date: string;
        action: string;
        details: string;
      }>;
    }>;
  } | null>(null);

  // Timeline action modals state
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showRemarkScoreModal, setShowRemarkScoreModal] = useState(false);

  // Forms
  const [reminderMessage, setReminderMessage] = useState("");
  const [scheduleForm, setScheduleForm] = useState({ date: "", time: "", interviewer: "" });
  const [remarkForm, setRemarkForm] = useState<{ remarks: string; score: string }>({ remarks: "", score: "" });

  const { toast } = useToast();

  const currentStep = () => {
    if (!selectedCandidateForTimeline || !selectedStepId) return null;
    return selectedCandidateForTimeline.steps.find(s => s.id === selectedStepId) || null;
  };

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

    setTimeout(() => {
      startTransition(() => {
        setSelectedCandidateForTimeline(candidateData);
        setExpandedSteps([]);
        setShowTimelineSheet(true);
      });
    }, 0);
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
              {/* Search Filters and View Toggle */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <SearchWithDropdown
                  placeholder="SEARCH CANDIDATES"
                  value={searchCandidates}
                  onChange={setSearchCandidates}
                  options={candidateOptions}
                  className="flex-none w-64"
                  inputClassName="pl-10 h-8 text-sm rounded-md shadow-sm"
                />

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={viewMode === "table" ? "default" : "outline"}
                    onClick={() => setViewMode("table")}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "calendar" ? "default" : "outline"}
                    onClick={() => setViewMode("calendar")}
                    title="Calendar View"
                  >
                    <Calendar className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {
                    const headers = ['Name','Position','Status','Email','Phone','Current Round'];
                    const rows = interviewCandidates.map(c => [c.applicantName, c.appliedPosition, c.status, c.email, c.phone, c.currentRound]);
                    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${String(v).replace(/\"/g,'""')}"`).join(','))].join('\n');
                    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a'); a.href = url; a.download = 'interview_candidates.csv'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
                  }}>
                    <Download className="w-4 h-4 mr-1" /> Export
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "card" ? "default" : "outline"}
                    onClick={() => setViewMode("card")}
                    title="Card View"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Interview Content - Table or Card View */}
              {viewMode === "table" ? (
                <Card className="border-0 shadow-sm overflow-hidden rounded-none">
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
                          APPLIED POSITION
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
                          ACTION
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
                              <DropdownMenuItem onSelect={() => handleViewCandidateDetails('001', 'Jaya')}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Interview Timeline
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => handleManageTimeline('001', 'Jaya')}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Manage Interview Timeline
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
                              <DropdownMenuItem onSelect={() => handleViewCandidateDetails('002', 'Mark')}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Interview Timeline
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => handleManageTimeline('002', 'Mark')}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Manage Interview Timeline
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
                              <DropdownMenuItem onSelect={() => handleViewCandidateDetails('003', 'John')}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Interview Timeline
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => handleManageTimeline('003', 'John')}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Manage Interview Timeline
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
                              <DropdownMenuItem onSelect={() => handleViewCandidateDetails('004', 'Sara')}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Interview Timeline
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => handleManageTimeline('004', 'Sara')}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Manage Interview Timeline
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
                              <DropdownMenuItem onSelect={() => handleViewCandidateDetails('005', 'Shruti')}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Interview Timeline
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => handleManageTimeline('005', 'Shruti')}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Manage Interview Timeline
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
                              <DropdownMenuItem onSelect={() => handleViewCandidateDetails('006', 'Robin')}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Interview Timeline
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => handleManageTimeline('006', 'Robin')}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Manage Interview Timeline
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
                              <DropdownMenuItem onSelect={() => handleViewCandidateDetails('007', 'Kayle')}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Interview Timeline
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => handleManageTimeline('007', 'Kayle')}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Manage Interview Timeline
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
                              <DropdownMenuItem onSelect={() => handleViewCandidateDetails('008', 'Vali')}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Interview Timeline
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => handleManageTimeline('008', 'Vali')}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Manage Interview Timeline
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
                              <DropdownMenuItem onSelect={() => handleViewCandidateDetails('009', 'Anne')}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Interview Timeline
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => handleManageTimeline('009', 'Anne')}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Manage Interview Timeline
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                    </Table>
                  </CardContent>
                </Card>
) : (
                viewMode === "calendar" ? (
                  /* Calendar View */
                  <div className="bg-white border rounded-none text-[12px] max-h-[520px] overflow-auto">
                    {/* Top Filter Bar */}
                    <div className="flex items-center justify-between p-2 border-b">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCalendarDate(prev => {
                            const d = new Date(prev);
                            if (calendarView === 'month') return new Date(d.getFullYear(), d.getMonth() - 1, 1);
                            if (calendarView === 'week') { d.setDate(d.getDate() - 7); return d; }
                            d.setDate(d.getDate() - 1); return d;
                          })}
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <div className="text-sm font-semibold">
                          {calendarView === 'month' ? (
                            calendarDate.toLocaleString(undefined, { month: 'long', year: 'numeric' })
                          ) : calendarView === 'week' ? (
                            (() => {
                              const start = new Date(calendarDate);
                              start.setDate(start.getDate() - start.getDay());
                              const end = new Date(start);
                              end.setDate(start.getDate() + 6);
                              return `${start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
                            })()
                          ) : (
                            calendarDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCalendarDate(prev => {
                            const d = new Date(prev);
                            if (calendarView === 'month') return new Date(d.getFullYear(), d.getMonth() + 1, 1);
                            if (calendarView === 'week') { d.setDate(d.getDate() + 7); return d; }
                            d.setDate(d.getDate() + 1); return d;
                          })}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="ml-1" onClick={() => setCalendarDate(new Date())}>Today</Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select value={calendarView} onValueChange={(v) => setCalendarView(v as any)}>
                          <SelectTrigger className="h-7 w-[110px]">
                            <SelectValue placeholder="View" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="week">Week</SelectItem>
                            <SelectItem value="month">Month</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button className="bg-blue-600 hover:bg-blue-700 h-7 text-xs" onClick={() => {
                          const now = new Date();
                          const start = new Date(now);
                          start.setMinutes(0,0,0);
                          const end = new Date(start);
                          end.setHours(start.getHours() + 1);
                          openEventPanel({
                            id: `new-${Date.now()}`,
                            title: '',
                            organizer: '',
                            attendees: [],
                            start: start.toISOString(),
                            end: end.toISOString(),
                            allDay: false,
                            location: '',
                            description: ''
                          });
                        }}>New Event</Button>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <Input
                            value={calendarSearch}
                            onChange={(e) => setCalendarSearch(e.target.value)}
                            placeholder="Search candidate/role"
                            className="pl-10 h-8 w-64 rounded-md text-sm shadow-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Headers (Month/Week) */}
                    {(calendarView === 'month' || calendarView === 'week') && (
                      <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-600 py-1 border-b">
                        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                          <div key={d}>{d}</div>
                        ))}
                      </div>
                    )}

                    {/* Calendar Content */}
                    {calendarView === 'month' && (
                      <div className="grid grid-cols-7 gap-px bg-gray-200">
                        {calendarDays.map((day) => {
                          const isOtherMonth = day.getMonth() !== calendarDate.getMonth();
                          const events = (eventsByDate[formatDate(day)] || []).filter(evt => {
                            const q = calendarSearch.trim().toLowerCase();
                            if (!q) return true;
                            return evt.candidateName.toLowerCase().includes(q) || evt.appliedPosition.toLowerCase().includes(q) || evt.roundName.toLowerCase().includes(q);
                          });
                          return (
                            <div key={day.toISOString()} className={`min-h-[90px] bg-white p-1 ${isOtherMonth ? 'bg-gray-50 text-gray-400' : ''}`}>
                              <div className="text-[10px] font-medium mb-1">{day.getDate()}</div>
                              <div className="space-y-1">
                                {events.map((evt, idx) => {
                                  const c = evt.status?.toLowerCase();
                                  const color = c === 'approved' || c === 'completed' ? 'border-green-200 bg-green-50 text-green-800' : c === 'pending' ? 'border-amber-200 bg-amber-50 text-amber-800' : c === 'rejected' ? 'border-red-200 bg-red-50 text-red-800' : 'border-blue-200 bg-blue-50 text-blue-800';
                                  return (
                                    <div key={idx} className={`border ${color} rounded-none px-1 py-0.5`}>
                                      <div className="text-[10px] font-semibold truncate">{evt.candidateName}</div>
                                      <div className="text-[10px] truncate">{evt.appliedPosition}</div>
                                      <div className="text-[10px] opacity-80 truncate">{evt.roundName}</div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {calendarView === 'week' && (() => {
                      const weekStart = getStartOfWorkWeek(calendarDate);
                      const days = Array.from({ length: 5 }, (_, i) => new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i));
                      return (
                        <div className="border-t">
                          <div className="grid grid-cols-6 text-xs font-medium text-gray-600 border-b">
                            <div className="p-2"></div>
                            {days.map((d, idx) => (
                              <div key={idx} className="p-2 text-center">{d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                            ))}
                          </div>
                          <div
                            className="grid grid-cols-6 relative"
                            onMouseLeave={() => { if (isSelecting) { commitSelectionToDraft(weekStart); resetSelection(); } }}
                            onMouseUp={() => { if (isSelecting) { commitSelectionToDraft(weekStart); resetSelection(); } }}
                          >
                            <div className="border-r bg-gray-50">
                              {timeSlots.map((t, idx) => (
                                <div key={idx} className={`h-8 text-[10px] text-right pr-2 ${t.includes(':00') ? 'font-medium text-gray-600' : 'text-gray-400'}`}>{t}</div>
                              ))}
                            </div>
                            {days.map((d, dayIdx) => (
                              <div key={dayIdx} className="border-r last:border-r-0 relative">
                                {isSelecting && selDayIdx === dayIdx && selStartIdx != null && (
                                  (() => {
                                    const from = Math.min(selStartIdx!, selEndIdx ?? selStartIdx!);
                                    const to = Math.max(selStartIdx!, selEndIdx ?? selStartIdx!);
                                    const top = from * 32;
                                    const height = (to - from + 1) * 32;
                                    return <div className="absolute left-1 right-1 bg-purple-200/60 rounded-md" style={{ top, height }} />
                                  })()
                                )}
                                {timeSlots.map((t, slotIdx) => (
                                  <div
                                    key={slotIdx}
                                    className="h-8 border-b hover:bg-purple-50 cursor-crosshair"
                                    onMouseDown={() => { setIsSelecting(true); setSelDayIdx(dayIdx); setSelStartIdx(slotIdx); setSelEndIdx(slotIdx); }}
                                    onMouseEnter={() => { if (isSelecting && selDayIdx === dayIdx) setSelEndIdx(slotIdx); }}
                                    onClick={() => { if (!isSelecting) { setSelDayIdx(dayIdx); setSelStartIdx(slotIdx); setSelEndIdx(slotIdx); commitSelectionToDraft(weekStart); resetSelection(); } }}
                                  />
                                ))}
                                {calendarEvents.filter(ev => {
                                  const evStart = new Date(ev.start);
                                  return evStart.getFullYear() === d.getFullYear() && evStart.getMonth() === d.getMonth() && evStart.getDate() === d.getDate();
                                }).map(ev => {
                                  const evStart = new Date(ev.start);
                                  const evEnd = new Date(ev.end);
                                  const startIdx = ((evStart.getHours() - WORK_HOURS_START) * 60 + evStart.getMinutes()) / SLOT_MINUTES;
                                  const endIdx = Math.max(startIdx + 1, ((evEnd.getHours() - WORK_HOURS_START) * 60 + evEnd.getMinutes()) / SLOT_MINUTES);
                                  const top = Math.max(0, startIdx * 32);
                                  const height = Math.max(32, (endIdx - startIdx) * 32);
                                  return (
                                    <div key={ev.id} className="absolute left-1 right-1 bg-purple-100 border border-purple-200 rounded-md px-2 py-1 shadow-sm overflow-hidden"
                                      style={{ top, height }}
                                      onClick={() => openEventPanel(ev)}
                                    >
                                      <div className="text-[11px] font-semibold text-purple-800 truncate">{ev.title || '(No title)'}</div>
                                      <div className="text-[10px] text-purple-700 truncate">{ev.organizer}</div>
                                    </div>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {false && calendarView === 'day' && (
                      <div className="p-2 border-t">
                        <div className="text-xs font-medium text-gray-600 mb-2">{calendarDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
                        <div className="space-y-1">
                          {(eventsByDate[formatDate(calendarDate)] || []).filter(evt => {
                            const q = calendarSearch.trim().toLowerCase();
                            if (!q) return true;
                            return evt.candidateName.toLowerCase().includes(q) || evt.appliedPosition.toLowerCase().includes(q) || evt.roundName.toLowerCase().includes(q);
                          }).map((evt, idx) => {
                            const c = evt.status?.toLowerCase();
                            const color = c === 'approved' || c === 'completed' ? 'border-green-200 bg-green-50 text-green-800' : c === 'pending' ? 'border-amber-200 bg-amber-50 text-amber-800' : c === 'rejected' ? 'border-red-200 bg-red-50 text-red-800' : 'border-blue-200 bg-blue-50 text-blue-800';
                            return (
                              <div key={idx} className={`border ${color} rounded-none px-2 py-1`}>
                                <div className="text-xs font-semibold">{evt.candidateName}</div>
                                <div className="text-[11px]">{evt.appliedPosition}</div>
                                <div className="text-[11px] opacity-80">{evt.roundName}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {false && (() => {
                      const dates = Object.keys(eventsByDate).sort();
                      const q = calendarSearch.trim().toLowerCase();
                      return (
                        <div className="divide-y">
                          {dates.map(dateStr => {
                            const day = new Date(dateStr);
                            const events = (eventsByDate[dateStr] || []).filter(evt => !q || evt.candidateName.toLowerCase().includes(q) || evt.appliedPosition.toLowerCase().includes(q) || evt.roundName.toLowerCase().includes(q));
                            if (events.length === 0) return null;
                            return (
                              <div key={dateStr} className="p-3">
                                <div className="text-xs font-semibold text-gray-700 mb-2">{day.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                <div className="space-y-1">
                                  {events.map((evt, idx) => {
                                    const c = evt.status?.toLowerCase();
                                    const color = c === 'approved' || c === 'completed' ? 'border-green-200 bg-green-50 text-green-800' : c === 'pending' ? 'border-amber-200 bg-amber-50 text-amber-800' : c === 'rejected' ? 'border-red-200 bg-red-50 text-red-800' : 'border-blue-200 bg-blue-50 text-blue-800';
                                    return (
                                      <div key={idx} className={`border ${color} rounded-none px-2 py-1`}>
                                        <div className="text-xs font-semibold">{evt.candidateName}</div>
                                        <div className="text-[11px]">{evt.appliedPosition}</div>
                                        <div className="text-[11px] opacity-80">{evt.roundName}</div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  /* Card View */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {interviewCandidates.map((c) => (
                      <Card key={c.id} className="p-4 border border-gray-200">
                        <CardContent className="p-0 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                <span className="text-sm font-medium text-white">{c.applicantName.charAt(0)}</span>
                              </div>
                              <div>
                                <p className="font-semibold text-sm">{c.applicantName}</p>
                                <p className="text-xs text-gray-500">ID: {c.id}</p>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onSelect={() => handleViewCandidateDetails(c.id, c.applicantName)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => handleManageTimeline(c.id, c.applicantName)}>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Manage Interview Timeline
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">Applied Role:</span>
                              <span className="text-xs font-medium truncate ml-2">{c.appliedPosition}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">Current Round:</span>
                              <span className="text-xs font-medium text-blue-600 truncate ml-2">{c.currentRound}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">Status:</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusColor(c.status)}`}>{c.status}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )
              )}
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
              <Card className="border-0 shadow-sm overflow-hidden rounded-none">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30 border-b">
                        <TableHead className="text-center font-medium text-foreground py-1 text-xs">JOB ID</TableHead>
                        <TableHead className="font-medium text-foreground py-1 text-xs">DATE</TableHead>
                        <TableHead className="font-medium text-foreground py-1 text-xs">NAME</TableHead>
                        <TableHead className="font-medium text-foreground py-1 text-xs">COUNTRY</TableHead>
                        <TableHead className="font-medium text-foreground py-1 text-xs">APPLIED POSITION</TableHead>
                        <TableHead className="font-medium text-foreground py-1 text-xs">ROUNDS</TableHead>
                        <TableHead className="font-medium text-foreground py-1 text-xs">ROUNDS DECISION</TableHead>
                        <TableHead className="font-medium text-foreground py-1 text-xs">FINAL DECISION</TableHead>
                        <TableHead className="font-medium text-foreground py-1 text-xs">ACTION</TableHead>
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


      {/* Timeline Management Side Sheet */}
      {showTimelineSheet && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={() => setShowTimelineSheet(false)}
          />

          {/* Side Sheet */}
          <div className={`fixed right-0 top-0 h-full w-[45%] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            showTimelineSheet ? 'translate-x-0' : 'translate-x-full'
          }`}>
            {selectedCandidateForTimeline && (
              <div className="flex flex-col h-full">
                {/* Fixed Header */}
                <div className="flex-shrink-0 p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-md uppercase tracking-wide">
                          CA001
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowTimelineSheet(false)}
                          className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 hover:bg-white rounded-full ml-auto"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <h1 className="text-xl font-bold text-gray-900 mb-1">
                        {selectedCandidateForTimeline.name}
                      </h1>
                      <p className="text-lg text-gray-700 font-medium mb-3">
                        {selectedCandidateForTimeline.position}
                      </p>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Review Room:</span>{' '}
                          <span className="text-blue-600">{selectedCandidateForTimeline.reviewRoom}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Assigned Interviewers:</span>{' '}
                          <span className="font-medium text-gray-900">
                            {selectedCandidateForTimeline.interviewers.join(', ')}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Removed View Details and Send Invitation buttons per requirements */}
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                      <h2 className="text-lg font-semibold text-gray-900">Interview Timeline</h2>
                    </div>

                    {selectedCandidateForTimeline.steps.map((step, index) => (
                      <div key={step.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                        {/* Step Header - Clickable */}
                        <div className="flex items-center justify-between p-4 bg-gray-50">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-700 font-semibold text-sm">{index + 1}</span>
                            </div>
                            <div className="space-y-1">
                              <h3 className="text-base font-medium text-gray-900">
                                {step.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {formatMDYSlash(step.date)} at {step.time} • {step.interviewer}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`text-xs px-2 py-1 ${
                                step.status === 'Pending' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                step.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' :
                                'bg-blue-50 text-blue-700 border-blue-200'
                              }`}
                            >
                              {step.status}
                            </Badge>
                                                      </div>
                        </div>

                        {/* Expanded Content */}
                        {true && (
                          <div className="p-4 bg-white border-t border-gray-200">
                            <div className="space-y-4">
                              {/* Schedule Details */}
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  Schedule Details
                                </h4>
                                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md border-l-4 border-blue-200">
                                  {step.schedule}
                                </p>
                              </div>

                              {/* Step Actions */}
                              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100">
                                <Button variant="outline" size="sm" className="text-xs" onClick={() => {
                                  setSelectedStepId(step.id);
                                  setReminderMessage("");
                                  setShowReminderModal(true);
                                }}>
                                  <Mail className="w-3 h-3 mr-1" />
                                  Send Reminder
                                </Button>
                                <Button variant="outline" size="sm" className="text-xs" onClick={() => {
                                  setSelectedStepId(step.id);
                                  const first = selectedCandidateForTimeline?.interviewers?.[0] || "";
                                  setScheduleForm({ date: "", time: "", interviewer: first });
                                  setShowScheduleModal(true);
                                }}>
                                  <Calendar className="w-3 h-3 mr-1" />
                                  Schedule Interview
                                </Button>
                                <Button variant="outline" size="sm" className="text-xs" onClick={() => {
                                  setSelectedStepId(step.id);
                                  setScheduleForm({ date: step.date || "", time: step.time || "", interviewer: step.interviewer || "" });
                                  setShowRescheduleModal(true);
                                }}>
                                  <Edit3 className="w-3 h-3 mr-1" />
                                  Reschedule Interview
                                </Button>
                                <Button variant="outline" size="sm" className="text-xs" onClick={() => {
                                  setSelectedStepId(step.id);
                                  setRemarkForm({ remarks: step.remarks || "", score: step.score != null ? String(step.score) : "" });
                                  setShowRemarkScoreModal(true);
                                }}>
                                  <MessageSquare className="w-3 h-3 mr-1" />
                                  Submit Interview Results
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Action Modals for Timeline Steps */}
      <Dialog open={showReminderModal} onOpenChange={setShowReminderModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold flex items-center gap-2"><Mail className="w-4 h-4" /> Send Reminder</DialogTitle>
            <DialogDescription>Send a reminder to the candidate or panel member.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-xs">
            <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
              <div className="font-medium text-gray-900">{selectedCandidateForTimeline?.name}</div>
              <div className="text-gray-600">{selectedCandidateForTimeline?.position}</div>
              {currentStep() && (
                <div className="text-gray-600 mt-1">Step: {currentStep()!.title}</div>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Message</label>
              <Textarea rows={4} value={reminderMessage} onChange={(e) => setReminderMessage(e.target.value)} placeholder="Type your reminder message" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReminderModal(false)}>Cancel</Button>
            <Button onClick={() => { setShowReminderModal(false); toast({ title: "Reminder sent successfully" }); }}>Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold flex items-center gap-2"><Calendar className="w-4 h-4" /> Schedule Interview</DialogTitle>
            <DialogDescription>Set the interview schedule for this step.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-xs">
            <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
              <div className="font-medium text-gray-900">{selectedCandidateForTimeline?.name}</div>
              <div className="text-gray-600">{selectedCandidateForTimeline?.position}</div>
              {currentStep() && (
                <div className="text-gray-600 mt-1">Step: {currentStep()!.title}</div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
                <Input type="date" value={scheduleForm.date} onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })} />
                <div className="text-[11px] text-gray-500 mt-1">Selected (mm/dd/yyyy): {scheduleForm.date ? formatMDYSlash(scheduleForm.date) : '-'}</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Time</label>
                <Input type="time" value={scheduleForm.time} onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Interviewer</label>
                <Select value={scheduleForm.interviewer} onValueChange={(v) => setScheduleForm({ ...scheduleForm, interviewer: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interviewer" />
                  </SelectTrigger>
                  <SelectContent>
                    {(selectedCandidateForTimeline?.interviewers || []).map((iv) => (
                      <SelectItem key={iv} value={iv}>{iv}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleModal(false)}>Cancel</Button>
            <Button onClick={() => {
              if (!selectedCandidateForTimeline || !selectedStepId) return setShowScheduleModal(false);
              setSelectedCandidateForTimeline(prev => {
                if (!prev) return prev;
                const steps = prev.steps.map(s => s.id === selectedStepId ? { ...s, date: scheduleForm.date, time: scheduleForm.time, interviewer: scheduleForm.interviewer } : s);
                return { ...prev, steps };
              });
              setShowScheduleModal(false);
              toast({ title: "Interview scheduled successfully" });
            }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showRescheduleModal} onOpenChange={setShowRescheduleModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold flex items-center gap-2"><Edit3 className="w-4 h-4" /> Reschedule Interview</DialogTitle>
            <DialogDescription>Update the existing interview schedule for this step.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-xs">
            <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
              <div className="font-medium text-gray-900">{selectedCandidateForTimeline?.name}</div>
              <div className="text-gray-600">{selectedCandidateForTimeline?.position}</div>
              {currentStep() && (
                <div className="text-gray-600 mt-1">Step: {currentStep()!.title}</div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
                <Input type="date" value={scheduleForm.date} onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })} />
                <div className="text-[11px] text-gray-500 mt-1">Selected (mm/dd/yyyy): {scheduleForm.date ? formatMDYSlash(scheduleForm.date) : '-'}</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Time</label>
                <Input type="time" value={scheduleForm.time} onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Interviewer</label>
                <Select value={scheduleForm.interviewer} onValueChange={(v) => setScheduleForm({ ...scheduleForm, interviewer: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interviewer" />
                  </SelectTrigger>
                  <SelectContent>
                    {(selectedCandidateForTimeline?.interviewers || []).map((iv) => (
                      <SelectItem key={iv} value={iv}>{iv}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRescheduleModal(false)}>Cancel</Button>
            <Button onClick={() => {
              if (!selectedCandidateForTimeline || !selectedStepId) return setShowRescheduleModal(false);
              setSelectedCandidateForTimeline(prev => {
                if (!prev) return prev;
                const steps = prev.steps.map(s => s.id === selectedStepId ? { ...s, date: scheduleForm.date, time: scheduleForm.time, interviewer: scheduleForm.interviewer } : s);
                return { ...prev, steps };
              });
              setShowRescheduleModal(false);
              toast({ title: "Interview rescheduled successfully" });
            }}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showRemarkScoreModal} onOpenChange={setShowRemarkScoreModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold flex items-center gap-2"><FileText className="w-4 h-4" /> Submit Interview Results</DialogTitle>
            <DialogDescription>Confirm and Submit your Interview Assessment</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-xs">
            <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
              <div className="font-medium text-gray-900">{selectedCandidateForTimeline?.name}</div>
              <div className="text-gray-600">{selectedCandidateForTimeline?.position}</div>
              {currentStep() && (
                <div className="text-gray-600 mt-1">Step: {currentStep()!.title}</div>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Remarks</label>
              <Textarea rows={4} value={remarkForm.remarks} onChange={(e) => setRemarkForm({ ...remarkForm, remarks: e.target.value })} placeholder="Write your remarks" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Score</label>
              <Input type="number" min="0" max="100" value={remarkForm.score} onChange={(e) => setRemarkForm({ ...remarkForm, score: e.target.value })} placeholder="e.g., 85" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRemarkScoreModal(false)}>Cancel</Button>
            <Button onClick={() => {
              if (!selectedCandidateForTimeline || !selectedStepId) return setShowRemarkScoreModal(false);
              const scoreNum = remarkForm.score ? Number(remarkForm.score) : undefined;
              setSelectedCandidateForTimeline(prev => {
                if (!prev) return prev;
                const steps = prev.steps.map(s => s.id === selectedStepId ? { ...s, remarks: remarkForm.remarks, score: scoreNum } : s);
                return { ...prev, steps };
              });
              setShowRemarkScoreModal(false);
              toast({ title: "Remark & score submitted successfully" });
            }}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Candidate Details Modal */}
      <Dialog open={showCandidateDetailsModal} onOpenChange={setShowCandidateDetailsModal}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold">Interview Details</DialogTitle>
          </DialogHeader>

          {selectedCandidateDetails && (
            <div className="space-y-3 text-xs">
              {/* Candidate Header */}
              <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {/* Profile Picture (Initial Icon) */}
                    <div className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {selectedCandidateDetails.applicantName.charAt(0)}
                      </span>
                    </div>

                    {/* Basic Info */}
                    <div>
                      <h1 className="text-sm font-bold text-gray-900 mb-0.5">
                        {selectedCandidateDetails.applicantName}
                      </h1>
                      <p className="text-xs text-gray-700 font-medium">
                        {selectedCandidateDetails.appliedPosition}
                      </p>
                    </div>
                  </div>

                  {/* Room ID (top-right) */}
                  <div>
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300 font-medium text-xs px-2 py-0.5">
                      {selectedCandidateDetails.roomId}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Contact Information & Review Room - Single Card */}
              <Card>
                <CardContent className="p-3">
                  <div className="space-y-3">
                    {/* Contact Information */}
                    <div>
                      <h3 className="text-xs font-semibold text-gray-900 mb-2">Contact Information</h3>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <span className="text-xs font-medium">Email:</span>
                          <span className="text-xs text-gray-700">{selectedCandidateDetails.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span className="text-xs font-medium">Phone:</span>
                          <span className="text-xs text-gray-700">{selectedCandidateDetails.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Interview Steps Section */}
              <Card>
                <CardContent className="p-3">
                  <h3 className="text-xs font-semibold text-gray-900 mb-2">Interview Steps</h3>
                  <div className="space-y-2">
                    {selectedCandidateDetails.interviewSteps.map((step, index) => (
                      <div key={step.id} className="border border-gray-200 rounded-lg p-2 relative">
                        {/* Status Badge (top-right corner) */}
                        <div className="absolute top-2 right-2">
                          <Badge
                            className={
                              step.status === 'Completed'
                                ? 'bg-green-100 text-green-800 border-green-200 text-xs px-1.5 py-0.5'
                                : 'bg-gray-100 text-gray-800 border-gray-200 text-xs px-1.5 py-0.5'
                            }
                          >
                            {step.status}
                          </Badge>
                        </div>

                        {/* Step Header */}
                        <div className="mb-2 pr-16">
                          <h4 className="text-xs font-semibold text-gray-900 mb-0.5">
                            {index + 1}. {step.title}
                          </h4>
                          <p className="text-xs text-gray-600 font-medium">
                            Interviewer: {step.interviewer}
                          </p>
                        </div>

                        {/* Description */}
                        <div className="mb-2">
                          <p className="text-xs text-gray-700">
                            Description: "{step.description}"
                          </p>
                        </div>

                        {/* Date & Time */}
                        <div className="mb-2">
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Calendar className="h-3 w-3" />
                            <span>{formatMDYSlash(step.date)} at {step.time}</span>
                          </div>
                        </div>

                        {/* Remarks (only if available) */}
                        {step.remarks && (
                          <div className="mt-2 p-2 bg-gray-50 rounded-md">
                            <p className="text-xs font-medium text-gray-700 mb-0.5">Remarks:</p>
                            <p className="text-xs text-gray-600">"{step.remarks}"</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

            </div>
          )}
        </DialogContent>
      </Dialog>

   </div>
 );
}
