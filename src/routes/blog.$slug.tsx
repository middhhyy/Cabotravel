import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Copy,
  Check,
  Sparkles,
  Phone,
  Bookmark,
  ChevronRight,
} from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { getBlogPostBySlug, BlogPost } from "@/lib/blog";
import { waLink, waMessages } from "@/lib/whatsapp";
import { logLead } from "@/lib/logLead";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getBlogPostBySlug(params.slug);
    if (!post) {
      throw notFound();
    }
    return post;
  },
  head: ({ loaderData }) => {
    const post = loaderData as BlogPost | undefined;
    const title = post?.seo_title || `${post?.title || "Travel Story"} | Cabo Tours & Travels`;
    const description =
      post?.seo_description ||
      post?.excerpt ||
      "Curated travel guide and destination insights from Cabo Tours & Travels.";
    const image = post?.featured_image || "https://www.cabotourskerala.in/social-preview.png";
    const url = `https://www.cabotourskerala.in/blog/${post?.slug || ""}`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: image },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: BlogPostDetail,
});

function BlogPostDetail() {
  const post = Route.useLoaderData() as BlogPost;
  const [copied, setCopied] = useState(false);

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

  const handleCopyLink = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    trackEvent("share_blog_post", "engagement");
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWhatsAppShare = () => {
    if (typeof window === "undefined") return;
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `Check out this travel guide: ${post.title} - ${window.location.href}`,
    )}`;
    window.open(shareUrl, "_blank");
    trackEvent("share_blog_whatsapp", "engagement");
  };

  // Structured data schema for BlogPosting
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [post.featured_image],
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at || post.published_at || post.created_at,
    author: {
      "@type": "Person",
      name: post.author || "Cabo Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Cabo Tours & Travels",
      logo: {
        "@type": "ImageObject",
        url: "https://www.cabotourskerala.in/social-preview.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.cabotourskerala.in/blog/${post.slug}`,
    },
  };

  return (
    <main className="bg-background text-foreground min-h-screen">
      <SiteNav transparentOnTop />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="pt-28 lg:pt-36 pb-20">
        {/* Header Hero Container */}
        <header className="mx-auto max-w-4xl px-6 lg:px-8 space-y-6 text-center">
          {/* Back link */}
          <div className="flex justify-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-brand transition-colors rounded-full bg-white/5 border border-white/10 px-4 py-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
            </Link>
          </div>

          {/* Category */}
          <div>
            <span className="inline-block rounded-full bg-brand/20 border border-brand/40 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand">
              {post.category}
            </span>
          </div>

          {/* Post Title */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-display uppercase tracking-wider text-white leading-tight">
            {post.title}
          </h1>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs text-white/60 pt-2 border-b border-white/10 pb-6">
            <span className="flex items-center gap-1.5 font-medium text-white/80">
              <User className="w-3.5 h-3.5 text-brand" /> {post.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand" /> {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand" /> {post.reading_time_minutes || 5} min read
            </span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mx-auto max-w-5xl px-6 lg:px-8 my-8 lg:my-12">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/40">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Content Body & Sidebar Container */}
        <div className="mx-auto max-w-4xl px-6 lg:px-8 grid grid-cols-1 gap-12">
          {/* Main Article Content */}
          <div className="prose prose-invert max-w-none space-y-6 text-white/80 text-sm md:text-base leading-relaxed">
            <FormattedContent content={post.content} />
          </div>

          {/* Social Share & Actions Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/50 font-semibold">
              <Share2 className="w-4 h-4 text-brand" /> Share this guide:
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Link"}
              </button>
              <button
                onClick={handleWhatsAppShare}
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/20 border border-emerald-500/40 px-4 py-2 text-xs text-emerald-300 hover:bg-emerald-600/30 transition cursor-pointer"
              >
                Share to WhatsApp
              </button>
            </div>
          </div>

          {/* Author Box */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-brand/20 border border-brand/40 flex items-center justify-center shrink-0">
              <User className="w-8 h-8 text-brand" />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-base font-semibold text-white">{post.author}</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Travel curators and destination specialists at Cabo Tours & Travels. We design bespoke holiday packages, arrange seamless transport, and ensure authentic local experiences across the globe.
              </p>
            </div>
          </div>

          {/* Bottom Custom Planning Box */}
          <div className="rounded-3xl bg-gradient-to-r from-brand/10 via-brand/5 to-transparent border border-brand/30 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand">
                <Sparkles className="w-3.5 h-3.5" /> Handcrafted Escapes
              </span>
              <h3 className="text-xl md:text-2xl font-display uppercase tracking-wider text-white">
                Inspired by this destination?
              </h3>
              <p className="text-xs text-white/70 max-w-md">
                Let our travel designers customize an itinerary for your dates, budget, and group size.
              </p>
            </div>
            <a
              href={waLink(`Hi, I just read your article "${post.title}" and would like to plan a trip!`)}
              target="_blank"
              rel="noreferrer"
              onClick={() => logLead("blog_detail_cta", `/blog/${post.slug}`)}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white hover:bg-brand/90 transition shadow-lg shadow-brand/20 shrink-0 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" /> Book On WhatsApp
            </a>
          </div>
        </div>
      </article>

      <SiteFooter />
      <WhatsAppFab />
    </main>
  );
}

function FormattedContent({ content }: { content: string }) {
  // Simple markdown-style parser for headings, lists, bold text, blockquotes and paragraphs
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 my-4 pl-2 text-white/80">
          {currentList.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          ))}
        </ul>,
      );
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      currentList.push(trimmed.slice(2));
      return;
    }

    flushList();

    if (!trimmed) {
      return;
    }

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${index}`}
          className="text-lg md:text-xl font-semibold text-white mt-8 mb-3 tracking-wide"
        >
          {trimmed.slice(4)}
        </h3>,
      );
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${index}`}
          className="text-xl md:text-2xl font-display uppercase tracking-wider text-brand mt-10 mb-4 pb-2 border-b border-white/10"
        >
          {trimmed.slice(3)}
        </h2>,
      );
    } else if (trimmed.startsWith("---")) {
      elements.push(<hr key={`hr-${index}`} className="border-white/10 my-8" />);
    } else if (trimmed.startsWith("> ")) {
      elements.push(
        <blockquote
          key={`quote-${index}`}
          className="border-l-2 border-brand pl-4 my-6 italic text-white/90 bg-white/[0.02] py-2 pr-4 rounded-r-lg"
        >
          {trimmed.slice(2)}
        </blockquote>,
      );
    } else {
      elements.push(
        <p
          key={`p-${index}`}
          className="my-3 text-white/80 leading-relaxed text-sm md:text-base"
          dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
        />,
      );
    }
  });

  flushList();

  return <div className="blog-article-body space-y-2">{elements}</div>;
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong class='text-white font-semibold'>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em class='text-white/90 italic'>$1</em>")
    .replace(/\[(.*?)\]\((.*?)\)/g, "<a href='$2' class='text-brand underline hover:text-white'>$1</a>");
}
