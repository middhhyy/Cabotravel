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

async function uploadAndSync() {
  const imagePath = "C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\33170fcf-e8ab-4a70-bf08-9df38b6e3e2c\\.user_uploaded\\media_1788536841377.jpg";
  const fileBuffer = fs.readFileSync(imagePath);

  const storyId = "aa9968d0-8c4a-4960-97d4-be39f7dc4d73";
  const storagePath = `${storyId}/veronicca-conolly-kerala.jpg`;

  console.log("Uploading image to Supabase Storage bucket 'guest-stories'...");
  const { data: uploadData, error: uploadErr } = await supabase.storage
    .from("guest-stories")
    .upload(storagePath, fileBuffer, {
      contentType: "image/jpeg",
      upsert: true,
    });

  if (uploadErr) {
    console.error("Upload error:", uploadErr);
    return;
  }

  console.log("Upload success:", uploadData);

  const { data: publicUrlData } = supabase.storage
    .from("guest-stories")
    .getPublicUrl(storagePath);

  const publicUrl = publicUrlData.publicUrl;
  console.log("Public URL:", publicUrl);

  const { error: deleteErr } = await supabase
    .from("guest_story_images")
    .delete()
    .eq("story_id", storyId);

  if (deleteErr) console.warn("Delete old images error:", deleteErr);

  const { data: insertData, error: insertErr } = await supabase
    .from("guest_story_images")
    .insert({
      story_id: storyId,
      image_url: publicUrl,
      storage_path: storagePath,
    })
    .select();

  console.log("Inserted image record:", insertData, insertErr);
}

uploadAndSync();
