import { useLocation } from "@tanstack/react-router";
import { destinations } from "@/lib/destinations";
import { packages } from "@/lib/packages";

const BASE_URL = "https://cabotours.in";

export function BreadcrumbsJsonLd() {
  const location = useLocation();

  // Split path into clean segments, removing empty elements
  const segments = location.pathname.split("/").filter(Boolean);

  // Initialize breadcrumb list with Home
  const breadcrumbs = [
    {
      name: "Home",
      url: BASE_URL,
    },
  ];

  let currentPath = "";

  // Loop through URL segments to construct nested breadcrumbs dynamically
  segments.forEach((segment, idx) => {
    currentPath += `/${segment}`;

    let name = segment;
    const parentSegment = idx > 0 ? segments[idx - 1] : "";

    // Resolve labels statically or dynamically using dynamic configs
    if (segment === "destinations") {
      name = "Destinations";
    } else if (segment === "packages") {
      name = "Packages";
    } else if (segment === "visa") {
      name = "Visa Services";
    } else if (segment === "about") {
      name = "About";
    } else if (segment === "contact") {
      name = "Contact";
    } else if (segment === "generate") {
      name = "Trip Generator";
    } else if (parentSegment === "destinations") {
      const match = destinations.find((d) => d.slug === segment);
      name = match ? match.name : segment.charAt(0).toUpperCase() + segment.slice(1);
    } else if (parentSegment === "packages") {
      const match = packages.find((p) => p.slug === segment);
      name = match
        ? match.title
        : segment
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
    } else if (parentSegment === "trip") {
      name = "Customized Itinerary";
    } else {
      // General format fallback to title case
      name = segment.charAt(0).toUpperCase() + segment.slice(1);
    }

    breadcrumbs.push({
      name,
      url: `${BASE_URL}${currentPath}`,
    });
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
