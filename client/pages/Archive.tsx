import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, RotateCcw, Trash2, Archive as ArchiveIcon, Folder, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ArchivedItemBase {
  id: string;
  archivedOn: string; // MM-DD-YYYY
  reason?: string;
}

interface ArchivedCandidate extends ArchivedItemBase {
  type: "candidate";
  name: string;
  appliedPosition: string;
}

interface ArchivedJob extends ArchivedItemBase {
  type: "job";
  title: string;
  department: string;
}

type ArchivedItem = ArchivedCandidate | ArchivedJob;

const initialArchived: ArchivedItem[] = [
  {
    id: "C-001",
    type: "candidate",
    name: "Alex Johnson",
    appliedPosition: "Frontend Developer",
    archivedOn: "08-10-2025",
    reason: "Position filled",
  },
  {
    id: "J-2024-09",
    type: "job",
    title: "UI/UX Designer",
    department: "Design",
    archivedOn: "08-08-2025",
    reason: "Role closed",
  },
  {
    id: "C-002",
    type: "candidate",
    name: "Priya Patel",
    appliedPosition: "Data Analyst",
    archivedOn: "08-06-2025",
  },
];

export default function Archive() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "candidate" | "job">("all");
  const [items, setItems] = useState<ArchivedItem[]>(initialArchived);
  const { toast } = useToast();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (typeFilter !== "all" && it.type !== typeFilter) return false;
      if (!q) return true;
      if (it.type === "candidate") {
        const c = it as ArchivedCandidate;
        return (
          c.name.toLowerCase().includes(q) ||
          c.appliedPosition.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q)
        );
      }
      const j = it as ArchivedJob;
      return (
        j.title.toLowerCase().includes(q) ||
        j.department.toLowerCase().includes(q) ||
        j.id.toLowerCase().includes(q)
      );
    });
  }, [items, query, typeFilter]);

  const restoreItem = (id: string) => {
    const item = items.find((i) => i.id === id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast({ title: "Restored", description: item ? `${labelFor(item)} has been restored.` : "Item restored." });
  };

  const deleteItem = (id: string) => {
    const item = items.find((i) => i.id === id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast({ title: "Deleted", description: item ? `${labelFor(item)} permanently removed.` : "Item deleted." });
  };

  const labelFor = (it: ArchivedItem) =>
    it.type === "candidate" ? `Candidate ${it.name}` : `Job ${it.title}`;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArchiveIcon className="w-5 h-5 text-gray-700" />
          <h1 className="text-xl font-semibold text-gray-900">Archive</h1>
        </div>
        <Badge variant="secondary" className="text-xs">{items.length} items</Badge>
      </div>

      <Card className="p-0 border border-gray-200 rounded-none">
        <CardContent className="p-3">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="relative w-64 max-w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, title, or ID"
                className="pl-10 h-8 text-sm"
              />
            </div>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant={typeFilter === "all" ? "default" : "outline"}
                onClick={() => setTypeFilter("all")}
              >
                All
              </Button>
              <Button
                size="sm"
                variant={typeFilter === "candidate" ? "default" : "outline"}
                onClick={() => setTypeFilter("candidate")}
              >
                Candidates
              </Button>
              <Button
                size="sm"
                variant={typeFilter === "job" ? "default" : "outline"}
                onClick={() => setTypeFilter("job")}
              >
                Jobs
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table className="w-full text-sm">
              <TableHeader>
                <TableRow className="text-left text-[13px] text-gray-600 border-b">
                  <TableHead className="py-2 px-3 font-bold text-black text-left w-40">TYPE</TableHead>
                  <TableHead className="py-2 px-3 font-bold text-black text-left">NAME / TITLE</TableHead>
                  <TableHead className="py-2 px-3 font-bold text-black text-left">DETAILS</TableHead>
                  <TableHead className="py-2 px-3 font-bold text-black text-left whitespace-nowrap">ARCHIVED ON</TableHead>
                  <TableHead className="py-2 px-3 font-bold text-black text-left">REASON</TableHead>
                  <TableHead className="py-2 px-3 font-bold text-black text-left">ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((it) => (
                  <TableRow key={it.id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <TableCell className="px-3 py-2 align-middle">
                      <div className="inline-flex items-center gap-2">
                        {it.type === "candidate" ? (
                          <User className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Folder className="w-4 h-4 text-purple-600" />
                        )}
                        <span className="text-xs font-medium capitalize">{it.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-3 py-2 align-middle">
                      {it.type === "candidate" ? (
                        <div className="leading-tight">
                          <div className="text-[14px] font-medium text-gray-900">
                            {(it as ArchivedCandidate).name}
                          </div>
                          <div className="text-xs text-gray-600">ID: {it.id}</div>
                        </div>
                      ) : (
                        <div className="leading-tight">
                          <div className="text-[14px] font-medium text-gray-900">
                            {(it as ArchivedJob).title}
                          </div>
                          <div className="text-xs text-gray-600">ID: {it.id}</div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="px-3 py-2 align-middle">
                      {it.type === "candidate" ? (
                        <div className="text-sm text-gray-700">{(it as ArchivedCandidate).appliedPosition}</div>
                      ) : (
                        <div className="text-sm text-gray-700">{(it as ArchivedJob).department}</div>
                      )}
                    </TableCell>
                    <TableCell className="px-3 py-2 align-middle text-sm">{it.archivedOn}</TableCell>
                    <TableCell className="px-3 py-2 align-middle text-sm">{it.reason || "-"}</TableCell>
                    <TableCell className="px-3 py-2 align-middle">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => restoreItem(it.id)}>
                          <RotateCcw className="w-4 h-4 mr-1" /> Restore
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteItem(it.id)}>
                          <Trash2 className="w-4 h-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="px-3 py-6 text-center text-sm text-gray-500">
                      No archived items found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
