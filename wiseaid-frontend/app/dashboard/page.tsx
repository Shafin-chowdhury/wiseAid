// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { 
//   UserCircle, ShieldCheck, Bell, LogOut, 
//   Stethoscope, Truck, Pill, Utensils, Activity, AlertCircle, ChevronRight, Camera
// } from "lucide-react";

// export default function Dashboard() {
//   const router = useRouter();
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [user, setUser] = useState<any>(null);
//   const [isSosLoading, setIsSosLoading] = useState(false);

//   // 1. Fetch User Data on Load
//   useEffect(() => {
//     const userEmail = localStorage.getItem("userEmail");
//     if (!userEmail) {
//       router.push("/login");
//       return;
//     }

//     fetch(`/api/get-profile?email=${userEmail}`)
//       .then((res) => res.json())
//       .then((data) => setUser(data))
//       .catch((err) => console.error("Error fetching user:", err));
//   }, [router]);

//   // 2. Handle Profile Picture Update
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = async () => {
//         const base64Image = reader.result as string;
        
//         // Update UI immediately
//         setUser({ ...user, profileImage: base64Image });
        
//         // Save to Database via API
//         try {
//           await fetch("/api/complete-profile", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email: user.email, profileImage: base64Image })
//           });
//         } catch (error) {
//           console.error("Failed to save image:", error);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // 3. Handle Emergency SOS (Notifies Admin)
//   const handleSOS = async () => {
//     setIsSosLoading(true);
//     try {
//       const res = await fetch("/api/sos", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: user?.fullName,
//           email: user?.email,
//           location: user?.area || "Unknown Location",
//           time: new Date().toISOString()
//         })
//       });

//       if (res.ok) {
//         alert("🚨 EMERGENCY ALERT SENT! Help is on the way.");
//       }
//     } catch (error) {
//       alert("SOS failed to send. Please call emergency services directly.");
//     } finally {
//       setIsSosLoading(false);
//     }
//   };

//   const services = [
//     { title: 'My Health Profile', path: '/dashboard/profile', icon: <UserCircle />, color: 'bg-blue-100 text-blue-600' },
//     { title: 'Request Ambulance', path: '/dashboard/ambulance', icon: <Truck />, color: 'bg-red-100 text-red-600' },
//     { title: 'Medicine Reminder', path: '/dashboard/medicine', icon: <Pill />, color: 'bg-emerald-100 text-emerald-600' },
//     { title: 'Daily Meal Planner', path: '/dashboard/meals', icon: <Utensils />, color: 'bg-orange-100 text-orange-600' },
//     { title: 'Book Appointment', path: '/dashboard/appointment', icon: <Stethoscope />, color: 'bg-indigo-100 text-indigo-600' },
//     { title: 'IOT Health Activity', path: '/dashboard/activity', icon: <Activity />, color: 'bg-cyan-100 text-cyan-600' },
//   ];

//   return (
//     <div className="h-screen w-full bg-[#F0F4F8] flex overflow-hidden font-sans text-slate-800">
      
//       {/* Sidebar Section */}
//       <aside className="w-80 bg-white border-r border-slate-200 flex flex-col p-8 shadow-sm">
//         <div className="flex flex-col items-center mb-10 text-center">
          
//           {/* Profile Image with Camera Overlay */}
//           <div 
//             className="group relative w-28 h-28 rounded-full bg-slate-100 border-4 border-white shadow-md overflow-hidden mb-4 cursor-pointer"
//             onClick={() => fileInputRef.current?.click()}
//           >
//             {user?.profileImage ? (
//               <img src={user.profileImage} className="w-full h-full object-cover" alt="User Profile" />
//             ) : (
//               <UserCircle size={112} className="text-slate-300"/>
//             )}
//             <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//               <Camera className="text-white" size={24} />
//             </div>
//             <input type="file" ref={fileInputRef} hidden onChange={handleImageUpload} accept="image/*" />
//           </div>

//           <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">
//             {user?.fullName || "Welcome"}
//           </h2>
//           <div className="mt-2 inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-100">
//             <ShieldCheck size={12} /> Verified Patient
//           </div>
//         </div>

//         <nav className="flex-1 space-y-2">
//           {['Home', 'Notifications', 'Settings'].map((item) => (
//             <button key={item} className="w-full text-left px-6 py-4 rounded-2xl text-slate-500 font-bold hover:bg-blue-50 hover:text-blue-600 transition-all">
//               {item}
//             </button>
//           ))}
//         </nav>

//         <button 
//           onClick={() => { localStorage.clear(); router.push('/login'); }} 
//           className="w-full py-4 rounded-2xl bg-slate-50 text-slate-400 font-black text-sm hover:bg-red-50 hover:text-red-600 transition-all mt-4 border border-slate-100"
//         >
//           LOGOUT
//         </button>
//       </aside>

//       {/* Main Content Area */}
//       <main className="flex-1 p-10 overflow-y-auto">
//         <div className="max-w-5xl mx-auto">
//           <header className="mb-10">
//             <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">
//               Hello, {user?.fullName?.split(' ')[0] || "User"}!
//             </h1>
//             <p className="text-slate-500 font-medium text-lg italic">How can WiseAid support you today?</p>
//           </header>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {services.map((s, i) => (
//               <div 
//                 key={i}
//                 onClick={() => router.push(s.path)}
//                 className="bg-white p-8 rounded-[40px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer border border-slate-50 flex flex-col group"
//               >
//                 <div className={`${s.color} w-16 h-16 rounded-[24px] flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform`}>
//                   {React.cloneElement(s.icon as React.ReactElement, { size: 32 })}
//                 </div>
//                 <h3 className="text-slate-800 font-black text-xl mb-1 leading-tight">{s.title}</h3>
//                 <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Access Service</p>
//               </div>
//             ))}

//             {/* Emergency SOS Button */}
//             <div 
//               onClick={!isSosLoading ? handleSOS : undefined}
//               className={`lg:col-span-3 ${isSosLoading ? 'bg-red-300' : 'bg-red-500 hover:bg-red-600'} p-10 rounded-[45px] flex items-center justify-between shadow-xl shadow-red-200 cursor-pointer transition-all active:scale-95 border-4 border-red-400`}
//             >
//               <div className="flex items-center gap-8">
//                 <div className="bg-white/20 p-5 rounded-full animate-pulse">
//                   <AlertCircle size={48} className="text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-3xl font-black text-white tracking-tight">EMERGENCY SOS</h3>
//                   <p className="text-red-100 font-bold text-lg opacity-90">
//                     {isSosLoading ? "SENDING ALERT..." : "Alert your family and local hub instantly"}
//                   </p>
//                 </div>
//               </div>
//               <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
//                 <ChevronRight size={40} className="text-white" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }





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
    { title: 'My Health Profile', path: '/dashboard/profile', icon: <UserCircle />, color: 'bg-blue-100 text-blue-600' },
    { title: 'Book Appointment', path: '/dashboard/appointment', icon: <Stethoscope />, color: 'bg-indigo-100 text-indigo-600' },
    { title: 'Request Ambulance', path: '/dashboard/ambulance', icon: <Truck />, color: 'bg-red-100 text-red-600' },
    { title: 'Medicine Reminder', path: '/dashboard/medicine', icon: <Pill />, color: 'bg-emerald-100 text-emerald-600' },
    { title: 'Daily Meal Planner', path: '/dashboard/meals', icon: <Utensils />, color: 'bg-orange-100 text-orange-600' },
    { title: 'IOT Health Activity', path: '/dashboard/activity', icon: <Activity />, color: 'bg-cyan-100 text-cyan-600' },
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
            {services.map((s, i) => (
              <div key={i} onClick={() => router.push(s.path)} className="bg-white p-8 rounded-[40px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer border border-slate-50 flex flex-col group">
                <div className={`${s.color} w-16 h-16 rounded-[24px] flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform`}>
                  {React.cloneElement(s.icon as React.ReactElement, { size: 32 })}
                </div>
                <h3 className="text-slate-800 font-black text-xl mb-1">{s.title}</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Access Service</p>
              </div>
            ))}

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