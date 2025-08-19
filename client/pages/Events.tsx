import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Events() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Create Event Form State
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [createEventForm, setCreateEventForm] = useState({
    eventName: "",
    eventType: "",
    description: "",
    startDateTime: "",
    endDateTime: "",
    isAllDay: false,
    location: ""
  });

  // Event type options
  const eventTypeOptions = [
    "Company Meeting",
    "Workshop", 
    "Training",
    "Team Outing",
    "Other"
  ];

  // Form handlers
  const handleInputChange = (field: string, value: string | boolean) => {
    setCreateEventForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateEvent = () => {
    // Validate required fields
    if (!createEventForm.eventName || !createEventForm.eventType || !createEventForm.startDateTime || !createEventForm.endDateTime) {
      alert("Please fill in all required fields");
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Creating event:", createEventForm);
    
    // Reset form and return to list
    setCreateEventForm({
      eventName: "",
      eventType: "",
      description: "",
      startDateTime: "",
      endDateTime: "",
      isAllDay: false,
      location: ""
    });
    setShowCreateEvent(false);
  };

  const handleCancelCreate = () => {
    setCreateEventForm({
      eventName: "",
      eventType: "",
      description: "",
      startDateTime: "",
      endDateTime: "",
      isAllDay: false,
      location: ""
    });
    setShowCreateEvent(false);
  };

  const allEvents = [
    {
      id: 1,
      title: "Tech Summer 2024",
      description:
        "Join us for the biggest Tech event discussing innovative and industry insights",
      date: "29/06/2024",
      location: "Grand Convention Center",
      attendees: 2529,
      status: "awaited",
      type: "conference",
      tags: ["Conference", "Workshop"],
      category: "Technology",
    },
    {
      id: 2,
      title: "Team Building and Innovation Workshop",
      description:
        "Collaboration Workshop focusing on innovation methodologies and Team dynamics",
      date: "15/07/2024",
      location: "Training Center",
      attendees: 156,
      status: "registration-due",
      type: "workshop",
      tags: ["Innovation", "Team Building"],
      category: "Development",
    },
    {
      id: 3,
      title: "Holiday Celebration and Award Night",
      description:
        "Annual Celebration and Award ceremony, dinner and entertainment",
      date: "20/12/2024",
      location: "Skyline Rooftop",
      attendees: 45,
      status: "upcoming",
      type: "social",
      tags: ["Awards", "Social", "Creative"],
      category: "Company Culture",
    },
  ];

  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "all" || event.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      awaited: "bg-green-100 text-green-800",
      "registration-due": "bg-orange-100 text-orange-800",
      upcoming: "bg-blue-100 text-blue-800",
      confirmed: "bg-purple-100 text-purple-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getTypeColor = (type: string) => {
    const colors = {
      conference: "bg-blue-100 text-blue-800",
      workshop: "bg-green-100 text-green-800",
      training: "bg-yellow-100 text-yellow-800",
      social: "bg-pink-100 text-pink-800",
      meeting: "bg-gray-100 text-gray-800",
      webinar: "bg-cyan-100 text-cyan-800",
      retreat: "bg-amber-100 text-amber-800",
    };
    return colors[type as keyof typeof colors] || colors.meeting;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Button
                    onClick={showCreateEvent ? handleCancelCreate : () => navigate("/dashboard")}
                    variant="outline"
                    size="sm"
                    className="bg-white/70 border-gray-300 hover:bg-white text-xs"
                  >
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    {showCreateEvent ? "Back to Events" : "Back to Dashboard"}
                  </Button>
                </div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {showCreateEvent ? "Create New Event" : "All Events"}
                </h1>
                <p className="text-gray-500 mt-1 text-sm">
                  {showCreateEvent ? "Fill in the details to create a new event" : "Company events and workshops"}
                </p>
              </div>
              {!showCreateEvent && (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs rounded-lg shadow-sm"
                    onClick={() => setShowCreateEvent(true)}
                  >
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Create Event
                  </Button>
                </div>
              )}
            </div>

            {showCreateEvent ? (
              /* Create Event Form */
              <div className="space-y-6 mt-6">
                {/* Event Details Section */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h2>
                    <div className="space-y-4">
                      {/* Event Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Event Name *
                        </label>
                        <Input
                          type="text"
                          value={createEventForm.eventName}
                          onChange={(e) => handleInputChange("eventName", e.target.value)}
                          placeholder="Enter event name"
                          className="w-full"
                        />
                      </div>

                      {/* Event Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Event Type *
                        </label>
                        <Select value={createEventForm.eventType} onValueChange={(value) => handleInputChange("eventType", value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            {eventTypeOptions.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <Textarea
                          value={createEventForm.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          placeholder="Enter event description (optional)"
                          rows={3}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Date & Time Section */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Date & Time</h2>
                    <div className="space-y-4">
                      {/* All-Day Event Toggle */}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="allDay"
                          checked={createEventForm.isAllDay}
                          onCheckedChange={(checked) => handleInputChange("isAllDay", !!checked)}
                        />
                        <label htmlFor="allDay" className="text-sm font-medium text-gray-700">
                          All-Day Event
                        </label>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Start Date & Time */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date & Time *
                          </label>
                          <Input
                            type={createEventForm.isAllDay ? "date" : "datetime-local"}
                            value={createEventForm.startDateTime}
                            onChange={(e) => handleInputChange("startDateTime", e.target.value)}
                            className="w-full"
                          />
                        </div>

                        {/* End Date & Time */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Date & Time *
                          </label>
                          <Input
                            type={createEventForm.isAllDay ? "date" : "datetime-local"}
                            value={createEventForm.endDateTime}
                            onChange={(e) => handleInputChange("endDateTime", e.target.value)}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Location Section */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <Input
                        type="text"
                        value={createEventForm.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="Enter event location (optional if virtual)"
                        className="w-full"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end pb-6">
                  <Button
                    variant="outline"
                    onClick={handleCancelCreate}
                    className="px-6"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateEvent}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6"
                  >
                    Create Event
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Search and Filters */}
                <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
                  <div className="flex-1 max-w-sm">
                    <div className="relative">
                      <svg
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {["all", "awaited", "registration-due", "upcoming", "confirmed"].map(
                      (filter) => (
                        <Button
                          key={filter}
                          size="sm"
                          variant={activeFilter === filter ? "default" : "outline"}
                          className="text-xs capitalize"
                          onClick={() => setActiveFilter(filter)}
                        >
                          {filter === "all"
                            ? "All"
                            : filter === "registration-due"
                            ? "Registration Due"
                            : filter}
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        {!showCreateEvent && (
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvents.map((event) => (
                <Card
                  key={event.id}
                  className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Event Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                            {event.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getStatusColor(
                                event.status
                              )}`}
                            >
                              {event.status === "registration-due"
                                ? "REGISTRATION DUE"
                                : event.status.toUpperCase()}
                            </span>
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getTypeColor(
                                event.type
                              )}`}
                            >
                              {event.type.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="space-y-2">
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {event.description}
                        </p>

                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            <span>{event.attendees} Attendees</span>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {event.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-6 px-2"
                          >
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                              />
                            </svg>
                            Share
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs h-6 px-2"
                          >
                            Join
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  No events found
                </h3>
                <p className="text-xs text-gray-500">
                  Try adjusting your search terms
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
