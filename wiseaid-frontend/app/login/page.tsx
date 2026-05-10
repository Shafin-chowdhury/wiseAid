"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { ArrowLeft, Lock, Phone, ShieldCheck, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Handle the Login Redirection
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a brief secure check before redirecting
    setTimeout(() => {
      router.push("/dashboard");
    }, 800); 
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white font-sans">
      
      {/* --- LEFT SIDE: THE LOGIN FORM --- */}
      <div className="flex flex-col justify-center px-8 sm:px-16 md:px-12 lg:px-24 py-12">
        
        {/* Navigation */}
        <div className="mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center text-slate-400 hover:text-blue-600 font-bold transition-all group"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
            Back to Home
          </Link>
        </div>

        {/* Form Container */}
        <div className="max-w-md w-full mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
              Sign In
            </h1>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">
              Access your WiseAid health and emergency dashboard.
            </p>
          </div>

          {/* FORM: handleLogin is attached here */}
          <form className="space-y-7" onSubmit={handleLogin}>
            
            {/* Phone Number Field */}
            <div className="space-y-2.5">
              <label className="text-xs font-black uppercase text-slate-400 tracking-[0.1em] ml-1">
                Registered Phone
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10">
                  <Phone size={20} strokeWidth={2.5} />
                </div>
                <Input 
                  required
                  type="tel"
                  placeholder="01XXXXXXXXX" 
                  className="pl-12 h-14 text-lg border-slate-200 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all" 
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black uppercase text-slate-400 tracking-[0.1em]">
                  Security Password
                </label>
                <Link href="#" className="text-xs font-bold text-blue-600 hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10">
                  <Lock size={20} strokeWidth={2.5} />
                </div>
                <Input 
                  required
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-12 h-14 text-lg border-slate-200 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all" 
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <Button 
                disabled={isLoading}
                type="submit" 
                className="w-full h-14 text-xl font-black bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    SECURELY LOGGING IN...
                  </>
                ) : (
                  "SECURE SIGN IN"
                )}
              </Button>
            </div>
          </form>

          {/* Registration Prompt */}
          <div className="mt-12 p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100/50 text-center">
             <p className="text-slate-600 font-medium text-lg">
               New to WiseAid? 
               <Link href="/register" className="ml-2 text-blue-600 font-black hover:underline underline-offset-4">
                 Create Account
               </Link>
             </p>
          </div>

          {/* Trust Badge */}
          <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
            <ShieldCheck size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">End-to-End Encrypted System</span>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: SUPPORTIVE BRANDING --- */}
      <div className="hidden md:flex flex-col bg-slate-900 relative overflow-hidden items-center justify-center p-12 lg:p-20">
        
        {/* Abstract Background Design */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px] -ml-48 -mb-48" />

        {/* Branding & Content */}
        <div className="relative z-10 w-full max-w-sm">
          <div className="mb-10 inline-flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
            <Image src="/logo.png" alt="WiseAid" width={32} height={32} />
            <span className="text-white font-black text-xl tracking-tighter">WiseAid</span>
          </div>

          <h2 className="text-5xl font-black text-white leading-tight mb-6">
            Safety at your <span className="text-blue-400 text-6xl block mt-2">Fingertips.</span>
          </h2>
          
          <p className="text-slate-300 text-xl font-medium mb-10 leading-relaxed opacity-90">
            Our cyber-physical system bridges the gap between digital care and physical safety for Dhaka’s elderly community.
          </p>

          {/* Visual Trust Element */}
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl group">
             <Image 
                src="/hero2.jpg" 
                alt="Care Support" 
                fill 
                className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
             <div className="absolute bottom-4 left-6">
                <p className="text-white text-sm font-bold opacity-80 uppercase tracking-tighter italic">
                  "Empowering independence since 2024"
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}