import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Calendar, Clock, FileText, Check, X, MapPin, Briefcase, DollarSign, Award, GraduationCap, Building, Download } from "lucide-react";
import Layout from "@/components/Layout";
import { screeningCandidates, type ScreeningCandidate } from "@/data/screeningCandidates";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawReason, setWithdrawReason] = useState<string>("");
  const [otherReason, setOtherReason] = useState<string>("");

  const candidate = getCandidateById(candidateId || "1");
  const screeningMatch: ScreeningCandidate | undefined = useMemo(() => screeningCandidates.find(c => c.id === (candidateId || "")), [candidateId]);
  const merged = useMemo(() => ({
    applicantName: screeningMatch?.name ?? candidate?.applicantName,
    appliedPosition: screeningMatch?.position ?? candidate?.appliedPosition,
    email: screeningMatch?.email ?? candidate?.email,
    phone: screeningMatch?.phone ?? candidate?.phone,
    location: screeningMatch?.location ?? candidate?.location,
    totalExperience: screeningMatch?.totalExperience,
    salaryExpectation: screeningMatch?.salaryExpectation,
    resumeUrl: screeningMatch?.resumeUrl,
    summary: screeningMatch?.summary,
    education: screeningMatch?.education,
    workHistory: screeningMatch?.workHistory,
    skills: screeningMatch?.skills,
    certifications: screeningMatch?.certifications,
    roomId: candidate?.roomId,
    reviewRoom: candidate?.reviewRoom,
    interviewSteps: candidate?.interviewSteps ?? [],
  }), [candidate, screeningMatch]);
  
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
    
    console.log(`${decision.toUpperCase()} decision for ${merged.applicantName}`);
    
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
              <div className="h-16 w-16 rounded-full bg-gray-400 flex items-center justify-center" aria-label="avatar">
                <span className="text-white font-semibold text-xl">E</span>
              </div>

              {/* Basic Info */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{merged.applicantName}</h1>
                <p className="text-lg text-gray-700 font-medium">
                  {merged.appliedPosition}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Details Layout matching ScreeningView */}
        <div className="flex flex-col xl:flex-row gap-3 xl:gap-4">
          {/* Main Panel */}
          <div className="flex-1 space-y-3">

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
                    <span className="truncate">{merged.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{merged.phone}</span>
                  </div>
                  {merged.totalExperience && (
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="font-medium">{merged.totalExperience}</div>
                        <div className="text-[11px] text-gray-500">Total Experience</div>
                      </div>
                    </div>
                  )}
                  {merged.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="font-medium">{merged.location}</div>
                        <div className="text-[11px] text-gray-500">Location</div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Salary */}
            {merged.salaryExpectation && (
              <Card>
                <CardContent className="p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4" />
                    Salary Expectation
                  </h3>
                  <div className="text-sm text-gray-800">{merged.salaryExpectation}</div>
                </CardContent>
              </Card>
            )}

            {/* Professional Summary */}
            {merged.summary && (
              <Card>
                <CardContent className="p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 text-sm">Professional Summary</h3>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{merged.summary}</p>
                </CardContent>
              </Card>
            )}

            {/* Work Experience */}
            {merged.workHistory && merged.workHistory.length > 0 && (
              <Card>
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold flex items-center gap-2 text-sm">
                      <Briefcase className="w-4 h-4" />
                      Work Experience
                    </h3>
                    {merged.totalExperience && (
                      <span className="text-xs text-gray-600">{merged.totalExperience}</span>
                    )}
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {merged.workHistory.map((job, index) => (
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
            {merged.education && (
              <Card>
                <CardContent className="p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                    <GraduationCap className="w-4 h-4" />
                    Education
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700">{merged.education}</p>
                </CardContent>
              </Card>
            )}

            {/* Skills */}
            {merged.skills && merged.skills.length > 0 && (
              <Card>
                <CardContent className="p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 text-sm">Skills & Technologies</h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {merged.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Certifications */}
            {merged.certifications && merged.certifications.length > 0 && (
              <Card>
                <CardContent className="p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4" />
                    Certifications
                  </h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {merged.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

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
            {/* Quick Actions */}
            {merged.resumeUrl && (
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3 text-sm sm:text-base">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs sm:text-sm h-8 px-3" onClick={() => window.open(merged.resumeUrl!, '_blank')}>
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume
                    </Button>
                    <Button variant="destructive" size="sm" className="w-full justify-start text-xs sm:text-sm h-8 px-3" onClick={() => setShowWithdrawModal(true)}>
                      Withdraw Application
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Screening Notes */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3 text-sm sm:text-base">Screening Notes</h4>
                <div className="relative">
                  <Textarea className="min-h-[100px] text-xs sm:text-sm" placeholder="Add your screening notes here..." />
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </Layout>
  );
}
