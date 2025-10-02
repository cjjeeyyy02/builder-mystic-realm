import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  ArrowLeft,
  Upload,
  Download,
  Eye,
  Share,
  Trash2,
  MoreVertical,
  FileText,
  File,
  Image,
  Paperclip,
  Calendar,
  User,
  Building,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  FolderOpen,
  Plus,
  FileCheck,
  Shield,
  Grid3X3,
  List,
} from "lucide-react";

interface Document {
  id: string;
  title: string;
  type: string;
  category: string;
  fileSize: string;
  uploadDate: string;
  uploadedBy: string;
  employeeId?: string;
  employeeName?: string;
  department: string;
  status: "active" | "archived" | "pending_review";
  complianceRequired: boolean;
  expiryDate?: string;
  tags: string[];
  fileFormat: string;
  description?: string;
}

interface DocumentCenterProps {
  onBack: () => void;
}

const sampleDocuments: Document[] = [
  {
    id: "doc-001",
    title: "Employee Handbook 2024",
    type: "Policy Document",
    category: "HR Policies",
    fileSize: "2.4 MB",
    uploadDate: "2024-01-15",
    uploadedBy: "Amanda Foster",
    department: "Human Resources",
    status: "active",
    complianceRequired: true,
    expiryDate: "2024-12-31",
    tags: ["policy", "handbook", "guidelines"],
    fileFormat: "PDF",
    description: "Updated company handbook with new policies and procedures"
  },
  {
    id: "doc-002",
    title: "Sarah Mitchell - Employment Contract",
    type: "Employment Contract",
    category: "Employee Documents",
    fileSize: "856 KB",
    uploadDate: "2023-01-10",
    uploadedBy: "Michael Rodriguez",
    employeeId: "EMP001",
    employeeName: "Sarah Mitchell",
    department: "Engineering",
    status: "active",
    complianceRequired: true,
    tags: ["contract", "employment", "legal"],
    fileFormat: "PDF",
    description: "Signed employment contract and terms of service"
  },
  {
    id: "doc-003",
    title: "Q4 2023 Compliance Report",
    type: "Compliance Report",
    category: "Compliance",
    fileSize: "1.8 MB",
    uploadDate: "2023-12-28",
    uploadedBy: "Priya Patel",
    department: "Finance",
    status: "active",
    complianceRequired: true,
    expiryDate: "2024-03-31",
    tags: ["compliance", "quarterly", "report"],
    fileFormat: "XLSX",
    description: "Quarterly compliance assessment and findings"
  },
  {
    id: "doc-004",
    title: "Safety Training Certificate - Marcus Thompson",
    type: "Training Certificate",
    category: "Training Records",
    fileSize: "1.2 MB",
    uploadDate: "2023-11-20",
    uploadedBy: "Training System",
    employeeId: "EMP002",
    employeeName: "Marcus Thompson",
    department: "Engineering",
    status: "active",
    complianceRequired: true,
    expiryDate: "2025-11-20",
    tags: ["training", "safety", "certification"],
    fileFormat: "PDF",
    description: "Workplace safety training completion certificate"
  },
  {
    id: "doc-005",
    title: "Emergency Contact Information",
    type: "Emergency Contacts",
    category: "Employee Records",
    fileSize: "324 KB",
    uploadDate: "2023-09-15",
    uploadedBy: "Emily Chen",
    employeeId: "EMP003",
    employeeName: "Emily Chen",
    department: "Design",
    status: "active",
    complianceRequired: false,
    tags: ["emergency", "contact", "personal"],
    fileFormat: "DOCX",
    description: "Updated emergency contact details and medical information"
  },
  {
    id: "doc-006",
    title: "Performance Review Template 2024",
    type: "Template",
    category: "HR Templates",
    fileSize: "445 KB",
    uploadDate: "2024-01-08",
    uploadedBy: "Amanda Foster",
    department: "Human Resources",
    status: "active",
    complianceRequired: false,
    tags: ["template", "performance", "review"],
    fileFormat: "DOCX",
    description: "Standardized performance review template for 2024"
  },
  {
    id: "doc-007",
    title: "Data Privacy Policy Update",
    type: "Policy Document",
    category: "Compliance",
    fileSize: "1.1 MB",
    uploadDate: "2023-08-22",
    uploadedBy: "Legal Department",
    department: "Legal",
    status: "pending_review",
    complianceRequired: true,
    expiryDate: "2024-08-22",
    tags: ["privacy", "policy", "legal", "gdpr"],
    fileFormat: "PDF",
    description: "Updated data privacy policy in compliance with GDPR"
  },
  {
    id: "doc-008",
    title: "Financial Audit Report 2023",
    type: "Audit Report",
    category: "Finance",
    fileSize: "3.2 MB",
    uploadDate: "2023-12-15",
    uploadedBy: "External Auditor",
    department: "Finance",
    status: "archived",
    complianceRequired: true,
    tags: ["audit", "financial", "2023"],
    fileFormat: "PDF",
    description: "Annual financial audit report and recommendations"
  }
];

const documentCategories = [
  "HR Policies",
  "Employee Documents", 
  "Compliance",
  "Training Records",
  "Employee Records",
  "HR Templates",
  "Finance",
  "Legal"
];

const documentTypes = [
  "Policy Document",
  "Employment Contract",
  "Compliance Report",
  "Training Certificate",
  "Emergency Contacts",
  "Template",
  "Audit Report"
];

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function DocumentCenter({ onBack }: DocumentCenterProps) {
  const [documents] = useState(sampleDocuments);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [complianceFilter, setComplianceFilter] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  // Filter documents
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter;
    const matchesType = typeFilter === "all" || doc.type === typeFilter;
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    const matchesCompliance = complianceFilter === "all" || 
      (complianceFilter === "required" && doc.complianceRequired) ||
      (complianceFilter === "not_required" && !doc.complianceRequired);

    return matchesSearch && matchesCategory && matchesType && matchesStatus && matchesCompliance;
  });

  // Get file icon
  const getFileIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case "pdf":
        return <FileText className="w-4 h-4 text-red-500" />;
      case "docx":
      case "doc":
        return <File className="w-4 h-4 text-blue-500" />;
      case "xlsx":
      case "xls":
        return <File className="w-4 h-4 text-green-500" />;
      case "jpg":
      case "jpeg":
      case "png":
        return <Image className="w-4 h-4 text-purple-500" />;
      default:
        return <Paperclip className="w-4 h-4 text-gray-500" />;
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200";
      case "archived":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "pending_review":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-3 h-3" />;
      case "archived":
        return <Clock className="w-3 h-3" />;
      case "pending_review":
        return <AlertCircle className="w-3 h-3" />;
      default:
        return <FileText className="w-3 h-3" />;
    }
  };

  // Check if document is expiring soon
  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const now = new Date();
    const daysDiff = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 3600 * 24));
    return daysDiff <= 30 && daysDiff > 0;
  };

  const handleDocumentAction = (action: string, docId: string) => {
    console.log(`${action} action for document:`, docId);
  };

  const renderDocumentCard = (doc: Document) => {
    const isExpiring = isExpiringSoon(doc.expiryDate);
    
    return (
      <Card key={doc.id} className="border border-border hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            {/* Document Info */}
            <div className="flex items-start gap-4 flex-1">
              {/* File Icon */}
              <div className="flex-shrink-0 mt-1">
                {getFileIcon(doc.fileFormat)}
              </div>

              {/* Document Details */}
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {doc.description}
                  </p>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Department:</span>
                    <span className="font-medium">{doc.department}</span>
                  </div>
                  {doc.employeeName && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Employee:</span>
                      <span className="font-medium">{doc.employeeName}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Uploaded:</span>
                    <span className="font-medium">{new Date(doc.uploadDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className={getStatusColor(doc.status)}>
                    {getStatusIcon(doc.status)}
                    <span className="ml-1 capitalize">{doc.status.replace('_', ' ')}</span>
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {doc.type}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {doc.fileFormat} • {doc.fileSize}
                  </Badge>
                  {doc.complianceRequired && (
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      <Shield className="w-3 h-3 mr-1" />
                      Compliance Required
                    </Badge>
                  )}
                  {isExpiring && (
                    <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Expires Soon
                    </Badge>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {doc.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDocumentAction("view", doc.id)}
              >
                <Eye className="w-3 h-3 mr-1" />
                View
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDocumentAction("download", doc.id)}
              >
                <Download className="w-3 h-3 mr-1" />
                Download
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleDocumentAction("share", doc.id)}>
                    <Share className="w-3 h-3 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDocumentAction("edit", doc.id)}>
                    <FileText className="w-3 h-3 mr-2" />
                    Edit Details
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleDocumentAction("delete", doc.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-3 h-3 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack} className="w-10 h-10 p-0">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-semibold text-foreground">
            Document Center
          </h1>
        </div>
        <Button 
          className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white"
          onClick={() => setShowUploadModal(true)}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {documents.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Documents</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {documents.filter(d => d.status === "active").length}
                </div>
                <div className="text-sm text-muted-foreground">Active Documents</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {documents.filter(d => d.complianceRequired).length}
                </div>
                <div className="text-sm text-muted-foreground">Compliance Required</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {documents.filter(d => isExpiringSoon(d.expiryDate)).length}
                </div>
                <div className="text-sm text-muted-foreground">Expiring Soon</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by document title, employee name, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {documentCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Document Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {documentTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                  <SelectItem value="pending_review">Pending Review</SelectItem>
                </SelectContent>
              </Select>

              <Select value={complianceFilter} onValueChange={setComplianceFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Compliance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Documents</SelectItem>
                  <SelectItem value="required">Compliance Required</SelectItem>
                  <SelectItem value="not_required">No Compliance Required</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {filteredDocuments.length} documents found
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "table" ? "default" : "ghost"}
            className="h-8 px-3 text-xs"
            onClick={() => setViewMode("table")}
          >
            <List className="w-4 h-4 mr-1" /> Table view
          </Button>
          <Button
            variant={viewMode === "card" ? "default" : "ghost"}
            className="h-8 px-3 text-xs"
            onClick={() => setViewMode("card")}
          >
            <Grid3X3 className="w-4 h-4 mr-1" /> Card view
          </Button>
        </div>
      </div>

      {/* Documents */}
      {viewMode === "table" ? (
        <div className="w-full max-w-full bg-white border rounded-md shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-sm font-semibold text-gray-600">Title</TableHead>
                <TableHead className="text-sm font-semibold text-gray-600">Type</TableHead>
                <TableHead className="text-sm font-semibold text-gray-600">Category</TableHead>
                <TableHead className="text-sm font-semibold text-gray-600">Department</TableHead>
                <TableHead className="text-sm font-semibold text-gray-600">Uploaded</TableHead>
                <TableHead className="text-sm font-semibold text-gray-600">File Size</TableHead>
                <TableHead className="text-sm font-semibold text-gray-600">Status</TableHead>
                <TableHead className="text-right text-sm font-semibold text-gray-600">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-blue-50/60 transition-colors duration-200">
                  <TableCell className="px-3 py-2">
                    <div className="text-xs text-gray-900 font-medium">{doc.title}</div>
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <div className="text-xs text-gray-900">{doc.type}</div>
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <div className="text-xs text-gray-900">{doc.category}</div>
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <div className="text-xs text-gray-900">{doc.department}</div>
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <div className="text-xs text-gray-900">{new Date(doc.uploadDate).toLocaleDateString()}</div>
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <div className="text-xs text-gray-900">{doc.fileSize}</div>
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <Badge variant="outline" className={`text-xs ${getStatusColor(doc.status)}`}>
                      {getStatusIcon(doc.status)}
                      <span className="ml-1 capitalize">{doc.status.replace('_',' ')}</span>
                    </Badge>
                  </TableCell>
                  <TableCell className="px-3 py-2 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                            <MoreVertical className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDocumentAction("view", doc.id)}>
                            <Eye className="w-3 h-3 mr-2" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDocumentAction("download", doc.id)}>
                            <Download className="w-3 h-3 mr-2" /> Download
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDocumentAction("share", doc.id)}>
                            <Share className="w-3 h-3 mr-2" /> Share
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDocumentAction("edit", doc.id)}>
                            <FileText className="w-3 h-3 mr-2" /> Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDocumentAction("delete", doc.id)} className="text-red-600">
                            <Trash2 className="w-3 h-3 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDocuments.map(renderDocumentCard)}
        </div>
      )}

      {/* No Results */}
      {filteredDocuments.length === 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-12 text-center">
            <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No documents found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </CardContent>
        </Card>
      )}

      {/* Upload Document Modal */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Document Title <span className="text-red-500">*</span>
                </label>
                <Input placeholder="Enter document title" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Document Type <span className="text-red-500">*</span>
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentCategories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <Textarea placeholder="Enter document description" rows={3} />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                File Upload <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOCX, XLSX, JPG, PNG files up to 10MB
                </p>
                <Input type="file" className="hidden" />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="complianceRequired" className="rounded" />
              <label htmlFor="complianceRequired" className="text-sm font-medium">
                This document requires compliance tracking
              </label>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button className="bg-[#0065F8] hover:bg-[#0065F8]/90 text-white">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
