import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  FileText,
  Settings,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle,
  Building
} from "lucide-react";

export default function Index() {
  const quickActions = [
    {
      title: "Recruitment Pipeline",
      description: "Manage candidates through Screening, Interview, Activation, and Hiring stages",
      icon: Users,
      path: "/hiring-pipeline",
      color: "bg-blue-500",
      stats: "Active workflow management"
    },
    {
      title: "Job Posting",
      description: "Create and manage job postings across different platforms",
      icon: FileText,
      path: "/job-posting",
      color: "bg-green-500",
      stats: "Post & track openings"
    },
    {
      title: "Checklist Builder",
      description: "Build custom checklists for onboarding and process management",
      icon: CheckCircle,
      path: "/checklist-builder",
      color: "bg-purple-500",
      stats: "Streamline processes"
    },
    {
      title: "Room Builder",
      description: "Create and manage interview rooms and meeting spaces",
      icon: Building,
      path: "/room-builder",
      color: "bg-orange-500",
      stats: "Organize interview spaces"
    }
  ];

  const stats = [
    { label: "Active Candidates", value: "142", icon: Users, color: "text-blue-600" },
    { label: "Open Positions", value: "8", icon: FileText, color: "text-green-600" },
    { label: "This Week Interviews", value: "24", icon: Calendar, color: "text-purple-600" },
    { label: "Hiring Success Rate", value: "89%", icon: BarChart3, color: "text-orange-600" }
  ];

  return (
    <Layout>
      <div className="onboarding-overview space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Onboarding</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to your hiring and onboarding command center. Manage your entire recruitment workflow from here.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gray-100`}>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${action.color} text-white`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{action.title}</CardTitle>
                        <div className="text-xs text-muted-foreground">{action.stats}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      {action.description}
                    </p>
                    <Button asChild className="w-full">
                      <Link to={action.path} className="flex items-center justify-center gap-2">
                        Get Started
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>5 new candidates added to screening pipeline</span>
                <span className="text-muted-foreground ml-auto">2 hours ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Interview scheduled for Senior Developer position</span>
                <span className="text-muted-foreground ml-auto">4 hours ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>New onboarding checklist created for Marketing team</span>
                <span className="text-muted-foreground ml-auto">1 day ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
