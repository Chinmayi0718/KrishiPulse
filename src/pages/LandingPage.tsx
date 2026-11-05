import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout,
  ScanLine,
  Droplets,
  BotMessageSquare,
  CloudSun,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Landmark,
  Radio,
  FileCheck2,
  Calendar,
  Layers,
  Zap,
} from 'lucide-react';
import { MonsoonNoirAtmosphere } from '../components/common/MonsoonNoirAtmosphere';
import { AnimatedCounter } from '../components/common/AnimatedCounter';

export const LandingPage: React.FC = () => {
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<'iot' | 'ai' | 'vision' | 'schemes'>('iot');

  return (
    <div className="min-h-screen bg-noir-950 text-ivory-100 relative overflow-hidden selection:bg-lime-accent selection:text-noir-950 font-sans">
      {/* Ambient Monsoon Noir Particles & Contours */}
      <MonsoonNoirAtmosphere showGrid={true} showContours={true} intensity="high" />

      {/* Top Floating Glass Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-noir-900/80 backdrop-blur-2xl border-b border-noir-700/80 shadow-noir-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-accent via-emerald-neon to-cyan-deep flex items-center justify-center text-noir-950 font-black shadow-glow-lime group-hover:scale-105 transition-transform">
              <Sprout className="w-5 h-5 text-noir-950" />
            </div>
            <div>
              <span className="font-extrabold text-xl text-ivory-100 tracking-tight">KrishiPulse</span>
              <span className="block text-[9px] text-lime-accent font-mono uppercase tracking-widest">
                Monsoon Noir
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-mono text-ivory-300">
            <a href="#features" className="hover:text-lime-glow transition">Intelligence Suite</a>
            <a href="#iot" className="hover:text-lime-glow transition">ESP32 IoT</a>
            <a href="#schemes" className="hover:text-lime-glow transition">Schemes Centre</a>
            <a href="#mandi" className="hover:text-lime-glow transition">Mandi APMC</a>
            <Link to="/weather" className="hover:text-lime-glow transition">Weather</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-lime-accent text-noir-950 font-mono font-bold text-xs flex items-center gap-2 hover:bg-lime-glow transition shadow-glow-lime hover:scale-[1.02]"
            >
              <span>Launch Command Centre</span>
              <ArrowRight className="w-4 h-4 text-noir-950" />
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-noir-850/90 border border-noir-700 text-xs font-mono text-lime-glow shadow-noir-card">
            <span className="w-2 h-2 rounded-full bg-lime-accent animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-lime-accent" />
            <span>FUTURE AGRICULTURE INTELLIGENCE • CAUVERY BASIN EDITION</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-ivory-100">
            Every farming decision, <br />
            <span className="text-gradient-lime">in one place.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-ivory-300 max-w-2xl mx-auto leading-relaxed">
            KrishiPulse unifies Gemini 1.5 Flash agronomic AI, ESP32 IoT soil moisture telemetry, real-time Open-Meteo
            spray windows, APMC mandi trends, and a comprehensive Government Scheme tracker for Indian farmers.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-lime-accent text-noir-950 font-mono font-extrabold text-sm flex items-center justify-center gap-2.5 hover:bg-lime-glow transition shadow-glow-lime hover:scale-105"
            >
              <Zap className="w-4 h-4 text-noir-950" />
              <span>Enter Farmer Command Centre</span>
              <ArrowRight className="w-4 h-4 text-noir-950" />
            </Link>

            <Link
              to="/schemes"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-noir-850 hover:bg-noir-800 text-ivory-200 border border-noir-700 text-sm font-mono font-semibold flex items-center justify-center gap-2 transition"
            >
              <Landmark className="w-4 h-4 text-amber-solar" />
              <span>Government Schemes Centre</span>
            </Link>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-8 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-noir-900/90 border border-noir-700/80 shadow-noir-card">
              <div className="text-xl sm:text-2xl font-mono font-black text-lime-glow">
                <AnimatedCounter value={9} suffix=" Schemes" />
              </div>
              <div className="text-[11px] text-ivory-400 font-mono mt-0.5">PM-KISAN, PMFBY, KCC & State</div>
            </div>

            <div className="p-4 rounded-2xl bg-noir-900/90 border border-noir-700/80 shadow-noir-card">
              <div className="text-xl sm:text-2xl font-mono font-black text-cyan-ice">
                <AnimatedCounter value={28} suffix="%" />
              </div>
              <div className="text-[11px] text-ivory-400 font-mono mt-0.5">Water Conserved via Drip IoT</div>
            </div>

            <div className="p-4 rounded-2xl bg-noir-900/90 border border-noir-700/80 shadow-noir-card">
              <div className="text-xl sm:text-2xl font-mono font-black text-emerald-bright">
                <AnimatedCounter value={94.6} decimals={1} suffix="%" />
              </div>
              <div className="text-[11px] text-ivory-400 font-mono mt-0.5">Blast Lesion CV Confidence</div>
            </div>

            <div className="p-4 rounded-2xl bg-noir-900/90 border border-noir-700/80 shadow-noir-card">
              <div className="text-xl sm:text-2xl font-mono font-black text-amber-solar">
                <AnimatedCounter value={100} suffix="% Free" />
              </div>
              <div className="text-[11px] text-ivory-400 font-mono mt-0.5">Open-Meteo & Zero Paid APIS</div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE PRODUCT PREVIEW COCKPIT */}
        <div className="mt-14 max-w-5xl mx-auto rounded-3xl noir-card p-4 sm:p-7 border border-noir-700 shadow-noir-elevated">
          {/* Tab Selector Buttons */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-4 border-b border-noir-700/80 scrollbar-none">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveInteractiveTab('iot')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition ${
                  activeInteractiveTab === 'iot'
                    ? 'bg-cyan-moisture/20 text-cyan-ice border border-cyan-moisture/40 shadow-glow-cyan'
                    : 'bg-noir-850 text-ivory-400 hover:text-ivory-200'
                }`}
              >
                <Droplets className="w-3.5 h-3.5" />
                <span>PulseWater IoT</span>
              </button>

              <button
                onClick={() => setActiveInteractiveTab('ai')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition ${
                  activeInteractiveTab === 'ai'
                    ? 'bg-lime-accent/20 text-lime-glow border border-lime-accent/40 shadow-glow-lime'
                    : 'bg-noir-850 text-ivory-400 hover:text-ivory-200'
                }`}
              >
                <BotMessageSquare className="w-3.5 h-3.5" />
                <span>Pulse AI Agronomist</span>
              </button>

              <button
                onClick={() => setActiveInteractiveTab('vision')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition ${
                  activeInteractiveTab === 'vision'
                    ? 'bg-emerald-500/20 text-emerald-bright border border-emerald-500/40 shadow-glow-emerald'
                    : 'bg-noir-850 text-ivory-400 hover:text-ivory-200'
                }`}
              >
                <ScanLine className="w-3.5 h-3.5" />
                <span>PulseVision Multimodal</span>
              </button>

              <button
                onClick={() => setActiveInteractiveTab('schemes')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition ${
                  activeInteractiveTab === 'schemes'
                    ? 'bg-amber-solar/20 text-amber-solar border border-amber-solar/40 shadow-glow-amber'
                    : 'bg-noir-850 text-ivory-400 hover:text-ivory-200'
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>Schemes Pipeline</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-ivory-400">
              <span className="w-2 h-2 rounded-full bg-lime-accent animate-ping" />
              <span>Cockpit Simulation</span>
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="pt-6">
            {activeInteractiveTab === 'iot' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-noir-850 border border-noir-700">
                  <div className="flex items-center justify-between text-xs text-ivory-400 font-mono mb-2">
                    <span>Zone A — Sugarcane</span>
                    <span className="text-amber-solar font-bold">42% (Need Water)</span>
                  </div>
                  <div className="w-full bg-noir-700 h-2 rounded-full overflow-hidden mb-2">
                    <div className="bg-amber-solar h-full w-[42%]" />
                  </div>
                  <p className="text-[11px] text-ivory-300">Target: 65% • Drip Valve Ready • 45 min cycle advised</p>
                </div>

                <div className="p-4 rounded-2xl bg-noir-850 border border-noir-700">
                  <div className="flex items-center justify-between text-xs text-ivory-400 font-mono mb-2">
                    <span>Zone B — Paddy Wetland</span>
                    <span className="text-emerald-bright font-bold">78% (Optimal)</span>
                  </div>
                  <div className="w-full bg-noir-700 h-2 rounded-full overflow-hidden mb-2">
                    <div className="bg-emerald-bright h-full w-[78%]" />
                  </div>
                  <p className="text-[11px] text-ivory-300">Target: 75% • Submerged bed saturated • Valve closed</p>
                </div>

                <div className="p-4 rounded-2xl bg-noir-850 border border-noir-700">
                  <div className="flex items-center justify-between text-xs text-ivory-400 font-mono mb-2">
                    <span>Zone C — Tomato Polyhouse</span>
                    <span className="text-cyan-ice font-bold">58% (Normal)</span>
                  </div>
                  <div className="w-full bg-noir-700 h-2 rounded-full overflow-hidden mb-2">
                    <div className="bg-cyan-ice h-full w-[58%]" />
                  </div>
                  <p className="text-[11px] text-ivory-300">Target: 60% • Fertigation 19:19:19 active</p>
                </div>
              </div>
            )}

            {activeInteractiveTab === 'ai' && (
              <div className="p-5 rounded-2xl bg-noir-850 border border-noir-700 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-lime-glow font-bold">
                  <BotMessageSquare className="w-4 h-4 text-lime-accent" />
                  <span>Farmer: "How much nitrogen should I top-dress on Sugarcane at tillering stage?"</span>
                </div>
                <div className="text-xs text-ivory-200 leading-relaxed pl-6 border-l-2 border-lime-accent space-y-1">
                  <p className="font-semibold text-ivory-100">
                    Pulse AI: Top-dress 65 kg Urea/acre along with 25 kg MOP at 90 days after planting.
                  </p>
                  <p className="text-ivory-300">
                    Ensure adequate soil moisture before application. Incorporate *Azospirillum* biofertilizer around root
                    zones and mulch cane trash to avoid nitrogen volatilization.
                  </p>
                </div>
              </div>
            )}

            {activeInteractiveTab === 'vision' && (
              <div className="p-5 rounded-2xl bg-noir-850 border border-noir-700 flex flex-col sm:flex-row items-center gap-4 text-xs">
                <div className="w-20 h-20 rounded-xl bg-noir-750 border border-noir-700 flex items-center justify-center flex-shrink-0 text-lime-accent font-mono text-[10px] text-center p-2">
                  [Paddy Leaf Sample]
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-ivory-100">Rice Blast (Magnaporthe oryzae)</span>
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[10px] font-bold">
                      Confidence 94.6%
                    </span>
                  </div>
                  <p className="text-ivory-300 leading-relaxed">
                    Bio-control recommendation: Spray *Pseudomonas fluorescens* @ 10g/L water early morning. Avoid excessive
                    synthetic nitrogen until lesions desiccate.
                  </p>
                </div>
              </div>
            )}

            {activeInteractiveTab === 'schemes' && (
              <div className="p-5 rounded-2xl bg-noir-850 border border-noir-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lime-accent/15 text-lime-glow font-bold">
                      PMKSY Micro-Irrigation
                    </span>
                    <span className="text-[10px] text-amber-solar font-mono font-bold">Status: Under Review</span>
                  </div>
                  <div className="text-sm font-bold text-ivory-100">Drip Irrigation 90% Subsidy Application</div>
                  <p className="text-ivory-300 text-[11px] mt-0.5">
                    Field inspection completed by ADH Maddur. Geo-tagging verified on e-Krishi portal.
                  </p>
                </div>
                <Link
                  to="/schemes"
                  className="px-4 py-2 rounded-xl bg-noir-750 hover:bg-noir-700 border border-noir-700 text-lime-glow font-mono font-bold text-xs whitespace-nowrap"
                >
                  View Scheme Pipeline
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CORE MODULES FEATURE SECTION */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-lime-accent">
            End-to-End Agronomy Platform
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ivory-100">
            Engineered for Ground-Level Impact
          </h2>
          <p className="text-xs sm:text-sm text-ivory-300">
            From soil sensors buried in Mandya's red loams to the latest PM-KISAN DBT installments, every feature delivers
            tangible value without expensive recurring subscription costs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Pulse AI */}
          <div className="rounded-3xl noir-card p-6 border border-noir-700/80 hover:border-lime-accent/40 transition shadow-noir-card flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-lime-accent/15 text-lime-accent flex items-center justify-center border border-lime-accent/30 shadow-glow-lime">
                <BotMessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-ivory-100">Pulse AI Agronomist</h3>
              <p className="text-xs text-ivory-300 leading-relaxed">
                Context-aware multimodal agronomist powered by Gemini 1.5 Flash. Converses in Kannada, Hindi, and English
                with voice query support and exact ICAR-calibrated fertilizer dosages.
              </p>
            </div>
            <Link
              to="/assistant"
              className="mt-5 text-xs text-lime-accent hover:underline font-mono font-bold flex items-center gap-1"
            >
              <span>Consult Pulse AI</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: PulseVision */}
          <div className="rounded-3xl noir-card p-6 border border-noir-700/80 hover:border-emerald-500/40 transition shadow-noir-card flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-bright flex items-center justify-center border border-emerald-500/30 shadow-glow-emerald">
                <ScanLine className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-ivory-100">PulseVision Diagnosis</h3>
              <p className="text-xs text-ivory-300 leading-relaxed">
                Computer vision analysis of foliar symptoms, fungal blast spots, and nutrient deficiencies. Supplies
                both organic biocontrols and chemical curative options with clear disclaimers.
              </p>
            </div>
            <Link
              to="/cropvision"
              className="mt-5 text-xs text-emerald-bright hover:underline font-mono font-bold flex items-center gap-1"
            >
              <span>Scan Crop Leaf</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: PulseWater IoT */}
          <div className="rounded-3xl noir-card p-6 border border-noir-700/80 hover:border-cyan-moisture/40 transition shadow-noir-card flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-moisture/15 text-cyan-ice flex items-center justify-center border border-cyan-moisture/30 shadow-glow-cyan">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-ivory-100">PulseWater ESP32 Mesh</h3>
              <p className="text-xs text-ivory-300 leading-relaxed">
                Multi-zone capacitive soil moisture telemetry with secure token-authenticated HTTP ingestion
                (<code className="text-cyan-ice">POST /api/sensors/readings</code>). Trigger irrigation with automated thresholds.
              </p>
            </div>
            <Link
              to="/pulsewater"
              className="mt-5 text-xs text-cyan-ice hover:underline font-mono font-bold flex items-center gap-1"
            >
              <span>View Zone Telemetry</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: Schemes Centre */}
          <div className="rounded-3xl noir-card p-6 border border-noir-700/80 hover:border-amber-solar/40 transition shadow-noir-card flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-solar/15 text-amber-solar flex items-center justify-center border border-amber-solar/30 shadow-glow-amber">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-ivory-100">Government Schemes Centre</h3>
              <p className="text-xs text-ivory-300 leading-relaxed">
                Central & Karnataka schemes (PM-KISAN, PMFBY, KCC, Raitha Siri, Krishi Bhagya). Full application tracker
                pipeline from 'Interested' to 'Benefit Received' with document checklists.
              </p>
            </div>
            <Link
              to="/schemes"
              className="mt-5 text-xs text-amber-solar hover:underline font-mono font-bold flex items-center gap-1"
            >
              <span>Track Subsidies</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 5: Mandi APMC */}
          <div className="rounded-3xl noir-card p-6 border border-noir-700/80 hover:border-lime-accent/40 transition shadow-noir-card flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-lime-accent/15 text-lime-glow flex items-center justify-center border border-lime-accent/30 shadow-glow-lime">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-ivory-100">Mandi Market Intelligence</h3>
              <p className="text-xs text-ivory-300 leading-relaxed">
                Wholesale commodity prices across Karnataka APMC yards (Mandya, Bengaluru, Mysuru, Pune). Interactive
                30-day price trend charts with best-time-to-sell recommendations.
              </p>
            </div>
            <Link
              to="/mandi"
              className="mt-5 text-xs text-lime-accent hover:underline font-mono font-bold flex items-center gap-1"
            >
              <span>Check APMC Prices</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 6: Weather & Spray */}
          <div className="rounded-3xl noir-card p-6 border border-noir-700/80 hover:border-cyan-moisture/40 transition shadow-noir-card flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-moisture/15 text-cyan-ice flex items-center justify-center border border-cyan-moisture/30 shadow-glow-cyan">
                <CloudSun className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-ivory-100">Weather & Precision Spray</h3>
              <p className="text-xs text-ivory-300 leading-relaxed">
                Live Open-Meteo satellite feed with 7-day precipitation forecasts, wind velocity limits, and automated
                agricultural spray safety advisories to prevent foliar wash-off.
              </p>
            </div>
            <Link
              to="/weather"
              className="mt-5 text-xs text-cyan-ice hover:underline font-mono font-bold flex items-center gap-1"
            >
              <span>View Weather Radar</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10 relative">
        <div className="rounded-3xl p-8 sm:p-12 noir-card border border-lime-accent/30 shadow-glow-lime text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-lime-accent flex items-center justify-center text-noir-950 mx-auto font-black shadow-glow-lime">
            <Sprout className="w-6 h-6 text-noir-950" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-ivory-100">
            Ready to experience future agriculture intelligence?
          </h2>

          <p className="text-xs sm:text-sm text-ivory-300 max-w-xl mx-auto leading-relaxed">
            Join the Mandya agro-telemetry trial or configure your own farm parameters with zero paid API requirements.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/dashboard"
              className="px-8 py-3.5 rounded-2xl bg-lime-accent text-noir-950 font-mono font-bold text-sm flex items-center gap-2 hover:bg-lime-glow transition shadow-glow-lime hover:scale-105"
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="w-4 h-4 text-noir-950" />
            </Link>

            <Link
              to="/crops"
              className="px-6 py-3.5 rounded-2xl bg-noir-850 hover:bg-noir-800 text-ivory-200 border border-noir-700 text-sm font-mono font-semibold transition"
            >
              Crop Calendar & ICAR Knowledge
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
