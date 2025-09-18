import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  Calendar,
  Users,
  Edit,
  Video,
  MapPin,
  Plus,
  Upload,
  X,
} from "lucide-react";

interface Room {
  id: string;
  name: string;
  type: "Virtual" | "Physical";
  location: string;
  capacity: number;
  status: "Available" | "In Use" | "Maintenance";
  linkedJobs: number;
  platform?: string;
}

interface Interview {
  id: string;
  type: string;
  candidateName: string;
  position: string;
  room: string;
  platform: string;
  date: string;
  time: string;
}

export default function RoomBuilder() {
  const [activeTab, setActiveTab] = useState<"virtual" | "physical">("virtual");
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
    attachments: null as File | null
  });

  const rooms: Room[] = [
    {
      id: "1",
      name: "Technical Interview Room",
      type: "Virtual",
      location: "Zoom",
      capacity: 5,
      status: "Available",
      linkedJobs: 2,
      platform: "Zoom"
    },
    {
      id: "2",
      name: "Design Review Room", 
      type: "Virtual",
      location: "Microsoft Teams",
      capacity: 4,
      status: "Available",
      linkedJobs: 2,
      platform: "Microsoft Teams"
    }
  ];

  const upcomingInterviews: Interview[] = [
    {
      id: "1",
      type: "Technical Interview",
      candidateName: "Emily Davis",
      position: "Senior React Developer",
      room: "Technical Interview Room",
      platform: "Zoom",
      date: "Today",
      time: "10:00 AM"
    },
    {
      id: "2",
      type: "Design Review",
      candidateName: "Alex Turner",
      position: "UX Designer",
      room: "Design Review Room",
      platform: "Microsoft Teams",
      date: "Tomorrow",
      time: "1:00 PM"
    }
  ];

  const filteredRooms = rooms.filter(room => 
    activeTab === "virtual" ? room.type === "Virtual" : room.type === "Physical"
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-800";
      case "In Use": return "bg-red-100 text-red-800";
      case "Maintenance": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const addPanelMember = () => {
    setFormData(prev => ({
      ...prev,
      panelMembers: [...prev.panelMembers, ""]
    }));
  };

  const removePanelMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      panelMembers: prev.panelMembers.filter((_, i) => i !== index)
    }));
  };

  const updatePanelMember = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      panelMembers: prev.panelMembers.map((member, i) => i === index ? value : member)
    }));
  };

  const addEvaluationCriteria = () => {
    setFormData(prev => ({
      ...prev,
      evaluationCriteria: [...prev.evaluationCriteria, ""]
    }));
  };

  const removeEvaluationCriteria = (index: number) => {
    setFormData(prev => ({
      ...prev,
      evaluationCriteria: prev.evaluationCriteria.filter((_, i) => i !== index)
    }));
  };

  const updateEvaluationCriteria = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      evaluationCriteria: prev.evaluationCriteria.map((criteria, i) => i === index ? value : criteria)
    }));
  };

  const handleSave = () => {
    console.log("Saving room:", formData);
    setShowCreateModal(false);
    // Reset form
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
      attachments: null
    });
  };

  const handleCancel = () => {
    setShowCreateModal(false);
    // Reset form
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
      attachments: null
    });
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header Tabs */}
        <div className="flex items-center space-x-1">
          <Button
            variant={activeTab === "virtual" ? "default" : "ghost"}
            onClick={() => setActiveTab("virtual")}
            className={`flex items-center gap-2 ${
              activeTab === "virtual" 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <Video className="h-4 w-4" />
            Virtual Rooms
          </Button>
          <Button
            variant={activeTab === "physical" ? "default" : "ghost"}
            onClick={() => setActiveTab("physical")}
            className={`flex items-center gap-2 ${
              activeTab === "physical" 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <MapPin className="h-4 w-4" />
            Physical Rooms
          </Button>
        </div>

        {/* Create Room Button */}
        <div className="flex justify-end">
          <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Room
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Room</DialogTitle>
                <DialogDescription>
                  Set up a new interview room with detailed configurations.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Basic Info Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Basic Info</h3>

                  <div className="space-y-2">
                    <Label htmlFor="roomTitle">Room Title</Label>
                    <Input
                      id="roomTitle"
                      placeholder="Enter room name"
                      value={formData.roomTitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, roomTitle: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief overview of the interview round"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>
                </div>

                <Separator />

                {/* Step Details Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Step Details</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stepNumber">Step Number</Label>
                      <Input
                        id="stepNumber"
                        type="number"
                        placeholder="1"
                        value={formData.stepNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, stepNumber: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interviewType">Interview Type</Label>
                      <Select value={formData.interviewType} onValueChange={(value) => setFormData(prev => ({ ...prev, interviewType: value }))}>
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
                      <Select value={formData.duration} onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}>
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
                      <Select value={formData.mode} onValueChange={(value) => setFormData(prev => ({ ...prev, mode: value }))}>
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
                      <Button type="button" variant="outline" size="sm" onClick={addPanelMember}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Member
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {formData.panelMembers.map((member, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder="Name, Role, Contact (optional)"
                            value={member}
                            onChange={(e) => updatePanelMember(index, e.target.value)}
                          />
                          {formData.panelMembers.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removePanelMember(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="candidateInstructions">Candidate Instructions</Label>
                    <Textarea
                      id="candidateInstructions"
                      placeholder="Notes and requirements for candidates"
                      value={formData.candidateInstructions}
                      onChange={(e) => setFormData(prev => ({ ...prev, candidateInstructions: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  {/* Evaluation Criteria */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Evaluation Criteria</Label>
                      <Button type="button" variant="outline" size="sm" onClick={addEvaluationCriteria}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Criteria
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {formData.evaluationCriteria.map((criteria, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder="Skills or attributes being tested"
                            value={criteria}
                            onChange={(e) => updateEvaluationCriteria(index, e.target.value)}
                          />
                          {formData.evaluationCriteria.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeEvaluationCriteria(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scoringRubric">Scoring Rubric (Optional)</Label>
                    <Textarea
                      id="scoringRubric"
                      placeholder="Structured scoring categories and criteria"
                      value={formData.scoringRubric}
                      onChange={(e) => setFormData(prev => ({ ...prev, scoringRubric: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="attachments">Attachments</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload documents, case studies, or test files</p>
                      <input
                        type="file"
                        id="attachments"
                        className="hidden"
                        onChange={(e) => setFormData(prev => ({ ...prev, attachments: e.target.files?.[0] || null }))}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('attachments')?.click()}
                      >
                        Choose File
                      </Button>
                      {formData.attachments && (
                        <p className="text-sm text-green-600 mt-2">
                          Selected: {formData.attachments.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                  Save Room
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Rooms Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-xs font-medium text-gray-600 px-6 py-3">ROOM NAME</TableHead>
                  <TableHead className="text-xs font-medium text-gray-600 px-6 py-3">TYPE</TableHead>
                  <TableHead className="text-xs font-medium text-gray-600 px-6 py-3">LOCATION/LINK</TableHead>
                  <TableHead className="text-xs font-medium text-gray-600 px-6 py-3">CAPACITY</TableHead>
                  <TableHead className="text-xs font-medium text-gray-600 px-6 py-3">STATUS</TableHead>
                  <TableHead className="text-xs font-medium text-gray-600 px-6 py-3">LINKED JOBS</TableHead>
                  <TableHead className="text-xs font-medium text-gray-600 px-6 py-3">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRooms.map((room) => (
                  <TableRow key={room.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900 px-6 py-4">
                      {room.name}
                    </TableCell>
                    <TableCell className="text-gray-600 px-6 py-4">
                      {room.type}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                        {room.location}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="h-3 w-3" />
                        <span>{room.capacity}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Badge className={`${getStatusColor(room.status)} border-0`}>
                        {room.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600 px-6 py-4">
                      {room.linkedJobs} jobs
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Room Usage */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900">Room Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">
                    <Calendar className="h-8 w-8 mx-auto" />
                  </div>
                  <p className="text-gray-500 text-sm">Room Usage Chart</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Interviews */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900">Upcoming Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {interview.type}: {interview.candidateName}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">{interview.position}</p>
                        <div className="text-sm text-gray-500">
                          <p>Room: <span className="text-blue-600">{interview.room} ({interview.platform})</span></p>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <p>{interview.date}, {interview.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
