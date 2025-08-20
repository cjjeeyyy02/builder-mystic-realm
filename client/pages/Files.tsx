import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FooterNavigation from "@/components/FooterNavigation";
import { useDarkMode } from "@/components/DarkModeProvider";

export default function Files() {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [footerCollapsed, setFooterCollapsed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // View state
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [selectedDateFilter, setSelectedDateFilter] = useState("all");
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: "F003",
      name: "Feature Design Mockup",
      date: "08-15-2025",
      size: "2.4 MB",
      type: "PNG",
      category: "Design",
      department: "Design",
      priority: "HIGH",
      status: "active",
      visibility: "Private",
      thumbnail: "PNG",
      lastModified: "2 hours ago",
      sharedWith: ["Design Team", "Product Team"],
    },
    {
      id: "F004",
      name: "Q3 Financial Report",
      date: "08-14-2025",
      size: "850 KB",
      type: "PDF",
      category: "Documents",
      department: "Finance",
      priority: "CRITICAL",
      status: "active",
      visibility: "Public",
      thumbnail: "PDF",
      lastModified: "1 day ago",
      sharedWith: ["Finance Team", "Executive Team"],
    },
    {
      id: "F005",
      name: "Marketing Campaign Assets",
      date: "08-13-2025",
      size: "15.2 MB",
      type: "ZIP",
      category: "Archives",
      department: "Marketing",
      priority: "MEDIUM",
      status: "active",
      visibility: "Private",
      thumbnail: "ZIP",
      lastModified: "3 days ago",
      sharedWith: ["Marketing Team"],
    },
  ]);

  // Form state
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    date: "",
    size: "",
    type: "",
    category: "",
    department: "",
    priority: "",
    upload: "",
    share: "",
  });

  // Auto-generate ID and date
  useEffect(() => {
    const generateId = () => {
      const timestamp = Date.now().toString();
      const random = Math.random().toString(36).substring(2, 6);
      return `F${timestamp.slice(-6)}_${random.toUpperCase()}`;
    };

    const getCurrentDate = () => {
      return new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    };

    setFormData((prev) => ({
      ...prev,
      id: generateId(),
      date: getCurrentDate(),
    }));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const currentScrollY = scrollContainerRef.current.scrollTop;
      const isScrollingDown = currentScrollY > lastScrollY;

      if (currentScrollY > 50) {
        setFooterCollapsed(isScrollingDown);
      } else {
        setFooterCollapsed(false);
      }

      setLastScrollY(currentScrollY);
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [lastScrollY]);

  // Close date filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showDateFilter && !target.closest(".relative")) {
        setShowDateFilter(false);
      }
    };

    if (showDateFilter) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showDateFilter]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const sizeInBytes = file.size;
      const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
      const sizeDisplay = sizeInMB + " MB";

      setFormData((prev) => ({
        ...prev,
        upload: file.name,
        size: sizeDisplay,
        type: file.name.split(".").pop()?.toUpperCase() || "FILE",
      }));
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.upload) {
      alert("Please fill in all required fields and select a file to upload.");
      return;
    }

    const newFile = {
      id: formData.id,
      name: formData.title,
      date: formData.date,
      size: formData.size,
      type: formData.type || "FILE",
      category: formData.category || "Documents",
      department: formData.department || "General",
      priority: formData.priority || "MEDIUM",
      status: "active",
      visibility: "Private",
      thumbnail: getFileIcon(formData.type),
      lastModified: "Just now",
      sharedWith: formData.share ? [formData.share] : ["Private"],
    };

    setUploadedFiles((prev) => [newFile, ...prev]);
    setShowUploadForm(false);

    // Reset form
    setFormData({
      id: "",
      title: "",
      date: "",
      size: "",
      type: "",
      category: "",
      department: "",
      priority: "",
      upload: "",
      share: "",
    });

    console.log("File created and uploaded successfully:", newFile);
  };

  const getFileIcon = (type: string) => {
    const fileType = type?.toUpperCase();

    // Return the file type itself for display
    return fileType || "FILE";
  };

  const getFileIconComponent = (type: string) => {
    const fileType = type?.toUpperCase();
    const iconClass = "w-12 h-12";

    switch (fileType) {
      case "PDF":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
            <polyline points="14,2 14,8 20,8" fill="none" stroke="#dc2626" strokeWidth="2"/>
            <text x="12" y="16" textAnchor="middle" className="text-xs font-bold fill-white">PDF</text>
          </svg>
        );
      case "DOC":
      case "DOCX":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2"/>
            <polyline points="14,2 14,8 20,8" fill="none" stroke="#1d4ed8" strokeWidth="2"/>
            <text x="12" y="16" textAnchor="middle" className="text-xs font-bold fill-white">DOC</text>
          </svg>
        );
      case "XLS":
      case "XLSX":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#059669" stroke="#047857" strokeWidth="2"/>
            <polyline points="14,2 14,8 20,8" fill="none" stroke="#047857" strokeWidth="2"/>
            <text x="12" y="16" textAnchor="middle" className="text-xs font-bold fill-white">XLS</text>
          </svg>
        );
      case "PPT":
      case "PPTX":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#ea580c" stroke="#c2410c" strokeWidth="2"/>
            <polyline points="14,2 14,8 20,8" fill="none" stroke="#c2410c" strokeWidth="2"/>
            <text x="12" y="16" textAnchor="middle" className="text-xs font-bold fill-white">PPT</text>
          </svg>
        );
      case "PNG":
      case "JPG":
      case "JPEG":
      case "GIF":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#7c3aed" stroke="#6d28d9" strokeWidth="2"/>
            <polyline points="14,2 14,8 20,8" fill="none" stroke="#6d28d9" strokeWidth="2"/>
            <circle cx="10" cy="12" r="2" fill="white"/>
            <path d="M16 16l-4-4-4 4" stroke="white" strokeWidth="2" fill="none"/>
            <text x="12" y="20" textAnchor="middle" className="text-xs font-bold fill-white">{fileType}</text>
          </svg>
        );
      case "ZIP":
      case "RAR":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#6b7280" stroke="#4b5563" strokeWidth="2"/>
            <polyline points="14,2 14,8 20,8" fill="none" stroke="#4b5563" strokeWidth="2"/>
            <text x="12" y="16" textAnchor="middle" className="text-xs font-bold fill-white">ZIP</text>
          </svg>
        );
      case "MP4":
      case "AVI":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#dc2626" stroke="#b91c1c" strokeWidth="2"/>
            <polyline points="14,2 14,8 20,8" fill="none" stroke="#b91c1c" strokeWidth="2"/>
            <polygon points="10,10 14,12 10,14" fill="white"/>
            <text x="12" y="20" textAnchor="middle" className="text-xs font-bold fill-white">MP4</text>
          </svg>
        );
      case "MP3":
      case "WAV":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
            <polyline points="14,2 14,8 20,8" fill="none" stroke="#d97706" strokeWidth="2"/>
            <circle cx="9" cy="13" r="1" fill="white"/>
            <circle cx="12" cy="11" r="1" fill="white"/>
            <circle cx="15" cy="14" r="1" fill="white"/>
            <text x="12" y="20" textAnchor="middle" className="text-xs font-bold fill-white">MP3</text>
          </svg>
        );
      default:
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#6b7280" stroke="#4b5563" strokeWidth="2"/>
            <polyline points="14,2 14,8 20,8" fill="none" stroke="#4b5563" strokeWidth="2"/>
            <text x="12" y="16" textAnchor="middle" className="text-xs font-bold fill-white">FILE</text>
          </svg>
        );
    }
  };

  const selectOptions = {
    type: ["PDF", "PNG", "DOC", "JPEG", "XLS"],
    category: [
      "Documents",
      "Spreadsheets",
      "Presentations",
      "Images",
      "Archives",
      "Others",
    ],
    department: [
      "HR",
      "Finance",
      "Marketing",
      "Engineering",
      "Design",
      "Product",
      "Sales",
      "Legal",
    ],
    priority: ["VERY HIGH", "HIGH", "MEDIUM", "LOW", "VERY LOW"],
    share: [
      "Private",
      "Design Team",
      "Finance Team",
      "Marketing Team",
      "Engineering Team",
      "Everyone",
    ],
  };

  const handleRenameFile = (fileId: string) => {
    const newName = prompt("Enter new file name:");
    if (newName) {
      setUploadedFiles((prev) =>
        prev.map((file) =>
          file.id === fileId ? { ...file, name: newName } : file,
        ),
      );
    }
  };

  const handlePreviewFile = (file: any) => {
    console.log("Previewing file:", file);
    alert(`Previewing: ${file.name}`);
  };

  const handleDeleteFile = (fileId: string) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
    }
  };

  const handleDownloadFile = (file: any) => {
    console.log("Downloading file:", file);
    alert(`Downloading: ${file.name}`);
  };

  const handleShareFile = (fileId: string) => {
    const shareWith = prompt("Share with (team or person):");
    if (shareWith) {
      setUploadedFiles((prev) =>
        prev.map((file) =>
          file.id === fileId
            ? { ...file, sharedWith: [...(file.sharedWith || []), shareWith] }
            : file,
        ),
      );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "private":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
      case "VERY HIGH":
        return "bg-red-500";
      case "HIGH":
        return "bg-orange-500";
      case "MEDIUM":
        return "bg-yellow-500";
      case "LOW":
      case "VERY LOW":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredFiles = uploadedFiles.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <>
      <Layout>
        <div
          ref={scrollContainerRef}
          className={`min-h-screen transition-colors duration-300 ${
            isDarkMode ? "bg-emerald-900" : "bg-emerald-50"
          }`}
          style={{ height: "calc(100vh - 4rem)", overflowY: "auto" }}
        >
          {/* Back to Dashboard Button */}
          <div className="p-4 pb-0">
            <Button
              onClick={() => navigate("/dashboard")}
              variant="ghost"
              size="sm"
              className={`text-xs hover:bg-white/80 transition-colors duration-200 ${
                isDarkMode
                  ? 'text-emerald-300 hover:text-emerald-900 hover:bg-white/90'
                  : 'text-emerald-700 hover:text-emerald-900 hover:bg-white/80'
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
                {/* Title and Stats */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1
                      className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Files
                    </h1>
                  </div>
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
                        placeholder="Search files..."
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-emerald-700 border-emerald-600 text-white placeholder-emerald-300"
                            : "bg-white border-emerald-300 text-gray-900 placeholder-emerald-600"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2">
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
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                          />
                        </svg>
                        Filter
                      </Button>

                      {showDateFilter && (
                        <div
                          className={`absolute top-full left-0 mt-1 w-48 rounded-md shadow-lg z-50 transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-gray-800 border border-gray-700"
                              : "bg-white border border-gray-200"
                          }`}
                        >
                          <div className="py-1">
                            {[
                              { value: "all", label: "All Files" },
                              { value: "today", label: "Today" },
                              { value: "yesterday", label: "Yesterday" },
                              { value: "week", label: "This Week" },
                              { value: "month", label: "This Month" },
                              { value: "lastMonth", label: "Last Month" },
                              { value: "custom", label: "Custom Date" },
                            ].map((option) => (
                              <button
                                key={option.value}
                                onClick={() => {
                                  setSelectedDateFilter(option.value);
                                  setShowDateFilter(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                  selectedDateFilter === option.value
                                    ? isDarkMode
                                      ? "bg-gray-700 text-blue-400"
                                      : "bg-blue-50 text-blue-600"
                                    : isDarkMode
                                      ? "text-gray-200"
                                      : "text-gray-700"
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Combined Create/Upload Button */}
                    <Button
                      onClick={() => setShowUploadForm(!showUploadForm)}
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
                      Create and Upload File
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          {/* Modal Overlay */}
          {showUploadForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
              <Card
                className={`w-full max-w-lg max-h-[90vh] shadow-xl rounded-lg overflow-hidden ${
                  isDarkMode
                    ? "bg-emerald-800 border-emerald-700"
                    : "bg-white border-emerald-200"
                }`}
              >
                {/* Header */}
                <div
                  className={`px-4 sm:px-6 py-3 sm:py-4 border-b flex items-center justify-between ${
                    isDarkMode
                      ? "bg-emerald-800 border-emerald-700"
                      : "bg-emerald-50 border-emerald-200"
                  }`}
                >
                  <h1
                    className={`text-lg sm:text-xl font-semibold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Create and Upload File
                  </h1>
                  <button
                    onClick={() => setShowUploadForm(false)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
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

                {/* Form Content - Scrollable */}
                <div className={`max-h-[65vh] overflow-y-auto ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}>
                  <CardContent className="p-3 space-y-3">

                  {/* 1. ID Field - Auto-generated */}
                  <div className="space-y-1">
                    <label
                      className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      ID
                    </label>
                    <input
                      type="text"
                      value={formData.id}
                      readOnly
                      className={`w-full px-2 py-1.5 border rounded text-xs ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-400"
                          : "bg-gray-50 border-gray-300 text-gray-500"
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
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      className={`w-full px-2 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-200"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                      placeholder="Enter file title"
                    />
                  </div>

                  {/* 3. Date Field */}
                  <div className="space-y-1">
                    <label
                      className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Date *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                      className={`w-full px-2 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-200"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />
                  </div>

                  {/* 4. Size Field - Auto-generated */}
                  <div className="space-y-1">
                    <label
                      className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Size
                    </label>
                    <input
                      type="text"
                      value={formData.size}
                      readOnly
                      className={`w-full px-2 py-1.5 border rounded text-xs ${
                        isDarkMode ? "bg-emerald-700 border-emerald-600 text-emerald-300" : "bg-emerald-50 border-emerald-300 text-emerald-700"
                      }`}
                      placeholder="Auto-generated"
                    />
                  </div>

                  {/* 5. Type Field - Auto-generated */}
                  <div className="space-y-1">
                    <label
                      className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Type
                    </label>
                    <input
                      type="text"
                      value={formData.type}
                      readOnly
                      className={`w-full px-2 py-1.5 border rounded text-xs ${
                        isDarkMode ? "bg-emerald-700 border-emerald-600 text-emerald-300" : "bg-emerald-50 border-emerald-300 text-emerald-700"
                      }`}
                      placeholder="Auto-generated"
                    />
                  </div>

                  {/* 6. Category Field */}
                  <div className="space-y-1">
                    <label className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      className={`w-full px-2 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                        isDarkMode ? "bg-emerald-700 border-emerald-600 text-white" : "bg-white border-emerald-300 text-gray-900"
                      }`}
                    >
                      <option value="">Select category</option>
                      {selectOptions.category.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* 7. Department Field */}
                  <div className="space-y-1">
                    <label className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Department *
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      className={`w-full px-2 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                        isDarkMode ? "bg-emerald-700 border-emerald-600 text-white" : "bg-white border-emerald-300 text-gray-900"
                      }`}
                    >
                      <option value="">Select department</option>
                      {selectOptions.department.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* 8. Priority Field */}
                  <div className="space-y-1">
                    <label className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Priority *
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => handleInputChange("priority", e.target.value)}
                      className={`w-full px-2 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                        isDarkMode ? "bg-emerald-700 border-emerald-600 text-white" : "bg-white border-emerald-300 text-gray-900"
                      }`}
                    >
                      <option value="">Select priority</option>
                      {selectOptions.priority.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* 9. Upload File Field */}
                  <div className="space-y-1">
                    <label
                      className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Upload File *
                    </label>
                    <div className={`border-2 border-dashed rounded p-2 text-center ${
                      isDarkMode ? "border-emerald-600 bg-emerald-700" : "border-emerald-300 bg-emerald-50"
                    }`}>
                      <input
                        type="file"
                        accept=".pdf,.png,.doc,.jpeg,.jpg,.xls"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className={`cursor-pointer inline-flex items-center gap-1 text-xs ${
                          isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        {formData.upload || 'Click to upload file'}
                      </label>
                      <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Support: PDF, PNG, DOC, JPEG, JPG, XLS
                      </p>
                    </div>
                  </div>

                  {/* 10. Share File Field */}
                  <div className="space-y-1">
                    <label className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Share File *
                    </label>
                    <select
                      value={formData.share}
                      onChange={(e) => handleInputChange("share", e.target.value)}
                      className={`w-full px-2 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                        isDarkMode ? "bg-emerald-700 border-emerald-600 text-white" : "bg-white border-emerald-300 text-gray-900"
                      }`}
                    >
                      <option value="">Select sharing option</option>
                      {selectOptions.share.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                </CardContent>
                </div>

                {/* Submit Button */}
                <div className={`px-3 py-2 border-t ${isDarkMode ? "bg-emerald-800 border-emerald-700" : "bg-emerald-50 border-emerald-200"}`}>
                  <Button
                    onClick={handleSubmit}
                    disabled={!formData.title || !formData.upload}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 text-sm font-medium rounded transition-colors duration-300 disabled:opacity-50"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    CREATE AND UPLOAD FILE
                  </Button>
                </div>
              </Card>
            </div>
          )}

          <div className="p-6">
            {!showUploadForm && (
              /* File List/Grid View */
              <div>
                {sortedFiles.length === 0 ? (
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
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3
                      className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    >
                      {searchQuery ? "No files found" : "No files uploaded yet"}
                    </h3>
                    <p
                      className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {searchQuery
                        ? "Try adjusting your search"
                        : 'Click "Upload File" to get started'}
                    </p>
                  </div>
                ) : (
                  /* Grid View */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedFiles.map((file) => (
                      <Card
                        key={file.id}
                        className={`min-h-[240px] hover:shadow-md transition-all duration-200 ${
                          isDarkMode
                            ? "bg-emerald-800 border-emerald-700"
                            : "bg-white border-emerald-200"
                        }`}
                      >
                        <CardContent className="p-3 h-full">
                          {/* Square Layout */}
                          <div className="flex flex-col h-full">
                            {/* Top Section - File Icon, Type and Actions */}
                            <div className="flex items-start justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <div className="flex-shrink-0">
                                  {getFileIconComponent(file.type)}
                                </div>
                                <span
                                  className={`text-sm px-3 py-1 rounded ${isDarkMode ? "bg-emerald-700 text-emerald-300" : "bg-emerald-100 text-emerald-700"}`}
                                >
                                  {file.type}
                                </span>
                              </div>

                              {/* Action Icons - Right Section */}
                              <div className="flex flex-col space-y-1">
                                {/* VIEW Icon */}
                                <Button
                                  onClick={() => handlePreviewFile(file)}
                                  size="sm"
                                  variant="ghost"
                                  className="p-1 h-6 w-6"
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
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                  </svg>
                                </Button>

                                {/* DOWNLOAD Icon */}
                                <Button
                                  onClick={() => handleDownloadFile(file)}
                                  size="sm"
                                  variant="ghost"
                                  className="p-1 h-6 w-6"
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
                                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 712-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                  </svg>
                                </Button>

                                {/* SHARE Icon */}
                                <Button
                                  onClick={() => handleShareFile(file.id)}
                                  size="sm"
                                  variant="ghost"
                                  className="p-1 h-6 w-6"
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

                                {/* DELETE Icon */}
                                <Button
                                  onClick={() => handleDeleteFile(file.id)}
                                  size="sm"
                                  variant="ghost"
                                  className="p-1 h-6 w-6 text-red-600 hover:text-red-700 hover:bg-red-50"
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

                            {/* Middle Section - File Info */}
                            {/* FILE NAME - Close to file type */}
                            <div className="mb-4">
                              <p
                                className={`text-sm font-semibold ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                              >
                                FILE NAME
                              </p>
                              <h3
                                className={`text-sm font-medium break-words ${isDarkMode ? "text-white" : "text-gray-900"}`}
                              >
                                {file.name}
                              </h3>
                            </div>

                            {/* Rest of the content with more space */}
                            <div className="flex-1 space-y-2 mb-2">
                              {/* FILE ID */}
                              <div>
                                <p
                                  className={`text-sm font-semibold ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                                >
                                  FILE ID
                                </p>
                                <p
                                  className={`text-sm font-mono ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                                >
                                  {file.id}
                                </p>
                              </div>

                              {/* FILE SIZE & DATE */}
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <p
                                    className={`text-sm font-semibold ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                                  >
                                    SIZE
                                  </p>
                                  <p
                                    className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                                  >
                                    {file.size}
                                  </p>
                                </div>
                                <div>
                                  <p
                                    className={`text-sm font-semibold ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                                  >
                                    DATE
                                  </p>
                                  <p
                                    className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                                  >
                                    {file.date}
                                  </p>
                                </div>
                              </div>

                              {/* Badges Section */}
                              {/* All Badges in One Row */}
                              <div className="pt-2">
                                <div className="flex items-center gap-2 flex-wrap justify-start">
                                  <span
                                    className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                                      file.department === "Design"
                                        ? "bg-purple-100 text-purple-800"
                                        : file.department === "Finance"
                                          ? "bg-green-100 text-green-800"
                                          : file.department === "Marketing"
                                            ? "bg-blue-100 text-blue-800"
                                            : file.department === "Engineering"
                                              ? "bg-orange-100 text-orange-800"
                                              : file.department === "HR"
                                                ? "bg-pink-100 text-pink-800"
                                                : isDarkMode
                                                  ? "bg-gray-700 text-gray-300"
                                                  : "bg-gray-100 text-gray-600"
                                    }`}
                                  >
                                    {file.department.toUpperCase()}
                                  </span>
                                  <span
                                    className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                                      file.visibility === "Public"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {file.visibility === "Public"
                                      ? "PUBLIC"
                                      : "PRIVATE"}
                                  </span>
                                  <span
                                    className={`inline-block text-xs px-2 py-1 rounded-full font-medium text-white ${getPriorityColor(file.priority)}`}
                                  >
                                    {file.priority}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div style={{ display: "none" }}>
                              <Button
                                onClick={() => handlePreviewFile(file)}
                                size="sm"
                                variant="outline"
                                className="p-1 h-6 w-6"
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
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </Button>

                              <Button
                                onClick={() => handleDownloadFile(file)}
                                size="sm"
                                variant="outline"
                                className="p-1 h-6 w-6"
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
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Layout>

      {/* Footer Navigation */}
      <FooterNavigation collapsed={footerCollapsed} />
    </>
  );
}
