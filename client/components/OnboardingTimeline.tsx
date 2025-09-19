import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CheckSquare, Download, Edit, FileText, Maximize2, Upload } from "lucide-react";

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

function formatDateMDY(dateStr: string): string {
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
  }
  const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) return `${m[2]}-${m[3]}-${m[1]}`;
  const m2 = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (m2) return dateStr;
  return dateStr;
}

export default function OnboardingTimeline() {
  const { toast } = useToast();
  // Mock hired candidate
  const [candidate] = useState({ id: "emp-001", name: "Taylor Rodriguez" });

  // Sections with checklist items
  const [sections, setSections] = useState<TimelineSection[]>([
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


  const allDone = totals.total > 0 && totals.total === totals.complete;

  return (
    <div className="onboarding-corporate space-y-6">


      {/* Timeline Sections */}
      <Accordion type="multiple" className="space-y-6">
        {sections.map((section) => (
          <AccordionItem key={section.id} value={section.id}>
            <AccordionTrigger className="text-base font-medium">
              <div className="flex items-center gap-2">
                <CheckSquare className={`w-4 h-4 ${section.items.every(i => i.completed) ? 'text-green-600' : 'text-gray-400'}`} />
                {section.title}
                <Badge variant="secondary" className="ml-2 text-xs">{section.items.filter(i => i.completed).length}/{section.items.length}</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {section.description && (
                <p className="text-sm text-muted-foreground mb-3">{section.description}</p>
              )}
              <div className="space-y-2.5">
                {section.items.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-medium">{item.title}</div>
                        <div className="text-sm text-muted-foreground">{item.completed ? 'Completed' : 'Pending'}</div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" className="h-10" onClick={() => {
                          const newTitle = prompt('Edit item title', item.title) || item.title;
                          setSections(prev => prev.map(s => s.id === section.id ? { ...s, items: s.items.map(it => it.id === item.id ? { ...it, title: newTitle } : it) } : s));
                        }}>
                          <Edit className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <label className="inline-flex items-center">
                          <input type="file" className="hidden" onChange={(e) => attachFile(section.id, item.id, e.target.files?.[0] || null)} />
                          <span className="inline-flex items-center h-10 px-3 border rounded-md text-sm cursor-pointer"><Upload className="w-4 h-4 mr-1" /> Upload</span>
                        </label>
                        <Button variant="outline" className="h-10" onClick={() => setStatusModal({ open: true, sectionId: section.id, itemId: item.id })}>
                          Update Status
                        </Button>
                        <div className="text-sm text-muted-foreground ml-2">Date Submitted: {item.dateSubmitted ? formatDateMDY(item.dateSubmitted) : '-'}</div>
                      </div>
                    </div>

                    {/* Text submission */}
                    {item.textSubmission ? (
                      <div className="text-sm whitespace-pre-wrap border rounded-md p-3 mt-2 bg-white">{item.textSubmission}</div>
                    ) : (
                      <div className="mt-2">
                        <label className="block text-base font-medium mb-1">Text Response</label>
                        <Textarea rows={3} placeholder="Enter response..." onBlur={(e) => saveText(section.id, item.id, e.target.value)} />
                      </div>
                    )}

                    {/* Files */}
                    {item.files.length > 0 && (
                      <div className="space-y-2 mt-2">
                        {item.files.map((f, idx) => (
                          <div key={idx} className="border rounded-md p-3 bg-white">
                            <div className="flex items-center justify-between text-sm">
                              <div className="truncate max-w-[70%]">{f.name}</div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" className="h-10" onClick={() => window.open(f.url, '_blank')}><Maximize2 className="w-4 h-4 mr-1" /> Full Screen</Button>
                                <Button variant="outline" className="h-10" onClick={() => window.open(f.url, '_blank')}><FileText className="w-4 h-4 mr-1" /> View</Button>
                                <a href={f.url} download className="inline-flex items-center h-10 px-3 border rounded-md text-sm"><Download className="w-4 h-4 mr-1" /> Download</a>
                              </div>
                            </div>
                            <div className="mt-2">
                              <iframe src={f.url} className="w-full h-48 border rounded-md" />
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
          <Button variant="outline" className="h-10" onClick={() => toast({ title: 'Candidate rejected' })}>Reject Candidate</Button>
          <Button className="h-10" onClick={() => toast({ title: 'Onboarding marked complete' })}>Mark Onboarding Complete</Button>
        </div>
      )}


      {/* Update Status Modal */}
      <Dialog open={statusModal.open} onOpenChange={(open) => setStatusModal({ open })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-medium">Update Status</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground">Set this item as Pass or Reject.</div>
          <DialogFooter>
            <Button variant="outline" className="h-10" onClick={() => {
              if (statusModal.sectionId && statusModal.itemId) markItem(statusModal.sectionId, statusModal.itemId, false);
              setStatusModal({ open: false });
            }}>Reject</Button>
            <Button className="h-10" onClick={() => {
              if (statusModal.sectionId && statusModal.itemId) markItem(statusModal.sectionId, statusModal.itemId, true);
              setStatusModal({ open: false });
            }}>Pass</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
