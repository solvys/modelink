"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Clock, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  modelName?: string;
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const bookingTypes = [
  { id: "photoshoot", label: "Photoshoot", duration: "2-4 hours" },
  { id: "video", label: "Video Shoot", duration: "4-8 hours" },
  { id: "runway", label: "Runway/Event", duration: "Full day" },
  { id: "consultation", label: "Consultation", duration: "1 hour" },
];

export function BookingCalendar({ isOpen, onClose, modelName = "Model" }: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [step, setStep] = useState<"date" | "time" | "type" | "confirm">("date");

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const formatMonth = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateSelect = (date: Date) => {
    if (!isPast(date)) {
      setSelectedDate(date);
      setStep("time");
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep("type");
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setStep("confirm");
  };

  const handleConfirm = () => {
    // Handle booking confirmation
    onClose();
    // Reset state
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedType(null);
    setStep("date");
  };

  const handleBack = () => {
    if (step === "time") setStep("date");
    else if (step === "type") setStep("time");
    else if (step === "confirm") setStep("type");
  };

  const days = getDaysInMonth(currentMonth);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-gray-950 border border-white/10 rounded-3xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
              <div>
                <p className="text-sm text-white/50">Book with</p>
                <h2 className="text-xl font-semibold text-white">{modelName}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5">
              {step === "date" && (
                <>
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={prevMonth}
                      className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <p className="font-medium text-white">{formatMonth(currentMonth)}</p>
                    <button
                      onClick={nextMonth}
                      className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Weekdays */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekdays.map((day) => (
                      <div
                        key={day}
                        className="text-center text-xs font-medium text-white/40 py-2"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {days.map((day, i) => (
                      <button
                        key={i}
                        onClick={() => day && handleDateSelect(day)}
                        disabled={!day || isPast(day)}
                        className={cn(
                          "aspect-square rounded-lg flex items-center justify-center text-sm transition-colors",
                          !day && "invisible",
                          day && isPast(day) && "text-white/20 cursor-not-allowed",
                          day && !isPast(day) && "text-white hover:bg-white/10",
                          day && isToday(day) && "bg-violet-500/20 text-violet-300",
                          day &&
                            selectedDate?.getTime() === day.getTime() &&
                            "bg-white text-gray-900"
                        )}
                      >
                        {day?.getDate()}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === "time" && selectedDate && (
                <>
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-sm text-white/50 hover:text-white mb-4 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <p className="text-sm text-white/50 mb-2">Select a time for</p>
                  <p className="font-medium text-white mb-4">{formatDate(selectedDate)}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={cn(
                          "flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-sm font-medium transition-colors",
                          selectedTime === time
                            ? "bg-white text-gray-900"
                            : "bg-white/[0.03] text-white/70 hover:bg-white/[0.06]"
                        )}
                      >
                        <Clock className="w-4 h-4" />
                        {time}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === "type" && (
                <>
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-sm text-white/50 hover:text-white mb-4 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <p className="text-sm text-white/50 mb-2">What type of booking?</p>
                  <div className="space-y-2">
                    {bookingTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => handleTypeSelect(type.id)}
                        className={cn(
                          "w-full flex items-center justify-between p-4 rounded-xl text-left transition-colors",
                          selectedType === type.id
                            ? "bg-white text-gray-900"
                            : "bg-white/[0.03] text-white hover:bg-white/[0.06]"
                        )}
                      >
                        <span className="font-medium">{type.label}</span>
                        <span
                          className={cn(
                            "text-sm",
                            selectedType === type.id ? "text-gray-600" : "text-white/50"
                          )}
                        >
                          {type.duration}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === "confirm" && selectedDate && selectedTime && selectedType && (
                <>
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-sm text-white/50 hover:text-white mb-4 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 mb-4">
                    <p className="text-sm text-white/50 mb-1">Booking Summary</p>
                    <p className="font-medium text-white mb-3">{formatDate(selectedDate)}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/50">Time</span>
                        <span className="text-white">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Type</span>
                        <span className="text-white">
                          {bookingTypes.find((t) => t.id === selectedType)?.label}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleConfirm}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 font-medium hover:bg-white/90 transition-colors"
                  >
                    <Check className="w-5 h-5" /> Confirm Booking
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

