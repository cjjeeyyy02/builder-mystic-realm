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
    { id: "NOT", label: "Not", count: 2 },
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
    // Default group messages
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
    // Dynamically created groups will be added here
    threemusketeers: [
      {
        id: 1,
        sender: "me",
        message: "Welcome to our new group! Ready to start collaborating?",
        time: "Just now",
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

      // Add message to the selected chat
      setChatMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat as keyof typeof prev] || []), newMessage]
      }));

      console.log("Sending message:", message);
      setMessage("");
      setIsTyping(false);
      setFooterCollapsed(false);

      // Auto-scroll to bottom
      setTimeout(() => {
        const messagesContainer = document.querySelector('.overflow-y-auto.p-4.space-y-4');
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
      // Add new group to the teams list
      const newGroup = {
        id: groupForm.name.toLowerCase().replace(/\s+/g, ''),
        name: groupForm.name,
        type: groupForm.type,
        members: 3, // Start with creator + sample members
        status: "team",
      };

      setTeamGroups(prev => [...prev, newGroup]);
      setGroupSaved(true);

      // Update tabs count (assuming new group increases TEAMS count)
      tabs.find(tab => tab.id === "TEAMS")!.count += 1;

      // Auto-select the new group and close modal after a brief delay
      setTimeout(() => {
        setSelectedChat(newGroup.id);
        setActiveTab("TEAMS");
        setShowCreateGroupModal(false);
        setGroupSaved(false);
        // Reset form
        setGroupForm({
          name: "",
          type: "Private",
          username: "",
          access: "Only Admin"
        });
      }, 1000); // 1 second delay to show the "GROUP SAVED" state
    }
  };

  const handleSendGroupInvite = () => {
    console.log("Sending group invite:", groupForm);
    handleSaveGroup(); // Save first, then send invite
  };

  // Function to handle making a group public
  const handleGoPublic = (groupId: string) => {
    const updatedGroups = teamGroups.map(group =>
      group.id === groupId ? { ...group, type: "Public" } : group
    );
    setTeamGroups(updatedGroups);
    console.log(`Group ${groupId} is now public`);

    // Add system message about group going public
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

  // Function to handle editing a group
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

  // Function to handle muting a group
  const handleMuteGroup = (groupId: string) => {
    const isMuted = groupMutedStatus[groupId] || false;
    setGroupMutedStatus(prev => ({
      ...prev,
      [groupId]: !isMuted
    }));
    console.log(`Group ${groupId} is now ${!isMuted ? 'muted' : 'unmuted'}`);

    // Add system message about muting
    const systemMessage = {
      id: Date.now(),
      sender: "system",
      message: `You have ${!isMuted ? 'muted' : 'unmuted'} this group. ${!isMuted ? 'You will not receive notifications.' : 'You will now receive notifications.'}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: false,
    };

    setChatMessages(prev => ({
      ...prev,
      [groupId]: [...(prev[groupId as keyof typeof prev] || []), systemMessage]
    }));
  };

  // Function to handle deleting a group
  const handleDeleteGroup = (groupId: string) => {
    if (window.confirm('Are you sure you want to delete this group? This action cannot be undone.')) {
      // Remove group from teams list
      setTeamGroups(prev => prev.filter(group => group.id !== groupId));

      // Remove chat messages for this group
      setChatMessages(prev => {
        const newMessages = { ...prev };
        delete newMessages[groupId as keyof typeof newMessages];
        return newMessages;
      });

      // If this group was selected, clear selection
      if (selectedChat === groupId) {
        setSelectedChat("");
      }

      console.log(`Group ${groupId} has been deleted`);
    }
  };

  // Function to handle saving group edits
  const handleSaveGroupEdit = () => {
    if (groupToEdit && groupForm.name.trim()) {
      const updatedGroups = teamGroups.map(group =>
        group.id === groupToEdit.id
          ? { ...group, name: groupForm.name, type: groupForm.type }
          : group
      );
      setTeamGroups(updatedGroups);

      // Add system message about group update
      const systemMessage = {
        id: Date.now(),
        sender: "system",
        message: `Group has been updated. New name: "${groupForm.name}", Type: ${groupForm.type}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: false,
      };

      setChatMessages(prev => ({
        ...prev,
        [groupToEdit.id]: [...(prev[groupToEdit.id as keyof typeof prev] || []), systemMessage]
      }));

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

  // Function to handle entering a group chat
  const handleEnterGroup = (groupId: string) => {
    // Set the selected chat to the group
    setSelectedChat(groupId);
    setActiveTab("TEAMS");

    // Get the group information
    const group = teamGroups.find(g => g.id === groupId);

    if (group) {
      console.log(`Entering group: ${group.name}`);
      console.log(`Group Type: ${group.type}`);
      console.log(`Members: ${group.members}`);

      // Initialize group chat if it doesn't exist in chatMessages
      if (!chatMessages[groupId as keyof typeof chatMessages]) {
        // Add welcome message for the group
        const welcomeMessage = {
          id: Date.now(),
          sender: "system",
          message: `Welcome to ${group.name}! You have joined this ${group.type.toLowerCase()} group with ${group.members} members.`,
          time: "Just now",
          isOwn: false,
        };

        // Add the new group chat to the messages state
        setChatMessages(prev => ({
          ...prev,
          [groupId]: [welcomeMessage]
        }));

        console.log("Initialized group chat with welcome message");
      }

      // Mark group as active/entered - you could add visual indicators here
      console.log(`Successfully entered ${group.name} group chat`);

      // Additional functionality when entering a group:
      // - Scroll to bottom of messages
      setTimeout(() => {
        const messagesContainer = document.querySelector('.overflow-y-auto.p-4.space-y-4');
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      }, 100);

      // - Show notification that user joined (could be added to group chat)
      if (chatMessages[groupId as keyof typeof chatMessages]?.length > 0) {
        const joinMessage = {
          id: Date.now() + 1,
          sender: "system",
          message: `${currentUser.name} has joined the group`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: false,
        };

        // Add join notification to existing group chat
        setTimeout(() => {
          setChatMessages(prev => ({
            ...prev,
            [groupId]: [...(prev[groupId as keyof typeof prev] || []), joinMessage]
          }));
        }, 500);
      }
    }
  };

  const handleCloseModal = () => {
    setShowCreateGroupModal(false);
    setGroupSaved(false);
    // Reset form
    setGroupForm({
      name: "",
      type: "Private",
      username: "",
      access: "Only Admin"
    });
  };

  // Check if selected chat is a group
  const isGroupChat = teamGroups.some(group => group.id === selectedChat);
  const selectedGroup = teamGroups.find(group => group.id === selectedChat);
  const selectedContact = contactList.find(contact => contact.id === selectedChat);

  return (
    <>
      <Layout>
        <div
          ref={scrollContainerRef}
          className={`-m-4 lg:-m-8 h-[calc(100vh-4rem)] overflow-hidden transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
          }`}
        >
          {/* Top Header Bar */}
          <div className={`flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3 border-b transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileSidebar(!showMobileSidebar)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <h1 className={`text-xs sm:text-sm font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              CHATROOM
            </h1>

            {/* Center Search Bar */}
            <div className="flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-4">
              <input
                type="text"
                placeholder="Search..."
                className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleCreateGroup}
              className={`text-xs px-2 sm:px-3 py-1.5 sm:py-2 h-7 sm:h-8 transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="hidden sm:inline">CREATE GROUP</span>
              <span className="sm:hidden">+</span>
            </Button>
          </div>

          {/* Main Chat Layout */}
          <div
            className={`flex flex-1 transition-all duration-300`}
          >
            {/* Left Sidebar - Chat List */}
            <div className={`${
              showMobileSidebar ? 'fixed inset-y-0 left-0 z-40' : 'hidden'
            } md:relative md:flex w-64 sm:w-72 md:w-64 lg:w-72 flex-col border-r transition-all duration-300 ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}>
              {/* Sidebar Header */}
              <div className={`p-2 sm:p-3 border-b transition-colors duration-300 ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                {/* Mobile Close Button */}
                <div className="md:hidden flex justify-between items-center mb-3">
                  <h2 className={`text-sm font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Chats</h2>
                  <button
                    onClick={() => setShowMobileSidebar(false)}
                    className={`p-1 rounded ${
                      isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                    }`}
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
                      onClick={() => handleEnterGroup(group.id)}
                      className={`p-2 border-b cursor-pointer transition-all ${
                        selectedChat === group.id
                          ? isDarkMode
                            ? "bg-gray-700 border-gray-600"
                            : "bg-blue-50 border-blue-200"
                          : isDarkMode
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
                            <h4 className={`text-[10px] font-semibold truncate transition-colors duration-300 flex items-center ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {group.name}
                              {groupMutedStatus[group.id] && (
                                <svg className="w-3 h-3 ml-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                </svg>
                              )}
                            </h4>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEnterGroup(group.id)}
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
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className={`flex items-center justify-between px-4 py-3 border-b transition-colors duration-300 ${
                    isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        {isGroupChat ? (
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                        ) : (
                          <>
                            <div className={`w-8 h-8 ${getAvatarColor(selectedContact?.name || '')} rounded-full flex items-center justify-center`}>
                              <span className="text-white text-xs font-semibold">
                                {selectedContact?.avatar}
                              </span>
                            </div>
                            <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 ${getStatusColor(selectedContact?.status || 'offline')} rounded-full border border-white`}></div>
                          </>
                        )}
                      </div>
                      <div>
                        <h3 className={`text-sm font-semibold transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {isGroupChat ? selectedGroup?.name : selectedContact?.name}
                        </h3>
                        <p className={`text-xs transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {isGroupChat
                            ? `${selectedGroup?.members} Members ${selectedGroup?.type} Active`
                            : `${selectedContact?.role} Active`
                          }
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 relative">
                      {isGroupChat ? (
                        <>
                          <button className="p-2 bg-green-500 rounded-full hover:bg-green-600 transition-colors">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </button>
                          <button className="p-2 bg-green-500 rounded-full hover:bg-green-600 transition-colors">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => setShowGroupMenu(!showGroupMenu)}
                            className={`p-2 rounded-full transition-colors ${
                              isDarkMode ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>

                          {/* Group Context Menu */}
                          {showGroupMenu && (
                            <div className={`absolute right-0 top-12 w-36 shadow-xl border-2 z-50 transition-all duration-300 ${
                              isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'
                            }`}>
                              <div className="py-2">
                                <button
                                  onClick={() => {
                                    handleGoPublic(selectedChat);
                                    setShowGroupMenu(false);
                                  }}
                                  className={`w-full text-left px-4 py-2 text-sm font-medium border-b transition-colors ${
                                    isDarkMode
                                      ? 'text-gray-200 hover:bg-gray-700 border-gray-600'
                                      : 'text-gray-800 hover:bg-gray-50 border-gray-200'
                                  }`}
                                >
                                  Go Public
                                </button>
                                <button
                                  onClick={() => {
                                    handleEditGroup(selectedChat);
                                    setShowGroupMenu(false);
                                  }}
                                  className={`w-full text-left px-4 py-2 text-sm font-medium border-b transition-colors ${
                                    isDarkMode
                                      ? 'text-gray-200 hover:bg-gray-700 border-gray-600'
                                      : 'text-gray-800 hover:bg-gray-50 border-gray-200'
                                  }`}
                                >
                                  Edit Group
                                </button>
                                <button
                                  onClick={() => {
                                    handleMuteGroup(selectedChat);
                                    setShowGroupMenu(false);
                                  }}
                                  className={`w-full text-left px-4 py-2 text-sm font-medium border-b transition-colors ${
                                    isDarkMode
                                      ? 'text-gray-200 hover:bg-gray-700 border-gray-600'
                                      : 'text-gray-800 hover:bg-gray-50 border-gray-200'
                                  }`}
                                >
                                  {groupMutedStatus[selectedChat] ? 'Unmute Group' : 'Mute Group'}
                                </button>
                                <button
                                  onClick={() => {
                                    handleDeleteGroup(selectedChat);
                                    setShowGroupMenu(false);
                                  }}
                                  className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                                    isDarkMode
                                      ? 'text-red-400 hover:bg-gray-700'
                                      : 'text-red-600 hover:bg-gray-50'
                                  }`}
                                >
                                  Delete Group
                                </button>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <button className="p-2 bg-green-500 rounded-full hover:bg-green-600 transition-colors">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </button>
                          <button className="p-2 bg-green-500 rounded-full hover:bg-green-600 transition-colors">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                          <button className={`p-2 rounded-full transition-colors ${
                            isDarkMode ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                          }`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {(chatMessages[selectedChat as keyof typeof chatMessages] || []).map((msg) => (
                      <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.isOwn
                            ? 'bg-blue-500 text-white'
                            : isDarkMode
                              ? 'bg-gray-700 text-gray-200'
                              : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{msg.message}</p>
                          <p className={`text-xs mt-1 ${
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
                </>
              ) : (
                /* No Chat Selected */
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
              )}

              {/* Message Input Bar - Only show when chat is selected */}
              {selectedChat && (
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

                  {/* Chat Themes Button */}
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
                      CHAT THEMES
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>

      {/* Create Group Modal */}
      {showCreateGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`bg-white rounded-lg shadow-xl w-96 max-w-md mx-4 transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            {/* Modal Header */}
            <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
              <h2 className="text-lg font-bold">CREATE YOUR GROUP HERE</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCloseModal}
                  className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <button
                  onClick={handleCloseModal}
                  className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Group Name */}
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  GROUP NAME:
                </label>
                <input
                  type="text"
                  value={groupForm.name}
                  onChange={(e) => setGroupForm({...groupForm, name: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter group name"
                />
              </div>

              {/* Group Type */}
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  GROUP TYPE:
                </label>
                <select
                  value={groupForm.type}
                  onChange={(e) => setGroupForm({...groupForm, type: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                </select>
              </div>

              {/* Group Username */}
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  GROUP USERNAME:
                </label>
                <input
                  type="text"
                  value={groupForm.username}
                  onChange={(e) => setGroupForm({...groupForm, username: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter username"
                />
              </div>

              {/* Group Access */}
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  GROUP ACCESS:
                </label>
                <select
                  value={groupForm.access}
                  onChange={(e) => setGroupForm({...groupForm, access: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="Only Admin">Only Admin</option>
                  <option value="All Members">All Members</option>
                  <option value="Moderators">Moderators</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t flex items-center justify-end space-x-3 rounded-b-lg">
              {groupSaved ? (
                <Button
                  disabled
                  className="px-4 py-2 text-sm bg-green-500 text-white cursor-not-allowed"
                >
                  GROUP SAVED
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={handleSaveGroup}
                  disabled={!groupForm.name.trim()}
                  className={`px-4 py-2 text-sm transition-colors duration-300 ${
                    !groupForm.name.trim()
                      ? 'opacity-50 cursor-not-allowed'
                      : isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  SAVE GROUP
                </Button>
              )}
              <Button
                onClick={handleSendGroupInvite}
                disabled={!groupSaved}
                className={`px-4 py-2 text-sm transition-colors duration-300 ${
                  !groupSaved
                    ? 'opacity-50 cursor-not-allowed bg-gray-400'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                SEND GROUP INVITE
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Group Modal */}
      {showEditGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`bg-white rounded-lg shadow-xl w-96 max-w-md mx-4 transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            {/* Modal Header */}
            <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
              <h2 className="text-lg font-bold">EDIT GROUP</h2>
              <button
                onClick={() => setShowEditGroupModal(false)}
                className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Group Name */}
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  GROUP NAME:
                </label>
                <input
                  type="text"
                  value={groupForm.name}
                  onChange={(e) => setGroupForm({...groupForm, name: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter group name"
                />
              </div>

              {/* Group Type */}
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  GROUP TYPE:
                </label>
                <select
                  value={groupForm.type}
                  onChange={(e) => setGroupForm({...groupForm, type: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                </select>
              </div>

              {/* Current Group Info */}
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <strong>Current Group:</strong> {groupToEdit?.name}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <strong>Members:</strong> {groupToEdit?.members}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t flex items-center justify-end space-x-3 rounded-b-lg">
              <Button
                variant="outline"
                onClick={() => setShowEditGroupModal(false)}
                className={`px-4 py-2 text-sm transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                CANCEL
              </Button>
              <Button
                onClick={handleSaveGroupEdit}
                disabled={!groupForm.name.trim()}
                className={`px-4 py-2 text-sm transition-colors duration-300 ${
                  !groupForm.name.trim()
                    ? 'opacity-50 cursor-not-allowed bg-gray-400'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                SAVE CHANGES
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation - hide when sidebar is collapsed */}
      <FooterNavigation collapsed={footerCollapsed} />
    </>
  );
}
