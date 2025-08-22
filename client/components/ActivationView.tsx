import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Download, Trash2, Plus, Search, Mail } from "lucide-react";

interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

interface Employee {
  jobId: string;
  name: string;
  country: string;
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
  { jobId: "001", name: "Jaya", country: "India", appliedJobRole: "Senior Developer", joiningDate: "8/15/2025", filesUploaded: "3/5", activationProgress: 75, finalDecision: "ACTIVATE EMPLOYEE" },
  { jobId: "002", name: "Mark", country: "USA", appliedJobRole: "Graphic Designer", joiningDate: "8/15/2025", filesUploaded: "4/5", activationProgress: 90, finalDecision: "ACTIVATE EMPLOYEE" },
  { jobId: "003", name: "John", country: "USA", appliedJobRole: "Content Writer", joiningDate: "8/15/2025", filesUploaded: "5/5", activationProgress: 100, finalDecision: "EMPLOYEE ACTIVATED" },
  { jobId: "004", name: "Sara", country: "Europe", appliedJobRole: "Copywriter", joiningDate: "8/15/2025", filesUploaded: "4/5", activationProgress: 90, finalDecision: "ACTIVATE EMPLOYEE" },
  { jobId: "005", name: "Shruti", country: "India", appliedJobRole: "Sale Associate", joiningDate: "8/15/2025", filesUploaded: "2/5", activationProgress: 40, finalDecision: "ACTIVATE EMPLOYEE" },
  { jobId: "006", name: "Robin", country: "Russia", appliedJobRole: "AI Engineer", joiningDate: "8/15/2025", filesUploaded: "1/5", activationProgress: 15, finalDecision: "ACTIVATE EMPLOYEE" },
  { jobId: "007", name: "Kayle", country: "Russia", appliedJobRole: "ML Engineer", joiningDate: "8/15/2025", filesUploaded: "5/5", activationProgress: 100, finalDecision: "EMPLOYEE ACTIVATED" },
  { jobId: "008", name: "Vali", country: "China", appliedJobRole: "Data Analyst", joiningDate: "8/15/2025", filesUploaded: "4/5", activationProgress: 90, finalDecision: "ACTIVATE EMPLOYEE" },
  { jobId: "009", name: "Anne", country: "Canada", appliedJobRole: "Finance Analyst", joiningDate: "8/15/2025", filesUploaded: "2/5", activationProgress: 40, finalDecision: "ACTIVATE EMPLOYEE" }
];

export default function ActivationView() {
  const [activeTab, setActiveTab] = useState("activation-room");
  const [searchCandidates, setSearchCandidates] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [confirmFilter, setConfirmFilter] = useState("");
  const [finalDecisionFilter, setFinalDecisionFilter] = useState("");

  return (
    <div className="space-y-3">
      {/* Header Tabs and Controls */}
      <div className="flex items-center justify-between bg-white border-b border-gray-200 pb-2">
        <div className="flex items-center gap-1">
          <Button
            variant={activeTab === "checklist-builder" ? "default" : "outline"}
            onClick={() => setActiveTab("checklist-builder")}
            className="h-7 text-xs px-3 font-medium"
          >
            CHECKLIST BUILDER
          </Button>
          <Button
            variant={activeTab === "activation-room" ? "default" : "outline"}
            onClick={() => setActiveTab("activation-room")}
            className="h-7 text-xs px-3 font-medium"
          >
            ACTIVATION ROOM
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
            <Input
              placeholder="SEARCH CANDIDATES"
              value={searchCandidates}
              onChange={(e) => setSearchCandidates(e.target.value)}
              className="w-48 h-7 text-xs bg-white border border-gray-300 pl-7"
            />
          </div>

          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-24 h-7 text-xs bg-white border border-gray-300">
              <SelectValue placeholder="COUNTRY" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="india" className="text-xs">India</SelectItem>
              <SelectItem value="usa" className="text-xs">USA</SelectItem>
              <SelectItem value="uk" className="text-xs">UK</SelectItem>
            </SelectContent>
          </Select>

          <Button className="h-7 text-xs px-3 bg-black text-white hover:bg-gray-800">
            <Plus className="w-3 h-3 mr-1" />
            ADD NEW FIELDS
          </Button>
        </div>
      </div>

      {/* Onboarding Checklist Header */}
      <div className="bg-black text-white text-center py-3">
        <h1 className="text-sm font-bold tracking-wide">ONBOARDING CHECKLIST</h1>
      </div>

      {/* Checklist Items */}
      <div className="space-y-1">
        {checklistItems.map((item, index) => (
          <div
            key={item.id}
            className="bg-red-600 text-white flex items-center justify-between px-4 py-2 border-b border-red-700"
          >
            <span className="text-xs font-medium">{item.title}</span>
            
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 hover:bg-red-700 text-white"
                title="View"
              >
                <Eye className="w-3 h-3" />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 hover:bg-green-600 text-white bg-green-500"
                title="Download"
              >
                <Download className="w-3 h-3" />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 hover:bg-red-800 text-white"
                title="Delete"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex items-center justify-center gap-4 pt-4">
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black text-xs font-medium px-6 py-2">
          SAVE CHECKLIST
        </Button>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black text-xs font-medium px-6 py-2">
          EDIT CHECKLIST
        </Button>
      </div>
    </div>
  );
}
