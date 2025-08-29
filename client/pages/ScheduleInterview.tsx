import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ScheduleInterview() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    jobRole: "",
    fromTime: "10:30 AM",
    toTime: "11:30 AM",
    timeSlot: ""
  });

  // Mock data for fully booked time slots
  const bookedSlots = [
    '5:15 AM', '6:30 AM', '7:45 AM', '9:00 AM', '10:15 AM',
    '11:30 AM', '8:15 AM', '6:00 AM', '9:45 AM'
  ];

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBookSlot = () => {
    console.log("Booking interview slot:", formData);
    alert("Interview slot booked successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Schedule Interview Slot</h1>
              <p className="text-sm text-gray-600 mt-1">Google India - Senior Developer Position</p>
            </div>
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Email
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section - Date & Time Selection */}
            <div className="lg:col-span-2 space-y-6">
              {/* Date Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button className="bg-gray-200 text-gray-800 text-sm px-4 py-2 font-medium">
                    SELECT DATE SLOT HERE
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <Select>
                    <SelectTrigger className="w-32 h-9 text-sm">
                      <SelectValue placeholder="AUGUST" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="august">AUGUST</SelectItem>
                      <SelectItem value="september">SEPTEMBER</SelectItem>
                      <SelectItem value="october">OCTOBER</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-24 h-9 text-sm">
                      <SelectValue placeholder="2025" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-3">
                  {[16, 17, 18, 19, 20, 21].map((date) => (
                    <Button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`w-12 h-12 text-sm font-semibold rounded-lg transition-all ${
                        selectedDate === date
                          ? "bg-purple-700 text-white shadow-lg"
                          : "bg-purple-600 hover:bg-purple-700 text-white"
                      }`}
                    >
                      {date}
                    </Button>
                  ))}
                  <Button className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-lg">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Time Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button className="bg-gray-200 text-gray-800 text-sm px-4 py-2 font-medium">
                    SELECT TIME SLOT HERE
                  </Button>
                  <Select>
                    <SelectTrigger className="w-32 h-9 text-sm">
                      <SelectValue placeholder="TIME ZONES" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="est">EST</SelectItem>
                      <SelectItem value="pst">PST</SelectItem>
                      <SelectItem value="ist">IST</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-20 h-9 text-sm">
                      <SelectValue placeholder="AM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="am">AM</SelectItem>
                      <SelectItem value="pm">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Time Slots Grid */}
                <div className="grid grid-cols-5 gap-3">
                  {[
                    '5:00 AM', '5:15 AM', '5:30 AM', '5:45 AM', '6:00 AM',
                    '6:00 AM', '6:15 AM', '6:30 AM', '6:45 AM', '7:00 AM',
                    '7:00 AM', '7:15 AM', '7:30 AM', '7:45 AM', '8:00 AM',
                    '8:00 AM', '8:15 AM', '8:30 AM', '8:45 AM', '9:00 AM',
                    '9:00 AM', '9:15 AM', '9:30 AM', '9:45 AM', '10:00 AM',
                    '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM', '11:00 AM',
                    '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM', '12:00 PM'
                  ].map((time, index) => (
                    <Button
                      key={index}
                      onClick={() => setSelectedTime(time)}
                      variant="outline"
                      className={`h-9 text-sm px-3 transition-all ${
                        selectedTime === time
                          ? "border-green-500 bg-green-50 text-green-700 font-semibold"
                          : "border-green-300 text-green-700 hover:bg-green-50"
                      }`}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section - Form */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Interview Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-blue-600 block mb-2">NAME:</label>
                  <Input 
                    className="h-10 text-sm border-gray-300" 
                    value={formData.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-blue-600 block mb-2">EMAIL ID:</label>
                  <Input 
                    className="h-10 text-sm border-gray-300" 
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-blue-600 block mb-2">CONTACT:</label>
                  <Input 
                    className="h-10 text-sm border-gray-300" 
                    value={formData.contact}
                    onChange={(e) => handleFormChange('contact', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-blue-600 block mb-2">JOB ROLE:</label>
                  <Input 
                    className="h-10 text-sm border-gray-300" 
                    value={formData.jobRole}
                    onChange={(e) => handleFormChange('jobRole', e.target.value)}
                    placeholder="Senior Developer"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-blue-600 block mb-2">INTERVIEW DATE SLOT:</label>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-blue-600 font-medium">FROM</span>
                    <Input 
                      className="h-10 text-sm border-gray-300 w-24" 
                      value={formData.fromTime}
                      onChange={(e) => handleFormChange('fromTime', e.target.value)}
                    />
                    <span className="text-blue-600 font-medium">TO</span>
                    <Input 
                      className="h-10 text-sm border-gray-300 w-24" 
                      value={formData.toTime}
                      onChange={(e) => handleFormChange('toTime', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-bold text-blue-600 block mb-2">INTERVIEW TIME SLOT:</label>
                  <Input 
                    className="h-10 text-sm border-gray-300" 
                    value={selectedTime || formData.timeSlot}
                    onChange={(e) => handleFormChange('timeSlot', e.target.value)}
                    placeholder="Select time from slots above"
                  />
                </div>
              </div>
              
              {/* Book Button */}
              <Button 
                onClick={handleBookSlot}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm h-12 mt-6"
              >
                BOOK YOUR INTERVIEW SLOT HERE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
