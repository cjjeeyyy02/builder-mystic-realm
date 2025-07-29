import { Mail, Phone, ExternalLink, Send, MoreHorizontal } from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  totalExperience: string;
  relevantExperience: string;
  status: "approved" | "pending";
  avatar?: string;
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
    name: "Michael Chen",
    position: "Frontend Developer",
    email: "michael.chen@gmail.com",
    phone: "123-456-790",
    totalExperience: "4 years",
    relevantExperience: "4 years",
    status: "approved",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    position: "UX Designer",
    email: "emily.rodriguez@gmail.com",
    phone: "123-456-791",
    totalExperience: "5 years",
    relevantExperience: "5 years",
    status: "approved",
  },
  {
    id: "4",
    name: "David Kim",
    position: "Backend Developer",
    email: "david.kim@gmail.com",
    phone: "123-456-792",
    totalExperience: "7 years",
    relevantExperience: "6 years",
    status: "approved",
  },
  {
    id: "5",
    name: "Lisa Wang",
    position: "Product Manager",
    email: "lisa.wang@gmail.com",
    phone: "123-456-793",
    totalExperience: "8 years",
    relevantExperience: "7 years",
    status: "approved",
  },
];

export default function CandidateList() {
  return (
    <div className="space-y-4">
      {candidates.map((candidate, index) => (
        <div
          key={candidate.id}
          className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Left Section - Avatar and Info */}
            <div className="flex items-start lg:items-center gap-4">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/10">
                <span className="text-primary font-semibold text-lg">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              
              <div className="space-y-2 min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold text-card-foreground">{candidate.name}</h3>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                    Active
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-medium">{candidate.position}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Total: {candidate.totalExperience}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Relevant: {candidate.relevantExperience}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>{candidate.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Status and Actions */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Status Badges */}
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium shadow-sm">
                  Approved
                </span>
                <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
                  View Resume
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-border bg-background hover:bg-accent rounded-lg text-sm font-medium transition-colors">
                  Approve
                </button>
                <button className="px-4 py-2 border border-border bg-background hover:bg-accent rounded-lg text-sm font-medium transition-colors">
                  Queue
                </button>
                <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Message</span>
                </button>
                <button className="p-2 border border-border bg-background hover:bg-accent rounded-lg transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
