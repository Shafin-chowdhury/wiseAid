

"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  UserCircle, ShieldCheck, Stethoscope, Truck, Pill, 
  Utensils, Activity, AlertCircle, ChevronRight, Camera 
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<any>(null);
  const [sosActive, setSosActive] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    fetch(`/api/get-profile?email=${userEmail}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  const triggerEmergency = async () => {
    setSosActive(true);
    
    // Notify Admin via API
    await fetch("/api/sos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user?.fullName,
        email: user?.email,
        location: user?.area || "Unknown Location",
      })
    });

    // Reset message after 8 seconds
    setTimeout(() => setSosActive(false), 8000);
  };

const services = [
  { title: 'My Health Profile', path: '/dashboard/profile', icon: UserCircle, color: 'bg-blue-100 text-blue-600' },
  { title: 'Book Appointment', path: '/dashboard/appointment', icon: Stethoscope, color: 'bg-indigo-100 text-indigo-600' },
  { title: 'Request Ambulance', path: '/dashboard/ambulance', icon: Truck, color: 'bg-red-100 text-red-600' },
  { title: 'Medicine Reminder', path: '/dashboard/medicine', icon: Pill, color: 'bg-emerald-100 text-emerald-600' },
  { title: 'Daily Meal Planner', path: '/dashboard/meals', icon: Utensils, color: 'bg-orange-100 text-orange-600' },
  { title: 'IOT Health Activity', path: '/dashboard/activity', icon: Activity, color: 'bg-cyan-100 text-cyan-600' },
];

  return (
    <div className="h-screen w-full bg-[#F0F4F8] flex overflow-hidden font-sans text-slate-800">
      {/* Sidebar (Kept exactly as requested) */}
      <aside className="w-80 bg-white border-r border-slate-200 flex flex-col p-8 shadow-sm">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-28 h-28 rounded-full bg-slate-100 border-4 border-white shadow-md overflow-hidden mb-4">
             {user?.profileImage ? <img src={user.profileImage} className="w-full h-full object-cover" /> : <UserCircle size={112} className="text-slate-300"/>}
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">{user?.fullName || "Welcome"}</h2>
          <div className="mt-2 inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-[10px] font-black uppercase border border-emerald-100">
            <ShieldCheck size={12} /> Verified Patient
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          {['Home', 'Notifications', 'Settings'].map(item => (
            <button key={item} className="w-full text-left px-6 py-4 rounded-2xl text-slate-500 font-bold hover:bg-blue-50 transition-all">{item}</button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* EMERGENCY FEEDBACK MESSAGE */}
          {sosActive && (
            <div className="mb-8 p-8 bg-red-600 text-white rounded-[40px] shadow-2xl animate-bounce border-4 border-white flex items-center gap-6">
              <AlertCircle size={48} className="animate-pulse" />
              <div>
                <h2 className="text-2xl font-black italic">SOS SIGNAL SENT!</h2>
                <p className="font-bold text-red-100">Help is being dispatched to {user?.area}. Stay calm, we will be there soon.</p>
              </div>
            </div>
          )}

          <header className="mb-10">
            <h1 className="text-4xl font-black text-slate-900 mb-2">Hello, {user?.fullName?.split(' ')[0]}!</h1>
            <p className="text-slate-500 font-medium text-lg">How can WiseAid support you today?</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {services.map((s, i) => {
  // Extract the icon component class reference dynamically
  const IconComponent = s.icon; 
  
  return (
    <div 
      key={i} 
      onClick={() => router.push(s.path)} 
      className="bg-white p-8 rounded-[40px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer border border-slate-50 flex flex-col group"
    >
      <div className={`${s.color} w-16 h-16 rounded-[24px] flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform`}>
        <IconComponent size={32} /> 
      </div>
      <h3 className="text-slate-800 font-black text-xl mb-1">{s.title}</h3>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Access Service</p>
    </div>
  );
})}

            {/* SOS BUTTON */}
            <div 
              onClick={triggerEmergency}
              className="lg:col-span-3 bg-red-500 p-10 rounded-[45px] flex items-center justify-between shadow-xl shadow-red-200 cursor-pointer hover:bg-red-600 transition-all active:scale-95 border-4 border-red-400"
            >
              <div className="flex items-center gap-8">
                <div className="bg-white/20 p-5 rounded-full animate-pulse"><AlertCircle size={48} className="text-white" /></div>
                <div>
                  <h3 className="text-3xl font-black text-white">EMERGENCY SOS</h3>
                  <p className="text-red-100 font-bold text-lg">Press to alert our command center immediately</p>
                </div>
              </div>
              <ChevronRight size={40} className="text-white" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}