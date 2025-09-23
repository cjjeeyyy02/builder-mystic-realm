import { useMemo, useState, Fragment } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { List, Grid, Download, ChevronDown } from "lucide-react";
import OnboardingTimeline from "@/components/OnboardingTimeline";

interface HiredCandidate {
  id: string;
  name: string;
  position: string;
  joiningDate: string; // yyyy-mm-dd or mm-dd-yyyy
  dateAdded: string;
  stage: "Pre-Onboarding" | "Orientation" | "Integration";
}

function formatMDY(dateStr: string) {
  const m = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (m) return dateStr;
  const y = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (y) return `${y[2]}-${y[3]}-${y[1]}`;
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
  }
  return dateStr;
}

const sample: HiredCandidate[] = [
  {
    id: "1",
    name: "Emily Rodriguez",
    position: "Marketing Specialist",
    joiningDate: "2025-08-11",
    dateAdded: "2025-08-05",
    stage: "Pre-Onboarding",
  },
  {
    id: "2",
    name: "David Kim",
    position: "Software Engineer",
    joiningDate: "2025-08-05",
    dateAdded: "2025-08-01",
    stage: "Orientation",
  },
  {
    id: "3",
    name: "Carlos Mendez",
    position: "Sales Associate",
    joiningDate: "2025-08-02",
    dateAdded: "2025-07-28",
    stage: "Integration",
  },
  {
    id: "4",
    name: "Maya Singh",
    position: "Product Designer",
    joiningDate: "2025-07-29",
    dateAdded: "2025-07-25",
    stage: "Orientation",
  },
  {
    id: "5",
    name: "Sofia Rossi",
    position: "Data Analyst",
    joiningDate: "2025-07-20",
    dateAdded: "2025-07-15",
    stage: "Pre-Onboarding",
  },
];

export default function HiredCompact() {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [view, setView] = useState<"list" | "grid">("list");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const candidates = useMemo(() => {
    const q = search.toLowerCase().trim();
    return sample.filter((c) => {
      const okStage = stageFilter === "all" || c.stage === stageFilter;
      const okQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.position.toLowerCase().includes(q);
      return okStage && okQ;
    });
  }, [search, stageFilter]);

  const exportCSV = () => {
    const headers = ["Candidate", "Applied Position", "Joining Date", "Date Added", "Stage"];
    const rows = candidates.map((c) => [
      c.name,
      c.position,
      formatMDY(c.joiningDate),
      formatMDY(c.dateAdded),
      c.stage,
    ]);
    const csv = [
      headers.join(","),
      ...rows.map((r) =>
        r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","),
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hired_candidates.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3">
      {/* Controls */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-none w-64">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Input
              placeholder="Search candidates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-8 w-full rounded-md text-sm shadow-sm"
            />
          </div>
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="h-8 w-48 text-sm">
              <SelectValue placeholder="Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="Orientation">Orientation</SelectItem>
              <SelectItem value="Integration">Integration</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={view === "list" ? "default" : "outline"}
            onClick={() => setView("list")}
            title="List View"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={view === "grid" ? "default" : "outline"}
            onClick={() => setView("grid")}
            title="Grid View"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-gray-800"
            onClick={exportCSV}
          >
            <Download className="w-4 h-4 mr-1" /> Export
          </Button>
        </div>
      </div>

      {view === "list" && (
        <Card className="p-0 border border-gray-200 rounded-none">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[13px] text-gray-600 border-b">
                  <th className="py-2 px-3">CANDIDATE</th>
                  <th className="py-2 px-3">APPLIED POSITION</th>
                  <th className="py-2 px-3">JOINING DATE</th>
                  <th className="py-2 px-3">DATE ADDED</th>
                  <th className="py-2 px-3">STAGE</th>
                  <th className="py-2 px-3 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {candidates.slice(0, 5).map((c) => {
                  const initials = c.name
                    .split(" ")
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase();
                  return (
                    <Fragment key={c.id}>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
                              <span className="text-xs font-medium text-white">
                                {initials}
                              </span>
                            </div>
                            <div className="leading-tight">
                              <div className="text-[14px] font-medium text-gray-900">
                                {c.name}
                              </div>
                              <div className="text-[12px] text-gray-500">
                                Job ID: {String(c.id).padStart(3, "0")}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-[14px] text-gray-900">
                          {c.position}
                        </td>
                        <td className="py-3 px-3 text-[14px] text-gray-900">
                          {formatMDY(c.joiningDate)}
                        </td>
                        <td className="py-3 px-3 text-[14px] text-gray-900">
                          {formatMDY(c.dateAdded)}
                        </td>
                        <td className="py-3 px-3 text-[14px] text-gray-900">
                          {c.stage === "Pre-Onboarding"
                            ? "Orientation"
                            : c.stage}
                        </td>
                        <td className="py-3 px-3 text-center align-middle">
                          <div className="flex items-center justify-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() =>
                                setExpandedId(expandedId === c.id ? null : c.id)
                              }
                              aria-expanded={expandedId === c.id}
                              aria-label={
                                expandedId === c.id
                                  ? "Collapse details"
                                  : "Expand details"
                              }
                            >
                              <ChevronDown
                                className={`w-4 h-4 transition-transform ${expandedId === c.id ? "rotate-180" : ""}`}
                              />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      {expandedId === c.id && (
                        <tr className="border-b">
                          <td colSpan={6} className="bg-gray-50">
                            <div className="p-3 border-t">
                              <OnboardingTimeline />
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {candidates.slice(0, 5).map((c) => {
            const initials = c.name
              .split(" ")
              .map((s) => s[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();
            return (
              <Card key={c.id} className="p-4 border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
                      <span className="text-sm font-medium text-white">
                        {initials}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {c.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        Job ID: {String(c.id).padStart(3, "0")}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() =>
                      setExpandedId(expandedId === c.id ? null : c.id)
                    }
                    aria-expanded={expandedId === c.id}
                    aria-label={
                      expandedId === c.id
                        ? "Collapse details"
                        : "Expand details"
                    }
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${expandedId === c.id ? "rotate-180" : ""}`}
                    />
                  </Button>
                </div>
                <div className="text-xs text-gray-600">
                  <div className="mb-1">
                    <span className="font-medium text-gray-900">Position:</span>{" "}
                    {c.position}
                  </div>
                  <div className="mb-1">
                    <span className="font-medium text-gray-900">Joining:</span>{" "}
                    {formatMDY(c.joiningDate)}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Stage:</span>{" "}
                    {c.stage === "Pre-Onboarding" ? "Orientation" : c.stage}
                  </div>
                </div>
                {expandedId === c.id && (
                  <div className="mt-3 border-t pt-3">
                    <OnboardingTimeline />
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
