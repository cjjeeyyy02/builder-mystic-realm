import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { dispatchStageChange } from "@/lib/autoChecklist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Eye, Download, Trash2, Plus, Search, ChevronRight, MoreVertical, CheckSquare, Mail, Edit, Upload, Maximize2, List, Grid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/components/DarkModeProvider";
import { useToast } from "@/hooks/use-toast";
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
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  const filteredEmployees = useMemo(() => {
    const q = searchCandidates.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.jobId.toLowerCase().includes(q) ||
      e.appliedJobRole.toLowerCase().includes(q)
    );
  }, [employees, searchCandidates]);

  // Checklist mapping per candidate: { [jobId]: [{ id, title, completed, files: {name,url}[], dateSubmitted?: string, textSubmission?: string }] }
  const [checklistMap, setChecklistMap] = useState<Record<string, { id: string; title: string; completed: boolean; files: { name: string; url: string }[]; dateSubmitted?: string; textSubmission?: string }[]>>(() => {
    const map: Record<string, any[]> = {};
    initialEmployees.forEach((e) => {
      map[e.jobId] = checklistItems.map((it, idx) => ({ id: String(idx + 1), title: it.title, completed: it.completed, files: [], dateSubmitted: undefined, textSubmission: "" }));
    });
    return map;
  });

  const [selectedEmployeeForChecklist, setSelectedEmployeeForChecklist] = useState<Employee | null>(null);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  // Send Link modal state
  const [showSendLink, setShowSendLink] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailAttachment, setEmailAttachment] = useState<File | null>(null);

  // Update Status modal state
  const [statusModalItemId, setStatusModalItemId] = useState<string | null>(null);

  const { toast } = useToast();

  const openChecklistModal = (emp: Employee) => {
    setSelectedEmployeeForChecklist(emp);
    // Defer opening so the dropdown can close first (prevents focus/overlay freeze)
    setTimeout(() => {
      setIsChecklistOpen(true);
    }, 0);
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
      items[idx] = { ...items[idx], completed: true, files: [...items[idx].files, fileEntry], dateSubmitted: new Date().toISOString() };
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

  const handleUpdateItemStatus = (jobId: string, itemId: string, status: 'pass' | 'reject') => {
    setChecklistMap((prev) => {
      const copy = { ...prev };
      const items = copy[jobId] ? [...copy[jobId]] : [];
      const idx = items.findIndex(i => i.id === itemId);
      if (idx === -1) return prev;
      const isPass = status === 'pass';
      items[idx] = { ...items[idx], completed: isPass, dateSubmitted: isPass ? new Date().toISOString() : items[idx].dateSubmitted };
      copy[jobId] = items;

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
    console.log(`Would send Gmail template for ${action} to ${emp.name} (job ${emp.jobId})`);
    setEmployees((prev) => prev.map((e) => e.jobId === emp.jobId ? { ...e, activationProgress: action === 'approve' ? 100 : e.activationProgress } : e));
    if (action === 'approve') {
      try {
        dispatchStageChange(emp.jobId, 'hired', { candidateName: emp.name });
      } catch (err) {
        console.error('Failed to dispatch stage change event', err);
      }
    }
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
          <div className="flex items-center justify-between">
            <div className="relative flex-none w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search Candidates" value={searchCandidates} onChange={(e) => setSearchCandidates(e.target.value)} className="pl-10 h-8 w-full rounded-md text-sm shadow-sm" />
            </div>
            <div className="flex items-center gap-2 ml-3">
              <Button size="sm" variant={viewMode === "table" ? "default" : "outline"} onClick={() => setViewMode("table")}>
                <List className="w-4 h-4" />
              </Button>
              <Button size="sm" variant={viewMode === "card" ? "default" : "outline"} onClick={() => setViewMode("card")}>
                <Grid className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Employee Activation Table */}
          {viewMode === 'table' && (
          <div className={`border overflow-hidden transition-colors duration-300 ${
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
                  }`}>ACTION</TableHead>
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
                            onSelect={() => openChecklistModal(employee)}
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
                            onSelect={() => console.log(`Send reminder for ${employee.name}`)}
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
          )}

          {viewMode === 'card' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEmployees.map((employee) => (
                <div key={employee.jobId} className={`border rounded-none p-3 transition-colors duration-300 ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[11px] text-muted-foreground">JOB ID</div>
                      <div className={`text-sm font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{employee.jobId}</div>
                    </div>
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
                          onSelect={() => openChecklistModal(employee)}
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
                          onSelect={() => console.log(`Send reminder for ${employee.name}`)}
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
                  </div>

                  <div className="mt-2">
                    <div className={`text-sm font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{employee.name}</div>
                    <div className="text-xs text-gray-500">{employee.appliedJobRole}</div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-muted-foreground">Joining Date</div>
                      <div className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{employee.joiningDate}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Files Uploaded</div>
                      <div className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{employee.filesUploaded}</div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className={isDarkMode ? 'bg-gray-700 h-2 w-full' : 'bg-gray-200 h-2 w-full'}>
                      <div
                        className={`${employee.activationProgress < 50 ? 'bg-red-500' : employee.activationProgress < 100 ? 'bg-orange-500' : 'bg-green-500'} h-2`}
                        style={{ width: `${employee.activationProgress}%` }}
                      />
                    </div>
                    <div className={`mt-1 text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{employee.activationProgress}%</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Checklist Modal */}
          <Dialog open={isChecklistOpen} onOpenChange={setIsChecklistOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader className="flex flex-row items-center justify-between">
                <DialogTitle className="text-lg font-semibold">View Checklist – {selectedEmployeeForChecklist?.name}</DialogTitle>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowSendLink(true)}>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Link to Candidate
                </Button>
              </DialogHeader>

              {selectedEmployeeForChecklist && (
                <div className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    {(checklistMap[selectedEmployeeForChecklist.jobId] || []).map((item) => (
                      <AccordionItem key={item.id} value={item.id}>
                        <AccordionTrigger className="text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <CheckSquare className={`w-4 h-4 ${item.completed ? 'text-green-600' : 'text-gray-400'}`} />
                            <span>{item.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 p-3 rounded-md border bg-background">
                            <div className="flex flex-wrap gap-2">
                              <Button variant="outline" size="sm" className="text-xs" onClick={() => {
                                const newTitle = prompt('Edit item name', item.title) || item.title;
                                setChecklistMap(prev => {
                                  const copy = { ...prev };
                                  const arr = copy[selectedEmployeeForChecklist.jobId].map(it => it.id === item.id ? { ...it, title: newTitle } : it);
                                  copy[selectedEmployeeForChecklist.jobId] = arr;
                                  return copy;
                                });
                              }}>
                                <Edit className="w-3 h-3 mr-1" /> Edit
                              </Button>
                              <label className="inline-flex items-center">
                                <input type="file" className="hidden" onChange={(e) => handleChecklistFileUpload(selectedEmployeeForChecklist.jobId, item.id, e.target.files?.[0] ?? null)} />
                                <span className="inline-flex items-center px-2 py-1 border rounded text-xs cursor-pointer"><Upload className="w-3 h-3 mr-1" /> Upload</span>
                              </label>
                              <Button variant="outline" size="sm" className="text-xs" onClick={() => setStatusModalItemId(item.id)}>
                                Update Status
                              </Button>
                              <div className="ml-auto text-xs text-muted-foreground">
                                Date Submitted: {item.dateSubmitted ? new Date(item.dateSubmitted).toLocaleString() : '-'}
                              </div>
                            </div>

                            {item.textSubmission ? (
                              <div className="text-sm whitespace-pre-wrap border rounded p-2">{item.textSubmission}</div>
                            ) : (
                              <div className="space-y-1">
                                <label className="block text-xs font-medium">Text Response</label>
                                <Textarea rows={3} placeholder="Enter response..." onBlur={(e) => {
                                  const val = e.target.value;
                                  if (!val) return;
                                  setChecklistMap(prev => {
                                    const copy = { ...prev };
                                    const arr = copy[selectedEmployeeForChecklist.jobId].map(it => it.id === item.id ? { ...it, textSubmission: val, completed: true, dateSubmitted: new Date().toISOString() } : it);
                                    copy[selectedEmployeeForChecklist.jobId] = arr;
                                    return copy;
                                  });
                                }} />
                              </div>
                            )}

                            {item.files && item.files.length > 0 && (
                              <div className="space-y-2">
                                {item.files.map((f, idx) => (
                                  <div key={idx} className="border rounded p-2">
                                    <div className="flex items-center justify-between text-sm">
                                      <div className="truncate max-w-[70%]">{f.name}</div>
                                      <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" className="text-xs" onClick={() => window.open(f.url, '_blank')}><Maximize2 className="w-3 h-3 mr-1" /> Full Screen</Button>
                                        <Button variant="outline" size="sm" className="text-xs" onClick={() => window.open(f.url, '_blank')}><Eye className="w-3 h-3 mr-1" /> View</Button>
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
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  {(() => {
                    const items = checklistMap[selectedEmployeeForChecklist.jobId] || [];
                    const allDone = items.length > 0 && items.every(it => it.completed);
                    if (!allDone) return null;
                    return (
                      <div className="flex items-center justify-between pt-2 border-t">
                        <Button variant="destructive" onClick={() => { sendGmailTemplate('reject', selectedEmployeeForChecklist); toast({ title: 'Candidate rejected' }); }}>Reject</Button>
                        <Button className="bg-green-600 hover:bg-green-700" onClick={() => { sendGmailTemplate('approve', selectedEmployeeForChecklist); toast({ title: 'Proceeded to Hired' }); }}>Proceed to Hired</Button>
                      </div>
                    );
                  })()}

                  <div className="flex justify-end">
                    <Button variant="ghost" onClick={closeChecklistModal}>Close</Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Send Link Modal */}
          <Dialog open={showSendLink} onOpenChange={setShowSendLink}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-sm font-semibold">Send Link to Candidate</DialogTitle>
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
                <Button variant="outline" onClick={() => setShowSendLink(false)}>Cancel</Button>
                <Button onClick={() => { setShowSendLink(false); toast({ title: 'Link sent successfully' }); }}>Send</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Update Status Modal */}
          <Dialog open={!!statusModalItemId} onOpenChange={(open) => !open && setStatusModalItemId(null)}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-sm font-semibold">Update Status</DialogTitle>
              </DialogHeader>
              <div className="text-xs text-muted-foreground">Mark this checklist item as Pass or Reject.</div>
              <DialogFooter>
                <Button variant="destructive" onClick={() => {
                  if (!selectedEmployeeForChecklist || !statusModalItemId) return;
                  handleUpdateItemStatus(selectedEmployeeForChecklist.jobId, statusModalItemId, 'reject');
                  setStatusModalItemId(null);
                }}>Reject</Button>
                <Button onClick={() => {
                  if (!selectedEmployeeForChecklist || !statusModalItemId) return;
                  handleUpdateItemStatus(selectedEmployeeForChecklist.jobId, statusModalItemId, 'pass');
                  setStatusModalItemId(null);
                }}>Pass</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      ) : (
        <div className="space-y-3">
          {/* Onboarding Checklist Header */}
          <div className={`text-center py-4  transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800 text-white border-gray-700'
              : 'bg-gray-50 text-gray-900 border-gray-200'
          } border-b`}>
            <h1 className="text-lg font-semibold">Onboarding Checklist</h1>
          </div>

          {/* Checklist Items Table */}
          <div className={`border  overflow-hidden transition-colors duration-300 ${
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
          <div className={`flex items-center justify-between p-4 border-t  transition-colors duration-300 ${
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
