import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

  // Calendar functionality
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [events, setEvents] = useState<{[key: string]: Array<{title: string, time: string, description: string}>}>({});

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const formatDateKey = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    setShowEventModal(true);
  };

  const handleAddEvent = () => {
    if (selectedDate && eventTitle) {
      const dateKey = formatDateKey(selectedDate);
      const newEvent = {
        title: eventTitle,
        time: eventTime,
        description: eventDescription
      };

      setEvents(prev => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newEvent]
      }));

      // Reset form
      setEventTitle("");
      setEventTime("");
      setEventDescription("");
      setShowEventModal(false);
      setSelectedDate(null);
    }
  };

  const hasEvents = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateKey = formatDateKey(date);
    return events[dateKey] && events[dateKey].length > 0;
  };

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
            ? 'bg-gray-900'
            : 'bg-gray-50'
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
                        ? 'bg-emerald-800 border border-emerald-700'
                        : 'bg-emerald-800 border border-emerald-700'
                    }`}>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className={`p-1 rounded ${
                            isDarkMode ? 'bg-emerald-600' : 'bg-emerald-600'
                          }`}>
                            <svg
                              className={`w-3 h-3 ${
                                isDarkMode ? 'text-white' : 'text-white'
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 21h18M4 18h16M6 18V9l8-6 8 6v9M10 12h4"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 16h.01M16 16h.01M8 16h.01"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-xs font-medium mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-200'
                          }`}>
                            Total Employees
                          </h3>
                          <p className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-white'
                          }`}>
                            1,247
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l5-5 5 5M7 7l5-5 5 5" />
                              </svg>
                              <span className={`text-xs font-medium transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-300' : 'text-emerald-100'
                              }`}>
                                +30 this month
                              </span>
                            </div>
                          </div>
                          <p className={`text-xs mt-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-emerald-100'
                          }`}>
                            Active workspace size
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Active Candidates */}
                    <Card className={`shadow-sm hover:shadow-md transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-emerald-800 border border-emerald-700'
                        : 'bg-emerald-800 border border-emerald-700'
                    }`}>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className={`p-1 rounded ${
                            isDarkMode ? 'bg-emerald-700' : 'bg-emerald-700'
                          }`}>
                            <svg
                              className={`w-3 h-3 ${
                                isDarkMode ? 'text-white' : 'text-white'
                              }`}
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
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 8v6M23 11h-6"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-xs font-medium mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-200'
                          }`}>
                            Active Candidates
                          </h3>
                          <p className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-white'
                          }`}>
                            24
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l5-5 5 5M7 7l5-5 5 5" />
                              </svg>
                              <span className={`text-xs font-medium transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-300' : 'text-emerald-100'
                              }`}>
                                +3 this week
                              </span>
                            </div>
                          </div>
                          <p className={`text-xs mt-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-emerald-100'
                          }`}>
                            New hires and candidates
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Average Performance */}
                    <Card className={`shadow-sm hover:shadow-md transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-emerald-800 border border-emerald-700'
                        : 'bg-emerald-800 border border-emerald-700'
                    }`}>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className={`p-1 rounded ${
                            isDarkMode ? 'bg-emerald-700' : 'bg-emerald-700'
                          }`}>
                            <svg
                              className={`w-3 h-3 ${
                                isDarkMode ? 'text-white' : 'text-white'
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                              />
                              <circle cx="12" cy="12" r="1" fill="currentColor" />
                              <circle cx="19" cy="5" r="1" fill="currentColor" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-xs font-medium mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-200'
                          }`}>
                            Average Performance
                          </h3>
                          <p className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-white'
                          }`}>
                            4.5/5
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l5-5 5 5M7 7l5-5 5 5" />
                              </svg>
                              <span className={`text-xs font-medium transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-300' : 'text-emerald-100'
                              }`}>
                                +0.3 improvement
                              </span>
                            </div>
                          </div>
                          <p className={`text-xs mt-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-emerald-100'
                          }`}>
                            Overall team performance
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Pending Tasks */}
                    <Card className={`shadow-sm hover:shadow-md transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-emerald-800 border border-emerald-700'
                        : 'bg-emerald-800 border border-emerald-700'
                    }`}>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className={`p-1 rounded ${
                            isDarkMode ? 'bg-emerald-700' : 'bg-emerald-700'
                          }`}>
                            <svg
                              className={`w-3 h-3 ${
                                isDarkMode ? 'text-white' : 'text-white'
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-xs font-medium mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-200'
                          }`}>
                            Pending Tasks
                          </h3>
                          <p className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-white'
                          }`}>
                            18
                          </p>
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-medium transition-colors duration-300 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-500'
                            }`}>
                              5 from last week
                            </span>
                          </div>
                          <p className={`text-xs mt-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-emerald-100'
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
                        ? 'bg-emerald-800 border border-emerald-700'
                        : 'bg-emerald-800 border border-emerald-700'
                    }`}>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className={`p-1 rounded ${
                            isDarkMode ? 'bg-emerald-600' : 'bg-emerald-600'
                          }`}>
                            <svg
                              className={`w-3 h-3 ${
                                isDarkMode ? 'text-white' : 'text-white'
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-[10px] font-medium mb-0.5 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-200'
                          }`}>
                            Pending Onboarding
                          </h3>
                          <p className={`text-lg font-bold mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-white'
                          }`}>
                            10
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l5-5 5 5M7 7l5-5 5 5" />
                              </svg>
                              <span className={`text-[10px] font-medium transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-300' : 'text-emerald-600'
                              }`}>
                                +4 next week
                              </span>
                            </div>
                          </div>
                          <p className={`text-[10px] mt-0.5 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-500'
                          }`}>
                            Awaiting onboarding
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* On Probation */}
                    <Card className={`shadow-sm hover:shadow-md transition-all duration-300 flex-shrink-0 w-48 ${
                      isDarkMode
                        ? 'bg-emerald-800 border border-emerald-700'
                        : 'bg-emerald-800 border border-emerald-700'
                    }`}>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className={`p-1 rounded ${
                            isDarkMode ? 'bg-emerald-700' : 'bg-emerald-700'
                          }`}>
                            <svg
                              className={`w-3 h-3 ${
                                isDarkMode ? 'text-white' : 'text-white'
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v2m6-2v2"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-xs font-medium mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-200'
                          }`}>
                            On Probation
                          </h3>
                          <p className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-white'
                          }`}>
                            15
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l5-5 5 5M7 7l5-5 5 5" />
                              </svg>
                              <span className={`text-xs font-medium transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-300' : 'text-emerald-100'
                              }`}>
                                3 ending soon
                              </span>
                            </div>
                          </div>
                          <p className={`text-xs mt-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-emerald-100'
                          }`}>
                            Probationary employees
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Offboarding */}
                    <Card className={`shadow-sm hover:shadow-md transition-all duration-300 flex-shrink-0 w-48 ${
                      isDarkMode
                        ? 'bg-emerald-800 border border-emerald-700'
                        : 'bg-emerald-800 border border-emerald-700'
                    }`}>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className={`p-1 rounded ${
                            isDarkMode ? 'bg-emerald-700' : 'bg-emerald-700'
                          }`}>
                            <svg
                              className={`w-3 h-3 ${
                                isDarkMode ? 'text-white' : 'text-white'
                              }`}
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
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 11h6"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-xs font-medium mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-200'
                          }`}>
                            Offboarding
                          </h3>
                          <p className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-white'
                          }`}>
                            5
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-5 5-5-5m10 10l-5 5-5-5" />
                              </svg>
                              <span className={`text-xs font-medium transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-300' : 'text-emerald-100'
                              }`}>
                                -3 next week
                              </span>
                            </div>
                          </div>
                          <p className={`text-xs mt-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-emerald-100'
                          }`}>
                            Exit in progress
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Completed Tasks */}
                    <Card className={`shadow-sm hover:shadow-md transition-all duration-300 flex-shrink-0 w-48 ${
                      isDarkMode
                        ? 'bg-emerald-800 border border-emerald-700'
                        : 'bg-emerald-800 border border-emerald-700'
                    }`}>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className={`p-1 rounded ${
                            isDarkMode ? 'bg-emerald-700' : 'bg-emerald-700'
                          }`}>
                            <svg
                              className={`w-3 h-3 ${
                                isDarkMode ? 'text-white' : 'text-white'
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className={`text-xs font-medium mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-200'
                          }`}>
                            Completed Tasks
                          </h3>
                          <p className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-white'
                          }`}>
                            142
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l5-5 5 5M7 7l5-5 5 5" />
                              </svg>
                              <span className={`text-xs font-medium transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-300' : 'text-emerald-100'
                              }`}>
                                +12 today
                              </span>
                            </div>
                          </div>
                          <p className={`text-xs mt-1 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-emerald-100'
                          }`}>
                            Successfully completed
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Scroll Indicator - Outside metrics area */}
              <div className={`absolute -right-8 top-1/2 transform -translate-y-1/2 rounded-full p-0.5 shadow-sm transition-all duration-300 ${
                isDarkMode
                  ? 'bg-emerald-800 border border-emerald-600'
                  : 'bg-emerald-100 border border-emerald-300'
              } ${
                metricsCollapsed ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'
              }`}>
                <svg
                  className={`w-2 h-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
                  }`}
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
                          <div className="p-1 bg-gray-700 rounded">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xs font-medium text-gray-700 mb-1">Total Employees</h3>
                          <p className="text-xl font-bold text-gray-900 mb-1">1,247</p>
                          <span className="text-xs font-medium text-gray-600">+30 this month</span>
                          <p className="text-xs text-gray-600 mt-1">Active workspace size</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Card 2 - Active Candidates */}
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1 bg-gray-700 rounded">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xs font-medium text-gray-700 mb-1">Active Candidates</h3>
                          <p className="text-xl font-bold text-gray-900 mb-1">24</p>
                          <span className="text-xs font-medium text-gray-600">+3 this week</span>
                          <p className="text-xs text-gray-600 mt-1">New hires and candidates</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Card 3 - Average Performance */}
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1 bg-gray-700 rounded">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xs font-medium text-gray-700 mb-1">Average Performance</h3>
                          <p className="text-xl font-bold text-gray-900 mb-1">4.5/5</p>
                          <span className="text-xs font-medium text-gray-600">+0.3 improvement</span>
                          <p className="text-xs text-gray-600 mt-1">Overall team rating</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Card 4 - Completed Tasks */}
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1 bg-gray-700 rounded">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xs font-medium text-gray-700 mb-1">Completed Tasks</h3>
                          <p className="text-xl font-bold text-gray-900 mb-1">142</p>
                          <span className="text-xs font-medium text-gray-600">+12 today</span>
                          <p className="text-xs text-gray-600 mt-1">Successfully completed</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Card 5 - Pending Reviews */}
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="p-1 bg-gray-700 rounded">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xs font-medium text-gray-700 mb-1">Pending Reviews</h3>
                          <p className="text-xl font-bold text-gray-900 mb-1">18</p>
                          <span className="text-xs font-medium text-gray-600">Requires attention</span>
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
                          <span className="text-xs font-medium text-gray-700">On track</span>
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
                    ? 'bg-gray-800/50 border border-gray-700'
                    : 'bg-white border border-gray-200'
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
                          className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border transition-colors duration-200 ${
                            isDarkMode
                              ? 'text-gray-200 bg-gray-700 border-gray-600 hover:bg-gray-600'
                              : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
                          }`}
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
                          <div className={`absolute right-0 top-full mt-1 w-40 rounded-lg shadow-lg z-10 transition-colors duration-200 ${
                            isDarkMode
                              ? 'bg-gray-800 border border-gray-600'
                              : 'bg-white border border-gray-200'
                          }`}>
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
                                className={`w-full text-left px-3 py-2 text-xs first:rounded-t-lg last:rounded-b-lg transition-colors duration-150 ${
                                  selectedDepartment === dept
                                    ? isDarkMode
                                      ? "bg-blue-900/50 text-blue-300 font-medium"
                                      : "bg-blue-50 text-blue-700 font-medium"
                                    : isDarkMode
                                      ? "text-gray-300 hover:bg-gray-700"
                                      : "text-gray-700 hover:bg-gray-50"
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
                      <div className="w-3 h-0.5 bg-gray-600 rounded"></div>
                      <span className={`text-xs transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>New Hires</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-0.5 bg-gray-400 rounded"></div>
                      <span className={`text-xs transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>Exit</span>
                    </div>
                  </div>

                  {/* Chart */}
                  <div
                    className={`${isGrowthExpanded ? "h-64" : "h-40"} relative transition-all duration-300`}
                  >
                    {/* Y-axis labels */}
                    <div className={`absolute left-0 top-0 h-full flex flex-col justify-between text-xs pr-1 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <span className="text-xs">80</span>
                      <span className="text-xs">60</span>
                      <span className="text-xs">40</span>
                      <span className="text-xs">20</span>
                      <span className="text-xs">0</span>
                    </div>

                    {/* SVG Line Chart */}
                    <div className="ml-6 h-full relative">
                      <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        {/* Grid lines */}
                        <defs>
                          <pattern id="grid" width="10" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.1" className={isDarkMode ? 'text-gray-600' : 'text-gray-200'} />
                          </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid)" />

                        {isGrowthExpanded ? (
                          // Full year view line chart
                          <>
                            {/* New Hires Line */}
                            <polyline
                              fill="none"
                              stroke={isDarkMode ? '#9ca3af' : '#374151'}
                              strokeWidth="0.8"
                              points="4,23 12,35 20,58 28,21 36,30 44,52 52,17 60,32 68,18 76,42 84,28 92,55"
                            />
                            {/* New Hires Points */}
                            <circle cx="4" cy="23" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="12" cy="35" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="20" cy="58" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="28" cy="21" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="36" cy="30" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="44" cy="52" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="52" cy="17" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="60" cy="32" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="68" cy="18" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="76" cy="42" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="84" cy="28" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="92" cy="55" r="0.8" fill={isDarkMode ? '#9ca3af' : '#374151'} />

                            {/* Exit Line */}
                            <polyline
                              fill="none"
                              stroke={isDarkMode ? '#6b7280' : '#9ca3af'}
                              strokeWidth="0.8"
                              strokeDasharray="2,1"
                              points="4,77 12,76 20,64 28,68 36,76 44,84 52,82 60,72 68,85 76,74 84,80 92,88"
                            />
                            {/* Exit Points */}
                            <circle cx="4" cy="77" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="12" cy="76" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="20" cy="64" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="28" cy="68" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="36" cy="76" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="44" cy="84" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="52" cy="82" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="60" cy="72" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="68" cy="85" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="76" cy="74" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="84" cy="80" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="92" cy="88" r="0.8" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                          </>
                        ) : (
                          // Condensed view line chart (last 6 months)
                          <>
                            {/* New Hires Line */}
                            <polyline
                              fill="none"
                              stroke={isDarkMode ? '#9ca3af' : '#374151'}
                              strokeWidth="1"
                              points="8,52 24,30 40,21 56,58 72,35 88,23"
                            />
                            {/* New Hires Points */}
                            <circle cx="8" cy="52" r="1" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="24" cy="30" r="1" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="40" cy="21" r="1" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="56" cy="58" r="1" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="72" cy="35" r="1" fill={isDarkMode ? '#9ca3af' : '#374151'} />
                            <circle cx="88" cy="23" r="1" fill={isDarkMode ? '#9ca3af' : '#374151'} />

                            {/* Exit Line */}
                            <polyline
                              fill="none"
                              stroke={isDarkMode ? '#6b7280' : '#9ca3af'}
                              strokeWidth="1"
                              strokeDasharray="2,1"
                              points="8,84 24,76 40,68 56,64 72,76 88,77"
                            />
                            {/* Exit Points */}
                            <circle cx="8" cy="84" r="1" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="24" cy="76" r="1" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="40" cy="68" r="1" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="56" cy="64" r="1" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="72" cy="76" r="1" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                            <circle cx="88" cy="77" r="1" fill={isDarkMode ? '#6b7280' : '#9ca3af'} />
                          </>
                        )}
                      </svg>

                      {/* Month Labels */}
                      <div className="absolute bottom-0 left-0 w-full flex justify-between items-end h-6">
                        {isGrowthExpanded ? (
                          <>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Jan</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Feb</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Mar</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Apr</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>May</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Jun</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Jul</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Aug</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Sep</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Oct</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Nov</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Dec</span>
                          </>
                        ) : (
                          <>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Jun</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>May</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Apr</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Mar</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Feb</span>
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Jan</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Department Distribution */}
              {!isGrowthExpanded && (
                <Card className={`transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gray-800/50 border border-gray-700'
                    : 'bg-white border border-gray-200'
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
                        <div className="w-2 h-2 bg-gray-700 rounded-full flex-shrink-0"></div>
                        <span className={`transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>Engineering</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-gray-700 rounded-full flex-shrink-0"></div>
                        <span className={`transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>Finance</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-gray-700 rounded-full flex-shrink-0"></div>
                        <span className={`transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>HR</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-gray-700 rounded-full flex-shrink-0"></div>
                        <span className={`transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>Sales</span>
                      </div>
                      <div className="flex items-center gap-1.5 col-span-2 justify-center">
                        <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                        <span className={`transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-700'
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
                ? 'bg-gray-800/50 border border-gray-700'
                : 'bg-white border border-gray-200'
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
                  <div className={`flex items-start justify-between p-3 rounded-lg transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className={`text-sm font-semibold transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
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
                      <p className={`text-xs mb-2 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Join us for the biggest Tech event discussing innovative
                        and industry insights
                      </p>
                      <div className={`flex items-center gap-4 text-xs transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
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
                        onClick={() => navigate("/e-forum")}
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
                  <div className={`relative p-3 rounded-lg pb-12 transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}>
                    <div className="pr-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className={`text-sm font-semibold transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
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
                      <p className={`text-xs mb-2 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Collaboration Workshop focusing on innovation
                        methodologies and Team dynamics
                      </p>
                      <div className={`flex items-center gap-4 text-xs transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
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
                      onClick={() => navigate("/e-forum")}
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
                  <div className={`relative p-3 rounded-lg pb-12 transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}>
                    <div className="pr-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className={`text-sm font-semibold transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
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
                      <p className={`text-xs mb-2 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Annual Celebration and Award ceremony, dinner and
                        entertainment
                      </p>
                      <div className={`flex items-center gap-4 text-xs transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
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
                      onClick={() => navigate("/e-forum")}
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
                        className="text-gray-700 hover:text-blue-700 text-xs p-0"
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
                        <h3 className={`text-lg font-bold transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {getMonthName(currentDate)}
                        </h3>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className={`text-xs px-2 py-1 h-6 transition-colors duration-300 ${
                              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                            }`}
                            onClick={() => navigateMonth('prev')}
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className={`text-xs px-2 py-1 h-6 transition-colors duration-300 ${
                              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                            }`}
                            onClick={() => navigateMonth('next')}
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
                    <div className="space-y-2">
                      {/* Day headers */}
                      <div className="grid grid-cols-7 gap-1">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                          <div key={day} className={`text-center text-xs font-medium py-2 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-500'
                          }`}>
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Calendar days */}
                      <div className="grid grid-cols-7 gap-1">
                        {/* Empty cells for days before month starts */}
                        {Array.from({ length: getFirstDayOfMonth(currentDate) }, (_, i) => (
                          <div key={`empty-${i}`} className="aspect-square"></div>
                        ))}

                        {/* Days of the month */}
                        {Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => {
                          const day = i + 1;
                          const today = new Date();
                          const isToday = today.getDate() === day &&
                                         today.getMonth() === currentDate.getMonth() &&
                                         today.getFullYear() === currentDate.getFullYear();

                          return (
                            <div
                              key={day}
                              onClick={() => handleDateClick(day)}
                              className={`
                                aspect-square flex items-center justify-center text-xs font-medium rounded cursor-pointer transition-all relative
                                ${isToday
                                  ? isDarkMode
                                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                                    : 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                                  : isDarkMode
                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }
                                ${hasEvents(day) ? 'ring-1 ring-emerald-400' : ''}
                              `}
                            >
                              {day}
                              {/* Event indicator */}
                              {hasEvents(day) && (
                                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                                  <div className={`w-1 h-1 rounded-full ${
                                    isDarkMode ? 'bg-emerald-400' : 'bg-emerald-600'
                                  }`}></div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-2">
                      <div className={`flex items-start gap-2 p-2 rounded-lg transition-colors duration-300 ${
                        isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'
                      }`}>
                        <div className="px-2 py-1 bg-gray-700 text-white text-xs font-medium rounded">
                          Summit
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-sm font-semibold transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>Annual Marketing Summit</h3>
                          <div className={`flex items-center gap-3 mt-1 text-xs transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-500'
                          }`}>
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

                      <div className={`flex items-start gap-2 p-2 rounded-lg transition-colors duration-300 ${
                        isDarkMode ? 'bg-green-900/30' : 'bg-green-50'
                      }`}>
                        <div className="px-2 py-1 bg-gray-700 text-white text-xs font-medium rounded">
                          Social
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-sm font-semibold transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>Networking Mixer</h3>
                          <div className={`flex items-center gap-3 mt-1 text-xs transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-500'
                          }`}>
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

                      <div className={`flex items-start gap-2 p-2 rounded-lg transition-colors duration-300 ${
                        isDarkMode ? 'bg-purple-900/30' : 'bg-purple-50'
                      }`}>
                        <div className="px-2 py-1 bg-gray-700 text-white text-xs font-medium rounded">
                          Conference
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-sm font-semibold transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>Data Science Conference</h3>
                          <div className={`flex items-center gap-3 mt-1 text-xs transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-500'
                          }`}>
                            <span>July 3, 10:00 AM</span>
                            <span>Chicago, IL</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded">
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
                ? 'bg-gray-800/50 border border-gray-700'
                : 'bg-white border border-gray-200'
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
                  <div className={`flex items-start justify-between gap-2 py-2 border-b last:border-b-0 transition-colors duration-300 ${
                    isDarkMode ? 'border-gray-600' : 'border-gray-100'
                  }`}>
                    <div className="flex items-start gap-2 flex-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                      }`}>
                        <svg
                          className={`w-3 h-3 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-700'
                          }`}
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
                        <p className={`text-xs font-medium mb-0.5 transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          New Candidate John Doe joined the HR Department
                        </p>
                        <div className="flex items-center gap-1.5">
                          <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium transition-colors duration-300 ${
                            isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-700'
                          }`}>
                            Onboarding
                          </span>
                          <span className={`text-xs transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>HR</span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs flex-shrink-0 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      10 mins ago
                    </span>
                  </div>

                  {/* Activity Item 2 */}
                  <div className={`flex items-start justify-between gap-2 py-2 border-b last:border-b-0 transition-colors duration-300 ${
                    isDarkMode ? 'border-gray-600' : 'border-gray-100'
                  }`}>
                    <div className="flex items-start gap-2 flex-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        isDarkMode ? 'bg-green-800/50' : 'bg-green-100'
                      }`}>
                        <svg
                          className={`w-3 h-3 transition-colors duration-300 ${
                            isDarkMode ? 'text-green-300' : 'text-gray-600'
                          }`}
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
                        <p className={`text-xs font-medium mb-0.5 transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          Sarah Johnson Completed AI Assessment
                        </p>
                        <div className="flex items-center gap-1.5">
                          <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium transition-colors duration-300 ${
                            isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'
                          }`}>
                            Assessment
                          </span>
                          <span className={`text-xs transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>HR</span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs flex-shrink-0 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      1 hour ago
                    </span>
                  </div>

                  {/* Activity Item 3 */}
                  <div className={`flex items-start justify-between gap-2 py-2 border-b last:border-b-0 transition-colors duration-300 ${
                    isDarkMode ? 'border-gray-600' : 'border-gray-100'
                  }`}>
                    <div className="flex items-start gap-2 flex-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        isDarkMode ? 'bg-purple-800/50' : 'bg-purple-100'
                      }`}>
                        <svg
                          className={`w-3 h-3 transition-colors duration-300 ${
                            isDarkMode ? 'text-purple-300' : 'text-gray-600'
                          }`}
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
                        <p className={`text-xs font-medium mb-0.5 transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          Q2 Performance reviews completed for engineering team
                        </p>
                        <div className="flex items-center gap-1.5">
                          <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium transition-colors duration-300 ${
                            isDarkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-50 text-purple-700'
                          }`}>
                            Review
                          </span>
                          <span className={`text-xs transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>HR</span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs flex-shrink-0 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      1 day ago
                    </span>
                  </div>

                  {/* Activity Item 4 */}
                  <div className={`flex items-start justify-between gap-2 py-2 border-b last:border-b-0 transition-colors duration-300 ${
                    isDarkMode ? 'border-gray-600' : 'border-gray-100'
                  }`}>
                    <div className="flex items-start gap-2 flex-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        isDarkMode ? 'bg-green-800/50' : 'bg-green-100'
                      }`}>
                        <svg
                          className={`w-3 h-3 transition-colors duration-300 ${
                            isDarkMode ? 'text-green-300' : 'text-gray-600'
                          }`}
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
                        <p className={`text-xs font-medium mb-0.5 transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          Monthly payroll process successfully for 1245
                          employees
                        </p>
                        <div className="flex items-center gap-1.5">
                          <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium transition-colors duration-300 ${
                            isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'
                          }`}>
                            Payroll
                          </span>
                          <span className={`text-xs transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>HR</span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs flex-shrink-0 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      2 days ago
                    </span>
                  </div>
                </div>

                {/* View All Activities Link */}
                <div className="mt-3 text-center">
                  <Button
                    variant="link"
                    onClick={() => navigate("/activities")}
                    className={`text-xs transition-colors duration-300 ${
                      isDarkMode
                        ? 'text-gray-300 hover:text-blue-400'
                        : 'text-gray-700 hover:text-blue-700'
                    }`}
                  >
                    View All Activities →
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Latest E-Forum */}
            <Card className={`transition-all duration-300 ${
              isDarkMode
                ? 'bg-gray-800/50 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}>
              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className={`text-base font-semibold transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Latest E-Forum
                  </h3>
                  <p className={`text-xs mt-1 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Recent discussions
                  </p>
                </div>

                <div className="space-y-3">

                  {/* Forum Post 2 */}
                  <div className={`rounded-lg p-3 transition-colors duration-300 border-l-4 border-green-500 ${
                    isDarkMode ? 'bg-green-900/20' : 'bg-green-50'
                  }`}>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-semibold">
                          MJ
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`text-xs font-semibold transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            Sarah Jhonson
                          </h4>
                          <span className={`text-xs transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            HR ��� 2h ago
                          </span>
                        </div>
                        <p className={`text-xs mb-1 leading-relaxed transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-800'
                        }`}>
                          Q2 Performance Updates: Team performance metrics and
                          development goals discussion.
                        </p>
                        <div className={`flex items-center gap-3 text-xs transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
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
                  <div className={`rounded-lg p-3 transition-colors duration-300 border-l-4 border-purple-500 ${
                    isDarkMode ? 'bg-purple-900/20' : 'bg-purple-50'
                  }`}>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-semibold">
                          LM
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`text-xs font-semibold transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            Mike Johnson
                          </h4>
                          <span className={`text-xs transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            Engineering • 4h ago
                          </span>
                        </div>
                        <p className={`text-xs mb-1 leading-relaxed transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-800'
                        }`}>
                          Tech Stack Update: New tools and frameworks adoption
                          for enhanced productivity.
                        </p>
                        <div className={`flex items-center gap-3 text-xs transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
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

                  {/* Forum Post 4 */}
                  <div className={`rounded-lg p-3 transition-colors duration-300 border-l-4 border-emerald-500 ${
                    isDarkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'
                  }`}>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-semibold">
                          JD
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`text-xs font-semibold transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            John Davis
                          </h4>
                          <span className={`text-xs transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            Engineering • 3h ago
                          </span>
                        </div>
                        <p className={`text-xs mb-1 leading-relaxed transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-800'
                        }`}>
                          Looking forward to the upcoming tech summit! Anyone else excited about the AI sessions?
                        </p>
                        <div className={`flex items-center gap-3 text-xs transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <span>18</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>12</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92S19.61 16.08 18 16.08z" />
                            </svg>
                            <span>5</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>142</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Forum Post 5 - New */}
                  <div className={`rounded-lg p-3 transition-colors duration-300 border-l-4 border-blue-500 ${
                    isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'
                  }`}>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-semibold">
                          ES
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`text-xs font-semibold transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            Emily Smith
                          </h4>
                          <span className={`text-xs transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            Product • 2h ago
                          </span>
                        </div>
                        <p className={`text-xs mb-1 leading-relaxed transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-800'
                        }`}>
                          New product roadmap discussion: Let's align on Q3 priorities and feature releases.
                        </p>
                        <div className={`flex items-center gap-3 text-xs transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <span>32</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>18</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92S19.61 16.08 18 16.08z" />
                            </svg>
                            <span>9</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>203</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Visit all forums link */}
                <div className="mt-4">
                  <Button
                    variant="link"
                    onClick={() => navigate("/e-forum")}
                    className={`text-xs p-0 transition-colors duration-300 ${
                      isDarkMode
                        ? 'text-gray-300 hover:text-blue-400'
                        : 'text-gray-700 hover:text-blue-700'
                    }`}
                  >
                    Visit all forums →
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
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center space-x-8">
            {/* Activity Feed */}
            <div className={`flex flex-col items-center space-y-1.5 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-lg ${
              isDarkMode
                ? 'hover:bg-gray-700/50'
                : 'hover:bg-gray-50/80'
            }`}>
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
                  ? 'text-gray-300 group-hover:text-gray-400'
                  : 'text-gray-600 group-hover:text-gray-700'
              }`}>
                Activity
              </span>
            </div>

            {/* Chat */}
            <div
              className={`flex flex-col items-center space-y-1.5 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-lg ${
                isDarkMode
                  ? 'hover:bg-gray-700/50'
                  : 'hover:bg-gray-50/80'
              }`}
              onClick={() => navigate("/chat")}
            >
              <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C10.298 22 8.695 21.61 7.29 20.907L3.5 21.5C3.224 21.5 3 21.276 3 21V17.21C2.39 15.805 2 14.202 2 12.5C2 6.977 6.477 2.5 12 2.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d="M8 12H8.01M12 12H12.01M16 12H16.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className={`text-[10px] font-medium transition-colors ${
                isDarkMode
                  ? 'text-gray-300 group-hover:text-gray-400'
                  : 'text-gray-600 group-hover:text-gray-600'
              }`}>
                Chat
              </span>
            </div>

            {/* Files */}
            <div
              className={`flex flex-col items-center space-y-1.5 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-lg ${
                isDarkMode
                  ? 'hover:bg-gray-700/50'
                  : 'hover:bg-gray-50/80'
              }`}
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
                  ? 'text-gray-300 group-hover:text-gray-400'
                  : 'text-gray-600 group-hover:text-gray-600'
              }`}>
                Files
              </span>
            </div>

            {/* Meetings */}
            <div
              className={`flex flex-col items-center space-y-1.5 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-lg ${
                isDarkMode
                  ? 'hover:bg-gray-700/50'
                  : 'hover:bg-gray-50/80'
              }`}
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
                  ? 'text-gray-300 group-hover:text-gray-400'
                  : 'text-gray-600 group-hover:text-gray-600'
              }`}>
                Meetings
              </span>
            </div>

            {/* Reminders */}
            <div
              className={`flex flex-col items-center space-y-1.5 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-lg ${
                isDarkMode
                  ? 'hover:bg-gray-700/50'
                  : 'hover:bg-gray-50/80'
              }`}
              onClick={() => navigate("/reminders")}
            >
              <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d="M12 7V12L15.5 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="1"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className={`text-[10px] font-medium transition-colors ${
                isDarkMode
                  ? 'text-gray-300 group-hover:text-gray-400'
                  : 'text-gray-600 group-hover:text-gray-600'
              }`}>
                Reminders
              </span>
            </div>

            {/* E-Forum */}
            <div
              className={`flex flex-col items-center space-y-1.5 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-lg ${
                isDarkMode
                  ? 'hover:bg-gray-700/50'
                  : 'hover:bg-gray-50/80'
              }`}
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
                  ? 'text-gray-300 group-hover:text-gray-400'
                  : 'text-gray-600 group-hover:text-gray-700'
              }`}>
                E-Forum
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-lg p-6 w-full max-w-md transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-white'
              }`}>
                Add Event
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowEventModal(false);
                  setSelectedDate(null);
                  setEventTitle("");
                  setEventTime("");
                  setEventDescription("");
                }}
                className="p-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>

            {selectedDate && (
              <p className={`text-sm mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            )}

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200' : 'text-white'
                }`}>
                  Event Title *
                </label>
                <Input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Enter event title"
                  className={`transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200' : 'text-white'
                }`}>
                  Time
                </label>
                <Input
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className={`transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200' : 'text-white'
                }`}>
                  Description
                </label>
                <Textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  placeholder="Enter event description"
                  rows={3}
                  className={`transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleAddEvent}
                disabled={!eventTitle.trim()}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Add Event
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowEventModal(false);
                  setSelectedDate(null);
                  setEventTitle("");
                  setEventTime("");
                  setEventDescription("");
                }}
                className={`transition-colors duration-300 ${
                  isDarkMode
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

    </Layout>
  );
}
