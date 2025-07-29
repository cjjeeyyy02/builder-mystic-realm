import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

const tabs = [
  { id: "hiring", label: "Hiring", active: true },
  { id: "screening", label: "Screening", active: false },
  { id: "interview", label: "Interview", active: false },
  { id: "activation", label: "Activation", active: false },
  { id: "hired", label: "Hired", active: false },
];

export default function FilterTabs() {
  const [activeTab, setActiveTab] = useState("hiring");

  return (
    <div className="mb-6">
      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-7 py-2 rounded text-base font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-white border border-primary text-primary hover:bg-primary/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search and Filter Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-primary rounded-full text-sm bg-white"
            />
          </div>
          
          <div className="relative">
            <select className="appearance-none bg-white border border-primary rounded px-4 py-2 pr-8 text-sm">
              <option>Application Stage</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
          
          <button className="px-4 py-2 border border-primary rounded text-sm bg-white hover:bg-gray-50">
            Plug and Hire
          </button>
        </div>
      </div>
    </div>
  );
}
