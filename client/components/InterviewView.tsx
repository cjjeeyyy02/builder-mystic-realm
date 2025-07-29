import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface InterviewCandidate {
  id: string;
  applicantName: string;
  appliedPosition: string;
  department: string;
  currentRound: string;
  status: "in-progress" | "completed" | "pending";
}

const interviewCandidates: InterviewCandidate[] = [
  {
    id: "1",
    applicantName: "Taylor",
    appliedPosition: "Content Writer",
    department: "Marketing",
    currentRound: "Technical - Round - 2",
    status: "in-progress",
  },
  {
    id: "2",
    applicantName: "Taylor",
    appliedPosition: "Content Writer",
    department: "Marketing",
    currentRound: "Technical - Round - 2",
    status: "completed",
  },
  {
    id: "3",
    applicantName: "Taylor",
    appliedPosition: "Content Writer",
    department: "Marketing",
    currentRound: "Technical - Round - 2",
    status: "pending",
  },
  {
    id: "4",
    applicantName: "Taylor",
    appliedPosition: "Content Writer",
    department: "Marketing",
    currentRound: "Technical - Round - 2",
    status: "in-progress",
  },
  {
    id: "5",
    applicantName: "Taylor",
    appliedPosition: "Content Writer",
    department: "Marketing",
    currentRound: "Technical - Round - 2",
    status: "pending",
  },
  {
    id: "6",
    applicantName: "Taylor",
    appliedPosition: "Content Writer",
    department: "Marketing",
    currentRound: "Technical - Round - 2",
    status: "in-progress",
  },
  {
    id: "7",
    applicantName: "Taylor",
    appliedPosition: "Content Writer",
    department: "Marketing",
    currentRound: "Technical - Round - 2",
    status: "completed",
  },
];

function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "completed":
      return "default";
    case "in-progress":
      return "secondary";
    case "pending":
      return "outline";
    default:
      return "secondary";
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "in-progress":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "pending":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
}

export default function InterviewView() {
  const [activeTab, setActiveTab] = useState("ongoing");

  return (
    <div className="space-y-6">
      {/* Interview Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "ongoing" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("ongoing")}
          className="text-sm font-medium"
        >
          Ongoing Interview
        </Button>
        <Button
          variant={activeTab === "upcoming" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("upcoming")}
          className="text-sm font-medium"
        >
          Upcoming Interview
        </Button>
      </div>

      {/* Interview Table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-16 text-center font-semibold text-foreground">
                    S-No.
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    APPLICANT NAME
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    APPLIED POSITION
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    DEPARTMENT
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    CURRENT INTERVIEW ROUND
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    INTERVIEW STATUS
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interviewCandidates.map((candidate, index) => (
                  <TableRow
                    key={candidate.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="text-center font-medium text-muted-foreground">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-foreground">
                        {candidate.applicantName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-foreground">
                        {candidate.appliedPosition}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-foreground">
                        {candidate.department}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-foreground">
                        {candidate.currentRound}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`font-medium ${getStatusColor(candidate.status)}`}
                      >
                        {candidate.status === "in-progress"
                          ? "In-progress"
                          : candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
