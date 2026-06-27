import { createServerFn } from "@tanstack/react-start";
import type { LeadPayload } from "@/types/leads";
import { saveLead } from "../database";

/**
 * In a real app, you would:
 * 1. Call Gemini here to generate the "AI Lead Summary" from payload.itinerary
 * 2. Send email via Resend/SendGrid to the customer.
 * 3. Send email to the agency with the summary + JSON attached.
 * 4. Save lead to DB (Supabase/Postgres).
 */
export const processLeadServerFn = createServerFn({ method: "POST" })
  .validator((payload: LeadPayload) => payload)
  .handler(async ({ data: payload }) => {
    // 1. Generate AI Lead Summary (Simulated)
    const summary = `Customer intends to travel to ${payload.itinerary.destination?.name || "Unknown"} for ${payload.itinerary.days?.length || 0} days.
Budget: ${payload.itinerary.budgetSummary?.currency} ${payload.itinerary.budgetSummary?.totalEstimated?.toLocaleString() || "TBD"}.
Interested in: ${payload.type === "QUOTE" ? "customized quotation" : "free consultation via " + (payload as any).contactMethod}.`;

    console.log("[Lead Processing] AI Lead Summary generated:", summary);

    // 2. Save to DB
    const leadRecord = saveLead({
      status: "NEW",
      payload,
      summary,
    });

    // 3. Return success to client
    return {
      success: true,
      leadId: leadRecord.id,
      summary,
    };
  });
