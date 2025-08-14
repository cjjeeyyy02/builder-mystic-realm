import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FooterNavigation from "@/components/FooterNavigation";

export default function Chat() {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState("");
  const [message, setMessage] = useState("");
  const [chatType, setChatType] = useState("individual"); // 'individual' or 'group'
  const [isTyping, setIsTyping] = useState(false);
  const [footerCollapsed, setFooterCollapsed] = useState(false);
  const [rightPanelVisible, setRightPanelVisible] = useState(false);

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
      setIsTyping(false);
      setFooterCollapsed(false);
    }
  };

  const handleInputFocus = () => {
    setIsTyping(true);
    setFooterCollapsed(true);
  };

  const handleInputBlur = () => {
    if (!message.trim()) {
      setIsTyping(false);
      setFooterCollapsed(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (e.target.value.trim()) {
      setFooterCollapsed(true);
    } else {
      setFooterCollapsed(false);
    }
  };

  const handleGroupClick = (groupId: string) => {
    setSelectedChat(groupId);
    setChatType("group");
    setRightPanelVisible(true);
  };

  const handleIndividualClick = (chatId: string) => {
    setSelectedChat(chatId);
    setChatType("individual");
    setRightPanelVisible(true);
  };

  const handleChatTypeChange = (type: string) => {
    setChatType(type);
    setSelectedChat("");
    setRightPanelVisible(false);
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
    <>
      <Layout>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-2 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-gray-900">
              Messages
            </h1>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-200 text-blue-600 hover:bg-blue-50 text-xs px-2 py-1 h-7"
              >
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New
              </Button>
            </div>
          </div>
        </div>

        {/* Main Chat Layout */}
        <div className={`flex transition-all duration-300 ${footerCollapsed ? 'h-[calc(100vh-60px)]' : 'h-[calc(100vh-105px)]'}`}>
          {/* Left Sidebar - Chat List */}
          <div className="w-64 bg-white/70 backdrop-blur-sm border-r border-gray-200/50 flex flex-col">
            {/* Search and Tabs */}
            <div className="p-2 border-b border-gray-200/50">
              <div className="relative mb-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-3 py-2 pl-8 text-xs bg-gray-50/80 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <svg className="w-3 h-3 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              {/* Chat Type Tabs */}
              <div className="flex bg-gray-100/80 rounded-md p-0.5">
                <button
                  onClick={() => handleChatTypeChange("individual")}
                  className={`flex-1 py-1.5 px-2 text-[10px] font-medium rounded transition-all ${
                    chatType === "individual"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Direct
                </button>
                <button
                  onClick={() => handleChatTypeChange("group")}
                  className={`flex-1 py-1.5 px-2 text-[10px] font-medium rounded transition-all ${
                    chatType === "group"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Teams
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
                    className={`p-2 border-b border-gray-100/50 cursor-pointer hover:bg-blue-50/50 transition-all ${
                      selectedChat === chat.id && chatType === "individual"
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-2 border-l-blue-500'
                        : ''
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      <div className="relative">
                        <div className={`w-8 h-8 ${getAvatarColor(chat.name)} rounded-full flex items-center justify-center shadow-sm`}>
                          <span className="text-white text-xs font-semibold">{chat.avatar}</span>
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${getStatusColor(chat.status)} rounded-full border border-white`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="text-xs font-semibold text-gray-900 truncate">{chat.name}</h4>
                          <span className="text-[10px] text-gray-500">{chat.time}</span>
                        </div>
                        <p className="text-[10px] text-gray-600 line-clamp-1 mb-0.5">{chat.lastMessage}</p>
                        {chat.unread > 0 && (
                          <div className="flex justify-end">
                            <span className="bg-blue-500 text-white text-[9px] rounded-full px-1.5 py-0.5 min-w-[16px] text-center">
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
                    className={`p-2 border-b border-gray-100/50 cursor-pointer hover:bg-blue-50/50 transition-all ${
                      selectedChat === team.id && chatType === "group"
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-2 border-l-blue-500'
                        : ''
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      <div className="relative">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="text-xs font-semibold text-gray-900 truncate">{team.name}</h4>
                          <span className="text-[10px] text-gray-500">{team.time}</span>
                        </div>
                        <p className="text-[10px] text-gray-600 mb-1">{team.members}</p>
                        <p className="text-[10px] text-gray-600 line-clamp-1 mb-0.5">{team.lastMessage}</p>
                        {team.unread > 0 && (
                          <div className="flex justify-end">
                            <span className="bg-purple-500 text-white text-[9px] rounded-full px-1.5 py-0.5 min-w-[16px] text-center">
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
          <div className={`flex-1 flex flex-col bg-white/70 backdrop-blur-sm transition-all duration-300 ${
            rightPanelVisible ? 'flex' : 'hidden'
          }`}>
            {/* Chat Header */}
            {currentChatData && (
              <div className="p-2 border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <div className={`w-8 h-8 ${
                        chatType === "group"
                          ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                          : getAvatarColor(currentChatData.name)
                      } rounded-full flex items-center justify-center shadow-sm`}>
                        {chatType === "group" ? (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        ) : (
                          <span className="text-white text-xs font-semibold">{currentChatData.avatar}</span>
                        )}
                      </div>
                      {chatType === "individual" && (
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${getStatusColor(currentChatData.status)} rounded-full border border-white`}></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{currentChatData.name}</h3>
                      <p className="text-xs text-gray-600">
                        {chatType === "group" ? currentChatData.members : `${currentChatData.status}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800 p-1 h-6 w-6">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800 p-1 h-6 w-6">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {currentMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end space-x-1 max-w-xs lg:max-w-md ${msg.type === 'sent' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {msg.type === 'received' && (
                      <div className={`w-6 h-6 ${getAvatarColor(msg.senderName || "user")} rounded-full flex items-center justify-center flex-shrink-0 shadow-sm`}>
                        <span className="text-white text-[10px] font-semibold">{msg.avatar}</span>
                      </div>
                    )}
                    <div className="flex flex-col">
                      {msg.type === 'received' && chatType === 'group' && (
                        <span className="text-[10px] text-gray-500 mb-0.5 ml-1">{msg.senderName}</span>
                      )}
                      <div className={`px-2 py-1.5 rounded-lg text-xs shadow-sm ${
                        msg.type === 'sent'
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm'
                          : 'bg-white text-gray-800 rounded-bl-sm border border-gray-200'
                      }`}>
                        {msg.content}
                      </div>
                      <span className={`text-[10px] text-gray-500 mt-0.5 ${msg.type === 'sent' ? 'text-right mr-1' : 'ml-1'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-2 bg-white/80 backdrop-blur-sm border-t border-gray-200/50">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type message..."
                    className="w-full px-3 py-2 pr-8 text-xs bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 transition-colors">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
      </Layout>

      {/* Footer Navigation */}
      <FooterNavigation collapsed={footerCollapsed} />
    </>
  );
}
