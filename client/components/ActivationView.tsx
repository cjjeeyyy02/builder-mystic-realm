import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Building, Briefcase, Mail, Phone } from "lucide-react";

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
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Employee Activation</h2>
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
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone className="w-3 h-3 mr-1" />
                      Call
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

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
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
    </div>
  );
}
