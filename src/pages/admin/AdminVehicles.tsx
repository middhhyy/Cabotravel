import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Plus, Edit2, Trash2, Eye, EyeOff, Loader2, X } from "lucide-react";

interface Vehicle {
  id: string;
  name: string;
  slug: string;
  type: string;
  capacity: string;
  luggage: string;
  description: string;
  image: string;
  sort_order: number;
  active: boolean;
}

export function AdminVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState<Partial<Vehicle> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  async function fetchVehicles() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;
      setVehicles(data || []);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleActive(vehicle: Vehicle) {
    try {
      const { error } = await supabase
        .from("vehicles")
        .update({ active: !vehicle.active })
        .eq("id", vehicle.id);

      if (error) throw error;
      fetchVehicles();
    } catch (err) {
      console.error("Error toggling active:", err);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      const { error } = await supabase
        .from("vehicles")
        .delete()
        .eq("id", id);

      if (error) throw error;
      fetchVehicles();
    } catch (err) {
      console.error("Error deleting vehicle:", err);
    }
  }

  function openAddModal() {
    setCurrentVehicle({
      name: "",
      slug: "",
      type: "",
      capacity: "",
      luggage: "",
      description: "",
      image: "",
      sort_order: 0,
      active: true,
    });
    setShowModal(true);
  }

  function openEditModal(vehicle: Vehicle) {
    setCurrentVehicle(vehicle);
    setShowModal(true);
  }

  function handleNameChange(name: string) {
    if (!currentVehicle) return;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setCurrentVehicle({ ...currentVehicle, name, slug });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!currentVehicle || !currentVehicle.name) return;
    setSaving(true);
    try {
      if (currentVehicle.id) {
        const { error } = await supabase
          .from("vehicles")
          .update(currentVehicle)
          .eq("id", currentVehicle.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("vehicles")
          .insert([currentVehicle]);
        if (error) throw error;
      }
      setShowModal(false);
      fetchVehicles();
    } catch (err) {
      console.error("Error saving vehicle:", err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      <AdminHeader activeTab="vehicles" />

      <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display uppercase tracking-widest text-white leading-tight">CMS — Vehicles</h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Manage rental fleet</p>
          </div>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-black hover:bg-brand/90 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Vehicle
          </button>
        </div>

        <section className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-white/50 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-4 px-5">Name</th>
                  <th className="py-4 px-5">Type</th>
                  <th className="py-4 px-5">Capacity</th>
                  <th className="py-4 px-5">Luggage</th>
                  <th className="py-4 px-5">Active</th>
                  <th className="py-4 px-5">Order</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-white/40 uppercase tracking-wider">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-brand" />
                        Fetching vehicles...
                      </div>
                    </td>
                  </tr>
                ) : vehicles.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-white/40 uppercase tracking-wider">
                      No vehicles found
                    </td>
                  </tr>
                ) : (
                  vehicles.map((v) => (
                    <tr key={v.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-5 font-medium text-white">{v.name}</td>
                      <td className="py-4 px-5 text-white/70">{v.type}</td>
                      <td className="py-4 px-5 text-white/70">{v.capacity}</td>
                      <td className="py-4 px-5 text-white/70">{v.luggage}</td>
                      <td className="py-4 px-5">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            v.active
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                        >
                          {v.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-white/55">{v.sort_order}</td>
                      <td className="py-4 px-5 text-right flex items-center justify-end gap-2.5">
                        <button
                          onClick={() => handleToggleActive(v)}
                          className="p-1.5 hover:bg-white/5 rounded-lg border border-white/10 text-white/70 hover:text-white transition cursor-pointer"
                          title="Toggle active"
                        >
                          {v.active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => openEditModal(v)}
                          className="p-1.5 hover:bg-white/5 rounded-lg border border-white/10 text-white/70 hover:text-white transition cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(v.id)}
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
      {showModal && currentVehicle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-3xl max-w-lg w-full p-6 space-y-4 my-8 relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-display text-base uppercase text-brand">
                {currentVehicle.id ? "Edit Vehicle" : "Add Vehicle"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 hover:bg-white/5 rounded-full border border-white/10 text-white/50 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    required
                    value={currentVehicle.name || ""}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Slug</label>
                  <input
                    type="text"
                    disabled
                    value={currentVehicle.slug || ""}
                    className="w-full bg-black/20 border border-white/5 rounded-xl px-3 py-2 text-white/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Type</label>
                  <input
                    type="text"
                    required
                    value={currentVehicle.type || ""}
                    onChange={(e) => setCurrentVehicle({ ...currentVehicle, type: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Capacity</label>
                  <input
                    type="text"
                    required
                    value={currentVehicle.capacity || ""}
                    onChange={(e) => setCurrentVehicle({ ...currentVehicle, capacity: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Luggage</label>
                  <input
                    type="text"
                    required
                    value={currentVehicle.luggage || ""}
                    onChange={(e) => setCurrentVehicle({ ...currentVehicle, luggage: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Image URL</label>
                <input
                  type="text"
                  value={currentVehicle.image || ""}
                  onChange={(e) => setCurrentVehicle({ ...currentVehicle, image: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Description</label>
                <textarea
                  rows={3}
                  value={currentVehicle.description || ""}
                  onChange={(e) => setCurrentVehicle({ ...currentVehicle, description: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-brand resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="space-y-1.5">
                  <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Sort Order</label>
                  <input
                    type="number"
                    value={currentVehicle.sort_order ?? 0}
                    onChange={(e) => setCurrentVehicle({ ...currentVehicle, sort_order: parseInt(e.target.value) || 0 })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                  />
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="v-active"
                    checked={currentVehicle.active || false}
                    onChange={(e) => setCurrentVehicle({ ...currentVehicle, active: e.target.checked })}
                    className="rounded bg-black/45 border-white/10 text-brand focus:ring-0 w-4 h-4 cursor-pointer accent-brand"
                  />
                  <label htmlFor="v-active" className="text-white/70 cursor-pointer select-none">
                    Active (Show on live site)
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
