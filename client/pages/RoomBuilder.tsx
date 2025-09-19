import React, { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Plus, Upload, X } from "lucide-react";

interface RoomStep {
  id: string;
  title: string;
  duration: string; // e.g. "1 hour"
  locationType: "Online" | "On-site";
  platform?: "Zoom" | "Meet" | "Teams" | string;
  instructions: string;
}

interface RoomTemplate {
  id: string;
  name: string;
  description: string;
  type: "Virtual" | "Physical";
  steps: RoomStep[];
}

export default function RoomBuilder() {
  // Create Room modal state (kept from previous flow)
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    roomTitle: "",
    description: "",
    stepNumber: "",
    interviewType: "",
    duration: "",
    mode: "",
    panelMembers: [""],
    candidateInstructions: "",
    evaluationCriteria: [""],
    scoringRubric: "",
    attachments: null as File | null,
  });

  // Two sample room templates
  const rooms: RoomTemplate[] = [
    {
      id: "1",
      name: "Technical Interview – Round 1",
      description: "Frontend development assessment",
      type: "Virtual",
      steps: [
        {
          id: "s1",
          title: "Step 1: Technical Interview",
          duration: "1 hour",
          locationType: "Online",
          platform: "Zoom",
          instructions: "Join the Zoom room 5 minutes early. Prepare to share your screen for coding tasks.",
        },
        {
          id: "s2",
          title: "Step 2: Code Review Discussion",
          duration: "30 minutes",
          locationType: "Online",
          platform: "Meet",
          instructions: "Discuss code structure, tradeoffs, and testing approach.",
        },
      ],
    },
    {
      id: "2",
      name: "Design Review – Round 1",
      description: "UX portfolio walkthrough and critique",
      type: "Virtual",
      steps: [
        {
          id: "s1",
          title: "Step 1: Portfolio Walkthrough",
          duration: "45 minutes",
          locationType: "Online",
          platform: "Teams",
          instructions: "Present 2–3 case studies focusing on problem, process, and outcomes.",
        },
        {
          id: "s2",
          title: "Step 2: Whiteboard Exercise",
          duration: "30 minutes",
          locationType: "On-site",
          instructions: "Collaborative ideation on a sample product flow. Bring a notepad.",
        },
      ],
    },
  ];

  const [selectedRoomId, setSelectedRoomId] = useState<string>(rooms[0]?.id || "");
  const selectedRoom = useMemo(
    () => rooms.find((r) => r.id === selectedRoomId) || rooms[0],
    [rooms, selectedRoomId]
  );

  // Derived progress by steps completion (for demo, use proportion of steps present)
  const progressValue = useMemo(() => {
    const total = selectedRoom?.steps.length || 0;
    if (!total) return 0;
    // Assume first step is completed to show progress subtly
    const completed = Math.min(1, total);
    return Math.round((completed / total) * 100);
  }, [selectedRoom]);

  const handleSave = () => {
    // Persist logic would go here
    setShowCreateModal(false);
    setFormData({
      roomTitle: "",
      description: "",
      stepNumber: "",
      interviewType: "",
      duration: "",
      mode: "",
      panelMembers: [""],
      candidateInstructions: "",
      evaluationCriteria: [""],
      scoringRubric: "",
      attachments: null,
    });
  };

  const handleCancel = () => {
    setShowCreateModal(false);
    setFormData({
      roomTitle: "",
      description: "",
      stepNumber: "",
      interviewType: "",
      duration: "",
      mode: "",
      panelMembers: [""],
      candidateInstructions: "",
      evaluationCriteria: [""],
      scoringRubric: "",
      attachments: null,
    });
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="md:col-span-3">
            <Card className="border-gray-200">
              <CardContent className="p-5 space-y-4">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Interview Rooms</h2>
                  <p className="text-xs text-muted-foreground">Manage your interview room templates</p>
                </div>
                <Separator />
                <div className="space-y-3">
                  {rooms.map((room) => {
                    const isSelected = room.id === selectedRoom?.id;
                    const progress = Math.round((1 / Math.max(room.steps.length, 1)) * 100); // subtle demo progress
                    return (
                      <button
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`w-full text-left border rounded-md p-3 transition ${
                          isSelected
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        } bg-white`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{room.name}</div>
                            <div className="text-xs text-gray-600">{room.description}</div>
                          </div>
                          <ExternalLink className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="mt-2">
                          <Progress value={progress} className="h-1.5 bg-gray-100" />
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="text-xs text-gray-600">{room.steps.length} steps</div>
                          <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50 text-[10px] px-2 py-0.5">
                            {room.type}
                          </Badge>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel */}
          <div className="md:col-span-9">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Room Builder</h1>
                <p className="text-xs text-muted-foreground">Editing: {selectedRoom?.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-8 px-3 text-xs">Edit Mode</Button>
                <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="h-8 px-3 text-xs bg-blue-600 hover:bg-blue-700 text-white">
                      + Create Room
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Room</DialogTitle>
                      <DialogDescription>Set up a new interview room with detailed configurations.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                      {/* Basic Info */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold border-b pb-2">Basic Info</h3>
                        <div className="space-y-2">
                          <Label htmlFor="roomTitle">Room Title</Label>
                          <Input id="roomTitle" placeholder="Enter room name" value={formData.roomTitle} onChange={(e) => setFormData((p) => ({ ...p, roomTitle: e.target.value }))} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" placeholder="Brief overview of the interview round" value={formData.description} onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))} rows={3} />
                        </div>
                      </div>

                      <Separator />

                      {/* Step Details */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold border-b pb-2">Step Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor="stepNumber">Step Number</Label>
                            <Input id="stepNumber" type="number" placeholder="1" value={formData.stepNumber} onChange={(e) => setFormData((p) => ({ ...p, stepNumber: e.target.value }))} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="interviewType">Interview Type</Label>
                            <Select value={formData.interviewType} onValueChange={(value) => setFormData((p) => ({ ...p, interviewType: value }))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select interview type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hr">HR</SelectItem>
                                <SelectItem value="technical">Technical</SelectItem>
                                <SelectItem value="managerial">Managerial</SelectItem>
                                <SelectItem value="case-study">Case Study</SelectItem>
                                <SelectItem value="group-discussion">Group Discussion</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="duration">Duration</Label>
                            <Select value={formData.duration} onValueChange={(value) => setFormData((p) => ({ ...p, duration: value }))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="30min">30 minutes</SelectItem>
                                <SelectItem value="45min">45 minutes</SelectItem>
                                <SelectItem value="1hour">1 hour</SelectItem>
                                <SelectItem value="1.5hour">1.5 hours</SelectItem>
                                <SelectItem value="2hour">2 hours</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mode">Mode</Label>
                            <Select value={formData.mode} onValueChange={(value) => setFormData((p) => ({ ...p, mode: value }))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select mode" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="zoom">Online: Zoom</SelectItem>
                                <SelectItem value="meet">Online: Google Meet</SelectItem>
                                <SelectItem value="teams">Online: Microsoft Teams</SelectItem>
                                <SelectItem value="office">On-site: Office location</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Panel Members */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Panel Members</Label>
                            <Button type="button" variant="outline" size="sm" onClick={() => setFormData((p) => ({ ...p, panelMembers: [...p.panelMembers, ""] }))}>
                              <Plus className="h-4 w-4 mr-1" /> Add Member
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {formData.panelMembers.map((member, index) => (
                              <div key={index} className="flex gap-2">
                                <Input placeholder="Name, Role, Contact (optional)" value={member} onChange={(e) => setFormData((p) => ({ ...p, panelMembers: p.panelMembers.map((m, i) => (i === index ? e.target.value : m)) }))} />
                                {formData.panelMembers.length > 1 && (
                                  <Button type="button" variant="outline" size="sm" onClick={() => setFormData((p) => ({ ...p, panelMembers: p.panelMembers.filter((_, i) => i !== index) }))}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="candidateInstructions">Candidate Instructions</Label>
                          <Textarea id="candidateInstructions" placeholder="Notes and requirements for candidates" value={formData.candidateInstructions} onChange={(e) => setFormData((p) => ({ ...p, candidateInstructions: e.target.value }))} rows={3} />
                        </div>

                        {/* Evaluation Criteria */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Evaluation Criteria</Label>
                            <Button type="button" variant="outline" size="sm" onClick={() => setFormData((p) => ({ ...p, evaluationCriteria: [...p.evaluationCriteria, ""] }))}>
                              <Plus className="h-4 w-4 mr-1" /> Add Criteria
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {formData.evaluationCriteria.map((criteria, index) => (
                              <div key={index} className="flex gap-2">
                                <Input placeholder="Skills or attributes being tested" value={criteria} onChange={(e) => setFormData((p) => ({ ...p, evaluationCriteria: p.evaluationCriteria.map((c, i) => (i === index ? e.target.value : c)) }))} />
                                {formData.evaluationCriteria.length > 1 && (
                                  <Button type="button" variant="outline" size="sm" onClick={() => setFormData((p) => ({ ...p, evaluationCriteria: p.evaluationCriteria.filter((_, i) => i !== index) }))}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="scoringRubric">Scoring Rubric (Optional)</Label>
                          <Textarea id="scoringRubric" placeholder="Structured scoring categories and criteria" value={formData.scoringRubric} onChange={(e) => setFormData((p) => ({ ...p, scoringRubric: e.target.value }))} rows={4} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="attachments">Attachments</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600 mb-2">Upload documents, case studies, or test files</p>
                            <input type="file" id="attachments" className="hidden" onChange={(e) => setFormData((p) => ({ ...p, attachments: e.target.files?.[0] || null }))} />
                            <Button type="button" variant="outline" onClick={() => document.getElementById("attachments")?.click()}>
                              Choose File
                            </Button>
                            {formData.attachments && <p className="text-sm text-green-600 mt-2">Selected: {formData.attachments.name}</p>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <DialogFooter className="gap-2">
                      <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                      <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">Save Room</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Separator className="mb-3" />

            {/* Selected Room Details */}
            <Card className="border-gray-200">
              <CardContent className="p-5 space-y-4">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">{selectedRoom?.name}</h2>
                  <p className="text-sm text-gray-600">{selectedRoom?.description}</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Interview Steps</h3>
                  <span className="text-xs text-gray-500">{selectedRoom?.steps.length} steps</span>
                </div>

                <div className="space-y-2">
                  {selectedRoom?.steps.map((step) => (
                    <div key={step.id} className="border border-gray-200 rounded-md p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-sm font-medium text-gray-900">{step.title}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] px-2 py-0.5 border-gray-300 text-gray-700">{step.duration}</Badge>
                          <Badge variant="outline" className="text-[10px] px-2 py-0.5 border-blue-200 text-blue-700 bg-blue-50">
                            {step.locationType === "Online" && step.platform ? `Online (${step.platform})` : step.locationType}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded p-2 leading-relaxed">
                        {step.instructions}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">Progress</span>
                    <div className="flex-1"><Progress value={progressValue} className="h-1.5 bg-gray-100" /></div>
                    <span className="text-xs text-gray-600 min-w-[2rem] text-right">{progressValue}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
