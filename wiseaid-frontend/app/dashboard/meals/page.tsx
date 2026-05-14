"use client";
import React, { useState, useEffect } from "react";
import { Utensils, Sparkles, CheckCircle2, Coffee, Sun, Moon, RefreshCw } from "lucide-react";

export default function AIMealPlanner() {
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const generatePlan = async () => {
    setLoading(true);
    setError(null);
    try {
      const email = localStorage.getItem("userEmail");
      if (!email) {
        setError("User session not found. Please log in again.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/ai-meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setMealPlan(data);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the medical nutrition database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generatePlan();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 lg:p-12 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto">
        
        {/* Top Header Banner */}
        <header className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[40px] p-10 text-white shadow-xl mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3">
              <Sparkles size={12}/> AI Medical Nutrition
            </div>
            <h1 className="text-4xl font-black tracking-tight">Your Prescribed Diet</h1>
            <p className="text-blue-100 font-medium mt-1">Smart daily nutrition synchronized with your active disease profile.</p>
          </div>
          <button 
            onClick={generatePlan}
            disabled={loading}
            className="relative z-10 bg-white text-blue-600 px-6 py-4 rounded-2xl font-black text-sm hover:bg-blue-50 transition-all shadow-lg active:scale-95 shrink-0 flex items-center gap-2"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            {loading ? "Analyzing..." : "Regenerate Plan"}
          </button>
        </header>

        {/* Loading Spinner View */}
        {loading && (
          <div className="text-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-black text-slate-400 text-xs uppercase tracking-widest animate-pulse">Running Clinical Matrix Alignment...</p>
          </div>
        )}

        {/* Error Handling View */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-[32px] text-center font-bold">
            <p>{error}</p>
            <button onClick={generatePlan} className="mt-4 bg-red-600 text-white px-4 py-2 rounded-xl text-xs uppercase font-black">Try Again</button>
          </div>
        )}

        {/* Loaded AI Meal Content */}
        {!loading && !error && mealPlan && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* 3 Meals Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MealCard 
                time="Breakfast" 
                icon={<Coffee className="text-amber-500" size={24} />} 
                bg="bg-amber-50/60"
                data={mealPlan.breakfast} 
              />
              <MealCard 
                time="Lunch" 
                icon={<Sun className="text-orange-500" size={24} />} 
                bg="bg-orange-50/60"
                data={mealPlan.lunch} 
              />
              <MealCard 
                time="Dinner" 
                icon={<Moon className="text-indigo-500" size={24} />} 
                bg="bg-indigo-50/60"
                data={mealPlan.dinner} 
              />
            </div>

            {/* Clinical Note / Nutritionist Disclaimer */}
            {mealPlan.clinicalNote && (
              <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[32px] flex gap-4 items-start shadow-sm">
                <CheckCircle2 className="text-emerald-600 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-black text-emerald-800 text-sm uppercase tracking-wider mb-1">Dietitian AI Insights</h4>
                  <p className="text-emerald-700 text-sm font-medium leading-relaxed">{mealPlan.clinicalNote}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function MealCard({ time, icon, bg, data }: any) {
  return (
    <div className="bg-white rounded-[35px] border border-slate-100 p-6 shadow-xl shadow-slate-200/40 flex flex-col h-full group hover:-translate-y-1 transition-transform">
      <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{time}</p>
      <h3 className="font-black text-xl text-slate-800 tracking-tight mb-4 leading-tight">{data?.meal || "Healthy Selection"}</h3>
      <div className="mt-auto pt-4 border-t border-slate-50">
        <p className="text-xs font-bold text-slate-500 leading-relaxed italic">"{data?.benefits || "Formulated for nutritional balance."}"</p>
      </div>
    </div>
  );
}