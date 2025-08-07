import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  User,
  Plus,
  Search,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserMinus,
  ListTodo,
  MessageSquare,
  Shield,
  Calendar,
  FileText,
  ArrowUp,
  ArrowDown,
  ArrowLeft
} from "lucide-react";

interface OffboardingEmployee {
  id: string;
  employeeName: string;
  department: string;
  position: string;
  lastWorkingDay: string;
  status: "In Progress" | "Pending Approval" | "Completed" | "Overdue";
  completionPercentage: number;
  assignedTo: string;
}

const offboardingData: OffboardingEmployee[] = [
  {
    id: "1",
    employeeName: "Sarah Mitchell",
    department: "Engineering",
    position: "Senior Software Engineer",
    lastWorkingDay: "Jan 25, 2025",
    status: "In Progress",
    completionPercentage: 75,
    assignedTo: "David Park"
  },
  {
    id: "2",
    employeeName: "James Rodriguez",
    department: "Marketing",
    position: "Marketing Manager",
    lastWorkingDay: "Jan 20, 2025",
    status: "Pending Approval",
    completionPercentage: 90,
    assignedTo: "Emily Chen"
  },
  {
    id: "3",
    employeeName: "Michael Thompson",
    department: "Sales",
    position: "Sales Representative",
    lastWorkingDay: "Jan 15, 2025",
    status: "Completed",
    completionPercentage: 100,
    assignedTo: "Amanda Foster"
  },
  {
    id: "4",
    employeeName: "Lisa Wang",
    department: "HR",
    position: "HR Specialist",
    lastWorkingDay: "Jan 10, 2025",
    status: "Overdue",
    completionPercentage: 45,
    assignedTo: "Jessica Wang"
  },
  {
    id: "5",
    employeeName: "Robert Johnson",
    department: "Finance",
    position: "Financial Analyst",
    lastWorkingDay: "Jan 30, 2025",
    status: "In Progress",
    completionPercentage: 60,
    assignedTo: "David Park"
  },
  {
    id: "6",
    employeeName: "Maria Garcia",
    department: "Operations",
    position: "Operations Manager",
    lastWorkingDay: "Feb 05, 2025",
    status: "Pending Approval",
    completionPercentage: 85,
    assignedTo: "Amanda Foster"
  }
];

function getStatusColor(status: string): string {
  switch (status) {
    case "Completed":
      return "bg-green-50 text-green-700 border-green-200";
    case "In Progress":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Pending Approval":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "Overdue":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

function getDepartmentColor(department: string): string {
  switch (department) {
    case "Engineering":
      return "bg-purple-50 text-purple-700";
    case "Marketing":
      return "bg-orange-50 text-orange-700";
    case "Sales":
      return "bg-green-50 text-green-700";
    case "HR":
      return "bg-pink-50 text-pink-700";
    case "Finance":
      return "bg-indigo-50 text-indigo-700";
    case "Operations":
      return "bg-teal-50 text-teal-700";
    default:
      return "bg-gray-50 text-gray-700";
  }
}

export default function Offboarding() {
  const [activeTab, setActiveTab] = useState("offboarding");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredData, setFilteredData] = useState(offboardingData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterData(query, statusFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    filterData(searchQuery, status);
  };

  const filterData = (query: string, status: string) => {
    let filtered = offboardingData;

    if (query.trim()) {
      filtered = filtered.filter(employee =>
        employee.employeeName.toLowerCase().includes(query.toLowerCase()) ||
        employee.department.toLowerCase().includes(query.toLowerCase()) ||
        employee.position.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (status !== "all") {
      filtered = filtered.filter(employee => 
        employee.status.toLowerCase().replace(" ", "-") === status
      );
    }

    setFilteredData(filtered);
  };

  React.useEffect(() => {
    filterData(searchQuery, statusFilter);
  }, []);

  const handleBackClick = () => {
    // This would typically navigate back to the main dashboard
    window.history.back();
  };

  return (
    <Layout>
      <div className="space-y-6">
      {/* Header with Back Button and Navigation */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div className="flex space-x-1">
              <Button
                variant={activeTab === "offboarding" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("offboarding")}
                className="font-medium"
              >
                Offboarding
              </Button>
              <Button
                variant={activeTab === "records" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("records")}
                className="font-medium"
              >
                Records
              </Button>
              <Button
                variant={activeTab === "reports" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("reports")}
                className="font-medium"
              >
                Reports
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("settings")}
                className="font-medium"
              >
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Offboarding Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage employee departures and exit processes</p>
          </div>
          <Button className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Offboarding
          </Button>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Offboarding</p>
                <div className="flex items-center mt-2">
                  <span className="text-3xl font-bold text-gray-900">24</span>
                  <div className="ml-2 flex items-center text-green-600">
                    <ArrowUp className="w-4 h-4" />
                    <span className="text-sm font-medium">2 from last week</span>
                  </div>
                </div>
              </div>
              <UserMinus className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                <div className="flex items-center mt-2">
                  <span className="text-3xl font-bold text-gray-900">7</span>
                  <span className="ml-2 text-sm text-amber-600 font-medium">Requires attention</span>
                </div>
              </div>
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed This Month</p>
                <div className="flex items-center mt-2">
                  <span className="text-3xl font-bold text-gray-900">15</span>
                  <div className="ml-2 flex items-center text-green-600">
                    <ArrowUp className="w-4 h-4" />
                    <span className="text-sm font-medium">12% from last month</span>
                  </div>
                </div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue Items</p>
                <div className="flex items-center mt-2">
                  <span className="text-3xl font-bold text-red-600">3</span>
                  <span className="ml-2 text-sm text-red-600 font-medium">Need immediate action</span>
                </div>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" className="flex items-center">
            <UserMinus className="w-4 h-4 mr-2" />
            Start Offboarding
          </Button>
          <Button variant="outline" className="flex items-center">
            <ListTodo className="w-4 h-4 mr-2" />
            View Tasks
          </Button>
          <Button variant="outline" className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            Exit Interviews
          </Button>
          <Button variant="outline" className="flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Access Control
          </Button>
        </div>

        {/* Recent Offboarding Section */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Offboarding</h2>
              <div className="flex items-center space-x-4">
                <Select value={statusFilter} onValueChange={handleStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="pending-approval">Pending Approval</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search employees..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>
          </div>

          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b">
                  <TableHead className="font-semibold text-gray-900 py-4">Employee Name</TableHead>
                  <TableHead className="font-semibold text-gray-900 py-4">Department</TableHead>
                  <TableHead className="font-semibold text-gray-900 py-4">Position</TableHead>
                  <TableHead className="font-semibold text-gray-900 py-4">Last Working Day</TableHead>
                  <TableHead className="font-semibold text-gray-900 py-4">Status</TableHead>
                  <TableHead className="font-semibold text-gray-900 py-4">Completion</TableHead>
                  <TableHead className="font-semibold text-gray-900 py-4">Assigned To</TableHead>
                  <TableHead className="font-semibold text-gray-900 py-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((employee) => (
                  <TableRow
                    key={employee.id}
                    className="hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-gray-700">
                            {employee.employeeName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{employee.employeeName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge variant="secondary" className={`${getDepartmentColor(employee.department)}`}>
                        {employee.department}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 text-gray-700">{employee.position}</TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center text-gray-700">
                        <Calendar className="w-4 h-4 mr-2" />
                        {employee.lastWorkingDay}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge variant="outline" className={`${getStatusColor(employee.status)}`}>
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center">
                        <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${
                              employee.completionPercentage === 100 ? 'bg-green-500' :
                              employee.completionPercentage >= 75 ? 'bg-blue-500' :
                              employee.completionPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${employee.completionPercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{employee.completionPercentage}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-gray-700">{employee.assignedTo}</TableCell>
                    <TableCell className="py-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <UserMinus className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No offboarding records found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      </div>
    </Layout>
  );
}
