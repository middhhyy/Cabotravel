import { X, Link2, Download, MessageCircle, Mail } from "lucide-react";
import type { TripResponse } from "@/types/itinerary";
import { useState } from "react";

export function ShareItineraryModal({
  trip,
  onClose,
}: {
  trip: TripResponse;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://cabotours.example.com/shared/${trip.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-background border border-white/10 rounded-3xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Save & Share</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 text-white/60 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Copy Link */}
          <div>
            <label className="block text-sm text-white/60 mb-2">Share Link</label>
            <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
              <input
                readOnly
                value={shareUrl}
                className="w-full bg-transparent px-3 text-sm text-white/80 focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2"
              >
                <Link2 className="h-4 w-4" />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Social Share */}
          <div>
            <label className="block text-sm text-white/60 mb-3">Share via</label>
            <div className="flex justify-center gap-4">
              <button className="w-12 h-12 rounded-full bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 flex items-center justify-center transition-colors">
                <MessageCircle className="h-5 w-5" />
              </button>
              <button className="w-12 h-12 rounded-full bg-[#1DA1F2]/20 text-[#1DA1F2] hover:bg-[#1DA1F2]/30 flex items-center justify-center transition-colors">
                <span className="text-sm font-bold">X</span>
              </button>
              <button className="w-12 h-12 rounded-full bg-[#4267B2]/20 text-[#4267B2] hover:bg-[#4267B2]/30 flex items-center justify-center transition-colors">
                <span className="text-sm font-bold">f</span>
              </button>
              <button className="w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Export Options */}
          <div className="pt-6 border-t border-white/10 space-y-3">
            <button className="w-full py-3 bg-brand/10 border border-brand/20 text-brand font-medium rounded-xl hover:bg-brand/20 transition-colors flex items-center justify-center gap-2">
              <Download className="h-4 w-4" />
              Download as PDF
            </button>
            <button className="w-full py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <CalendarCheck className="h-4 w-4" />
              Export to Calendar (.ics)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// using CalendarCheck placeholder for export to calendar
import { CalendarCheck } from "lucide-react";
