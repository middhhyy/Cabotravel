-- =========================================
-- GUEST STORIES
-- =========================================
create table if not exists public.guest_stories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  username text,
  avatar_url text,
  country text,
  destination text not null,
  story text not null check (char_length(story) >= 50 and char_length(story) <= 1000),
  rating integer not null check (rating >= 1 and rating <= 5),
  trip_date date not null,
  created_at timestamptz not null default now(),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  slug text not null unique,
  likes integer not null default 0
);

-- =========================================
-- GUEST STORY IMAGES
-- =========================================
create table if not exists public.guest_story_images (
  id uuid primary key default gen_random_uuid(),
  story_id uuid not null references public.guest_stories(id) on delete cascade,
  image_url text not null,
  storage_path text not null,
  created_at timestamptz not null default now()
);

-- =========================================
-- INDEXES
-- =========================================
create index if not exists idx_guest_stories_status     on public.guest_stories(status) where status = 'approved';
create index if not exists idx_guest_stories_created_at on public.guest_stories(created_at desc);
create index if not exists idx_guest_stories_slug       on public.guest_stories(slug);
create index if not exists idx_guest_story_images_story on public.guest_story_images(story_id);

-- =========================================
-- ROW LEVEL SECURITY (RLS)
-- =========================================
alter table public.guest_stories enable row level security;
alter table public.guest_story_images enable row level security;

-- Policies for guest_stories
create policy "Allow public read approved stories"
on public.guest_stories for select
using (status = 'approved');

create policy "Allow public insert stories"
on public.guest_stories for insert
with check (true);

create policy "Allow admin full access stories"
on public.guest_stories for all
to authenticated
using (true)
with check (true);

-- Policies for guest_story_images
create policy "Allow public read story images"
on public.guest_story_images for select
using (true);

create policy "Allow public insert story images"
on public.guest_story_images for insert
with check (true);

create policy "Allow admin full access story images"
on public.guest_story_images for all
to authenticated
using (true)
with check (true);

-- =========================================
-- STORAGE BUCKET CREATION
-- =========================================
insert into storage.buckets (id, name, public)
values ('guest-stories', 'guest-stories', true)
on conflict (id) do nothing;

-- Storage Security Policies
create policy "Allow public read storage objects"
on storage.objects for select
using (bucket_id = 'guest-stories');

create policy "Allow public insert storage objects"
on storage.objects for insert
with check (bucket_id = 'guest-stories');

create policy "Allow admin delete storage objects"
on storage.objects for delete
to authenticated
using (bucket_id = 'guest-stories');
