import React, { useState, useMemo, useCallback, useEffect } from "react";
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
  onApprove,
  onReject,
  onEmail,
  onViewResume
}: {
  candidateId: string;
  candidate: ScreeningCandidate;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onEmail: (candidate: ScreeningCandidate) => void;
  onViewResume: (candidate: ScreeningCandidate) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleApproveClick = useCallback(() => {
    setIsOpen(false);
    onApprove(candidateId);
  }, [candidateId, onApprove]);

  const handleRejectClick = useCallback(() => {
    setIsOpen(false);
    onReject(candidateId);
  }, [candidateId, onReject]);

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
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={handleApproveClick}
          className="flex items-center gap-2 hover:bg-green-50 hover:text-green-700 cursor-pointer"
        >
          <Check className="w-4 h-4" />
          Approve
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleRejectClick}
          className="flex items-center gap-2 hover:bg-red-50 hover:text-red-700 cursor-pointer"
        >
          <X className="w-4 h-4" />
          Reject
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleEmailClick}
          className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          Send Email
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleViewClick}
          className="flex items-center gap-2 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"
        >
          <Eye className="w-4 h-4" />
          View Details
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
  onApprove,
  onReject,
  onEmail,
  onViewResume
}: {
  candidateId: string;
  candidate: ScreeningCandidate;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
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
          <div className="absolute right-0 top-full z-20 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
            <button
              onClick={() => {
                setIsOpen(false);
                onApprove(candidateId);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-green-50 hover:text-green-700 text-left"
            >
              <Check className="w-4 h-4" />
              Approve
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onReject(candidateId);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-red-50 hover:text-red-700 text-left"
            >
              <X className="w-4 h-4" />
              Reject
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onEmail(candidate);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 text-left"
            >
              <Send className="w-4 h-4" />
              Send Email
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onViewResume(candidate);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 hover:text-gray-700 text-left"
            >
              <Eye className="w-4 h-4" />
              View Details
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
  const useSimpleMenu = false;
  const [selectedCandidate, setSelectedCandidate] = useState<ScreeningCandidate | null>(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [screeningNotes, setScreeningNotes] = useState("");

  // UI states
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

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
    const q = debouncedSearchQuery.toLowerCase().trim();
    if (!q) return candidates;

    return candidates.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.position.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  }, [candidates, debouncedSearchQuery]);

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

  return (
    <div className="space-y-2">

      {/* Controls: search + view toggle */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-none w-64">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <input
            className="pl-10 h-8 w-full rounded-md border border-gray-200 bg-white text-sm shadow-sm"
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
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 bg-gray-50">
                      Candidate
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 bg-gray-50">
                      Position
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 bg-gray-50">
                      Experience
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 bg-gray-50">
                      Contact
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 bg-gray-50">
                      Status
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900 bg-gray-50">
                      Actions
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full min-w-[800px]">
              <tbody className="divide-y divide-gray-100">
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
                      className={`hover:bg-blue-50 transition-colors duration-150 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                {candidateInitials}
                              </span>
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {candidate.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {candidate.location}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{candidate.position}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{candidate.totalExperience}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{candidate.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeClass}`}>
                          {statusText}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end">
                          <ActionDropdown
                            candidateId={candidate.id}
                            candidate={candidate}
                            onApprove={handleApprove}
                            onReject={handleReject}
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
                    <ActionDropdown
                      candidateId={candidate.id}
                      candidate={candidate}
                      onApprove={(id) => handleStatusChange(id, 'approved')}
                      onReject={(id) => handleStatusChange(id, 'reject')}
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
                    <div className="flex items-center gap-2">
                      <button onClick={() => setResumeMode('view')} className={`px-2 py-1 rounded text-xs ${resumeMode === 'view' ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>
                        <Eye className="w-3 h-3 mr-1 inline" /> View
                      </button>
                      <button onClick={() => setResumeMode('download')} className={`px-2 py-1 rounded text-xs ${resumeMode === 'download' ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>
                        <Download className="w-3 h-3 mr-1 inline" /> Download
                      </button>
                    </div>
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
