import { useState } from "react";
import { Search, ChevronDown, Download, Globe, Linkedin, MapPin, CheckCircle, AlertCircle, Loader2, Users, FileText, Link, Upload, UserPlus, FileSpreadsheet } from "lucide-react";
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
import InterviewView from "./InterviewView";
import ActivationView from "./ActivationView";
import HiredView from "./HiredView";
import CandidateList from "./CandidateList";

const tabs = [
  { id: "hiring", label: "Hiring" },
  { id: "screening", label: "Screening" },
  { id: "interview", label: "Interview" },
  { id: "activation", label: "Activation" },
  { id: "hired", label: "Hired" },
];

export default function FilterTabs() {
  const [activeTab, setActiveTab] = useState("hiring");
  const [selectedStage, setSelectedStage] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPlugAndHireModal, setShowPlugAndHireModal] = useState(false);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncResults, setSyncResults] = useState<any>(null);
  const [hireMode, setHireMode] = useState<"auto-sync" | "file-upload" | "individual">("auto-sync");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
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
      id: "indeed",
      name: "Indeed",
      icon: Globe,
      description: "Sync applications from Indeed postings",
      connected: false,
      candidateCount: 23,
    },
    {
      id: "internal",
      name: "Internal Career Page",
      icon: Users,
      description: "Import from company career portal",
      connected: true,
      candidateCount: 18,
    },
    {
      id: "monster",
      name: "Monster.com",
      icon: Globe,
      description: "Access Monster job board applications",
      connected: false,
      candidateCount: 12,
    },
  ];

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
    <div className="space-y-6">
      {/* Button Tabs */}
      <div className="w-full">
        <div className="items-center justify-center rounded-md text-muted-foreground grid w-full grid-cols-5 bg-muted p-1 h-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant="ghost"
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-2.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 py-2.5 px-4 ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Search and Filter Controls - Only show for hiring and screening */}
      {(activeTab === "hiring" || activeTab === "screening") && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search candidates..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={selectedStage} onValueChange={setSelectedStage}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Application Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="screening">Screening</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="activation">Activation</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={showPlugAndHireModal} onOpenChange={setShowPlugAndHireModal}>
            <DialogTrigger asChild>
              <Button onClick={handlePlugAndHire} className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white">
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
                  Import candidate profiles using auto-sync from job platforms, CSV/Excel upload, or individual entry.
                </DialogDescription>
              </DialogHeader>

              {/* Mode Selection */}
              {!syncResults && !isSyncing && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Select Import Method</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card
                      className={`cursor-pointer transition-all ${
                        hireMode === "auto-sync" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                      }`}
                      onClick={() => setHireMode("auto-sync")}
                    >
                      <CardContent className="p-4 text-center">
                        <Download className={`w-8 h-8 mx-auto mb-2 ${hireMode === "auto-sync" ? "text-blue-600" : "text-gray-600"}`} />
                        <h4 className="font-semibold mb-1">Auto-Sync</h4>
                        <p className="text-sm text-gray-600">Import from job platforms</p>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-all ${
                        hireMode === "file-upload" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                      }`}
                      onClick={() => setHireMode("file-upload")}
                    >
                      <CardContent className="p-4 text-center">
                        <FileSpreadsheet className={`w-8 h-8 mx-auto mb-2 ${hireMode === "file-upload" ? "text-blue-600" : "text-gray-600"}`} />
                        <h4 className="font-semibold mb-1">CSV/Excel Upload</h4>
                        <p className="text-sm text-gray-600">Bulk import from file</p>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-all ${
                        hireMode === "individual" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                      }`}
                      onClick={() => setHireMode("individual")}
                    >
                      <CardContent className="p-4 text-center">
                        <UserPlus className={`w-8 h-8 mx-auto mb-2 ${hireMode === "individual" ? "text-blue-600" : "text-gray-600"}`} />
                        <h4 className="font-semibold mb-1">Individual Entry</h4>
                        <p className="text-sm text-gray-600">Add one candidate manually</p>
                      </CardContent>
                    </Card>
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

                  {/* Field Mapping Preview */}
                  {selectedSources.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Field Mapping Preview</h3>
                      <Card>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <h4 className="font-medium mb-2">Source Fields</h4>
                              <ul className="space-y-1 text-gray-600">
                                <li>• Full Name</li>
                                <li>• Email Address</li>
                                <li>• Phone Number</li>
                                <li>• Resume/CV</li>
                                <li>• Location</li>
                                <li>• Experience Level</li>
                              </ul>
                            </div>
                            <div className="flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                                  <MapPin className="w-4 h-4 text-blue-600" />
                                </div>
                                <span className="text-xs text-gray-500">Auto Mapping</span>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">EMS Fields</h4>
                              <ul className="space-y-1 text-gray-600">
                                <li>• Employee Name</li>
                                <li>• Contact Email</li>
                                <li>• Contact Number</li>
                                <li>• Document Upload</li>
                                <li>• Work Location</li>
                                <li>• Position Level</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Sync Settings */}
                  {selectedSources.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Sync Settings</h3>
                      <Card>
                        <CardContent className="p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="font-medium">Skip Duplicates</label>
                              <p className="text-sm text-gray-600">Avoid importing candidates that already exist in the system</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="font-medium">Auto-assign Application Stage</label>
                              <p className="text-sm text-gray-600">Automatically set imported candidates to "Screening" stage</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="font-medium">Send Welcome Email</label>
                              <p className="text-sm text-gray-600">Automatically send welcome emails to new candidates</p>
                            </div>
                            <Switch />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
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

                  {/* Individual Entry Mode */}
                  {hireMode === "individual" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Add Individual Candidate</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                              value={individualForm.name}
                              onChange={(e) => handleIndividualFormChange("name", e.target.value)}
                              placeholder="Enter candidate's full name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="email"
                              value={individualForm.email}
                              onChange={(e) => handleIndividualFormChange("email", e.target.value)}
                              placeholder="candidate@email.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number
                            </label>
                            <Input
                              value={individualForm.phone}
                              onChange={(e) => handleIndividualFormChange("phone", e.target.value)}
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Position/Role
                            </label>
                            <Input
                              value={individualForm.position}
                              onChange={(e) => handleIndividualFormChange("position", e.target.value)}
                              placeholder="e.g., Software Engineer"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Department
                            </label>
                            <Select
                              value={individualForm.department}
                              onValueChange={(value) => handleIndividualFormChange("department", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select department" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="engineering">Engineering</SelectItem>
                                <SelectItem value="product">Product</SelectItem>
                                <SelectItem value="design">Design</SelectItem>
                                <SelectItem value="marketing">Marketing</SelectItem>
                                <SelectItem value="sales">Sales</SelectItem>
                                <SelectItem value="hr">Human Resources</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                                <SelectItem value="operations">Operations</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Experience Level
                            </label>
                            <Select
                              value={individualForm.experience}
                              onValueChange={(value) => handleIndividualFormChange("experience", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                                <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                                <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                                <SelectItem value="lead">Lead/Principal (10+ years)</SelectItem>
                                <SelectItem value="executive">Executive</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Location
                            </label>
                            <Input
                              value={individualForm.location}
                              onChange={(e) => handleIndividualFormChange("location", e.target.value)}
                              placeholder="City, State/Country"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Resume/CV
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                              {!individualForm.resume ? (
                                <>
                                  <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleResumeUpload}
                                    className="hidden"
                                    id="resume-upload"
                                  />
                                  <label htmlFor="resume-upload" className="cursor-pointer">
                                    <div className="text-center">
                                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                      <p className="text-sm text-gray-600">Click to upload resume</p>
                                      <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
                                    </div>
                                  </label>
                                </>
                              ) : (
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <FileText className="w-5 h-5 text-green-600 mr-2" />
                                    <span className="text-sm font-medium">{individualForm.resume.name}</span>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIndividualForm(prev => ({ ...prev, resume: null }))}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
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
                    <h3 className="text-xl font-semibold mb-2">
                      {hireMode === "individual" ? "Candidate Added Successfully!" : "Import Completed Successfully!"}
                    </h3>
                    <p className="text-gray-600">
                      {hireMode === "individual"
                        ? "The candidate has been added to your EMS system."
                        : "Candidate profiles have been imported and mapped to your EMS system."
                      }
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
                      {hireMode === "individual" && (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">Source: {syncResults.source}</span>
                          <span className="text-sm text-gray-600">
                            Candidate: {syncResults.candidateName}
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
                        className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Start Sync ({selectedSources.length} sources)
                      </Button>
                    )}
                    {hireMode === "file-upload" && (
                      <Button
                        onClick={processFileUpload}
                        disabled={!uploadedFile}
                        className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Import File
                      </Button>
                    )}
                    {hireMode === "individual" && (
                      <Button
                        onClick={submitIndividualCandidate}
                        disabled={!individualForm.name || !individualForm.email}
                        className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Candidate
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
        </div>
      )}

      {/* Conditional Content Based on Active Tab */}
      <div>
        {activeTab === "screening" && <ScreeningView searchQuery={searchQuery} selectedStage={selectedStage} />}
        {activeTab === "interview" && <InterviewView searchQuery={searchQuery} selectedStage={selectedStage} />}
        {activeTab === "activation" && <ActivationView searchQuery={searchQuery} selectedStage={selectedStage} />}
        {activeTab === "hired" && <HiredView searchQuery={searchQuery} selectedStage={selectedStage} />}
        {activeTab === "hiring" && <CandidateList searchQuery={searchQuery} selectedStage={selectedStage} />}
      </div>
    </div>
  );
}
