import { createFileRoute } from "@tanstack/react-router";
import { AdminGuard } from "@/pages/admin/AdminGuard";
import { AdminVehicles } from "@/pages/admin/AdminVehicles";

export const Route = createFileRoute("/admin/cms/vehicles")({
  head: () => ({
    meta: [{ title: "CMS Vehicles — Cabo Tours" }],
  }),
  component: () => (
    <AdminGuard>
      <AdminVehicles />
    </AdminGuard>
  ),
});
