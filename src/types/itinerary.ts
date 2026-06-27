export type TripRequest = {
  destination: string | null;
  duration: number | null;
  budget: "Economy" | "Standard" | "Premium" | "Luxury" | null;
  travelers: "Solo" | "Couple" | "Family" | "Friends" | "Group" | null;
  travelStyle: "Relaxing" | "Adventure" | "Culture" | "Nightlife" | "Nature" | null;
  travelMonth: string | null;
  accommodation: "Hostel" | "Hotel" | "Resort" | "Villa" | null;
  transport: "Flight" | "Train" | "Road" | "Cruise" | null;
  interests: string[];
};

export type TripResponse = {
  id: string;
  title: string;
  summary: string;
  destination: Destination;
  days: DayPlan[];
  hotels: Hotel[];
  budgetSummary: Budget;
  weather: Weather;
  packingList: string[];
};

export type Destination = {
  name: string;
  country: string;
  description: string;
  image: string;
};

export type DayPlan = {
  dayNumber: number;
  date: string;
  theme: string;
  activities: Activity[];
};

export type Location = {
  id: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  placeId?: string;
  category?: string;
  verified: boolean;
  source?: "google" | "osm" | "mock";
  lastVerified?: string;
  googleMapsUrl?: string;
  imageUrl?: string;
  navigationUrls?: {
    google?: string;
    apple?: string;
    waze?: string;
    osm?: string;
  };
};

export type Activity = {
  time: string;
  title: string;
  description: string;
  location: Location;
  costEstimate: number;
  durationHours: number;
};

export type Hotel = {
  name: string;
  location?: Location;
  rating: number;
  description: string;
  pricePerNight: number;
  amenities: string[];
  image: string;
};

export type Budget = {
  totalEstimated: number;
  currency: string;
  breakdown: {
    flights: number;
    accommodation: number;
    activities: number;
    food: number;
    transport: number;
  };
};

export type Weather = {
  averageTemp: string;
  condition: string;
  bestTimeToVisit: string;
};
