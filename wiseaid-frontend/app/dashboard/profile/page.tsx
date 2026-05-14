"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, HeartPulse, Plus, X, Save, Edit3, CheckCircle, Camera, 
  MapPin, Phone, Droplets, User 
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

export default function HealthProfile() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const [diseaseInput, setDiseaseInput] = useState("");
  const [tempDiseases, setTempDiseases] = useState<string[]>([]);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      router.push("/login");
      return;
    }
    fetch(`/api/get-profile?email=${email}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setTempDiseases(data.diseases || []);
      });
  }, [router]);

  // Handle Profile Picture Selection
  const handleImageClick = () => {
    if (isEditing) fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const res = await fetch("/api/complete-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        ...user, 
        diseases: tempDiseases, 
        email: user.email 
      })
    });
    if (res.ok) {
      setIsEditing(false);
      setLoading(false);
    }
  };

  if (!user) return <div className="h-screen flex items-center justify-center bg-[#F7F9FC] font-bold text-blue-600">LOADING YOUR MEDICAL FILE...</div>;

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-800 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-10">
          <button onClick={() => router.push("/dashboard")} className="flex items-center gap-2 font-black text-slate-400 hover:text-blue-600 transition-all text-xl">
            <ArrowLeft size={28} /> BACK
          </button>
          
          <Button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`${isEditing ? 'bg-emerald-500' : 'bg-blue-600'} text-white rounded-3xl px-10 h-16 font-black text-lg shadow-lg active:scale-95 transition-all`}
          >
            {loading ? "SAVING..." : isEditing ? "FINISH & SAVE" : "EDIT MY INFO"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Identity Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-10 rounded-[50px] shadow-sm border border-slate-200 text-center relative overflow-hidden">
              <div 
                className={`relative inline-block mb-6 ${isEditing ? 'cursor-pointer hover:opacity-80' : ''}`}
                onClick={handleImageClick}
              >
                <img 
                  src={user.profileImage || `https://ui-avatars.com/api/?name=${user.fullName}&background=DBEAFE&color=1E40AF`} 
                  className="w-40 h-40 rounded-full border-8 border-slate-50 shadow-inner object-cover"
                />
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full text-white">
                    <Camera size={32} />
                  </div>
                )}
                <CheckCircle className="absolute bottom-2 right-2 text-emerald-500 fill-white" size={32} />
                <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} accept="image/*" />
              </div>
              
              <h2 className="text-3xl font-black text-slate-900 leading-tight">{user.fullName}</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">{user.email}</p>
              
              <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
                <div className="flex items-center justify-between px-4">
                  <span className="text-slate-400 font-bold text-xs uppercase">Blood Group</span>
                  <span className="text-2xl font-black text-red-500 italic">{user.bloodGroup || "O+"}</span>
                </div>
                <div className="flex items-center justify-between px-4">
                   <MapPin size={18} className="text-blue-500" />
                   <span className="font-bold text-slate-700">{user.area}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Health Records Column */}
          <div className="lg:col-span-8">
            <div className="bg-white p-10 rounded-[50px] shadow-sm border border-slate-200 min-h-[600px] flex flex-col">
              <div className="flex items-center gap-4 mb-10">
                <HeartPulse size={36} className="text-red-500" />
                <h3 className="text-3xl font-black text-slate-800">Health History</h3>
              </div>

              {/* Add New Logic */}
              {isEditing && (
                <div className="mb-10 p-8 bg-blue-50 rounded-[40px] border border-blue-100 flex gap-4 animate-in slide-in-from-top-4">
                  <Input 
                    placeholder="Type a condition (e.g. Asthma)..." 
                    className="h-16 rounded-2xl border-none shadow-sm text-xl px-6 bg-white"
                    value={diseaseInput}
                    onChange={(e) => setDiseaseInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && diseaseInput && (setTempDiseases([...tempDiseases, diseaseInput]), setDiseaseInput(""))}
                  />
                  <Button 
                    onClick={() => { if(diseaseInput) { setTempDiseases([...tempDiseases, diseaseInput]); setDiseaseInput(""); } }}
                    className="h-16 w-16 bg-blue-600 text-white rounded-2xl shadow-md"
                  >
                    <Plus size={32} strokeWidth={3} />
                  </Button>
                </div>
              )}

              {/* Conditions List */}
              <div className="flex-1 space-y-4">
                {tempDiseases.map((d, index) => (
                  <div key={index} className="flex items-center justify-between bg-slate-50 p-6 rounded-[30px] border border-slate-100 hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center font-black text-blue-600">
                        {index + 1}
                      </div>
                      <span className="font-black text-slate-700 text-xl tracking-tight uppercase">{d}</span>
                    </div>
                    {isEditing && (
                      <button onClick={() => setTempDiseases(tempDiseases.filter((_, i) => i !== index))} className="text-slate-300 hover:text-red-500 transition-colors">
                        <X size={28} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}