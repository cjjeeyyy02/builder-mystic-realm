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
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Reminder form state
  const [reminderForm, setReminderForm] = useState({
    id: "",
    title: "",
    details: "",
    date: "",
    time: "",
    type: "",
    size: "",
    category: "PRIVATE",
    categorySpecific: "",
    department: "",
    priority: "",
    uploadedFile: null as File | null,
    shareFile: "",
    repeat: "",
  });

  // Sample reminders data
  const [reminders, setReminders] = useState([
    {
      id: "R001",
      title: "Stick to the Brand Guidelines",
      details:
        "Ensure all marketing, visuals, and messaging align with the company's tone, style, and values.",
      date: "08-15-2025",
      time: "14:30",
      type: "PDF",
      category: "Marketing",
      department: "Marketing",
      priority: "HIGH PRIORITY",
      status: "today",
      completed: false,
      privacy: "PRIVATE",
      createdDate: "2025-08-14",
      dueDate: "2025-08-15",
    },
    {
      id: "R002",
      title: "Submit Budget Report",
      details:
        "Complete Q3 financial analysis and submit to management team for review.",
      date: "2025-08-17",
      time: "09:00",
      type: "PDF",
      category: "Finance",
      department: "Finance",
      priority: "CRITICAL",
      status: "pending",
      completed: false,
      privacy: "TEAM",
      createdDate: "2025-08-10",
      dueDate: "2025-08-17",
    },
    {
      id: "R003",
      title: "Client Meeting Preparation",
      details:
        "Prepare presentation materials and agenda for the quarterly client review meeting.",
      date: "2025-08-16",
      time: "10:00",
      type: "Meeting",
      category: "Business",
      department: "Sales",
      priority: "HIGH",
      status: "upcoming",
      completed: false,
      privacy: "PRIVATE",
      createdDate: "2025-08-12",
      dueDate: "2025-08-16",
    },
  ]);

  // Auto-generate ID and date when modal opens
  useEffect(() => {
    if (showCreateModal) {
      const generateId = () => {
        const timestamp = Date.now().toString();
        const random = Math.random().toString(36).substring(2, 4);
        return `R${timestamp.slice(-3)}${random.toUpperCase()}`;
      };

      setReminderForm((prev) => ({
        ...prev,
        id: generateId(),
        date: new Date().toLocaleDateString("en-CA"),
        time: new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
    }
  }, [showCreateModal]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".relative")) {
        setShowStatusFilter(false);
        setShowDateFilter(false);
      }
    };

    if (showStatusFilter || showDateFilter) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showStatusFilter, showDateFilter]);

  const handleReminderFormChange = (field: string, value: string) => {
    setReminderForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Auto-generate file type based on extension
      const fileExtension = file.name.split(".").pop()?.toUpperCase() || "";
      let autoType = "";

      switch (fileExtension) {
        case "PDF":
          autoType = "PDF";
          break;
        case "DOC":
        case "DOCX":
          autoType = "DOC";
          break;
        case "PNG":
          autoType = "PNG";
          break;
        case "JPG":
        case "JPEG":
          autoType = "JPG";
          break;
        case "XLS":
        case "XLSX":
          autoType = "XLS";
          break;
        default:
          autoType = fileExtension;
      }

      // Auto-generate file size
      const sizeInBytes = file.size;
      let autoSize = "";
      if (sizeInBytes < 1024) {
        autoSize = `${sizeInBytes} B`;
      } else if (sizeInBytes < 1024 * 1024) {
        autoSize = `${(sizeInBytes / 1024).toFixed(1)} KB`;
      } else {
        autoSize = `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
      }

      setReminderForm((prev) => ({
        ...prev,
        uploadedFile: file,
        type: autoType,
        size: autoSize,
      }));
    }
  };

  const getAvailableShareOptions = () => {
    if (reminderForm.category === "PUBLIC") {
      return ["EVERYONE"];
    } else {
      return ["TEAM OR TEAMS", "INDIVIDUAL", "MULTIPLE PEOPLE"];
    }
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
      time: reminderForm.time || "09:00",
      type: reminderForm.type || "PDF",
      category: reminderForm.category || "General",
      department: reminderForm.department || "General",
      priority: reminderForm.priority || "MEDIUM",
      status: "today",
      completed: false,
      privacy: "PRIVATE",
      createdDate: new Date().toLocaleDateString("en-CA"),
      dueDate: reminderForm.date,
    };

    setReminders((prev) => [newReminder, ...prev]);
    setShowCreateModal(false);

    // Reset form
    setReminderForm({
      id: "",
      title: "",
      details: "",
      date: "",
      time: "",
      type: "",
      size: "",
      category: "PRIVATE",
      categorySpecific: "",
      department: "",
      priority: "",
      uploadedFile: null,
      shareFile: "",
      repeat: "",
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
      time: "",
      type: "",
      size: "",
      category: "PRIVATE",
      categorySpecific: "",
      department: "",
      priority: "",
      uploadedFile: null,
      shareFile: "",
      repeat: "",
    });
  };

  const handleCompleteReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((reminder) =>
        reminder.id === id
          ? {
              ...reminder,
              completed: !reminder.completed,
              status: reminder.completed ? reminder.status : "completed",
            }
          : reminder,
      ),
    );
  };

  const handleEditReminder = (id: string) => {
    const reminder = reminders.find((r) => r.id === id);
    if (reminder) {
      setReminderForm({
        id: reminder.id,
        title: reminder.title,
        details: reminder.details,
        date: reminder.date,
        time: reminder.time,
        type: reminder.type,
        size: "1.2 MB", // Default size for editing
        category: reminder.privacy === "Public" ? "PUBLIC" : "PRIVATE",
        categorySpecific: reminder.privacy === "Public" ? "EVERYONE" : "A TEAM",
        department: reminder.department,
        priority: reminder.priority,
        uploadedFile: null,
        shareFile: reminder.privacy === "Public" ? "EVERYONE" : "TEAM OR TEAMS",
        repeat: "",
      });
      setShowCreateModal(true);
    }
  };

  const handleDeleteReminder = (id: string) => {
    if (window.confirm("Are you sure you want to delete this reminder?")) {
      setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
    }
  };

  // Filter logic
  const getFilteredReminders = () => {
    return reminders.filter((reminder) => {
      const matchesSearch =
        reminder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reminder.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reminder.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reminder.department.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesFilter = true;
      if (activeFilter !== "all") {
        if (activeFilter === "completed") {
          matchesFilter = reminder.completed;
        } else {
          matchesFilter = reminder.status === activeFilter;
        }
      }

      return matchesSearch && matchesFilter;
    });
  };

  // Get counts for filters
  const getCounts = () => {
    return {
      all: reminders.length,
      today: reminders.filter((r) => r.status === "today").length,
      pending: reminders.filter((r) => r.status === "pending").length,
      upcoming: reminders.filter((r) => r.status === "upcoming").length,
      completed: reminders.filter((r) => r.completed).length,
    };
  };

  const counts = getCounts();

  const selectOptions = {
    type: ["PDF", "DOC", "PNG", "JPG", "XLS"],
    category: ["PRIVATE", "PUBLIC"],
    categoryPrivate: [
      "AN INDIVIDUAL",
      "MULTIPLE INDIVIDUALS",
      "A TEAM",
      "MULTIPLE TEAMS",
    ],
    categoryPublic: ["EVERYONE"],
    department: [
      "Engineering",
      "Finance",
      "Marketing",
      "HR",
      "Sales",
      "Design",
      "Product",
      "General",
    ],
    priority: ["VERY HIGH", "HIGH", "MEDIUM", "LOW", "VERY LOW"],
    shareFile: ["TEAM OR TEAMS", "INDIVIDUAL", "MULTIPLE PEOPLE", "EVERYONE"],
    repeat: ["Every 5 minutes", "Every 1 hour", "Every 4 hours", "Custom Time", "Custom Day"],
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
      case "URGENT":
        return "bg-red-500";
      case "HIGH":
      case "HIGH PRIORITY":
        return "bg-orange-500";
      case "MEDIUM":
        return "bg-yellow-500";
      case "LOW":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: string } = {
      Marketing: "📢",
      Finance: "💰",
      Business: "💼",
      Work: "💻",
      Personal: "👤",
      Health: "🏥",
      Education: "📚",
      Travel: "✈️",
    };
    return iconMap[category] || "📝";
  };

  const sortedReminders = [...getFilteredReminders()].sort((a, b) => {
    switch (sortBy) {
      case "priority":
        const priorityOrder = {
          CRITICAL: 0,
          URGENT: 1,
          HIGH: 2,
          "HIGH PRIORITY": 2,
          MEDIUM: 3,
          LOW: 4,
        };
        return (
          (priorityOrder[a.priority as keyof typeof priorityOrder] || 5) -
          (priorityOrder[b.priority as keyof typeof priorityOrder] || 5)
        );
      case "title":
        return a.title.localeCompare(b.title);
      case "category":
        return a.category.localeCompare(b.category);
      default: // date
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  return (
    <>
      <Layout>
        <div
          className={`min-h-screen transition-colors duration-300 ${
            isDarkMode ? "bg-emerald-900" : "bg-emerald-50"
          }`}
        >
          {/* Back to Dashboard Button */}
          <div className="p-4 pb-0">
            <Button
              onClick={() => navigate("/dashboard")}
              variant="ghost"
              size="sm"
              className={`text-xs hover:bg-white/80 transition-colors duration-200 ${
                isDarkMode
                  ? 'text-gray-300 hover:text-gray-900 hover:bg-white/90'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/80'
              }`}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Dashboard
            </Button>
          </div>

          {/* Header Section */}
          <Card
            className={`rounded-none border-0 border-b transition-colors duration-300 ${
              isDarkMode
                ? "bg-emerald-800 border-emerald-700"
                : "bg-white border-emerald-200"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                {/* Title */}
                <div>
                  <h1
                    className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Reminders
                  </h1>
                </div>

                {/* Search and Actions */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search reminders..."
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-emerald-700 border-emerald-600 text-white placeholder-emerald-300"
                            : "bg-white border-emerald-300 text-gray-900 placeholder-emerald-600"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {/* Status Filter Dropdown */}
                    <div className="relative">
                      <Button
                        onClick={() => setShowStatusFilter(!showStatusFilter)}
                        variant="outline"
                        className="border-2"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        Status
                      </Button>
                      {showStatusFilter && (
                        <div className={`absolute top-full left-0 mt-1 w-48 rounded-md shadow-lg z-50 ${
                          isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                        }`}>
                          <div className="py-1">
                            {[
                              { value: "all", label: "All Status" },
                              { value: "today", label: "Today" },
                              { value: "pending", label: "Pending" },
                              { value: "upcoming", label: "Upcoming" },
                              { value: "completed", label: "Completed" }
                            ].map((option) => (
                              <button
                                key={option.value}
                                onClick={() => {
                                  setActiveFilter(option.value);
                                  setShowStatusFilter(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                  activeFilter === option.value
                                    ? isDarkMode ? "bg-emerald-700 text-emerald-400" : "bg-emerald-50 text-emerald-600"
                                    : isDarkMode ? "text-gray-200" : "text-gray-700"
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Date Filter Dropdown */}
                    <div className="relative">
                      <Button
                        onClick={() => setShowDateFilter(!showDateFilter)}
                        variant="outline"
                        className="border-2"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
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
                        Date
                      </Button>
                      {showDateFilter && (
                        <div className={`absolute top-full left-0 mt-1 w-48 rounded-md shadow-lg z-50 ${
                          isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                        }`}>
                          <div className="py-1">
                            {[
                              { value: "all", label: "All Dates" },
                              { value: "today", label: "Today" },
                              { value: "yesterday", label: "Yesterday" },
                              { value: "week", label: "This Week" },
                              { value: "month", label: "This Month" },
                              { value: "custom", label: "Custom Date" }
                            ].map((option) => (
                              <button
                                key={option.value}
                                onClick={() => {
                                  console.log("Date filter:", option.value);
                                  setShowDateFilter(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                  isDarkMode ? "text-gray-200" : "text-gray-700"
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => setShowCreateModal(true)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      Create Reminder
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metrics Cards */}
          <div className="px-6 pt-6 pb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Today's Reminders */}
              <Card className={`border-0 shadow-sm hover:shadow-md transition-all duration-200 ${
                isDarkMode ? "bg-gradient-to-br from-blue-900/20 to-blue-800/10" : "bg-gradient-to-br from-blue-50 to-blue-100/50"
              }`}>
                <CardContent className="p-5">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${
                      isDarkMode ? "bg-blue-500/20" : "bg-blue-500/10"
                    }`}>
                      <svg className={`w-6 h-6 ${
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className={`text-xs font-medium uppercase tracking-wide ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}>
                        Today's
                      </p>
                      <p className={`text-2xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>
                        {reminders.filter(r => r.status === "today").length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pending */}
              <Card className={`border-0 shadow-sm hover:shadow-md transition-all duration-200 ${
                isDarkMode ? "bg-gradient-to-br from-orange-900/20 to-orange-800/10" : "bg-gradient-to-br from-orange-50 to-orange-100/50"
              }`}>
                <CardContent className="p-5">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${
                      isDarkMode ? "bg-orange-500/20" : "bg-orange-500/10"
                    }`}>
                      <svg className={`w-6 h-6 ${
                        isDarkMode ? "text-orange-400" : "text-orange-600"
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div>
                      <p className={`text-xs font-medium uppercase tracking-wide ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}>
                        Pending
                      </p>
                      <p className={`text-2xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>
                        {reminders.filter(r => r.status === "pending").length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming */}
              <Card className={`border-0 shadow-sm hover:shadow-md transition-all duration-200 ${
                isDarkMode ? "bg-gradient-to-br from-green-900/20 to-green-800/10" : "bg-gradient-to-br from-green-50 to-green-100/50"
              }`}>
                <CardContent className="p-5">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${
                      isDarkMode ? "bg-green-500/20" : "bg-green-500/10"
                    }`}>
                      <svg className={`w-6 h-6 ${
                        isDarkMode ? "text-green-400" : "text-green-600"
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <p className={`text-xs font-medium uppercase tracking-wide ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}>
                        Upcoming
                      </p>
                      <p className={`text-2xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>
                        {reminders.filter(r => r.status === "upcoming").length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Completed */}
              <Card className={`border-0 shadow-sm hover:shadow-md transition-all duration-200 ${
                isDarkMode ? "bg-gradient-to-br from-purple-900/20 to-purple-800/10" : "bg-gradient-to-br from-purple-50 to-purple-100/50"
              }`}>
                <CardContent className="p-5">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${
                      isDarkMode ? "bg-purple-500/20" : "bg-purple-500/10"
                    }`}>
                      <svg className={`w-6 h-6 ${
                        isDarkMode ? "text-purple-400" : "text-purple-600"
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className={`text-xs font-medium uppercase tracking-wide ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}>
                        Completed
                      </p>
                      <p className={`text-2xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>
                        {reminders.filter(r => r.completed).length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {sortedReminders.length === 0 ? (
              <div className="text-center py-16">
                <div
                  className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <svg
                    className={`w-12 h-12 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3
                  className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  {searchQuery || activeFilter !== "all"
                    ? "No reminders found"
                    : "No reminders yet"}
                </h3>
                <p
                  className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  {searchQuery || activeFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "Create your first reminder to get started"}
                </p>
              </div>
            ) : viewMode === "grid" ? (
              /* Grid View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedReminders.map((reminder) => (
                  <Card
                    key={reminder.id}
                    className={`hover:shadow-md transition-all duration-200 ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <CardContent className="p-4 h-full">
                      <div className="flex h-full">
                        {/* Left Section - Metadata Display */}
                        <div className="flex-1 space-y-3 mr-4">
                          {/* Icon and Type */}
                          <div className="flex items-center gap-2">
                            <div className="text-2xl">
                              {getCategoryIcon(reminder.category)}
                            </div>
                            <span
                              className={`text-xs px-2 py-1 rounded ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"}`}
                            >
                              {reminder.type}
                            </span>
                          </div>

                          {/* Reminder ID */}
                          <div>
                            <p
                              className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                            >
                              REMINDER ID
                            </p>
                            <p
                              className={`text-xs font-mono ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                            >
                              {reminder.id}
                            </p>
                          </div>

                          {/* Reminder Title */}
                          <div>
                            <p
                              className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                            >
                              REMINDER TITLE
                            </p>
                            <h3
                              className={`text-sm font-medium break-words ${
                                reminder.completed
                                  ? "line-through opacity-60"
                                  : ""
                              } ${isDarkMode ? "text-white" : "text-gray-900"}`}
                            >
                              {reminder.title}
                            </h3>
                          </div>

                          {/* Date and Time */}
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p
                                className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                              >
                                DATE
                              </p>
                              <p
                                className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                              >
                                {reminder.date}
                              </p>
                            </div>
                            <div>
                              <p
                                className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                              >
                                TIME
                              </p>
                              <p
                                className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                              >
                                {reminder.time}
                              </p>
                            </div>
                          </div>

                          {/* Badges Section */}
                          <div className="space-y-2">
                            {/* Department Badge */}
                            <div>
                              <span
                                className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                                  reminder.department === "Marketing"
                                    ? "bg-blue-100 text-blue-800"
                                    : reminder.department === "Finance"
                                      ? "bg-green-100 text-green-800"
                                      : reminder.department === "HR"
                                        ? "bg-pink-100 text-pink-800"
                                        : reminder.department === "Engineering"
                                          ? "bg-orange-100 text-orange-800"
                                          : isDarkMode
                                            ? "bg-gray-700 text-gray-300"
                                            : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {reminder.department}
                              </span>
                            </div>

                            {/* Category and Priority Badges */}
                            <div className="flex items-center gap-1 flex-wrap">
                              <span
                                className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                                  reminder.privacy === "Public"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {reminder.privacy === "Public"
                                  ? "PUBLIC"
                                  : "PRIVATE"}
                              </span>
                              <span
                                className={`inline-block text-xs px-2 py-1 rounded-full font-medium text-white ${getPriorityColor(reminder.priority)}`}
                              >
                                {reminder.priority}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Section - Action Controls */}
                        <div className="flex flex-col space-y-1 justify-start">
                          {/* SHARE Button */}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="p-1 h-6 w-6"
                            title="Share"
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
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                              />
                            </svg>
                          </Button>

                          {/* DELETE Button */}
                          <Button
                            onClick={() => handleDeleteReminder(reminder.id)}
                            size="sm"
                            variant="ghost"
                            className="p-1 h-6 w-6 text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Delete"
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              /* List View */
              <Card
                className={`transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead
                        className={`border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
                      >
                        <tr
                          className={`${isDarkMode ? "bg-gray-750" : "bg-gray-50"}`}
                        >
                          <th
                            className={`text-left p-4 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                          >
                            Reminder
                          </th>
                          <th
                            className={`text-left p-4 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                          >
                            Category
                          </th>
                          <th
                            className={`text-left p-4 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                          >
                            Priority
                          </th>
                          <th
                            className={`text-left p-4 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                          >
                            Due Date
                          </th>
                          <th
                            className={`text-left p-4 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                          >
                            Status
                          </th>
                          <th
                            className={`text-left p-4 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedReminders.map((reminder) => (
                          <tr
                            key={reminder.id}
                            className={`border-b hover:bg-opacity-50 transition-colors ${
                              isDarkMode
                                ? "border-gray-700 hover:bg-gray-700"
                                : "border-gray-100 hover:bg-gray-50"
                            }`}
                          >
                            <td className="p-4">
                              <div className="flex items-center space-x-3">
                                <div className="text-xl">
                                  {getCategoryIcon(reminder.category)}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <h4
                                      className={`font-semibold ${
                                        reminder.completed
                                          ? "line-through opacity-60"
                                          : ""
                                      } ${isDarkMode ? "text-white" : "text-gray-900"}`}
                                    >
                                      {reminder.title}
                                    </h4>
                                    {reminder.completed && (
                                      <svg
                                        className="w-4 h-4 text-green-500"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                      </svg>
                                    )}
                                  </div>
                                  <p
                                    className={`text-sm truncate max-w-xs ${
                                      reminder.completed
                                        ? "line-through opacity-60"
                                        : ""
                                    } ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                                  >
                                    {reminder.details}
                                  </p>
                                  <p
                                    className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
                                  >
                                    ID: {reminder.id}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex flex-col space-y-1">
                                <span
                                  className={`text-sm px-2 py-1 rounded text-center ${
                                    isDarkMode
                                      ? "bg-gray-700 text-gray-300"
                                      : "bg-gray-100 text-gray-600"
                                  }`}
                                >
                                  {reminder.category}
                                </span>
                                <span
                                  className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                                >
                                  {reminder.department}
                                </span>
                              </div>
                            </td>
                            <td className="p-4">
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium text-white ${getPriorityColor(reminder.priority)}`}
                              >
                                {reminder.priority}
                              </span>
                            </td>
                            <td
                              className={`p-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                            >
                              <div className="flex flex-col">
                                <span className="text-sm">{reminder.date}</span>
                                <span className="text-xs text-gray-500">
                                  {reminder.time}
                                </span>
                              </div>
                            </td>
                            <td className="p-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  reminder.completed
                                    ? "bg-green-100 text-green-800"
                                    : reminder.status === "today"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : reminder.status === "pending"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {reminder.completed
                                  ? "Completed"
                                  : reminder.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-1">
                                <Button
                                  onClick={() =>
                                    handleCompleteReminder(reminder.id)
                                  }
                                  size="sm"
                                  variant="ghost"
                                  className="p-1"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleEditReminder(reminder.id)
                                  }
                                  size="sm"
                                  variant="ghost"
                                  className="p-1"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                  </svg>
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleDeleteReminder(reminder.id)
                                  }
                                  size="sm"
                                  variant="ghost"
                                  className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </Layout>

      {/* Create/Edit File Upload Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card
            className={`w-full max-w-lg max-h-[90vh] mx-auto shadow-xl rounded-lg overflow-hidden ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            {/* Modal Header */}
            <div
              className={`px-4 py-3 border-b flex items-center justify-between ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <h2
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {reminderForm.id &&
                reminders.find((r) => r.id === reminderForm.id)
                  ? "Edit Reminder"
                  : "Create Reminder"}
              </h2>
              <button
                onClick={handleCloseModal}
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-gray-400 hover:text-gray-200"
                    : "hover:bg-gray-200 text-gray-500 hover:text-gray-700"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div
              className={`max-h-[70vh] overflow-y-auto ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <CardContent className="p-4 space-y-3">

                {/* 1. ID Field - Auto-generated */}
                <div className="space-y-1">
                  <label
                    className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    ID
                  </label>
                  <input
                    type="text"
                    value={reminderForm.id}
                    readOnly
                    className={`w-full px-2 py-2 border rounded-md text-sm ${
                      isDarkMode ? "bg-gray-700 border-gray-600 text-gray-400" : "bg-gray-50 border-gray-300 text-gray-500"
                    }`}
                    placeholder="Auto-generated"
                  />
                </div>

                {/* 2. Title Field */}
                <div className="space-y-1">
                  <label
                    className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Title *
                  </label>
                  <input
                    type="text"
                    value={reminderForm.title}
                    onChange={(e) =>
                      handleReminderFormChange("title", e.target.value)
                    }
                    className={`w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder="Enter reminder title"
                  />
                </div>

                {/* 3. Details Field */}
                <div className="space-y-1">
                  <label
                    className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Details
                  </label>
                  <textarea
                    value={reminderForm.details}
                    onChange={(e) =>
                      handleReminderFormChange("details", e.target.value)
                    }
                    className={`w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder="Enter reminder details (optional)"
                    rows={2}
                  />
                </div>

                {/* 4. Date Field */}
                <div className="space-y-1">
                  <label
                    className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Date *
                  </label>
                  <input
                    type="date"
                    value={reminderForm.date}
                    onChange={(e) =>
                      handleReminderFormChange("date", e.target.value)
                    }
                    className={`w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                {/* 5. Type Field */}
                <div className="space-y-1">
                  <label
                    className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Type *
                  </label>
                  <select
                    value={reminderForm.type}
                    onChange={(e) =>
                      handleReminderFormChange("type", e.target.value)
                    }
                    className={`w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="">Select type</option>
                    {selectOptions.type.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 6. Category Field */}
                <div className="space-y-1">
                  <label
                    className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Category *
                  </label>
                  <select
                    value={reminderForm.category}
                    onChange={(e) => {
                      handleReminderFormChange("category", e.target.value);
                      // Reset category specific when category changes
                      handleReminderFormChange("categorySpecific", "");
                      handleReminderFormChange("shareFile", "");
                    }}
                    className={`w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    {selectOptions.category.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Specific Field */}
                {reminderForm.category && (
                  <div className="space-y-1">
                    <label
                      className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {reminderForm.category === "PRIVATE"
                        ? "Private Access"
                        : "Public Access"}{" "}
                      *
                    </label>
                    <select
                      value={reminderForm.categorySpecific}
                      onChange={(e) =>
                        handleReminderFormChange(
                          "categorySpecific",
                          e.target.value,
                        )
                      }
                      className={`w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-200"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    >
                      <option value="">Select access level</option>
                      {(reminderForm.category === "PRIVATE"
                        ? selectOptions.categoryPrivate
                        : selectOptions.categoryPublic
                      ).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* 7. Department Field */}
                <div className="space-y-1">
                  <label
                    className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Department *
                  </label>
                  <select
                    value={reminderForm.department}
                    onChange={(e) =>
                      handleReminderFormChange("department", e.target.value)
                    }
                    className={`w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="">Select department</option>
                    {selectOptions.department.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 8. Priority Field */}
                <div className="space-y-1">
                  <label
                    className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Priority *
                  </label>
                  <select
                    value={reminderForm.priority}
                    onChange={(e) =>
                      handleReminderFormChange("priority", e.target.value)
                    }
                    className={`w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="">Select priority</option>
                    {selectOptions.priority.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 9. Share Field */}
                <div className="space-y-1">
                  <label
                    className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Share *
                  </label>
                  <select
                    value={reminderForm.shareFile}
                    onChange={(e) =>
                      handleReminderFormChange("shareFile", e.target.value)
                    }
                    className={`w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    disabled={!reminderForm.category}
                  >
                    <option value="">Select sharing option</option>
                    {getAvailableShareOptions().map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div
                    className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    {reminderForm.category === "PUBLIC" ? (
                      <p>✓ PUBLIC category allows sharing to everyone</p>
                    ) : (
                      <p>⚠ PRIVATE category restricts sharing options</p>
                    )}
                  </div>
                </div>

                {/* 10. Repeat Field */}
                <div className="space-y-1">
                  <label
                    className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Repeat *
                  </label>
                  <select
                    value={reminderForm.repeat}
                    onChange={(e) =>
                      handleReminderFormChange("repeat", e.target.value)
                    }
                    className={`w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="">Select repeat option</option>
                    {selectOptions.repeat.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

              </CardContent>
            </div>

            {/* Modal Footer */}
            <div
              className={`px-4 py-3 border-t flex justify-end space-x-2 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <Button variant="outline" onClick={handleCloseModal} size="sm">
                Cancel
              </Button>
              <Button
                onClick={handleCreateReminder}
                disabled={
                  !reminderForm.title ||
                  !reminderForm.date ||
                  !reminderForm.type ||
                  !reminderForm.category ||
                  !reminderForm.department ||
                  !reminderForm.priority ||
                  !reminderForm.shareFile ||
                  !reminderForm.repeat
                }
                className="bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                size="sm"
              >
                {reminderForm.id &&
                reminders.find((r) => r.id === reminderForm.id)
                  ? "Update Reminder"
                  : "Create Reminder"}
              </Button>
            </div>
          </Card>
        </div>
      )}

      <FooterNavigation />
    </>
  );
}
