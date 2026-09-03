import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

// Manually parse .env file
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

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const tables = [
  "destinations",
  "packages",
  "vehicles",
  "feedback",
  "faqs",
  "domestic_destinations",
  "international_destinations",
  "kerala_places",
  "notes"
];

async function run() {
  console.log("Fetching sample row from each table...");
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .limit(1);
      if (error) {
        console.log(`Table "${table}": Error - ${error.message}`);
      } else if (data && data.length > 0) {
        console.log(`Table "${table}" columns:`, Object.keys(data[0]));
        console.log(`Sample row:`, data[0]);
      } else {
        console.log(`Table "${table}" is empty. Trying to query pg_attribute (only works if admin/RPC is set up) or showing columns via fallback check.`);
        // Let's try to select some empty row columns from pg_class/pg_attribute if we have access, or we can look in the source code files
      }
    } catch (e: any) {
      console.log(`Table "${table}": Exception - ${e.message}`);
    }
  }
}

run();
