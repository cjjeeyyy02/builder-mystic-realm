import { useState } from "react";
import { Search, ChevronDown, Download, Globe, Linkedin, MapPin, CheckCircle, AlertCircle, Loader2, Users, FileText, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import ScreeningView from "./ScreeningView";
import InterviewView from "./InterviewView";
import ActivationView from "./ActivationView";
import HiredView from "./HiredView";
import CandidateList from "./CandidateList";

const tabs = [
  { id: "hiring", label: "Hiring" },
  { id: "screening", label: "Screening" },
  { id: "interview", label: "Interview" },
  { id: "activation", label: "Activation" },
  { id: "hired", label: "Hired" },
];

export default function FilterTabs() {
  const [activeTab, setActiveTab] = useState("hiring");
  const [selectedStage, setSelectedStage] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPlugAndHireModal, setShowPlugAndHireModal] = useState(false);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncResults, setSyncResults] = useState<any>(null);

  return (
    <div className="space-y-6">
      {/* Button Tabs */}
      <div className="w-full">
        <div className="items-center justify-center rounded-md text-muted-foreground grid w-full grid-cols-5 bg-muted p-1 h-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant="ghost"
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-2.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 py-2.5 px-4 ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Search and Filter Controls - Only show for hiring and screening */}
      {(activeTab === "hiring" || activeTab === "screening") && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search candidates..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={selectedStage} onValueChange={setSelectedStage}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Application Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="screening">Screening</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="activation">Activation</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
            </SelectContent>
          </Select>

          <Button>Plug and Hire</Button>
        </div>
      )}

      {/* Conditional Content Based on Active Tab */}
      <div>
        {activeTab === "screening" && <ScreeningView searchQuery={searchQuery} selectedStage={selectedStage} />}
        {activeTab === "interview" && <InterviewView searchQuery={searchQuery} selectedStage={selectedStage} />}
        {activeTab === "activation" && <ActivationView searchQuery={searchQuery} selectedStage={selectedStage} />}
        {activeTab === "hired" && <HiredView searchQuery={searchQuery} selectedStage={selectedStage} />}
        {activeTab === "hiring" && <CandidateList searchQuery={searchQuery} selectedStage={selectedStage} />}
      </div>
    </div>
  );
}
