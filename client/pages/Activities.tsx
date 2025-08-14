import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FooterNavigation from "@/components/FooterNavigation";

export default function Activities() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [footerCollapsed, setFooterCollapsed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const allActivities = [
    {
      id: 1,
      type: "onboarding",
      title: "New Candidate John Doe joined the HR Department",
      description:
        "Complete onboarding process including documentation review and workspace setup",
      department: "HR Department",
      timestamp: "10 mins ago",
      status: "active",
      priority: "high",
      assignee: "Sarah Wilson",
      icon: "user",
      color: "blue",
    },
    {
      id: 2,
      type: "assessment",
      title: "Sarah Johnson Completed AI Assessment",
      description:
        "Successfully completed technical assessment with score of 89%. Proceeding to next interview round.",
      department: "HR Department",
      timestamp: "1 hour ago",
      status: "completed",
      priority: "medium",
      assignee: "Mike Chen",
      icon: "check",
      color: "emerald",
    },
    {
      id: 3,
      type: "performance",
      title: "Q2 Performance Reviews Completed for Engineering Team",
      description:
        "All 45 engineering team members have completed their quarterly performance reviews",
      department: "Engineering",
      timestamp: "1 day ago",
      status: "completed",
      priority: "medium",
      assignee: "Emma Davis",
      icon: "chart",
      color: "purple",
    },
    {
      id: 4,
      type: "payroll",
      title: "Monthly Payroll Processed Successfully for 1,245 Employees",
      description:
        "All salary payments, bonuses, and deductions have been processed and transferred",
      department: "Finance",
      timestamp: "2 days ago",
      status: "completed",
      priority: "high",
      assignee: "James Wilson",
      icon: "dollar",
      color: "amber",
    },
    {
      id: 5,
      type: "training",
      title: "Security Training Session Scheduled",
      description:
        "Mandatory cybersecurity training for all employees scheduled for next week",
      department: "IT Security",
      timestamp: "3 days ago",
      status: "pending",
      priority: "medium",
      assignee: "Alex Rodriguez",
      icon: "shield",
      color: "red",
    },
    {
      id: 6,
      type: "promotion",
      title: "Employee Promotion: Marketing Manager to Senior Manager",
      description:
        "Lisa Thompson has been promoted to Senior Marketing Manager effective immediately",
      department: "Marketing",
      timestamp: "4 days ago",
      status: "completed",
      priority: "low",
      assignee: "David Kim",
      icon: "trending-up",
      color: "green",
    },
    {
      id: 7,
      type: "interview",
      title: "Final Interview Scheduled for Frontend Developer Position",
      description:
        "Last round interview with CTO scheduled for candidate Maria Rodriguez",
      department: "Engineering",
      timestamp: "5 days ago",
      status: "pending",
      priority: "high",
      assignee: "Sarah Wilson",
      icon: "users",
      color: "indigo",
    },
    {
      id: 8,
      type: "policy",
      title: "New Remote Work Policy Implementation",
      description:
        "Updated remote work guidelines now in effect across all departments",
      department: "HR Department",
      timestamp: "1 week ago",
      status: "completed",
      priority: "medium",
      assignee: "Mike Chen",
      icon: "home",
      color: "teal",
    },
    {
      id: 9,
      type: "training",
      title: "Leadership Development Program Enrollment Open",
      description:
        "Applications now open for Q3 leadership development program",
      department: "HR Department",
      timestamp: "1 week ago",
      status: "active",
      priority: "low",
      assignee: "Emma Davis",
      icon: "award",
      color: "orange",
    },
    {
      id: 10,
      type: "system",
      title: "HRMS System Maintenance Completed",
      description:
        "Scheduled maintenance on HR management system completed successfully",
      department: "IT Department",
      timestamp: "2 weeks ago",
      status: "completed",
      priority: "high",
      assignee: "Tech Team",
      icon: "settings",
      color: "gray",
    },
  ];

  const filters = [
    { id: "all", label: "All Activities", count: allActivities.length },
    {
      id: "active",
      label: "Active",
      count: allActivities.filter((a) => a.status === "active").length,
    },
    {
      id: "completed",
      label: "Completed",
      count: allActivities.filter((a) => a.status === "completed").length,
    },
    {
      id: "pending",
      label: "Pending",
      count: allActivities.filter((a) => a.status === "pending").length,
    },
  ];

  const priorities = [
    { id: "high", label: "High Priority", color: "red" },
    { id: "medium", label: "Medium Priority", color: "yellow" },
    { id: "low", label: "Low Priority", color: "green" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const currentScrollY = scrollContainerRef.current.scrollTop;
      const isScrollingDown = currentScrollY > lastScrollY;
      const isScrollingUp = currentScrollY < lastScrollY;

      if (currentScrollY > 50) {
        setFooterCollapsed(isScrollingUp);
      } else {
        setFooterCollapsed(false);
      }

      setLastScrollY(currentScrollY);
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [lastScrollY]);

  const getIconSvg = (iconType: string) => {
    const icons = {
      user: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      check: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      chart:
        "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      dollar:
        "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
      shield:
        "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      "trending-up": "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
      users:
        "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",
      home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      award:
        "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
      settings:
        "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    };
    return icons[iconType as keyof typeof icons] || icons.settings;
  };

  const filteredActivities = allActivities.filter((activity) => {
    const matchesFilter =
      activeFilter === "all" || activity.status === activeFilter;
    const matchesSearch =
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: "bg-red-100 text-red-800 border-red-300",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
      low: "bg-green-100 text-green-800 border-green-300",
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-blue-100 text-blue-800 border-blue-300",
      completed: "bg-green-100 text-green-800 border-green-300",
      pending: "bg-orange-100 text-orange-800 border-orange-300",
    };
    return colors[status as keyof typeof status] || colors.pending;
  };

  return (
    <>
      <Layout>
        <div
          ref={scrollContainerRef}
          className="min-h-screen bg-white overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 py-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Button
                      onClick={() => navigate("/dashboard")}
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
                      Back to Dashboard
                    </Button>
                  </div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    All Activities
                  </h1>
                  <p className="text-gray-500 mt-1 text-sm">
                    Company activities and updates
                  </p>
                </div>
              </div>

              {/* Search Only */}
              <div className="flex items-center justify-start mt-4">
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
                      placeholder="Search activities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-sm bg-white/70 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activities List */}
          <div className="p-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-3">
                {filteredActivities.map((activity) => (
                  <Card
                    key={activity.id}
                    className="bg-white border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 bg-gradient-to-br from-${activity.color}-400 to-${activity.color}-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm`}
                        >
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={getIconSvg(activity.icon)}
                            />
                          </svg>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-sm font-medium text-gray-900 mb-1">
                                {activity.title}
                              </h3>
                              <p className="text-gray-600 text-xs leading-relaxed mb-2">
                                {activity.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 ml-3">
                              <span
                                className={`px-2 py-0.5 rounded text-xs font-medium border ${getPriorityColor(activity.priority)}`}
                              >
                                {activity.priority.charAt(0).toUpperCase() +
                                  activity.priority.slice(1)}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(activity.status)}`}
                              >
                                {activity.status.charAt(0).toUpperCase() +
                                  activity.status.slice(1)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
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
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                  />
                                </svg>
                                <span className="font-medium text-indigo-600">
                                  {activity.department}
                                </span>
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
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                                <span>{activity.assignee}</span>
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
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <span>{activity.timestamp}</span>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredActivities.length === 0 && (
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
                        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">
                    No activities found
                  </h3>
                  <p className="text-xs text-gray-500">
                    Try adjusting your search terms
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>

    </>
  );
}
