import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Compass, Map, Wallet, Sun, CheckCircle2 } from "lucide-react";

const steps = [
  { id: 1, text: "Understanding your trip...", icon: Sparkles },
  { id: 2, text: "Optimizing tokens & checking cache...", icon: Wallet },
  { id: 3, text: "Planning local itinerary...", icon: Map },
  { id: 4, text: "Discovering activities via AI...", icon: Compass },
  { id: 5, text: "Checking seasonal recommendations...", icon: Sun },
  { id: 6, text: "Preparing your journey...", icon: CheckCircle2 },
];

export function LoadingState() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative h-24 w-24 mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-brand/20 animate-ping"></div>
        <div className="absolute inset-2 rounded-full bg-brand/10 backdrop-blur-md flex items-center justify-center border border-brand/30">
          <Sparkles className="h-8 w-8 text-brand animate-pulse" />
        </div>
      </div>

      <div className="h-8 relative w-full max-w-sm flex justify-center items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 text-white/80"
          >
            {(() => {
              const Icon = steps[currentStep].icon;
              return <Icon className="h-5 w-5 text-brand" />;
            })()}
            <span className="text-lg font-medium tracking-wide">{steps[currentStep].text}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Track */}
      <div className="w-full max-w-xs mt-8 h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-brand to-brand/60 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
