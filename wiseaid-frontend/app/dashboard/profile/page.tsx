"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  ArrowLeft,
  User,
  MapPin,
  Activity,
  AlertCircle,
  PlusCircle,
  ShieldCheck,
  ChevronRight,
  LogOut,
  Lock
} from "lucide-react";

export default function MyProfile() {
  const [profile, setProfile] = useState({
    name: "Abul Kashem",
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    conditions: "",
    allergies: "",
    bloodGroup: "",
    emergencyNote: ""
  });

  // Pull data from browser memory whenever page loads
  useEffect(() => {
    const saved = localStorage.getItem("wiseAid_medical_data");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center text-slate-500 hover:text-blue-600 font-bold">
            <ArrowLeft size={20} className="mr-2" /> Back
          </Link>
          <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">Health Profile</h1>
        </div>
        <Link href="/dashboard/profile/edit">
          <Button className="rounded-xl font-bold bg-blue-600 hover:bg-blue-700 px-6 h-11">
            Edit Profile
          </Button>
        </Link>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- LEFT SIDE: IDENTITY --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm text-center">
              <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-4 mx-auto border-4 border-white shadow-md">
                <User size={48} className="text-blue-400" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">{profile.name}</h2>
              <div className="flex items-center justify-center gap-2 mt-2 px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-black uppercase tracking-widest mx-auto w-fit">
                <ShieldCheck size={14} /> Verified Patient
              </div>
              
              <div className="mt-8 space-y-4 text-left border-t border-slate-50 pt-6">
                <div className="flex gap-3 items-start">
                  <MapPin className="text-blue-500 shrink-0 mt-1" size={18} />
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{profile.address}</p>
                </div>
              </div>
            </div>

            {/* Emergency Info (Allergies) */}
            <div className={`rounded-[32px] p-8 text-white transition-colors ${profile.allergies ? 'bg-rose-600' : 'bg-slate-800'}`}>
              <h3 className="font-black text-lg mb-2 flex items-center gap-2">
                <AlertCircle size={20} /> Emergency Alerts
              </h3>
              <div className="mt-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">Known Allergies</p>
                <p className="font-bold text-sm">
                  {profile.allergies || "None reported"}
                </p>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: MEDICAL & SETTINGS --- */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Activity className="text-blue-600" size={24} /> Clinical Snapshot
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Chronic Conditions</span>
                  <p className="text-lg font-bold text-slate-800 mt-2">
                    {profile.conditions || "No conditions reported"}
                  </p>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Blood Group</span>
                  <p className="text-lg font-bold text-blue-600 mt-2 italic">
                    {profile.bloodGroup || "Not specified"}
                  </p>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="mt-6 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                <span className="text-xs font-black text-blue-400 uppercase tracking-widest">Emergency Note</span>
                <p className="text-slate-700 font-medium mt-2 leading-relaxed">
                  {profile.emergencyNote || "No instructions provided yet."}
                </p>
              </div>
            </div>

            {/* Settings Block */}
            <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
               <button className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors border-b border-slate-50">
                  <div className="flex items-center gap-4 text-slate-700 font-bold">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Lock size={18} className="text-slate-500" />
                    </div>
                    Privacy Settings
                  </div>
                  <ChevronRight size={20} className="text-slate-300" />
               </button>
               <button className="w-full flex items-center justify-between p-6 hover:bg-red-50 transition-colors group">
                  <div className="flex items-center gap-4 text-red-600 font-bold">
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                      <LogOut size={18} />
                    </div>
                    Logout
                  </div>
               </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}