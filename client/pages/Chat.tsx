import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FooterNavigation from "@/components/FooterNavigation";
import { useDarkMode } from "@/components/DarkModeProvider";
import { useSidebar } from "@/contexts/SidebarContext";

export default function Chat() {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const { sidebarCollapsed } = useSidebar();
  const [selectedChat, setSelectedChat] = useState("");
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");
  const [isTyping, setIsTyping] = useState(false);
  const [footerCollapsed, setFooterCollapsed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [groupSaved, setGroupSaved] = useState(false);
  const [showGroupMenu, setShowGroupMenu] = useState(false);
  const [showSidebarGroupMenu, setShowSidebarGroupMenu] = useState<string | null>(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [groupForm, setGroupForm] = useState({
    name: "",
    type: "Private",
    username: "",
    access: "Only Admin"
  });
  const [showEditGroupModal, setShowEditGroupModal] = useState(false);
  const [groupToEdit, setGroupToEdit] = useState(null);
  const [groupMutedStatus, setGroupMutedStatus] = useState<{[key: string]: boolean}>({});
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

  const [teamGroups, setTeamGroups] = useState([
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
  ]);

  const tabs = [
    { id: "ALL", label: "ALL", count: 8 },
    { id: "NOT", label: "NEW", count: 2 },
    { id: "TEAMS", label: "TEAMS", count: 3 },
  ];

  const currentUser = {
    name: "Kyle",
    role: "HR Associate",
    status: "Active",
  };

  // Sample chat messages for different contacts and groups
  const [chatMessages, setChatMessages] = useState({
    jack: [
      {
        id: 1,
        sender: "jack",
        message: "Hi Jay, please kindly come to my cabin at 15:30 PM for an important discussion.",
        time: "Sent 14:32 PM",
        isOwn: false,
      },
      {
        id: 2,
        sender: "me",
        message: "Sure, Kyle, I'll be there. Thanks",
        time: "Sent 14:36 PM",
        isOwn: true,
      },
    ],
    pal: [
      {
        id: 1,
        sender: "pal",
        message: "Hey, did you review the financial reports?",
        time: "Sent 10:30 AM",
        isOwn: false,
      },
    ],
    engineering: [
      {
        id: 1,
        sender: "alex",
        message: "Welcome to the Engineering Team! Let's build amazing things together.",
        time: "Today 09:00 AM",
        isOwn: false,
      },
      {
        id: 2,
        sender: "sarah",
        message: "Looking forward to collaborating with everyone!",
        time: "Today 09:15 AM",
        isOwn: false,
      },
    ],
    design: [
      {
        id: 1,
        sender: "mike",
        message: "Design Team assembled! Ready to create beautiful experiences.",
        time: "Yesterday 02:30 PM",
        isOwn: false,
      },
    ],
    teabreak: [
      {
        id: 1,
        sender: "jenny",
        message: "Anyone up for coffee? ☕",
        time: "Today 11:30 AM",
        isOwn: false,
      },
      {
        id: 2,
        sender: "me",
        message: "Count me in! Meeting room 2?",
        time: "Today 11:32 AM",
        isOwn: true,
      },
    ],
  });

  // Close group menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowGroupMenu(false);
    };

    if (showGroupMenu) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showGroupMenu]);

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      const newMessage = {
        id: Date.now(),
        sender: "me",
        message: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
      };

      setChatMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat as keyof typeof prev] || []), newMessage]
      }));

      console.log("Sending message:", message);
      setMessage("");
      setIsTyping(false);
      setFooterCollapsed(false);

      setTimeout(() => {
        const messagesContainer = document.querySelector('.messages-container');
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      }, 100);
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

  const handleCreateGroup = () => {
    setShowCreateGroupModal(true);
  };

  const handleSaveGroup = () => {
    if (groupForm.name.trim()) {
      const newGroup = {
        id: groupForm.name.toLowerCase().replace(/\s+/g, ''),
        name: groupForm.name,
        type: groupForm.type,
        members: 3,
        status: "team",
      };

      setTeamGroups(prev => [...prev, newGroup]);
      setGroupSaved(true);

      tabs.find(tab => tab.id === "TEAMS")!.count += 1;

      setTimeout(() => {
        setSelectedChat(newGroup.id);
        setActiveTab("TEAMS");
        setShowCreateGroupModal(false);
        setGroupSaved(false);
        setGroupForm({
          name: "",
          type: "Private",
          username: "",
          access: "Only Admin"
        });
      }, 1000);
    }
  };

  const handleSendGroupInvite = () => {
    console.log("Sending group invite:", groupForm);
    handleSaveGroup();
  };

  const handleGoPublic = (groupId: string) => {
    const updatedGroups = teamGroups.map(group =>
      group.id === groupId ? { ...group, type: "Public" } : group
    );
    setTeamGroups(updatedGroups);
    console.log(`Group ${groupId} is now public`);

    const systemMessage = {
      id: Date.now(),
      sender: "system",
      message: `This group is now public. Anyone can join and see the messages.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: false,
    };

    setChatMessages(prev => ({
      ...prev,
      [groupId]: [...(prev[groupId as keyof typeof prev] || []), systemMessage]
    }));
  };

  const handleEditGroup = (groupId: string) => {
    const group = teamGroups.find(g => g.id === groupId);
    if (group) {
      setGroupToEdit(group);
      setGroupForm({
        name: group.name,
        type: group.type,
        username: group.id,
        access: "Only Admin"
      });
      setShowEditGroupModal(true);
    }
  };

  const handleMuteGroup = (groupId: string) => {
    const isMuted = groupMutedStatus[groupId] || false;
    setGroupMutedStatus(prev => ({
      ...prev,
      [groupId]: !isMuted
    }));
    console.log(`Group ${groupId} is now ${!isMuted ? 'muted' : 'unmuted'}`);
  };

  const handleDeleteGroup = (groupId: string) => {
    if (window.confirm('Are you sure you want to delete this group? This action cannot be undone.')) {
      setTeamGroups(prev => prev.filter(group => group.id !== groupId));

      setChatMessages(prev => {
        const newMessages = { ...prev };
        delete newMessages[groupId as keyof typeof newMessages];
        return newMessages;
      });

      if (selectedChat === groupId) {
        setSelectedChat("");
      }

      console.log(`Group ${groupId} has been deleted`);
    }
  };

  const handleSaveGroupEdit = () => {
    if (groupToEdit && groupForm.name.trim()) {
      const updatedGroups = teamGroups.map(group =>
        group.id === groupToEdit.id
          ? { ...group, name: groupForm.name, type: groupForm.type }
          : group
      );
      setTeamGroups(updatedGroups);

      setShowEditGroupModal(false);
      setGroupToEdit(null);
      setGroupForm({
        name: "",
        type: "Private",
        username: "",
        access: "Only Admin"
      });
    }
  };

  const handleEnterGroup = (groupId: string) => {
    setSelectedChat(groupId);
    setActiveTab("TEAMS");

    const group = teamGroups.find(g => g.id === groupId);

    if (group) {
      console.log(`Entering group: ${group.name}`);

      if (!chatMessages[groupId as keyof typeof chatMessages]) {
        const welcomeMessage = {
          id: Date.now(),
          sender: "system",
          message: `Welcome to ${group.name}! You have joined this ${group.type.toLowerCase()} group with ${group.members} members.`,
          time: "Just now",
          isOwn: false,
        };

        setChatMessages(prev => ({
          ...prev,
          [groupId]: [welcomeMessage]
        }));

        setTimeout(() => {
          const messagesContainer = document.querySelector('.messages-container');
          if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
          }
        }, 100);
      }
    }
  };

  const handleCloseModal = () => {
    setShowCreateGroupModal(false);
    setGroupSaved(false);
    setGroupForm({
      name: "",
      type: "Private",
      username: "",
      access: "Only Admin"
    });
  };

  const isGroupChat = teamGroups.some(group => group.id === selectedChat);
  const selectedGroup = teamGroups.find(group => group.id === selectedChat);
  const selectedContact = contactList.find(contact => contact.id === selectedChat);

  return (
    <>
      <Layout>
        <div className={`h-[calc(100vh-4rem)] flex flex-col transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          {/* Chat Header */}
          <Card className={`flex-shrink-0 rounded-none border-0 border-b transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setShowMobileSidebar(!showMobileSidebar)}
                  className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                <div className="flex items-center space-x-4">
                  <h1 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    CHAT ROOM
                  </h1>
                  <div className="hidden sm:flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Active
                    </span>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-md mx-4">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      className={`w-full pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>
                </div>

                <Button
                  variant="default"
                  size="sm"
                  onClick={handleCreateGroup}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="hidden sm:inline">CREATE GROUP</span>
                  <span className="sm:hidden">+</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Chat Container */}
          <div className="flex-1 flex overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {showMobileSidebar && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                onClick={() => setShowMobileSidebar(false)}
              />
            )}

            {/* Sidebar - Contact List */}
            <Card className={`${
              showMobileSidebar ? 'fixed inset-y-0 left-0 z-40' : 'hidden'
            } lg:relative lg:flex w-80 flex-col rounded-none border-0 border-r transition-all duration-300 ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <CardContent className="p-0 h-full flex flex-col">
                {/* Sidebar Header */}
                <div className={`p-4 border-b transition-colors duration-300 ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  {/* Mobile Close Button */}
                  <div className="lg:hidden flex justify-between items-center mb-4">
                    <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Conversations
                    </h2>
                    <button
                      onClick={() => setShowMobileSidebar(false)}
                      className={`p-2 rounded ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex space-x-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                          activeTab === tab.id
                            ? "bg-blue-600 text-white shadow-md"
                            : isDarkMode
                              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {tab.label} ({tab.count})
                      </button>
                    ))}
                  </div>

                  {/* Current User Status */}
                  <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">K</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{currentUser.name}</h3>
                        <p className="text-blue-100 text-sm">{currentUser.role}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-blue-100 text-sm">{currentUser.status}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact List */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-2 space-y-1">
                    {contactList.map((contact) => (
                      <Card
                        key={contact.id}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                          selectedChat === contact.id
                            ? "bg-blue-50 border-blue-200 ring-2 ring-blue-500 ring-opacity-20"
                            : isDarkMode
                              ? "bg-gray-700 border-gray-600 hover:bg-gray-650"
                              : "bg-white border-gray-200 hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          setSelectedChat(contact.id);
                          setShowMobileSidebar(false);
                        }}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <div
                                className={`w-12 h-12 ${getAvatarColor(contact.name)} rounded-full flex items-center justify-center shadow-md`}
                              >
                                <span className="text-white text-sm font-bold">
                                  {contact.avatar}
                                </span>
                              </div>
                              <div
                                className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(contact.status)} rounded-full border-2 border-white`}
                              ></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className={`font-semibold truncate ${
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {contact.name}
                                </h4>
                                {contact.hasNewMessage && (
                                  <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                  </div>
                                )}
                              </div>
                              <p className={`text-sm truncate ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {contact.role}
                              </p>
                              <p className={`text-xs truncate ${
                                isDarkMode ? 'text-gray-500' : 'text-gray-500'
                              }`}>
                                {contact.time}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Team Groups */}
                  <div className="p-2">
                    <h3 className={`px-2 py-2 text-sm font-semibold ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Team Groups
                    </h3>
                    <div className="space-y-1">
                      {teamGroups.map((group) => (
                        <Card
                          key={group.id}
                          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                            selectedChat === group.id
                              ? "bg-purple-50 border-purple-200 ring-2 ring-purple-500 ring-opacity-20"
                              : isDarkMode
                                ? "bg-gray-700 border-gray-600 hover:bg-gray-650"
                                : "bg-white border-gray-200 hover:bg-gray-50"
                          }`}
                          onClick={() => {
                            handleEnterGroup(group.id);
                            setShowMobileSidebar(false);
                          }}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                                <svg
                                  className="w-6 h-6 text-white"
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
                                  <h4 className={`font-semibold truncate flex items-center ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                  }`}>
                                    {group.name}
                                    {groupMutedStatus[group.id] && (
                                      <svg className="w-4 h-4 ml-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                      </svg>
                                    )}
                                  </h4>
                                  <div className="flex items-center space-x-1">
                                    {/* Three dots removed from team groups cards */}
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {group.type} • {group.members} Members
                                  </p>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEnterGroup(group.id);
                                      setShowMobileSidebar(false);
                                    }}
                                    className="text-xs px-2 py-1 h-6"
                                  >
                                    ENTER GROUP
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {/* Sidebar group context menu removed */}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <Card className={`flex-shrink-0 rounded-none border-0 border-b transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            {isGroupChat ? (
                              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                              </div>
                            ) : (
                              <>
                                <div className={`w-12 h-12 ${getAvatarColor(selectedContact?.name || '')} rounded-full flex items-center justify-center shadow-md`}>
                                  <span className="text-white text-sm font-bold">
                                    {selectedContact?.avatar}
                                  </span>
                                </div>
                                <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(selectedContact?.status || 'offline')} rounded-full border-2 border-white`}></div>
                              </>
                            )}
                          </div>
                          <div>
                            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {isGroupChat ? selectedGroup?.name : selectedContact?.name}
                            </h3>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {isGroupChat
                                ? `${selectedGroup?.members} Members • ${selectedGroup?.type} Group`
                                : `${selectedContact?.role} • ${selectedContact?.status === 'online' ? 'Active now' : selectedContact?.time}`
                              }
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="hidden sm:flex">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </Button>
                          <Button variant="outline" size="sm" className="hidden sm:flex">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </Button>
                          {isGroupChat && (
                            <div className="relative">
                              <button
                                onClick={() => setShowGroupMenu(!showGroupMenu)}
                                className={`p-2 rounded-lg transition-colors ${
                                  isDarkMode ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                              </button>

                              {/* Group Context Menu - Responsive */}
                              {showGroupMenu && (
                                <div className={`absolute right-0 sm:right-0 top-12 w-48 sm:w-40 shadow-xl border-2 z-50 rounded-lg transition-all duration-300 ${
                                  isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'
                                } transform sm:transform-none -translate-x-4 sm:translate-x-0`}>
                                  <div className="py-2">
                                    <button
                                      onClick={() => {
                                        handleGoPublic(selectedChat);
                                        setShowGroupMenu(false);
                                      }}
                                      className={`w-full text-left px-3 sm:px-4 py-3 sm:py-2 text-sm sm:text-sm font-medium border-b transition-colors ${
                                        isDarkMode
                                          ? 'text-gray-200 hover:bg-gray-700 border-gray-600'
                                          : 'text-gray-800 hover:bg-gray-50 border-gray-200'
                                      }`}
                                    >
                                      <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-2 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        Go Public
                                      </span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        handleEditGroup(selectedChat);
                                        setShowGroupMenu(false);
                                      }}
                                      className={`w-full text-left px-3 sm:px-4 py-3 sm:py-2 text-sm sm:text-sm font-medium border-b transition-colors ${
                                        isDarkMode
                                          ? 'text-gray-200 hover:bg-gray-700 border-gray-600'
                                          : 'text-gray-800 hover:bg-gray-50 border-gray-200'
                                      }`}
                                    >
                                      <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-2 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit Group
                                      </span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        handleMuteGroup(selectedChat);
                                        setShowGroupMenu(false);
                                      }}
                                      className={`w-full text-left px-3 sm:px-4 py-3 sm:py-2 text-sm sm:text-sm font-medium border-b transition-colors ${
                                        isDarkMode
                                          ? 'text-gray-200 hover:bg-gray-700 border-gray-600'
                                          : 'text-gray-800 hover:bg-gray-50 border-gray-200'
                                      }`}
                                    >
                                      <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-2 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={groupMutedStatus[selectedChat] ? "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" : "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"} />
                                        </svg>
                                        {groupMutedStatus[selectedChat] ? 'Unmute Group' : 'Mute Group'}
                                      </span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        handleDeleteGroup(selectedChat);
                                        setShowGroupMenu(false);
                                      }}
                                      className={`w-full text-left px-3 sm:px-4 py-3 sm:py-2 text-sm sm:text-sm font-medium transition-colors ${
                                        isDarkMode
                                          ? 'text-red-400 hover:bg-gray-700'
                                          : 'text-red-600 hover:bg-gray-50'
                                      }`}
                                    >
                                      <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-2 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete Group
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 messages-container">
                    {(chatMessages[selectedChat as keyof typeof chatMessages] || []).map((msg) => (
                      <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                          msg.isOwn
                            ? 'bg-blue-600 text-white'
                            : isDarkMode
                              ? 'bg-gray-700 text-gray-200'
                              : 'bg-white text-gray-900 border border-gray-200'
                        }`}>
                          <p className="text-sm leading-relaxed">{msg.message}</p>
                          <p className={`text-xs mt-2 ${
                            msg.isOwn
                              ? 'text-blue-100'
                              : isDarkMode
                                ? 'text-gray-400'
                                : 'text-gray-500'
                          }`}>
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input Bar */}
                  <Card className={`flex-shrink-0 rounded-none border-0 border-t transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <button className={`p-2 rounded-lg transition-colors ${
                          isDarkMode ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                            placeholder="Type your message..."
                            className={`w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                              isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                          />
                        </div>

                        <button
                          onClick={handleSendMessage}
                          disabled={!message.trim()}
                          className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                /* No Chat Selected */
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <svg
                        className={`w-12 h-12 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}
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
                    <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Welcome to Chat Center
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Select a conversation to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>

      {/* Create Group Modal */}
      {showCreateGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className={`w-full max-w-md mx-auto shadow-2xl ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
              <h2 className="text-lg font-bold">Create New Group</h2>
              <button
                onClick={handleCloseModal}
                className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <CardContent className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Group Name
                </label>
                <input
                  type="text"
                  value={groupForm.name}
                  onChange={(e) => setGroupForm({...groupForm, name: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter group name"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Group Type
                </label>
                <select
                  value={groupForm.type}
                  onChange={(e) => setGroupForm({...groupForm, type: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Group Username
                </label>
                <input
                  type="text"
                  value={groupForm.username}
                  onChange={(e) => setGroupForm({...groupForm, username: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Group Access
                </label>
                <select
                  value={groupForm.access}
                  onChange={(e) => setGroupForm({...groupForm, access: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="Only Admin">Only Admin</option>
                  <option value="All Members">All Members</option>
                  <option value="Moderators">Moderators</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4">
                {groupSaved ? (
                  <Button disabled className="bg-green-500 text-white cursor-not-allowed">
                    Group Saved ✓
                  </Button>
                ) : (
                  <Button
                    onClick={handleSaveGroup}
                    disabled={!groupForm.name.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                  >
                    Save Group
                  </Button>
                )}
                <Button
                  onClick={handleSendGroupInvite}
                  disabled={!groupSaved}
                  className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                >
                  Send Invite
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Group Modal */}
      {showEditGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className={`w-full max-w-md mx-auto shadow-2xl ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
              <h2 className="text-lg font-bold">Edit Group</h2>
              <button
                onClick={() => setShowEditGroupModal(false)}
                className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <CardContent className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Group Name
                </label>
                <input
                  type="text"
                  value={groupForm.name}
                  onChange={(e) => setGroupForm({...groupForm, name: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter group name"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Group Type
                </label>
                <select
                  value={groupForm.type}
                  onChange={(e) => setGroupForm({...groupForm, type: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowEditGroupModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveGroupEdit}
                  disabled={!groupForm.name.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <FooterNavigation collapsed={footerCollapsed} />
    </>
  );
}
