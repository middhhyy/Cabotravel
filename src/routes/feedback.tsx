import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Upload, X, CheckCircle } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { PageHeader } from "@/components/site/PageHeader";
import { supabase } from "@/lib/supabase";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Share Your Feedback & Travel Review | Cabo Tours & Travels" },
      {
        name: "description",
        content:
          "Help us craft better journeys. Share your holiday feedback, reviews, and travel experience of booking domestic or international tour packages with Cabo.",
      },
      { property: "og:title", content: "Share Your Feedback & Travel Review | Cabo Tours & Travels" },
      {
        property: "og:description",
        content:
          "Help us craft better journeys. Share your holiday feedback, reviews, and travel experience of booking tour packages with Cabo.",
      },
      { property: "og:url", content: "https://cabotours.in/feedback" },
      { property: "og:image", content: "https://cabotours.in/social-preview.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Share Your Feedback & Travel Review | Cabo Tours & Travels" },
      {
        name: "twitter:description",
        content:
          "Help us craft better journeys. Share your holiday feedback, reviews, and travel experience of booking tour packages with Cabo.",
      },
      { name: "twitter:image", content: "https://cabotours.in/social-preview.png" },
    ],
    links: [{ rel: "canonical", href: "https://cabotours.in/feedback" }],
  }),
  component: FeedbackPage,
});

function FeedbackPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload an image file (JPEG, PNG, WEBP, etc.)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("File size exceeds 5MB limit");
      return;
    }

    setErrorMsg("");
    setPhoto(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setErrorMsg("Name and message are required");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      let imageUrl = null;

      if (photo) {
        // Upload photo to Supabase storage
        const fileExt = photo.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("feedback-photos")
          .upload(filePath, photo);

        if (uploadError) {
          throw new Error("Failed to upload image: " + uploadError.message);
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from("feedback-photos")
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      // Insert into feedback table
      const { error: insertError } = await supabase.from("feedback").insert({
        name,
        message,
        rating,
        image_url: imageUrl,
        status: "pending"
      });

      if (insertError) {
        throw new Error("Failed to submit feedback: " + insertError.message);
      }

      trackEvent("feedback_submitted", "lead", name);
      setSuccess(true);
      setName("");
      setMessage("");
      setRating(null);
      setPhoto(null);
      setPreviewUrl(null);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-background min-h-screen text-foreground">
      <SiteNav transparentOnTop />
      <PageHeader
        eyebrow="Feedback"
        title={
          <>
            Share your
            <br />
            journey with us.
          </>
        }
        subtitle="Your authentic travel stories and reviews help other families choose the perfect holiday. Tell us how we did."
      />

      <section className="mx-auto max-w-2xl px-6 pb-24">
        {success ? (
          <div className="bg-white/5 border border-brand/20 rounded-[26px] p-8 md:p-12 text-center backdrop-blur-md">
            <CheckCircle className="h-16 w-16 text-brand mx-auto mb-6" />
            <h2 className="font-display text-2xl uppercase text-white mb-4">Feedback Received</h2>
            <p className="text-white/75 text-sm max-w-md mx-auto leading-relaxed">
              Thanks! Your feedback is under review. Our team will verify and format the submission for display on the main page shortly.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-8 inline-flex rounded-full bg-brand px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:scale-[1.02] transition"
            >
              Submit Another Review
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 border border-white/10 rounded-[26px] p-6 md:p-10 space-y-6 backdrop-blur-md"
          >
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-4 py-3 rounded-xl">
                {errorMsg}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-[11px] text-white/50 mb-2 uppercase tracking-[0.22em] font-semibold">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priyan Nair"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] text-white/50 mb-2 uppercase tracking-[0.22em] font-semibold">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition focus:outline-none"
                  >
                    <Star
                      className={`h-7 w-7 ${rating && rating >= star ? "fill-brand text-brand" : "text-white/20 fill-none"
                        }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-[11px] text-white/50 mb-2 uppercase tracking-[0.22em] font-semibold">
                Your Experience / Caption
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your trip, the service, and the memorable moments..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-brand focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-[11px] text-white/50 mb-2 uppercase tracking-[0.22em] font-semibold">
                Upload Photo (Optional)
              </label>

              {previewUrl ? (
                <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-video max-h-52 bg-black/20">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    width={320}
                    height={180}
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    aria-label="Remove photo"
                    className="absolute top-2.5 right-2.5 bg-black/60 hover:bg-black p-1.5 rounded-full border border-white/20 text-white/80 hover:text-white transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center border border-dashed border-white/10 hover:border-brand/40 bg-black/40 rounded-xl p-8 cursor-pointer group transition">
                  <Upload className="h-6 w-6 text-white/40 group-hover:text-brand transition mb-3" />
                  <span className="text-xs text-white/60 group-hover:text-white transition">Click to select a photo</span>
                  <span className="text-[10px] text-white/40 mt-1">Images only, max 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-brand text-white font-semibold text-[11px] rounded-full hover:scale-[1.01] transition shadow-lg shadow-brand/10 uppercase tracking-[0.22em]"
            >
              {submitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        )}
      </section>

      <SiteFooter />
      <WhatsAppFab />
    </main>
  );
}
