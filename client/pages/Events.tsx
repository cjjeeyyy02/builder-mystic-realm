import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Events() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const allEvents = [
    {
      id: 1,
      title: "Tech Summer 2024",
      description: "Join us for the biggest Tech event discussing innovative and industry insights",
      date: "29/06/2024",
      location: "Grand Convention Center",
      attendees: 2529,
      status: "awaited",
      type: "conference",
      tags: ["Conference", "Workshop"],
      category: "Technology"
    },
    {
      id: 2,
      title: "Team Building and Innovation Workshop",
      description: "Collaboration Workshop focusing on innovation methodologies and Team dynamics",
      date: "15/07/2024",
      location: "Training Center",
      attendees: 156,
      status: "registration-due",
      type: "workshop",
      tags: ["Innovation", "Team Building"],
      category: "Development"
    },
    {
      id: 3,
      title: "Holiday Celebration and Award Night",
      description: "Annual Celebration and Award ceremony, dinner and entertainment",
      date: "20/12/2024",
      location: "Skyline Rooftop",
      attendees: 45,
      status: "upcoming",
      type: "social",
      tags: ["Awards", "Social", "Creative"],
      category: "Company Culture"
    },
    {
      id: 4,
      title: "Q3 Performance Review Summit",
      description: "Quarterly performance evaluation and goal setting session for all departments",
      date: "15/09/2024",
      location: "Main Conference Hall",
      attendees: 200,
      status: "upcoming",
      type: "meeting",
      tags: ["Performance", "Review"],
      category: "HR"
    },
    {
      id: 5,
      title: "Product Launch Webinar",
      description: "Virtual presentation of our latest product features and roadmap updates",
      date: "05/08/2024",
      location: "Virtual Event",
      attendees: 500,
      status: "awaited",
      type: "webinar",
      tags: ["Product", "Launch"],
      category: "Marketing"
    },
    {
      id: 6,
      title: "Annual Leadership Retreat",
      description: "Strategic planning and leadership development for senior management",
      date: "12/11/2024",
      location: "Mountain Resort",
      attendees: 25,
      status: "invitation-only",
      type: "retreat",
      tags: ["Leadership", "Strategy"],
      category: "Executive"
    }
  ];

  const filters = [
    { id: "all", label: "All Events", count: allEvents.length },
    { id: "awaited", label: "Awaited", count: allEvents.filter(e => e.status === "awaited").length },
    { id: "upcoming", label: "Upcoming", count: allEvents.filter(e => e.status === "upcoming").length },
    { id: "registration-due", label: "Registration Due", count: allEvents.filter(e => e.status === "registration-due").length }
  ];

  const categories = ["All", "Technology", "Development", "Company Culture", "HR", "Marketing", "Executive"];

  const filteredEvents = allEvents.filter(event => {
    const matchesFilter = activeFilter === "all" || event.status === activeFilter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      awaited: "bg-green-100 text-green-800 border-green-300",
      upcoming: "bg-blue-100 text-blue-800 border-blue-300",
      "registration-due": "bg-orange-100 text-orange-800 border-orange-300",
      "invitation-only": "bg-purple-100 text-purple-800 border-purple-300"
    };
    return colors[status as keyof typeof colors] || colors.upcoming;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      conference: "bg-indigo-100 text-indigo-800",
      workshop: "bg-purple-100 text-purple-800",
      social: "bg-pink-100 text-pink-800",
      meeting: "bg-gray-100 text-gray-800",
      webinar: "bg-cyan-100 text-cyan-800",
      retreat: "bg-amber-100 text-amber-800"
    };
    return colors[type as keyof typeof colors] || colors.meeting;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        {/* Header */}
        <div className="backdrop-blur-sm bg-white/80 border-b border-gray-200/50 px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Button
                    onClick={() => navigate('/dashboard')}
                    variant="outline"
                    className="bg-white/70 border-gray-300 hover:bg-white"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Dashboard
                  </Button>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  All Events
                </h1>
                <p className="text-gray-600 mt-2 text-lg">Discover and join company events, workshops, and activities</p>
              </div>
              <div className="flex items-center gap-4">
                <Button 
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Event
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search events, locations, or descriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/70 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeFilter === filter.id
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                        : 'bg-white/70 text-gray-600 hover:bg-white hover:text-orange-600 border border-gray-200'
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="backdrop-blur-sm bg-white/90 border border-gray-200/50 hover:shadow-lg hover:border-orange-200/50 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">{event.description}</p>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                              {event.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="font-medium text-orange-600">{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              <span>{event.attendees} Attendees</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="text-xs">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View Details
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                              </svg>
                              Share to Forum
                            </Button>
                            <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-xs">
                              Join Event
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-500">Try adjusting your search terms or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
