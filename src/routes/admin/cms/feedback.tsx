import { createFileRoute } from "@tanstack/react-router";
import { AdminGuard } from "@/pages/admin/AdminGuard";
import { AdminFeedback } from "@/pages/admin/AdminFeedback";

export const Route = createFileRoute("/admin/cms/feedback")({
  head: () => ({
    meta: [{ title: "CMS Feedback — Cabo Tours" }],
  }),
  component: () => (
    <AdminGuard>
      <AdminFeedback />
    </AdminGuard>
  ),
});
