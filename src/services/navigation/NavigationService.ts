import type { Location } from "@/types/itinerary";

export class NavigationService {
  static open(location: Location, provider: "google" | "apple" | "waze" | "osm" = "google") {
    if (!location.verified) {
      console.warn("Attempted to navigate to an unverified location.");
      return;
    }

    let url = location.navigationUrls?.[provider];

    // Fallback if the requested provider URL doesn't exist
    if (!url) {
      url = location.navigationUrls?.google || location.googleMapsUrl;
    }

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else if (location.latitude && location.longitude) {
      // Manual fallback construction
      const fallbackUrl = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
      window.open(fallbackUrl, "_blank", "noopener,noreferrer");
    } else {
      console.error("No coordinates or navigation URLs available for this location.");
    }
  }
}
