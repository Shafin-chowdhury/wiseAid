"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft, MapPin, AlertTriangle, Phone, Stethoscope, Car, Flame, HelpCircle } from "lucide-react";

const emergencyTypes = [
  { id: "medical", title: "Medical Emergency", icon: Stethoscope, color: "text-blue-600" },
  { id: "accident", title: "Accident/Injury", icon: Car, color: "text-rose-600" },
  { id: "fire", title: "Fire Emergency", icon: Flame, color: "text-orange-600" },
  { id: "other", title: "Other Assistance", icon: HelpCircle, color: "text-slate-600" },
];

export default function AmbulanceBooking() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard" className="flex items-center text-slate-500 hover:text-blue-600 mb-8 font-bold text-lg">
          <ArrowLeft className="mr-2" /> Back to Dashboard
        </Link>

        {step === 1 ? (
          <div className="space-y-10">
            <div>
              <h1 className="text-4xl font-black text-slate-900">Request Emergency Help</h1>
              <p className="text-xl text-slate-500 mt-2">Please select the type of emergency so we can send the right help.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {emergencyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-8 rounded-[32px] border-4 flex items-center gap-6 transition-all ${
                    selectedType === type.id 
                    ? "border-blue-600 bg-blue-50 shadow-lg" 
                    : "border-slate-200 bg-white hover:border-blue-200"
                  }`}
                >
                  <div className={`p-4 rounded-2xl bg-white shadow-sm ${type.color}`}>
                    <type.icon size={48} />
                  </div>
                  <span className="text-2xl font-black text-slate-900">{type.title}</span>
                </button>
              ))}
            </div>

            <Button 
              disabled={!selectedType}
              onClick={() => setStep(2)}
              className="w-full h-20 text-xl font-black bg-rose-600 hover:bg-rose-700 rounded-2xl shadow-xl shadow-rose-200"
            >
              CONTINUE TO LOCATION
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-200 shadow-sm space-y-8 text-center">
            <h2 className="text-3xl font-black text-slate-900">Confirm Your Location</h2>
            
            {/* Placeholder for Map - In real app, integrate Google Maps or Leaflet */}
            <div className="w-full h-64 bg-slate-100 rounded-3xl flex items-center justify-center border-2 border-dashed border-slate-300">
               <div className="text-slate-400 flex flex-col items-center">
                 <MapPin size={48} />
                 <p className="font-bold">Map Preview: Current Location Detected</p>
               </div>
            </div>

            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 text-left">
              <p className="text-sm font-bold text-blue-600 uppercase">Dispatching to</p>
              <p className="text-xl font-black text-slate-900">House 12, Road 5, Dhanmondi, Dhaka</p>
            </div>

            <Button 
              className="w-full h-20 text-xl font-black bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg"
              onClick={() => alert("Emergency Services Dispatched!")}
            >
              <Phone className="mr-3" /> DISPATCH AMBULANCE NOW
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}