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
    '10:00 AM', '1:00 PM', '3:30 PM', '5:00 PM'
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
                <div className="grid grid-cols-5 gap-2">
                  {[
                    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM',
                    '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
                    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM',
                    '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'
                  ].map((time, index) => {
                    const isBooked = bookedSlots.includes(time);
                    const isSelected = selectedTime === time;

                    return (
                      <Button
                        key={index}
                        onClick={() => !isBooked && setSelectedTime(time)}
                        variant="outline"
                        disabled={isBooked}
                        className={`h-9 text-sm px-3 transition-all border ${
                          isBooked
                            ? "border-red-200 bg-red-50 text-red-600 cursor-not-allowed opacity-60"
                            : isSelected
                            ? "border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
                            : "border-gray-300 text-gray-700 hover:border-blue-300 hover:bg-blue-50"
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
            <div className="lg:col-span-2 bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Interview Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Full Name</label>
                  <Input
                    className="h-9 text-sm border-gray-300"
                    value={formData.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Email Address</label>
                  <Input
                    className="h-9 text-sm border-gray-300"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Phone Number</label>
                  <Input
                    className="h-9 text-sm border-gray-300"
                    value={formData.contact}
                    onChange={(e) => handleFormChange('contact', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Position</label>
                  <Input
                    className="h-9 text-sm border-gray-300"
                    value={formData.jobRole}
                    onChange={(e) => handleFormChange('jobRole', e.target.value)}
                    placeholder="Senior Developer"
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Selected Time</label>
                  <Input
                    className="h-9 text-sm border-gray-300 bg-blue-50"
                    value={selectedTime || "No time selected"}
                    readOnly
                    placeholder="Select a time slot from the left"
                  />
                </div>
              </div>

              {/* Book Button */}
              <Button
                onClick={handleBookSlot}
                disabled={!selectedTime}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-medium text-sm h-10 mt-6"
              >
                Book Interview Slot
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
