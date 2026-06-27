import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

type ChipProps = {
  id: string;
  title: string;
  icon?: LucideIcon;
  selected: boolean;
  onClick: () => void;
};

export function PreferenceChip({ title, icon: Icon, selected, onClick }: ChipProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300
        ${
          selected
            ? "bg-brand/20 text-brand shadow-[0_0_20px_rgba(var(--brand-rgb),0.3)] ring-1 ring-brand/50"
            : "bg-[#161822] text-white/60 hover:bg-[#1c1f2e] hover:text-white/90 ring-1 ring-white/5"
        }
      `}
    >
      {Icon && <Icon className={`h-4 w-4 ${selected ? "text-brand" : "text-white/40"}`} />}
      {title}
    </motion.button>
  );
}

export function IconChip({ title, icon: Icon, selected, onClick }: ChipProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center gap-3 rounded-2xl p-4 transition-all duration-300
        ${
          selected
            ? "bg-brand/10 text-brand ring-2 ring-brand/50 shadow-[0_0_20px_rgba(var(--brand-rgb),0.2)]"
            : "bg-[#161822] text-white/50 hover:bg-[#1c1f2e] hover:text-white/90 ring-1 ring-white/5"
        }
      `}
    >
      {Icon && <Icon className="h-6 w-6" />}
      <span className="text-xs font-semibold tracking-wide uppercase">{title}</span>
    </motion.button>
  );
}

type SegmentedProps = {
  options: (string | number)[];
  selected: string | number;
  onChange: (val: any) => void;
};

export function SegmentedControl({ options, selected, onChange }: SegmentedProps) {
  return (
    <div className="flex w-full items-center p-1 bg-[#161822] rounded-xl ring-1 ring-white/5">
      {options.map((opt) => {
        const isSelected = selected === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`
              relative flex-1 py-2 text-sm font-medium transition-colors z-10 rounded-lg
              ${isSelected ? "text-white" : "text-white/50 hover:text-white/80"}
            `}
          >
            {isSelected && (
              <motion.div
                layoutId="segment-bg"
                className="absolute inset-0 bg-[#252838] rounded-lg shadow-sm -z-10 ring-1 ring-white/10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export function PreferenceSection({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">
        {title}
      </h2>
      <div className={className || "flex flex-wrap gap-3"}>{children}</div>
    </div>
  );
}
