import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

// Types
export type CandidateStatus =
  | "Screening"
  | "Interview"
  | "Activation"
  | "Rejected"
  | "Hired";

interface InterviewStep {
  step: number;
  interviewType?: string;
  interviewDate?: string; // MM-DD-YYYY
  interviewerName?: string;
  interviewResult?: string;
}

interface CandidateArchive {
  jobId: string;
  candidateName: string;
  appliedPosition: string;
  applicationDate: string; // MM-DD-YYYY
  status: CandidateStatus;
  archiveDate: string; // MM-DD-YYYY
  screening?: {
    dateAdded?: string;
    status?: string;
    approvedDate?: string;
    approvedBy?: string;
  };
  activation?: {
    dateAdded?: string;
    activationConfirmedDate?: string;
    approvedBy?: string;
  };
  hired?: {
    dateAdded?: string;
    orientationStageCompleted?: string; // Yes/No or percentage
    integrationStageCompleted?: string; // Yes/No or percentage
  };
  interview?: {
    steps: InterviewStep[];
    dateAdded?: string;
    dateMovedToActivation?: string;
    approvedBy?: string;
  };
}

// Sample data
const initialCandidates: CandidateArchive[] = [
  {
    jobId: "001",
    candidateName: "Alex Johnson",
    appliedPosition: "Frontend Developer",
    applicationDate: "08-02-2025",
    status: "Screening",
    archiveDate: "08-10-2025",
    screening: {
      dateAdded: "08-02-2025",
      status: "Pending",
      approvedDate: "-",
      approvedBy: "-",
    },
    interview: {
      steps: [
        {
          step: 1,
          interviewType: "Technical",
          interviewDate: "08-04-2025",
          interviewerName: "Samir Patel",
          interviewResult: "Pass",
        },
        {
          step: 2,
          interviewType: "Managerial",
          interviewDate: "08-06-2025",
          interviewerName: "Laura Chen",
          interviewResult: "Pending",
        },
      ],
      dateAdded: "08-03-2025",
      dateMovedToActivation: "-",
      approvedBy: "-",
    },
  },
  {
    jobId: "002",
    candidateName: "Priya Patel",
    appliedPosition: "Data Analyst",
    applicationDate: "08-01-2025",
    status: "Rejected",
    archiveDate: "08-06-2025",
    screening: {
      dateAdded: "08-01-2025",
      status: "Reviewed",
      approvedDate: "-",
      approvedBy: "-",
    },
    interview: {
      steps: [
        {
          step: 1,
          interviewType: "HR",
          interviewDate: "08-02-2025",
          interviewerName: "Nina Brown",
          interviewResult: "Pass",
        },
        {
          step: 2,
          interviewType: "Technical",
          interviewDate: "08-03-2025",
          interviewerName: "Wei Li",
          interviewResult: "Fail",
        },
      ],
      dateAdded: "08-02-2025",
      dateMovedToActivation: "-",
      approvedBy: "-",
    },
  },
  {
    jobId: "003",
    candidateName: "Liam Johnson",
    appliedPosition: "UI/UX Designer",
    applicationDate: "07-30-2025",
    status: "Hired",
    archiveDate: "08-08-2025",
    screening: {
      dateAdded: "07-30-2025",
      status: "Approved",
      approvedDate: "07-31-2025",
      approvedBy: "Taylor Reed",
    },
    activation: {
      dateAdded: "08-01-2025",
      activationConfirmedDate: "08-05-2025",
      approvedBy: "Taylor Reed",
    },
    hired: {
      dateAdded: "08-06-2025",
      orientationStageCompleted: "Yes",
      integrationStageCompleted: "In Progress",
    },
    interview: {
      steps: [
        {
          step: 1,
          interviewType: "Portfolio Review",
          interviewDate: "07-31-2025",
          interviewerName: "Grace Park",
          interviewResult: "Pass",
        },
        {
          step: 2,
          interviewType: "Panel",
          interviewDate: "08-01-2025",
          interviewerName: "Panel",
          interviewResult: "Pass",
        },
      ],
      dateAdded: "07-31-2025",
      dateMovedToActivation: "08-01-2025",
      approvedBy: "Taylor Reed",
    },
  },
];

const statusChipClass = (status: CandidateStatus) => {
  switch (status) {
    case "Screening":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "Interview":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "Activation":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "Rejected":
      return "bg-red-100 text-red-700 border-red-200";
    case "Hired":
      return "bg-green-100 text-green-700 border-green-200";
  }
};

export default function Archive() {
  const [query, setQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | CandidateStatus>(
    "all",
  );
  const [rows, setRows] = useState<CandidateArchive[]>(initialCandidates);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const positions = useMemo(() => {
    const set = new Set(rows.map((r) => r.appliedPosition));
    return Array.from(set).sort();
  }, [rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      const matchesQuery = !q
        ? true
        : r.jobId.toLowerCase().includes(q) ||
          r.candidateName.toLowerCase().includes(q);
      const matchesPos =
        positionFilter === "all" || r.appliedPosition === positionFilter;
      const matchesStatus = statusFilter === "all" || r.status === statusFilter;
      return matchesQuery && matchesPos && matchesStatus;
    });
  }, [rows, query, positionFilter, statusFilter]);

  const selected = useMemo(
    () => rows.find((r) => r.jobId === selectedJobId) || null,
    [rows, selectedJobId],
  );

  return (
    <div className="space-y-3">
      {/* Filters */}
      <Card className="p-0 border border-gray-200 rounded-none">
        <CardContent className="p-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-64 max-w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Job ID or Candidate Name"
                className="pl-10 h-8 text-sm"
              />
            </div>

            <Select
              value={positionFilter}
              onValueChange={(v) => setPositionFilter(v)}
            >
              <SelectTrigger className="w-56 h-8 text-sm">
                <SelectValue placeholder="Applied Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All positions</SelectItem>
                {positions.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as any)}
            >
              <SelectTrigger className="w-44 h-8 text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="Screening">Screening</SelectItem>
                <SelectItem value="Interview">Interview</SelectItem>
                <SelectItem value="Activation">Activation</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="Hired">Hired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="p-0 border border-gray-200 rounded-none">
        <CardContent className="p-0">
          <Table className="w-full text-sm">
            <TableHeader>
              <TableRow className="text-left text-[13px] text-gray-600 border-b">
                <TableHead className="py-2 px-3 font-bold text-black text-left whitespace-nowrap">
                  Job ID
                </TableHead>
                <TableHead className="py-2 px-3 font-bold text-black text-left">
                  Candidate Name
                </TableHead>
                <TableHead className="py-2 px-3 font-bold text-black text-left">
                  Applied Position
                </TableHead>
                <TableHead className="py-2 px-3 font-bold text-black text-left whitespace-nowrap">
                  Application Date
                </TableHead>
                <TableHead className="py-2 px-3 font-bold text-black text-left">
                  Status
                </TableHead>
                <TableHead className="py-2 px-3 font-bold text-black text-left whitespace-nowrap">
                  Archive Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow
                  key={r.jobId}
                  className={`border-b last:border-b-0 hover:bg-gray-50 cursor-pointer ${
                    selectedJobId === r.jobId ? "bg-blue-50/50" : ""
                  }`}
                  onClick={() => setSelectedJobId(r.jobId)}
                >
                  <TableCell className="px-3 py-3 align-middle text-sm font-medium text-gray-900">
                    {r.jobId}
                  </TableCell>
                  <TableCell className="px-3 py-3 align-middle text-gray-800">
                    {r.candidateName}
                  </TableCell>
                  <TableCell className="px-3 py-3 align-middle text-gray-700">
                    {r.appliedPosition}
                  </TableCell>
                  <TableCell className="px-3 py-3 align-middle text-gray-700">
                    {r.applicationDate}
                  </TableCell>
                  <TableCell className="px-3 py-3 align-middle">
                    <Badge
                      variant="outline"
                      className={`px-2 py-0.5 text-xs font-medium ${statusChipClass(
                        r.status,
                      )}`}
                    >
                      {r.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-3 py-3 align-middle text-gray-700">
                    {r.archiveDate}
                  </TableCell>
                </TableRow>
              ))}

              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="px-3 py-6 text-center text-sm text-gray-500"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Left Column */}
        <div className="space-y-3">
          {/* Screening Details */}
          <Card className="border border-gray-200">
            <CardContent className="p-3 space-y-2">
              <h3 className="text-sm font-semibold text-gray-900">
                Screening Details
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Detail label="Date Added" value={selected?.screening?.dateAdded} />
                <Detail label="Status" value={selected?.screening?.status} />
                <Detail label="Approved Date" value={selected?.screening?.approvedDate} />
                <Detail label="Approved By" value={selected?.screening?.approvedBy} />
              </div>
            </CardContent>
          </Card>

          {/* Activation Details */}
          <Card className="border border-gray-200">
            <CardContent className="p-3 space-y-2">
              <h3 className="text-sm font-semibold text-gray-900">
                Activation Details
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Detail label="Date Added" value={selected?.activation?.dateAdded} />
                <Detail
                  label="Activation Confirmed Date"
                  value={selected?.activation?.activationConfirmedDate}
                />
                <Detail label="Approved By" value={selected?.activation?.approvedBy} />
              </div>
            </CardContent>
          </Card>

          {/* Hired Details */}
          <Card className="border border-gray-200">
            <CardContent className="p-3 space-y-2">
              <h3 className="text-sm font-semibold text-gray-900">Hired Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Detail label="Date Added" value={selected?.hired?.dateAdded} />
                <Detail
                  label="Orientation Stage Completed"
                  value={selected?.hired?.orientationStageCompleted}
                />
                <Detail
                  label="Integration Stage Completed"
                  value={selected?.hired?.integrationStageCompleted}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          <Card className="border border-gray-200">
            <CardContent className="p-3 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">
                Interview Details
              </h3>

              {/* Step 1 */}
              <div className="border rounded p-2">
                <h4 className="text-xs font-semibold text-gray-800 mb-2">
                  Step 1
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <Detail
                    label="Interview Type"
                    value={selected?.interview?.steps?.[0]?.interviewType}
                  />
                  <Detail
                    label="Interview Date"
                    value={selected?.interview?.steps?.[0]?.interviewDate}
                  />
                  <Detail
                    label="Interviewer Name"
                    value={selected?.interview?.steps?.[0]?.interviewerName}
                  />
                  <Detail
                    label="Interview Result"
                    value={selected?.interview?.steps?.[0]?.interviewResult}
                  />
                </div>
              </div>

              {/* Step 2 */}
              <div className="border rounded p-2">
                <h4 className="text-xs font-semibold text-gray-800 mb-2">
                  Step 2
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <Detail
                    label="Interview Type"
                    value={selected?.interview?.steps?.[1]?.interviewType}
                  />
                  <Detail
                    label="Interview Date"
                    value={selected?.interview?.steps?.[1]?.interviewDate}
                  />
                  <Detail
                    label="Interviewer Name"
                    value={selected?.interview?.steps?.[1]?.interviewerName}
                  />
                  <Detail
                    label="Interview Result"
                    value={selected?.interview?.steps?.[1]?.interviewResult}
                  />
                </div>
              </div>

              {/* Extra fields */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Detail label="Date Added" value={selected?.interview?.dateAdded} />
                <Detail
                  label="Date Moved to Activation"
                  value={selected?.interview?.dateMovedToActivation}
                />
                <Detail label="Approved By" value={selected?.interview?.approvedBy} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Small detail cell component
function Detail({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <div className="text-[11px] text-gray-500">{label}</div>
      <div className="text-gray-900 font-medium text-xs sm:text-sm">
        {value && value.trim() ? value : "-"}
      </div>
    </div>
  );
}
