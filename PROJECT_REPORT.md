  # CABO TOURS & TRAVELS — COMPLETE PROJECT REPORT

  ---

  ## 1. PROJECT OVERVIEW

  ### Project Name
  **Cabo Tours & Travels Website and AI Travel CRM Platform**

  ### Project Purpose & Target Audience
  Cabo Tours & Travels is a comprehensive travel agency platform designed to showcase curated tour packages, local taxi rental bookings, flight ticketing, and visa assistance. 
  The platform consists of two main sections:
  1. **Customer-Facing Portal:** An interactive landing page and showcase portal that features a sophisticated client-side AI Itinerary Planner. This allows users to design customizable, day-by-day travel schedules based on their budget, interests, group size, and destination preferences.
  2. **Admin Operations Portal:** A back-office CRM (Customer Relationship Management) and CMS (Content Management System) control panel that allows travel administrators to track generated sales leads, log follow-ups, moderate customer reviews and guest stories, and edit dynamic site content.

  The primary target audience comprises:
  * **Domestic and International Leisure Travelers** seeking custom holiday packages (especially in Kerala, Bali, Kashmir, Dubai, and Maldives).
  * **Local Commuters and Tourists** in Kerala seeking high-quality cab services (sedans, SUVs, tempo travellers).
  * **Outbound Travelers** looking for professional flight ticketing and visa processing support.
  * **Travel Agency Managers** needing a consolidated lead pipeline management system to track conversations, record staff follow-up schedules, and manage packages.

  ### Business Goal
  The primary business goal of the website is **lead generation**. Instead of acting as a pure-play e-commerce checkout page, the site captures high-intent customer briefs through multiple touchpoints:
  * Customized AI itinerary requests.
  * General inquiry forms.
  * Reviews and guest stories submission.
  * Taxi booking triggers.
  * Contextual WhatsApp CTAs (Call to Actions).

  All of these forms either log lead rows directly in the Supabase database or pre-fill structured templates that redirect the customer to a chat thread with a booking agent on WhatsApp.

  ### Project Management & Operations
  The system is managed by the agency's operations desk. Staff use the admin panel to view new inquiries, add chronological action logs (notes), set follow-up reminders, and change lead stages (from *new* to *contacted*, *quoted*, *confirmed*, *completed*, or *lost*). They also use the CMS section to update package details, vehicles, destinations, and FAQs without editing source code.

  ### Current Live URL
  The production URL configured in security headers and canonical links is:
  `https://www.cabotourskerala.in`

  ### Date of Report
  **August 4, 2026**

  ---

  ## 2. TECH STACK

  The website is built with a modern, high-performance web development stack designed for rapid loading, interactive customer portals, and dynamic AI integrations:

  | Technology Category | Solution Used | Version / Description |
  | :--- | :--- | :--- |
  | **Core Framework** | React | `^19.2.0` (React 19 Server Functions) |
  | **Routing / Meta** | TanStack Router / Start | Router: `^1.168.25`, Start: `^1.167.50` |
  | **Styling Solution** | Vanilla CSS & Tailwind CSS | v4.2.1 (using `@tailwindcss/vite` compiler) |
  | **Animation Library** | Framer Motion | `^12.41.0` (for page and layout transitions) |
  | **Database Engine** | Supabase (PostgreSQL) | Managed database instance |
  | **Backend Integration** | `@supabase/supabase-js` | `^2.110.0` (client-side and server-side client) |
  | **Asset Storage** | Supabase Storage Buckets | Public buckets: `guest-stories`, `feedback-photos` |
  | **Image Delivery CDN** | Cloudinary | Cloud Name: `hvguispl` (for dynamic resizing CDN) |
  | **Deployment Platform** | Vercel | Serverless host with custom headers & CSP |
  | **Package Manager** | Bun & npm | Workspace contains `bun.lock` and `package-lock.json` |
  | **Build Tool** | Vite | `^8.0.16` |
  | **TypeScript Version**| TypeScript | `^5.8.3` |

  ### Key npm Packages and Dependencies (from package.json)
  * **`@tanstack/react-query` (`^5.83.0`):** Used for cache synchronization and state refetching.
  * **`recharts` (`^2.15.4`):** For data visualization (charts and graphs) inside the Admin CRM Analytics view.
  * **`zod` (`^3.24.2`):** For strict validation of AI-generated responses and configuration payloads.
  * **`react-hook-form` (`^7.71.2`) & `@hookform/resolvers` (`^5.2.2`):** For contact and review form management.
  * **`framer-motion` (`^12.41.0`):** Provides the fluid, glassmorphic UI animations on the client dashboard.
  * **`lucide-react` (`^1.21.0`):** Renders vector icon sets across user components.
  * **`date-fns` (`^4.1.0`):** Simplifies date calculations and display formats.
  * **`embla-carousel-react` (`^8.6.0`):** Powers the home page testimonial and destination sliders.
  * **`vaul` (`^1.1.2`):** Controls mobile drawer slide-overs.
  * **`cmdk` (`^1.1.1`):** Powers the Command Bar (`AICommandBar.tsx`) interface inside the AI workspace.

  ---

  ## 3. PROJECT STRUCTURE

  The directory hierarchy follows a route-based structure with isolated services for business logic and database queries:

  ```
  c:\Users\ASUS\OneDrive\Documents\Cabo-travel-main\src\
  ├── assets/                  # Local WebP assets, fallbacks, and icons
  ├── components/              # Shared React UI components
  │   ├── admin/               # Shared admin components (e.g. AdminHeader)
  │   ├── conversion/          # Inquiry modals (Consultations, Quotes, Itinerary Sharing)
  │   ├── itinerary/           # UI elements for displaying generated itineraries
  │   ├── site/                # Global site utilities (Header, Nav, Footer, WhatsAppFab)
  │   ├── stories/             # Modals for guest journey submissions
  │   ├── ui/                  # Primitives (accordion, dialog, tabs, dropdowns, etc.)
  │   └── workspace/           # Panels for the AI planning interface
  ├── hooks/                   # Custom React Hooks
  ├── lib/                     # Data clients and external helpers
  ├── pages/                   # Core page content views
  │   └── admin/               # Implementation files for Admin CRM and CMS panels
  ├── routes/                  # File-based TanStack Router configs
  │   ├── admin/               # File routes that load pages/admin components
  │   └── agency/              # Internal dashboard for local AI lead listings
  ├── server.ts                # Server entrance file for TanStack Start
  ├── services/                # Backend and external services
  │   ├── ai/                  # AI Provider integrations and validation pipeline
  │   ├── external/            # Integrations with third-party web services
  │   ├── itinerary/           # Backend controllers for itinerary templates
  │   ├── leads/               # Server-side lead processing functions
  │   ├── local/               # Zero-token engines (budget, packing, weather)
  │   ├── navigation/          # Navigation state controllers
  │   └── testimonials/        # Review handlers
  ├── start.ts                 # Startup logic
  ├── styles.css               # Core CSS variables and custom utility rules
  ├── types/                   # TypeScript interfaces and type definitions
  └── utils/                   # Cryptographic hash and caching functions
  ```

  ### Folder and File Summaries

  #### 1. `src/routes/` (Routing Declarations)
  * **`__root.tsx` (Root Shell):** Hosts the global header (`SiteNav`), footer (`SiteFooter`), WhatsApp float button (`WhatsAppFab`), and the general HTML head definitions.
  * **`index.tsx` (Homepage):** The main landing page showcasing destinations, cabs, packages, and guest stories.
  * **`about.tsx` & `contact.tsx`:** Standard company information pages.
  * **`generate.tsx` & `trip.$id.tsx`:** The core AI planner entry point and the final multi-column workspace view.
  * **`destinations.tsx` & `destinations.$slug.tsx`:** Overview list and detail pages of regions.
  * **`packages.tsx`, `domestic-packages.tsx`, `international-packages.tsx`, `kerala.tsx`:** Pages presenting package categories.
  * **`cabs.tsx` & `visa.tsx`:** Service details for taxi rental bookings and visa paperwork support.
  * **`feedback.tsx` & `stories.tsx`:** User pages to submit customer reviews and guest photo-stories.
  * **`sitemap[.]xml.ts`:** Dynamically compiles the website’s XML sitemap for search crawlers.

  #### 2. `src/lib/` (Core Libraries)
  * **`supabase.ts`:** Instantiates the Supabase client utilizing environment tokens.
  * **`cloudinary.ts`:** Compiles URL strings for Cloudinary dynamically (resizing and compression).
  * **`whatsapp.ts`:** Defines WhatsApp message templates and the primary phone number.
  * **`destinations.ts` & `packages.ts`:** Database access functions that query Supabase tables and fallback to local arrays if offline.
  * **`business.ts`:** Centralized store for phone numbers, addresses, socials, and map URLs.
  * **`logLead.ts`:** Standardizes a database insert to log clicks on WhatsApp buttons.

  #### 3. `src/services/ai/` (Itinerary Generation Pipeline)
  * **`providers/`:** Implementation scripts for `GeminiProvider` (main model: `gemini-2.5-flash`) and `GroqProvider` (fallback model: `llama-3.3-70b-versatile`).
  * **`pipeline/PlannerAgent.ts`:** Orchestrates the itinerary creation, routing requests through the fallback stack.
  * **`pipeline/ResponseValidator.ts`:** Executes JSON syntax checks and strictly validates fields against structural types.
  * **`pipeline/ResponseRecovery.ts`:** Evaluates and repairs incomplete JSON objects (injecting missing arrays or fallback IDs).
  * **`pipeline/ResponseMerger.ts`:** Assembles AI itinerary schedules together with local static calculations.
  * **`pipeline/CacheManager.ts`:** Holds cached itineraries inside an in-memory server map keyed by request hashes.
  * **`pipeline/TokenOptimizer.ts`:** Trims user requests before submission to minimize token usage.

  #### 4. `src/pages/admin/` (CRM & CMS Implementation Views)
  * **`AdminLogin.tsx`:** Integrates Supabase password authentication.
  * **`AdminGuard.tsx`:** A route wrapper checking local storage flags before rendering child components.
  * **`AdminDashboard.tsx`:** Lead overview, status modifiers, notes writer, and followup selectors.
  * **`AdminAnalytics.tsx`:** Leads analysis using Recharts widgets.
  * **`AdminDestinations.tsx`, `AdminPackages.tsx`, `AdminVehicles.tsx`:** CMS editors for primary listings.
  * **`AdminFeedback.tsx` & `AdminStories.tsx`:** Moderation queues to review, approve, or reject customer feedback and stories.
  * **`AdminFaqs.tsx`:** Editor for homepage FAQs.

  ### Naming Conventions Used
  * **React Route Files (`src/routes/`):** Named lowercase matching the web path (e.g. `domestic-packages.tsx`). Slugs and variables are bracketed or dollar-prefixed (e.g. `destinations.$slug.tsx`).
  * **Components & Page Files (`src/components/`, `src/pages/`):** PascalCase (e.g., `WorkspaceLayout.tsx`, `AdminDashboard.tsx`).
  * **Helper Utilities (`src/lib/`, `src/utils/`):** camelCase (e.g., `cloudinary.ts`, `logLead.ts`).
  * **Database Columns (PostgreSQL):** snake_case (e.g., `destination_slug`, `created_at`).

  ---

  ## 4. ALL PAGES & ROUTES

  Every route defined in the TanStack Start routing structure is documented below:

  | Path | File Location | Core Purpose | Data Source | SEO Meta Tags |
  | :--- | :--- | :--- | :--- | :--- |
  | **`/`** | `src/routes/index.tsx` | Main agency homepage, testimonials, FAQs | Supabase (feedback, guest_stories, faqs) | **Yes** (Home Page titles, OG, twitter cards) |
  | **`/about`** | `src/routes/about.tsx` | Company history, founder bios, core values | Hardcoded | **Yes** (About Us descriptions, Canonical) |
  | **`/contact`** | `src/routes/contact.tsx` | Inquiry form, map location details, address | Hybrid (logs database leads, opens WhatsApp) | **Yes** (Contact titles, Canonical) |
  | **`/destinations`**| `src/routes/destinations.tsx`| Grid listing of travel regions (Kerala, Bali) | Supabase (falls back to destinations array) | **Yes** (Destinations list SEO meta) |
  | **`/destinations/$slug`**| `src/routes/destinations.$slug.tsx`| Detail features of a destination | Supabase (falls back to local item slug) | **Yes** (Dynamic based on selected slug) |
  | **`/packages`** | `src/routes/packages.tsx` | Main catalogue list of tour packages | Supabase (packages table with fallbacks) | **Yes** (Packages list SEO meta) |
  | **`/domestic-packages`**| `src/routes/domestic-packages.tsx`| Domestic holiday packages overview | Supabase (domestic_destinations table) | **Yes** (Domestic packages titles) |
  | **`/international-packages`**| `src/routes/international-packages.tsx`| International holiday packages overview | Supabase (international_destinations table)| **Yes** (International packages titles) |
  | **`/kerala`** | `src/routes/kerala.tsx` | Details of Kerala getaways and taxi routes | Supabase (kerala_places table) | **Yes** (Kerala tour packages titles) |
  | **`/cabs`** | `src/routes/cabs.tsx` | Fleet catalog, seating details, rates | Supabase (vehicles table with fallback) | **Yes** (Taxi bookings and rental SEO) |
  | **`/visa`** | `src/routes/visa.tsx` | Visa guidelines, flight booking info | Hardcoded | **Yes** (Visa support page meta) |
  | **`/generate`** | `src/routes/generate.tsx` | Interactive questionnaire for AI Planner | Form Input / AI APIs | **Yes** (Itinerary creator SEO titles) |
  | **`/trip/$id`** | `src/routes/trip.$id.tsx` | Custom AI Itinerary planning dashboard | Server Memory Cache (`CacheManager`) | **Yes** (Dynamic based on trip destination) |
  | **`/feedback`** | `src/routes/feedback.tsx` | Review submission form with image uploads | Supabase (uploads files, inserts feedback) | **Yes** (Submit feedback titles) |
  | **`/stories`** | `src/routes/stories.tsx` | Share travel stories page with image upload | Supabase (uploads files, inserts stories) | **Yes** (Share stories titles) |
  | **`/guest-stories`**| `src/routes/guest-stories.tsx`| List grid of approved client travel stories | Supabase (approved guest_stories) | **Yes** (Client testimonials titles) |
  | **`/guest-stories/$slug`**| `src/routes/guest-stories.$slug.tsx`| Individual view of a guest's travel story | Supabase (single guest_story row) | **Yes** (Dynamic based on story details) |
  | **`/sitemap.xml`** | `src/routes/sitemap[.]xml.ts` | Dynamic search engine sitemap xml | Code generation querying database | **N/A** (XML response format) |
  | **`/admin`** | `src/routes/admin/index.tsx` | Redirects to dashboard or login | Redirect logic | **No** (Bypass crawler index) |
  | **`/admin/login`** | `src/routes/admin/login.tsx` | Sign-in interface for administrators | Supabase Auth API | **Yes** (No-Index, Admin Login title) |
  | **`/admin/dashboard`**| `src/routes/admin/dashboard.tsx`| CRM panel: leads list, notes, tasks | Supabase (leads, notes, followups tables) | **Yes** (No-Index header) |
  | **`/admin/analytics`**| `src/routes/admin/analytics.tsx`| CRM analytics, leads graphs | Supabase (leads table aggregated counts) | **Yes** (No-Index header) |
  | **`/admin/cms/destinations`**| `src/routes/admin/cms/destinations.tsx`| CMS manager: destination data | Supabase (destinations, dom/intl tables) | **Yes** (No-Index header) |
  | **`/admin/cms/packages`**| `src/routes/admin/cms/packages.tsx`| CMS manager: package data | Supabase (packages table) | **Yes** (No-Index header) |
  | **`/admin/cms/vehicles`**| `src/routes/admin/cms/vehicles.tsx`| CMS manager: vehicle data | Supabase (vehicles table) | **Yes** (No-Index header) |
  | **`/admin/cms/stories`**| `src/routes/admin/cms/stories.tsx`| Moderate guest stories approvals | Supabase (guest_stories table) | **Yes** (No-Index header) |
  | **`/admin/cms/feedback`**| `src/routes/admin/cms/feedback.tsx`| Moderate client feedback reviews | Supabase (feedback table) | **Yes** (No-Index header) |
  | **`/admin/cms/faqs`** | `src/routes/admin/cms/faqs.tsx` | CMS editor: homepage questions | Supabase (faqs table) | **Yes** (No-Index header) |
  | **`/agency/dashboard`**| `src/routes/agency/dashboard.tsx`| Agent lead overview from AI planner | Local filesystem (`leads_db.json`) | **Yes** (No-Index header) |

  ---

  ## 5. DATABASE SCHEMA (SUPABASE)

  The database runs on Supabase (PostgreSQL) and contains 15 tables supporting CRM, CMS, and customer moderation queues:

  ```mermaid
  erDiagram
      LEADS ||--o{ NOTES : "has"
      LEADS ||--o{ FOLLOWUPS : "has"
      LEADS ||--o{ INTERACTIONS : "redundant"
      LEADS ||--o{ TASKS : "redundant"
      GUEST_STORIES ||--o{ GUEST_STORY_IMAGES : "includes"
      DESTINATIONS ||--o{ PACKAGES : "groups"
  ```

  ### Database Tables Specifications

  #### 1. `leads`
  * **Purpose:** Stores customer sales inquiries (WhatsApp triggers, contact page leads, feedback submissions).
  * **Row Count:** **4 rows**
  * **RLS Status:** **Enabled**. Public insert allowed, select/update/delete restricted to `authenticated` users.
  * **Columns:**
    * `id` (uuid, Primary Key, default: `gen_random_uuid()`)
    * `name` (text, not null)
    * `phone` (text, nullable)
    * `email` (text, nullable)
    * `source` (text, default: `'manual'`) — values: `'manual'`, `'whatsapp'`, `'contact_form'`, `'feedback_form'`
    * `interest` (text, nullable) — values: `'kerala'`, `'international'`, `'cab'`, `'visa'`, etc.
    * `status` (text, not null, default: `'new'`) — values: `'new'`, `'contacted'`, `'quoted'`, `'confirmed'`, `'completed'`, `'lost'`
    * `notes` (text, nullable)
    * `is_deleted` (boolean, default: `false`)
    * `created_at` (timestamptz, default: `now()`)
    * `updated_at` (timestamptz, default: `now()`)

  #### 2. `notes`
  * **Purpose:** CRM log notes appended to specific leads by administrators.
  * **Row Count:** **0 rows**
  * **RLS Status:** **Enabled**. Restrict select/insert/update/delete to `authenticated` users.
  * **Columns:**
    * `id` (uuid, Primary Key, default: `gen_random_uuid()`)
    * `lead_id` (uuid, Foreign Key referencing `leads.id` on delete cascade)
    * `text` (text, not null)
    * `created_at` (timestamptz, default: `now()`)

  #### 3. `followups`
  * **Purpose:** Actionable follow-up calendar reminder dates associated with CRM leads.
  * **Row Count:** **0 rows**
  * **RLS Status:** **Enabled**. Restrict select/insert/update/delete to `authenticated` users.
  * **Columns:**
    * `id` (uuid, Primary Key, default: `gen_random_uuid()`)
    * `lead_id` (uuid, Foreign Key referencing `leads.id` on delete cascade)
    * `due_date` (timestamptz, nullable)
    * `done` (boolean, default: `false`)
    * `created_at` (timestamptz, default: `now()`)

  #### 4. `guest_stories`
  * **Purpose:** User-submitted travel stories displayed on the blog section once approved.
  * **Row Count:** **3 rows**
  * **RLS Status:** **Enabled**. Public select allowed only where `status = 'approved'`. Public inserts permitted (moderation queue). Admin full permissions restricted to `authenticated` users.
  * **Columns:**
    * `id` (uuid, Primary Key, default: `gen_random_uuid()`)
    * `name` (text, not null)
    * `username` (text, nullable)
    * `avatar_url` (text, nullable)
    * `country` (text, nullable)
    * `destination` (text, not null)
    * `story` (text, check length: 1 to 1000 characters)
    * `rating` (integer, check constraint: 1 to 5 stars)
    * `trip_date` (date, not null)
    * `status` (text, default: `'pending'`, constraint: `'pending'`, `'approved'`, `'rejected'`)
    * `slug` (text, unique, not null)
    * `likes` (integer, default: `0`)
    * `created_at` (timestamptz, default: `now()`)

  #### 5. `guest_story_images`
  * **Purpose:** Image URLs associated with client guest stories.
  * **Row Count:** **0 rows**
  * **RLS Status:** **Enabled**. Public read and insert allowed. Full management restricted to `authenticated` users.
  * **Columns:**
    * `id` (uuid, Primary Key, default: `gen_random_uuid()`)
    * `story_id` (uuid, Foreign Key referencing `guest_stories.id` on delete cascade)
    * `image_url` (text, not null)
    * `storage_path` (text, not null)
    * `created_at` (timestamptz, default: `now()`)

  #### 6. `destinations`
  * **Purpose:** Primary CMS table for locations showcased on `/destinations`.
  * **Row Count:** **7 rows**
  * **RLS Status:** **Enabled**. Public read allowed. Insert/update/delete restricted to `authenticated` users.
  * **Columns:**
    * `id` (uuid, Primary Key)
    * `slug` (text, unique, not null)
    * `name` (text, not null)
    * `region` (text) — values: `'Domestic'`, `'International'`, `'Transport'`
    * `country` (text)
    * `image` (text)
    * `hero_image` (text)
    * `tagline` (text)
    * `description` (text)
    * `highlights` (text[]) — array of bullet highlights
    * `best_time` (text)
    * `duration` (text)
    * `starting_from` (text)
    * `href` (text, nullable)
    * `active` (boolean, default: `true`)
    * `sort_order` (integer, default: `0`)
    * `created_at` (timestamptz, default: `now()`)

  #### 7. `packages`
  * **Purpose:** Primary CMS table for vacation packages showcased on `/packages`.
  * **Row Count:** **9 rows**
  * **RLS Status:** **Enabled**. Public read allowed. Write access restricted to `authenticated` users.
  * **Columns:**
    * `id` (uuid, Primary Key)
    * `slug` (text, unique, not null)
    * `title` (text, not null)
    * `destination_slug` (text, Foreign Key referencing `destinations.slug`)
    * `category` (text) — values: `'Backwaters'`, `'Hill Station'`, `'Beach'`, `'Heritage'`, `'Wildlife'`, `'Ayurveda'`, etc.
    * `nights` (integer, not null)
    * `days` (integer, not null)
    * `price` (text, not null)
    * `price_value` (integer, not null)
    * `image` (text, nullable)
    * `inclusions` (text[]) — array of inclusions
    * `itinerary` (jsonb) — day-by-day JSON breakdown: `[{day: 1, title: "", detail: ""}]`
    * `active` (boolean, default: `true`)
    * `sort_order` (integer, default: `0`)
    * `created_at` (timestamptz, default: `now()`)

  #### 8. `vehicles`
  * **Purpose:** Rentable cab catalog details shown on `/cabs`.
  * **Row Count:** **9 rows**
  * **RLS Status:** **Enabled**. Public select allowed. Writes locked to `authenticated`.
  * **Columns:**
    * `id` (uuid, Primary Key)
    * `slug` (text, unique, not null)
    * `name` (text, not null)
    * `capacity` (text)
    * `luggage` (text)
    * `description` (text)
    * `type` (text)
    * `image` (text)
    * `active` (boolean, default: `true`)
    * `sort_order` (integer, default: `0`)
    * `created_at` (timestamptz, default: `now()`)

  #### 9. `feedback`
  * **Purpose:** Moderation queue for short reviews submitted by users on `/feedback`.
  * **Row Count:** **0 rows**
  * **RLS Status:** **Enabled**. Public inserts allowed. Approved listings display publicly. Full access requires `authenticated`.
  * **Columns:**
    * `id` (uuid, Primary Key, default: `gen_random_uuid()`)
    * `name` (text, not null)
    * `message` (text, not null)
    * `rating` (integer, check: 1 to 5)
    * `image_url` (text, nullable)
    * `status` (text, default: `'pending'`) — values: `'pending'`, `'approved'`, `'rejected'`
    * `created_at` (timestamptz, default: `now()`)

  #### 10. `faqs`
  * **Purpose:** General FAQs managed via the CMS dashboard.
  * **Row Count:** **6 rows**
  * **RLS Status:** **Enabled**. Public select permitted. Write restricted to `authenticated`.
  * **Columns:**
    * `id` (uuid, Primary Key)
    * `question` (text, not null)
    * `answer` (text, not null)
    * `active` (boolean, default: `true`)
    * `sort_order` (integer, default: `0`)
    * `created_at` (timestamptz, default: `now()`)

  #### 11. `domestic_destinations`
  * **Purpose:** List of domestic destinations for specialized showcase grids.
  * **Row Count:** **19 rows**
  * **RLS Status:** **Enabled**. Admin managed.
  * **Columns:**
    * `id`, `slug`, `name`, `region`, `tagline`, `image`, `href`, `active`, `sort_order`, `created_at`

  #### 12. `international_destinations`
  * **Purpose:** List of international destinations for specialized showcase grids.
  * **Row Count:** **13 rows**
  * **RLS Status:** **Enabled**. Admin managed.
  * **Columns:**
    * `id`, `slug`, `name`, `region`, `tagline`, `image`, `href`, `to_path`, `active`, `sort_order`, `created_at`

  #### 13. `kerala_places`
  * **Purpose:** Kerala-specific destinations catalogued with travel times from Kochi.
  * **Row Count:** **11 rows**
  * **RLS Status:** **Enabled**. Admin managed.
  * **Columns:**
    * `id`, `slug`, `name`, `tagline`, `travel_time`, `category`, `image`, `best_time`, `duration`, `active`, `sort_order`, `created_at`

  #### 14. `interactions` *(Redundant Table)*
  * **Purpose:** Originally designed for chronologically logging lead events. Currently inactive; the CRM uses the `notes` table instead.
  * **Row Count:** **0 rows**
  * **RLS Status:** **Enabled**.

  #### 15. `tasks` *(Redundant Table)*
  * **Purpose:** Originally designed for tasks. Currently inactive; the CRM uses the `followups` table instead.
  * **Row Count:** **0 rows**
  * **RLS Status:** **Enabled**.

  ---

  ## 6. ADMIN PANEL — COMPLETE DOCUMENTATION

  The administrative panel is a secure back-office application located at `/admin`. It acts as the business control center for the agency.

  ```
        [Admin Route Guard] (Client Check: localStorage key == "true")
                │
        ┌────────┴────────┐
        ▼                 ▼
  [CRM Panel]        [CMS Panels]
  - Leads list       - Packages edit
  - Status update    - Destinations edit
  - Notes entry      - Fleet details
  - Follow-up picker - FAQs editor
                      - Moderation (Stories/Feedback)
  ```

  ### Authentication and Access Checks
  1. **Access URL:** `/admin/login`
  2. **Authentication Method:** Administrators enter their email and password. This is sent to Supabase Auth (`supabase.auth.signInWithPassword({ email, password })`). 
  3. **Frontend Guarding:** On success, a browser key is written: `localStorage.setItem("cabo-admin-auth", "true")`. Any route matching `/admin/*` checks this key inside `AdminGuard.tsx`. If it is absent or not equal to `"true"`, the user is redirected to the login screen.
  4. **Database Authorization:** When requesting data from Supabase, the Supabase client attaches the user's JWT token (held in local storage by the library) to the HTTP headers. The database RLS checks verify this token (`to authenticated`). If an unauthenticated client tries to bypass `AdminGuard` by editing local storage manually, the database queries return empty arrays or authentication errors, keeping the data secure.

  ### CRM Lead Management Section (`/admin/dashboard`)
  The dashboard is split into statistics counters and an interactive lead list:
  * **Metrics Counters:** Displays numbers for Total Leads, New Leads, Contacted Leads, and Booked Leads.
  * **Leads Directory Grid:** Renders all captured lead rows. Shows name, contact info, interest tag, source, and date.
  * **Lead Stage Selector:** A dropdown menu allows staff to update a lead's status:
    `new` ➔ `contacted` ➔ `quoted` ➔ `confirmed` ➔ `completed` or `lost`.
  * **Lead Detail Drawers:** Clicking a lead slides out a comprehensive tracking drawer:
    * **Lead Details:** Edit customer name, phone, email, and travel interest tags.
    * **Action Logs (Notes):** Type comments (e.g. *"Discussed budget options"* or *"Wants 4-star hotels"*). Click *Add Note* to save it to the `notes` table, updating the chronological log.
    * **Follow-up Date Pickers:** Select a calendar date for follow-up reminders. Changes are written to the `followups` table.

  ### CMS Content Management Section
  The CMS includes editors to manage structural data across 7 tables:
  1. **Destinations Editor (`/admin/cms/destinations`):** Add or edit destinations. Admins can update the tagline, description, best time to visit, duration, starting price, and toggle active status.
  2. **Packages Editor (`/admin/cms/packages`):** Manage tour packages. Modify the title, category, night count, pricing value, inclusions array, and day-by-day itineraries.
  3. **Cabs Fleet Editor (`/admin/cms/vehicles`):** Edit rental cars. Manage vehicle names, capacities, luggage, and category tags.
  4. **Moderation Queue for Feedback (`/admin/cms/feedback`):** View customer feedback submissions. Admins check details and click *Approve* (sets `status = 'approved'`, displaying it on the home page) or *Reject* (hides it), or delete the entry.
  5. **Moderation Queue for Guest Stories (`/admin/cms/stories`):** Moderate guest travel stories before they display on the blog.
  6. **FAQ Editor (`/admin/cms/faqs`):** Update homepage FAQs.
  7. **CRM Analytics View (`/admin/analytics`):** Shows graphs representing lead volume over time, popular destinations, lead acquisition sources, and monthly conversion metrics using Recharts.

  ---

  ## 7. FEATURES LIST

  ### 7a. Customer-Facing Features
  * **AI Trip Builder (`/generate`):** An interactive questionnaire asking for destination, travel style, duration, pace, hotel level, and specific interests. Uses AI to build a customized, day-by-day travel plan.
  * **Plan Workspace (`/trip/$id`):** Displays generated trip details:
    * **Timeline View:** Detailed day-by-day itineraries with morning, afternoon, and evening activities.
    * **AI Chat Sidebar:** Allows users to ask questions or type commands to modify their itinerary.
    * **Version History:** Track changes. Users can roll back to previous versions of their plan.
    * **Insights Panel:** Displays dynamic packing recommendations, flight tips, and local weather forecasts.
    * **Travel Score Card:** Rates feasibility based on itinerary pace and travel style.
  * **Lead Conversion Modals:**
    * **Request Custom Quote:** Submits itinerary details to agency agents.
    * **Book Free Consultation:** Triggers consultation bookings.
    * **Share Plan Link:** Copies a unique URL so friends can view the generated itinerary.
  * **Taxi Finder (`/cabs`):** Interactive fleet listing with direct WhatsApp CTAs to book specific vehicles.
  * **Client Reviews submission (`/feedback`):** Allows guests to write reviews, select star ratings, and upload travel photos.
  * **Travel Story Portal (`/stories`, `/guest-stories`):** Allows users to submit structured travel logs with multi-photo uploads. Approved stories display on a dedicated blog layout.

  ### 7b. Admin Features
  * **Supabase Authentication Login:** Integrates password authentication via Supabase Auth.
  * **CRM Sales Pipeline:** Track leads, update status stages, log notes, and configure calendar follow-up dates.
  * **Analytics Board:** Graphs lead distribution by source, interest, and status, and calculates conversion rates.
  * **CMS Control Center:** Edit faqs, vehicles, destinations, and packages without code updates.
  * **Moderation Center:** Approve or reject user-submitted stories and feedback before public display.

  ---

  ## 8. THIRD-PARTY INTEGRATIONS

  The platform integrates several third-party services to support database operations, CDN asset delivery, and communication:

  ### 1. Supabase (Database, Auth & Storage)
  * **Purpose:** Handles the database, user authentication sessions, and file uploads.
  * **Configuration:** Configured with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` variables.
  * **Tier:** Free tier.

  ### 2. Cloudinary (Dynamic Resizing CDN)
  * **Purpose:** Delivers optimized images. Instead of loading heavy local images, the site serves resized WebP images using Cloudinary transforms.
  * **Configuration:** Configured with cloud name `hvguispl`. The utility method `cld(publicId, width)` compiles image URLs:
    `https://res.cloudinary.com/hvguispl/image/upload/f_auto,q_auto,w_{width}/{publicId}`
  * **Tier:** Free tier.

  ### 3. WhatsApp Business Link Routing
  * **Purpose:** Routes customer inquiries to agency operators.
  * **Configuration:** Programmed in `src/lib/whatsapp.ts` targeting phone number `917736406630`.
  * **Tier:** Free.

  ### 4. OpenStreetMap (Interactive Location Maps)
  * **Purpose:** Displays an interactive map of the agency's Calicut office on the contact page.
  * **Configuration:** Embedded via a standard `<iframe>` using a bounding box coordinates URL.
  * **Tier:** Free.

  ### 5. Google Gemini API (AI generation)
  * **Purpose:** Generates trip itineraries and answers chat queries inside the workspace.
  * **Configuration:** Configured with `GEMINI_API_KEY` on the server, using the `gemini-2.5-flash` model.
  * **Tier:** Paid / Free-tier Developer key.

  ### 6. Groq Cloud API (AI Fallback)
  * **Purpose:** Acts as a fallback itinerary generator if Gemini fails.
  * **Configuration:** Configured with `GROQ_API_KEY` on the server, using the `llama-3.3-70b-versatile` model.
  * **Tier:** Paid / Developer API.

  ---

  ## 9. SEO IMPLEMENTATION

  The application implements several search engine optimization (SEO) techniques:

  ### Meta Header Strategy
  Every page utilizes TanStack Router's `head` declaration to inject search tags into the page header. This ensures proper indexing by search engine crawlers:
  * **Custom Titles:** Descriptive page-level title tags (e.g., *"Contact Us | Cabo Tours & Travels — Calicut Travel Agent"*).
  * **Descriptive Meta:** Page summaries highlighting target keywords.
  * **Canonical Headers:** Links to standard URL routes (e.g., `<link rel="canonical" href="https://www.cabotourskerala.in/contact">`) to prevent duplicate content penalties.
  * **No-Index Directives:** Admin sections and dashboards are configured with `"noindex, nofollow"` tags to exclude them from search results.

  ### Open Graph and Twitter Card Formats
  Social sharing previews are defined on customer-facing routes:
  ```html
  <meta property="og:title" content="Create Personalized Tour Itinerary | Cabo Tours & Travels">
  <meta property="og:description" content="Generate your custom tour itinerary using our smart trip builder.">
  <meta property="og:image" content="https://www.cabotourskerala.in/social-preview.png">
  <meta name="twitter:card" content="summary_large_image">
  ```

  ### JSON-LD Structured Data Schema
  The site injects JSON-LD structured schemas to display rich snippets in search results:
  1. **LocalBusiness Schema (Homepage):** Injects agency metadata (phone, founder, Calicut coordinates, address, opening hours) to boost local search rankings.
  2. **BreadcrumbList Schema:** Renders search engine page hierarchies.

  ### Dynamic Sitemap Generator
  The file `src/routes/sitemap[.]xml.ts` generates a search engine sitemap:
  * Fetches active destinations and approved guest stories from Supabase.
  * Appends static page links.
  * Compiles an XML sitemap at `/sitemap.xml` with `<loc>`, `<lastmod>`, and `<changefreq>` tags.

  ---

  ## 10. IMAGE STRATEGY

  The application uses a hybrid image loading strategy to balance visual quality and page speed:

  ### Cloudinary CDN Transformations
  Instead of raw, uncompressed assets, images are requested from the Cloudinary CDN. The helper dynamically appends:
  * `f_auto` (automatically converts the image to modern formats like WebP or AVIF depending on browser support).
  * `q_auto` (applies compression algorithms to reduce file size with minimal visual quality loss).
  * `w_{width}` (resizes the image to match the client's screen size, preventing mobile users from downloading large desktop images).

  ### Supabase Storage Buckets
  Two public storage buckets store user-submitted content:
  1. `guest-stories`: Stores images uploaded when users submit travel logs.
  2. `feedback-photos`: Stores photos uploaded with feedback reviews.

  ### Local Assets Hierarchy
  Original images are saved in `src/assets/` under three main categories:
  1. **General layout elements:** Logo marks (e.g., `cabo-logo-footer.webp`).
  2. **Destinations fallbacks:** Default views for Kerala (`dest-kerala.webp`), Bali, Kashmir, and Dubai.
  3. **Packages fallbacks:** Default thumbnails for Munnar (`pkg-munnar-hills.webp`), Kovalam, and Fort Kochi.

  ### Optimization Best Practices
  * **Modern WebP Formats:** Local assets are saved as `.webp` files, which are smaller than standard PNG or JPG files.
  * **Lazy Loading:** Footer, review, and lower-page images include `loading="lazy"` tags to defer loading until they enter the user's viewport.
  * **Width Restrictions:** Content listings constrain images to bounding boxes, reducing browser layout shifts (CLS).

  ---

  ## 11. WHATSAPP INTEGRATION

  The platform uses WhatsApp as its primary conversion and sales channel, offering several integration points:

  ```
  [User Interaction Point] (Homepage, Cab, Destinations, Contact)
              │
              ▼
    [logLead Callback] (Logs click data in Supabase Leads table)
              │
              ▼
  [Pre-Filled Text Template] (Prepares custom message based on intent)
              │
              ▼
    [WhatsApp Redirect] (Opens wa.me thread with booking agent)
  ```

  ### Conversion Points Across the Site
  1. **Global Footer CTA:** A permanent *"Book on WhatsApp"* link in the footer.
  2. **Global Header Button:** Contact CTA in the navigation bar.
  3. **Cab Booking CTAs:** Every vehicle card on `/cabs` features a booking link. Clicking it opens a chat enquiry for that specific vehicle (e.g., Sedan, Tempo Traveller).
  4. **Destination / Package Cards:** Inquiry triggers on packages and destinations pages.
  5. **Contact Page Form:** Submitting the contact form redirects the user to WhatsApp with their details pre-filled.

  ### Phone Configuration
  The redirect URL links to:
  `https://wa.me/917736406630` (representing Calicut agency contact: `+91 77364 06630`).

  ### Contextual Message Templates
  Messages are customized based on the user's entry point to provide context to the agent:
  * **General inquiries:** `"Hello Cabo Tours & Travels, I would like to know more about your services."`
  * **Specific Packages:** `"Hello Cabo Tours & Travels, I would like more information about the Kerala Backwaters Escape package."`
  * **Specific Cabs:** `"Hello Cabo Tours & Travels, I would like to book or enquire about renting a Sedan (Etios) cab."`
  * **Contact Form submissions:** Pre-fills the user's form details:
    `"Hello Cabo Tours & Travels — trip inquiry from Amal. Destination: Bali. Dates: Oct 10-15. Travellers: 2. Phone: 9876543210."`

  ### Event-Driven Lead Logging
  Clicking a WhatsApp CTA triggers `logLead(interest, source)` in the background:
  * Logs a lead row in the Supabase database.
  * Stores the date and labels it as a `'WhatsApp Lead'`.
  * This ensures that even if the user drops off after redirecting to WhatsApp, the agency captures the click intent in their CRM dashboard.

  ---

  ## 12. PERFORMANCE

  The application incorporates several build optimizations to maintain fast page load times:

  ### Build Optimizations
  * **Vite Code Splitting:** Code is compiled into smaller, logical chunks instead of a single large bundle.
  * **Lazy Routing:** TanStack Start splits page routing bundles, loading the code for a page only when the user navigates to it.
  * **CSS Minification:** Tailwind v4 minifies styles during compilation, reducing file sizes.

  ### User Experience Enhancements
  * **Loading Skeletons:** Renders outline layouts while data fetches, reducing perceived load times.
  * **In-Memory Cache:** Speeds up itinerary loads by checking the cache before calling external AI APIs.
  * **Deferred Location Resolution:** Fetches primary details first and resolves maps in the background to prevent page load delays.

  ---

  ## 13. PROS — WHAT IS DONE WELL

  A detailed review of the platform highlights 15 key technical and architectural strengths:

  1. **Dual AI Provider Fallback Stack:** The generation engine is highly reliable. If the primary Gemini model fails or hits rate limits, the system automatically falls back to Groq.
  2. **Intelligent JSON Recovery System:** The `ResponseRecovery` utility parses and fixes broken AI responses, recovering malformed JSON structures (e.g. inserting missing array fields or formatting strings).
  3. **Multi-Stage Data Validation:** Uses Zod schemas to validate AI responses, ensuring the data structure is complete before rendering.
  4. **Local Zero-Token Engines:** To save API costs and speed up generation, weather forecasts, packing lists, and budget calculations are computed locally on the server instead of calling AI models.
  5. **Detailed Client Diagnostics Menu:** Typing `?dev=true` in the URL opens a developer diagnostics panel showing API latency, token usage, and cache hit metrics.
  6. **Dynamic XML Sitemap:** Automatically compiles a sitemap including dynamic destination and blog slugs to assist SEO.
  7. **Hybrid Data Loaders:** Pages use a hybrid database pattern, querying Supabase for updates while falling back to local files if the query fails.
  8. **Cloudinary CDN Image Delivery:** Automatically compresses, resizes, and converts images to modern formats like WebP.
  9. **Interactive Version Control System:** The AI planner allows users to view changes and roll back to previous versions of their itinerary.
  10. **Rich Visual Layouts:** Features a premium, glassmorphic dark theme with smooth hover animations.
  11. **Responsive Mobile layouts:** Layouts adapt cleanly to mobile, tablet, and desktop screens.
  12. **PostgreSQL Row Level Security (RLS):** Secures database tables from unauthorized updates.
  13. **TanStack Start Server-Client Boundaries:** Server operations (like AI generation and database calls) are separated from the client code.
  14. **WhatsApp Lead Conversion Loop:** Connects web visitors to WhatsApp agents while logging the click details in the CRM database.
  15. **OpenStreetMap Embedded Location Map:** Provides an interactive location map for the Calicut office without requiring Google Maps API keys.

  ---

  ## 14. CONS & KNOWN ISSUES

  An honest review of the codebase reveals several technical weaknesses and limitations:

  1. **Weak Client Route Guarding:** The `AdminGuard` component only checks a local storage key (`cabo-admin-auth === "true"`). Anyone can bypass this check in the browser console. While database tables are secured by RLS, this client-side check is a security weakness.
  2. **Ephemeral In-Memory Itinerary Cache:** Generated itineraries are cached in a temporary server memory map. When the Vercel serverless function spins down, the cache is cleared. This means shared itinerary links (`/trip/$id`) will break once the server restarts.
  3. **Database Schema Redundancies:** The database schema contains duplicate tables. The migration defines `interactions` and `tasks` tables, but the CRM dashboard queries `notes` and `followups` instead.
  4. **Database Storage Omission for Itineraries:** The database does not save generated itineraries. The AI planner relies entirely on the server cache, meaning user plans cannot be permanently retrieved.
  5. **No Image Upload for CMS Editors:** The admin CMS dashboard does not support file uploads. Admins must host images externally and paste the URLs into the form fields.
  6. **Ephemeral Agency Leads Storage:** The local agency dashboard (`/agency/dashboard`) reads and writes to a local file (`leads_db.json`). On Vercel, this filesystem is temporary, meaning these leads are lost when the container restarts.
  7. **Ephemeral Testimonial Likes Count:** The likes count for guest stories is saved in `testimonial_likes_db.json`. These counts are lost during Vercel server restarts.
  8. **Bypassed Session Token Validation:** While the admin dashboard signs in via Supabase Auth, subsequent requests check the local storage flag instead of validating session tokens.
  9. **No Automated Lead Notifications:** The CRM does not trigger email notifications when new leads are submitted, requiring admins to check the dashboard manually.
  10. **Hardcoded WhatsApp Phone Configuration:** The agency phone number is hardcoded in the source code (`whatsapp.ts`). Changing the number requires code edits instead of a database update.
  11. **No Password Reset Options:** The admin panel does not support password recovery or multi-factor authentication.
  12. **Missing Test Coverage:** The project lacks automated tests for the AI generation pipeline and database handlers, which increases the risk of regression errors.
  13. **No Rate Limiting on AI Generation:** The AI itinerary builder lacks rate limiting, leaving it open to API key abuse.

  ---

  ## 15. SECURITY AUDIT

  ### Secured Elements
  * **PostgreSQL Row Level Security (RLS):** All database tables have RLS enabled, protecting data access.
  * **Admin Database Operations:** Writes, edits, and reads on tables like `leads`, `packages`, and `destinations` are restricted to authenticated roles.
  * **Server-Only API Keys:** Gemini and Groq API keys are stored on the server side and are not exposed to the client.

  ### Unsecured Elements
  * **Client-Side Admin Guarding:** The route check relies entirely on `localStorage.getItem("cabo-admin-auth")`, which can be modified by users in the browser console.
  * **Ephemeral JSON files:** The files `leads_db.json` and `testimonial_likes_db.json` are stored in the temporary container filesystem with no access controls.
  * **Environment Variable exposure:** Supabase URL and Anon Key are prefix-exposed to the client (`VITE_SUPABASE_URL`), which is required for Supabase client operations but exposes project references.

  ### Environment Variables Risk Assessment
  The environment variables used in the project are listed below:

  ```
  # SERVER-SIDE ONLY (Secured)
  GEMINI_API_KEY=AQ...   # Google Gemini API key
  GROQ_API_KEY=gsk_...   # Groq API key

  # CLIENT-SIDE EXPOSED (Accessible in Client Bundles)
  GOOGLE_MAPS_API_KEY=AIzaSyBv...      # Google Maps key
  VITE_SUPABASE_URL=https://...        # Supabase API URL
  VITE_SUPABASE_ANON_KEY=sb_publish... # Supabase anonymous client key
  VITE_ADMIN_EMAIL=admin@...           # Reference email credentials
  VITE_ADMIN_PASSWORD=cabo...          # Reference password credentials
  ```

  > [!WARNING]
  > Storing the default reference email and password (`VITE_ADMIN_EMAIL` and `VITE_ADMIN_PASSWORD`) in client-exposed environment variables is a security risk. While they are not directly used in the code, they should be removed from public bundles.

  ### CORS & CSP Policies
  The project defines a strict Content Security Policy (CSP) in `vercel.json`:
  * `default-src 'self'` prevents external script injections.
  * `img-src` limits image loading to trusted domains: `res.cloudinary.com`, `supabase.co`, and `cabotourskerala.in`.
  * `connect-src` limits connections to the project's Supabase database endpoints.

  ---

  ## 16. FUTURE ROADMAP

  To make the platform production-grade, the following features are recommended:

  ```
  ┌────────────────────────────────────────────────────────┐
  │                    ROADMAP SCHEDULE                    │
  ├───────────────────────────┬────────────────────────────┤
  │ Phase 1: Security         │ Phase 2: CRM Automation    │
  │ - Real JWT Validation     │ - Email Notifications      │
  │ - Persistent DB Itinerary │ - Auto WhatsApp Business   │
  ├───────────────────────────┼────────────────────────────┤
  │ Phase 3: CMS & Media      │ Phase 4: Business Features │
  │ - Direct Image Upload     │ - Online Payments          │
  │ - Multi-Language support  │ - Booking Calendars        │
  └───────────────────────────┴────────────────────────────┘
  ```

  1. **Persistent Database Itinerary Storage:** Replace the in-memory cache with a database table (`itineraries`) to save user plans permanently.
  2. **Secure JWT Session Validation:** Update `AdminGuard` to validate the user's session token using `supabase.auth.getSession()` on every route transition.
  3. **Automated Email Notifications:** Integrate an email service like Resend to send confirmation emails to customers and alert admins of new leads.
  4. **WhatsApp Business API Automation:** Use official API endpoints to automatically dispatch itineraries to users via WhatsApp when they submit inquiries.
  5. **Direct Image Uploads:** Integrate Supabase Storage uploads into the CMS dashboard forms.
  6. **Analytics Integration:** Add privacy-friendly analytics tools like Plausible or Google Analytics to track user conversion paths.
  7. **Production Error Monitoring:** Integrate Sentry to track server-side errors and API failures in real time.
  8. **Rate Limiting:** Implement API rate limiting on routes like `/generate` to prevent abuse.
  9. **Booking & Availability System:** Add calendar booking options to help clients schedule meetings or check taxi availability.
  10. **Client Account Portal:** Create user logins so customers can save, edit, and access their generated travel plans.
  11. **Multi-Language localization:** Support languages like Malayalam, Arabic, and Hindi to assist international and local visitors.
  12. **Dynamic Blog Section:** Create a blog section managed through the CMS dashboard.

  ---

  ## 17. DEPLOYMENT & CI/CD

  ### Vercel Deployment Configuration
  Deployments are managed via Vercel. The project configuration file `vercel.json` defines caching and security headers:
  * **Assets Cache Control:** Static assets in `/assets/*` and `/fonts/*` are cached for one year (`max-age=31536000, immutable`).
  * **Frame Protection:** Sets `X-Frame-Options: SAMEORIGIN` to prevent clickjacking attacks.
  * **Content Type Protection:** Sets `X-Content-Type-Options: nosniff`.
  * **Content Security Policy (CSP):** Limits resources to self, Supabase database, and Cloudinary image domains.

  ### Build and Deployment Steps
  1. **Build Command:** `vite build` (or `npm run build` which invokes Vite's production bundler).
  2. **Branch Strategy:** Developments are pushed to the `main` branch. Commits pushed to the repository automatically trigger Vercel preview builds, which go live on production once merged.
  3. **Required Environment Variables:**
    For the application to run successfully in production, the following environment variables must be defined in the Vercel dashboard:
    * `GEMINI_API_KEY` (Required for AI generation)
    * `GROQ_API_KEY` (Required for fallback generation)
    * `VITE_SUPABASE_URL` (Required for database access)
    * `VITE_SUPABASE_ANON_KEY` (Required for database access)

  ### Local Setup Instructions
  To run the project on a local machine:
  1. **Prerequisites:** Install Node.js (v18+) and a package manager (npm or bun).
  2. **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd Cabo-travel-main
    ```
  3. **Install dependencies:**
    ```bash
    npm install
    ```
  4. **Configure environment variables:**
    Create a `.env` file in the root directory and add the required API keys and Supabase credentials.
  5. **Start the development server:**
    ```bash
    npm run dev
    ```
    The local application will run at `http://localhost:3000`.

  ---

  ## 18. PROJECT HANDOFF GUIDE

  A step-by-step onboarding guide for developers joining the project:

  ### Step 1: Clone and Install
  1. Clone the project files to your local environment.
  2. Run `npm install` to install the dependencies listed in `package.json`.

  ### Step 2: Database Setup
  1. Create a Supabase project.
  2. In the Supabase SQL editor, execute the migration files located in `supabase/migrations/`:
    * Execute `20260722000000_create_leads_crm.sql` to create CRM tables (`leads`, `interactions`, `tasks`).
    * Execute `20260723000000_create_guest_stories.sql` to create blog tables (`guest_stories`, `guest_story_images`) and initialize the storage bucket (`guest-stories`).
  3. Create the additional tables in the database schema: `destinations`, `packages`, `vehicles`, `feedback`, `faqs`, `domestic_destinations`, `international_destinations`, and `kerala_places`.

  ### Step 3: Local Configurations
  Create a `.env` file in the root directory containing:
  ```env
  VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
  VITE_SUPABASE_ANON_KEY=<your-anon-key>
  GEMINI_API_KEY=<your-gemini-key>
  GROQ_API_KEY=<your-groq-key>
  ```

  ### Step 5: Run and Test
  1. Run `npm run dev` to start the development server.
  2. Navigate to `/admin/login` and create an administrative user in Supabase to access the dashboard.
  3. Visit `/generate` and run the AI trip builder to verify the AI generation pipeline.
  4. Open the browser console and check for warnings about database connections or missing keys.

  ---

  ## 19. SUMMARY STATUS TABLE

  | Component / Section | Completion Status | Implementation Notes |
  | :--- | :---: | :--- |
  | **Homepage Layout** | ✅ Complete | Showcases destinations, packages, taxi fleet, and testimonials. |
  | **Cab Booking Portal** | ✅ Complete | Lists vehicles, details, and redirects bookings to WhatsApp. |
  | **AI Trip Planner** | ✅ Complete | Interactive day-by-day itinerary creator. |
  | **AI Fallback Stack** | ✅ Complete | Switches from Gemini to Groq if the main API fails. |
  | **Itinerary Workspace** | ✅ Complete | Sidebar chat, travel score calculator, and version history. |
  | **Client Feedback Forms** | ✅ Complete | Submits client feedback reviews and uploads travel images. |
  | **Guest Stories Portal** | ✅ Complete | Displays approved travel journals. |
  | **CRM Admin Dashboard**| ⚠️ Partial | Leads, notes, and followups are managed, but front-end guarding is weak. |
  | **CMS Content Dashboard**| ⚠️ Partial | Manage packages, cabs, and locations, but requires image URLs instead of file uploads. |
  | **Admin Analytics View** | ✅ Complete | Displays lead analytics charts using Recharts. |
  | **XML Sitemap** | ✅ Complete | Dynamically compiles a sitemap including active slugs. |
  | **Cloudinary CDN** | ✅ Complete | Optimizes and resizes images dynamically. |
  | **Server Cache Layer** | ⚠️ Partial | Trip cache is stored in-memory, which resets when server containers sleep. |
  | **Local Lead Logger** | ❌ Ephemeral | The agency dashboard saves leads to a local file, which is lost on server restarts. |
  | **SEO Meta Tags** | ✅ Complete | Head tags defined on all customer-facing routes. |
  | **Supabase RLS Policies**| ✅ Complete | Secures tables with authenticated role permissions. |
  | **WhatsApp Redirection** | ✅ Complete | Logs leads in the database and opens WhatsApp with pre-filled details. |
