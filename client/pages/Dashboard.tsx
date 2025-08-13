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
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-xs text-gray-700">New Hires</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-xs text-gray-700">Exit</span>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="h-40 relative">
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
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-end gap-0.5 h-32">
                          <div className="w-3 bg-emerald-500 rounded-t" style={{height: '48px'}}></div>
                          <div className="w-3 bg-red-500 rounded-t" style={{height: '16px'}}></div>
                        </div>
                        <div className="text-xs text-gray-600 whitespace-nowrap">Jun</div>
                      </div>

                      {/* May */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-end gap-0.5 h-32">
                          <div className="w-3 bg-emerald-500 rounded-t" style={{height: '76px'}}></div>
                          <div className="w-3 bg-red-500 rounded-t" style={{height: '24px'}}></div>
                        </div>
                        <div className="text-xs text-gray-600 whitespace-nowrap">May</div>
                      </div>

                      {/* April */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-end gap-0.5 h-32">
                          <div className="w-3 bg-emerald-500 rounded-t" style={{height: '84px'}}></div>
                          <div className="w-3 bg-red-500 rounded-t" style={{height: '32px'}}></div>
                        </div>
                        <div className="text-xs text-gray-600 whitespace-nowrap">Apr</div>
                      </div>

                      {/* March */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-end gap-0.5 h-32">
                          <div className="w-3 bg-emerald-500 rounded-t" style={{height: '42px'}}></div>
                          <div className="w-3 bg-red-500 rounded-t" style={{height: '36px'}}></div>
                        </div>
                        <div className="text-xs text-gray-600 whitespace-nowrap">Mar</div>
                      </div>

                      {/* February */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-end gap-0.5 h-32">
                          <div className="w-3 bg-emerald-500 rounded-t" style={{height: '74px'}}></div>
                          <div className="w-3 bg-red-500 rounded-t" style={{height: '24px'}}></div>
                        </div>
                        <div className="text-xs text-gray-600 whitespace-nowrap">Feb</div>
                      </div>

                      {/* January */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-end gap-0.5 h-32">
                          <div className="w-3 bg-emerald-500 rounded-t" style={{height: '102px'}}></div>
                          <div className="w-3 bg-red-500 rounded-t" style={{height: '22px'}}></div>
                        </div>
                        <div className="text-xs text-gray-600 whitespace-nowrap">Jan</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Department Distribution */}
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="mb-3">
                    <h3 className="text-base font-semibold text-gray-900">Department Distribution</h3>
                    <p className="text-xs text-gray-500 mt-1">Employee Count by Department</p>
                  </div>

                  {/* Donut Chart */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-28 h-28">
                      <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 42 42">
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
                          stroke="#10b981"
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
                          stroke="#3b82f6"
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
                          stroke="#8b5cf6"
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
                          stroke="#f59e0b"
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
                          stroke="#ef4444"
                          strokeWidth="3"
                          strokeDasharray="10 90"
                          strokeDashoffset="-90"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">Engineering</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">Finance</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">HR</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">Marketing</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2 justify-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">Sales</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Company Events - Full Width */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6 mb-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Company Events</h3>
                    <p className="text-xs text-gray-500 mt-1">Company Upcoming events and activities</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="default" className="text-xs bg-blue-500 h-7 px-3">
                      List
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs h-7 px-3">
                      Calendar
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Event 1 - Tech Summer 2024 */}
                  <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-sm font-semibold text-gray-900">Tech Summer 2024</h4>
                        <div className="flex gap-1">
                          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
                            Awaited
                          </span>
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            Conference
                          </span>
                          <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                            Workshop
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">Join us for the biggest Tech event discussing innovative and industry insights</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>29/06/2024</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>Grand Convention Center</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>2529 Attendees</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-blue-500 text-white text-xs ml-4">
                      Going to Event
                    </Button>
                  </div>

                  {/* Event 2 - Team Building Workshop */}
                  <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-sm font-semibold text-gray-900">Team Building and Innovation Workshop</h4>
                        <div className="flex gap-1">
                          <span className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-700/10">
                            Registration Due
                          </span>
                          <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                            Innovation
                          </span>
                          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
                            Awaited
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">Collaboration Workshop focusing on innovation methodologies and Team dynamics</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>15/07/2024</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>Training Center</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>156 Attendees</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-blue-500 text-white text-xs ml-4">
                      Going to Event
                    </Button>
                  </div>

                  {/* Event 3 - Holiday Celebration */}
                  <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-sm font-semibold text-gray-900">Holiday Celebration and Award Night</h4>
                        <div className="flex gap-1">
                          <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                            Creative
                          </span>
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            Social
                          </span>
                          <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-700/10">
                            Awards
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">Annual Celebration and Award ceremony, dinner and entertainment</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>20/12/2024</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>Skyline Rooftop</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>45 Attendees</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-blue-500 text-white text-xs ml-4">
                      Going to Event
                    </Button>
                  </div>
                </div>

                {/* View all events link */}
                <div className="mt-4">
                  <Button variant="link" className="text-blue-600 hover:text-blue-700 text-xs p-0">
                    View all events →
                  </Button>
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
              <CardContent className="p-6 pb-12">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Latest E Forum Updates</h3>
                    <p className="text-xs text-gray-500 mt-1">Employee discussion forum</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs h-6 px-2">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    Voice Search
                  </Button>
                </div>

                <div className="space-y-2">
                  {/* Forum Post 1 */}
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-semibold">SJ</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-xs font-semibold text-gray-900">Sarah Jhonson</h4>
                          <span className="text-xs text-gray-500">HR • 1h ago</span>
                        </div>
                        <p className="text-xs text-gray-800 mb-1 leading-relaxed">
                          New Remote Policy Guidelines - HOT: Work-life balance approach for transparent workplace.
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            <span>32</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>35</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92S19.61 16.08 18 16.08z"/>
                            </svg>
                            <span>5</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>245</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Forum Post 2 */}
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-semibold">SJ</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-xs font-semibold text-gray-900">Sarah Jhonson</h4>
                          <span className="text-xs text-gray-500">HR • 2h ago</span>
                        </div>
                        <p className="text-xs text-gray-800 mb-1 leading-relaxed">
                          Q2 Performance Updates: Team performance metrics and development goals discussion.
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            <span>28</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>22</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92S19.61 16.08 18 16.08z"/>
                            </svg>
                            <span>3</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>189</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Forum Post 3 */}
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-semibold">MJ</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-xs font-semibold text-gray-900">Mike Johnson</h4>
                          <span className="text-xs text-gray-500">Engineering • 4h ago</span>
                        </div>
                        <p className="text-xs text-gray-800 mb-1 leading-relaxed">
                          Tech Stack Update: New tools and frameworks adoption for enhanced productivity.
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            <span>19</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>15</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92S19.61 16.08 18 16.08z"/>
                            </svg>
                            <span>7</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>156</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Forum Post 4 - Duplicate Mike Johnson */}
                  <div className="bg-gray-50 rounded-lg p-2 mt-2">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-semibold">MJ</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-xs font-semibold text-gray-900">Mike Johnson</h4>
                          <span className="text-xs text-gray-500">Engineering • 4h ago</span>
                        </div>
                        <p className="text-xs text-gray-800 mb-1 leading-relaxed">
                          Tech Stack Update: New tools and frameworks adoption for enhanced productivity.
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            <span>19</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>15</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92S19.61 16.08 18 16.08z"/>
                            </svg>
                            <span>7</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>156</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Forum Post 5 - Another Duplicate Mike Johnson */}
                  <div className="bg-gray-50 rounded-lg p-2 mt-2">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-semibold">MJ</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-xs font-semibold text-gray-900">Mike Johnson</h4>
                          <span className="text-xs text-gray-500">Engineering • 4h ago</span>
                        </div>
                        <p className="text-xs text-gray-800 mb-1 leading-relaxed">
                          Tech Stack Update: New tools and frameworks adoption for enhanced productivity.
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            <span>19</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>15</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92S19.61 16.08 18 16.08z"/>
                            </svg>
                            <span>7</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>156</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
