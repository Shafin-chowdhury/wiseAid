"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { AlertTriangle, User, Phone, Info } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 relative">
      
      {/* --- NAVBAR --- */}
      <nav className="flex items-center justify-between px-8 h-16 bg-white sticky top-0 z-50 border-b border-slate-100 shadow-sm">
        <div className="flex items-center relative">
          
          {/* LARGE FLOATING LOGO 
              This container is 80px (h-20) while the nav is 64px (h-16).
              The -mt-1 and translate-y make it look balanced.
          */}
          <div className="absolute  left-0 w-30 h-30">
            <Image 
              src="/logo.png" 
              alt="WiseAid Logo" 
              fill
              className="object-contain drop-shadow-md"
              priority
            />
          </div>
          
          {/* Text moved to the right to make room for the big logo */}
          <span className="text-2xl font-black text-[#0b8fac] tracking-tighter ml-24">
            WISE
          </span>
          <span className="text-red-950 font-bold">AID</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-bold text-slate-600 text-sm">
          <Link href="#services" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <Info size={16} /> Services
          </Link>
          <Link href="#about" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            About Us
          </Link>
        </div>

        {/* Auth Actions */}
       <div className="flex items-center gap-3">
  {/* Link to the Login Page */}
  <Link href="/login">
    <Button variant="ghost" size="sm" className="font-bold text-slate-700">
      Login
    </Button>
  </Link>
  
  {/* Link to the Register Page */}
  <Link href="/register">
    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 font-bold px-5">
      Register
    </Button>
  </Link>
</div>
      </nav>

      {/* --- HERO SECTION --- */}
      <div className="bg-slate-900 min-h-[85vh] w-full flex flex-col md:flex-row">
        
        {/* LEFT SIDE: TEXT CONTENT */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-12 z-10 bg-slate-900">
          <span className="text-blue-400 font-bold tracking-widest text-sm mb-4">
            PROJECT WISEAID 2.0
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1]">
            Instant Care <br /> 
            <span className="text-blue-500">Connect.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-md mb-10 leading-relaxed">
            Bridging the gap between elderly citizens and emergency medical services 
            through IoT-integrated assistance and real-time monitoring.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" variant="destructive" className="px-10 h-16 text-xl text-white font-bold rounded-full shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:scale-105 transition-transform">
              <AlertTriangle className="mr-2" /> GET HELP
            </Button>
            <Button size="lg" variant="outline" className="px-10 h-16 text-xl font-bold rounded-full text-blue border-white hover:bg-white hover:text-slate-900 transition-all">
              LEARN MORE
            </Button>
          </div>
        </div>

        {/* RIGHT SIDE: PHOTO COLLAGE */}
        <div className="flex-1 h-[60vh] md:h-auto grid grid-cols-2 grid-rows-2 gap-2 p-2 bg-slate-800">
          
          {/* 1. Large Landscape Photo (Top Half) */}
          <div className="relative col-span-2 row-span-1 overflow-hidden rounded-lg">
            <Image
              src="/hero1.jpg" 
              alt="Main Landscape"
              fill
              className="object-cover hover:scale-110 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
          </div>

          {/* 2. Horizontal Photo 1 (Bottom Left) */}
          <div className="relative col-span-1 row-span-1 overflow-hidden rounded-lg">
            <Image
              src="/hero2.jpg" 
              alt="Support Service"
              fill
              className="object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* 3. Horizontal Photo 2 (Bottom Right) */}
          <div className="relative col-span-1 row-span-1 overflow-hidden rounded-lg">
            <Image
              src="/hero3.jpg" 
              alt="Medical Monitoring"
              fill
              className="object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 text-slate-500 py-10 text-center text-xs border-t border-slate-900">
        <div className="flex flex-col gap-2">
                <div className="flex justify-center gap-4 mt-2">
            <span className="flex items-center gap-1"><Phone size={12} /> Dhaka, Bangladesh</span>
          </div>
        </div>
      </footer>
    </main>
  );
}