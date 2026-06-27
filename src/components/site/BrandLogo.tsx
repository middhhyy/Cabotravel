import { Plane } from "lucide-react";
import logoFooter from "@/assets/cabo-logo-footer.png";

export function BrandLogo({
  size = "md",
  variant = "light",
}: {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}) {
  const dot = size === "lg" ? "h-10 w-10" : size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const iconSize = size === "lg" ? "h-5 w-5" : "h-4 w-4";
  const text = size === "lg" ? "text-base" : "text-[13px]";
  const sub = size === "lg" ? "text-[10px]" : "text-[9px]";
  const fg = variant === "light" ? "text-white" : "text-foreground";

  return (
    <div className={`flex items-center gap-3 ${fg}`}>
      {size === "lg" ? (
        <img
          src={logoFooter}
          alt="Cabo Tours"
          className="h-20 w-auto object-contain select-none filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
        />
      ) : (
        <div
          className={`grid ${dot} place-items-center rounded-full bg-brand text-white shadow-[0_8px_24px_-10px_rgba(67,168,232,0.8)]`}
        >
          <Plane className={`${iconSize} -rotate-12`} strokeWidth={2.2} />
        </div>
      )}
      <div className="leading-none">
        <div className={`font-display tracking-[0.18em] uppercase ${text}`}>Cabo Tours</div>
        <div className={`tracking-[0.32em] ${sub} text-white/60 mt-1`}>TRAVEL COMPANY</div>
      </div>
    </div>
  );
}
