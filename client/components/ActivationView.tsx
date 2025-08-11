import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Calendar, User, Building, Briefcase, Mail, Phone, FileText, Download, Upload, RotateCcw, Info, Trash2, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface ActivationCandidate {
  id: string;
  candidateName: string;
  appliedPosition: string;
  department: string;
  dateOfJoining: string;
  status: "pending" | "in-progress" | "completed";
  email?: string;
  phone?: string;
}

const activationCandidates: ActivationCandidate[] = [
  {
    id: "1",
    candidateName: "Amit Sharma",
    appliedPosition: "HR Executive",
    department: "Human Resources",
    dateOfJoining: "08/01/2025",
    status: "pending",
    email: "amit.sharma@company.com",
    phone: "+1 (555) 123-4567"
  },
  {
    id: "2",
    candidateName: "Olivia Chen",
    appliedPosition: "ML Engineer",
    department: "Software",
    dateOfJoining: "08/10/2025",
    status: "in-progress",
    email: "olivia.chen@company.com",
    phone: "+1 (555) 234-5678"
  },
  {
    id: "3",
    candidateName: "Taylor Rodriguez",
    appliedPosition: "Business Development Manager",
    department: "Marketing",
    dateOfJoining: "08/20/2025",
    status: "completed",
    email: "taylor.rodriguez@company.com",
    phone: "+1 (555) 345-6789"
  },
  {
    id: "4",
    candidateName: "Martin Williams",
    appliedPosition: "Head of Marketing (Inside Sales)",
    department: "Marketing",
    dateOfJoining: "08/11/2025",
    status: "in-progress",
    email: "martin.williams@company.com",
    phone: "+1 (555) 456-7890"
  },
  {
    id: "5",
    candidateName: "Liam Johnson",
    appliedPosition: "Content Writer",
    department: "Content",
    dateOfJoining: "08/05/2025",
    status: "pending",
    email: "liam.johnson@company.com",
    phone: "+1 (555) 567-8901"
  },
  {
    id: "6",
    candidateName: "Watson Davis",
    appliedPosition: "UI/UX Designer",
    department: "Design",
    dateOfJoining: "08/04/2025",
    status: "completed",
    email: "watson.davis@company.com",
    phone: "+1 (555) 678-9012"
  },
  {
    id: "7",
    candidateName: "Erik Anderson",
    appliedPosition: "Finance Analyst",
    department: "Finance",
    dateOfJoining: "08/07/2025",
    status: "completed",
    email: "erik.anderson@company.com",
    phone: "+1 (555) 789-0123"
  },
  {
    id: "8",
    candidateName: "Sofia Martinez",
    appliedPosition: "Operations Associate",
    department: "Operations",
    dateOfJoining: "08/07/2025",
    status: "completed",
    email: "sofia.martinez@company.com",
    phone: "+1 (555) 890-1234"
  }
];

function getStatusColor(status: string): string {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700 border-green-200";
    case "in-progress":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "pending":
      return "bg-gray-100 text-gray-700 border-gray-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case "completed":
      return "ACTIVATION COMPLETED";
    case "in-progress":
      return "ACTIVATION IN-PROGRESS";
    case "pending":
      return "ACTIVATION PENDING";
    default:
      return "ACTIVATION PENDING";
  }
}

function getDepartmentColor(department: string): string {
  switch (department) {
    case "Human Resources":
      return "bg-purple-50 text-purple-700";
    case "Software":
      return "bg-blue-50 text-blue-700";
    case "Marketing":
      return "bg-orange-50 text-orange-700";
    case "Content":
      return "bg-green-50 text-green-700";
    case "Design":
      return "bg-pink-50 text-pink-700";
    case "Finance":
      return "bg-indigo-50 text-indigo-700";
    case "Operations":
      return "bg-teal-50 text-teal-700";
    default:
      return "bg-gray-50 text-gray-700";
  }
}

export default function ActivationView() {
  const [showChecklist, setShowChecklist] = useState(false);

  if (showChecklist) {
    return <ChecklistAndDocumentsView onBack={() => setShowChecklist(false)} />;
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-600">
            {activationCandidates.filter(c => c.status === "completed").length}
          </div>
          <div className="text-sm text-muted-foreground">Activation Completed</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {activationCandidates.filter(c => c.status === "in-progress").length}
          </div>
          <div className="text-sm text-muted-foreground">Activation In-Progress</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-gray-600">
            {activationCandidates.filter(c => c.status === "pending").length}
          </div>
          <div className="text-sm text-muted-foreground">Activation Pending</div>
        </Card>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-foreground">Employee Activation</h2>
          <Button
            variant="outline"
            onClick={() => setShowChecklist(true)}
            className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
          >
            <FileText className="w-4 h-4 mr-2" />
            Candidate Checklist and Documents
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          {activationCandidates.length} employees in activation process
        </div>
      </div>

      {/* Activation List */}
      <div className="space-y-4">
        {activationCandidates.map((candidate) => (
          <Card key={candidate.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Candidate Info */}
                <div className="lg:col-span-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div>
                        <div className="text-sm text-muted-foreground font-medium">Candidate:</div>
                        <div className="font-semibold text-foreground text-lg">{candidate.candidateName}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground font-medium">Applied Position:</div>
                        <div className="font-medium text-foreground">{candidate.appliedPosition}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Department & Date */}
                <div className="lg:col-span-3 space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground font-medium mb-1">Department:</div>
                    <Badge
                      variant="secondary"
                      className={`font-medium ${getDepartmentColor(candidate.department)}`}
                    >
                      <Building className="w-3 h-3 mr-1" />
                      {candidate.department}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground font-medium mb-1">Date of Joining (DOJ):</div>
                    <div className="flex items-center gap-2 text-foreground font-medium">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {candidate.dateOfJoining}
                    </div>
                  </div>
                </div>

                {/* Contact & Actions */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
                  </div>
                  
                  <div className="flex justify-end">
                    <Badge
                      variant="outline"
                      className={`font-medium px-3 py-1 ${getStatusColor(candidate.status)}`}
                    >
                      {getStatusLabel(candidate.status)}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}

interface DocumentItem {
  id: string;
  title: string;
  description: string;
  icon: any;
  status: "completed" | "under-review" | "required";
  hasDownload?: boolean;
  hasUpload?: boolean;
  selected?: boolean;
}

interface ChecklistAndDocumentsViewProps {
  onBack: () => void;
}

function ChecklistAndDocumentsView({ onBack }: ChecklistAndDocumentsViewProps) {
  const [selectedCandidateName, setSelectedCandidateName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

  const documents: DocumentItem[] = [
    {
      id: "1",
      title: "Personal Identification",
      description: "Driver's license, passport, or state ID",
      icon: User,
      status: "completed",
      hasDownload: true,
      selected: true
    },
    {
      id: "2",
      title: "Tax Forms (W-4)",
      description: "Federal and state tax withholding forms",
      icon: FileText,
      status: "completed",
      hasDownload: true,
      selected: true
    },
    {
      id: "3",
      title: "Direct Deposit Information",
      description: "Bank account details for payroll",
      icon: Building,
      status: "under-review"
    },
    {
      id: "4",
      title: "Direct Deposit Information",
      description: "Bank account details for payroll",
      icon: Building,
      status: "under-review"
    },
    {
      id: "5",
      title: "Emergency Contact Form",
      description: "Contact information for emergencies",
      icon: Phone,
      status: "required",
      hasUpload: true
    },
    {
      id: "6",
      title: "Employee Handbook Acknowledgment",
      description: "Signed acknowledgment of company policies",
      icon: CheckCircle,
      status: "required",
      hasUpload: true
    }
  ];

  const completedCount = documents.filter(doc => doc.status === "completed").length;
  const totalCount = documents.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Completed</Badge>;
      case "under-review":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Under Review</Badge>;
      case "required":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Required</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "under-review":
        return <Clock className="w-5 h-5 text-blue-600" />;
      case "required":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
          <h2 className="text-2xl font-semibold text-foreground">Candidate Checklist and Documents</h2>
        </div>
        <Button className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white">
          Activate Employee
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Enter candidate name"
            value={selectedCandidateName}
            onChange={(e) => setSelectedCandidateName(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select department..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="human-resources">Human Resources</SelectItem>
            <SelectItem value="software">Software</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Onboarding Progress */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-foreground">Onboarding Progress</h3>
          </div>

          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">
              {completedCount} of {totalCount} required documents completed
            </div>

            <Progress value={progressPercentage} className="w-full h-3" />

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{completedCount} completed</span>
              <span className="text-muted-foreground">{progressPercentage}% done</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Required Documents */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Required Documents</h3>

          <div className="space-y-4">
            {documents.map((document) => (
              <div key={document.id} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                {/* Status Icon */}
                <div className="flex-shrink-0">
                  {getStatusIcon(document.status)}
                </div>

                {/* Document Icon */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <document.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* Document Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-medium text-foreground">{document.title}</h4>
                    {getStatusBadge(document.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{document.description}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {document.status === "completed" && (
                    <>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Re-upload
                      </Button>
                    </>
                  )}

                  {document.status === "under-review" && (
                    <>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Info className="w-3 h-3 mr-1" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </>
                  )}

                  {document.status === "required" && (
                    <Button size="sm" variant="outline" className="text-xs">
                      <Upload className="w-3 h-3 mr-1" />
                      Upload
                    </Button>
                  )}

                  <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Action Bar */}
      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle className="w-4 h-4 text-purple-600" />
          <span>{selectedDocuments.length} documents selected for sending</span>
        </div>

        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Mail className="w-4 h-4 mr-2" />
          Send Files
        </Button>
      </div>
    </div>
  );
}
