import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Calendar, Clock, FileText, Check, X, MapPin, Briefcase, DollarSign, Award, GraduationCap, Building } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

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
      <div className="candidate-details space-y-6 max-w-5xl">
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

        {/* Details Layout matching ScreeningView */}
        <div className="flex flex-col xl:flex-row gap-3 xl:gap-4">
          {/* Main Panel */}
          <div className="flex-1 space-y-3">
            {/* Quick Info Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 bg-gray-50 rounded-md border border-gray-200">
              {candidate.location && (
                <div className="text-center">
                  <MapPin className="w-4 h-4 text-green-600 mx-auto mb-1" />
                  <div className="font-semibold text-xs sm:text-sm">{candidate.location}</div>
                  <div className="text-xs text-gray-600">Location</div>
                </div>
              )}
            </div>

            {/* Candidate Details */}
            <Card>
              <CardContent className="p-3 sm:p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4" />
                  Candidate Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="truncate">{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{candidate.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Review Room */}
            {candidate.reviewRoom && (
              <Card>
                <CardContent className="p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 text-sm">Review Room</h3>
                  <div className="text-sm">
                    <span className="font-medium">Zoom link:</span>
                    <a href={candidate.reviewRoom} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline ml-2">
                      {candidate.reviewRoom}
                    </a>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Panel */}
          <div className="w-full xl:w-80 xl:border-l xl:pl-6 space-y-3">
            {/* Screening Notes */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3 text-sm sm:text-base">Screening Notes</h4>
                <div className="relative">
                  <Textarea className="min-h-[100px] text-xs sm:text-sm" placeholder="Add your screening notes here..." />
                </div>
              </CardContent>
            </Card>

            {/* Update Status */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3 text-sm sm:text-base">Update Status</h4>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleDecision('pass')}>Approve</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDecision('reject')}>Reject</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
