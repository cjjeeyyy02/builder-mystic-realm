import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
      category: "upcoming"
    },
    {
      id: 2,
      title: "Policy Update Review",
      description: "Review and acknowledge the new remote work Policy",
      date: "2025-05-26",
      time: "10:00 AM",
      audience: "All Employees",
      category: "upcoming"
    }
  ];

  const overdueReminders = [
    {
      id: 3,
      title: "Policy Update Review",
      description: "Review and acknowledge the new remote work Policy",
      date: "2025-05-26",
      time: "10:00 AM",
      audience: "All Employees",
      category: "overdue"
    },
    {
      id: 4,
      title: "Policy Update Review",
      description: "Review and acknowledge the new remote work Policy",
      date: "2025-05-26",
      time: "10:00 AM",
      audience: "All Employees",
      category: "overdue"
    }
  ];

  const completedReminders = [
    {
      id: 5,
      title: "Policy Update Review",
      description: "Review and acknowledge the new remote work Policy",
      date: "2025-05-26",
      time: "10:00 AM",
      audience: "All Employees",
      category: "completed"
    },
    {
      id: 6,
      title: "Policy Update Review",
      description: "Review and acknowledge the new remote work Policy",
      date: "2025-05-26",
      time: "10:00 AM",
      audience: "All Employees",
      category: "completed"
    }
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

  const ReminderCard = ({ reminder, showJoinButton = true }: { reminder: any; showJoinButton?: boolean }) => (
    <Card className="bg-white border border-gray-200 hover:shadow-sm transition-shadow mb-4">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3 mb-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-blue-600 mb-1">{reminder.title}</h4>
            <p className="text-xs text-gray-600 mb-3">{reminder.description}</p>
            
            <div className="space-y-1 mb-3">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{reminder.date}</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{reminder.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>{reminder.audience}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {showJoinButton && (
                <Button
                  onClick={() => handleJoin(reminder)}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-4 py-1 h-7"
                >
                  Join
                </Button>
              )}
              <Button
                onClick={() => handleSnooze(reminder)}
                size="sm"
                variant="outline"
                className="text-xs px-4 py-1 h-7"
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
    <Layout>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Reminders</h1>
            <Button 
              onClick={handleAddNewReminder}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Add New Reminders
            </Button>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("today")}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "today"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Todays Reminders
            </button>
            <button
              onClick={() => setActiveTab("overdue")}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "overdue"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Overdue Items
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "completed"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
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
              <div className="bg-white rounded-lg border border-gray-200 mb-4">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Upcoming</h3>
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
              <div className="bg-white rounded-lg border border-gray-200 mb-4">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Overdue</h3>
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
              <div className="bg-white rounded-lg border border-gray-200 mb-4">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Completed</h3>
                </div>
                <div className="p-4">
                  {completedReminders.map((reminder) => (
                    <ReminderCard key={reminder.id} reminder={reminder} showJoinButton={false} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-white border-t border-gray-200 mt-8">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-center space-x-8">
              {/* Activity Feed */}
              <div 
                className="flex flex-col items-center space-y-1 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => navigate('/dashboard')}
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Activity Feed</span>
              </div>

              {/* Chat */}
              <div 
                className="flex flex-col items-center space-y-1 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => navigate('/chat')}
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Chat</span>
              </div>

              {/* Files */}
              <div 
                className="flex flex-col items-center space-y-1 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => navigate('/files')}
              >
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Files</span>
              </div>

              {/* Meetings */}
              <div className="flex flex-col items-center space-y-1 cursor-pointer hover:opacity-70 transition-opacity">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Meetings</span>
              </div>

              {/* Reminders - Active */}
              <div className="flex flex-col items-center space-y-1 cursor-pointer">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 1015 0z" />
                  </svg>
                </div>
                <span className="text-xs text-orange-600 font-medium">Reminders</span>
              </div>

              {/* E - Forum */}
              <div
                className="flex flex-col items-center space-y-1 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => navigate('/e-forum')}
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">E - Forum</span>
              </div>

              {/* AI2AIM STORE */}
              <div
                className="flex flex-col items-center space-y-1 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => navigate('/ai2aim-store')}
              >
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">AI2AIM STORE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
