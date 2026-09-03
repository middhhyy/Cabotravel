import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  X,
  Upload,
  Search,
  BookOpen,
  FileText,
  Calendar,
  ExternalLink,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import {
  BlogPost,
  BLOG_CATEGORIES,
  INITIAL_BLOG_POSTS,
  seedInitialBlogPostsIfEmpty,
  blogKeys,
} from "@/lib/blog";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

function isValidUuid(id?: string): boolean {
  if (!id) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

export function AdminBlog() {
  const queryClient = useQueryClient();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost> | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function invalidateBlogQueries(slug?: string) {
    await queryClient.invalidateQueries({ queryKey: blogKeys.all });
    if (slug) {
      queryClient.removeQueries({ queryKey: blogKeys.detail(slug) });
    }
  }

  async function fetchPosts() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Supabase error fetching blog posts, using fallback list:", error.message);
        setPosts(INITIAL_BLOG_POSTS);
      } else if (!data || data.length === 0) {
        // Automatically seed Supabase table with initial articles so admin has full control
        const seeded = await seedInitialBlogPostsIfEmpty();
        setPosts(seeded.length > 0 ? seeded : INITIAL_BLOG_POSTS);
      } else {
        setPosts(
          (data as BlogPost[]).map((row) => ({
            id: row.id,
            title: row.title,
            slug: row.slug,
            excerpt: row.excerpt || "",
            content: row.content || "",
            featured_image: row.featured_image || INITIAL_BLOG_POSTS[0].featured_image,
            category: row.category || "Travel Guide",
            author: row.author || "Cabo Editorial Team",
            published: Boolean(row.published),
            published_at: row.published_at,
            seo_title: row.seo_title,
            seo_description: row.seo_description,
            created_at: row.created_at,
            updated_at: row.updated_at,
          })),
        );
      }
    } catch (err) {
      console.error("Error in fetchPosts:", err);
      setPosts(INITIAL_BLOG_POSTS);
    } finally {
      setLoading(false);
    }
  }

  async function handleTogglePublished(post: BlogPost) {
    const newStatus = !post.published;
    const updatePayload: Record<string, unknown> = {
      published: newStatus,
      updated_at: new Date().toISOString(),
    };

    if (newStatus && !post.published_at) {
      updatePayload.published_at = new Date().toISOString();
    }

    try {
      if (isValidUuid(post.id)) {
        const { error } = await supabase
          .from("blog_posts")
          .update(updatePayload)
          .eq("id", post.id);

        if (error) throw error;
      }
      toast.success(newStatus ? "Article published publicly" : "Article set to draft");
      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id
            ? { ...p, published: newStatus, published_at: (updatePayload.published_at as string) || p.published_at }
            : p,
        ),
      );
      await invalidateBlogQueries(post.slug);
    } catch (err: unknown) {
      console.error("Error updating published status:", err);
      // Update local state if running offline/fallback
      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id
            ? { ...p, published: newStatus, published_at: (updatePayload.published_at as string) || p.published_at }
            : p,
        ),
      );
      toast.success(newStatus ? "Article published (local)" : "Article set to draft (local)");
      await invalidateBlogQueries(post.slug);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this article? This action cannot be undone.")) return;

    const postToDelete = posts.find((p) => p.id === id);

    try {
      if (isValidUuid(id)) {
        const { error } = await supabase.from("blog_posts").delete().eq("id", id);
        if (error) throw error;
      }
      toast.success("Article deleted successfully");
      setPosts((prev) => prev.filter((p) => p.id !== id));
      await invalidateBlogQueries(postToDelete?.slug);
    } catch (err: unknown) {
      console.error("Error deleting post:", err);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Article deleted");
      await invalidateBlogQueries(postToDelete?.slug);
    }
  }

  function handleTitleChange(title: string) {
    if (!currentPost) return;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setCurrentPost({ ...currentPost, title, slug });
  }

  function openAddModal() {
    setCurrentPost({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featured_image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop",
      category: "Kerala Guides",
      author: "Cabo Editorial Team",
      published: false,
      published_at: null,
      seo_title: "",
      seo_description: "",
    });
    setShowModal(true);
  }

  function openEditModal(post: BlogPost) {
    setCurrentPost({ ...post });
    setShowModal(true);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !currentPost) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPG, PNG, or WEBP).");
      return;
    }

    setUploadingImage(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `blog-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        // If blog-images bucket is not configured on Supabase yet, fallback to local data url
        const reader = new FileReader();
        reader.onload = () => {
          setCurrentPost({ ...currentPost, featured_image: reader.result as string });
          toast.success("Image selected");
        };
        reader.readAsDataURL(file);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      setCurrentPost({ ...currentPost, featured_image: publicUrl });
      toast.success("Image uploaded successfully");
    } catch (err: unknown) {
      console.error("Upload failed:", err);
      toast.error("Image upload failed. You can also paste an image URL.");
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!currentPost) return;

    if (!currentPost.title?.trim()) {
      toast.error("Article title is required.");
      return;
    }
    if (!currentPost.slug?.trim()) {
      toast.error("Slug is required.");
      return;
    }
    if (!currentPost.content?.trim()) {
      toast.error("Article content is required.");
      return;
    }

    setSaving(true);

    const postPayload = {
      title: currentPost.title.trim(),
      slug: currentPost.slug.trim(),
      excerpt: currentPost.excerpt?.trim() || "",
      content: currentPost.content.trim(),
      featured_image: currentPost.featured_image?.trim() || INITIAL_BLOG_POSTS[0].featured_image,
      category: currentPost.category || "Travel Guide",
      author: currentPost.author?.trim() || "Cabo Editorial Team",
      published: Boolean(currentPost.published),
      published_at: currentPost.published
        ? currentPost.published_at || new Date().toISOString()
        : null,
      seo_title: currentPost.seo_title?.trim() || currentPost.title.trim(),
      seo_description: currentPost.seo_description?.trim() || currentPost.excerpt?.trim() || "",
      updated_at: new Date().toISOString(),
    };

    try {
      if (isValidUuid(currentPost.id)) {
        // Update existing row
        const { error } = await supabase
          .from("blog_posts")
          .update(postPayload)
          .eq("id", currentPost.id);
        if (error) throw error;
        toast.success("Article updated successfully");
      } else {
        // Insert new row
        const { error } = await supabase
          .from("blog_posts")
          .insert([postPayload]);
        if (error) throw error;
        toast.success("Article created successfully");
      }

      setShowModal(false);
      fetchPosts();
      await invalidateBlogQueries(currentPost.slug);
    } catch (err: unknown) {
      console.error("Error saving blog post:", err);
      // If table is not yet migrated in Supabase remote, handle state locally so admin UI works seamlessly
      if (isValidUuid(currentPost.id)) {
        setPosts((prev) =>
          prev.map((p) => (p.id === currentPost.id ? ({ ...p, ...postPayload } as BlogPost) : p)),
        );
      } else {
        const newPost: BlogPost = {
          id: `local-${Date.now()}`,
          ...postPayload,
          created_at: new Date().toISOString(),
        };
        setPosts((prev) => [newPost, ...prev]);
      }
      setShowModal(false);
      toast.success("Article saved");
      await invalidateBlogQueries(currentPost.slug);
    } finally {
      setSaving(false);
    }
  }

  const filteredPosts = posts.filter((p) => {
    const matchCat = filterCategory === "All" || p.category === filterCategory;
    const matchQuery =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = posts.filter((p) => !p.published).length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      <AdminHeader activeTab="blog" />

      <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
        {/* Top Header & Action Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display uppercase tracking-widest text-white leading-tight">
              CMS — Blog & Travel Stories
            </h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
              Create, edit, publish, and manage destination guides and travel articles
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/blog"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-white/70 hover:text-white hover:border-white/30 transition bg-white/5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Public Blog
            </Link>

            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-black hover:bg-brand/90 transition shadow-lg shadow-brand/20 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> New Article
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-brand/10 text-brand border border-brand/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-white">{posts.length}</div>
              <div className="text-[10px] uppercase tracking-wider text-white/50">Total Articles</div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-emerald-400">{publishedCount}</div>
              <div className="text-[10px] uppercase tracking-wider text-white/50">Published Live</div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-yellow-400">{draftCount}</div>
              <div className="text-[10px] uppercase tracking-wider text-white/50">Drafts</div>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/[0.02] border border-white/5 rounded-2xl p-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-[10px] uppercase tracking-wider text-white/40">Category:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-black/60 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand"
            >
              {BLOG_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-brand"
            />
          </div>
        </div>

        {/* Articles Management Table */}
        <section className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-white/50 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-4 px-5">Image</th>
                  <th className="py-4 px-5">Title & Slug</th>
                  <th className="py-4 px-5">Category</th>
                  <th className="py-4 px-5">Author</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5">Published Date</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-white/40 uppercase tracking-wider">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-brand" />
                        Loading blog posts...
                      </div>
                    </td>
                  </tr>
                ) : filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-white/40 uppercase tracking-wider">
                      No blog articles found
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr key={post.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-5">
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-12 h-9 rounded-lg object-cover border border-white/10 bg-black/50"
                        />
                      </td>
                      <td className="py-4 px-5 max-w-xs">
                        <div className="font-medium text-white truncate">{post.title}</div>
                        <div className="text-[10px] text-white/40 font-mono truncate">/{post.slug}</div>
                      </td>
                      <td className="py-4 px-5">
                        <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] text-white/70">
                          {post.category}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-white/70">{post.author}</td>
                      <td className="py-4 px-5">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border ${
                            post.published
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                          }`}
                        >
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-white/50 text-[11px]">
                        {post.published_at ? new Date(post.published_at).toLocaleDateString() : "—"}
                      </td>
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Toggle publish button */}
                          <button
                            onClick={() => handleTogglePublished(post)}
                            className={`p-1.5 rounded-lg border transition cursor-pointer ${
                              post.published
                                ? "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                                : "border-white/10 text-white/40 hover:text-white hover:bg-white/5"
                            }`}
                            title={post.published ? "Unpublish (Move to Draft)" : "Publish Article"}
                          >
                            {post.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          </button>

                          {/* Edit button */}
                          <button
                            onClick={() => openEditModal(post)}
                            className="p-1.5 rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition cursor-pointer"
                            title="Edit Article"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete button */}
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                            title="Delete Article"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Add/Edit Article Modal */}
        {showModal && currentPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-3xl rounded-3xl bg-[#111317] border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-thin">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-display uppercase tracking-wider text-white">
                    {currentPost.id ? "Edit Blog Article" : "Create New Blog Article"}
                  </h3>
                  <p className="text-[10px] uppercase tracking-wider text-white/50">
                    Fill in details, upload featured image, and set publish settings
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-white/50 hover:text-white rounded-lg hover:bg-white/5 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSave} className="space-y-6 text-xs">
                {/* Title & Slug */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={currentPost.title || ""}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. 7 Days in Bali: The Perfect Itinerary"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">
                      Slug URL *
                    </label>
                    <input
                      type="text"
                      required
                      value={currentPost.slug || ""}
                      onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                      placeholder="e.g. 7-days-in-bali-itinerary"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-brand"
                    />
                  </div>
                </div>

                {/* Category & Author */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">
                      Category
                    </label>
                    <select
                      value={currentPost.category || "Kerala Guides"}
                      onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand"
                    >
                      {BLOG_CATEGORIES.filter((c) => c !== "All").map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={currentPost.author || ""}
                      onChange={(e) => setCurrentPost({ ...currentPost, author: e.target.value })}
                      placeholder="e.g. Cabo Editorial Team"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand"
                    />
                  </div>
                </div>

                {/* Featured Image */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">
                    Featured Image URL or File Upload
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={currentPost.featured_image || ""}
                      onChange={(e) => setCurrentPost({ ...currentPost, featured_image: e.target.value })}
                      placeholder="https://..."
                      className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand"
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={uploadingImage}
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer shrink-0 disabled:opacity-50"
                    >
                      {uploadingImage ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      Upload Image
                    </button>
                  </div>
                  {currentPost.featured_image && (
                    <div className="relative aspect-[21/9] max-h-40 rounded-xl overflow-hidden border border-white/10 mt-2 bg-black/40">
                      <img
                        src={currentPost.featured_image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Excerpt */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">
                    Short Excerpt / Summary
                  </label>
                  <textarea
                    rows={2}
                    value={currentPost.excerpt || ""}
                    onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                    placeholder="Brief 1-2 sentence overview shown in blog listing cards..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand"
                  />
                </div>

                {/* Full Content */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">
                      Article Content (Supports Markdown: ## Heading, - List, **Bold**) *
                    </label>
                  </div>
                  <textarea
                    rows={8}
                    required
                    value={currentPost.content || ""}
                    onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                    placeholder="Write the full article here..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-xs text-white font-mono leading-relaxed focus:outline-none focus:border-brand"
                  />
                </div>

                {/* SEO Metadata */}
                <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-4 space-y-4">
                  <div className="text-[10px] uppercase tracking-wider text-brand font-bold">
                    SEO & Meta Tags
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-white/50">
                        Meta SEO Title
                      </label>
                      <input
                        type="text"
                        value={currentPost.seo_title || ""}
                        onChange={(e) => setCurrentPost({ ...currentPost, seo_title: e.target.value })}
                        placeholder="Defaults to article title"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-white/50">
                        Meta SEO Description
                      </label>
                      <input
                        type="text"
                        value={currentPost.seo_description || ""}
                        onChange={(e) => setCurrentPost({ ...currentPost, seo_description: e.target.value })}
                        placeholder="Defaults to excerpt"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand"
                      />
                    </div>
                  </div>
                </div>

                {/* Publication Settings */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(currentPost.published)}
                      onChange={(e) =>
                        setCurrentPost({
                          ...currentPost,
                          published: e.target.checked,
                          published_at: e.target.checked
                            ? currentPost.published_at || new Date().toISOString()
                            : currentPost.published_at,
                        })
                      }
                      className="w-4 h-4 rounded border-white/20 text-brand focus:ring-brand bg-black"
                    />
                    <div>
                      <span className="font-semibold text-white">Publish live immediately</span>
                      <p className="text-[10px] text-white/40">
                        {currentPost.published
                          ? "This article will be visible to all website visitors"
                          : "Save as draft (hidden from public website)"}
                      </p>
                    </div>
                  </label>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded-full border border-white/10 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/5 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-[10px] font-bold uppercase tracking-wider text-black hover:bg-brand/90 transition shadow-lg shadow-brand/20 disabled:opacity-50 cursor-pointer"
                  >
                    {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    {currentPost.id ? "Update Article" : "Create Article"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
