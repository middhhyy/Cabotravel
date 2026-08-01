import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Plus, Edit2, Trash2, Eye, EyeOff, Loader2, X } from "lucide-react";

interface MainDestination {
  id: string;
  name: string;
  slug: string;
  region: string;
  country: string;
  tagline: string;
  description: string;
  image: string;
  hero_image: string;
  highlights: string[];
  best_time: string;
  duration: string;
  starting_from: string;
  href: string;
  sort_order: number;
  active: boolean;
}

interface IntlDestination {
  id: string;
  name: string;
  slug: string;
  region: string;
  tagline: string;
  image: string;
  href?: string;
  to_path?: string;
  sort_order: number;
  active: boolean;
}

interface DomDestination {
  id: string;
  name: string;
  slug: string;
  region: string;
  tagline: string;
  image: string;
  href?: string;
  sort_order: number;
  active: boolean;
}

type TabType = "main" | "international" | "domestic";

export function AdminDestinations() {
  const [activeTab, setActiveTab] = useState<TabType>("main");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Lists
  const [mainList, setMainList] = useState<MainDestination[]>([]);
  const [intlList, setIntlList] = useState<IntlDestination[]>([]);
  const [domList, setDomList] = useState<DomDestination[]>([]);

  // Current entity for modal
  const [currentMain, setCurrentMain] = useState<Partial<MainDestination> | null>(null);
  const [currentIntl, setCurrentIntl] = useState<Partial<IntlDestination> | null>(null);
  const [currentDom, setCurrentDom] = useState<Partial<DomDestination> | null>(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  async function fetchData() {
    setLoading(true);
    try {
      if (activeTab === "main") {
        const { data, error } = await supabase
          .from("destinations")
          .select("*")
          .order("sort_order", { ascending: true });
        if (error) throw error;
        setMainList(data || []);
      } else if (activeTab === "international") {
        const { data, error } = await supabase
          .from("international_destinations")
          .select("*")
          .order("sort_order", { ascending: true });
        if (error) throw error;
        setIntlList(data || []);
      } else {
        const { data, error } = await supabase
          .from("domestic_destinations")
          .select("*")
          .order("sort_order", { ascending: true });
        if (error) throw error;
        setDomList(data || []);
      }
    } catch (err) {
      console.error(`Error fetching ${activeTab} destinations:`, err);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleActive(item: any) {
    try {
      const table = activeTab === "main" ? "destinations" : activeTab === "international" ? "international_destinations" : "domestic_destinations";
      const { error } = await supabase
        .from(table)
        .update({ active: !item.active })
        .eq("id", item.id);

      if (error) throw error;
      fetchData();
    } catch (err) {
      console.error("Error toggling active status:", err);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this destination?")) return;
    try {
      const table = activeTab === "main" ? "destinations" : activeTab === "international" ? "international_destinations" : "domestic_destinations";
      const { error } = await supabase
        .from(table)
        .delete()
        .eq("id", id);

      if (error) throw error;
      fetchData();
    } catch (err) {
      console.error("Error deleting destination:", err);
    }
  }

  function handleNameChange(name: string) {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    if (activeTab === "main") {
      setCurrentMain({ ...currentMain, name, slug });
    } else if (activeTab === "international") {
      setCurrentIntl({ ...currentIntl, name, slug });
    } else {
      setCurrentDom({ ...currentDom, name, slug });
    }
  }

  function openAddModal() {
    if (activeTab === "main") {
      setCurrentMain({
        name: "",
        slug: "",
        region: "Domestic",
        country: "India",
        tagline: "",
        description: "",
        image: "",
        hero_image: "",
        highlights: [],
        best_time: "",
        duration: "",
        starting_from: "",
        href: "",
        sort_order: 0,
        active: true,
      });
    } else if (activeTab === "international") {
      setCurrentIntl({
        name: "",
        slug: "",
        region: "INTERNATIONAL · ",
        tagline: "",
        image: "",
        href: "",
        to_path: "",
        sort_order: 0,
        active: true,
      });
    } else {
      setCurrentDom({
        name: "",
        slug: "",
        region: "DOMESTIC · INDIA",
        tagline: "",
        image: "",
        href: "",
        sort_order: 0,
        active: true,
      });
    }
    setShowModal(true);
  }

  function openEditModal(item: any) {
    if (activeTab === "main") {
      setCurrentMain(item);
    } else if (activeTab === "international") {
      setCurrentIntl(item);
    } else {
      setCurrentDom(item);
    }
    setShowModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (activeTab === "main" && currentMain) {
        if (currentMain.id) {
          const { error } = await supabase
            .from("destinations")
            .update(currentMain)
            .eq("id", currentMain.id);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from("destinations")
            .insert([currentMain]);
          if (error) throw error;
        }
      } else if (activeTab === "international" && currentIntl) {
        if (currentIntl.id) {
          const { error } = await supabase
            .from("international_destinations")
            .update(currentIntl)
            .eq("id", currentIntl.id);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from("international_destinations")
            .insert([currentIntl]);
          if (error) throw error;
        }
      } else if (activeTab === "domestic" && currentDom) {
        if (currentDom.id) {
          const { error } = await supabase
            .from("domestic_destinations")
            .update(currentDom)
            .eq("id", currentDom.id);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from("domestic_destinations")
            .insert([currentDom]);
          if (error) throw error;
        }
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error("Error saving destination:", err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      <AdminHeader activeTab="destinations" />

      <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-display uppercase tracking-widest text-white leading-tight">CMS — Destinations</h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Manage location pages and packages catalogs</p>
          </div>
          <button
            onClick={openAddModal}
            className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-black hover:bg-brand/90 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Destination
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-black/40 p-1 border border-white/5 w-fit">
          {(["main", "international", "domestic"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition cursor-pointer ${
                activeTab === tab ? "bg-brand text-black" : "text-white/60 hover:text-white"
              }`}
            >
              {tab === "main" ? "Main Catalog" : tab === "international" ? "International Packages" : "Domestic Packages"}
            </button>
          ))}
        </div>

        <section className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-white/50 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-4 px-5">Name</th>
                  <th className="py-4 px-5">Slug</th>
                  <th className="py-4 px-5">Region</th>
                  {activeTab === "main" && <th className="py-4 px-5">Country</th>}
                  <th className="py-4 px-5">Active</th>
                  <th className="py-4 px-5">Order</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={activeTab === "main" ? 7 : 6} className="py-12 text-center text-white/40 uppercase tracking-wider">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-brand" />
                        Fetching destinations...
                      </div>
                    </td>
                  </tr>
                ) : (activeTab === "main" ? mainList.length === 0 : activeTab === "international" ? intlList.length === 0 : domList.length === 0) ? (
                  <tr>
                    <td colSpan={activeTab === "main" ? 7 : 6} className="py-12 text-center text-white/40 uppercase tracking-wider">
                      No destinations found in this category
                    </td>
                  </tr>
                ) : (
                  (activeTab === "main" ? mainList : activeTab === "international" ? intlList : domList).map((item: any) => (
                    <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-5 font-medium text-white">{item.name}</td>
                      <td className="py-4 px-5 text-white/70">{item.slug}</td>
                      <td className="py-4 px-5 text-white/70">{item.region}</td>
                      {activeTab === "main" && <td className="py-4 px-5 text-white/70">{item.country}</td>}
                      <td className="py-4 px-5">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            item.active
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                        >
                          {item.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-white/55">{item.sort_order}</td>
                      <td className="py-4 px-5 text-right flex items-center justify-end gap-2.5">
                        <button
                          onClick={() => handleToggleActive(item)}
                          className="p-1.5 hover:bg-white/5 rounded-lg border border-white/10 text-white/70 hover:text-white transition cursor-pointer"
                          title="Toggle active"
                        >
                          {item.active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 hover:bg-white/5 rounded-lg border border-white/10 text-white/70 hover:text-white transition cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
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
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-3xl max-w-2xl w-full p-6 space-y-4 my-8 relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-display text-base uppercase text-brand">
                {activeTab === "main" ? (currentMain?.id ? "Edit Main Destination" : "Add Main Destination") :
                 activeTab === "international" ? (currentIntl?.id ? "Edit Intl Destination" : "Add Intl Destination") :
                 (currentDom?.id ? "Edit Domestic Destination" : "Add Domestic Destination")}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 hover:bg-white/5 rounded-full border border-white/10 text-white/50 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {activeTab === "main" && currentMain && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Name</label>
                      <input
                        type="text"
                        required
                        value={currentMain.name || ""}
                        onChange={(e) => handleNameChange(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Slug</label>
                      <input
                        type="text"
                        disabled
                        value={currentMain.slug || ""}
                        className="w-full bg-black/20 border border-white/5 rounded-xl px-3 py-2 text-white/40"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Region</label>
                      <select
                        value={currentMain.region || "Domestic"}
                        onChange={(e) => setCurrentMain({ ...currentMain, region: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand cursor-pointer"
                      >
                        <option value="Domestic">Domestic</option>
                        <option value="International">International</option>
                        <option value="Transport">Transport</option>
                        <option value="Book Now">Book Now</option>
                        <option value="Assistance">Assistance</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Country</label>
                      <input
                        type="text"
                        required
                        value={currentMain.country || ""}
                        onChange={(e) => setCurrentMain({ ...currentMain, country: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Starting From</label>
                      <input
                        type="text"
                        value={currentMain.starting_from || ""}
                        placeholder="e.g. ₹18,900"
                        onChange={(e) => setCurrentMain({ ...currentMain, starting_from: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Tagline</label>
                    <input
                      type="text"
                      value={currentMain.tagline || ""}
                      onChange={(e) => setCurrentMain({ ...currentMain, tagline: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Description</label>
                    <textarea
                      rows={3}
                      value={currentMain.description || ""}
                      onChange={(e) => setCurrentMain({ ...currentMain, description: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-brand resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Image URL</label>
                      <input
                        type="text"
                        value={currentMain.image || ""}
                        onChange={(e) => setCurrentMain({ ...currentMain, image: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Hero Image URL</label>
                      <input
                        type="text"
                        value={currentMain.hero_image || ""}
                        onChange={(e) => setCurrentMain({ ...currentMain, hero_image: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Highlights (One per line)</label>
                    <textarea
                      rows={3}
                      value={currentMain.highlights?.join("\n") || ""}
                      onChange={(e) => setCurrentMain({ ...currentMain, highlights: e.target.value.split("\n").filter(h => h.trim() !== "") })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-brand resize-none"
                      placeholder="Line 1&#10;Line 2&#10;Line 3"
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-1.5 col-span-2">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Best Time</label>
                      <input
                        type="text"
                        value={currentMain.best_time || ""}
                        placeholder="e.g. Sep - Mar"
                        onChange={(e) => setCurrentMain({ ...currentMain, best_time: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                      />
                    </div>
                    <div className="space-y-1.5 col-span-2">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Duration</label>
                      <input
                        type="text"
                        value={currentMain.duration || ""}
                        placeholder="e.g. 5 - 7 nights"
                        onChange={(e) => setCurrentMain({ ...currentMain, duration: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="space-y-1.5 col-span-2">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Custom Href (External page)</label>
                      <input
                        type="text"
                        value={currentMain.href || ""}
                        onChange={(e) => setCurrentMain({ ...currentMain, href: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Sort Order</label>
                      <input
                        type="number"
                        value={currentMain.sort_order ?? 0}
                        onChange={(e) => setCurrentMain({ ...currentMain, sort_order: parseInt(e.target.value) || 0 })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="main-active"
                      checked={currentMain.active || false}
                      onChange={(e) => setCurrentMain({ ...currentMain, active: e.target.checked })}
                      className="rounded bg-black/45 border-white/10 text-brand focus:ring-0 w-4 h-4 cursor-pointer accent-brand"
                    />
                    <label htmlFor="main-active" className="text-white/70 cursor-pointer select-none">
                      Active (Show on live catalog page)
                    </label>
                  </div>
                </>
              )}

              {activeTab === "international" && currentIntl && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Name</label>
                      <input
                        type="text"
                        required
                        value={currentIntl.name || ""}
                        onChange={(e) => handleNameChange(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Slug</label>
                      <input
                        type="text"
                        disabled
                        value={currentIntl.slug || ""}
                        className="w-full bg-black/20 border border-white/5 rounded-xl px-3 py-2 text-white/40"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Region Label</label>
                      <input
                        type="text"
                        required
                        value={currentIntl.region || ""}
                        placeholder="e.g. INTERNATIONAL · UAE"
                        onChange={(e) => setCurrentIntl({ ...currentIntl, region: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Tagline</label>
                      <input
                        type="text"
                        required
                        value={currentIntl.tagline || ""}
                        onChange={(e) => setCurrentIntl({ ...currentIntl, tagline: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Image URL</label>
                    <input
                      type="text"
                      value={currentIntl.image || ""}
                      onChange={(e) => setCurrentIntl({ ...currentIntl, image: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Enquiry Link (WhatsApp)</label>
                      <input
                        type="text"
                        value={currentIntl.href || ""}
                        onChange={(e) => setCurrentIntl({ ...currentIntl, href: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Internal Path (Link to page)</label>
                      <input
                        type="text"
                        value={currentIntl.to_path || ""}
                        placeholder="e.g. /destinations/bali"
                        onChange={(e) => setCurrentIntl({ ...currentIntl, to_path: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Sort Order</label>
                      <input
                        type="number"
                        value={currentIntl.sort_order ?? 0}
                        onChange={(e) => setCurrentIntl({ ...currentIntl, sort_order: parseInt(e.target.value) || 0 })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-5">
                      <input
                        type="checkbox"
                        id="intl-active"
                        checked={currentIntl.active || false}
                        onChange={(e) => setCurrentIntl({ ...currentIntl, active: e.target.checked })}
                        className="rounded bg-black/45 border-white/10 text-brand focus:ring-0 w-4 h-4 cursor-pointer accent-brand"
                      />
                      <label htmlFor="intl-active" className="text-white/70 cursor-pointer select-none">
                        Active (Show on /international-packages)
                      </label>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "domestic" && currentDom && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Name</label>
                      <input
                        type="text"
                        required
                        value={currentDom.name || ""}
                        onChange={(e) => handleNameChange(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Slug</label>
                      <input
                        type="text"
                        disabled
                        value={currentDom.slug || ""}
                        className="w-full bg-black/20 border border-white/5 rounded-xl px-3 py-2 text-white/40"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Region Label</label>
                      <input
                        type="text"
                        required
                        value={currentDom.region || ""}
                        placeholder="e.g. DOMESTIC · INDIA"
                        onChange={(e) => setCurrentDom({ ...currentDom, region: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Tagline</label>
                      <input
                        type="text"
                        required
                        value={currentDom.tagline || ""}
                        onChange={(e) => setCurrentDom({ ...currentDom, tagline: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Image URL</label>
                    <input
                      type="text"
                      value={currentDom.image || ""}
                      onChange={(e) => setCurrentDom({ ...currentDom, image: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Enquiry Link (WhatsApp)</label>
                    <input
                      type="text"
                      value={currentDom.href || ""}
                      onChange={(e) => setCurrentDom({ ...currentDom, href: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Sort Order</label>
                      <input
                        type="number"
                        value={currentDom.sort_order ?? 0}
                        onChange={(e) => setCurrentDom({ ...currentDom, sort_order: parseInt(e.target.value) || 0 })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-5">
                      <input
                        type="checkbox"
                        id="dom-active"
                        checked={currentDom.active || false}
                        onChange={(e) => setCurrentDom({ ...currentDom, active: e.target.checked })}
                        className="rounded bg-black/45 border-white/10 text-brand focus:ring-0 w-4 h-4 cursor-pointer accent-brand"
                      />
                      <label htmlFor="dom-active" className="text-white/70 cursor-pointer select-none">
                        Active (Show on /domestic-packages)
                      </label>
                    </div>
                  </div>
                </>
              )}

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
