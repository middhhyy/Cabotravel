import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

const envPath = path.resolve(process.cwd(), ".env");
const envVars: Record<string, string> = {};

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index !== -1) {
      const key = trimmed.substring(0, index).trim();
      const val = trimmed.substring(index + 1).trim();
      envVars[key] = val;
    }
  }
}

const supabaseUrl = envVars.VITE_SUPABASE_URL || "";
const supabaseAnonKey = envVars.VITE_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const { data: intl } = await supabase.from("international_destinations").select("*");
  console.log("INTL DESTINATIONS:", JSON.stringify(intl, null, 2));

  const { data: dom } = await supabase.from("domestic_destinations").select("*");
  console.log("DOM DESTINATIONS:", JSON.stringify(dom, null, 2));
}

run();
