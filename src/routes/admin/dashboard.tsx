import { createFileRoute } from "@tanstack/react-router";
import { AdminGuard } from "@/pages/admin/AdminGuard";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [{ title: "Admin Panel — Cabo Tours" }],
  }),
  component: () => (
    <AdminGuard>
      <AdminDashboard />
    </AdminGuard>
  ),
});
