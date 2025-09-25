import { useMemo, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Layout from "@/components/Layout";
import { Search, Download } from "lucide-react";

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
  applicationChannel?: string; // e.g., Indeed, LinkedIn, Company Website
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

interface JobPostingArchive {
  jobId: string;
  title: string;
  department: string;
  location: string;
  status: "Archived" | "Closed" | "Draft" | "Active";
  datePosted: string; // MM-DD-YYYY or YYYY-MM-DD acceptable
  archiveDate: string; // MM-DD-YYYY
}

// Sample data - Candidates
const initialCandidates: CandidateArchive[] = [
  {
    jobId: "001",
    candidateName: "Alex Johnson",
    appliedPosition: "Frontend Developer",
    applicationDate: "08-02-2025",
    applicationChannel: "Indeed",
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
    applicationChannel: "LinkedIn",
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
    applicationChannel: "Company Website",
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

// Sample data - Job Postings (Archived)
const initialJobPostings: JobPostingArchive[] = [
  {
    jobId: "J-1003",
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Dublin, Ireland",
    status: "Archived",
    datePosted: "2025-05-10",
    archiveDate: "08-15-2025",
  },
  {
    jobId: "J-1005",
    title: "QA Automation Engineer",
    department: "Engineering",
    location: "Austin, TX, United States",
    status: "Archived",
    datePosted: "2025-06-22",
    archiveDate: "08-12-2025",
  },
  {
    jobId: "J-1006",
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    status: "Archived",
    datePosted: "2025-04-02",
    archiveDate: "08-01-2025",
  },
];

function formatDateMDY(dateStr?: string) {
  if (!dateStr) return "";
  const mdy = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (mdy) return dateStr;
  const ymd = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (ymd) return `${ymd[2]}-${ymd[3]}-${ymd[1]}`;
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
  }
  return dateStr;
}

function parseToDate(input?: string): Date | null {
  if (!input) return null;
  const mdy = input.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (mdy) {
    const [_, mm, dd, yyyy] = mdy;
    return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    }
  const iso = input.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) {
    const [_, yyyy, mm, dd] = iso;
    return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  }
  const d = new Date(input);
  return isNaN(d.getTime()) ? null : d;
}

function formatToMDYInput(value: string): string {
  const digits = value.replace(/[^0-9]/g, "").slice(0, 8);
  const mm = digits.slice(0, 2);
  const dd = digits.slice(2, 4);
  const yyyy = digits.slice(4, 8);
  return [mm, dd, yyyy].filter((s) => s.length > 0).join("-");
}

function normalizeToISODate(input?: string): string {
  if (!input) return "";
  const mdy = input.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (mdy) {
    const [_, mm, dd, yyyy] = mdy;
    return `${yyyy}-${mm}-${dd}`;
  }
  const iso = input.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) return input;
  return input;
}

export default function Archive() {
  const [activeTab, setActiveTab] = useState<"candidate" | "job">("candidate");

  // Candidate tab state
  const [query, setQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | CandidateStatus>(
    "all",
  );
  const [rows, setRows] = useState<CandidateArchive[]>(initialCandidates);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [candidateSheetOpen, setCandidateSheetOpen] = useState(false);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  // Job Posting tab state
  const [jobQuery, setJobQuery] = useState("");
  const [jobDepartmentFilter, setJobDepartmentFilter] = useState<string>("all");
  const [jobStatusFilter, setJobStatusFilter] = useState<string>("all");
  const [jobRows, setJobRows] = useState<JobPostingArchive[]>(initialJobPostings);
  const [selectedJobPostingId, setSelectedJobPostingId] = useState<string | null>(null);

  // Support URL hash (optional) for tab deep link
  useEffect(() => {
    const applyHash = () => {
      const h = window.location.hash.replace('#','');
      if (h === 'job' || h === 'candidate') setActiveTab(h as any);
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  const positions = useMemo(() => {
    const set = new Set(rows.map((r) => r.appliedPosition));
    return Array.from(set).sort();
  }, [rows]);

  const filteredCandidates = useMemo(() => {
    const q = query.trim().toLowerCase();
    const from = parseToDate(fromDate);
    const to = parseToDate(toDate);
    return rows.filter((r) => {
      const matchesQuery = !q
        ? true
        : r.jobId.toLowerCase().includes(q) ||
          r.candidateName.toLowerCase().includes(q) ||
          (r.archiveDate || "").toLowerCase().includes(q);
      const matchesPos = positionFilter === "all" || r.appliedPosition === positionFilter;
      const matchesStatus = statusFilter === "all" || r.status === statusFilter;
      const ad = parseToDate(r.archiveDate);
      const matchesFrom = !from || (ad && ad >= from);
      const matchesTo = !to || (ad && ad <= to);
      return matchesQuery && matchesPos && matchesStatus && matchesFrom && matchesTo;
    });
  }, [rows, query, positionFilter, statusFilter, fromDate, toDate]);

  const selected = useMemo(
    () => rows.find((r) => r.jobId === selectedJobId) || null,
    [rows, selectedJobId],
  );

  const jobDepartments = useMemo(() => {
    const set = new Set(jobRows.map((j) => j.department).filter(Boolean));
    return Array.from(set).sort();
  }, [jobRows]);

  const filteredJobs = useMemo(() => {
    const q = jobQuery.trim().toLowerCase();
    return jobRows.filter((j) => {
      const matchesQuery = !q
        ? true
        : j.jobId.toLowerCase().includes(q) || j.title.toLowerCase().includes(q);
      const matchesDept = jobDepartmentFilter === 'all' || j.department === jobDepartmentFilter;
      const matchesStatus = jobStatusFilter === 'all' || j.status === jobStatusFilter;
      return matchesQuery && matchesDept && matchesStatus;
    });
  }, [jobRows, jobQuery, jobDepartmentFilter, jobStatusFilter]);

  return (
    <Layout>
      <div className="archive space-y-5">
        {/* Tabbed Header */}
        <div className="w-full">
          <nav className="flex items-center gap-8 border-b border-gray-200 pb-1">
            {[
              { id: "candidate", label: "Candidate" },
              { id: "job", label: "Job Posting" },
            ].map((tab) => {
              const isActive = activeTab === (tab.id as typeof activeTab);
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as typeof activeTab);
                    if (tab.id === "job") {
                      setSelectedJobId(null);
                      setCandidateSheetOpen(false);
                    }
                    window.location.hash = tab.id;
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative pb-3 text-base tracking-tight transition-colors duration-150 ${
                    isActive
                      ? "text-blue-700 font-semibold"
                      : "text-gray-600 hover:text-gray-800 font-medium"
                  }`}
                >
                  <span className="whitespace-nowrap">{tab.label}</span>
                  {isActive && (
                    <span className="pointer-events-none absolute left-0 -bottom-px h-0.5 w-full bg-blue-600" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Controls Row */}
        {activeTab === "candidate" ? (
          <div className="flex flex-wrap items-center gap-4 mb-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Job ID or Candidate"
                className="w-48 h-9 rounded-md pl-10 text-sm"
              />
            </div>

            <Select value={positionFilter} onValueChange={(v) => setPositionFilter(v)}>
              <SelectTrigger className="w-40 h-9 rounded-md text-sm">
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
              <SelectTrigger className="w-36 h-9 rounded-md text-sm">
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

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Date Range</span>
              <div className="flex items-center gap-2">
                <Input
                  type="date"
                  value={normalizeToISODate(fromDate)}
                  onChange={(e) => setFromDate(e.target.value)}
                  onFocus={(e) => { const el = e.currentTarget as HTMLInputElement & { showPicker?: () => void }; el.showPicker?.(); }}
                  onClick={(e) => { const el = e.currentTarget as HTMLInputElement & { showPicker?: () => void }; el.showPicker?.(); }}
                  className="h-9 w-40 rounded-md text-sm"
                  aria-label="From date"
                />
                <Input
                  type="date"
                  value={normalizeToISODate(toDate)}
                  onChange={(e) => setToDate(e.target.value)}
                  onFocus={(e) => { const el = e.currentTarget as HTMLInputElement & { showPicker?: () => void }; el.showPicker?.(); }}
                  onClick={(e) => { const el = e.currentTarget as HTMLInputElement & { showPicker?: () => void }; el.showPicker?.(); }}
                  className="h-9 w-40 rounded-md text-sm"
                  aria-label="To date"
                />
              </div>
            </div>
            <div className="flex-1" />
            <Button
              size="sm"
              variant="outline"
              className="h-9 px-4 text-sm font-medium"
              title="Export"
            >
              <Download className="w-4 h-4 mr-1" /> Export
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-4 mb-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={jobQuery}
                  onChange={(e) => setJobQuery(e.target.value)}
                  placeholder="Search Job ID or Title"
                  className="w-[280px] h-10 rounded-md pl-10"
                />
              </div>

              <Select value={jobDepartmentFilter} onValueChange={(v) => setJobDepartmentFilter(v)}>
                <SelectTrigger className="w-56 h-10 rounded-md text-sm">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All departments</SelectItem>
                  {jobDepartments.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={jobStatusFilter} onValueChange={(v) => setJobStatusFilter(v)}>
                <SelectTrigger className="w-44 h-10 rounded-md text-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1" />
            <Button
              size="sm"
              variant="outline"
              className="h-9 px-4 text-sm font-medium"
              title="Export"
              onClick={() => {
                const headers = ["Job ID", "Job Title", "Department", "Location", "Status", "Archive Date"];
                const rows = filteredJobs.map((j) => [
                  j.jobId,
                  j.title,
                  j.department,
                  j.location,
                  j.status,
                  formatDateMDY(j.archiveDate),
                ]);
                const csv = [headers.join(","), ...rows.map((r) => r.map((v) => `"${String(v).replace(/\"/g, '""')}"`).join(","))].join("\n");
                const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "archived_job_postings.csv";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
            >
              <Download className="w-4 h-4 mr-1" /> Export
            </Button>
          </div>
        )}

        {/* Table */}
        <Card className="w-full p-4">
          <div className="overflow-auto">
            {activeTab === "candidate" ? (
              <table className="w-full text-sm table-auto border-collapse mx-auto" style={{ maxWidth: "1200px" }}>
                <thead>
                  <tr className="text-left text-xs text-muted-foreground border-b">
                    <th className="py-2 pr-4 font-bold uppercase text-gray-900">Job ID</th>
                    <th className="py-2 pr-4 font-bold uppercase text-gray-900">Candidate</th>
                    <th className="py-2 pr-4 font-bold uppercase text-gray-900">Applied Position</th>
                    <th className="py-2 pr-4 font-bold uppercase text-gray-900">Application Date</th>
                    <th className="py-2 pr-4 font-bold uppercase text-gray-900">Application Channel</th>
                    <th className="py-2 pr-4 font-bold uppercase text-gray-900">Status</th>
                    <th className="py-2 pr-4 font-bold uppercase text-gray-900">Archive Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.map((r) => (
                    <tr
                      key={r.jobId}
                      className={`border-b last:border-b-0 hover:bg-gray-100 transition cursor-pointer ${
                        selectedJobId === r.jobId ? "bg-blue-50/50" : ""
                      }`}
                      onClick={() => {
                        setSelectedJobId(r.jobId);
                        setCandidateSheetOpen(true);
                      }}
                    >
                      <td className="py-3 pr-4 font-medium text-gray-900 whitespace-nowrap">{r.jobId}</td>
                      <td className="py-3 pr-4 text-gray-800 truncate">{r.candidateName}</td>
                      <td className="py-3 pr-4 text-gray-700 truncate">{r.appliedPosition}</td>
                      <td className="py-3 pr-4 text-gray-700 whitespace-nowrap">{r.applicationDate}</td>
                      <td className="py-3 pr-4 text-gray-700 truncate">{r.applicationChannel || '-'}</td>
                      <td className="py-3 pr-4 text-gray-800">{r.status}</td>
                      <td className="py-3 pr-4 text-gray-700 whitespace-nowrap">{r.archiveDate}</td>
                    </tr>
                  ))}

                  {filteredCandidates.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-3 py-6 text-center text-sm text-gray-500">
                        No results found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-sm table-auto border-collapse mx-auto" style={{ maxWidth: "1200px" }}>
                <thead>
                  <tr className="text-left text-xs text-muted-foreground border-b">
                    <th className="py-2 pr-4 font-bold uppercase text-gray-900">Job ID</th>
                    <th className="py-2 pr-4 font-bold uppercase text-gray-900">Job Title</th>
                    <th className="py-2 pr-4 font-bold uppercase text-gray-900">Department</th>
                    <th className="py-2 pr-4 font-bold uppercase text-gray-900">Location</th>
                    <th className="py-2 pr-4 font-bold uppercase text-gray-900">Status</th>
                    <th className="py-2 pr-4 font-bold uppercase text-gray-900">Archive Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((j) => (
                    <tr
                      key={j.jobId}
                      className={`border-b last:border-b-0 hover:bg-gray-100 transition cursor-pointer ${
                        selectedJobPostingId === j.jobId ? "bg-blue-50/50" : ""
                      }`}
                      onClick={() => setSelectedJobPostingId(j.jobId)}
                    >
                      <td className="py-3 pr-4">{j.jobId}</td>
                      <td className="py-3 pr-4">
                        <div className="font-medium">{j.title}</div>
                      </td>
                      <td className="py-3 pr-4">{j.department}</td>
                      <td className="py-3 pr-4">{j.location}</td>
                      <td className="py-3 pr-4">{j.status}</td>
                      <td className="py-3 pr-4">{formatDateMDY(j.archiveDate)}</td>
                    </tr>
                  ))}

                  {filteredJobs.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-3 py-6 text-center text-sm text-gray-500">
                        No results found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </Card>

        {/* Candidate Details Side Sheet */}
        {activeTab === "candidate" && (
          <Sheet open={candidateSheetOpen} onOpenChange={(open) => {
            setCandidateSheetOpen(open);
            if (!open) return; // keep selection until closed
          }}>
            <SheetContent side="right" className="w-full max-w-[40vw] md:max-w-[38vw] lg:max-w-[35vw]">
              <div className="h-full flex flex-col">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Candidate Details</h2>
                  {selected && (
                    <div className="text-sm text-muted-foreground mt-1">
                      {selected.candidateName} • {selected.appliedPosition}
                    </div>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto pr-1 space-y-4">
                  <Card className="shadow-sm border-gray-200">
                    <CardContent className="p-4 space-y-2">
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
                    <CardContent className="p-4 space-y-3">
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

                  <Card className="shadow-sm border-gray-200">
                    <CardContent className="p-4 space-y-2">
                      <h3 className="text-base font-semibold text-gray-900">Activation Details</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <Detail label="Date Added" value={selected?.activation?.dateAdded} />
                        <Detail label="Activation Confirmed Date" value={selected?.activation?.activationConfirmedDate} />
                        <Detail label="Approved By" value={selected?.activation?.approvedBy} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm border-gray-200">
                    <CardContent className="p-4 space-y-2">
                      <h3 className="text-base font-semibold text-gray-900">Hired Details</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <Detail label="Date Added" value={selected?.hired?.dateAdded} />
                        <Detail label="Orientation Stage Completed" value={selected?.hired?.orientationStageCompleted} />
                        <Detail label="Integration Stage Completed" value={selected?.hired?.integrationStageCompleted} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
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
