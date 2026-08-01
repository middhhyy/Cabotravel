import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Plus, Edit2, Trash2, Eye, EyeOff, Loader2, X } from "lucide-react";

interface ItineraryItem {
  day: number;
  title: string;
  detail: string;
}

interface Package {
  id: string;
  slug: string;
  title: string;
  destination_slug: string;
  category: string;
  nights: number;
  days: number;
  price: string;
  price_value: number;
  image: string;
  inclusions: string[];
  itinerary: ItineraryItem[];
  active: boolean;
  sort_order: number;
}

const CATEGORIES = [
  "Backwaters",
  "Hill Station",
  "Beach",
  "Heritage",
  "Wildlife",
  "Ayurveda",
  "Honeymoon",
  "Adventure",
  "Culture",
];

export function AdminPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentPkg, setCurrentPkg] = useState<Partial<Package> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  async function fetchPackages() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;
      setPackages(data || []);
    } catch (err) {
      console.error("Error fetching packages:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleActive(pkg: Package) {
    try {
      const { error } = await supabase
        .from("packages")
        .update({ active: !pkg.active })
        .eq("id", pkg.id);

      if (error) throw error;
      fetchPackages();
    } catch (err) {
      console.error("Error toggling package active status:", err);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    try {
      const { error } = await supabase
        .from("packages")
        .delete()
        .eq("id", id);

      if (error) throw error;
      fetchPackages();
    } catch (err) {
      console.error("Error deleting package:", err);
    }
  }

  function handleTitleChange(title: string) {
    if (!currentPkg) return;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setCurrentPkg({ ...currentPkg, title, slug });
  }

  function openAddModal() {
    setCurrentPkg({
      title: "",
      slug: "",
      destination_slug: "kerala",
      category: "Backwaters",
      nights: 3,
      days: 4,
      price: "₹15,000",
      price_value: 15000,
      image: "",
      inclusions: [],
      itinerary: [{ day: 1, title: "Arrive", detail: "Arrival at destination." }],
      active: true,
      sort_order: 0,
    });
    setShowModal(true);
  }

  function openEditModal(pkg: Package) {
    setCurrentPkg({
      ...pkg,
      inclusions: pkg.inclusions || [],
      itinerary: pkg.itinerary || [],
    });
    setShowModal(true);
  }

  function handleAddItineraryDay() {
    if (!currentPkg) return;
    const currentItin = currentPkg.itinerary || [];
    const nextDay = currentItin.length + 1;
    setCurrentPkg({
      ...currentPkg,
      itinerary: [...currentItin, { day: nextDay, title: "", detail: "" }],
    });
  }

  function handleRemoveItineraryDay(idx: number) {
    if (!currentPkg || !currentPkg.itinerary) return;
    const updated = [...currentPkg.itinerary];
    updated.splice(idx, 1);
    // Reset day numbers
    const reassigned = updated.map((item, index) => ({ ...item, day: index + 1 }));
    setCurrentPkg({ ...currentPkg, itinerary: reassigned });
  }

  function handleItineraryChange(idx: number, field: keyof ItineraryItem, val: any) {
    if (!currentPkg || !currentPkg.itinerary) return;
    const updated = [...currentPkg.itinerary];
    updated[idx] = { ...updated[idx], [field]: val };
    setCurrentPkg({ ...currentPkg, itinerary: updated });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!currentPkg || !currentPkg.title) return;
    setSaving(true);
    try {
      if (currentPkg.id) {
        const { error } = await supabase
          .from("packages")
          .update(currentPkg)
          .eq("id", currentPkg.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("packages")
          .insert([currentPkg]);
        if (error) throw error;
      }
      setShowModal(false);
      fetchPackages();
    } catch (err) {
      console.error("Error saving package:", err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      <AdminHeader activeTab="packages" />

      <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display uppercase tracking-widest text-white leading-tight">CMS — Packages</h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Manage custom holiday tour packages</p>
          </div>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-black hover:bg-brand/90 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Package
          </button>
        </div>

        <section className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-white/50 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-4 px-5">Title</th>
                  <th className="py-4 px-5">Destination Slug</th>
                  <th className="py-4 px-5">Category</th>
                  <th className="py-4 px-5">Nights/Days</th>
                  <th className="py-4 px-5">Price</th>
                  <th className="py-4 px-5">Active</th>
                  <th className="py-4 px-5">Order</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-white/40 uppercase tracking-wider">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-brand" />
                        Fetching packages...
                      </div>
                    </td>
                  </tr>
                ) : packages.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-white/40 uppercase tracking-wider">
                      No packages found
                    </td>
                  </tr>
                ) : (
                  packages.map((p) => (
                    <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-5 font-medium text-white">{p.title}</td>
                      <td className="py-4 px-5 text-white/70">{p.destination_slug}</td>
                      <td className="py-4 px-5 text-white/70">{p.category}</td>
                      <td className="py-4 px-5 text-white/70">
                        {p.nights}N / {p.days}D
                      </td>
                      <td className="py-4 px-5 text-white/70">{p.price}</td>
                      <td className="py-4 px-5">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            p.active
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                        >
                          {p.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-white/55">{p.sort_order}</td>
                      <td className="py-4 px-5 text-right flex items-center justify-end gap-2.5">
                        <button
                          onClick={() => handleToggleActive(p)}
                          className="p-1.5 hover:bg-white/5 rounded-lg border border-white/10 text-white/70 hover:text-white transition cursor-pointer"
                          title="Toggle active"
                        >
                          {p.active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 hover:bg-white/5 rounded-lg border border-white/10 text-white/70 hover:text-white transition cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
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
      {showModal && currentPkg && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-3xl max-w-2xl w-full p-6 space-y-4 my-8 relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-display text-base uppercase text-brand">
                {currentPkg.id ? "Edit Package" : "Add Package"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 hover:bg-white/5 rounded-full border border-white/10 text-white/50 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs max-h-[70vh] overflow-y-auto pr-2 scrollbar-none">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Title</label>
                  <input
                    type="text"
                    required
                    value={currentPkg.title || ""}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Slug</label>
                  <input
                    type="text"
                    disabled
                    value={currentPkg.slug || ""}
                    className="w-full bg-black/20 border border-white/5 rounded-xl px-3 py-2 text-white/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Destination Slug</label>
                  <input
                    type="text"
                    required
                    value={currentPkg.destination_slug || ""}
                    onChange={(e) => setCurrentPkg({ ...currentPkg, destination_slug: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Category</label>
                  <select
                    value={currentPkg.category || "Backwaters"}
                    onChange={(e) => setCurrentPkg({ ...currentPkg, category: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Nights</label>
                  <input
                    type="number"
                    required
                    value={currentPkg.nights ?? 0}
                    onChange={(e) => setCurrentPkg({ ...currentPkg, nights: parseInt(e.target.value) || 0 })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Days</label>
                  <input
                    type="number"
                    required
                    value={currentPkg.days ?? 0}
                    onChange={(e) => setCurrentPkg({ ...currentPkg, days: parseInt(e.target.value) || 0 })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Price Text</label>
                  <input
                    type="text"
                    required
                    value={currentPkg.price || ""}
                    placeholder="e.g. ₹24,900"
                    onChange={(e) => setCurrentPkg({ ...currentPkg, price: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Price Value (Number)</label>
                  <input
                    type="number"
                    required
                    value={currentPkg.price_value ?? 0}
                    onChange={(e) => setCurrentPkg({ ...currentPkg, price_value: parseInt(e.target.value) || 0 })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Image URL</label>
                <input
                  type="text"
                  value={currentPkg.image || ""}
                  onChange={(e) => setCurrentPkg({ ...currentPkg, image: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Inclusions (One per line)</label>
                <textarea
                  rows={3}
                  value={currentPkg.inclusions?.join("\n") || ""}
                  onChange={(e) => setCurrentPkg({ ...currentPkg, inclusions: e.target.value.split("\n").filter(h => h.trim() !== "") })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-brand resize-none"
                  placeholder="Inclusion 1&#10;Inclusion 2"
                />
              </div>

              {/* ITINERARY DAYS */}
              <div className="space-y-3 border-t border-white/10 pt-4">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] text-brand font-bold uppercase tracking-wider">Itinerary (Days timeline)</label>
                  <button
                    type="button"
                    onClick={handleAddItineraryDay}
                    className="text-[10px] uppercase bg-brand/10 border border-brand/20 hover:bg-brand/20 text-brand px-3 py-1 rounded-lg font-bold transition cursor-pointer"
                  >
                    + Add Day
                  </button>
                </div>

                <div className="space-y-3">
                  {(currentPkg.itinerary || []).map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start border border-white/5 p-3 rounded-2xl bg-white/[0.01]">
                      <div className="w-14">
                        <label className="text-[9px] text-white/40 block mb-1">Day</label>
                        <input
                          type="number"
                          value={item.day}
                          onChange={(e) => handleItineraryChange(idx, "day", parseInt(e.target.value) || 0)}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-center"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div>
                          <label className="text-[9px] text-white/40 block mb-1">Day Title</label>
                          <input
                            type="text"
                            required
                            value={item.title}
                            onChange={(e) => handleItineraryChange(idx, "title", e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-white/40 block mb-1">Day Detail Description</label>
                          <textarea
                            rows={2}
                            required
                            value={item.detail}
                            onChange={(e) => handleItineraryChange(idx, "detail", e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 resize-none"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveItineraryDay(idx)}
                        className="text-red-400 hover:text-red-300 self-center p-1.5 hover:bg-white/5 rounded-full transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center border-t border-white/10 pt-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Sort Order</label>
                  <input
                    type="number"
                    value={currentPkg.sort_order ?? 0}
                    onChange={(e) => setCurrentPkg({ ...currentPkg, sort_order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                  />
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="pkg-active"
                    checked={currentPkg.active || false}
                    onChange={(e) => setCurrentPkg({ ...currentPkg, active: e.target.checked })}
                    className="rounded bg-black/45 border-white/10 text-brand focus:ring-0 w-4 h-4 cursor-pointer accent-brand"
                  />
                  <label htmlFor="pkg-active" className="text-white/70 cursor-pointer select-none">
                    Active (Show on packages catalog)
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
