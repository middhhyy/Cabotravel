import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { Users, FileText, Calendar, TrendingUp } from "lucide-react";
import { fetchLeadsServerFn } from "@/services/leads/functions/getLeads";

export const Route = createFileRoute("/agency/dashboard")({
  head: () => ({
    meta: [{ title: "Agency Dashboard — Cabo Tours" }],
  }),
  loader: () => fetchLeadsServerFn(),
  component: DashboardPage,
});

function DashboardPage() {
  const leads = useLoaderData({ from: "/agency/dashboard" });

  const quoteCount = leads.filter((l) => l.payload.type === "QUOTE").length;
  const consultationCount = leads.filter((l) => l.payload.type === "CONSULTATION").length;

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-display text-white">Agency Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center text-brand font-semibold">
              AG
            </span>
          </div>
        </header>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-5 w-5 text-brand" />
              <h3 className="text-white/60">New Leads</h3>
            </div>
            <p className="text-3xl font-semibold text-white">{leads.length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-5 w-5 text-blue-400" />
              <h3 className="text-white/60">Quotes Requested</h3>
            </div>
            <p className="text-3xl font-semibold text-white">{quoteCount}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="h-5 w-5 text-green-400" />
              <h3 className="text-white/60">Consultations</h3>
            </div>
            <p className="text-3xl font-semibold text-white">{consultationCount}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              <h3 className="text-white/60">Conversion Rate</h3>
            </div>
            <p className="text-3xl font-semibold text-white">18%</p>
          </div>
        </div>

        {/* Recent Leads Table */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Recent Leads</h2>
            <button className="text-brand text-sm hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-black/20 text-white/40 text-sm">
                <tr>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Destination</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Budget</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-white/40">
                      No leads yet.
                    </td>
                  </tr>
                )}
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-white">{lead.payload.fullName}</div>
                      <div className="text-sm text-white/40">{lead.payload.email}</div>
                    </td>
                    <td className="p-4">{lead.payload.itinerary.destination?.name || "Unknown"}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${lead.payload.type === "QUOTE" ? "bg-brand/10 text-brand" : "bg-blue-500/10 text-blue-400"}`}
                      >
                        {lead.payload.type === "QUOTE" ? "Quote" : "Consultation"}
                      </span>
                    </td>
                    <td className="p-4">
                      {lead.payload.itinerary.budgetSummary?.totalEstimated?.toLocaleString() ||
                        "TBD"}
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-xs font-medium">
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="text-sm font-medium text-white hover:text-brand transition-colors">
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
