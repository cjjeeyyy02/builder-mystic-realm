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
} from "lucide-react";

interface SystemConfigurationProps {
  onBack: () => void;
}

interface ConfigurationState {
  general: {
    companyName: string;
    timeZone: string;
    dateFormat: string;
    language: string;
    workingHours: string;
    fiscalYearStart: string;
  };
  security: {
    passwordMinLength: number;
    passwordComplexity: boolean;
    sessionTimeout: number;
    twoFactorAuth: boolean;
    loginAttempts: number;
    accountLockout: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    browserNotifications: boolean;
    smsNotifications: boolean;
    documentExpiry: boolean;
    performanceReminders: boolean;
    systemMaintenance: boolean;
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
    timeZone: "UTC-5 (Eastern Time)",
    dateFormat: "MM-DD-YYYY",
    language: "English (US)",
    workingHours: "9:00 AM - 5:00 PM",
    fiscalYearStart: "January",
  },
  security: {
    passwordMinLength: 8,
    passwordComplexity: true,
    sessionTimeout: 30,
    twoFactorAuth: false,
    loginAttempts: 3,
    accountLockout: true,
  },
  notifications: {
    emailNotifications: true,
    browserNotifications: true,
    smsNotifications: false,
    documentExpiry: true,
    performanceReminders: true,
    systemMaintenance: true,
  },
  customFields: [
    {
      id: "cf-001",
      name: "Employee Badge Number",
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

export default function SystemConfiguration({ onBack }: SystemConfigurationProps) {
  const [activeTab, setActiveTab] = useState("general");
  const [config, setConfig] = useState<ConfigurationState>(defaultConfig);
  const [hasChanges, setHasChanges] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "custom-fields", label: "Custom Fields", icon: Database },
    { id: "user-roles", label: "User Roles", icon: Users },
    { id: "branding", label: "Branding", icon: Palette },
  ];

  const handleConfigChange = (section: keyof ConfigurationState, field: string, value: any) => {
    setConfig(prev => ({
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
    const newField = {
      id: `cf-${Date.now()}`,
      name: "",
      type: "text",
      section: "Personal Info",
      required: false,
    };
    setConfig(prev => ({
      ...prev,
      customFields: [...prev.customFields, newField],
    }));
    setHasChanges(true);
  };

  const removeCustomField = (id: string) => {
    setConfig(prev => ({
      ...prev,
      customFields: prev.customFields.filter(field => field.id !== id),
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
                  onChange={(e) => handleConfigChange("general", "companyName", e.target.value)}
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Time Zone <span className="text-red-500">*</span>
                </label>
                <Select
                  value={config.general.timeZone}
                  onValueChange={(value) => handleConfigChange("general", "timeZone", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC-8 (Pacific Time)">UTC-8 (Pacific Time)</SelectItem>
                    <SelectItem value="UTC-7 (Mountain Time)">UTC-7 (Mountain Time)</SelectItem>
                    <SelectItem value="UTC-6 (Central Time)">UTC-6 (Central Time)</SelectItem>
                    <SelectItem value="UTC-5 (Eastern Time)">UTC-5 (Eastern Time)</SelectItem>
                    <SelectItem value="UTC+0 (Greenwich Time)">UTC+0 (Greenwich Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date Format <span className="text-red-500">*</span>
                </label>
                <Select
                  value={config.general.dateFormat}
                  onValueChange={(value) => handleConfigChange("general", "dateFormat", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM-DD-YYYY">MM-DD-YYYY (12-31-2024)</SelectItem>
                    <SelectItem value="DD-MM-YYYY">DD-MM-YYYY (31-12-2024)</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD (2024-12-31)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Default Language <span className="text-red-500">*</span>
                </label>
                <Select
                  value={config.general.language}
                  onValueChange={(value) => handleConfigChange("general", "language", value)}
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
                  onChange={(e) => handleConfigChange("general", "workingHours", e.target.value)}
                  placeholder="e.g., 9:00 AM - 5:00 PM"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fiscal Year Start
                </label>
                <Select
                  value={config.general.fiscalYearStart}
                  onValueChange={(value) => handleConfigChange("general", "fiscalYearStart", value)}
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
            
            <div className="space-y-6">
              <Card className="border border-border">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4">Password Policy</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Minimum Password Length <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="number"
                        min="6"
                        max="32"
                        value={config.security.passwordMinLength}
                        onChange={(e) => handleConfigChange("security", "passwordMinLength", parseInt(e.target.value))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-semibold text-gray-700">
                          Require Password Complexity
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          Uppercase, lowercase, numbers, and special characters
                        </p>
                      </div>
                      <Switch
                        checked={config.security.passwordComplexity}
                        onCheckedChange={(checked) => handleConfigChange("security", "passwordComplexity", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4">Session Management</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Session Timeout (minutes) <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="number"
                        min="5"
                        max="480"
                        value={config.security.sessionTimeout}
                        onChange={(e) => handleConfigChange("security", "sessionTimeout", parseInt(e.target.value))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-semibold text-gray-700">
                          Two-Factor Authentication
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          Require additional verification for login
                        </p>
                      </div>
                      <Switch
                        checked={config.security.twoFactorAuth}
                        onCheckedChange={(checked) => handleConfigChange("security", "twoFactorAuth", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4">Account Security</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Max Login Attempts <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={config.security.loginAttempts}
                        onChange={(e) => handleConfigChange("security", "loginAttempts", parseInt(e.target.value))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-semibold text-gray-700">
                          Account Lockout
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          Lock account after failed login attempts
                        </p>
                      </div>
                      <Switch
                        checked={config.security.accountLockout}
                        onCheckedChange={(checked) => handleConfigChange("security", "accountLockout", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Notification Settings</h3>
            
            <Card className="border border-border">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Notification Channels</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Email Notifications</label>
                      <p className="text-xs text-gray-500 mt-1">Send notifications via email</p>
                    </div>
                    <Switch
                      checked={config.notifications.emailNotifications}
                      onCheckedChange={(checked) => handleConfigChange("notifications", "emailNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Browser Notifications</label>
                      <p className="text-xs text-gray-500 mt-1">Show notifications in browser</p>
                    </div>
                    <Switch
                      checked={config.notifications.browserNotifications}
                      onCheckedChange={(checked) => handleConfigChange("notifications", "browserNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">SMS Notifications</label>
                      <p className="text-xs text-gray-500 mt-1">Send critical notifications via SMS</p>
                    </div>
                    <Switch
                      checked={config.notifications.smsNotifications}
                      onCheckedChange={(checked) => handleConfigChange("notifications", "smsNotifications", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Notification Types</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Document Expiry Alerts</label>
                      <p className="text-xs text-gray-500 mt-1">Notify when documents are expiring</p>
                    </div>
                    <Switch
                      checked={config.notifications.documentExpiry}
                      onCheckedChange={(checked) => handleConfigChange("notifications", "documentExpiry", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Performance Review Reminders</label>
                      <p className="text-xs text-gray-500 mt-1">Remind about upcoming performance reviews</p>
                    </div>
                    <Switch
                      checked={config.notifications.performanceReminders}
                      onCheckedChange={(checked) => handleConfigChange("notifications", "performanceReminders", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">System Maintenance Alerts</label>
                      <p className="text-xs text-gray-500 mt-1">Notify about scheduled maintenance</p>
                    </div>
                    <Switch
                      checked={config.notifications.systemMaintenance}
                      onCheckedChange={(checked) => handleConfigChange("notifications", "systemMaintenance", checked)}
                    />
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
              <Button onClick={addCustomField} className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Custom Field
              </Button>
            </div>
            
            <div className="space-y-4">
              {config.customFields.map((field, index) => (
                <Card key={field.id} className="border border-border">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Field Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          value={field.name}
                          onChange={(e) => {
                            const updatedFields = [...config.customFields];
                            updatedFields[index].name = e.target.value;
                            setConfig(prev => ({ ...prev, customFields: updatedFields }));
                            setHasChanges(true);
                          }}
                          placeholder="Enter field name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Field Type <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={field.type}
                          onValueChange={(value) => {
                            const updatedFields = [...config.customFields];
                            updatedFields[index].type = value;
                            setConfig(prev => ({ ...prev, customFields: updatedFields }));
                            setHasChanges(true);
                          }}
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
                          value={field.section}
                          onValueChange={(value) => {
                            const updatedFields = [...config.customFields];
                            updatedFields[index].section = value;
                            setConfig(prev => ({ ...prev, customFields: updatedFields }));
                            setHasChanges(true);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Personal Info">Personal Info</SelectItem>
                            <SelectItem value="Work Details">Work Details</SelectItem>
                            <SelectItem value="Security">Security</SelectItem>
                            <SelectItem value="Additional">Additional</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`required-${field.id}`}
                            checked={field.required}
                            onChange={(e) => {
                              const updatedFields = [...config.customFields];
                              updatedFields[index].required = e.target.checked;
                              setConfig(prev => ({ ...prev, customFields: updatedFields }));
                              setHasChanges(true);
                            }}
                          />
                          <label htmlFor={`required-${field.id}`} className="text-sm font-medium">
                            Required
                          </label>
                        </div>
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
                          <Badge variant={role.active ? "default" : "secondary"}>
                            {role.active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                        
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block">Permissions</label>
                          <div className="flex flex-wrap gap-2">
                            {role.permissions.map((permission) => (
                              <Badge key={permission} variant="outline" className="text-xs">
                                {permission.replace('_', ' ')}
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
                            const updatedRoles = config.userRoles.map(r =>
                              r.id === role.id ? { ...r, active: checked } : r
                            );
                            setConfig(prev => ({ ...prev, userRoles: updatedRoles }));
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
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
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
                    onChange={(e) => handleConfigChange("branding", "primaryColor", e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={config.branding.primaryColor}
                    onChange={(e) => handleConfigChange("branding", "primaryColor", e.target.value)}
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
                    onChange={(e) => handleConfigChange("branding", "secondaryColor", e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={config.branding.secondaryColor}
                    onChange={(e) => handleConfigChange("branding", "secondaryColor", e.target.value)}
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
                  onValueChange={(value) => handleConfigChange("branding", "fontFamily", value)}
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
                onChange={(e) => handleConfigChange("branding", "customCss", e.target.value)}
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
                You have unsaved changes. Don't forget to save your configuration.
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
        <CardContent className="p-8">
          {renderTabContent()}
        </CardContent>
      </Card>

      {/* Help Information */}
      <Card className="border border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Configuration Help</p>
              <p>
                Fields marked with an asterisk (*) are required. Changes will only take effect after clicking "Save Changes". 
                You can export your current configuration as a backup or import previously saved settings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
