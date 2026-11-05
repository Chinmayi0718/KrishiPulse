-- ==============================================================================
-- KRISHIPULSE — MONSOON NOIR FUTURE AGRICULTURE INTELLIGENCE
-- SUPABASE POSTGRESQL PRODUCTION SCHEMA
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. USERS & PROFILES
create table if not exists public.profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid,
  kisan_id text unique not null,
  name text not null,
  phone text,
  email text,
  preferred_language text default 'en', -- 'en' | 'kn' | 'hi'
  village text default 'Koppa',
  taluk text default 'Maddur',
  district text default 'Mandya',
  state text default 'Karnataka',
  latitude numeric(9, 6) default 12.5229,
  longitude numeric(9, 6) default 76.8976,
  total_land_acres numeric(6, 2) default 5.2,
  soil_type text default 'Red Sandy Loam',
  irrigation_type text default 'Drip & Borewell',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. FARMS
create table if not exists public.farms (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  survey_number text,
  area_acres numeric(6, 2) not null,
  soil_type text,
  water_source text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. CROPS
create table if not exists public.crops (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade,
  farm_id uuid references public.farms(id) on delete set null,
  name text not null,
  variety text not null,
  season text default 'Kharif', -- 'Kharif' | 'Rabi' | 'Zaid'
  planting_date date not null,
  growth_stage text not null, -- 'Sowing' | 'Vegetative' | 'Flowering' | 'Maturity' | 'Harvesting'
  area_acres numeric(6, 2) not null,
  health text default 'Optimal', -- 'Optimal' | 'Attention' | 'Critical'
  expected_harvest date not null,
  field_location text,
  target_yield_quintals numeric(6, 2),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. CROP ACTIVITIES (LOG OF FARMING EVENTS)
create table if not exists public.crop_activities (
  id uuid primary key default uuid_generate_v4(),
  crop_id uuid references public.crops(id) on delete cascade,
  activity_type text not null, -- 'Sowing' | 'Irrigation' | 'Fertilizer' | 'Pesticide' | 'Weeding' | 'Harvesting'
  description text not null,
  dosage text,
  performed_on date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. SENSOR DEVICES (ESP32 HARDWARE HUBS)
create table if not exists public.sensor_devices (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade,
  device_id text unique not null,
  device_name text not null,
  mac_address text,
  api_token text not null,
  status text default 'online', -- 'online' | 'offline' | 'calibrating'
  battery_level numeric(5, 2) default 92.5,
  firmware_version text default 'v1.4.2-noir',
  last_ping timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. SENSOR READINGS (TELEMETRY)
create table if not exists public.sensor_readings (
  id uuid primary key default uuid_generate_v4(),
  device_id text references public.sensor_devices(device_id) on delete cascade,
  zone_id text not null, -- 'zone-1' | 'zone-2' | 'zone-3'
  zone_name text not null,
  crop_name text,
  soil_moisture numeric(5, 2) not null, -- percentage 0-100%
  target_moisture numeric(5, 2) not null default 65.0,
  temperature numeric(5, 2) not null, -- degrees Celsius
  humidity numeric(5, 2) not null, -- air humidity %
  soil_ec numeric(5, 2), -- electrical conductivity (mS/cm)
  is_simulated boolean default false,
  recorded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. IRRIGATION EVENTS
create table if not exists public.irrigation_events (
  id uuid primary key default uuid_generate_v4(),
  zone_id text not null,
  valve_status text not null, -- 'Open' | 'Closed'
  duration_minutes integer default 0,
  water_liters numeric(10, 2) default 0,
  triggered_by text default 'automated_moisture_sensor', -- 'manual' | 'automated_moisture_sensor' | 'schedule'
  recorded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. WEATHER SNAPSHOTS
create table if not exists public.weather_snapshots (
  id uuid primary key default uuid_generate_v4(),
  location text not null,
  latitude numeric(9, 6) not null,
  longitude numeric(9, 6) not null,
  temperature numeric(5, 2) not null,
  humidity numeric(5, 2) not null,
  wind_speed numeric(5, 2) not null,
  precipitation_probability numeric(5, 2),
  weather_condition text not null,
  spray_window_safe boolean default true,
  advisory_notes text,
  source text default 'open-meteo',
  recorded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. AI CONVERSATIONS & MESSAGES (PULSE AI)
create table if not exists public.ai_conversations (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade,
  title text default 'Agricultural Guidance',
  language text default 'en',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.ai_messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid references public.ai_conversations(id) on delete cascade,
  sender text not null, -- 'user' | 'assistant'
  content text not null,
  category text default 'general', -- 'crop' | 'irrigation' | 'pest' | 'weather' | 'scheme'
  audio_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. CROP ANALYSES (PULSEVISION)
create table if not exists public.crop_analyses (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade,
  crop_type text not null,
  image_url text not null,
  symptoms_detected jsonb default '[]'::jsonb,
  probable_diagnosis text not null,
  confidence_score numeric(5, 2) not null,
  severity_level text not null, -- 'Low' | 'Moderate' | 'Severe'
  organic_remedies jsonb default '[]'::jsonb,
  chemical_treatments jsonb default '[]'::jsonb,
  preventive_measures jsonb default '[]'::jsonb,
  disclaimer text default 'Simulated agronomic observation. Consult local KVK officer before intensive chemical spraying.',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11. GOVERNMENT SCHEMES & SOURCES
create table if not exists public.scheme_sources (
  id uuid primary key default uuid_generate_v4(),
  source_name text not null,
  portal_url text not null,
  department text not null,
  last_checked timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.government_schemes (
  id uuid primary key default uuid_generate_v4(),
  code text unique not null,
  name text not null,
  name_kannada text,
  name_hindi text,
  category text not null, -- 'Financial' | 'Insurance' | 'Irrigation' | 'Equipment' | 'Soil & Inputs' | 'Infrastructure'
  level text default 'Central', -- 'Central' | 'Karnataka State' | 'Maharashtra State'
  target_audience text not null,
  financial_benefit text not null,
  description text not null,
  eligibility_criteria jsonb default '[]'::jsonb,
  required_documents jsonb default '[]'::jsonb,
  application_process text not null,
  official_portal_url text not null,
  published_date date not null,
  last_verified_date date not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 12. SCHEME REAL-TIME / CURATED UPDATES
create table if not exists public.scheme_updates (
  id uuid primary key default uuid_generate_v4(),
  scheme_id uuid references public.government_schemes(id) on delete cascade,
  title text not null,
  summary text not null,
  update_type text default 'Announcement', -- 'Deadline Extension' | 'Budget Release' | 'Eligibility Change' | 'Announcement'
  source_url text,
  published_date date not null,
  verified_timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 13. FARMER SAVED SCHEMES
create table if not exists public.farmer_saved_schemes (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade,
  scheme_id uuid references public.government_schemes(id) on delete cascade,
  saved_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (profile_id, scheme_id)
);

-- 14. FARMER SCHEME APPLICATIONS (TRACKER PIPELINE)
create table if not exists public.farmer_scheme_applications (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade,
  scheme_id uuid references public.government_schemes(id) on delete cascade,
  application_number text,
  status text not null default 'Interested',
  -- Pipeline: 'Interested' | 'Eligibility Verification' | 'Documents Pending' | 'Ready to Apply' | 'Applied' | 'Under Review' | 'Approved' | 'Rejected' | 'Benefit Received'
  applied_date date,
  estimated_disbursement_date date,
  benefit_received_amount numeric(10, 2),
  notes text,
  status_history jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 15. SCHEME APPLICATION DOCUMENTS CHECKLIST
create table if not exists public.scheme_application_documents (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid references public.farmer_scheme_applications(id) on delete cascade,
  document_name text not null,
  is_uploaded boolean default false,
  file_url text,
  verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 16. FARMER NOTIFICATIONS
create table if not exists public.farmer_notifications (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  message text not null,
  type text default 'info', -- 'alert' | 'weather' | 'scheme' | 'iot' | 'info'
  link_url text,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 17. MANDI PRICES (AGMARKNET / eNAM)
create table if not exists public.mandi_prices (
  id uuid primary key default uuid_generate_v4(),
  commodity text not null,
  variety text,
  market_name text not null,
  district text not null,
  state text not null,
  min_price numeric(8, 2) not null,
  max_price numeric(8, 2) not null,
  modal_price numeric(8, 2) not null,
  arrival_quantity_tonnes numeric(8, 2),
  price_unit text default 'Rs/Quintal',
  trend text default 'steady', -- 'up' | 'down' | 'steady'
  reported_date date not null,
  source text default 'Agmarknet / eNAM (Demo Feed)',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 18. AUDIT LOGS
create table if not exists public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  actor_id text,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb default '{}'::jsonb,
  ip_address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
create index if not exists idx_crops_profile on public.crops(profile_id);
create index if not exists idx_sensor_readings_device_zone on public.sensor_readings(device_id, zone_id, recorded_at desc);
create index if not exists idx_schemes_category on public.government_schemes(category);
create index if not exists idx_schemes_level on public.government_schemes(level);
create index if not exists idx_scheme_applications_profile on public.farmer_scheme_applications(profile_id);
create index if not exists idx_mandi_commodity_date on public.mandi_prices(commodity, reported_date desc);
create index if not exists idx_notifications_profile on public.farmer_notifications(profile_id, is_read);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ==============================================================================
alter table public.profiles enable row level security;
alter table public.farms enable row level security;
alter table public.crops enable row level security;
alter table public.crop_activities enable row level security;
alter table public.sensor_devices enable row level security;
alter table public.sensor_readings enable row level security;
alter table public.irrigation_events enable row level security;
alter table public.weather_snapshots enable row level security;
alter table public.ai_conversations enable row level security;
alter table public.ai_messages enable row level security;
alter table public.crop_analyses enable row level security;
alter table public.government_schemes enable row level security;
alter table public.scheme_sources enable row level security;
alter table public.scheme_updates enable row level security;
alter table public.farmer_saved_schemes enable row level security;
alter table public.farmer_scheme_applications enable row level security;
alter table public.scheme_application_documents enable row level security;
alter table public.farmer_notifications enable row level security;
alter table public.mandi_prices enable row level security;
alter table public.audit_logs enable row level security;

-- Demo / Authenticated Policies (Allows reads and write operations for farmer demo)
create policy "Allow all read profiles" on public.profiles for select using (true);
create policy "Allow all update profiles" on public.profiles for update using (true);
create policy "Allow all insert profiles" on public.profiles for insert with check (true);

create policy "Allow all read crops" on public.crops for select using (true);
create policy "Allow all insert crops" on public.crops for insert with check (true);
create policy "Allow all update crops" on public.crops for update using (true);
create policy "Allow all delete crops" on public.crops for delete using (true);

create policy "Allow all read sensors" on public.sensor_devices for select using (true);
create policy "Allow all read sensor_readings" on public.sensor_readings for select using (true);
create policy "Allow all insert sensor_readings" on public.sensor_readings for insert with check (true);

create policy "Allow all read irrigation" on public.irrigation_events for select using (true);
create policy "Allow all insert irrigation" on public.irrigation_events for insert with check (true);

create policy "Allow all read schemes" on public.government_schemes for select using (true);
create policy "Allow all read scheme_updates" on public.scheme_updates for select using (true);
create policy "Allow all read saved_schemes" on public.farmer_saved_schemes for select using (true);
create policy "Allow all insert saved_schemes" on public.farmer_saved_schemes for insert with check (true);
create policy "Allow all delete saved_schemes" on public.farmer_saved_schemes for delete using (true);

create policy "Allow all read applications" on public.farmer_scheme_applications for select using (true);
create policy "Allow all insert applications" on public.farmer_scheme_applications for insert with check (true);
create policy "Allow all update applications" on public.farmer_scheme_applications for update using (true);

create policy "Allow all read mandi" on public.mandi_prices for select using (true);
create policy "Allow all read notifications" on public.farmer_notifications for select using (true);

-- Realtime publication
alter publication supabase_realtime add table public.crops;
alter publication supabase_realtime add table public.sensor_readings;
alter publication supabase_realtime add table public.irrigation_events;
alter publication supabase_realtime add table public.farmer_notifications;
alter publication supabase_realtime add table public.farmer_scheme_applications;
