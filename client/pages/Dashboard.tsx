import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  TrendingDown,
  Users,
  UserCheck,
  Clock,
  CheckCircle,
  BarChart3,
  Calendar,
  MapPin,
  Search,
  MessageSquare,
  Eye,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Grid3X3,
} from "lucide-react";

export default function Dashboard() {
  const [dateRange, setDateRange] = useState("all-departments");
  const [showAllMetrics, setShowAllMetrics] = useState(false);

  // Metrics Cards Data
  const metricsCards = [
    {
      id: 1,
      title: "Total Employees",
      value: "1,247",
      trend: "↗ Previous month",
      description: "Pending Onboarding Status",
      icon: Users,
      iconColor: "text-blue-500"
    },
    {
      id: 2,
      title: "Active Candidates",
      value: "1,247",
      trend: "↗ Not Increase",
      description: "Active 6 oncomitl Candidates",
      icon: UserCheck,
      iconColor: "text-blue-500"
    },
    {
      id: 3,
      title: "Average Performance",
      value: "1,247",
      trend: "↗ All Previous",
      description: "Average Module Performance",
      icon: BarChart3,
      iconColor: "text-blue-500"
    },
    {
      id: 4,
      title: "Pending Task",
      value: "23,000",
      trend: "↗ All Increase",
      description: "Completed Echo Odo",
      icon: Clock,
      iconColor: "text-orange-500"
    },
    {
      id: 5,
      title: "On AdamBoarding",
      value: "1,247",
      trend: "↗ All Increased",
      description: "Formaly OnBoarding",
      icon: Users,
      iconColor: "text-blue-500"
    },
    {
      id: 6,
      title: "On Probation",
      value: "1,247",
      trend: "↗ All Group",
      description: "Probationary Employees",
      icon: Clock,
      iconColor: "text-blue-500"
    },
    {
      id: 7,
      title: "Onboarding",
      value: "23,000",
      trend: "↗ All PERMABAN",
      description: "Viewen Payment",
      icon: CheckCircle,
      iconColor: "text-blue-500"
    },
    {
      id: 8,
      title: "Completed Tasks",
      value: "1,247",
      trend: "↗ All Module",
      description: "Completed 6352 Goal",
      icon: CheckCircle,
      iconColor: "text-green-500"
    }
  ];

  // Employee Growth Data for chart - All 12 months with status data
  const employeeGrowthData = [
    { month: "Jan", newHire: 5, exit: 3 },
    { month: "Feb", newHire: 8, exit: 4 },
    { month: "Mar", newHire: 12, exit: 6 },
    { month: "Apr", newHire: 15, exit: 8 },
    { month: "May", newHire: 18, exit: 5 },
    { month: "Jun", newHire: 22, exit: 7 },
    { month: "Jul", newHire: 25, exit: 9 },
    { month: "Aug", newHire: 28, exit: 6 },
    { month: "Sep", newHire: 32, exit: 11 },
    { month: "Oct", newHire: 35, exit: 8 },
    { month: "Nov", newHire: 38, exit: 12 },
    { month: "Dec", newHire: 42, exit: 10 },
  ];

  // Recent Activities Data
  const recentActivities = [
    {
      id: 1,
      text: "Gwon Doe (20) Short company",
      type: "Onboarding",
      category: "HR Group",
      time: "10h ago",
      isNew: true,
    },
    {
      id: 2,
      text: "New Candidate successful completed for training, Papua",
      type: "Onboarding",
      category: "HR Group", 
      time: "2d ago",
      isNew: true,
    },
    {
      id: 3,
      text: "ICP Performance routed is completed for Education Completion",
      type: "Onboarding",
      category: "HR Group",
      time: "4d ago",
      isNew: false,
    },
    {
      id: 4,
      text: "Monthly payroll process successful financy Completed by...uc",
      type: "Payroll",
      category: "HR",
      time: "10:31 ago",
      isNew: false,
    },
  ];

  // Forum Posts Data
  const forumPosts = [
    {
      id: 1,
      author: "Sarah Jhonson",
      time: "Latest Post 9 in secway Ago",
      content: "New Candidate policy Guidelines. HOT intraassurum our appreascin for Work ballo-noli Atter — 9 dors complement host estady through Iron Disc...",
      comments: 10,
      shares: 8,
      views: 601,
    },
    {
      id: 2,
      author: "Sarah Jhonson", 
      time: "Withiout Fury 9 in secway Ago",
      content: "New Candidate policy Guidelines. HOT intraassurum our appreascin for Work tralo-noli Atter +10 dors complement host estady through Iron Disc...",
      comments: 20,
      shares: 750,
      views: 1125,
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-3">
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-12 gap-4">
          {/* Main Content */}
          <div className="col-span-8 space-y-4">
            {/* Metrics Cards - Conditional Layout */}
            {showAllMetrics ? (
              // Grid View - Show all 8 cards in a 4x2 grid
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">All Metrics</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAllMetrics(false)}
                    className="text-xs"
                  >
                    <ChevronUp className="w-4 h-4 mr-1" />
                    Collapse View
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {metricsCards.map((metric) => {
                    const IconComponent = metric.icon;
                    return (
                      <Card key={metric.id} className="bg-white border-0 shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
                            <IconComponent className={`w-4 h-4 ${metric.iconColor}`} />
                          </div>
                          <div className="space-y-1">
                            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                            <p className="text-xs text-blue-600">{metric.trend}</p>
                            <div className="mt-2">
                              <p className="text-xs text-gray-500">{metric.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ) : (
              // Horizontal Scrollable View - Show first 4 cards with scroll
              <div className="relative">
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
                    {metricsCards.map((metric) => {
                      const IconComponent = metric.icon;
                      return (
                        <Card key={metric.id} className="bg-white border-0 shadow-sm flex-shrink-0 w-52">
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xs font-medium text-gray-600">{metric.title}</h3>
                              <IconComponent className={`w-3 h-3 ${metric.iconColor}`} />
                            </div>
                            <div className="space-y-1">
                              <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                              <p className="text-xs text-blue-600">{metric.trend}</p>
                              <div className="mt-2">
                                <p className="text-xs text-gray-500">{metric.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}

                    {/* Toggle Button at the end */}
                    <div className="flex-shrink-0 flex items-center justify-center w-16">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAllMetrics(true)}
                        className="h-8 w-8 p-0 hover:bg-gray-100"
                      >
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-gray-50 to-transparent w-8 h-full pointer-events-none"></div>
              </div>
            )}

            {/* Employee Growth Trends Chart */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Employee Growth Trends</h3>
                    <p className="text-xs text-gray-600 mt-1">Monthly hiring and exit patterns</p>
                  </div>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-departments">All Department</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-start mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-sm shadow-sm"></div>
                      <span className="text-xs font-medium text-gray-700">New Hires</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-red-500 rounded-sm shadow-sm"></div>
                      <span className="text-xs font-medium text-gray-700">Exits</span>
                    </div>
                  </div>
                </div>

                {/* Professional Chart with Axes */}
                <div className="relative">
                  {/* Chart Container */}
                  <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100 p-4">
                    {/* Y-Axis */}
                    <div className="absolute left-0 top-4 bottom-12 w-10 flex flex-col justify-between text-xs text-gray-500">
                      <span className="text-right pr-2">50</span>
                      <span className="text-right pr-2">40</span>
                      <span className="text-right pr-2">30</span>
                      <span className="text-right pr-2">20</span>
                      <span className="text-right pr-2">10</span>
                      <span className="text-right pr-2">0</span>
                    </div>

                    {/* Chart Area */}
                    <div className="ml-10 mr-4 relative">
                      {/* Horizontal Grid Lines */}
                      <div className="absolute inset-0 flex flex-col justify-between">
                        {[0, 1, 2, 3, 4, 5].map((line) => (
                          <div
                            key={line}
                            className="w-full border-t border-gray-200"
                            style={{ borderStyle: line === 5 ? 'solid' : 'dashed', borderWidth: line === 5 ? '1px' : '0.5px' }}
                          />
                        ))}
                      </div>

                      {/* Chart Bars */}
                      <div className="relative h-64 flex items-end justify-between px-2">
                        {employeeGrowthData.map((data, index) => {
                          const maxValue = 50;
                          const newHireHeight = (data.newHire / maxValue) * 100;
                          const exitHeight = (data.exit / maxValue) * 100;

                          return (
                            <div key={data.month} className="flex-1 flex flex-col items-center group max-w-16">
                              {/* Month Status Bars Container */}
                              <div className="relative w-full h-64 flex items-end justify-center gap-1">
                                {/* New Hire Status Bar */}
                                <div className="relative w-4">
                                  <div
                                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md shadow-sm transition-all duration-300 group-hover:from-blue-700 group-hover:to-blue-500 group-hover:shadow-md relative border border-blue-300"
                                    style={{ height: `${newHireHeight}%`, minHeight: '4px' }}
                                  >
                                    {/* Value label on hover */}
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 shadow-lg">
                                      {data.newHire} New Hires
                                    </div>
                                    {/* Status indicator */}
                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full border border-white shadow-sm"></div>
                                  </div>
                                </div>

                                {/* Exit Status Bar */}
                                <div className="relative w-4">
                                  <div
                                    className="w-full bg-gradient-to-t from-red-500 to-red-300 rounded-t-md shadow-sm transition-all duration-300 group-hover:from-red-600 group-hover:to-red-400 group-hover:shadow-md relative border border-red-200"
                                    style={{ height: `${exitHeight}%`, minHeight: '4px' }}
                                  >
                                    {/* Value label on hover */}
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 shadow-lg">
                                      {data.exit} Exits
                                    </div>
                                    {/* Status indicator */}
                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full border border-white shadow-sm"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* X-Axis Labels */}
                      <div className="flex justify-between mt-4 text-xs text-gray-600 font-medium">
                        {employeeGrowthData.map((data) => (
                          <span key={data.month} className="flex-1 text-center">
                            {data.month}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* X-Axis Title */}
                    <div className="text-center mt-4 text-xs text-gray-500 font-medium">
                      Months (2024)
                    </div>
                  </div>

                  {/* Y-Axis Title */}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-500 font-medium whitespace-nowrap">
                    Count
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Department Distribution - Full Width */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Department Distribution</h3>

                {/* Donut Chart */}
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-24 h-24">
                    <div className="w-full h-full rounded-full border-8 border-gray-200 relative">
                      <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-blue-500 border-r-blue-500" style={{transform: 'rotate(0deg)'}}></div>
                      <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-orange-400" style={{transform: 'rotate(120deg)'}}></div>
                      <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-teal-400" style={{transform: 'rotate(180deg)'}}></div>
                      <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-green-400" style={{transform: 'rotate(240deg)'}}></div>
                      <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-purple-400" style={{transform: 'rotate(300deg)'}}></div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="grid grid-cols-5 gap-3 text-center">
                  <div className="flex flex-col items-center space-y-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Engineering</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-xs text-gray-600">Finance</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                    <span className="text-xs text-gray-600">HR</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-gray-600">Marketing</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-xs text-gray-600">Sales</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Events */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-gray-900">Company Events</h3>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" className="text-xs h-7">List</Button>
                    <Button size="sm" variant="default" className="text-xs bg-blue-500 h-7">Calendar</Button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {/* Event 1 */}
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-gray-900 text-xs">Tech Summer 2024</h4>
                      <div className="flex space-x-1">
                        <Badge className="text-xs bg-blue-100 text-blue-700">Oplolloner</Badge>
                        <Badge className="text-xs bg-purple-100 text-purple-700">ADMate</Badge>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">Join us for the biggest Tech event of the year featuring innovative and industry insights</p>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>June 27, 2025</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>Grand Convention Center</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>250 Attend</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-blue-500 text-white text-xs w-full">
                      Share to Forum
                    </Button>
                  </div>

                  {/* Event 2 */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-gray-900 text-sm">Tech Summer 2024</h4>
                      <div className="flex space-x-1">
                        <Badge className="text-xs bg-orange-100 text-orange-700">Onwamster</Badge>
                        <Badge className="text-xs bg-purple-100 text-purple-700">ADMate</Badge>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">Join us for the biggest Tech event of the year featuring innovative and industry insights</p>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>June 27, 2025</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>Grand Convention Center</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>150 Attens</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-blue-500 text-white text-xs w-full">
                      Share to Forum
                    </Button>
                  </div>

                  {/* Event 3 */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-gray-900 text-sm">Tech Summer 2024</h4>
                      <div className="flex space-x-1">
                        <Badge className="text-xs bg-orange-100 text-orange-700">Onwamster</Badge>
                        <Badge className="text-xs bg-purple-100 text-purple-700">ADMate</Badge>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">Join us for the biggest Tech event of the year featuring innovative and industry insights</p>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>June 27, 2025</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>Grand Convention Center</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>150 Attens</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-blue-500 text-white text-xs w-full">
                      Share to Forum
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Recent Activities and Latest E-Forum */}
          <div className="col-span-4 space-y-6">
            {/* Recent Activities */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activities</h3>

                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 mb-1">{activity.text}</p>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={`text-xs ${
                            activity.type === 'Onboarding' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {activity.type}
                          </Badge>
                          <span className="text-xs text-gray-500">{activity.category}</span>
                          {activity.isNew && (
                            <Badge className="text-xs bg-red-100 text-red-700">New</Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button variant="link" className="text-sm text-blue-600">
                    View all activities
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Latest E-Forum */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Latest E-Forum</h3>
                </div>

                <div className="space-y-4">
                  {forumPosts.map((post) => (
                    <div key={post.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-semibold">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-sm font-semibold text-gray-900">{post.author}</h4>
                          </div>
                          <p className="text-xs text-gray-500 mb-2">{post.time}</p>
                          <p className="text-xs text-gray-600 leading-relaxed mb-3">{post.content}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="w-3 h-3" />
                              <span>{post.comments} Comments</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="w-3 h-3" />
                              <span>Share</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{post.views} Views</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </Layout>
  );
}
