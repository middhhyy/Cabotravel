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
  Users,
  User,
  Plus,
  ChevronDown,
  ChevronUp,
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
  const [activeTab, setActiveTab] = useState<"leads" | "feedback" | "stories" | "settings">("leads");

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

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-6 mb-8">
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
              activeTab === "leads"
                ? "bg-brand text-black"
                : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            Leads CRM
          </button>
          <button
            onClick={() => setActiveTab("feedback")}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
              activeTab === "feedback"
                ? "bg-brand text-black"
                : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            Guest Feedback
          </button>
          <button
            onClick={() => setActiveTab("stories")}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
              activeTab === "stories"
                ? "bg-brand text-black"
                : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            Guest Stories
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
              activeTab === "settings"
                ? "bg-brand text-black"
                : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            System Settings
          </button>
        </div>

        <div className="space-y-8">
          {activeTab === "feedback" && (
            <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <FeedbackModerator />
            </section>
          )}

          {activeTab === "leads" && (
            <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <LeadManager />
            </section>
          )}

          {activeTab === "stories" && (
            <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <GuestStoriesManager />
            </section>
          )}

          {activeTab === "settings" && (
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
                      value="************************"
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
          )}
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

interface Lead {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  source: string;
  interest: string;
  status: string;
  notes: string | null;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  pendingTasksCount?: number;
}

interface Interaction {
  id: string;
  lead_id: string;
  type: string;
  content: string;
  created_at: string;
}

interface Task {
  id: string;
  lead_id: string;
  note: string;
  due_at: string | null;
  done: boolean;
  created_at: string;
}

function LeadManager() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [showAddLead, setShowAddLead] = useState(false);
  const [addingLead, setAddingLead] = useState(false);

  // Form states
  const [addLeadForm, setAddLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    source: "manual",
    interest: "Kerala Package",
  });

  const [notesInput, setNotesInput] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  // Expanded panel details
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [addingInteraction, setAddingInteraction] = useState(false);
  const [interactionForm, setInteractionForm] = useState({
    type: "call",
    content: "",
  });

  const [tasks, setTasks] = useState<Task[]>([]);
  const [addingTask, setAddingTask] = useState(false);
  const [taskForm, setTaskForm] = useState({
    note: "",
    due_at: "",
  });

  const fetchLeads = async () => {
    try {
      const { data: leadsData, error: leadsError } = await supabase
        .from("leads")
        .select("*")
        .eq("is_deleted", false)
        .order("created_at", { ascending: false });

      if (leadsError) throw leadsError;

      const leadsWithTasks = await Promise.all(
        (leadsData || []).map(async (lead) => {
          const { count, error: taskCountError } = await supabase
            .from("tasks")
            .select("*", { count: "exact", head: true })
            .eq("lead_id", lead.id)
            .eq("done", false);

          return {
            ...lead,
            pendingTasksCount: taskCountError ? 0 : (count || 0),
          };
        })
      );

      setLeads(leadsWithTasks);
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeadDetails = async (leadId: string) => {
    try {
      const { data: interactionsData, error: interactionsError } = await supabase
        .from("interactions")
        .select("*")
        .eq("lead_id", leadId)
        .order("created_at", { ascending: false });

      if (interactionsError) throw interactionsError;
      setInteractions(interactionsData || []);

      const { data: tasksData, error: tasksError } = await supabase
        .from("tasks")
        .select("*")
        .eq("lead_id", leadId)
        .order("due_at", { ascending: true });

      if (tasksError) throw tasksError;
      setTasks(tasksData || []);
    } catch (err) {
      console.error("Error fetching lead details:", err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleToggleExpand = async (leadId: string) => {
    if (selectedLeadId === leadId) {
      setSelectedLeadId(null);
      setInteractions([]);
      setTasks([]);
    } else {
      setSelectedLeadId(leadId);
      const lead = leads.find((l) => l.id === leadId);
      setNotesInput(lead?.notes || "");
      setInteractions([]);
      setTasks([]);
      await fetchLeadDetails(leadId);
    }
  };

  const logInteraction = async (leadId: string, type: string, content: string) => {
    try {
      await supabase.from("interactions").insert({
        lead_id: leadId,
        type,
        content,
      });
    } catch (err) {
      console.error("Error logging interaction:", err);
    }
  };

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingLead(true);
    try {
      const { data, error } = await supabase
        .from("leads")
        .insert({
          name: addLeadForm.name,
          phone: addLeadForm.phone || null,
          email: addLeadForm.email || null,
          source: addLeadForm.source,
          interest: addLeadForm.interest,
          status: "new",
        })
        .select();

      if (error) throw error;

      const newLead = data?.[0];
      if (newLead) {
        await logInteraction(newLead.id, "note", `System: Lead created with status: new`);
        await fetchLeads();
        setAddLeadForm({
          name: "",
          phone: "",
          email: "",
          source: "manual",
          interest: "Kerala Package",
        });
        setShowAddLead(false);
      }
    } catch (err) {
      console.error("Error adding lead:", err);
    } finally {
      setAddingLead(false);
    }
  };

  const handleSaveNotes = async (leadId: string) => {
    setSavingNotes(true);
    try {
      const { error } = await supabase
        .from("leads")
        .update({ notes: notesInput })
        .eq("id", leadId);

      if (error) throw error;

      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, notes: notesInput } : l)));
      await logInteraction(leadId, "note", `System: Notes updated`);
      await fetchLeadDetails(leadId);
    } catch (err) {
      console.error("Error saving notes:", err);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleAdvanceStatus = async (leadId: string, currentStatus: string) => {
    const nextStatus = getNextStatus(currentStatus);
    if (!nextStatus) return;

    setUpdatingId(leadId);
    try {
      const { error } = await supabase
        .from("leads")
        .update({ status: nextStatus })
        .eq("id", leadId);

      if (error) throw error;

      await logInteraction(leadId, "note", `System: Status advanced from '${currentStatus}' to '${nextStatus}'`);
      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: nextStatus } : l)));

      if (selectedLeadId === leadId) {
        await fetchLeadDetails(leadId);
      }
    } catch (err) {
      console.error("Error advancing status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleMarkLost = async (leadId: string) => {
    setUpdatingId(leadId);
    try {
      const { error } = await supabase
        .from("leads")
        .update({ status: "lost" })
        .eq("id", leadId);

      if (error) throw error;

      await logInteraction(leadId, "note", `System: Lead marked as lost`);
      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: "lost" } : l)));

      if (selectedLeadId === leadId) {
        await fetchLeadDetails(leadId);
      }
    } catch (err) {
      console.error("Error marking lost:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    setUpdatingId(leadId);
    try {
      const { error } = await supabase
        .from("leads")
        .update({ is_deleted: true })
        .eq("id", leadId);

      if (error) throw error;

      setLeads((prev) => prev.filter((l) => l.id !== leadId));
      if (selectedLeadId === leadId) {
        setSelectedLeadId(null);
      }
    } catch (err) {
      console.error("Error deleting lead:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleAddInteraction = async (e: React.FormEvent, leadId: string) => {
    e.preventDefault();
    setAddingInteraction(true);
    try {
      const { error } = await supabase
        .from("interactions")
        .insert({
          lead_id: leadId,
          type: interactionForm.type,
          content: interactionForm.content,
        });

      if (error) throw error;

      setInteractionForm({ type: "call", content: "" });
      await fetchLeadDetails(leadId);
    } catch (err) {
      console.error("Error adding interaction:", err);
    } finally {
      setAddingInteraction(false);
    }
  };

  const handleAddTask = async (e: React.FormEvent, leadId: string) => {
    e.preventDefault();
    setAddingTask(true);
    try {
      const { error } = await supabase
        .from("tasks")
        .insert({
          lead_id: leadId,
          note: taskForm.note,
          due_at: taskForm.due_at ? new Date(taskForm.due_at).toISOString() : null,
          done: false,
        });

      if (error) throw error;

      setTaskForm({ note: "", due_at: "" });
      await fetchLeadDetails(leadId);

      setLeads((prev) =>
        prev.map((l) =>
          l.id === leadId ? { ...l, pendingTasksCount: (l.pendingTasksCount || 0) + 1 } : l
        )
      );
    } catch (err) {
      console.error("Error adding task:", err);
    } finally {
      setAddingTask(false);
    }
  };

  const handleToggleTask = async (taskId: string, currentDone: boolean) => {
    const newDone = !currentDone;
    try {
      const { error } = await supabase
        .from("tasks")
        .update({ done: newDone })
        .eq("id", taskId);

      if (error) throw error;

      setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, done: newDone } : t)));

      if (selectedLeadId) {
        setLeads((prev) =>
          prev.map((l) =>
            l.id === selectedLeadId
              ? {
                  ...l,
                  pendingTasksCount: Math.max(0, (l.pendingTasksCount || 0) + (newDone ? -1 : 1)),
                }
              : l
          )
        );
      }
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "new":
        return "bg-sky-500/10 text-sky-400 border border-sky-500/20";
      case "contacted":
        return "bg-purple-500/10 text-purple-400 border border-purple-500/20";
      case "quoted":
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      case "confirmed":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      case "completed":
        return "bg-green-500/10 text-green-400 border border-green-500/20";
      case "lost":
        return "bg-red-500/10 text-red-400 border border-red-500/20";
      default:
        return "bg-white/10 text-white/60 border border-white/20";
    }
  };

  const getNextStatus = (status: string) => {
    switch (status) {
      case "new":
        return "contacted";
      case "contacted":
        return "quoted";
      case "quoted":
        return "confirmed";
      case "confirmed":
        return "completed";
      default:
        return null;
    }
  };

  const getNextStatusLabel = (status: string) => {
    switch (status) {
      case "new":
        return "Contacted";
      case "contacted":
        return "Send Quote";
      case "quoted":
        return "Confirm Booking";
      case "confirmed":
        return "Complete";
      default:
        return "";
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4 justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-brand" />
          <h2 className="text-xl font-medium text-white">Lead Management (CRM)</h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowAddLead(!showAddLead)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-xs font-semibold uppercase tracking-wider transition cursor-pointer text-white"
          >
            <Plus className="w-3.5 h-3.5" /> Add Lead
          </button>
          <button
            onClick={fetchLeads}
            className="text-xs text-brand hover:underline font-medium cursor-pointer"
          >
            Refresh List
          </button>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
          <div className="text-white/40 text-[10px] mb-1 uppercase tracking-wider font-semibold">Total Leads</div>
          <div className="text-xl font-semibold text-white">{leads.length}</div>
        </div>
        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
          <div className="text-white/40 text-[10px] mb-1 uppercase tracking-wider font-semibold">Active Quotes</div>
          <div className="text-xl font-semibold text-white">
            {leads.filter((l) => l.status === "quoted").length}
          </div>
        </div>
        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
          <div className="text-white/40 text-[10px] mb-1 uppercase tracking-wider font-semibold">Confirmed Bookings</div>
          <div className="text-xl font-semibold text-green-400">
            {leads.filter((l) => l.status === "confirmed" || l.status === "completed").length}
          </div>
        </div>
        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
          <div className="text-white/40 text-[10px] mb-1 uppercase tracking-wider font-semibold">Pending Tasks</div>
          <div className="text-xl font-semibold text-yellow-400">
            {leads.reduce((acc, lead) => acc + (lead.pendingTasksCount || 0), 0)}
          </div>
        </div>
      </div>

      {/* Inline Add Lead Form */}
      {showAddLead && (
        <form onSubmit={handleAddLead} className="mb-6 bg-black/30 border border-white/5 p-5 rounded-2xl space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">New Lead Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] text-white/50 mb-1 uppercase tracking-wider font-semibold">Client Name *</label>
              <input
                type="text"
                required
                value={addLeadForm.name}
                onChange={(e) => setAddLeadForm({ ...addLeadForm, name: e.target.value })}
                placeholder="e.g. John Doe"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white placeholder:text-white/30 focus:border-brand focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] text-white/50 mb-1 uppercase tracking-wider font-semibold">Phone Number</label>
              <input
                type="tel"
                value={addLeadForm.phone}
                onChange={(e) => setAddLeadForm({ ...addLeadForm, phone: e.target.value })}
                placeholder="e.g. +91 98765 43210"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white placeholder:text-white/30 focus:border-brand focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] text-white/50 mb-1 uppercase tracking-wider font-semibold">Email Address</label>
              <input
                type="email"
                value={addLeadForm.email}
                onChange={(e) => setAddLeadForm({ ...addLeadForm, email: e.target.value })}
                placeholder="e.g. john@example.com"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white placeholder:text-white/30 focus:border-brand focus:outline-none text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] text-white/50 mb-1 uppercase tracking-wider font-semibold">Source</label>
                <select
                  value={addLeadForm.source}
                  onChange={(e) => setAddLeadForm({ ...addLeadForm, source: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-brand focus:outline-none text-sm"
                >
                  <option value="manual">Manual Entry</option>
                  <option value="whatsapp">WhatsApp Link</option>
                  <option value="contact_form">Contact Form</option>
                  <option value="feedback_form">Feedback Form</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-white/50 mb-1 uppercase tracking-wider font-semibold">Interest</label>
                <select
                  value={addLeadForm.interest}
                  onChange={(e) => setAddLeadForm({ ...addLeadForm, interest: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-brand focus:outline-none text-sm"
                >
                  <option value="Kerala Package">Kerala Package</option>
                  <option value="Domestic Package">Domestic Package</option>
                  <option value="International Package">International Package</option>
                  <option value="Cab Booking">Cab Booking</option>
                  <option value="Visa Service">Visa Service</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setShowAddLead(false)}
              className="px-4 py-2 border border-white/10 hover:bg-white/5 text-white rounded-xl text-xs uppercase tracking-wider font-semibold transition cursor-pointer text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={addingLead}
              className="px-4 py-2 bg-brand hover:bg-brand/90 text-white rounded-xl text-xs uppercase tracking-wider font-semibold transition disabled:opacity-50 cursor-pointer text-white"
            >
              {addingLead ? "Adding..." : "Save Lead"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-center py-12 text-white/40 text-xs tracking-widest uppercase animate-pulse">
          Loading CRM leads...
        </div>
      ) : leads.length === 0 ? (
        <div className="text-center py-12 text-white/30 text-xs border border-dashed border-white/10 rounded-2xl">
          No leads found in database. Click Add Lead above to create one.
        </div>
      ) : (
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
          {leads.map((lead) => {
            const isExpanded = selectedLeadId === lead.id;
            const nextStatus = getNextStatus(lead.status);

            return (
              <div
                key={lead.id}
                className="flex flex-col bg-black/30 border border-white/5 hover:border-white/10 rounded-2xl transition duration-300 overflow-hidden"
              >
                {/* Summary Row Header */}
                <div
                  onClick={() => handleToggleExpand(lead.id)}
                  className="flex flex-col md:flex-row md:items-center justify-between p-5 gap-6 cursor-pointer hover:bg-white/[0.02] transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/40 shrink-0">
                      <User className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-sm font-semibold text-white">{lead.name}</span>
                        <span className="text-[10px] text-white/40">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </span>
                        <span className="text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded-md">
                          {lead.interest}
                        </span>
                        <span
                          className={`text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${getStatusBadgeClass(lead.status)}`}
                        >
                          {lead.status}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-4 text-xs text-white/60">
                        {lead.phone && <span>📞 {lead.phone}</span>}
                        {lead.email && <span>✉️ {lead.email}</span>}
                        <span>
                          Source: <span className="text-white/80 capitalize">{lead.source}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Chevron */}
                  <div className="flex items-center gap-2 md:self-center self-end" onClick={(e) => e.stopPropagation()}>
                    {nextStatus && (
                      <button
                        onClick={() => handleAdvanceStatus(lead.id, lead.status)}
                        disabled={updatingId !== null}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-white rounded-xl border border-green-500/20 text-[10px] uppercase font-semibold tracking-wider transition disabled:opacity-50 cursor-pointer text-green-400"
                      >
                        <Check className="w-3.5 h-3.5" /> {getNextStatusLabel(lead.status)}
                      </button>
                    )}

                    {lead.status !== "completed" && lead.status !== "lost" && (
                      <button
                        onClick={() => handleMarkLost(lead.id)}
                        disabled={updatingId !== null}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl border border-red-500/20 text-[10px] uppercase font-semibold tracking-wider transition disabled:opacity-50 cursor-pointer text-red-400"
                      >
                        <X className="w-3.5 h-3.5" /> Lost
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteLead(lead.id)}
                      disabled={updatingId !== null}
                      className="p-2.5 text-white/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl border border-white/5 hover:border-red-500/20 transition disabled:opacity-50 cursor-pointer text-white/40"
                      title="Delete lead"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="text-white/40 p-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Detail Panel */}
                {isExpanded && (
                  <div className="border-t border-white/5 bg-black/20 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Panel: Notes */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs uppercase tracking-wider font-semibold text-white/70">Notes</h4>
                        <button
                          onClick={() => handleSaveNotes(lead.id)}
                          disabled={savingNotes}
                          className="text-[10px] text-brand hover:underline font-medium uppercase tracking-wider cursor-pointer"
                        >
                          {savingNotes ? "Saving..." : "Save Note"}
                        </button>
                      </div>
                      <textarea
                        value={notesInput}
                        onChange={(e) => setNotesInput(e.target.value)}
                        placeholder="Type lead notes, trip requirements, dates, passenger count..."
                        className="w-full h-[180px] bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white placeholder:text-white/20 focus:border-brand focus:outline-none resize-none"
                      />
                    </div>

                    {/* Middle Panel: Interactions */}
                    <div className="space-y-4">
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-white/70">Interactions Timeline</h4>

                      <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 text-xs">
                        {interactions.length === 0 ? (
                          <div className="text-white/30 text-center py-4 border border-dashed border-white/5 rounded-xl">
                            No interactions logged yet.
                          </div>
                        ) : (
                          interactions.map((it) => (
                            <div key={it.id} className="p-2.5 bg-black/30 border border-white/5 rounded-xl">
                              <div className="flex items-center justify-between text-[10px] text-white/40 mb-1">
                                <span className="font-semibold uppercase tracking-wider text-brand">{it.type}</span>
                                <span>{new Date(it.created_at).toLocaleString()}</span>
                              </div>
                              <p className="text-white/80">{it.content}</p>
                            </div>
                          ))
                        )}
                      </div>

                      <form onSubmit={(e) => handleAddInteraction(e, lead.id)} className="space-y-2 pt-2 border-t border-white/5">
                        <div className="grid grid-cols-3 gap-2">
                          <select
                            value={interactionForm.type}
                            onChange={(e) => setInteractionForm({ ...interactionForm, type: e.target.value })}
                            className="col-span-1 bg-white/5 border border-white/10 rounded-xl px-2.5 py-1.5 text-white focus:border-brand focus:outline-none text-xs"
                          >
                            <option value="call">Call</option>
                            <option value="whatsapp">WhatsApp</option>
                            <option value="email">Email</option>
                            <option value="note">Note</option>
                            <option value="quote_sent">Quote Sent</option>
                          </select>
                          <input
                            type="text"
                            required
                            value={interactionForm.content}
                            onChange={(e) => setInteractionForm({ ...interactionForm, content: e.target.value })}
                            placeholder="Logged outcome..."
                            className="col-span-2 bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-white placeholder:text-white/30 focus:border-brand focus:outline-none text-xs"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={addingInteraction}
                          className="w-full py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] uppercase font-semibold tracking-wider transition cursor-pointer text-white"
                        >
                          + Log Interaction
                        </button>
                      </form>
                    </div>

                    {/* Right Panel: Tasks */}
                    <div className="space-y-4">
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-white/70">Follow-up Tasks</h4>

                      <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 text-xs">
                        {tasks.length === 0 ? (
                          <div className="text-white/30 text-center py-4 border border-dashed border-white/5 rounded-xl">
                            No tasks set.
                          </div>
                        ) : (
                          tasks.map((t) => (
                            <div key={t.id} className="flex items-start gap-2.5 p-2 bg-black/30 border border-white/5 rounded-xl">
                              <input
                                type="checkbox"
                                checked={t.done}
                                onChange={() => handleToggleTask(t.id, t.done)}
                                className="mt-0.5 h-3.5 w-3.5 rounded border-white/10 bg-black/40 text-brand focus:ring-brand focus:ring-offset-0 focus:outline-none"
                              />
                              <div className="flex-1 min-w-0">
                                <p className={`text-white/80 break-words ${t.done ? "line-through text-white/30" : ""}`}>{t.note}</p>
                                {t.due_at && (
                                  <span
                                    className={`text-[9px] block mt-0.5 ${
                                      new Date(t.due_at) < new Date() && !t.done ? "text-red-400 font-semibold" : "text-white/40"
                                    }`}
                                  >
                                    Due: {new Date(t.due_at).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      <form onSubmit={(e) => handleAddTask(e, lead.id)} className="space-y-2 pt-2 border-t border-white/5">
                        <div className="grid grid-cols-1 gap-2">
                          <input
                            type="text"
                            required
                            value={taskForm.note}
                            onChange={(e) => setTaskForm({ ...taskForm, note: e.target.value })}
                            placeholder="Reminder details..."
                            className="bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-white placeholder:text-white/30 focus:border-brand focus:outline-none text-xs"
                          />
                          <input
                            type="date"
                            value={taskForm.due_at}
                            onChange={(e) => setTaskForm({ ...taskForm, due_at: e.target.value })}
                            className="bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-white focus:border-brand focus:outline-none text-xs"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={addingTask}
                          className="w-full py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] uppercase font-semibold tracking-wider transition cursor-pointer text-white"
                        >
                          + Add Reminder
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// =========================================
// GUEST STORIES MANAGER (ADMIN PORTAL)
// =========================================
import { Edit, CheckCircle, Globe, Calendar, MapPin, Search as SearchIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useMemo } from "react";

interface AdminGuestStory {
  id: string;
  name: string;
  username: string | null;
  country: string | null;
  destination: string;
  story: string;
  rating: number;
  trip_date: string;
  created_at: string;
  status: "pending" | "approved" | "rejected";
  slug: string;
  likes: number;
  guest_story_images?: { id: string; image_url: string; storage_path: string }[];
}

function GuestStoriesManager() {
  const [stories, setStories] = useState<AdminGuestStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusTab, setStatusTab] = useState<"pending" | "approved" | "rejected">("pending");
  const [search, setSearch] = useState("");

  // Edit Modal State
  const [editingStory, setEditingStory] = useState<AdminGuestStory | null>(null);
  const [editName, setEditName] = useState("");
  const [editDestination, setEditDestination] = useState("");
  const [editTripDate, setEditTripDate] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [editStoryText, setEditStoryText] = useState("");

  const fetchStories = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("guest_stories")
        .select(`
          *,
          guest_story_images (
            id,
            image_url,
            storage_path
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setStories(data || []);
    } catch (err: any) {
      toast.error("Failed to load stories: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleUpdateStatus = async (id: string, status: "approved" | "rejected") => {
    setActionLoading(true);
    try {
      const { error } = await supabase
        .from("guest_stories")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      toast.success(`Story status updated to ${status}!`);
      fetchStories();
    } catch (err: any) {
      toast.error("Failed to update story status: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (storyId: string) => {
    if (!confirm("Are you sure you want to permanently delete this story and all its associated photos?")) return;
    setActionLoading(true);
    try {
      // 1. Fetch images to delete from Storage
      const { data: images, error: fetchErr } = await supabase
        .from("guest_story_images")
        .select("storage_path")
        .eq("story_id", storyId);

      if (!fetchErr && images && images.length > 0) {
        const paths = images.map((img) => img.storage_path);
        
        // Remove from storage bucket
        const { error: storageDeleteError } = await supabase.storage
          .from("guest-stories")
          .remove(paths);
        
        if (storageDeleteError) {
          console.error("Storage delete error (continuing database cleanup):", storageDeleteError);
        }
      }

      // 2. Delete story (foreign key cascade deletes DB image references)
      const { error: dbDeleteError } = await supabase
        .from("guest_stories")
        .delete()
        .eq("id", storyId);

      if (dbDeleteError) throw dbDeleteError;

      toast.success("Story deleted successfully!");
      fetchStories();
    } catch (err: any) {
      toast.error("Failed to delete story: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenEdit = (story: AdminGuestStory) => {
    setEditingStory(story);
    setEditName(story.name);
    setEditDestination(story.destination);
    setEditTripDate(story.trip_date);
    setEditRating(story.rating);
    setEditStoryText(story.story);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStory) return;

    setActionLoading(true);
    try {
      const { error } = await supabase
        .from("guest_stories")
        .update({
          name: editName.trim(),
          destination: editDestination.trim(),
          trip_date: editTripDate,
          rating: editRating,
          story: editStoryText.trim(),
        })
        .eq("id", editingStory.id);

      if (error) throw error;

      toast.success("Story updated successfully!");
      setEditingStory(null);
      fetchStories();
    } catch (err: any) {
      toast.error("Failed to update story: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Filtered stories mapping
  const filteredStories = useMemo(() => {
    return stories.filter((s) => {
      const matchesStatus = s.status === statusTab;
      if (!matchesStatus) return false;

      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.destination.toLowerCase().includes(q) ||
          s.story.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [stories, statusTab, search]);

  // Statistics counters
  const counts = useMemo(() => {
    return {
      pending: stories.filter((s) => s.status === "pending").length,
      approved: stories.filter((s) => s.status === "approved").length,
      rejected: stories.filter((s) => s.status === "rejected").length,
    };
  }, [stories]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-brand" />
          <h2 className="text-xl font-medium text-white font-display uppercase tracking-wider">Moderate Guest Stories</h2>
        </div>
        <button
          onClick={fetchStories}
          className="text-xs text-brand hover:underline font-medium uppercase tracking-wider"
        >
          Refresh List
        </button>
      </div>

      {/* Analytics Counters */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-black/30 border border-white/5 p-4 rounded-2xl text-center">
          <div className="text-white/40 text-[10px] uppercase tracking-wider">Pending Approval</div>
          <div className="text-2xl font-bold text-brand mt-1">{counts.pending}</div>
        </div>
        <div className="bg-black/30 border border-white/5 p-4 rounded-2xl text-center">
          <div className="text-white/40 text-[10px] uppercase tracking-wider">Approved Public</div>
          <div className="text-2xl font-bold text-green-400 mt-1">{counts.approved}</div>
        </div>
        <div className="bg-black/30 border border-white/5 p-4 rounded-2xl text-center">
          <div className="text-white/40 text-[10px] uppercase tracking-wider">Rejected / Archived</div>
          <div className="text-2xl font-bold text-red-400 mt-1">{counts.rejected}</div>
        </div>
      </div>

      {/* Tabs and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {(["pending", "approved", "rejected"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition ${
                statusTab === tab
                  ? "bg-brand text-black"
                  : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab} ({counts[tab]})
            </button>
          ))}
        </div>

        <div className="relative w-full md:max-w-xs">
          <SearchIcon className="absolute left-3 top-2.5 h-3.5 w-3.5 text-white/30" />
          <input
            type="text"
            placeholder="Search stories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-white/30 focus:border-brand focus:outline-none"
          />
        </div>
      </div>

      {/* Stories Moderator Grid */}
      {loading ? (
        <div className="text-center py-12 text-white/40 text-xs tracking-widest uppercase animate-pulse">
          Loading guest stories...
        </div>
      ) : filteredStories.length === 0 ? (
        <div className="text-center py-12 text-white/30 text-xs border border-dashed border-white/10 rounded-2xl uppercase tracking-wider">
          No stories found in this section.
        </div>
      ) : (
        <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
          {filteredStories.map((s) => {
            const firstImg = s.guest_story_images?.[0]?.image_url;
            return (
              <div
                key={s.id}
                className="flex flex-col md:flex-row bg-black/40 border border-white/5 hover:border-white/10 p-5 rounded-2xl gap-6 transition duration-300 items-start"
              >
                {/* Photo Preview (4:3 aspect, max-w 150px) */}
                <div className="w-full md:w-32 aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shrink-0 bg-neutral-900 flex items-center justify-center relative">
                  {firstImg ? (
                    <img
                      src={getOptimizedImageUrl(firstImg, { width: 240, quality: 75 })}
                      alt={s.destination}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[10px] text-white/30 uppercase tracking-wider">No Photo</span>
                  )}
                  {s.guest_story_images && s.guest_story_images.length > 1 && (
                    <span className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[8px] font-semibold text-white">
                      +{s.guest_story_images.length - 1} photos
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-semibold text-white">{s.name}</span>
                    <span className="text-xs text-white/50">{s.username || `@traveler_${s.name.toLowerCase().replace(/\s+/g, "")}`}</span>
                    {s.country && <span className="text-xs text-white/40 flex items-center gap-1"><Globe className="w-3 h-3" /> {s.country}</span>}
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <span className="text-xs text-brand font-semibold flex items-center gap-1"><MapPin className="w-3 h-3" /> {s.destination}</span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-white/50">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-brand" /> {new Date(s.trip_date).toLocaleDateString()}</span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} className={`w-3.5 h-3.5 ${idx < s.rating ? "text-accent fill-accent" : "text-white/10"}`} />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-white/70 leading-relaxed font-sans font-light whitespace-pre-wrap">{s.story}</p>
                </div>

                {/* Actions row/column */}
                <div className="flex md:flex-col gap-2 shrink-0 w-full md:w-auto items-stretch justify-end border-t border-white/5 md:border-t-0 pt-4 md:pt-0">
                  {s.status !== "approved" && (
                    <button
                      onClick={() => handleUpdateStatus(s.id, "approved")}
                      disabled={actionLoading}
                      className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 bg-green-500/10 hover:bg-green-500 border border-green-500/20 hover:border-green-500/40 text-green-400 hover:text-white rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </button>
                  )}
                  {s.status !== "rejected" && (
                    <button
                      onClick={() => handleUpdateStatus(s.id, "rejected")}
                      disabled={actionLoading}
                      className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 bg-yellow-500/10 hover:bg-yellow-500 border border-yellow-500/20 hover:border-yellow-500/40 text-yellow-400 hover:text-white rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" /> Reject
                    </button>
                  )}
                  <button
                    onClick={() => handleOpenEdit(s)}
                    disabled={actionLoading}
                    className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 bg-blue-500/10 hover:bg-blue-500 border border-blue-500/20 hover:border-blue-500/40 text-blue-400 hover:text-white rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    disabled={actionLoading}
                    className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 bg-red-500/10 hover:bg-red-500 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-white rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Story Dialog Modal */}
      {editingStory && (
        <Dialog open={!!editingStory} onOpenChange={(open) => !open && setEditingStory(null)}>
          <DialogContent className="max-w-lg w-[95vw] bg-neutral-900 border border-white/10 rounded-[28px] text-white p-6">
            <DialogHeader className="mb-4">
              <DialogTitle className="font-display text-xl uppercase tracking-wider text-brand">Edit Traveler Story</DialogTitle>
              <DialogDescription className="text-white/50 text-xs">Modify traveler details before approving their submission.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase tracking-wider text-white/50 font-semibold">Traveler Name</Label>
                <Input
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="bg-black/40 border-white/10 text-white rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] uppercase tracking-wider text-white/50 font-semibold">Destination</Label>
                  <Input
                    required
                    value={editDestination}
                    onChange={(e) => setEditDestination(e.target.value)}
                    className="bg-black/40 border-white/10 text-white rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] uppercase tracking-wider text-white/50 font-semibold">Trip Date</Label>
                  <Input
                    type="date"
                    required
                    value={editTripDate}
                    onChange={(e) => setEditTripDate(e.target.value)}
                    className="bg-black/40 border-white/10 text-white rounded-xl [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase tracking-wider text-white/50 font-semibold">Rating</Label>
                <select
                  value={editRating}
                  onChange={(e) => setEditRating(parseInt(e.target.value))}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
                >
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase tracking-wider text-white/50 font-semibold">Story Text</Label>
                <Textarea
                  required
                  value={editStoryText}
                  onChange={(e) => setEditStoryText(e.target.value)}
                  rows={6}
                  className="bg-black/40 border-white/10 text-white rounded-xl text-xs leading-relaxed resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-white/10 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingStory(null)}
                  className="flex-1 border-white/10 text-white rounded-full uppercase text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 bg-brand text-white font-semibold rounded-full uppercase text-xs animate-none duration-0"
                >
                  Save Updates
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
