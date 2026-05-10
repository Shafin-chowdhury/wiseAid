"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { 
  ArrowLeft, 
  Search, 
  ChevronRight, 
  Star, 
  User, 
  Stethoscope,
  MapPin,
  Clock
} from "lucide-react";

const doctors = [
  { id: 1, name: "Dr. Shah", specialty: "Cardiologist", rating: 4.9, bio: "Heart specialist with 20+ years of experience.", available: "Today", image: "👨‍⚕️" },
  { id: 2, name: "Dr. Khan", specialty: "Neurologist", rating: 4.8, bio: "Specialist in brain and nervous system health.", available: "Tomorrow", image: "👩‍⚕️" },
  { id: 3, name: "Dr. Lee", specialty: "Psychiatrist", rating: 4.7, bio: "Mental health and wellness expert.", available: "Sep 12", image: "👨‍⚕️" },
  { id: 4, name: "Dr. Eril", specialty: "Gynecologist", rating: 4.9, bio: "Women's health and maternity specialist.", available: "Today", image: "👩‍⚕️" },
  { id: 5, name: "Dr. Ahmed", specialty: "General Medicine", rating: 4.6, bio: "Primary care physician for daily health.", available: "Today", image: "👨‍⚕️" },
  { id: 6, name: "Dr. Sarah", specialty: "Pediatrician", rating: 4.8, bio: "Expert in child health and nutrition.", available: "Sep 11", image: "👩‍⚕️" },
];

export default function DoctorList() {
  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(search.toLowerCase()) || 
    doc.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* --- TOP HEADER --- */}
      <header className="sticky top-0 z-50 bg-white border-b-4 border-blue-600 px-8 py-6 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center text-slate-600 hover:text-blue-600 font-black transition-all group">
            <ArrowLeft size={32} className="mr-2 group-hover:-translate-x-2 transition-transform" /> 
            <span className="text-xl uppercase tracking-tight">Return</span>
          </Link>
          <div className="h-10 w-1 bg-slate-200 hidden md:block" />
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
            Find Your Doctor
          </h1>
        </div>
        
        <div className="hidden md:flex items-center gap-4 bg-blue-50 px-6 py-2 rounded-2xl border border-blue-100">
          <Stethoscope className="text-blue-600" size={24} />
          <span className="font-bold text-blue-800">10+ Specialists Available</span>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-12 space-y-10">
        
        {/* --- EXTRA LARGE SEARCH AREA --- */}
        <section className="space-y-4">
          <label className="text-lg font-black text-slate-700 ml-2 italic">Who are you looking for?</label>
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={30} />
            <Input 
              placeholder="Search by Doctor Name or Specialty (e.g. Heart)" 
              className="pl-16 h-20 text-xl bg-white border-4 border-slate-200 rounded-[30px] shadow-lg focus:border-blue-500 focus:ring-0 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </section>

        {/* --- DOCTOR GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredDoctors.map((doc) => (
            <Link key={doc.id} href={`/dashboard/appointment/${doc.id}`} className="group">
              <div className="h-full bg-white rounded-[40px] border-2 border-slate-100 p-8 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all flex flex-col justify-between">
                
                <div className="flex items-start gap-6">
                  {/* Big Avatar */}
                  <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center text-5xl border-2 border-blue-100 group-hover:scale-110 transition-transform">
                    {doc.image}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black text-slate-900 leading-none">{doc.name}</h3>
                      <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-3 py-1 rounded-full">
                        <Star size={18} fill="currentColor" />
                        <span className="font-black text-sm">{doc.rating}</span>
                      </div>
                    </div>
                    <p className="text-blue-600 font-black text-lg mt-1 uppercase tracking-tight">{doc.specialty}</p>
                    <p className="text-slate-500 mt-3 font-medium leading-relaxed italic line-clamp-2">
                      {doc.bio}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock size={20} className="text-green-500" />
                    <span className="font-bold">Next Available: <span className="text-green-600">{doc.available}</span></span>
                  </div>
                  <div className="flex items-center gap-2 font-black text-blue-600 group-hover:translate-x-2 transition-transform">
                    BOOK NOW <ChevronRight size={24} strokeWidth={3} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[40px] border-4 border-dashed border-slate-200">
            <User size={64} className="mx-auto text-slate-300 mb-4" />
            <h2 className="text-2xl font-black text-slate-400">No doctors found matching "{search}"</h2>
            <Button 
              onClick={() => setSearch("")}
              className="mt-6 bg-blue-600 font-bold rounded-xl h-12 px-8"
            >
              Clear Search
            </Button>
          </div>
        )}
      </main>
      
      <footer className="p-10 text-center text-slate-400 font-bold bg-white border-t border-slate-100 uppercase tracking-widest text-xs">
        WiseAid Medical Network &bull; Verified Specialists Only
      </footer>
    </div>
  );
}