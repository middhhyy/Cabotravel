import { supabase } from "./supabase";

export async function logLead(interest: string, source: string) {
  try {
    await supabase.from("leads").insert({
      name: "WhatsApp Lead",
      interest,
      source,
      status: "new",
    });
  } catch {
    // silently swallow — never break UI
  }
}
