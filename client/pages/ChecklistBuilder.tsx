import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, 
  CheckCircle, 
  FileText, 
  Settings,
  Trash2,
  Edit,
  Save
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
}

export default function ChecklistBuilder() {
  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      id: "1",
      title: "Onboarding Checklist",
      description: "Essential tasks for new employee onboarding",
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
      items: [
        { id: "1", text: "Review candidate resume and application", completed: true },
        { id: "2", text: "Conduct initial phone screening", completed: false },
        { id: "3", text: "Schedule technical assessment", completed: false },
        { id: "4", text: "Coordinate final interview panel", completed: false },
      ]
    }
  ]);

  const [newChecklistTitle, setNewChecklistTitle] = useState("");
  const [newChecklistDescription, setNewChecklistDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateChecklist = () => {
    if (newChecklistTitle.trim()) {
      const newChecklist: Checklist = {
        id: Date.now().toString(),
        title: newChecklistTitle,
        description: newChecklistDescription,
        items: []
      };
      setChecklists([...checklists, newChecklist]);
      setNewChecklistTitle("");
      setNewChecklistDescription("");
      setIsCreating(false);
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
    }
  };

  const toggleItem = (checklistId: string, itemId: string) => {
    setChecklists(checklists.map(checklist =>
      checklist.id === checklistId
        ? {
            ...checklist,
            items: checklist.items.map(item =>
              item.id === itemId ? { ...item, completed: !item.completed } : item
            )
          }
        : checklist
    ));
  };

  const deleteChecklist = (checklistId: string) => {
    setChecklists(checklists.filter(checklist => checklist.id !== checklistId));
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">Checklist Builder</h1>
          <Button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Checklist
          </Button>
        </div>

        {/* Create New Checklist Form */}
        {isCreating && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Checklist title"
                value={newChecklistTitle}
                onChange={(e) => setNewChecklistTitle(e.target.value)}
              />
              <Textarea
                placeholder="Checklist description (optional)"
                value={newChecklistDescription}
                onChange={(e) => setNewChecklistDescription(e.target.value)}
                rows={3}
              />
              <div className="flex gap-2">
                <Button onClick={handleCreateChecklist}>
                  <Save className="h-4 w-4 mr-2" />
                  Create Checklist
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsCreating(false);
                    setNewChecklistTitle("");
                    setNewChecklistDescription("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Checklist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {checklists.map((checklist) => (
            <ChecklistCard
              key={checklist.id}
              checklist={checklist}
              onToggleItem={toggleItem}
              onAddItem={addItemToChecklist}
              onDelete={deleteChecklist}
            />
          ))}
        </div>

        {checklists.length === 0 && !isCreating && (
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Checklists Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first checklist to streamline your workflow and ensure nothing is missed.
                </p>
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Checklist
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}

interface ChecklistCardProps {
  checklist: Checklist;
  onToggleItem: (checklistId: string, itemId: string) => void;
  onAddItem: (checklistId: string, itemText: string) => void;
  onDelete: (checklistId: string) => void;
}

function ChecklistCard({ checklist, onToggleItem, onAddItem, onDelete }: ChecklistCardProps) {
  const [newItemText, setNewItemText] = useState("");
  const [isAddingItem, setIsAddingItem] = useState(false);

  const completedItems = checklist.items.filter(item => item.completed).length;
  const totalItems = checklist.items.length;
  const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  const handleAddItem = () => {
    if (newItemText.trim()) {
      onAddItem(checklist.id, newItemText);
      setNewItemText("");
      setIsAddingItem(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{checklist.title}</CardTitle>
            {checklist.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {checklist.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onDelete(checklist.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{completedItems}/{totalItems}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Checklist Items */}
        {checklist.items.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <Checkbox
              checked={item.completed}
              onCheckedChange={() => onToggleItem(checklist.id, item.id)}
            />
            <span 
              className={`flex-1 text-sm ${
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
          <div className="space-y-2">
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
            size="sm"
            onClick={() => setIsAddingItem(true)}
            className="w-full justify-start text-muted-foreground"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add item
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
