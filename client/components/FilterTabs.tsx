import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  { id: "hiring", label: "Hiring" },
  { id: "screening", label: "Screening" },
  { id: "interview", label: "Interview" },
  { id: "activation", label: "Activation" },
  { id: "hired", label: "Hired" },
];

export default function FilterTabs() {
  const [activeTab, setActiveTab] = useState("hiring");

  return (
    <div className="mb-8 space-y-6">
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-muted p-1 h-auto">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2.5 px-4"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search candidates..."
            className="pl-10"
          />
        </div>
        
        <Select defaultValue="application-stage">
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Application Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="application-stage">Application Stage</SelectItem>
            <SelectItem value="initial-review">Initial Review</SelectItem>
            <SelectItem value="phone-screen">Phone Screen</SelectItem>
            <SelectItem value="technical-interview">Technical Interview</SelectItem>
            <SelectItem value="final-round">Final Round</SelectItem>
          </SelectContent>
        </Select>
        
        <Button>
          Plug and Hire
        </Button>
      </div>
    </div>
  );
}
