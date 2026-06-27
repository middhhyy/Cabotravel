import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import type { TripResponse } from "@/types/itinerary";

export function AIChatPanel({ trip }: { trip: TripResponse }) {
  const [messages, setMessages] = useState<{ role: "ai" | "user"; text: string }[]>([
    {
      role: "ai",
      text: "I'm here to help you refine this itinerary. What would you like to tweak?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim() || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: input }]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    // Simulate AI reasoning with trip context
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: `Based on your itinerary for ${trip.destination?.name || "this destination"}, we can definitely look into that. Would you like me to update the itinerary?`,
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-black/20 rounded-2xl border border-white/5 flex flex-col h-96">
      <div className="p-4 border-b border-white/5 flex items-center gap-2">
        <MessageSquare className="h-4 w-4 text-brand" />
        <h3 className="text-sm font-medium text-white">Trip Co-Pilot</h3>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "ai" ? "bg-brand/20" : "bg-white/10"}`}
            >
              <span
                className={`text-xs font-bold ${msg.role === "ai" ? "text-brand" : "text-white"}`}
              >
                {msg.role === "ai" ? "AI" : "U"}
              </span>
            </div>
            <div
              className={`rounded-2xl p-3 text-sm text-white/80 ${
                msg.role === "user" ? "bg-brand/20 rounded-tr-none" : "bg-white/5 rounded-tl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
              <span className="text-brand text-xs font-bold">AI</span>
            </div>
            <div className="bg-white/5 rounded-2xl rounded-tl-none p-3 flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-white/5 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
          placeholder="Ask a question..."
          className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-brand disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-brand transition-colors disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
