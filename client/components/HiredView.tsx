import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, User, Building, Search, Mail, Phone, FileText } from "lucide-react";

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

  const filteredEmployees = hiredEmployees.filter(employee => {
    const matchesSearch = employee.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.appliedPosition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !selectedDepartment || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Hired Employees</h2>
        <div className="text-sm text-muted-foreground">
          {filteredEmployees.length} hired employees
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="All departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All departments</SelectItem>
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
      <div className="space-y-4">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Employee Info */}
                <div className="lg:col-span-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-200">
                      <User className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div>
                        <div className="text-sm text-muted-foreground font-medium">Candidate:</div>
                        <div className="font-semibold text-foreground text-lg">{employee.candidateName}</div>
                        {employee.employeeId && (
                          <div className="text-xs text-muted-foreground">ID: {employee.employeeId}</div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground font-medium">Applied Position:</div>
                        <div className="font-medium text-foreground">{employee.appliedPosition}</div>
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
                      className={`font-medium ${getDepartmentColor(employee.department)}`}
                    >
                      <Building className="w-3 h-3 mr-1" />
                      {employee.department}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground font-medium mb-1">Date of Joining (DOJ):</div>
                    <div className="flex items-center gap-2 text-foreground font-medium">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {employee.dateOfJoining}
                    </div>
                  </div>
                </div>

                {/* Actions & Status */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <Phone className="w-3 h-3 mr-1" />
                      Contact
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <FileText className="w-3 h-3 mr-1" />
                      Profile
                    </Button>
                  </div>
                  
                  <div className="flex justify-end">
                    <Badge
                      variant="outline"
                      className="bg-emerald-100 text-emerald-700 border-emerald-200 font-medium px-4 py-2"
                    >
                      HIRED
                    </Badge>
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

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card className="p-4">
          <div className="text-2xl font-bold text-emerald-600">
            {hiredEmployees.length}
          </div>
          <div className="text-sm text-muted-foreground">Total Hired</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-blue-600">
            {new Set(hiredEmployees.map(e => e.department)).size}
          </div>
          <div className="text-sm text-muted-foreground">Departments</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-purple-600">
            {hiredEmployees.filter(e => {
              const joinDate = new Date(e.dateOfJoining);
              const thisMonth = new Date();
              return joinDate.getMonth() === thisMonth.getMonth() && joinDate.getFullYear() === thisMonth.getFullYear();
            }).length}
          </div>
          <div className="text-sm text-muted-foreground">This Month</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-orange-600">
            {hiredEmployees.filter(e => {
              const joinDate = new Date(e.dateOfJoining);
              const oneWeekAgo = new Date();
              oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
              return joinDate >= oneWeekAgo;
            }).length}
          </div>
          <div className="text-sm text-muted-foreground">Last 7 Days</div>
        </Card>
      </div>
    </div>
  );
}
