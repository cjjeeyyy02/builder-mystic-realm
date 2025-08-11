import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
  Search,
  Bell,
  Settings,
  Plus,
  ChevronDown,
  MoreHorizontal,
  Calendar,
  DollarSign,
  ArrowUpRight,
  Users,
  Eye,
  BarChart3,
  FileText,
  Zap,
  MapPin,
} from "lucide-react";

export default function Dashboard() {
  const [dateRange, setDateRange] = useState("january-may-2024");

  // Sample data for the dashboard
  const recentActivities = [
    {
      id: 1,
      activity: "New Candidate John Doe joined the HR Department",
      category: "Onboarding",
      department: "HR",
      time: "2 hours ago",
      icon: "👤",
    },
    {
      id: 2,
      activity: "New Candidate Sarah Johnson Completed AI Assessment",
      category: "Onboarding",
      department: "HR",
      time: "5 hours ago",
      icon: "👤",
    },
    {
      id: 3,
      activity: "New Candidate Sarah Johnson started Onboarding",
      category: "Onboarding",
      department: "HR",
      time: "2 hours ago",
      icon: "👤",
    },
    {
      id: 4,
      activity: "Q2 Performance reviews completed for engineering",
      category: "Performance",
      department: "Engineering Team",
      time: "2 hours ago",
      icon: "👤",
    },
    {
      id: 5,
      activity: "New Candidate John Doe joined the HR Department",
      category: "Onboarding",
      department: "HR",
      time: "2 hours ago",
      icon: "👤",
    },
    {
      id: 6,
      activity: "Monthly payroll process successfully for 1245",
      category: "Payroll",
      department: "Finance",
      time: "2 hours ago",
      icon: "👤",
    },
    {
      id: 7,
      product: "Treek Datstar T-Shirt",
      date: "Jul 12th, 2024",
      amount: "0.0WESTRAC",
      status: "Completed",
      avatar: "T",
    },
  ];

  // Employee growth data for bar chart
  const employeeGrowthData = [
    { month: "Jan", newHires: 12, exits: 3 },
    { month: "Feb", newHires: 8, exits: 5 },
    { month: "Mar", newHires: 15, exits: 2 },
    { month: "Apr", newHires: 10, exits: 4 },
    { month: "May", newHires: 18, exits: 6 },
    { month: "Jun", newHires: 14, exits: 3 },
    { month: "Jul", newHires: 20, exits: 7 },
    { month: "Aug", newHires: 16, exits: 4 },
    { month: "Sep", newHires: 13, exits: 8 },
    { month: "Oct", newHires: 17, exits: 5 },
    { month: "Nov", newHires: 11, exits: 6 },
    { month: "Dec", newHires: 9, exits: 3 },
  ];

  const salesData = [
    { month: "Jan", income: 40, expenses: 30 },
    { month: "Feb", income: 35, expenses: 25 },
    { month: "Mar", income: 50, expenses: 35 },
    { month: "Apr", income: 45, expenses: 30 },
    { month: "May", income: 60, expenses: 40 },
    { month: "Jun", income: 55, expenses: 35 },
  ];

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    if (status === "Active") {
      return `${baseClasses} bg-green-100 text-green-700`;
    }
    if (status === "Onboarding") {
      return `${baseClasses} bg-blue-100 text-blue-700`;
    }
    return `${baseClasses} bg-yellow-100 text-yellow-700`;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">

        {/* Main Content */}
        <div className="px-8 py-6">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome to EMS Dashboard</h1>
              <p className="text-gray-600 text-sm">Employee Management System - Real Time Analytics and Insight</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="text-sm font-semibold">
                <FileText className="w-4 h-4 mr-2" />
                View Reports
              </Button>
              <Button variant="outline" size="sm" className="text-sm font-semibold">
                <Zap className="w-4 h-4 mr-2" />
                Quick Action
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="col-span-8 space-y-6">
              {/* Top Stats Row */}
              <div className="grid grid-cols-3 gap-6">
                {/* Employee Growth Card */}
                <Card className="bg-emerald-600 text-white col-span-1">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Users className="w-5 h-5" />
                      <span className="text-xs font-medium bg-emerald-700 px-2 py-1 rounded">Update</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Team growth increased</h3>
                      <p className="text-2xl font-bold mb-1">15% this month</p>
                      <p className="text-xs opacity-90">View analytics →</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Total Employees */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-600">Total Employees</h3>
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">248</span>
                      <div className="flex items-center text-green-600 text-sm">
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        +12 new hires
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Active Projects */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-600">Active Projects</h3>
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">32</span>
                      <div className="flex items-center text-red-600 text-sm">
                        <TrendingDown className="w-4 h-4 mr-1" />
                        -3 completed
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Employee Growth Trend - Full Width */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Employee Growth Trend</h3>
                  <span className="text-sm text-gray-600">Monthly Hiring and Exit Pattern</span>

                  {/* Legend */}
                  <div className="flex items-center justify-center space-x-6 mb-6 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span className="text-xs text-gray-600">New Hires</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded"></div>
                      <span className="text-xs text-gray-600">Exits</span>
                    </div>
                  </div>

                  {/* Bar Chart */}
                  <div className="relative h-48">
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
                      <span>25</span>
                      <span>20</span>
                      <span>15</span>
                      <span>10</span>
                      <span>5</span>
                      <span>0</span>
                    </div>

                    {/* Chart area */}
                    <div className="ml-6 h-full">
                      {/* Grid lines */}
                      <div className="absolute inset-0 ml-6">
                        {[0, 20, 40, 60, 80, 100].map((percent) => (
                          <div
                            key={percent}
                            className="absolute w-full border-t border-gray-100"
                            style={{ bottom: `${percent}%` }}
                          />
                        ))}
                      </div>

                      {/* Bars */}
                      <div className="flex items-end justify-between h-full relative z-10">
                        {employeeGrowthData.map((data, index) => {
                          const maxValue = 25; // Maximum value for scaling
                          const newHireHeight = (data.newHires / maxValue) * 100;
                          const exitHeight = (data.exits / maxValue) * 100;

                          return (
                            <div key={data.month} className="flex flex-col items-center space-y-1">
                              {/* Bars container */}
                              <div className="flex space-x-0.5 items-end h-40">
                                {/* New Hires bar */}
                                <div
                                  className="bg-green-500 w-3 rounded-t transition-all duration-300 hover:bg-green-600"
                                  style={{ height: `${newHireHeight}%` }}
                                  title={`New Hires: ${data.newHires}`}
                                />
                                {/* Exits bar */}
                                <div
                                  className="bg-red-500 w-3 rounded-t transition-all duration-300 hover:bg-red-600"
                                  style={{ height: `${exitHeight}%` }}
                                  title={`Exits: ${data.exits}`}
                                />
                              </div>
                              {/* Month label */}
                              <span className="text-xs text-gray-600 mt-2">
                                {data.month}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities and Company Events Row */}
              <div className="grid grid-cols-2 gap-6">
                {/* Recent Activities */}
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Recent Activities</h3>
                      <p className="text-sm text-gray-600">Latest updates across the company.</p>
                    </div>

                    <div className="space-y-3">
                      {recentActivities.slice(0, 6).map((activity) => (
                        <div key={activity.id} className="border-b border-gray-100 pb-3 last:border-b-0">
                          <div className="flex items-start space-x-2">
                            <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                              <span className="text-xs text-blue-600">👤</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-900 leading-tight mb-1">
                                {activity.activity}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <span className={`text-xs px-2 py-0.5 rounded ${
                                    activity.category === 'Onboarding' ? 'bg-blue-100 text-blue-700' :
                                    activity.category === 'Performance' ? 'bg-red-100 text-red-700' :
                                    activity.category === 'Payroll' ? 'bg-cyan-100 text-cyan-700' :
                                    'bg-gray-100 text-gray-700'
                                  }`}>
                                    {activity.category}
                                  </span>
                                  <span className="text-xs text-gray-600">{activity.department}</span>
                                </div>
                                <span className="text-xs text-gray-500">{activity.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 text-center">
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        View all activities
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Company Events */}
                <Card className="flex-grow">
                  <CardContent className="p-6 flex flex-col justify-start items-start h-full">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Company Events</h3>
                      <div className="flex items-center space-x-3">
                        <Button variant="ghost" size="sm" className="text-xs text-gray-600">
                          List
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs text-blue-600 bg-blue-50">
                          Calendar 2
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                          View all events
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Event Card 1 */}
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="mb-3">
                          <h4 className="font-semibold text-gray-900 text-sm mb-2">Tech Summer 2024</h4>
                          <div className="flex flex-wrap gap-1 mb-3">
                            <Badge variant="secondary" className="text-xs px-2 py-1 bg-gray-200 text-gray-700">
                              #techvent
                            </Badge>
                            <Badge variant="secondary" className="text-xs px-2 py-1 bg-teal-100 text-teal-700">
                              Conference
                            </Badge>
                            <Badge variant="secondary" className="text-xs px-2 py-1 bg-blue-100 text-blue-700">
                              AZANA
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                            Join us for the biggest Tech event of the year featuring innovative and industry insights.
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>June, 27 2025</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>Grand Convention Center</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>250 Attendees</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white text-xs h-7">
                            Share to Forum
                          </Button>
                        </div>
                      </div>

                      {/* Event Card 2 */}
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="mb-3">
                          <h4 className="font-semibold text-gray-900 text-sm mb-2">Tech Summer 2024</h4>
                          <div className="flex flex-wrap gap-1 mb-3">
                            <Badge variant="secondary" className="text-xs px-2 py-1 bg-gray-200 text-gray-700">
                              #techvent
                            </Badge>
                            <Badge variant="secondary" className="text-xs px-2 py-1 bg-teal-100 text-teal-700">
                              Conference
                            </Badge>
                            <Badge variant="secondary" className="text-xs px-2 py-1 bg-blue-100 text-blue-700">
                              AZANA
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                            Join us for the biggest Tech event of the year featuring innovative and industry insights.
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>June, 27 2025</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>Grand Convention Center</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>250 Attendees</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white text-xs h-7">
                            Share to Forum
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-4 flex flex-col space-y-6 pb-[200px]">
              {/* Department Distribution */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Department Distribution</h3>

                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">Employee Count by Department</div>
                  </div>

                  {/* Department Distribution Chart */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-40 h-40">
                      {/* Placeholder for donut chart - could be replaced with actual chart library */}
                      <div className="w-full h-full rounded-full border-8 border-gray-200 relative">
                        <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-blue-500 border-r-blue-500" style={{transform: 'rotate(0deg)'}}></div>
                        <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-gray-400 border-r-gray-400" style={{transform: 'rotate(120deg)'}}></div>
                        <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-blue-300" style={{transform: 'rotate(180deg)'}}></div>
                      </div>
                    </div>
                  </div>

                  {/* Department Legend */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">Engineering</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                      <span className="text-gray-600">HR</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span className="text-gray-600">Marketing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                      <span className="text-gray-600">Finance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                      <span className="text-gray-600">Sales</span>
                    </div>
                  </div>
                </CardContent>
              </Card>


              {/* Level Up Card */}
              <Card className="bg-gradient-to-br from-green-400 to-green-600 text-white">
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
