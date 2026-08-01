import { createFileRoute } from "@tanstack/react-router";
import { AdminGuard } from "@/pages/admin/AdminGuard";
import { AdminPackages } from "@/pages/admin/AdminPackages";

export const Route = createFileRoute("/admin/cms/packages")({
  head: () => ({
    meta: [{ title: "CMS Packages — Cabo Tours" }],
  }),
  component: () => (
    <AdminGuard>
      <AdminPackages />
    </AdminGuard>
  ),
});
