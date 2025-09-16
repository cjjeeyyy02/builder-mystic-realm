import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  CheckSquare,
  Save,
  X,
  GripVertical,
  Trash2,
  Link,
  Edit
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface ChecklistItem {
  id: string;
  name: string;
  description: string;
  type: "Free Text" | "File Upload" | "Checkbox" | "Date" | "Number" | "Dropdown" | "Multiple Choice";
  completed: boolean;
  required: boolean;
}

interface Checklist {
  id: string;
  title: string;
  description: string;
  jobConnected: string;
  items: ChecklistItem[];
  linkedJobs: string[];
}

export default function ChecklistBuilder() {
  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      id: "1",
      title: "Developer Onboarding Checklist",
      description: "Essential tasks for new developer onboarding",
      jobConnected: "Senior React Developer",
      linkedJobs: ["Senior React Developer", "Frontend Engineer", "Backend Developer"],
      items: [
        { id: "1", name: "Government ID", description: "Upload a copy of your government-issued ID", type: "File Upload", completed: false, required: true },
        { id: "2", name: "Educational Diploma", description: "Provide your highest educational qualification", type: "File Upload", completed: false, required: true },
        { id: "3", name: "Employment History", description: "Complete work history form", type: "Free Text", completed: false, required: true },
        { id: "4", name: "Medical Certificate", description: "Health clearance from physician", type: "File Upload", completed: false, required: true },
      ]
    },
    {
      id: "2",
      title: "Designer Onboarding Checklist",
      description: "Essential tasks for new designer onboarding",
      jobConnected: "UI Designer",
      linkedJobs: ["UI Designer", "UX Designer"],
      items: [
        { id: "1", name: "Portfolio Review", description: "Submit your design portfolio for review", type: "File Upload", completed: false, required: true },
        { id: "2", name: "Design Tools Setup", description: "Confirm access to design software", type: "Checkbox", completed: false, required: false },
        { id: "3", name: "Brand Guidelines", description: "Review and acknowledge brand standards", type: "Checkbox", completed: false, required: true },
        { id: "4", name: "First Design Task", description: "Complete assigned starter project", type: "Free Text", completed: false, required: false },
      ]
    }
  ]);

  const [selectedChecklist, setSelectedChecklist] = useState<Checklist | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newChecklist, setNewChecklist] = useState({
    title: "",
    description: "",
    jobConnected: ""
  });

  // Mock job data for dropdown
  const availableJobs = [
    { id: "1", title: "Senior React Developer" },
    { id: "2", title: "Frontend Engineer" },
    { id: "3", title: "Backend Developer" },
    { id: "4", title: "UI Designer" },
    { id: "5", title: "UX Designer" },
    { id: "6", title: "Product Manager" },
    { id: "7", title: "Data Scientist" },
    { id: "8", title: "DevOps Engineer" }
  ];

  const handleCreateChecklist = () => {
    if (newChecklist.title.trim()) {
      const checklist: Checklist = {
        id: Date.now().toString(),
        title: newChecklist.title,
        description: newChecklist.description,
        jobConnected: newChecklist.jobConnected,
        linkedJobs: newChecklist.jobConnected ? [newChecklist.jobConnected] : [],
        items: []
      };

      setChecklists([...checklists, checklist]);
      setSelectedChecklist(checklist);
      setNewChecklist({
        title: "",
        description: "",
        jobConnected: ""
      });
      setShowCreateForm(false);
    }
  };

  const handleSelectChecklist = (checklist: Checklist) => {
    setSelectedChecklist(checklist);
    setShowCreateForm(false);
  };

  const handleDeleteChecklist = (checklistId: string) => {
    setChecklists(checklists.filter(c => c.id !== checklistId));
    if (selectedChecklist?.id === checklistId) {
      setSelectedChecklist(null);
    }
  };

  return (
    <Layout>
      <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
        {/* Main Container */}
        <div className="flex-1 flex min-h-0">
          {/* Left Panel - Checklists */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            {/* Left Panel Header */}
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Checklists</h2>
              <p className="text-sm text-gray-500 mt-1">Manage your workflow templates</p>
            </div>
            
            {/* Checklist Items */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-3">
                {checklists.map((checklist) => (
                  <Card 
                    key={checklist.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md border ${
                      selectedChecklist?.id === checklist.id 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleSelectChecklist(checklist)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-gray-900 text-sm leading-tight">
                          {checklist.title}
                        </h3>
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {checklist.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <CheckSquare className="h-3 w-3" />
                            {checklist.items.length} items
                          </span>
                          <span className="flex items-center gap-1">
                            <Link className="h-3 w-3" />
                            {checklist.jobConnected || 'No job'}
                          </span>
                        </div>
                        
                        {/* Progress indicator */}
                        <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 transition-all duration-300"
                            style={{ 
                              width: `${checklist.items.length > 0 ? 
                                (checklist.items.filter(i => i.completed).length / checklist.items.length) * 100 : 0
                              }%` 
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Checklist Builder</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedChecklist ? `Editing: ${selectedChecklist.title}` : 'Create and manage your checklists'}
                </p>
              </div>
              <Button 
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Checklist
              </Button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {showCreateForm ? (
                <CreateChecklistForm 
                  newChecklist={newChecklist}
                  setNewChecklist={setNewChecklist}
                  onSave={handleCreateChecklist}
                  onCancel={() => setShowCreateForm(false)}
                />
              ) : selectedChecklist ? (
                <ChecklistEditor checklist={selectedChecklist} />
              ) : (
                <EmptyState onCreateClick={() => setShowCreateForm(true)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Create Checklist Form Component
function CreateChecklistForm({
  newChecklist,
  setNewChecklist,
  onSave,
  onCancel
}: {
  newChecklist: any;
  setNewChecklist: (checklist: any) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const availableJobs = [
    { id: "1", title: "Senior React Developer" },
    { id: "2", title: "Frontend Engineer" },
    { id: "3", title: "Backend Developer" },
    { id: "4", title: "UI Designer" },
    { id: "5", title: "UX Designer" },
    { id: "6", title: "Product Manager" },
    { id: "7", title: "Data Scientist" },
    { id: "8", title: "DevOps Engineer" }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-sm border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Create New Checklist</h3>
            <Button variant="ghost" size="sm" onClick={onCancel} className="text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <h4 className="text-md font-semibold text-gray-900 border-b pb-2">Checklist Details</h4>

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter checklist title"
                value={newChecklist.title}
                onChange={(e) => setNewChecklist({...newChecklist, title: e.target.value})}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the purpose of this checklist"
                value={newChecklist.description}
                onChange={(e) => setNewChecklist({...newChecklist, description: e.target.value})}
                rows={3}
                className="mt-1 resize-none"
              />
            </div>

            <div>
              <Label htmlFor="jobConnected">Job Connected</Label>
              <Select
                value={newChecklist.jobConnected}
                onValueChange={(value) => setNewChecklist({...newChecklist, jobConnected: value})}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a job to connect this checklist" />
                </SelectTrigger>
                <SelectContent>
                  {availableJobs.map((job) => (
                    <SelectItem key={job.id} value={job.title}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-gray-100 mt-6">
            <Button onClick={onSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Create Checklist
            </Button>
            <Button variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Checklist Editor Component
function ChecklistEditor({ checklist }: { checklist: Checklist }) {
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    type: "Free Text" as ChecklistItem["type"]
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedTitle, setEditedTitle] = useState(checklist.title);

  const handleAddItem = () => {
    if (newItem.name.trim()) {
      console.log("Adding new item:", newItem);
      // Here you would update the checklist items in the parent component
      setNewItem({
        name: "",
        description: "",
        type: "Free Text"
      });
    }
  };

  const handleDeleteItem = (itemId: string) => {
    console.log("Deleting item:", itemId);
  };

  const handleRemoveJob = (jobName: string) => {
    console.log("Removing job:", jobName);
  };

  const itemTypes = [
    "Free Text",
    "File Upload",
    "Checkbox",
    "Date",
    "Number",
    "Dropdown",
    "Multiple Choice"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <Card className="shadow-sm border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {isEditingName ? (
              <div className="flex items-center gap-3 flex-1">
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="text-xl font-semibold border-none p-0 focus:ring-0"
                  onBlur={() => setIsEditingName(false)}
                  onKeyPress={(e) => e.key === 'Enter' && setIsEditingName(false)}
                  autoFocus
                />
              </div>
            ) : (
              <h1 className="text-2xl font-semibold text-gray-900">{checklist.title}</h1>
            )}
            <Button 
              variant="ghost" 
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              onClick={() => setIsEditingName(true)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Name
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Checklist Items Card */}
      <Card className="shadow-sm border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Checklist Items</h2>
            <Badge variant="secondary" className="text-xs">
              {checklist.items.length} items
            </Badge>
          </div>
          
          <div className="space-y-3">
            {checklist.items.map((item) => (
              <Card
                key={item.id}
                className="border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <GripVertical className="h-4 w-4 text-gray-400 cursor-grab mt-1" />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <CheckSquare className="h-4 w-4 text-gray-400" />
                          <span className="flex-1 text-gray-900 font-medium">{item.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                          {item.required && (
                            <Badge variant="destructive" className="text-xs">
                              Required
                            </Badge>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-sm text-gray-600 ml-7">{item.description}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator className="my-4" />

          {/* Add New Item Form */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-900">Add New Checklist Item</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="itemName">Name</Label>
                <Input
                  id="itemName"
                  placeholder="Enter item name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="itemType">Type</Label>
                <Select
                  value={newItem.type}
                  onValueChange={(value) => setNewItem({...newItem, type: value as ChecklistItem["type"]})}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {itemTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="itemDescription">Description</Label>
              <Textarea
                id="itemDescription"
                placeholder="Enter item details and instructions"
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                rows={2}
                className="mt-1 resize-none"
              />
            </div>

            <Button
              onClick={handleAddItem}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!newItem.name.trim()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Linked Job Postings Card */}
      <Card className="shadow-sm border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Linked Job Postings</h2>
            <Badge variant="secondary" className="text-xs">
              {checklist.linkedJobs.length} jobs
            </Badge>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {checklist.linkedJobs.map((job, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="flex items-center gap-2 px-3 py-1 border-blue-200 text-blue-700 bg-blue-50"
                >
                  {job}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveJob(job)}
                    className="h-4 w-4 p-0 hover:bg-transparent text-blue-500 hover:text-blue-700"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            
            <div className="pt-2 border-t border-gray-100">
              <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                <Link className="h-4 w-4 mr-2" />
                Link to Job
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Empty State Component
function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
          <CheckSquare className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Checklist Selected</h3>
        <p className="text-gray-600 mb-6">
          Select a checklist from the left panel to edit it, or create a new one to get started.
        </p>
        <Button onClick={onCreateClick} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Checklist
        </Button>
      </div>
    </div>
  );
}
