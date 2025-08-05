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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Settings,
  Shield,
  Bell,
  Database,
  Users,
  Palette,
  Upload,
  Download,
  Save,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit,
  Info,
  X,
} from "lucide-react";

interface SystemConfigurationProps {
  onBack: () => void;
}

interface ConfigurationState {
  general: {
    companyName: string;
    companyEmail: string;
    companyAddress: string;
    website: string;
    timeZone: string;
    dateFormat: string;
    language: string;
    workingHours: string;
    fiscalYearStart: string;
  };
  security: {
    sessionTimeout: number;
    loginAttempts: number;
    passwordMinLength: number;
    twoFactorAuth: boolean;
    allowRemoteLogin: boolean;
    requireUppercase: boolean;
    apiKey: string;
  };
  notifications: {
    emailNotifications: boolean;
    newEmployeeAlerts: boolean;
    documentUploadAlerts: boolean;
    systemMaintenanceAlerts: boolean;
    weeklyReports: boolean;
    monthlyReports: boolean;
  };
  customFields: Array<{
    id: string;
    name: string;
    type: string;
    section: string;
    required: boolean;
    options?: string[];
  }>;
  userRoles: Array<{
    id: string;
    name: string;
    description: string;
    permissions: string[];
    active: boolean;
  }>;
  branding: {
    companyLogo: string;
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    customCss: string;
  };
}

const defaultConfig: ConfigurationState = {
  general: {
    companyName: "AI2AIM WORKSPACE",
    companyEmail: "contact@ai2aim.com",
    companyAddress: "123 Business Avenue, Suite 100, New York, NY 10001",
    website: "https://www.ai2aim.com",
    timeZone: "UTC-5 (Eastern Time)",
    dateFormat: "MM-DD-YYYY",
    language: "English (US)",
    workingHours: "9:00 AM - 5:00 PM",
    fiscalYearStart: "January",
  },
  security: {
    sessionTimeout: 30,
    loginAttempts: 3,
    passwordMinLength: 8,
    twoFactorAuth: false,
    allowRemoteLogin: true,
    requireUppercase: true,
    apiKey: "sk-1234567890abcdef1234567890abcdef",
  },
  notifications: {
    emailNotifications: true,
    newEmployeeAlerts: true,
    documentUploadAlerts: true,
    systemMaintenanceAlerts: true,
    weeklyReports: false,
    monthlyReports: true,
  },
  customFields: [
    {
      id: "cf-001",
      name: "Emergency Contact 2",
      type: "text",
      section: "Personal Info",
      required: false,
    },
    {
      id: "cf-002",
      name: "Security Clearance Level",
      type: "dropdown",
      section: "Security",
      required: true,
      options: ["Public", "Confidential", "Secret", "Top Secret"],
    },
    {
      id: "cf-003",
      name: "Preferred Work Schedule",
      type: "dropdown",
      section: "Work Details",
      required: false,
      options: ["9 AM - 5 PM", "10 AM - 6 PM", "Flexible", "Remote", "Hybrid"],
    },
  ],
  userRoles: [
    {
      id: "role-001",
      name: "Administrator",
      description: "Full system access and configuration rights",
      permissions: ["read", "write", "delete", "configure", "user_management"],
      active: true,
    },
    {
      id: "role-002",
      name: "HR Manager",
      description: "Human resources management and employee data access",
      permissions: ["read", "write", "employee_management"],
      active: true,
    },
    {
      id: "role-003",
      name: "Employee",
      description: "Basic access to own profile and company information",
      permissions: ["read"],
      active: true,
    },
  ],
  branding: {
    companyLogo: "",
    primaryColor: "#0065F8",
    secondaryColor: "#64748B",
    fontFamily: "Inter",
    customCss: "",
  },
};

export default function SystemConfiguration({
  onBack,
}: SystemConfigurationProps) {
  const [activeTab, setActiveTab] = useState("general");
  const [config, setConfig] = useState<ConfigurationState>(defaultConfig);
  const [hasChanges, setHasChanges] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [newField, setNewField] = useState({
    name: "",
    type: "text",
    section: "Personal Info",
    required: false,
  });

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "custom-fields", label: "Custom Fields", icon: Database },
    { id: "user-roles", label: "User Roles", icon: Users },
    { id: "branding", label: "Branding", icon: Palette },
  ];

  const handleConfigChange = (
    section: keyof ConfigurationState,
    field: string,
    value: any,
  ) => {
    setConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    console.log("Saving configuration:", config);
    setHasChanges(false);
    // Here you would implement the actual save functionality
  };

  const handleImportConfig = () => {
    console.log("Importing configuration...");
    // Here you would implement import functionality
  };

  const handleExportConfig = () => {
    console.log("Exporting configuration...");
    // Here you would implement export functionality
  };

  const addCustomField = () => {
    setShowAddFieldModal(true);
  };

  const handleAddField = () => {
    if (newField.name.trim()) {
      const fieldToAdd = {
        id: `cf-${Date.now()}`,
        ...newField,
      };
      setConfig((prev) => ({
        ...prev,
        customFields: [...prev.customFields, fieldToAdd],
      }));
      setHasChanges(true);
      setNewField({
        name: "",
        type: "text",
        section: "Personal Info",
        required: false,
      });
      setShowAddFieldModal(false);
    }
  };

  const handleCancelAddField = () => {
    setNewField({
      name: "",
      type: "text",
      section: "Personal Info",
      required: false,
    });
    setShowAddFieldModal(false);
  };

  const removeCustomField = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((field) => field.id !== id),
    }));
    setHasChanges(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">General Settings</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <Input
                  value={config.general.companyName}
                  onChange={(e) =>
                    handleConfigChange("general", "companyName", e.target.value)
                  }
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Email <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  value={config.general.companyEmail}
                  onChange={(e) =>
                    handleConfigChange(
                      "general",
                      "companyEmail",
                      e.target.value,
                    )
                  }
                  placeholder="Enter company email address"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Address
                </label>
                <Textarea
                  value={config.general.companyAddress}
                  onChange={(e) =>
                    handleConfigChange(
                      "general",
                      "companyAddress",
                      e.target.value,
                    )
                  }
                  placeholder="Enter complete company address"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Website
                </label>
                <Input
                  type="url"
                  value={config.general.website}
                  onChange={(e) =>
                    handleConfigChange("general", "website", e.target.value)
                  }
                  placeholder="https://www.company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Time Zone <span className="text-red-500">*</span>
                </label>
                <Select
                  value={config.general.timeZone}
                  onValueChange={(value) =>
                    handleConfigChange("general", "timeZone", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC-8 (Pacific Time)">
                      UTC-8 (Pacific Time)
                    </SelectItem>
                    <SelectItem value="UTC-7 (Mountain Time)">
                      UTC-7 (Mountain Time)
                    </SelectItem>
                    <SelectItem value="UTC-6 (Central Time)">
                      UTC-6 (Central Time)
                    </SelectItem>
                    <SelectItem value="UTC-5 (Eastern Time)">
                      UTC-5 (Eastern Time)
                    </SelectItem>
                    <SelectItem value="UTC+0 (Greenwich Time)">
                      UTC+0 (Greenwich Time)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date Format <span className="text-red-500">*</span>
                </label>
                <Select
                  value={config.general.dateFormat}
                  onValueChange={(value) =>
                    handleConfigChange("general", "dateFormat", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM-DD-YYYY">
                      MM-DD-YYYY (12-31-2024)
                    </SelectItem>
                    <SelectItem value="DD-MM-YYYY">
                      DD-MM-YYYY (31-12-2024)
                    </SelectItem>
                    <SelectItem value="YYYY-MM-DD">
                      YYYY-MM-DD (2024-12-31)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Default Language <span className="text-red-500">*</span>
                </label>
                <Select
                  value={config.general.language}
                  onValueChange={(value) =>
                    handleConfigChange("general", "language", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English (US)">English (US)</SelectItem>
                    <SelectItem value="English (UK)">English (UK)</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Standard Working Hours
                </label>
                <Input
                  value={config.general.workingHours}
                  onChange={(e) =>
                    handleConfigChange(
                      "general",
                      "workingHours",
                      e.target.value,
                    )
                  }
                  placeholder="e.g., 9:00 AM - 5:00 PM"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fiscal Year Start
                </label>
                <Select
                  value={config.general.fiscalYearStart}
                  onValueChange={(value) =>
                    handleConfigChange("general", "fiscalYearStart", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fiscal year start" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="January">January</SelectItem>
                    <SelectItem value="April">April</SelectItem>
                    <SelectItem value="July">July</SelectItem>
                    <SelectItem value="October">October</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Security Settings</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Session Timeout */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Session Timeout (minutes){" "}
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  min="5"
                  max="480"
                  value={config.security.sessionTimeout}
                  onChange={(e) =>
                    handleConfigChange(
                      "security",
                      "sessionTimeout",
                      parseInt(e.target.value),
                    )
                  }
                  placeholder="Enter session timeout in minutes"
                />
              </div>

              {/* Max Login Attempts */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Max Login Attempts <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={config.security.loginAttempts}
                  onChange={(e) =>
                    handleConfigChange(
                      "security",
                      "loginAttempts",
                      parseInt(e.target.value),
                    )
                  }
                  placeholder="Enter maximum login attempts"
                />
              </div>

              {/* Minimum Password Length */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minimum Password Length{" "}
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  min="6"
                  max="32"
                  value={config.security.passwordMinLength}
                  onChange={(e) =>
                    handleConfigChange(
                      "security",
                      "passwordMinLength",
                      parseInt(e.target.value),
                    )
                  }
                  placeholder="Enter minimum password length"
                />
              </div>

              {/* API Key */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  API Key
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    value={config.security.apiKey}
                    onChange={(e) =>
                      handleConfigChange("security", "apiKey", e.target.value)
                    }
                    placeholder="Enter API key"
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 px-2"
                    onClick={() => {
                      const newKey = `sk-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
                      handleConfigChange("security", "apiKey", newKey);
                    }}
                  >
                    Generate
                  </Button>
                </div>
              </div>

              {/* Two-Factor Authentication Required */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Two-Factor Authentication Required
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Require additional verification for all user logins
                  </p>
                </div>
                <Switch
                  checked={config.security.twoFactorAuth}
                  onCheckedChange={(checked) =>
                    handleConfigChange("security", "twoFactorAuth", checked)
                  }
                />
              </div>

              {/* Allow Remote Login */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Allow Remote Login
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Allow users to login from any location
                  </p>
                </div>
                <Switch
                  checked={config.security.allowRemoteLogin}
                  onCheckedChange={(checked) =>
                    handleConfigChange("security", "allowRemoteLogin", checked)
                  }
                />
              </div>

              {/* Require Uppercase Letters */}
              <div className="flex items-center justify-between p-4 border rounded-lg md:col-span-2">
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Require Uppercase Letters
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Passwords must contain at least one uppercase letter
                  </p>
                </div>
                <Switch
                  checked={config.security.requireUppercase}
                  onCheckedChange={(checked) =>
                    handleConfigChange("security", "requireUppercase", checked)
                  }
                />
              </div>
            </div>

            {/* Security Status Summary */}
            <Card className="border border-border bg-muted/30">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Current Security Status</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${config.security.twoFactorAuth ? "bg-green-500" : "bg-red-500"}`}
                    ></div>
                    <span>
                      Two-Factor Auth:{" "}
                      {config.security.twoFactorAuth ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${config.security.allowRemoteLogin ? "bg-yellow-500" : "bg-green-500"}`}
                    ></div>
                    <span>
                      Remote Login:{" "}
                      {config.security.allowRemoteLogin
                        ? "Allowed"
                        : "Restricted"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${config.security.requireUppercase ? "bg-green-500" : "bg-yellow-500"}`}
                    ></div>
                    <span>
                      Password Policy:{" "}
                      {config.security.requireUppercase ? "Strong" : "Basic"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Notification Settings</h3>

            <Card className="border border-border">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Email Notification Settings
                </h4>
                <div className="space-y-4">
                  {/* Enable Email Notifications */}
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        Enable Email Notifications
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Master switch for all email notifications
                      </p>
                    </div>
                    <Switch
                      checked={config.notifications.emailNotifications}
                      onCheckedChange={(checked) =>
                        handleConfigChange(
                          "notifications",
                          "emailNotifications",
                          checked,
                        )
                      }
                    />
                  </div>

                  {/* New Employee Alerts */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        New Employee Alerts
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Notify when new employees are added to the system
                      </p>
                    </div>
                    <Switch
                      checked={config.notifications.newEmployeeAlerts}
                      onCheckedChange={(checked) =>
                        handleConfigChange(
                          "notifications",
                          "newEmployeeAlerts",
                          checked,
                        )
                      }
                      disabled={!config.notifications.emailNotifications}
                    />
                  </div>

                  {/* Document Upload Alerts */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        Document Upload Alerts
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Notify when documents are uploaded or updated
                      </p>
                    </div>
                    <Switch
                      checked={config.notifications.documentUploadAlerts}
                      onCheckedChange={(checked) =>
                        handleConfigChange(
                          "notifications",
                          "documentUploadAlerts",
                          checked,
                        )
                      }
                      disabled={!config.notifications.emailNotifications}
                    />
                  </div>

                  {/* System Maintenance Alerts */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        System Maintenance Alerts
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Notify about scheduled system maintenance and downtime
                      </p>
                    </div>
                    <Switch
                      checked={config.notifications.systemMaintenanceAlerts}
                      onCheckedChange={(checked) =>
                        handleConfigChange(
                          "notifications",
                          "systemMaintenanceAlerts",
                          checked,
                        )
                      }
                      disabled={!config.notifications.emailNotifications}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Automated Reports
                </h4>
                <div className="space-y-4">
                  {/* Weekly Reports */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        Weekly Reports
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Send weekly summary reports every Monday
                      </p>
                    </div>
                    <Switch
                      checked={config.notifications.weeklyReports}
                      onCheckedChange={(checked) =>
                        handleConfigChange(
                          "notifications",
                          "weeklyReports",
                          checked,
                        )
                      }
                      disabled={!config.notifications.emailNotifications}
                    />
                  </div>

                  {/* Monthly Reports */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        Monthly Reports
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Send comprehensive monthly reports on the 1st of each
                        month
                      </p>
                    </div>
                    <Switch
                      checked={config.notifications.monthlyReports}
                      onCheckedChange={(checked) =>
                        handleConfigChange(
                          "notifications",
                          "monthlyReports",
                          checked,
                        )
                      }
                      disabled={!config.notifications.emailNotifications}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Status Summary */}
            <Card className="border border-border bg-muted/30">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">
                  Current Notification Status
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${config.notifications.emailNotifications ? "bg-green-500" : "bg-red-500"}`}
                    ></div>
                    <span>
                      Email:{" "}
                      {config.notifications.emailNotifications
                        ? "Enabled"
                        : "Disabled"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${config.notifications.newEmployeeAlerts ? "bg-green-500" : "bg-gray-400"}`}
                    ></div>
                    <span>
                      Employee Alerts:{" "}
                      {config.notifications.newEmployeeAlerts
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${config.notifications.documentUploadAlerts ? "bg-green-500" : "bg-gray-400"}`}
                    ></div>
                    <span>
                      Document Alerts:{" "}
                      {config.notifications.documentUploadAlerts
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${config.notifications.systemMaintenanceAlerts ? "bg-green-500" : "bg-gray-400"}`}
                    ></div>
                    <span>
                      Maintenance Alerts:{" "}
                      {config.notifications.systemMaintenanceAlerts
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${config.notifications.weeklyReports ? "bg-blue-500" : "bg-gray-400"}`}
                    ></div>
                    <span>
                      Weekly Reports:{" "}
                      {config.notifications.weeklyReports
                        ? "Enabled"
                        : "Disabled"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${config.notifications.monthlyReports ? "bg-blue-500" : "bg-gray-400"}`}
                    ></div>
                    <span>
                      Monthly Reports:{" "}
                      {config.notifications.monthlyReports
                        ? "Enabled"
                        : "Disabled"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "custom-fields":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Custom Fields</h3>
              <Dialog
                open={showAddFieldModal}
                onOpenChange={setShowAddFieldModal}
              >
                <DialogTrigger asChild>
                  <Button
                    onClick={addCustomField}
                    className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Field
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Custom Field</DialogTitle>
                    <DialogDescription>
                      Create a new custom field for employee profiles.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Field Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={newField.name}
                        onChange={(e) =>
                          setNewField((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="Enter field name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Field Type <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={newField.type}
                        onValueChange={(value) =>
                          setNewField((prev) => ({ ...prev, type: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="dropdown">Dropdown</SelectItem>
                          <SelectItem value="checkbox">Checkbox</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Section <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={newField.section}
                        onValueChange={(value) =>
                          setNewField((prev) => ({ ...prev, section: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Personal Info">
                            Personal Info
                          </SelectItem>
                          <SelectItem value="Work Details">
                            Work Details
                          </SelectItem>
                          <SelectItem value="Security">Security</SelectItem>
                          <SelectItem value="Additional">Additional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="new-field-required"
                        checked={newField.required}
                        onChange={(e) =>
                          setNewField((prev) => ({
                            ...prev,
                            required: e.target.checked,
                          }))
                        }
                      />
                      <label
                        htmlFor="new-field-required"
                        className="text-sm font-medium"
                      >
                        Required Field
                      </label>
                    </div>
                  </div>
                  <DialogFooter className="flex gap-2">
                    <Button variant="outline" onClick={handleCancelAddField}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddField}
                      disabled={!newField.name.trim()}
                      className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white"
                    >
                      Add Field
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {config.customFields.map((field, index) => (
                <Card key={field.id} className="border border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-lg">
                            {field.name}
                          </h4>
                          <Badge
                            variant={field.required ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {field.required ? "Required" : "Optional"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Section: {field.section}
                        </p>
                        {field.options && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {field.options.map((option, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {option}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeCustomField(field.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {config.customFields.length === 0 && (
              <Card className="border-2 border-dashed border-gray-300">
                <CardContent className="p-8 text-center">
                  <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">
                    No Custom Fields
                  </h4>
                  <p className="text-gray-500 mb-4">
                    Add custom fields to collect additional employee
                    information.
                  </p>
                  <Button
                    onClick={addCustomField}
                    className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Field
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case "user-roles":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">User Roles & Permissions</h3>

            <div className="space-y-4">
              {config.userRoles.map((role) => (
                <Card key={role.id} className="border border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-lg">{role.name}</h4>
                          <Badge
                            variant={role.active ? "default" : "secondary"}
                          >
                            {role.active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          {role.description}
                        </p>

                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block">
                            Permissions
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {role.permissions.map((permission) => (
                              <Badge
                                key={permission}
                                variant="outline"
                                className="text-xs"
                              >
                                {permission.replace("_", " ")}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Switch
                          checked={role.active}
                          onCheckedChange={(checked) => {
                            const updatedRoles = config.userRoles.map((r) =>
                              r.id === role.id ? { ...r, active: checked } : r,
                            );
                            setConfig((prev) => ({
                              ...prev,
                              userRoles: updatedRoles,
                            }));
                            setHasChanges(true);
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "branding":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Branding & Appearance</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Logo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Upload company logo</p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 2MB
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Primary Color <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  <Input
                    type="color"
                    value={config.branding.primaryColor}
                    onChange={(e) =>
                      handleConfigChange(
                        "branding",
                        "primaryColor",
                        e.target.value,
                      )
                    }
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={config.branding.primaryColor}
                    onChange={(e) =>
                      handleConfigChange(
                        "branding",
                        "primaryColor",
                        e.target.value,
                      )
                    }
                    placeholder="#0065F8"
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Secondary Color
                </label>
                <div className="flex gap-3">
                  <Input
                    type="color"
                    value={config.branding.secondaryColor}
                    onChange={(e) =>
                      handleConfigChange(
                        "branding",
                        "secondaryColor",
                        e.target.value,
                      )
                    }
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={config.branding.secondaryColor}
                    onChange={(e) =>
                      handleConfigChange(
                        "branding",
                        "secondaryColor",
                        e.target.value,
                      )
                    }
                    placeholder="#64748B"
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Font Family
                </label>
                <Select
                  value={config.branding.fontFamily}
                  onValueChange={(value) =>
                    handleConfigChange("branding", "fontFamily", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                    <SelectItem value="Lato">Lato</SelectItem>
                    <SelectItem value="Poppins">Poppins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Custom CSS
              </label>
              <Textarea
                value={config.branding.customCss}
                onChange={(e) =>
                  handleConfigChange("branding", "customCss", e.target.value)
                }
                placeholder="/* Add custom CSS styles here */"
                rows={8}
                className="font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Advanced: Add custom CSS to override default styles
              </p>
            </div>
          </div>
        );

      default:
        return null;
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
            System Configuration
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleImportConfig}>
            <Upload className="w-4 h-4 mr-2" />
            Import Config
          </Button>
          <Button variant="outline" onClick={handleExportConfig}>
            <Download className="w-4 h-4 mr-2" />
            Export Config
          </Button>
          <Button
            onClick={handleSaveChanges}
            disabled={!hasChanges}
            className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Changes Indicator */}
      {hasChanges && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-orange-800">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">
                You have unsaved changes. Don't forget to save your
                configuration.
              </span>
            </div>
          </CardContent>
        </Card>
      )}

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

      {/* Help Information */}
      <Card className="border border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Configuration Help</p>
              <p>
                Fields marked with an asterisk (*) are required. Changes will
                only take effect after clicking "Save Changes". You can export
                your current configuration as a backup or import previously
                saved settings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
