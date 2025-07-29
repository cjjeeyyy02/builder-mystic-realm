import { useState } from "react";
import { Search, ChevronDown, Filter, Download } from "lucide-react";

const tabs = [
  { id: "hiring", label: "Hiring", count: 1000 },
  { id: "screening", label: "Screening", count: 500 },
  { id: "interview", label: "Interview", count: 300 },
  { id: "activation", label: "Activation", count: 200 },
  { id: "hired", label: "Hired", count: 100 },
];

export default function FilterTabs() {
  const [activeTab, setActiveTab] = useState("hiring");

  return (
    <div className="mb-8">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 bg-card p-2 rounded-xl border border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-card-foreground hover:bg-accent"
            }`}
          >
            {tab.label}
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              activeTab === tab.id
                ? "bg-primary-foreground/20 text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search candidates..."
              className="w-full sm:w-80 pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          <div className="relative">
            <select className="appearance-none bg-card border border-border rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors">
              <option>Application Stage</option>
              <option>Initial Review</option>
              <option>Phone Screen</option>
              <option>Technical Interview</option>
              <option>Final Round</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-border bg-card hover:bg-accent rounded-lg text-sm font-medium transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>

          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
