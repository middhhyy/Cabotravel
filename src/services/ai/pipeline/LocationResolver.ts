import type { TripResponse, Location, DayPlan, Activity, Hotel } from "@/types/itinerary";
import { getCachedLocation, setCachedLocation } from "./GeocodeCache";

// Delay helper to avoid hitting Nominatim rate limits aggressively
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function generateNavigationUrls(lat: number, lon: number) {
  return {
    google: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
    apple: `https://maps.apple.com/?q=${lat},${lon}`,
    osm: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`,
  };
}

async function resolveSingleLocation(
  locationName: string,
  destinationContext: string,
): Promise<Partial<Location>> {
  const cacheKey = `${locationName}|${destinationContext}`;
  const cached = await getCachedLocation(cacheKey);
  if (cached && cached.verified) {
    return cached;
  }

  // Rate limit protection
  await delay(1000);

  try {
    const query = `${locationName}, ${destinationContext}`;

    // 1. Google Places Resolution (if configured)
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (apiKey) {
      console.log(`[LocationResolver] Resolving "${query}" via Google Places API...`);
      const googleRes = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`,
      );
      if (googleRes.ok) {
        const googleData = await googleRes.json();
        if (googleData.results && googleData.results.length > 0) {
          const result = googleData.results[0];
          const lat = result.geometry.location.lat;
          const lon = result.geometry.location.lng;
          const address = result.formatted_address;
          const placeId = result.place_id;

          let imageUrl: string | undefined;
          if (result.photos && result.photos.length > 0) {
            const photoRef = result.photos[0].photo_reference;
            imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoRef}&key=${apiKey}`;
          }

          const resolvedData: Partial<Location> = {
            address,
            latitude: lat,
            longitude: lon,
            placeId,
            verified: true,
            source: "google",
            imageUrl,
            navigationUrls: {
              ...generateNavigationUrls(lat, lon),
              google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(result.name)}&query_place_id=${placeId}`,
              waze: `https://waze.com/ul?ll=${lat},${lon}&navigate=yes`,
            },
          };

          await setCachedLocation(cacheKey, resolvedData);
          return resolvedData;
        }
      }
      console.warn(
        `[LocationResolver] Google Places search failed or returned empty. Falling back to Nominatim.`,
      );
    }

    // 2. Nominatim Fallback
    console.log(`[LocationResolver] Resolving "${query}" via Nominatim fallback...`);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
      {
        headers: {
          "User-Agent": "CaboTravelApp/1.0 (contact@cabotours.test)",
        },
      },
    );

    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        const address = data[0].display_name;

        const resolvedData: Partial<Location> = {
          address,
          latitude: lat,
          longitude: lon,
          verified: true,
          source: "osm",
          navigationUrls: generateNavigationUrls(lat, lon),
        };

        await setCachedLocation(cacheKey, resolvedData);
        return resolvedData;
      }
    }
  } catch (err) {
    console.error(`Failed to geocode ${locationName}:`, err);
  }

  // Return unverified if failed
  const unverified: Partial<Location> = {
    verified: false,
    source: "osm",
    lastVerified: new Date().toISOString(),
  };
  await setCachedLocation(cacheKey, unverified); // cache failure temporarily to prevent retrying immediately
  return unverified;
}

export async function resolveLocationsInBackground(
  trip: TripResponse,
  updateCallback: (updatedTrip: TripResponse) => Promise<void>,
) {
  console.log(`[LocationResolver] Starting background resolution for trip ${trip.id}`);
  const updatedTrip = JSON.parse(JSON.stringify(trip)) as TripResponse;
  let hasUpdates = false;

  const destContext = `${updatedTrip.destination.name}, ${updatedTrip.destination.country}`;

  // Process Hotels
  for (const hotel of updatedTrip.hotels) {
    if (hotel.location && !hotel.location.lastVerified) {
      const resolved = await resolveSingleLocation(hotel.location.name, destContext);
      hotel.location = { ...hotel.location, ...resolved };
      hasUpdates = true;
    }
  }

  // Process Activities
  for (const day of updatedTrip.days) {
    for (const activity of day.activities) {
      if (activity.location && !activity.location.lastVerified) {
        const resolved = await resolveSingleLocation(activity.location.name, destContext);
        activity.location = { ...activity.location, ...resolved };
        hasUpdates = true;
      }
    }
  }

  if (hasUpdates) {
    console.log(
      `[LocationResolver] Successfully resolved locations for trip ${trip.id}, pushing update.`,
    );
    await updateCallback(updatedTrip);
  } else {
    console.log(`[LocationResolver] No location updates resolved for trip ${trip.id}.`);
  }
}
