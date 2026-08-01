import { createFileRoute } from "@tanstack/react-router";
import { AdminGuard } from "@/pages/admin/AdminGuard";
import { AdminStories } from "@/pages/admin/AdminStories";

export const Route = createFileRoute("/admin/cms/stories")({
  head: () => ({
    meta: [{ title: "CMS Stories — Cabo Tours" }],
  }),
  component: () => (
    <AdminGuard>
      <AdminStories />
    </AdminGuard>
  ),
});
