import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Edit,
  Archive,
  Search as SearchIcon,
  List,
  Grid as GridIcon,
  Trash2,
  RefreshCw,
  ChevronDown,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Mail,
  Eye,
  FileText,
} from "lucide-react";
import Layout from "@/components/Layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type Job = {
  id: string;
  // Required fields
  title: string;
  company: string;
  location: string;
  workplaceType: "on-site" | "remote" | "hybrid";
  description: string;
  employmentType:
    | "full-time"
    | "part-time"
    | "contract"
    | "temporary"
    | "internship";

  // Optional fields
  department?: string;
  seniorityLevel?:
    | "entry-level"
    | "junior"
    | "mid-level"
    | "senior"
    | "manager"
    | "director"
    | "executive";
  qualifications?: string;
  salary?: string;
  applicationMethods?: string;
  closingDate?: string;
  perksAndBenefits?: string;
  screeningQuestions?: string[];

  // System fields
  status?: "Active" | "Closed" | "Archived" | "Draft";
  datePosted?: string;
  applicants?: number;
  integrations?: string[];
  archived?: boolean;
};

type Candidate = {
  id: string;
  name: string;
  position?: string;
  avatar?: string;
  source: "Indeed" | "LinkedIn";
  description?: string;
  email?: string;
  status?: "pending" | "accepted" | "rejected" | "archived";
};

const initialCandidates: Candidate[] = [
  {
    id: "C-2001",
    name: "Alex Johnson",
    position: "Backend Engineer",
    source: "Indeed",
    description: "Experienced Node.js developer.",
    email: "alex.johnson@example.com",
    status: "pending",
  },
  {
    id: "C-2002",
    name: "Maria Gomez",
    position: "Product Designer",
    source: "LinkedIn",
    description: "Designs delightful user experiences.",
    email: "maria.gomez@example.com",
    status: "pending",
  },
  {
    id: "C-2003",
    name: "Liam Smith",
    position: "DevOps Engineer",
    source: "Indeed",
    description: "Infrastructure and CI/CD specialist.",
    email: "liam.smith@example.com",
    status: "pending",
  },
];

const initialJobs: Job[] = [
  {
    id: "J-1001",
    title: "Software Engineer",
    company: "AI2AIM",
    location: "San Francisco, CA, United States",
    workplaceType: "on-site",
    description:
      "We are looking for a skilled Software Engineer to join our growing engineering team. You will be responsible for developing and maintaining backend services and APIs that power our AI-driven platform.",
    employmentType: "full-time",
    department: "Engineering",
    seniorityLevel: "mid-level",
    salary: "$110,000 - $140,000",
    status: "Active",
    datePosted: "2025-08-01",
    applicants: 12,
    integrations: ["LinkedIn"],
    qualifications:
      "Bachelor's degree in Computer Science or equivalent experience. 3+ years of backend development experience with Node.js, Python, or Java.",
    perksAndBenefits:
      "Health insurance, dental coverage, flexible working hours, remote work options, professional development budget.",
  },
  {
    id: "J-1002",
    title: "Product Designer",
    company: "AI2AIM",
    location: "Remote",
    workplaceType: "remote",
    description:
      "Join our design team to create intuitive and engaging user experiences for our AI-powered products. You'll work closely with product managers and engineers to bring innovative designs to life.",
    employmentType: "full-time",
    department: "Design",
    seniorityLevel: "mid-level",
    salary: "$90,000 - $120,000",
    status: "Active",
    datePosted: "2025-07-15",
    applicants: 8,
    integrations: [],
    qualifications:
      "Bachelor's degree in Design, HCI, or related field. 3+ years of product design experience with proficiency in Figma, Sketch, or Adobe Creative Suite.",
    perksAndBenefits:
      "Comprehensive health benefits, unlimited PTO, home office stipend, design conference budget.",
  },
  {
    id: "J-1003",
    title: "DevOps Engineer",
    company: "AI2AIM",
    location: "Dublin, Ireland",
    workplaceType: "hybrid",
    description:
      "We're seeking a DevOps Engineer to help scale our infrastructure and improve our deployment processes. You'll work with cutting-edge cloud technologies and help build reliable, scalable systems.",
    employmentType: "full-time",
    department: "Infrastructure",
    seniorityLevel: "senior",
    salary: "€80,000 - €95,000",
    status: "Closed",
    datePosted: "2025-05-10",
    applicants: 20,
    integrations: ["Plug & Hire"],
    qualifications:
      "Bachelor's degree in Computer Science or equivalent. 5+ years of DevOps experience with AWS, Docker, Kubernetes, and CI/CD pipelines.",
    perksAndBenefits:
      "Competitive salary, pension plan, 25 days annual leave, flexible hybrid working, health insurance.",
  },
];

export default function JobPosting() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const formatDateMDY = (dateStr?: string) => {
    if (!dateStr) return "";
    // If already mm-dd-yyyy
    const mdy = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
    if (mdy) return dateStr;
    // If yyyy-mm-dd or ISO
    const ymd = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (ymd) return `${ymd[2]}-${ymd[3]}-${ymd[1]}`;
    // Try Date parsing as fallback
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const yyyy = d.getFullYear();
      return `${mm}-${dd}-${yyyy}`;
    }
    return dateStr;
  };
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const tab = (searchParams.get("tab") || "").toLowerCase();
    if (tab === "archived" || tab === "active") {
      setActiveTab(tab as "active" | "archived");
    }
  }, [searchParams]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Dialog/modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<Job | null>(null);
  const [archiveConfirmFor, setArchiveConfirmFor] = useState<Job | null>(null);
  const [showJobDetailsModal, setShowJobDetailsModal] = useState(false);
  const [jobToView, setJobToView] = useState<Job | null>(null);
  // Plug & Hire modal state
  const [showPlugHireModal, setShowPlugHireModal] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [candidateSearch, setCandidateSearch] = useState("");
  const [candidateTab, setCandidateTab] = useState<"Indeed" | "LinkedIn">(
    "Indeed",
  );
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>(
    [],
  );
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  // Manage modal state
  const [showManageModal, setShowManageModal] = useState(false);
  const [manageJob, setManageJob] = useState<Job | null>(null);
  const [manageForm, setManageForm] = useState<{
    title: string;
    department: string;
    location: string;
    status: Job["status"];
    datePosted: string;
  }>({
    title: "",
    department: "",
    location: "",
    status: "Draft",
    datePosted: "",
  });

  // Audit log
  const [auditLog, setAuditLog] = useState<
    Array<{ time: string; action: string; details?: string }>
  >([]);

  const filteredJobs = useMemo(() => {
    const list = jobs.filter((j) =>
      activeTab === "active" ? !j.archived : !!j.archived,
    );
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(
      (j) =>
        j.title.toLowerCase().includes(q) || j.id.toLowerCase().includes(q),
    );
  }, [jobs, search, activeTab]);

  const paginatedJobs = (() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredJobs.slice(start, start + itemsPerPage);
  })();

  // Form template used when opening full form page (this component supports both listing and full form)
  const formFieldsCount = 12; // our full form has >10 fields
  const smallFormFieldsCount = 8; // for modal quick create

  const openCreate = () => {
    if (smallFormFieldsCount <= 10) {
      setShowCreateModal(true);
    } else {
      // show full form area on this page by navigating or focusing — keep user on this page and scroll to full form
      // We'll toggle a 'createFullOpen' mode by focusing the form area (we'll reuse jobToEdit=null)
      setJobToEdit(null);
      // scroll into view: use anchor
      const el = document.getElementById("job-full-form");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setAuditLog((prev) => [
      {
        time: new Date().toISOString(),
        action: "Open Create",
        details: `Mode: ${smallFormFieldsCount <= 10 ? "modal" : "full"}`,
      },
      ...prev,
    ]);
  };

  const handleSaveFullForm = (payload: Job) => {
    setJobs((prev) => [payload, ...prev]);
    setAuditLog((prev) => [
      {
        time: new Date().toISOString(),
        action: "Create Job",
        details: payload.title,
      },
      ...prev,
    ]);
    // if modal was open close it
    setShowCreateModal(false);
  };

  const handleOpenUpdate = (job: Job) => {
    if (formFieldsCount <= 10) {
      setJobToEdit(job);
      setShowUpdateModal(true);
    } else {
      // navigate to full edit form in this page: set jobToEdit and scroll
      setJobToEdit(job);
      const el = document.getElementById("job-full-form");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setAuditLog((prev) => [
      {
        time: new Date().toISOString(),
        action: "Open Update",
        details: job.title,
      },
      ...prev,
    ]);
  };

  const handleApplyUpdate = (updated: Job) => {
    setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
    setAuditLog((prev) => [
      {
        time: new Date().toISOString(),
        action: "Update Job",
        details: updated.title,
      },
      ...prev,
    ]);
    setShowUpdateModal(false);
    setJobToEdit(null);
  };

  const confirmArchive = (job: Job) => {
    setArchiveConfirmFor(job);
  };

  const doArchive = () => {
    if (!archiveConfirmFor) return;
    setJobs((prev) =>
      prev.map((j) =>
        j.id === archiveConfirmFor.id
          ? { ...j, archived: true, status: "Archived" }
          : j,
      ),
    );
    setAuditLog((prev) => [
      {
        time: new Date().toISOString(),
        action: "Archive Job",
        details: archiveConfirmFor.title,
      },
      ...prev,
    ]);
    setArchiveConfirmFor(null);
  };

  const restoreJob = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId ? { ...j, archived: false, status: "Active" } : j,
      ),
    );
    setAuditLog((prev) => [
      { time: new Date().toISOString(), action: "Restore Job", details: jobId },
      ...prev,
    ]);
  };

  const handleOpenManage = (job: Job) => {
    setManageJob(job);
    setManageForm({
      title: job.title,
      department: job.department || "",
      location: job.location,
      status: job.status || "Draft",
      datePosted: job.datePosted || "",
    });
    setShowManageModal(true);
  };

  const handleSaveManage = () => {
    if (!manageJob) return;
    const updated: Job = {
      ...manageJob,
      title: manageForm.title,
      department: manageForm.department,
      location: manageForm.location,
      status: manageForm.status,
      datePosted: manageForm.datePosted,
    };
    setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
    setShowManageModal(false);
    setManageJob(null);
  };

  const handleViewDetails = (job: Job) => {
    setJobToView(job);
    setShowJobDetailsModal(true);
    setAuditLog((prev) => [
      {
        time: new Date().toISOString(),
        action: "View Job Details",
        details: job.title,
      },
      ...prev,
    ]);
  };

  const handleViewApplication = (job: Job) => {
    console.log("Viewing applications for job:", job.title);
    setAuditLog((prev) => [
      {
        time: new Date().toISOString(),
        action: "View Applications",
        details: job.title,
      },
      ...prev,
    ]);
    setShowPlugHireModal(true);
  };

  return (
    <Layout>
      <div className="job-posting space-y-5">
        {/* Page Title */}
        <h1 className="text-3xl font-semibold text-foreground">Job Postings</h1>

        {/* Job Posting Content */}
        <div className="w-full">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search job posting"
                  className="w-[280px] h-10 rounded-md pl-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab("archived")}
                className="h-10 px-4 rounded-md text-sm font-medium border border-gray-300 text-gray-700 bg-transparent"
              >
                Archive
              </button>
              <button
                onClick={openCreate}
                className="h-10 px-4 rounded-md text-sm font-bold bg-green-600 text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Job
              </button>
            </div>
          </div>

          <Card className="w-full p-4">
            <div className="mt-4">
              {/* Table View */}
              {viewMode === "table" && (
                <div className="overflow-auto">
                  <table
                    className="w-full text-sm table-auto border-collapse mx-auto"
                    style={{ maxWidth: "1200px" }}
                  >
                    <thead>
                      <tr className="text-left text-xs text-muted-foreground border-b">
                        <th className="py-2 pr-4 font-bold uppercase text-gray-900">
                          JOB ID
                        </th>
                        <th className="py-2 pr-4 font-bold uppercase text-gray-900">
                          JOB TITLE
                        </th>
                        <th className="py-2 pr-4 font-bold uppercase text-gray-900">
                          DEPARTMENT
                        </th>
                        <th className="py-2 pr-4 font-bold uppercase text-gray-900">
                          LOCATION
                        </th>
                        <th className="py-2 pr-4 font-bold uppercase text-gray-900">
                          STATUS
                        </th>
                        <th className="py-2 pr-4 font-bold uppercase text-gray-900">
                          DATE POSTED
                        </th>
                        <th className="py-2 pr-4 font-bold uppercase text-gray-900 text-center">
                          APPLICANTS COUNT
                        </th>
                        <th className="py-2 pr-4 font-bold uppercase text-gray-900">
                          ACTION
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedJobs.map((job) => (
                        <tr
                          key={job.id}
                          className="border-b last:border-b-0 hover:bg-gray-100 transition"
                        >
                          <td className="py-3 pr-4">{job.id}</td>
                          <td className="py-3 pr-4">
                            <div className="font-medium">{job.title}</div>
                          </td>
                          <td className="py-3 pr-4">{job.department}</td>
                          <td className="py-3 pr-4">{job.location}</td>
                          <td className="py-3 pr-4">{job.status}</td>
                          <td className="py-3 pr-4">
                            {formatDateMDY(job.datePosted)}
                          </td>
                          <td className="py-3 pr-4 text-center">
                            {job.applicants ?? 0}
                          </td>
                          <td className="py-3 pr-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0"
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onSelect={() => {
                                    setTimeout(() => handleOpenManage(job), 0);
                                  }}
                                >
                                  <Edit className="w-4 h-4 mr-2" />
                                  Manage Job Posting
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={() => {
                                    setTimeout(
                                      () => handleViewApplication(job),
                                      0,
                                    );
                                  }}
                                >
                                  <FileText className="w-4 h-4 mr-2" />
                                  View Applications ({job.applicants ?? 0})
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={() => {
                                    setTimeout(() => confirmArchive(job), 0);
                                  }}
                                >
                                  <Archive className="w-4 h-4 mr-2" />
                                  Archive Job Posting
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Grid View */}
              {viewMode === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredJobs.map((job) => (
                    <Card key={job.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-lg font-semibold">
                            {job.title}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {job.department}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDateMDY(job.datePosted)}
                        </div>
                      </div>

                      <div className="mt-3 text-sm text-muted-foreground">
                        {job.location}
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="px-2 py-1 rounded-full bg-gray-100 text-muted-foreground">
                            {job.applicants}
                          </div>
                          <div className="text-xs">
                            {(job.integrations || []).join(", ") ||
                              "No integrations"}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onSelect={() => {
                                setTimeout(() => handleOpenManage(job), 0);
                              }}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Manage Job Posting
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() => {
                                setTimeout(() => handleViewApplication(job), 0);
                              }}
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              View Applications ({job.applicants ?? 0})
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() => {
                                setTimeout(() => confirmArchive(job), 0);
                              }}
                            >
                              <Archive className="w-4 h-4 mr-2" />
                              Archive Job Posting
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({
              length: Math.max(
                1,
                Math.ceil(filteredJobs.length / itemsPerPage),
              ),
            }).map((_, idx) => (
              <Button
                key={idx}
                size="sm"
                variant={currentPage === idx + 1 ? "default" : "ghost"}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </Button>
            ))}
            <Button
              size="sm"
              variant="ghost"
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(
                    Math.max(1, Math.ceil(filteredJobs.length / itemsPerPage)),
                    p + 1,
                  ),
                )
              }
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Create Job Modal */}
        <Dialog open={showPlugHireModal} onOpenChange={setShowPlugHireModal}>
          <DialogContent className="max-w-3xl w-full rounded-[12px] p-6">
            <DialogHeader>
              <div className="flex items-start justify-between w-full">
                <div>
                  <DialogTitle>Candidate Applications</DialogTitle>
                  <DialogDescription>
                    Manage candidates from Indeed and LinkedIn. Review
                    applications, accept or remove candidates.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={candidateSearch}
                    onChange={(e) => setCandidateSearch(e.target.value)}
                    placeholder="Search candidates..."
                    className="pl-10"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCandidateTab("Indeed")}
                    className={`h-10 px-4 rounded-md text-sm ${candidateTab === "Indeed" ? "bg-black text-white" : "bg-gray-100"}`}
                  >
                    Indeed
                  </button>
                  <button
                    onClick={() => setCandidateTab("LinkedIn")}
                    className={`h-10 px-4 rounded-md text-sm ${candidateTab === "LinkedIn" ? "bg-black text-white" : "bg-gray-100"}`}
                  >
                    LinkedIn
                  </button>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" /> Actions{" "}
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        setCandidates(initialCandidates);
                      }}
                    >
                      Sync Data
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setCandidates((prev) =>
                          prev.map((c) => ({ ...c, status: "accepted" })),
                        );
                        setShowPlugHireModal(false);
                      }}
                    >
                      Accept All
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setCandidates((prev) =>
                          prev.map((c) =>
                            selectedCandidateIds.includes(c.id)
                              ? { ...c, status: "archived" }
                              : c,
                          ),
                        );
                        setShowPlugHireModal(false);
                      }}
                    >
                      Archive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="max-h-[360px] overflow-y-auto space-y-2">
                {candidates
                  .filter(
                    (c) =>
                      c.source === candidateTab &&
                      c.name
                        .toLowerCase()
                        .includes(candidateSearch.toLowerCase()),
                  )
                  .map((c) => (
                    <div
                      key={c.id}
                      className="border rounded-md p-3 flex items-start gap-3"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCandidateIds.includes(c.id)}
                          onChange={(e) => {
                            if (e.target.checked)
                              setSelectedCandidateIds((prev) => [
                                ...prev,
                                c.id,
                              ]);
                            else
                              setSelectedCandidateIds((prev) =>
                                prev.filter((id) => id !== c.id),
                              );
                          }}
                          className="mr-3"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-full text-sm font-medium">
                              <AvatarFallback>
                                {c.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .slice(0, 2)
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{c.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {c.position}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-muted-foreground">
                              {c.status}
                            </div>
                            <div>
                              <button
                                onClick={() =>
                                  setExpandedIds((prev) =>
                                    prev.includes(c.id)
                                      ? prev.filter((id) => id !== c.id)
                                      : [...prev, c.id],
                                  )
                                }
                                className="p-1 rounded-md hover:bg-gray-100"
                              >
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {expandedIds.includes(c.id) && (
                          <div className="mt-3 text-sm text-muted-foreground">
                            <div>{c.description}</div>
                            <div className="mt-1 text-xs text-muted-foreground">
                              {c.email}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <DialogFooter>
              <div className="flex items-center justify-end gap-3 w-full">
                <Button
                  variant="outline"
                  className="border-red-600 text-red-600"
                  onClick={() => {
                    setCandidates((prev) =>
                      prev.map((c) =>
                        selectedCandidateIds.includes(c.id)
                          ? { ...c, status: "rejected" }
                          : c,
                      ),
                    );
                    setShowPlugHireModal(false);
                  }}
                >
                  Remove
                </Button>
                <Button
                  className="bg-black text-white"
                  onClick={() => {
                    setCandidates((prev) =>
                      prev.map((c) =>
                        selectedCandidateIds.includes(c.id)
                          ? { ...c, status: "accepted" }
                          : c,
                      ),
                    );
                    setShowPlugHireModal(false);
                  }}
                >
                  Accept
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[12px] p-6 shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Create New Job Posting
              </DialogTitle>
              <DialogDescription>
                Fill in the details for your new job posting. Fields marked with
                * are required.
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget as HTMLFormElement);

                // Get screening questions as an array
                const screeningQuestions = [];
                for (let i = 1; i <= 5; i++) {
                  const question = f.get(`screeningQuestion${i}`) as string;
                  if (question && question.trim()) {
                    screeningQuestions.push(question.trim());
                  }
                }

                const payload: Job = {
                  id: `J-${Math.floor(Math.random() * 9000) + 1000}`,
                  // Required fields
                  title: (f.get("title") as string) || "",
                  company: (f.get("company") as string) || "",
                  location: (f.get("location") as string) || "",
                  workplaceType:
                    (f.get("workplaceType") as Job["workplaceType"]) ||
                    "on-site",
                  description: (f.get("description") as string) || "",
                  employmentType:
                    (f.get("employmentType") as Job["employmentType"]) ||
                    "full-time",

                  // Optional fields
                  department: (f.get("department") as string) || undefined,
                  seniorityLevel:
                    (f.get("seniorityLevel") as Job["seniorityLevel"]) ||
                    undefined,
                  qualifications:
                    (f.get("qualifications") as string) || undefined,
                  salary: (f.get("salary") as string) || undefined,
                  applicationMethods:
                    (f.get("applicationMethods") as string) || undefined,
                  closingDate: (f.get("closingDate") as string) || undefined,
                  perksAndBenefits:
                    (f.get("perksAndBenefits") as string) || undefined,
                  screeningQuestions:
                    screeningQuestions.length > 0
                      ? screeningQuestions
                      : undefined,

                  // System fields
                  status: (f.get("status") as Job["status"]) || "Draft",
                  datePosted: new Date().toISOString().slice(0, 10),
                  applicants: 0,
                  integrations: [],
                  archived: false,
                };

                handleSaveFullForm(payload);
              }}
            >
              <div className="space-y-6">
                {/* Required Fields Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Required Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Job Title *</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="e.g. Senior Software Engineer"
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="company">Company / Employer *</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="e.g. AI2AIM Technologies"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">
                      Location (City, Province, Country) *
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g. San Francisco, CA, United States"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="workplaceType">Workplace Type *</Label>
                      <Select name="workplaceType" required>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select workplace type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="on-site">On-site</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="employmentType">Employment Type *</Label>
                      <Select name="employmentType" required>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select employment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="temporary">Temporary</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Job Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Provide a detailed description of the role, responsibilities, and requirements..."
                      required
                      rows={4}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Optional Fields Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Additional Details (Optional)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Select name="department">
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Engineering">
                            Engineering
                          </SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Product">Product</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Operations">Operations</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="HR">Human Resources</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="seniorityLevel">Seniority Level</Label>
                      <Select name="seniorityLevel">
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select seniority level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entry-level">
                            Entry Level
                          </SelectItem>
                          <SelectItem value="junior">Junior</SelectItem>
                          <SelectItem value="mid-level">Mid Level</SelectItem>
                          <SelectItem value="senior">Senior</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="director">Director</SelectItem>
                          <SelectItem value="executive">Executive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="qualifications">
                      Required / Preferred Qualifications
                    </Label>
                    <Textarea
                      id="qualifications"
                      name="qualifications"
                      placeholder="Education requirements, years of experience, skills, certifications..."
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="salary">Salary or Compensation Range</Label>
                    <Input
                      id="salary"
                      name="salary"
                      placeholder="e.g. $80,000 - $120,000 annually"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="applicationMethods">
                      Application Methods / How to Apply
                    </Label>
                    <Input
                      id="applicationMethods"
                      name="applicationMethods"
                      placeholder="e.g. Apply via LinkedIn, send resume to careers@company.com"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="closingDate">Application Deadline</Label>
                    <Input
                      id="closingDate"
                      name="closingDate"
                      type="date"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="perksAndBenefits">
                      Job Perks, Benefits, Company Culture
                    </Label>
                    <Textarea
                      id="perksAndBenefits"
                      name="perksAndBenefits"
                      placeholder="Health insurance, flexible hours, remote work options, company culture details..."
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Screening Questions (to filter candidates)</Label>
                    <div className="space-y-2 mt-1">
                      <Input
                        name="screeningQuestion1"
                        placeholder="Question 1 (optional)"
                      />
                      <Input
                        name="screeningQuestion2"
                        placeholder="Question 2 (optional)"
                      />
                      <Input
                        name="screeningQuestion3"
                        placeholder="Question 3 (optional)"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="status">Publication Status</Label>
                    <Select name="status" defaultValue="Draft">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Save as Draft</SelectItem>
                        <SelectItem value="Active">
                          Publish Immediately
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Create Job Posting
                  </Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Update Modal (for small forms) */}
        <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Update Job</DialogTitle>
              <DialogDescription>
                Update a few fields quickly.
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget as HTMLFormElement);
                if (!jobToEdit) return;
                const updated: Job = {
                  ...jobToEdit,
                  title: (f.get("title") as string) || jobToEdit.title,
                  location: (f.get("location") as string) || jobToEdit.location,
                };
                handleApplyUpdate(updated);
              }}
            >
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <Label>Job Title</Label>
                  <Input name="title" defaultValue={jobToEdit?.title || ""} />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    name="location"
                    defaultValue={jobToEdit?.location || ""}
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setShowUpdateModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Archive confirmation dialog */}
        <Dialog
          open={!!archiveConfirmFor}
          onOpenChange={() => setArchiveConfirmFor(null)}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Archive Job</DialogTitle>
              <DialogDescription>
                Are you sure you want to archive this job posting? This will
                hide it from active listings.
              </DialogDescription>
            </DialogHeader>
            <CardContent>
              <div className="text-sm">{archiveConfirmFor?.title}</div>
            </CardContent>
            <DialogFooter>
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setArchiveConfirmFor(null)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={doArchive}>
                  Archive
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Manage Job Posting Modal */}
        <Dialog open={showManageModal} onOpenChange={setShowManageModal}>
          <DialogContent className="max-w-2xl w-full rounded-[12px] p-6">
            <DialogHeader>
              <DialogTitle>Manage Job Posting</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Job Title</Label>
                    </div>
                    <Input
                      className="mt-1"
                      value={manageForm.title}
                      onChange={(e) =>
                        setManageForm((p) => ({ ...p, title: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Department</Label>
                    </div>
                    <Input
                      className="mt-1"
                      value={manageForm.department}
                      onChange={(e) =>
                        setManageForm((p) => ({
                          ...p,
                          department: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Location</Label>
                    </div>
                    <Input
                      className="mt-1"
                      value={manageForm.location}
                      onChange={(e) =>
                        setManageForm((p) => ({
                          ...p,
                          location: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Status</Label>
                    </div>
                    <Select
                      value={manageForm.status}
                      onValueChange={(v) =>
                        setManageForm((p) => ({
                          ...p,
                          status: v as Job["status"],
                        }))
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                        <SelectItem value="Archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Date Posted</Label>
                    </div>
                    <Input
                      className="mt-1"
                      type="date"
                      value={manageForm.datePosted}
                      onChange={(e) =>
                        setManageForm((p) => ({
                          ...p,
                          datePosted: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">
                  View Applications
                </h3>
                <Card>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Applicants
                    </div>
                    <div className="text-lg font-semibold">
                      {manageJob?.applicants ?? 0}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <DialogFooter className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowManageModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveManage}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Job Details Modal */}
        <Dialog
          open={showJobDetailsModal}
          onOpenChange={setShowJobDetailsModal}
        >
          <DialogContent className="max-w-2xl w-full rounded-[12px] p-6">
            <DialogHeader>
              <div className="flex items-start justify-between w-full">
                <div>
                  <DialogTitle className="text-xl font-semibold">
                    {jobToView?.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground mt-1">
                    {jobToView?.company} • {jobToView?.department}
                  </DialogDescription>
                </div>
                <button
                  onClick={() => setShowJobDetailsModal(false)}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              {/* Job Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Location
                  </Label>
                  <p className="text-sm text-gray-900 mt-1">
                    {jobToView?.location}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Job Type
                  </Label>
                  <p className="text-sm text-gray-900 mt-1">
                    {jobToView?.jobType}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Salary Range
                  </Label>
                  <p className="text-sm text-gray-900 mt-1">
                    {jobToView?.salary}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Status
                  </Label>
                  <div className="mt-1">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        jobToView?.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : jobToView?.status === "Closed"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {jobToView?.status}
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Date Posted
                  </Label>
                  <p className="text-sm text-gray-900 mt-1">
                    {jobToView ? formatDateMDY(jobToView.datePosted) : ""}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Applicants
                  </Label>
                  <p className="text-sm text-gray-900 mt-1">
                    {jobToView?.applicants ?? 0}
                  </p>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Description
                </Label>
                <p className="text-sm text-gray-900 mt-2 leading-relaxed">
                  {jobToView?.description || "No description available."}
                </p>
              </div>

              {/* Integrations */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Integrations
                </Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {jobToView?.integrations &&
                  jobToView.integrations.length > 0 ? (
                    jobToView.integrations.map((integration, index) => (
                      <span
                        key={index}
                        className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {integration}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">
                      No integrations configured
                    </span>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="flex items-center justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowJobDetailsModal(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setShowJobDetailsModal(false);
                  if (jobToView) handleOpenUpdate(jobToView);
                }}
              >
                Edit Job
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
