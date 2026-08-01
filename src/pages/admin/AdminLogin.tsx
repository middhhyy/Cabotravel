import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import logoFooter from "@/assets/cabo-logo-footer.webp";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      localStorage.setItem("cabo-admin-auth", "true");
      navigate({ to: "/admin/dashboard" });
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/[0.03] border border-white/10 rounded-[28px] p-8 md:p-10 backdrop-blur-md">
        <div className="flex flex-col items-center mb-8">
          <img
            src={logoFooter}
            alt="Cabo Tours Logo"
            className="h-16 w-auto object-contain mb-3 select-none"
          />
          <h2 className="font-display text-2xl uppercase tracking-wider text-white">Cabo Tours</h2>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-1">Admin Controls</p>
        </div>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-4 py-3 rounded-xl mb-6 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-[10px] text-white/50 uppercase tracking-[0.22em] font-semibold"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all duration-300"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-[10px] text-white/50 uppercase tracking-[0.22em] font-semibold"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-black hover:bg-brand/90 transition-colors focus:visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
