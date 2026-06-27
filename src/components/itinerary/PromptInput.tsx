import { useEffect, useRef, useState } from "react";
import { Sparkles, Mic, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const EXAMPLES = [
  "Plan a 7-day honeymoon in Bali under ₹1 lakh",
  "Family trip to Dubai in December",
  "Solo backpacking through Vietnam",
  "Luxury Maldives vacation",
  "Adventure trip across Europe",
  "Weekend getaway from Bangalore",
];

type Props = {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
};

export function PromptInput({ value, onChange, onSubmit }: Props) {
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Rotating placeholder
  useEffect(() => {
    if (value) return; // Don't rotate if user is typing
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % EXAMPLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [value]);

  // Auto-resize
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="relative flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-1 transition-colors focus-within:border-brand/50 focus-within:bg-white/[0.05]">
      <div className="relative flex items-start gap-3 p-4">
        <Sparkles className="mt-1 h-5 w-5 shrink-0 text-brand" />

        <div className="relative flex-1">
          {/* Rotating Placeholder (only shows if empty) */}
          <AnimatePresence mode="wait">
            {!value && (
              <motion.div
                key={placeholderIdx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-none absolute left-0 top-0 text-white/30"
              >
                {EXAMPLES[placeholderIdx]}
              </motion.div>
            )}
          </AnimatePresence>

          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full resize-none bg-transparent text-white placeholder-transparent focus:outline-none min-h-[24px] max-h-[200px]"
            placeholder="Describe your dream trip..."
            rows={1}
          />
        </div>

        <div className="flex shrink-0 items-center gap-2 mt-1">
          {value && (
            <button
              onClick={() => onChange("")}
              className="rounded-full p-1 text-white/40 hover:bg-white/10 hover:text-white transition"
              aria-label="Clear input"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            className="rounded-full p-1 text-white/40 hover:bg-white/10 hover:text-white transition"
            aria-label="Voice input (coming soon)"
          >
            <Mic className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 pb-3 pt-1 text-[11px] text-white/30">
        <span className="tracking-wide">
          <kbd className="rounded border border-white/20 bg-white/5 px-1.5 py-0.5 font-sans">⌘</kbd>{" "}
          +{" "}
          <kbd className="rounded border border-white/20 bg-white/5 px-1.5 py-0.5 font-sans">
            Enter
          </kbd>{" "}
          to generate
        </span>
        <span className="tracking-widest">{value.length} / 500</span>
      </div>
    </div>
  );
}
