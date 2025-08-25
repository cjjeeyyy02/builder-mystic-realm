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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const emeraldShades = [
          {
            light: "from-emerald-50 to-emerald-100",
            dark: "from-emerald-900/40 to-emerald-800/40",
            border: "border-emerald-200",
            darkBorder: "border-emerald-700",
            iconBg: "bg-emerald-100",
            darkIconBg: "bg-emerald-800/50",
            iconColor: "text-emerald-600",
            darkIconColor: "text-emerald-400"
          },
          {
            light: "from-emerald-100 to-emerald-200",
            dark: "from-emerald-800/40 to-emerald-700/40",
            border: "border-emerald-300",
            darkBorder: "border-emerald-600",
            iconBg: "bg-emerald-200",
            darkIconBg: "bg-emerald-700/50",
            iconColor: "text-emerald-700",
            darkIconColor: "text-emerald-300"
          },
          {
            light: "from-emerald-200 to-emerald-300",
            dark: "from-emerald-700/40 to-emerald-600/40",
            border: "border-emerald-400",
            darkBorder: "border-emerald-500",
            iconBg: "bg-emerald-300",
            darkIconBg: "bg-emerald-600/50",
            iconColor: "text-emerald-800",
            darkIconColor: "text-emerald-200"
          },
          {
            light: "from-emerald-300 to-emerald-400",
            dark: "from-emerald-600/40 to-emerald-500/40",
            border: "border-emerald-500",
            darkBorder: "border-emerald-400",
            iconBg: "bg-emerald-400",
            darkIconBg: "bg-emerald-500/50",
            iconColor: "text-emerald-900",
            darkIconColor: "text-emerald-100"
          },
        ];

        const shade = emeraldShades[index];

        return (
          <Card
            key={stat.title}
            className={`relative overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
              isDarkMode
                ? `bg-gradient-to-br ${shade.dark} ${shade.darkBorder}`
                : `bg-gradient-to-br ${shade.light} ${shade.border}`
            }`}
          >
            <CardContent className="p-6">
              {/* Header with Icon */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl shadow-sm ${
                  isDarkMode ? shade.darkIconBg : shade.iconBg
                }`}>
                  <Icon className={`w-6 h-6 ${
                    isDarkMode ? shade.darkIconColor : shade.iconColor
                  }`} />
                </div>
                {stat.change && (
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                    isDarkMode
                      ? 'bg-emerald-700/50 text-emerald-300 border border-emerald-600/30'
                      : 'bg-white/80 text-emerald-700 border border-emerald-300/50'
                  } shadow-sm`}>
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.change}
                  </div>
                )}
              </div>

              {/* Main Content */}
              <div className="space-y-2">
                <div className={`text-3xl font-bold tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-sm font-semibold ${
                  isDarkMode ? 'text-emerald-200' : 'text-emerald-800'
                }`}>
                  {stat.title}
                </div>
                <div className={`text-xs ${
                  isDarkMode ? 'text-emerald-300/80' : 'text-emerald-700/80'
                }`}>
                  {stat.description}
                </div>
              </div>

              {/* Decorative Element */}
              <div className={`absolute -bottom-2 -right-2 w-16 h-16 rounded-full opacity-10 ${
                isDarkMode ? 'bg-emerald-400' : 'bg-emerald-600'
              }`} />
              <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full opacity-20 ${
                isDarkMode ? 'bg-emerald-300' : 'bg-emerald-500'
              }`} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
