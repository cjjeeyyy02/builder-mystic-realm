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
} from "lucide-react";

export default function Dashboard() {
  const [dateRange, setDateRange] = useState("january-may-2024");

  // Sample data for the dashboard
  const transactions = [
    {
      id: 1,
      product: "Premium T-Shirt",
      date: "Jul 12th, 2024",
      amount: "0.0WESTRAC",
      status: "Completed",
      avatar: "T",
    },
    {
      id: 2,
      product: "PlayStation 5",
      date: "Jul 11th, 2024",
      amount: "0.0WESTRAC",
      status: "Pending",
      avatar: "P",
    },
    {
      id: 3,
      product: "Hoodie Combinag",
      date: "Jul 10th, 2024",
      amount: "0.0WESTRAC",
      status: "Pending",
      avatar: "H",
    },
    {
      id: 4,
      product: "iPhone 15 Pro Max",
      date: "Jul 12th, 2024",
      amount: "0.0WESTRAC",
      status: "Completed",
      avatar: "I",
    },
    {
      id: 5,
      product: "Lotus",
      date: "Jul 12th, 2024",
      amount: "0.0WESTRAC",
      status: "Completed",
      avatar: "L",
    },
    {
      id: 6,
      product: "Starbucks",
      date: "Jul 12th, 2024",
      amount: "0.0WESTRAC",
      status: "Completed",
      avatar: "S",
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
    if (status === "Completed") {
      return `${baseClasses} bg-green-100 text-green-700`;
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
                {/* Sales Revenue Card */}
                <Card className="bg-emerald-600 text-white col-span-1">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-xs font-medium bg-emerald-700 px-2 py-1 rounded">Update</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Sales revenue increased</h3>
                      <p className="text-2xl font-bold mb-1">40% in 1 week</p>
                      <p className="text-xs opacity-90">See statistics →</p>
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
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">$193,000</span>
                      <div className="flex items-center text-green-600 text-sm">
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        +35% from last month
                      </div>
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
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">$32,000</span>
                      <div className="flex items-center text-red-600 text-sm">
                        <TrendingDown className="w-4 h-4 mr-1" />
                        -24% from last month
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Transaction and Revenue Row */}
              <div className="grid grid-cols-2 gap-6">
                {/* Transactions */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Transaction</h3>
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </div>
                    
                    <div className="space-y-4">
                      {transactions.slice(0, 7).map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-gray-600">
                                {transaction.avatar}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {transaction.product}
                              </p>
                              <p className="text-xs text-gray-500">{transaction.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                              {transaction.amount}
                            </p>
                            <span className={getStatusBadge(transaction.status)}>
                              {transaction.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Revenue Chart */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl font-bold text-gray-900">$193,000</span>
                        <div className="flex items-center text-green-600 text-sm">
                          <ArrowUpRight className="w-4 h-4 mr-1" />
                          +35% from last month
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-xs">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-600">Income</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-600">Expenses</span>
                        </div>
                      </div>
                    </div>

                    {/* Simple Bar Chart */}
                    <div className="flex items-end justify-between h-32 space-x-2">
                      {salesData.map((data, index) => (
                        <div key={index} className="flex flex-col items-center space-y-1 flex-1">
                          <div className="flex flex-col justify-end h-20 w-full space-y-1">
                            <div 
                              className="bg-blue-600 rounded-t"
                              style={{ height: `${(data.income / 60) * 100}%` }}
                            ></div>
                            <div 
                              className="bg-green-500 rounded-b"
                              style={{ height: `${(data.expenses / 60) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600">{data.month}</span>
                        </div>
                      ))}
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
                        <span className="text-sm font-medium text-gray-900">Product Launched (833)</span>
                        <span className="text-xs text-gray-500">100</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">Ongoing Product (12)</span>
                        <span className="text-xs text-gray-500">200</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">Product Sold (404)</span>
                        <span className="text-xs text-gray-500">300</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="col-span-4 space-y-6">
              {/* Performance Chart */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="relative w-40 h-40 mx-auto mb-4">
                      {/* Donut Chart Placeholder */}
                      <div className="w-full h-full rounded-full border-8 border-gray-200 relative">
                        <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-orange-400 border-r-green-500 border-b-green-500 transform -rotate-45"></div>
                        <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">565K</div>
                            <div className="text-xs text-gray-500">Total Count</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                          <span className="text-gray-600">16%</span>
                        </div>
                        <span className="font-medium">23%</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-600">68%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-xs text-gray-500">
                      <div className="flex items-center justify-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span>Income</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>Expenses</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-4">
                      Here are some tips on how to improve your score.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Guide Views */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Guide Views</h3>
                  
                  <div className="flex items-center justify-center space-x-4 text-xs mb-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">View Count</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-600">Percentage</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span className="text-gray-600">Sales</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Level Up Card */}
              <Card className="bg-gradient-to-br from-green-400 to-green-600 text-white">
                <CardContent className="p-6 relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-2">Level up your sales</h3>
                    <h4 className="text-lg font-bold mb-2">managing to the</h4>
                    <h4 className="text-lg font-bold mb-4">next level.</h4>
                    
                    <p className="text-sm opacity-90 mb-6">
                      An easy way to manage sales with care and precision.
                    </p>
                    
                    <Button className="bg-emerald-700 hover:bg-emerald-800 text-white">
                      Update to Siohioma+
                    </Button>
                  </div>
                  
                  {/* Decorative element */}
                  <div className="absolute -right-4 -bottom-4 w-20 h-20 text-green-300 opacity-20">
                    <BarChart3 className="w-full h-full" />
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
