import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  image,
  width = 1920,
  height = 1080,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  image?: string;
  width?: number;
  height?: number;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-24">
      {image && (
        <>
          <img
            src={image}
            alt={`${eyebrow || "Cabo Tours"} page header banner`}
            loading="eager"
            fetchPriority="high"
            width={width}
            height={height}
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/70 to-background" />
        </>
      )}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,oklch(0.74_0.14_235_/_0.18),transparent)]" />
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        {eyebrow && (
          <div className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-brand">
            <span className="h-px w-8 bg-brand" />
            {eyebrow}
          </div>
        )}
        <h1 className="mt-4 font-display uppercase leading-[0.95] text-[clamp(2.4rem,6vw,4.8rem)]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">{subtitle}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
