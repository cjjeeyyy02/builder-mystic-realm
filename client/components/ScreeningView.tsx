import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  ExternalLink,

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
  MoreVertical,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

import { screeningCandidates, type ScreeningCandidate } from "@/data/screeningCandidates";

// Separate ActionDropdown component to prevent state conflicts
const ActionDropdown = React.memo(({
  candidateId,
  candidate,
  onUpdateStatus,
  onEmail,
  onViewResume
}: {
  candidateId: string;
  candidate: ScreeningCandidate;
  onUpdateStatus: (candidate: ScreeningCandidate) => void;
  onEmail: (candidate: ScreeningCandidate) => void;
  onViewResume: (candidate: ScreeningCandidate) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdateStatusClick = useCallback(() => {
    setIsOpen(false);
    onUpdateStatus(candidate);
  }, [candidate, onUpdateStatus]);

  const handleEmailClick = useCallback(() => {
    setIsOpen(false);
    onEmail(candidate);
  }, [candidate, onEmail]);

  const handleViewClick = useCallback(() => {
    setIsOpen(false);
    onViewResume(candidate);
  }, [candidate, onViewResume]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="text-gray-500 hover:text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          onClick={handleUpdateStatusClick}
          className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
        >
          <Clock className="w-4 h-4" />
          Update Status
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleViewClick}
          className="flex items-center gap-2 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"
        >
          <Eye className="w-4 h-4" />
          View Candidate Details
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

ActionDropdown.displayName = 'ActionDropdown';

// Simple fallback action menu without dropdown (in case of issues)
const SimpleActionMenu = React.memo(({
  candidateId,
  candidate,
  onUpdateStatus,
  onEmail,
  onViewResume
}: {
  candidateId: string;
  candidate: ScreeningCandidate;
  onUpdateStatus: (candidate: ScreeningCandidate) => void;
  onEmail: (candidate: ScreeningCandidate) => void;
  onViewResume: (candidate: ScreeningCandidate) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="text-gray-500 hover:text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-20 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg">
            <button
              onClick={() => {
                setIsOpen(false);
                onUpdateStatus(candidate);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 text-left"
            >
              <Clock className="w-4 h-4" />
              Update Status
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onViewResume(candidate);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 hover:text-gray-700 text-left"
            >
              <Eye className="w-4 h-4" />
              View Candidate Details
            </button>
          </div>
        </>
      )}
    </div>
  );
});

SimpleActionMenu.displayName = 'SimpleActionMenu';

function getStatusVariant(
  status: string,
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "approved":
      return "default";
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

  // Flag to switch between dropdown implementations (for debugging)
  const useSimpleMenu = true;
  const [selectedCandidate, setSelectedCandidate] = useState<ScreeningCandidate | null>(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [screeningNotes, setScreeningNotes] = useState("");

  // Update Screening Status Modal
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);
  const [statusCandidate, setStatusCandidate] = useState<ScreeningCandidate | null>(null);
  const [statusNotes, setStatusNotes] = useState("");

  // UI states
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Debounce search query to improve performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

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

  // Memoize filtered candidates to prevent unnecessary re-renders
  const filteredCandidates = useMemo(() => {
    let filtered = candidates;

    // Apply status filter
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    // Apply search filter
    const q = debouncedSearchQuery.toLowerCase().trim();
    if (q) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.position.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [candidates, debouncedSearchQuery, statusFilter]);

  const handleStatusChange = useCallback((
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
  }, [selectedCandidate]);

  const handleViewResume = useCallback((candidate: ScreeningCandidate) => {
    setSelectedCandidate(candidate);
    setShowResumeModal(true);
  }, []);

  const handleEmailCandidate = useCallback((candidate: ScreeningCandidate) => {
    setEmailCandidate(candidate);
    setShowEmailSheet(true);
  }, []);

  const handleApprove = useCallback((candidateId: string) => {
    setModalCandidateId(candidateId);
    setShowApproveModal(true);
  }, []);

  const handleReject = useCallback((candidateId: string) => {
    setModalCandidateId(candidateId);
    setShowRejectModal(true);
  }, []);

  const handleUpdateStatus = useCallback((candidate: ScreeningCandidate) => {
    setStatusCandidate(candidate);
    setStatusNotes("");
    setShowUpdateStatusModal(true);
  }, []);

  const handleStatusReject = useCallback(() => {
    if (statusCandidate) {
      setCandidates(prev => prev.map(c => c.id === statusCandidate.id ? { ...c, status: 'reject', rejectionReason: statusNotes } : c));
      if (selectedCandidate && selectedCandidate.id === statusCandidate.id) {
        setSelectedCandidate(prev => prev ? { ...prev, status: 'reject', rejectionReason: statusNotes } : null);
      }
    }
    setShowUpdateStatusModal(false);
    setStatusCandidate(null);
    setStatusNotes("");
  }, [statusCandidate, statusNotes, selectedCandidate]);

  const handleStatusProceed = useCallback(() => {
    if (statusCandidate) {
      setCandidates(prev => prev.map(c => c.id === statusCandidate.id ? { ...c, status: 'approved' } : c));
      if (selectedCandidate && selectedCandidate.id === statusCandidate.id) {
        setSelectedCandidate(prev => prev ? { ...prev, status: 'approved' } : null);
      }
    }
    setShowUpdateStatusModal(false);
    setStatusCandidate(null);
    setStatusNotes("");
  }, [statusCandidate, selectedCandidate]);

  // Action component switcher
  const ActionComponent = useSimpleMenu ? SimpleActionMenu : ActionDropdown;

  return (
    <div className="space-y-2">

      {/* Controls: search + status filter + view toggle */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-none w-64">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <input
              className="pl-10 h-8 w-full rounded-md border border-gray-200 bg-white text-sm shadow-sm"
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value)}
          >
            <SelectTrigger className="w-[140px] h-8 text-muted-foreground">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="reject">Rejected</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant={viewMode === "table" ? "default" : "outline"} onClick={() => setViewMode("table")}><List className="w-4 h-4" /></Button>
          <Button size="sm" variant={viewMode === "grid" ? "default" : "outline"} onClick={() => setViewMode("grid")}><Grid className="w-4 h-4" /></Button>
          <Button size="sm" variant="outline" onClick={() => {
            const headers = ['Name','Position','Total Experience','Email','Phone','Status'];
            const rows = filteredCandidates.map(c => [c.name, c.position, c.totalExperience, c.email, c.phone, c.status]);
            const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${String(v).replace(/\"/g,'""')}"`).join(','))].join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a'); a.href = url; a.download = 'screening_candidates.csv'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
          }}>
            <Download className="w-4 h-4 mr-1" /> Export
          </Button>
        </div>
      </div>

      {/* Screening Candidates */}

      {/* Table View */}
      {viewMode === "table" && (
        <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200">
            <div className="w-full">
              <table className="w-full table-fixed">
                <colgroup>
                  <col className="w-[20%]" />
                  <col className="w-[18%]" />
                  <col className="w-[12%]" />
                  <col className="w-[20%]" />
                  <col className="w-[14%]" />
                  <col className="w-[8%]" />
                  <col className="w-[8%]" />
                </colgroup>
                <thead>
                  <tr className="border-b border-gray-200/60">
                    <th className="text-left px-2 py-2 text-xs font-bold text-gray-900 bg-white uppercase tracking-wider">
                      CANDIDATE
                    </th>
                    <th className="text-left px-2 py-2 text-xs font-bold text-gray-900 bg-white uppercase tracking-wider">
                      APPLIED POSITION
                    </th>
                    <th className="text-left px-2 py-2 text-xs font-bold text-gray-900 bg-white uppercase tracking-wider">
                      TOTAL EXPERIENCE
                    </th>
                    <th className="text-left px-2 py-2 text-xs font-bold text-gray-900 bg-white uppercase tracking-wider">
                      EMAIL
                    </th>
                    <th className="text-left px-2 py-2 text-xs font-bold text-gray-900 bg-white uppercase tracking-wider">
                      PHONE NUMBER
                    </th>
                    <th className="text-left px-2 py-2 text-xs font-bold text-gray-900 bg-white uppercase tracking-wider">
                      STATUS
                    </th>
                    <th className="text-center px-2 py-2 text-xs font-bold text-gray-900 bg-white uppercase tracking-wider">
                      ACTION
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="w-full max-h-[600px] overflow-y-auto">
            <table className="w-full table-fixed">
                <colgroup>
                  <col className="w-[20%]" />
                  <col className="w-[18%]" />
                  <col className="w-[12%]" />
                  <col className="w-[20%]" />
                  <col className="w-[14%]" />
                  <col className="w-[8%]" />
                  <col className="w-[8%]" />
                </colgroup>
              <tbody className="divide-y divide-gray-200/40">
                {filteredCandidates.map((candidate, index) => {
                  const candidateInitials = candidate.name.split(" ").map(n => n[0]).join("");
                  const statusBadgeClass = candidate.status === 'approved'
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : candidate.status === 'reject'
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : 'bg-gray-100 text-gray-800 border border-gray-200';
                  const statusText = candidate.status === 'approved' ? 'Approved' :
                                   candidate.status === 'reject' ? 'Rejected' : 'Pending';

                  return (
                    <tr
                      key={candidate.id}
                      className={`hover:bg-blue-50/60 transition-colors duration-200 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/20'
                      }`}
                      style={{height: '44px'}}
                    >
                      <td className="px-2 py-1.5">
                        <div className="flex items-center space-x-2">
                          <div className="flex-shrink-0">
                            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
                              <span className="text-xs font-medium text-white">
                                {candidateInitials}
                              </span>
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-gray-900 truncate" title={candidate.name}>
                              {candidate.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate" title={candidate.location}>
                              {candidate.location}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-1.5">
                        <div className="text-xs text-gray-900 truncate" title={candidate.position}>{candidate.position}</div>
                      </td>
                      <td className="px-2 py-1.5">
                        <div className="text-xs font-medium text-gray-900">{candidate.totalExperience}</div>
                      </td>
                      <td className="px-2 py-1.5">
                        <div className="text-xs text-gray-900 truncate" title={candidate.email}>{candidate.email}</div>
                      </td>
                      <td className="px-2 py-1.5">
                        <div className="text-xs text-gray-900">{candidate.phone}</div>
                      </td>
                      <td className="px-2 py-1.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-none text-xs font-medium ${statusBadgeClass}`}>
                          {statusText}
                        </span>
                      </td>
                      <td className="px-2 py-1.5 text-center">
                        <div className="flex items-center justify-center">
                          <ActionComponent
                            candidateId={candidate.id}
                            candidate={candidate}
                            onUpdateStatus={handleUpdateStatus}
                            onEmail={handleEmailCandidate}
                            onViewResume={(c) => {
                              setResumeMode('view');
                              handleViewResume(c);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredCandidates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">No candidates found matching your search criteria.</p>
            </div>
          )}
        </div>
      )}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCandidates.map((candidate) => (
            <Card
              key={candidate.id}
              className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-transparent hover:border-l-primary/30"
            >
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Header with Avatar and Status */}
                  <div className="flex items-start justify-between">
                    <Avatar className="h-12 w-12 flex-shrink-0 ring-1 ring-primary/10">
                      <AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/20 text-primary font-semibold text-sm">
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {(candidate.status === "approved" || candidate.status === "reject") && (
                      <Badge
                        variant={getStatusVariant(candidate.status)}
                        className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                          candidate.status === "approved"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-red-100 text-red-700 border-red-200"
                        }`}
                      >
                        {candidate.status === "approved" ? "Approved" : "Rejected"}
                      </Badge>
                    )}
                  </div>

                  {/* Candidate Info */}
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm leading-tight">
                        {candidate.name}
                      </h3>
                      <div className="text-xs text-muted-foreground">ID: {candidate.id}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-medium">Applied Position:</div>
                      <p className="text-sm font-medium text-foreground">
                        {candidate.position}
                      </p>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <div className="text-xs">
                      <div className="text-muted-foreground">Total Experience</div>
                      <div className="font-semibold text-foreground">{candidate.totalExperience}</div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="w-3 h-3 flex-shrink-0 text-primary/70" />
                      <span className="font-medium truncate">{candidate.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Phone className="w-3 h-3 flex-shrink-0 text-primary/70" />
                      <span className="font-medium">{candidate.phone}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t flex justify-end">
                    <ActionComponent
                      candidateId={candidate.id}
                      candidate={candidate}
                      onUpdateStatus={handleUpdateStatus}
                      onEmail={handleEmailCandidate}
                      onViewResume={(c) => {
                        setResumeMode('view');
                        handleViewResume(c);
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Resume Viewer Modal */}
      <Dialog open={showResumeModal} onOpenChange={setShowResumeModal}>
        <DialogContent className="w-[95vw] max-w-7xl h-[95vh] overflow-hidden p-0 text-xs sm:text-sm">
          {selectedCandidate && (
            <>
              <DialogHeader className="p-3 sm:p-4 border-b">
                <DialogTitle className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    <div>
                      <h2 className="text-sm sm:text-base font-semibold">{selectedCandidate.name}</h2>
                      <p className="text-xs sm:text-sm text-gray-600 font-normal">{selectedCandidate.position}</p>
                    </div>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="flex flex-col xl:flex-row gap-3 xl:gap-4 h-[calc(95vh-180px)] overflow-hidden">
                {/* Main Panel - Resume Content */}
                <div className="flex-1 overflow-y-auto space-y-2 sm:space-y-3 px-3 sm:px-4 xl:pr-3">
                  {/* Quick Info Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-md border border-gray-200">
                    <div className="text-center">
                      <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mx-auto mb-1" />
                      <div className="font-semibold text-xs sm:text-sm">{selectedCandidate.totalExperience}</div>
                      <div className="text-xs text-gray-600">Total Experience</div>
                    </div>
                    <div className="text-center">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mx-auto mb-1" />
                      <div className="font-semibold text-xs sm:text-sm">{selectedCandidate.location}</div>
                      <div className="text-xs text-gray-600">Location</div>
                    </div>
                    <div className="text-center">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 mx-auto mb-1" />
                      <div className="font-semibold text-xs sm:text-sm">{selectedCandidate.availability}</div>
                      <div className="text-xs text-gray-600">Availability</div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <Card>
                    <CardContent className="p-2 sm:p-3">
                      <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
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
                      {/* If resumeMode is download show download button */}
                      {resumeMode === 'download' && selectedCandidate.resumeUrl && (
                        <div className="mt-3">
                          <a href={selectedCandidate.resumeUrl} download className="inline-flex items-center gap-2 px-3 py-2 bg-gray-800 text-white rounded text-sm">
                            <Download className="w-4 h-4" /> Download Resume
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Professional Summary */}
                  {selectedCandidate.summary && (
                    <Card>
                      <CardContent className="p-2 sm:p-3">
                        <h3 className="font-semibold mb-2 text-sm">Professional Summary</h3>
                        <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{selectedCandidate.summary}</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Work Experience */}
                  {selectedCandidate.workHistory && selectedCandidate.workHistory.length > 0 && (
                    <Card>
                      <CardContent className="p-2 sm:p-3">
                        <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                          <Briefcase className="w-4 h-4" />
                          Work Experience
                        </h3>
                        <div className="space-y-2 sm:space-y-3">
                          {selectedCandidate.workHistory.map((job, index) => (
                            <div key={index} className="border-l-2 border-blue-200 pl-2 sm:pl-3 pb-2 sm:pb-3">
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
                      <CardContent className="p-2 sm:p-3">
                        <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
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
                      <CardContent className="p-2 sm:p-3">
                        <h3 className="font-semibold mb-2 text-sm">Skills & Technologies</h3>
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
                      <CardContent className="p-2 sm:p-3">
                        <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
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
                  <h3 className="font-semibold text-sm">Screening Assessment</h3>

                  {/* Quick Actions */}
                  <Card>
                    <CardContent className="p-2 sm:p-3">
                      <h4 className="font-medium mb-3 text-sm sm:text-base">Quick Actions</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start text-xs sm:text-sm h-7 px-2">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                          Schedule Interview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Candidate Details */}
                  <Card>
                    <CardContent className="p-2 sm:p-3">
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
                    <CardContent className="p-2 sm:p-3">
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
                    <CardContent className="p-2 sm:p-3">
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

            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Approve Confirmation Modal */}
      <Dialog open={showApproveModal} onOpenChange={setShowApproveModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Approve Candidate?</DialogTitle>
            <DialogDescription>This candidate will proceed to Interview.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" onClick={() => { setShowApproveModal(false); setModalCandidateId(null); }}>Cancel</Button>
              <Button onClick={() => {
                if (modalCandidateId) handleStatusChange(modalCandidateId, 'approved');
                setShowApproveModal(false);
                setModalCandidateId(null);
              }}>Approve</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Modal */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reason for Rejection</DialogTitle>
            <DialogDescription>Please provide a reason for rejecting this candidate.</DialogDescription>
          </DialogHeader>
          <div className="p-3">
            <Label>Rejection Reason</Label>
            <Textarea value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} className="min-h-[120px]" />
            <div className="flex items-center justify-end gap-2 mt-3">
              <Button variant="outline" onClick={() => { setShowRejectModal(false); setModalCandidateId(null); setRejectionReason(''); }}>Cancel</Button>
              <Button onClick={() => {
                if (modalCandidateId) {
                  setCandidates(prev => prev.map(c => c.id === modalCandidateId ? { ...c, status: 'reject', rejectionReason } : c));
                  if (selectedCandidate && selectedCandidate.id === modalCandidateId) setSelectedCandidate(prev => prev ? { ...prev, status: 'reject', rejectionReason } : null);
                }
                setShowRejectModal(false);
                setModalCandidateId(null);
                setRejectionReason('');
              }}>Submit</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Update Screening Status Modal */}
      <Dialog open={showUpdateStatusModal} onOpenChange={setShowUpdateStatusModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Screening Status</DialogTitle>
            <DialogDescription>
              {statusCandidate && `Update the screening status for ${statusCandidate.name}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="statusNotes">Screening Notes</Label>
              <Textarea
                id="statusNotes"
                placeholder="Add notes about the candidate's screening..."
                value={statusNotes}
                onChange={(e) => setStatusNotes(e.target.value)}
                className="min-h-[100px] mt-1"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowUpdateStatusModal(false);
                setStatusCandidate(null);
                setStatusNotes("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleStatusReject}
              className="bg-red-600 hover:bg-red-700"
            >
              <X className="w-4 h-4 mr-2" />
              Reject
            </Button>
            <Button
              onClick={handleStatusProceed}
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="w-4 h-4 mr-2" />
              Proceed
            </Button>
          </DialogFooter>
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
