import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">EMS Dashboard</h1>
              <p className="text-gray-600">Employee Management System - Real-Time Analytics</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="bg-white">
                Quick Action
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                View Reports
              </Button>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Main Content */}
          <div className="col-span-8 space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-4 gap-4">
              {/* Total Employees */}
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">Total Employees</h3>
                    <p className="text-3xl font-bold text-gray-900 mb-2">1,247</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-600">+30 this month</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Active workspace size</p>
                  </div>
                </CardContent>
              </Card>

              {/* Active Candidates */}
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">Active Candidates</h3>
                    <p className="text-3xl font-bold text-gray-900 mb-2">24</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-600">+3 this week</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">New hires and candidates</p>
                  </div>
                </CardContent>
              </Card>

              {/* Average Performance */}
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">Average Performance</h3>
                    <p className="text-3xl font-bold text-gray-900 mb-2">4.5/5</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-600">+0.3 improvement</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Overall team performance</p>
                  </div>
                </CardContent>
              </Card>

              {/* Pending Tasks */}
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-orange-500 rounded-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">Pending Tasks</h3>
                    <p className="text-3xl font-bold text-gray-900 mb-2">18</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-orange-600">5 from last week</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Outstanding hiring tasks</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Second Row - Charts */}
            <div className="grid grid-cols-2 gap-6">
              {/* Employee Growth Trends */}
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Growth Trends</h3>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Chart Area</p>
                  </div>
                </CardContent>
              </Card>

              {/* Department Distribution */}
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Chart Area</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Company Events - Full Width */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6 mb-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Events</h3>
                <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Events Content</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Recent Activities */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
                <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Activities Content</p>
                </div>
              </CardContent>
            </Card>

            {/* Latest E-Forum */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6 mb-36">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest E-Forum</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Forum Content</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
