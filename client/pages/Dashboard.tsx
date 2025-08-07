import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Users,
  UserCheck,
  TrendingUp,
  Clock,
  UserPlus,
  AlertTriangle,
  UserMinus,
  CheckCircle,
  RefreshCw,
  Wifi,
  WifiOff,
  Calendar,
  Target,
} from "lucide-react";

interface MetricData {
  id: string;
  title: string;
  value: number | string;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  icon: React.ReactNode;
  route: string;
  color: string;
  description: string;
}

interface DashboardMetrics {
  totalEmployees: number;
  activeCandidates: number;
  averagePerformance: number;
  pendingTasks: number;
  pendingOnboarding: number;
  onProbation: number;
  offboarding: number;
  completedTasks: number;
  lastUpdated: string;
}

interface UserRole {
  id: string;
  name: string;
  permissions: string[];
  visibleMetrics: string[];
}

// Simulated role-based access control
const userRoles: { [key: string]: UserRole } = {
  admin: {
    id: "admin",
    name: "Administrator",
    permissions: ["full_access"],
    visibleMetrics: ["all"],
  },
  hr_manager: {
    id: "hr_manager",
    name: "HR Manager",
    permissions: ["hr_access"],
    visibleMetrics: [
      "totalEmployees",
      "activeCandidates",
      "pendingOnboarding",
      "onProbation",
      "offboarding",
    ],
  },
  department_head: {
    id: "department_head",
    name: "Department Head",
    permissions: ["department_access"],
    visibleMetrics: [
      "totalEmployees",
      "averagePerformance",
      "pendingTasks",
      "completedTasks",
    ],
  },
  employee: {
    id: "employee",
    name: "Employee",
    permissions: ["limited_access"],
    visibleMetrics: ["pendingTasks", "completedTasks"],
  },
};

// Simulated current user (this would come from authentication context)
const currentUserRole = "admin"; // Change this to test different roles

// Simulated Unified Metrics API
const fetchMetricsAPI = async (): Promise<DashboardMetrics> => {
  // Simulate API delay
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 1000 + 500),
  );

  // Simulate occasional API failures (10% chance)
  if (Math.random() < 0.1) {
    throw new Error("API temporarily unavailable");
  }

  return {
    totalEmployees: 247 + Math.floor(Math.random() * 10),
    activeCandidates: 34 + Math.floor(Math.random() * 5),
    averagePerformance: 87.2 + Math.random() * 5,
    pendingTasks: 12 + Math.floor(Math.random() * 8),
    pendingOnboarding: 8 + Math.floor(Math.random() * 3),
    onProbation: 3 + Math.floor(Math.random() * 2),
    offboarding: 5 + Math.floor(Math.random() * 3),
    completedTasks: 156 + Math.floor(Math.random() * 20),
    lastUpdated: new Date().toISOString(),
  };
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<
    "online" | "offline" | "error"
  >("online");
  const [retryAttempts, setRetryAttempts] = useState(0);
  const [failedMetrics, setFailedMetrics] = useState<string[]>([]);

  // Get current user's role and visible metrics
  const currentRole = userRoles[currentUserRole];
  const canViewAllMetrics = currentRole.visibleMetrics.includes("all");

  const fetchMetricsWithRetry = useCallback(
    async (attemptCount = 0): Promise<void> => {
      try {
        setIsLoading(attemptCount === 0);
        const data = await fetchMetricsAPI();
        setMetrics(data);
        setLastUpdated(new Date());
        setConnectionStatus("online");
        setRetryAttempts(0);
        setFailedMetrics([]);
      } catch (error) {
        console.error("Metrics API failed:", error);
        setRetryAttempts(attemptCount + 1);

        if (attemptCount < 2) {
          // Retry up to 3 times (0, 1, 2)
          setTimeout(
            () => fetchMetricsWithRetry(attemptCount + 1),
            1000 * (attemptCount + 1),
          );
        } else {
          // All retries failed
          setConnectionStatus("error");
          setFailedMetrics(["all"]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  // Initial fetch and auto-refresh setup
  useEffect(() => {
    fetchMetricsWithRetry();

    // Set up auto-refresh every 5 minutes (300,000 ms)
    const interval = setInterval(() => {
      fetchMetricsWithRetry();
    }, 300000);

    return () => clearInterval(interval);
  }, [fetchMetricsWithRetry]);

  const getMetricCards = (): MetricData[] => {
    if (!metrics) return [];

    const allMetrics: MetricData[] = [
      {
        id: "totalEmployees",
        title: "Total Employees",
        value: metrics.totalEmployees,
        change: 5,
        changeType: "increase",
        icon: <Users className="w-6 h-6" />,
        route: "/records",
        color: "bg-blue-50 text-blue-700",
        description: "Total active employees in the organization",
      },
      {
        id: "activeCandidates",
        title: "Active Candidates",
        value: metrics.activeCandidates,
        change: 8,
        changeType: "increase",
        icon: <UserCheck className="w-6 h-6" />,
        route: "/records", // This would be candidates page
        color: "bg-green-50 text-green-700",
        description: "Candidates currently in the recruitment process",
      },
      {
        id: "averagePerformance",
        title: "Average Performance",
        value: `${metrics.averagePerformance.toFixed(1)}%`,
        change: 2.3,
        changeType: "increase",
        icon: <TrendingUp className="w-6 h-6" />,
        route: "/performance",
        color: "bg-purple-50 text-purple-700",
        description: "Organization-wide performance rating",
      },
      {
        id: "pendingTasks",
        title: "Pending Tasks",
        value: metrics.pendingTasks,
        icon: <Clock className="w-6 h-6" />,
        route: "/dashboard", // This would be tasks page
        color: "bg-amber-50 text-amber-700",
        description: "Tasks awaiting completion",
      },
      {
        id: "pendingOnboarding",
        title: "Pending Onboarding",
        value: metrics.pendingOnboarding,
        change: -2,
        changeType: "decrease",
        icon: <UserPlus className="w-6 h-6" />,
        route: "/",
        color: "bg-indigo-50 text-indigo-700",
        description: "New hires pending onboarding completion",
      },
      {
        id: "onProbation",
        title: "On Probation",
        value: metrics.onProbation,
        icon: <AlertTriangle className="w-6 h-6" />,
        route: "/records",
        color: "bg-orange-50 text-orange-700",
        description: "Employees currently on probationary period",
      },
      {
        id: "offboarding",
        title: "Offboarding",
        value: metrics.offboarding,
        change: 1,
        changeType: "increase",
        icon: <UserMinus className="w-6 h-6" />,
        route: "/offboarding",
        color: "bg-red-50 text-red-700",
        description: "Employees in offboarding process",
      },
      {
        id: "completedTasks",
        title: "Completed Tasks",
        value: metrics.completedTasks,
        change: 15,
        changeType: "increase",
        icon: <CheckCircle className="w-6 h-6" />,
        route: "/dashboard", // This would be tasks page
        color: "bg-emerald-50 text-emerald-700",
        description: "Successfully completed tasks this month",
      },
    ];

    // Filter metrics based on user role
    if (canViewAllMetrics) {
      return allMetrics;
    }

    return allMetrics.filter((metric) =>
      currentRole.visibleMetrics.includes(metric.id),
    );
  };

  const handleMetricClick = (route: string) => {
    navigate(route);
  };

  const formatLastUpdated = (date: Date | null): string => {
    if (!date) return "Never";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getChangeIcon = (changeType?: "increase" | "decrease" | "neutral") => {
    switch (changeType) {
      case "increase":
        return "↗";
      case "decrease":
        return "↘";
      default:
        return "";
    }
  };

  const getChangeColor = (changeType?: "increase" | "decrease" | "neutral") => {
    switch (changeType) {
      case "increase":
        return "text-green-600";
      case "decrease":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  if (isLoading && !metrics) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                EMS Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Loading workforce metrics...</p>
            </div>
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-sm text-gray-500">Loading...</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <TooltipProvider>
        <div className="space-y-6">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                EMS Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Real-time workforce metrics and insights
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Connection Status */}
              <div className="flex items-center space-x-2">
                {connectionStatus === "online" ? (
                  <Wifi className="w-4 h-4 text-green-600" />
                ) : connectionStatus === "error" ? (
                  <WifiOff className="w-4 h-4 text-red-600" />
                ) : (
                  <RefreshCw className="w-4 h-4 text-amber-600 animate-spin" />
                )}
                <span
                  className={`text-sm ${
                    connectionStatus === "online"
                      ? "text-green-600"
                      : connectionStatus === "error"
                        ? "text-red-600"
                        : "text-amber-600"
                  }`}
                >
                  {connectionStatus === "online"
                    ? "Connected"
                    : connectionStatus === "error"
                      ? "Connection Error"
                      : "Connecting..."}
                </span>
              </div>

              {/* Last Updated */}
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Last updated: {formatLastUpdated(lastUpdated)}</span>
              </div>

              {/* Role Badge */}
              <Badge variant="outline" className="text-xs">
                {currentRole.name}
              </Badge>
            </div>
          </div>

          {/* Auto-refresh Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-800">
                Dashboard auto-refreshes every 5 minutes • Next update in:{" "}
                {lastUpdated ? "4:30" : "Loading..."}
              </span>
            </div>
          </div>

          {/* Error Banner */}
          {connectionStatus === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <WifiOff className="w-5 h-5 text-red-600" />
                  <div>
                    <h3 className="text-sm font-medium text-red-800">
                      Connection Error
                    </h3>
                    <p className="text-sm text-red-600">
                      Failed to fetch metrics after {retryAttempts} attempts.
                      Some data may be temporarily unavailable.
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchMetricsWithRetry()}
                  className="border-red-200 text-red-700 hover:bg-red-50"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              </div>
            </div>
          )}

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getMetricCards().map((metric) => (
              <Tooltip key={metric.id}>
                <TooltipTrigger asChild>
                  <Card
                    className="p-6 cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                    onClick={() => handleMetricClick(metric.route)}
                  >
                    <CardContent className="p-0">
                      {failedMetrics.includes("all") ||
                      failedMetrics.includes(metric.id) ? (
                        <div className="text-center py-4">
                          <WifiOff className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">
                            Data temporarily unavailable
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm font-medium text-gray-600">
                                {metric.title}
                              </p>
                              <div className={`p-2 rounded-lg ${metric.color}`}>
                                {metric.icon}
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-gray-900">
                                {metric.value}
                              </span>
                              {metric.change && (
                                <div
                                  className={`flex items-center text-sm ${getChangeColor(metric.changeType)}`}
                                >
                                  <span className="mr-1">
                                    {getChangeIcon(metric.changeType)}
                                  </span>
                                  <span>{Math.abs(metric.change)}</span>
                                </div>
                              )}
                            </div>

                            <p className="text-xs text-gray-500 mt-1">
                              {metric.description}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-center">
                    <p className="font-medium">{metric.title}</p>
                    <p className="text-xs text-gray-400">
                      🕒 Last Updated: {formatLastUpdated(lastUpdated)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Click to view details
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Role-based Visibility Notice */}
          {!canViewAllMetrics && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-amber-600" />
                <span className="text-sm text-amber-800">
                  You're viewing metrics based on your role:{" "}
                  <strong>{currentRole.name}</strong>. Contact your
                  administrator for additional access.
                </span>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/")}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  New Employee Onboarding
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/offboarding")}
                >
                  <UserMinus className="w-4 h-4 mr-2" />
                  Start Offboarding Process
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/performance")}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Performance Review
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Status</span>
                  <Badge
                    variant={
                      connectionStatus === "online" ? "default" : "destructive"
                    }
                  >
                    {connectionStatus === "online" ? "Operational" : "Error"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Auto-refresh</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Data Freshness</span>
                  <Badge variant="outline">
                    {lastUpdated ? "< 5 min" : "Loading..."}
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Access Level</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Role</span>
                  <Badge variant="outline">{currentRole.name}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Visible Metrics</span>
                  <Badge variant="outline">
                    {canViewAllMetrics
                      ? "All"
                      : `${getMetricCards().length} of 8`}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Permission Level
                  </span>
                  <Badge variant={canViewAllMetrics ? "default" : "secondary"}>
                    {canViewAllMetrics ? "Full Access" : "Limited"}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </TooltipProvider>
    </Layout>
  );
}
