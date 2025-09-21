import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  Users,
  UserCheck,
  UserX,
  Clock,
  MoreVertical,
  ChevronRight,
  BarChart3,
  Download,
  FileText,
  MapPin,
  Briefcase,
  User,
  Mail,
  Phone,
  DollarSign,
  Award,
  GraduationCap,
  Building
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// Extended candidate interface with pipeline stages
interface PipelineCandidate {
  id: string;
  name: string;
  position: string;
  jobId: string;
  email: string;
  phone: string;
  stage: "screening" | "interview" | "activation" | "hired";
  status: "pending" | "in-progress" | "completed" | "rejected";
  progress: number; // 0-100 percentage
  appliedDate: string;
  location: string;
  avatar?: string;
}

// Mock data with candidates across all pipeline stages
function formatDateMDY(dateStr: string): string {
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
  }
  const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) return `${m[2]}-${m[3]}-${m[1]}`;
  const m2 = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (m2) return dateStr;
  return dateStr;
}

const allCandidates: PipelineCandidate[] = [
  {
    id: "1",
    name: "Emily Rodriguez",
    position: "UX Designer",
    jobId: "JOB-101",
    email: "emily.rodriguez@gmail.com",
    phone: "123-456-791",
    stage: "screening",
    status: "pending",
    progress: 25,
    appliedDate: "2024-01-15",
    location: "San Francisco, CA"
  },
  {
    id: "2",
    name: "David Kim",
    position: "Backend Developer",
    jobId: "JOB-102",
    email: "david.kim@gmail.com",
    phone: "123-456-792",
    stage: "interview",
    status: "in-progress",
    progress: 50,
    appliedDate: "2024-01-10",
    location: "Seattle, WA"
  },
  {
    id: "3",
    name: "Sarah Chen",
    position: "Frontend Developer",
    jobId: "JOB-103",
    email: "sarah.chen@gmail.com",
    phone: "123-456-793",
    stage: "activation",
    status: "in-progress",
    progress: 75,
    appliedDate: "2024-01-05",
    location: "New York, NY"
  },
  {
    id: "4",
    name: "Michael Johnson",
    position: "Product Manager",
    jobId: "JOB-104",
    email: "michael.johnson@gmail.com",
    phone: "123-456-794",
    stage: "hired",
    status: "completed",
    progress: 100,
    appliedDate: "2023-12-20",
    location: "Austin, TX"
  },
  {
    id: "5",
    name: "Carlos Mendez",
    position: "Data Scientist",
    jobId: "JOB-102",
    email: "carlos.mendez@gmail.com",
    phone: "123-456-795",
    stage: "interview",
    status: "pending",
    progress: 40,
    appliedDate: "2024-01-12",
    location: "Boston, MA"
  },
  {
    id: "6",
    name: "Maya Singh",
    position: "QA Engineer",
    jobId: "JOB-101",
    email: "maya.singh@gmail.com",
    phone: "123-456-796",
    stage: "screening",
    status: "rejected",
    progress: 10,
    appliedDate: "2024-01-08",
    location: "Atlanta, GA"
  },
  {
    id: "7",
    name: "Sofia Rossi",
    position: "Product Designer",
    jobId: "JOB-103",
    email: "sofia.rossi@gmail.com",
    phone: "123-456-797",
    stage: "activation",
    status: "pending",
    progress: 80,
    appliedDate: "2024-01-03",
    location: "Milan, Italy"
  },
  {
    id: "8",
    name: "Alex Thompson",
    position: "DevOps Engineer",
    jobId: "JOB-104",
    email: "alex.thompson@gmail.com",
    phone: "123-456-798",
    stage: "hired",
    status: "completed",
    progress: 100,
    appliedDate: "2023-12-15",
    location: "Denver, CO"
  }
];

export default function OnboardingOverview() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");

  const exportToCSV = () => {
    const headers = [
      'Name','Position','Email','Phone','Stage','Status','Progress','Applied Date','Location'
    ];
    const escape = (val: any) => {
      const s = String(val ?? '')
        .replace(/"/g, '""')
        .replace(/\n/g, ' ');
      return `"${s}"`;
    };
    const rows = filteredCandidates.map(c => [
      c.name,
      c.position,
      c.email,
      c.phone,
      c.stage,
      c.status,
      `${c.progress}%`,
      formatDateMDY(c.appliedDate),
      c.location
    ].map(escape).join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'candidates_overview.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileCandidate, setProfileCandidate] = useState<PipelineCandidate | null>(null);
  const [candidates, setCandidates] = useState<PipelineCandidate[]>(allCandidates);
  const [screeningNotes, setScreeningNotes] = useState("");

  const handleStatusChange = (newStatus: PipelineCandidate['status']) => {
    if (!profileCandidate) return;
    setCandidates(prev => prev.map(c => c.id === profileCandidate.id ? { ...c, status: newStatus } : c));
    setProfileCandidate(prev => (prev ? { ...prev, status: newStatus } : prev));
  };

  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [newCandidate, setNewCandidate] = useState<{ jobId: string; name: string; position: string; file: File | null }>({ jobId: "", name: "", position: "", file: null });

  // Filter candidates based on search and filters
  const filteredCandidates = useMemo(() => {
    return candidates.filter(candidate => {
      const q = searchTerm.toLowerCase();
      const matchesSearch = candidate.name.toLowerCase().includes(q) ||
                           candidate.position.toLowerCase().includes(q) ||
                           candidate.email.toLowerCase().includes(q);

      const matchesStage = stageFilter === "all" || candidate.stage === stageFilter;
      const matchesJob = jobFilter === "all" || candidate.jobId === jobFilter;

      return matchesSearch && matchesStage && matchesJob;
    });
  }, [candidates, searchTerm, stageFilter, jobFilter]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const total = candidates.length;
    const screening = candidates.filter(c => c.stage === "screening").length;
    const interview = candidates.filter(c => c.stage === "interview").length;
    const activation = candidates.filter(c => c.stage === "activation").length;
    const hired = candidates.filter(c => c.stage === "hired").length;

    return { total, screening, interview, activation, hired };
  }, [candidates]);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "screening": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "interview": return "bg-blue-100 text-blue-800 border-blue-200";
      case "activation": return "bg-purple-100 text-purple-800 border-purple-200";
      case "hired": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "in-progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending": return "bg-orange-100 text-orange-800 border-orange-200";
      case "rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const ProgressBar = ({ progress }: { progress: number }) => {
    const getProgressColor = () => {
      if (progress >= 100) return "bg-green-500";
      if (progress >= 75) return "bg-blue-500";
      if (progress >= 50) return "bg-yellow-500";
      if (progress >= 25) return "bg-orange-500";
      return "bg-red-500";
    };

    return (
      <div className="flex items-center gap-2">
        <div className="w-20 bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-medium text-gray-600 min-w-[2rem]">{progress}%</span>
      </div>
    );
  };

  const handleViewCandidate = (candidate: PipelineCandidate) => {
    setProfileCandidate(candidate);
    setShowProfileModal(true);
  };

  const handleViewCandidateDetail = (candidate: PipelineCandidate) => {
    const payload = {
      applicantName: candidate.name,
      appliedPosition: candidate.position,
      email: candidate.email,
      phone: candidate.phone,
      roomId: `ROOM-${candidate.id.toString().padStart(3, '0')}`,
      reviewRoom: undefined,
      interviewSteps: [] as any[],
    };
    try {
      window.localStorage.setItem(`candidate-profile:${candidate.id}`, JSON.stringify(payload));
    } catch {}
    navigate(`/candidate-details/${candidate.id}`);
  };

  return (
    <Layout>
      <div className="onboarding-corporate space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Overview</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Track all candidates across the entire recruitment pipeline
            </p>
          </div>
          <Button onClick={() => navigate("/hiring-pipeline")} className="bg-blue-600 hover:bg-blue-700">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Recruitment Pipeline
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{summaryStats.total}</div>
            </CardContent>
          </Card>
          
          <Card onClick={() => navigate('/hiring-pipeline#screening')} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Screening</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{summaryStats.screening}</div>
            </CardContent>
          </Card>
          
          <Card onClick={() => navigate('/hiring-pipeline#interview')} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interview</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{summaryStats.interview}</div>
            </CardContent>
          </Card>
          
          <Card onClick={() => navigate('/hiring-pipeline#activation')} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activation</CardTitle>
              <UserCheck className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{summaryStats.activation}</div>
            </CardContent>
          </Card>
          
          <Card onClick={() => navigate('/hiring-pipeline#hired')} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hired</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{summaryStats.hired}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">All Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative w-full sm:w-64 md:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2 sm:gap-3">
                <Select value={stageFilter} onValueChange={setStageFilter}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Status Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="screening">Screening</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="activation">Activation</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={jobFilter} onValueChange={setJobFilter}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Job ID" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Job IDs</SelectItem>
                    {Array.from(new Set(candidates.map(c => c.jobId))).sort().map(id => (
                      <SelectItem key={id} value={id}>{id}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                <input id="overview-upload-input" type="file" accept=".pdf,.doc,.docx" className="hidden" />
                <Button className="h-10 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => document.getElementById('overview-upload-input')?.click()}>
                  Upload
                </Button>
                <Dialog open={showAddCandidate} onOpenChange={setShowAddCandidate}>
                  <DialogTrigger asChild>
                    <Button className="h-10 bg-blue-600 hover:bg-blue-700 text-white">+ Add Candidate</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-sm font-semibold">Add Candidate</DialogTitle>
                      <DialogDescription>Add a new candidate to the overview list.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                        <Input value={newCandidate.name} onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })} placeholder="Full name" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Job ID</label>
                          <Input value={newCandidate.jobId} onChange={(e) => setNewCandidate({ ...newCandidate, jobId: e.target.value })} placeholder="" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Applied Position</label>
                          <Input value={newCandidate.position} onChange={(e) => setNewCandidate({ ...newCandidate, position: e.target.value })} placeholder="e.g., Software Engineer" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Upload Document</label>
                        <Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setNewCandidate({ ...newCandidate, file: e.target.files?.[0] || null })} />
                        <p className="text-[11px] text-gray-500 mt-1">Accepted formats: .pdf, .doc, .docx</p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowAddCandidate(false)}>Cancel</Button>
                      <Button onClick={() => { setShowAddCandidate(false); setNewCandidate({ jobId: "", name: "", position: "", file: null }); }}>Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="h-10" onClick={exportToCSV}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Candidates Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                      CANDIDATE
                    </TableHead>
                    <TableHead className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                      APPLIED POSITION
                    </TableHead>
                    <TableHead className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                      APPLIED DATE
                    </TableHead>
                    <TableHead className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                      STATUS
                    </TableHead>
                    <TableHead className="text-center text-xs font-bold text-gray-900 uppercase tracking-wider">
                      ACTION
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCandidates.map((candidate, index) => {
                    const candidateInitials = candidate.name.split(" ").map(n => n[0]).join("");
                    
                    return (
                      <TableRow
                        key={candidate.id}
                        className={`hover:bg-blue-50/60 transition-colors duration-200 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/20'
                        }`}
                      >
                        <TableCell className="px-3 py-2">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-blue-600 text-white text-xs font-medium">
                                {candidateInitials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium text-gray-900 truncate">
                                {candidate.name}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {candidate.location}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell className="px-3 py-2">
                          <div className="text-xs text-gray-900 truncate">
                            {candidate.position}
                          </div>
                        </TableCell>
                        
                        <TableCell className="px-3 py-2">
                          <div className="text-xs text-gray-900">
                            {formatDateMDY(candidate.appliedDate)}
                          </div>
                        </TableCell>

                        <TableCell className="px-3 py-2">
                          <div className="text-xs text-gray-900">
                            {candidate.stage.charAt(0).toUpperCase() + candidate.stage.slice(1)}
                          </div>
                        </TableCell>
                        
                        <TableCell className="px-3 py-2 align-middle">
                          <div className="flex items-center justify-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => { setProfileCandidate(candidate); setShowProfileModal(true); }}
                              aria-label="Open candidate details"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {filteredCandidates.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No candidates found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="w-[90vw] max-w-5xl h-[85vh] overflow-hidden p-0 text-xs sm:text-sm">
          {profileCandidate && (
            <>
              <DialogHeader className="p-3 sm:p-4 border-b">
                <DialogTitle className="font-heading font-bold text-lg sm:text-xl text-foreground">
                  {profileCandidate.name}
                </DialogTitle>
                <DialogDescription className="!mt-0 text-xs sm:text-sm">{profileCandidate.position}</DialogDescription>
              </DialogHeader>

              <div className="flex flex-col xl:flex-row gap-3 xl:gap-4 h-[calc(95vh-180px)] overflow-hidden">
                {/* Main Panel - match ScreeningView */}
                <div className="flex-1 overflow-y-auto space-y-2 sm:space-y-3 px-3 sm:px-4 xl:pr-3">
                  {/* Quick Info Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2 p-2 sm:p-2 bg-gray-50 rounded-md border border-gray-200">
                    <div className="text-center">
                      <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mx-auto mb-1" />
                      <div className="font-semibold text-xs sm:text-sm">{(profileCandidate as any).totalExperience || '—'}</div>
                      <div className="text-xs text-gray-600">Total Experience</div>
                    </div>
                    <div className="text-center">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mx-auto mb-1" />
                      <div className="font-semibold text-xs sm:text-sm">{profileCandidate.location}</div>
                      <div className="text-xs text-gray-600">Location</div>
                    </div>
                  </div>

                  {/* Candidate Details */}
                  <Card>
                    <CardContent className="p-2 sm:p-3">
                      <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                        <User className="w-4 h-4" />
                        Candidate Details
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                          <span className="truncate">{profileCandidate.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                          <span>{profileCandidate.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 sm:col-span-2">
                          <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                          <span>{(profileCandidate as any).salaryExpectation || (profileCandidate as any).salary || '—'}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Professional Summary */}
                  {profileCandidate && (profileCandidate as any).summary && (
                    <Card>
                      <CardContent className="p-2 sm:p-3">
                        <h3 className="font-semibold mb-2 text-sm">Professional Summary</h3>
                        <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{(profileCandidate as any).summary}</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Work Experience */}
                  {profileCandidate && (profileCandidate as any).workHistory && (profileCandidate as any).workHistory.length > 0 && (
                    <Card>
                      <CardContent className="p-2 sm:p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold flex items-center gap-2 text-sm">
                            <Briefcase className="w-4 h-4" />
                            Work Experience
                          </h3>
                          <span className="text-xs text-gray-600">{(profileCandidate as any).totalExperience || ''}</span>
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                          {(profileCandidate as any).workHistory.map((job: any, index: number) => (
                            <div key={index} className="border-l-2 border-blue-200 pl-2 sm:pl-3 pb-2 sm:pb-3">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-1 sm:gap-2">
                                <div className="flex-1">
                                  <h4 className="font-medium text-xs sm:text-sm">{job.position}</h4>
                                  <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <Building className="w-3 h-3 flex-shrink-0" />
                                    <span className="truncate">{job.company}</span>
                                  </div>
                                </div>
                                {job.duration && (
                                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded self-start">{job.duration}</span>
                                )}
                              </div>
                              {job.description && (
                                <p className="text-xs text-gray-700 leading-relaxed">{job.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Education */}
                  {profileCandidate && (profileCandidate as any).education && (
                    <Card>
                      <CardContent className="p-2 sm:p-3">
                        <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                          <GraduationCap className="w-4 h-4" />
                          Education
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-700">{(profileCandidate as any).education}</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Skills */}
                  {profileCandidate && (profileCandidate as any).skills && (profileCandidate as any).skills.length > 0 && (
                    <Card>
                      <CardContent className="p-2 sm:p-3">
                        <h3 className="font-semibold mb-2 text-sm">Skills & Technologies</h3>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {(profileCandidate as any).skills.map((skill: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Certifications */}
                  {profileCandidate && (profileCandidate as any).certifications && (profileCandidate as any).certifications.length > 0 && (
                    <Card>
                      <CardContent className="p-2 sm:p-3">
                        <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                          <Award className="w-4 h-4" />
                          Certifications
                        </h3>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {(profileCandidate as any).certifications.map((cert: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Right Panel - match ScreeningView */}
                <div className="w-full xl:w-80 xl:border-l xl:pl-6 px-4 sm:px-6 xl:px-0 space-y-3 sm:space-y-4">
                  {/* Quick Actions */}
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3 text-sm sm:text-base">Quick Actions</h4>
                      <div className="space-y-4">
                        {(profileCandidate as any).resumeUrl && (
                          <Button variant="outline" size="sm" className="w-full justify-start text-xs sm:text-sm h-8 px-3" onClick={() => { const url = (profileCandidate as any).resumeUrl; if (url) window.open(url, '_blank'); }}>
                            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            Download Resume
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Screening Notes */}
                  <Card>
                    <CardContent className="p-2 sm:p-3">
                      <h4 className="font-medium mb-3 text-sm sm:text-base">Screening Notes</h4>
                      <div className="relative">
                        <Textarea
                          placeholder="Add your screening notes here..."
                          value={screeningNotes}
                          onChange={(e) => setScreeningNotes(e.target.value)}
                          className="min-h[80px] sm:min-h-[100px] text-xs sm:text-sm pr-24"
                        />
                        {screeningNotes.trim() && (
                          <Button
                            size="sm"
                            className="absolute bottom-2 right-2 h-7 px-3 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                            onClick={() => { console.log('Submitted screening notes:', screeningNotes); }}
                          >
                            Submit
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Update Status */}
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3 text-sm sm:text-base">Update Status</h4>
                      <div className="space-y-2">
                        <Button variant={profileCandidate.status === 'in-progress' ? 'default' : 'outline'} size="sm" className="w-full justify-start text-xs sm:text-sm" onClick={() => handleStatusChange('in-progress')}>Approve</Button>
                        <Button variant={profileCandidate.status === 'rejected' ? 'destructive' : 'outline'} size="sm" className="w-full justify-start text-xs sm:text-sm" onClick={() => handleStatusChange('rejected')}>Reject</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
          <DialogFooter className="px-3 sm:px-4 py-3">
            <Button variant="outline" onClick={() => setShowProfileModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
