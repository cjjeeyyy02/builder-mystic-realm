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
            bg: "bg-emerald-600",
            darkBg: "bg-emerald-700",
            border: "border-emerald-600",
            darkBorder: "border-emerald-700"
          },
          {
            bg: "bg-emerald-700",
            darkBg: "bg-emerald-600",
            border: "border-emerald-700",
            darkBorder: "border-emerald-600"
          },
          {
            bg: "bg-emerald-800",
            darkBg: "bg-emerald-500",
            border: "border-emerald-800",
            darkBorder: "border-emerald-500"
          },
          {
            bg: "bg-emerald-500",
            darkBg: "bg-emerald-800",
            border: "border-emerald-500",
            darkBorder: "border-emerald-800"
          },
        ];

        const shade = emeraldShades[index];

        return (
          <Card
            key={stat.title}
            className={`border ${
              isDarkMode
                ? `${shade.darkBg} ${shade.darkBorder}`
                : `${shade.bg} ${shade.border}`
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white text-lg font-bold">
                    {stat.value}
                  </div>
                  <div className="text-white/90 text-sm font-medium">
                    {stat.title}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Icon className="w-5 h-5 text-white" />
                  {stat.change && (
                    <div className="flex items-center gap-1 text-xs font-bold text-white">
                      <ArrowUpRight className="w-3 h-3" />
                      {stat.change}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
