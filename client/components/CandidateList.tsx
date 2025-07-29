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
          className={`p-6 bg-muted ${
            index !== candidates.length - 1 ? "border-b border-border" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Left Section - Avatar and Info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">{candidate.name}</h3>
                <p className="text-sm">{candidate.position}</p>
                <div className="flex items-center gap-6 text-xs">
                  <span>Total Experience: {candidate.totalExperience}</span>
                  <span>Relevant Experience: {candidate.relevantExperience}</span>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span>{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>{candidate.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Status and Actions */}
            <div className="flex items-center gap-3">
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
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border border-primary/50 bg-white rounded text-xs hover:bg-gray-50">
                  Approve
                </button>
                <button className="px-3 py-1 border border-primary/50 bg-white rounded text-xs hover:bg-gray-50">
                  Queue
                </button>
                <button className="px-5 py-2 border border-primary/50 bg-white rounded text-xs flex items-center gap-1 hover:bg-gray-50">
                  Send Message
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
