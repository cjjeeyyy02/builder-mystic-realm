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
  Calendar,
  Users,
  Edit,
  Video,
  MapPin
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
