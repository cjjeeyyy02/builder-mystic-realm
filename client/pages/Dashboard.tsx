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
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 text-sm">An any way to manage sales with care and precision.</p>
            </div>

            <div className="flex items-center space-x-4">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-48">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="january-may-2024">January 2024 - May 2024</SelectItem>
                  <SelectItem value="june-october-2024">June 2024 - October 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="col-span-8 space-y-6">
              {/* Top Stats Row */}
              <div className="grid grid-cols-3 gap-6">
                {/* Sales Update Card */}
                <Card className="bg-emerald-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-xs font-medium bg-emerald-700 px-2 py-1 rounded">Update</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Sales revenue increased</h3>
                      <p className="text-2xl font-bold mb-1">40% in 1 week</p>
                      <p className="text-xs opacity-90">See Statistics →</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Net Income */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-600">Net Income</h3>
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="mb-2">
                      <span className="text-3xl font-bold text-gray-900">$193,000</span>
                    </div>
                    <div className="flex items-center text-green-600 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +35% from last month
                    </div>
                  </CardContent>
                </Card>

                {/* Total Return */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-600">Total Return</h3>
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="mb-2">
                      <span className="text-3xl font-bold text-gray-900">$32,000</span>
                    </div>
                    <div className="flex items-center text-red-600 text-sm">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      -24% from last month
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Transaction and Revenue Row */}
              <div className="grid grid-cols-2 gap-6">
                {/* Transaction */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Transaction</h3>
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                            👕
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">Premium T-Shirt</p>
                            <p className="text-xs text-gray-500">Jul 12th 2024</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">Completed</p>
                          <p className="text-xs text-gray-500">0.JWEIJS75NC</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                            🎮
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">PlayStation 5</p>
                            <p className="text-xs text-gray-500">Jul 12th 2024</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-orange-600">Pending</p>
                          <p className="text-xs text-gray-500">0.JWEIJS75NC</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                            👔
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">Hoodie Gombong</p>
                            <p className="text-xs text-gray-500">Jul 12th 2024</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-orange-600">Pending</p>
                          <p className="text-xs text-gray-500">0.JWEIJS75NC</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                            📱
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">iPhone 15 Pro Max</p>
                            <p className="text-xs text-gray-500">Jul 10th 2024</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">Completed</p>
                          <p className="text-xs text-gray-500">0.JWEIJS75NC</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                            🍃
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">Lotse</p>
                            <p className="text-xs text-gray-500">Jul 12th 2024</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">Completed</p>
                          <p className="text-xs text-gray-500">0.JWEIJS75NC</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                            ☕
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">Starbucks</p>
                            <p className="text-xs text-gray-500">Jul 12th 2024</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">Completed</p>
                          <p className="text-xs text-gray-500">0.JWEIJS75NC</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Revenue Chart */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-gray-800 rounded"></div>
                          <span className="text-gray-600">Income</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-400 rounded"></div>
                          <span className="text-gray-600">Expenses</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-2xl font-bold text-gray-900">$193,000</span>
                      <span className="text-sm text-green-600 ml-2">+35% from last month</span>
                    </div>

                    {/* Revenue Chart */}
                    <div className="relative h-48">
                      <div className="flex items-end justify-between h-full space-x-2">
                        {salesData.map((data, index) => (
                          <div key={data.month} className="flex flex-col items-center space-y-1 flex-1">
                            <div className="flex space-x-1 items-end h-32 w-full">
                              <div
                                className="bg-gray-800 rounded-t w-1/2 transition-all duration-300"
                                style={{ height: `${(data.income / 60) * 100}%` }}
                                title={`Income: $${data.income}k`}
                              />
                              <div
                                className="bg-green-400 rounded-t w-1/2 transition-all duration-300"
                                style={{ height: `${(data.expenses / 60) * 100}%` }}
                                title={`Expenses: $${data.expenses}k`}
                              />
                            </div>
                            <span className="text-xs text-gray-600">{data.month}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sales Report */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Sales Report</h3>
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">Product Launched (231)</span>
                        <span className="text-xs text-gray-500">100%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">Ongoing Product (23)</span>
                        <span className="text-xs text-gray-500">65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">Product Sold (482)</span>
                        <span className="text-xs text-gray-500">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
                    <span>0</span>
                    <span>100</span>
                    <span>200</span>
                    <span>300</span>
                    <span>400</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="col-span-4 flex flex-col space-y-6">
              {/* Total View Performance */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Total View Performance</h3>

                  {/* Donut Chart */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-40 h-40">
                      <div className="w-full h-full rounded-full border-8 border-gray-200 relative">
                        <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-green-400 border-r-green-400" style={{transform: 'rotate(0deg)', borderTopWidth: '20px', borderRightWidth: '20px'}}></div>
                        <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-orange-400 border-r-orange-400" style={{transform: 'rotate(120deg)', borderTopWidth: '10px', borderRightWidth: '10px'}}></div>
                        <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-gray-600" style={{transform: 'rotate(200deg)', borderTopWidth: '8px'}}></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Total Count</p>
                          <p className="text-2xl font-bold text-gray-900">565K</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-gray-600">68%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                        <span className="text-gray-600">16%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                        <span className="text-gray-600">23%</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-4">Here are some tips on how to improve your score</p>
                    <Button variant="outline" size="sm" className="text-gray-600">
                      Guide Views
                    </Button>
                  </div>

                  <div className="mt-6 text-center">
                    <div className="flex items-center justify-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>View Count</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                        <span>Percentage</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span>Sales</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Level Up Sales Card */}
              <Card className="bg-gradient-to-br from-green-400 to-green-600 text-white overflow-hidden">
                <CardContent className="p-6 relative">
                  <div className="relative z-10">
                    <h3 className="text-lg font-semibold mb-2">Level up your sales managing to the next level.</h3>
                    <p className="text-sm opacity-90 mb-6">An any way to manage sales with care and precision.</p>
                    <Button className="bg-green-700 hover:bg-green-800 text-white">
                      Update to Slohoma+
                    </Button>
                  </div>
                  <div className="absolute top-0 right-0 opacity-20">
                    <div className="w-32 h-32 bg-white rounded-full transform translate-x-16 -translate-y-8"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
