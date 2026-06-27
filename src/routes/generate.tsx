import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { DestinationSearch } from "@/components/itinerary/DestinationSearch";
import {
  PreferenceSection,
  PreferenceChip,
  IconChip,
  SegmentedControl,
} from "@/components/itinerary/PreferenceCard";
import { GenerateButton } from "@/components/itinerary/GenerateButton";
import { LiveSummaryCard } from "@/components/itinerary/LiveSummaryCard";
import { LoadingState } from "@/components/itinerary/LoadingState";
import { useTripForm } from "@/hooks/useTripForm";
import { useGenerateTrip } from "@/hooks/useGenerateTrip";
import {
  Heart,
  Users,
  Backpack,
  Mountain,
  Waves,
  Briefcase,
  Globe,
  Car,
  Bed,
  Hotel,
  Tent,
  Coffee,
  Trees,
  Music,
  Camera,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/generate")({
  head: () => ({
    meta: [
      { title: "Create Personalized Tour Itinerary | Cabo Tours & Travels" },
      {
        name: "description",
        content:
          "Generate your custom domestic or international tour itinerary using our smart trip builder. Personalize destinations, budget, preferences, and interests.",
      },
      {
        property: "og:title",
        content: "Create Personalized Tour Itinerary | Cabo Tours & Travels",
      },
      {
        property: "og:description",
        content:
          "Generate your custom domestic or international tour itinerary using our smart trip builder.",
      },
      { property: "og:url", content: "https://cabotours.in/generate" },
      { property: "og:image", content: "https://cabotours.in/social-preview.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Create Personalized Tour Itinerary | Cabo Tours & Travels",
      },
      {
        name: "twitter:description",
        content:
          "Generate your custom domestic or international tour itinerary using our smart trip builder.",
      },
      { name: "twitter:image", content: "https://cabotours.in/social-preview.png" },
    ],
    links: [{ rel: "canonical", href: "https://cabotours.in/generate" }],
  }),
  component: GeneratePage,
});

function GeneratePage() {
  const router = useRouter();
  const { state, setField, toggleInterest, isValid } = useTripForm();
  const { generate, loading, error } = useGenerateTrip();
  const [step, setStep] = useState(1);

  const handleGenerate = async () => {
    const tripId = await generate(state);
    if (tripId) {
      router.navigate({ to: "/trip/$id", params: { id: tripId } });
    }
  };

  const setTemplate = (style: string, travelers: string) => {
    setField("travelStyle", style as any);
    setField("travelers", travelers as any);
    if (state.destination) {
      setStep(2);
    }
  };

  return (
    <main className="bg-background min-h-screen text-foreground relative selection:bg-brand/30">
      <SiteNav transparentOnTop={false} />

      {/* Mockup-Accurate Premium Concierge Background */}
      <style>{`
        .bg-concierge-base {
          background-image: url('https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=2070');
          background-size: cover;
          background-position: center 30%;
        }
        .bg-concierge-gradient {
          background: linear-gradient(to right, rgba(4, 5, 10, 0.15) 0%, rgba(4, 5, 10, 0.65) 35%, #050711 70%, #030408 100%),
                      linear-gradient(to bottom, #04050a 0%, rgba(4, 5, 10, 0.3) 15%, rgba(4, 5, 10, 0.3) 80%, #04050a 100%);
        }
        .sunset-horizon-glow {
          position: absolute;
          bottom: 12%;
          left: 0;
          right: 0;
          height: 35vh;
          background: radial-gradient(ellipse at 75% 90%, rgba(244, 63, 94, 0.14) 0%, rgba(217, 70, 239, 0.04) 45%, transparent 100%);
          filter: blur(50px);
          pointer-events: none;
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -20%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -15%) scale(1.06); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-25px) translateX(15px); opacity: 0.7; }
        }
        @keyframes spin-blueprint-cw {
          from { transform: rotate(0deg) translate(-50%, -50%); }
          to { transform: rotate(360deg) translate(-50%, -50%); }
        }
        .animate-search-glow {
          animation: glow-pulse 12s ease-in-out infinite;
        }
        .animate-spin-blueprint-cw {
          transform-origin: top left;
          animation: spin-blueprint-cw 200s linear infinite;
        }
        .animate-float-p1 { animation: float-particle 14s ease-in-out infinite; }
        .animate-float-p2 { animation: float-particle 18s ease-in-out infinite -4s; }
        .animate-float-p3 { animation: float-particle 22s ease-in-out infinite -8s; }
      `}</style>

      {/* Background Container */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030408]">
        {/* Layer 1: Rio Coastal Mountain Dusk Landscape */}
        <div className="absolute inset-0 bg-concierge-base opacity-75" />

        {/* Layer 2: Transition & Blending Gradients */}
        <div className="absolute inset-0 bg-concierge-gradient" />

        {/* Layer 3: Warm Sunset Horizon Glow (Horizontal pink/orange band above sea level) */}
        <div className="sunset-horizon-glow" />

        {/* Layer 4: Procedural Noise overlay for film grain texture */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.025]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>

        {/* Layer 5: Technical blueprint coordinate curves & grid ticks */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.15 }}
        >
          {/* Latitude-Longitude Blueprint lines */}
          <path
            d="M-200,200 Q300,50 800,200 T1800,200"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1"
            strokeDasharray="6,8"
            opacity="0.35"
          />
          <path
            d="M-200,400 Q400,150 900,400 T1900,400"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="1"
            opacity="0.25"
          />
          <path
            d="M-200,600 Q500,350 1000,600 T2100,600"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1.2"
            strokeDasharray="12,6"
            opacity="0.2"
          />

          {/* Compass Rings on Right Side */}
          <circle
            cx="75%"
            cy="35%"
            r="180"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
          <circle
            cx="75%"
            cy="35%"
            r="260"
            fill="none"
            stroke="rgba(6,182,212,0.04)"
            strokeWidth="1"
            strokeDasharray="4,8"
          />

          {/* Flight Routes with running glow */}
          <path
            d="M150,550 C350,150 700,80 900,280 C1000,380 1200,480 1400,180"
            fill="none"
            stroke="rgba(6,182,212,0.15)"
            strokeWidth="1"
          />
          <path
            d="M250,650 C450,250 800,180 1000,430 C1100,530 1300,580 1500,280"
            fill="none"
            stroke="rgba(59,130,246,0.08)"
            strokeWidth="1"
          />

          {/* Orbiting route pulse dots */}
          <circle r="3" fill="#06b6d4" opacity="0.8">
            <animateMotion
              dur="15s"
              repeatCount="indefinite"
              path="M150,550 C350,150 700,80 900,280 C1000,380 1200,480 1400,180"
            />
          </circle>
          <circle r="2.5" fill="#3b82f6" opacity="0.6">
            <animateMotion
              dur="22s"
              repeatCount="indefinite"
              path="M250,650 C450,250 800,180 1000,430 C1100,530 1300,580 1500,280"
            />
          </circle>

          {/* Stylized Blueprint Travel coordinates */}
          <text
            x="5%"
            y="85%"
            fill="rgba(255,255,255,0.2)"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="2"
          >
            40.7128° N
          </text>
          <text
            x="5%"
            y="88%"
            fill="rgba(255,255,255,0.2)"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="2"
          >
            74.0060° W
          </text>
        </svg>

        {/* Layer 6: Dotted matrix grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.012)_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-80" />

        {/* Layer 7: Concentric brand watermark circular blueprints (matching glossy circle logo) */}
        <div className="absolute top-[35%] left-[75%] w-[45vw] h-[45vw] max-w-[450px] max-h-[450px] rounded-full border border-brand/5 animate-spin-blueprint-cw opacity-30" />

        {/* Subtle large outer brand watermark */}
        <div className="absolute top-[2%] left-[2%] w-[96vw] h-[96vw] rounded-full border border-brand/5 opacity-15" />

        {/* Layer 8: Radial Blue Ambient Glow behind search experience */}
        <div className="absolute top-[18%] left-1/2 w-[85vw] h-[45vh] rounded-full bg-gradient-to-r from-brand/10 to-cyan-500/5 blur-[125px] opacity-90 animate-search-glow" />

        {/* Floating Constellation Stars */}
        <div className="absolute top-[22%] left-[28%] w-1.5 h-1.5 rounded-full bg-cyan-300/30 blur-[0.8px] animate-float-p1" />
        <div className="absolute top-[45%] left-[82%] w-2 h-2 rounded-full bg-blue-300/20 blur-[1px] animate-float-p2" />
        <div className="absolute top-[68%] left-[20%] w-1 h-1 rounded-full bg-brand/35 blur-[1.2px] animate-float-p3" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 lg:px-8">
        {/* Compact Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-white/60 mb-6">
            <Sparkles className="h-3 w-3 text-brand" /> AI-Powered Travel
          </div>
          <h1 className="font-display text-3xl md:text-5xl text-white mb-4 tracking-tight leading-tight">
            Plan Your Journey
          </h1>
          <p className="text-white/40 max-w-xl mx-auto text-sm">
            Intelligent itinerary planning in under 30 seconds.
          </p>
        </div>

        {/* STEP 1: Destination */}
        <div className="relative mb-8 z-50">
          <DestinationSearch
            value={state.destination}
            onChange={(val) => setField("destination", val)}
            onSelect={() => setStep((prev) => Math.max(prev, 2))}
          />
        </div>

        {/* Quick Templates (Only if Step 1 is active) */}
        <AnimatePresence mode="sync">
          {step === 1 && !state.destination && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl mx-auto text-center"
            >
              <PreferenceSection
                title="Popular Trip Types"
                className="flex flex-wrap justify-center gap-3"
              >
                <PreferenceChip
                  id="honeymoon"
                  title="Honeymoon"
                  icon={Heart}
                  selected={false}
                  onClick={() => setTemplate("Relaxing", "Couple")}
                />
                <PreferenceChip
                  id="family"
                  title="Family"
                  icon={Users}
                  selected={false}
                  onClick={() => setTemplate("Relaxing", "Family")}
                />
                <PreferenceChip
                  id="backpacking"
                  title="Backpacking"
                  icon={Backpack}
                  selected={false}
                  onClick={() => setTemplate("Adventure", "Solo")}
                />
                <PreferenceChip
                  id="adventure"
                  title="Adventure"
                  icon={Mountain}
                  selected={false}
                  onClick={() => setTemplate("Adventure", "Friends")}
                />
                <PreferenceChip
                  id="beach"
                  title="Beach"
                  icon={Waves}
                  selected={false}
                  onClick={() => setTemplate("Relaxing", "Couple")}
                />
                <PreferenceChip
                  id="business"
                  title="Business"
                  icon={Briefcase}
                  selected={false}
                  onClick={() => setTemplate("Culture", "Solo")}
                />
                <PreferenceChip
                  id="international"
                  title="International"
                  icon={Globe}
                  selected={false}
                  onClick={() => setTemplate("Culture", "Couple")}
                />
                <PreferenceChip
                  id="roadtrip"
                  title="Road Trip"
                  icon={Car}
                  selected={false}
                  onClick={() => setTemplate("Adventure", "Friends")}
                />
              </PreferenceSection>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 2 & 3 */}
        <AnimatePresence>
          {step >= 2 && state.destination && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-16 space-y-12 max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">
                  Trip Details
                </span>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              {/* Grid for core details to save vertical space */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <PreferenceSection title="Duration">
                  <SegmentedControl
                    options={[2, 3, 5, 7, 10, "Custom"]}
                    selected={
                      state.duration !== null && ![2, 3, 5, 7, 10].includes(state.duration)
                        ? "Custom"
                        : state.duration || 3
                    }
                    onChange={(val) => {
                      if (val === "Custom") {
                        setField("duration", 14); // default custom value
                      } else {
                        setField("duration", val);
                      }
                    }}
                  />
                  {state.duration !== null && ![2, 3, 5, 7, 10].includes(state.duration) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2"
                    >
                      <input
                        type="number"
                        min={1}
                        max={90}
                        value={state.duration || ""}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setField("duration", isNaN(val) ? null : val);
                        }}
                        placeholder="Enter number of days (e.g. 12)"
                        className="w-full bg-[#161822] text-white placeholder-white/20 rounded-xl px-4 py-2.5 text-sm ring-1 ring-white/5 focus:ring-brand focus:outline-none transition-all"
                      />
                    </motion.div>
                  )}
                </PreferenceSection>

                <PreferenceSection title="Budget">
                  <SegmentedControl
                    options={["Economy", "Standard", "Premium", "Luxury"]}
                    selected={state.budget || "Standard"}
                    onChange={(val) => setField("budget", val as any)}
                  />
                </PreferenceSection>

                <PreferenceSection title="Travelers">
                  <div className="flex flex-wrap gap-2">
                    {["Solo", "Couple", "Family", "Friends"].map((t) => (
                      <PreferenceChip
                        key={t}
                        id={t}
                        title={t}
                        selected={state.travelers === t}
                        onClick={() => setField("travelers", t as any)}
                      />
                    ))}
                  </div>
                </PreferenceSection>

                <PreferenceSection title="Accommodation" className="grid grid-cols-4 gap-2">
                  {[
                    { id: "Hotel", icon: Hotel },
                    { id: "Resort", icon: Bed },
                    { id: "Villa", icon: Tent }, // Mock icon
                    { id: "Hostel", icon: Backpack },
                  ].map((a) => (
                    <IconChip
                      key={a.id}
                      id={a.id}
                      title={a.id}
                      icon={a.icon}
                      selected={state.accommodation === a.id}
                      onClick={() => setField("accommodation", a.id as any)}
                    />
                  ))}
                </PreferenceSection>
              </div>

              {/* Step 3: Vibes */}
              <div className="pt-8">
                <PreferenceSection title="Travel Style / Vibes (Select multiple)">
                  {[
                    { id: "Nature", icon: Trees },
                    { id: "Luxury", icon: Sparkles },
                    { id: "Adventure", icon: Mountain },
                    { id: "Culture", icon: Globe },
                    { id: "Nightlife", icon: Music },
                    { id: "Food", icon: Coffee },
                    { id: "Photography", icon: Camera },
                    { id: "Shopping", icon: ShoppingBag },
                    { id: "Relaxing", icon: Waves },
                    { id: "Historical", icon: Globe },
                    { id: "Wellness", icon: Sparkles },
                    { id: "Wildlife", icon: Trees },
                    { id: "Family Friendly", icon: Users },
                    { id: "Local Culture", icon: Globe },
                    { id: "Beach/Ocean", icon: Waves },
                  ].map((v) => {
                    const isSelected = state.interests.includes(v.id);
                    return (
                      <PreferenceChip
                        key={v.id}
                        id={v.id}
                        title={v.id}
                        icon={v.icon}
                        selected={isSelected}
                        onClick={() => toggleInterest(v.id)}
                      />
                    );
                  })}
                </PreferenceSection>
              </div>

              {/* Live Summary */}
              <LiveSummaryCard state={state} />

              <div className="pt-12 pb-24">
                <GenerateButton
                  onClick={handleGenerate}
                  disabled={!isValid || loading}
                  loading={loading}
                />
                {error && <div className="text-red-400 text-sm mt-4 text-center">{error}</div>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <SiteFooter />

      {/* Fullscreen Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md"
          >
            <LoadingState />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
