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

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Main Content */}
        <div className="flex h-screen">
          {/* Left Panel - Checklists */}
          <div className="w-64 bg-white border-r border-gray-200">
            <div className="p-4">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Checklists</h2>
              
              <div className="space-y-2">
                {checklists.map((checklist) => (
                  <div
                    key={checklist.id}
                    className={`p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedChecklist?.id === checklist.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                    onClick={() => handleSelectChecklist(checklist)}
                  >
                    <h3 className="font-medium text-gray-900 mb-1 text-sm">
                      {checklist.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{checklist.items.length} items</span>
                      <span>{checklist.jobCount} jobs</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Checklist Builder</h1>
              </div>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Create Checklist
              </Button>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex items-center justify-center p-4">
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
    <Card className="w-full max-w-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold">Create New Checklist</h3>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Checklist Title
            </label>
            <Input
              placeholder="Enter checklist title"
              value={newChecklist.title}
              onChange={(e) => setNewChecklist({...newChecklist, title: e.target.value})}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Description
            </label>
            <Textarea
              placeholder="Describe the purpose of this checklist"
              value={newChecklist.description}
              onChange={(e) => setNewChecklist({...newChecklist, description: e.target.value})}
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Job Count
            </label>
            <Input
              type="number"
              min="1"
              placeholder="Number of jobs"
              value={newChecklist.jobCount}
              onChange={(e) => setNewChecklist({...newChecklist, jobCount: parseInt(e.target.value) || 1})}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={onSave} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Create
            </Button>
            <Button variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Checklist Editor Component
function ChecklistEditor({ checklist }: { checklist: Checklist }) {
  const [newItemText, setNewItemText] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedTitle, setEditedTitle] = useState(checklist.title);

  const handleAddItem = () => {
    if (newItemText.trim()) {
      // In a real app, this would update the checklist
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
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {isEditingName ? (
            <div className="flex items-center gap-2">
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="text-xl font-semibold"
                onBlur={() => setIsEditingName(false)}
                onKeyPress={(e) => e.key === 'Enter' && setIsEditingName(false)}
                autoFocus
              />
            </div>
          ) : (
            <h1 className="text-xl font-semibold text-gray-900">{checklist.title}</h1>
          )}
          <Button
            variant="ghost"
            className="text-blue-600 hover:text-blue-700"
            onClick={() => setIsEditingName(true)}
          >
            Edit Name
          </Button>
        </div>

        {/* Checklist Items */}
        <div className="mb-8">
          <h2 className="text-gray-600 text-sm font-medium mb-4">Checklist Items</h2>
          <div className="space-y-3">
            {checklist.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                <span className="flex-1 text-gray-900">{item.text}</span>
                {item.required && (
                  <Badge variant="destructive" className="text-xs">
                    Required
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Add New Item */}
          <div className="flex gap-2 mt-4">
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
              Add
            </Button>
          </div>
        </div>

        {/* Linked Job Postings */}
        <div>
          <h2 className="text-gray-600 text-sm font-medium mb-4">Linked Job Postings</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {checklist.linkedJobs.map((job, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
              >
                {job}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveJob(job)}
                  className="h-4 w-4 p-0 hover:bg-transparent"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            <Link className="h-4 w-4 mr-2" />
            Link to Job
          </Button>
        </div>
      </div>
    </div>
  );
}

// Empty State Component
function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <CheckSquare className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Checklist Selected</h3>
        <p className="text-gray-600 mb-4 text-sm">
          Select a checklist from the list or create a new one
        </p>
        <Button onClick={onCreateClick} className="bg-blue-600 hover:bg-blue-700 text-white text-sm" size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Create Checklist
        </Button>
      </div>
    </div>
  );
}
