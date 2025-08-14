import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FooterNavigation from "@/components/FooterNavigation";

export default function Reminders() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("today");

  const upcomingReminders = [
    {
      id: 1,
      title: "Policy Update Review",
      description: "Review and acknowledge the new remote work Policy",
      date: "2025-05-26",
      time: "10:00 AM",
      audience: "All Employees",
      category: "upcoming",
    },
    {
      id: 2,
      title: "Policy Update Review",
      description: "Review and acknowledge the new remote work Policy",
      date: "2025-05-26",
      time: "10:00 AM",
      audience: "All Employees",
      category: "upcoming",
    },
  ];

  const overdueReminders = [
    {
      id: 3,
      title: "Policy Update Review",
      description: "Review and acknowledge the new remote work Policy",
      date: "2025-05-26",
      time: "10:00 AM",
      audience: "All Employees",
      category: "overdue",
    },
    {
      id: 4,
      title: "Policy Update Review",
      description: "Review and acknowledge the new remote work Policy",
      date: "2025-05-26",
      time: "10:00 AM",
      audience: "All Employees",
      category: "overdue",
    },
  ];

  const completedReminders = [
    {
      id: 5,
      title: "Policy Update Review",
      description: "Review and acknowledge the new remote work Policy",
      date: "2025-05-26",
      time: "10:00 AM",
      audience: "All Employees",
      category: "completed",
    },
    {
      id: 6,
      title: "Policy Update Review",
      description: "Review and acknowledge the new remote work Policy",
      date: "2025-05-26",
      time: "10:00 AM",
      audience: "All Employees",
      category: "completed",
    },
  ];

  const handleJoin = (reminder: any) => {
    console.log(`Joining reminder: ${reminder.title}`);
  };

  const handleSnooze = (reminder: any) => {
    console.log(`Snoozing reminder: ${reminder.title}`);
  };

  const handleAddNewReminder = () => {
    console.log("Opening add new reminder dialog");
  };

  const ReminderCard = ({
    reminder,
    showJoinButton = true,
  }: {
    reminder: any;
    showJoinButton?: boolean;
  }) => (
    <Card className="bg-white/60 backdrop-blur-sm border border-gray-100 hover:shadow-md hover:scale-[1.02] transition-all duration-200 mb-3">
      <CardContent className="p-3">
        <div className="flex items-start space-x-3 mb-2">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-3 h-3 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">
              {reminder.title}
            </h4>
            <p className="text-xs text-gray-600 mb-2">{reminder.description}</p>

            <div className="space-y-1 mb-2">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{reminder.date}</span>
                <svg
                  className="w-3 h-3 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{reminder.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>{reminder.audience}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {showJoinButton && (
                <Button
                  onClick={() => handleJoin(reminder)}
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs px-3 py-1 h-6 rounded-md shadow-sm"
                >
                  Join
                </Button>
              )}
              <Button
                onClick={() => handleSnooze(reminder)}
                size="sm"
                variant="outline"
                className="text-xs px-3 py-1 h-6 border-gray-200 hover:bg-gray-50 rounded-md"
              >
                Snooze
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pb-footer">
          {/* Header */}
          <div className="bg-white/90 backdrop-blur-sm border-b border-gray-100 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Reminders</h1>
              <Button
                onClick={handleAddNewReminder}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg shadow-sm"
              >
                Add New Reminders
              </Button>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-3 rounded-lg border border-blue-200/50">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-blue-900">
                      {upcomingReminders.length}
                    </p>
                    <p className="text-xs text-blue-700">Today's Reminders</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100/50 p-3 rounded-lg border border-red-200/50">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-red-900">
                      {overdueReminders.length}
                    </p>
                    <p className="text-xs text-red-700">Overdue Items</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-3 rounded-lg border border-green-200/50">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-900">
                      {completedReminders.length}
                    </p>
                    <p className="text-xs text-green-700">Completed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-6 border-b border-gray-100">
              <button
                onClick={() => setActiveTab("today")}
                className={`pb-3 text-sm font-medium border-b-2 transition-all duration-200 ${
                  activeTab === "today"
                    ? "border-blue-500 text-blue-600 bg-blue-50/50 px-3 rounded-t-lg"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 px-3 rounded-t-lg"
                }`}
              >
                Today's Reminders
              </button>
              <button
                onClick={() => setActiveTab("overdue")}
                className={`pb-3 text-sm font-medium border-b-2 transition-all duration-200 ${
                  activeTab === "overdue"
                    ? "border-red-500 text-red-600 bg-red-50/50 px-3 rounded-t-lg"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 px-3 rounded-t-lg"
                }`}
              >
                Overdue Items
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`pb-3 text-sm font-medium border-b-2 transition-all duration-200 ${
                  activeTab === "completed"
                    ? "border-green-500 text-green-600 bg-green-50/50 px-3 rounded-t-lg"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 px-3 rounded-t-lg"
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Column */}
              <div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-blue-200/30 mb-4 shadow-sm">
                  <div className="p-4 border-b border-blue-100/50 bg-gradient-to-r from-blue-50/50 to-blue-100/30 rounded-t-xl">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-blue-900">
                        Upcoming
                      </h3>
                    </div>
                  </div>
                  <div className="p-4">
                    {upcomingReminders.map((reminder) => (
                      <ReminderCard key={reminder.id} reminder={reminder} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Overdue Column */}
              <div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-red-200/30 mb-4 shadow-sm">
                  <div className="p-4 border-b border-red-100/50 bg-gradient-to-r from-red-50/50 to-red-100/30 rounded-t-xl">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-red-900">
                        Overdue
                      </h3>
                    </div>
                  </div>
                  <div className="p-4">
                    {overdueReminders.map((reminder) => (
                      <ReminderCard key={reminder.id} reminder={reminder} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Completed Column */}
              <div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-green-200/30 mb-4 shadow-sm">
                  <div className="p-4 border-b border-green-100/50 bg-gradient-to-r from-green-50/50 to-green-100/30 rounded-t-xl">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-green-900">
                        Completed
                      </h3>
                    </div>
                  </div>
                  <div className="p-4">
                    {completedReminders.map((reminder) => (
                      <ReminderCard
                        key={reminder.id}
                        reminder={reminder}
                        showJoinButton={false}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <FooterNavigation />
    </>
  );
}
