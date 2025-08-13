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
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Total Employees</h3>
                    <p className="text-3xl font-bold text-gray-900 mb-1">1247</p>
                    <p className="text-xs text-gray-500">Active Workspace size</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Total Employees</h3>
                    <p className="text-3xl font-bold text-gray-900 mb-1">1247</p>
                    <p className="text-xs text-gray-500">Active Workspace size</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Total Employees</h3>
                    <p className="text-3xl font-bold text-gray-900 mb-1">1247</p>
                    <p className="text-xs text-gray-500">Active Workspace size</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Total Employees</h3>
                    <p className="text-3xl font-bold text-gray-900 mb-1">1247</p>
                    <p className="text-xs text-gray-500">Active Workspace size</p>
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
              <CardContent className="p-6">
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
              <CardContent className="p-6">
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
