import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  (import.meta.env?.VITE_SUPABASE_URL as string) ||
  (import.meta.env?.NEXT_PUBLIC_SUPABASE_URL as string) ||
  "";
const supabaseAnonKey =
  (import.meta.env?.VITE_SUPABASE_ANON_KEY as string) ||
  (import.meta.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY as string) ||
  "";

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const clientUrl = isValidUrl(supabaseUrl) ? supabaseUrl : "https://placeholder-project.supabase.co";
const clientKey =
  supabaseAnonKey &&
  supabaseAnonKey !== "YOUR_SUPABASE_ANON_KEY" &&
  supabaseAnonKey !== ""
    ? supabaseAnonKey
    : "placeholder-key";

if (clientUrl.includes("placeholder-project") || clientKey === "placeholder-key") {
  console.warn(
    "Supabase is running in placeholder mode. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file to enable reviews and authentication."
  );
}

export const supabase = createClient(clientUrl, clientKey);
