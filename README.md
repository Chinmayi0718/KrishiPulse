# KrishiPulse 🌱
> **Empowering Every Farmer with Intelligent Agriculture.**

KrishiPulse is an AI-powered smart agriculture platform designed to help Indian smallholders make smarter farming decisions through hyper-local weather insights, simulated crop disease diagnosis (CropVision), precision soil moisture telemetry (PulseWater), and an AI agronomist assistant.

---

## 🌟 Product Highlights & Hackathon Highlights

- **100% Free & Local:** Built strictly adhering to zero-paid API and zero-paid AI constraints. Runs entirely in your browser with deterministic agronomy simulations and local storage persistence.
- **Calibrated for Indian Agriculture:** Seeded with realistic parameters for **Mandya District, Karnataka** (Sugarcane, Paddy, Ragi, Tomato, Red Sandy Loam soil, and Cauvery Basin weather).
- **Startup-Grade Design:** Forest and fresh green palette (`#1B4332`, `#2D6A4F`, `#40916C`), sleek typography, subtle shadows, responsive desktop, tablet, and mobile navigation.
- **Interactive Telemetry:** Live sensor bar gauges, interactive solenoid valve toggles, and Recharts water analytics.
- **Dual Remedy Protocol:** Disease diagnosis offers both biological/traditional inputs (Panchagavya, *Pseudomonas*) and ICAR-aligned chemical intervention thresholds.

---

## 📱 Modules Overview

| Module | Purpose | Key Features |
|---|---|---|
| **Marketing Landing Page** | Public product showcase | Hero, product intro, feature grid, 4-step workflow, interactive module preview, impact stats. |
| **Farmer Dashboard** | Daily farm command center | Personalized greeting (*Namaskara, Ramesh Gowda!*), weather badge, soil moisture bars, active crop overview, urgent field alerts, and AI agronomy recommendations. |
| **CropVision AI** | Simulated plant disease diagnosis | Crop photo uploader, image preview, 4 one-click demonstration presets (Paddy Blast, Sugarcane Red Rot, Tomato Blight, Healthy Leaf), confidence score, and treatment protocols. |
| **PulseWater** | Smart irrigation telemetry | 4 simulated field zone probes (Zone A Sugarcane, Zone B Paddy, Zone C Ragi, Zone D Tomato), interactive valve toggles, and 7-day water consumption Area/Bar charts. |
| **AI Farmer Assistant** | Agronomy chatbot | Interactive conversational assistant with preset question chips for Crop Health, Irrigation, Soil Care, and Government Schemes (PMKSY, Raitha Siri). |
| **Weather & Spray Radar** | Agro-meteorological guidance | Current simulated weather (Mandya: 29°C, 64% humidity, wind 11 km/h), 7-day forecast cards, and morning spraying window advisory. |
| **My Crops** | Crop portfolio management | Full CRUD: add, edit, and delete crop records with growth stage progress bars, acreage calculation, and localStorage persistence. |
| **Farmer Profile** | Kisan registry settings | Editable farmer profile (Name, Location, Language dialect, Soil classification, Land size in acres, and Irrigation type). |

---

## 🛠️ Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 3
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Data Visualizations:** Recharts (AreaChart, BarChart)
- **State & Storage:** React Context API + LocalStorage persistence

---

## 🚀 Quick Start Instructions

### Prerequisites
- Node.js (v18 or v20+)
- npm or pnpm

### 1. Clone & Navigate
```bash
git clone https://github.com/Chinmayi0718/KrishiPulse.git
cd KrishiPulse
git checkout feature/krishipulse-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` (or the port Vite prints in your console).

### 4. Build for Production
```bash
npm run build
```
Generates production-ready, minified bundles into the `dist/` directory with zero TypeScript errors.

---

## 🧪 Demonstration Walkthrough (For Judges & Evaluators)

1. **Landing Page (`/`):**
   - Scroll through the hero section, startup problem statement, and 4-step workflow.
   - Click any interactive module tab in the preview section or click **"Launch Farmer App"**.
2. **Farmer Dashboard (`/dashboard`):**
   - View personalized greeting for **Ramesh Gowda** in Mandya, Karnataka.
   - Observe live telemetry pills, weather preview, and crop health status.
   - Note the simulated alert: *Zone C (Ragi) moisture is critically low (33%)*.
3. **PulseWater (`/pulsewater`):**
   - View the 4 field zones.
   - Click the **"Turn On Valve"** button for Zone C (Ragi) or Zone A (Sugarcane). Watch the state toggle to *Valve Open (Flowing)* instantly.
   - Toggle between **Liters Used (Area)** and **Target vs Actual (Bars)** charts to inspect 7-day water telemetry.
4. **CropVision AI (`/cropvision`):**
   - Click any of the **Quick Demo Test Presets** (e.g. *Paddy Leaf Blast* or *Tomato Early Blight*).
   - Alternatively, upload any custom photo from your computer to see the image preview.
   - Inspect the simulated neural diagnosis: **94.2% confidence**, symptoms checklist, and toggle between *Organic Remedies* and *Chemical Treatments*.
5. **AI Farmer Assistant (`/assistant`):**
   - Click any category filter (e.g. *Crop Health* or *Schemes*).
   - Click on the question chip: *"What government subsidies are available for micro-irrigation?"*
   - Watch the simulated assistant stream the PMKSY 90% subsidy guidance and related quick replies.
6. **My Crops (`/crops`):**
   - Click **"Add New Crop"** to create a new crop (e.g. Cotton or Maize).
   - Verify that the acreage bar updates and the new card appears.
   - Click the pencil icon to edit or the trash icon to delete.
7. **Farmer Profile (`/profile`):**
   - Update farmer name, preferred language, or land holding and click **Save Profile**.
   - Notice data persists across browser reloads via `localStorage`.
   - Click **"Reset Demo Account"** at any time to restore the baseline Mandya dataset.

---

## 🔒 Offline & Cost Policy
KrishiPulse was intentionally architected to operate with **zero paid API dependencies**. All sensor readings, disease models, and agricultural recommendations run deterministically inside the client application, ensuring that smallholder farmers and evaluators never encounter paywalls, broken API quotas, or credential leaks.

---

## 📄 License
MIT © 2026 KrishiPulse Team
