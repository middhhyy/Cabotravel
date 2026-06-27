import { promises as fs } from "fs";
import path from "path";
import type { Location } from "@/types/itinerary";

const CACHE_FILE = path.join(process.cwd(), "data", "geocode-cache.json");

type GeocodeCacheStore = Record<string, Partial<Location>>;

async function ensureCacheFile() {
  try {
    await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true });
    try {
      await fs.access(CACHE_FILE);
    } catch {
      await fs.writeFile(CACHE_FILE, JSON.stringify({}), "utf-8");
    }
  } catch (err) {
    console.error("Failed to initialize geocode cache directory", err);
  }
}

export async function getCachedLocation(cacheKey: string): Promise<Partial<Location> | null> {
  try {
    await ensureCacheFile();
    const data = await fs.readFile(CACHE_FILE, "utf-8");
    const cache: GeocodeCacheStore = JSON.parse(data);
    return cache[cacheKey] || null;
  } catch (err) {
    console.warn(`Failed to read geocode cache for ${cacheKey}`, err);
    return null;
  }
}

export async function setCachedLocation(
  cacheKey: string,
  locationData: Partial<Location>,
): Promise<void> {
  try {
    await ensureCacheFile();
    const data = await fs.readFile(CACHE_FILE, "utf-8");
    const cache: GeocodeCacheStore = JSON.parse(data);

    cache[cacheKey] = {
      ...locationData,
      lastVerified: new Date().toISOString(),
    };

    await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), "utf-8");
  } catch (err) {
    console.warn(`Failed to write geocode cache for ${cacheKey}`, err);
  }
}
