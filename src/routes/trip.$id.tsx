import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceLayout } from "@/components/workspace/WorkspaceLayout";
import { getTripByIdServerFn } from "@/services/ai/functions/getTrip";
import { ErrorState } from "@/components/itinerary/ErrorState";

export const Route = createFileRoute("/trip/$id")({
  loader: async ({ params }) => {
    try {
      const trip = await getTripByIdServerFn({ data: params.id });
      return { trip, id: params.id };
    } catch (err) {
      throw new Error("Trip not found or expired. Please generate a new one.");
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.trip?.destination || "Your Itinerary"} — Cabo Tours & Travels` },
      {
        name: "description",
        content: `View your custom-generated tour plan for ${loaderData?.trip?.destination || "your destination"}. Personalized daily breakdown, activities, hotels, and flight tips.`,
      },
      {
        property: "og:title",
        content: `${loaderData?.trip?.destination || "Your Itinerary"} — Cabo Tours & Travels`,
      },
      {
        property: "og:description",
        content: `View your custom-generated tour plan for ${loaderData?.trip?.destination || "your destination"}. Personalized daily breakdown, activities, hotels, and flight tips.`,
      },
      { property: "og:url", content: `https://cabotours.in/trip/${loaderData?.id}` },
      { property: "og:image", content: "https://cabotours.in/social-preview.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: `${loaderData?.trip?.destination || "Your Itinerary"} — Cabo Tours & Travels`,
      },
      {
        name: "twitter:description",
        content: `View your custom-generated tour plan for ${loaderData?.trip?.destination || "your destination"}.`,
      },
      { name: "twitter:image", content: "https://cabotours.in/social-preview.png" },
    ],
    links: [{ rel: "canonical", href: `https://cabotours.in/trip/${loaderData?.id}` }],
  }),
  errorComponent: ({ error }) => {
    return (
      <div className="min-h-screen bg-background pt-24">
        <ErrorState
          onRetry={() => window.location.reload()}
          onEdit={() => (window.location.href = "/generate")}
          onStartOver={() => (window.location.href = "/generate")}
        />
        <div className="text-center text-white/50 mt-4">{error.message}</div>
      </div>
    );
  },
  component: TripRoute,
});

function TripRoute() {
  const { trip } = Route.useLoaderData();

  if (!trip) return null;

  return <WorkspaceLayout initialTrip={trip} />;
}
