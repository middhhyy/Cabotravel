import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function AdminHeader({ activeTab, onAddLead }: { activeTab: string; onAddLead?: () => void }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate({ to: "/admin/login" });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navLinks = [
    { name: "CRM", path: "/admin/dashboard", id: "crm" },
    { name: "Analytics", path: "/admin/analytics", id: "analytics" },
    { name: "Vehicles", path: "/admin/cms/vehicles", id: "vehicles" },
    { name: "Destinations", path: "/admin/cms/destinations", id: "destinations" },
    { name: "Packages", path: "/admin/cms/packages", id: "packages" },
    { name: "FAQs", path: "/admin/cms/faqs", id: "faqs" },
    { name: "Stories", path: "/admin/cms/stories", id: "stories" },
    { name: "Feedback", path: "/admin/cms/feedback", id: "feedback" },
    { name: "Blog", path: "/admin/cms/blog", id: "blog" },
  ];

  return (
    <header className="border-b border-white/10 px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center justify-between bg-black/40 backdrop-blur-md sticky top-0 z-40">
      <div>
        <h1 className="text-xl font-display uppercase tracking-widest text-white leading-tight">Cabo Admin</h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Control Panel</p>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 overflow-x-auto py-1 text-xs uppercase tracking-wider scrollbar-none">
        {navLinks.map((link) => (
          <Link
            key={link.id}
            to={link.path}
            className={`transition font-semibold ${
              activeTab === link.id ? "text-brand font-bold border-b-2 border-brand pb-0.5" : "text-white/60 hover:text-white"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {onAddLead && (
          <button
            onClick={onAddLead}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-black hover:bg-brand/90 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Lead
          </button>
        )}
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-white/70 hover:text-white hover:border-white/30 transition bg-white/5 cursor-pointer"
        >
          <LogOut className="w-3 h-3" /> Logout
        </button>
      </div>
    </header>
  );
}
