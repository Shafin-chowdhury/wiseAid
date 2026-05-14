"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Camera, Save, MapPin, Heart, Phone } from "lucide-react";

export default function EditProfile() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "", phone: "", guardianPhone: "", bloodGroup: "",
    age: "", profileImage: "", diseases: "",
    houseNumber: "", floor: "", apartment: "", additionalNotes: "", address: ""
  });

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    fetch(`/api/get-profile?email=${email}`).then(res => res.json()).then(data => {
      setFormData({
        ...data,
        houseNumber: data.detailedAddress?.houseNumber || "",
        floor: data.detailedAddress?.floor || "",
        apartment: data.detailedAddress?.apartment || "",
        additionalNotes: data.detailedAddress?.additionalNotes || "",
        address: data.liveLocation?.address || ""
      });
    });
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const email = localStorage.getItem("userEmail");
    
    const payload = {
      email,
      ...formData,
      detailedAddress: {
        houseNumber: formData.houseNumber,
        floor: formData.floor,
        apartment: formData.apartment,
        additionalNotes: formData.additionalNotes
      },
      liveLocation: { address: formData.address },
      diseases: typeof formData.diseases === 'string' ? formData.diseases.split(",") : formData.diseases
    };

    const res = await fetch("/api/complete-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) router.push("/dashboard");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] p-6 lg:p-12 font-sans">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-2xl p-8 lg:p-16 border border-white">
        <h1 className="text-4xl font-black text-slate-800 mb-10 italic tracking-tighter">Medical File Update</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* IMAGE UPLOAD SECTION */}
          <div className="flex flex-col items-center gap-4">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-48 h-48 rounded-[40px] bg-slate-100 border-4 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all overflow-hidden relative group"
            >
              {formData.profileImage ? (
                <img src={formData.profileImage} className="w-full h-full object-cover" />
              ) : (
                <Camera size={40} className="text-slate-400" />
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-black uppercase">Change Photo</span>
              </div>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Clear Face Photo Required</p>
          </div>

          {/* FORM FIELDS */}
          <div className="md:col-span-2 grid grid-cols-2 gap-6">
            <Input 
  placeholder="Full Name" 
  value={formData.fullName} 
  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} 
/>
<Input 
  placeholder="Blood Group" 
  value={formData.bloodGroup} 
  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })} 
/>
<Input 
  placeholder="Personal Phone" 
  value={formData.phone} 
  onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
/>
<Input 
  placeholder="Guardian Phone" 
  value={formData.guardianPhone} 
  onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })} 
/>
            
            <div className="col-span-2 bg-blue-50 p-6 rounded-3xl space-y-4">
              <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest flex items-center gap-2"><MapPin size={14}/> Rescue Coordinates</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input label="House/Holding #" value={formData.houseNumber} onChange={v => setFormData({...formData, houseNumber: v})} required />
                <Input label="Floor Level" value={formData.floor} onChange={v => setFormData({...formData, floor: v})} required placeholder="Ex: 4th Floor" />
                <Input label="Flat / Apt #" value={formData.apartment} onChange={v => setFormData({...formData, apartment: v})} />
                <Input label="Area / Sector" value={formData.address} onChange={v => setFormData({...formData, address: v})} required />
              </div>
              <textarea 
                className="w-full bg-white border-none rounded-2xl p-4 text-sm font-bold" 
                placeholder="Landmarks or gate codes..."
                value={formData.additionalNotes}
                onChange={e => setFormData({...formData, additionalNotes: e.target.value})}
              />
            </div>

            <button disabled={loading} className="col-span-2 bg-blue-600 text-white p-6 rounded-3xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
              {loading ? "SAVING..." : "CONFIRM PROFILE DETAILS"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, required = false }: any) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">{label}</label>
      <input 
        required={required}
        value={value} 
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 transition-all" 
      />
    </div>
  );
}