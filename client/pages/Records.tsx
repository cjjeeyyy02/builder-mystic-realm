import { useState } from "react";
import Layout from "@/components/Layout";
import EmployeeProfile from "@/components/EmployeeProfile";
import OrganizationalChart from "@/components/OrganizationalChart";
import DocumentCenter from "@/components/DocumentCenter";
import SystemConfiguration from "@/components/SystemConfiguration";
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
  Briefcase,
  Eye,
  Edit,
  FileText,
  Trash2,
  Users,
  FolderOpen,
  Settings,
} from "lucide-react";

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

export default function Records() {
  const [activeTab, setActiveTab] = useState("profiles");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [skillsFilter, setSkillsFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [showOrgChart, setShowOrgChart] = useState(false);
  const [showDocumentCenter, setShowDocumentCenter] = useState(false);
  const [showSystemConfig, setShowSystemConfig] = useState(false);

  const tabs = [
    { id: "profiles", label: "Employee Profiles", icon: Users },
    { id: "org-chart", label: "Organizational Chart", icon: Users },
    { id: "documents", label: "Document Center", icon: FolderOpen },
    { id: "config", label: "System Configuration", icon: Settings },
  ];

  const filteredEmployees = employeeData.filter((employee) => {
    const matchesSearch =
      employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" || employee.department === departmentFilter;
    const matchesSkills =
      skillsFilter === "all" ||
      employee.skills.some((skill) =>
        skill.toLowerCase().includes(skillsFilter.toLowerCase()),
      );
    const matchesStatus =
      statusFilter === "all" || employee.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesSkills && matchesStatus;
  });

  const renderEmployeeCard = (employee: Employee) => {
    if (viewMode === "list") {
      return (
        <Card
          key={employee.id}
          className="border-0 shadow-sm hover:shadow-md transition-shadow"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {/* Left side - Employee Details */}
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
                    <Badge
                      variant="outline"
                      className={`font-medium ${getStatusColor(employee.status)}`}
                    >
                      {employee.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {employee.skills.slice(0, 3).map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-gray-100 text-gray-700"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {employee.skills.length > 3 && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gray-100 text-gray-700"
                      >
                        +{employee.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Right side - Job Info & Actions */}
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="font-medium text-foreground">
                    {employee.jobTitle}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Calendar className="w-4 h-4" />
                    Joined {new Date(employee.joinDate).toLocaleDateString()}
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                      onClick={() => setSelectedEmployee(employee)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="w-4 h-4 mr-2" />
                      Documents
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
    } else {
      // Grid View
      return (
        <Card
          key={employee.id}
          className="border-0 shadow-sm hover:shadow-md transition-shadow"
        >
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {employee.fullName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {employee.jobTitle}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <MoreVertical className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem>
                      <Edit className="w-3 h-3 mr-2" />
                      Edit Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="w-3 h-3 mr-2" />
                      Documents
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-3 h-3 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  {employee.email}
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className={`text-xs ${getDepartmentColor(employee.department)}`}
                  >
                    {employee.department}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getStatusColor(employee.status)}`}
                  >
                    {employee.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  Joined {new Date(employee.joinDate).toLocaleDateString()}
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {employee.skills.slice(0, 2).map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs bg-gray-100 text-gray-700"
                  >
                    {skill}
                  </Badge>
                ))}
                {employee.skills.length > 2 && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-gray-100 text-gray-700"
                  >
                    +{employee.skills.length - 2}
                  </Badge>
                )}
              </div>

              <Button
                className="w-full"
                size="sm"
                onClick={() => setSelectedEmployee(employee)}
              >
                <Eye className="w-3 h-3 mr-2" />
                View Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profiles":
        return (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-3">
                <Select
                  value={departmentFilter}
                  onValueChange={setDepartmentFilter}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={skillsFilter} onValueChange={setSkillsFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Skills" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skills</SelectItem>
                    <SelectItem value="Software Development">
                      Software Development
                    </SelectItem>
                    <SelectItem value="Agile Product Management">
                      Agile Product Management
                    </SelectItem>
                    <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                    <SelectItem value="Digital Marketing">
                      Digital Marketing
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {filteredEmployees.length} employees found
              </div>
              <div className="flex gap-1 bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 px-3"
                >
                  <List className="w-4 h-4 mr-2" />
                  List
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 px-3"
                >
                  <Grid3X3 className="w-4 h-4 mr-2" />
                  Grid
                </Button>
              </div>
            </div>

            {/* Employee Profiles */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  : "space-y-4"
              }
            >
              {filteredEmployees.map(renderEmployeeCard)}
            </div>

            {filteredEmployees.length === 0 && (
              <Card className="border-0 shadow-sm">
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
          </div>
        );

      case "org-chart":
        setShowOrgChart(true);
        return null;

      case "documents":
        setShowDocumentCenter(true);
        return null;

      case "config":
        return (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-12 text-center">
              <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                System Configuration
              </h3>
              <p className="text-muted-foreground">
                Customize form fields, templates, and system settings
              </p>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  // Show organizational chart if selected
  if (showOrgChart) {
    return (
      <Layout>
        <OrganizationalChart
          onBack={() => {
            setShowOrgChart(false);
            setActiveTab("profiles");
          }}
        />
      </Layout>
    );
  }

  // Show document center if selected
  if (showDocumentCenter) {
    return (
      <Layout>
        <DocumentCenter
          onBack={() => {
            setShowDocumentCenter(false);
            setActiveTab("profiles");
          }}
        />
      </Layout>
    );
  }

  // Show employee profile if one is selected
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
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-foreground">
            Employee Records
          </h1>
          <Button className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white">
            <User className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className="flex items-center gap-2 text-sm font-medium px-4 py-2"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </Layout>
  );
}
