import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  Plus,
  Search,
  LogOut,
  X,
  Calendar,
  Check,
  User,
  Phone,
  Mail,
  FileText,
  Tag,
  Globe,
  Loader2,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  interest: string;
  status: string;
  channel?: string;
  whatsapp_clicked?: boolean;
  whatsapp_clicked_at?: string;
  created_at: string;
}

interface Note {
  id: string;
  lead_id: string;
  text: string;
  created_at: string;
}

interface Followup {
  id?: string;
  lead_id: string;
  due_date: string;
  done: boolean;
}

export function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    booked: 0,
  });

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [dateFilter, setDateFilter] = useState<string>("All Time");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal and Side Panel States
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editedLead, setEditedLead] = useState<Lead | null>(null);
  const [savingLeadInfo, setSavingLeadInfo] = useState(false);

  // Add Lead Form State
  const [addForm, setAddForm] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
    source: "WhatsApp",
    status: "new",
    notes: "",
  });
  const [submittingLead, setSubmittingLead] = useState(false);

  // Side Panel States
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteText, setNewNoteText] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  const [followup, setFollowup] = useState<Followup | null>(null);
  const [savingFollowup, setSavingFollowup] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .eq("is_deleted", false)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const fetchedLeads: Lead[] = data || [];
      setLeads(fetchedLeads);

      // Compute statistics
      const total = fetchedLeads.length;
      const newLeads = fetchedLeads.filter((l) => l.status === "new").length;
      const contactedLeads = fetchedLeads.filter((l) => l.status === "contacted").length;
      const bookedLeads = fetchedLeads.filter((l) => l.status === "booked").length;

      setStats({
        total,
        new: newLeads,
        contacted: contactedLeads,
        booked: bookedLeads,
      });
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("cabo-admin-auth");
    navigate({ to: "/admin/login" });
  };

  // Status Inline Update
  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("leads")
        .update({ status: newStatus })
        .eq("id", leadId);

      if (error) throw error;

      // Update local state dynamically
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      );

      // Update statistics
      setStats((prev) => {
        const updated = leads.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l));
        return {
          total: updated.length,
          new: updated.filter((l) => l.status === "new").length,
          contacted: updated.filter((l) => l.status === "contacted").length,
          booked: updated.filter((l) => l.status === "booked").length,
        };
      });

      // Update side panel lead if it's currently selected
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      console.error("Error updating lead status:", err);
    }
  };

  // Fetch Side Panel Details
  const fetchLeadDetails = useCallback(async (leadId: string) => {
    try {
      // Notes
      const { data: notesData, error: notesError } = await supabase
        .from("notes")
        .select("*")
        .eq("lead_id", leadId)
        .order("created_at", { ascending: false });

      if (notesError) throw notesError;
      setNotes(notesData || []);

      // Follow-up
      const { data: followupData, error: followupError } = await supabase
        .from("followups")
        .select("*")
        .eq("lead_id", leadId)
        .limit(1);

      if (followupError) throw followupError;

      if (followupData && followupData.length > 0) {
        // Convert to YYYY-MM-DD for standard html date input
        const rawDate = followupData[0].due_date || "";
        const formattedDate = rawDate ? new Date(rawDate).toISOString().split("T")[0] : "";
        setFollowup({
          id: followupData[0].id,
          lead_id: leadId,
          due_date: formattedDate,
          done: followupData[0].done,
        });
      } else {
        setFollowup(null);
      }
    } catch (err) {
      console.error("Error fetching lead details:", err);
    }
  }, [selectedLead]);

  useEffect(() => {
    if (selectedLead) {
      fetchLeadDetails(selectedLead.id);
      setEditedLead(selectedLead);
    } else {
      setEditedLead(null);
    }
  }, [selectedLead, fetchLeadDetails]);

  // Save Lead Info Handler (Name, Phone, Email, Interest)
  const handleSaveLeadInfo = async () => {
    if (!editedLead) return;
    setSavingLeadInfo(true);
    try {
      const { error } = await supabase
        .from("leads")
        .update({
          name: editedLead.name.trim(),
          phone: editedLead.phone.trim(),
          email: editedLead.email?.trim() || null,
          interest: editedLead.interest?.trim() || null,
        })
        .eq("id", editedLead.id);

      if (error) throw error;

      // Update local leads list
      setLeads((prev) =>
        prev.map((l) => (l.id === editedLead.id ? { ...l, ...editedLead } : l))
      );

      // Sync selectedLead
      setSelectedLead(editedLead);
    } catch (err) {
      console.error("Error saving lead info:", err);
    } finally {
      setSavingLeadInfo(false);
    }
  };

  // Add Note Handler
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedLead) return;

    setSavingNote(true);
    try {
      const { data, error } = await supabase
        .from("notes")
        .insert({
          lead_id: selectedLead.id,
          text: newNoteText.trim(),
        })
        .select();

      if (error) throw error;

      if (data) {
        setNotes((prev) => [data[0], ...prev]);
        setNewNoteText("");
      }
    } catch (err) {
      console.error("Error adding note:", err);
    } finally {
      setSavingNote(false);
    }
  };

  // Save Followup Date / Checkbox changes
  const handleFollowupUpdate = async (updatedFields: Partial<Followup>) => {
    if (!selectedLead) return;

    setSavingFollowup(true);
    try {
      const currentFollowup = followup;

      if (currentFollowup && currentFollowup.id) {
        // Update existing record
        const { error } = await supabase
          .from("followups")
          .update({
            due_date: updatedFields.due_date !== undefined ? updatedFields.due_date : currentFollowup.due_date,
            done: updatedFields.done !== undefined ? updatedFields.done : currentFollowup.done,
          })
          .eq("id", currentFollowup.id);

        if (error) throw error;

        setFollowup((prev) =>
          prev ? { ...prev, ...updatedFields } : null
        );
      } else {
        // Create new record
        const newRecord = {
          lead_id: selectedLead.id,
          due_date: updatedFields.due_date || "",
          done: updatedFields.done || false,
        };

        const { data, error } = await supabase
          .from("followups")
          .insert(newRecord)
          .select();

        if (error) throw error;

        if (data && data.length > 0) {
          setFollowup({
            id: data[0].id,
            lead_id: selectedLead.id,
            due_date: data[0].due_date ? new Date(data[0].due_date).toISOString().split("T")[0] : "",
            done: data[0].done,
          });
        }
      }
    } catch (err) {
      console.error("Error updating followup:", err);
    } finally {
      setSavingFollowup(false);
    }
  };

  // Add Lead Form Submit
  const handleAddLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.name.trim() || !addForm.phone.trim()) return;

    setSubmittingLead(true);
    try {
      // 1. Insert lead
      const { data: leadData, error: leadError } = await supabase
        .from("leads")
        .insert({
          name: addForm.name.trim(),
          phone: addForm.phone.trim(),
          email: addForm.email.trim() || null,
          interest: addForm.interest.trim() || null,
          source: addForm.source,
          status: addForm.status,
        })
        .select();

      if (leadError) throw leadError;

      // 2. Insert notes if present
      if (leadData && leadData.length > 0 && addForm.notes.trim()) {
        const { error: noteError } = await supabase
          .from("notes")
          .insert({
            lead_id: leadData[0].id,
            text: addForm.notes.trim(),
          });

        if (noteError) console.error("Error inserting initial note:", noteError);
      }

      // Refresh table, close modal, and reset form
      await fetchLeads();
      setShowAddModal(false);
      setAddForm({
        name: "",
        phone: "",
        email: "",
        interest: "",
        source: "WhatsApp",
        status: "new",
        notes: "",
      });
    } catch (err) {
      console.error("Error adding lead:", err);
    } finally {
      setSubmittingLead(false);
    }
  };

  // Client-Side Filters Implementation
  const filteredLeads = leads.filter((lead) => {
    // 1. Search Query Filter
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      const matchName = lead.name?.toLowerCase().includes(query);
      const matchPhone = lead.phone?.toLowerCase().includes(query);
      if (!matchName && !matchPhone) return false;
    }

    // 2. Status Filter
    if (statusFilter !== "All") {
      if (lead.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
    }

    // 3. Date Filter
    if (dateFilter !== "All Time") {
      const leadDate = new Date(lead.created_at);
      const now = new Date();
      if (dateFilter === "Today") {
        return leadDate.toDateString() === now.toDateString();
      }
      if (dateFilter === "This Week") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return leadDate >= oneWeekAgo;
      }
      if (dateFilter === "This Month") {
        const oneMonthAgo = new Date();
        oneMonthAgo.setDate(now.getDate() - 30);
        return leadDate >= oneMonthAgo;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      {/* 1. HEADER BAR */}
      <AdminHeader activeTab="crm" onAddLead={() => setShowAddModal(true)} />

      <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
        {/* 2. STATS ROW */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
            <div className="text-white/40 text-[10px] uppercase tracking-wider font-semibold">Total Leads</div>
            <div className="text-3xl font-display text-white mt-2">
              {loading ? <Loader2 className="w-6 h-6 animate-spin text-white/25" /> : stats.total}
            </div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 border-l-blue-500/40 border-l-4">
            <div className="text-white/40 text-[10px] uppercase tracking-wider font-semibold">New</div>
            <div className="text-3xl font-display text-blue-400 mt-2">
              {loading ? <Loader2 className="w-6 h-6 animate-spin text-blue-500/25" /> : stats.new}
            </div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 border-l-amber-500/40 border-l-4">
            <div className="text-white/40 text-[10px] uppercase tracking-wider font-semibold">Contacted</div>
            <div className="text-3xl font-display text-amber-400 mt-2">
              {loading ? <Loader2 className="w-6 h-6 animate-spin text-amber-500/25" /> : stats.contacted}
            </div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 border-l-emerald-500/40 border-l-4">
            <div className="text-white/40 text-[10px] uppercase tracking-wider font-semibold">Booked</div>
            <div className="text-3xl font-display text-emerald-400 mt-2">
              {loading ? <Loader2 className="w-6 h-6 animate-spin text-emerald-500/25" /> : stats.booked}
            </div>
          </div>
        </section>

        {/* 3. FILTERS ROW */}
        <section className="flex flex-wrap items-center justify-between gap-4 bg-white/[0.01] border border-white/5 p-4 rounded-2xl">
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter Button Group */}
            <div className="flex rounded-xl bg-black/40 p-1 border border-white/5">
              {["All", "New", "Contacted", "Booked", "Completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition ${
                    statusFilter === status
                      ? "bg-brand text-black"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Date Filter Button Group */}
            <div className="flex rounded-xl bg-black/40 p-1 border border-white/5">
              {["Today", "This Week", "This Month", "All Time"].map((dateVal) => (
                <button
                  key={dateVal}
                  onClick={() => setDateFilter(dateVal)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition ${
                    dateFilter === dateVal
                      ? "bg-brand text-black"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {dateVal}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all duration-300"
            />
          </div>
        </section>

        {/* 4. LEADS TABLE */}
        <section className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-white/50 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-4 px-5">Name</th>
                  <th className="py-4 px-5">Phone</th>
                  <th className="py-4 px-5">Interest / Notes</th>
                  <th className="py-4 px-5">Channel / Source</th>
                  <th className="py-4 px-5">WhatsApp</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5">Date</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-white/40 uppercase tracking-wider">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-brand" />
                        Fetching records...
                      </div>
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-white/40 uppercase tracking-wider">
                      No matching leads found
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    // Badge colors
                    let badgeColor = "bg-blue-500/10 text-blue-400 border border-blue-500/20";
                    if (lead.status === "contacted") {
                      badgeColor = "bg-amber-500/10 text-amber-400 border border-amber-500/20";
                    } else if (lead.status === "booked") {
                      badgeColor = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
                    } else if (lead.status === "completed") {
                      badgeColor = "bg-white/10 text-white/60 border border-white/5";
                    }

                    const isWa = lead.channel === "WhatsApp" || lead.whatsapp_clicked || lead.source?.toLowerCase().includes("whatsapp");

                    return (
                      <tr
                        key={lead.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-4 px-5 font-medium text-white">{lead.name}</td>
                        <td className="py-4 px-5 text-white/70">{lead.phone}</td>
                        <td className="py-4 px-5 text-white/70 max-w-[180px] truncate">{lead.interest || "—"}</td>
                        <td className="py-4 px-5 text-white/70 tracking-wider text-[10px]">
                          <div className="font-semibold text-white/90">{lead.channel || (isWa ? "WhatsApp" : "Web")}</div>
                          <div className="text-white/40 text-[9px] truncate max-w-[120px]">{lead.source}</div>
                        </td>
                        <td className="py-4 px-5">
                          {isWa ? (
                            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              WhatsApp Clicked ✓
                            </span>
                          ) : (
                            <span className="text-white/30 text-[10px]">—</span>
                          )}
                        </td>
                        <td className="py-4 px-5">
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${badgeColor}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-white/55">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-5 text-right flex items-center justify-end gap-2.5">
                          {/* Status Inline Dropdown Selector */}
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            className="bg-black/40 border border-white/10 rounded-lg px-2 py-1.5 text-[10px] font-semibold uppercase text-white tracking-wider focus:outline-none focus:border-brand cursor-pointer"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="booked">Booked</option>
                            <option value="completed">Completed</option>
                          </select>

                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="inline-flex items-center gap-1 bg-white/5 border border-white/15 hover:bg-white/10 text-white hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition"
                          >
                            View
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

      {/* 5. LEAD DETAIL SIDE PANEL */}
      {selectedLead && (
        <div className="fixed inset-y-0 right-0 z-50 w-96 bg-[#111] border-l border-white/10 shadow-2xl flex flex-col text-xs text-white">
          {/* Side Panel Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="font-display text-base uppercase text-brand">Lead Details</h3>
              <p className="text-[10px] uppercase text-white/40 tracking-wider">Inspect & follow up</p>
            </div>
            <button
              onClick={() => {
                setSelectedLead(null);
                setNotes([]);
                setFollowup(null);
              }}
              className="p-1.5 hover:bg-white/5 rounded-full border border-white/10 text-white/50 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Side Panel Content Scrollable */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-none">
            {/* Info Section */}
            {editedLead && (
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    value={editedLead.name || ""}
                    onChange={(e) => setEditedLead({ ...editedLead, name: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Phone</label>
                  <input
                    type="text"
                    value={editedLead.phone || ""}
                    onChange={(e) => setEditedLead({ ...editedLead, phone: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    value={editedLead.email || ""}
                    onChange={(e) => setEditedLead({ ...editedLead, email: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] text-white/40 font-semibold uppercase tracking-wider">Interest / Details</label>
                  <input
                    type="text"
                    value={editedLead.interest || ""}
                    onChange={(e) => setEditedLead({ ...editedLead, interest: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand"
                  />
                </div>

                <div className="border-t border-white/10 pt-3 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between text-white/70">
                    <span>Channel:</span>
                    <span className="font-semibold text-brand">{editedLead.channel || "WhatsApp"}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/70">
                    <span>WhatsApp Clicked:</span>
                    <span className="font-semibold text-emerald-400">
                      {editedLead.whatsapp_clicked || editedLead.channel === "WhatsApp" ? "Clicked ✓" : "No"}
                    </span>
                  </div>
                  {editedLead.whatsapp_clicked_at && (
                    <div className="flex items-center justify-between text-white/50 text-[10px]">
                      <span>Click Time:</span>
                      <span>{new Date(editedLead.whatsapp_clicked_at).toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 items-center justify-between text-[10px] text-white/40 pt-1">
                  <span className="uppercase tracking-wider truncate max-w-[150px]">Source: {editedLead.source}</span>
                  <button
                    onClick={handleSaveLeadInfo}
                    disabled={savingLeadInfo || !editedLead.name.trim() || !editedLead.phone.trim()}
                    className="bg-brand text-black font-semibold rounded-lg px-3 py-1.5 uppercase tracking-wider hover:bg-brand/90 transition disabled:opacity-50 cursor-pointer"
                  >
                    {savingLeadInfo ? "Saving..." : "Save Info"}
                  </button>
                </div>
              </div>
            )}

            {/* Follow-up Section */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-wider text-brand font-bold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Follow-up Reminder
                </div>
                {savingFollowup && <Loader2 className="w-3.5 h-3.5 animate-spin text-brand" />}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] text-white/50 mb-1.5 uppercase tracking-wider">Due Date</label>
                  <input
                    type="date"
                    value={followup?.due_date || ""}
                    onChange={(e) => handleFollowupUpdate({ due_date: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand [color-scheme:dark]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="followup-done"
                    checked={followup?.done || false}
                    onChange={(e) => handleFollowupUpdate({ done: e.target.checked })}
                    className="rounded bg-black/45 border-white/10 text-brand focus:ring-0 w-4 h-4 cursor-pointer accent-brand"
                  />
                  <label htmlFor="followup-done" className="text-white/70 cursor-pointer select-none">
                    Mark Follow-up as Completed
                  </label>
                </div>
              </div>
            </div>

            {/* Notes CRM Section */}
            <div className="space-y-4">
              <div className="text-[10px] uppercase tracking-wider text-brand font-bold">Notes Timeline</div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="space-y-2">
                <textarea
                  placeholder="Type a note about this customer..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  rows={3}
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand resize-none"
                />
                <button
                  type="submit"
                  disabled={savingNote || !newNoteText.trim()}
                  className="w-full inline-flex justify-center items-center gap-1.5 rounded-xl bg-brand py-2 text-[10px] font-bold uppercase tracking-wider text-black hover:bg-brand/90 transition disabled:opacity-50"
                >
                  {savingNote && <Loader2 className="w-3 h-3 animate-spin" />} Add Note
                </button>
              </form>

              {/* Notes Timeline List */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {notes.length === 0 ? (
                  <p className="text-center text-white/30 py-4 italic">No notes logged yet.</p>
                ) : (
                  notes.map((n) => (
                    <div key={n.id} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                      <p className="text-white/80 leading-relaxed break-words">{n.text}</p>
                      <div className="text-[9px] text-white/35">
                        {new Date(n.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. ADD LEAD MODAL overlay flex wrapper */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            {/* Modal Card Box */}
            <div className="relative w-full max-w-lg rounded-[28px] bg-[#111] border border-white/10 p-8 text-xs text-white shadow-2xl">
              {/* Close button */}
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute right-6 top-6 p-1.5 hover:bg-white/5 rounded-full border border-white/10 text-white/50 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6">
                <h3 className="font-display text-xl uppercase text-brand">Create New Lead</h3>
                <p className="text-[10px] uppercase text-white/40 tracking-wider">Log a new inquiry into database</p>
              </div>

              <form onSubmit={handleAddLeadSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-white/50 mb-1.5 uppercase tracking-wider font-semibold">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Guest Name"
                      value={addForm.name}
                      onChange={(e) => setAddForm((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/50 mb-1.5 uppercase tracking-wider font-semibold">
                      Phone *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Phone Number"
                      value={addForm.phone}
                      onChange={(e) => setAddForm((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-white/50 mb-1.5 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={addForm.email}
                      onChange={(e) => setAddForm((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/50 mb-1.5 uppercase tracking-wider">
                      Interest
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Innova / Dubai Package"
                      value={addForm.interest}
                      onChange={(e) => setAddForm((prev) => ({ ...prev, interest: e.target.value }))}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-white/50 mb-1.5 uppercase tracking-wider">
                      Source
                    </label>
                    <select
                      value={addForm.source}
                      onChange={(e) => setAddForm((prev) => ({ ...prev, source: e.target.value }))}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand cursor-pointer"
                    >
                      <option value="Walk-in">Walk-in</option>
                      <option value="Phone Call">Phone Call</option>
                      <option value="Referral">Referral</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/50 mb-1.5 uppercase tracking-wider">
                      Status
                    </label>
                    <select
                      value={addForm.status}
                      onChange={(e) => setAddForm((prev) => ({ ...prev, status: e.target.value }))}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand cursor-pointer"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="booked">Booked</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-white/50 mb-1.5 uppercase tracking-wider">
                    Initial Note
                  </label>
                  <textarea
                    placeholder="Log important details about this enquiry..."
                    value={addForm.notes}
                    onChange={(e) => setAddForm((prev) => ({ ...prev, notes: e.target.value }))}
                    rows={4}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/10 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 rounded-full border border-white/10 py-3.5 text-xs font-semibold uppercase tracking-wider hover:bg-white/5 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingLead}
                    className="flex-1 inline-flex justify-center items-center gap-1.5 rounded-full bg-brand py-3.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-brand/90 transition disabled:opacity-50"
                  >
                    {submittingLead && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Save Lead
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
