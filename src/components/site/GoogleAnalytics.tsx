import { useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { initGA, trackPageView } from "@/lib/analytics";
import { useCookieConsent } from "@/components/site/CookieConsent";

export function GoogleAnalytics() {
  const location = useLocation();
  const { consent } = useCookieConsent();

  useEffect(() => {
    // Only initialize GA if analytics consent is explicitly granted
    if (consent?.analytics) {
      initGA();
    }
  }, [consent?.analytics]);

  useEffect(() => {
    // Track page views on location change if analytics consent is granted
    if (consent?.analytics) {
      trackPageView(location.pathname);
    }
  }, [location.pathname, consent?.analytics]);

  return null;
}
