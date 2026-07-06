import logoFooter from "@/assets/cabo-logo-footer.webp";

export function BrandLogo({
  size = "md",
  variant = "light",
}: {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}) {
  const imgHeight = size === "lg" ? "h-20" : size === "sm" ? "h-10" : "h-14";
  const text = size === "lg" ? "text-base" : "text-[13px]";
  const sub = size === "lg" ? "text-[10px]" : "text-[9px]";
  const fg = variant === "light" ? "text-white" : "text-foreground";

  return (
    <div className={`flex items-center gap-3 ${fg}`}>
      <img
        src={logoFooter}
        alt="Cabo Tours"
        width={518}
        height={526}
        className={`${imgHeight} w-auto object-contain select-none filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]`}
        loading="eager"
      />
      <div className="leading-none">
        <div className={`font-display tracking-[0.18em] uppercase ${text}`}>Cabo Tours</div>
        <div className={`tracking-[0.32em] ${sub} text-white/60 mt-1`}>TRAVEL COMPANY</div>
      </div>
    </div>
  );
}
