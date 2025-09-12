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

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  required: boolean;
}

interface Checklist {
  id: string;
  title: string;
  description: string;
  items: ChecklistItem[];
  jobCount: number;
  linkedJobs: string[];
}

export default function ChecklistBuilder() {
  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      id: "1",
      title: "Developer Onboarding Checklist",
      description: "Essential tasks for new developer onboarding",
      jobCount: 3,
      linkedJobs: ["Senior React Developer", "Frontend Engineer", "Backend Developer"],
      items: [
        { id: "1", text: "Government ID", completed: false, required: true },
        { id: "2", text: "Diploma", completed: false, required: true },
        { id: "3", text: "Employment History", completed: false, required: true },
        { id: "4", text: "Medical Certificate", completed: false, required: true },
      ]
    },
    {
      id: "2", 
      title: "Designer Onboarding Checklist",
      description: "Essential tasks for new designer onboarding",
      jobCount: 3,
      linkedJobs: ["UI Designer", "UX Designer"],
      items: [
        { id: "1", text: "Portfolio Review", completed: false, required: true },
        { id: "2", text: "Design Tools Setup", completed: false, required: false },
        { id: "3", text: "Brand Guidelines", completed: false, required: true },
        { id: "4", text: "First Design Task", completed: false, required: false },
      ]
    }
  ]);

  const [selectedChecklist, setSelectedChecklist] = useState<Checklist | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newChecklist, setNewChecklist] = useState({
    title: "",
    description: "",
    jobCount: 1
  });

  const handleCreateChecklist = () => {
    if (newChecklist.title.trim()) {
      const checklist: Checklist = {
        id: Date.now().toString(),
        title: newChecklist.title,
        description: newChecklist.description,
        jobCount: newChecklist.jobCount,
        linkedJobs: [],
        items: []
      };
      
      setChecklists([...checklists, checklist]);
      setSelectedChecklist(checklist);
      setNewChecklist({
        title: "",
        description: "",
        jobCount: 1
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
                            {checklist.jobCount} jobs
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
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Checklist Title
              </label>
              <Input
                placeholder="Enter checklist title"
                value={newChecklist.title}
                onChange={(e) => setNewChecklist({...newChecklist, title: e.target.value})}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Textarea
                placeholder="Describe the purpose of this checklist"
                value={newChecklist.description}
                onChange={(e) => setNewChecklist({...newChecklist, description: e.target.value})}
                rows={3}
                className="w-full resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Count
              </label>
              <Input
                type="number"
                min="1"
                placeholder="Number of jobs"
                value={newChecklist.jobCount}
                onChange={(e) => setNewChecklist({...newChecklist, jobCount: parseInt(e.target.value) || 1})}
                className="w-full"
              />
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
  const [newItemText, setNewItemText] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedTitle, setEditedTitle] = useState(checklist.title);

  const handleAddItem = () => {
    if (newItemText.trim()) {
      console.log("Adding new item:", newItemText);
      setNewItemText("");
    }
  };

  const handleDeleteItem = (itemId: string) => {
    console.log("Deleting item:", itemId);
  };

  const handleRemoveJob = (jobName: string) => {
    console.log("Removing job:", jobName);
  };

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
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                    <CheckSquare className="h-4 w-4 text-gray-400" />
                    <span className="flex-1 text-gray-900 font-medium">{item.text}</span>
                    {item.required && (
                      <Badge variant="destructive" className="text-xs">
                        Required
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add New Item */}
          <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
            <Input
              placeholder="Add new item..."
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
              className="flex-1"
            />
            <Button
              onClick={handleAddItem}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add
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
