import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  CheckSquare,
  Save,
  X
} from "lucide-react";

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
  jobCount: number;
}

export default function ChecklistBuilder() {
  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      id: "1",
      title: "Developer Onboarding Checklist",
      description: "Essential tasks for new developer onboarding",
      jobCount: 3,
      items: [
        { id: "1", text: "Set up development environment", completed: true },
        { id: "2", text: "Complete security training", completed: false },
        { id: "3", text: "Review coding standards", completed: false },
        { id: "4", text: "Meet with team lead", completed: false },
      ]
    },
    {
      id: "2", 
      title: "Designer Onboarding Checklist",
      description: "Essential tasks for new designer onboarding",
      jobCount: 3,
      items: [
        { id: "1", text: "Access design tools", completed: true },
        { id: "2", text: "Review brand guidelines", completed: false },
        { id: "3", text: "Meet with design team", completed: false },
        { id: "4", text: "Complete first design task", completed: false },
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
  return (
    <div className="w-full max-w-2xl">
      <Card>
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {checklist.title}
            </h2>
            <p className="text-gray-600">{checklist.description}</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
              <span>{checklist.items.length} items</span>
              <span>{checklist.jobCount} jobs</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Checklist Items</h3>
            {checklist.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                <CheckSquare className={`h-4 w-4 ${item.completed ? 'text-green-600' : 'text-gray-400'}`} />
                <span className={item.completed ? 'line-through text-gray-500' : 'text-gray-900'}>
                  {item.text}
                </span>
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add new item
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Empty State Component
function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <CheckSquare className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Checklist Selected</h3>
        <p className="text-gray-600 mb-6">
          Select a checklist from the list or create a new one
        </p>
        <Button onClick={onCreateClick} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Checklist
        </Button>
      </div>
    </div>
  );
}
