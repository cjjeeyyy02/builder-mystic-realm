import { Users, UserCheck, UserPlus, CheckCircle } from "lucide-react";

interface StatCard {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  change?: string;
  changeType?: "increase" | "decrease";
}

const stats: StatCard[] = [
  { 
    title: "Hiring", 
    value: "1,000", 
    icon: Users, 
    color: "text-blue-600", 
    bgColor: "bg-blue-50",
    change: "+12%",
    changeType: "increase"
  },
  { 
    title: "Screening", 
    value: "500", 
    icon: UserCheck, 
    color: "text-amber-600", 
    bgColor: "bg-amber-50",
    change: "+8%",
    changeType: "increase"
  },
  { 
    title: "Activation", 
    value: "200", 
    icon: UserPlus, 
    color: "text-purple-600", 
    bgColor: "bg-purple-50",
    change: "+15%",
    changeType: "increase"
  },
  { 
    title: "Hired", 
    value: "100", 
    icon: CheckCircle, 
    color: "text-emerald-600", 
    bgColor: "bg-emerald-50",
    change: "+22%",
    changeType: "increase"
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.title} className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              {stat.change && (
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  stat.changeType === "increase" 
                    ? "text-emerald-600 bg-emerald-50" 
                    : "text-red-600 bg-red-50"
                }`}>
                  {stat.change}
                </span>
              )}
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-card-foreground">{stat.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
