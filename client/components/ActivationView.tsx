import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Download, Trash2, Plus, Search, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/components/DarkModeProvider";

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

const employeeData: Employee[] = [
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
  const [selectedCountry, setSelectedCountry] = useState("");

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
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <Input
              placeholder="Search candidates"
              value={searchCandidates}
              onChange={(e) => setSearchCandidates(e.target.value)}
              className={`w-64 h-9 text-sm rounded-md pl-10 transition-shadow duration-200 ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className={`w-28 h-9 text-sm border rounded-md transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
            }`}>
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="india" className="text-sm">India</SelectItem>
              <SelectItem value="usa" className="text-sm">USA</SelectItem>
              <SelectItem value="uk" className="text-sm">UK</SelectItem>
            </SelectContent>
          </Select>

        </div>
      </div>

      {activeTab === "activation-room" ? (
        <div className="space-y-3">
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
                  }`}>FINAL DECISION</TableHead>
                  <TableHead className={`text-xs font-semibold px-3 py-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>UPDATE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeeData.map((employee) => (
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
                      <Button
                        className={`h-6 text-xs px-3 font-medium ${
                          employee.finalDecision === "EMPLOYEE ACTIVATED"
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-yellow-500 hover:bg-yellow-600 text-black"
                        }`}
                      >
                        {employee.finalDecision}
                      </Button>
                    </TableCell>
                    <TableCell className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Button
                          className="h-6 w-6 p-0 bg-emerald-500 hover:bg-emerald-600 text-white"
                          title="Send Email"
                        >
                          <Mail className="w-3 h-3" />
                        </Button>

                        <Button
                          className="h-6 text-xs px-2 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                          title="Action"
                          onClick={() => setActiveTab('checklist-builder')}
                        >
                          Action
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Onboarding Checklist Header */}
          <div className={`text-center py-3 transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-900 text-white'
              : 'bg-black text-white'
          }`}>
            <h1 className="text-sm font-bold tracking-wide">ONBOARDING CHECKLIST</h1>
          </div>

          {/* Checklist Items */}
          <div className="space-y-1">
            {checklistItems.map((item, index) => (
              <div
                key={item.id}
                className={`text-white flex items-center justify-between px-4 py-2 border-b transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-red-700 border-red-800'
                    : 'bg-red-600 border-red-700'
                }`}
              >
                <span className="text-xs font-medium">{item.title}</span>

                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`h-6 w-6 p-0 text-white transition-colors duration-300 ${
                      isDarkMode ? 'hover:bg-red-800' : 'hover:bg-red-700'
                    }`}
                    title="View"
                  >
                    <Eye className="w-3 h-3" />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    className={`h-6 w-6 p-0 text-white transition-colors duration-300 ${
                      isDarkMode
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                    title="Download"
                  >
                    <Download className="w-3 h-3" />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    className={`h-6 w-6 p-0 text-white transition-colors duration-300 ${
                      isDarkMode ? 'hover:bg-red-900' : 'hover:bg-red-800'
                    }`}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-4">
              <Button className={`text-xs font-medium px-6 py-2 transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  : 'bg-yellow-500 hover:bg-yellow-600 text-black'
              }`}>
                SAVE CHECKLIST
              </Button>
              <Button className={`text-xs font-medium px-6 py-2 transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  : 'bg-yellow-500 hover:bg-yellow-600 text-black'
              }`}>
                EDIT CHECKLIST
              </Button>
            </div>
            <Button
              onClick={() => navigate("/candidate-documents-repository")}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium px-6 py-2"
            >
              CANDIDATE DOCUMENTS REPOSITORY
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
