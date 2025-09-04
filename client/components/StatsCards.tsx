import {
  Users,
  UserCheck,
  UserPlus,
  CheckCircle,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDarkMode } from "@/components/DarkModeProvider";

interface StatCard {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  change?: string;
  changeType?: "increase" | "decrease";
  description: string;
}

const stats: StatCard[] = [
  {
    title: "Hiring",
    value: "1,000",
    icon: Users,
    change: "+12%",
    changeType: "increase",
    description: "Active candidates in pipeline",
  },
  {
    title: "Screening",
    value: "500",
    icon: UserCheck,
    change: "+8%",
    changeType: "increase",
    description: "Candidates under review",
  },
  {
    title: "Activation",
    value: "200",
    icon: UserPlus,
    change: "+15%",
    changeType: "increase",
    description: "Pending activation processes",
  },
  {
    title: "Hired",
    value: "100",
    icon: CheckCircle,
    change: "+22%",
    changeType: "increase",
    description: "Successfully hired this month",
  },
];

export default function StatsCards() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className={`border transition-all duration-200 ${
              isDarkMode
                ? "bg-emerald-800 border-emerald-700 hover:shadow-md"
                : "bg-emerald-800 border-emerald-700 hover:shadow-md"
            }`}
          >
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-1.5 rounded-md ${
                  isDarkMode ? "bg-emerald-600" : "bg-emerald-600"
                }`}>
                  <Icon className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5 text-emerald-300" />
                  <span className={`text-[10px] font-medium ${
                    isDarkMode ? 'text-emerald-200' : 'text-emerald-200'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>

              <div>
                <h3 className={`text-xs font-medium mb-0.5 ${
                  isDarkMode ? 'text-emerald-100' : 'text-emerald-100'
                }`}>
                  {stat.title}
                </h3>
                <p className={`text-lg font-bold mb-1.5 ${
                  isDarkMode ? 'text-white' : 'text-white'
                }`}>
                  {stat.value}
                </p>
                <p className={`text-[10px] ${
                  isDarkMode ? 'text-emerald-100' : 'text-emerald-100'
                }`}>
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
