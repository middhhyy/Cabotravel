import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Settings,
  Shield,
  Server,
  Trash2,
  Check,
  X,
  LogOut,
  Star,
  Image as ImageIcon,
  MessageSquare,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getOptimizedImageUrl } from "@/lib/utils";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Admin Panel — Cabo Tours" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setSession(session);
    setLoading(false);
  };

  useEffect(() => {
    checkSession();

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-xs uppercase tracking-[0.22em] text-white/50 animate-pulse">
          Validating session...
        </div>
      </div>
    );
  }

  if (!session) {
    return <AdminLogin onLoginSuccess={checkSession} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display text-white mb-2">System Admin Control</h1>
            <p className="text-white/60 text-sm">
              Manage Guest Feedback, API Keys, Provider Priorities, and System Health
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 border border-white/10 hover:border-white/30 rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white bg-white/5 transition"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </header>

        <div className="space-y-8">
          {/* Feedback Moderation Section */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <FeedbackModerator />
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* API Keys (Existing) */}
            <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                <Shield className="h-5 w-5 text-brand" />
                <h2 className="text-xl font-medium text-white">API Keys</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-1">Google Gemini API Key</label>
                  <input
                    type="password"
                    value="************************"
                    readOnly
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white/40 font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1">Grok API Key</label>
                  <input
                    type="password"
                    value="************************"
                    readOnly
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white/40 font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1">Google Maps API Key</label>
                  <input
                    type="password"
                    placeholder="Enter API Key"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white font-mono text-sm focus:border-brand focus:outline-none"
                  />
                </div>
                <button className="w-full py-2.5 bg-brand text-white font-medium rounded-xl hover:bg-brand/90 transition-colors">
                  Save Keys
                </button>
              </div>
            </section>

            {/* Provider Config (Existing) */}
            <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                <Settings className="h-5 w-5 text-blue-400" />
                <h2 className="text-xl font-medium text-white">AI Provider Config</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Primary Provider</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-brand focus:outline-none">
                    <option value="gemini">Google Gemini 1.5 Flash</option>
                    <option value="grok">Grok Beta</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium text-sm">Automatic Fallback</div>
                    <div className="text-white/40 text-xs">
                      Switch to secondary provider if primary fails
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-brand rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium text-sm">Pre-fetch External Data</div>
                    <div className="text-white/40 text-xs">
                      Inject live Weather & Maps before AI generation
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-brand rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* System Health (Existing) */}
            <section className="bg-white/5 border border-white/10 rounded-3xl p-6 col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                <Server className="h-5 w-5 text-green-400" />
                <h2 className="text-xl font-medium text-white">System Health & Cache</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="text-white/40 text-sm mb-1">Cache Size</div>
                  <div className="text-2xl font-semibold text-white">4.2 MB</div>
                  <button className="text-xs text-brand mt-2 hover:underline">Clear Cache</button>
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="text-white/40 text-sm mb-1">Est. Token Usage (Month)</div>
                  <div className="text-2xl font-semibold text-white">142,000</div>
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="text-white/40 text-sm mb-1">Avg. Latency</div>
                  <div className="text-2xl font-semibold text-white">1,402 ms</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminLogin({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error("Invalid credentials");
      }

      onLoginSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[26px] p-8 md:p-10 backdrop-blur-md">
        <h2 className="font-display text-2xl uppercase text-white mb-2 text-center">Admin Access</h2>
        <p className="text-white/50 text-xs text-center mb-8 uppercase tracking-wider">Cabo Tours Controls</p>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-4 py-3 rounded-xl mb-6 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-[11px] text-white/50 mb-2 uppercase tracking-[0.22em] font-semibold">
              Admin Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@cabotours.in"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-[11px] text-white/50 mb-2 uppercase tracking-[0.22em] font-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-brand focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand text-white font-semibold text-[11px] rounded-full hover:scale-[1.01] transition shadow-lg shadow-brand/10 uppercase tracking-[0.22em]"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

interface Feedback {
  id: string;
  name: string;
  message: string;
  rating: number | null;
  image_url: string | null;
  status: string;
  created_at: string;
}

function FeedbackModerator() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchFeedback = async () => {
    try {
      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFeedbacks(data || []);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleUpdateStatus = async (id: string, status: "approved" | "rejected") => {
    setUpdatingId(id);
    try {
      const { error } = await supabase
        .from("feedback")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      setFeedbacks((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status } : f))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this feedback?")) return;
    setUpdatingId(id);
    try {
      const { error } = await supabase.from("feedback").delete().eq("id", id);
      if (error) throw error;
      setFeedbacks((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error("Error deleting feedback:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4 justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-brand" />
          <h2 className="text-xl font-medium text-white">Moderate Guest Feedback</h2>
        </div>
        <button
          onClick={fetchFeedback}
          className="text-xs text-brand hover:underline font-medium"
        >
          Refresh List
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-white/40 text-xs tracking-widest uppercase animate-pulse">
          Loading feedback submissions...
        </div>
      ) : feedbacks.length === 0 ? (
        <div className="text-center py-12 text-white/30 text-xs border border-dashed border-white/10 rounded-2xl">
          No feedback submissions found in database.
        </div>
      ) : (
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
          {feedbacks.map((f) => (
            <div
              key={f.id}
              className="flex flex-col md:flex-row md:items-center justify-between bg-black/30 border border-white/5 hover:border-white/10 p-5 rounded-2xl gap-6 transition duration-300"
            >
              <div className="flex items-start gap-4">
                {f.image_url ? (
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-black/40 flex items-center justify-center relative group">
                    <img
                      src={getOptimizedImageUrl(f.image_url, { width: 120, quality: 75 })}
                      alt={f.name}
                      loading="eager"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                    <a
                      href={f.image_url}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300"
                      title="Open full image"
                    >
                      <ImageIcon className="w-4 h-4 text-white" />
                    </a>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/20 shrink-0">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                )}

                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-sm font-semibold text-white">{f.name}</span>
                    <span className="text-[10px] text-white/40">
                      {new Date(f.created_at).toLocaleDateString()}
                    </span>

                    {f.rating && (
                      <span className="flex items-center gap-0.5 text-accent text-xs">
                        <Star className="w-3.5 h-3.5 fill-brand text-brand" /> {f.rating}
                      </span>
                    )}

                    <span
                      className={`text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${f.status === "approved"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : f.status === "rejected"
                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                        }`}
                    >
                      {f.status}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-white/70 leading-relaxed max-w-2xl">{f.message}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 md:self-center self-end">
                {f.status !== "approved" && (
                  <button
                    onClick={() => handleUpdateStatus(f.id, "approved")}
                    disabled={updatingId !== null}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-white rounded-xl border border-green-500/20 text-[10px] uppercase font-semibold tracking-wider transition disabled:opacity-50"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve
                  </button>
                )}

                {f.status !== "rejected" && (
                  <button
                    onClick={() => handleUpdateStatus(f.id, "rejected")}
                    disabled={updatingId !== null}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl border border-red-500/20 text-[10px] uppercase font-semibold tracking-wider transition disabled:opacity-50"
                  >
                    <X className="w-3.5 h-3.5" /> Reject
                  </button>
                )}

                <button
                  onClick={() => handleDelete(f.id)}
                  disabled={updatingId !== null}
                  className="p-2.5 text-white/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl border border-white/5 hover:border-red-500/20 transition disabled:opacity-50"
                  title="Delete feedback"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
