import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Calendar, Clock, FileText, Check, X } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Mock candidate data - Emily Davis profile as specified
const getCandidateById = (id: string) => {
  // Default Emily Davis data for the design specification
  return {
    id: "001",
    applicantName: "Emily Davis",
    appliedPosition: "Senior React Developer",
    department: "Engineering",
    currentRound: "System Design Interview",
    status: "in-progress",
    email: "emily.davis@example.com",
    phone: "(555) 234-5678",
    roomId: "ROOM-001",
    reviewRoom: "https://zoom.us/j/123456789",
    assignedInterviewers: ["David Wilson", "Lisa Chen"],
    interviewSteps: [
      {
        id: "step1",
        title: "Technical Interview",
        interviewer: "David Wilson, Tech Lead",
        description: "Assessment of technical skills and problem-solving abilities",
        date: "2023-05-20",
        time: "10:00 AM",
        status: "Completed",
        remarks: "Strong technical skills, especially in React and TypeScript. Solved all problems efficiently."
      },
      {
        id: "step2",
        title: "System Design Interview",
        interviewer: "Lisa Chen, Senior Architect",
        description: "Evaluation of system design and architecture knowledge",
        date: "2023-05-22",
        time: "2:00 PM",
        status: "Scheduled",
        remarks: ""
      }
    ]
  };
};

export default function CandidateDetails() {
  const { candidateId } = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const candidate = getCandidateById(candidateId || "1");
  
  if (!candidate) {
    return (
      <Layout>
        <div className="candidate-details space-y-5">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500">Candidate not found</p>
          </div>
        </div>
      </Layout>
    );
  }

  const handleDecision = async (decision: 'pass' | 'reject') => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`${decision.toUpperCase()} decision for ${candidate.applicantName}`);
    
    // Navigate back to hiring pipeline
    navigate('/hiring-pipeline');
    setIsProcessing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Layout>
      <div className="candidate-details space-y-6 max-w-4xl">
        {/* Back Navigation */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Interview List
          </Button>
        </div>

        {/* Candidate Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-semibold text-xl">
                  {candidate.applicantName.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              
              {/* Basic Info */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{candidate.applicantName}</h1>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {candidate.roomId}
                  </Badge>
                </div>
                <p className="text-lg text-gray-700 font-medium mb-2">
                  {candidate.appliedPosition}
                </p>
                <p className="text-sm text-gray-600">
                  Department: {candidate.department}
                </p>
              </div>
            </div>

            {/* Current Status */}
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Current Status</p>
              <Badge className={getStatusColor(candidate.status)}>
                {candidate.status === 'in-progress' ? 'In Progress' : 
                 candidate.status === 'completed' ? 'Completed' : 'Pending'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Contact Info & Review Room */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{candidate.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{candidate.phone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Review Room */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Room</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Meeting Room</p>
                  <a 
                    href="#" 
                    className="text-blue-600 hover:text-blue-800 font-medium underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    {candidate.reviewRoom}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Assigned Interviewers</p>
                  <p className="font-medium text-gray-900">
                    {candidate.assignedInterviewers.join(', ')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interview Steps */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Steps</h3>
          <div className="space-y-4">
            {candidate.interviewSteps.map((step, index) => (
              <Card key={step.id} className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-700 font-semibold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{step.title}</h4>
                        <p className="text-sm text-gray-600">Interviewer: {step.interviewer}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(step.status)}>
                      {step.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{step.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{step.time}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Description</p>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {step.remarks && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-1">Remarks</p>
                      <p className="text-sm text-gray-600">{step.remarks}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
          <Button
            onClick={() => handleDecision('reject')}
            disabled={isProcessing}
            variant="outline"
            className="px-8 py-2 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              <>
                <X className="h-4 w-4 mr-2" />
                Reject
              </>
            )}
          </Button>
          <Button
            onClick={() => handleDecision('pass')}
            disabled={isProcessing}
            className="px-8 py-2 bg-green-600 hover:bg-green-700 text-white"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-green-300 border-t-white rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Pass
              </>
            )}
          </Button>
        </div>
      </div>
    </Layout>
  );
}
