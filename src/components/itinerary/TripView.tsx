import type { TripResponse } from "@/types/itinerary";
import { Download, Share2, Bookmark } from "lucide-react";

export function TripView({ trip }: { trip: TripResponse }) {
  if (!trip) return null;

  return (
    <div className="w-full space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Hero Overview */}
      <section className="bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-8 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-display text-white mb-2">{trip.title}</h2>
            <p className="text-white/60 text-lg max-w-2xl">{trip.summary}</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 transition-colors">
              <Bookmark className="h-5 w-5" />
            </button>
            <button className="px-6 py-3 rounded-full bg-brand text-white font-medium hover:bg-brand/90 flex items-center gap-2 transition-colors">
              <Download className="h-4 w-4" />
              Export PDF
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-black/20 border border-white/5">
            <div className="text-white/40 text-sm mb-1">Destination</div>
            <div className="text-white font-medium">{trip.destination?.name || "Unknown"}</div>
          </div>
          <div className="p-4 rounded-2xl bg-black/20 border border-white/5">
            <div className="text-white/40 text-sm mb-1">Duration</div>
            <div className="text-white font-medium">{trip.days?.length || 0} Days</div>
          </div>
          <div className="p-4 rounded-2xl bg-black/20 border border-white/5">
            <div className="text-white/40 text-sm mb-1">Weather</div>
            <div className="text-white font-medium">{trip.weather?.averageTemp || "--"}</div>
          </div>
        </div>
      </section>

      {/* Timeline Placeholder */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-display text-white">Interactive Timeline</h3>
        </div>
        <div className="space-y-4">
          {trip.days?.map((day, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-white">
                  Day {day.dayNumber}: {day.theme}
                </h4>
                <button className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-brand border border-brand/20 hover:bg-brand/10">
                  Regenerate Day {day.dayNumber}
                </button>
              </div>
              <p className="text-white/60 text-sm mb-4">Date: {day.date}</p>

              <div className="space-y-3">
                {day.activities?.map((act, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-black/20 w-full flex-wrap">
                    <div className="w-16 shrink-0 text-white/40 text-sm font-medium pt-1">
                      {act.time}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium mb-1">{act.title}</div>
                      <div className="text-white/60 text-sm mb-3">{act.description}</div>

                      {/* Smart Location Card */}
                      {act.location && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
                            {act.location.imageUrl && (
                              <img
                                src={act.location.imageUrl}
                                alt={act.location.name}
                                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                              />
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-medium text-white truncate max-w-[180px] sm:max-w-none">
                                  📍 {act.location.name}
                                </span>
                                {act.location.verified && (
                                  <span className="px-2 py-0.5 rounded-full bg-brand/20 text-brand text-[10px] font-bold uppercase tracking-wider">
                                    Verified
                                  </span>
                                )}
                              </div>
                              {act.location.address && (
                                <div className="text-xs text-white/40 mt-1 truncate w-full">
                                  {act.location.address}
                                </div>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              import("@/services/navigation/NavigationService").then(
                                ({ NavigationService }) => {
                                  NavigationService.open(act.location);
                                },
                              );
                            }}
                            disabled={!act.location.verified}
                            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all w-full sm:w-auto shrink-0 ${
                              act.location.verified
                                ? "bg-brand/10 text-brand hover:bg-brand/20 border border-brand/20"
                                : "bg-white/5 text-white/30 cursor-not-allowed border border-white/5"
                            }`}
                          >
                            {act.location.verified ? (
                              <>🧭 Navigate</>
                            ) : act.location.lastVerified ? (
                              "Unverified"
                            ) : (
                              "Resolving..."
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
