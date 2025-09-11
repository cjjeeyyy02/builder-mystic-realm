import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, User, Building, Search, Mail, Phone, FileText, CheckCircle, XCircle, MapPin, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface HiredEmployee {
  id: string;
  candidateName: string;
  appliedPosition: string;
  department: string;
  dateOfJoining: string;
  email?: string;
  phone?: string;
  employeeId?: string;
}

const hiredEmployees: HiredEmployee[] = [
  {
    id: "1",
    candidateName: "Taylor Rodriguez",
    appliedPosition: "Business Development Manager",
    department: "Marketing",
    dateOfJoining: "08/10/2025",
    email: "taylor.rodriguez@company.com",
    phone: "+1 (555) 123-4567",
    employeeId: "EMP001"
  },
  {
    id: "2",
    candidateName: "Sofia Martinez",
    appliedPosition: "Operations Associate",
    department: "Operations",
    dateOfJoining: "08/07/2025",
    email: "sofia.martinez@company.com",
    phone: "+1 (555) 234-5678",
    employeeId: "EMP002"
  },
  {
    id: "3",
    candidateName: "Liam Johnson",
    appliedPosition: "Content Writer",
    department: "Content",
    dateOfJoining: "08/05/2025",
    email: "liam.johnson@company.com",
    phone: "+1 (555) 345-6789",
    employeeId: "EMP003"
  },
  {
    id: "4",
    candidateName: "Watson Davis",
    appliedPosition: "UI/UX Designer",
    department: "Design",
    dateOfJoining: "08/04/2025",
    email: "watson.davis@company.com",
    phone: "+1 (555) 456-7890",
    employeeId: "EMP004"
  },
  {
    id: "5",
    candidateName: "Olivia Chen",
    appliedPosition: "ML Engineer",
    department: "Engineering",
    dateOfJoining: "08/03/2025",
    email: "olivia.chen@company.com",
    phone: "+1 (555) 567-8901",
    employeeId: "EMP005"
  },
  {
    id: "6",
    candidateName: "Marcus Thompson",
    appliedPosition: "Product Manager",
    department: "Product",
    dateOfJoining: "08/02/2025",
    email: "marcus.thompson@company.com",
    phone: "+1 (555) 678-9012",
    employeeId: "EMP006"
  },
  {
    id: "7",
    candidateName: "Erik Anderson",
    appliedPosition: "Finance Analyst",
    department: "Finance",
    dateOfJoining: "08/01/2025",
    email: "erik.anderson@company.com",
    phone: "+1 (555) 789-0123",
    employeeId: "EMP007"
  },
  {
    id: "8",
    candidateName: "Priya Patel",
    appliedPosition: "Data Scientist",
    department: "Analytics",
    dateOfJoining: "07/30/2025",
    email: "priya.patel@company.com",
    phone: "+1 (555) 890-1234",
    employeeId: "EMP008"
  }
];

function getDepartmentColor(department: string): string {
  switch (department) {
    case "Marketing":
      return "bg-orange-50 text-orange-700";
    case "Operations":
      return "bg-teal-50 text-teal-700";
    case "Content":
      return "bg-green-50 text-green-700";
    case "Design":
      return "bg-pink-50 text-pink-700";
    case "Engineering":
      return "bg-blue-50 text-blue-700";
    case "Product":
      return "bg-purple-50 text-purple-700";
    case "Finance":
      return "bg-indigo-50 text-indigo-700";
    case "Analytics":
      return "bg-cyan-50 text-cyan-700";
    default:
      return "bg-gray-50 text-gray-700";
  }
}

export default function HiredView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [showDecisionRoom, setShowDecisionRoom] = useState(false);

  const filteredEmployees = hiredEmployees.filter(employee => {
    const matchesSearch = employee.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.appliedPosition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || !selectedDepartment || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  if (showDecisionRoom) {
    return <DecisionRoomView onBack={() => setShowDecisionRoom(false)} />;
  }

  return (
    <div className="space-y-3">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <Card className="p-2">
          <div className="text-xl font-bold text-emerald-600">
            {hiredEmployees.length}
          </div>
          <div className="text-xs text-muted-foreground">Total Hired</div>
        </Card>
        <Card className="p-2">
          <div className="text-xl font-bold text-blue-600">
            {new Set(hiredEmployees.map(e => e.department)).size}
          </div>
          <div className="text-xs text-muted-foreground">Departments</div>
        </Card>
        <Card className="p-2">
          <div className="text-xl font-bold text-purple-600">
            {hiredEmployees.filter(e => {
              const joinDate = new Date(e.dateOfJoining);
              const thisMonth = new Date();
              return joinDate.getMonth() === thisMonth.getMonth() && joinDate.getFullYear() === thisMonth.getFullYear();
            }).length}
          </div>
          <div className="text-xs text-muted-foreground">This Month</div>
        </Card>
        <Card className="p-2">
          <div className="text-xl font-bold text-orange-600">
            {hiredEmployees.filter(e => {
              const joinDate = new Date(e.dateOfJoining);
              const oneWeekAgo = new Date();
              oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
              return joinDate >= oneWeekAgo;
            }).length}
          </div>
          <div className="text-xs text-muted-foreground">Last 7 Days</div>
        </Card>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-foreground">Hired Employees</h2>
          <Button
            variant="outline"
            onClick={() => setShowDecisionRoom(true)}
            className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
          >
            <FileText className="w-4 h-4 mr-2" />
            Decision Room
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredEmployees.length} hired employees
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2 items-center">
        <div className="flex-1 max-w-sm relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-8 rounded-full text-sm"
          />
        </div>
        <Select value={selectedDepartment || "all"} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-44 h-8 rounded-full text-sm">
            <SelectValue placeholder="All departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All departments</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Operations">Operations</SelectItem>
            <SelectItem value="Content">Content</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Product">Product</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Analytics">Analytics</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Hired Employees List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Header with Avatar and Status */}
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100">
                    <User className="w-5 h-5 text-emerald-600" />
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 border-green-200 font-medium px-2 py-1 text-xs"
                  >
                    HIRED
                  </Badge>
                </div>

                {/* Employee Info */}
                <div className="space-y-2">
                  <div>
                    <div className="font-semibold text-foreground text-sm">{employee.candidateName}</div>
                    {employee.employeeId && (
                      <div className="text-xs text-muted-foreground">ID: {employee.employeeId}</div>
                    )}
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium">Applied Position:</div>
                    <div className="font-medium text-foreground text-sm">{employee.appliedPosition}</div>
                  </div>
                </div>

                {/* Department */}
                <div>
                  <Badge
                    variant="secondary"
                    className={`font-medium px-2 py-1 ${getDepartmentColor(employee.department)}`}
                  >
                    <Building className="w-3 h-3 mr-1" />
                    {employee.department}
                  </Badge>
                </div>

                {/* Date of Joining */}
                <div>
                  <div className="text-xs text-muted-foreground font-medium mb-1">Date of Joining:</div>
                  <div className="flex items-center gap-2 text-foreground font-medium text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    {employee.dateOfJoining}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredEmployees.length === 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-12 text-center">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No hired employees found</h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedDepartment
                ? "Try adjusting your search or filter criteria"
                : "No employees have been hired yet"}
            </p>
          </CardContent>
        </Card>
      )}

    </div>
  );
}

interface DecisionCandidate {
  id: string;
  serialNo: number;
  name: string;
  role: string;
  department: string;
  expectedDOJ: string;
  employment: string;
  location: string;
  confirmedDOJ?: string;
  status: "pending" | "approved" | "declined";
}

interface DecisionRoomViewProps {
  onBack: () => void;
}

function DecisionRoomView({ onBack }: DecisionRoomViewProps) {
  const [searchCandidates, setSearchCandidates] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: 'approve' | 'decline';
    candidate: DecisionCandidate;
  } | null>(null);
  const [candidates, setCandidates] = useState<DecisionCandidate[]>(

  [
    // Initial candidate data
    {
      id: "1",
      serialNo: 1,
      name: "Amy Chen",
      role: "HR Executive",
      department: "Human Resources",
      expectedDOJ: "07-01-2025",
      employment: "Full-time",
      location: "Hyderabad, India",
      status: "pending"
    },
    {
      id: "2",
      serialNo: 2,
      name: "Sasha Williams",
      role: "SEO Executive",
      department: "Marketing",
      expectedDOJ: "07-01-2025",
      employment: "Part-time",
      location: "Delhi, India",
      status: "pending"
    },
    {
      id: "3",
      serialNo: 3,
      name: "Jimmy Rodriguez",
      role: "Finance Manager",
      department: "Finance",
      expectedDOJ: "07-01-2025",
      employment: "Freelance",
      location: "Vancouver, Canada",
      status: "pending"
    },
    {
      id: "4",
      serialNo: 4,
      name: "Ren Kumar",
      role: "Content Writer",
      department: "Software",
      expectedDOJ: "07-01-2025",
      employment: "Contract",
      location: "Finland, Europe",
      status: "pending"
    },
    {
      id: "5",
      serialNo: 5,
      name: "Max Thompson",
      role: "ML Engineer",
      department: "Software",
      expectedDOJ: "07-01-2025",
      employment: "Internship",
      location: "Finland, Europe",
      status: "pending"
    },
    {
      id: "6",
      serialNo: 6,
      name: "Luna Martinez",
      role: "AI Developer",
      department: "Software",
      expectedDOJ: "07-01-2025",
      employment: "Full-time",
      location: "Iceland, Europe",
      status: "pending"
    },
    {
      id: "7",
      serialNo: 7,
      name: "Chloe Davis",
      role: "UI/UX Designer",
      department: "Design",
      expectedDOJ: "07-01-2025",
      employment: "Part-time",
      location: "Pune, India",
      status: "pending"
    },
    {
      id: "8",
      serialNo: 8,
      name: "Shruti Patel",
      role: "HR Executive",
      department: "Human Resources",
      expectedDOJ: "07-01-2025",
      employment: "Full-time",
      location: "Hyderabad, India",
      status: "pending"
    }
  ]);

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchCandidates.toLowerCase()) ||
                         candidate.role.toLowerCase().includes(searchCandidates.toLowerCase());
    const matchesStatus = statusFilter === "all" || candidate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApproveClick = (candidate: DecisionCandidate) => {
    setConfirmAction({ type: 'approve', candidate });
    setShowConfirmDialog(true);
  };

  const handleDeclineClick = (candidate: DecisionCandidate) => {
    setConfirmAction({ type: 'decline', candidate });
    setShowConfirmDialog(true);
  };

  const handleConfirmAction = () => {
    if (!confirmAction) return;

    setCandidates(prevCandidates =>
      prevCandidates.map(candidate =>
        candidate.id === confirmAction.candidate.id
          ? {
              ...candidate,
              status: confirmAction.type === 'approve' ? 'approved' : 'declined',
              confirmedDOJ: confirmAction.type === 'approve' ? candidate.expectedDOJ : undefined
            }
          : candidate
      )
    );

    setShowConfirmDialog(false);
    setConfirmAction(null);
  };

  const handleCancelAction = () => {
    setShowConfirmDialog(false);
    setConfirmAction(null);
  };

  const getEmploymentColor = (employment: string): string => {
    switch (employment) {
      case "Full-time":
        return "bg-green-100 text-green-700 border-green-200";
      case "Part-time":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Contract":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Freelance":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Internship":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getDepartmentColor = (department: string): string => {
    switch (department) {
      case "Human Resources":
        return "bg-purple-50 text-purple-700";
      case "Marketing":
        return "bg-orange-50 text-orange-700";
      case "Finance":
        return "bg-indigo-50 text-indigo-700";
      case "Software":
        return "bg-blue-50 text-blue-700";
      case "Design":
        return "bg-pink-50 text-pink-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <div className="space-y-3">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold text-orange-600">
            {candidates.filter(c => c.status === "pending").length}
          </div>
          <div className="text-sm text-muted-foreground">Pending Decisions</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-600">
            {candidates.filter(c => c.status === "approved").length}
          </div>
          <div className="text-sm text-muted-foreground">Approved</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-red-600">
            {candidates.filter(c => c.status === "declined").length}
          </div>
          <div className="text-sm text-muted-foreground">Declined</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-purple-600">
            {new Set(candidates.map(c => c.location)).size}
          </div>
          <div className="text-sm text-muted-foreground">Locations</div>
        </Card>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
          <h2 className="text-2xl font-semibold text-foreground">Decision Room</h2>
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredCandidates.length} candidates pending decision
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            value={searchCandidates}
            onChange={(e) => setSearchCandidates(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="declined">Declined</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Decision Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 border-b">
                <TableHead className="w-16 text-center font-semibold text-foreground py-4">
                  S. NO
                </TableHead>
                <TableHead className="font-semibold text-foreground py-4">
                  NAME
                </TableHead>
                <TableHead className="font-semibold text-foreground py-4">
                  ROLE
                </TableHead>
                <TableHead className="font-semibold text-foreground py-4">
                  DEPT
                </TableHead>
                <TableHead className="font-semibold text-foreground py-4">
                  EXPECTED DOJ
                </TableHead>
                <TableHead className="font-semibold text-foreground py-4">
                  EMPLOYMENT
                </TableHead>
                <TableHead className="font-semibold text-foreground py-4">
                  LOCATION
                </TableHead>
                <TableHead className="font-semibold text-foreground py-4">
                  CONFIRMED DOJ
                </TableHead>
                <TableHead className="font-semibold text-foreground py-4 text-center">
                  ACTIONS
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.map((candidate) => (
                <TableRow
                  key={candidate.id}
                  className="hover:bg-muted/20 transition-colors border-b border-border/40"
                >
                  <TableCell className="text-center font-medium text-muted-foreground py-4">
                    {candidate.serialNo}
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div className="font-semibold text-foreground">
                        {candidate.name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="font-medium text-foreground">
                      {candidate.role}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge
                      variant="secondary"
                      className={`font-medium ${getDepartmentColor(candidate.department)}`}
                    >
                      {candidate.department}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2 text-foreground font-medium">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {candidate.expectedDOJ}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge
                      variant="outline"
                      className={`font-medium ${getEmploymentColor(candidate.employment)}`}
                    >
                      {candidate.employment}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2 text-foreground">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{candidate.location}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    {candidate.confirmedDOJ ? (
                      <div className="flex items-center gap-2 text-foreground font-medium">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        {candidate.confirmedDOJ}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">Pending</span>
                    )}
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2 justify-center">
                      {candidate.status === 'pending' ? (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white h-8 px-3"
                            onClick={() => handleApproveClick(candidate)}
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            APPROVE
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 text-white h-8 px-3"
                            onClick={() => handleDeclineClick(candidate)}
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            DECLINE
                          </Button>
                        </>
                      ) : (
                        <Badge
                          variant="outline"
                          className={`${
                            candidate.status === 'approved'
                              ? 'bg-green-100 text-green-700 border-green-200'
                              : 'bg-red-100 text-red-700 border-red-200'
                          }`}
                        >
                          {candidate.status === 'approved' ? 'APPROVED' : 'DECLINED'}
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white h-8 px-3"
                      >
                        <Mail className="w-3 h-3 mr-1" />
                        EMAIL
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {confirmAction?.type === 'approve' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              {confirmAction?.type === 'approve' ? 'Approve Candidate' : 'Decline Candidate'}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {confirmAction?.type} <strong>{confirmAction?.candidate.name}</strong> for the position of <strong>{confirmAction?.candidate.role}</strong>?
            </DialogDescription>
          </DialogHeader>

          {confirmAction && (
            <div className="py-4">
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Candidate:</span>
                  <span className="font-medium">{confirmAction.candidate.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Role:</span>
                  <span className="font-medium">{confirmAction.candidate.role}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Department:</span>
                  <span className="font-medium">{confirmAction.candidate.department}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Expected DOJ:</span>
                  <span className="font-medium">{confirmAction.candidate.expectedDOJ}</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCancelAction}
            >
              Cancel
            </Button>
            <Button
              className={confirmAction?.type === 'approve'
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
              }
              onClick={handleConfirmAction}
            >
              {confirmAction?.type === 'approve' ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Yes, Approve
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 mr-2" />
                  Yes, Decline
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
