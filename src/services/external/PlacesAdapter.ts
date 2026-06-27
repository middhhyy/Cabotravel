/**
 * PlacesAdapter
 * Integrates with Google Places API or Foursquare.
 */
export class PlacesAdapter {
  static async getTopAttractions(destination: string, limit: number = 5) {
    // Simulated fetch
    return [
      { name: "Central Landmark", type: "Monument", rating: 4.8 },
      { name: "Local Market", type: "Shopping", rating: 4.5 },
      { name: "Sunset Point", type: "Nature", rating: 4.9 },
    ].slice(0, limit);
  }
}
