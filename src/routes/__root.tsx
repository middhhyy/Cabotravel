import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { BUSINESS_INFO } from "@/lib/business";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const metaTags = [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0e1014" },
      { name: "robots", content: "index, follow" },
      { title: "Cabo Tours & Travels — Curated Journeys, Crafted For You" },
      {
        name: "description",
        content:
          "Premium travel experiences across Kerala, Kashmir, Dubai, Bali, Thailand and the Maldives. Personalized itineraries, visa assistance and end-to-end care from Cabo Tours & Travels.",
      },
      { property: "og:title", content: "Cabo Tours & Travels" },
      { property: "og:description", content: "Curated journeys, crafted for you." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.cabotourskerala.in" },
      { property: "og:image", content: "https://www.cabotourskerala.in/social-preview.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Cabo Tours & Travels" },
      { name: "twitter:description", content: "Curated journeys, crafted for you." },
      { name: "twitter:image", content: "https://www.cabotourskerala.in/social-preview.png" },
    ];

    const gscVerification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;
    if (gscVerification) {
      metaTags.push({ name: "google-site-verification", content: gscVerification });
    }

    return {
      meta: metaTags,
      links: [
        { rel: "preload", href: appCss, as: "style" } as any,
        { rel: "stylesheet", href: appCss, media: "print", id: "main-stylesheet" } as any,

        {
          rel: "shortcut icon",
          href: "/favicon.ico",
        },
        {
          rel: "apple-touch-icon",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/android-chrome-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "512x512",
          href: "/android-chrome-512x512.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
      ],
    };
  },

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.cabotourskerala.in/#organization",
        name: BUSINESS_INFO.name,
        url: "https://www.cabotourskerala.in",
        logo: {
          "@type": "ImageObject",
          url: "https://www.cabotourskerala.in/social-preview.png",
          width: 1200,
          height: 630,
        },
        sameAs: [BUSINESS_INFO.socials.instagram],
      },
      {
        "@type": "TravelAgency",
        "@id": "https://www.cabotourskerala.in/#agency",
        name: BUSINESS_INFO.name,
        url: "https://www.cabotourskerala.in",
        logo: "https://www.cabotourskerala.in/social-preview.png",
        email: BUSINESS_INFO.email,
        telephone: BUSINESS_INFO.phone,
        priceRange: "$$",
        hasMap: BUSINESS_INFO.maps.url,
        geo: {
          "@type": "GeoCoordinates",
          latitude: BUSINESS_INFO.maps.latitude,
          longitude: BUSINESS_INFO.maps.longitude,
        },
        areaServed: [
          {
            "@type": "State",
            name: "Kerala",
          },
          {
            "@type": "Country",
            name: "India",
          },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: BUSINESS_INFO.address.streetAddress,
          addressLocality: BUSINESS_INFO.address.addressLocality,
          addressRegion: BUSINESS_INFO.address.addressRegion,
          postalCode: BUSINESS_INFO.address.postalCode,
          addressCountry: BUSINESS_INFO.address.addressCountry,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: BUSINESS_INFO.openingHours.days,
          opens: BUSINESS_INFO.openingHours.opens,
          closes: BUSINESS_INFO.openingHours.closes,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "2500",
          bestRating: "5",
          worstRating: "1",
        },
        review: [
          {
            "@type": "Review",
            author: {
              "@type": "Person",
              name: "Aishwarya & Rohit",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
              worstRating: "1",
            },
            reviewBody:
              "Our Maldives honeymoon was choreographed beautifully — from seaplane transfer to the candlelit dinner on the sandbank. Cabo handled every detail.",
          },
          {
            "@type": "Review",
            author: {
              "@type": "Person",
              name: "The Menon Family",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
              worstRating: "1",
            },
            reviewBody:
              "Six of us, three generations, one Kerala houseboat — and not a single hiccup. The team was on WhatsApp every single day.",
          },
          {
            "@type": "Review",
            author: {
              "@type": "Person",
              name: "Sara K.",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
              worstRating: "1",
            },
            reviewBody:
              "I'd never travelled internationally alone. Cabo did my visa, my Bali itinerary and stayed in touch the entire week. Felt safe the whole time.",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.cabotourskerala.in/#website",
        url: "https://www.cabotourskerala.in",
        name: BUSINESS_INFO.name,
        publisher: {
          "@id": "https://www.cabotourskerala.in/#organization",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <noscript>
          <link rel="stylesheet" href={appCss} />
        </noscript>
        <style
          dangerouslySetInnerHTML={{
            __html: `:root { --background: oklch(0.18 0.01 250); --foreground: oklch(0.98 0 0); } html, body { background: oklch(0.18 0.01 250); color: oklch(0.98 0 0); font-family: system-ui, -apple-system, sans-serif; }`
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', () => {
                const link = document.getElementById('main-stylesheet');
                if (link) link.media = 'all';
              });
            `
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { GoogleAnalytics } from "@/components/site/GoogleAnalytics";
import { BreadcrumbsJsonLd } from "@/components/site/BreadcrumbsJsonLd";
import { WelcomeProvider } from "@/components/site/WelcomeProvider";

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-4">
            <h1 className="text-2xl font-display uppercase tracking-wider text-brand">Something went wrong</h1>
            <p className="text-sm text-white/70">
              The application encountered an unexpected error. Please reload the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-brand px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <GoogleAnalytics />
        <BreadcrumbsJsonLd />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <WelcomeProvider>
          <Outlet />
        </WelcomeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
