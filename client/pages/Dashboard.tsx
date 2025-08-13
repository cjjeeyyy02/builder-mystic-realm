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
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">Employee Growth Trends</h3>
                      <p className="text-xs text-gray-500 mt-1">Monthly hiring and exit patterns</p>
                    </div>
                    <select className="text-xs border border-gray-300 rounded-md px-2 py-1 bg-white">
                      <option>All Department</option>
                      <option>Engineering</option>
                      <option>HR</option>
                      <option>Finance</option>
                      <option>Marketing</option>
                      <option>Sales</option>
                    </select>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-gray-700">New Hires</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                      <span className="text-xs text-gray-700">Exit</span>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="h-32 relative">
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-1">
                      <span className="text-xs">80</span>
                      <span className="text-xs">60</span>
                      <span className="text-xs">40</span>
                      <span className="text-xs">20</span>
                      <span className="text-xs">0</span>
                    </div>

                    {/* Chart area */}
                    <div className="ml-6 h-full flex items-end justify-between gap-1">
                      {/* June */}
                      <div className="flex-1 flex items-end gap-0.5">
                        <div className="flex flex-col items-end">
                          <div className="w-3 bg-blue-500 rounded-t-sm" style={{height: '45px'}}></div>
                          <div className="text-xs text-gray-600 mt-1 whitespace-nowrap">Jun</div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="w-2 bg-gray-800 rounded-t-sm" style={{height: '15px'}}></div>
                        </div>
                      </div>

                      {/* May */}
                      <div className="flex-1 flex items-end gap-0.5">
                        <div className="flex flex-col items-end">
                          <div className="w-3 bg-blue-500 rounded-t-sm" style={{height: '72px'}}></div>
                          <div className="text-xs text-gray-600 mt-1 whitespace-nowrap">May</div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="w-2 bg-gray-800 rounded-t-sm" style={{height: '24px'}}></div>
                        </div>
                      </div>

                      {/* April */}
                      <div className="flex-1 flex items-end gap-0.5">
                        <div className="flex flex-col items-end">
                          <div className="w-3 bg-blue-500 rounded-t-sm" style={{height: '78px'}}></div>
                          <div className="text-xs text-gray-600 mt-1 whitespace-nowrap">Apr</div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="w-2 bg-gray-800 rounded-t-sm" style={{height: '30px'}}></div>
                        </div>
                      </div>

                      {/* March */}
                      <div className="flex-1 flex items-end gap-0.5">
                        <div className="flex flex-col items-end">
                          <div className="w-3 bg-blue-500 rounded-t-sm" style={{height: '39px'}}></div>
                          <div className="text-xs text-gray-600 mt-1 whitespace-nowrap">Mar</div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="w-2 bg-gray-800 rounded-t-sm" style={{height: '33px'}}></div>
                        </div>
                      </div>

                      {/* February */}
                      <div className="flex-1 flex items-end gap-0.5">
                        <div className="flex flex-col items-end">
                          <div className="w-3 bg-blue-500 rounded-t-sm" style={{height: '69px'}}></div>
                          <div className="text-xs text-gray-600 mt-1 whitespace-nowrap">Feb</div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="w-2 bg-gray-800 rounded-t-sm" style={{height: '24px'}}></div>
                        </div>
                      </div>

                      {/* January */}
                      <div className="flex-1 flex items-end gap-0.5">
                        <div className="flex flex-col items-end">
                          <div className="w-3 bg-blue-500 rounded-t-sm" style={{height: '96px'}}></div>
                          <div className="text-xs text-gray-600 mt-1 whitespace-nowrap">Jan</div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="w-2 bg-gray-800 rounded-t-sm" style={{height: '21px'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Department Distribution */}
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Department Distribution</h3>
                    <p className="text-sm text-gray-500 mt-1">Employee Count by Department</p>
                  </div>

                  {/* Donut Chart */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-32 h-32">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 42 42">
                        {/* Background circle */}
                        <circle
                          cx="21"
                          cy="21"
                          r="15.915"
                          fill="transparent"
                          stroke="#f3f4f6"
                          strokeWidth="3"
                        />
                        {/* Engineering - 35% */}
                        <circle
                          cx="21"
                          cy="21"
                          r="15.915"
                          fill="transparent"
                          stroke="#3b82f6"
                          strokeWidth="3"
                          strokeDasharray="35 65"
                          strokeDashoffset="0"
                        />
                        {/* Finance - 20% */}
                        <circle
                          cx="21"
                          cy="21"
                          r="15.915"
                          fill="transparent"
                          stroke="#1f2937"
                          strokeWidth="3"
                          strokeDasharray="20 80"
                          strokeDashoffset="-35"
                        />
                        {/* HR - 15% */}
                        <circle
                          cx="21"
                          cy="21"
                          r="15.915"
                          fill="transparent"
                          stroke="#60a5fa"
                          strokeWidth="3"
                          strokeDasharray="15 85"
                          strokeDashoffset="-55"
                        />
                        {/* Marketing - 20% */}
                        <circle
                          cx="21"
                          cy="21"
                          r="15.915"
                          fill="transparent"
                          stroke="#6b7280"
                          strokeWidth="3"
                          strokeDasharray="20 80"
                          strokeDashoffset="-70"
                        />
                        {/* Sales - 10% */}
                        <circle
                          cx="21"
                          cy="21"
                          r="15.915"
                          fill="transparent"
                          stroke="#111827"
                          strokeWidth="3"
                          strokeDasharray="10 90"
                          strokeDashoffset="-90"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">Engineering</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-800 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">Finance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">HR</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">Marketing</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2 justify-center">
                      <div className="w-3 h-3 bg-gray-900 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">Sales</span>
                    </div>
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
                <div className="mb-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">Recent Activities</h3>
                  <p className="text-xs text-gray-500">Latest updates across the company</p>
                </div>

                <div className="space-y-3">
                  {/* Activity Item 1 */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-900 mb-1">
                          New Candidate John Doe joined the HR Department
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            Onboarding
                          </span>
                          <span className="text-xs text-gray-500">HR</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">10 mins ago</span>
                  </div>

                  {/* Activity Item 2 */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-900 mb-1">
                          New Candidate Sarah Johnson Completed AI Assessment
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            Onboarding
                          </span>
                          <span className="text-xs text-gray-500">HR</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">1 hour ago</span>
                  </div>

                  {/* Activity Item 3 */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-900 mb-1">
                          Q2 Performance reviews completed for engineering team
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center rounded-md bg-purple-50 px-1.5 py-0.5 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                            Review
                          </span>
                          <span className="text-xs text-gray-500">HR</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">1 day ago</span>
                  </div>

                  {/* Activity Item 4 */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-900 mb-1">
                          Monthly payroll process successfully for 1245 employees
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center rounded-md bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
                            Payroll
                          </span>
                          <span className="text-xs text-gray-500">HR</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">2 days ago</span>
                  </div>
                </div>

                {/* View All Activities Link */}
                <div className="mt-4 text-center">
                  <Button variant="link" className="text-blue-600 hover:text-blue-700 text-sm">
                    View All Activities →
                  </Button>
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
