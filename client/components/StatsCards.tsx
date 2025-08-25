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
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const emeraldShades = [
          {
            bg: "bg-emerald-50",
            darkBg: "bg-emerald-900/50",
            border: "border-emerald-200",
            darkBorder: "border-emerald-700",
            iconBg: "bg-emerald-600"
          },
          {
            bg: "bg-emerald-100",
            darkBg: "bg-emerald-800/50",
            border: "border-emerald-300",
            darkBorder: "border-emerald-600",
            iconBg: "bg-emerald-700"
          },
          {
            bg: "bg-emerald-200",
            darkBg: "bg-emerald-700/50",
            border: "border-emerald-400",
            darkBorder: "border-emerald-500",
            iconBg: "bg-emerald-800"
          },
          {
            bg: "bg-emerald-300",
            darkBg: "bg-emerald-600/50",
            border: "border-emerald-500",
            darkBorder: "border-emerald-400",
            iconBg: "bg-emerald-900"
          },
        ];

        const shade = emeraldShades[index];

        return (
          <Card
            key={stat.title}
            className={`shadow-sm hover:shadow-md transition-all duration-300 ${
              isDarkMode
                ? `${shade.darkBg} border ${shade.darkBorder}`
                : `${shade.bg} border ${shade.border}`
            }`}
          >
            <CardContent className="p-3">
              <div className="flex items-start justify-between mb-2">
                <div className={`p-1 ${shade.iconBg} rounded`}>
                  <Icon className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h3 className={`text-xs font-medium mb-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {stat.title}
                </h3>
                <p className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.value}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l5-5 5 5M7 7l5-5 5 5" />
                    </svg>
                    <span className={`text-xs font-medium transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
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
