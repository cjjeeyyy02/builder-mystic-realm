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
  Eye,
  ChevronRight,
  BarChart3
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
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter candidates based on search and filters
  const filteredCandidates = useMemo(() => {
    return allCandidates.filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStage = stageFilter === "all" || candidate.stage === stageFilter;
      const matchesStatus = statusFilter === "all" || candidate.status === statusFilter;
      
      return matchesSearch && matchesStage && matchesStatus;
    });
  }, [searchTerm, stageFilter, statusFilter]);

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

  const handleViewCandidate = (candidateId: string) => {
    navigate(`/candidate-details/${candidateId}`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">Hiring Pipeline Overview</h1>
            <p className="text-muted-foreground mt-1">
              Track all candidates across the entire hiring pipeline
            </p>
          </div>
          <Button onClick={() => navigate("/hiring-pipeline")} className="bg-blue-600 hover:bg-blue-700">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Detailed Pipeline
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
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Screening</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{summaryStats.screening}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interview</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{summaryStats.interview}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activation</CardTitle>
              <UserCheck className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{summaryStats.activation}</div>
            </CardContent>
          </Card>
          
          <Card>
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
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="screening">Screening</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="activation">Activation</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
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
                      STAGE
                    </TableHead>
                    <TableHead className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                      STATUS
                    </TableHead>
                    <TableHead className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                      PROGRESS
                    </TableHead>
                    <TableHead className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                      APPLIED DATE
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
                          <Badge className={`text-xs capitalize ${getStageColor(candidate.stage)}`}>
                            {candidate.stage}
                          </Badge>
                        </TableCell>
                        
                        <TableCell className="px-3 py-2">
                          <Badge className={`text-xs capitalize ${getStatusColor(candidate.status)}`}>
                            {candidate.status.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        
                        <TableCell className="px-3 py-2">
                          <ProgressBar progress={candidate.progress} />
                        </TableCell>
                        
                        <TableCell className="px-3 py-2">
                          <div className="text-xs text-gray-900">
                            {new Date(candidate.appliedDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        
                        <TableCell className="px-3 py-2 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewCandidate(candidate.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
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
    </Layout>
  );
}
