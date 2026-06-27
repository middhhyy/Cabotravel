/**
 * MapsAdapter
 * Integrates with OpenStreetMap (via Nominatim/OSRM) or Google Maps API.
 */
export class MapsAdapter {
  static async getCoordinates(location: string) {
    // Simulated fetch
    return { lat: 8.4095, lng: 115.1889 }; // E.g., Bali
  }

  static async getTravelTime(origin: string, destination: string) {
    // Simulated fetch
    return { durationMinutes: 45, mode: "driving" };
  }
}
