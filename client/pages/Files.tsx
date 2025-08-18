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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [selectedDateFilter, setSelectedDateFilter] = useState('all');
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
      thumbnail: "🎨",
      lastModified: "2 hours ago",
      sharedWith: ["Design Team", "Product Team"]
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
      thumbnail: "📊",
      lastModified: "1 day ago",
      sharedWith: ["Finance Team", "Executive Team"]
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
      thumbnail: "📦",
      lastModified: "3 days ago",
      sharedWith: ["Marketing Team"]
    }
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
    share: ""
  });

  // Auto-generate ID and date
  useEffect(() => {
    const generateId = () => {
      const timestamp = Date.now().toString();
      const random = Math.random().toString(36).substring(2, 6);
      return `F${timestamp.slice(-6)}_${random.toUpperCase()}`;
    };

    const getCurrentDate = () => {
      return new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    };

    setFormData(prev => ({
      ...prev,
      id: generateId(),
      date: getCurrentDate()
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
      if (showDateFilter && !target.closest('.relative')) {
        setShowDateFilter(false);
      }
    };

    if (showDateFilter) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDateFilter]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const sizeInBytes = file.size;
      const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
      const sizeDisplay = sizeInMB + " MB";
      
      setFormData(prev => ({
        ...prev,
        upload: file.name,
        size: sizeDisplay,
        type: file.name.split('.').pop()?.toUpperCase() || "FILE"
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
      sharedWith: formData.share ? [formData.share] : ["Private"]
    };

    setUploadedFiles(prev => [newFile, ...prev]);
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
      share: ""
    });

    console.log("File created and uploaded successfully:", newFile);
  };

  const getFileIcon = (type: string) => {
    const iconMap: { [key: string]: string } = {
      'PDF': '📄',
      'DOC': '📝',
      'DOCX': '📝',
      'XLS': '📊',
      'XLSX': '��',
      'PPT': '📊',
      'PPTX': '📊',
      'TXT': '📄',
      'PNG': '🖼️',
      'JPG': '🖼️',
      'JPEG': '🖼️',
      'GIF': '🖼️',
      'ZIP': '📦',
      'RAR': '📦',
      'MP4': '🎥',
      'AVI': '🎥',
      'MP3': '🎵',
      'WAV': '🎵'
    };
    return iconMap[type?.toUpperCase()] || '📄';
  };

  const selectOptions = {
    type: ["PDF", "PNG", "DOC", "JPEG", "XLS"],
    category: ["Documents", "Spreadsheets", "Presentations", "Images", "Archives", "Others"],
    department: ["HR", "Finance", "Marketing", "Engineering", "Design", "Product", "Sales", "Legal"],
    priority: ["VERY HIGH", "HIGH", "MEDIUM", "LOW", "VERY LOW"],
    share: ["Private", "Design Team", "Finance Team", "Marketing Team", "Engineering Team", "Everyone"]
  };

  const handleRenameFile = (fileId: string) => {
    const newName = prompt("Enter new file name:");
    if (newName) {
      setUploadedFiles(prev =>
        prev.map(file =>
          file.id === fileId ? { ...file, name: newName } : file
        )
      );
    }
  };

  const handlePreviewFile = (file: any) => {
    console.log("Previewing file:", file);
    alert(`Previewing: ${file.name}`);
  };

  const handleDeleteFile = (fileId: string) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    }
  };

  const handleDownloadFile = (file: any) => {
    console.log("Downloading file:", file);
    alert(`Downloading: ${file.name}`);
  };

  const handleShareFile = (fileId: string) => {
    const shareWith = prompt("Share with (team or person):");
    if (shareWith) {
      setUploadedFiles(prev =>
        prev.map(file =>
          file.id === fileId 
            ? { ...file, sharedWith: [...(file.sharedWith || []), shareWith] }
            : file
        )
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

  const filteredFiles = uploadedFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
            isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
          }`}
          style={{ height: "calc(100vh - 4rem)", overflowY: "auto" }}
        >
          {/* Header Section */}
          <Card className={`rounded-none border-0 border-b transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                {/* Title and Stats */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Files
                    </h1>
                  </div>
                </div>

                {/* Search and Actions */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search files..."
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
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
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filter
                      </Button>

                      {showDateFilter && (
                        <div className={`absolute top-full left-0 mt-1 w-48 rounded-md shadow-lg z-50 transition-colors duration-300 ${
                          isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                        }`}>
                          <div className="py-1">
                            {[
                              { value: 'all', label: 'All Files' },
                              { value: 'today', label: 'Today' },
                              { value: 'yesterday', label: 'Yesterday' },
                              { value: 'week', label: 'This Week' },
                              { value: 'month', label: 'This Month' },
                              { value: 'lastMonth', label: 'Last Month' },
                              { value: 'custom', label: 'Custom Date' }
                            ].map((option) => (
                              <button
                                key={option.value}
                                onClick={() => {
                                  setSelectedDateFilter(option.value);
                                  setShowDateFilter(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                  selectedDateFilter === option.value
                                    ? isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600'
                                    : isDarkMode ? 'text-gray-200' : 'text-gray-700'
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
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
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
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-2 sm:p-4 md:p-6">
              <Card className={`w-full max-w-4xl max-h-[90vh] shadow-2xl transition-colors duration-300 flex flex-col ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-center px-4 sm:px-6 py-3 sm:py-4 rounded-t-lg relative flex-shrink-0">
                    <h1 className="text-lg sm:text-xl font-bold text-yellow-300">CREATE AND UPLOAD YOUR FILE HERE</h1>
                    <button
                      onClick={() => setShowUploadForm(false)}
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Form Content */}
                  <CardContent className={`p-3 sm:p-6 space-y-3 sm:space-y-4 transition-colors duration-300 flex-1 overflow-y-auto ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                  }`}>
                    {/* ID Field */}
                    <div className="flex items-center space-x-4">
                      <label className={`text-blue-700 font-semibold w-32 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                        File ID:
                      </label>
                      <input
                        type="text"
                        value={formData.id}
                        readOnly
                        className={`flex-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-600 ${
                          isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-600'
                        }`}
                        placeholder="Auto-generated"
                      />
                    </div>

                    {/* Title Field */}
                    <div className="flex items-center space-x-4">
                      <label className={`text-blue-700 font-semibold w-32 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                        File Name:
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-gray-200'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        placeholder="Enter file name"
                      />
                    </div>

                    {/* Upload Field */}
                    <div className="flex items-center space-x-4">
                      <label className={`text-blue-700 font-semibold w-32 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                        Upload File:
                      </label>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={formData.upload}
                          readOnly
                          className={`w-full px-3 py-2 pr-10 border rounded-lg transition-colors duration-300 ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-gray-200'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          placeholder="Choose a file..."
                        />
                        <input
                          type="file"
                          accept=".pdf,.png,.doc,.jpeg,.jpg,.xls"
                          onChange={handleFileUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Category and Department Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-4">
                        <label className={`text-blue-700 font-semibold w-20 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                          Category:
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-gray-200'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="">Select category</option>
                          {selectOptions.category.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center space-x-4">
                        <label className={`text-blue-700 font-semibold w-20 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                          Department:
                        </label>
                        <select
                          value={formData.department}
                          onChange={(e) => handleInputChange('department', e.target.value)}
                          className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-gray-200'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="">Select department</option>
                          {selectOptions.department.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Priority and Share Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-4">
                        <label className={`text-blue-700 font-semibold w-20 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                          Priority:
                        </label>
                        <select
                          value={formData.priority}
                          onChange={(e) => handleInputChange('priority', e.target.value)}
                          className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-gray-200'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="">Select priority</option>
                          {selectOptions.priority.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center space-x-4">
                        <label className={`text-blue-700 font-semibold w-20 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                          Share With:
                        </label>
                        <select
                          value={formData.share}
                          onChange={(e) => handleInputChange('share', e.target.value)}
                          className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-gray-200'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="">Select sharing option</option>
                          {selectOptions.share.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Auto-generated fields display */}
                    {formData.upload && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div>
                          <label className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                            File Size:
                          </label>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {formData.size}
                          </p>
                        </div>
                        <div>
                          <label className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                            File Type:
                          </label>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {formData.type}
                          </p>
                        </div>
                        <div>
                          <label className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                            Upload Date:
                          </label>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {formData.date}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-center pt-6">
                      <Button
                        onClick={handleSubmit}
                        disabled={!formData.title || !formData.upload}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors duration-300 shadow-lg disabled:opacity-50"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        CREATE AND UPLOAD FILE
                      </Button>
                    </div>
                  </CardContent>
                </Card>
            </div>
          )}

          <div className="p-6">
            {!showUploadForm && (
              /* File List/Grid View */
              <div>
                {sortedFiles.length === 0 ? (
                  <div className="text-center py-16">
                    <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <svg className={`w-12 h-12 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {searchQuery ? 'No files found' : 'No files uploaded yet'}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {searchQuery
                        ? 'Try adjusting your search'
                        : 'Click "Upload File" to get started'
                      }
                    </p>
                  </div>
) : (
                  /* Grid View */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedFiles.map((file) => (
                      <Card key={file.id} className={`min-h-[240px] hover:shadow-md transition-all duration-200 ${
                        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                      }`}>
                        <CardContent className="p-3 h-full">
                          {/* Square Layout */}
                          <div className="flex flex-col h-full">

                            {/* Top Section - File Icon, Type and Actions */}
                            <div className="flex items-start justify-between mb-1">
                              <div className="flex items-center gap-1">
                                <div className="text-4xl">{file.thumbnail}</div>
                                <span className={`text-sm px-3 py-1 rounded ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
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
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                </Button>

                                {/* DOWNLOAD Icon */}
                                <Button
                                  onClick={() => handleDownloadFile(file)}
                                  size="sm"
                                  variant="ghost"
                                  className="p-1 h-6 w-6"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 712-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                </Button>

                                {/* SHARE Icon */}
                                <Button
                                  onClick={() => handleShareFile(file.id)}
                                  size="sm"
                                  variant="ghost"
                                  className="p-1 h-6 w-6"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                  </svg>
                                </Button>

                                {/* DELETE Icon */}
                                <Button
                                  onClick={() => handleDeleteFile(file.id)}
                                  size="sm"
                                  variant="ghost"
                                  className="p-1 h-6 w-6 text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </Button>
                              </div>
                            </div>

                            {/* Middle Section - File Info */}
                            {/* FILE NAME - Close to file type */}
                            <div className="mb-4">
                              <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                FILE NAME
                              </p>
                              <h3 className={`text-sm font-medium break-words ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {file.name}
                              </h3>
                            </div>

                            {/* Rest of the content with more space */}
                            <div className="flex-1 space-y-2 mb-2">
                              {/* FILE ID */}
                              <div>
                                <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  FILE ID
                                </p>
                                <p className={`text-sm font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  {file.id}
                                </p>
                              </div>

                              {/* FILE SIZE & DATE */}
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    SIZE
                                  </p>
                                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {file.size}
                                  </p>
                                </div>
                                <div>
                                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    DATE
                                  </p>
                                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {file.date}
                                  </p>
                                </div>
                              </div>

                              {/* Badges Section */}
                              {/* All Badges in One Row */}
                              <div className="pt-2">
                                <div className="flex items-center gap-2 flex-wrap justify-start">
                                  <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                                    file.department === 'Design' ? 'bg-purple-100 text-purple-800' :
                                    file.department === 'Finance' ? 'bg-green-100 text-green-800' :
                                    file.department === 'Marketing' ? 'bg-blue-100 text-blue-800' :
                                    file.department === 'Engineering' ? 'bg-orange-100 text-orange-800' :
                                    file.department === 'HR' ? 'bg-pink-100 text-pink-800' :
                                    isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    {file.department.toUpperCase()}
                                  </span>
                                  <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                                    file.visibility === 'Public' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                  }`}>
                                    {file.visibility === 'Public' ? 'PUBLIC' : 'PRIVATE'}
                                  </span>
                                  <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium text-white ${getPriorityColor(file.priority)}`}>
                                    {file.priority}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div style={{display: 'none'}}>

                              <Button
                                onClick={() => handlePreviewFile(file)}
                                size="sm"
                                variant="outline"
                                className="p-1 h-6 w-6"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </Button>

                              <Button
                                onClick={() => handleDownloadFile(file)}
                                size="sm"
                                variant="outline"
                                className="p-1 h-6 w-6"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
