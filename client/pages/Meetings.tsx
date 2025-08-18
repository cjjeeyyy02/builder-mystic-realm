import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FooterNavigation from "@/components/FooterNavigation";
import { useDarkMode } from "@/components/DarkModeProvider";

export default function Meetings() {
  const { isDarkMode } = useDarkMode();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showCreateMeetingModal, setShowCreateMeetingModal] = useState(false);
  const [meetingInProgress, setMeetingInProgress] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [transcriptionText, setTranscriptionText] = useState("Welcome to the Q3 Campaign Timelines meeting. We have 20+ participants joining today's session...");
  const [meetingForm, setMeetingForm] = useState({
    title: "",
    info: "",
    date: new Date().toLocaleDateString('en-CA'),
    timeFrom: "",
    timeFromPeriod: "AM",
    timeTo: "",
    timeToPeriod: "AM",
    chair: "",
    invite: ""
  });

  const handleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      console.log("Recording started");
    } else if (!isPaused) {
      setIsPaused(true);
      console.log("Recording paused");
    } else {
      setIsPaused(false);
      console.log("Recording resumed");
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    console.log("Recording stopped");
  };

  const handleCreateMeeting = () => {
    setShowCreateMeetingModal(true);
  };

  const handleMeetingFormChange = (field: string, value: string) => {
    setMeetingForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleScheduleMeetingSubmit = () => {
    if (!meetingForm.title || !meetingForm.timeFrom || !meetingForm.timeTo) {
      alert("Please fill in all required fields (Title, From Time, To Time)");
      return;
    }

    console.log("Scheduling meeting:", meetingForm);
    
    // Start the meeting immediately
    setMeetingInProgress(true);
    setShowCreateMeetingModal(false);
    
    // Reset form
    setMeetingForm({
      title: "",
      info: "",
      date: new Date().toLocaleDateString('en-CA'),
      timeFrom: "",
      timeFromPeriod: "AM",
      timeTo: "",
      timeToPeriod: "AM",
      chair: "",
      invite: ""
    });
  };

  const handleCloseModal = () => {
    setShowCreateMeetingModal(false);
  };

  const handleEndMeeting = () => {
    if (window.confirm("Are you sure you want to end this meeting?")) {
      setMeetingInProgress(false);
      setIsRecording(false);
      setIsPaused(false);
      console.log("Meeting ended");
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    console.log(isMuted ? "Unmuted" : "Muted");
  };

  const handleVideoToggle = () => {
    setIsVideoOff(!isVideoOff);
    console.log(isVideoOff ? "Video on" : "Video off");
  };

  const handleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    console.log(isScreenSharing ? "Screen share stopped" : "Screen share started");
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      console.log("Sending chat message:", chatMessage);
      setChatMessage("");
    }
  };

  const handleMeetingInvite = () => {
    const inviteLink = `Meeting Link: https://meet.company.com/q3-campaign-timelines-${Date.now()}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      alert("Meeting invite link copied to clipboard!");
    }).catch(() => {
      alert(`Meeting Invite Link:\n${inviteLink}`);
    });
  };

  const handleScheduleMeeting = () => {
    console.log("Scheduling meeting...");
    alert("Meeting scheduling interface will open here!");
  };

  const handleTakeScreenshot = () => {
    console.log("Taking screenshot...");
    alert("Screenshot captured and saved to Files!");
  };

  const handleAskQuestion = () => {
    const question = prompt("What would you like to ask?");
    if (question) {
      console.log("Question asked:", question);
      alert("Your question has been submitted!");
    }
  };

  const handleMakeNotes = () => {
    console.log("Opening notes feature...");
    alert("AI note-taking will help generate meeting notes and PDF!");
  };

  const features = [
    {
      id: "record",
      title: "REC",
      description: "You can record the whole meeting. You can pause the recording anytime you want and resume the recording as per your choice.",
      icon: "🎥",
      color: "from-red-500 to-red-600",
      bgColor: isDarkMode ? "bg-red-500/20" : "bg-red-50",
      action: handleRecording
    },
    {
      id: "schedule",
      title: "One-On-One Meeting/Group-Team Meeting",
      description: "Schedule Your Meeting Here",
      icon: "👥",
      color: "from-orange-500 to-orange-600", 
      bgColor: isDarkMode ? "bg-orange-500/20" : "bg-orange-50",
      action: handleScheduleMeeting
    },
    {
      id: "notes",
      title: "Make Notes",
      description: "Make notes for yourself during the meeting by asking AI to prepare the meeting notes and generate a PDF. You can use the translate option to see the content in local language.",
      icon: "📝",
      color: "from-yellow-500 to-yellow-600",
      bgColor: isDarkMode ? "bg-yellow-500/20" : "bg-yellow-50",
      action: handleMakeNotes
    }
  ];

  const bottomFeatures = [
    {
      id: "screenshot",
      title: "Live Screenshots",
      description: "Take live screenshots during the meeting and save to under files as JPG or PNG or IMG",
      icon: "📸",
      color: "from-blue-500 to-blue-600",
      bgColor: isDarkMode ? "bg-blue-500/20" : "bg-blue-50",
      action: handleTakeScreenshot
    },
    {
      id: "questions",
      title: "Ask Questions",
      description: "You can ask any question during the meeting by clicking on the \"Ask A Question\" button.",
      icon: "❓",
      color: "from-red-500 to-red-600",
      bgColor: isDarkMode ? "bg-red-500/20" : "bg-red-50",
      action: handleAskQuestion
    },
    {
      id: "collaborate",
      title: "Real-time Collaboration",
      description: "You can ask any question during the meeting by clicking on the \"Ask A Question\" button.",
      icon: "📡",
      color: "from-yellow-500 to-yellow-600",
      bgColor: isDarkMode ? "bg-yellow-500/20" : "bg-yellow-50",
      action: handleAskQuestion
    }
  ];

  return (
    <>
      <Layout>
        <div className={`min-h-screen transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        } ${meetingInProgress ? 'p-0' : 'p-4 sm:p-6 overflow-y-auto pb-footer'}`}>
          
          {meetingInProgress ? (
            /* Meeting In Progress Interface */
            <div className="h-screen flex flex-col">
              {/* Meeting Header */}
              <div className={`flex items-center justify-between px-4 py-2 border-b transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center space-x-4">
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Q3 CAMPAIGN TIMELINES
                  </span>
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    MEETING IN PROGRESS
                  </span>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    20+ PARTICIPANTS
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                    <span className="text-white text-sm">↻</span>
                  </button>
                  <button 
                    onClick={handleEndMeeting}
                    className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <span className="text-white text-sm">×</span>
                  </button>
                </div>
              </div>

              {/* Main Meeting Content */}
              <div className="flex-1 flex">
                {/* Left Side - Video Grid */}
                <div className="flex-1 p-4">
                  <div className="grid grid-cols-4 gap-2 h-full">
                    {/* Main Speaker */}
                    <div className="col-span-1 row-span-2">
                      <div className={`w-full h-full rounded-lg border-2 border-blue-500 flex items-center justify-center ${
                        isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                      }`}>
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Participant Grid */}
                    {Array.from({ length: 12 }, (_, index) => (
                      <div key={index} className={`rounded-lg border flex items-center justify-center aspect-square ${
                        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
                      }`}>
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side - Panels */}
                <div className="w-80 border-l flex flex-col">
                  {/* Live Transcription */}
                  <div className={`flex-1 border-b transition-colors duration-300 ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <div className={`p-3 border-b transition-colors duration-300 ${
                      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          LIVE TRANSCRIPTION MAKER
                        </h3>
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">?</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 h-48 overflow-y-auto">
                      <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {transcriptionText}
                      </p>
                    </div>
                  </div>

                  {/* Live Chat */}
                  <div className="flex-1">
                    <div className={`p-3 border-b transition-colors duration-300 ${
                      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          LIVE CHAT
                        </h3>
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">?</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 p-3">
                      <div className="h-48 overflow-y-auto mb-3">
                        <div className="space-y-2">
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <span className="font-semibold">John:</span> Great presentation!
                          </div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <span className="font-semibold">Sarah:</span> I have a question about Q4 plans
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type your message..."
                          className={`flex-1 px-2 py-1 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-300 ${
                            isDarkMode
                              ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        />
                        <button
                          onClick={handleSendMessage}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors duration-300"
                        >
                          ➤
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Meeting Controls Bottom */}
              <div className={`px-4 py-3 border-t transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                {/* Action Buttons */}
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <Button
                    onClick={handleMeetingInvite}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm font-semibold rounded-lg transition-colors duration-300"
                  >
                    MEETING INVITE
                  </Button>
                  <Button
                    onClick={handleEndMeeting}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 text-sm font-semibold rounded-lg transition-colors duration-300"
                  >
                    END MEETING
                  </Button>
                </div>

                {/* Control Bar */}
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={handleMuteToggle}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'
                    }`}
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d={isMuted ? "M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-3.87-3.13-7-7-7S1 1.13 1 5v6.17l2.83 2.83c.69-.81 1.79-1.33 3.17-1.33 2.76 0 5 2.24 5 5 0 .28-.03.56-.08.83l2.23 2.23c.27-.62.43-1.31.43-2.05V11h1.7c.3 0 .56-.25.56-.56S19.3 10 19 10z" : "M12 2c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2s-2-.9-2-2V4c0-1.1.9-2 2-2zm5.3 6c0 3-2.54 5.1-5.3 5.1S6.7 11 6.7 8H5c0 3.41 2.72 6.23 6 6.72V17h2v-2.28c3.28-.48 6-3.3 6-6.72h-1.7z"} />
                    </svg>
                  </button>

                  <button
                    onClick={handleVideoToggle}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'
                    }`}
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d={isVideoOff ? "M21 6.5l-4 4V7c0-.55-.45-1-1-1H9.82l8.18 8.18V6.5zM3.27 2L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.55-.18L19.73 21 21 19.73 3.27 2z" : "M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"} />
                    </svg>
                  </button>

                  <button
                    onClick={handleScreenShare}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isScreenSharing ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'
                    }`}
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 5h16v11H4V5z"/>
                    </svg>
                  </button>

                  <button
                    onClick={handleRecording}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'
                    }`}
                  >
                    <span className="text-white text-sm font-bold">REC</span>
                  </button>

                  <button className="w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l1.42 1.42L8.83 15H13v-2.17l-1.59-1.59L12.83 10H18V8.83l-4.59-4.59c-.78-.78-2.05-.78-2.83 0L6 8.83 9 12zm6-2h2v2h-2v-2z"/>
                    </svg>
                  </button>

                  <button className="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300">
                    <span className="text-white text-sm font-bold">REC</span>
                  </button>

                  <button className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Meeting Hub Interface */
            <>
              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Meeting Hub
                </h1>
                <p className={`text-lg transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Professional meeting management with advanced features
                </p>
              </div>

              {/* Top Features Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {features.map((feature) => (
                  <Card 
                    key={feature.id}
                    className={`cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                      isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={feature.action}
                  >
                    <CardContent className="p-6 text-center">
                      {/* Icon Circle */}
                      <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                        <span className="text-2xl text-white font-bold">
                          {feature.id === "record" ? "REC" : feature.icon}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h3 className={`text-lg font-bold mb-3 transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {feature.title}
                      </h3>
                      
                      {/* Description */}
                      <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {feature.description}
                      </p>
                      
                      {/* Recording Status */}
                      {feature.id === "record" && isRecording && (
                        <div className="mt-4">
                          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
                            isPaused ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-yellow-500' : 'bg-red-500 animate-pulse'}`}></div>
                            <span>{isPaused ? 'PAUSED' : 'RECORDING'}</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Create Meeting Button */}
              <div className="text-center mb-8">
                <Button
                  onClick={handleCreateMeeting}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 text-lg font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                >
                  <span>CREATE MEETING</span>
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </Button>
              </div>

              {/* Bottom Features Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {bottomFeatures.map((feature) => (
                  <Card 
                    key={feature.id}
                    className={`cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                      isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={feature.action}
                  >
                    <CardContent className="p-6 text-center">
                      {/* Icon Circle */}
                      <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                        <span className="text-2xl">
                          {feature.icon}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h3 className={`text-lg font-bold mb-3 transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {feature.title}
                      </h3>
                      
                      {/* Description */}
                      <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recording Controls */}
              {isRecording && (
                <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
                  <div className={`flex items-center space-x-4 px-6 py-3 rounded-full shadow-lg ${
                    isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}>
                    <Button
                      onClick={handleRecording}
                      className={`${isPaused ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'} text-white px-4 py-2 rounded-lg transition-colors duration-300`}
                    >
                      {isPaused ? 'Resume' : 'Pause'}
                    </Button>
                    <Button
                      onClick={handleStopRecording}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                      Stop
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Layout>

      {/* Create Meeting Modal */}
      {showCreateMeetingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
              <h2 className="text-lg font-bold text-yellow-300">CREATE YOUR MEETING HERE</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCloseModal}
                  className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <span className="text-white text-sm">↻</span>
                </button>
                <button
                  onClick={handleCloseModal}
                  className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <span className="text-white text-sm">×</span>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className={`p-6 space-y-4 transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              {/* Title Field */}
              <div className="flex items-center space-x-4">
                <label className={`text-blue-700 font-bold w-20 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  TITLE:
                </label>
                <input
                  type="text"
                  value={meetingForm.title}
                  onChange={(e) => handleMeetingFormChange('title', e.target.value)}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Type here"
                />
              </div>

              {/* Info Field */}
              <div className="flex items-center space-x-4">
                <label className={`text-blue-700 font-bold w-20 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  INFO:
                </label>
                <input
                  type="text"
                  value={meetingForm.info}
                  onChange={(e) => handleMeetingFormChange('info', e.target.value)}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Type here"
                />
              </div>

              {/* Date Field */}
              <div className="flex items-center space-x-4">
                <label className={`text-blue-700 font-bold w-20 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  DATE:
                </label>
                <input
                  type="date"
                  value={meetingForm.date}
                  onChange={(e) => handleMeetingFormChange('date', e.target.value)}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              {/* Time Field */}
              <div className="flex items-center space-x-4">
                <label className={`text-blue-700 font-bold w-20 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  TIME:
                </label>
                <div className="flex-1 flex items-center space-x-2">
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>FROM</span>
                  <input
                    type="time"
                    value={meetingForm.timeFrom}
                    onChange={(e) => handleMeetingFormChange('timeFrom', e.target.value)}
                    className={`px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors duration-300 ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-200'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                  <select
                    value={meetingForm.timeFromPeriod}
                    onChange={(e) => handleMeetingFormChange('timeFromPeriod', e.target.value)}
                    className={`px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors duration-300 ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-200'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>TO</span>
                  <input
                    type="time"
                    value={meetingForm.timeTo}
                    onChange={(e) => handleMeetingFormChange('timeTo', e.target.value)}
                    className={`px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors duration-300 ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-200'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                  <select
                    value={meetingForm.timeToPeriod}
                    onChange={(e) => handleMeetingFormChange('timeToPeriod', e.target.value)}
                    className={`px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors duration-300 ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-200'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              {/* Chair Field */}
              <div className="flex items-center space-x-4">
                <label className={`text-blue-700 font-bold w-20 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  CHAIR:
                </label>
                <input
                  type="text"
                  value={meetingForm.chair}
                  onChange={(e) => handleMeetingFormChange('chair', e.target.value)}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Type here"
                />
              </div>

              {/* Invite Field */}
              <div className="flex items-center space-x-4">
                <label className={`text-blue-700 font-bold w-20 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                  INVITE:
                </label>
                <input
                  type="text"
                  value={meetingForm.invite}
                  onChange={(e) => handleMeetingFormChange('invite', e.target.value)}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-200'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Type here"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleScheduleMeetingSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-bold rounded-lg transition-colors duration-300"
                >
                  SCHEDULE MEETING
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <FooterNavigation />
    </>
  );
}
