import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getOptimizedImageUrl(
  url: string,
  options?: { width?: number; height?: number; quality?: number; format?: string }
): string {
  if (!url || !url.includes("supabase.co/storage/v1/object/public/")) {
    return url;
  }
  let transformedUrl = url.replace(
    "/storage/v1/object/public/",
    "/storage/v1/render/image/public/"
  );
  
  const params: string[] = [];
  if (options?.width) params.push(`width=${options.width}`);
  if (options?.height) params.push(`height=${options.height}`);
  if (options?.quality) params.push(`quality=${options.quality}`);
  params.push(`format=${options?.format || "webp"}`);

  transformedUrl += `?${params.join("&")}`;
  return transformedUrl;
}

export function getSupabaseSrcSet(
  url: string,
  format: "avif" | "webp" = "webp",
  quality = 90,
  customWidths?: number[]
): string {
  if (!url || !url.includes("supabase.co/storage/v1/object/public/")) {
    return "";
  }
  const widths = customWidths || [640, 1024, 1536, 2000];
  return widths
    .map((w) => `${getOptimizedImageUrl(url, { width: w, quality, format })} ${w}w`)
    .join(", ");
}
