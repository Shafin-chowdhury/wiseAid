"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { ArrowLeft, User, Phone, Calendar, MapPin, ShieldCheck, Loader2 } from "lucide-react";

const DHAKA_AREAS = [
  "Dhanmondi", "Gulshan", "Banani", "Mirpur", "Uttara", 
  "Mohammadpur", "Badda", "Motijheel", "Old Dhaka"
];

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle registration and redirect
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate account creation delay
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      
      {/* --- LEFT SIDE: REGISTRATION FORM --- */}
      <div className="flex flex-col justify-center px-8 sm:px-16 md:px-12 lg:px-24 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-slate-400 hover:text-blue-600 font-bold transition-all group">
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Join WiseAid</h1>
          <p className="text-slate-500 font-medium text-lg mb-10">Sign up to enable your emergency protection system.</p>

          {/* Form with onSubmit handler */}
          <form className="space-y-6" onSubmit={handleRegister}>
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-1 tracking-wider">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 z-10" size={20} />
                <Input 
                  required 
                  placeholder="Abul Kashem" 
                  className="pl-12 h-14 text-lg border-slate-200 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all" 
                />
              </div>
            </div>

            {/* Age & Phone Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-1 tracking-wider">Age</label>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 z-10" size={20} />
                  <Input 
                    required 
                    type="number" 
                    placeholder="65" 
                    className="pl-12 h-14 text-lg border-slate-200 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-1 tracking-wider">Phone</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 z-10" size={20} />
                  <Input 
                    required 
                    placeholder="017..." 
                    className="pl-12 h-14 text-lg border-slate-200 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all" 
                  />
                </div>
              </div>
            </div>

            {/* Area Selector */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-1 tracking-wider">Dhaka Area</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 z-10" size={20} />
                <select 
                  required 
                  className="w-full pl-12 h-14 text-lg border-2 border-slate-200 rounded-2xl bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all appearance-none"
                >
                  <option value="">Select your area...</option>
                  {DHAKA_AREAS.map(area => <option key={area} value={area}>{area}</option>)}
                </select>
              </div>
            </div>

            <Button 
              disabled={isLoading}
              type="submit" 
              className="w-full h-14 text-xl font-black bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg shadow-blue-200 mt-4 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  CREATING ACCOUNT...
                </>
              ) : (
                "REGISTER NOW"
              )}
            </Button>
          </form>

          <p className="mt-10 text-center text-slate-600 font-medium">
            Already have an account? <Link href="/login" className="text-blue-600 font-black hover:underline">Log In</Link>
          </p>
        </div>
      </div>

      {/* --- RIGHT SIDE: BRANDING --- */}
      <div className="hidden md:flex flex-col bg-slate-900 items-center justify-center p-12 text-center relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />

        <div className="max-w-xs text-white relative z-10">
          <div className="w-20 h-20 bg-blue-600/20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-blue-500/30">
            <ShieldCheck size={48} className="text-blue-400" />
          </div>
          <h2 className="text-3xl font-black mb-4 tracking-tight">Secure & Reliable</h2>
          <p className="text-slate-400 leading-relaxed text-lg">
            Your data is encrypted and shared only with verified emergency response teams in Dhaka.
          </p>
        </div>
      </div>
    </div>
  );
}