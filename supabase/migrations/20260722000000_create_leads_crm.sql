-- =========================================
-- LEADS
-- =========================================
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  source text default 'manual',        -- 'manual', 'whatsapp', 'contact_form', 'feedback_form'
  interest text,                        -- 'kerala', 'international', 'cab', 'visa', etc.
  status text not null default 'new',   -- new -> contacted -> quoted -> confirmed -> completed | lost
  notes text,
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================
-- INTERACTIONS (timeline entries per lead)
-- =========================================
create table if not exists public.interactions (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  type text not null,                   -- 'call', 'whatsapp', 'note', 'quote_sent', 'email'
  content text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

-- =========================================
-- TASKS (follow-up reminders per lead)
-- =========================================
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  note text not null,
  due_at timestamptz,
  done boolean not null default false,
  created_at timestamptz not null default now()
);

-- =========================================
-- INDEXES
-- =========================================
create index if not exists idx_leads_status        on public.leads(status) where is_deleted = false;
create index if not exists idx_leads_created_at    on public.leads(created_at desc);
create index if not exists idx_interactions_lead   on public.interactions(lead_id, created_at desc);
create index if not exists idx_tasks_lead_due      on public.tasks(lead_id, due_at) where done = false;

-- =========================================
-- updated_at TRIGGER
-- =========================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger trg_leads_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

-- =========================================
-- ROW LEVEL SECURITY (RLS)
-- =========================================
alter table public.leads enable row level security;
alter table public.interactions enable row level security;
alter table public.tasks enable row level security;

-- Admin full access policies (scoped to authenticated role)
create policy "Admins full access - leads"
on public.leads for all
to authenticated
using (true)
with check (true);

create policy "Admins full access - interactions"
on public.interactions for all
to authenticated
using (true)
with check (true);

create policy "Admins full access - tasks"
on public.tasks for all
to authenticated
using (true)
with check (true);
