import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  Loader2,
  TrendingUp,
  Award,
  Users,
  Compass,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  interest: string;
  status: string;
  created_at: string;
}

export function AdminAnalytics() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const { data, error } = await supabase
          .from("leads")
          .select("*")
          .eq("is_deleted", false);

        if (error) throw error;
        setLeads(data || []);
      } catch (err) {
        console.error("Error fetching leads for analytics:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, []);

  // Compute metrics (this month)
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const thisMonthLeads = leads.filter((lead) => {
    const d = new Date(lead.created_at);
    return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
  });

  const totalThisMonth = thisMonthLeads.length;
  const convertedThisMonth = thisMonthLeads.filter(
    (l) => l.status === "booked" || l.status === "completed"
  ).length;
  const conversionRateThisMonth = totalThisMonth > 0 ? Math.round((convertedThisMonth / totalThisMonth) * 100) : 0;

  // Most Popular Interest (this month or overall fallback)
  const interestCountsThisMonth: { [key: string]: number } = {};
  thisMonthLeads.forEach((lead) => {
    if (lead.interest) {
      interestCountsThisMonth[lead.interest] = (interestCountsThisMonth[lead.interest] || 0) + 1;
    }
  });

  let mostPopularInterest = "None";
  let maxCountThisMonth = 0;
  Object.entries(interestCountsThisMonth).forEach(([interest, count]) => {
    if (count > maxCountThisMonth) {
      maxCountThisMonth = count;
      mostPopularInterest = interest;
    }
  });

  // Fallback to overall if none this month
  if (mostPopularInterest === "None" && leads.length > 0) {
    const interestCountsOverall: { [key: string]: number } = {};
    leads.forEach((lead) => {
      if (lead.interest) {
        interestCountsOverall[lead.interest] = (interestCountsOverall[lead.interest] || 0) + 1;
      }
    });
    let maxCountOverall = 0;
    Object.entries(interestCountsOverall).forEach(([interest, count]) => {
      if (count > maxCountOverall) {
        maxCountOverall = count;
        mostPopularInterest = interest;
      }
    });
  }

  // 1. Leads over time (last 30 days)
  const last30DaysData = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const dateStr = d.toISOString().split("T")[0]; // YYYY-MM-DD
    const count = leads.filter((lead) => lead.created_at.startsWith(dateStr)).length;
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return { date: label, count };
  });

  // 2. Leads by source
  const sourceCounts: { [key: string]: number } = {};
  leads.forEach((lead) => {
    const source = lead.source || "WhatsApp";
    sourceCounts[source] = (sourceCounts[source] || 0) + 1;
  });
  const sourceData = Object.entries(sourceCounts).map(([source, count]) => ({
    source,
    count,
  }));

  // 3. Leads by status
  const statusCounts = {
    new: 0,
    contacted: 0,
    booked: 0,
    completed: 0,
  };
  leads.forEach((lead) => {
    const status = lead.status.toLowerCase() as keyof typeof statusCounts;
    if (status in statusCounts) {
      statusCounts[status]++;
    }
  });
  const statusData = [
    { name: "New", value: statusCounts.new, color: "#3b82f6" }, // blue
    { name: "Contacted", value: statusCounts.contacted, color: "#f59e0b" }, // yellow
    { name: "Booked", value: statusCounts.booked, color: "#10b981" }, // green
    { name: "Completed", value: statusCounts.completed, color: "#6b7280" }, // gray
  ].filter((item) => item.value > 0);

  // 4. Top interests list
  const allInterestCounts: { [key: string]: number } = {};
  leads.forEach((lead) => {
    if (lead.interest) {
      allInterestCounts[lead.interest] = (allInterestCounts[lead.interest] || 0) + 1;
    }
  });
  const topInterests = Object.entries(allInterestCounts)
    .map(([interest, count]) => ({ interest, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const maxInterestCount = topInterests.length > 0 ? topInterests[0].count : 1;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-brand mx-auto" />
          <p className="text-xs uppercase tracking-[0.22em] text-white/50">Loading Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      {/* 1. HEADER */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between bg-black/40 backdrop-blur-md sticky top-0 z-45">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/dashboard"
            className="p-2 hover:bg-white/5 rounded-full border border-white/10 text-white/70 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-display uppercase tracking-widest text-white leading-tight">Analytics</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Cabo CRM Performance</p>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
        {/* 2. OVERVIEW CARDS */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white/40 text-[10px] uppercase tracking-wider font-semibold">Leads (This Month)</div>
              <div className="text-2xl font-display text-white mt-1">{totalThisMonth}</div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white/40 text-[10px] uppercase tracking-wider font-semibold">Converted (This Month)</div>
              <div className="text-2xl font-display text-white mt-1">{convertedThisMonth}</div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white/40 text-[10px] uppercase tracking-wider font-semibold">Conversion Rate</div>
              <div className="text-2xl font-display text-white mt-1">{conversionRateThisMonth}%</div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
              <Compass className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-white/40 text-[10px] uppercase tracking-wider font-semibold">Top Interest</div>
              <div className="text-lg font-display text-white mt-1 truncate uppercase" title={mostPopularInterest}>
                {mostPopularInterest}
              </div>
            </div>
          </div>
        </section>

        {/* Charts Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 3. LEADS OVER TIME */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col h-96">
            <h3 className="text-xs uppercase tracking-wider text-brand font-bold mb-6">Leads Growth (Last 30 Days)</h3>
            <div className="flex-1 min-h-0 text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={last30DaysData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" />
                  <YAxis stroke="rgba(255,255,255,0.3)" allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                    labelStyle={{ color: "#aaa" }}
                  />
                  <Line type="monotone" dataKey="count" stroke="#cca43b" strokeWidth={2.5} activeDot={{ r: 6 }} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 4. LEADS BY SOURCE */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col h-96">
            <h3 className="text-xs uppercase tracking-wider text-brand font-bold mb-6">Leads by Referral Source</h3>
            <div className="flex-1 min-h-0 text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sourceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="source" stroke="rgba(255,255,255,0.3)" />
                  <YAxis stroke="rgba(255,255,255,0.3)" allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                    labelStyle={{ color: "#aaa" }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#cca43b" : "#4b5563"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 5. LEADS BY STATUS */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col h-96">
            <h3 className="text-xs uppercase tracking-wider text-brand font-bold mb-6">Leads Pipeline Distribution</h3>
            <div className="flex-grow flex items-center justify-center text-xs">
              {statusData.length === 0 ? (
                <p className="text-white/35 italic">No data to display</p>
              ) : (
                <div className="w-full h-full flex flex-col md:flex-row items-center justify-around">
                  <div className="w-56 h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {statusData.map((entry) => (
                      <div key={entry.name} className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-white/70 uppercase tracking-wider font-semibold text-[10px]">{entry.name}</span>
                        <span className="text-white font-bold">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 6. TOP INTERESTS */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col h-96">
            <h3 className="text-xs uppercase tracking-wider text-brand font-bold mb-6">Top Interests (Ranked)</h3>
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-none">
              {topInterests.length === 0 ? (
                <p className="text-center text-white/35 py-12 italic">No interests logged yet</p>
              ) : (
                topInterests.map((item) => {
                  const percentage = Math.round((item.count / maxInterestCount) * 100);
                  return (
                    <div key={item.interest} className="space-y-1.5 text-xs">
                      <div className="flex justify-between items-center text-white/80">
                        <span className="font-semibold uppercase tracking-wider text-[10px] truncate max-w-[80%]">{item.interest}</span>
                        <span className="font-bold">{item.count} leads</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2">
                        <div
                          className="bg-brand h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
