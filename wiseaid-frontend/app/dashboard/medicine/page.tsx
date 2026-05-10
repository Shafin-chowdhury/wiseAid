"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button"; 
import { 
  UserCircle2, 
  Stethoscope, 
  Siren,        
  Pill,         
  Utensils,     
  BellRing,     
  Activity,     
  Search,
  LogOut
} from "lucide-react";

const services = [
  { name: "My Health Profile", icon: UserCircle2, link: "/dashboard/Profile" },
  { name: "Book Doctor Appointment", icon: Stethoscope, link: "/dashboard/appointment" },
  { name: "Request Ambulance", icon: Siren, link: "/dashboard/ambulance" },
  { name: "Medicine Reminder", icon: Pill, link: "/dashboard/medicine" },
  { name: "Daily Meal Planner", icon: Utensils, link: "/dashboard/meals" },
  { name: "IOT Health Activity", icon: Activity, link: "/dashboard/activity" },
  { name: "EMERGENCY ALERT", icon: BellRing, link: "/dashboard/emergency", destructive: true },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* --- DASHBOARD HEADER --- */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 px-6 py-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-1 p-1 cursor-pointer">
             <div className="w-5 h-0.5 bg-slate-800 rounded-full"/>
             <div className="w-5 h-0.5 bg-slate-800 rounded-full"/>
             <div className="w-5 h-0.5 bg-slate-800 rounded-full"/>
          </div>
          <Image src="/logo.png" alt="WiseAid" width={28} height={28} className="object-contain" />
          <h1 className="text-lg font-black text-blue-950 tracking-tighter">
            WiseAid <span className="hidden sm:inline text-xs font-bold text-slate-400 ml-1 uppercase tracking-widest">Services</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full text-slate-500">
            <Search size={18} />
          </Button>
          <Link href="/">
             <Button size="sm" variant="ghost" className="font-bold text-slate-500 hover:text-red-600 text-xs">
                <LogOut size={14} className="mr-1.5" /> Logout
             </Button>
          </Link>
        </div>
      </header>
      
      {/* --- MAIN DASHBOARD CONTENT --- */}
      <main className="flex-1 flex flex-col items-center py-12 px-6 max-w-6xl mx-auto w-full">
        
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight mb-3">
                How can we <span className="text-blue-600">help</span> you today?
            </h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                Select a service to proceed. Your safety is our priority.
            </p>
        </div>

        {/* --- SERVICE BUTTON GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
            {services.map((service, idx) => (
              <Link href={service.link} key={idx} className="block group">
                  <div className={`
                      w-full h-full flex flex-col items-center text-center p-8
                      rounded-[32px] border-2 transition-all duration-300 active:scale-[0.97] 
                      ${service.destructive 
                          ? 'bg-red-50/30 border-red-100 hover:bg-red-50 hover:border-red-200 shadow-sm' 
                          : 'bg-white border-slate-100 hover:bg-blue-50/30 hover:border-blue-200 shadow-sm hover:shadow-md'
                      }
                  `}>
                      <div className={`
                         w-16 h-16 rounded-2xl flex items-center justify-center mb-5
                         ${service.destructive 
                            ? 'bg-red-100 text-red-600'
                            : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors'
                         }
                      `}>
                         <service.icon size={32} strokeWidth={2}/>
                      </div>

                      <h3 className={`text-xl font-bold leading-tight ${service.destructive ? 'text-red-950' : 'text-slate-800'}`}>
                         {service.name}
                      </h3>
                      
                      <div className={`mt-4 text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity ${service.destructive ? 'text-red-400' : 'text-blue-400'}`}>
                         Open ➔
                      </div>
                  </div>
              </Link>
            ))}
        </div>
      </main>

      <footer className="py-8 text-center text-slate-400 text-xs border-t border-slate-100 bg-white">
         <p>© 2024 WiseAid Project | Secure Healthcare Dashboard</p>
      </footer>

    </div>
  );
}