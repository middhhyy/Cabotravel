import { useState, useEffect, useRef } from "react";
import { MapPin, Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";

type Props = {
  value: string | null;
  onChange: (val: string) => void;
  onSelect: () => void;
};

type Suggestion = {
  name: string;
  display_name: string;
};

export function DestinationSearch({ value, onChange, onSelect }: Props) {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            debouncedQuery,
          )}&format=json&addressdetails=1&limit=5&featuretype=city`,
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error("Failed to fetch destinations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  // Handle clicking outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (name: string) => {
    const cleanName = name.split(",")[0]; // Just take the city name
    setQuery(cleanName);
    onChange(cleanName);
    setIsOpen(false);
    onSelect(); // Trigger next step
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto z-50">
      <div
        className={`relative flex items-center bg-white/5 border border-white/10 px-6 py-5 backdrop-blur-xl transition-all duration-300 shadow-2xl shadow-black/20
          ${isOpen && suggestions.length > 0 ? "rounded-t-3xl" : "rounded-3xl hover:bg-white/10 focus-within:border-brand/50 focus-within:bg-white/10"}
        `}
      >
        <Search className="h-6 w-6 text-brand mr-4 opacity-70" />
        <input
          type="text"
          placeholder="Where do you want to go?"
          className="w-full bg-transparent text-white text-xl md:text-2xl font-medium outline-none placeholder-white/30"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && query.trim().length > 2) {
              onChange(query);
              setIsOpen(false);
              onSelect();
            }
          }}
        />
        {loading && <Loader2 className="h-5 w-5 text-white/30 animate-spin ml-4" />}
      </div>

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-[#12141d]/95 backdrop-blur-2xl border border-white/10 border-t-0 rounded-b-3xl overflow-hidden shadow-2xl z-50"
          >
            <div className="py-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  className="w-full text-left px-6 py-4 flex items-center gap-4 hover:bg-white/5 transition-colors group"
                  onClick={() => handleSelect(s.name || s.display_name)}
                >
                  <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                    <MapPin className="h-5 w-5 text-brand" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-lg">{s.name}</div>
                    <div className="text-white/40 text-sm truncate max-w-md">{s.display_name}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
