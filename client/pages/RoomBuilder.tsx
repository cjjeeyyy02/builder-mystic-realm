import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Settings, 
  Users, 
  Calendar,
  Clock,
  Video,
  MapPin,
  Edit,
  Trash2,
  Copy,
  MoreVertical
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InterviewRoom {
  id: string;
  name: string;
  type: "video" | "in-person" | "phone";
  capacity: number;
  location?: string;
  equipment: string[];
  availability: "available" | "busy" | "maintenance";
  description: string;
  bookings: number;
}

export default function RoomBuilder() {
  const [rooms, setRooms] = useState<InterviewRoom[]>([
    {
      id: "1",
      name: "Executive Conference Room",
      type: "in-person",
      capacity: 8,
      location: "Floor 5, Room 501",
      equipment: ["Whiteboard", "Projector", "Video Conferencing", "Coffee Station"],
      availability: "available",
      description: "Premium conference room for senior-level interviews and panel discussions.",
      bookings: 12
    },
    {
      id: "2", 
      name: "Virtual Interview Room A",
      type: "video",
      capacity: 6,
      equipment: ["HD Camera", "Noise Cancellation", "Screen Sharing", "Recording"],
      availability: "busy",
      description: "Dedicated virtual space for remote interviews with advanced tech setup.",
      bookings: 28
    },
    {
      id: "3",
      name: "Technical Assessment Lab",
      type: "in-person",
      capacity: 4,
      location: "Floor 3, Room 304",
      equipment: ["Computers", "Coding Environment", "Whiteboard", "Reference Materials"],
      availability: "available",
      description: "Specialized room for technical assessments and coding challenges.",
      bookings: 15
    }
  ]);

  const [showNewRoomForm, setShowNewRoomForm] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: "",
    type: "video" as const,
    capacity: 2,
    location: "",
    equipment: "",
    description: ""
  });

  const handleCreateRoom = () => {
    if (newRoom.name.trim()) {
      const room: InterviewRoom = {
        id: Date.now().toString(),
        name: newRoom.name,
        type: newRoom.type,
        capacity: newRoom.capacity,
        location: newRoom.location || undefined,
        equipment: newRoom.equipment.split(',').map(item => item.trim()).filter(Boolean),
        availability: "available",
        description: newRoom.description,
        bookings: 0
      };
      
      setRooms([...rooms, room]);
      setNewRoom({
        name: "",
        type: "video",
        capacity: 2,
        location: "",
        equipment: "",
        description: ""
      });
      setShowNewRoomForm(false);
    }
  };

  const deleteRoom = (roomId: string) => {
    setRooms(rooms.filter(room => room.id !== roomId));
  };

  const duplicateRoom = (room: InterviewRoom) => {
    const newRoom: InterviewRoom = {
      ...room,
      id: Date.now().toString(),
      name: `${room.name} (Copy)`,
      bookings: 0,
      availability: "available"
    };
    setRooms([...rooms, newRoom]);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available": return "bg-green-100 text-green-800";
      case "busy": return "bg-red-100 text-red-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="h-4 w-4" />;
      case "in-person": return <MapPin className="h-4 w-4" />;
      case "phone": return <Clock className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold">Room Builder</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage interview rooms for different types of assessments and meetings.
            </p>
          </div>
          <Button 
            onClick={() => setShowNewRoomForm(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Room
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{rooms.length}</div>
                  <div className="text-xs text-muted-foreground">Total Rooms</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">{rooms.filter(r => r.availability === "available").length}</div>
                  <div className="text-xs text-muted-foreground">Available</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-red-600" />
                <div>
                  <div className="text-2xl font-bold">{rooms.filter(r => r.availability === "busy").length}</div>
                  <div className="text-xs text-muted-foreground">In Use</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold">{rooms.reduce((sum, room) => sum + room.bookings, 0)}</div>
                  <div className="text-xs text-muted-foreground">Total Bookings</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* New Room Form */}
        {showNewRoomForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Interview Room</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Room Name</label>
                  <Input
                    placeholder="Enter room name"
                    value={newRoom.name}
                    onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Room Type</label>
                  <Select value={newRoom.type} onValueChange={(value: any) => setNewRoom({...newRoom, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Conference</SelectItem>
                      <SelectItem value="in-person">In-Person</SelectItem>
                      <SelectItem value="phone">Phone Interview</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Capacity</label>
                  <Input
                    type="number"
                    min="1"
                    max="20"
                    placeholder="Max participants"
                    value={newRoom.capacity}
                    onChange={(e) => setNewRoom({...newRoom, capacity: parseInt(e.target.value) || 2})}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Location (Optional)</label>
                  <Input
                    placeholder="e.g., Floor 2, Room 201"
                    value={newRoom.location}
                    onChange={(e) => setNewRoom({...newRoom, location: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Equipment & Features</label>
                <Input
                  placeholder="Separate items with commas (e.g., Whiteboard, Projector, Coffee)"
                  value={newRoom.equipment}
                  onChange={(e) => setNewRoom({...newRoom, equipment: e.target.value})}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe the room's purpose and special features"
                  value={newRoom.description}
                  onChange={(e) => setNewRoom({...newRoom, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCreateRoom}>Create Room</Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewRoomForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card key={room.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(room.type)}
                    <CardTitle className="text-lg">{room.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getAvailabilityColor(room.availability)}>
                      {room.availability}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Room
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => duplicateRoom(room)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => deleteRoom(room.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{room.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Type:</span>
                    <div className="capitalize">{room.type.replace('-', ' ')}</div>
                  </div>
                  <div>
                    <span className="font-medium">Capacity:</span>
                    <div>{room.capacity} people</div>
                  </div>
                  {room.location && (
                    <div className="col-span-2">
                      <span className="font-medium">Location:</span>
                      <div>{room.location}</div>
                    </div>
                  )}
                  <div className="col-span-2">
                    <span className="font-medium">Bookings:</span>
                    <div>{room.bookings} this month</div>
                  </div>
                </div>

                {room.equipment.length > 0 && (
                  <div>
                    <div className="font-medium text-sm mb-2">Equipment & Features:</div>
                    <div className="flex flex-wrap gap-1">
                      {room.equipment.map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    Book Room
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {rooms.length === 0 && !showNewRoomForm && (
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Interview Rooms</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first interview room to start managing your interview spaces effectively.
                </p>
                <Button onClick={() => setShowNewRoomForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Room
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
