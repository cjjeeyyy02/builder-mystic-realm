import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Download, Trash2, Plus, Search, ChevronRight, MoreVertical, CheckSquare, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/components/DarkModeProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

interface Employee {
  jobId: string;
  name: string;
  appliedJobRole: string;
  joiningDate: string;
  filesUploaded: string;
  activationProgress: number;
  finalDecision: "ACTIVATE EMPLOYEE" | "EMPLOYEE ACTIVATED";
}

const checklistItems: ChecklistItem[] = [
  { id: "1", title: "Offer Letter Signed", completed: true },
  { id: "2", title: "Welcome Email Sent", completed: true },
  { id: "3", title: "Documents Collection", completed: true },
  { id: "4", title: "Background Verification Initiated", completed: true },
  { id: "5", title: "Employee Details Form Filled", completed: true },
  { id: "6", title: "System & IT Requirements Collected", completed: true },
  { id: "7", title: "Email ID & Account Setup", completed: true },
];

const initialEmployees: Employee[] = [
  { jobId: "001", name: "Jaya", appliedJobRole: "Senior Developer", joiningDate: "8/15/2025", filesUploaded: "3/5", activationProgress: 75, finalDecision: "ACTIVATE EMPLOYEE" },
  { jobId: "002", name: "Mark", appliedJobRole: "Graphic Designer", joiningDate: "8/15/2025", filesUploaded: "4/5", activationProgress: 90, finalDecision: "ACTIVATE EMPLOYEE" },
  { jobId: "003", name: "John", appliedJobRole: "Content Writer", joiningDate: "8/15/2025", filesUploaded: "5/5", activationProgress: 100, finalDecision: "EMPLOYEE ACTIVATED" },
  { jobId: "004", name: "Sara", appliedJobRole: "Copywriter", joiningDate: "8/15/2025", filesUploaded: "4/5", activationProgress: 90, finalDecision: "ACTIVATE EMPLOYEE" },
  { jobId: "005", name: "Shruti", appliedJobRole: "Sale Associate", joiningDate: "8/15/2025", filesUploaded: "2/5", activationProgress: 40, finalDecision: "ACTIVATE EMPLOYEE" },
  { jobId: "006", name: "Robin", appliedJobRole: "AI Engineer", joiningDate: "8/15/2025", filesUploaded: "1/5", activationProgress: 15, finalDecision: "ACTIVATE EMPLOYEE" },
  { jobId: "007", name: "Kayle", appliedJobRole: "ML Engineer", joiningDate: "8/15/2025", filesUploaded: "5/5", activationProgress: 100, finalDecision: "EMPLOYEE ACTIVATED" },
  { jobId: "008", name: "Vali", appliedJobRole: "Data Analyst", joiningDate: "8/15/2025", filesUploaded: "4/5", activationProgress: 90, finalDecision: "ACTIVATE EMPLOYEE" },
  { jobId: "009", name: "Anne", appliedJobRole: "Finance Analyst", joiningDate: "8/15/2025", filesUploaded: "2/5", activationProgress: 40, finalDecision: "ACTIVATE EMPLOYEE" }
];

export default function ActivationView() {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState("activation-room");
  const [searchCandidates, setSearchCandidates] = useState("");
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const filteredEmployees = useMemo(() => {
    const q = searchCandidates.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.jobId.toLowerCase().includes(q) ||
      e.appliedJobRole.toLowerCase().includes(q)
    );
  }, [employees, searchCandidates]);

  // Checklist mapping per candidate: { [jobId]: [{ id, title, completed, files: File[] }] }
  const [checklistMap, setChecklistMap] = useState<Record<string, { id: string; title: string; completed: boolean; files: any[] }[]>>(() => {
    const map: Record<string, any[]> = {};
    initialEmployees.forEach((e) => {
      map[e.jobId] = checklistItems.map((it, idx) => ({ id: String(idx + 1), title: it.title, completed: it.completed, files: [] }));
    });
    return map;
  });

  const [selectedEmployeeForChecklist, setSelectedEmployeeForChecklist] = useState<Employee | null>(null);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  const openChecklistModal = (emp: Employee) => {
    setSelectedEmployeeForChecklist(emp);
    setIsChecklistOpen(true);
  };

  const closeChecklistModal = () => {
    setSelectedEmployeeForChecklist(null);
    setIsChecklistOpen(false);
  };

  const handleChecklistFileUpload = (jobId: string, itemId: string, file: File | null) => {
    if (!file) return;
    setChecklistMap((prev) => {
      const copy = { ...prev };
      const items = copy[jobId] ? [...copy[jobId]] : [];
      const idx = items.findIndex(i => i.id === itemId);
      if (idx === -1) return prev;
      const fileEntry = { name: file.name, url: URL.createObjectURL(file) };
      items[idx] = { ...items[idx], completed: true, files: [...items[idx].files, fileEntry] };
      copy[jobId] = items;

      // Update employee activation progress based on completed items
      setEmployees((emps) => emps.map(e => {
        if (e.jobId !== jobId) return e;
        const total = items.length;
        const completedCount = items.filter(it => it.completed).length;
        return { ...e, activationProgress: Math.round((completedCount / (total || 1)) * 100) };
      }));

      return copy;
    });
  };

  const sendGmailTemplate = async (action: "approve" | "reject", emp: Employee) => {
    // Placeholder for Gmail API integration — replace with real API call when connected
    console.log(`Would send Gmail template for ${action} to ${emp.name} (job ${emp.jobId})`);
    // Update employee status locally
    setEmployees((prev) => prev.map((e) => e.jobId === emp.jobId ? { ...e, activationProgress: action === 'approve' ? 100 : e.activationProgress } : e));
    // Provide a basic user feedback
    alert(`${action === 'approve' ? 'Approval' : 'Rejection'} email triggered for ${emp.name}. (Simulated)`);
  };

  const renderProgressBar = (progress: number) => {
    const getProgressColor = () => {
      if (progress < 50) return "bg-red-500";
      if (progress < 100) return "bg-orange-500";
      return "bg-green-500";
    };

    return (
      <div className="flex items-center gap-2">
        <div className={`w-24 rounded-full h-2 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
        }`}>
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className={`text-xs font-medium transition-colors duration-300 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>{progress}%</span>
      </div>
    );
  };

  return (
    <div className={`space-y-3 transition-colors duration-300 ${
      isDarkMode ? 'text-white' : 'text-gray-900'
    }`}>
      {/* Header Tabs and Controls */}
      <div className={`flex items-center justify-between border-b pb-2 transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}>

        <div className="flex items-center gap-2">

        </div>
      </div>

      {activeTab === "activation-room" ? (
        <div className="space-y-3">
          {/* Search (Activation) */}
          <div className="flex items-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search Candidates" value={searchCandidates} onChange={(e) => setSearchCandidates(e.target.value)} className="pl-10" />
            </div>
          </div>

          {/* Employee Activation Table */}
          <div className={`border rounded-lg overflow-hidden transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}>
            <Table>
              <TableHeader>
                <TableRow className={`transition-colors duration-300 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <TableHead className={`text-xs font-semibold px-3 py-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>JOB ID</TableHead>
                  <TableHead className={`text-xs font-semibold px-3 py-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>NAME</TableHead>
                  <TableHead className={`text-xs font-semibold px-3 py-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>APPLIED JOB ROLE</TableHead>
                  <TableHead className={`text-xs font-semibold px-3 py-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>JOINING DATE</TableHead>
                  <TableHead className={`text-xs font-semibold px-3 py-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>FILES UPLOADED</TableHead>
                  <TableHead className={`text-xs font-semibold px-3 py-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>ACTIVATION PROGRESS</TableHead>
                  <TableHead className={`text-xs font-semibold px-3 py-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>UPDATE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.jobId} className={`border-b transition-colors duration-300 ${
                    isDarkMode
                      ? 'border-gray-700 hover:bg-gray-700/50'
                      : 'border-gray-100 hover:bg-gray-50'
                  }`}>
                    <TableCell className={`text-xs font-medium px-3 py-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>{employee.jobId}</TableCell>
                    <TableCell className={`text-xs font-medium px-3 py-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>{employee.name}</TableCell>
                    <TableCell className={`text-xs px-3 py-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>{employee.appliedJobRole}</TableCell>
                    <TableCell className={`text-xs px-3 py-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>{employee.joiningDate}</TableCell>
                    <TableCell className={`text-xs px-3 py-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>{employee.filesUploaded}</TableCell>
                    <TableCell className="px-3 py-2">
                      {renderProgressBar(employee.activationProgress)}
                    </TableCell>
                    <TableCell className="px-3 py-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className={`h-8 w-8 p-0 transition-colors duration-200 ${
                              isDarkMode
                                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                          <DropdownMenuItem
                            onSelect={(e) => { e.preventDefault(); openChecklistModal(employee); }}
                            className={`cursor-pointer transition-colors duration-200 ${
                              isDarkMode
                                ? 'text-gray-300 hover:bg-gray-700 focus:bg-gray-700'
                                : 'text-gray-700 hover:bg-gray-100 focus:bg-gray-100'
                            }`}
                          >
                            <CheckSquare className="mr-2 h-4 w-4" />
                            View Checklist
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={(e) => { e.preventDefault(); console.log(`Send reminder for ${employee.name}`); }}
                            className={`cursor-pointer transition-colors duration-200 ${
                              isDarkMode
                                ? 'text-gray-300 hover:bg-gray-700 focus:bg-gray-700'
                                : 'text-gray-700 hover:bg-gray-100 focus:bg-gray-100'
                            }`}
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            Send reminder
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Checklist Modal */}
          <Dialog open={isChecklistOpen} onOpenChange={setIsChecklistOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Checklist - {selectedEmployeeForChecklist?.name}</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {selectedEmployeeForChecklist && (checklistMap[selectedEmployeeForChecklist.jobId] || []).map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.completed ? 'Uploaded' : 'Required'}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        onChange={(e) => handleChecklistFileUpload(selectedEmployeeForChecklist.jobId, item.id, e.target.files?.[0] ?? null)}
                        className="text-sm"
                      />
                      {item.files && item.files.length > 0 && (
                        <a href={item.files[0].url} target="_blank" rel="noreferrer" className="text-sm text-[var(--hr-primary)]">View</a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <DialogFooter>
                <div className="flex items-center justify-between w-full">
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => { if (selectedEmployeeForChecklist) sendGmailTemplate('reject', selectedEmployeeForChecklist); }}>Reject</Button>
                    <Button onClick={() => { if (selectedEmployeeForChecklist) sendGmailTemplate('approve', selectedEmployeeForChecklist); }}>Approve</Button>
                  </div>
                  <Button variant="ghost" onClick={closeChecklistModal}>Close</Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      ) : (
        <div className="space-y-3">
          {/* Onboarding Checklist Header */}
          <div className={`text-center py-4 rounded-t-lg transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800 text-white border-gray-700'
              : 'bg-gray-50 text-gray-900 border-gray-200'
          } border-b`}>
            <h1 className="text-lg font-semibold">Onboarding Checklist</h1>
          </div>

          {/* Checklist Items Table */}
          <div className={`border rounded-b-lg overflow-hidden transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}>
            <Table>
              <TableHeader>
                <TableRow className={`transition-colors duration-300 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <TableHead className={`text-sm font-semibold px-4 py-3 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>CHECKLIST ITEM</TableHead>
                  <TableHead className={`text-sm font-semibold px-4 py-3 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>STATUS</TableHead>
                  <TableHead className={`text-sm font-semibold px-4 py-3 text-right transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {checklistItems.map((item, index) => {
                  // Status logic: all items are completed in the initial data
                  const status = item.completed ? 'completed' : 'pending';

                  return (
                    <TableRow key={item.id} className={`border-b transition-colors duration-300 ${
                      isDarkMode
                        ? 'border-gray-700 hover:bg-gray-700/50'
                        : 'border-gray-100 hover:bg-gray-50'
                    }`}>
                      <TableCell className={`px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-900'
                      }`}>
                        {item.title}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            status === 'completed' ? 'bg-green-500' :
                            status === 'in-progress' ? 'bg-orange-500' : 'bg-red-500'
                          }`}></div>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            status === 'completed'
                              ? isDarkMode
                                ? 'bg-green-900 text-green-300'
                                : 'bg-green-100 text-green-800'
                              : status === 'in-progress'
                              ? isDarkMode
                                ? 'bg-orange-900 text-orange-300'
                                : 'bg-orange-100 text-orange-800'
                              : isDarkMode
                              ? 'bg-red-900 text-red-300'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {status === 'completed' ? 'Completed' :
                             status === 'in-progress' ? 'In Progress' : 'Pending'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className={`p-1.5 rounded-md transition-colors duration-200 ${
                              isDarkMode
                                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                            }`}
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            className={`p-1.5 rounded-md transition-colors duration-200 ${
                              isDarkMode
                                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                            }`}
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </button>

                          <button
                            className={`p-1.5 rounded-md transition-colors duration-200 ${
                              isDarkMode
                                ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700'
                                : 'text-gray-500 hover:text-red-600 hover:bg-gray-100'
                            }`}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Bottom Action Buttons */}
          <div className={`flex items-center justify-between p-4 border-t rounded-b-lg transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className={`text-sm font-medium px-4 py-2 rounded-lg border transition-all duration-200 ${
                  isDarkMode
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                }`}
              >
                Save Checklist
              </Button>
              <Button
                variant="outline"
                className={`text-sm font-medium px-4 py-2 rounded-lg border transition-all duration-200 ${
                  isDarkMode
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                }`}
              >
                Edit Checklist
              </Button>
            </div>
            <Button
              onClick={() => navigate("/candidate-documents-repository")}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Documents Repository
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
