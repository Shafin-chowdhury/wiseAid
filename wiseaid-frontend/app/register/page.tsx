"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { ArrowLeft, User, Phone, Calendar, MapPin, ShieldCheck, Loader2, Lock, Mail } from "lucide-react";

const DHAKA_AREAS = ["Dhanmondi", "Gulshan", "Banani", "Mirpur", "Uttara", "Mohammadpur", "Badda", "Motijheel", "Old Dhaka"];

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "", email: "", age: "", phone: "", area: "", password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 1. First, send the request to the server
      const res = await fetch("/api/register-patient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // 2. Now check if the server responded successfully
      if (res.ok) {
        // Save email so the next page knows who is updating their profile
        localStorage.setItem("userEmail", formData.email);
        
        // Move to the next step: Complete Profile
        router.push("/complete-profile");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Failed to connect to server. Check your terminal for errors.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white font-sans">
      <div className="flex flex-col justify-center px-8 sm:px-16 md:px-12 lg:px-24 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-slate-400 hover:text-blue-600 font-bold transition-all">
            <ArrowLeft size={20} className="mr-2" /> Back
          </Link>
        </div>
        
        <div className="max-w-md w-full mx-auto text-slate-900">
          <h1 className="text-4xl font-black tracking-tight mb-3">Join WiseAid</h1>
          <p className="text-slate-500 font-medium text-lg mb-6">Create your patient profile.</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-bold border border-red-100">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input required name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Abul Kashem" className="pl-12 h-12 border-slate-200 rounded-xl" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="patient@mail.com" className="pl-12 h-12 border-slate-200 rounded-xl" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Age</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input required type="number" name="age" value={formData.age} onChange={handleChange} placeholder="65" className="pl-12 h-12 border-slate-200 rounded-xl" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input required name="phone" value={formData.phone} onChange={handleChange} placeholder="017..." className="pl-12 h-12 border-slate-200 rounded-xl" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Dhaka Area</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select required name="area" value={formData.area} onChange={handleChange} className="w-full pl-12 h-12 border border-slate-200 rounded-xl bg-white outline-none appearance-none">
                  <option value="">Select your area...</option>
                  {DHAKA_AREAS.map(area => <option key={area} value={area}>{area}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input required type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Min. 8 characters" className="pl-12 h-12 border-slate-200 rounded-xl" />
              </div>
            </div>

            <Button disabled={isLoading} type="submit" className="w-full h-14 text-lg font-black bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg mt-4 transition-all">
              {isLoading ? <Loader2 className="animate-spin" /> : "REGISTER NOW"}
            </Button>
          </form>
          
          <p className="mt-8 text-center text-slate-600 font-medium text-sm">
            Already have an account? <Link href="/login" className="text-blue-600 font-black hover:underline">Log In</Link>
          </p>
        </div>
      </div>

      <div className="hidden md:flex flex-col bg-slate-900 items-center justify-center p-12 text-center text-white relative">
        <div className="max-w-xs relative z-10">
          <div className="w-20 h-20 bg-blue-600/20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-blue-500/30">
            <ShieldCheck size={48} className="text-blue-400" />
          </div>
          <h2 className="text-3xl font-black mb-4 tracking-tight uppercase">WiseAid Secure</h2>
          <p className="text-slate-400 leading-relaxed text-sm">Dedicated secure database for patient emergency access.</p>
        </div>
      </div>
    </div>
  );
}