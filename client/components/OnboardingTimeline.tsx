import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckSquare, Download, Edit, FileText, Mail, Maximize2, Upload } from "lucide-react";

interface TimelineItem {
  id: string;
  title: string;
  completed: boolean;
  files: { name: string; url: string }[];
  textSubmission?: string;
  dateSubmitted?: string;
}

interface TimelineSection {
  id: string;
  title: string;
  items: TimelineItem[];
  description?: string;
}

export default function OnboardingTimeline() {
  const { toast } = useToast();
  // Mock hired candidate
  const [candidate] = useState({ id: "emp-001", name: "Taylor Rodriguez" });

  // Sections with checklist items
  const [sections, setSections] = useState<TimelineSection[]>([
    {
      id: "pre",
      title: "Pre-Onboarding Stage",
      description: "Offer accepted → HR triggers onboarding tasks → Candidate fills forms → IT & Manager notified",
      items: [
        { id: "pre-1", title: "Send offer letter & confirm start date", completed: false, files: [] },
        { id: "pre-2", title: "Welcome email with onboarding instructions", completed: false, files: [] },
        { id: "pre-3", title: "Collect required documents (IDs, forms, tax info, banking, emergency contacts)", completed: false, files: [] },
        { id: "pre-4", title: "Background checks / employment verification (optional)", completed: false, files: [] },
        { id: "pre-5", title: "Employment contract & NDAs for e-signature", completed: false, files: [] },
        { id: "pre-6", title: "Order equipment & provision access (laptop, system accounts, software)", completed: false, files: [] },
        { id: "pre-7", title: "Setup payroll & tax details", completed: false, files: [] },
        { id: "pre-8", title: "Share first-day schedule & handbook", completed: false, files: [] },
      ],
    },
    {
      id: "day1",
      title: "Orientation Stage",
      items: [
        { id: "day1-1", title: "Welcome session with HR (policies, benefits, payroll, leave system)", completed: false, files: [] },
        { id: "day1-2", title: "Office tour & facilities overview", completed: false, files: [] },
        { id: "day1-3", title: "Provide onboarding kit (swag, ID badge, access cards)", completed: false, files: [] },
        { id: "day1-4", title: "Workstation & account setup", completed: false, files: [] },
        { id: "day1-5", title: "Assign compliance training (health & safety, data privacy, security awareness)", completed: false, files: [] },
        { id: "day1-6", title: "Meet manager & immediate team", completed: false, files: [] },
      ],
    },
    {
      id: "week1",
      title: "Integration Stage",
      items: [
        { id: "w1-1", title: "Complete HR paperwork & benefits enrollment", completed: false, files: [] },
        { id: "w1-2", title: "Team introduction & role overview", completed: false, files: [] },
        { id: "w1-3", title: "Role-specific training & tools onboarding", completed: false, files: [] },
        { id: "w1-4", title: "Shadowing/buddy/knowledge transfer sessions", completed: false, files: [] },
        { id: "w1-5", title: "First-week goals & check-in with manager", completed: false, files: [] },
      ],
    },
  ]);

  // Send Checklist Link modal
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailAttachment, setEmailAttachment] = useState<File | null>(null);

  // Update status per-item
  const [statusModal, setStatusModal] = useState<{ open: boolean; sectionId?: string; itemId?: string }>({ open: false });

  const totals = useMemo(() => {
    const total = sections.reduce((acc, s) => acc + s.items.length, 0);
    const complete = sections.reduce((acc, s) => acc + s.items.filter(i => i.completed).length, 0);
    const failed = sections.reduce((acc, s) => acc + s.items.filter(i => !i.completed && !!i.dateSubmitted).length, 0);
    const inProcess = Math.max(total - complete - failed, 0);
    const pct = total ? Math.round((complete / total) * 100) : 0;
    return { total, complete, failed, inProcess, pct };
  }, [sections]);

  const markItem = (sectionId: string, itemId: string, completed: boolean) => {
    setSections(prev => prev.map(s => s.id === sectionId ? {
      ...s,
      items: s.items.map(i => i.id === itemId ? { ...i, completed, dateSubmitted: completed ? new Date().toISOString() : i.dateSubmitted } : i)
    } : s));
  };

  const attachFile = (sectionId: string, itemId: string, file: File | null) => {
    if (!file) return;
    const entry = { name: file.name, url: URL.createObjectURL(file) };
    setSections(prev => prev.map(s => s.id === sectionId ? {
      ...s,
      items: s.items.map(i => i.id === itemId ? { ...i, completed: true, files: [...i.files, entry], dateSubmitted: new Date().toISOString() } : i)
    } : s));
  };

  const saveText = (sectionId: string, itemId: string, text: string) => {
    if (!text) return;
    setSections(prev => prev.map(s => s.id === sectionId ? {
      ...s,
      items: s.items.map(i => i.id === itemId ? { ...i, textSubmission: text, completed: true, dateSubmitted: new Date().toISOString() } : i)
    } : s));
  };

  const ProgressBar = ({ value }: { value: number }) => (
    <div className="flex items-center gap-2">
      <div className="w-56 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-2 bg-blue-600" style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-medium text-gray-700">{value}%</span>
    </div>
  );

  const allDone = totals.total > 0 && totals.total === totals.complete;

  return (
    <div className="space-y-4">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="rounded-none">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Total Candidates</div>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>
        <Card className="rounded-none">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Passed</div>
            <div className="text-2xl font-bold text-green-600">{totals.complete}</div>
          </CardContent>
        </Card>
        <Card className="rounded-none">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Failed</div>
            <div className="text-2xl font-bold text-red-600">{totals.failed}</div>
          </CardContent>
        </Card>
        <Card className="rounded-none">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">In Process</div>
            <div className="text-2xl font-bold text-amber-600">{totals.inProcess}</div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-semibold">Onboarding Timeline – {candidate.name}</div>
            <div className="text-xs text-muted-foreground">From Pre-Onboarding to Integration</div>
          </div>
          <div className="flex items-center gap-3">
            <ProgressBar value={totals.pct} />
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setSendModalOpen(true)}>
              <Mail className="w-4 h-4 mr-2" /> Send Checklist Link
            </Button>
            <Button variant="ghost" className="text-red-600 hover:text-red-700" onClick={() => {
              const headers = ['Section','Item','Status','Date Submitted'];
              const rows: string[] = [];
              sections.forEach(s => s.items.forEach(i => {
                const status = i.completed ? 'Passed' : (i.dateSubmitted ? 'Failed' : 'In Process');
                rows.push([
                  s.title,
                  i.title,
                  status,
                  i.dateSubmitted ? new Date(i.dateSubmitted).toLocaleString() : ''
                ].map(v => `"${String(v).replace(/\"/g,'""')}"`).join(','));
              }));
              const csv = [headers.join(','), ...rows].join('\n');
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a'); a.href = url; a.download = 'onboarding_timeline_export.csv'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
            }}>Export</Button>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Sections */}
      <Accordion type="multiple" className="space-y-2">
        {sections.map((section) => (
          <AccordionItem key={section.id} value={section.id}>
            <AccordionTrigger className="text-sm font-semibold">
              <div className="flex items-center gap-2">
                <CheckSquare className={`w-4 h-4 ${section.items.every(i => i.completed) ? 'text-green-600' : 'text-gray-400'}`} />
                {section.title}
                <Badge variant="secondary" className="ml-2 text-xs">{section.items.filter(i => i.completed).length}/{section.items.length}</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {section.description && (
                <p className="text-xs text-muted-foreground mb-3">{section.description}</p>
              )}
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="border rounded-md p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-medium">{item.title}</div>
                        <div className="text-xs text-muted-foreground">{item.completed ? 'Completed' : 'Pending'}</div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="text-xs" onClick={() => {
                          const newTitle = prompt('Edit item title', item.title) || item.title;
                          setSections(prev => prev.map(s => s.id === section.id ? { ...s, items: s.items.map(it => it.id === item.id ? { ...it, title: newTitle } : it) } : s));
                        }}>
                          <Edit className="w-3 h-3 mr-1" /> Edit
                        </Button>
                        <label className="inline-flex items-center">
                          <input type="file" className="hidden" onChange={(e) => attachFile(section.id, item.id, e.target.files?.[0] || null)} />
                          <span className="inline-flex items-center px-2 py-1 border rounded text-xs cursor-pointer"><Upload className="w-3 h-3 mr-1" /> Upload</span>
                        </label>
                        <Button variant="outline" size="sm" className="text-xs" onClick={() => setStatusModal({ open: true, sectionId: section.id, itemId: item.id })}>
                          Update Status
                        </Button>
                        <div className="text-xs text-muted-foreground ml-2">Date Submitted: {item.dateSubmitted ? new Date(item.dateSubmitted).toLocaleString() : '-'}</div>
                      </div>
                    </div>

                    {/* Text submission */}
                    {item.textSubmission ? (
                      <div className="text-sm whitespace-pre-wrap border rounded p-2 mt-2">{item.textSubmission}</div>
                    ) : (
                      <div className="mt-2">
                        <label className="block text-xs font-medium mb-1">Text Response</label>
                        <Textarea rows={3} placeholder="Enter response..." onBlur={(e) => saveText(section.id, item.id, e.target.value)} />
                      </div>
                    )}

                    {/* Files */}
                    {item.files.length > 0 && (
                      <div className="space-y-2 mt-2">
                        {item.files.map((f, idx) => (
                          <div key={idx} className="border rounded p-2">
                            <div className="flex items-center justify-between text-sm">
                              <div className="truncate max-w-[70%]">{f.name}</div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="text-xs" onClick={() => window.open(f.url, '_blank')}><Maximize2 className="w-3 h-3 mr-1" /> Full Screen</Button>
                                <Button variant="outline" size="sm" className="text-xs" onClick={() => window.open(f.url, '_blank')}><FileText className="w-3 h-3 mr-1" /> View</Button>
                                <a href={f.url} download className="inline-flex items-center px-2 py-1 border rounded text-xs"><Download className="w-3 h-3 mr-1" /> Download</a>
                              </div>
                            </div>
                            <div className="mt-2">
                              <iframe src={f.url} className="w-full h-48 border rounded" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Footer actions */}
      {allDone && (
        <div className="flex items-center justify-between pt-2 border-t">
          <Button variant="destructive" onClick={() => toast({ title: 'Candidate rejected' })}>Reject Candidate</Button>
          <Button className="bg-green-600 hover:bg-green-700" onClick={() => toast({ title: 'Onboarding marked complete' })}>Mark Onboarding Complete</Button>
        </div>
      )}

      {/* Send Checklist Link Modal */}
      <Dialog open={sendModalOpen} onOpenChange={setSendModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold">Send Checklist Link</DialogTitle>
            <DialogDescription>Compose a message and attach files. The link allows the candidate to submit required items.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block mb-1 font-medium">Email Subject</label>
              <Input value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} placeholder="Subject" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email Message</label>
              <Textarea rows={4} value={emailMessage} onChange={(e) => setEmailMessage(e.target.value)} placeholder="Write your message..." />
            </div>
            <div>
              <label className="block mb-1 font-medium">Upload Attachment</label>
              <Input type="file" onChange={(e) => setEmailAttachment(e.target.files?.[0] || null)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSendModalOpen(false)}>Cancel</Button>
            <Button onClick={() => { setSendModalOpen(false); toast({ title: 'Checklist link sent' }); }}>Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Status Modal */}
      <Dialog open={statusModal.open} onOpenChange={(open) => setStatusModal({ open })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold">Update Status</DialogTitle>
          </DialogHeader>
          <div className="text-xs text-muted-foreground">Set this item as Pass or Reject.</div>
          <DialogFooter>
            <Button variant="destructive" onClick={() => {
              if (statusModal.sectionId && statusModal.itemId) markItem(statusModal.sectionId, statusModal.itemId, false);
              setStatusModal({ open: false });
            }}>Reject</Button>
            <Button onClick={() => {
              if (statusModal.sectionId && statusModal.itemId) markItem(statusModal.sectionId, statusModal.itemId, true);
              setStatusModal({ open: false });
            }}>Pass</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
