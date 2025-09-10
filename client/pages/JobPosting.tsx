import React, { useMemo, useState } from "react";
import { Plus, Edit, Archive, Search as SearchIcon, List, Grid as GridIcon, Trash2, RefreshCw } from "lucide-react";
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

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center bg-white rounded-lg shadow-sm px-3 py-1">
            <button className={`px-3 py-1 rounded-md ${activeTab === "active" ? "bg-[var(--hr-primary)] text-white" : "text-muted-foreground"}`} onClick={() => setActiveTab("active")}>
              Active
            </button>
            <button className={`px-3 py-1 rounded-md ${activeTab === "archived" ? "bg-[var(--hr-primary)] text-white" : "text-muted-foreground"}`} onClick={() => setActiveTab("archived")}>
              Archive
            </button>
          </div>

          <Button size="sm" variant="outline" onClick={() => { setSearch(""); }}><RefreshCw className="w-4 h-4" /></Button>
          <Button size="sm" variant="default" onClick={openCreate}><Plus className="w-4 h-4" />Create</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2">
          <Card className="p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search job postings..." className="pl-10" />
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant={viewMode === "table" ? "default" : "outline"} onClick={() => setViewMode("table")}><List className="w-4 h-4" /></Button>
                  <Button size="sm" variant={viewMode === "grid" ? "default" : "outline"} onClick={() => setViewMode("grid")}><GridIcon className="w-4 h-4" /></Button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              {/* Table View */}
              {viewMode === "table" && (
                <div className="overflow-auto">
                  <table className="w-full text-sm table-auto border-collapse">
                    <thead>
                      <tr className="text-left text-xs text-muted-foreground border-b">
                        <th className="py-2 pr-4">Job Title</th>
                        <th className="py-2 pr-4">Department</th>
                        <th className="py-2 pr-4">Location</th>
                        <th className="py-2 pr-4">Status</th>
                        <th className="py-2 pr-4">Date Posted</th>
                        <th className="py-2 pr-4">Applicants</th>
                        <th className="py-2 pr-4">Integrations</th>
                        <th className="py-2 pr-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredJobs.map((job) => (
                        <tr key={job.id} className="border-b last:border-b-0 hover:bg-gray-50 transition">
                          <td className="py-3 pr-4">
                            <div className="font-medium">{job.title}</div>
                            <div className="text-xs text-muted-foreground">{job.company} • {job.jobType}</div>
                          </td>
                          <td className="py-3 pr-4">{job.department}</td>
                          <td className="py-3 pr-4">{job.location}</td>
                          <td className="py-3 pr-4">{job.status}</td>
                          <td className="py-3 pr-4">{job.datePosted}</td>
                          <td className="py-3 pr-4">{job.applicants ?? 0}</td>
                          <td className="py-3 pr-4">{(job.integrations || []).join(", ") || "—"}</td>
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleOpenUpdate(job)}><Edit className="w-3.5 h-3.5" /></Button>
                              <Button size="sm" variant="destructive" onClick={() => confirmArchive(job)}><Trash2 className="w-3.5 h-3.5" /></Button>
                            </div>
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
        </div>

        <div>
          <Card className="p-4">
            <h3 className="text-lg font-medium mb-3">Integrations (Plug & Hire)</h3>
            <div className="text-sm text-muted-foreground mb-3">Auto-sync with external job platforms. Connect integrations to enable plug & hire flow.</div>
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm text-muted-foreground">Not connected — <a className="text-[var(--hr-primary)]">Connect</a></div>

            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Audit Log</h4>
              <div className="space-y-2 max-h-48 overflow-auto">
                {auditLog.length === 0 && <div className="text-sm text-muted-foreground">No actions yet.</div>}
                {auditLog.map((a, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground">{new Date(a.time).toLocaleString()} — {a.action} {a.details ? `: ${a.details}` : ""}</div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Full form area (used when full-page create/edit is required) */}
      <div id="job-full-form" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>{jobToEdit ? "Edit Job Posting" : "New Job Posting (Full Form)"}</CardTitle>
          </CardHeader>

          <form onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget as HTMLFormElement);
            const payload: Job = {
              id: (form.get("jobId") as string) || `J-${Math.floor(Math.random()*9000)+1000}`,
              title: (form.get("title") as string) || "Untitled",
              department: form.get("department") as string || "",
              company: form.get("company") as string || "",
              location: form.get("location") as string || "",
              locationType: form.get("locationType") as string || "",
              jobType: form.get("jobType") as string || "",
              salary: form.get("salary") as string || "",
              status: (form.get("status") as Job["status"]) || "Active",
              datePosted: form.get("datePosted") as string || new Date().toISOString().slice(0,10),
              applicants: Number(form.get("applicants") as string) || 0,
              integrations: [],
              description: form.get("description") as string || "",
            };

            if (jobToEdit) {
              handleApplyUpdate(payload);
            } else {
              handleSaveFullForm(payload);
            }
          }}>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <Label>Job Title</Label>
                    <Input name="title" defaultValue={jobToEdit?.title || ""} />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input name="company" defaultValue={jobToEdit?.company || "AI2AIM"} />
                  </div>
                  <div>
                    <Label>Department</Label>
                    <Input name="department" defaultValue={jobToEdit?.department || ""} />
                  </div>

                  <div>
                    <Label>Location</Label>
                    <Input name="location" defaultValue={jobToEdit?.location || ""} />
                  </div>

                  <div>
                    <Label>Location Type</Label>
                    <Select name="locationType" defaultValue={jobToEdit?.locationType || "onsite"}>
                      <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="onsite">Onsite</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Job Type</Label>
                    <Select name="jobType" defaultValue={jobToEdit?.jobType || "Full-time"}>
                      <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Salary</Label>
                    <Input name="salary" defaultValue={jobToEdit?.salary || ""} />
                  </div>

                  <div>
                    <Label>Date Posted</Label>
                    <Input type="date" name="datePosted" defaultValue={jobToEdit?.datePosted || new Date().toISOString().slice(0,10)} />
                  </div>

                  <div>
                    <Label>Job ID</Label>
                    <Input name="jobId" defaultValue={jobToEdit?.id || ""} />
                  </div>

                </div>

                <div className="space-y-3">
                  <div>
                    <Label>Job Description</Label>
                    <Textarea name="description" defaultValue={jobToEdit?.description || ""} className="min-h-[120px]" />
                  </div>

                  <div>
                    <Label>Applicants</Label>
                    <Input name="applicants" defaultValue={String(jobToEdit?.applicants ?? 0)} />
                  </div>

                  <div>
                    <Label>Status</Label>
                    <Select name="status" defaultValue={jobToEdit?.status || "Active"}>
                      <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                        <SelectItem value="Archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Integrations</Label>
                    <Input name="integrations" defaultValue={(jobToEdit?.integrations || []).join(", ")} />
                  </div>

                  <div>
                    <Label>Department (optional)</Label>
                    <Input name="department2" defaultValue={jobToEdit?.department || ""} />
                  </div>

                </div>
              </div>
            </CardContent>

            <CardFooter>
              <div className="flex items-center justify-end gap-2 w-full">
                <Button variant="outline" type="button" onClick={() => { setJobToEdit(null); }}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </CardFooter>
          </form>
        </Card>
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
