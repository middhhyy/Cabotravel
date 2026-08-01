import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Plus, Edit2, Trash2, Eye, EyeOff, Loader2, X } from "lucide-react";

interface Faq {
  id: string;
  question: string;
  answer: string;
  active: boolean;
  sort_order: number;
}

export function AdminFaqs() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<Partial<Faq> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchFaqs();
  }, []);

  async function fetchFaqs() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
    } catch (err) {
      console.error("Error fetching faqs:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleActive(faq: Faq) {
    try {
      const { error } = await supabase
        .from("faqs")
        .update({ active: !faq.active })
        .eq("id", faq.id);

      if (error) throw error;
      fetchFaqs();
    } catch (err) {
      console.error("Error toggling active status on FAQ:", err);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      const { error } = await supabase
        .from("faqs")
        .delete()
        .eq("id", id);

      if (error) throw error;
      fetchFaqs();
    } catch (err) {
      console.error("Error deleting FAQ:", err);
    }
  }

  function openAddModal() {
    setCurrentFaq({
      question: "",
      answer: "",
      sort_order: 0,
      active: true,
    });
    setShowModal(true);
  }

  function openEditModal(faq: Faq) {
    setCurrentFaq(faq);
    setShowModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!currentFaq || !currentFaq.question || !currentFaq.answer) return;
    setSaving(true);
    try {
      if (currentFaq.id) {
        const { error } = await supabase
          .from("faqs")
          .update(currentFaq)
          .eq("id", currentFaq.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("faqs")
          .insert([currentFaq]);
        if (error) throw error;
      }
      setShowModal(false);
      fetchFaqs();
    } catch (err) {
      console.error("Error saving FAQ:", err);
    } finally {
      setSaving(false);
    }
  }

  function truncateString(str: string, num: number) {
    if (str.length <= num) return str;
    return str.slice(0, num) + "...";
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      <AdminHeader activeTab="faqs" />

      <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display uppercase tracking-widest text-white leading-tight">CMS — FAQs</h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Manage homepage accordion FAQs</p>
          </div>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-black hover:bg-brand/90 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add FAQ
          </button>
        </div>

        <section className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-white/50 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-4 px-5">Question</th>
                  <th className="py-4 px-5">Active</th>
                  <th className="py-4 px-5">Order</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-white/40 uppercase tracking-wider">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-brand" />
                        Fetching FAQs...
                      </div>
                    </td>
                  </tr>
                ) : faqs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-white/40 uppercase tracking-wider">
                      No FAQs found
                    </td>
                  </tr>
                ) : (
                  faqs.map((f) => (
                    <tr key={f.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-5 font-medium text-white" title={f.question}>
                        {truncateString(f.question, 60)}
                      </td>
                      <td className="py-4 px-5">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            f.active
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                        >
                          {f.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-white/55">{f.sort_order}</td>
                      <td className="py-4 px-5 text-right flex items-center justify-end gap-2.5">
                        <button
                          onClick={() => handleToggleActive(f)}
                          className="p-1.5 hover:bg-white/5 rounded-lg border border-white/10 text-white/70 hover:text-white transition cursor-pointer"
                          title="Toggle active"
                        >
                          {f.active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => openEditModal(f)}
                          className="p-1.5 hover:bg-white/5 rounded-lg border border-white/10 text-white/70 hover:text-white transition cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* MODAL */}
      {showModal && currentFaq && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-3xl max-w-lg w-full p-6 space-y-4 my-8 relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-display text-base uppercase text-brand">
                {currentFaq.id ? "Edit FAQ" : "Add FAQ"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 hover:bg-white/5 rounded-full border border-white/10 text-white/50 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Question</label>
                <textarea
                  rows={3}
                  required
                  value={currentFaq.question || ""}
                  onChange={(e) => setCurrentFaq({ ...currentFaq, question: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-brand resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Answer</label>
                <textarea
                  rows={5}
                  required
                  value={currentFaq.answer || ""}
                  onChange={(e) => setCurrentFaq({ ...currentFaq, answer: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-brand resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="space-y-1.5">
                  <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Sort Order</label>
                  <input
                    type="number"
                    value={currentFaq.sort_order ?? 0}
                    onChange={(e) => setCurrentFaq({ ...currentFaq, sort_order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                  />
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="faq-active"
                    checked={currentFaq.active || false}
                    onChange={(e) => setCurrentFaq({ ...currentFaq, active: e.target.checked })}
                    className="rounded bg-black/45 border-white/10 text-brand focus:ring-0 w-4 h-4 cursor-pointer accent-brand"
                  />
                  <label htmlFor="faq-active" className="text-white/70 cursor-pointer select-none">
                    Active (Show in Accordion)
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-white/10 rounded-xl hover:bg-white/5 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-brand text-black font-semibold rounded-xl hover:bg-brand/90 transition disabled:opacity-50 flex items-center gap-1.5"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
