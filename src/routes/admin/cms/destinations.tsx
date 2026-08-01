import { createFileRoute } from "@tanstack/react-router";
import { AdminGuard } from "@/pages/admin/AdminGuard";
import { AdminDestinations } from "@/pages/admin/AdminDestinations";

export const Route = createFileRoute("/admin/cms/destinations")({
  head: () => ({
    meta: [{ title: "CMS Destinations — Cabo Tours" }],
  }),
  component: () => (
    <AdminGuard>
      <AdminDestinations />
    </AdminGuard>
  ),
});
