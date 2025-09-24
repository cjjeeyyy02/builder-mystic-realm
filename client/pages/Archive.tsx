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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Layout from "@/components/Layout";
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
    <Layout>
      <div className="archive space-y-5">
        {/* Page Title */}
        <h1 className="text-3xl font-semibold text-foreground">Archive</h1>

        {/* Controls Row */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Job ID or Candidate Name"
                className="w-[280px] h-10 rounded-md pl-10"
              />
            </div>

            <Select value={positionFilter} onValueChange={(v) => setPositionFilter(v)}>
              <SelectTrigger className="w-56 h-10 rounded-md text-sm">
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

            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
              <SelectTrigger className="w-44 h-10 rounded-md text-sm">
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
        </div>

        {/* Table */}
        <Card className="w-full p-4">
          <div className="overflow-auto">
            <table className="w-full text-sm table-auto border-collapse mx-auto" style={{ maxWidth: "1200px" }}>
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-b">
                  <th className="py-2 pr-4 font-bold uppercase text-gray-900">Job ID</th>
                  <th className="py-2 pr-4 font-bold uppercase text-gray-900">Candidate Name</th>
                  <th className="py-2 pr-4 font-bold uppercase text-gray-900">Applied Position</th>
                  <th className="py-2 pr-4 font-bold uppercase text-gray-900">Application Date</th>
                  <th className="py-2 pr-4 font-bold uppercase text-gray-900">Status</th>
                  <th className="py-2 pr-4 font-bold uppercase text-gray-900">Archive Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr
                    key={r.jobId}
                    className={`border-b last:border-b-0 hover:bg-gray-100 transition cursor-pointer ${
                      selectedJobId === r.jobId ? "bg-blue-50/50" : ""
                    }`}
                    onClick={() => setSelectedJobId(r.jobId)}
                  >
                    <td className="py-3 pr-4 font-medium text-gray-900 whitespace-nowrap">{r.jobId}</td>
                    <td className="py-3 pr-4 text-gray-800 truncate">{r.candidateName}</td>
                    <td className="py-3 pr-4 text-gray-700 truncate">{r.appliedPosition}</td>
                    <td className="py-3 pr-4 text-gray-700 whitespace-nowrap">{r.applicationDate}</td>
                    <td className="py-3 pr-4 text-gray-800">{r.status}</td>
                    <td className="py-3 pr-4 text-gray-700 whitespace-nowrap">{r.archiveDate}</td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-3 py-6 text-center text-sm text-gray-500">
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-4 min-h-0">
            <Card className="shadow-sm border-gray-200">
              <CardContent className="p-4 space-y-2 max-h-64 md:max-h-72 overflow-y-auto">
                <h3 className="text-base font-semibold text-gray-900">Screening Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <Detail label="Date Added" value={selected?.screening?.dateAdded} />
                  <Detail label="Status" value={selected?.screening?.status} />
                  <Detail label="Approved Date" value={selected?.screening?.approvedDate} />
                  <Detail label="Approved By" value={selected?.screening?.approvedBy} />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-gray-200">
              <CardContent className="p-4 space-y-2 max-h-64 md:max-h-72 overflow-y-auto">
                <h3 className="text-base font-semibold text-gray-900">Activation Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <Detail label="Date Added" value={selected?.activation?.dateAdded} />
                  <Detail label="Activation Confirmed Date" value={selected?.activation?.activationConfirmedDate} />
                  <Detail label="Approved By" value={selected?.activation?.approvedBy} />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-gray-200">
              <CardContent className="p-4 space-y-2 max-h-64 md:max-h-72 overflow-y-auto">
                <h3 className="text-base font-semibold text-gray-900">Hired Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <Detail label="Date Added" value={selected?.hired?.dateAdded} />
                  <Detail label="Orientation Stage Completed" value={selected?.hired?.orientationStageCompleted} />
                  <Detail label="Integration Stage Completed" value={selected?.hired?.integrationStageCompleted} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-4 min-h-0">
            <Card className="shadow-sm border-gray-200">
              <CardContent className="p-4 space-y-3 max-h-[40vh] overflow-y-auto">
                <h3 className="text-base font-semibold text-gray-900">Interview Details</h3>

                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="step1">
                    <AccordionTrigger className="text-sm font-medium">Step 1</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <Detail label="Interview Type" value={selected?.interview?.steps?.[0]?.interviewType} />
                        <Detail label="Interview Date" value={selected?.interview?.steps?.[0]?.interviewDate} />
                        <Detail label="Interviewer Name" value={selected?.interview?.steps?.[0]?.interviewerName} />
                        <Detail label="Interview Result" value={selected?.interview?.steps?.[0]?.interviewResult} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step2">
                    <AccordionTrigger className="text-sm font-medium">Step 2</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <Detail label="Interview Type" value={selected?.interview?.steps?.[1]?.interviewType} />
                        <Detail label="Interview Date" value={selected?.interview?.steps?.[1]?.interviewDate} />
                        <Detail label="Interviewer Name" value={selected?.interview?.steps?.[1]?.interviewerName} />
                        <Detail label="Interview Result" value={selected?.interview?.steps?.[1]?.interviewResult} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <Detail label="Date Added" value={selected?.interview?.dateAdded} />
                  <Detail label="Date Moved to Activation" value={selected?.interview?.dateMovedToActivation} />
                  <Detail label="Approved By" value={selected?.interview?.approvedBy} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
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
