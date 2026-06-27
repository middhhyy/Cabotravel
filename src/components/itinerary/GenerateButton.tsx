import { Sparkles, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
};

export function GenerateButton({ onClick, disabled, loading }: Props) {
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative flex w-full max-w-sm mx-auto items-center justify-center gap-3 overflow-hidden rounded-full py-5 px-8 text-base font-semibold tracking-wide transition-all duration-500
        ${
          disabled
            ? "bg-white/5 text-white/30 cursor-not-allowed"
            : "bg-gradient-to-r from-brand to-brand/80 text-white shadow-[0_0_40px_rgba(var(--brand-rgb),0.4)] ring-1 ring-white/20"
        }
      `}
    >
      {/* Glossy overlay effect for premium feel */}
      {!disabled && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 to-transparent mix-blend-overlay" />
      )}

      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Sparkles className={`h-5 w-5 ${disabled ? "opacity-30" : "animate-pulse"}`} />
      )}

      <span className="relative z-10">
        {loading ? "Crafting Your Journey..." : "✨ Generate My Journey"}
      </span>
    </motion.button>
  );
}
