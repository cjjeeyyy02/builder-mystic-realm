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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  Edit,
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

export default function OrganizationalChart({ onBack }: OrganizationalChartProps) {
  const [viewMode, setViewMode] = useState<"hierarchical" | "chart">("hierarchical");
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [employees, setEmployees] = useState(organizationalData);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<OrgEmployee | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

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
    return filteredEmployees.filter(emp => !emp.managerId);
  };

  // Get direct reports for an employee
  const getDirectReports = (employeeId: string) => {
    return filteredEmployees.filter(emp => emp.managerId === employeeId);
  };

  // Toggle expand/collapse for an employee
  const toggleExpanded = (employeeId: string) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === employeeId 
        ? { ...emp, isExpanded: !emp.isExpanded }
        : emp
    ));
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
                <div className="flex items-center gap-2" style={{ marginLeft: `${depth * 20}px` }}>
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
                    <Badge variant="outline" className={`text-xs ${getDepartmentColor(employee.department)}`}>
                      {employee.department}
                    </Badge>
                    {hasReports && (
                      <span className="text-xs text-muted-foreground">
                        {directReports.length} direct report{directReports.length !== 1 ? 's' : ''}
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
                  onClick={() => handleViewEmployee(employee)}
                  className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  View Chart Mode
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditEmployee(employee)}
                  className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
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
            {directReports.map(report => renderHierarchicalNode(report, depth + 1))}
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
        <Card className="border-2 border-primary/30 bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 min-w-[220px] max-w-[220px] group cursor-pointer">
          <CardContent className="p-5 text-center relative">
            <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-primary/20">
              <User className="w-7 h-7 text-primary" />
            </div>
            <h4 className="font-bold text-sm text-foreground mb-1 line-clamp-2">
              {employee.fullName}
            </h4>
            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
              {employee.position}
            </p>
            <Badge variant="outline" className={`text-xs ${getDepartmentColor(employee.department)} mb-2`}>
              {employee.department}
            </Badge>

            {/* Action buttons on hover */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center gap-2">
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
                onClick={() => handleEditEmployee(employee)}
                className="bg-white/90 hover:bg-white shadow-md"
              >
                <Edit className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Connection lines and direct reports */}
        {directReports.length > 0 && (
          <>
            {/* Vertical line down */}
            <div className="w-0.5 h-8 bg-muted-foreground/30" />
            
            {/* Horizontal line */}
            {directReports.length > 1 && (
              <div className="h-0.5 bg-muted-foreground/30 relative" 
                   style={{ width: `${(directReports.length - 1) * 220}px` }} />
            )}
            
            {/* Direct reports */}
            <div className="flex gap-8 mt-8">
              {directReports.map(report => (
                <div key={report.id} className="flex flex-col items-center">
                  {/* Vertical line up */}
                  <div className="w-0.5 h-8 bg-muted-foreground/30" />
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

  const handleEditEmployee = (employee: OrgEmployee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
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
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Executive">Executive</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResetZoom}
                  >
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
                  List View
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
                <h2 className="text-xl font-semibold">List View</h2>
                <div className="text-sm text-muted-foreground">
                  {filteredEmployees.length} employees
                </div>
              </div>
              {getRootEmployees().map(employee => renderHierarchicalNode(employee))}
            </div>
          ) : (
            <div className="h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Organization Chart</h2>
                <div className="text-sm text-muted-foreground">
                  Zoom: {Math.round(zoomLevel * 100)}% | {filteredEmployees.length} employees
                </div>
              </div>
              <div className="overflow-auto h-full bg-gradient-to-br from-gray-50 to-white rounded-lg border">
                <div
                  className="w-full h-full flex items-center justify-center p-4 transform-gpu transition-transform duration-200 ease-in-out"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center center'
                  }}
                >
                  <div className="flex flex-col items-center space-y-8">
                    {getRootEmployees().map(employee => renderChartNode(employee))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Employee Modal */}
      <Dialog open={showAddEmployeeModal} onOpenChange={setShowAddEmployeeModal}>
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
                    <SelectItem value="Human Resources">Human Resources</SelectItem>
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
                    {employees.map(emp => (
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
              <p>Complete employee profile information including Personal Info, Work Details, Skills, Compensation, and Training sections will be available after initial creation.</p>
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
                  <h3 className="text-xl font-bold text-foreground">{selectedEmployee.fullName}</h3>
                  <p className="text-lg text-muted-foreground">{selectedEmployee.position}</p>
                  <Badge variant="outline" className={`mt-1 ${getDepartmentColor(selectedEmployee.department)}`}>
                    {selectedEmployee.department}
                  </Badge>
                </div>
              </div>

              {/* Employee Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{selectedEmployee.email}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Phone</label>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{selectedEmployee.phone}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Location</label>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{selectedEmployee.location}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Employee ID</label>
                    <span className="text-foreground font-mono">{selectedEmployee.id}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Department</label>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{selectedEmployee.department}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Direct Reports</label>
                    <span className="text-foreground">{selectedEmployee.directReports.length} employee{selectedEmployee.directReports.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>

              {/* Manager Information */}
              {selectedEmployee.managerId && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Reports To</label>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {employees.find(emp => emp.id === selectedEmployee.managerId)?.fullName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {employees.find(emp => emp.id === selectedEmployee.managerId)?.position}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  onClick={() => {
                    setShowViewModal(false);
                    setShowEditModal(true);
                  }}
                  className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Employee
                </Button>
                <Button variant="outline" onClick={() => setShowViewModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Employee Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input defaultValue={selectedEmployee.fullName} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position <span className="text-red-500">*</span>
                  </label>
                  <Input defaultValue={selectedEmployee.position} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <Select defaultValue={selectedEmployee.department}>
                    <SelectTrigger>
                      <SelectValue />
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
                    Reports To
                  </label>
                  <Select defaultValue={selectedEmployee.managerId || "none"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Manager</SelectItem>
                      {employees
                        .filter(emp => emp.id !== selectedEmployee.id)
                        .map(emp => (
                          <SelectItem key={emp.id} value={emp.id}>
                            {emp.fullName} - {emp.position}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input type="email" defaultValue={selectedEmployee.email} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <Input defaultValue={selectedEmployee.phone} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <Input defaultValue={selectedEmployee.location} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee ID
                  </label>
                  <Input defaultValue={selectedEmployee.id} disabled className="bg-gray-50" />
                </div>
              </div>

              <div className="text-sm text-muted-foreground bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p><strong>Note:</strong> Changes to employee hierarchy may affect direct reports and organizational structure. Please review carefully before saving.</p>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Edit className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowEditModal(false);
                    setShowViewModal(true);
                  }}
                >
                  Back to View
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
