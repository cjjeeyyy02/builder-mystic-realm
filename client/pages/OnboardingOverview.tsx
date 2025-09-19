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
  Download
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Extended candidate interface with pipeline stages
interface PipelineCandidate {
  id: string;
  name: string;
  position: string;
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

  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [newCandidate, setNewCandidate] = useState<{ jobId: string; name: string; position: string; file: File | null }>({ jobId: "", name: "", position: "", file: null });

  // Filter candidates based on search and filters
  const filteredCandidates = useMemo(() => {
    return allCandidates.filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStage = stageFilter === "all" || candidate.stage === stageFilter;
      const matchesStatus = true;
      
      return matchesSearch && matchesStage && matchesStatus;
    });
  }, [searchTerm, stageFilter]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const total = allCandidates.length;
    const screening = allCandidates.filter(c => c.stage === "screening").length;
    const interview = allCandidates.filter(c => c.stage === "interview").length;
    const activation = allCandidates.filter(c => c.stage === "activation").length;
    const hired = allCandidates.filter(c => c.stage === "hired").length;
    
    return { total, screening, interview, activation, hired };
  }, []);

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
            <h1 className="text-3xl font-semibold text-foreground">Overview</h1>
            <p className="text-muted-foreground mt-1">
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
              <div className="text-2xl font-bold">{summaryStats.total}</div>
            </CardContent>
          </Card>
          
          <Card onClick={() => navigate('/hiring-pipeline#screening')} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Screening</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{summaryStats.screening}</div>
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
              <div className="text-2xl font-bold text-purple-600">{summaryStats.activation}</div>
            </CardContent>
          </Card>
          
          <Card onClick={() => navigate('/hiring-pipeline#hired')} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hired</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{summaryStats.hired}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">All Candidates</CardTitle>
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
              </div>
              <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                <input id="overview-upload-input" type="file" accept=".pdf,.doc,.docx" className="hidden" />
                <Button className="h-9 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => document.getElementById('overview-upload-input')?.click()}>
                  Upload
                </Button>
                <Dialog open={showAddCandidate} onOpenChange={setShowAddCandidate}>
                  <DialogTrigger asChild>
                    <Button className="h-9">+ Add Candidate</Button>
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
                <Button variant="outline" className="h-9" onClick={exportToCSV}>
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
                    <TableHead className="text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
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
                          <Badge className={`text-xs capitalize ${getStageColor(candidate.stage)}`}>
                            {candidate.stage}
                          </Badge>
                        </TableCell>
                        
                        <TableCell className="px-3 py-2 text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewCandidateDetail(candidate)}>
                                View Candidate Detail
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold">Candidate Profile</DialogTitle>
            <DialogDescription>Quick view of the selected candidate.</DialogDescription>
          </DialogHeader>
          {profileCandidate && (
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">
                    {profileCandidate.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground">{profileCandidate.name}</div>
                  <div className="text-muted-foreground text-xs">{profileCandidate.position}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className={`text-xs capitalize ${getStageColor(profileCandidate.stage)}`}>{profileCandidate.stage}</Badge>
                <Badge className={`text-xs capitalize ${getStatusColor(profileCandidate.status)}`}>{profileCandidate.status.replace('-', ' ')}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-muted-foreground">Email</div>
                  <div className="font-medium break-all">{profileCandidate.email}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Phone</div>
                  <div className="font-medium">{profileCandidate.phone}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Location</div>
                  <div className="font-medium">{profileCandidate.location}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Applied Date</div>
                  <div className="font-medium">{formatDateMDY(profileCandidate.appliedDate)}</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Progress</div>
                <ProgressBar progress={profileCandidate.progress} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProfileModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
