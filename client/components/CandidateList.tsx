import { Mail, Phone, ExternalLink, Send, CheckCircle, Clock, MoreVertical } from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  totalExperience: string;
  relevantExperience: string;
  status: "approved" | "pending" | "review";
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
    status: "review",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    position: "UX Designer",
    email: "emily.rodriguez@gmail.com",
    phone: "123-456-791",
    totalExperience: "5 years",
    relevantExperience: "5 years",
    status: "pending",
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
    status: "review",
  },
];

function getStatusStyle(status: string) {
  switch (status) {
    case "approved":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "review":
      return "bg-blue-50 text-blue-700 border-blue-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "approved":
      return <CheckCircle className="w-3 h-3" />;
    case "pending":
      return <Clock className="w-3 h-3" />;
    case "review":
      return <Clock className="w-3 h-3" />;
    default:
      return <Clock className="w-3 h-3" />;
  }
}

export default function CandidateList() {
  return (
    <div className="space-y-3">
      {candidates.map((candidate) => (
        <div
          key={candidate.id}
          className="bg-card border border-border rounded-lg p-5 hover:shadow-sm transition-shadow duration-200"
        >
          {/* Main Content Row */}
          <div className="flex items-center justify-between">
            {/* Left: Avatar + Basic Info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                <span className="text-primary font-semibold text-sm">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-card-foreground">{candidate.name}</h3>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${getStatusStyle(candidate.status)}`}>
                    {getStatusIcon(candidate.status)}
                    {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{candidate.position}</p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                <ExternalLink className="w-3 h-3" />
                Resume
              </button>
              <button className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <Send className="w-3 h-3" />
                Message
              </button>
              <button className="p-1.5 text-muted-foreground hover:text-card-foreground hover:bg-accent rounded-md transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Row: Experience + Contact */}
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            {/* Left: Experience */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Total Experience: {candidate.totalExperience}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Relevant Experience: {candidate.relevantExperience}
              </span>
            </div>

            {/* Right: Contact */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer" title={candidate.email}>
                <Mail className="w-3 h-3" />
                <span className="hidden lg:inline">{candidate.name}</span>
              </div>
              <div className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                <Phone className="w-3 h-3" />
                <span>{candidate.phone}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
