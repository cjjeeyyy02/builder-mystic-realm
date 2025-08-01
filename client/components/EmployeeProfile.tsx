import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft,
  Edit,
  Save,
  X,
  User,
  Briefcase,
  Star,
  DollarSign,
  TrendingUp,
  GraduationCap,
  Calendar,
  FileText,
  Shield,
  Clock,
  Mail,
  Phone,
  MapPin,
  Building,
  UserMinus
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

interface EmployeeProfileProps {
  employee: Employee;
  onBack: () => void;
}

const getInitials = (fullName: string): string => {
  const names = fullName.split(' ');
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return fullName.substring(0, 2).toUpperCase();
};

const getStatusColor = (status: string): string => {
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
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
};

export default function EmployeeProfile({ employee, onBack }: EmployeeProfileProps) {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(employee);

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "work", label: "Work Details", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Star },
    { id: "compensation", label: "Compensation", icon: DollarSign },
    { id: "performance", label: "Performance", icon: TrendingUp },
    { id: "training", label: "Training", icon: GraduationCap },
    { id: "attendance", label: "Leave & Attendance", icon: Calendar },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "security", label: "Access & Security", icon: Shield },
    { id: "changelog", label: "Change Log", icon: Clock }
  ];

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
    console.log("Saving employee data:", editedEmployee);
  };

  const handleCancel = () => {
    setEditedEmployee(employee);
    setIsEditing(false);
  };

  const handleOffboarding = () => {
    // Navigate to offboarding screen
    console.log("Navigate to offboarding for employee:", employee.id);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  {isEditing ? (
                    <Input 
                      value={editedEmployee.fullName.split(' ')[0]} 
                      onChange={(e) => {
                        const names = editedEmployee.fullName.split(' ');
                        names[0] = e.target.value;
                        setEditedEmployee({...editedEmployee, fullName: names.join(' ')});
                      }}
                    />
                  ) : (
                    <p className="text-foreground">{employee.fullName.split(' ')[0]}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  {isEditing ? (
                    <Input 
                      value={editedEmployee.fullName.split(' ').slice(1).join(' ')} 
                      onChange={(e) => {
                        const firstName = editedEmployee.fullName.split(' ')[0];
                        setEditedEmployee({...editedEmployee, fullName: `${firstName} ${e.target.value}`});
                      }}
                    />
                  ) : (
                    <p className="text-foreground">{employee.fullName.split(' ').slice(1).join(' ')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  {isEditing ? (
                    <Input 
                      value={editedEmployee.email} 
                      onChange={(e) => setEditedEmployee({...editedEmployee, email: e.target.value})}
                    />
                  ) : (
                    <p className="text-foreground">{employee.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  {isEditing ? (
                    <Input 
                      value={editedEmployee.phone} 
                      onChange={(e) => setEditedEmployee({...editedEmployee, phone: e.target.value})}
                    />
                  ) : (
                    <p className="text-foreground">{employee.phone}</p>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  {isEditing ? (
                    <Input 
                      value={editedEmployee.location} 
                      onChange={(e) => setEditedEmployee({...editedEmployee, location: e.target.value})}
                    />
                  ) : (
                    <p className="text-foreground">{employee.location}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date of Birth</label>
                  {isEditing ? (
                    <Input type="date" />
                  ) : (
                    <p className="text-foreground">Not provided</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Emergency Contact</label>
                  {isEditing ? (
                    <Input placeholder="Emergency contact details" />
                  ) : (
                    <p className="text-foreground">Not provided</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  {isEditing ? (
                    <Textarea placeholder="Full address" />
                  ) : (
                    <p className="text-foreground">Not provided</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-12 text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                {(() => {
                  const IconComponent = tabs.find(tab => tab.id === activeTab)?.icon;
                  return IconComponent ? <IconComponent className="w-6 h-6 text-muted-foreground" /> : null;
                })()}
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h3>
              <p className="text-muted-foreground">
                This section is under development
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Records
          </Button>
          <h1 className="text-3xl font-semibold text-foreground">Employee Profile</h1>
        </div>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" onClick={handleOffboarding} className="text-red-600 border-red-200 hover:bg-red-50">
                <UserMinus className="w-4 h-4 mr-2" />
                Offboarding Employee
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Employee Details Header */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-8">
          <div className="flex items-start gap-8">
            {/* Profile Picture/Initials */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-2xl font-bold text-white">
                  {getInitials(employee.fullName)}
                </span>
              </div>
            </div>

            {/* Employee Information */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Column 1 - Basic Info */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-foreground">{employee.fullName}</h2>
                    <Badge variant="outline" className={`font-bold ${getStatusColor(employee.status)}`}>
                      {employee.status}
                    </Badge>
                  </div>
                  <p className="text-lg text-muted-foreground font-medium">{employee.jobTitle}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{employee.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span>{employee.department}</span>
                  </div>
                </div>
              </div>

              {/* Column 2 - Skills */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {employee.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Column 3 - Employee ID & Join Date */}
              <div className="space-y-6">
                <div className="text-center bg-muted/30 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground font-medium">Employee ID</div>
                  <div className="text-lg font-bold text-foreground">{employee.employeeId}</div>
                </div>
                
                <div className="text-center bg-muted/30 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground font-medium">Joined</div>
                  <div className="text-lg font-bold text-foreground">{formatDate(employee.joinDate)}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex gap-1 bg-muted rounded-lg p-1 overflow-x-auto">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            variant={activeTab === tab.id ? "default" : "ghost"}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 whitespace-nowrap"
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-8">
          {renderTabContent()}
        </CardContent>
      </Card>
    </div>
  );
}
