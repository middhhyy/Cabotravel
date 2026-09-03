import { createFileRoute } from "@tanstack/react-router";
import { AdminGuard } from "@/pages/admin/AdminGuard";
import { AdminBlog } from "@/pages/admin/AdminBlog";

export const Route = createFileRoute("/admin/cms/blog")({
  head: () => ({
    meta: [{ title: "Blog Management — Cabo Admin" }],
  }),
  component: () => (
    <AdminGuard>
      <AdminBlog />
    </AdminGuard>
  ),
});
