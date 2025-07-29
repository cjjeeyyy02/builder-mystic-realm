import { Users, UserCheck, UserPlus, CheckCircle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
          <Card key={stat.title} className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              {stat.change && (
                <Badge 
                  variant={stat.changeType === "increase" ? "default" : "destructive"}
                  className="gap-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                >
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
