import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import CircleCheckbox from "@/components/ui/circle-checkbox";
import { Edit } from "lucide-react";

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
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
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
  const [candidate] = useState({ id: "emp-001", name: "Taylor Rodriguez" });

  const [sections, setSections] = useState<TimelineSection[]>([
    {
      id: "day1",
      title: "Orientation Stage",
      items: [
        {
          id: "day1-1",
          title:
            "Welcome session with HR (policies, benefits, payroll, leave system)",
          completed: false,
          files: [],
        },
        {
          id: "day1-2",
          title: "Office tour & facilities overview",
          completed: false,
          files: [],
        },
        {
          id: "day1-3",
          title: "Provide onboarding kit (swag, ID badge, access cards)",
          completed: false,
          files: [],
        },
        {
          id: "day1-4",
          title: "Workstation & account setup",
          completed: false,
          files: [],
        },
        {
          id: "day1-5",
          title:
            "Assign compliance training (health & safety, data privacy, security awareness)",
          completed: false,
          files: [],
        },
        {
          id: "day1-6",
          title: "Meet manager & immediate team",
          completed: false,
          files: [],
        },
      ],
    },
    {
      id: "week1",
      title: "Integration Stage",
      items: [
        {
          id: "w1-1",
          title: "Complete HR paperwork & benefits enrollment",
          completed: false,
          files: [],
        },
        {
          id: "w1-2",
          title: "Team introduction & role overview",
          completed: false,
          files: [],
        },
        {
          id: "w1-3",
          title: "Role-specific training & tools onboarding",
          completed: false,
          files: [],
        },
        {
          id: "w1-4",
          title: "Shadowing/buddy/knowledge transfer sessions",
          completed: false,
          files: [],
        },
        {
          id: "w1-5",
          title: "First-week goals & check-in with manager",
          completed: false,
          files: [],
        },
        {
          id: "w1-6",
          title: "Schedule 30/60/90-day goals discussion",
          completed: false,
          files: [],
        },
      ],
    },
  ]);

  const totals = useMemo(() => {
    const total = sections.reduce((acc, s) => acc + s.items.length, 0);
    const complete = sections.reduce(
      (acc, s) => acc + s.items.filter((i) => i.completed).length,
      0,
    );
    const failed = sections.reduce(
      (acc, s) =>
        acc + s.items.filter((i) => !i.completed && !!i.dateCompleted).length,
      0,
    );
    const inProcess = Math.max(total - complete - failed, 0);
    const pct = total ? Math.round((complete / total) * 100) : 0;
    return { total, complete, failed, inProcess, pct };
  }, [sections]);

  const markItem = (sectionId: string, itemId: string, completed: boolean) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              items: s.items.map((i) =>
                i.id === itemId
                  ? {
                      ...i,
                      completed,
                      dateCompleted: completed
                        ? new Date().toISOString()
                        : undefined,
                    }
                  : i,
              ),
            }
          : s,
      ),
    );
  };

  const saveText = (sectionId: string, itemId: string, text: string) => {
    if (!text) return;
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              items: s.items.map((i) =>
                i.id === itemId
                  ? {
                      ...i,
                      textSubmission: text,
                      completed: true,
                      dateCompleted: new Date().toISOString(),
                    }
                  : i,
              ),
            }
          : s,
      ),
    );
  };

  const allDone = totals.total > 0 && totals.total === totals.complete;

  return (
    <div className="onboarding-corporate space-y-3">
      <Accordion type="multiple" className="space-y-2">
        {sections.map((section) => (
          <AccordionItem key={section.id} value={section.id} className="border rounded-md">
            <AccordionTrigger className="text-[14px] font-bold py-1 px-2">
              <div className="flex items-center justify-between gap-2 w-full">
                <span className="text-[14px] text-gray-900">{section.title}</span>
                <span className="ml-auto text-[14px] text-gray-700">{section.items.filter((i) => i.completed).length}/{section.items.length}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-2">
              {section.description && (
                <p className="text-sm text-muted-foreground mb-3">
                  {section.description}
                </p>
              )}
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[13px] text-gray-700 font-semibold border-b leading-tight">
                      <th className="py-1.5 px-2 text-[13px] font-semibold">TASK</th>
                      <th className="py-1.5 px-2 text-center text-[13px] font-semibold">COMPLETED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.slice(0, 5).map((item) => (
                      <tr key={item.id} className="border-b last:border-b-0">
                        <td className="py-1.5 px-2 align-top w-[70%]">
                          <div className="flex items-center gap-1">
                            <span className="text-[12px] font-normal leading-tight text-gray-900">
                              {item.title}
                            </span>
                            <span
                              role="button"
                              tabIndex={0}
                              className="text-gray-600 hover:text-gray-900"
                              onClick={(e) => {
                                e.stopPropagation();
                                const newTitle =
                                  prompt("Edit item title", item.title) ||
                                  item.title;
                                setSections((prev) =>
                                  prev.map((s) =>
                                    s.id === section.id
                                      ? {
                                          ...s,
                                          items: s.items.map((it) =>
                                            it.id === item.id
                                              ? { ...it, title: newTitle }
                                              : it,
                                          ),
                                        }
                                      : s,
                                  ),
                                );
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  (e as any).stopPropagation();
                                  const newTitle =
                                    prompt("Edit item title", item.title) ||
                                    item.title;
                                  setSections((prev) =>
                                    prev.map((s) =>
                                      s.id === section.id
                                        ? {
                                            ...s,
                                            items: s.items.map((it) =>
                                              it.id === item.id
                                                ? { ...it, title: newTitle }
                                                : it,
                                            ),
                                          }
                                        : s,
                                    ),
                                  );
                                }
                              }}
                              aria-label="Edit task title"
                            >
                              <Edit className="w-4 h-4" />
                            </span>
                          </div>
                          <div className="text-[10px] text-[#8A8A8A] mt-0.5 leading-tight">
                            Date Completed:{" "}
                            {item.dateCompleted
                              ? formatDateMDY(item.dateCompleted)
                              : "-"}
                          </div>
                        </td>
                        <td className="py-1.5 px-2 align-middle w-[30%]">
                          <div className="w-full flex items-center justify-center">
                            <CircleCheckbox className="h-3.5 w-3.5"
                              checked={item.completed}
                              onCheckedChange={(v) =>
                                markItem(section.id, item.id, Boolean(v))
                              }
                            />
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

      {allDone && (
        <div className="flex items-center justify-between pt-2 border-t">
          <Button
            variant="outline"
            className="h-10"
            onClick={() => toast({ title: "Candidate rejected" })}
          >
            Reject Candidate
          </Button>
          <Button
            className="h-10"
            onClick={() => toast({ title: "Onboarding marked complete" })}
          >
            Mark Onboarding Complete
          </Button>
        </div>
      )}
    </div>
  );
}
