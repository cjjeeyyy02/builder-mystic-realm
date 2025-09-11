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
  UserPlus,
  ArrowRight,
  ArrowLeft,
  Check,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Briefcase,
  GraduationCap,
} from "lucide-react";

// Types for Round Management
interface InterviewRound {
  id: string;
  roundHeader: string;
  roundName: string;
  roundType: string;
  interviewMode: "technical" | "non-technical" | "final";
  testDescription: string;
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
    order: number;
    roundName: string;
    roundType: string;
    interviewMode: string;
  }[];
}

interface InterviewCandidate {
  id: string;
  applicantName: string;
  appliedPosition: string;
  department: string;
  email: string;
  phone: string;
  assignedRounds?: string[];
  missingRounds?: string[];
}

// Sample data
const defaultInterviewRounds: InterviewRound[] = [
  {
    id: "round-1",
    roundHeader: "Round 1",
    roundName: "Technical Screening",
    roundType: "technical",
    interviewMode: "technical",
    testDescription: "Basic coding assessment",
    attachedFiles: [],
    scheduledDate: "2024-02-15",
    scheduledTime: "10:00",
    status: "incomplete",
    candidates: ["001", "002"],
  },
  {
    id: "round-2",
    roundHeader: "Round 2",
    roundName: "System Design",
    roundType: "technical",
    interviewMode: "technical",
    testDescription: "System architecture discussion",
    attachedFiles: [],
    scheduledDate: "2024-02-16",
    scheduledTime: "14:00",
    status: "incomplete",
    candidates: ["001"],
  },
];

const roundTemplates: RoundTemplate[] = [
  {
    id: "template-1",
    name: "Software Engineer Template",
    description: "Standard interview process for software engineering roles",
    rounds: [
      { order: 1, roundName: "Technical Screening", roundType: "technical", interviewMode: "online-assessment" },
      { order: 2, roundName: "System Design", roundType: "technical", interviewMode: "video-call" },
      { order: 3, roundName: "Cultural Fit", roundType: "non-technical", interviewMode: "video-call" },
      { order: 4, roundName: "Final Interview", roundType: "final", interviewMode: "in-person" },
    ],
  },
  {
    id: "template-2",
    name: "Designer Template",
    description: "Comprehensive template for design positions",
    rounds: [
      { order: 1, roundName: "Portfolio Review", roundType: "non-technical", interviewMode: "video-call" },
      { order: 2, roundName: "Design Challenge", roundType: "technical", interviewMode: "take-home" },
      { order: 3, roundName: "Team Collaboration", roundType: "non-technical", interviewMode: "video-call" },
    ],
  },
];

const interviewCandidates: InterviewCandidate[] = [
  { id: "001", applicantName: "Sarah Mitchell", appliedPosition: "Senior Developer", department: "Engineering", email: "sarah@example.com", phone: "+1234567890" },
  { id: "002", applicantName: "John Davis", appliedPosition: "Product Manager", department: "Product", email: "john@example.com", phone: "+1234567891" },
  { id: "003", applicantName: "Emily Chen", appliedPosition: "UX Designer", department: "Design", email: "emily@example.com", phone: "+1234567892" },
];

const candidateOptions = [
  { value: "all", label: "All Candidates" },
  { value: "assigned", label: "Assigned" },
  { value: "unassigned", label: "Unassigned" },
];

export default function RoundsReview() {
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

  const handleBulkAssign = () => {
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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Rounds Review</h1>
      </div>

      <div className="space-y-3">
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

          <Select value={jobRole} onValueChange={setJobRole}>
            <SelectTrigger className="w-32 h-7 text-xs">
              <SelectValue placeholder="JOB ROLE" />
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
            onClick={() => {
              console.log("Add new rounds functionality to be implemented");
            }}
            className="h-7 px-3 text-xs bg-emerald-500 hover:bg-emerald-600 text-white font-medium"
          >
            ADD NEW STEPS
          </Button>
        </div>

        {/* Step Type Tabs */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Button
              variant={activeRoundType === "technical" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveRoundType("technical")}
              className={`h-6 px-3 text-xs ${
                activeRoundType === "technical"
                  ? "bg-gray-900 text-white hover:bg-gray-800"
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
                  ? "bg-gray-900 text-white hover:bg-gray-800"
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
                  ? "bg-gray-900 text-white hover:bg-gray-800"
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
                <p className="text-gray-500 font-medium text-xs">
                  Add new round functionality removed
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1 - Expanded */}
              <Card className="border-2 border-gray-300">
                <CardContent className="p-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-xs">STEP 1</h3>
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
                          <label className="block text-xs font-medium mb-1">Step Name</label>
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
                          <label className="block text-xs font-medium mb-1">Step Type</label>
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

                      {/* Step Details */}
                      <div>
                        <label className="block text-xs font-medium mb-1">Step Details</label>
                        <Textarea
                          value={currentRoundForm.roundDetails}
                          onChange={(e) => setCurrentRoundForm(prev => ({...prev, roundDetails: e.target.value}))}
                          className="h-20 text-xs resize-none"
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
                        <Button className="bg-gray-900 hover:bg-gray-800 text-white h-7 px-3 text-xs">
                          EDIT THIS TEMPLATE
                        </Button>
                        <Button className="bg-gray-900 hover:bg-gray-800 text-white h-7 px-3 text-xs">
                          SAVE STEP
                        </Button>
                        <Button
                          onClick={() => {
                            setShowRoundsEmailInterface(true);
                          }}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white h-6 px-2 text-xs"
                        >
                          EMAIL
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* STEP 2 - Collapsed */}
              <Card className="border-2 border-gray-300 bg-white">
                <CardContent className="p-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xs text-gray-900">STEP 2</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedRound(expandedRound === 2 ? 0 : 2)}
                      className="h-5 w-5 p-0 text-gray-700 hover:bg-gray-100"
                    >
                      ▼
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* STEP 3 - Collapsed */}
              <Card className="border-2 border-gray-300 bg-white">
                <CardContent className="p-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xs text-gray-900">STEP 3</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedRound(expandedRound === 3 ? 0 : 3)}
                      className="h-5 w-5 p-0 text-gray-700 hover:bg-gray-100"
                    >
                      ▼
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* STEP 4 - Collapsed */}
              <Card className="border-2 border-gray-300 bg-white">
                <CardContent className="p-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xs text-gray-900">STEP 4</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedRound(expandedRound === 4 ? 0 : 4)}
                      className="h-5 w-5 p-0 text-gray-700 hover:bg-gray-100"
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

      {/* Bulk Assignment Modal */}
      <Dialog open={showBulkAssignModal} onOpenChange={setShowBulkAssignModal}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Bulk Round Assignment</DialogTitle>
            <DialogDescription>
              Assign multiple rounds to selected candidates simultaneously.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Candidates Selection */}
            <div>
              <h3 className="font-semibold mb-4">Select Candidates ({selectedCandidatesForAssignment.length} selected)</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
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
              <Check className="w-4 h-4 mr-2" />
              Apply Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
