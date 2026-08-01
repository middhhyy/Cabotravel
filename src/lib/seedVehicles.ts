import { supabase } from "./supabase";
import cabInnova from "@/assets/cab-innova.jpg";
import cabHycross from "@/assets/cab-hycross.jpg";
import cabTempoNew from "@/assets/cab-tempo.jpg";
import cabUrbania from "@/assets/cab-urbania.jpg";
import cabEtios from "@/assets/cab-etios.jpg";
import cabErtiga from "@/assets/cab-ertiga.jpg";
import cabCoach from "@/assets/cab-coach.jpg";
import cabCrysta from "@/assets/cab-crysta.webp";

const CABS_TO_SEED = [
  {
    id: "sedan",
    name: "Sedan (Etios)",
    capacity: "4 Seats",
    luggage: "2 bags",
    description: "Ideal for solo travelers and small groups. Comfortable, fuel-efficient, and reliable for city transfers and outstation trips.",
    type: "TOYOTA ETIOS / SIMILAR",
    image: cabEtios,
  },
  {
    id: "ertiga",
    name: "Ertiga + MUV",
    capacity: "6 Seats",
    luggage: "4 bags",
    description: "Perfect for families and small groups needing extra space. Smooth ride with ample luggage room.",
    type: "ERTIGA / INNOVA / SIMILAR",
    image: cabErtiga,
  },
  {
    id: "innova",
    name: "Innova",
    capacity: "6–7 Seats",
    luggage: "4 bags",
    description: "A trusted choice for group travel in Kerala. Spacious interiors, reliable performance on hilly and highway routes.",
    type: "TOYOTA INNOVA",
    image: cabInnova,
  },
  {
    id: "crysta",
    name: "Innova Crysta",
    capacity: "6–7 Seats",
    luggage: "5 bags",
    description: "The gold standard of premium road travel. Unmatched ride comfort, leather upholstery, and safety.",
    type: "PREMIUM MUV",
    image: cabCrysta,
  },
  {
    id: "hycross",
    name: "Innova Hycross",
    capacity: "7 Seats",
    luggage: "5 bags",
    description: "Next-generation hybrid MUV combining fuel efficiency with premium comfort for long-distance travel.",
    type: "HYBRID MUV",
    image: cabHycross,
  },
  {
    id: "tempo",
    name: "Tempo Traveller",
    capacity: "9–26 Seats",
    luggage: "10+ bags",
    description: "Perfect for large family groups, corporate outings, and wedding guest transportation.",
    type: "GROUP PASSENGER VAN",
    image: cabTempoNew,
  },
  {
    id: "luxury-tempo",
    name: "Luxury Tempo",
    capacity: "8–12 Seats",
    luggage: "8+ bags",
    description: "Elevated group travel with luxury seating, air suspension, and premium interiors for a comfortable journey.",
    type: "PREMIUM TRAVELLER",
    image: cabTempoNew,
  },
  {
    id: "luxury-urbania",
    name: "Luxury Urbania",
    capacity: "10–16 Seats",
    luggage: "10+ bags",
    description: "Premium van experience for corporate groups and large families who refuse to compromise on comfort.",
    type: "FORCE URBANIA / SIMILAR",
    image: cabUrbania,
  },
  {
    id: "coach",
    name: "Coach",
    capacity: "35–49 Seats",
    luggage: "20+ bags",
    description: "Full-sized luxury coaches for large tour groups, pilgrimages, and corporate events across Kerala and India.",
    type: "LUXURY COACH BUS",
    image: cabCoach,
  },
];

export async function seedVehicles() {
  try {
    // Check if vehicles are already seeded
    const { count, error: countError } = await supabase
      .from("vehicles")
      .select("*", { count: "exact", head: true });

    if (countError) throw countError;

    if (count && count > 0) {
      console.log("[SEED] Vehicles table already has data. Skipping seed.");
      return;
    }

    console.log("[SEED] Seeding vehicles table...");

    const rowsToInsert = CABS_TO_SEED.map((cab, index) => ({
      slug: cab.id,
      name: cab.name,
      capacity: cab.capacity,
      luggage: cab.luggage,
      description: cab.description,
      type: cab.type,
      image: cab.image,
      sort_order: index,
      active: true,
    }));

    const { error } = await supabase.from("vehicles").insert(rowsToInsert);
    if (error) throw error;

    console.log("[SEED] Vehicles table seeded successfully!");
  } catch (err) {
    console.error("[SEED] Error seeding vehicles:", err);
  }
}
