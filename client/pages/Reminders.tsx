import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FooterNavigation from "@/components/FooterNavigation";
import { useDarkMode } from "@/components/DarkModeProvider";

export default function Reminders() {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [activeFilter, setActiveFilter] = useState("today");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  
  // Reminder form state
  const [reminderForm, setReminderForm] = useState({
    id: "",
    title: "",
    details: "",
    date: "",
    type: "",
    category: "",
    department: "",
    priority: "",
    share: "",
    repeat: ""
  });

  // Sample reminders data
  const [reminders, setReminders] = useState([
    {
      id: "R001",
      title: "Stick to the Brand Guidelines",
      details: "Ensure all marketing, visuals, and messaging align with the company's tone, style, and values.",
      date: "08-15-2025",
      type: "Task",
      category: "Marketing",
      department: "Marketing",
      priority: "HIGH PRIORITY",
      status: "today",
      completed: false,
      privacy: "PRIVATE"
    },
    {
      id: "R002",
      title: "Submit Budget Report",
      details: "Q3 financial analysis due",
      date: "2025-08-17",
      type: "Task",
      category: "Finance",
      department: "Finance",
      priority: "Critical",
      status: "pending",
      completed: false
    }
  ]);

  // Auto-generate ID and date when modal opens
  useEffect(() => {
    if (showCreateModal) {
      const generateId = () => {
        const timestamp = Date.now().toString();
        const random = Math.random().toString(36).substring(2, 4);
        return `R${timestamp.slice(-3)}${random.toUpperCase()}`;
      };

      setReminderForm(prev => ({
        ...prev,
        id: generateId(),
        date: new Date().toLocaleDateString('en-CA')
      }));
    }
  }, [showCreateModal]);

  const handleReminderFormChange = (field: string, value: string) => {
    setReminderForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateReminder = () => {
    if (!reminderForm.title || !reminderForm.details) {
      alert("Please fill in all required fields");
      return;
    }

    const newReminder = {
      id: reminderForm.id,
      title: reminderForm.title,
      details: reminderForm.details,
      date: reminderForm.date,
      type: reminderForm.type || "Task",
      category: reminderForm.category || "MARKETING",
      department: reminderForm.department || "General",
      priority: reminderForm.priority || "HIGH PRIORITY",
      status: "today",
      completed: false,
      privacy: "PRIVATE"
    };

    setReminders(prev => [...prev, newReminder]);
    setShowCreateModal(false);

    // Reset form
    setReminderForm({
      id: "",
      title: "",
      details: "",
      date: "",
      type: "",
      category: "",
      department: "",
      priority: "",
      share: "",
      repeat: ""
    });

    console.log("Reminder created:", newReminder);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setReminderForm({
      id: "",
      title: "",
      details: "",
      date: "",
      type: "",
      category: "",
      department: "",
      priority: "",
      share: "",
      repeat: ""
    });
  };

  // Filter logic
  const getFilteredReminders = () => {
    return reminders.filter(reminder => {
      const matchesSearch = reminder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           reminder.details.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === "all" || reminder.status === activeFilter;
      return matchesSearch && matchesFilter;
    });
  };

  // Get counts for filters
  const getCounts = () => {
    return {
      today: reminders.filter(r => r.status === "today").length,
      pending: reminders.filter(r => r.status === "pending").length, 
      upcoming: reminders.filter(r => r.status === "upcoming").length,
      completed: reminders.filter(r => r.completed).length
    };
  };

  const counts = getCounts();

  const selectOptions = {
    type: ["Task", "Meeting", "Event", "Deadline", "Follow-up", "Review"],
    category: ["Work", "Personal", "Finance", "Health", "Education", "Travel"],
    department: ["Engineering", "Finance", "Marketing", "HR", "Sales", "Design", "Product"],
    priority: ["LOW", "MEDIUM", "HIGH", "CRITICAL", "URGENT"],
    repeat: ["NONE", "DAILY", "WEEKLY", "MONTHLY", "YEARLY", "CUSTOM"]
  };

  return (
    <>
      <Layout>
        <div className={`min-h-screen transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          {/* Header Section */}
          <div className={`border-b px-4 py-4 transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reminders..."
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            {/* Filter Bar */}
            <div className="flex items-center space-x-2 flex-wrap">
              <button
                onClick={() => setActiveFilter("today")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                  activeFilter === "today"
                    ? 'bg-yellow-500 text-white'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                TODAY {counts.today}
              </button>
              
              <button
                onClick={() => setActiveFilter("pending")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                  activeFilter === "pending"
                    ? 'bg-red-500 text-white'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                PENDING {counts.pending}
              </button>
              
              <button
                onClick={() => setActiveFilter("upcoming")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                  activeFilter === "upcoming"
                    ? 'bg-orange-500 text-white'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                UPCOMING {counts.upcoming}
              </button>
              
              <button
                onClick={() => setActiveFilter("completed")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                  activeFilter === "completed"
                    ? 'bg-green-500 text-white'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                COMPLETED {counts.completed}
              </button>

              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-300'
                    : 'bg-white border-gray-300 text-gray-700'
                }`}
              >
                <option value="all">STATUS</option>
                <option value="today">Today</option>
                <option value="pending">Pending</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-300'
                    : 'bg-white border-gray-300 text-gray-700'
                }`}
              >
                <option value="date">DATE</option>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
                <option value="department">Department</option>
              </select>

              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-300"
              >
                CREATE REMINDER
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-4">
            {getFilteredReminders().length === 0 ? (
              <div className="text-center py-12">
                <div className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  No reminders found
                </div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {searchQuery ? 'Try adjusting your search' : 'Create your first reminder to get started'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {getFilteredReminders().map((reminder) => (
                  <Card key={reminder.id} className={`transition-colors duration-300 hover:shadow-lg border-2 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                  }`}>
                    <CardContent className="p-4">
                      {/* Header with ID and Star */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className={`text-blue-700 font-bold text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                            REMINDER ID: {reminder.id}
                          </span>
                          <div className="w-5 h-5 bg-yellow-500 rounded flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <div className="mb-3">
                        <span className={`text-blue-700 font-bold text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                          REMINDER TITLE:
                        </span>
                        <span className={`ml-2 text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {reminder.title}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="mb-3">
                        <span className={`text-blue-700 font-bold text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                          REMINDER DETAILS:
                        </span>
                        <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {reminder.details}
                        </span>
                      </div>

                      {/* Date */}
                      <div className="mb-4">
                        <span className={`text-blue-700 font-bold text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                          REMINDER DATE:
                        </span>
                        <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {reminder.date}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1 font-medium"
                        >
                          {reminder.category || "MARKETING"}
                        </Button>

                        <Button
                          size="sm"
                          className="bg-gray-500 hover:bg-gray-600 text-white text-xs px-3 py-1 font-medium"
                        >
                          {reminder.privacy || "PRIVATE"}
                        </Button>

                        <Button
                          size="sm"
                          className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 font-medium"
                        >
                          {reminder.priority}
                        </Button>

                        <div className="flex items-center space-x-1 ml-auto">
                          <button className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                            </svg>
                          </button>

                          <button className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </Layout>

      {/* Create Reminder Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
              <h2 className="text-lg font-bold text-yellow-300">CREATE YOUR REMINDER HERE</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCloseModal}
                  className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <span className="text-white text-sm">↻</span>
                </button>
                <button
                  onClick={handleCloseModal}
                  className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <span className="text-white text-sm">×</span>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className={`p-6 space-y-4 transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              {/* ID Field */}
              <div className="flex items-center space-x-4">
                <label className={`text-blue-700 font-bold w-28 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  ID:
                </label>
                <input
                  type="text"
                  value={reminderForm.id}
                  readOnly
                  className={`flex-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-600 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-600'
                  }`}
                  placeholder="AUTO-GENERATED"
                />
              </div>

              {/* Title Field */}
              <div className="flex items-center space-x-4">
                <label className={`text-blue-700 font-bold w-28 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  TITLE:
                </label>
                <input
                  type="text"
                  value={reminderForm.title}
                  onChange={(e) => handleReminderFormChange('title', e.target.value)}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Type here"
                />
              </div>

              {/* Details Field */}
              <div className="flex items-center space-x-4">
                <label className={`text-blue-700 font-bold w-28 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  DETAILS:
                </label>
                <input
                  type="text"
                  value={reminderForm.details}
                  onChange={(e) => handleReminderFormChange('details', e.target.value)}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Type here"
                />
              </div>

              {/* Date Field */}
              <div className="flex items-center space-x-4">
                <label className={`text-blue-700 font-bold w-28 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  DATE:
                </label>
                <input
                  type="date"
                  value={reminderForm.date}
                  onChange={(e) => handleReminderFormChange('date', e.target.value)}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              {/* Type Field */}
              <div className="flex items-center space-x-4">
                <label className={`text-blue-700 font-bold w-28 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  TYPE:
                </label>
                <select
                  value={reminderForm.type}
                  onChange={(e) => handleReminderFormChange('type', e.target.value)}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Type here</option>
                  {selectOptions.type.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Category Field */}
              <div className="flex items-center space-x-4">
                <label className={`text-blue-700 font-bold w-28 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  CATEGORY:
                </label>
                <select
                  value={reminderForm.category}
                  onChange={(e) => handleReminderFormChange('category', e.target.value)}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Type here</option>
                  {selectOptions.category.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Department Field */}
              <div className="flex items-center space-x-4">
                <label className={`text-blue-700 font-bold w-28 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  DEPARTMENT:
                </label>
                <select
                  value={reminderForm.department}
                  onChange={(e) => handleReminderFormChange('department', e.target.value)}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Type here</option>
                  {selectOptions.department.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Priority Field */}
              <div className="flex items-center space-x-4">
                <label className={`text-blue-700 font-bold w-28 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  PRIORITY:
                </label>
                <select
                  value={reminderForm.priority}
                  onChange={(e) => handleReminderFormChange('priority', e.target.value)}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">VERY HIGH, HIGH, MEDIUM, LOW, VERY LOW</option>
                  {selectOptions.priority.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Share Field */}
              <div className="flex items-center space-x-4">
                <label className={`text-blue-700 font-bold w-28 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  SHARE:
                </label>
                <input
                  type="text"
                  value={reminderForm.share}
                  onChange={(e) => handleReminderFormChange('share', e.target.value)}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Individuals, Teams, Everyone"
                />
              </div>

              {/* Repeat Field */}
              <div className="flex items-center space-x-4">
                <label className={`text-blue-700 font-bold w-28 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  REPEAT:
                </label>
                <select
                  value={reminderForm.repeat}
                  onChange={(e) => handleReminderFormChange('repeat', e.target.value)}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">EVERY 3 MINUTES, EVERY 5 HOURS, EVERY 1 WEEK, EVERY 1 MONTH, EVERY 365 DAYS</option>
                  {selectOptions.repeat.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleCreateReminder}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-bold rounded-lg transition-colors duration-300"
                >
                  CREATE REMINDER
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <FooterNavigation />
    </>
  );
}
