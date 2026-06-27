import type { TripResponse } from "./itinerary";

export type LeadType = "QUOTE" | "CONSULTATION";

export interface LeadBase {
  type: LeadType;
  fullName: string;
  email: string;
  phone: string;
  itinerary: TripResponse;
}

export interface QuoteLead extends LeadBase {
  type: "QUOTE";
  departureCity?: string;
  travelers: number;
  specialRequirements?: string;
}

export interface ConsultationLead extends LeadBase {
  type: "CONSULTATION";
  preferredDate: string;
  preferredTime: string;
  contactMethod: "phone" | "whatsapp" | "meet" | "zoom";
}

export type LeadPayload = QuoteLead | ConsultationLead;
