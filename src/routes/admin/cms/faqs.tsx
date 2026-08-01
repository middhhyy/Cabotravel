import { createFileRoute } from "@tanstack/react-router";
import { AdminGuard } from "@/pages/admin/AdminGuard";
import { AdminFaqs } from "@/pages/admin/AdminFaqs";

export const Route = createFileRoute("/admin/cms/faqs")({
  head: () => ({
    meta: [{ title: "CMS FAQs — Cabo Tours" }],
  }),
  component: () => (
    <AdminGuard>
      <AdminFaqs />
    </AdminGuard>
  ),
});
