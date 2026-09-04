import React, { createContext, useContext, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Cookie, Settings, Check } from "lucide-react";

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = "cabo_cookie_consent_v1";

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

interface CookieConsentContextType {
  consent: CookiePreferences | null;
  acceptAll: () => void;
  savePreferences: (prefs: CookiePreferences) => void;
  openPreferencesModal: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return context;
};

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookiePreferences | null>(null);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draftPrefs, setDraftPrefs] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setConsent({ ...defaultPreferences, ...parsed, necessary: true });
      } else {
        // No choice made yet - show banner
        setIsBannerVisible(true);
      }
    } catch (e) {
      console.error("Failed to read cookie consent from storage:", e);
      setIsBannerVisible(true);
    }
  }, []);

  const saveConsentToStorage = (prefs: CookiePreferences) => {
    const finalPrefs = { ...prefs, necessary: true };
    setConsent(finalPrefs);
    setDraftPrefs(finalPrefs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(finalPrefs));
    } catch (e) {
      console.error("Failed to save cookie consent:", e);
    }
    setIsBannerVisible(false);

    // Apply consent script controls
    if (finalPrefs.analytics) {
      // Initialize analytics if configured
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("consent", "update", { analytics_storage: "granted" });
      }
    }
    if (finalPrefs.marketing) {
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("consent", "update", { ad_storage: "granted" });
      }
    }
  };

  const acceptAll = () => {
    saveConsentToStorage({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const savePreferences = (prefs: CookiePreferences) => {
    saveConsentToStorage(prefs);
    setIsModalOpen(false);
  };

  const openPreferencesModal = () => {
    setDraftPrefs(consent || defaultPreferences);
    setIsModalOpen(true);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        acceptAll,
        savePreferences,
        openPreferencesModal,
      }}
    >
      {children}

      {/* First-visit Cookie Consent Banner */}
      {isBannerVisible && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="bg-neutral-900/95 backdrop-blur-md border border-white/15 rounded-2xl p-5 shadow-2xl text-white">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-brand/10 border border-brand/20 rounded-xl text-brand shrink-0">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-display">
                  Cookie Preferences
                </h3>
                <p className="text-xs text-white/70 leading-relaxed font-sans font-light">
                  We use cookies to optimize your experience, analyze site performance, and serve personalized content.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/10">
              <Button
                type="button"
                variant="outline"
                onClick={openPreferencesModal}
                className="flex-1 border-white/15 text-white/80 hover:text-white hover:bg-white/5 rounded-full text-[10px] tracking-wider uppercase font-semibold py-2.5"
              >
                Preferences
              </Button>
              <Button
                type="button"
                onClick={acceptAll}
                className="flex-1 bg-brand hover:bg-brand/90 text-white rounded-full text-[10px] tracking-wider uppercase font-semibold py-2.5 shadow-lg shadow-brand/10"
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Preferences Modal */}
      <Dialog open={isModalOpen} onOpenChange={(open) => !open && setIsModalOpen(false)}>
        <DialogContent className="max-w-md w-[95vw] bg-neutral-900 border border-white/15 rounded-[24px] text-white p-6 overflow-hidden">
          <DialogHeader className="mb-2">
            <DialogTitle className="font-display text-lg uppercase tracking-wider text-white flex items-center gap-2">
              <Settings className="w-4 h-4 text-brand" /> Cookie Preferences
            </DialogTitle>
            <DialogDescription className="text-white/60 text-xs mt-1">
              Customize your cookie settings. Essential cookies are required for basic site operations.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-2">
            {/* Necessary */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white uppercase tracking-wider">Necessary Cookies</span>
                  <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand/20 text-brand font-bold">
                    Always Active
                  </span>
                </div>
                <p className="text-[11px] text-white/60 leading-relaxed font-light">
                  These cookies are required for essential website functionality, security, and session management.
                </p>
              </div>
              <div className="h-5 w-5 rounded-md bg-brand/20 border border-brand/40 flex items-center justify-center text-brand shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Analytics */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-white uppercase tracking-wider">Analytics Cookies</span>
                <p className="text-[11px] text-white/60 leading-relaxed font-light">
                  Helps us understand website usage and improve performance.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={draftPrefs.analytics}
                  onChange={(e) => setDraftPrefs((prev) => ({ ...prev, analytics: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
              </label>
            </div>

            {/* Marketing */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-white uppercase tracking-wider">Marketing Cookies</span>
                <p className="text-[11px] text-white/60 leading-relaxed font-light">
                  Used for marketing, advertising, and conversion tracking.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={draftPrefs.marketing}
                  onChange={(e) => setDraftPrefs((prev) => ({ ...prev, marketing: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-3 border-t border-white/10">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 border-white/15 text-white/80 hover:text-white rounded-full text-xs uppercase tracking-wider font-semibold py-2.5"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => savePreferences(draftPrefs)}
              className="flex-1 bg-brand hover:bg-brand/90 text-white rounded-full text-xs uppercase tracking-wider font-semibold py-2.5 shadow-lg shadow-brand/10"
            >
              Save Preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </CookieConsentContext.Provider>
  );
}
