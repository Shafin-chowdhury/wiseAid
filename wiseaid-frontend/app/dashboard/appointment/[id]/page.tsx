"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft, Calendar, Clock, MapPin, CheckCircle2 } from "lucide-react";

export default function BookingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState("Sep 10");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const days = ["Sep 10", "Sep 11", "Sep 12"];
  const slots = ["11:00 AM", "1:00 PM", "3:00 PM", "4:00 PM", "6:00 PM"];

  const handleBooking = () => {
    if (!selectedSlot) return alert("Please select a time slot");
    setIsBooked(true);
    // In a real app, save this to your database/localStorage
    setTimeout(() => router.push("/dashboard"), 2500);
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Appointment Booked!</h1>
        <p className="text-slate-500 font-medium">Your consultation with Dr. Shah has been scheduled.</p>
        <p className="text-sm text-slate-400 mt-8 italic">Redirecting to Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="p-6 flex items-center gap-4">
        <Link href="/dashboard/appointment" className="p-2 bg-white rounded-full shadow-sm hover:text-blue-600 transition-colors">
          <ArrowLeft size={24} />
        </Link>
      </header>

      <main className="max-w-xl w-full mx-auto px-6 pb-12">
        {/* Doctor Profile Header */}
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-4xl">👨‍⚕️</div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Dr. Shah</h2>
            <p className="text-blue-600 font-bold">Cardiologist</p>
            <p className="flex items-center gap-1 text-xs text-slate-400 mt-1 uppercase font-black">
              <MapPin size={12} /> MedEasy Hospital
            </p>
          </div>
        </div>

        {/* Date Selection */}
        <div className="space-y-4 mb-8">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
             <Calendar size={16} className="text-blue-600" /> Select Date
          </h3>
          <div className="flex gap-3">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex-1 py-4 rounded-2xl font-bold transition-all border-2 ${selectedDay === day ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200'}`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="space-y-4 mb-10">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
             <Clock size={16} className="text-blue-600" /> Available Slots
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {slots.map(slot => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`py-4 rounded-2xl font-bold text-sm transition-all border-2 ${selectedSlot === slot ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200'}`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <Button 
          onClick={handleBooking}
          className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-lg font-black shadow-xl shadow-blue-100"
        >
          CONFIRM APPOINTMENT
        </Button>
      </main>
    </div>
  );
}