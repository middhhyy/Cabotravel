import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { destinations } from "@/lib/destinations";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "https://cabotours.in";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          "/",
          "/destinations",
          "/packages",
          "/visa",
          "/about",
          "/contact",
          "/generate",
          "/domestic-packages",
          "/international-packages",
          "/cabs",
          "/stories",
          "/feedback",
          "/kerala",
          "/destinations/bali",
          ...destinations
            .filter(
              (d) =>
                !["kashmir", "domestic-packages", "international-packages"].includes(d.slug) &&
                !d.href,
            )
            .map((d) => `/destinations/${d.slug}`),
        ];

        const urls = paths
          .map(
            (p) =>
              `  <url>\n    <loc>${BASE_URL}${p}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
