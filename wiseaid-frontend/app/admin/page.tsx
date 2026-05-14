"use client";
import React, { useEffect, useState } from "react";
import { 
  Search, Users, MapPin, Phone, Heart, 
  ShieldAlert, X, Activity, ChevronRight, 
  AlertTriangle, ShieldCheck, Download
} from "lucide-react";

export default function AdminDashboard() {
  const [patients, setPatients] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]); // SOS Alerts
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data & Set Up SOS Polling
  const fetchData = async () => {
    try {
      // Get all registered patients
      const pRes = await fetch("/api/admin/patients");
      const pData = await pRes.json();
      setPatients(pData);

      // Get any active SOS signals
      const aRes = await fetch("/api/sos");
      const aData = await aRes.json();
      setAlerts(aData);
    } catch (err) {
      console.error("Dashboard sync error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Check for SOS every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // 2. Filter logic for Search (Name or ID)
  const filteredPatients = patients.filter(p => 
    p.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p._id?.toString().slice(-6).toUpperCase().includes(searchQuery.toUpperCase())
  );

  return (
    <div className="h-screen w-full bg-[#F8FAFC] flex overflow-hidden font-sans text-slate-800">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-slate-900 flex flex-col p-8 shrink-0 transition-all">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
            <ShieldCheck className="text-white" size={24} />
          </div>
          <h2 className="text-xl font-black text-white tracking-tighter uppercase italic">
            WiseAid <span className="text-blue-400">Admin</span>
          </h2>
        </div>

        <nav className="flex-1 space-y-4">
          <button className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-blue-600 text-white font-black shadow-xl shadow-blue-600/20 transition-all">
            <Activity size={20}/> Dashboard
          </button>
          <button className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-500 font-bold hover:bg-slate-800 hover:text-white transition-all">
            <Users size={20}/> Patients
          </button>
        </nav>

        <div className="mt-auto p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Network Live</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 overflow-y-auto relative">
        
        {/* --- LIVE SOS ALERT POPUP --- */}
        {alerts.length > 0 && (
          <div className="fixed top-10 right-10 z-[200] space-y-4 max-w-sm w-full">
            {alerts.map((a, i) => (
              <div key={i} className="bg-red-600 text-white p-6 rounded-[35px] shadow-2xl flex items-center gap-6 border-4 border-white animate-bounce">
                <div className="bg-white/20 p-3 rounded-full"><AlertTriangle size={28} /></div>
                <div className="flex-1">
                  <h4 className="font-black text-lg uppercase leading-none mb-1">EMERGENCY SOS</h4>
                  <p className="text-xs font-bold opacity-90">{a.name} is calling for help!</p>
                </div>
                <button onClick={() => setAlerts([])} className="bg-white/10 p-2 rounded-full hover:bg-white/30 transition-colors">
                  <X size={18}/>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          {/* Header & Search */}
          <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Command Center</h1>
              <p className="text-slate-400 font-bold text-sm italic">Real-time patient oversight</p>
            </div>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              <input 
                type="text" 
                placeholder="Search Name or ID (ex: 4FB92)..." 
                className="w-full pl-12 pr-6 py-4 bg-white border-none rounded-[20px] shadow-sm font-bold text-slate-600 focus:ring-2 focus:ring-blue-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </header>

          {/* --- THE 3 STAT CARDS --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex items-center gap-6">
              <div className="bg-blue-50 p-5 rounded-[24px] text-blue-600"><Users size={32}/></div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registered</p>
                <h2 className="text-4xl font-black">{patients.length}</h2>
              </div>
            </div>
            <div className={`p-8 rounded-[40px] shadow-sm border flex items-center gap-6 transition-all ${alerts.length > 0 ? 'bg-red-50 border-red-200 animate-pulse' : 'bg-white border-slate-100'}`}>
              <div className={`p-5 rounded-[24px] ${alerts.length > 0 ? 'bg-red-500 text-white shadow-lg shadow-red-200' : 'bg-slate-50 text-slate-300'}`}>
                <AlertTriangle size={32}/>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active SOS</p>
                <h2 className={`text-4xl font-black ${alerts.length > 0 ? 'text-red-600' : 'text-slate-800'}`}>{alerts.length}</h2>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex items-center gap-6">
              <div className="bg-emerald-50 p-5 rounded-[24px] text-emerald-500"><ShieldCheck size={32}/></div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Status</p>
                <h2 className="text-2xl font-black text-emerald-600 uppercase tracking-tighter">Safe</h2>
              </div>
            </div>
          </div>

          {/* PATIENT TABLE */}
          <div className="bg-white rounded-[45px] shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
              <h3 className="font-black text-xl text-slate-800 italic">User Directory</h3>
              <button className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 hover:text-blue-600 transition-colors">
                <Download size={14}/> Download Records
              </button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="px-10 py-5">Patient Details</th>
                  <th className="px-10 py-5">General Area</th>
                  <th className="px-10 py-5 text-right">Records</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredPatients.map((p) => (
                  <tr key={p._id} className="hover:bg-blue-50/40 transition-colors group">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <img 
                          src={p.profileImage || `https://ui-avatars.com/api/?name=${p.fullName}&background=random`} 
                          className="w-12 h-12 rounded-2xl object-cover shadow-inner" 
                        />
                        <div>
                          <p className="font-black text-slate-800 text-sm leading-none mb-1">{p.fullName}</p>
                          <p className="font-mono text-[10px] text-blue-500 font-bold uppercase">ID: {p._id.toString().slice(-6).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-2 font-bold text-slate-500 text-sm italic">
                        <MapPin size={14} className="text-slate-300" />
                        {p.liveLocation?.address || "Pending Data"}
                      </div>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <button 
                        onClick={() => setSelectedPatient(p)}
                        className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- FULL DETAIL MODAL --- */}
        {selectedPatient && (
          <>
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100]" onClick={() => setSelectedPatient(null)} />
            <div className="fixed right-0 top-0 h-screen w-full max-w-xl bg-white z-[101] shadow-2xl p-0 flex flex-col animate-in slide-in-from-right duration-500">
              {/* Header */}
              <div className="bg-slate-900 p-12 text-white relative overflow-hidden">
                <button onClick={() => setSelectedPatient(null)} className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-full">
                  <X size={24} />
                </button>
                <div className="flex items-center gap-6">
                  <img 
                    src={selectedPatient.profileImage || `https://ui-avatars.com/api/?name=${selectedPatient.fullName}`} 
                    className="w-28 h-28 rounded-3xl border-4 border-slate-800 shadow-2xl object-cover" 
                  />
                  <div>
                    <h2 className="text-4xl font-black tracking-tight">{selectedPatient.fullName}</h2>
                    <p className="text-blue-400 font-mono font-black text-xs">Patient UID: #{selectedPatient._id.toString().toUpperCase()}</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-12 space-y-10">
                {/* HIGH PRECISION ADDRESS */}
                <section className="bg-blue-600 p-8 rounded-[40px] text-white shadow-xl shadow-blue-200">
                  <h3 className="text-[10px] font-black text-blue-200 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <MapPin size={16}/> Primary Rescue Address
                  </h3>
                  <div className="space-y-1 mb-6">
                    <p className="text-3xl font-black">{selectedPatient.liveLocation?.address || "Unknown"}</p>
                    <div className="flex gap-4 text-lg font-bold text-blue-50">
                       <span className="bg-white/20 px-3 py-1 rounded-xl">House: {selectedPatient.detailedAddress?.houseNumber || "N/A"}</span>
                       <span className="bg-white/20 px-3 py-1 rounded-xl">Floor: {selectedPatient.detailedAddress?.floor || "N/A"}</span>
                    </div>
                    <p className="font-bold text-blue-100">Apt/Flat: {selectedPatient.detailedAddress?.apartment || "Not specified"}</p>
                  </div>
                  <div className="p-4 bg-black/20 rounded-2xl border border-white/10 italic text-sm">
                    <span className="font-black not-italic block text-[10px] text-blue-200 uppercase mb-1 underline">Emergency Instructions:</span>
                    "{selectedPatient.detailedAddress?.additionalNotes || "No extra gate instructions provided."}"
                  </div>
                </section>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Mobile</p>
                    <p className="text-lg font-black text-slate-800">{selectedPatient.phone}</p>
                  </div>
                  <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Guardian</p>
                    <p className="text-lg font-black text-emerald-800">{selectedPatient.guardianPhone}</p>
                  </div>
                </div>

                <section>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Heart size={14} className="text-red-500"/> Vital Medical Records
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-5 bg-red-50 rounded-2xl border border-red-100">
                      <span className="font-black text-red-600 italic uppercase">Blood Group</span>
                      <span className="bg-red-600 text-white px-4 py-1 rounded-lg font-black">{selectedPatient.bloodGroup || 'N/A'}</span>
                    </div>
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Chronic Conditions</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedPatient.diseases?.length > 0 ? selectedPatient.diseases.map((d: string) => (
                          <span key={d} className="bg-white px-3 py-1.5 rounded-lg shadow-sm text-xs font-black text-slate-600 border border-slate-100 uppercase">{d}</span>
                        )) : (
                          <span className="text-slate-400 font-bold italic text-sm">No chronic diseases listed</span>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}