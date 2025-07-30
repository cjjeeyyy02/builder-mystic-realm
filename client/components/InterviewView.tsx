import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mail, Plus, Edit3, Calendar, CheckCircle, XCircle, Clock, FileText, Users } from "lucide-react";

interface InterviewCandidate {
  id: string;
  applicantName: string;
  appliedPosition: string;
  department: string;
  currentRound: string;
  status: "in-progress" | "completed" | "pending";
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

const interviewCandidates: InterviewCandidate[] = [
  {
    id: "1",
    applicantName: "Sarah Mitchell",
    appliedPosition: "Senior Software Engineer",
    department: "Engineering",
    currentRound: "Technical Assessment - Final",
    status: "in-progress",
  },
  {
    id: "2",
    applicantName: "James Rodriguez",
    appliedPosition: "Product Manager",
    department: "Product",
    currentRound: "Behavioral Interview - Round 2",
    status: "completed",
  },
  {
    id: "3",
    applicantName: "Emily Chen",
    appliedPosition: "UX Designer",
    department: "Design",
    currentRound: "Portfolio Review - Round 1",
    status: "pending",
  },
  {
    id: "4",
    applicantName: "Michael Thompson",
    appliedPosition: "Data Analyst",
    department: "Analytics",
    currentRound: "Case Study Presentation",
    status: "in-progress",
  },
  {
    id: "5",
    applicantName: "Jessica Wang",
    appliedPosition: "Marketing Specialist",
    department: "Marketing",
    currentRound: "Campaign Strategy Review",
    status: "pending",
  },
  {
    id: "6",
    applicantName: "David Park",
    appliedPosition: "DevOps Engineer",
    department: "Engineering",
    currentRound: "System Design Interview",
    status: "in-progress",
  },
  {
    id: "7",
    applicantName: "Amanda Foster",
    appliedPosition: "Business Analyst",
    department: "Operations",
    currentRound: "Process Optimization Case",
    status: "completed",
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
      1: { name: "Coding Assessment", mode: "Online Assessment", assessment: "Written Test" },
      2: { name: "System Design", mode: "Video Call", assessment: "Practical Test" },
      3: { name: "Technical Deep Dive", mode: "In-Person", assessment: "Oral Interview" }
    },
    nontechnical: {
      1: { name: "HR Screening", mode: "Video Call", assessment: "Oral Interview" },
      2: { name: "Behavioral Interview", mode: "In-Person", assessment: "Oral Interview" },
      3: { name: "Culture Fit", mode: "Video Call", assessment: "Oral Interview" }
    },
    final: {
      1: { name: "Executive Interview", mode: "In-Person", assessment: "Oral Interview" },
      2: { name: "Stakeholder Review", mode: "Video Call", assessment: "Portfolio Review" },
      3: { name: "Final Decision", mode: "In-Person", assessment: "Case Study" }
    }
  };

  return content[roundType as keyof typeof content]?.[roundNumber as keyof typeof content.technical] ||
         { name: "Interview Round", mode: "Online Assessment", assessment: "Written Test" };
}

export default function InterviewView() {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [activeRoundType, setActiveRoundType] = useState("technical");
  const [selectedRound, setSelectedRound] = useState(1);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  return (
    <div className="space-y-6">
      {/* Modern Header with Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          <Button
            variant={activeTab === "ongoing" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("ongoing")}
            className="text-sm font-medium px-6 py-2"
          >
            Ongoing Interview
          </Button>
          <Button
            variant={activeTab === "upcoming" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("upcoming")}
            className="text-sm font-medium px-6 py-2"
          >
            Upcoming Interview
          </Button>
          <Button
            variant={activeTab === "roundroom" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("roundroom")}
            className="text-sm font-medium px-6 py-2"
          >
            Round Room
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {activeTab === "ongoing"
            ? `${interviewCandidates.length} candidates in process`
            : activeTab === "upcoming"
            ? `${upcomingInterviews.length} upcoming interviews`
            : "Round Management System"
          }
        </div>
      </div>

      {/* Conditional Interview Table */}
      {activeTab !== "roundroom" && (
        <Card className="border-0 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 border-b">
                <TableHead className="w-16 text-center font-semibold text-foreground py-4">
                  {activeTab === "upcoming" ? "S-No." : "#"}
                </TableHead>
                <TableHead className="font-semibold text-foreground py-4">
                  {activeTab === "upcoming" ? "APPLICANT NAME" : "Candidate"}
                </TableHead>
                <TableHead className="font-semibold text-foreground py-4">
                  {activeTab === "upcoming" ? "APPLIED POSITION" : "Position"}
                </TableHead>
                <TableHead className="font-semibold text-foreground py-4">
                  DEPARTMENT
                </TableHead>
                <TableHead className="font-semibold text-foreground py-4">
                  {activeTab === "upcoming" ? "INTERVIEW DATE | TIME" : "Interview Round"}
                </TableHead>
                <TableHead className="font-semibold text-foreground py-4">
                  {activeTab === "upcoming" ? "INTERVIEW ROUND" : "Status"}
                </TableHead>
                {activeTab === "upcoming" && (
                  <TableHead className="font-semibold text-foreground py-4">
                    QUICK UPDATE
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeTab === "ongoing" ? (
                interviewCandidates.map((candidate, index) => (
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
                        <div className="font-semibold text-foreground">
                          {candidate.applicantName}
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
      )}

      {/* Round Room Interface */}
      {activeTab === "roundroom" && (
        <div className="space-y-6">
          {/* Round Type Tabs */}
          <div className="flex gap-2">
            <Button
              variant={activeRoundType === "technical" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveRoundType("technical")}
              className="font-medium"
            >
              TECHNICAL
            </Button>
            <Button
              variant={activeRoundType === "nontechnical" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveRoundType("nontechnical")}
              className="font-medium"
            >
              NON-TECHNICAL
            </Button>
            <Button
              variant={activeRoundType === "final" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveRoundType("final")}
              className="font-medium"
            >
              FINAL
            </Button>
          </div>

          {/* Round Configuration */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side - Round Details */}
                <div className="space-y-6">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-primary mb-4">ROUND {selectedRound}</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Round Name</label>
                        <input
                          type="text"
                          defaultValue={getRoundContent(activeRoundType, selectedRound).name}
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Round Type</label>
                        <select
                          value={activeRoundType}
                          onChange={(e) => setActiveRoundType(e.target.value as any)}
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="technical">Technical</option>
                          <option value="nontechnical">Non-Technical</option>
                          <option value="final">Final</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Interview Mode</label>
                        <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20">
                          <option>{getRoundContent(activeRoundType, selectedRound).mode}</option>
                          <option>Online Assessment</option>
                          <option>In-Person</option>
                          <option>Video Call</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Assessment Type</label>
                        <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20">
                          <option>{getRoundContent(activeRoundType, selectedRound).assessment}</option>
                          <option>Written Test</option>
                          <option>Practical Test</option>
                          <option>Oral Interview</option>
                          <option>Portfolio Review</option>
                          <option>Case Study</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Round Scheduled Date</label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button className="bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20">
                      <Edit3 className="w-4 h-4 mr-2" />
                      EDIT EXISTING TEMPLATE
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      ROUND SAVED
                    </Button>
                  </div>
                </div>

                {/* Right Side - Round Actions */}
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <div className="flex gap-2 justify-end">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      YES
                    </Button>
                    <Button size="sm" className="bg-blue-400 hover:bg-blue-500 text-white">
                      MAYBE
                    </Button>
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                      NO
                    </Button>
                  </div>

                  {/* Confirmation Dialog */}
                  {showConfirmDialog && (
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                      <h4 className="text-center font-semibold text-blue-800 mb-2">CONFIRMATION</h4>
                      <p className="text-center text-blue-700 mb-4">Are you sure you want to reject this candidate?</p>
                      <div className="flex justify-center gap-3">
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => setShowConfirmDialog(false)}
                        >
                          YES
                        </Button>
                        <Button
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                          onClick={() => setShowConfirmDialog(false)}
                        >
                          NO
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Round Management */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-foreground">Rounds Management</h4>
                      <Button
                        size="sm"
                        className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white"
                        onClick={() => setShowConfirmDialog(!showConfirmDialog)}
                      >
                        EMAIL ROUND
                      </Button>
                    </div>

                    {/* Round List */}
                    <div className="space-y-2">
                      {[
                        { number: 1, icon: Clock },
                        { number: 2, icon: FileText },
                        { number: 3, icon: Users }
                      ].map((round) => (
                        <div
                          key={round.number}
                          className={`${selectedRound === round.number ? 'bg-blue-700' : 'bg-blue-600'} text-white px-4 py-2.5 rounded-md flex justify-between items-center text-sm cursor-pointer hover:bg-blue-700 transition-colors`}
                          onClick={() => setSelectedRound(round.number)}
                        >
                          <div className="flex items-center gap-2">
                            <round.icon className="w-4 h-4" />
                            <span className="font-medium">ROUND {round.number}</span>
                            <span className="text-blue-200 text-xs hidden sm:inline">
                              - {getRoundContent(activeRoundType, round.number).name}
                            </span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-blue-800 h-7 w-7 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRound(round.number);
                            }}
                          >
                            <Edit3 className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200">
                      <Plus className="w-4 h-4 mr-2" />
                      ADD NEW ROUND
                    </Button>
                  </div>

                  {/* Reschedule Button */}
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    RESCHEDULE ROUND
                  </Button>
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-border">
                <Button className="bg-blue-400 hover:bg-blue-500 text-white px-8 py-3">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  APPROVE
                </Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
                  <XCircle className="w-5 h-5 mr-2" />
                  REJECT
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Summary Stats */}
      {activeTab !== "roundroom" && (activeTab === "ongoing" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {interviewCandidates.filter(c => c.status === "in-progress").length}
            </div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-emerald-600">
              {interviewCandidates.filter(c => c.status === "completed").length}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-amber-600">
              {interviewCandidates.filter(c => c.status === "pending").length}
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
      ))}
    </div>
  );
}
