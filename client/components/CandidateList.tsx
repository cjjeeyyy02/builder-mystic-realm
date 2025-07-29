import { Mail, Phone, ExternalLink, Send } from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  totalExperience: string;
  relevantExperience: string;
  status: "approved" | "pending";
}

const candidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    position: "Software Engineer",
    email: "sarahjohnson@gmail.com",
    phone: "123-456-789",
    totalExperience: "6 years",
    relevantExperience: "6 years",
    status: "approved",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    position: "Software Engineer",
    email: "sarahjohnson@gmail.com",
    phone: "123-456-789",
    totalExperience: "6 years",
    relevantExperience: "6 years",
    status: "approved",
  },
  {
    id: "3",
    name: "Sarah Johnson",
    position: "Software Engineer",
    email: "sarahjohnson@gmail.com",
    phone: "123-456-789",
    totalExperience: "6 years",
    relevantExperience: "6 years",
    status: "approved",
  },
  {
    id: "4",
    name: "Sarah Johnson",
    position: "Software Engineer",
    email: "sarahjohnson@gmail.com",
    phone: "123-456-789",
    totalExperience: "6 years",
    relevantExperience: "6 years",
    status: "approved",
  },
  {
    id: "5",
    name: "Sarah Johnson",
    position: "Software Engineer",
    email: "sarahjohnson@gmail.com",
    phone: "123-456-789",
    totalExperience: "6 years",
    relevantExperience: "6 years",
    status: "approved",
  },
];

export default function CandidateList() {
  return (
    <div className="border border-border rounded-lg bg-white overflow-hidden">
      {candidates.map((candidate, index) => (
        <div
          key={candidate.id}
          className={`p-4 lg:p-6 bg-muted ${
            index !== candidates.length - 1 ? "border-b border-border" : ""
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Left Section - Avatar and Info */}
            <div className="flex items-start lg:items-center gap-3 lg:gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-300 rounded-full"></div>
              </div>

              <div className="space-y-1 min-w-0">
                <h3 className="text-lg lg:text-xl font-semibold">{candidate.name}</h3>
                <p className="text-sm">{candidate.position}</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs">
                  <span>Total Experience: {candidate.totalExperience}</span>
                  <span>Relevant Experience: {candidate.relevantExperience}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>{candidate.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Status and Actions */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
              {/* Status Badges */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs">
                  Approved
                </span>
                <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs flex items-center gap-1">
                  View Resume
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button className="px-3 py-1 border border-primary/50 bg-white rounded text-xs hover:bg-gray-50">
                  Approve
                </button>
                <button className="px-3 py-1 border border-primary/50 bg-white rounded text-xs hover:bg-gray-50">
                  Queue
                </button>
                <button className="px-3 lg:px-5 py-1 lg:py-2 border border-primary/50 bg-white rounded text-xs flex items-center gap-1 hover:bg-gray-50">
                  <span className="hidden sm:inline">Send Message</span>
                  <span className="sm:hidden">Message</span>
                  <Send className="w-3 h-3" />
                </button>
                <button className="px-3 py-1 border border-primary/50 bg-white rounded text-xs hover:bg-gray-50">
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
