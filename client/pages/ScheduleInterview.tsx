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
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 mb-4">
          <div className="flex items-center justify-between p-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Schedule Interview</h1>
              <p className="text-sm text-gray-600 mt-1">Google India - Senior Developer Position</p>
            </div>
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="flex items-center gap-2 text-sm h-9 px-4 border-gray-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Section - Date & Time Selection */}
            <div className="lg:col-span-3 space-y-4">
              {/* Date Selection */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900">Select Date</h3>
                <div className="flex items-center gap-3">
                  <Select>
                    <SelectTrigger className="w-32 h-9 text-sm border-gray-300">
                      <SelectValue placeholder="August" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="august">August</SelectItem>
                      <SelectItem value="september">September</SelectItem>
                      <SelectItem value="october">October</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-24 h-9 text-sm border-gray-300">
                      <SelectValue placeholder="2025" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  {[16, 17, 18, 19, 20, 21].map((date) => (
                    <Button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      variant={selectedDate === date ? "default" : "outline"}
                      className={`w-10 h-10 text-sm font-medium ${
                        selectedDate === date
                          ? "bg-blue-500 hover:bg-blue-600 text-white border-blue-500"
                          : "border-gray-300 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      {date}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    className="w-10 h-10 border-gray-300 hover:border-blue-300 hover:bg-blue-50"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Time Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Select Time</h3>
                  <div className="flex items-center gap-2">
                    <Select>
                      <SelectTrigger className="w-24 h-8 text-xs border-gray-300">
                        <SelectValue placeholder="IST" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="est">EST</SelectItem>
                        <SelectItem value="pst">PST</SelectItem>
                        <SelectItem value="ist">IST</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Time Slots Grid */}
                <div className="grid grid-cols-6 gap-1.5">
                  {[
                    '5:00 AM', '5:15 AM', '5:30 AM', '5:45 AM', '6:00 AM', '6:15 AM',
                    '6:30 AM', '6:45 AM', '7:00 AM', '7:15 AM', '7:30 AM', '7:45 AM',
                    '8:00 AM', '8:15 AM', '8:30 AM', '8:45 AM', '9:00 AM', '9:15 AM',
                    '9:30 AM', '9:45 AM', '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM',
                    '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM'
                  ].map((time, index) => {
                    const isBooked = bookedSlots.includes(time);
                    const isSelected = selectedTime === time;

                    return (
                      <Button
                        key={index}
                        onClick={() => !isBooked && setSelectedTime(time)}
                        variant="outline"
                        disabled={isBooked}
                        className={`h-6 text-xs px-1 transition-all ${
                          isBooked
                            ? "border-red-500 bg-red-100 text-red-700 cursor-not-allowed opacity-75"
                            : isSelected
                            ? "border-green-500 bg-green-50 text-green-700 font-semibold"
                            : "border-green-300 text-green-700 hover:bg-green-50"
                        }`}
                      >
                        {time}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Section - Form */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-1">
                Interview Details
              </h3>
              <div className="space-y-2">
                <div>
                  <label className="text-xs font-bold text-blue-600 block mb-1">NAME:</label>
                  <Input
                    className="h-7 text-xs border-gray-300"
                    value={formData.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-blue-600 block mb-1">EMAIL ID:</label>
                  <Input
                    className="h-7 text-xs border-gray-300"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-blue-600 block mb-1">CONTACT:</label>
                  <Input
                    className="h-7 text-xs border-gray-300"
                    value={formData.contact}
                    onChange={(e) => handleFormChange('contact', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-blue-600 block mb-1">JOB ROLE:</label>
                  <Input
                    className="h-7 text-xs border-gray-300"
                    value={formData.jobRole}
                    onChange={(e) => handleFormChange('jobRole', e.target.value)}
                    placeholder="Senior Developer"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-blue-600 block mb-1">INTERVIEW DATE SLOT:</label>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-blue-600 font-medium">FROM</span>
                    <Input
                      className="h-7 text-xs border-gray-300 w-20"
                      value={formData.fromTime}
                      onChange={(e) => handleFormChange('fromTime', e.target.value)}
                    />
                    <span className="text-blue-600 font-medium">TO</span>
                    <Input
                      className="h-7 text-xs border-gray-300 w-20"
                      value={formData.toTime}
                      onChange={(e) => handleFormChange('toTime', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-blue-600 block mb-1">INTERVIEW TIME SLOT:</label>
                  <Input
                    className="h-7 text-xs border-gray-300"
                    value={selectedTime || formData.timeSlot}
                    onChange={(e) => handleFormChange('timeSlot', e.target.value)}
                    placeholder="Select time from slots above"
                  />
                </div>
              </div>

              {/* Book Button */}
              <Button
                onClick={handleBookSlot}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs h-8 mt-3"
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
