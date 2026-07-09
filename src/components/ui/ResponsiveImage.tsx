import React from "react";
import { getOptimizedImageUrl, getSupabaseSrcSet } from "@/lib/utils";

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  isHero?: boolean;
  widths?: number[];
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  quality = 90,
  isHero = false,
  widths,
  className,
  sizes,
  ...props
}) => {
  const isSupabase = src && src.includes("supabase.co/storage/v1/object/public/");

  if (!isSupabase) {
    // For local assets, serve directly (they are WebP)
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        sizes={sizes}
        loading={isHero ? "eager" : "lazy"}
        decoding={isHero ? "sync" : "async"}
        fetchPriority={isHero ? "high" : undefined}
        {...props}
      />
    );
  }

  // Generate srcsets for AVIF and WebP formats
  const avifSrcSet = getSupabaseSrcSet(src, "avif", quality, widths);
  const webpSrcSet = getSupabaseSrcSet(src, "webp", quality, widths);

  return (
    <picture className={className}>
      {avifSrcSet && <source srcSet={avifSrcSet} type="image/avif" sizes={sizes} />}
      {webpSrcSet && <source srcSet={webpSrcSet} type="image/webp" sizes={sizes} />}
      <img
        src={getOptimizedImageUrl(src, { width, height, quality, format: "webp" })}
        alt={alt}
        className={className}
        width={width}
        height={height}
        sizes={sizes}
        loading={isHero ? "eager" : "lazy"}
        decoding={isHero ? "sync" : "async"}
        fetchPriority={isHero ? "high" : undefined}
        {...props}
      />
    </picture>
  );
};
