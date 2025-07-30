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
import { Mail } from "lucide-react";

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

export default function InterviewView() {
  const [activeTab, setActiveTab] = useState("ongoing");

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
        </div>
        
        <div className="text-sm text-muted-foreground">
          {activeTab === "ongoing"
            ? `${interviewCandidates.length} candidates in process`
            : `${upcomingInterviews.length} upcoming interviews`
          }
        </div>
      </div>

      {/* Conditional Interview Table */}
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

      {/* Summary Stats */}
      {activeTab === "ongoing" ? (
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
      )}
    </div>
  );
}
