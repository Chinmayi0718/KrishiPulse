# KrishiPulse 🌾
> **Every farming decision, in one place.**
> 
> *Design Identity: MONSOON NOIR — Future Agriculture Intelligence*

KrishiPulse is a full-stack, AI-powered smart agriculture platform engineered for Indian farmers. It fuses **Gemini 1.5 Flash** agronomic reasoning, **ESP32 IoT** soil moisture telemetry, real-time **Open-Meteo** satellite weather spray windows, **Agmarknet APMC** mandi prices, and a comprehensive **Government Schemes Centre** with an interactive 8-stage application tracking pipeline.

---

## 🌟 Key Platform Modules

| Module | Core Capability | Tech & Integration |
|---|---|---|
| **Farmer Command Centre** | Real-time farm telemetry dashboard, personalized greeting, live KPI matrix, microclimate radar, and active crop health summary. | React 18, Tailwind Monsoon Noir, Recharts |
| **Government Schemes Centre** | Comprehensive directory of Central & Karnataka welfare subsidies (PM-KISAN, PMFBY, PMKSY, KCC, Raitha Siri, Krishi Bhagya, AIF, PM-KUSUM) with eligibility rules, official links, document checklists, and a stage-by-stage application tracker. | Supabase PostgreSQL, Pipeline Stepper, Verified Feeds |
| **Pulse AI Agronomist** | Multilingual conversational assistant (Kannada, Hindi, English) with voice input (Web Speech API) and text-to-speech audio playback. Provides ICAR-standard dosages and soil-specific guidance. | Google Gemini 1.5 Flash + Web Speech API |
| **PulseVision AI Scanner** | Multimodal crop leaf photograph diagnostic scanner. Detects foliar fungal lesions, blasts, and nutrient chlorosis with organic biocontrol and chemical curative regimens. | Gemini 1.5 Multimodal Vision + CV Rulebase |
| **PulseWater IoT Mesh** | Multi-zone capacitive soil moisture telemetry with token-authenticated ESP32 HTTP ingestion (`POST /api/sensors/readings`), solenoid valve controls, and hardware isolation safety protocols. | Node.js / Express + ESP32 Webhook |
| **Mandi APMC Intelligence** | Daily wholesale benchmark prices (Modal, Min, Max) across Karnataka and inter-state markets (Mandya, Bengaluru, Mysuru, Pune) with interactive 30-day historical trend charts. | Agmarknet / eNAM Data Model + Recharts Area |
| **Weather & Spray Window** | Real-time agro-meteorological forecasting via Open-Meteo API. Auto-calculates safe chemical spray windows to prevent foliar wash-off. | Live Open-Meteo Satellite API |
| **Crops & ICAR Calendar** | Active plot holdings CRUD with growth stage tracking (Sowing ➔ Maturity ➔ Harvest) plus scientific crop lifecycle timelines from ICAR & UAS Bengaluru. | Full CRUD + Stepper Visualization |
| **Farmer Profile & Settings** | Kisan registry identity, GPS coordinates, land parameters, soil classification, irrigation type, and language preference. | Supabase PostgreSQL + Local Storage Fallback |

---

## 🎨 Visual Identity: Monsoon Noir

- **Palette:** Deep midnight black (`#050a07`), dark forest charcoal (`#07100b`, `#10211a`), electric lime (`#a3e635`, `#bef264`), emerald glow (`#10b981`), and atmospheric cyan (`#06b6d4`).
- **Typography:** Warm ivory (`#fdfbf7`, `#f4efe4`) on high-contrast dark surfaces with JetBrains Mono data readouts.
- **Micro-Animations:** Atmospheric monsoon rain streaks, topographic contour vector layers, glowing radar pulses, and smooth skeleton shimmers.

---

## 🛠️ Full-Stack Architecture

```
KrishiPulse/
├── src/
│   ├── components/
│   │   ├── common/        # MonsoonNoirAtmosphere, AnimatedCounter, StatCard, DemoBanner
│   │   ├── dashboard/     # WeatherWidget, SoilMoistureWidget, CropStatusSummary, QuickActions
│   │   └── layout/        # Navbar (GPS & Language), Sidebar, MobileNav, AppLayout, Footer
│   ├── context/           # AppContext (global state, telemetry pulses, Open-Meteo fetch)
│   ├── data/              # Realistic Indian agro datasets (Mandya, Agmarknet, Central/State schemes)
│   ├── pages/             # LandingPage, DashboardPage, AssistantPage, CropVisionPage,
│   │                      # PulseWaterPage, SchemesPage, MandiPage, WeatherPage, MyCropsPage, ProfilePage
│   ├── services/          # weatherService (Open-Meteo), storageService (CRUD & persistence)
│   └── types/             # Complete TypeScript interface definitions
├── server/
│   └── index.ts           # Express REST API (Auth, ESP32 Sensor endpoint, Gemini AI, Vision, Schemes)
├── supabase/
│   └── schema.sql         # 18 PostgreSQL tables, RLS security policies, and Realtime publications
├── vercel.json            # Vercel deployment SPA routing & build configuration
├── tailwind.config.js     # Custom Monsoon Noir theme extension
└── package.json           # Dependencies & concurrent scripts
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or v20+)
- npm or pnpm

### 1. Installation
```bash
git clone https://github.com/Chinmayi0718/KrishiPulse.git
cd KrishiPulse
git checkout feature/krishipulse-redesign
npm install
```

### 2. Environment Setup (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(KrishiPulse runs completely out-of-the-box in local demo mode even without API keys! If you provide `GEMINI_API_KEY` or `SUPABASE_URL`, the application automatically connects to live services).*

### 3. Run Locally (Full-Stack Mode)
Run both the Express backend and the Vite frontend simultaneously:
```bash
npm run dev:all
```
- **Frontend:** `http://localhost:3000` (or next free port)
- **Backend API:** `http://localhost:5000`
- **ESP32 Ingestion:** `POST http://localhost:5000/api/sensors/readings`

*(Alternatively, run just the frontend via `npm run dev`).*

### 4. Production Build
```bash
npm run build
```
Generates an optimized, type-checked production bundle in `dist/`.

---

## 📡 IoT Hardware Ingestion (ESP32)

Physical microcontrollers can post field sensor readings to the local or deployed endpoint:

```bash
curl -X POST http://localhost:5000/api/sensors/readings \
  -H "X-Device-Token: krishipulse-esp32-secret-2026" \
  -H "Content-Type: application/json" \
  -d '{
    "device_id": "ESP32-NODE-MANDYA-01",
    "zone_id": "zone-1",
    "zone_name": "Zone A — Sugarcane Plot",
    "soil_moisture": 42.5,
    "temperature": 28.2,
    "humidity": 65.4,
    "battery_level": 94.0
  }'
```

> **Hardware Safety Warning:** Never power heavy inductive pump motor coils directly from ESP32 GPIO pins. Always route control signals through an optically isolated 5V relay module with a flyback diode.

---

## ☁️ Deployment

### Deploy to Vercel
1. Push code to your GitHub repository.
2. Import project into Vercel.
3. Vercel automatically detects `vercel.json` with Vite framework presets and SPA routing rewrites.
4. Add environment variables (`GEMINI_API_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`) in the Vercel dashboard.

---

## 📜 License
MIT License. Crafted for Indian Farmers & Hackathon Product Innovation.
