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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className={`border transition-all duration-200 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 hover:bg-gray-750"
                : "bg-white border-gray-200 hover:shadow-md"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${
                  isDarkMode ? "bg-blue-600" : "bg-blue-500"
                }`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className={`text-xs font-medium ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>

              <div>
                <h3 className={`text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {stat.title}
                </h3>
                <p className={`text-2xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.value}
                </p>
                <p className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
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
