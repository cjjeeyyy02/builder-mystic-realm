import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Files() {
  const navigate = useNavigate();
  const [filterBy, setFilterBy] = useState("All Files");

  const recentFiles = [
    {
      id: 1,
      name: "Employee_Handbook_2024.pdf",
      size: "23 KB",
      uploadedBy: "HR Team",
      uploadedTime: "2 hours ago",
      type: "pdf"
    },
    {
      id: 2,
      name: "Employee_Handbook_2024.pdf",
      size: "25 KB",
      uploadedBy: "HR Team",
      uploadedTime: "2 hours ago",
      type: "pdf"
    },
    {
      id: 3,
      name: "Employee_Handbook_2024.pdf",
      size: "24 KB",
      uploadedBy: "HR Team",
      uploadedTime: "2 hours ago",
      type: "pdf"
    },
    {
      id: 4,
      name: "Employee_Handbook_2024.pdf",
      size: "23 KB",
      uploadedBy: "HR Team",
      uploadedTime: "2 hours ago",
      type: "pdf"
    },
    {
      id: 5,
      name: "Employee_Handbook_2024.pdf",
      size: "25 KB",
      uploadedBy: "HR Team",
      uploadedTime: "2 hours ago",
      type: "pdf"
    },
    {
      id: 6,
      name: "Employee_Handbook_2024.pdf",
      size: "24 KB",
      uploadedBy: "HR Team",
      uploadedTime: "2 hours ago",
      type: "pdf"
    },
    {
      id: 7,
      name: "Employee_Handbook_2024.pdf",
      size: "23 KB",
      uploadedBy: "HR Team",
      uploadedTime: "2 hours ago",
      type: "pdf"
    },
    {
      id: 8,
      name: "Employee_Handbook_2024.pdf",
      size: "25 KB",
      uploadedBy: "HR Team",
      uploadedTime: "2 hours ago",
      type: "pdf"
    },
    {
      id: 9,
      name: "Employee_Handbook_2024.pdf",
      size: "24 KB",
      uploadedBy: "HR Team",
      uploadedTime: "2 hours ago",
      type: "pdf"
    }
  ];

  const handleDownload = (file: any) => {
    // In a real app, this would trigger a file download
    console.log(`Downloading ${file.name}`);
  };

  const handleUpload = () => {
    // In a real app, this would open a file upload dialog
    console.log("Opening upload dialog");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Files</h1>
            <div className="flex items-center space-x-3">
              <Button 
                onClick={handleUpload}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span>Upload</span>
              </Button>
              <div className="relative">
                <select 
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-8"
                >
                  <option value="All Files">Filtered by</option>
                  <option value="PDF">PDF Files</option>
                  <option value="Images">Images</option>
                  <option value="Documents">Documents</option>
                  <option value="Recent">Recent</option>
                </select>
                <svg className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Recent Files Section */}
          <div className="flex items-center space-x-2 mb-4">
            <input 
              type="checkbox" 
              id="recent-files"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="recent-files" className="text-sm font-medium text-gray-900">
              Recent Files
            </label>
          </div>
        </div>

        {/* Files Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentFiles.map((file) => (
              <Card key={file.id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    {/* PDF Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">
                            {file.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {file.size}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1 mb-3">
                        <p className="text-xs text-gray-600">
                          Uploaded by {file.uploadedBy}
                        </p>
                        <p className="text-xs text-gray-500">
                          {file.uploadedTime}
                        </p>
                      </div>

                      {/* Download Button */}
                      <Button
                        onClick={() => handleDownload(file)}
                        size="sm"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs py-2"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-white border-t border-gray-200 mt-8">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-center space-x-8">
              {/* Activity Feed */}
              <div 
                className="flex flex-col items-center space-y-1 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => navigate('/dashboard')}
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Activity Feed</span>
              </div>

              {/* Chat */}
              <div 
                className="flex flex-col items-center space-y-1 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => navigate('/chat')}
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Chat</span>
              </div>

              {/* Files - Active */}
              <div className="flex flex-col items-center space-y-1 cursor-pointer">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <span className="text-xs text-yellow-600 font-medium">Files</span>
              </div>

              {/* Meetings */}
              <div className="flex flex-col items-center space-y-1 cursor-pointer hover:opacity-70 transition-opacity">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Meetings</span>
              </div>

              {/* Reminders */}
              <div className="flex flex-col items-center space-y-1 cursor-pointer hover:opacity-70 transition-opacity">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 1015 0z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Reminders</span>
              </div>

              {/* E - Forum */}
              <div className="flex flex-col items-center space-y-1 cursor-pointer hover:opacity-70 transition-opacity">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">E - Forum</span>
              </div>

              {/* AI2AIM STORE */}
              <div className="flex flex-col items-center space-y-1 cursor-pointer hover:opacity-70 transition-opacity">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">AI2AIM STORE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
