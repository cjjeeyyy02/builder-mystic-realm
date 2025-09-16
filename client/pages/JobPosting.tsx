import React, { useMemo, useState } from "react";
import { Plus, Edit, Archive, Search as SearchIcon, List, Grid as GridIcon, Trash2, RefreshCw, ChevronDown, MoreVertical, ChevronLeft, ChevronRight, X, Check, Mail, Eye, FileText } from "lucide-react";
import Layout from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

type Job = {
  id: string;
  title: string;
  department?: string;
  company?: string;
  location?: string;
  locationType?: string;
  jobType?: string;
  salary?: string;
  status?: "Active" | "Closed" | "Archived";
  datePosted?: string;
  applicants?: number;
  integrations?: string[];
  description?: string;
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
  { id: "C-2001", name: "Alex Johnson", position: "Backend Engineer", source: "Indeed", description: "Experienced Node.js developer.", email: "alex.johnson@example.com", status: "pending" },
  { id: "C-2002", name: "Maria Gomez", position: "Product Designer", source: "LinkedIn", description: "Designs delightful user experiences.", email: "maria.gomez@example.com", status: "pending" },
  { id: "C-2003", name: "Liam Smith", position: "DevOps Engineer", source: "Indeed", description: "Infrastructure and CI/CD specialist.", email: "liam.smith@example.com", status: "pending" },
];

const initialJobs: Job[] = [
  {
    id: "J-1001",
    title: "Software Engineer",
    department: "Engineering",
    company: "AI2AIM",
    location: "San Francisco, CA",
    locationType: "onsite",
    jobType: "Full-time",
    salary: "$110,000 - $140,000",
    status: "Active",
    datePosted: "2025-08-01",
    applicants: 12,
    integrations: ["LinkedIn"],
    description: "Backend services and APIs",
  },
  {
    id: "J-1002",
    title: "Product Designer",
    department: "Design",
    company: "AI2AIM",
    location: "Remote",
    locationType: "remote",
    jobType: "Full-time",
    salary: "$90,000 - $120,000",
    status: "Active",
    datePosted: "2025-07-15",
    applicants: 8,
    integrations: [],
    description: "Design product experiences",
  },
  {
    id: "J-1003",
    title: "DevOps Engineer",
    department: "Infrastructure",
    company: "AI2AIM",
    location: "Dublin, Ireland",
    locationType: "hybrid",
    jobType: "Full-time",
    salary: "€80,000 - €95,000",
    status: "Closed",
    datePosted: "2025-05-10",
    applicants: 20,
    integrations: ["Plug & Hire"],
    description: "Manage CI/CD and infra",
  },
];

export default function JobPosting() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");
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
  const [candidateTab, setCandidateTab] = useState<"Indeed" | "LinkedIn">("Indeed");
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  // Audit log
  const [auditLog, setAuditLog] = useState<Array<{ time: string; action: string; details?: string }>>([]);

  const filteredJobs = useMemo(() => {
    const list = jobs.filter((j) => (activeTab === "active" ? !j.archived : !!j.archived));
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        (j.company || "").toLowerCase().includes(q) ||
        (j.department || "").toLowerCase().includes(q)
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
    setAuditLog((prev) => [{ time: new Date().toISOString(), action: "Open Create", details: `Mode: ${smallFormFieldsCount <= 10 ? "modal" : "full"}` }, ...prev]);
  };

  const handleSaveFullForm = (payload: Job) => {
    setJobs((prev) => [payload, ...prev]);
    setAuditLog((prev) => [{ time: new Date().toISOString(), action: "Create Job", details: payload.title }, ...prev]);
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
    setAuditLog((prev) => [{ time: new Date().toISOString(), action: "Open Update", details: job.title }, ...prev]);
  };

  const handleApplyUpdate = (updated: Job) => {
    setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
    setAuditLog((prev) => [{ time: new Date().toISOString(), action: "Update Job", details: updated.title }, ...prev]);
    setShowUpdateModal(false);
    setJobToEdit(null);
  };

  const confirmArchive = (job: Job) => {
    setArchiveConfirmFor(job);
  };

  const doArchive = () => {
    if (!archiveConfirmFor) return;
    setJobs((prev) => prev.map((j) => (j.id === archiveConfirmFor.id ? { ...j, archived: true, status: "Archived" } : j)));
    setAuditLog((prev) => [{ time: new Date().toISOString(), action: "Archive Job", details: archiveConfirmFor.title }, ...prev]);
    setArchiveConfirmFor(null);
  };

  const restoreJob = (jobId: string) => {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, archived: false, status: "Active" } : j)));
    setAuditLog((prev) => [{ time: new Date().toISOString(), action: "Restore Job", details: jobId }, ...prev]);
  };

  const handleViewDetails = (job: Job) => {
    setJobToView(job);
    setShowJobDetailsModal(true);
    setAuditLog((prev) => [{ time: new Date().toISOString(), action: "View Job Details", details: job.title }, ...prev]);
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
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search job posting" className="w-[280px] h-10 rounded-md pl-10" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => setActiveTab('archived')} className="h-10 px-4 rounded-md text-sm font-medium border border-gray-300 text-gray-700 bg-transparent">
                Archive
              </button>
              <button onClick={openCreate} className="h-10 px-4 rounded-md text-sm font-bold bg-green-600 text-white flex items-center gap-2">
                <Plus className="w-4 h-4" /> + Create
              </button>
            </div>
          </div>

          <Card className="w-full p-4">
            <div className="mt-4">
              {/* Table View */}
              {viewMode === "table" && (
                <div className="overflow-auto">
                  <table className="w-full text-sm table-auto border-collapse mx-auto" style={{maxWidth: '1200px'}}>
                    <thead>
                      <tr className="text-left text-xs text-muted-foreground border-b">
                        <th className="py-2 pr-4">Job Title</th>
                        <th className="py-2 pr-4">Department</th>
                        <th className="py-2 pr-4">Location</th>
                        <th className="py-2 pr-4">Status</th>
                        <th className="py-2 pr-4">Date Posted</th>
                        <th className="py-2 pr-4">Applicants Count</th>
                        <th className="py-2 pr-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedJobs.map((job) => (
                        <tr key={job.id} className="border-b last:border-b-0 hover:bg-gray-100 transition">
                          <td className="py-3 pr-4">
                            <div className="font-medium">{job.title}</div>
                            <div className="text-xs text-muted-foreground">{job.company} • {job.jobType}</div>
                          </td>
                          <td className="py-3 pr-4">{job.department}</td>
                          <td className="py-3 pr-4">{job.location}</td>
                          <td className="py-3 pr-4">{job.status}</td>
                          <td className="py-3 pr-4">{job.datePosted}</td>
                          <td className="py-3 pr-4">{job.applicants ?? 0}</td>
                          <td className="py-3 pr-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewDetails(job)}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleViewApplication(job)}>
                                  <FileText className="w-4 h-4 mr-2" />
                                  View Application
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleOpenUpdate(job)}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Job
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => confirmArchive(job)}>
                                  <Archive className="w-4 h-4 mr-2" />
                                  Archive
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
                          <div className="text-lg font-semibold">{job.title}</div>
                          <div className="text-sm text-muted-foreground">{job.department} • {job.company}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">{job.datePosted}</div>
                      </div>

                      <div className="mt-3 text-sm text-muted-foreground">{job.location}</div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="px-2 py-1 rounded-full bg-gray-100 text-muted-foreground">{job.applicants}</div>
                          <div className="text-xs">{(job.integrations || []).join(", ") || "No integrations"}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleOpenUpdate(job)}><Edit className="w-4 h-4" /></Button>
                          <Button size="sm" variant="destructive" onClick={() => confirmArchive(job)}><Archive className="w-4 h-4" /></Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

            </div>

          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <Button size="sm" variant="ghost" onClick={() => setCurrentPage(p => Math.max(1, p-1))}><ChevronLeft className="w-4 h-4" /></Button>
            {Array.from({ length: Math.max(1, Math.ceil(filteredJobs.length / itemsPerPage)) }).map((_, idx) => (
              <Button key={idx} size="sm" variant={currentPage === idx+1 ? 'default' : 'ghost'} onClick={() => setCurrentPage(idx+1)}>{idx+1}</Button>
            ))}
            <Button size="sm" variant="ghost" onClick={() => setCurrentPage(p => Math.min(Math.max(1, Math.ceil(filteredJobs.length / itemsPerPage)), p+1))}><ChevronRight className="w-4 h-4" /></Button>
          </div>

      </div>


      {/* Create Job Modal */}
      <Dialog open={showPlugHireModal} onOpenChange={setShowPlugHireModal}>
        <DialogContent className="max-w-3xl w-full rounded-[12px] p-6">
          <DialogHeader>
            <div className="flex items-start justify-between w-full">
              <div>
                <DialogTitle>Candidate Applications</DialogTitle>
                <DialogDescription>Manage candidates from Indeed and LinkedIn. Review applications, accept or remove candidates.</DialogDescription>
              </div>
              <div>
                <button onClick={() => setShowPlugHireModal(false)} className="p-2 rounded-md hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input value={candidateSearch} onChange={(e) => setCandidateSearch(e.target.value)} placeholder="Search candidates..." className="pl-10" />
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => setCandidateTab('Indeed')} className={`h-10 px-4 rounded-md text-sm ${candidateTab === 'Indeed' ? 'bg-black text-white' : 'bg-gray-100'}`}>Indeed</button>
                <button onClick={() => setCandidateTab('LinkedIn')} className={`h-10 px-4 rounded-md text-sm ${candidateTab === 'LinkedIn' ? 'bg-black text-white' : 'bg-gray-100'}`}>LinkedIn</button>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Actions <ChevronDown className="w-3 h-3" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => { setCandidates(initialCandidates); }}>Sync Data</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setCandidates(prev => prev.map(c => ({ ...c, status: 'accepted' }))); setShowPlugHireModal(false); }}>Accept All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setCandidates(prev => prev.map(c => selectedCandidateIds.includes(c.id) ? { ...c, status: 'archived' } : c)); setShowPlugHireModal(false); }}>Archive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="max-h-[360px] overflow-y-auto space-y-2">
              {candidates.filter(c => c.source === candidateTab && c.name.toLowerCase().includes(candidateSearch.toLowerCase())).map(c => (
                <div key={c.id} className="border rounded-md p-3 flex items-start gap-3">
                  <div className="flex items-center">
                    <input type="checkbox" checked={selectedCandidateIds.includes(c.id)} onChange={(e) => {
                      if (e.target.checked) setSelectedCandidateIds(prev => [...prev, c.id]); else setSelectedCandidateIds(prev => prev.filter(id => id !== c.id));
                    }} className="mr-3" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-full text-sm font-medium">
                          <AvatarFallback>{c.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{c.name}</div>
                          <div className="text-xs text-muted-foreground">{c.position}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-muted-foreground">{c.status}</div>
                        <div>
                          <button onClick={() => setExpandedIds(prev => prev.includes(c.id) ? prev.filter(id => id !== c.id) : [...prev, c.id])} className="p-1 rounded-md hover:bg-gray-100"><ChevronDown className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>

                    {expandedIds.includes(c.id) && (
                      <div className="mt-3 text-sm text-muted-foreground">
                        <div>{c.description}</div>
                        <div className="mt-1 text-xs text-muted-foreground">{c.email}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <div className="flex items-center justify-end gap-3 w-full">
              <Button variant="outline" className="border-red-600 text-red-600" onClick={() => { setCandidates(prev => prev.map(c => selectedCandidateIds.includes(c.id) ? { ...c, status: 'rejected' } : c)); setShowPlugHireModal(false); }}>Remove</Button>
              <Button className="bg-black text-white" onClick={() => { setCandidates(prev => prev.map(c => selectedCandidateIds.includes(c.id) ? { ...c, status: 'accepted' } : c)); setShowPlugHireModal(false); }}>Accept</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="w-[520px] rounded-[12px] p-6 shadow-lg">
          <DialogHeader>
            <DialogTitle>Create Job</DialogTitle>
          </DialogHeader>

          <form onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget as HTMLFormElement);
            const payload: Job = {
              id: (f.get("jobId") as string) || `J-${Math.floor(Math.random()*9000)+1000}`,
              title: (f.get("title") as string) || "Untitled",
              department: (f.get("department") as string) || "",
              company: (f.get("company") as string) || "",
              location: (f.get("location") as string) || "",
              locationType: (f.get("locationType") as string) || "",
              jobType: (f.get("jobType") as string) || "",
              salary: (f.get("salary") as string) || "",
              status: (f.get("status") as Job["status"]) || "Active",
              datePosted: (f.get("datePosted") as string) || new Date().toISOString().slice(0,10),
              applicants: Number(f.get("applicants") as string) || 0,
              integrations: [],
              description: (f.get("description") as string) || "",
            };
            // Add to list and close modal
            handleSaveFullForm(payload);
          }}>
            <div className="space-y-4">
              <div>
                <Label>Job Title</Label>
                <Input name="title" required />
              </div>

              <div>
                <Label>Department</Label>
                <Select name="department" defaultValue="Engineering">
                  <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Location</Label>
                <Input name="location" placeholder="City, Country or Remote" />
              </div>

              <div>
                <Label>Status</Label>
                <Select name="status" defaultValue="Active">
                  <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Date Posted</Label>
                  <Input type="date" name="datePosted" className="h-10" />
                </div>
                <div>
                  <Label>Date End</Label>
                  <Input type="date" name="dateEnd" className="h-10" />
                </div>
              </div>

              <div>
                <Label>Applicants Count</Label>
                <Input type="number" name="applicants" defaultValue={0} className="h-10" />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button variant="outline" type="button" onClick={() => setShowCreateModal(false)}>Cancel</Button>
                <Button type="submit" className="bg-green-600 text-white">Save</Button>
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
            <DialogDescription>Update a few fields quickly.</DialogDescription>
          </DialogHeader>

          <form onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget as HTMLFormElement);
            if (!jobToEdit) return;
            const updated: Job = {
              ...jobToEdit,
              title: (f.get("title") as string) || jobToEdit.title,
              location: (f.get("location") as string) || jobToEdit.location,
            };
            handleApplyUpdate(updated);
          }}>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <Label>Job Title</Label>
                <Input name="title" defaultValue={jobToEdit?.title || ""} />
              </div>
              <div>
                <Label>Location</Label>
                <Input name="location" defaultValue={jobToEdit?.location || ""} />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button variant="outline" type="button" onClick={() => setShowUpdateModal(false)}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Archive confirmation dialog */}
      <Dialog open={!!archiveConfirmFor} onOpenChange={() => setArchiveConfirmFor(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Archive Job</DialogTitle>
            <DialogDescription>Are you sure you want to archive this job posting? This will hide it from active listings.</DialogDescription>
          </DialogHeader>
          <CardContent>
            <div className="text-sm">{archiveConfirmFor?.title}</div>
          </CardContent>
          <DialogFooter>
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" onClick={() => setArchiveConfirmFor(null)}>Cancel</Button>
              <Button variant="destructive" onClick={doArchive}>Archive</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Job Details Modal */}
      <Dialog open={showJobDetailsModal} onOpenChange={setShowJobDetailsModal}>
        <DialogContent className="max-w-2xl w-full rounded-[12px] p-6">
          <DialogHeader>
            <div className="flex items-start justify-between w-full">
              <div>
                <DialogTitle className="text-xl font-semibold">{jobToView?.title}</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mt-1">
                  {jobToView?.company} • {jobToView?.department}
                </DialogDescription>
              </div>
              <button onClick={() => setShowJobDetailsModal(false)} className="p-2 rounded-md hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Job Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Location</Label>
                <p className="text-sm text-gray-900 mt-1">{jobToView?.location}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Job Type</Label>
                <p className="text-sm text-gray-900 mt-1">{jobToView?.jobType}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Salary Range</Label>
                <p className="text-sm text-gray-900 mt-1">{jobToView?.salary}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Status</Label>
                <div className="mt-1">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    jobToView?.status === 'Active' ? 'bg-green-100 text-green-800' :
                    jobToView?.status === 'Closed' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {jobToView?.status}
                  </span>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Date Posted</Label>
                <p className="text-sm text-gray-900 mt-1">{jobToView?.datePosted}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Applicants</Label>
                <p className="text-sm text-gray-900 mt-1">{jobToView?.applicants ?? 0}</p>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <Label className="text-sm font-medium text-gray-700">Description</Label>
              <p className="text-sm text-gray-900 mt-2 leading-relaxed">
                {jobToView?.description || "No description available."}
              </p>
            </div>

            {/* Integrations */}
            <div>
              <Label className="text-sm font-medium text-gray-700">Integrations</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {jobToView?.integrations && jobToView.integrations.length > 0 ? (
                  jobToView.integrations.map((integration, index) => (
                    <span key={index} className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {integration}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">No integrations configured</span>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="flex items-center justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowJobDetailsModal(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setShowJobDetailsModal(false);
              if (jobToView) handleOpenUpdate(jobToView);
            }}>
              Edit Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      </div>
    </Layout>
  );
}
