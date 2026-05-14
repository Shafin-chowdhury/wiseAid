"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { 
  MapPin, Camera, Activity, Home, Loader2, Plus, X, 
  HeartPulse, Sparkles, Navigation, ChevronRight, 
  Droplets, UserCircle, PhoneCall, AlertTriangle , ShieldCheck
} from "lucide-react";

export default function CompleteProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  
  const [diseaseInput, setDiseaseInput] = useState("");
  const [diseaseList, setDiseaseList] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [extraData, setExtraData] = useState({
    bloodGroup: "",
    guardianName: "",
    guardianPhone: "",
    houseNumber: "",
    floor: "",
  });

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) setUserEmail(email);
  }, []);

  const addDisease = () => {
    if (diseaseInput.trim()) {
      setDiseaseList([...diseaseList, diseaseInput.trim()]);
      setDiseaseInput("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (diseaseList.length === 0) return alert("Please add at least one condition.");
    setLoading(true);

    const payload = {
      email: userEmail,
      diseases: diseaseList,
      ...extraData,
      liveLocation: { lat: 23.8103, lng: 90.4125, address: "Dhaka, Bangladesh" }
    };

    const res = await fetch("/api/complete-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) router.push("/dashboard");
    else { setLoading(false); alert("Error saving profile"); }
  };

  return (
    <div className="h-screen w-full bg-[#0F172A] flex overflow-hidden font-sans text-white">
      
      {/* LEFT PANEL: Identity & Emergency Contacts */}
      <div className="w-[400px] bg-slate-900 border-r border-slate-800 p-8 flex flex-col justify-between shadow-2xl z-10">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tighter leading-none">WISEAID</h2>
              <span className="text-[10px] text-blue-400 font-bold tracking-[3px] uppercase">Safety Protocol</span>
            </div>
          </div>

          {/* Photo Upload with High Visibility */}
          <div className="relative w-36 h-36 mb-8 mx-auto group">
            <label className="cursor-pointer block w-full h-full rounded-[40px] bg-slate-800 border-2 border-blue-500/30 hover:border-blue-500 transition-all overflow-hidden flex items-center justify-center relative">
              {imagePreview ? (
                <img src={imagePreview} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <Camera className="mx-auto text-blue-400 mb-2" size={32} />
                  <span className="text-[10px] font-black text-slate-400 uppercase">Upload Face</span>
                </div>
              )}
              <input type="file" className="hidden" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setImagePreview(reader.result as string);
                  reader.readAsDataURL(file);
                }
              }} />
            </label>
          </div>

          <div className="space-y-6">
            {/* Blood Group Selector */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-blue-400 tracking-widest flex items-center gap-2">
                <Droplets size={14} /> Blood Group
              </label>
              <select 
                className="w-full bg-slate-800 border-none rounded-xl h-12 px-4 text-sm font-bold text-white outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setExtraData({...extraData, bloodGroup: e.target.value})}
              >
                <option value="">Select...</option>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-red-400 tracking-widest flex items-center gap-2">
                <PhoneCall size={14} /> Emergency Contact
              </label>
              <Input 
                placeholder="Guardian Name" 
                className="bg-slate-800 border-none rounded-xl h-12 text-white placeholder:text-slate-500"
                onChange={(e) => setExtraData({...extraData, guardianName: e.target.value})}
              />
              <Input 
                placeholder="Guardian Phone" 
                className="bg-slate-800 border-none rounded-xl h-12 text-white placeholder:text-slate-500"
                onChange={(e) => setExtraData({...extraData, guardianPhone: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Mini Location Card */}
        <div className="bg-blue-600 rounded-3xl p-5 shadow-xl shadow-blue-900/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg"><Navigation size={18} /></div>
            <span className="text-xs font-black uppercase tracking-tight">Active Tracking</span>
          </div>
          <p className="text-xs text-blue-100 font-medium">Dhaka, Bangladesh Area</p>
        </div>
      </div>

      {/* RIGHT PANEL: Medical Condition Builder */}
      <div className="flex-1 p-12 bg-white flex flex-col relative">
        <div className="max-w-2xl w-full mx-auto flex flex-col h-full z-10">
          
          <div className="mb-10">
            <div className="flex items-center gap-2 text-red-500 mb-2">
              <AlertTriangle size={20} />
              <span className="text-xs  font-black uppercase tracking-widest">Medical Critical Data</span>
            </div>
            <h2 className="text-4xl text-black font-black tracking-tight mb-2">Health Record Builder</h2>
            <p className="text-slate-400 text-lg">Add all chronic illnesses or past surgeries.</p>
          </div>

          {/* Add Form - High Contrast */}
          <div className="bg-slate-900 p-8 rounded-[40px] border border-slate-800 mb-8 shadow-2xl">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <HeartPulse className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500" size={24} />
                <Input 
                  placeholder="Enter condition (e.g. Diabetes, Asthma)" 
                  className="bg-slate-950 border-slate-800 pl-14 h-16 rounded-2xl text-lg focus:border-blue-500 transition-all"
                  value={diseaseInput}
                  onChange={(e) => setDiseaseInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addDisease()}
                />
              </div>
              <Button onClick={addDisease} className="h-16 px-10 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-md shadow-lg shadow-blue-600/20">
                ADD
              </Button>
            </div>
          </div>

          {/* THE SCROLLABLE LIST */}
          <div className="flex-1 overflow-y-auto pr-4 space-y-4 custom-scrollbar">
            {diseaseList.map((disease, index) => (
              <div key={index} className="bg-slate-900 p-6 rounded-3xl border-l-4 border-l-blue-600 border-y border-r border-slate-800 flex items-center justify-between animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-blue-500 font-black text-xl">
                    {index + 1}
                  </div>
                  <span className="font-black text-white uppercase text-sm tracking-widest">{disease}</span>
                </div>
                <button onClick={() => removeDisease(index)} className="w-10 h-10 rounded-full hover:bg-red-500/10 flex items-center justify-center text-slate-500 hover:text-red-500 transition-all">
                  <X size={24} />
                </button>
              </div>
            ))}
            {diseaseList.length === 0 && (
              <div className="h-40 border-2 border-dashed border-slate-800 rounded-[40px] flex flex-col items-center justify-center opacity-30">
                <Activity size={48} className="mb-2 text-black " />
                <p className="font-bold uppercase text-black  tracking-widest text-xs">Awaiting Medical Data</p>
              </div>
            )}
          </div>

          {/* THE BIG BUTTON */}
          <div className="pt-10">
            <Button 
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-20 bg-white hover:bg-slate-200 text-slate-900 rounded-[30px] font-black text-xl shadow-2xl flex items-center justify-center gap-4 active:scale-95 transition-all"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>SECURE MY ACCOUNT <ChevronRight size={28} /></>
              )}
            </Button>
          </div>
        </div>

        {/* Subtle Decorative Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      </div>
    </div>
  );
}

