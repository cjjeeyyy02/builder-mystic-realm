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
} from "lucide-react";

export default function Dashboard() {
  const [dateRange, setDateRange] = useState("all-departments");

  // Employee Growth Data for chart
  const employeeGrowthData = [
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
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Main Content */}
          <div className="col-span-8 space-y-6">
            {/* Top Metrics Row */}
            <div className="grid grid-cols-4 gap-4">
              {/* Total Employees */}
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Total Employees</h3>
                    <Users className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                    <p className="text-xs text-blue-600">↗ Previous month</p>
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Pending Onboarding Status</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Active Candidates */}
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Active Candidates</h3>
                    <UserCheck className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                    <p className="text-xs text-blue-600">↗ Not Increase</p>
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Active 6 oncomitl Candidates</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Average Performance */}
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Average Performance</h3>
                    <BarChart3 className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                    <p className="text-xs text-blue-600">↗ All Previous</p>
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Average Module Performance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pending Task */}
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Pending Task</h3>
                    <Clock className="w-4 h-4 text-orange-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-gray-900">23,000</p>
                    <p className="text-xs text-orange-600">↗ All Increase</p>
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Completed Echo Odo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Secondary Metrics Row */}
            <div className="grid grid-cols-4 gap-4">
              {/* On AdamBoarding */}
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">On AdamBoarding</h3>
                    <Users className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                    <p className="text-xs text-blue-600">↗ All Increased</p>
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Formaly OnBoarding</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* On Probation */}
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">On Probation</h3>
                    <Clock className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                    <p className="text-xs text-blue-600">↗ All Group</p>
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Probationary Employees</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Onboarding */}
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Onboarding</h3>
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-gray-900">23,000</p>
                    <p className="text-xs text-blue-600">↗ All PERMABAN</p>
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Viewen Payment</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Completed Tasks */}
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Completed Tasks</h3>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                    <p className="text-xs text-green-600">↗ All Module</p>
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Completed 6352 Goal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Employee Growth Trends Chart */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Employee Growth Trends</h3>
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
                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">New Hire</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">Exit</span>
                  </div>
                </div>

                {/* Chart */}
                <div className="relative h-64">
                  <div className="flex items-end justify-between h-full space-x-2">
                    {employeeGrowthData.map((data, index) => {
                      const maxValue = 45;
                      const newHireHeight = (data.newHire / maxValue) * 100;
                      const exitHeight = (data.exit / maxValue) * 100;
                      
                      return (
                        <div key={data.month} className="flex flex-col items-center space-y-2 flex-1">
                          <div className="flex space-x-1 items-end h-48 w-full">
                            <div
                              className="bg-blue-500 rounded-t w-1/2 transition-all duration-300 hover:bg-blue-600"
                              style={{ height: `${newHireHeight}%` }}
                              title={`New Hires: ${data.newHire}`}
                            />
                            <div
                              className="bg-gray-400 rounded-t w-1/2 transition-all duration-300 hover:bg-gray-500"
                              style={{ height: `${exitHeight}%` }}
                              title={`Exits: ${data.exit}`}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{data.month}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Department Distribution - Full Width */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Department Distribution</h3>

                {/* Donut Chart */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-32 h-32">
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
                <div className="grid grid-cols-5 gap-4 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Engineering</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">Finance</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">HR</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">Marketing</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">Sales</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Events */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Company Events</h3>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" className="text-xs">Latest</Button>
                    <Button size="sm" variant="default" className="text-xs bg-blue-500">Calendar</Button>
                    <Button size="sm" variant="ghost" className="text-xs">More Events</Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Event 1 */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-gray-900">Tech Summer 2024</h4>
                      <div className="flex space-x-1">
                        <Badge className="text-xs bg-blue-100 text-blue-700">Oplolloner</Badge>
                        <Badge className="text-xs bg-purple-100 text-purple-700">ADMate</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Join us for the biggest Tech event of the year featuring innovative and industry insights</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
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
                    <Button size="sm" className="bg-blue-500 text-white text-xs">
                      Deva or Calendar
                    </Button>
                  </div>

                  {/* Event 2 */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-gray-900">Tech Summer 2024</h4>
                      <div className="flex space-x-1">
                        <Badge className="text-xs bg-orange-100 text-orange-700">Onwamster</Badge>
                        <Badge className="text-xs bg-purple-100 text-purple-700">ADMate</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Join us for the biggest Tech event of the year featuring innovative and industry insights</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
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
                    <Button size="sm" className="bg-blue-500 text-white text-xs">
                      Share to Forum
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Recent Activities */}
          <div className="col-span-4">
            <Card className="bg-white border-0 shadow-sm h-fit">
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
          </div>
        </div>
      </div>
    </Layout>
  );
}
