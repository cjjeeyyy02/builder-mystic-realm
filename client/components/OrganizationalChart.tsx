import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  ArrowLeft,
  Download,
  Users,
  ChevronDown,
  ChevronRight,
  X,
  Plus,
  Eye,
  UserMinus,
  MoreVertical,
  Building,
  Mail,
  Phone,
  MapPin,
  User,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface OrgEmployee {
  id: string;
  fullName: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  managerId?: string;
  directReports: string[];
  level: number;
  isExpanded?: boolean;
}

interface OrganizationalChartProps {
  onBack: () => void;
}

// Sample organizational data with hierarchy
const organizationalData: OrgEmployee[] = [
  {
    id: "ceo-001",
    fullName: "Michael Rodriguez",
    position: "Chief Executive Officer",
    department: "Executive",
    email: "michael.rodriguez@company.com",
    phone: "+1 (555) 100-0001",
    location: "New York, NY",
    directReports: ["cto-002", "cfo-003", "cmo-004", "chro-005"],
    level: 0,
    isExpanded: true,
  },
  {
    id: "cto-002",
    fullName: "Sarah Mitchell",
    position: "Chief Technology Officer",
    department: "Engineering",
    email: "sarah.mitchell@company.com",
    phone: "+1 (555) 100-0002",
    location: "San Francisco, CA",
    managerId: "ceo-001",
    directReports: ["eng-006", "eng-007", "devops-008"],
    level: 1,
    isExpanded: true,
  },
  {
    id: "cfo-003",
    fullName: "David Park",
    position: "Chief Financial Officer",
    department: "Finance",
    email: "david.park@company.com",
    phone: "+1 (555) 100-0003",
    location: "New York, NY",
    managerId: "ceo-001",
    directReports: ["fin-009", "fin-010"],
    level: 1,
    isExpanded: false,
  },
  {
    id: "cmo-004",
    fullName: "Jessica Wang",
    position: "Chief Marketing Officer",
    department: "Marketing",
    email: "jessica.wang@company.com",
    phone: "+1 (555) 100-0004",
    location: "Los Angeles, CA",
    managerId: "ceo-001",
    directReports: ["mkt-011", "mkt-012"],
    level: 1,
    isExpanded: false,
  },
  {
    id: "chro-005",
    fullName: "Amanda Foster",
    position: "Chief Human Resources Officer",
    department: "Human Resources",
    email: "amanda.foster@company.com",
    phone: "+1 (555) 100-0005",
    location: "Chicago, IL",
    managerId: "ceo-001",
    directReports: ["hr-013"],
    level: 1,
    isExpanded: false,
  },
  {
    id: "eng-006",
    fullName: "James Rodriguez",
    position: "Senior Software Engineer",
    department: "Engineering",
    email: "james.rodriguez@company.com",
    phone: "+1 (555) 100-0006",
    location: "San Francisco, CA",
    managerId: "cto-002",
    directReports: ["jr-014", "jr-015"],
    level: 2,
    isExpanded: false,
  },
  {
    id: "eng-007",
    fullName: "Emily Chen",
    position: "Lead UX Designer",
    department: "Engineering",
    email: "emily.chen@company.com",
    phone: "+1 (555) 100-0007",
    location: "Seattle, WA",
    managerId: "cto-002",
    directReports: ["ux-016"],
    level: 2,
    isExpanded: false,
  },
  {
    id: "devops-008",
    fullName: "Marcus Thompson",
    position: "DevOps Manager",
    department: "Engineering",
    email: "marcus.thompson@company.com",
    phone: "+1 (555) 100-0008",
    location: "Austin, TX",
    managerId: "cto-002",
    directReports: ["dev-017", "dev-018"],
    level: 2,
    isExpanded: false,
  },
  {
    id: "fin-009",
    fullName: "Priya Patel",
    position: "Finance Manager",
    department: "Finance",
    email: "priya.patel@company.com",
    phone: "+1 (555) 100-0009",
    location: "Miami, FL",
    managerId: "cfo-003",
    directReports: ["fin-019"],
    level: 2,
    isExpanded: false,
  },
  {
    id: "fin-010",
    fullName: "Robert Kim",
    position: "Senior Accountant",
    department: "Finance",
    email: "robert.kim@company.com",
    phone: "+1 (555) 100-0010",
    location: "New York, NY",
    managerId: "cfo-003",
    directReports: [],
    level: 2,
  },
  {
    id: "mkt-011",
    fullName: "Lisa Chang",
    position: "Marketing Manager",
    department: "Marketing",
    email: "lisa.chang@company.com",
    phone: "+1 (555) 100-0011",
    location: "Los Angeles, CA",
    managerId: "cmo-004",
    directReports: ["mkt-020"],
    level: 2,
    isExpanded: false,
  },
  {
    id: "mkt-012",
    fullName: "Alex Johnson",
    position: "Content Strategist",
    department: "Marketing",
    email: "alex.johnson@company.com",
    phone: "+1 (555) 100-0012",
    location: "Remote",
    managerId: "cmo-004",
    directReports: [],
    level: 2,
  },
  {
    id: "hr-013",
    fullName: "Maria Garcia",
    position: "HR Business Partner",
    department: "Human Resources",
    email: "maria.garcia@company.com",
    phone: "+1 (555) 100-0013",
    location: "Chicago, IL",
    managerId: "chro-005",
    directReports: [],
    level: 2,
  },
];

export default function OrganizationalChart({
  onBack,
}: OrganizationalChartProps) {
  const [viewMode, setViewMode] = useState<"hierarchical" | "chart">(
    "hierarchical",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [employees, setEmployees] = useState(organizationalData);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddReportModal, setShowAddReportModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<OrgEmployee | null>(
    null,
  );
  const [selectedManager, setSelectedManager] = useState<OrgEmployee | null>(
    null,
  );
  const [addReportFormData, setAddReportFormData] = useState({
    fullName: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    location: "",
  });
  const [zoomLevel, setZoomLevel] = useState(0.8);

  // Filter employees based on search and department
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" || employee.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  // Get root employees (those without a manager)
  const getRootEmployees = () => {
    return filteredEmployees.filter((emp) => !emp.managerId);
  };

  // Get direct reports for an employee
  const getDirectReports = (employeeId: string) => {
    return filteredEmployees.filter((emp) => emp.managerId === employeeId);
  };

  // Toggle expand/collapse for an employee
  const toggleExpanded = (employeeId: string) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === employeeId ? { ...emp, isExpanded: !emp.isExpanded } : emp,
      ),
    );
  };

  // Get department color
  const getDepartmentColor = (department: string): string => {
    switch (department) {
      case "Executive":
        return "bg-red-50 text-red-700 border-red-200";
      case "Engineering":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Finance":
        return "bg-green-50 text-green-700 border-green-200";
      case "Marketing":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Human Resources":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // Render hierarchical node
  const renderHierarchicalNode = (employee: OrgEmployee, depth: number = 0) => {
    const directReports = getDirectReports(employee.id);
    const hasReports = directReports.length > 0;
    const isExpanded = employee.isExpanded;

    return (
      <div key={employee.id} className="w-full">
        <Card className="border border-border hover:shadow-md transition-shadow mb-3">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              {/* Left side - Employee info */}
              <div className="flex items-center gap-4 flex-1">
                {/* Expand/Collapse button */}
                <div
                  className="flex items-center gap-2"
                  style={{ marginLeft: `${depth * 20}px` }}
                >
                  {hasReports ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(employee.id)}
                      className="h-6 w-6 p-0"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </Button>
                  ) : (
                    <div className="w-6" />
                  )}

                  {/* Employee avatar */}
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* Employee details */}
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-foreground">
                    {employee.fullName}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    {employee.position}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="outline"
                      className={`text-xs ${getDepartmentColor(employee.department)}`}
                    >
                      {employee.department}
                    </Badge>
                    {hasReports && (
                      <span className="text-xs text-muted-foreground">
                        {directReports.length} direct report
                        {directReports.length !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode("chart")}
                  className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  View Chart
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddReport(employee)}
                  className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Render direct reports if expanded */}
        {hasReports && isExpanded && (
          <div className="ml-8 border-l-2 border-muted pl-4">
            {directReports.map((report) =>
              renderHierarchicalNode(report, depth + 1),
            )}
          </div>
        )}
      </div>
    );
  };

  // Render chart node
  const renderChartNode = (employee: OrgEmployee, depth: number = 0) => {
    const directReports = getDirectReports(employee.id);

    return (
      <div key={employee.id} className="flex flex-col items-center">
        {/* Employee box */}
        <Card className="border-2 border-primary/30 bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 min-w-[140px] max-w-[140px] group cursor-pointer">
          <CardContent className="p-3 text-center relative">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-primary/20">
              <User className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-bold text-xs text-foreground mb-1 line-clamp-2">
              {employee.fullName}
            </h4>
            <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
              {employee.position}
            </p>
            <Badge
              variant="outline"
              className={`text-xs ${getDepartmentColor(employee.department)} mb-1 scale-90`}
            >
              {employee.department}
            </Badge>

            {/* Action buttons on hover */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center gap-1">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleViewEmployee(employee)}
                className="bg-white/90 hover:bg-white shadow-md"
              >
                <Eye className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleAddReport(employee)}
                className="bg-white/90 hover:bg-white shadow-md"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Connection lines and direct reports */}
        {directReports.length > 0 && (
          <>
            {/* Vertical line down */}
            <div className="w-0.5 h-4 bg-muted-foreground/30" />

            {/* Horizontal line */}
            {directReports.length > 1 && (
              <div
                className="h-0.5 bg-muted-foreground/30 relative"
                style={{ width: `${(directReports.length - 1) * 140}px` }}
              />
            )}

            {/* Direct reports */}
            <div className="flex gap-4 mt-4">
              {directReports.map((report) => (
                <div key={report.id} className="flex flex-col items-center">
                  {/* Vertical line up */}
                  <div className="w-0.5 h-4 bg-muted-foreground/30" />
                  {renderChartNode(report, depth + 1)}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  const handleExport = () => {
    console.log("Exporting organizational chart...");
    // Here you would implement PDF/JPG export functionality
  };

  const handleAddEmployee = () => {
    setShowAddEmployeeModal(true);
  };

  const handleViewEmployee = (employee: OrgEmployee) => {
    setSelectedEmployee(employee);
    setShowViewModal(true);
  };


  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const handleAddReport = (manager: OrgEmployee) => {
    setSelectedManager(manager);
    setShowAddReportModal(true);
  };

  const handleAddReportSubmit = () => {
    if (!selectedManager) return;

    // Generate new employee ID
    const newId = `emp-${Date.now()}`;

    // Create new employee object
    const newEmployee: OrgEmployee = {
      id: newId,
      fullName: addReportFormData.fullName,
      position: addReportFormData.position,
      department: addReportFormData.department,
      email: addReportFormData.email,
      phone: addReportFormData.phone,
      location: addReportFormData.location,
      managerId: selectedManager.id,
      directReports: [],
      level: selectedManager.level + 1,
      isExpanded: false,
    };

    // Add new employee to employees array
    setEmployees(prev => [...prev, newEmployee]);

    // Update manager's direct reports
    setEmployees(prev => prev.map(emp =>
      emp.id === selectedManager.id
        ? { ...emp, directReports: [...emp.directReports, newId] }
        : emp
    ));

    // Close modal and reset form
    setShowAddReportModal(false);
    setSelectedManager(null);
    setAddReportFormData({
      fullName: "",
      position: "",
      department: "",
      email: "",
      phone: "",
      location: "",
    });

    console.log("New report added to:", selectedManager.fullName, newEmployee);
  };

  const handleAddReportCancel = () => {
    setShowAddReportModal(false);
    setSelectedManager(null);
    setAddReportFormData({
      fullName: "",
      position: "",
      department: "",
      email: "",
      phone: "",
      location: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack} className="w-10 h-10 p-0">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-semibold text-foreground">
            Organizational Chart
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white"
            onClick={handleAddEmployee}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Report
          </Button>
        </div>
      </div>

      {/* Search and Filter Panel */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by employee name, position, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-3 flex-wrap">
              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Executive">Executive</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Human Resources">
                    Human Resources
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Zoom Controls */}
              {viewMode === "chart" && (
                <div className="flex items-center gap-2 border rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 0.5}
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium px-2 min-w-[60px] text-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 2}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleResetZoom}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* View Mode Toggle */}
              {viewMode === "hierarchical" ? (
                <Button
                  variant="outline"
                  onClick={() => setViewMode("chart")}
                  className="whitespace-nowrap"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Chart View
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setViewMode("hierarchical")}
                  className="whitespace-nowrap"
                >
                  <X className="w-4 h-4 mr-2" />
                  Table View
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Organizational Chart Content */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          {viewMode === "hierarchical" ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Table View</h2>
                <div className="text-sm text-muted-foreground">
                  {filteredEmployees.length} employees
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="text-xs font-bold text-gray-900 uppercase tracking-wider">Name</TableHead>
                      <TableHead className="text-xs font-bold text-gray-900 uppercase tracking-wider">Position</TableHead>
                      <TableHead className="text-xs font-bold text-gray-900 uppercase tracking-wider">Department</TableHead>
                      <TableHead className="text-xs font-bold text-gray-900 uppercase tracking-wider">Email</TableHead>
                      <TableHead className="text-xs font-bold text-gray-900 uppercase tracking-wider">Phone</TableHead>
                      <TableHead className="text-xs font-bold text-gray-900 uppercase tracking-wider">Location</TableHead>
                      <TableHead className="text-xs font-bold text-gray-900 uppercase tracking-wider">Manager</TableHead>
                      <TableHead className="text-xs font-bold text-gray-900 uppercase tracking-wider">Reports</TableHead>
                      <TableHead className="text-right text-xs font-bold text-gray-900 uppercase tracking-wider">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.map((emp) => (
                      <TableRow key={emp.id} className="hover:bg-blue-50/60 transition-colors duration-200">
                        <TableCell className="px-3 py-2"><div className="text-xs text-gray-900 font-medium">{emp.fullName}</div></TableCell>
                        <TableCell className="px-3 py-2"><div className="text-xs text-gray-900">{emp.position}</div></TableCell>
                        <TableCell className="px-3 py-2"><div className="text-xs text-gray-900">{emp.department}</div></TableCell>
                        <TableCell className="px-3 py-2"><div className="text-xs text-gray-900">{emp.email}</div></TableCell>
                        <TableCell className="px-3 py-2"><div className="text-xs text-gray-900">{emp.phone}</div></TableCell>
                        <TableCell className="px-3 py-2"><div className="text-xs text-gray-900">{emp.location}</div></TableCell>
                        <TableCell className="px-3 py-2"><div className="text-xs text-gray-900">{employees.find(e => e.id === emp.managerId)?.fullName || "-"}</div></TableCell>
                        <TableCell className="px-3 py-2"><div className="text-xs text-gray-900">{emp.directReports.length}</div></TableCell>
                        <TableCell className="px-3 py-2 text-right">
                          <Button variant="outline" size="sm" onClick={() => setViewMode("chart")} className="h-7 px-2 text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            View Chart
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Organization Chart</h2>
                <div className="text-sm text-muted-foreground">
                  Zoom: {Math.round(zoomLevel * 100)}% |{" "}
                  {filteredEmployees.length} employees
                </div>
              </div>
              <div className="overflow-auto h-full bg-gradient-to-br from-gray-50 to-white rounded-lg border">
                <div
                  className="w-full h-full flex items-center justify-center p-4 transform-gpu transition-transform duration-200 ease-in-out"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: "center center",
                  }}
                >
                  <div className="flex flex-col items-center space-y-6">
                    {getRootEmployees().map((employee) =>
                      renderChartNode(employee),
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Employee Modal */}
      <Dialog
        open={showAddEmployeeModal}
        onOpenChange={setShowAddEmployeeModal}
      >
        <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            {/* Simplified add employee form - would include all profile management sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input placeholder="Enter full name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Position <span className="text-red-500">*</span>
                </label>
                <Input placeholder="Enter job position" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Executive">Executive</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Human Resources">
                      Human Resources
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reports To
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.fullName} - {emp.position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input type="email" placeholder="Enter email address" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone
                </label>
                <Input placeholder="Enter phone number" />
              </div>
            </div>

            <div className="text-sm text-muted-foreground bg-blue-50 p-4 rounded-lg">
              <p>
                Complete employee profile information including Personal Info,
                Work Details, Skills, Compensation, and Training sections will
                be available after initial creation.
              </p>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Employee
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddEmployeeModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Employee Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-6 pt-4">
              {/* Employee Header */}
              <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground">
                    {selectedEmployee.fullName}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {selectedEmployee.position}
                  </p>
                  <Badge
                    variant="outline"
                    className={`mt-1 ${getDepartmentColor(selectedEmployee.department)}`}
                  >
                    {selectedEmployee.department}
                  </Badge>
                </div>
              </div>

              {/* Employee Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Email
                    </label>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">
                        {selectedEmployee.email}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Phone
                    </label>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">
                        {selectedEmployee.phone}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Location
                    </label>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">
                        {selectedEmployee.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Employee ID
                    </label>
                    <span className="text-foreground font-mono">
                      {selectedEmployee.id}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Department
                    </label>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">
                        {selectedEmployee.department}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Direct Reports
                    </label>
                    <span className="text-foreground">
                      {selectedEmployee.directReports.length} employee
                      {selectedEmployee.directReports.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>

              {/* Manager Information */}
              {selectedEmployee.managerId && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Reports To
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {
                          employees.find(
                            (emp) => emp.id === selectedEmployee.managerId,
                          )?.fullName
                        }
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {
                          employees.find(
                            (emp) => emp.id === selectedEmployee.managerId,
                          )?.position
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                  <Button
                  variant="outline"
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>


      {/* Add Report Modal */}
      <Dialog open={showAddReportModal} onOpenChange={setShowAddReportModal}>
        <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Add Report {selectedManager && `to ${selectedManager.fullName}`}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            {/* Manager Info */}
            {selectedManager && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Reporting to: {selectedManager.fullName}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedManager.position} - {selectedManager.department}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Employee Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Enter full name"
                  value={addReportFormData.fullName}
                  onChange={(e) =>
                    setAddReportFormData({
                      ...addReportFormData,
                      fullName: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Enter job position"
                  value={addReportFormData.position}
                  onChange={(e) =>
                    setAddReportFormData({
                      ...addReportFormData,
                      position: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <Select
                  value={addReportFormData.department}
                  onValueChange={(value) =>
                    setAddReportFormData({
                      ...addReportFormData,
                      department: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Executive">Executive</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={addReportFormData.email}
                  onChange={(e) =>
                    setAddReportFormData({
                      ...addReportFormData,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <Input
                  placeholder="Enter phone number"
                  value={addReportFormData.phone}
                  onChange={(e) =>
                    setAddReportFormData({
                      ...addReportFormData,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <Input
                  placeholder="Enter work location"
                  value={addReportFormData.location}
                  onChange={(e) =>
                    setAddReportFormData({
                      ...addReportFormData,
                      location: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="text-sm text-muted-foreground bg-green-50 p-4 rounded-lg border border-green-200">
              <p>
                <strong>Note:</strong> This employee will be added as a direct
                report to {selectedManager?.fullName}. You can edit additional
                details after creation.
              </p>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button
                onClick={handleAddReportSubmit}
                disabled={
                  !addReportFormData.fullName ||
                  !addReportFormData.position ||
                  !addReportFormData.department ||
                  !addReportFormData.email
                }
                className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Report
              </Button>
              <Button variant="outline" onClick={handleAddReportCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
