import { createFileRoute } from "@tanstack/react-router";
import { AdminGuard } from "@/pages/admin/AdminGuard";
import { AdminAnalytics } from "@/pages/admin/AdminAnalytics";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({
    meta: [{ title: "Admin Analytics — Cabo Tours" }],
  }),
  component: () => (
    <AdminGuard>
      <AdminAnalytics />
    </AdminGuard>
  ),
});
