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
  const [transcriptionText, setTranscriptionText] = useState(
    "Welcome to the Q3 Campaign Timelines meeting. We have 20+ participants joining today's session. Let's start by reviewing our key objectives and deliverables...",
  );
  const [meetingForm, setMeetingForm] = useState({
    title: "",
    info: "",
    date: new Date().toLocaleDateString("en-CA"),
    timeFrom: "",
    timeFromPeriod: "AM",
    timeTo: "",
    timeToPeriod: "AM",
    chair: "",
    invite: "",
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
    setMeetingForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleScheduleMeetingSubmit = () => {
    if (!meetingForm.title || !meetingForm.timeFrom || !meetingForm.timeTo) {
      alert("Please fill in all required fields (Title, From Time, To Time)");
      return;
    }

    console.log("Scheduling meeting:", meetingForm);

    setMeetingInProgress(true);
    setShowCreateMeetingModal(false);

    setMeetingForm({
      title: "",
      info: "",
      date: new Date().toLocaleDateString("en-CA"),
      timeFrom: "",
      timeFromPeriod: "AM",
      timeTo: "",
      timeToPeriod: "AM",
      chair: "",
      invite: "",
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
    console.log(
      isScreenSharing ? "Screen share stopped" : "Screen share started",
    );
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      console.log("Sending chat message:", chatMessage);
      setChatMessage("");
    }
  };

  const handleMeetingInvite = () => {
    const inviteLink = `Meeting Link: https://meet.company.com/q3-campaign-timelines-${Date.now()}`;
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => {
        alert("Meeting invite link copied to clipboard!");
      })
      .catch(() => {
        alert(`Meeting Invite Link:\n${inviteLink}`);
      });
  };

  const handleScheduleMeeting = () => {
    console.log("Scheduling meeting...");
    setShowCreateMeetingModal(true);
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
      title: "Recording & Playback",
      description:
        "Record your entire meeting with HD quality. Pause and resume recording at any time. Get automatic transcripts and summaries.",
      icon: "🎥",
      color: "from-red-500 to-red-600",
      bgColor: isDarkMode ? "bg-red-500/10" : "bg-red-50",
      borderColor: "border-red-200",
      action: handleRecording,
    },
    {
      id: "schedule",
      title: "Smart Scheduling",
      description:
        "Schedule one-on-one or group meetings with automated calendar integration, timezone support, and reminder notifications.",
      icon: "📅",
      color: "from-blue-500 to-blue-600",
      bgColor: isDarkMode ? "bg-blue-500/10" : "bg-blue-50",
      borderColor: "border-blue-200",
      action: handleScheduleMeeting,
    },
    {
      id: "notes",
      title: "AI Note Taking",
      description:
        "Automatic meeting notes generation with AI. Get summaries, action items, and decisions in multiple languages and formats.",
      icon: "📝",
      color: "from-green-500 to-green-600",
      bgColor: isDarkMode ? "bg-green-500/10" : "bg-green-50",
      borderColor: "border-green-200",
      action: handleMakeNotes,
    },
  ];

  const bottomFeatures = [
    {
      id: "screenshot",
      title: "Live Screenshots",
      description:
        "Capture important moments during meetings. Save screenshots as JPG, PNG, or IMG formats directly to your files.",
      icon: "📸",
      color: "from-purple-500 to-purple-600",
      bgColor: isDarkMode ? "bg-purple-500/10" : "bg-purple-50",
      borderColor: "border-purple-200",
      action: handleTakeScreenshot,
    },
    {
      id: "questions",
      title: "Interactive Q&A",
      description:
        "Submit questions during meetings with our interactive Q&A system. Moderate and prioritize questions effectively.",
      icon: "❓",
      color: "from-orange-500 to-orange-600",
      bgColor: isDarkMode ? "bg-orange-500/10" : "bg-orange-50",
      borderColor: "border-orange-200",
      action: handleAskQuestion,
    },
    {
      id: "collaborate",
      title: "Real-time Collaboration",
      description:
        "Share screens, collaborate on whiteboards, and work together in real-time with advanced collaboration tools.",
      icon: "🤝",
      color: "from-teal-500 to-teal-600",
      bgColor: isDarkMode ? "bg-teal-500/10" : "bg-teal-50",
      borderColor: "border-teal-200",
      action: handleAskQuestion,
    },
  ];

  return (
    <>
      <Layout>
        <div
          className={`min-h-screen transition-colors duration-300 ${
            isDarkMode ? "bg-gray-900" : "bg-gray-50"
          } ${meetingInProgress ? "p-0" : "p-6 overflow-y-auto"}`}
        >
          {meetingInProgress ? (
            /* Meeting In Progress Interface */
            <div className="h-screen flex flex-col">
              {/* Meeting Header */}
              <Card
                className={`flex-shrink-0 rounded-none border-0 border-b transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <h1
                        className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                      >
                        Q3 CAMPAIGN TIMELINES
                      </h1>
                      <div className="flex items-center space-x-2">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                          LIVE
                        </span>
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          20+ PARTICIPANTS
                        </span>
                        {isRecording && (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center ${
                              isPaused ? "bg-yellow-500" : "bg-red-500"
                            } text-white`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full mr-2 ${
                                isPaused ? "bg-white" : "bg-white animate-pulse"
                              }`}
                            ></div>
                            {isPaused ? "PAUSED" : "RECORDING"}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleMeetingInvite}
                        className="text-xs"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                        Invite
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEndMeeting}
                        className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        End
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Main Meeting Content */}
              <div className="flex-1 flex overflow-hidden">
                {/* Left Side - Video Grid */}
                <div className="flex-1 p-4">
                  <div className="grid grid-cols-4 gap-3 h-full">
                    {/* Main Speaker */}
                    <div className="col-span-2 row-span-2">
                      <Card
                        className={`w-full h-full border-2 border-blue-500 transition-colors duration-300 ${
                          isDarkMode ? "bg-gray-800" : "bg-gray-100"
                        }`}
                      >
                        <CardContent className="p-4 h-full flex flex-col items-center justify-center">
                          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
                            <svg
                              className="w-16 h-16 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                          </div>
                          <div className="mt-4 text-center">
                            <h3
                              className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                            >
                              John Presenter
                            </h3>
                            <p
                              className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                            >
                              Meeting Host
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Participant Grid */}
                    {Array.from({ length: 6 }, (_, index) => (
                      <div key={index} className="aspect-square">
                        <Card
                          className={`w-full h-full transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-gray-800 border-gray-700"
                              : "bg-gray-100 border-gray-200"
                          }`}
                        >
                          <CardContent className="p-3 h-full flex flex-col items-center justify-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                              <svg
                                className="w-8 h-8 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                              </svg>
                            </div>
                            <p
                              className={`text-xs mt-2 font-medium text-center ${
                                isDarkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              User {index + 1}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side - Panels */}
                <div className="w-80 border-l flex flex-col">
                  {/* Live Transcription */}
                  <Card
                    className={`flex-1 rounded-none border-0 border-b transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <CardContent className="p-0 h-full flex flex-col">
                      <div
                        className={`p-4 border-b transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-gray-750 border-gray-700"
                            : "bg-blue-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h3
                            className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}
                          >
                            LIVE TRANSCRIPTION
                          </h3>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <Button variant="ghost" size="sm" className="p-1">
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
                                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                />
                              </svg>
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-3">
                          <div
                            className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}
                          >
                            <p
                              className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
                            >
                              {transcriptionText}
                            </p>
                            <p
                              className={`text-xs mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                            >
                              John Presenter • Just now
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Live Chat */}
                  <Card
                    className={`flex-1 rounded-none border-0 transition-colors duration-300 ${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <CardContent className="p-0 h-full flex flex-col">
                      <div
                        className={`p-4 border-b transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-gray-750 border-gray-700"
                            : "bg-blue-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h3
                            className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}
                          >
                            LIVE CHAT
                          </h3>
                          <Button variant="ghost" size="sm" className="p-1">
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
                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                              />
                            </svg>
                          </Button>
                        </div>
                      </div>
                      <div className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-3">
                          <div
                            className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}
                          >
                            <p
                              className={`text-sm font-medium ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                            >
                              Sarah Design
                            </p>
                            <p
                              className={`text-sm ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
                            >
                              Great presentation! I have a question about the
                              timeline.
                            </p>
                            <p
                              className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                            >
                              2 minutes ago
                            </p>
                          </div>
                          <div
                            className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}
                          >
                            <p
                              className={`text-sm font-medium ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                            >
                              Mike Developer
                            </p>
                            <p
                              className={`text-sm ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
                            >
                              Can we discuss the technical implementation?
                            </p>
                            <p
                              className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                            >
                              1 minute ago
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border-t">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            onKeyPress={(e) =>
                              e.key === "Enter" && handleSendMessage()
                            }
                            placeholder="Type your message..."
                            className={`flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                            }`}
                          />
                          <Button
                            onClick={handleSendMessage}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
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
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Meeting Controls Bottom */}
              <Card
                className={`flex-shrink-0 rounded-none border-0 border-t transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <CardContent className="p-4">
                  {/* Control Bar */}
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      onClick={handleMuteToggle}
                      variant={isMuted ? "destructive" : "outline"}
                      size="sm"
                      className="w-12 h-12 rounded-full"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d={
                            isMuted
                              ? "M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-3.87-3.13-7-7-7S1 1.13 1 5v6.17l2.83 2.83c.69-.81 1.79-1.33 3.17-1.33 2.76 0 5 2.24 5 5 0 .28-.03.56-.08.83l2.23 2.23c.27-.62.43-1.31.43-2.05V11h1.7c.3 0 .56-.25.56-.56S19.3 10 19 10z"
                              : "M12 2c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2s-2-.9-2-2V4c0-1.1.9-2 2-2zm5.3 6c0 3-2.54 5.1-5.3 5.1S6.7 11 6.7 8H5c0 3.41 2.72 6.23 6 6.72V17h2v-2.28c3.28-.48 6-3.3 6-6.72h-1.7z"
                          }
                        />
                      </svg>
                    </Button>

                    <Button
                      onClick={handleVideoToggle}
                      variant={isVideoOff ? "destructive" : "outline"}
                      size="sm"
                      className="w-12 h-12 rounded-full"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d={
                            isVideoOff
                              ? "M21 6.5l-4 4V7c0-.55-.45-1-1-1H9.82l8.18 8.18V6.5zM3.27 2L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.55-.18L19.73 21 21 19.73 3.27 2z"
                              : "M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"
                          }
                        />
                      </svg>
                    </Button>

                    <Button
                      onClick={handleScreenShare}
                      variant={isScreenSharing ? "default" : "outline"}
                      size="sm"
                      className="w-12 h-12 rounded-full"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 5h16v11H4V5z" />
                      </svg>
                    </Button>

                    <Button
                      onClick={handleRecording}
                      variant={isRecording ? "destructive" : "outline"}
                      size="sm"
                      className="w-12 h-12 rounded-full"
                    >
                      <span className="text-sm font-bold">REC</span>
                    </Button>

                    <Button
                      onClick={handleTakeScreenshot}
                      variant="outline"
                      size="sm"
                      className="w-12 h-12 rounded-full"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 12l1.42 1.42L8.83 15H13v-2.17l-1.59-1.59L12.83 10H18V8.83l-4.59-4.59c-.78-.78-2.05-.78-2.83 0L6 8.83 9 12zm6-2h2v2h-2v-2z" />
                      </svg>
                    </Button>

                    <Button
                      onClick={handleMakeNotes}
                      variant="outline"
                      size="sm"
                      className="w-12 h-12 rounded-full"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                    </Button>

                    <Button
                      onClick={handleEndMeeting}
                      variant="destructive"
                      size="sm"
                      className="w-12 h-12 rounded-full"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
                      </svg>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Meeting Hub Interface */
            <>
              {/* Header */}
              <div className="mb-8 text-center">
                <h1
                  className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Meeting Hub
                </h1>
                <p
                  className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Professional video conferencing with advanced collaboration
                  tools, AI-powered features, and seamless integration
                </p>
              </div>

              {/* Top Features Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {features.map((feature) => (
                  <Card
                    key={feature.id}
                    className={`group cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${
                      isDarkMode
                        ? `bg-gray-800 ${feature.borderColor} hover:bg-gray-750`
                        : `bg-white ${feature.borderColor} hover:bg-gray-50`
                    } ${feature.bgColor}`}
                    onClick={feature.action}
                  >
                    <CardContent className="p-8 text-center">
                      {/* Icon Circle */}
                      <div
                        className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}
                      >
                        <span className="text-3xl">
                          {feature.id === "record" ? (
                            <span className="text-white font-bold text-lg">
                              REC
                            </span>
                          ) : (
                            feature.icon
                          )}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p
                        className={`text-sm leading-relaxed transition-colors duration-300 ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {feature.description}
                      </p>

                      {/* Recording Status */}
                      {feature.id === "record" && isRecording && (
                        <div className="mt-6">
                          <div
                            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium shadow-lg ${
                              isPaused
                                ? "bg-yellow-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            <div
                              className={`w-3 h-3 rounded-full ${
                                isPaused ? "bg-white" : "bg-white animate-pulse"
                              }`}
                            ></div>
                            <span>
                              {isPaused
                                ? "RECORDING PAUSED"
                                : "RECORDING ACTIVE"}
                            </span>
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
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <span>START NEW MEETING</span>
                </Button>
              </div>

              {/* Bottom Features Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {bottomFeatures.map((feature) => (
                  <Card
                    key={feature.id}
                    className={`group cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${
                      isDarkMode
                        ? `bg-gray-800 ${feature.borderColor} hover:bg-gray-750`
                        : `bg-white ${feature.borderColor} hover:bg-gray-50`
                    } ${feature.bgColor}`}
                    onClick={feature.action}
                  >
                    <CardContent className="p-8 text-center">
                      {/* Icon Circle */}
                      <div
                        className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}
                      >
                        <span className="text-3xl">{feature.icon}</span>
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p
                        className={`text-sm leading-relaxed transition-colors duration-300 ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recording Controls */}
              {isRecording && (
                <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50">
                  <Card
                    className={`shadow-2xl ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <Button
                          onClick={handleRecording}
                          className={`${isPaused ? "bg-green-600 hover:bg-green-700" : "bg-yellow-600 hover:bg-yellow-700"} text-white transition-colors duration-300`}
                        >
                          {isPaused ? "Resume Recording" : "Pause Recording"}
                        </Button>
                        <Button
                          onClick={handleStopRecording}
                          variant="destructive"
                          className="transition-colors duration-300"
                        >
                          Stop Recording
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </>
          )}
        </div>
      </Layout>

      {/* Create Meeting Modal */}
      {showCreateMeetingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card
            className={`w-full max-w-lg max-h-[85vh] mx-auto shadow-xl rounded-lg overflow-hidden ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            {/* Modal Header */}
            <div
              className={`px-6 py-4 border-b flex items-center justify-between ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <h2
                className={`text-xl font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Create Meeting
              </h2>
              <button
                onClick={handleCloseModal}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-gray-400 hover:text-gray-200"
                    : "hover:bg-gray-200 text-gray-500 hover:text-gray-700"
                }`}
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className={`max-h-[65vh] overflow-y-auto ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}>
              <CardContent className="p-3 space-y-3">
              {/* Title Field */}
              <div className="space-y-1">
                <label
                  className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Meeting Title *
                </label>
                <input
                  type="text"
                  value={meetingForm.title}
                  onChange={(e) =>
                    handleMeetingFormChange("title", e.target.value)
                  }
                  className={`w-full px-2 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="Enter meeting title"
                />
              </div>

              {/* Info Field */}
              <div className="space-y-1">
                <label
                  className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Description
                </label>
                <textarea
                  value={meetingForm.info}
                  onChange={(e) =>
                    handleMeetingFormChange("info", e.target.value)
                  }
                  className={`w-full px-2 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="Enter meeting description (optional)"
                  rows={2}
                />
              </div>

              {/* Date Field */}
              <div className="space-y-1">
                <label
                  className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Date *
                </label>
                <input
                  type="date"
                  value={meetingForm.date}
                  onChange={(e) =>
                    handleMeetingFormChange("date", e.target.value)
                  }
                  className={`w-full px-2 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              {/* Time Fields */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label
                    className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Start Time *
                  </label>
                  <input
                    type="time"
                    value={meetingForm.timeFrom}
                    onChange={(e) =>
                      handleMeetingFormChange("timeFrom", e.target.value)
                    }
                    className={`w-full px-2 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <label
                    className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    End Time *
                  </label>
                  <input
                    type="time"
                    value={meetingForm.timeTo}
                    onChange={(e) =>
                      handleMeetingFormChange("timeTo", e.target.value)
                    }
                    className={`w-full px-2 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Meeting Host
                </label>
                <input
                  type="text"
                  value={meetingForm.chair}
                  onChange={(e) =>
                    handleMeetingFormChange("chair", e.target.value)
                  }
                  className={`w-full px-2 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="Enter host name (optional)"
                />
              </div>

              <div className="space-y-1">
                <label
                  className={`block text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Invite Participants
                </label>
                <input
                  type="email"
                  value={meetingForm.invite}
                  onChange={(e) =>
                    handleMeetingFormChange("invite", e.target.value)
                  }
                  className={`w-full px-2 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="Enter email addresses (optional)"
                />
              </div>
            </CardContent>
            </div>

            {/* Modal Footer */}
            <div className={`px-3 py-2 border-t ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={handleCloseModal}
                  className="flex-1 py-2 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleScheduleMeetingSubmit}
                  disabled={
                    !meetingForm.title ||
                    !meetingForm.timeFrom ||
                    !meetingForm.timeTo
                  }
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed py-2 text-xs"
                >
                  Create Meeting
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <FooterNavigation />
    </>
  );
}
