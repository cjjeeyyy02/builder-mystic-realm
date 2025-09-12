import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Calendar, Clock, FileText, Check, X } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Mock candidate data - in real app this would come from API
const getCandidateById = (id: string) => {
  const candidates = [
    {
      id: "1",
      applicantName: "Sarah Mitchell",
      appliedPosition: "Senior Software Engineer",
      department: "Engineering",
      currentRound: "Technical Assessment Round 1",
      status: "in-progress",
      email: "sarah.mitchell@email.com",
      phone: "+1 (555) 123-4567",
      roomId: "CA001",
      reviewRoom: "Zoom — Interview Room A",
      assignedInterviewers: ["Alice Johnson", "Bob Smith"],
      interviewSteps: [
        {
          id: "step1",
          title: "Technical Assessment",
          interviewer: "Alice Johnson",
          description: "Technical coding assessment - 90 minutes. Focus on React, JavaScript fundamentals, and problem-solving approach.",
          date: "March 15, 2024",
          time: "10:00 AM",
          status: "Completed",
          remarks: "Excellent problem-solving skills demonstrated. Strong understanding of algorithms and data structures. Candidate showed clean code practices and good communication during the session."
        },
        {
          id: "step2",
          title: "System Design",
          interviewer: "Bob Smith",
          description: "System design discussion - 60 minutes. Evaluate architectural thinking, scalability considerations, and communication skills.",
          date: "March 20, 2024",
          time: "2:00 PM",
          status: "In Progress",
          remarks: "Scheduled for system design discussion. Focus on scalability and architecture patterns."
        },
        {
          id: "step3",
          title: "Final Interview",
          interviewer: "Leadership Team",
          description: "Final round with leadership team - 45 minutes. Focus on cultural fit and vision alignment.",
          date: "TBD",
          time: "TBD",
          status: "Pending",
          remarks: "Final round with leadership team. Focus on cultural fit and vision alignment."
        }
      ]
    },
    {
      id: "2",
      applicantName: "James Rodriguez",
      appliedPosition: "Product Manager",
      department: "Product",
      currentRound: "Non Technical Round 2",
      status: "completed",
      email: "james.rodriguez@email.com",
      phone: "+1 (555) 234-5678",
      roomId: "CA002",
      reviewRoom: "Zoom — Interview Room B",
      assignedInterviewers: ["Carol Wilson", "David Brown"],
      interviewSteps: [
        {
          id: "step1",
          title: "Product Strategy",
          interviewer: "Carol Wilson",
          description: "Product strategy and vision discussion - 60 minutes.",
          date: "March 10, 2024",
          time: "11:00 AM",
          status: "Completed",
          remarks: "Strong product vision and strategic thinking. Excellent understanding of user-centered design principles."
        },
        {
          id: "step2",
          title: "Stakeholder Management",
          interviewer: "David Brown",
          description: "Cross-functional collaboration assessment - 45 minutes.",
          date: "March 12, 2024",
          time: "3:00 PM", 
          status: "Completed",
          remarks: "Demonstrated excellent communication skills and ability to work with diverse teams."
        }
      ]
    }
  ];
  
  return candidates.find(c => c.id === id);
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
