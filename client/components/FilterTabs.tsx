import { useState, useEffect } from "react";
import { Search, ChevronDown, Download, Globe, Linkedin, MapPin, CheckCircle, AlertCircle, Loader2, Users, FileText, Link, Upload, UserPlus, FileSpreadsheet } from "lucide-react";
import { useDarkMode } from "@/components/DarkModeProvider";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import ScreeningView from "./ScreeningView";
import { screeningCandidates } from "@/data/screeningCandidates";
import InterviewView, { interviewCandidates as interviewTabCandidates } from "./InterviewView";
import ActivationView from "./ActivationView";
import OnboardingTimeline from "./OnboardingTimeline";
import HiredCompact from "./HiredCompact";
import CandidateList from "./CandidateList";

const tabs = [
  { id: "screening", label: "Screening" },
  { id: "interview", label: "Interview" },
  { id: "activation", label: "Activation" },
  { id: "hired", label: "Hired" },
];

export default function FilterTabs() {
  const { isDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState("screening");

  // Read initial tab from URL hash
  useEffect(() => {
    const applyHash = () => {
      const h = window.location.hash.replace('#','');
      if (["screening","interview","activation","hired"].includes(h)) {
        setActiveTab(h);
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);
  const [selectedStage, setSelectedStage] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPlugAndHireModal, setShowPlugAndHireModal] = useState(false);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncResults, setSyncResults] = useState<any>(null);
  const [hireMode, setHireMode] = useState<"auto-sync" | "file-upload" | "individual" | "ats-integration">("auto-sync");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showIntegrationConfig, setShowIntegrationConfig] = useState(false);
  const [selectedATS, setSelectedATS] = useState<string>("");
  const [atsConfig, setAtsConfig] = useState<any>({});
  const [realTimeSyncEnabled, setRealTimeSyncEnabled] = useState(false);
  const [syncInterval, setSyncInterval] = useState(15); // minutes
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [integrationStatus, setIntegrationStatus] = useState<{[key: string]: 'connected' | 'disconnected' | 'syncing'}>({});
  const [showFieldMapping, setShowFieldMapping] = useState(false);
  const [fieldMapping, setFieldMapping] = useState<{[key: string]: any}>({});
  const [duplicateDetection, setDuplicateDetection] = useState({
    enabled: true,
    matchCriteria: ['email', 'phone', 'fullName'],
    action: 'skip' // 'skip', 'update', 'merge'
  });
  const [gdprSettings, setGdprSettings] = useState({
    dataRetentionDays: 365,
    consentRequired: true,
    anonymizeAfterDays: 1095,
    dataProcessingPurpose: 'recruitment',
    allowDataTransfer: false
  });
  const [validationRules, setValidationRules] = useState({
    emailFormat: true,
    phoneFormat: true,
    requiredFields: ['fullName', 'email'],
    customValidation: true
  });
  const [careerPageIntegration, setCareerPageIntegration] = useState({
    enabled: false,
    endpoint: '',
    syncFrequency: 'hourly',
    autoProcess: true
  });
  const [individualForm, setIndividualForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    experience: "",
    location: "",
    resume: null as File | null
  });

  const jobSources = [
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: Linkedin,
      description: "Import candidates from LinkedIn talent pool",
      connected: true,
      candidateCount: 45,
    },
    {
      id: "internal",
      name: "Internal Career Page",
      icon: Users,
      description: "Import from company career portal",
      connected: true,
      candidateCount: 18,
    },
  ];

  // ATS/HRMS Integration Systems
  const atsHrmsSystems = [
    {
      id: "workday",
      name: "Workday HCM",
      icon: Users,
      description: "Enterprise-grade Human Capital Management",
      category: "HRMS",
      apiEndpoint: "api.workday.com",
      authType: "OAuth 2.0",
      features: ["Candidate Sync", "Real-time Updates", "Profile Mapping"],
      status: integrationStatus.workday || 'disconnected',
      setupComplexity: "Medium"
    },
    {
      id: "greenhouse",
      name: "Greenhouse",
      icon: UserPlus,
      description: "Modern Applicant Tracking System",
      category: "ATS",
      apiEndpoint: "harvest.greenhouse.io",
      authType: "API Key",
      features: ["Application Tracking", "Interview Scheduling", "Candidate Pipeline"],
      status: integrationStatus.greenhouse || 'disconnected',
      setupComplexity: "Easy"
    },
    {
      id: "lever",
      name: "Lever",
      icon: Users,
      description: "Talent acquisition platform",
      category: "ATS",
      apiEndpoint: "api.lever.co",
      authType: "OAuth 2.0",
      features: ["Talent Pipeline", "Interview Management", "Offer Management"],
      status: integrationStatus.lever || 'disconnected',
      setupComplexity: "Medium"
    },
    {
      id: "bamboohr",
      name: "BambooHR",
      icon: Users,
      description: "All-in-one HR software",
      category: "HRMS",
      apiEndpoint: "api.bamboohr.com",
      authType: "API Key",
      features: ["Employee Records", "Onboarding", "Performance Tracking"],
      status: integrationStatus.bamboohr || 'disconnected',
      setupComplexity: "Easy"
    },
    {
      id: "successfactors",
      name: "SAP SuccessFactors",
      icon: Users,
      description: "SAP's cloud-based HCM suite",
      category: "HRMS",
      apiEndpoint: "api.successfactors.com",
      authType: "OAuth 2.0",
      features: ["Talent Management", "Performance & Goals", "Learning & Development"],
      status: integrationStatus.successfactors || 'disconnected',
      setupComplexity: "Complex"
    },
    {
      id: "smartrecruiters",
      name: "SmartRecruiters",
      icon: UserPlus,
      description: "Talent Acquisition Suite",
      category: "ATS",
      apiEndpoint: "api.smartrecruiters.com",
      authType: "OAuth 2.0",
      features: ["Job Distribution", "Candidate Management", "Collaborative Hiring"],
      status: integrationStatus.smartrecruiters || 'disconnected',
      setupComplexity: "Medium"
    },
    {
      id: "custom",
      name: "Custom Integration",
      icon: Link,
      description: "Connect your proprietary system via REST API",
      category: "Custom",
      apiEndpoint: "custom-endpoint",
      authType: "Custom",
      features: ["Flexible Mapping", "Custom Webhooks", "Data Transformation"],
      status: integrationStatus.custom || 'disconnected',
      setupComplexity: "Complex"
    }
  ];

  // EMS Internal Data Structure Mapping
  const emsFieldStructure = {
    personalInfo: {
      fullName: { required: true, type: 'string', validation: /^[a-zA-Z\s]{2,50}$/ },
      firstName: { required: false, type: 'string', validation: /^[a-zA-Z]{1,25}$/ },
      lastName: { required: false, type: 'string', validation: /^[a-zA-Z]{1,25}$/ },
      email: { required: true, type: 'email', validation: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      phone: { required: false, type: 'phone', validation: /^\+?[\d\s\-\(\)]{10,20}$/ },
      dateOfBirth: { required: false, type: 'date', validation: null },
      nationality: { required: false, type: 'string', validation: null }
    },
    contactInfo: {
      address: { required: false, type: 'string', validation: null },
      city: { required: false, type: 'string', validation: null },
      state: { required: false, type: 'string', validation: null },
      zipCode: { required: false, type: 'string', validation: /^\d{5,10}$/ },
      country: { required: false, type: 'string', validation: null },
      linkedinUrl: { required: false, type: 'url', validation: /^https:\/\/(www\.)?linkedin\.com\/.*$/ }
    },
    professionalInfo: {
      currentPosition: { required: false, type: 'string', validation: null },
      currentCompany: { required: false, type: 'string', validation: null },
      totalExperience: { required: false, type: 'number', validation: /^\d{1,2}$/ },
      currentSalary: { required: false, type: 'number', validation: null },
      expectedSalary: { required: false, type: 'number', validation: null },
      noticePeriod: { required: false, type: 'string', validation: null },
      skills: { required: false, type: 'array', validation: null }
    },
    applicationInfo: {
      appliedPosition: { required: true, type: 'string', validation: null },
      applicationDate: { required: true, type: 'date', validation: null },
      applicationStatus: { required: true, type: 'enum', validation: ['screening', 'interview', 'activation', 'hired', 'rejected'] },
      source: { required: true, type: 'string', validation: null },
      resumeUrl: { required: false, type: 'url', validation: null },
      coverLetterUrl: { required: false, type: 'url', validation: null },
      portfolioUrl: { required: false, type: 'url', validation: null }
    },
    complianceInfo: {
      gdprConsent: { required: true, type: 'boolean', validation: null },
      dataProcessingConsent: { required: true, type: 'boolean', validation: null },
      consentDate: { required: true, type: 'date', validation: null },
      dataRetentionPeriod: { required: true, type: 'number', validation: null },
      rightToWithdraw: { required: true, type: 'boolean', validation: null }
    }
  };

  // Default field mappings for common ATS systems
  const defaultFieldMappings = {
    greenhouse: {
      'candidate.name': 'personalInfo.fullName',
      'candidate.email_addresses[0].value': 'personalInfo.email',
      'candidate.phone_numbers[0].value': 'personalInfo.phone',
      'application.jobs[0].name': 'applicationInfo.appliedPosition',
      'application.applied_at': 'applicationInfo.applicationDate',
      'application.status': 'applicationInfo.applicationStatus',
      'candidate.attachments[0].url': 'applicationInfo.resumeUrl'
    },
    workday: {
      'applicant.personalData.nameData.legalName': 'personalInfo.fullName',
      'applicant.personalData.contactData.emailData.emailAddress': 'personalInfo.email',
      'applicant.personalData.contactData.phoneData.phoneNumber': 'personalInfo.phone',
      'application.jobRequisition.jobTitle': 'applicationInfo.appliedPosition',
      'application.applicationDate': 'applicationInfo.applicationDate',
      'application.applicationStatus': 'applicationInfo.applicationStatus'
    },
    lever: {
      'name': 'personalInfo.fullName',
      'emails[0]': 'personalInfo.email',
      'phones[0].value': 'personalInfo.phone',
      'applications[0].posting.text': 'applicationInfo.appliedPosition',
      'applications[0].createdAt': 'applicationInfo.applicationDate',
      'applications[0].stage': 'applicationInfo.applicationStatus'
    }
  };

  const toggleSource = (sourceId: string) => {
    setSelectedSources(prev =>
      prev.includes(sourceId)
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const handlePlugAndHire = () => {
    setShowPlugAndHireModal(true);
  };

  // ATS/HRMS Integration Handlers
  const handleATSConnection = async (atsId: string, config: any) => {
    setIntegrationStatus(prev => ({ ...prev, [atsId]: 'syncing' }));

    try {
      // Simulate API connection
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIntegrationStatus(prev => ({ ...prev, [atsId]: 'connected' }));
      setAtsConfig(prev => ({ ...prev, [atsId]: config }));
      setLastSyncTime(new Date());

      // If real-time sync is enabled, start the sync interval
      if (realTimeSyncEnabled) {
        startRealTimeSync(atsId);
      }
    } catch (error) {
      setIntegrationStatus(prev => ({ ...prev, [atsId]: 'disconnected' }));
      console.error('Failed to connect to ATS:', error);
    }
  };

  const startRealTimeSync = (atsId: string) => {
    const intervalId = setInterval(async () => {
      await syncCandidateProfiles(atsId);
    }, syncInterval * 60 * 1000); // Convert minutes to milliseconds

    // Store interval ID for cleanup
    return intervalId;
  };

  const syncCandidateProfiles = async (atsId: string) => {
    setIntegrationStatus(prev => ({ ...prev, [atsId]: 'syncing' }));

    try {
      // Simulate candidate profile sync
      await new Promise(resolve => setTimeout(resolve, 3000));

      setIntegrationStatus(prev => ({ ...prev, [atsId]: 'connected' }));
      setLastSyncTime(new Date());

      // Update candidate profiles in the background
      console.log(`Synced profiles from ${atsId} at ${new Date().toISOString()}`);
    } catch (error) {
      console.error(`Failed to sync profiles from ${atsId}:`, error);
    }
  };

  const disconnectATS = (atsId: string) => {
    setIntegrationStatus(prev => ({ ...prev, [atsId]: 'disconnected' }));
    setAtsConfig(prev => {
      const newConfig = { ...prev };
      delete newConfig[atsId];
      return newConfig;
    });
  };

  const testConnection = async (atsId: string) => {
    setIntegrationStatus(prev => ({ ...prev, [atsId]: 'syncing' }));

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIntegrationStatus(prev => ({ ...prev, [atsId]: 'connected' }));
      return true;
    } catch (error) {
      setIntegrationStatus(prev => ({ ...prev, [atsId]: 'disconnected' }));
      return false;
    }
  };

  // Enhanced Validation Functions
  const validateFieldData = (fieldPath: string, value: any) => {
    const pathParts = fieldPath.split('.');
    const section = emsFieldStructure[pathParts[0] as keyof typeof emsFieldStructure];
    const field = section?.[pathParts[1] as keyof typeof section];

    if (!field) return { valid: false, error: 'Field not found in EMS structure' };

    // Required field validation
    if (field.required && (!value || value === '')) {
      return { valid: false, error: 'Required field is empty' };
    }

    // Type validation
    if (value && field.validation) {
      if (field.type === 'email' && !field.validation.test(value)) {
        return { valid: false, error: 'Invalid email format' };
      }
      if (field.type === 'phone' && !field.validation.test(value)) {
        return { valid: false, error: 'Invalid phone format' };
      }
      if (field.type === 'string' && !field.validation.test(value)) {
        return { valid: false, error: 'Invalid string format' };
      }
      if (field.type === 'enum' && !field.validation.includes(value)) {
        return { valid: false, error: `Value must be one of: ${field.validation.join(', ')}` };
      }
    }

    return { valid: true, error: null };
  };

  const detectDuplicates = async (candidateData: any) => {
    const { matchCriteria } = duplicateDetection;
    const duplicates = [];

    // Simulate existing candidate database check
    const existingCandidates = [
      { id: 1, email: 'john.doe@example.com', phone: '+1234567890', fullName: 'John Doe' },
      { id: 2, email: 'jane.smith@example.com', phone: '+1234567891', fullName: 'Jane Smith' }
    ];

    for (const existing of existingCandidates) {
      let matchCount = 0;
      let matchDetails = [];

      if (matchCriteria.includes('email') && candidateData.personalInfo?.email === existing.email) {
        matchCount++;
        matchDetails.push('email');
      }
      if (matchCriteria.includes('phone') && candidateData.personalInfo?.phone === existing.phone) {
        matchCount++;
        matchDetails.push('phone');
      }
      if (matchCriteria.includes('fullName') && candidateData.personalInfo?.fullName === existing.fullName) {
        matchCount++;
        matchDetails.push('fullName');
      }

      if (matchCount > 0) {
        duplicates.push({
          existingId: existing.id,
          matchedFields: matchDetails,
          confidence: (matchCount / matchCriteria.length) * 100
        });
      }
    }

    return duplicates;
  };

  const mapExternalToEMS = (externalData: any, systemId: string) => {
    const mapping = defaultFieldMappings[systemId as keyof typeof defaultFieldMappings] || {};
    const mappedData: any = {};

    Object.entries(mapping).forEach(([externalPath, emsPath]) => {
      const value = getNestedValue(externalData, externalPath);
      if (value !== undefined) {
        setNestedValue(mappedData, emsPath, value);
      }
    });

    // Add GDPR compliance data
    mappedData.complianceInfo = {
      gdprConsent: gdprSettings.consentRequired,
      dataProcessingConsent: true,
      consentDate: new Date().toISOString(),
      dataRetentionPeriod: gdprSettings.dataRetentionDays,
      rightToWithdraw: true
    };

    return mappedData;
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split(/[\.\[\]]+/).filter(Boolean).reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  };

  const setNestedValue = (obj: any, path: string, value: any) => {
    const keys = path.split('.');
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!(keys[i] in current)) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
  };

  const processGDPRCompliance = async (candidateData: any) => {
    // Ensure GDPR compliance
    if (gdprSettings.consentRequired && !candidateData.complianceInfo?.gdprConsent) {
      throw new Error('GDPR consent is required but not provided');
    }

    // Set data retention schedule
    const retentionDate = new Date();
    retentionDate.setDate(retentionDate.getDate() + gdprSettings.dataRetentionDays);

    candidateData.complianceInfo = {
      ...candidateData.complianceInfo,
      dataRetentionUntil: retentionDate.toISOString(),
      processingPurpose: gdprSettings.dataProcessingPurpose,
      canTransferData: gdprSettings.allowDataTransfer
    };

    return candidateData;
  };

  const startSync = async () => {
    setIsSyncing(true);
    setSyncProgress(0);

    // Simulate sync process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setSyncProgress(i);
    }

    // Mock sync results
    setSyncResults({
      totalCandidates: 98,
      newCandidates: 23,
      updatedProfiles: 15,
      duplicatesSkipped: 8,
      sources: selectedSources.map(id => {
        const source = jobSources.find(s => s.id === id);
        return {
          name: source?.name,
          imported: Math.floor(Math.random() * source!.candidateCount),
          total: source?.candidateCount,
        };
      }),
    });

    setIsSyncing(false);
  };

  const resetSync = () => {
    setSyncResults(null);
    setSyncProgress(0);
    setSelectedSources([]);
    setHireMode("auto-sync");
    setUploadedFile(null);
    setIndividualForm({
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      experience: "",
      location: "",
      resume: null
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type.includes("csv") || file.type.includes("excel") || file.type.includes("spreadsheet"))) {
      setUploadedFile(file);
    }
  };

  const handleIndividualFormChange = (field: string, value: string) => {
    setIndividualForm(prev => ({ ...prev, [field]: value }));
  };

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIndividualForm(prev => ({ ...prev, resume: file }));
    }
  };

  const processFileUpload = async () => {
    setIsSyncing(true);
    setSyncProgress(0);

    // Simulate file processing
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setSyncProgress(i);
    }

    // Mock results for file upload
    setSyncResults({
      totalCandidates: 45,
      newCandidates: 41,
      updatedProfiles: 4,
      duplicatesSkipped: 3,
      source: "CSV/Excel File",
      fileName: uploadedFile?.name
    });

    setIsSyncing(false);
  };

  const submitIndividualCandidate = async () => {
    setIsSyncing(true);
    setSyncProgress(0);

    // Simulate individual candidate processing
    for (let i = 0; i <= 100; i += 25) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setSyncProgress(i);
    }

    // Mock results for individual entry
    setSyncResults({
      totalCandidates: 1,
      newCandidates: 1,
      updatedProfiles: 0,
      duplicatesSkipped: 0,
      source: "Individual Entry",
      candidateName: individualForm.name
    });

    setIsSyncing(false);
  };

  return (
    <div className="space-y-3">
      {/* Compact Rectangular Block Stage Headers */}
      <div className="w-full">
        <div className="bg-white">
          <div className="flex items-end justify-start gap-4 border-b border-gray-200">
            {tabs.map((tab) => {
              const count =
                tab.id === "screening" ? screeningCandidates.length :
                tab.id === "interview" ? interviewTabCandidates.length :
                tab.id === "activation" ? 0 :
                0;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative pb-2 px-4 text-sm font-semibold transition-colors rounded-t
                    ${isActive ? 'text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <span className="mr-2 whitespace-nowrap">{tab.label}</span>
                  <span className={`inline-flex items-center justify-center h-6 px-2 rounded-full border text-xs
                    ${isActive ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-300'}`}>
                    {count}
                  </span>
                  {isActive && <span className="absolute left-0 -bottom-[1px] h-0.5 w-full bg-blue-600" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search and Filter Controls - Only show for hiring and screening */}
      {(activeTab === "screening") && (
        <div className="flex flex-col gap-2 mb-4">
          {/* Sequential Metrics cards */}


          {false && (
            <Dialog open={showPlugAndHireModal} onOpenChange={setShowPlugAndHireModal}>
              <DialogTrigger asChild>
                <Button onClick={handlePlugAndHire} className="bg-green-500 hover:bg-green-600 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Plug and Hire
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Plug and Hire - Import Candidates
                  </DialogTitle>
                  <DialogDescription>
                    Import candidate profiles using auto-sync from job platforms or CSV/Excel upload.
                  </DialogDescription>
                </DialogHeader>

                {/* Mode Selection */}
                {!syncResults && !isSyncing && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Select Import Method</h3>
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant={hireMode === "auto-sync" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setHireMode("auto-sync")}
                        className="flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Auto-Sync
                      </Button>

                      <Button
                        variant={hireMode === "file-upload" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setHireMode("file-upload")}
                        className="flex items-center gap-2"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        CSV/Excel Upload
                      </Button>

                      <Button
                        variant={hireMode === "ats-integration" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setHireMode("ats-integration")}
                        className="flex items-center gap-2"
                      >
                        <Link className="w-4 h-4" />
                        ATS/HRMS Integration
                      </Button>
                    </div>
                  </div>
                )}

                {!syncResults ? (
                  <div className="space-y-6">
                    {/* Auto-Sync Mode */}
                    {hireMode === "auto-sync" && (
                      <>
                        {/* Source Selection */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Select Job Sources</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {jobSources.map((source) => {
                          const Icon = source.icon;
                          const isSelected = selectedSources.includes(source.id);
                          return (
                            <Card
                              key={source.id}
                              className={`cursor-pointer transition-all ${
                                isSelected ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                              } ${!source.connected ? "opacity-60" : ""}`}
                              onClick={() => source.connected && toggleSource(source.id)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <div className={`p-2 rounded-lg ${isSelected ? "bg-blue-200" : "bg-gray-100"}`}>
                                    <Icon className={`w-5 h-5 ${isSelected ? "text-blue-700" : "text-gray-600"}`} />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-semibold">{source.name}</h4>
                                      <Badge
                                        variant={source.connected ? "default" : "secondary"}
                                        className="text-xs"
                                      >
                                        {source.connected ? "Connected" : "Not Connected"}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{source.description}</p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <Users className="w-3 h-3" />
                                      <span>{source.candidateCount} candidates available</span>
                                    </div>
                                  </div>
                                  {source.connected && (
                                    <input
                                      type="checkbox"
                                      checked={isSelected}
                                      onChange={() => toggleSource(source.id)}
                                      className="mt-1"
                                    />
                                  )}
                                </div>
                                {!source.connected && (
                                  <div className="mt-3 pt-3 border-t">
                                    <Button variant="outline" size="sm" className="w-full">
                                      <Link className="w-3 h-3 mr-1" />
                                      Connect Account
                                    </Button>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>

                      </>
                    )}

                    {/* File Upload Mode */}
                    {hireMode === "file-upload" && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Upload CSV/Excel File</h3>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            {!uploadedFile ? (
                              <>
                                <FileSpreadsheet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h4 className="text-lg font-semibold mb-2">Upload Candidate File</h4>
                                <p className="text-gray-600 mb-4">Choose a CSV or Excel file containing candidate information</p>
                                <input
                                  type="file"
                                  accept=".csv,.xlsx,.xls"
                                  onChange={handleFileUpload}
                                  className="hidden"
                                  id="file-upload"
                                />
                                <label htmlFor="file-upload">
                                  <Button variant="outline" className="cursor-pointer" asChild>
                                    <span>
                                      <Upload className="w-4 h-4 mr-2" />
                                      Choose File
                                    </span>
                                  </Button>
                                </label>
                                <p className="text-xs text-gray-500 mt-2">Supported formats: CSV, XLSX, XLS (Max 10MB)</p>
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                                <h4 className="text-lg font-semibold mb-2">File Ready for Import</h4>
                                <p className="text-gray-600 mb-2">{uploadedFile.name}</p>
                                <p className="text-sm text-gray-500">File size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setUploadedFile(null)}
                                  className="mt-3"
                                >
                                  Choose Different File
                                </Button>
                              </>
                            )}
                          </div>
                        </div>

                        {uploadedFile && (
                          <div>
                            <h3 className="text-lg font-semibold mb-4">Expected File Format</h3>
                            <Card>
                              <CardContent className="p-4">
                                <div className="text-sm">
                                  <p className="font-medium mb-2">Your CSV/Excel file should contain these columns:</p>
                                  <div className="grid grid-cols-2 gap-4">
                                    <ul className="space-y-1 text-gray-600">
                                      <li>• Full Name (required)</li>
                                      <li>• Email Address (required)</li>
                                      <li>• Phone Number</li>
                                      <li>• Position/Role</li>
                                    </ul>
                                    <ul className="space-y-1 text-gray-600">
                                      <li>• Department</li>
                                      <li>• Experience Level</li>
                                      <li>• Location</li>
                                      <li>• Resume URL (optional)</li>
                                    </ul>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ATS/HRMS Integration Mode */}
                    {hireMode === "ats-integration" && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Enterprise ATS/HRMS Integration</h3>
                          <p className="text-gray-600 mb-6">
                            Connect your existing Applicant Tracking System or Human Resource Management System
                            for seamless candidate profile synchronization with real-time updates.
                          </p>
                        </div>

                        {/* Real-time Sync Settings */}
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="font-semibold">Real-time Synchronization</h4>
                                <p className="text-sm text-gray-600">Automatically sync candidate profiles as they are updated</p>
                              </div>
                              <Switch
                                checked={realTimeSyncEnabled}
                                onCheckedChange={setRealTimeSyncEnabled}
                              />
                            </div>

                            {realTimeSyncEnabled && (
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Sync Interval</label>
                                  <Select value={syncInterval.toString()} onValueChange={(val) => setSyncInterval(parseInt(val))}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="5">Every 5 minutes</SelectItem>
                                      <SelectItem value="15">Every 15 minutes</SelectItem>
                                      <SelectItem value="30">Every 30 minutes</SelectItem>
                                      <SelectItem value="60">Every hour</SelectItem>
                                      <SelectItem value="240">Every 4 hours</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Last Sync</label>
                                  <div className="text-sm text-gray-600 mt-2">
                                    {lastSyncTime ? lastSyncTime.toLocaleString() : 'Never'}
                                  </div>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>

                        {/* Field Mapping Configuration */}
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="font-semibold">Intelligent Field Mapping</h4>
                                <p className="text-sm text-gray-600">Map external system fields to EMS data structure</p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowFieldMapping(!showFieldMapping)}
                              >
                                {showFieldMapping ? 'Hide' : 'Configure'} Mapping
                              </Button>
                            </div>

                            {showFieldMapping && (
                              <div className="space-y-4 mt-4 border-t pt-4">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  {/* EMS Data Structure */}
                                  <div>
                                    <h5 className="font-medium mb-3">EMS Data Structure</h5>
                                    <div className="space-y-2 max-h-64 overflow-y-auto">
                                      {Object.entries(emsFieldStructure).map(([section, fields]) => (
                                        <div key={section} className="border rounded p-2">
                                          <h6 className="font-medium text-sm capitalize mb-2">{section.replace(/([A-Z])/g, ' $1')}</h6>
                                          {Object.entries(fields).map(([fieldName, fieldConfig]: [string, any]) => (
                                            <div key={fieldName} className="text-xs text-gray-600 ml-2">
                                              • {fieldName} ({fieldConfig.type})
                                              {fieldConfig.required && <span className="text-red-500">*</span>}
                                            </div>
                                          ))}
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Auto-Mapping Preview */}
                                  <div>
                                    <h5 className="font-medium mb-3">Auto-Mapping Preview</h5>
                                    <div className="text-sm space-y-2">
                                      <div className="p-2 bg-green-50 rounded">
                                        <div className="text-green-800 font-medium">✓ Automatically Mapped Fields</div>
                                        <div className="text-green-600 text-xs mt-1">
                                          • External "name" → EMS "personalInfo.fullName"<br/>
                                          • External "email" → EMS "personalInfo.email"<br/>
                                          �� External "phone" → EMS "personalInfo.phone"<br/>
                                          • External "position" → EMS "applicationInfo.appliedPosition"
                                        </div>
                                      </div>
                                      <div className="p-2 bg-yellow-50 rounded">
                                        <div className="text-yellow-800 font-medium">⚠ Requires Manual Mapping</div>
                                        <div className="text-yellow-600 text-xs mt-1">
                                          • Custom fields from external system<br/>
                                          • Non-standard field names<br/>
                                          • Complex nested structures
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>

                        {/* GDPR Compliance Settings */}
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-4">GDPR & Data Privacy Compliance</h4>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">Data Retention Period (days)</label>
                                  <Select
                                    value={gdprSettings.dataRetentionDays.toString()}
                                    onValueChange={(val) => setGdprSettings(prev => ({...prev, dataRetentionDays: parseInt(val)}))}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="90">90 days</SelectItem>
                                      <SelectItem value="180">180 days</SelectItem>
                                      <SelectItem value="365">1 year</SelectItem>
                                      <SelectItem value="730">2 years</SelectItem>
                                      <SelectItem value="1095">3 years</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-sm font-medium">Require Explicit Consent</div>
                                    <div className="text-xs text-gray-600">Enforce GDPR consent before processing</div>
                                  </div>
                                  <Switch
                                    checked={gdprSettings.consentRequired}
                                    onCheckedChange={(checked) => setGdprSettings(prev => ({...prev, consentRequired: checked}))}
                                  />
                                </div>

                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-sm font-medium">Allow Data Transfer</div>
                                    <div className="text-xs text-gray-600">Enable cross-border data transfers</div>
                                  </div>
                                  <Switch
                                    checked={gdprSettings.allowDataTransfer}
                                    onCheckedChange={(checked) => setGdprSettings(prev => ({...prev, allowDataTransfer: checked}))}
                                  />
                                </div>
                              </div>

                              <div className="space-y-3">
                                <div className="p-3 bg-blue-50 rounded">
                                  <h5 className="font-medium text-blue-800 text-sm">Compliance Features</h5>
                                  <ul className="text-xs text-blue-600 mt-2 space-y-1">
                                    <li>✓ Right to be forgotten (data deletion)</li>
                                    <li>✓ Data portability (export candidate data)</li>
                                    <li>✓ Consent management & tracking</li>
                                    <li>✓ Automated data anonymization</li>
                                    <li>✓ Audit trail for all data operations</li>
                                  </ul>
                                </div>

                                <div className="p-3 bg-green-50 rounded">
                                  <h5 className="font-medium text-green-800 text-sm">Data Protection</h5>
                                  <ul className="text-xs text-green-600 mt-2 space-y-1">
                                    <li>✓ End-to-end encryption in transit</li>
                                    <li>✓ Encrypted storage at rest</li>
                                    <li>✓ Access controls & role-based permissions</li>
                                    <li>✓ Regular security audits</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Duplicate Detection & Validation */}
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-4">Duplicate Detection & Data Validation</h4>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-sm font-medium">Enable Duplicate Detection</div>
                                    <div className="text-xs text-gray-600">Prevent duplicate candidate profiles</div>
                                  </div>
                                  <Switch
                                    checked={duplicateDetection.enabled}
                                    onCheckedChange={(checked) => setDuplicateDetection(prev => ({...prev, enabled: checked}))}
                                  />
                                </div>

                                {duplicateDetection.enabled && (
                                  <>
                                    <div>
                                      <label className="text-sm font-medium">Match Criteria</label>
                                      <div className="space-y-2 mt-2">
                                        {['email', 'phone', 'fullName'].map((criteria) => (
                                          <label key={criteria} className="flex items-center space-x-2">
                                            <input
                                              type="checkbox"
                                              checked={duplicateDetection.matchCriteria.includes(criteria)}
                                              onChange={(e) => {
                                                const newCriteria = e.target.checked
                                                  ? [...duplicateDetection.matchCriteria, criteria]
                                                  : duplicateDetection.matchCriteria.filter(c => c !== criteria);
                                                setDuplicateDetection(prev => ({...prev, matchCriteria: newCriteria}));
                                              }}
                                              className="rounded"
                                            />
                                            <span className="text-sm capitalize">{criteria}</span>
                                          </label>
                                        ))}
                                      </div>
                                    </div>

                                    <div>
                                      <label className="text-sm font-medium">Action on Duplicate</label>
                                      <Select
                                        value={duplicateDetection.action}
                                        onValueChange={(val) => setDuplicateDetection(prev => ({...prev, action: val}))}
                                      >
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="skip">Skip duplicate</SelectItem>
                                          <SelectItem value="update">Update existing</SelectItem>
                                          <SelectItem value="merge">Merge data</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </>
                                )}
                              </div>

                              <div className="space-y-4">
                                <h5 className="font-medium">Validation Rules</h5>
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">Email Format Validation</span>
                                    <Switch
                                      checked={validationRules.emailFormat}
                                      onCheckedChange={(checked) => setValidationRules(prev => ({...prev, emailFormat: checked}))}
                                    />
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">Phone Format Validation</span>
                                    <Switch
                                      checked={validationRules.phoneFormat}
                                      onCheckedChange={(checked) => setValidationRules(prev => ({...prev, phoneFormat: checked}))}
                                    />
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">Custom Validation Rules</span>
                                    <Switch
                                      checked={validationRules.customValidation}
                                      onCheckedChange={(checked) => setValidationRules(prev => ({...prev, customValidation: checked}))}
                                    />
                                  </div>
                                </div>

                                <div className="p-3 bg-gray-50 rounded">
                                  <h6 className="font-medium text-sm mb-2">Required Fields</h6>
                                  <div className="flex flex-wrap gap-2">
                                    {validationRules.requiredFields.map((field) => (
                                      <Badge key={field} variant="secondary" className="text-xs">
                                        {field}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Career Page Integration */}
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-4">Internal Career Page Integration</h4>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-sm font-medium">Auto-Import from Career Page</div>
                                  <div className="text-xs text-gray-600">Automatically import applications from company career portal</div>
                                </div>
                                <Switch
                                  checked={careerPageIntegration.enabled}
                                  onCheckedChange={(checked) => setCareerPageIntegration(prev => ({...prev, enabled: checked}))}
                                />
                              </div>

                              {careerPageIntegration.enabled && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Career Page API Endpoint</label>
                                    <Input
                                      value={careerPageIntegration.endpoint}
                                      onChange={(e) => setCareerPageIntegration(prev => ({...prev, endpoint: e.target.value}))}
                                      placeholder="https://careers.company.com/api/applications"
                                      className="mt-1"
                                    />
                                  </div>

                                  <div>
                                    <label className="text-sm font-medium">Sync Frequency</label>
                                    <Select
                                      value={careerPageIntegration.syncFrequency}
                                      onValueChange={(val) => setCareerPageIntegration(prev => ({...prev, syncFrequency: val}))}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="realtime">Real-time</SelectItem>
                                        <SelectItem value="hourly">Every hour</SelectItem>
                                        <SelectItem value="daily">Daily</SelectItem>
                                        <SelectItem value="weekly">Weekly</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>

                        {/* ATS/HRMS Systems Grid */}
                        <div>
                          <h4 className="font-semibold mb-4">Available ATS/HRMS Systems</h4>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {atsHrmsSystems.map((system) => {
                              const Icon = system.icon;
                              const isConnected = system.status === 'connected';
                              const isSyncing = system.status === 'syncing';

                              return (
                                <Card
                                  key={system.id}
                                  className={`cursor-pointer transition-all ${
                                    isConnected ? "ring-2 ring-green-500 bg-green-50" :
                                    isSyncing ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                                  }`}
                                >
                                  <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                      <div className={`p-2 rounded-lg ${
                                        isConnected ? "bg-green-200" :
                                        isSyncing ? "bg-blue-200" : "bg-gray-100"
                                      }`}>
                                        {isSyncing ? (
                                          <Loader2 className="w-5 h-5 text-blue-700 animate-spin" />
                                        ) : (
                                          <Icon className={`w-5 h-5 ${
                                            isConnected ? "text-green-700" : "text-gray-600"
                                          }`} />
                                        )}
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <h4 className="font-semibold">{system.name}</h4>
                                          <Badge
                                            variant={isConnected ? "default" : isSyncing ? "secondary" : "outline"}
                                            className="text-xs"
                                          >
                                            {isSyncing ? "Connecting..." :
                                             isConnected ? "Connected" : "Not Connected"}
                                          </Badge>
                                          <Badge variant="outline" className="text-xs">
                                            {system.category}
                                          </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">{system.description}</p>
                                        <div className="text-xs text-gray-500 space-y-1">
                                          <div>API: {system.apiEndpoint}</div>
                                          <div>Auth: {system.authType}</div>
                                          <div>Setup: {system.setupComplexity}</div>
                                        </div>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                          {system.features.map((feature) => (
                                            <Badge key={feature} variant="outline" className="text-xs">
                                              {feature}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t flex gap-2">
                                      {isConnected ? (
                                        <>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => syncCandidateProfiles(system.id)}
                                            disabled={isSyncing}
                                          >
                                            <Download className="w-3 h-3 mr-1" />
                                            Sync Now
                                          </Button>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => testConnection(system.id)}
                                            disabled={isSyncing}
                                          >
                                            Test
                                          </Button>
                                          <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => disconnectATS(system.id)}
                                            disabled={isSyncing}
                                          >
                                            Disconnect
                                          </Button>
                                        </>
                                      ) : (
                                        <Button
                                          variant="default"
                                          size="sm"
                                          className="w-full"
                                          onClick={() => {
                                            // Open connection modal/form
                                            setSelectedATS(system.id);
                                            setShowIntegrationConfig(true);
                                          }}
                                          disabled={isSyncing}
                                        >
                                          <Link className="w-3 h-3 mr-1" />
                                          Configure Integration
                                        </Button>
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>
                              );
                            })}
                          </div>
                        </div>

                        {/* Integration Status Summary */}
                        {Object.keys(integrationStatus).some(key => integrationStatus[key] === 'connected') && (
                          <Card>
                            <CardContent className="p-4">
                              <h4 className="font-semibold mb-3">Active Integrations</h4>
                              <div className="space-y-2">
                                {Object.entries(integrationStatus)
                                  .filter(([_, status]) => status === 'connected')
                                  .map(([systemId, _]) => {
                                    const system = atsHrmsSystems.find(s => s.id === systemId);
                                    return system ? (
                                      <div key={systemId} className="flex items-center justify-between text-sm">
                                        <span>{system.name}</span>
                                        <Badge variant="default" className="text-xs">
                                          {realTimeSyncEnabled ? `Auto-sync (${syncInterval}min)` : 'Manual sync'}
                                        </Badge>
                                      </div>
                                    ) : null;
                                  })}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Sync Results */
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Import Completed Successfully!</h3>
                      <p className="text-gray-600">
                        Candidate profiles have been imported and mapped to your EMS system.
                      </p>
                    </div>

                    {/* Results Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-blue-600">{syncResults.totalCandidates}</div>
                          <div className="text-sm text-gray-600">Total Processed</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-green-600">{syncResults.newCandidates}</div>
                          <div className="text-sm text-gray-600">New Candidates</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-orange-600">{syncResults.updatedProfiles}</div>
                          <div className="text-sm text-gray-600">Updated Profiles</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-gray-600">{syncResults.duplicatesSkipped}</div>
                          <div className="text-sm text-gray-600">Duplicates Skipped</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Source Breakdown */}
                    <div>
                      <h4 className="font-semibold mb-3">Import Details</h4>
                      <div className="space-y-3">
                        {hireMode === "auto-sync" && syncResults.sources && (
                          syncResults.sources.map((source: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <span className="font-medium">{source.name}</span>
                              <span className="text-sm text-gray-600">
                                {source.imported} of {source.total} candidates imported
                              </span>
                            </div>
                          ))
                        )}
                        {hireMode === "file-upload" && (
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium">Source: {syncResults.source}</span>
                            <span className="text-sm text-gray-600">
                              File: {syncResults.fileName}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Sync Progress */}
                {isSyncing && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
                      <p className="font-medium">Syncing candidate profiles...</p>
                      <p className="text-sm text-gray-600">This may take a few minutes depending on the number of candidates.</p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{syncProgress}%</span>
                      </div>
                      <Progress value={syncProgress} className="h-2" />
                    </div>
                  </div>
                )}

                <DialogFooter className="flex gap-2">
                  {!syncResults && !isSyncing && (
                    <>
                      <Button variant="outline" onClick={() => setShowPlugAndHireModal(false)}>
                        Cancel
                      </Button>
                      {hireMode === "auto-sync" && (
                        <Button
                          onClick={startSync}
                          disabled={selectedSources.length === 0}
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Start Sync ({selectedSources.length} sources)
                        </Button>
                      )}
                      {hireMode === "file-upload" && (
                        <Button
                          onClick={processFileUpload}
                          disabled={!uploadedFile}
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Import File
                        </Button>
                      )}
                    </>
                  )}
                  {syncResults && (
                    <>
                      <Button variant="outline" onClick={resetSync}>
                        Sync More Sources
                      </Button>
                      <Button onClick={() => setShowPlugAndHireModal(false)}>
                        Close
                      </Button>
                    </>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}

      {/* Metrics cards for Screening (moved below search/filter) */}

      {/* Interview Metrics under header */}

      {/* Conditional Content Based on Active Tab */}
      <div>
        {activeTab === "screening" && <ScreeningView searchQuery={searchQuery} selectedStage={selectedStage} />}
        {activeTab === "interview" && <InterviewView searchQuery={searchQuery} selectedStage={selectedStage} />}
        {activeTab === "activation" && <ActivationView searchQuery={searchQuery} selectedStage={selectedStage} />}
        {activeTab === "hired" && <HiredCompact />}
      </div>
    </div>
  );
}
