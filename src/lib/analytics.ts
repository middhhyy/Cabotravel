export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

// Declare global dataLayer for gtag.js
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * Initializes GA4 script and dataLayer if tracking ID is defined.
 */
export function initGA() {
  if (typeof window === "undefined" || !GA_TRACKING_ID) return;

  // Check if already initialized
  if (window.gtag) return;

  const scriptId = "google-analytics-gtag";
  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.async = True;
    script.id = scriptId;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", GA_TRACKING_ID, {
      send_page_view: false, // Page views tracked manually via router listener
    });
  }
}

/**
 * Tracks page views.
 */
export function trackPageView(path: string) {
  if (typeof window === "undefined" || !GA_TRACKING_ID || !window.gtag) return;
  window.gtag("config", GA_TRACKING_ID, {
    page_path: path,
  });
}

/**
 * Tracks custom events.
 */
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window === "undefined" || !GA_TRACKING_ID || !window.gtag) return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}
