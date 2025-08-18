import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FooterNavigation from "@/components/FooterNavigation";
import { useDarkMode } from "@/components/DarkModeProvider";

export default function Chat() {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [selectedChat, setSelectedChat] = useState("");
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");
  const [isTyping, setIsTyping] = useState(false);
  const [footerCollapsed, setFooterCollapsed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const contactList = [
    {
      id: "jack",
      name: "Jack",
      role: "Project Manager",
      time: "1h ago",
      avatar: "JA",
      status: "online",
      hasNewMessage: true,
      isUnread: true,
    },
    {
      id: "pal",
      name: "Pal",
      role: "Finance Associate",
      time: "Last Seen Wednesday 6:33 AM",
      avatar: "PA",
      status: "offline",
      hasNewMessage: false,
      isUnread: false,
    },
    {
      id: "jill",
      name: "Jill",
      role: "Sales Team Lead",
      time: "Last Seen Wednesday 6:33 AM",
      avatar: "JI",
      status: "offline",
      hasNewMessage: false,
      isUnread: false,
    },
    {
      id: "hail",
      name: "Hail",
      role: "Graphic Designer",
      time: "Last Seen Wednesday 8:37 AM",
      avatar: "HA",
      status: "offline",
      hasNewMessage: true,
      isUnread: true,
    },
    {
      id: "phil",
      name: "Phil",
      role: "HR Associate",
      time: "Last Seen Wednesday 6:51 AM",
      avatar: "PH",
      status: "offline",
      hasNewMessage: false,
      isUnread: false,
    },
  ];

  const teamGroups = [
    {
      id: "engineering",
      name: "Engineering Team",
      type: "Private",
      members: 12,
      status: "team",
    },
    {
      id: "design",
      name: "Design Team",
      type: "Private",
      members: 6,
      status: "team",
    },
    {
      id: "teabreak",
      name: "Tea Break",
      type: "Public",
      members: 26,
      status: "team",
    },
  ];

  const tabs = [
    { id: "ALL", label: "ALL", count: 8 },
    { id: "NOT", label: "Not", count: 2 },
    { id: "TEAMS", label: "TEAMS", count: 3 },
  ];

  const currentUser = {
    name: "Kyle",
    role: "HR Associate",
    status: "Active",
  };

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

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const currentScrollY = scrollContainerRef.current.scrollTop;
      const isScrollingDown = currentScrollY > lastScrollY;
      const isScrollingUp = currentScrollY < lastScrollY;

      if (currentScrollY > 50) {
        setFooterCollapsed(isScrollingUp);
      } else {
        setFooterCollapsed(false);
      }

      setLastScrollY(currentScrollY);
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [lastScrollY]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500", 
      "bg-green-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-red-500",
    ];
    return colors[name.length % colors.length];
  };

  return (
    <>
      <Layout>
        <div
          ref={scrollContainerRef}
          className={`fixed inset-0 lg:left-[260px] top-16 overflow-hidden transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
          }`}
        >
          {/* Main Chat Layout */}
          <div
            className={`flex h-full transition-all duration-300`}
          >
            {/* Left Sidebar - Chat List */}
            <div className={`w-64 flex flex-col border-r transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              {/* Header */}
              <div className={`p-3 border-b transition-colors duration-300 ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <h1 className={`text-xs font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    CHATROOM
                  </h1>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`text-[10px] px-2 py-1 h-6 transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    CREATE GROUP ⬜
                  </Button>
                </div>

                {/* Search Bar */}
                <div className="relative mb-3">
                  <input
                    type="text"
                    placeholder="Constructive, anything"
                    className={`w-full px-2 py-1 text-[10px] border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>

                {/* Filter Tabs */}
                <div className="flex space-x-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-2 py-1 text-[10px] font-medium rounded transition-all ${
                        activeTab === tab.id
                          ? isDarkMode
                            ? "bg-blue-600 text-white"
                            : "bg-blue-500 text-white"
                          : isDarkMode
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {tab.label} {tab.count}
                    </button>
                  ))}
                </div>

                {/* Current User Status */}
                <div className="mt-3 flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">K</span>
                  </div>
                  <div>
                    <span className={`text-[10px] font-medium transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {currentUser.name}
                    </span>
                    <span className={`text-[9px] ml-1 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {currentUser.role} {currentUser.status}
                    </span>
                  </div>
                  <div className="flex space-x-1 ml-auto">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`}></div>
                    <button className={`text-[10px] transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                    }`}>
                      ⋯
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact List */}
              <div className="flex-1 overflow-y-auto">
                {contactList.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedChat(contact.id)}
                    className={`p-2 border-b cursor-pointer hover:bg-opacity-50 transition-all ${
                      selectedChat === contact.id
                        ? isDarkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-blue-50 border-blue-200"
                        : isDarkMode
                          ? "border-gray-700 hover:bg-gray-700"
                          : "border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <div
                          className={`w-6 h-6 ${getAvatarColor(contact.name)} rounded-full flex items-center justify-center`}
                        >
                          <span className="text-white text-[9px] font-semibold">
                            {contact.avatar}
                          </span>
                        </div>
                        <div
                          className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 ${getStatusColor(contact.status)} rounded-full border border-white`}
                        ></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-[10px] font-semibold truncate transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {contact.name}
                          </h4>
                          {contact.hasNewMessage && (
                            <div className="flex items-center space-x-1">
                              <span className={`text-[8px] transition-colors duration-300 ${
                                isDarkMode ? 'text-green-400' : 'text-green-600'
                              }`}>
                                New Unread
                              </span>
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <p className={`text-[9px] truncate transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {contact.role}
                        </p>
                        <p className={`text-[8px] truncate transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          {contact.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Team Groups */}
                <div className="mt-2">
                  {teamGroups.map((group) => (
                    <div
                      key={group.id}
                      className={`p-2 border-b cursor-pointer transition-all ${
                        isDarkMode
                          ? "border-gray-700 hover:bg-gray-700"
                          : "border-gray-100 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
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
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={`text-[10px] font-semibold truncate transition-colors duration-300 ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {group.name}
                            </h4>
                            <Button
                              variant="outline"
                              size="sm"
                              className={`text-[8px] px-1.5 py-0.5 h-5 transition-colors duration-300 ${
                                isDarkMode 
                                  ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600'
                                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              ENTER GROUP
                            </Button>
                          </div>
                          <p className={`text-[9px] transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {group.type} • {group.members} Members
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Center - Chat Messages Area */}
            <div className={`flex-1 flex flex-col transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              {/* Chat Area */}
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <svg
                      className={`w-8 h-8 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Start your conversation here
                  </p>
                </div>
              </div>

              {/* Message Input Bar */}
              <div className={`p-3 border-t transition-colors duration-300 ${
                isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
              }`}>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={message}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      placeholder="Type your message here..."
                      className={`w-full px-3 py-2 pr-8 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                    <button className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>
                
                {/* Daily Themes Button */}
                <div className="mt-2 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`text-[10px] px-2 py-1 h-6 transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    DAILY THEMES
                  </Button>
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
