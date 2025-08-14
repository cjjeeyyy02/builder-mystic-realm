import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FooterNavigation from "@/components/FooterNavigation";

export default function Files() {
  const navigate = useNavigate();
  const [filterBy, setFilterBy] = useState("All Files");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [footerCollapsed, setFooterCollapsed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [lastScrollY]);

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

  const categories = ["All Files"];

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
    <Card className="bg-white border border-gray-200 hover:border-blue-300 transition-all duration-200">
      <CardContent className="p-3">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 bg-gradient-to-br ${file.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {file.name}
            </h3>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-gray-500">
                {file.size} • {file.uploadedTime}
              </p>
              <Button
                onClick={() => handleDownload(file)}
                size="sm"
                variant="ghost"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs px-2 py-1 h-6"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Layout>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Files
              </h1>
              <p className="text-xs text-gray-600 mt-1">Manage and organize your files</p>

              {/* Search Bar */}
              <div className="mt-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search files..."
                    className="w-48 px-2 py-1.5 pl-6 text-xs bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <svg className="w-3 h-3 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center">
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


        </div>

        {/* Files Grid */}
        <div
          ref={scrollContainerRef}
          className="p-2 pb-footer"
          style={{ height: 'calc(100vh - 110px)', overflowY: 'auto' }}
        >
          <div className="mb-2">
            <p className="text-xs text-gray-600">{recentFiles.length} files</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {recentFiles.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>

        </div>

      </div>
      </Layout>

      {/* Footer Navigation */}
      <FooterNavigation collapsed={footerCollapsed} />
    </>
  );
}
