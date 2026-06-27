import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Settings,
  Shield,
  Server,
  Database,
  Plus,
  Trash2,
  Heart,
  MessageSquare,
  Star,
} from "lucide-react";
import { getStories, saveStories, GuestStory, DESTINATION_PRESETS } from "@/utils/stories";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Admin Panel — Cabo Tours" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-display text-white mb-2">System Admin Control</h1>
          <p className="text-white/60 text-sm">
            Manage API Keys, Provider Priorities, and System Health
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* API Keys */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
              <Shield className="h-5 w-5 text-brand" />
              <h2 className="text-xl font-medium text-white">API Keys</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-1">Google Gemini API Key</label>
                <input
                  type="password"
                  value="************************"
                  readOnly
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white/40 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Grok API Key</label>
                <input
                  type="password"
                  value="************************"
                  readOnly
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white/40 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Google Maps API Key</label>
                <input
                  type="password"
                  placeholder="Enter API Key"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white font-mono text-sm focus:border-brand focus:outline-none"
                />
              </div>
              <button className="w-full py-2 bg-brand text-white font-medium rounded-xl hover:bg-brand/90 transition-colors">
                Save Keys
              </button>
            </div>
          </section>

          {/* Provider Config */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
              <Settings className="h-5 w-5 text-blue-400" />
              <h2 className="text-xl font-medium text-white">AI Provider Config</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-white/60 mb-2">Primary Provider</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-brand focus:outline-none">
                  <option value="gemini">Google Gemini 1.5 Flash</option>
                  <option value="grok">Grok Beta</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium text-sm">Automatic Fallback</div>
                  <div className="text-white/40 text-xs">
                    Switch to secondary provider if primary fails
                  </div>
                </div>
                <div className="w-12 h-6 bg-brand rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium text-sm">Pre-fetch External Data</div>
                  <div className="text-white/40 text-xs">
                    Inject live Weather & Maps before AI generation
                  </div>
                </div>
                <div className="w-12 h-6 bg-brand rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </section>

          {/* System Health */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-6 col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
              <Server className="h-5 w-5 text-green-400" />
              <h2 className="text-xl font-medium text-white">System Health & Cache</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                <div className="text-white/40 text-sm mb-1">Cache Size</div>
                <div className="text-2xl font-semibold text-white">4.2 MB</div>
                <button className="text-xs text-brand mt-2 hover:underline">Clear Cache</button>
              </div>
              <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                <div className="text-white/40 text-sm mb-1">Est. Token Usage (Month)</div>
                <div className="text-2xl font-semibold text-white">142,000</div>
              </div>
              <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                <div className="text-white/40 text-sm mb-1">Avg. Latency</div>
                <div className="text-2xl font-semibold text-white">1,402 ms</div>
              </div>
            </div>
          </section>

          {/* Manage Guest Stories */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-6 col-span-1 md:col-span-2">
            <StoriesManager />
          </section>
        </div>
      </div>
    </div>
  );
}

function StoriesManager() {
  const [stories, setStories] = useState<GuestStory[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    platform: "Instagram",
    destination: "Bali",
    caption: "",
    time: "Just now",
    likes: "",
    comments: "",
  });

  useEffect(() => {
    setStories(getStories());
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.username || !formData.caption) {
      alert("Please fill in Name, Username, and Caption.");
      return;
    }

    const randomLikes = formData.likes || Math.floor(Math.random() * 400 + 100).toString();
    const randomComments = formData.comments || Math.floor(Math.random() * 45 + 5).toString();

    // Randomize card height preset for natural masonry look
    const heights = [
      "h-[320px] md:h-[350px]",
      "h-[340px] md:h-[380px]",
      "h-[360px] md:h-[400px]",
      "h-[360px] md:h-[410px]",
    ];
    const randomHeight = heights[Math.floor(Math.random() * heights.length)];

    const newStory: GuestStory = {
      id: Date.now().toString(),
      name: formData.name,
      username: formData.username.startsWith("@") ? formData.username : `@${formData.username}`,
      platform: formData.platform,
      time: formData.time || "Just now",
      caption: formData.caption,
      img: formData.destination, // preset mapping
      likes: randomLikes,
      comments: randomComments,
      destination: formData.destination,
      height: randomHeight,
    };

    const updated = [newStory, ...stories];
    setStories(updated);
    saveStories(updated);

    // Reset Form
    setFormData({
      name: "",
      username: "",
      platform: "Instagram",
      destination: "Bali",
      caption: "",
      time: "Just now",
      likes: "",
      comments: "",
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this story?")) {
      const updated = stories.filter((s) => s.id !== id);
      setStories(updated);
      saveStories(updated);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4 justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-brand" />
          <h2 className="text-xl font-medium text-white">Manage Guest Stories & Feedbacks</h2>
        </div>
        <span className="text-[10px] bg-brand/20 text-brand px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
          Live Sync
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form to Add Feedbacks */}
        <form
          onSubmit={handleAdd}
          className="bg-black/35 border border-white/5 p-5 rounded-2xl space-y-4 h-fit"
        >
          <h3 className="text-white font-medium text-sm flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2">
            <Plus className="w-4 h-4 text-brand" /> Add New Story
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] text-white/50 mb-1 uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. John Doe"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-brand focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] text-white/50 mb-1 uppercase tracking-wider">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="e.g. @johndoe"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] text-white/50 mb-1 uppercase tracking-wider">
                Platform
              </label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-brand focus:outline-none"
              >
                <option value="Instagram">Instagram</option>
                <option value="TripAdvisor">TripAdvisor</option>
                <option value="Google Reviews">Google Reviews</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-white/50 mb-1 uppercase tracking-wider">
                Destination
              </label>
              <select
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-brand focus:outline-none"
              >
                {Object.keys(DESTINATION_PRESETS).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-[11px] text-white/50 mb-1 uppercase tracking-wider">
                Time Posted
              </label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="e.g. 2 days ago"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-brand focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] text-white/50 mb-1 uppercase tracking-wider">
                Likes
              </label>
              <input
                type="number"
                value={formData.likes}
                onChange={(e) => setFormData({ ...formData, likes: e.target.value })}
                placeholder="Auto"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-white/50 mb-1 uppercase tracking-wider">
              Travel Caption
            </label>
            <textarea
              rows={3}
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              placeholder="Write authentic travel feedback or caption..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-brand focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-brand text-white font-medium text-xs rounded-xl hover:bg-brand/90 transition duration-350 shadow-lg shadow-brand/10 uppercase tracking-widest"
          >
            Post Feedback Live
          </button>
        </form>

        {/* Stories list */}
        <div className="lg:col-span-2 space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
          <h3 className="text-white/60 font-medium text-xs uppercase tracking-wider mb-2">
            Active Feedbacks ({stories.length})
          </h3>

          {stories.map((story) => (
            <div
              key={story.id || story.username}
              className="flex items-center justify-between bg-white/[0.02] border border-white/5 hover:border-white/10 p-3.5 rounded-xl transition duration-300 gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand/20 border border-brand/20 flex items-center justify-center font-display text-xs text-white/90 font-bold shrink-0">
                  {story.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">{story.name}</span>
                    <span className="text-[9px] text-white/30">{story.username}</span>
                  </div>
                  <div className="text-[10px] text-white/50 line-clamp-1 mt-0.5">
                    {story.caption}
                  </div>
                  <div className="flex items-center gap-2.5 mt-1.5 text-[9px] text-white/40">
                    <span className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider text-brand font-medium">
                      {story.platform}
                    </span>
                    <span>📍 {story.destination}</span>
                    <span>❤️ {story.likes}</span>
                    <span>💬 {story.comments}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDelete(story.id)}
                className="p-2 text-white/40 hover:text-red-500 bg-white/5 hover:bg-red-500/10 rounded-lg border border-white/5 hover:border-red-500/20 transition duration-300"
                title="Delete Feedback"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {stories.length === 0 && (
            <div className="text-center py-10 text-white/30 text-xs border border-dashed border-white/10 rounded-xl">
              No active feedbacks. Click preset default stories or add your own above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
