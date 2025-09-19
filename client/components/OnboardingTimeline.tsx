import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Edit, FileText, Maximize2, Upload } from "lucide-react";

interface TimelineItem {
  id: string;
  title: string;
  completed: boolean;
  files: { name: string; url: string }[];
  textSubmission?: string;
  dateCompleted?: string;
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



  const totals = useMemo(() => {
    const total = sections.reduce((acc, s) => acc + s.items.length, 0);
    const complete = sections.reduce((acc, s) => acc + s.items.filter(i => i.completed).length, 0);
    const failed = sections.reduce((acc, s) => acc + s.items.filter(i => !i.completed && !!i.dateCompleted).length, 0);
    const inProcess = Math.max(total - complete - failed, 0);
    const pct = total ? Math.round((complete / total) * 100) : 0;
    return { total, complete, failed, inProcess, pct };
  }, [sections]);

  const markItem = (sectionId: string, itemId: string, completed: boolean) => {
    setSections(prev => prev.map(s => s.id === sectionId ? {
      ...s,
      items: s.items.map(i => i.id === itemId ? { ...i, completed, dateCompleted: completed ? new Date().toISOString() : undefined } : i)
    } : s));
  };

  const attachFile = (sectionId: string, itemId: string, file: File | null) => {
    if (!file) return;
    const entry = { name: file.name, url: URL.createObjectURL(file) };
    setSections(prev => prev.map(s => s.id === sectionId ? {
      ...s,
      items: s.items.map(i => i.id === itemId ? { ...i, completed: true, files: [...i.files, entry], dateCompleted: new Date().toISOString() } : i)
    } : s));
  };

  const saveText = (sectionId: string, itemId: string, text: string) => {
    if (!text) return;
    setSections(prev => prev.map(s => s.id === sectionId ? {
      ...s,
      items: s.items.map(i => i.id === itemId ? { ...i, textSubmission: text, completed: true, dateCompleted: new Date().toISOString() } : i)
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
                {section.title}
                <Badge variant="secondary" className="ml-2 text-xs">{section.items.filter(i => i.completed).length}/{section.items.length}</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {section.description && (
                <p className="text-sm text-muted-foreground mb-3">{section.description}</p>
              )}
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[13px] text-gray-600 border-b">
                      <th className="py-2 px-3">TASK</th>
                      <th className="py-2 px-3">RESPONSE</th>
                      <th className="py-2 px-3 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map((item) => (
                      <tr key={item.id} className="border-b last:border-b-0 align-top">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="text-gray-600 hover:text-gray-900"
                              onClick={() => {
                                const newTitle = prompt('Edit item title', item.title) || item.title;
                                setSections(prev => prev.map(s => s.id === section.id ? { ...s, items: s.items.map(it => it.id === item.id ? { ...it, title: newTitle } : it) } : s));
                              }}
                              aria-label="Edit task title"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <span className="text-[14px] font-medium text-gray-900">{item.title}</span>
                          </div>
                          <div className="text-[12px] text-gray-500 mt-1">Date Submitted: {item.dateSubmitted ? formatDateMDY(item.dateSubmitted) : '-'}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <Checkbox checked={item.completed} onCheckedChange={(v) => markItem(section.id, item.id, Boolean(v))} />
                            <span className="text-sm">Enter Response</span>
                          </div>
                          <div className="mt-2">
                            <Input
                              placeholder="Enter response..."
                              defaultValue={item.textSubmission || ''}
                              onBlur={(e) => saveText(section.id, item.id, e.target.value)}
                              className="h-8 text-sm"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="w-full flex justify-end">
                            <Button variant="outline" size="sm" className="h-8 px-3" onClick={() => markItem(section.id, item.id, !item.completed)}>
                              Update Status
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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


    </div>
  );
}
