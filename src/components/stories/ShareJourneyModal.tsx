import React, { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Star,
  Upload,
  X,
  Loader2,
  CheckCircle2,
  User,
  MapPin,
  Calendar,
  Globe,
} from "lucide-react";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

const Instagram = (p: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={p.className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

interface ShareJourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareJourneyModal({ isOpen, onClose }: ShareJourneyModalProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [destination, setDestination] = useState("");
  const [customDestination, setCustomDestination] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [rating, setRating] = useState(5);
  const [story, setStory] = useState("");
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Images state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Popular destinations options
  const destinationOptions = [
    { value: "Kerala", label: "Kerala, India" },
    { value: "Bali", label: "Bali, Indonesia" },
    { value: "Dubai", label: "Dubai, UAE" },
    { value: "Maldives", label: "Maldives" },
    { value: "Singapore", label: "Singapore" },
    { value: "Azerbaijan", label: "Azerbaijan" },
    { value: "Srinagar, Kashmir", label: "Kashmir, India" },
    { value: "other", label: "Other Destination..." },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Total count validation
    if (selectedFiles.length + files.length > 5) {
      toast.error("You can upload a maximum of 5 images.");
      return;
    }

    const validFiles: File[] = [];
    const validPreviews: string[] = [];

    files.forEach((file) => {
      // Format validation
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error(`${file.name} is not a supported format. Use JPG, PNG, or WEBP.`);
        return;
      }

      // Size validation (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds the 5MB size limit.`);
        return;
      }

      validFiles.push(file);
      validPreviews.push(URL.createObjectURL(file));
    });

    setSelectedFiles((prev) => [...prev, ...validFiles]);
    setPreviews((prev) => [...prev, ...validPreviews]);
  };

  const removeFile = (index: number) => {
    // Release memory
    URL.revokeObjectURL(previews[index]);
    
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Canvas client-side image compression
  const compressImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Target maximum dimensions
          const MAX_DIM = 1200;
          if (width > MAX_DIM || height > MAX_DIM) {
            if (width > height) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            } else {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error("Image compression failed"));
              }
            },
            "image/jpeg",
            0.8
          );
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validations
    if (!name.trim()) return toast.error("Full Name is required.");
    const finalDestination = destination === "other" ? customDestination : destination;
    if (!finalDestination.trim()) return toast.error("Destination is required.");
    if (!tripDate) return toast.error("Trip Date is required.");
    if (story.length < 1) return toast.error("Story text is required.");
    if (story.length > 1000) return toast.error("Story cannot exceed 1000 characters.");

    setLoading(true);
    trackEvent("submit_story_attempt", "engagement");

    try {
      const storyId = crypto.randomUUID();
      
      // Auto-generate clean slug
      const slugify = (text: string) =>
        text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

      const slugName = slugify(name);
      const slugDest = slugify(finalDestination);
      const randomSuffix = Math.random().toString(36).substring(2, 6);
      const slug = `${slugName}-${slugDest}-${randomSuffix}`;

      const uploadedImages: { url: string; path: string }[] = [];

      // 1. Upload & Compress images
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const compressedBlob = await compressImage(file);
        
        const fileExt = "jpg"; // Compressed output is jpeg
        const storagePath = `${storyId}/img-${i + 1}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("guest-stories")
          .upload(storagePath, compressedBlob, {
            contentType: "image/jpeg",
            cacheControl: "3600",
          });

        if (uploadError) {
          throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from("guest-stories")
          .getPublicUrl(storagePath);

        uploadedImages.push({ url: publicUrl, path: storagePath });
      }

      // 2. Insert Guest Story Metadata
      const { error: storyError } = await supabase.from("guest_stories").insert({
        id: storyId,
        name: name.trim(),
        username: username.trim() ? `@${username.trim().replace(/^@/, "")}` : null,
        country: country.trim() || null,
        destination: finalDestination.trim(),
        story: story.trim(),
        rating,
        trip_date: tripDate,
        slug,
        status: "pending",
      });

      if (storyError) throw storyError;

      // 3. Insert Image references
      if (uploadedImages.length > 0) {
        const imageInserts = uploadedImages.map((img) => ({
          story_id: storyId,
          image_url: img.url,
          storage_path: img.path,
        }));

        const { error: imageError } = await supabase
          .from("guest_story_images")
          .insert(imageInserts);

        if (imageError) throw imageError;
      }

      setSubmitted(true);
      trackEvent("submit_story_success", "engagement");
      toast.success("Thank you! Your story has been submitted for moderation.");
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.message || "Failed to submit story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Reset state
    setName("");
    setUsername("");
    setCountry("");
    setDestination("");
    setCustomDestination("");
    setTripDate("");
    setRating(5);
    setStory("");
    setSelectedFiles([]);
    previews.forEach((p) => URL.revokeObjectURL(p));
    setPreviews([]);
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-lg w-[95vw] bg-neutral-900 border border-white/10 rounded-[28px] text-white p-6 overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-white/10">
        <DialogHeader className="mb-4">
          <DialogTitle className="font-display text-xl uppercase tracking-wider text-white">
            {submitted ? "Submission Received" : "Share Your Journey"}
          </DialogTitle>
          <DialogDescription className="text-white/60 text-xs mt-1">
            {submitted
              ? "Your review helps fellow travelers plan their dream holidays."
              : "Tell us about your holiday! Only approved stories will appear publicly on the website."}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center text-center py-8 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-brand animate-bounce" />
            <h3 className="text-lg font-semibold text-white">Thank you!</h3>
            <p className="text-white/70 text-xs leading-relaxed max-w-sm">
              Your travel story has been submitted successfully and is currently **Pending Review**. It will become visible publicly once our moderators approve it.
            </p>
            <Button
              onClick={handleClose}
              className="mt-6 px-8 py-3 bg-brand text-white rounded-full text-xs font-semibold uppercase tracking-[0.2em]"
            >
              Close Window
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-1.5">
              <Label className="text-[11px] uppercase tracking-wider text-white/50 font-semibold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Full Name <span className="text-brand">*</span>
              </Label>
              <Input
                placeholder="Jane Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black/40 border-white/10 text-white placeholder:text-white/30 rounded-xl px-4 py-3"
              />
            </div>

            {/* Username & Country */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[11px] uppercase tracking-wider text-white/50 font-semibold flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5" /> Instagram handle
                </Label>
                <Input
                  placeholder="janedoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-black/40 border-white/10 text-white placeholder:text-white/30 rounded-xl px-4 py-3"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] uppercase tracking-wider text-white/50 font-semibold flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" /> Country
                </Label>
                <Input
                  placeholder="India"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="bg-black/40 border-white/10 text-white placeholder:text-white/30 rounded-xl px-4 py-3"
                />
              </div>
            </div>

            {/* Destination Select */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[11px] uppercase tracking-wider text-white/50 font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Destination <span className="text-brand">*</span>
                </Label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-brand focus:outline-none"
                >
                  <option value="" disabled className="text-neutral-500 bg-neutral-900">
                    Select trip location...
                  </option>
                  {destinationOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-neutral-900">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[11px] uppercase tracking-wider text-white/50 font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Date of Trip <span className="text-brand">*</span>
                </Label>
                <Input
                  type="date"
                  required
                  value={tripDate}
                  onChange={(e) => setTripDate(e.target.value)}
                  className="bg-black/40 border-white/10 text-white rounded-xl px-4 py-3 appearance-none [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Custom Destination (if other selected) */}
            {destination === "other" && (
              <div className="space-y-1.5">
                <Label className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">
                  Specify Destination <span className="text-brand">*</span>
                </Label>
                <Input
                  placeholder="e.g. Paris, France"
                  required
                  value={customDestination}
                  onChange={(e) => setCustomDestination(e.target.value)}
                  className="bg-black/40 border-white/10 text-white placeholder:text-white/30 rounded-xl px-4 py-3"
                />
              </div>
            )}

            {/* Star Rating */}
            <div className="space-y-1.5">
              <Label className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">
                Rating
              </Label>
              <div className="flex items-center gap-1.5 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-1 -m-1 focus:outline-none"
                    aria-label={`Rate ${star} star`}
                  >
                    <Star
                      className={`w-6 h-6 transition-colors duration-200 ${
                        star <= (hoverRating ?? rating)
                          ? "fill-accent text-accent"
                          : "text-white/20 fill-none"
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs text-white/50 ml-2 font-medium">
                  {rating === 5 ? "Excellent" : rating === 4 ? "Very Good" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Poor"}
                </span>
              </div>
            </div>

            {/* Story Textarea */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">
                  Your Travel Story <span className="text-brand">*</span>
                </Label>
                <span className={`text-[10px] ${story.length > 1000 ? "text-red-400" : "text-white/40"}`}>
                  {story.length}/1000 characters
                </span>
              </div>
              <Textarea
                placeholder="Write about your journey, local hospitality, the food, planning experience, and favorite sights..."
                required
                value={story}
                onChange={(e) => setStory(e.target.value)}
                rows={4}
                className="bg-black/40 border-white/10 text-white placeholder:text-white/30 rounded-xl px-4 py-3 resize-none text-xs leading-relaxed"
              />
            </div>

            {/* Image Upload Area */}
            <div className="space-y-1.5">
              <Label className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">
                Upload Images (1-5 images, max 5MB each)
              </Label>
              
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-white/10 hover:border-brand/40 bg-black/20 rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition duration-300 group"
              >
                <Upload className="w-6 h-6 text-white/40 group-hover:text-brand transition mb-2" />
                <span className="text-xs text-white/70 group-hover:text-white transition">
                  Click to select photos
                </span>
                <span className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">
                  JPG, PNG, or WEBP only
                </span>
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                />
              </div>

              {/* Upload Previews */}
              {previews.length > 0 && (
                <div className="grid grid-cols-5 gap-2 mt-3">
                  {previews.map((preview, i) => (
                    <div
                      key={preview}
                      className="relative aspect-square bg-black/40 rounded-xl border border-white/10 overflow-hidden"
                    >
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="absolute top-1 right-1 p-0.5 bg-black/70 hover:bg-black text-white rounded-full border border-white/10 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 border-t border-white/10 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-white/10 text-white/80 hover:text-white rounded-full uppercase tracking-wider text-xs py-3"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-brand hover:bg-brand/90 text-white font-semibold rounded-full uppercase tracking-wider text-xs py-3 shadow-lg shadow-brand/10"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Submitting...
                  </span>
                ) : (
                  "Submit Review"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
