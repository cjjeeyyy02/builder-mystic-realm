import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Chat() {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState("jennifer");
  const [message, setMessage] = useState("");

  const chatList = [
    {
      id: "jennifer",
      name: "Jennifer Morkus",
      lastMessage: "Hi, Did you finish the Hi-Fi Wireframes for floor app design?",
      time: "Today | 4:20 PM",
      avatar: "JM"
    },
    {
      id: "jennifer2",
      name: "Jennifer Morkus",
      lastMessage: "Hi, Did you finish the Hi-Fi Wireframes for floor app design?",
      time: "Today | 3:30 PM",
      avatar: "JM"
    },
    {
      id: "jennifer3",
      name: "Jennifer Morkus",
      lastMessage: "Hi, Did you finish the Hi-Fi Wireframes for floor app design?",
      time: "Today | 2:15 PM",
      avatar: "JM"
    },
    {
      id: "jennifer4",
      name: "Jennifer Morkus",
      lastMessage: "Hi, Did you finish the Hi-Fi Wireframes for floor app design?",
      time: "Today | 1:45 PM",
      avatar: "JM"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "jennifer",
      type: "received",
      content: "Input text",
      time: "4:20 PM"
    },
    {
      id: 2,
      sender: "me",
      type: "sent",
      content: "Input text",
      time: "4:21 PM"
    },
    {
      id: 3,
      sender: "jennifer",
      type: "received",
      content: "Input text",
      time: "4:22 PM"
    },
    {
      id: 4,
      sender: "jennifer",
      type: "received",
      content: "Input text",
      time: "4:23 PM"
    },
    {
      id: 5,
      sender: "me",
      type: "sent",
      content: "Input text",
      time: "4:24 PM"
    },
    {
      id: 6,
      sender: "jennifer",
      type: "received",
      content: "Input text",
      time: "4:25 PM"
    }
  ];

  const teams = [
    {
      id: "eng1",
      name: "Engineering Team",
      members: "6 more...",
      avatars: ["A", "B", "C", "D", "E"],
      status: "Team"
    },
    {
      id: "eng2",
      name: "Engineering Team",
      members: "6 more...",
      avatars: ["A", "B", "C", "D", "E"],
      status: "Team"
    },
    {
      id: "eng3",
      name: "Engineering Team",
      members: "6 more...",
      avatars: ["A", "B", "C", "D", "E"],
      status: "Team"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Chats</h1>
        </div>

        {/* Main Chat Layout */}
        <div className="flex h-[calc(100vh-140px)]">
          {/* Left Sidebar - Chat List */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            {/* All Messages Header */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">All Messages</h3>
              
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-3 py-2 pl-9 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {chatList.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedChat === chat.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-semibold">{chat.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">{chat.name}</h4>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-1">{chat.lastMessage}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">{chat.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center - Chat Messages */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">JM</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Jennifer Morkus</h3>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
                  <div className="flex items-start space-x-2 max-w-xs">
                    {msg.type === 'received' && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-semibold">J</span>
                      </div>
                    )}
                    <div className={`px-3 py-2 rounded-lg text-sm ${
                      msg.type === 'sent' 
                        ? 'bg-blue-500 text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-900 rounded-bl-none'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Teams and Groups */}
          <div className="w-80 bg-white border-l border-gray-200">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Team and Groups</h3>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                  Create Group
                </Button>
              </div>

              <div className="space-y-3">
                {teams.map((team) => (
                  <Card key={team.id} className="border border-gray-200 hover:shadow-sm transition-shadow">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <h4 className="text-sm font-semibold text-gray-900">{team.name}</h4>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          {team.avatars.slice(0, 4).map((avatar, index) => (
                            <div key={index} className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-semibold">{avatar}</span>
                            </div>
                          ))}
                          <span className="text-xs text-gray-500 ml-1">{team.members}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            {team.status}
                          </span>
                          <Button size="sm" variant="outline" className="text-xs h-6 px-2">
                            Open Chat
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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

              {/* Chat - Active */}
              <div className="flex flex-col items-center space-y-1 cursor-pointer">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-xs text-blue-600 font-medium">Chat</span>
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

              {/* Reminders */}
              <div
                className="flex flex-col items-center space-y-1 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => navigate('/reminders')}
              >
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 1015 0z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">Reminders</span>
              </div>

              {/* E - Forum */}
              <div className="flex flex-col items-center space-y-1 cursor-pointer hover:opacity-70 transition-opacity">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600 font-medium">E - Forum</span>
              </div>

              {/* AI2AIM STORE */}
              <div className="flex flex-col items-center space-y-1 cursor-pointer hover:opacity-70 transition-opacity">
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
