import React, { useMemo, useState } from "react";
import { Plus, Edit, Archive, Search as SearchIcon, List, Grid as GridIcon, Trash2, RefreshCw, ChevronDown, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Job Postings</h1>
      </div>

      <div className="w-full flex justify-center mb-4">
        <div className="w-full max-w-[1200px]">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <button onClick={() => alert('Plug and Hire')} className="h-10 py-0 px-4 rounded-md text-sm font-bold bg-[#111827] text-white">
                Plug and Hire
              </button>

              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search job posting" className="w-[280px] h-10 rounded-md pl-10" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => setActiveTab('active')} className={`h-10 px-4 rounded-md text-sm font-medium ${activeTab === 'active' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`}>
                Active
              </button>
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
                                <Button size="sm" variant="ghost"><MoreHorizontal className="w-4 h-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => navigate(`/job-posting/${job.id}`)}>View Details</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => alert('Integration')}>Integration</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleOpenUpdate(job)}>Edit Job Details</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => confirmArchive(job)}>Archive Job Details</DropdownMenuItem>
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

      </div>


      {/* Create Modal (quick form) */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Create Job (Quick)</DialogTitle>
            <DialogDescription>Quick create for short forms.</DialogDescription>
          </DialogHeader>

          <form onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget as HTMLFormElement);
            const payload: Job = {
              id: `J-${Math.floor(Math.random()*9000)+1000}`,
              title: (f.get("title") as string) || "Untitled",
              company: (f.get("company") as string) || "AI2AIM",
              location: (f.get("location") as string) || "",
              jobType: (f.get("jobType") as string) || "",
              datePosted: new Date().toISOString().slice(0,10),
              applicants: 0,
              status: "Active",
              integrations: [],
            };
            handleSaveFullForm(payload);
          }}>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <Label>Job Title</Label>
                <Input name="title" />
              </div>
              <div>
                <Label>Company</Label>
                <Input name="company" defaultValue="AI2AIM" />
              </div>
              <div>
                <Label>Location</Label>
                <Input name="location" />
              </div>
              <div>
                <Label>Job Type</Label>
                <Select name="jobType">
                  <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button variant="outline" type="button" onClick={() => setShowCreateModal(false)}>Cancel</Button>
                <Button type="submit">Create</Button>
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

    </div>
  );
}
