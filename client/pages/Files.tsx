import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Files() {
  const navigate = useNavigate();
  const [filterBy, setFilterBy] = useState("All Files");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const recentFiles = [
    {
      id: 1,
      name: "Employee_Handbook_2024.pdf",
      size: "2.3 MB",
      uploadedBy: "HR Team",
      uploadedTime: "2 hours ago",
      type: "pdf",
      color: "from-red-500 to-red-600"
    },
    {
      id: 2,
      name: "Project_Proposal_Q4.pdf",
      size: "1.8 MB",
      uploadedBy: "Product Team",
      uploadedTime: "4 hours ago",
      type: "pdf",
      color: "from-red-500 to-red-600"
    },
    {
      id: 3,
      name: "Design_Guidelines.pdf",
      size: "3.1 MB",
      uploadedBy: "Design Team",
      uploadedTime: "1 day ago",
      type: "pdf",
      color: "from-red-500 to-red-600"
    },
    {
      id: 4,
      name: "Financial_Report_2024.xlsx",
      size: "892 KB",
      uploadedBy: "Finance Team",
      uploadedTime: "2 days ago",
      type: "excel",
      color: "from-green-500 to-green-600"
    },
    {
      id: 5,
      name: "Team_Photos.zip",
      size: "15.2 MB",
      uploadedBy: "HR Team",
      uploadedTime: "3 days ago",
      type: "archive",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 6,
      name: "Marketing_Assets.zip",
      size: "8.7 MB",
      uploadedBy: "Marketing Team",
      uploadedTime: "1 week ago",
      type: "archive",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 7,
      name: "Product_Roadmap.pptx",
      size: "4.5 MB",
      uploadedBy: "Product Team",
      uploadedTime: "1 week ago",
      type: "powerpoint",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 8,
      name: "Code_Documentation.pdf",
      size: "1.2 MB",
      uploadedBy: "Engineering Team",
      uploadedTime: "2 weeks ago",
      type: "pdf",
      color: "from-red-500 to-red-600"
    },
    {
      id: 9,
      name: "User_Research.docx",
      size: "756 KB",
      uploadedBy: "UX Team",
      uploadedTime: "2 weeks ago",
      type: "document",
      color: "from-blue-500 to-blue-600"
    }
  ];

  const categories = ["All Files", "Documents", "Images", "Archives", "Recent"];

  const handleDownload = (file: any) => {
    console.log(`Downloading ${file.name}`);
  };

  const handleUpload = () => {
    console.log("Opening upload dialog");
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case "excel":
        return (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case "powerpoint":
        return (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1m8 0V3a1 1 0 00-1-1H8a1 1 0 00-1 1v1m8 0H8" />
          </svg>
        );
      case "archive":
        return (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case "document":
        return (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  const FileCard = ({ file }: { file: any }) => (
    <Card className="bg-white/70 backdrop-blur-sm border border-gray-200/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className={`w-12 h-12 bg-gradient-to-br ${file.color} rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0`}>
            {getFileIcon(file.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                  {file.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {file.size}
                </p>
              </div>
            </div>

            <div className="space-y-1 mb-3">
              <p className="text-xs text-gray-600">
                <span className="font-medium">Uploaded by:</span> {file.uploadedBy}
              </p>
              <p className="text-xs text-gray-500">
                {file.uploadedTime}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                onClick={() => handleDownload(file)}
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs px-3 py-1.5 h-7 shadow-sm"
              >
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-800 text-xs px-2 py-1.5 h-7"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Files & Documents
              </h1>
              <p className="text-sm text-gray-600 mt-1">Manage and organize your team files</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex bg-gray-100/80 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "grid" 
                      ? "bg-white text-amber-600 shadow-sm" 
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "list" 
                      ? "bg-white text-amber-600 shadow-sm" 
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <Button 
                onClick={handleUpload}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-xl shadow-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Files
              </Button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterBy(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    filterBy === category
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm"
                      : "bg-white/70 text-gray-700 hover:bg-white hover:text-amber-600 border border-gray-200/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search files..."
                className="w-full sm:w-64 px-4 py-2 pl-10 text-sm bg-white/70 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Recent Files Toggle */}
          <div className="flex items-center space-x-2 mt-4">
            <input 
              type="checkbox" 
              id="recent-files"
              className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 focus:ring-2"
            />
            <label htmlFor="recent-files" className="text-sm font-medium text-gray-700">
              Show Recent Files Only
            </label>
          </div>
        </div>

        {/* Files Grid */}
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Your Files</h2>
            <p className="text-sm text-gray-600">{recentFiles.length} files available</p>
          </div>

          <div className={`${
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" 
              : "space-y-3"
          }`}>
            {recentFiles.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 shadow-lg mt-12">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex items-center justify-center space-x-12">
              {/* Activity Feed */}
              <div 
                className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-xl hover:bg-gray-50"
                onClick={() => navigate('/dashboard')}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700 font-semibold group-hover:text-blue-600 transition-colors">Activity Feed</span>
              </div>

              {/* Chat */}
              <div 
                className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-xl hover:bg-gray-50"
                onClick={() => navigate('/chat')}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700 font-semibold group-hover:text-emerald-600 transition-colors">Chat</span>
              </div>

              {/* Files - Active */}
              <div className="flex flex-col items-center space-y-2 cursor-pointer p-3 rounded-xl bg-amber-50">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <span className="text-xs text-amber-700 font-semibold">Files</span>
              </div>

              {/* Meetings */}
              <div className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-xl hover:bg-gray-50">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700 font-semibold group-hover:text-purple-600 transition-colors">Meetings</span>
              </div>

              {/* Reminders */}
              <div 
                className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-xl hover:bg-gray-50"
                onClick={() => navigate('/reminders')}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 1015 0z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700 font-semibold group-hover:text-orange-600 transition-colors">Reminders</span>
              </div>

              {/* E - Forum */}
              <div 
                className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-xl hover:bg-gray-50"
                onClick={() => navigate('/e-forum')}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700 font-semibold group-hover:text-indigo-600 transition-colors">E - Forum</span>
              </div>

              {/* AI2AIM STORE */}
              <div 
                className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-xl hover:bg-gray-50"
                onClick={() => navigate('/ai2aim-store')}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700 font-semibold group-hover:text-red-600 transition-colors">AI2AIM STORE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
