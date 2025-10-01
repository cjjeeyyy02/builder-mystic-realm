import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  UserMinus,
  Plus,
  ChevronDown,
  ChevronUp,
  Target,
  Award,
  Download,
  Eye,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Share,
  Trash2,
  Upload,
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
  const names = fullName.split(" ");
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
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

export default function EmployeeProfile({
  employee,
  onBack,
}: EmployeeProfileProps) {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(employee);

  // Skills state
  const [skills, setSkills] = useState([
    {
      name: "React",
      experience: "4 years",
      endorsements: 12,
      level: "Expert",
      editable: true,
      endorsable: true,
    },
    {
      name: "TypeScript",
      experience: "3 years",
      endorsements: 8,
      level: "Advanced",
      editable: true,
      endorsable: true,
    },
    {
      name: "Node.js",
      experience: "3 years",
      endorsements: 6,
      level: "Advanced",
      editable: true,
      endorsable: true,
    },
    {
      name: "Python",
      experience: "2 years",
      endorsements: 4,
      level: "Intermediate",
      editable: true,
      endorsable: true,
    },
    {
      name: "AWS",
      experience: "2 years",
      endorsements: 5,
      level: "Intermediate",
      editable: true,
      endorsable: true,
    },
    {
      name: "Docker",
      experience: "1 year",
      endorsements: 3,
      level: "Beginner",
      editable: true,
      endorsable: true,
    },
  ]);

  // Performance reviews state
  const [expandedQuarters, setExpandedQuarters] = useState<string[]>([
    "q3-2023",
  ]);

  // Training modal state
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [trainingFormType, setTrainingFormType] = useState<
    "training" | "certification"
  >("training");
  const [trainingFormData, setTrainingFormData] = useState({
    type: "training",
    trainingTitle: "",
    trainingProvider: "",
    status: "",
    score: "",
    completionDate: "",
    certificationName: "",
    issuedOrganization: "",
    issuedDate: "",
    expirationDate: "",
  });

  // Leave request modal state
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveFormData, setLeaveFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    approverName: "",
    reason: "",
  });

  // Document upload modal state
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  // Add skill modal state
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [skillFormData, setSkillFormData] = useState({
    skillName: "",
    category: "",
    proficiencyLevel: "",
    experience: "",
  });

  // Offboarding modal state
  const [showOffboardingModal, setShowOffboardingModal] = useState(false);
  const [offboardingData, setOffboardingData] = useState({
    reasonForLeaving: "",
    lastWorkingDay: "",
    handoverNotes: "",
    systemAccessRevoked: false,
    equipmentReturned: false,
    exitInterviewCompleted: false,
  });

  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    accountActive: true,
    hrAccess: false,
    adminRights: false,
  });

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
    { id: "changelog", label: "Change Log", icon: Clock },
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
    setShowOffboardingModal(true);
  };

  const handleOffboardingSubmit = () => {
    console.log(
      "Processing offboarding for employee:",
      employee.id,
      offboardingData,
    );
    setShowOffboardingModal(false);
    // Reset form
    setOffboardingData({
      reasonForLeaving: "",
      lastWorkingDay: "",
      handoverNotes: "",
      systemAccessRevoked: false,
      equipmentReturned: false,
      exitInterviewCompleted: false,
    });
  };

  const handleOffboardingCancel = () => {
    setShowOffboardingModal(false);
    // Reset form
    setOffboardingData({
      reasonForLeaving: "",
      lastWorkingDay: "",
      handoverNotes: "",
      systemAccessRevoked: false,
      equipmentReturned: false,
      exitInterviewCompleted: false,
    });
  };

  const handleTrainingFormSubmit = () => {
    // Add the new training/certification record
    console.log("Saving training/certification:", trainingFormData);
    setShowTrainingModal(false);
    // Reset form
    setTrainingFormData({
      type: "training",
      trainingTitle: "",
      trainingProvider: "",
      status: "",
      score: "",
      completionDate: "",
      certificationName: "",
      issuedOrganization: "",
      issuedDate: "",
      expirationDate: "",
    });
  };

  const handleTrainingFormCancel = () => {
    setShowTrainingModal(false);
    // Reset form
    setTrainingFormData({
      type: "training",
      trainingTitle: "",
      trainingProvider: "",
      status: "",
      score: "",
      completionDate: "",
      certificationName: "",
      issuedOrganization: "",
      issuedDate: "",
      expirationDate: "",
    });
  };

  const handleLeaveFormSubmit = () => {
    // Add the new leave request
    console.log("Submitting leave request:", leaveFormData);
    setShowLeaveModal(false);
    // Reset form
    setLeaveFormData({
      leaveType: "",
      fromDate: "",
      toDate: "",
      approverName: "",
      reason: "",
    });
  };

  const handleLeaveFormCancel = () => {
    setShowLeaveModal(false);
    // Reset form
    setLeaveFormData({
      leaveType: "",
      fromDate: "",
      toDate: "",
      approverName: "",
      reason: "",
    });
  };

  const handleSkillFormSubmit = () => {
    // Add the new skill to the skills array
    const newSkill = {
      name: skillFormData.skillName,
      experience: skillFormData.experience,
      endorsements: 0,
      level: skillFormData.proficiencyLevel,
      editable: true,
      endorsable: true,
    };

    setSkills((prev) => [...prev, newSkill]);
    console.log("Adding new skill:", newSkill);
    setShowSkillModal(false);

    // Reset form
    setSkillFormData({
      skillName: "",
      category: "",
      proficiencyLevel: "",
      experience: "",
    });
  };

  const handleSkillFormCancel = () => {
    setShowSkillModal(false);
    // Reset form
    setSkillFormData({
      skillName: "",
      category: "",
      proficiencyLevel: "",
      experience: "",
    });
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
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    First Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={editedEmployee.fullName.split(" ")[0]}
                      onChange={(e) => {
                        const names = editedEmployee.fullName.split(" ");
                        names[0] = e.target.value;
                        setEditedEmployee({
                          ...editedEmployee,
                          fullName: names.join(" "),
                        });
                      }}
                    />
                  ) : (
                    <p className="text-foreground">
                      {employee.fullName.split(" ")[0]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Last Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={editedEmployee.fullName
                        .split(" ")
                        .slice(1)
                        .join(" ")}
                      onChange={(e) => {
                        const firstName = editedEmployee.fullName.split(" ")[0];
                        setEditedEmployee({
                          ...editedEmployee,
                          fullName: `${firstName} ${e.target.value}`,
                        });
                      }}
                    />
                  ) : (
                    <p className="text-foreground">
                      {employee.fullName.split(" ").slice(1).join(" ")}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Phone
                  </label>
                  {isEditing ? (
                    <Input
                      value={editedEmployee.phone}
                      onChange={(e) =>
                        setEditedEmployee({
                          ...editedEmployee,
                          phone: e.target.value,
                        })
                      }
                      placeholder="+1 (416) 123-4567"
                    />
                  ) : (
                    <p className="text-foreground">{employee.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Address Information
                  </label>
                  {isEditing ? (
                    <Textarea placeholder="Full residential address" />
                  ) : (
                    <p className="text-foreground">
                      123 – 1350 Foothills Blvd, Prince George, British Columbia, Canada
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <Input
                      value={editedEmployee.email}
                      onChange={(e) =>
                        setEditedEmployee({
                          ...editedEmployee,
                          email: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className="text-foreground">{employee.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <Input type="date" defaultValue="1990-03-15" />
                  ) : (
                    <p className="text-foreground">03-15-1990</p>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Gender
                  </label>
                  {isEditing ? (
                    <Select defaultValue="female">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="non-binary">Non-Binary</SelectItem>
                        <SelectItem value="prefer-not-to-say">
                          Prefer Not to Say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-foreground">Female</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Marital Status
                  </label>
                  {isEditing ? (
                    <Select defaultValue="single">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-foreground">Single</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Nationality
                  </label>
                  {isEditing ? (
                    <Input defaultValue="United States" />
                  ) : (
                    <p className="text-foreground">United States</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Emergency Contact
                  </label>
                  {isEditing ? (
                    <div className="space-y-2">
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Contact Person"
                          defaultValue="John Mitchell"
                          className="pl-10"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Contact Number"
                          defaultValue="+1 (555) 987-6543"
                          className="pl-10"
                        />
                      </div>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Relationship"
                          defaultValue="Father"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-foreground space-y-2">
                      <p className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold">
                          Contact Person:
                        </span>{" "}
                        John Mitchell
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold">
                          Contact Number:
                        </span>{" "}
                        +1 (555) 987-6543
                      </p>
                      <p className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold">
                          Relationship:
                        </span>{" "}
                        Father
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "work":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Work Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Position
                  </label>
                  {isEditing ? (
                    <Input defaultValue={employee.jobTitle} />
                  ) : (
                    <p className="text-foreground">{employee.jobTitle}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Department
                  </label>
                  {isEditing ? (
                    <Select defaultValue={employee.department.toLowerCase()}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-foreground">{employee.department}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Reporting Manager
                  </label>
                  {isEditing ? (
                    <Input defaultValue="Michael Rodriguez" />
                  ) : (
                    <p className="text-foreground">Michael Rodriguez</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Employment Status
                  </label>
                  {isEditing ? (
                    <Select
                      defaultValue={employee.status
                        .toLowerCase()
                        .replace(" ", "-")}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="probationary">
                          Probationary
                        </SelectItem>
                        <SelectItem value="resigned">Resigned</SelectItem>
                        <SelectItem value="terminated">Terminated</SelectItem>
                        <SelectItem value="on-leave">On-Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-foreground">{employee.status}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Employment Type
                  </label>
                  {isEditing ? (
                    <Select defaultValue="full-time">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-Time</SelectItem>
                        <SelectItem value="part-time">Part-Time</SelectItem>
                        <SelectItem value="contractual">Contractual</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-foreground">Full-Time</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Date Hired
                  </label>
                  {isEditing ? (
                    <Input type="date" defaultValue={employee.joinDate} />
                  ) : (
                    <p className="text-foreground">
                      {formatDate(employee.joinDate)}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Probation End Date
                  </label>
                  {isEditing ? (
                    <Input type="date" defaultValue="2023-07-15" />
                  ) : (
                    <p className="text-foreground">07-15-2023</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Work Location / Site
                  </label>
                  {isEditing ? (
                    <Select defaultValue="head-office">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="head-office">Head Office</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="branch">Branch</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-foreground">Head Office</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Shift Schedule
                  </label>
                  {isEditing ? (
                    <Select defaultValue="day">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Day</SelectItem>
                        <SelectItem value="mid">Mid</SelectItem>
                        <SelectItem value="night">Night</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-foreground">Day</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Work Email
                  </label>
                  {isEditing ? (
                    <Input defaultValue={employee.email} />
                  ) : (
                    <p className="text-foreground">{employee.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Work Phone / Extension
                  </label>
                  {isEditing ? (
                    <Input defaultValue="+1 (555) 123-4567 ext. 1234" />
                  ) : (
                    <p className="text-foreground">
                      +1 (555) 123-4567 ext. 1234
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Skills Summary</h3>
              <Button
                className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white"
                onClick={() => setShowSkillModal(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Skill
              </Button>
            </div>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <Card key={index} className="border border-border">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Skill Name
                        </label>
                        <p className="font-semibold text-foreground">
                          {skill.name}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Experience
                        </label>
                        <p className="text-foreground">{skill.experience}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Endorsements
                        </label>
                        <p className="text-foreground">{skill.endorsements}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Skill Level
                        </label>
                        <div className="mt-1">
                          <Badge
                            variant="secondary"
                            className={
                              skill.level === "Expert"
                                ? "bg-green-100 text-green-700"
                                : skill.level === "Advanced"
                                  ? "bg-blue-100 text-blue-700"
                                  : skill.level === "Intermediate"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-100 text-gray-700"
                            }
                          >
                            {skill.level}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {skill.editable && (
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                        )}
                        {skill.endorsable && (
                          <Button size="sm" variant="outline">
                            <Award className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "compensation":
        const compensationHistory = [
          {
            date: "01-15-2023",
            amount: "+$5,000",
            salaryAmount: "$95,000",
            changeAmount: "$5,000",
            changePercent: "5.6%",
            source: "Base Salary",
            type: "Pay Rate Change",
            currency: "USD",
            jobTitle: "Senior Software Engineer",
          },
          {
            date: "07-01-2022",
            amount: "+$8,000",
            salaryAmount: "$90,000",
            changeAmount: "$8,000",
            changePercent: "9.8%",
            source: "Base Salary",
            type: "Promotion",
            currency: "USD",
            jobTitle: "Software Engineer",
          },
        ];

        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Compensation Information</h3>

            {/* Current Compensation */}
            <Card className="border-0 shadow-sm bg-blue-50">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Base Salary
                    </label>
                    <p className="text-2xl font-bold text-foreground">
                      $95,000
                    </p>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Last Review
                    </label>
                    <p className="text-lg font-semibold text-foreground">
                      01-15-2023
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Next Review
                    </label>
                    <p className="text-lg font-semibold text-foreground">
                      01-15-2024
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compensation History */}
            <div>
              <h4 className="text-md font-semibold mb-4">
                Compensation History
              </h4>
              <div className="space-y-4">
                {compensationHistory.map((record, index) => (
                  <Card key={index} className="border border-border">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
                        <div>
                          <label className="font-medium text-muted-foreground">
                            Date of Change
                          </label>
                          <p className="text-foreground">{record.date}</p>
                        </div>
                        <div>
                          <label className="font-medium text-muted-foreground">
                            Amount
                          </label>
                          <p className="text-green-600 font-semibold">
                            {record.amount}
                          </p>
                        </div>
                        <div>
                          <label className="font-medium text-muted-foreground">
                            Salary Amount
                          </label>
                          <p className="text-foreground font-semibold">
                            {record.salaryAmount}
                          </p>
                        </div>
                        <div>
                          <label className="font-medium text-muted-foreground">
                            Change Amount
                          </label>
                          <p className="text-foreground">
                            {record.changeAmount}
                          </p>
                        </div>
                        <div>
                          <label className="font-medium text-muted-foreground">
                            Change %
                          </label>
                          <p className="text-foreground">
                            {record.changePercent}
                          </p>
                        </div>
                        <div>
                          <label className="font-medium text-muted-foreground">
                            Type
                          </label>
                          <p className="text-foreground">{record.type}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mt-3 pt-3 border-t">
                        <div>
                          <label className="font-medium text-muted-foreground">
                            Source
                          </label>
                          <p className="text-foreground">{record.source}</p>
                        </div>
                        <div>
                          <label className="font-medium text-muted-foreground">
                            Currency
                          </label>
                          <p className="text-foreground">{record.currency}</p>
                        </div>
                        <div>
                          <label className="font-medium text-muted-foreground">
                            Job Title
                          </label>
                          <p className="text-foreground">{record.jobTitle}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case "performance":
        const performanceReviews = [
          {
            id: "q3-2023",
            quarter: "Q3 2023",
            goals: [
              {
                id: 1,
                title: "Complete React Migration Project",
                status: "Completed",
                rating: "4.5/5",
              },
              {
                id: 2,
                title: "Mentor 2 Junior Developers",
                status: "Completed",
                rating: "4.8/5",
              },
              {
                id: 3,
                title: "Improve Code Review Process",
                status: "In Progress",
                rating: "4.0/5",
              },
              {
                id: 4,
                title: "Lead Architecture Design Sessions",
                status: "Completed",
                rating: "4.7/5",
              },
              {
                id: 5,
                title: "Enhance Team Documentation",
                status: "Not Started",
                rating: "N/A",
              },
            ],
            overallRating: "4.5/5",
            managerFeedback:
              "Sarah has consistently delivered exceptional work this quarter. Her technical leadership on the React migration project was outstanding, and her mentoring of junior developers shows strong leadership potential. She proactively improved our code review process and led several successful architecture sessions. Areas for growth include completing the documentation enhancement initiative in the next quarter.",
          },
          {
            id: "q2-2023",
            quarter: "Q2 2023",
            goals: [
              {
                id: 1,
                title: "Optimize Application Performance",
                status: "Completed",
                rating: "4.2/5",
              },
              {
                id: 2,
                title: "Implement Testing Framework",
                status: "Completed",
                rating: "4.6/5",
              },
              {
                id: 3,
                title: "Cross-team Collaboration Initiative",
                status: "Completed",
                rating: "4.3/5",
              },
            ],
            overallRating: "4.4/5",
            managerFeedback:
              "Excellent performance in Q2. Sarah successfully optimized our application performance by 25% and implemented a comprehensive testing framework that improved our code quality significantly.",
          },
        ];

        const toggleQuarter = (quarterId: string) => {
          setExpandedQuarters((prev) =>
            prev.includes(quarterId)
              ? prev.filter((id) => id !== quarterId)
              : [...prev, quarterId],
          );
        };

        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Performance Reviews</h3>

            <div className="space-y-4">
              {performanceReviews.map((review) => (
                <Card key={review.id} className="border border-border">
                  <CardContent className="p-0">
                    <div
                      className="p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                      onClick={() => toggleQuarter(review.id)}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold">
                          {review.quarter}
                        </h4>
                        <div className="flex items-center gap-4">
                          <Badge className="bg-blue-100 text-blue-700">
                            Overall: {review.overallRating}
                          </Badge>
                          {expandedQuarters.includes(review.id) ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </div>
                    </div>

                    {expandedQuarters.includes(review.id) && (
                      <div className="px-4 pb-4 border-t">
                        {/* Goals & Objectives */}
                        <div className="mt-4">
                          <h5 className="font-semibold mb-3 flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Goals & Objectives
                          </h5>
                          <div className="space-y-3">
                            {review.goals.map((goal) => (
                              <div
                                key={goal.id}
                                className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                              >
                                <div className="flex-1">
                                  <p className="font-medium">
                                    Goal {goal.id}: {goal.title}
                                  </p>
                                </div>
                                <div className="flex items-center gap-4">
                                  <Badge
                                    variant="outline"
                                    className={
                                      goal.status === "Completed"
                                        ? "bg-green-50 text-green-700 border-green-200"
                                        : goal.status === "In Progress"
                                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                          : "bg-gray-50 text-gray-700 border-gray-200"
                                    }
                                  >
                                    {goal.status}
                                  </Badge>
                                  <span className="text-sm font-medium min-w-[60px]">
                                    {goal.rating}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Manager Feedback */}
                        <div className="mt-6">
                          <h5 className="font-semibold mb-3">
                            Manager Feedback
                          </h5>
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-foreground leading-relaxed">
                              {review.managerFeedback}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "training":
        const trainingRecords = [
          {
            id: "1",
            trainingName: "React Advanced Patterns",
            trainingProvider: "Tech Academy",
            status: "Completed",
            score: 95,
            completionDate: "2023-08-15",
          },
          {
            id: "2",
            trainingName: "AWS Cloud Architecture",
            trainingProvider: "Amazon Web Services",
            status: "In Progress",
            score: null,
            completionDate: null,
          },
          {
            id: "3",
            trainingName: "Leadership Development Program",
            trainingProvider: "Corporate University",
            status: "Not Started",
            score: null,
            completionDate: null,
          },
        ];

        const certifications = [
          {
            id: "1",
            certificationName: "AWS Certified Solutions Architect",
            issuedOrganization: "Amazon Web Services",
            issuedDate: "2023-06-15",
            expiryDate: "2026-06-15",
            certificateId: "AWS-CSA-2023-001234",
            certificateStatus: "Valid",
          },
          {
            id: "2",
            certificationName: "React Developer Certification",
            issuedOrganization: "Meta",
            issuedDate: "2023-03-10",
            expiryDate: "2025-03-10",
            certificateId: "META-RDC-2023-567890",
            certificateStatus: "Valid",
          },
          {
            id: "3",
            certificationName: "Project Management Professional (PMP)",
            issuedOrganization: "Project Management Institute",
            issuedDate: "2022-01-20",
            expiryDate: "2025-01-20",
            certificateId: "PMI-PMP-2022-111222",
            certificateStatus: "Expired",
          },
        ];

        const getStatusColor = (status: string): string => {
          switch (status) {
            case "Completed":
              return "bg-green-100 text-green-700 border-green-200";
            case "In Progress":
              return "bg-yellow-100 text-yellow-700 border-yellow-200";
            case "Not Started":
              return "bg-gray-100 text-gray-700 border-gray-200";
            default:
              return "bg-gray-100 text-gray-700 border-gray-200";
          }
        };

        const getCertificateStatusColor = (status: string): string => {
          switch (status) {
            case "Valid":
              return "bg-green-100 text-green-700 border-green-200";
            case "Expired":
              return "bg-red-100 text-red-700 border-red-200";
            default:
              return "bg-gray-100 text-gray-700 border-gray-200";
          }
        };

        const formatTrainingDate = (dateString: string | null): string => {
          if (!dateString) return "N/A";
          const date = new Date(dateString);
          return date.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          });
        };

        return (
          <div className="space-y-8">
            {/* Training Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Training
                </h3>
                <Button
                  className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white"
                  onClick={() => setShowTrainingModal(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Training/Certification
                </Button>
              </div>

              <div className="space-y-4">
                {trainingRecords.map((training) => (
                  <Card key={training.id} className="border border-border">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Training Name
                          </label>
                          <p className="font-semibold text-foreground">
                            {training.trainingName}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Training Provider
                          </label>
                          <p className="text-foreground">
                            {training.trainingProvider}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Status
                          </label>
                          <div className="mt-1">
                            <Badge
                              variant="outline"
                              className={getStatusColor(training.status)}
                            >
                              {training.status}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Score
                          </label>
                          <p className="text-foreground">
                            {training.score ? `${training.score}%` : "N/A"}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Completion Date
                          </label>
                          <p className="text-foreground">
                            {formatTrainingDate(training.completionDate)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Industry Certifications Section */}
            <div>
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Industry Certifications
              </h3>

              <div className="space-y-4">
                {certifications.map((cert) => (
                  <Card key={cert.id} className="border border-border">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Certification Info */}
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">
                              Certification Name
                            </label>
                            <p className="font-semibold text-foreground">
                              {cert.certificationName}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">
                              Issued Organization
                            </label>
                            <p className="text-foreground">
                              {cert.issuedOrganization}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">
                                Issued Date
                              </label>
                              <p className="text-foreground">
                                {formatTrainingDate(cert.issuedDate)}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">
                                Expiry Date
                              </label>
                              <p className="text-foreground">
                                {formatTrainingDate(cert.expiryDate)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Certificate Details & Actions */}
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">
                              Certificate ID
                            </label>
                            <p className="text-foreground font-mono text-sm">
                              {cert.certificateId}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">
                              Certificate Status
                            </label>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={getCertificateStatusColor(
                                  cert.certificateStatus,
                                )}
                              >
                                {cert.certificateStatus === "Valid" ? (
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                ) : (
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                )}
                                {cert.certificateStatus}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                            >
                              <Eye className="w-3 h-3 mr-2" />
                              View Certificate
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                            >
                              <Download className="w-3 h-3 mr-2" />
                              Download Certificate
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case "attendance":
        const attendanceData = {
          totalWorkingDays: 22,
          daysPresent: 20,
          daysAbsent: 2,
          lateArrivals: 1,
          attendanceRate: 90.9,
          punctualityRate: 95.5,
        };

        const leaveHistory = [
          {
            id: "1",
            leavePeriod: "03-15-2024 – 03-17-2024",
            approvedBy: "Michael Rodriguez",
            leaveStatus: "Approved",
            numberOfDays: 3,
            leaveType: "Sick Leave",
          },
          {
            id: "2",
            leavePeriod: "01-08-2024 – 01-12-2024",
            approvedBy: "Michael Rodriguez",
            leaveStatus: "Approved",
            numberOfDays: 5,
            leaveType: "Annual Leave",
          },
          {
            id: "3",
            leavePeriod: "04-22-2024 – 04-22-2024",
            approvedBy: "Michael Rodriguez",
            leaveStatus: "Under Review",
            numberOfDays: 1,
            leaveType: "Personal Leave",
          },
          {
            id: "4",
            leavePeriod: "05-10-2024 – 05-14-2024",
            approvedBy: "",
            leaveStatus: "Rejected",
            numberOfDays: 5,
            leaveType: "Annual Leave",
          },
        ];

        const getLeaveStatusColor = (status: string): string => {
          switch (status) {
            case "Approved":
              return "bg-green-100 text-green-700 border-green-200";
            case "Under Review":
              return "bg-yellow-100 text-yellow-700 border-yellow-200";
            case "Rejected":
              return "bg-red-100 text-red-700 border-red-200";
            case "Cancelled":
              return "bg-gray-100 text-gray-700 border-gray-200";
            default:
              return "bg-gray-100 text-gray-700 border-gray-200";
          }
        };

        return (
          <div className="space-y-8">
            {/* Attendance Overview */}
            <div>
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Attendance Overview (2024)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border border-border">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {attendanceData.totalWorkingDays}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Total Working Days
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-border">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {attendanceData.daysPresent}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Days Present
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-border">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-red-600 mb-2">
                      {attendanceData.daysAbsent}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Days Absent
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-border">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-2">
                      {attendanceData.lateArrivals}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Late Arrivals
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Performance Metrics */}
            <div>
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Performance Metrics
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border border-border bg-blue-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">
                          Attendance Rate
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {attendanceData.attendanceRate}%
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${attendanceData.attendanceRate}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-border bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">
                          Punctuality Rate
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {attendanceData.punctualityRate}%
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${attendanceData.punctualityRate}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Leave History */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Leave History
                </h3>
                <Button
                  className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white"
                  onClick={() => setShowLeaveModal(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Request Leave
                </Button>
              </div>

              <div className="space-y-4">
                {leaveHistory.map((leave) => (
                  <Card key={leave.id} className="border border-border">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Leave Period
                          </label>
                          <p className="font-semibold text-foreground">
                            {leave.leavePeriod}
                          </p>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Approved By
                          </label>
                          <p className="text-foreground">
                            {leave.approvedBy || "N/A"}
                          </p>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Leave Status
                          </label>
                          <div className="mt-1">
                            <Badge
                              variant="outline"
                              className={getLeaveStatusColor(leave.leaveStatus)}
                            >
                              {leave.leaveStatus}
                            </Badge>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Number of Days
                          </label>
                          <p className="text-foreground font-semibold">
                            {leave.numberOfDays}{" "}
                            {leave.numberOfDays === 1 ? "day" : "days"}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Leave Summary */}
              <Card className="border border-border bg-muted/30 mt-6">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4">Leave Summary (2024)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        {
                          leaveHistory.filter(
                            (l) => l.leaveStatus === "Approved",
                          ).length
                        }
                      </div>
                      <div className="text-muted-foreground">
                        Approved Leaves
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-600">
                        {
                          leaveHistory.filter(
                            (l) => l.leaveStatus === "Under Review",
                          ).length
                        }
                      </div>
                      <div className="text-muted-foreground">Under Review</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-red-600">
                        {
                          leaveHistory.filter(
                            (l) => l.leaveStatus === "Rejected",
                          ).length
                        }
                      </div>
                      <div className="text-muted-foreground">Rejected</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {leaveHistory
                          .filter((l) => l.leaveStatus === "Approved")
                          .reduce((sum, l) => sum + l.numberOfDays, 0)}
                      </div>
                      <div className="text-muted-foreground">
                        Total Days Taken
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "documents":
        const employeeDocuments = [
          {
            id: "1",
            documentTitle: "Employment Contract",
            fileType: "PDF",
            fileSize: "2.4 MB",
            uploadDate: "2023-01-15",
            canPreview: true,
            canDownload: true,
            canShare: false,
          },
          {
            id: "2",
            documentTitle: "Tax Forms (W-2)",
            fileType: "PDF",
            fileSize: "1.8 MB",
            uploadDate: "2023-12-31",
            canPreview: true,
            canDownload: true,
            canShare: true,
          },
          {
            id: "3",
            documentTitle: "Performance Review 2023",
            fileType: "DOCX",
            fileSize: "856 KB",
            uploadDate: "2023-11-20",
            canPreview: false,
            canDownload: true,
            canShare: false,
          },
          {
            id: "4",
            documentTitle: "Benefits Enrollment",
            fileType: "PDF",
            fileSize: "3.1 MB",
            uploadDate: "2023-03-10",
            canPreview: true,
            canDownload: true,
            canShare: true,
          },
          {
            id: "5",
            documentTitle: "Training Certificate",
            fileType: "PDF",
            fileSize: "1.2 MB",
            uploadDate: "2023-08-15",
            canPreview: true,
            canDownload: true,
            canShare: false,
          },
        ];

        const handleDocumentAction = (
          action: string,
          docId: string,
          docTitle: string,
        ) => {
          console.log(`${action} action for document:`, docId, docTitle);
        };

        return (
          <div className="space-y-6">
            {/* Header with Document Count */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Employee Documents ({employeeDocuments.length})
              </h3>
              <Button
                className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white"
                onClick={() => setShowDocumentModal(true)}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>

            {/* Documents List */}
            <div className="space-y-4">
              {employeeDocuments.map((document) => (
                <Card key={document.id} className="border border-border">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      {/* Document Title */}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Document Title
                        </label>
                        <p className="font-semibold text-foreground">
                          {document.documentTitle}
                        </p>
                      </div>

                      {/* File Type */}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          File Type
                        </label>
                        <div className="mt-1">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {document.fileType}
                          </Badge>
                        </div>
                      </div>

                      {/* File Size */}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          File Size
                        </label>
                        <p className="text-foreground">{document.fileSize}</p>
                      </div>

                      {/* Upload Date */}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Upload Date
                        </label>
                        <p className="text-foreground">
                          {formatDate(document.uploadDate)}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        {/* Preview Button */}
                        {document.canPreview && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleDocumentAction(
                                "preview",
                                document.id,
                                document.documentTitle,
                              )
                            }
                            className="flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            Preview
                          </Button>
                        )}

                        {/* Download Button */}
                        {document.canDownload && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleDocumentAction(
                                "download",
                                document.id,
                                document.documentTitle,
                              )
                            }
                            className="flex items-center gap-1"
                          >
                            <Download className="w-3 h-3" />
                            Download
                          </Button>
                        )}
                      </div>

                      {/* Additional Actions */}
                      <div className="flex gap-2">
                        {/* Share Button */}
                        {document.canShare && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleDocumentAction(
                                "share",
                                document.id,
                                document.documentTitle,
                              )
                            }
                            className="flex items-center gap-1"
                          >
                            <Share className="w-3 h-3" />
                            Share
                          </Button>
                        )}

                        {/* Delete Button */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleDocumentAction(
                              "delete",
                              document.id,
                              document.documentTitle,
                            )
                          }
                          className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "security":
        const handleSecurityToggle = (setting: string, value: boolean) => {
          setSecuritySettings((prev) => ({
            ...prev,
            [setting]: value,
          }));
          console.log(`Security setting changed: ${setting} = ${value}`);
        };

        const handleSecurityAction = (action: string) => {
          console.log(`Security action: ${action}`);
          // Here you would implement the actual functionality
        };

        return (
          <div className="space-y-8">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Access & Security
            </h3>

            {/* Account Settings */}
            <div className="space-y-6">
              <Card className="border border-border">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-6">Account Settings</h4>

                  <div className="space-y-6">
                    {/* Account Active */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <label className="text-sm font-medium">
                          Account Active <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <Switch
                        checked={securitySettings.accountActive}
                        onCheckedChange={(checked) =>
                          handleSecurityToggle("accountActive", checked)
                        }
                      />
                    </div>

                    {/* HR Access */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <label className="text-sm font-medium">HR Access</label>
                      </div>
                      <Switch
                        checked={securitySettings.hrAccess}
                        onCheckedChange={(checked) =>
                          handleSecurityToggle("hrAccess", checked)
                        }
                      />
                    </div>

                    {/* Admin Rights */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <label className="text-sm font-medium">
                          Admin Rights
                        </label>
                      </div>
                      <Switch
                        checked={securitySettings.adminRights}
                        onCheckedChange={(checked) =>
                          handleSecurityToggle("adminRights", checked)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Actions */}
              <Card className="border border-border">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-6">Security Actions</h4>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <label className="text-sm font-medium">
                          Reset Password
                        </label>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => handleSecurityAction("resetPassword")}
                        className="text-orange-600 border-orange-200 hover:bg-orange-50"
                      >
                        Reset Password
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <label className="text-sm font-medium">
                          Generate New User ID
                        </label>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => handleSecurityAction("generateUserId")}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        Generate New User ID
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Current Security Status */}
              <Card className="border border-border bg-muted/30">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4">
                    Current Security Status
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-muted-foreground">
                        Account Status
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          securitySettings.accountActive
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }
                      >
                        {securitySettings.accountActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">
                        HR Access
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          securitySettings.hrAccess
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-gray-50 text-gray-700 border-gray-200"
                        }
                      >
                        {securitySettings.hrAccess ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">
                        Admin Rights
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          securitySettings.adminRights
                            ? "bg-purple-50 text-purple-700 border-purple-200"
                            : "bg-gray-50 text-gray-700 border-gray-200"
                        }
                      >
                        {securitySettings.adminRights
                          ? "Granted"
                          : "Not Granted"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "changelog":
        const auditChangeLog = [
          {
            id: "1",
            description: "Updated employee salary from $90,000 to $95,000",
            reason: "Annual performance review and salary adjustment",
            changedBy: "Michael Rodriguez (HR Manager)",
            date: "2024-01-15",
          },
          {
            id: "2",
            description: "Changed department from Product to Engineering",
            reason: "Employee role change and team restructuring",
            changedBy: "Sarah Johnson (Department Head)",
            date: "2023-11-10",
          },
          {
            id: "3",
            description: "Updated employee status from Probationary to Active",
            reason: "Successful completion of probation period",
            changedBy: "System Auto-Update",
            date: "2023-07-15",
          },
          {
            id: "4",
            description: "Modified work location from Remote to Head Office",
            reason: "Company policy change - return to office mandate",
            changedBy: "Michael Rodriguez (HR Manager)",
            date: "2023-09-01",
          },
          {
            id: "5",
            description: "Updated emergency contact information",
            reason: "Employee requested personal information update",
            changedBy: "Emma Wilson (Self-Service)",
            date: "2023-12-05",
          },
          {
            id: "6",
            description: "Added new skill: AWS Cloud Architecture",
            reason: "Employee completed certification training",
            changedBy: "Training System",
            date: "2023-08-20",
          },
        ];

        const formatChangeDate = (dateString: string): string => {
          const date = new Date(dateString);
          return date.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          });
        };

        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Audit Change Log
            </h3>

            {/* Change Log Entries */}
            <div className="space-y-4">
              {auditChangeLog.map((entry) => (
                <Card key={entry.id} className="border border-border">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                      {/* Description of change */}
                      <div className="lg:col-span-2">
                        <label className="text-sm font-medium text-muted-foreground">
                          Description of change
                        </label>
                        <p className="font-semibold text-foreground mt-1">
                          {entry.description}
                        </p>
                      </div>

                      {/* Reason for change */}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Reason for change
                        </label>
                        <p className="text-foreground mt-1">{entry.reason}</p>
                      </div>

                      {/* Date */}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Date
                        </label>
                        <p className="text-foreground mt-1">
                          {formatChangeDate(entry.date)}
                        </p>
                      </div>
                    </div>

                    {/* Changed by */}
                    <div className="mt-4 pt-4 border-t">
                      <label className="text-sm font-medium text-muted-foreground">
                        Changed by
                      </label>
                      <p className="text-foreground mt-1">{entry.changedBy}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Summary Card */}
            <Card className="border border-border bg-muted/30">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Change Log Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {auditChangeLog.length}
                    </div>
                    <div className="text-muted-foreground">Total Changes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {
                        auditChangeLog.filter((entry) =>
                          entry.changedBy.includes("System"),
                        ).length
                      }
                    </div>
                    <div className="text-muted-foreground">System Changes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">
                      {
                        auditChangeLog.filter(
                          (entry) => !entry.changedBy.includes("System"),
                        ).length
                      }
                    </div>
                    <div className="text-muted-foreground">Manual Changes</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-12 text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                {(() => {
                  const IconComponent = tabs.find(
                    (tab) => tab.id === activeTab,
                  )?.icon;
                  return IconComponent ? (
                    <IconComponent className="w-6 h-6 text-muted-foreground" />
                  ) : null;
                })()}
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                {tabs.find((tab) => tab.id === activeTab)?.label}
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
          <Button variant="outline" onClick={onBack} className="w-10 h-10 p-0">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-semibold text-foreground">
            Employee Profile
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <Button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
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
              <Button
                variant="outline"
                onClick={handleOffboarding}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <UserMinus className="w-4 h-4 mr-2" />
                Offboarding Employee
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Employee Details Header */}
      <Card className="border-0 shadow-sm sticky top-0 z-20 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
                    <h2 className="text-2xl font-bold text-foreground">
                      {employee.fullName}
                    </h2>
                    <Badge
                      variant="outline"
                      className={`font-bold ${getStatusColor(employee.status)}`}
                    >
                      {employee.status}
                    </Badge>
                  </div>
                  <p className="text-lg text-muted-foreground font-medium">
                    {employee.jobTitle}
                  </p>
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
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-50 text-blue-700"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Column 3 - Employee ID & Join Date */}
              <div className="space-y-6">
                <div className="text-center bg-muted/30 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground font-medium">
                    Employee ID
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    {employee.employeeId}
                  </div>
                </div>

                <div className="text-center bg-muted/30 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground font-medium">
                    Joined
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    {formatDate(employee.joinDate)}
                  </div>
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
        <CardContent className="p-8">{renderTabContent()}</CardContent>
      </Card>

      {/* Training/Certification Modal */}
      <Dialog open={showTrainingModal} onOpenChange={setShowTrainingModal}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Training/Certification</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-4 px-1">
            {/* Type Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <Select
                value={trainingFormData.type}
                onValueChange={(value) => {
                  setTrainingFormData({ ...trainingFormData, type: value });
                  setTrainingFormType(value as "training" | "certification");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="certification">Certification</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Conditional Form Fields */}
            {trainingFormType === "training" ? (
              // Training Form Fields
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Training Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={trainingFormData.trainingTitle}
                    onChange={(e) =>
                      setTrainingFormData({
                        ...trainingFormData,
                        trainingTitle: e.target.value,
                      })
                    }
                    placeholder="The name or title of the training session"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Training Provider
                  </label>
                  <Input
                    value={trainingFormData.trainingProvider}
                    onChange={(e) =>
                      setTrainingFormData({
                        ...trainingFormData,
                        trainingProvider: e.target.value,
                      })
                    }
                    placeholder="The organization or individual offering it"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={trainingFormData.status}
                    onValueChange={(value) =>
                      setTrainingFormData({
                        ...trainingFormData,
                        status: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Not Started">Not Started</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Score and Completion Date - Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Score
                    </label>
                    <Input
                      type="number"
                      value={trainingFormData.score}
                      onChange={(e) =>
                        setTrainingFormData({
                          ...trainingFormData,
                          score: e.target.value,
                        })
                      }
                      placeholder="Numeric value representing performance"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Completion Date
                    </label>
                    <Input
                      type="date"
                      value={trainingFormData.completionDate}
                      onChange={(e) =>
                        setTrainingFormData({
                          ...trainingFormData,
                          completionDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </>
            ) : (
              // Certification Form Fields
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Certification Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={trainingFormData.certificationName}
                    onChange={(e) =>
                      setTrainingFormData({
                        ...trainingFormData,
                        certificationName: e.target.value,
                      })
                    }
                    placeholder="Enter the official name of the certification"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Issued Organization
                  </label>
                  <Input
                    value={trainingFormData.issuedOrganization}
                    onChange={(e) =>
                      setTrainingFormData({
                        ...trainingFormData,
                        issuedOrganization: e.target.value,
                      })
                    }
                    placeholder="Name of the organization that issued the certification"
                  />
                </div>

                {/* Certification Dates - Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Issued Date
                    </label>
                    <Input
                      type="date"
                      value={trainingFormData.issuedDate}
                      onChange={(e) =>
                        setTrainingFormData({
                          ...trainingFormData,
                          issuedDate: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Expiration Date
                    </label>
                    <Input
                      type="date"
                      value={trainingFormData.expirationDate}
                      onChange={(e) =>
                        setTrainingFormData({
                          ...trainingFormData,
                          expirationDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </>
            )}

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button
                onClick={handleTrainingFormSubmit}
                className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white flex-1 sm:flex-none"
              >
                Save
              </Button>
              <Button
                variant="outline"
                onClick={handleTrainingFormCancel}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Request Leave Modal */}
      <Dialog open={showLeaveModal} onOpenChange={setShowLeaveModal}>
        <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Request Leave</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-4 px-1">
            {/* Leave Type - Required Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Leave Type <span className="text-red-500">*</span>
              </label>
              <Select
                value={leaveFormData.leaveType}
                onValueChange={(value) =>
                  setLeaveFormData({ ...leaveFormData, leaveType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Annual">Annual</SelectItem>
                  <SelectItem value="Sick">Sick</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Maternity">Maternity</SelectItem>
                  <SelectItem value="Paternity">Paternity</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                  <SelectItem value="Bereavement">Bereavement</SelectItem>
                  <SelectItem value="Study">Study</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* From Date - Required */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  From Date <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  value={leaveFormData.fromDate}
                  onChange={(e) =>
                    setLeaveFormData({
                      ...leaveFormData,
                      fromDate: e.target.value,
                    })
                  }
                />
              </div>

              {/* To Date - Required */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  To Date <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  value={leaveFormData.toDate}
                  onChange={(e) =>
                    setLeaveFormData({
                      ...leaveFormData,
                      toDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Approver Name - Optional */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Approver Name
              </label>
              <Input
                value={leaveFormData.approverName}
                onChange={(e) =>
                  setLeaveFormData({
                    ...leaveFormData,
                    approverName: e.target.value,
                  })
                }
                placeholder="Enter the name of the person responsible for approving"
              />
            </div>

            {/* Reason - Optional */}
            <div>
              <label className="block text-sm font-medium mb-2">Reason</label>
              <Textarea
                value={leaveFormData.reason}
                onChange={(e) =>
                  setLeaveFormData({ ...leaveFormData, reason: e.target.value })
                }
                placeholder="Optional explanation or justification for the leave"
                rows={3}
              />
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button
                onClick={handleLeaveFormSubmit}
                className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white flex-1 sm:flex-none"
                disabled={
                  !leaveFormData.leaveType ||
                  !leaveFormData.fromDate ||
                  !leaveFormData.toDate
                }
              >
                Submit Request
              </Button>
              <Button
                variant="outline"
                onClick={handleLeaveFormCancel}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Document Modal */}
      <Dialog open={showDocumentModal} onOpenChange={setShowDocumentModal}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 md:space-y-6 pt-4">
            {/* Document Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Document Title <span className="text-red-500">*</span>
              </label>
              <Input placeholder="Enter the name of the document (e.g., Employment Contract, Tax Forms)" />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Select File <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOCX, DOC, XLS, XLSX files up to 10MB
                </p>
                <Input
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.doc,.xls,.xlsx"
                />
              </div>
            </div>

            {/* Document Category */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Document Category
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employment">
                    Employment Documents
                  </SelectItem>
                  <SelectItem value="tax">Tax Documents</SelectItem>
                  <SelectItem value="benefits">Benefits & Insurance</SelectItem>
                  <SelectItem value="performance">
                    Performance Reviews
                  </SelectItem>
                  <SelectItem value="training">
                    Training & Certifications
                  </SelectItem>
                  <SelectItem value="personal">Personal Documents</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Access Permissions */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Access Permissions
              </label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="canPreview"
                    className="rounded"
                    defaultChecked
                  />
                  <label htmlFor="canPreview" className="text-sm">
                    Allow preview
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="canDownload"
                    className="rounded"
                    defaultChecked
                  />
                  <label htmlFor="canDownload" className="text-sm">
                    Allow download
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="canShare" className="rounded" />
                  <label htmlFor="canShare" className="text-sm">
                    Allow sharing with others
                  </label>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button
                className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white flex-1 sm:flex-none"
                onClick={() => {
                  console.log("Uploading document...");
                  setShowDocumentModal(false);
                }}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
              <Button
                variant="outline"
                className="flex-1 sm:flex-none"
                onClick={() => setShowDocumentModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Offboarding Modal */}
      <Dialog
        open={showOffboardingModal}
        onOpenChange={setShowOffboardingModal}
      >
        <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-red-600">
              Offboard Employee: {employee.fullName}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-4 px-1">
            {/* Basic Offboarding Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Reason for Leaving */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reason for Leaving <span className="text-red-500">*</span>
                </label>
                <Select
                  value={offboardingData.reasonForLeaving}
                  onValueChange={(value) =>
                    setOffboardingData({
                      ...offboardingData,
                      reasonForLeaving: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select the reason for the employee's departure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resignation">Resignation</SelectItem>
                    <SelectItem value="retirement">Retirement</SelectItem>
                    <SelectItem value="termination">Termination</SelectItem>
                    <SelectItem value="contract-end">Contract End</SelectItem>
                    <SelectItem value="layoff">Layoff</SelectItem>
                    <SelectItem value="mutual-agreement">
                      Mutual Agreement
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Last Working Day */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Working Day <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  value={offboardingData.lastWorkingDay}
                  onChange={(e) =>
                    setOffboardingData({
                      ...offboardingData,
                      lastWorkingDay: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Handover Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Handover Notes
              </label>
              <Textarea
                value={offboardingData.handoverNotes}
                onChange={(e) =>
                  setOffboardingData({
                    ...offboardingData,
                    handoverNotes: e.target.value,
                  })
                }
                placeholder="Notes detailing responsibilities and tasks handed over before departure"
                rows={4}
              />
            </div>

            {/* Offboarding Checklist */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                Offboarding Checklist
              </h4>

              <div className="space-y-3">
                {/* System Access Revoked */}
                <div className="flex items-start space-x-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="systemAccessRevoked"
                    checked={offboardingData.systemAccessRevoked}
                    onChange={(e) =>
                      setOffboardingData({
                        ...offboardingData,
                        systemAccessRevoked: e.target.checked,
                      })
                    }
                    className="mt-1 rounded border-gray-300"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="systemAccessRevoked"
                      className="text-sm font-medium text-gray-700"
                    >
                      System Access Revoked
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      Checklist item to confirm system access has been disabled.
                    </p>
                  </div>
                </div>

                {/* Equipment Returned */}
                <div className="flex items-start space-x-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="equipmentReturned"
                    checked={offboardingData.equipmentReturned}
                    onChange={(e) =>
                      setOffboardingData({
                        ...offboardingData,
                        equipmentReturned: e.target.checked,
                      })
                    }
                    className="mt-1 rounded border-gray-300"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="equipmentReturned"
                      className="text-sm font-medium text-gray-700"
                    >
                      Equipment Returned
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      Checklist item to confirm all company equipment has been
                      returned.
                    </p>
                  </div>
                </div>

                {/* Exit Interview Completed */}
                <div className="flex items-start space-x-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="exitInterviewCompleted"
                    checked={offboardingData.exitInterviewCompleted}
                    onChange={(e) =>
                      setOffboardingData({
                        ...offboardingData,
                        exitInterviewCompleted: e.target.checked,
                      })
                    }
                    className="mt-1 rounded border-gray-300"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="exitInterviewCompleted"
                      className="text-sm font-medium text-gray-700"
                    >
                      Exit Interview Completed
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      Checklist item to confirm the exit interview has been
                      conducted.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Progress Summary */}
            <Card className="border border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-orange-800 mb-3">
                  Offboarding Progress
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">
                      {
                        [
                          offboardingData.systemAccessRevoked,
                          offboardingData.equipmentReturned,
                          offboardingData.exitInterviewCompleted,
                        ].filter(Boolean).length
                      }
                      /3
                    </div>
                    <div className="text-orange-700">Tasks Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {offboardingData.reasonForLeaving &&
                      offboardingData.lastWorkingDay
                        ? "Complete"
                        : "Pending"}
                    </div>
                    <div className="text-orange-700">Basic Information</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {offboardingData.handoverNotes ? "Added" : "Optional"}
                    </div>
                    <div className="text-orange-700">Handover Notes</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button
                onClick={handleOffboardingSubmit}
                className="bg-red-600 hover:bg-red-700 text-white flex-1 sm:flex-none"
                disabled={
                  !offboardingData.reasonForLeaving ||
                  !offboardingData.lastWorkingDay
                }
              >
                <UserMinus className="w-4 h-4 mr-2" />
                Complete Offboarding
              </Button>
              <Button
                variant="outline"
                onClick={handleOffboardingCancel}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add New Skill Modal */}
      <Dialog open={showSkillModal} onOpenChange={setShowSkillModal}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Skill</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 md:space-y-6 pt-4">
            {/* Skill Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Skill Name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Enter skill name (e.g., React, Python, Project Management)"
                value={skillFormData.skillName}
                onChange={(e) =>
                  setSkillFormData({
                    ...skillFormData,
                    skillName: e.target.value,
                  })
                }
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select
                value={skillFormData.category}
                onValueChange={(value) =>
                  setSkillFormData({ ...skillFormData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical Skills</SelectItem>
                  <SelectItem value="programming">
                    Programming Languages
                  </SelectItem>
                  <SelectItem value="frameworks">
                    Frameworks & Libraries
                  </SelectItem>
                  <SelectItem value="tools">Tools & Software</SelectItem>
                  <SelectItem value="cloud">Cloud & Infrastructure</SelectItem>
                  <SelectItem value="soft">Soft Skills</SelectItem>
                  <SelectItem value="leadership">
                    Leadership & Management
                  </SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Proficiency Level */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Proficiency Level <span className="text-red-500">*</span>
              </label>
              <Select
                value={skillFormData.proficiencyLevel}
                onValueChange={(value) =>
                  setSkillFormData({
                    ...skillFormData,
                    proficiencyLevel: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select proficiency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">
                    Beginner - Basic understanding
                  </SelectItem>
                  <SelectItem value="Intermediate">
                    Intermediate - Working knowledge
                  </SelectItem>
                  <SelectItem value="Advanced">
                    Advanced - Strong proficiency
                  </SelectItem>
                  <SelectItem value="Expert">
                    Expert - Deep expertise
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Years of Experience
              </label>
              <Select
                value={skillFormData.experience}
                onValueChange={(value) =>
                  setSkillFormData({ ...skillFormData, experience: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="< 1 year">Less than 1 year</SelectItem>
                  <SelectItem value="1 year">1 year</SelectItem>
                  <SelectItem value="2 years">2 years</SelectItem>
                  <SelectItem value="3 years">3 years</SelectItem>
                  <SelectItem value="4 years">4 years</SelectItem>
                  <SelectItem value="5+ years">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button
                className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white flex-1 sm:flex-none"
                onClick={handleSkillFormSubmit}
                disabled={
                  !skillFormData.skillName || !skillFormData.proficiencyLevel
                }
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
              <Button
                variant="outline"
                className="flex-1 sm:flex-none"
                onClick={handleSkillFormCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
