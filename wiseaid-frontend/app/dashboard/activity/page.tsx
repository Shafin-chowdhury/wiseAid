"use client";
import React, { useEffect, useState } from "react";
import { 
  Activity, Heart, Thermometer, Wind, 
  TrendingUp, AlertTriangle, ShieldCheck, RefreshCw 
} from "lucide-react";

export default function IOTActivityPage() {
  const [loading, setLoading] = useState(true);
  const [vitals, setVitals] = useState({
    heartRate: 72,
    spo2: 98,
    temperature: 36.6,
    status: "Stable",
    steps: 4320
  });

  // Simulate real-time IoT sensor telemetry updates
  const fetchSensorData = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulating slight fluctuations you'd get from a real wristband/sensor
      const randomHeart = Math.floor(Math.random() * (85 - 65 + 1)) + 65;
      const randomSpo2 = Math.floor(Math.random() * (100 - 96 + 1)) + 96;
      const randomTemp = parseFloat((Math.random() * (37.2 - 36.2) + 36.2).toFixed(1));
      
      setVitals({
        heartRate: randomHeart,
        spo2: randomSpo2,
        temperature: randomTemp,
        status: randomHeart > 82 || randomSpo2 < 97 ? "Warning" : "Stable",
        steps: Math.floor(Math.random() * (6000 - 4000 + 1)) + 4000
      });
      setLoading(false);
    }, 600);
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 8000); // Poll device streams every 8 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 lg:p-12 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Block */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-600 px-3 py-1 rounded-full text-[10px] font-black uppercase border border-cyan-100 mb-2">
              <Activity size={12} /> IoT Live Stream
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Biometric Activity</h1>
          </div>
          <button 
            onClick={fetchSensorData} 
            className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all shadow-sm shrink-0 active:scale-95"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Sync Device
          </button>
        </header>

        {/* Dynamic System Status Banner */}
        <div className={`mb-10 p-6 rounded-[32px] border flex items-center gap-4 shadow-sm transition-colors duration-300 ${
          vitals.status === "Warning" 
            ? "bg-amber-50 border-amber-200 text-amber-800" 
            : "bg-emerald-50 border-emerald-200 text-emerald-800"
        }`}>
          {vitals.status === "Warning" ? <AlertTriangle size={24} /> : <ShieldCheck size={24} />}
          <div>
            <h4 className="font-black uppercase tracking-wider text-xs">Vitals Status: {vitals.status}</h4>
            <p className="text-sm font-medium opacity-90">
              {vitals.status === "Warning" 
                ? "Elevated telemetry reading detected. Rest or contact support if symptoms develop." 
                : "All metrics falling smoothly within designated target baseline zones."}
            </p>
          </div>
        </div>

        {/* Biometric Sensor Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          
          {/* Card 1: Heart Rate */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-6 text-red-500">
              <Heart size={24} className="animate-pulse" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pulse</p>
            <h2 className="text-5xl font-black tracking-tight text-slate-800">
              {vitals.heartRate} <span className="text-sm font-bold text-slate-400">BPM</span>
            </h2>
          </div>

          {/* Card 2: Blood Oxygen */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-500">
              <Wind size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Blood Oxygen</p>
            <h2 className="text-5xl font-black tracking-tight text-slate-800">
              {vitals.spo2}<span className="text-sm font-bold text-slate-400">%</span> <span className="text-xs font-bold text-slate-400">SpO₂</span>
            </h2>
          </div>

          {/* Card 3: Body Temperature */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-orange-500">
              <Thermometer size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Temperature</p>
            <h2 className="text-5xl font-black tracking-tight text-slate-800">
              {vitals.temperature}<span className="text-sm font-bold text-slate-400">°C</span>
            </h2>
          </div>

        </div>

        {/* Pedometer Tracking Summary */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[40px] p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-4 rounded-2xl text-cyan-400"><TrendingUp size={28}/></div>
            <div>
              <h3 className="text-xl font-black">Daily Step Baseline</h3>
              <p className="text-slate-400 text-sm font-medium">Tracking metabolic output and activity thresholds.</p>
            </div>
          </div>
          <div className="text-right md:text-right w-full md:w-auto">
            <h2 className="text-4xl font-black text-cyan-400 font-mono">{vitals.steps}</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Steps Completed</p>
          </div>
        </div>

      </div>
    </div>
  );
}