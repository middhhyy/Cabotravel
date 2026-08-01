import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Trash2, Check, X, Eye, Loader2 } from "lucide-react";

interface Feedback {
  id: string;
  name: string;
  message: string;
  rating: number;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    fetchFeedback();
  }, []);

  async function fetchFeedback() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFeedbacks(data || []);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: string, status: "approved" | "rejected") {
    try {
      const { error } = await supabase
        .from("feedback")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      fetchFeedback();
      if (selectedFeedback && selectedFeedback.id === id) {
        setSelectedFeedback({ ...selectedFeedback, status });
      }
    } catch (err) {
      console.error("Error updating feedback status:", err);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      const { error } = await supabase
        .from("feedback")
        .delete()
        .eq("id", id);

      if (error) throw error;
      fetchFeedback();
      if (selectedFeedback && selectedFeedback.id === id) {
        setSelectedFeedback(null);
      }
    } catch (err) {
      console.error("Error deleting feedback:", err);
    }
  }

  function truncateString(str: string, num: number) {
    if (!str) return "";
    if (str.length <= num) return str;
    return str.slice(0, num) + "...";
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      <AdminHeader activeTab="feedback" />

      <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
        <div>
          <h2 className="text-xl font-display uppercase tracking-widest text-white leading-tight">CMS — Customer Feedback</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Manage feedback submissions shown on landing pages</p>
        </div>

        <section className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-white/50 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-4 px-5">Name</th>
                  <th className="py-4 px-5">Message</th>
                  <th className="py-4 px-5">Rating</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5">Submitted At</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-white/40 uppercase tracking-wider">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-brand" />
                        Fetching feedback...
                      </div>
                    </td>
                  </tr>
                ) : feedbacks.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-white/40 uppercase tracking-wider">
                      No feedback submissions found
                    </td>
                  </tr>
                ) : (
                  feedbacks.map((f) => {
                    let badgeColor = "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
                    if (f.status === "approved") {
                      badgeColor = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
                    } else if (f.status === "rejected") {
                      badgeColor = "bg-red-500/10 text-red-400 border border-red-500/20";
                    }

                    return (
                      <tr key={f.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-5 font-medium text-white">{f.name}</td>
                        <td className="py-4 px-5 text-white/70" title={f.message}>
                          {truncateString(f.message, 60)}
                        </td>
                        <td className="py-4 px-5 text-white/70">{"★".repeat(f.rating)}</td>
                        <td className="py-4 px-5">
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${badgeColor}`}>
                            {f.status}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-white/55">
                          {new Date(f.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-5 text-right flex items-center justify-end gap-2.5">
                          <button
                            onClick={() => setSelectedFeedback(f)}
                            className="p-1.5 hover:bg-white/5 rounded-lg border border-white/10 text-white/70 hover:text-white transition cursor-pointer"
                            title="View full message"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(f.id, "approved")}
                            className="p-1.5 hover:bg-emerald-500/10 rounded-lg border border-white/10 text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
                            title="Approve"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(f.id, "rejected")}
                            className="p-1.5 hover:bg-red-500/10 rounded-lg border border-white/10 text-red-400 hover:text-red-300 transition cursor-pointer"
                            title="Reject"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(f.id)}
                            className="p-1.5 hover:bg-white/5 rounded-lg border border-white/10 text-red-400 hover:text-red-300 transition cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* DETAIL SIDE PANEL */}
      {selectedFeedback && (
        <div className="fixed inset-y-0 right-0 z-50 w-96 bg-[#111] border-l border-white/10 shadow-2xl flex flex-col text-xs text-white">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="font-display text-base uppercase text-brand">Feedback Details</h3>
              <p className="text-[10px] uppercase text-white/40 tracking-wider">Inspect guest feedback</p>
            </div>
            <button
              onClick={() => setSelectedFeedback(null)}
              className="p-1.5 hover:bg-white/5 rounded-full border border-white/10 text-white/50 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-none">
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-3">
              <div>
                <span className="text-[10px] text-white/40 font-semibold uppercase tracking-wider block">Submitted By</span>
                <span className="text-white font-medium text-sm">{selectedFeedback.name}</span>
              </div>
              <div>
                <span className="text-[10px] text-white/40 font-semibold uppercase tracking-wider block">Rating</span>
                <span className="text-brand text-sm">{"★".repeat(selectedFeedback.rating)}</span>
              </div>
              <div>
                <span className="text-[10px] text-white/40 font-semibold uppercase tracking-wider block">Status</span>
                <span
                  className={`inline-block rounded-full px-2 py-0.5 mt-1 text-[10px] font-semibold uppercase tracking-wider ${
                    selectedFeedback.status === "approved"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : selectedFeedback.status === "rejected"
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                  }`}
                >
                  {selectedFeedback.status}
                </span>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-2">
              <span className="text-[10px] text-white/40 font-semibold uppercase tracking-wider block">Message Content</span>
              <p className="text-white/80 leading-relaxed whitespace-pre-wrap">{selectedFeedback.message}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleStatusChange(selectedFeedback.id, "approved")}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-black font-bold py-2 rounded-xl uppercase tracking-wider transition text-[10px] cursor-pointer"
              >
                Approve & Show
              </button>
              <button
                onClick={() => handleStatusChange(selectedFeedback.id, "rejected")}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white font-semibold py-2 rounded-xl uppercase tracking-wider transition text-[10px] cursor-pointer"
              >
                Reject & Hide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
