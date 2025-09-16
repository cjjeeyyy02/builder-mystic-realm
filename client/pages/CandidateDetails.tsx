import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Calendar, Clock, FileText, Check, X } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Load candidate profile saved by overview/action
const getCandidateById = (id: string) => {
  try {
    const raw = window.localStorage.getItem(`candidate-profile:${id}`);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
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
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              {/* Profile Picture (Initial Icon) */}
              <div className="h-16 w-16 rounded-full bg-gray-400 flex items-center justify-center">
                <span className="text-white font-semibold text-xl">E</span>
              </div>

              {/* Basic Info */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{candidate.applicantName}</h1>
                <p className="text-lg text-gray-700 font-medium">
                  {candidate.appliedPosition}
                </p>
              </div>
            </div>

            {/* Room ID (top-right) */}
            <div>
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300 font-medium">
                {candidate.roomId}
              </Badge>
            </div>
          </div>
        </div>

        {/* Contact Information & Review Room - Single Card */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">Email:</span>
                    <span className="text-sm text-gray-700">{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium">Phone:</span>
                    <span className="text-sm text-gray-700">{candidate.phone}</span>
                  </div>
                </div>
              </div>

              {/* Review Room */}
              {candidate.reviewRoom && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Review Room</h3>
                  <div>
                    <span className="text-sm font-medium">Zoom link:</span>
                    <a
                      href={candidate.reviewRoom}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline ml-2"
                    >
                      {candidate.reviewRoom}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Interview Steps Section */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Steps</h3>
            <div className="space-y-4">
              {(candidate.interviewSteps || []).map((step: any, index: number) => (
                <div key={step.id || index} className="border border-gray-200 rounded-lg p-4 relative">
                  {/* Status Badge (top-right corner) */}
                  <div className="absolute top-4 right-4">
                    <Badge
                      className={
                        step.status === 'Completed'
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : 'bg-gray-100 text-gray-800 border-gray-200'
                      }
                    >
                      {step.status}
                    </Badge>
                  </div>

                  {/* Step Header */}
                  <div className="mb-3 pr-20">
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {index + 1}. {step.title}
                    </h4>
                    <p className="text-sm text-gray-600 font-medium">
                      Interviewer: {step.interviewer}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <p className="text-sm text-gray-700">
                      Description: "{step.description}"
                    </p>
                  </div>

                  {/* Date & Time */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{step.date} at {step.time}</span>
                    </div>
                  </div>

                  {/* Remarks (only if available) */}
                  {step.remarks && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm font-medium text-gray-700 mb-1">Remarks:</p>
                      <p className="text-sm text-gray-600">"{step.remarks}"</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons (Bottom of Screen) */}
        <div className="flex items-center justify-center gap-6 pt-6 border-t border-gray-200">
          <Button
            onClick={() => handleDecision('reject')}
            disabled={isProcessing}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              "Reject"
            )}
          </Button>
          <Button
            onClick={() => handleDecision('pass')}
            disabled={isProcessing}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              "Pass"
            )}
          </Button>
        </div>
      </div>
    </Layout>
  );
}
