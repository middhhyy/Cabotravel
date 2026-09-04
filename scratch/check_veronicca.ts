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
  const { data: stories, error: sErr } = await supabase
    .from("guest_stories")
    .select("*, guest_story_images(*)")
    .ilike("name", "%Veronicca%");

  console.log("STORIES:", JSON.stringify(stories, null, 2), sErr);

  const { data: images, error: iErr } = await supabase
    .from("guest_story_images")
    .select("*");

  console.log("IMAGES:", JSON.stringify(images, null, 2), iErr);

  const { data: buckets, error: bErr } = await supabase.storage.listBuckets();
  console.log("BUCKETS:", JSON.stringify(buckets, null, 2), bErr);
}

run();
