"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { ArrowLeft, Save, HeartPulse, AlertTriangle, User, MapPin } from "lucide-react";

export default function EditProfile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "Abul Kashem",
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    conditions: "",
    allergies: "",
    bloodGroup: "",
    emergencyNote: ""
  });

  // Load existing data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("wiseAid_medical_data");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Save to Browser Memory
    localStorage.setItem("wiseAid_medical_data", JSON.stringify(formData));

    // Small delay for professional feel, then redirect
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard/profile");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard/profile" className="flex items-center text-slate-500 hover:text-blue-600 mb-8 font-bold transition-all">
          <ArrowLeft className="mr-2" size={20} /> Back to Profile
        </Link>

        <form onSubmit={handleSave} className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-200 shadow-sm space-y-8">
          <div>
            <h1 className="text-3xl font-black text-slate-950">Update Medical Profile</h1>
            <p className="text-slate-500 font-medium">This information helps WiseAid responders identify you.</p>
          </div>

          <div className="space-y-6">
            {/* Read-only / System Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-1">Full Name</label>
                <Input 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="h-14 rounded-2xl border-slate-200 font-bold" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-1">Blood Group</label>
                <Input 
                  placeholder="e.g. O Positive" 
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                  className="h-14 rounded-2xl border-slate-200 font-bold text-blue-600" 
                />
              </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-black uppercase text-slate-400 ml-1">Detailed Address</label>
               <Input 
                  value={formData.address} 
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="h-14 rounded-2xl border-slate-200 font-medium" 
               />
            </div>

            {/* Medical Specifics */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
               <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-black uppercase text-rose-500 ml-1">
                  <HeartPulse size={14}/> Pre-existing Conditions
                </label>
                <textarea 
                  value={formData.conditions}
                  onChange={(e) => setFormData({...formData, conditions: e.target.value})}
                  placeholder="e.g. Diabetes, Asthma..."
                  className="w-full h-24 p-4 rounded-2xl border-slate-200 border focus:ring-2 focus:ring-blue-100 outline-none font-medium" 
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-black uppercase text-amber-500 ml-1">
                  <AlertTriangle size={14}/> Allergies
                </label>
                <textarea 
                  value={formData.allergies}
                  onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                  placeholder="e.g. Peanuts, Penicillin..."
                  className="w-full h-24 p-4 rounded-2xl border-slate-200 border focus:ring-2 focus:ring-blue-100 outline-none font-medium" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-1">Emergency Instructions</label>
                <textarea 
                  value={formData.emergencyNote}
                  onChange={(e) => setFormData({...formData, emergencyNote: e.target.value})}
                  placeholder="Who should we call first?"
                  className="w-full h-24 p-4 rounded-2xl border-slate-200 border focus:ring-2 focus:ring-blue-100 outline-none font-medium bg-slate-50" 
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-16 text-lg font-black bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg shadow-blue-100 transition-all"
          >
            {isLoading ? "UPDATING..." : "SAVE MEDICAL PROFILE"}
          </Button>
        </form>
      </div>
    </div>
  );
}