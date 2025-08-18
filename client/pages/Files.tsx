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
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: "F003",
      name: "Feature Design",
      date: "08-15-2025",
      size: "1 MB",
      type: "PNG",
      category: "Design",
      department: "Design",
      priority: "HIGH",
      status: "active"
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
      return `FILE_${timestamp.slice(-6)}_${random.toUpperCase()}`;
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Auto-generate size
      const sizeInBytes = file.size;
      const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
      const sizeDisplay = sizeInMB + " MB";
      
      setFormData(prev => ({
        ...prev,
        upload: file.name,
        size: sizeDisplay
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
      category: formData.category,
      department: formData.department,
      priority: formData.priority,
      status: "active"
    };

    setUploadedFiles(prev => [...prev, newFile]);
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

  const selectOptions = {
    type: ["PDF", "DOC", "DOCX", "XLS", "XLSX", "PPT", "PPTX", "TXT", "IMG", "ZIP"],
    category: ["Documents", "Spreadsheets", "Presentations", "Images", "Archives", "Others"],
    department: ["HR", "Finance", "Marketing", "Engineering", "Design", "Product", "Sales", "Legal"],
    priority: ["VERY HIGH", "HIGH", "MEDIUM", "LOW", "VERY LOW"],
    share: ["Individuals", "Teams", "Everyone"]
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

  const handleMakePrivate = (fileId: string) => {
    setUploadedFiles(prev =>
      prev.map(file =>
        file.id === fileId ? { ...file, status: "private" } : file
      )
    );
    console.log("File made private:", fileId);
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
          {/* Top Action Bar */}
          <div className={`border-b px-4 py-3 transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Search and find your files here, use case, creation, department"
                  className={`px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 w-96 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className={`text-sm px-3 py-2 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  CREATE AND UPLOAD FILE ✏️ 📁
                </Button>
                <Button
                  variant="outline"
                  className={`text-sm px-3 py-2 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  FILTER SEARCH 🔽
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-8">
            <Card className={`w-full max-w-2xl shadow-2xl transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
                <h1 className="text-xl font-bold text-yellow-300">CREATE AND UPLOAD YOUR FILE HERE</h1>
                <div className="flex items-center space-x-2">
                  <button className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                    <span className="text-white text-sm">↻</span>
                  </button>
                  <button className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                    <span className="text-white text-sm">×</span>
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <CardContent className={`p-6 space-y-4 transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                {/* ID Field */}
                <div className="flex items-center space-x-4">
                  <label className={`text-blue-700 font-bold w-32 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    ID:
                  </label>
                  <input
                    type="text"
                    value={formData.id}
                    readOnly
                    className={`flex-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-600 ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-600'
                    }`}
                    placeholder="AUTO-GENERATED"
                  />
                </div>

                {/* Title Field */}
                <div className="flex items-center space-x-4">
                  <label className={`text-blue-700 font-bold w-32 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    TITLE:
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
                    placeholder="Type here"
                  />
                </div>

                {/* Date Field */}
                <div className="flex items-center space-x-4">
                  <label className={`text-blue-700 font-bold w-32 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    DATE:
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    readOnly
                    className={`flex-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-600 ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-600'
                    }`}
                    placeholder="AUTO-GENERATED"
                  />
                </div>

                {/* Size Field */}
                <div className="flex items-center space-x-4">
                  <label className={`text-blue-700 font-bold w-32 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    SIZE:
                  </label>
                  <input
                    type="text"
                    value={formData.size}
                    readOnly
                    className={`flex-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-600 ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-600'
                    }`}
                    placeholder="AUTO-GENERATED"
                  />
                </div>

                {/* Type Field */}
                <div className="flex items-center space-x-4">
                  <label className={`text-blue-700 font-bold w-32 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    TYPE:
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
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
                  <label className={`text-blue-700 font-bold w-32 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    CATEGORY:
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
                    <option value="">Type here</option>
                    {selectOptions.category.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Department Field */}
                <div className="flex items-center space-x-4">
                  <label className={`text-blue-700 font-bold w-32 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    DEPARTMENT:
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
                    <option value="">Type here</option>
                    {selectOptions.department.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Priority Field */}
                <div className="flex items-center space-x-4">
                  <label className={`text-blue-700 font-bold w-32 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    PRIORITY:
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
                    <option value="">VERY HIGH, HIGH, MEDIUM, LOW, VERY LOW</option>
                    {selectOptions.priority.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Upload Field */}
                <div className="flex items-center space-x-4">
                  <label className={`text-blue-700 font-bold w-32 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    UPLOAD:
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
                      placeholder="Click here to choose a file, or drag one here"
                    />
                    <input
                      type="file"
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

                {/* Share Field */}
                <div className="flex items-center space-x-4">
                  <label className={`text-blue-700 font-bold w-32 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    SHARE:
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
                    <option value="">Individuals, Teams, Everyone</option>
                    {selectOptions.share.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-bold rounded-lg transition-colors duration-300"
                  >
                    CREATE AND UPLOAD FILE
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>

      {/* Footer Navigation */}
      <FooterNavigation collapsed={footerCollapsed} />
    </>
  );
}
