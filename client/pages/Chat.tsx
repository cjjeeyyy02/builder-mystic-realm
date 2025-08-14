import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Chat() {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState("jennifer");
  const [message, setMessage] = useState("");
  const [chatType, setChatType] = useState("individual"); // 'individual' or 'group'

  const chatList = [
    {
      id: "jennifer",
      name: "Jennifer Morkus",
      lastMessage: "Hi, Did you finish the Hi-Fi Wireframes for floor app design?",
      time: "4:20 PM",
      avatar: "JM",
      status: "online",
      unread: 2
    },
    {
      id: "sarah",
      name: "Sarah Johnson",
      lastMessage: "Let's schedule the meeting for next week",
      time: "3:30 PM",
      avatar: "SJ",
      status: "away",
      unread: 0
    },
    {
      id: "mike",
      name: "Mike Chen",
      lastMessage: "The project timeline looks good to me",
      time: "2:15 PM",
      avatar: "MC",
      status: "offline",
      unread: 1
    },
    {
      id: "alex",
      name: "Alex Rivera",
      lastMessage: "Thanks for the feedback on the design",
      time: "1:45 PM",
      avatar: "AR",
      status: "online",
      unread: 0
    }
  ];

  const individualMessages = [
    {
      id: 1,
      sender: "jennifer",
      type: "received",
      content: "Hi! Did you finish the Hi-Fi Wireframes for the floor app design?",
      time: "4:20 PM",
      avatar: "JM"
    },
    {
      id: 2,
      sender: "me",
      type: "sent",
      content: "Yes, I just completed them. I'll send the files over shortly.",
      time: "4:21 PM"
    },
    {
      id: 3,
      sender: "jennifer",
      type: "received",
      content: "Perfect! Also, can you review the color scheme we discussed?",
      time: "4:22 PM",
      avatar: "JM"
    },
    {
      id: 4,
      sender: "me",
      type: "sent",
      content: "Absolutely, I think the blue gradient approach will work well.",
      time: "4:24 PM"
    },
    {
      id: 5,
      sender: "jennifer",
      type: "received",
      content: "Great! Let's schedule a meeting tomorrow to finalize everything.",
      time: "4:25 PM",
      avatar: "JM"
    }
  ];

  const groupMessages = [
    {
      id: 1,
      sender: "sarah",
      type: "received",
      content: "Hey team! Ready for the sprint planning meeting?",
      time: "9:15 AM",
      avatar: "SJ",
      senderName: "Sarah Johnson"
    },
    {
      id: 2,
      sender: "mike",
      type: "received", 
      content: "Yes, I've prepared the user stories we discussed.",
      time: "9:16 AM",
      avatar: "MC",
      senderName: "Mike Chen"
    },
    {
      id: 3,
      sender: "me",
      type: "sent",
      content: "Perfect! I've also updated the design mockups based on last week's feedback.",
      time: "9:17 AM"
    },
    {
      id: 4,
      sender: "alex",
      type: "received",
      content: "Awesome! Should we review the technical requirements too?",
      time: "9:18 AM",
      avatar: "AR",
      senderName: "Alex Rivera"
    }
  ];

  const teams = [
    {
      id: "eng1",
      name: "Engineering Team",
      members: "8 members",
      avatars: ["SJ", "MC", "AR", "JM", "TK"],
      status: "Team",
      lastMessage: "Let's review the code before deployment",
      time: "2:30 PM",
      unread: 3
    },
    {
      id: "design",
      name: "Design Team",
      members: "5 members",
      avatars: ["JM", "AR", "SL", "MK"],
      status: "Team",
      lastMessage: "New wireframes are ready for review",
      time: "1:45 PM",
      unread: 1
    },
    {
      id: "product",
      name: "Product Team",
      members: "6 members",
      avatars: ["SJ", "TK", "AL", "RB"],
      status: "Team",
      lastMessage: "Sprint planning meeting tomorrow at 10 AM",
      time: "11:20 AM",
      unread: 0
    }
  ];

  const currentMessages = chatType === "group" ? groupMessages : individualMessages;
  const currentChatData = chatType === "group" 
    ? teams.find(team => team.id === selectedChat)
    : chatList.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleGroupClick = (groupId: string) => {
    setSelectedChat(groupId);
    setChatType("group");
  };

  const handleIndividualClick = (chatId: string) => {
    setSelectedChat(chatId);
    setChatType("individual");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "offline": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-gradient-to-br from-blue-500 to-blue-600",
      "bg-gradient-to-br from-purple-500 to-purple-600", 
      "bg-gradient-to-br from-green-500 to-green-600",
      "bg-gradient-to-br from-pink-500 to-pink-600",
      "bg-gradient-to-br from-indigo-500 to-indigo-600",
      "bg-gradient-to-br from-red-500 to-red-600"
    ];
    return colors[name.length % colors.length];
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Messages
            </h1>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Chat
              </Button>
            </div>
          </div>
        </div>

        {/* Main Chat Layout */}
        <div className="flex h-[calc(100vh-140px)]">
          {/* Left Sidebar - Chat List */}
          <div className="w-80 bg-white/70 backdrop-blur-sm border-r border-gray-200/50 flex flex-col">
            {/* Search and Tabs */}
            <div className="p-4 border-b border-gray-200/50">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full px-4 py-3 pl-11 text-sm bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              {/* Chat Type Tabs */}
              <div className="flex bg-gray-100/80 rounded-lg p-1">
                <button
                  onClick={() => setChatType("individual")}
                  className={`flex-1 py-2 px-3 text-xs font-medium rounded-md transition-all ${
                    chatType === "individual" 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Direct Messages
                </button>
                <button
                  onClick={() => setChatType("group")}
                  className={`flex-1 py-2 px-3 text-xs font-medium rounded-md transition-all ${
                    chatType === "group" 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Teams & Groups
                </button>
              </div>
            </div>

            {/* Chat/Group List */}
            <div className="flex-1 overflow-y-auto">
              {chatType === "individual" ? (
                // Individual Chats
                chatList.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => handleIndividualClick(chat.id)}
                    className={`p-4 border-b border-gray-100/50 cursor-pointer hover:bg-blue-50/50 transition-all ${
                      selectedChat === chat.id && chatType === "individual" 
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-500' 
                        : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className={`w-12 h-12 ${getAvatarColor(chat.name)} rounded-full flex items-center justify-center shadow-sm`}>
                          <span className="text-white text-sm font-semibold">{chat.avatar}</span>
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(chat.status)} rounded-full border-2 border-white`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-semibold text-gray-900 truncate">{chat.name}</h4>
                          <span className="text-xs text-gray-500">{chat.time}</span>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-1">{chat.lastMessage}</p>
                        {chat.unread > 0 && (
                          <div className="flex justify-end">
                            <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                              {chat.unread}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Team/Group Chats
                teams.map((team) => (
                  <div
                    key={team.id}
                    onClick={() => handleGroupClick(team.id)}
                    className={`p-4 border-b border-gray-100/50 cursor-pointer hover:bg-blue-50/50 transition-all ${
                      selectedChat === team.id && chatType === "group" 
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-500' 
                        : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-semibold text-gray-900 truncate">{team.name}</h4>
                          <span className="text-xs text-gray-500">{team.time}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{team.members}</p>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-1">{team.lastMessage}</p>
                        {team.unread > 0 && (
                          <div className="flex justify-end">
                            <span className="bg-purple-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                              {team.unread}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Center - Chat Messages */}
          <div className="flex-1 flex flex-col bg-white/70 backdrop-blur-sm">
            {/* Chat Header */}
            {currentChatData && (
              <div className="p-4 border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className={`w-12 h-12 ${
                        chatType === "group" 
                          ? "bg-gradient-to-br from-indigo-500 to-purple-600" 
                          : getAvatarColor(currentChatData.name)
                      } rounded-full flex items-center justify-center shadow-sm`}>
                        {chatType === "group" ? (
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        ) : (
                          <span className="text-white text-sm font-semibold">{currentChatData.avatar}</span>
                        )}
                      </div>
                      {chatType === "individual" && (
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(currentChatData.status)} rounded-full border-2 border-white`}></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{currentChatData.name}</h3>
                      <p className="text-sm text-gray-600">
                        {chatType === "group" ? currentChatData.members : `${currentChatData.status}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${msg.type === 'sent' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {msg.type === 'received' && (
                      <div className={`w-8 h-8 ${getAvatarColor(msg.senderName || "user")} rounded-full flex items-center justify-center flex-shrink-0 shadow-sm`}>
                        <span className="text-white text-xs font-semibold">{msg.avatar}</span>
                      </div>
                    )}
                    <div className="flex flex-col">
                      {msg.type === 'received' && chatType === 'group' && (
                        <span className="text-xs text-gray-500 mb-1 ml-2">{msg.senderName}</span>
                      )}
                      <div className={`px-4 py-3 rounded-2xl text-sm shadow-sm ${
                        msg.type === 'sent' 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md' 
                          : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
                      }`}>
                        {msg.content}
                      </div>
                      <span className={`text-xs text-gray-500 mt-1 ${msg.type === 'sent' ? 'text-right mr-2' : 'ml-2'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200/50">
              <div className="flex items-center space-x-4">
                <button className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 pr-12 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                <button 
                  onClick={handleSendMessage}
                  className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 shadow-lg mt-12">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex items-center justify-center space-x-12">
              {/* Activity Feed */}
              <div 
                className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-xl hover:bg-gray-50"
                onClick={() => navigate('/dashboard')}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700 font-semibold group-hover:text-blue-600 transition-colors">Activity Feed</span>
              </div>

              {/* Chat - Active */}
              <div className="flex flex-col items-center space-y-2 cursor-pointer p-3 rounded-xl bg-emerald-50">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-xs text-emerald-700 font-semibold">Chat</span>
              </div>

              {/* Files */}
              <div 
                className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-xl hover:bg-gray-50"
                onClick={() => navigate('/files')}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700 font-semibold group-hover:text-amber-600 transition-colors">Files</span>
              </div>

              {/* Meetings */}
              <div className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-xl hover:bg-gray-50">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700 font-semibold group-hover:text-purple-600 transition-colors">Meetings</span>
              </div>

              {/* Reminders */}
              <div 
                className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-xl hover:bg-gray-50"
                onClick={() => navigate('/reminders')}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 1015 0z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700 font-semibold group-hover:text-orange-600 transition-colors">Reminders</span>
              </div>

              {/* E - Forum */}
              <div 
                className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-xl hover:bg-gray-50"
                onClick={() => navigate('/e-forum')}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700 font-semibold group-hover:text-indigo-600 transition-colors">E - Forum</span>
              </div>

              {/* AI2AIM STORE */}
              <div 
                className="flex flex-col items-center space-y-2 cursor-pointer hover:scale-105 transition-all duration-200 group p-3 rounded-xl hover:bg-gray-50"
                onClick={() => navigate('/ai2aim-store')}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700 font-semibold group-hover:text-red-600 transition-colors">AI2AIM STORE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
