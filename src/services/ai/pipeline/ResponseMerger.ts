import type { TripResponse, DayPlan, Activity } from "@/types/itinerary";

export class ResponseMerger {
  static assemble(
    aiData: any,
    request: any,
    localData: {
      weather: any;
      budgetSummary: any;
      hotels: any[];
      packingList: string[];
      destination: any;
    },
  ): TripResponse {
    // Map AI's short-form days array into canonical DayPlan array
    const days: DayPlan[] = (aiData.d || []).map((day: any, i: number) => {
      const activities: Activity[] = (day.a || []).map((activityString: string, j: number) => {
        // Deterministic local assignment
        const times = [
          "Morning",
          "Late Morning",
          "Afternoon",
          "Late Afternoon",
          "Evening",
          "Night",
        ];
        const time = times[Math.min(j, times.length - 1)];

        return {
          time,
          title: activityString,
          description: activityString,
          location: {
            id:
              typeof crypto !== "undefined" && crypto.randomUUID
                ? crypto.randomUUID()
                : Math.random().toString(36).substring(2, 15),
            name: activityString,
            verified: false,
          },
          costEstimate: 0,
          durationHours: 2,
        };
      });

      return {
        dayNumber: i + 1,
        date: `Day ${i + 1}`,
        theme: day.t || "Day Plan",
        activities,
      };
    });

    const packingFromAI = aiData.tp || [];
    const combinedPacking = Array.from(new Set([...localData.packingList, ...packingFromAI]));

    return {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).substring(2, 15),
      title: `${request.duration || 3} Days in ${request.destination}`,
      summary: aiData.o || "Your personalized itinerary.",
      destination: localData.destination,
      days,
      hotels: localData.hotels,
      budgetSummary: localData.budgetSummary,
      weather: localData.weather,
      packingList: combinedPacking,
    };
  }

  static merge(currentTrip: TripResponse, aiData: any): TripResponse {
    const days: DayPlan[] = (aiData.d || []).map((day: any, i: number) => {
      const activities: Activity[] = (day.a || []).map((activityString: string, j: number) => {
        const times = [
          "Morning",
          "Late Morning",
          "Afternoon",
          "Late Afternoon",
          "Evening",
          "Night",
        ];
        const time = times[Math.min(j, times.length - 1)];

        return {
          time,
          title: activityString,
          description: activityString,
          location: {
            id:
              typeof crypto !== "undefined" && crypto.randomUUID
                ? crypto.randomUUID()
                : Math.random().toString(36).substring(2, 15),
            name: activityString,
            verified: false,
          },
          costEstimate: 0,
          durationHours: 2,
        };
      });

      return {
        dayNumber: i + 1,
        date: `Day ${i + 1}`,
        theme: day.t || "Day Plan",
        activities,
      };
    });

    const packingFromAI = aiData.tp || [];
    const combinedPacking = Array.from(new Set([...currentTrip.packingList, ...packingFromAI]));

    return {
      ...currentTrip,
      summary: aiData.o || currentTrip.summary,
      days: days.length > 0 ? days : currentTrip.days,
      packingList: combinedPacking,
    };
  }
}
