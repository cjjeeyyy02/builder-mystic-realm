import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  CheckCircle, 
  FileText, 
  Settings,
  Trash2,
  Edit,
  Save,
  MoreVertical,
  Calendar,
  Users
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface Checklist {
  id: string;
  title: string;
  description: string;
  items: ChecklistItem[];
  jobRole?: string;
  department?: string;
  createdAt: string;
}

export default function ChecklistBuilder() {
  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      id: "1",
      title: "Onboarding Checklist",
      description: "Essential tasks for new employee onboarding",
      jobRole: "All Roles",
      department: "HR",
      createdAt: "2024-01-15",
      items: [
        { id: "1", text: "Send welcome email with company handbook", completed: true },
        { id: "2", text: "Set up workspace and equipment", completed: false },
        { id: "3", text: "Schedule IT setup and account creation", completed: false },
        { id: "4", text: "Arrange buddy/mentor assignment", completed: false },
      ]
    },
    {
      id: "2", 
      title: "Interview Process Checklist",
      description: "Steps to ensure thorough candidate evaluation",
      jobRole: "Engineering",
      department: "Engineering",
      createdAt: "2024-01-10",
      items: [
        { id: "1", text: "Review candidate resume and application", completed: true },
        { id: "2", text: "Conduct initial phone screening", completed: false },
        { id: "3", text: "Schedule technical assessment", completed: false },
        { id: "4", text: "Coordinate final interview panel", completed: false },
      ]
    },
    {
      id: "3",
      title: "Manager Offboarding",
      description: "Checklist for manager role transitions",
      jobRole: "Manager",
      department: "Management",
      createdAt: "2024-01-08", 
      items: [
        { id: "1", text: "Transfer team responsibilities", completed: false },
        { id: "2", text: "Complete handover documentation", completed: false },
        { id: "3", text: "Return company assets", completed: false },
      ]
    }
  ]);

  const [selectedChecklist, setSelectedChecklist] = useState<Checklist | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newChecklist, setNewChecklist] = useState({
    title: "",
    description: "",
    jobRole: "",
    department: ""
  });

  const handleCreateChecklist = () => {
    if (newChecklist.title.trim()) {
      const checklist: Checklist = {
        id: Date.now().toString(),
        title: newChecklist.title,
        description: newChecklist.description,
        jobRole: newChecklist.jobRole,
        department: newChecklist.department,
        createdAt: new Date().toISOString().split('T')[0],
        items: []
      };
      
      setChecklists([...checklists, checklist]);
      setSelectedChecklist(checklist);
      setNewChecklist({
        title: "",
        description: "",
        jobRole: "",
        department: ""
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

  const addItemToChecklist = (checklistId: string, itemText: string) => {
    if (itemText.trim()) {
      setChecklists(checklists.map(checklist => 
        checklist.id === checklistId 
          ? {
              ...checklist,
              items: [...checklist.items, {
                id: Date.now().toString(),
                text: itemText,
                completed: false
              }]
            }
          : checklist
      ));
      
      // Update selected checklist if it's the one being modified
      if (selectedChecklist?.id === checklistId) {
        setSelectedChecklist(prev => prev ? {
          ...prev,
          items: [...prev.items, {
            id: Date.now().toString(),
            text: itemText,
            completed: false
          }]
        } : null);
      }
    }
  };

  const toggleItem = (checklistId: string, itemId: string) => {
    const updatedChecklists = checklists.map(checklist =>
      checklist.id === checklistId
        ? {
            ...checklist,
            items: checklist.items.map(item =>
              item.id === itemId ? { ...item, completed: !item.completed } : item
            )
          }
        : checklist
    );
    
    setChecklists(updatedChecklists);
    
    // Update selected checklist if it's the one being modified
    if (selectedChecklist?.id === checklistId) {
      setSelectedChecklist(updatedChecklists.find(c => c.id === checklistId) || null);
    }
  };

  const getCompletionStats = (checklist: Checklist) => {
    const completed = checklist.items.filter(item => item.completed).length;
    const total = checklist.items.length;
    return { completed, total };
  };

  return (
    <Layout>
      <div className="flex h-screen bg-gray-50">
        {/* Left Panel - Checklists */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Checklists</h2>
            <p className="text-sm text-gray-600">Manage your workflow checklists</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {checklists.map((checklist) => {
              const stats = getCompletionStats(checklist);
              const isSelected = selectedChecklist?.id === checklist.id;
              
              return (
                <Card 
                  key={checklist.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => handleSelectChecklist(checklist)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm text-gray-900 line-clamp-1">
                        {checklist.title}
                      </h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-3 w-3" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteChecklist(checklist.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-3 w-3" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {checklist.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium">{stats.completed}/{stats.total}</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: stats.total > 0 ? `${(stats.completed / stats.total) * 100}%` : '0%' 
                          }}
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {checklist.jobRole && (
                          <Badge variant="outline" className="text-xs">
                            {checklist.jobRole}
                          </Badge>
                        )}
                        {checklist.department && (
                          <Badge variant="secondary" className="text-xs">
                            {checklist.department}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Right Panel - Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Checklist Builder</h1>
              <p className="text-sm text-gray-600">
                {selectedChecklist ? `Editing: ${selectedChecklist.title}` : 'Select a checklist to edit or create a new one'}
              </p>
            </div>
            <Button 
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Checklist
            </Button>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            {showCreateForm ? (
              <CreateChecklistForm 
                newChecklist={newChecklist}
                setNewChecklist={setNewChecklist}
                onSave={handleCreateChecklist}
                onCancel={() => setShowCreateForm(false)}
              />
            ) : selectedChecklist ? (
              <ChecklistEditor 
                checklist={selectedChecklist}
                onAddItem={addItemToChecklist}
                onToggleItem={toggleItem}
              />
            ) : (
              <EmptyState onCreateClick={() => setShowCreateForm(true)} />
            )}
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
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New Checklist
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Checklist Title</label>
          <Input
            placeholder="Enter checklist title"
            value={newChecklist.title}
            onChange={(e) => setNewChecklist({...newChecklist, title: e.target.value})}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea
            placeholder="Describe the purpose of this checklist"
            value={newChecklist.description}
            onChange={(e) => setNewChecklist({...newChecklist, description: e.target.value})}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Job Role</label>
            <Input
              placeholder="e.g., Software Engineer"
              value={newChecklist.jobRole}
              onChange={(e) => setNewChecklist({...newChecklist, jobRole: e.target.value})}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Department</label>
            <Input
              placeholder="e.g., Engineering"
              value={newChecklist.department}
              onChange={(e) => setNewChecklist({...newChecklist, department: e.target.value})}
            />
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={onSave}>
            <Save className="h-4 w-4 mr-2" />
            Create Checklist
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Checklist Editor Component
function ChecklistEditor({ 
  checklist, 
  onAddItem, 
  onToggleItem 
}: {
  checklist: Checklist;
  onAddItem: (checklistId: string, itemText: string) => void;
  onToggleItem: (checklistId: string, itemId: string) => void;
}) {
  const [newItemText, setNewItemText] = useState("");
  const [isAddingItem, setIsAddingItem] = useState(false);

  const handleAddItem = () => {
    if (newItemText.trim()) {
      onAddItem(checklist.id, newItemText);
      setNewItemText("");
      setIsAddingItem(false);
    }
  };

  const stats = {
    completed: checklist.items.filter(item => item.completed).length,
    total: checklist.items.length
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Checklist Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{checklist.title}</CardTitle>
              <p className="text-muted-foreground mt-1">{checklist.description}</p>
            </div>
            <div className="flex items-center gap-2">
              {checklist.jobRole && (
                <Badge variant="outline">{checklist.jobRole}</Badge>
              )}
              {checklist.department && (
                <Badge variant="secondary">{checklist.department}</Badge>
              )}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2 mt-4">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{stats.completed}/{stats.total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: stats.total > 0 ? `${(stats.completed / stats.total) * 100}%` : '0%' 
                }}
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Checklist Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Checklist Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {checklist.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
              <Checkbox
                checked={item.completed}
                onCheckedChange={() => onToggleItem(checklist.id, item.id)}
              />
              <span 
                className={`flex-1 ${
                  item.completed ? 'line-through text-muted-foreground' : ''
                }`}
              >
                {item.text}
              </span>
              {item.completed && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
            </div>
          ))}

          {/* Add New Item */}
          {isAddingItem ? (
            <div className="space-y-2 p-3 border-2 border-dashed border-gray-300 rounded-lg">
              <Input
                placeholder="Enter new checklist item"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                autoFocus
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddItem}>
                  Add Item
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => {
                    setIsAddingItem(false);
                    setNewItemText("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="ghost"
              onClick={() => setIsAddingItem(true)}
              className="w-full justify-start text-muted-foreground border-2 border-dashed"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add new item
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Empty State Component
function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
          <FileText className="h-8 w-8 text-gray-400" />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Checklist Selected</h3>
          <p className="text-gray-600">
            Select a checklist from the left panel to edit it, or create a new one to get started.
          </p>
        </div>
        
        <Button onClick={onCreateClick} size="lg" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Create Checklist
        </Button>
      </div>
    </div>
  );
}
