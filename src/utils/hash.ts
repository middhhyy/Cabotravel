/**
 * Generates a SHA-256 hash for caching.
 * Uses Web Crypto API which is available in Node >18 and browsers.
 */
export async function generateCacheKey(data: any): Promise<string> {
  const str = JSON.stringify(data);
  const buffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}
