import Layout from "@/components/Layout";
import EmployeeProfile from "@/components/EmployeeProfile";
import OrganizationalChart from "@/components/OrganizationalChart";
import DocumentCenter from "@/components/DocumentCenter";
import SystemConfiguration from "@/components/SystemConfiguration";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Grid3X3,
  List,
  MoreVertical,
  User,
  Mail,
  Building,
  Calendar,
  Eye,
  Edit,
  FileText,
  Trash2,
  Users,
  FolderOpen,
  Settings,
  Download,
  UserPlus,
  UserMinus,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useMemo, useState } from "react";

interface Employee {
  id: string;
  fullName: string;
  email: string;
  department: string;
  status: "Active" | "Inactive" | "On Leave";
  skills: string[];
  jobTitle: string;
  joinDate: string;
  employeeId: string;
  phone: string;
  location: string;
  avatar?: string;
}

const employeeData: Employee[] = [
  {
    id: "1",
    fullName: "Sarah Mitchell",
    email: "sarah.mitchell@company.com",
    department: "Engineering",
    status: "Active",
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"],
    jobTitle: "Senior Software Engineer",
    joinDate: "2023-01-15",
    employeeId: "EMP001",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
  },
  {
    id: "2",
    fullName: "Marcus Thompson",
    email: "marcus.thompson@company.com",
    department: "Product",
    status: "Active",
    skills: ["Agile Product Management", "User Research", "Analytics"],
    jobTitle: "Product Manager",
    joinDate: "2023-03-22",
    employeeId: "EMP002",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
  },
  {
    id: "3",
    fullName: "Emily Chen",
    email: "emily.chen@company.com",
    department: "Design",
    status: "Active",
    skills: ["UI/UX Design", "Figma", "Design Systems"],
    jobTitle: "UX Designer",
    joinDate: "2023-02-10",
    employeeId: "EMP003",
    phone: "+1 (555) 345-6789",
    location: "Seattle, WA",
  },
  {
    id: "4",
    fullName: "David Park",
    email: "david.park@company.com",
    department: "Engineering",
    status: "On Leave",
    skills: ["DevOps", "AWS", "Kubernetes"],
    jobTitle: "DevOps Engineer",
    joinDate: "2022-11-05",
    employeeId: "EMP004",
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
  },
  {
    id: "5",
    fullName: "Jessica Wang",
    email: "jessica.wang@company.com",
    department: "Marketing",
    status: "Active",
    skills: ["Digital Marketing", "Content Strategy", "SEO"],
    jobTitle: "Marketing Specialist",
    joinDate: "2023-04-18",
    employeeId: "EMP005",
    phone: "+1 (555) 567-8901",
    location: "Los Angeles, CA",
  },
  {
    id: "6",
    fullName: "Amanda Foster",
    email: "amanda.foster@company.com",
    department: "Product",
    status: "Active",
    skills: ["Business Analysis", "Process Optimization", "Data Analysis"],
    jobTitle: "Business Analyst",
    joinDate: "2023-05-30",
    employeeId: "EMP006",
    phone: "+1 (555) 678-9012",
    location: "Chicago, IL",
  },
  {
    id: "7",
    fullName: "James Rodriguez",
    email: "james.rodriguez@company.com",
    department: "Engineering",
    status: "Active",
    skills: ["Software Development", "Python", "Machine Learning"],
    jobTitle: "ML Engineer",
    joinDate: "2023-06-12",
    employeeId: "EMP007",
    phone: "+1 (555) 789-0123",
    location: "Boston, MA",
  },
  {
    id: "8",
    fullName: "Priya Patel",
    email: "priya.patel@company.com",
    department: "Finance",
    status: "Active",
    skills: ["Financial Analysis", "Accounting", "Excel"],
    jobTitle: "Finance Analyst",
    joinDate: "2023-07-08",
    employeeId: "EMP008",
    phone: "+1 (555) 890-1234",
    location: "Miami, FL",
  },
];

function getStatusColor(status: string): string {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-700 border-green-200";
    case "Inactive":
      return "bg-gray-100 text-gray-700 border-gray-200";
    case "On Leave":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

function getDepartmentColor(department: string): string {
  switch (department) {
    case "Engineering":
      return "bg-blue-50 text-blue-700";
    case "Product":
      return "bg-purple-50 text-purple-700";
    case "Design":
      return "bg-pink-50 text-pink-700";
    case "Marketing":
      return "bg-orange-50 text-orange-700";
    case "Finance":
      return "bg-indigo-50 text-indigo-700";
    default:
      return "bg-gray-50 text-gray-700";
  }
}

function formatDateMDY(dateStr: string): string {
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
  }
  const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) return `${m[2]}-${m[3]}-${m[1]}`;
  const m2 = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (m2) return dateStr;
  return dateStr;
}

export default function Records() {
  const [activeTab, setActiveTab] = useState("employee-records");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [showOrgChart, setShowOrgChart] = useState(false);
  const [showDocumentCenter, setShowDocumentCenter] = useState(false);
  const [showSystemConfig, setShowSystemConfig] = useState(false);

  const tabs = [
    { id: "employee-records", label: "Employee Records", icon: Users },
    { id: "org-chart", label: "Organization Chart", icon: Users },
    { id: "documents", label: "Document Center", icon: FolderOpen },
    { id: "config", label: "System Configuration", icon: Settings },
  ];

  const uniquePositions = useMemo(
    () => Array.from(new Set(employeeData.map((e) => e.jobTitle))).sort(),
    [],
  );

  const filteredEmployees = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return employeeData.filter((employee) => {
      const matchesSearch =
        !q ||
        employee.fullName.toLowerCase().includes(q) ||
        employee.email.toLowerCase().includes(q) ||
        employee.jobTitle.toLowerCase().includes(q) ||
        employee.status.toLowerCase().includes(q);

      const matchesPosition =
        positionFilter === "all" || employee.jobTitle === positionFilter;
      const matchesStatus = statusFilter === "all" || employee.status === statusFilter;

      return matchesSearch && matchesPosition && matchesStatus;
    });
  }, [searchTerm, positionFilter, statusFilter]);

  const totalActive = useMemo(
    () => employeeData.filter((e) => e.status === "Active").length,
    [],
  );
  const newHiresThisMonth = useMemo(() => {
    const now = new Date();
    const m = now.getMonth();
    const y = now.getFullYear();
    return employeeData.filter((e) => {
      const d = new Date(e.joinDate);
      return !isNaN(d.getTime()) && d.getMonth() === m && d.getFullYear() === y;
    }).length;
  }, []);
  const pendingOffboarding = useMemo(
    () => employeeData.filter((e) => e.status === "Inactive").length,
    [],
  );
  const onLeave = useMemo(
    () => employeeData.filter((e) => e.status === "On Leave").length,
    [],
  );

  const renderEmployeeCard = (employee: Employee) => {
    return (
      <Card
        key={employee.id}
        className="border-0 shadow-sm hover:shadow-md transition-shadow"
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-3 flex-1">
                <div>
                  <h3 className="font-semibold text-foreground text-lg">
                    {employee.fullName}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Mail className="w-4 h-4" />
                    {employee.email}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant="secondary"
                    className={`font-medium ${getDepartmentColor(employee.department)}`}
                  >
                    <Building className="w-3 h-3 mr-1" />
                    {employee.department}
                  </Badge>
                  <div className="font-medium text-muted-foreground">
                    {employee.status}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="font-medium text-foreground">{employee.jobTitle}</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Calendar className="w-4 h-4" />
                  Joined {formatDateMDY(employee.joinDate)}
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setSelectedEmployee(employee)}>
                    <Eye className="w-4 h-4 mr-2" />
                    Manage Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("documents")}> 
                    <FileText className="w-4 h-4 mr-2" />
                    Documents
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("config")}> 
                    <Settings className="w-4 h-4 mr-2" />
                    System Configuration
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderEmployeeTable = () => {
    return (
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Employee ID
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Name
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Role
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Department
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Company Email
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Employment Status
              </TableHead>
              <TableHead className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Joining Date
              </TableHead>
              <TableHead className="text-center text-xs font-bold text-gray-900 uppercase tracking-wider">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee, index) => (
              <TableRow
                key={employee.id}
                className={`hover:bg-blue-50/60 transition-colors duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/20"
                }`}
              >
                <TableCell className="px-3 py-2">
                  <div className="text-xs text-gray-900 font-medium">
                    {employee.employeeId}
                  </div>
                </TableCell>
                <TableCell className="px-3 py-2">
                  <div className="text-xs text-gray-900 font-medium truncate">
                    {employee.fullName}
                  </div>
                  <div className="text-[11px] text-gray-500 truncate">
                    {employee.location}
                  </div>
                </TableCell>
                <TableCell className="px-3 py-2">
                  <div className="text-xs text-gray-900">{employee.jobTitle}</div>
                </TableCell>
                <TableCell className="px-3 py-2">
                  <div className="text-xs text-gray-900">{employee.department}</div>
                </TableCell>
                <TableCell className="px-3 py-2">
                  <div className="text-xs text-gray-900">{employee.email}</div>
                </TableCell>
                <TableCell className="px-3 py-2">
                  <div className="text-xs text-gray-900">{employee.status}</div>
                </TableCell>
                <TableCell className="px-3 py-2">
                  <div className="text-xs text-gray-900">
                    {formatDateMDY(employee.joinDate)}
                  </div>
                </TableCell>
                <TableCell className="px-3 py-2 align-middle">
                  <div className="flex items-center justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          aria-label="Open actions"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem onSelect={() => setSelectedEmployee(employee)} className="flex items-center gap-2 cursor-pointer">
                          <Eye className="w-4 h-4" />
                          Manage Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setActiveTab("documents")} className="flex items-center gap-2 cursor-pointer">
                          <FileText className="w-4 h-4" />
                          Documents
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setActiveTab("config")} className="flex items-center gap-2 cursor-pointer">
                          <Settings className="w-4 h-4" />
                          System Configuration
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "employee-records":
        return (
          <div className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                  <CardTitle className="text-xs font-medium">Total Active Employee</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-blue-600">{totalActive}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                  <CardTitle className="text-xs font-medium">New Hires This Month</CardTitle>
                  <UserPlus className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-blue-600">{newHiresThisMonth}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                  <CardTitle className="text-xs font-medium">Pending Offboarding / Exits</CardTitle>
                  <UserMinus className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-blue-600">{pendingOffboarding}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                  <CardTitle className="text-xs font-medium">On Leave</CardTitle>
                  <Calendar className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-blue-600">{onLeave}</div>
                </CardContent>
              </Card>
            </div>

            {/* Search, Filters and Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Employee Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-3 mb-4 items-start sm:items-center">
                  <div className="relative w-full sm:w-72 md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, email, position, status"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-8 text-sm"
                    />
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <Select value={positionFilter} onValueChange={setPositionFilter}>
                      <SelectTrigger className="w-full sm:w-[220px] h-8 text-xs">
                        <SelectValue placeholder="Position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Positions</SelectItem>
                        {uniquePositions.map((pos) => (
                          <SelectItem key={pos} value={pos}>
                            {pos}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-[180px] h-8 text-xs">
                        <SelectValue placeholder="Employment Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="On Leave">On Leave</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <div className="flex gap-1 bg-muted rounded-lg p-1">
                      <Button
                        variant={viewMode === "table" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("table")}
                        className="h-8 w-8 p-0"
                        aria-label="Table view"
                      >
                        <List className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === "card" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("card")}
                        className="h-8 w-8 p-0"
                        aria-label="Card view"
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button variant="outline" className="h-8 px-3 text-xs" onClick={() => {
                      const headers = [
                        "Employee ID","Name","Role","Department","Company Email","Employment Status","Joining Date",
                      ];
                      const escapeCsv = (val: any) => String(val ?? "").replace(/"/g, '""').replace(/\n/g, ' ');
                      const rows = filteredEmployees.map(e => [
                        e.employeeId,
                        e.fullName,
                        e.jobTitle,
                        e.department,
                        e.email,
                        e.status,
                        formatDateMDY(e.joinDate),
                      ].map(v => `"${escapeCsv(v)}"`).join(","));
                      const csv = [headers.join(","), ...rows].join("\n");
                      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.href = url;
                      link.download = "employee_records.csv";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      URL.revokeObjectURL(url);
                    }}>
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white">
                      <User className="w-4 h-4 mr-2" />
                      Add Employee
                    </Button>
                  </div>
                </div>

                {viewMode === "table" ? (
                  renderEmployeeTable()
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredEmployees.map(renderEmployeeCard)}
                  </div>
                )}

                {filteredEmployees.length === 0 && (
                  <Card className="border-0 shadow-sm mt-4">
                    <CardContent className="p-12 text-center">
                      <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        No employees found
                      </h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search criteria or filters
                      </p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case "org-chart":
        setShowOrgChart(true);
        return null;

      case "documents":
        setShowDocumentCenter(true);
        return null;

      case "config":
        setShowSystemConfig(true);
        return null;

      default:
        return null;
    }
  };

  if (showOrgChart) {
    return (
      <Layout>
        <OrganizationalChart
          onBack={() => {
            setShowOrgChart(false);
            setActiveTab("employee-records");
          }}
        />
      </Layout>
    );
  }

  if (showDocumentCenter) {
    return (
      <Layout>
        <DocumentCenter
          onBack={() => {
            setShowDocumentCenter(false);
            setActiveTab("employee-records");
          }}
        />
      </Layout>
    );
  }

  if (showSystemConfig) {
    return (
      <Layout>
        <SystemConfiguration
          onBack={() => {
            setShowSystemConfig(false);
            setActiveTab("employee-records");
          }}
        />
      </Layout>
    );
  }

  if (selectedEmployee) {
    return (
      <Layout>
        <EmployeeProfile
          employee={selectedEmployee}
          onBack={() => setSelectedEmployee(null)}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-foreground">Employee Records</h1>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => {
                const headers = [
                  "Employee ID","Name","Role","Department","Company Email","Employment Status","Joining Date",
                ];
                const escapeCsv = (val: any) => String(val ?? "").replace(/"/g, '""').replace(/\n/g, ' ');
                const rows = employeeData.map(e => [
                  e.employeeId,
                  e.fullName,
                  e.jobTitle,
                  e.department,
                  e.email,
                  e.status,
                  formatDateMDY(e.joinDate),
                ].map(v => `"${escapeCsv(v)}"`).join(","));
                const csv = [headers.join(","), ...rows].join("\n");
                const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "employee_records.csv";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white">
              <User className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>

        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className="flex items-center gap-2 text-sm font-medium px-4 py-2"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {renderTabContent()}
      </div>
    </Layout>
  );
}
