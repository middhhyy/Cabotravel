-- =========================================
-- BLOG POSTS SCHEMA & STORAGE
-- =========================================

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  featured_image text,
  category text not null default 'Travel Guide',
  author text not null default 'Cabo Editorial Team',
  published boolean not null default false,
  published_at timestamptz,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================
-- INDEXES
-- =========================================
create index if not exists idx_blog_posts_published  on public.blog_posts(published, published_at desc);
create index if not exists idx_blog_posts_slug       on public.blog_posts(slug);
create index if not exists idx_blog_posts_category   on public.blog_posts(category);
create index if not exists idx_blog_posts_created_at on public.blog_posts(created_at desc);

-- =========================================
-- updated_at TRIGGER
-- =========================================
create or replace trigger trg_blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

-- =========================================
-- ROW LEVEL SECURITY (RLS)
-- =========================================
alter table public.blog_posts enable row level security;

-- Drop existing policies if re-running
drop policy if exists "Allow public read published blog posts" on public.blog_posts;
drop policy if exists "Allow admin full access blog posts" on public.blog_posts;
drop policy if exists "Allow public all access blog posts" on public.blog_posts;

-- Public read access
create policy "Allow public read published blog posts"
on public.blog_posts for select
using (true);

-- Admin & public full access
create policy "Allow public all access blog posts"
on public.blog_posts for all
using (true)
with check (true);

-- =========================================
-- STORAGE BUCKET FOR BLOG IMAGES
-- =========================================
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Storage Security Policies
drop policy if exists "Allow public read blog images" on storage.objects;
drop policy if exists "Allow authenticated upload blog images" on storage.objects;
drop policy if exists "Allow authenticated update blog images" on storage.objects;
drop policy if exists "Allow authenticated delete blog images" on storage.objects;
drop policy if exists "Allow public upload blog images" on storage.objects;
drop policy if exists "Allow public update blog images" on storage.objects;
drop policy if exists "Allow public delete blog images" on storage.objects;

create policy "Allow public read blog images"
on storage.objects for select
using (bucket_id = 'blog-images');

create policy "Allow public upload blog images"
on storage.objects for insert
with check (bucket_id = 'blog-images');

create policy "Allow public update blog images"
on storage.objects for update
using (bucket_id = 'blog-images');

create policy "Allow public delete blog images"
on storage.objects for delete
using (bucket_id = 'blog-images');
