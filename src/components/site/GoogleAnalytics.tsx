import { useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { initGA, trackPageView } from "@/lib/analytics";

export function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA (noop if already running or if VITE_GA_TRACKING_ID is absent)
    initGA();
  }, []);

  useEffect(() => {
    // Track page views on every location change
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
}
