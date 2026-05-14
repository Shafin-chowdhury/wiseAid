"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // If MongoDB says it's an admin, go to admin dashboard
      if (data.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/admin");
      }
    } else {
      // Show the specific error (Invalid email, weak password, or wrong user)
      setError(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form onSubmit={handleSubmit} className="bg-white p-12 rounded-[40px] shadow-2xl w-full max-w-md border border-slate-100">
        <h1 className="text-3xl font-black mb-6 text-center italic tracking-tighter">WISEAID SECURE</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-rose-50 text-rose-600 rounded-2xl text-xs font-bold border border-rose-100">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full h-14 px-4 rounded-2xl border bg-slate-50 focus:ring-2 focus:ring-blue-100 outline-none"
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full h-14 px-4 rounded-2xl border bg-slate-50 focus:ring-2 focus:ring-blue-100 outline-none"
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit" className="w-full h-16 bg-blue-600 text-white font-black rounded-2xl shadow-lg hover:bg-blue-700 transition-all">
            VERIFY & ENTER
          </button>
        </div>
      </form>
    </div>
  );
}