import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FooterNavigation from "@/components/FooterNavigation";
import { useDarkMode } from "@/components/DarkModeProvider";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [isGrowthExpanded, setIsGrowthExpanded] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Department");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [footerCollapsed, setFooterCollapsed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [metricsCollapsed, setMetricsCollapsed] = useState(false);
  const metricsScrollRef = useRef<HTMLDivElement>(null);
  const [eventsView, setEventsView] = useState("list"); // "list" or "calendar"
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsDropdownOpen(false);
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

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

    const handleMetricsScroll = () => {
      if (!metricsScrollRef.current) return;

      const scrollLeft = metricsScrollRef.current.scrollLeft;
      setMetricsCollapsed(scrollLeft > 10);
    };

    const scrollContainer = scrollContainerRef.current;
    const metricsContainer = metricsScrollRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }

    if (metricsContainer) {
      metricsContainer.addEventListener("scroll", handleMetricsScroll, {
        passive: true,
      });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
      if (metricsContainer) {
        metricsContainer.removeEventListener("scroll", handleMetricsScroll);
      }
    };
  }, [lastScrollY]);

  return (
    <Layout>
      <div
        ref={scrollContainerRef}
        className={`min-h-screen p-6 overflow-y-auto transition-colors duration-300 ${
          isDarkMode
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
            : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'
        }`}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                EMS Dashboard
              </h1>
              <p className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Employee Management System - Real-Time Analytics
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                className={`transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600'
                    : 'bg-white'
                }`}
              >
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
            <div className="relative">
              <div
                ref={metricsScrollRef}
                className="overflow-x-auto scrollbar-hide"
              >
                <div className="flex gap-4 pb-2">
                  {/* First 4 Cards - Always Visible */}
                  <div className="grid grid-cols-4 gap-4 flex-shrink-0 w-full">
                    {/* Total Employees */}
                    <Card className={`shadow-sm hover:shadow-md transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-gradient-to-br from-blue-900/20 to-blue-800/30 border border-blue-700/30'
                        : 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200'
                    }`}>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1 bg-blue-500 rounded">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-xs font-medium mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Total Employees
                          </h3>
                          <p className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            1,247
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-green-600">
                              +30 this month
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            Active workspace size
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Active Candidates */}
                    <Card className={`shadow-sm hover:shadow-md transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-gradient-to-br from-green-900/20 to-green-800/30 border border-green-700/30'
                        : 'bg-gradient-to-br from-green-50 to-green-100 border border-green-200'
                    }`}>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1 bg-green-500 rounded">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-xs font-medium mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Active Candidates
                          </h3>
                          <p className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            24
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-green-600">
                              +3 this week
                            </span>
                          </div>
                          <p className={`text-xs mt-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            New hires and candidates
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Average Performance */}
                    <Card className={`shadow-sm hover:shadow-md transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-gradient-to-br from-purple-900/20 to-purple-800/30 border border-purple-700/30'
                        : 'bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200'
                    }`}>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1 bg-purple-500 rounded">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-xs font-medium mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Average Performance
                          </h3>
                          <p className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            4.5/5
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-green-600">
                              +0.3 improvement
                            </span>
                          </div>
                          <p className={`text-xs mt-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Overall team performance
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Pending Tasks */}
                    <Card className={`shadow-sm hover:shadow-md transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-gradient-to-br from-orange-900/20 to-orange-800/30 border border-orange-700/30'
                        : 'bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200'
                    }`}>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1 bg-orange-500 rounded">
                            <svg
                              className="w-3 h-3 text-white"
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
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-xs font-medium mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Pending Tasks
                          </h3>
                          <p className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            18
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-orange-600">
                              5 from last week
                            </span>
                          </div>
                          <p className={`text-xs mt-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Outstanding hiring tasks
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Additional Cards - Scrollable */}
                  <div className="flex gap-4 flex-shrink-0">
                    {/* Pending Onboarding */}
                    <Card className={`shadow-sm hover:shadow-md transition-all duration-300 flex-shrink-0 w-48 ${
                      isDarkMode
                        ? 'bg-gradient-to-br from-gray-800/20 to-gray-700/30 border border-gray-600/30'
                        : 'bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200'
                    }`}>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1 bg-gray-500 rounded">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-xs font-medium mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Pending Onboarding
                          </h3>
                          <p className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            10
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-blue-600">
                              +4 next week
                            </span>
                          </div>
                          <p className={`text-xs mt-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Awaiting onboarding
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* On Probation */}
                    <Card className={`shadow-sm hover:shadow-md transition-all duration-300 flex-shrink-0 w-48 ${
                      isDarkMode
                        ? 'bg-gradient-to-br from-yellow-900/20 to-yellow-800/30 border border-yellow-700/30'
                        : 'bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200'
                    }`}>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1 bg-yellow-500 rounded">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-xs font-medium mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            On Probation
                          </h3>
                          <p className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            15
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-yellow-600">
                              3 ending soon
                            </span>
                          </div>
                          <p className={`text-xs mt-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Probationary employees
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Offboarding */}
                    <Card className={`shadow-sm hover:shadow-md transition-all duration-300 flex-shrink-0 w-48 ${
                      isDarkMode
                        ? 'bg-gradient-to-br from-red-900/20 to-red-800/30 border border-red-700/30'
                        : 'bg-gradient-to-br from-red-50 to-red-100 border border-red-200'
                    }`}>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1 bg-red-500 rounded">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-xs font-medium mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Offboarding
                          </h3>
                          <p className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            5
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-red-600">
                              -3 next week
                            </span>
                          </div>
                          <p className={`text-xs mt-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Exit in progress
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Completed Tasks */}
                    <Card className={`shadow-sm hover:shadow-md transition-all duration-300 flex-shrink-0 w-48 ${
                      isDarkMode
                        ? 'bg-gradient-to-br from-emerald-900/20 to-emerald-800/30 border border-emerald-700/30'
                        : 'bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200'
                    }`}>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1 bg-emerald-500 rounded">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-xs font-medium mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Completed Tasks
                          </h3>
                          <p className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            142
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-emerald-600">
                              +12 today
                            </span>
                          </div>
                          <p className={`text-xs mt-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Successfully completed
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Scroll Indicator - Outside card */}
              <div className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-1 shadow-sm transition-all duration-300 ${
                metricsCollapsed ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'
              }`}>
                <svg
                  className="w-3 h-3 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>


              {/* All 8 Metrics Cards Dropdown */}
              {false && (
                <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* All 8 metrics cards */}

                    {/* Card 1 - Total Employees */}
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1 bg-blue-500 rounded">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xs font-medium text-gray-700 mb-1">Total Employees</h3>
                          <p className="text-xl font-bold text-gray-900 mb-1">1,247</p>
                          <span className="text-xs font-medium text-green-600">+30 this month</span>
                          <p className="text-xs text-gray-600 mt-1">Active workspace size</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Card 2 - Active Candidates */}
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1 bg-green-500 rounded">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xs font-medium text-gray-700 mb-1">Active Candidates</h3>
                          <p className="text-xl font-bold text-gray-900 mb-1">24</p>
                          <span className="text-xs font-medium text-green-600">+3 this week</span>
                          <p className="text-xs text-gray-600 mt-1">New hires and candidates</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Card 3 - Average Performance */}
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1 bg-purple-500 rounded">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xs font-medium text-gray-700 mb-1">Average Performance</h3>
                          <p className="text-xl font-bold text-gray-900 mb-1">4.5/5</p>
                          <span className="text-xs font-medium text-green-600">+0.3 improvement</span>
                          <p className="text-xs text-gray-600 mt-1">Overall team rating</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Card 4 - Completed Tasks */}
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1 bg-emerald-500 rounded">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xs font-medium text-gray-700 mb-1">Completed Tasks</h3>
                          <p className="text-xl font-bold text-gray-900 mb-1">142</p>
                          <span className="text-xs font-medium text-emerald-600">+12 today</span>
                          <p className="text-xs text-gray-600 mt-1">Successfully completed</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Card 5 - Pending Reviews */}
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1 bg-yellow-500 rounded">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xs font-medium text-gray-700 mb-1">Pending Reviews</h3>
                          <p className="text-xl font-bold text-gray-900 mb-1">18</p>
                          <span className="text-xs font-medium text-yellow-600">Requires attention</span>
                          <p className="text-xs text-gray-600 mt-1">Awaiting approval</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Card 6 - Department Goals */}
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1 bg-indigo-500 rounded">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xs font-medium text-gray-700 mb-1">Department Goals</h3>
                          <p className="text-xl font-bold text-gray-900 mb-1">85%</p>
                          <span className="text-xs font-medium text-indigo-600">On track</span>
                          <p className="text-xs text-gray-600 mt-1">Quarterly targets</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Card 7 - Budget Utilization */}
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1 bg-rose-500 rounded">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xs font-medium text-gray-700 mb-1">Budget Utilization</h3>
                          <p className="text-xl font-bold text-gray-900 mb-1">72%</p>
                          <span className="text-xs font-medium text-rose-600">$284K used</span>
                          <p className="text-xs text-gray-600 mt-1">Of $395K allocated</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Card 8 - Team Satisfaction */}
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1 bg-teal-500 rounded">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xs font-medium text-gray-700 mb-1">Team Satisfaction</h3>
                          <p className="text-xl font-bold text-gray-900 mb-1">4.2/5</p>
                          <span className="text-xs font-medium text-teal-600">High morale</span>
                          <p className="text-xs text-gray-600 mt-1">Latest survey results</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>

            {/* Second Row - Charts */}
            <div
              className={`${isGrowthExpanded ? "grid grid-cols-1" : "grid grid-cols-2"} gap-6`}
            >
              {/* Employee Growth Trends */}
              <Card
                className={`cursor-pointer hover:shadow-md transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-sky-900/20 to-blue-800/30 border border-sky-700/30'
                    : 'bg-gradient-to-br from-sky-50 to-blue-100 border border-sky-200'
                }`}
                onClick={() => setIsGrowthExpanded(!isGrowthExpanded)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-base font-semibold transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          Employee Growth Trends
                        </h3>
                        <svg
                          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isGrowthExpanded ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                      <p className={`text-xs mt-1 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {isGrowthExpanded
                          ? "Full year hiring and exit patterns"
                          : "Monthly hiring and exit patterns"}
                      </p>
                    </div>

                    {/* Department Filter Dropdown - Only show when expanded */}
                    {isGrowthExpanded && (
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsDropdownOpen(!isDropdownOpen);
                          }}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                          <span>{selectedDepartment}</span>
                          <svg
                            className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                          <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            {[
                              "All Department",
                              "Engineering",
                              "HR",
                              "Finance",
                              "Marketing",
                              "Sales",
                            ].map((dept) => (
                              <button
                                key={dept}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedDepartment(dept);
                                  setIsDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-150 ${
                                  selectedDepartment === dept
                                    ? "bg-blue-50 text-blue-700 font-medium"
                                    : "text-gray-700"
                                }`}
                              >
                                {dept}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className={`text-xs transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>New Hires</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className={`text-xs transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>Exit</span>
                    </div>
                  </div>

                  {/* Chart */}
                  <div
                    className={`${isGrowthExpanded ? "h-64" : "h-40"} relative transition-all duration-300`}
                  >
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-1">
                      <span className="text-xs">80</span>
                      <span className="text-xs">60</span>
                      <span className="text-xs">40</span>
                      <span className="text-xs">20</span>
                      <span className="text-xs">0</span>
                    </div>

                    {/* Chart area */}
                    <div
                      className={`ml-6 h-full flex items-end justify-between ${isGrowthExpanded ? "gap-2" : "gap-1"}`}
                    >
                      {isGrowthExpanded ? (
                        // Full year view (January to December)
                        <>
                          {/* January */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-end gap-0.5 h-52">
                              <div
                                className="w-4 bg-emerald-500 rounded-t"
                                style={{ height: "102px" }}
                              ></div>
                              <div
                                className="w-4 bg-red-500 rounded-t"
                                style={{ height: "22px" }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 whitespace-nowrap">
                              Jan
                            </div>
                          </div>
                          {/* February */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-end gap-0.5 h-52">
                              <div
                                className="w-4 bg-emerald-500 rounded-t"
                                style={{ height: "74px" }}
                              ></div>
                              <div
                                className="w-4 bg-red-500 rounded-t"
                                style={{ height: "24px" }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 whitespace-nowrap">
                              Feb
                            </div>
                          </div>
                          {/* March */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-end gap-0.5 h-52">
                              <div
                                className="w-4 bg-emerald-500 rounded-t"
                                style={{ height: "42px" }}
                              ></div>
                              <div
                                className="w-4 bg-red-500 rounded-t"
                                style={{ height: "36px" }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 whitespace-nowrap">
                              Mar
                            </div>
                          </div>
                          {/* April */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-end gap-0.5 h-52">
                              <div
                                className="w-4 bg-emerald-500 rounded-t"
                                style={{ height: "84px" }}
                              ></div>
                              <div
                                className="w-4 bg-red-500 rounded-t"
                                style={{ height: "32px" }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 whitespace-nowrap">
                              Apr
                            </div>
                          </div>
                          {/* May */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-end gap-0.5 h-52">
                              <div
                                className="w-4 bg-emerald-500 rounded-t"
                                style={{ height: "76px" }}
                              ></div>
                              <div
                                className="w-4 bg-red-500 rounded-t"
                                style={{ height: "24px" }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 whitespace-nowrap">
                              May
                            </div>
                          </div>
                          {/* June */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-end gap-0.5 h-52">
                              <div
                                className="w-4 bg-emerald-500 rounded-t"
                                style={{ height: "48px" }}
                              ></div>
                              <div
                                className="w-4 bg-red-500 rounded-t"
                                style={{ height: "16px" }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 whitespace-nowrap">
                              Jun
                            </div>
                          </div>
                          {/* July */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-end gap-0.5 h-52">
                              <div
                                className="w-4 bg-emerald-500 rounded-t"
                                style={{ height: "92px" }}
                              ></div>
                              <div
                                className="w-4 bg-red-500 rounded-t"
                                style={{ height: "18px" }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 whitespace-nowrap">
                              Jul
                            </div>
                          </div>
                          {/* August */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-end gap-0.5 h-52">
                              <div
                                className="w-4 bg-emerald-500 rounded-t"
                                style={{ height: "68px" }}
                              ></div>
                              <div
                                className="w-4 bg-red-500 rounded-t"
                                style={{ height: "28px" }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 whitespace-nowrap">
                              Aug
                            </div>
                          </div>
                          {/* September */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-end gap-0.5 h-52">
                              <div
                                className="w-4 bg-emerald-500 rounded-t"
                                style={{ height: "88px" }}
                              ></div>
                              <div
                                className="w-4 bg-red-500 rounded-t"
                                style={{ height: "15px" }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 whitespace-nowrap">
                              Sep
                            </div>
                          </div>
                          {/* October */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-end gap-0.5 h-52">
                              <div
                                className="w-4 bg-emerald-500 rounded-t"
                                style={{ height: "58px" }}
                              ></div>
                              <div
                                className="w-4 bg-red-500 rounded-t"
                                style={{ height: "26px" }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 whitespace-nowrap">
                              Oct
                            </div>
                          </div>
                          {/* November */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-end gap-0.5 h-52">
                              <div
                                className="w-4 bg-emerald-500 rounded-t"
                                style={{ height: "72px" }}
                              ></div>
                              <div
                                className="w-4 bg-red-500 rounded-t"
                                style={{ height: "20px" }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 whitespace-nowrap">
                              Nov
                            </div>
                          </div>
                          {/* December */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-end gap-0.5 h-52">
                              <div
                                className="w-4 bg-emerald-500 rounded-t"
                                style={{ height: "45px" }}
                              ></div>
                              <div
                                className="w-4 bg-red-500 rounded-t"
                                style={{ height: "12px" }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 whitespace-nowrap">
                              Dec
                            </div>
                          </div>
                        </>
                      ) : (
                        // Condensed view (last 6 months)
                        <>
                          {/* June */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-end gap-0.5 h-32">
                              <div
                                className="w-3 bg-emerald-500 rounded-t"
                                style={{ height: "48px" }}
                              ></div>
                              <div
                                className="w-3 bg-red-500 rounded-t"
                                style={{ height: "16px" }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 whitespace-nowrap">
                              Jun
                            </div>
                          </div>
                          {/* May */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-end gap-0.5 h-32">
                              <div
                                className="w-3 bg-emerald-500 rounded-t"
                                style={{ height: "76px" }}
                              ></div>
                              <div
                                className="w-3 bg-red-500 rounded-t"
                                style={{ height: "24px" }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 whitespace-nowrap">
                              May
                            </div>
                          </div>
                          {/* April */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-end gap-0.5 h-32">
                              <div
                                className="w-3 bg-emerald-500 rounded-t"
                                style={{ height: "84px" }}
                              ></div>
                              <div
                                className="w-3 bg-red-500 rounded-t"
                                style={{ height: "32px" }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 whitespace-nowrap">
                              Apr
                            </div>
                          </div>
                          {/* March */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-end gap-0.5 h-32">
                              <div
                                className="w-3 bg-emerald-500 rounded-t"
                                style={{ height: "42px" }}
                              ></div>
                              <div
                                className="w-3 bg-red-500 rounded-t"
                                style={{ height: "36px" }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 whitespace-nowrap">
                              Mar
                            </div>
                          </div>
                          {/* February */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-end gap-0.5 h-32">
                              <div
                                className="w-3 bg-emerald-500 rounded-t"
                                style={{ height: "74px" }}
                              ></div>
                              <div
                                className="w-3 bg-red-500 rounded-t"
                                style={{ height: "24px" }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 whitespace-nowrap">
                              Feb
                            </div>
                          </div>
                          {/* January */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-end gap-0.5 h-32">
                              <div
                                className="w-3 bg-emerald-500 rounded-t"
                                style={{ height: "102px" }}
                              ></div>
                              <div
                                className="w-3 bg-red-500 rounded-t"
                                style={{ height: "22px" }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 whitespace-nowrap">
                              Jan
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Department Distribution */}
              {!isGrowthExpanded && (
                <Card className={`transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-slate-800/20 to-gray-700/30 border border-gray-600/30'
                    : 'bg-gradient-to-br from-slate-50 to-gray-100 border border-gray-200'
                }`}>
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <h3 className={`text-base font-semibold transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Department Distribution
                      </h3>
                      <p className={`text-xs mt-1 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Employee Count by Department
                      </p>
                    </div>

                    {/* Donut Chart */}
                    <div className="flex items-center justify-center mb-4">
                      <div className="relative w-28 h-28">
                        <svg
                          className="w-28 h-28 transform -rotate-90"
                          viewBox="0 0 42 42"
                        >
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
                        <span className={`transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Engineering</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <span className={`transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Finance</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                        <span className={`transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>HR</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                        <span className={`transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Sales</span>
                      </div>
                      <div className="flex items-center gap-1.5 col-span-2 justify-center">
                        <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                        <span className={`transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Marketing</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Company Events - Full Width */}
            <Card className={`transition-all duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-br from-indigo-900/20 to-blue-800/30 border border-indigo-700/30'
                : 'bg-gradient-to-br from-indigo-50 to-blue-100 border border-indigo-200'
            }`}>
              <CardContent className="p-6 mb-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className={`text-base font-semibold transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Company Events
                    </h3>
                    <p className={`text-xs mt-1 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Company Upcoming events and activities
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant={eventsView === "list" ? "default" : "outline"}
                      className="text-xs h-7 px-3"
                      onClick={() => setEventsView("list")}
                    >
                      List
                    </Button>
                    <Button
                      size="sm"
                      variant={eventsView === "calendar" ? "default" : "outline"}
                      className="text-xs h-7 px-3"
                      onClick={() => setEventsView("calendar")}
                    >
                      Calendar
                    </Button>
                  </div>
                </div>

                {/* Conditional Content: List View or Calendar View */}
                {eventsView === "list" ? (
                  <div>
                    <div className="space-y-3">
                      {/* Event 1 - Tech Summer 2024 */}
                  <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-sm font-semibold text-gray-900">
                          Tech Summer 2024
                        </h4>
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
                      <p className="text-xs text-gray-600 mb-2">
                        Join us for the biggest Tech event discussing innovative
                        and industry insights
                      </p>
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
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>29/06/2024</span>
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
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>Grand Convention Center</span>
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
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          <span>2529 Attendees</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-6 px-2 flex items-center gap-1"
                      >
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
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                          />
                        </svg>
                        Share to Forum
                      </Button>
                    </div>
                  </div>

                  {/* Event 2 - Team Building Workshop */}
                  <div className="relative p-3 bg-gray-50 rounded-lg pb-12">
                    <div className="pr-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-sm font-semibold text-gray-900">
                          Team Building and Innovation Workshop
                        </h4>
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
                      <p className="text-xs text-gray-600 mb-2">
                        Collaboration Workshop focusing on innovation
                        methodologies and Team dynamics
                      </p>
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
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>15/07/2024</span>
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
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>Training Center</span>
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
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          <span>156 Attendees</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute bottom-3 right-3 text-xs h-6 px-2 flex items-center gap-1"
                    >
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
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                        />
                      </svg>
                      Share to Forum
                    </Button>
                  </div>

                  {/* Event 3 - Holiday Celebration */}
                  <div className="relative p-3 bg-gray-50 rounded-lg pb-12">
                    <div className="pr-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-sm font-semibold text-gray-900">
                          Holiday Celebration and Award Night
                        </h4>
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
                      <p className="text-xs text-gray-600 mb-2">
                        Annual Celebration and Award ceremony, dinner and
                        entertainment
                      </p>
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
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>20/12/2024</span>
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
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>Skyline Rooftop</span>
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
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          <span>45 Attendees</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute bottom-3 right-3 text-xs h-6 px-2 flex items-center gap-1"
                    >
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
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                        />
                      </svg>
                      Share to Forum
                    </Button>
                  </div>
                    </div>

                    {/* View all events link */}
                    <div className="mt-4">
                      <Button
                        variant="link"
                        onClick={() => navigate("/events")}
                        className="text-blue-600 hover:text-blue-700 text-xs p-0"
                      >
                        View all events →
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Calendar View */
                  <div className="space-y-4">
                    {/* Calendar Header with Month/Year and Filter */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-gray-900">June 2025</h3>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-xs px-2 py-1 h-6 hover:bg-gray-100"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-xs px-2 py-1 h-6 hover:bg-gray-100"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filter
                      </Button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28].map((day) => (
                        <div
                          key={day}
                          className={`
                            aspect-square flex items-center justify-center text-xs font-medium rounded cursor-pointer transition-all relative
                            ${day <= 14 ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                            ${day === 3 || day === 6 || day === 12 ? 'ring-1 ring-green-400' : ''}
                          `}
                        >
                          {day}
                          {/* Event indicators */}
                          {day === 3 && (
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                            </div>
                          )}
                          {day === 6 && (
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                            </div>
                          )}
                          {day === 12 && (
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                              <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Event Details */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 p-2 bg-blue-50 rounded-lg">
                        <div className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded">
                          Summit
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900">Annual Marketing Summit</h3>
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                            <span>June 12, 9:00 AM</span>
                            <span>New York, NY</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded">
                            UPCOMING
                          </span>
                          <Button size="sm" variant="ghost" className="text-xs px-2 py-1 h-6">
                            View Details →
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 p-2 bg-green-50 rounded-lg">
                        <div className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded">
                          Social
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900">Networking Mixer</h3>
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                            <span>June 20, 6:00 PM</span>
                            <span>Downtown</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                            CONFIRMED
                          </span>
                          <Button size="sm" variant="ghost" className="text-xs px-2 py-1 h-6">
                            View Details →
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 p-2 bg-purple-50 rounded-lg">
                        <div className="px-2 py-1 bg-purple-500 text-white text-xs font-medium rounded">
                          Conference
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900">Data Science Conference</h3>
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                            <span>July 3, 10:00 AM</span>
                            <span>Chicago, IL</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                            PLANNING
                          </span>
                          <Button size="sm" variant="ghost" className="text-xs px-2 py-1 h-6">
                            View Details →
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Recent Activities */}
            <Card className={`transition-all duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-br from-teal-900/20 to-cyan-800/30 border border-teal-700/30'
                : 'bg-gradient-to-br from-teal-50 to-cyan-100 border border-teal-200'
            }`}>
              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className={`text-sm font-semibold mb-0.5 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Recent Activities
                  </h3>
                  <p className={`text-xs transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Latest updates across the company
                  </p>
                </div>

                <div className="space-y-2">
                  {/* Activity Item 1 */}
                  <div className="flex items-start justify-between gap-2 py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-start gap-2 flex-1">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-blue-600"
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
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-900 mb-0.5">
                          New Candidate John Doe joined the HR Department
                        </p>
                        <div className="flex items-center gap-1.5">
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-700">
                            Onboarding
                          </span>
                          <span className="text-xs text-gray-500">HR</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      10 mins ago
                    </span>
                  </div>

                  {/* Activity Item 2 */}
                  <div className="flex items-start justify-between gap-2 py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-start gap-2 flex-1">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-900 mb-0.5">
                          Sarah Johnson Completed AI Assessment
                        </p>
                        <div className="flex items-center gap-1.5">
                          <span className="inline-flex items-center rounded-md bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700">
                            Assessment
                          </span>
                          <span className="text-xs text-gray-500">HR</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      1 hour ago
                    </span>
                  </div>

                  {/* Activity Item 3 */}
                  <div className="flex items-start justify-between gap-2 py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-start gap-2 flex-1">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-900 mb-0.5">
                          Q2 Performance reviews completed for engineering team
                        </p>
                        <div className="flex items-center gap-1.5">
                          <span className="inline-flex items-center rounded-md bg-purple-50 px-1.5 py-0.5 text-xs font-medium text-purple-700">
                            Review
                          </span>
                          <span className="text-xs text-gray-500">HR</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      1 day ago
                    </span>
                  </div>

                  {/* Activity Item 4 */}
                  <div className="flex items-start justify-between gap-2 py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-start gap-2 flex-1">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-900 mb-0.5">
                          Monthly payroll process successfully for 1245
                          employees
                        </p>
                        <div className="flex items-center gap-1.5">
                          <span className="inline-flex items-center rounded-md bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700">
                            Payroll
                          </span>
                          <span className="text-xs text-gray-500">HR</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      2 days ago
                    </span>
                  </div>
                </div>

                {/* View All Activities Link */}
                <div className="mt-3 text-center">
                  <Button
                    variant="link"
                    onClick={() => navigate("/activities")}
                    className="text-blue-600 hover:text-blue-700 text-xs"
                  >
                    View All Activities →
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Latest E-Forum */}
            <Card className="bg-gradient-to-br from-violet-50 to-purple-100 border border-violet-200">
              <CardContent className="p-6 pb-12">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Latest E-Forum
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Employee discussion forum
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`text-xs h-6 transition-all duration-200 ${showVoiceSearch ? 'px-2' : 'px-1'}`}
                    onClick={() => setShowVoiceSearch(!showVoiceSearch)}
                  >
                    <svg
                      className={`w-3 h-3 ${showVoiceSearch ? 'mr-1' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                    {showVoiceSearch && 'Voice Search'}
                  </Button>
                </div>

                <div className="space-y-2">
                  {/* Forum Post 1 */}
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-semibold">
                          SJ
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-xs font-semibold text-gray-900">
                            Sarah Jhonson
                          </h4>
                          <span className="text-xs text-gray-500">
                            HR • 1h ago
                          </span>
                        </div>
                        <p className="text-xs text-gray-800 mb-1 leading-relaxed">
                          New Remote Policy Guidelines - HOT: Work-life balance
                          approach for transparent workplace.
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-2 h-2 text-red-500"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <span>32</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-2 h-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                            <span>35</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-2 h-2 text-blue-500"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92S19.61 16.08 18 16.08z" />
                            </svg>
                            <span>5</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-2 h-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
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
                        <span className="text-white text-xs font-semibold">
                          SJ
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-xs font-semibold text-gray-900">
                            Sarah Jhonson
                          </h4>
                          <span className="text-xs text-gray-500">
                            HR ��� 2h ago
                          </span>
                        </div>
                        <p className="text-xs text-gray-800 mb-1 leading-relaxed">
                          Q2 Performance Updates: Team performance metrics and
                          development goals discussion.
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-2 h-2 text-red-500"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <span>28</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-2 h-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                            <span>22</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-2 h-2 text-blue-500"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92S19.61 16.08 18 16.08z" />
                            </svg>
                            <span>3</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-2 h-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
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
                        <span className="text-white text-xs font-semibold">
                          MJ
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-xs font-semibold text-gray-900">
                            Mike Johnson
                          </h4>
                          <span className="text-xs text-gray-500">
                            Engineering • 4h ago
                          </span>
                        </div>
                        <p className="text-xs text-gray-800 mb-1 leading-relaxed">
                          Tech Stack Update: New tools and frameworks adoption
                          for enhanced productivity.
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-2 h-2 text-red-500"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <span>19</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-2 h-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                            <span>15</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-2 h-2 text-blue-500"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92S19.61 16.08 18 16.08z" />
                            </svg>
                            <span>7</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg
                              className="w-2 h-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            <span>156</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visit Forum Button */}
                <div className="mt-4 text-center">
                  <Button
                    variant="link"
                    onClick={() => navigate("/e-forum")}
                    className="text-blue-600 hover:text-blue-700 text-xs p-0"
                  >
                    Visit Forum →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className={`border-t shadow-sm mt-12 transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 border-gray-700'
          : 'bg-gradient-to-r from-blue-50 via-white to-purple-50 border-gray-100/60'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center space-x-8">
            {/* Activity Feed */}
            <div className="flex flex-col items-center space-y-1.5 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-lg hover:bg-gray-50/80">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <span className={`text-[10px] font-medium transition-colors ${
                isDarkMode
                  ? 'text-gray-300 group-hover:text-blue-400'
                  : 'text-gray-600 group-hover:text-blue-600'
              }`}>
                Activity
              </span>
            </div>

            {/* Chat */}
            <div
              className="flex flex-col items-center space-y-1.5 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-lg hover:bg-gray-50/80"
              onClick={() => navigate("/chat")}
            >
              <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <span className={`text-[10px] font-medium transition-colors ${
                isDarkMode
                  ? 'text-gray-300 group-hover:text-emerald-400'
                  : 'text-gray-600 group-hover:text-emerald-600'
              }`}>
                Chat
              </span>
            </div>

            {/* Files */}
            <div
              className="flex flex-col items-center space-y-1.5 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-lg hover:bg-gray-50/80"
              onClick={() => navigate("/files")}
            >
              <div className="w-7 h-7 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
              </div>
              <span className={`text-[10px] font-medium transition-colors ${
                isDarkMode
                  ? 'text-gray-300 group-hover:text-amber-400'
                  : 'text-gray-600 group-hover:text-amber-600'
              }`}>
                Files
              </span>
            </div>

            {/* Meetings */}
            <div
              className="flex flex-col items-center space-y-1.5 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-lg hover:bg-gray-50/80"
              onClick={() => navigate("/meetings")}
            >
              <div className="w-7 h-7 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <span className={`text-[10px] font-medium transition-colors ${
                isDarkMode
                  ? 'text-gray-300 group-hover:text-purple-400'
                  : 'text-gray-600 group-hover:text-purple-600'
              }`}>
                Meetings
              </span>
            </div>

            {/* Reminders */}
            <div
              className="flex flex-col items-center space-y-1.5 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-lg hover:bg-gray-50/80"
              onClick={() => navigate("/reminders")}
            >
              <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <svg
                  className="w-3.5 h-3.5 text-white"
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
              </div>
              <span className={`text-[10px] font-medium transition-colors ${
                isDarkMode
                  ? 'text-gray-300 group-hover:text-orange-400'
                  : 'text-gray-600 group-hover:text-orange-600'
              }`}>
                Reminders
              </span>
            </div>

            {/* E-Forum */}
            <div
              className="flex flex-col items-center space-y-1.5 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-lg hover:bg-gray-50/80"
              onClick={() => navigate("/e-forum")}
            >
              <div className="w-7 h-7 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z"
                  />
                </svg>
              </div>
              <span className={`text-[10px] font-medium transition-colors ${
                isDarkMode
                  ? 'text-gray-300 group-hover:text-indigo-400'
                  : 'text-gray-600 group-hover:text-indigo-600'
              }`}>
                E-Forum
              </span>
            </div>

            {/* AI2AIM Store */}
            <div
              className="flex flex-col items-center space-y-1.5 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-lg hover:bg-gray-50/80"
              onClick={() => navigate("/ai2aim-store")}
            >
              <div className="w-7 h-7 bg-gradient-to-br from-red-400 to-red-500 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <span className={`text-[10px] font-medium transition-colors ${
                isDarkMode
                  ? 'text-gray-300 group-hover:text-red-400'
                  : 'text-gray-600 group-hover:text-red-600'
              }`}>
                Store
              </span>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
}
