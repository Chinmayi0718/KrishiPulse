-- ==============================================================================
-- KRISHIPULSE SMART AGRICULTURE PLATFORM — SUPABASE POSTGRESQL SCHEMA
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. USERS TABLE
create table if not exists public.users (
  id uuid primary key default uuid_generate_v4(),
  email text unique,
  phone text unique,
  role text default 'farmer',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. FARMER PROFILES TABLE
create table if not exists public.farmer_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  kisan_id text unique not null,
  name text not null,
  phone text,
  preferred_language text default 'en',
  total_land_acres numeric(6, 2) default 4.5,
  soil_type text default 'Red Sandy Loam',
  irrigation_type text default 'Drip Irrigation',
  location text default 'Mandya Rural',
  district text default 'Mandya',
  state text default 'Karnataka',
  taluk text default 'Maddur',
  latitude numeric(9, 6) default 12.5229,
  longitude numeric(9, 6) default 76.8976,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. FARMS TABLE
create table if not exists public.farms (
  id uuid primary key default uuid_generate_v4(),
  farmer_id uuid references public.farmer_profiles(id) on delete cascade,
  name text not null,
  survey_number text,
  total_area_acres numeric(6, 2) not null,
  soil_type text,
  water_source text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. CROPS TABLE
create table if not exists public.crops (
  id uuid primary key default uuid_generate_v4(),
  farmer_id uuid references public.farmer_profiles(id) on delete cascade,
  name text not null,
  variety text not null,
  planting_date date not null,
  growth_stage text not null, -- 'Sowing' | 'Vegetative' | 'Flowering' | 'Maturity' | 'Harvesting'
  area_acres numeric(6, 2) not null,
  health text default 'Optimal', -- 'Optimal' | 'Attention' | 'Critical'
  expected_harvest date not null,
  field_location text,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. CROP HEALTH RECORDS
create table if not exists public.crop_health_records (
  id uuid primary key default uuid_generate_v4(),
  crop_id uuid references public.crops(id) on delete set null,
  disease_name text not null,
  scientific_name text,
  confidence numeric(5, 2),
  severity text, -- 'Mild' | 'Moderate' | 'Severe'
  image_url text,
  symptoms jsonb default '[]'::jsonb,
  organic_remedies jsonb default '[]'::jsonb,
  chemical_treatments jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. SOIL MOISTURE RECORDS (TELEMETRY)
create table if not exists public.soil_moisture_records (
  id uuid primary key default uuid_generate_v4(),
  zone_id text not null,
  zone_name text not null,
  crop_name text,
  current_moisture numeric(5, 2) not null,
  target_moisture numeric(5, 2) not null,
  status text not null,
  soil_temp_c numeric(5, 2),
  battery_level numeric(5, 2) default 95,
  recorded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. WEATHER RECORDS
create table if not exists public.weather_records (
  id uuid primary key default uuid_generate_v4(),
  location text not null,
  latitude numeric(9, 6) not null,
  longitude numeric(9, 6) not null,
  temperature numeric(5, 2) not null,
  humidity numeric(5, 2) not null,
  wind_speed numeric(5, 2) not null,
  precipitation_probability numeric(5, 2),
  condition text not null,
  spray_window_safe boolean default true,
  recorded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. IRRIGATION RECORDS
create table if not exists public.irrigation_records (
  id uuid primary key default uuid_generate_v4(),
  zone_id text not null,
  valve_status text not null, -- 'Open' | 'Closed'
  duration_minutes integer default 0,
  water_liters numeric(10, 2) default 0,
  triggered_by text default 'manual', -- 'manual' | 'automated_sensor'
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. CHAT HISTORY (AI FARMER ASSISTANT)
create table if not exists public.chat_history (
  id uuid primary key default uuid_generate_v4(),
  farmer_id uuid references public.farmer_profiles(id) on delete cascade,
  sender text not null, -- 'user' | 'assistant'
  message text not null,
  category text default 'general',
  language text default 'en',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. NOTIFICATIONS
create table if not exists public.notifications (
  id uuid primary key default uuid_generate_v4(),
  farmer_id uuid references public.farmer_profiles(id) on delete cascade,
  title text not null,
  message text not null,
  type text default 'info', -- 'info' | 'warning' | 'alert' | 'success'
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
alter table public.users enable row level security;
alter table public.farmer_profiles enable row level security;
alter table public.farms enable row level security;
alter table public.crops enable row level security;
alter table public.crop_health_records enable row level security;
alter table public.soil_moisture_records enable row level security;
alter table public.weather_records enable row level security;
alter table public.irrigation_records enable row level security;
alter table public.chat_history enable row level security;
alter table public.notifications enable row level security;

-- Public demo/authenticated policies
create policy "Allow all read operations" on public.farmer_profiles for select using (true);
create policy "Allow all update operations" on public.farmer_profiles for update using (true);
create policy "Allow all read crops" on public.crops for select using (true);
create policy "Allow all insert crops" on public.crops for insert with check (true);
create policy "Allow all update crops" on public.crops for update using (true);
create policy "Allow all delete crops" on public.crops for delete using (true);
create policy "Allow all read soil" on public.soil_moisture_records for select using (true);
create policy "Allow all read irrigation" on public.irrigation_records for select using (true);
create policy "Allow all insert irrigation" on public.irrigation_records for insert with check (true);
create policy "Allow all read chat" on public.chat_history for select using (true);
create policy "Allow all insert chat" on public.chat_history for insert with check (true);

-- Enable Supabase Realtime Publication
alter publication supabase_realtime add table public.crops;
alter publication supabase_realtime add table public.soil_moisture_records;
alter publication supabase_realtime add table public.irrigation_records;
alter publication supabase_realtime add table public.notifications;
