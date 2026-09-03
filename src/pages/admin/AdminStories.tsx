import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Trash2, Check, X, Eye, Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { storyKeys } from "@/utils/stories";

interface GuestStory {
  id: string;
  name: string;
  destination: string;
  story: string;
  rating: number;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  likes: number;
  slug?: string;
}

export function AdminStories() {
  const queryClient = useQueryClient();
  const [stories, setStories] = useState<GuestStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState<GuestStory | null>(null);

  useEffect(() => {
    fetchStories();
  }, []);

  async function invalidateStoryQueries(slugOrId?: string) {
    await queryClient.invalidateQueries({ queryKey: storyKeys.all });
    if (slugOrId) {
      queryClient.removeQueries({ queryKey: storyKeys.detail(slugOrId) });
    }
  }

  async function fetchStories() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("guest_stories")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setStories(data || []);
    } catch (err) {
      console.error("Error fetching guest stories:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id: string, status: "approved" | "rejected") {
    const targetStory = stories.find((s) => s.id === id);
    try {
      const { error } = await supabase
        .from("guest_stories")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      fetchStories();
      if (selectedStory && selectedStory.id === id) {
        setSelectedStory({ ...selectedStory, status });
      }
      await invalidateStoryQueries(targetStory?.slug || id);
    } catch (err) {
      console.error("Error updating story status:", err);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this story?")) return;
    const targetStory = stories.find((s) => s.id === id);
    try {
      const { error } = await supabase
        .from("guest_stories")
        .delete()
        .eq("id", id);

      if (error) throw error;
      fetchStories();
      if (selectedStory && selectedStory.id === id) {
        setSelectedStory(null);
      }
      await invalidateStoryQueries(targetStory?.slug || id);
    } catch (err) {
      console.error("Error deleting guest story:", err);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      <AdminHeader activeTab="stories" />

      <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
        <div>
          <h2 className="text-xl font-display uppercase tracking-widest text-white leading-tight">CMS — Guest Stories</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Approve or reject customer submitted testimonials</p>
        </div>

        <section className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-white/50 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-4 px-5">Name</th>
                  <th className="py-4 px-5">Destination</th>
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
                        Fetching stories...
                      </div>
                    </td>
                  </tr>
                ) : stories.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-white/40 uppercase tracking-wider">
                      No guest stories found
                    </td>
                  </tr>
                ) : (
                  stories.map((s) => {
                    let badgeColor = "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
                    if (s.status === "approved") {
                      badgeColor = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
                    } else if (s.status === "rejected") {
                      badgeColor = "bg-red-500/10 text-red-400 border border-red-500/20";
                    }

                    return (
                      <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-5 font-medium text-white">{s.name}</td>
                        <td className="py-4 px-5 text-white/70">{s.destination}</td>
                        <td className="py-4 px-5 text-white/70">{"★".repeat(s.rating)}</td>
                        <td className="py-4 px-5">
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${badgeColor}`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-white/55">
                          {new Date(s.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-5 text-right flex items-center justify-end gap-2.5">
                          <button
                            onClick={() => setSelectedStory(s)}
                            className="p-1.5 hover:bg-white/5 rounded-lg border border-white/10 text-white/70 hover:text-white transition cursor-pointer"
                            title="View full story"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(s.id, "approved")}
                            className="p-1.5 hover:bg-emerald-500/10 rounded-lg border border-white/10 text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
                            title="Approve"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(s.id, "rejected")}
                            className="p-1.5 hover:bg-red-500/10 rounded-lg border border-white/10 text-red-400 hover:text-red-300 transition cursor-pointer"
                            title="Reject"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(s.id)}
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
      {selectedStory && (
        <div className="fixed inset-y-0 right-0 z-50 w-96 bg-[#111] border-l border-white/10 shadow-2xl flex flex-col text-xs text-white">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="font-display text-base uppercase text-brand">Story Details</h3>
              <p className="text-[10px] uppercase text-white/40 tracking-wider">Inspect guest story</p>
            </div>
            <button
              onClick={() => setSelectedStory(null)}
              className="p-1.5 hover:bg-white/5 rounded-full border border-white/10 text-white/50 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-none">
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-3">
              <div>
                <span className="text-[10px] text-white/40 font-semibold uppercase tracking-wider block">Submitted By</span>
                <span className="text-white font-medium text-sm">{selectedStory.name}</span>
              </div>
              <div>
                <span className="text-[10px] text-white/40 font-semibold uppercase tracking-wider block">Destination</span>
                <span className="text-white/80">{selectedStory.destination}</span>
              </div>
              <div>
                <span className="text-[10px] text-white/40 font-semibold uppercase tracking-wider block">Rating</span>
                <span className="text-brand text-sm">{"★".repeat(selectedStory.rating)}</span>
              </div>
              <div>
                <span className="text-[10px] text-white/40 font-semibold uppercase tracking-wider block">Likes Count</span>
                <span className="text-white/80">{selectedStory.likes || 0}</span>
              </div>
              <div>
                <span className="text-[10px] text-white/40 font-semibold uppercase tracking-wider block">Status</span>
                <span
                  className={`inline-block rounded-full px-2 py-0.5 mt-1 text-[10px] font-semibold uppercase tracking-wider ${
                    selectedStory.status === "approved"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : selectedStory.status === "rejected"
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                  }`}
                >
                  {selectedStory.status}
                </span>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-2">
              <span className="text-[10px] text-white/40 font-semibold uppercase tracking-wider block">Story Content</span>
              <p className="text-white/80 leading-relaxed whitespace-pre-wrap">{selectedStory.story}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleStatusChange(selectedStory.id, "approved")}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-black font-bold py-2 rounded-xl uppercase tracking-wider transition text-[10px] cursor-pointer"
              >
                Approve & Show
              </button>
              <button
                onClick={() => handleStatusChange(selectedStory.id, "rejected")}
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
