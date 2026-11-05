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
  Layers,
  ChevronRight,
  Heart,
  Globe2,
  ShieldCheck,
  TrendingUp,
  Activity,
  Sun,
  Compass,
  Play,
} from 'lucide-react';
import { FarmSceneBackground } from '../components/common/FarmSceneBackground';
import { FloatingLeaves } from '../components/common/FloatingLeaves';

export const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cropvision' | 'pulsewater' | 'assistant' | 'weather'>('cropvision');

  const featureCards = [
    {
      title: 'CropVision AI Scanner',
      subtitle: 'Simulated Computer Vision',
      desc: 'Instant crop leaf lesion identification, pathogen classification, and tailored bio-control & chemical remedy regimens.',
      icon: ScanLine,
      gradient: 'from-emerald-600 via-teal-600 to-emerald-800',
      badge: 'Neural Vision',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      link: '/cropvision',
      highlight: '94.2% blast accuracy',
    },
    {
      title: 'PulseWater Telemetry',
      subtitle: 'Precision Soil Moisture',
      desc: 'Probe soil capacitive moisture across plots. Trigger automated solenoid valve actuators with 24%+ water conservation.',
      icon: Droplets,
      gradient: 'from-sky-500 via-teal-500 to-blue-700',
      badge: 'IoT Mesh',
      badgeColor: 'bg-sky-100 text-sky-800',
      link: '/pulsewater',
      highlight: '4 active field zones',
    },
    {
      title: 'AI Farmer Assistant',
      subtitle: 'Knowledgebase Agronomist',
      desc: 'Instant answers for organic recipes (Jeevamrutha, Panchagavya), pest thresholds, and government subsidies (PMKSY 90%).',
      icon: BotMessageSquare,
      gradient: 'from-emerald-700 via-forest-800 to-teal-900',
      badge: 'Local AI',
      badgeColor: 'bg-teal-100 text-teal-800',
      link: '/assistant',
      highlight: 'UAS Bangalore protocols',
    },
    {
      title: 'Weather & Spray Radar',
      subtitle: 'Hyper-local Agro-Forecast',
      desc: '7-day microclimate projections, wind velocity drift warnings, and morning spraying window recommendations.',
      icon: CloudSun,
      gradient: 'from-amber-500 via-orange-500 to-emerald-800',
      badge: 'Micro-Radar',
      badgeColor: 'bg-amber-100 text-amber-900',
      link: '/weather',
      highlight: 'Spray window alerts',
    },
    {
      title: 'My Crop Portfolio',
      subtitle: 'Field Acreage Inventory',
      desc: 'Full lifecycle tracking of planting schedules, growth stages, acreage distribution, and harvest calendar milestones.',
      icon: Layers,
      gradient: 'from-forest-800 via-emerald-800 to-slate-900',
      badge: 'Farm Manager',
      badgeColor: 'bg-lime-100 text-lime-900',
      link: '/crops',
      highlight: '4.5 Acres tracked',
    },
    {
      title: 'Kisan Identity & Dialect',
      subtitle: 'Localized Farmer Profile',
      desc: 'Calibrated for Mandya, Karnataka with support for Kannada, Hindi, and English regional farming dialects.',
      icon: Globe2,
      gradient: 'from-teal-700 via-emerald-800 to-emerald-950',
      badge: 'Multilingual',
      badgeColor: 'bg-emerald-100 text-emerald-900',
      link: '/profile',
      highlight: 'Kannada & English ready',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6FAF6] text-slate-800 flex flex-col selection:bg-emerald-200 selection:text-emerald-950 relative overflow-hidden">
      {/* Top Demo Notification Pill */}
      <div className="relative z-50 bg-gradient-to-r from-emerald-950 via-forest-900 to-teal-950 text-emerald-200 px-4 py-2.5 text-xs text-center border-b border-emerald-600/40 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
        <span>
          <strong className="text-white">KrishiPulse Live Hackathon Edition:</strong> Zero paid APIs • 100% offline-ready simulated telemetry for Mandya, Karnataka
        </span>
      </div>

      {/* Main Glassmorphic Navbar */}
      <nav className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-emerald-100/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-700 via-forest-800 to-teal-900 flex items-center justify-center text-white shadow-lg shadow-emerald-900/20 group-hover:scale-105 group-hover:rotate-3 transition-transform">
              <Sprout className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <span className="font-extrabold text-xl text-emerald-950 tracking-tight block">
                KrishiPulse 🌱
              </span>
              <span className="text-[10px] text-emerald-700 font-bold tracking-wider uppercase block -mt-1">
                Intelligent Agriculture
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-600">
            <a href="#features" className="hover:text-emerald-700 transition">Features</a>
            <a href="#how-it-works" className="hover:text-emerald-700 transition">How It Works</a>
            <a href="#modules" className="hover:text-emerald-700 transition">Live Demo</a>
            <a href="#stats" className="hover:text-emerald-700 transition">Impact</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-700 via-forest-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-900/25 transition-all duration-200 hover:shadow-glow-green hover:scale-[1.02] flex items-center gap-2 group"
            >
              <span>Launch Farmer App</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Scenic Farm Backdrop & Animated Floating Leaves */}
      <section className="relative pt-16 pb-24 sm:pt-24 sm:pb-36 overflow-hidden">
        {/* Scenic Farm Background SVG */}
        <FarmSceneBackground opacity={0.88} />
        <FloatingLeaves />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Animated Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-emerald-950 text-xs font-extrabold border border-emerald-300 shadow-md shadow-emerald-950/10">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
              <span className="text-emerald-900">
                AI-Powered Smart Farming • Mandya, Karnataka Edition
              </span>
            </div>

            {/* Eye-Catching Headline */}
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.12] drop-shadow-md">
              Empowering Every Farmer with{' '}
              <span className="bg-gradient-to-r from-emerald-300 via-amber-200 to-teal-200 bg-clip-text text-transparent">
                Intelligent Agriculture
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-medium drop-shadow-xs max-w-2xl mx-auto">
              Smarter agronomic decisions through hyper-local weather alerts, simulated crop disease
              vision, precision soil moisture telemetry, and an automated irrigation network—all running
              locally without API costs.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-emerald-950 font-black text-sm shadow-xl shadow-amber-500/25 hover:shadow-glow-gold transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2.5 group"
              >
                <Play className="w-4 h-4 fill-emerald-950 text-emerald-950" />
                <span>Launch Farmer Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/cropvision"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/90 hover:bg-white text-emerald-950 font-extrabold text-sm border border-white/80 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
              >
                <ScanLine className="w-4 h-4 text-emerald-700" />
                <span>Test CropVision Scanner</span>
              </Link>
            </div>

            {/* Feature Highlights Row */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-200 pt-6 font-semibold drop-shadow-xs">
              <span className="flex items-center gap-1.5 bg-black/20 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Paid API Keys Required</span>
              </span>
              <span className="flex items-center gap-1.5 bg-black/20 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Instant LocalStorage Persistence</span>
              </span>
              <span className="flex items-center gap-1.5 bg-black/20 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Mobile & Tablet Responsive</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Banner */}
      <section id="stats" className="border-y border-emerald-100 bg-white/95 backdrop-blur py-12 relative z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100/80">
              <div className="text-3xl sm:text-5xl font-black bg-gradient-to-br from-emerald-800 to-teal-700 bg-clip-text text-transparent">
                24%+
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
                Water Saved (Simulated Telemetry)
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100/80">
              <div className="text-3xl sm:text-5xl font-black bg-gradient-to-br from-amber-600 to-orange-600 bg-clip-text text-transparent">
                94.2%
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
                Leaf Lesion Pattern Match
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100/80">
              <div className="text-3xl sm:text-5xl font-black bg-gradient-to-br from-sky-700 to-blue-700 bg-clip-text text-transparent">
                4.5 Ac
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
                Mandya Agricultural Baseline
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100/80">
              <div className="text-3xl sm:text-5xl font-black bg-gradient-to-br from-teal-700 to-emerald-700 bg-clip-text text-transparent">
                ₹0
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
                100% Free • Zero Cloud Subscriptions
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Colorful Animated Feature Cards Grid */}
      <section id="features" className="py-24 relative bg-farm-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-4 py-1.5 rounded-full shadow-xs">
              Complete Agricultural Tech Stack
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-4">
              Engineered for Every Stage of the Farm Lifecycle
            </h2>
            <p className="text-sm text-slate-600 mt-2 font-medium">
              From seed treatment and moisture telemetry to disease intervention and harvest projection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {featureCards.map((feat) => {
              const Icon = feat.icon;
              return (
                <Link
                  key={feat.title}
                  to={feat.link}
                  className="group relative bg-white/90 backdrop-blur rounded-3xl p-7 border border-emerald-100 shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle top gradient accent */}
                  <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${feat.gradient}`} />

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feat.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-200 ${feat.badgeColor}`}>
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-800 transition">
                      {feat.title}
                    </h3>
                    <p className="text-xs font-bold text-emerald-700 mt-0.5 mb-2.5">
                      {feat.subtitle}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-emerald-800">
                    <span className="text-[11px] font-semibold text-slate-400">
                      ⚡ {feat.highlight}
                    </span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Explore</span>
                      <ChevronRight className="w-4 h-4 text-emerald-600" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4-Step How It Works Workflow */}
      <section id="how-it-works" className="py-24 bg-white border-y border-emerald-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-200 px-4 py-1.5 rounded-full">
              Farmer Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-4">
              How KrishiPulse Works in the Field
            </h2>
            <p className="text-sm text-slate-600 mt-2 font-medium">
              Simple, high-impact workflow tailored for Indian agricultural environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-100 text-center space-y-3 relative group hover:bg-emerald-50 transition">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-800 text-white font-black text-xl flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform">
                1
              </div>
              <h4 className="font-extrabold text-base text-slate-900">Configure Farm</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Set location (Mandya, Karnataka), total land holding, soil classification, and preferred dialect.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-sky-50/50 border border-sky-100 text-center space-y-3 relative group hover:bg-sky-50 transition">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-600 to-teal-700 text-white font-black text-xl flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform">
                2
              </div>
              <h4 className="font-extrabold text-base text-slate-900">Check Telemetry</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Monitor 4 simulated field zone moisture levels, probe battery health, and 7-day weather outlooks.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-amber-50/50 border border-amber-100 text-center space-y-3 relative group hover:bg-amber-50 transition">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-600 text-white font-black text-xl flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform">
                3
              </div>
              <h4 className="font-extrabold text-base text-slate-900">Scan Crop Leaves</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Upload crop photo or pick demo presets in CropVision to detect blast, red rot, or blight.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-teal-50/50 border border-teal-100 text-center space-y-3 relative group hover:bg-teal-50 transition">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-700 to-emerald-800 text-white font-black text-xl flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform">
                4
              </div>
              <h4 className="font-extrabold text-base text-slate-900">Automate & Consult</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Toggle solenoid valves in PulseWater and ask the AI agronomist for organic bio-fertilizer recipes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Module Preview Showcase */}
      <section id="modules" className="py-24 bg-gradient-to-b from-[#F6FAF6] to-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-4 py-1.5 rounded-full">
              Live Interactive Simulator
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-4">
              Explore the KrishiPulse Platform
            </h2>
            <p className="text-sm text-slate-600 mt-2 font-medium">
              Click the modules below to preview real-time simulated diagnostics and telemetry.
            </p>
          </div>

          {/* Module Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {[
              { id: 'cropvision', label: '🌿 CropVision AI', icon: ScanLine },
              { id: 'pulsewater', label: '💧 PulseWater IoT', icon: Droplets },
              { id: 'assistant', label: '🤖 AI Assistant', icon: BotMessageSquare },
              { id: 'weather', label: '🌦️ Weather Radar', icon: CloudSun },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 shadow-sm ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-emerald-800 to-forest-800 text-white shadow-glow-green scale-105'
                      : 'bg-white border border-emerald-100 text-slate-700 hover:bg-emerald-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Eye-Catching Interactive Preview Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-emerald-200/80 shadow-xl max-w-4xl mx-auto relative overflow-hidden">
            {activeTab === 'cropvision' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Neural Vision Simulator</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                    Paddy Leaf Blast (*Magnaporthe oryzae*)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Scans leaf spindle lesions, computes 94.2% diagnostic match confidence, and generates
                    organic *Pseudomonas fluorescens* foliar protocols with chemical thresholds.
                  </p>
                  <Link
                    to="/cropvision"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-700 text-white font-extrabold text-xs shadow-md hover:shadow-glow-green transition-transform hover:scale-105"
                  >
                    <span>Test Full CropVision Scanner</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-gradient-to-br from-emerald-950 via-forest-900 to-teal-950 rounded-3xl p-6 text-white text-xs space-y-4 shadow-lg border border-emerald-500/30">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="font-semibold text-emerald-300">Confidence Metric</span>
                    <span className="font-black text-emerald-400 text-lg">94.2%</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="font-semibold text-emerald-300">Severity Assessment</span>
                    <span className="bg-amber-500/30 text-amber-300 px-3 py-1 rounded-full text-[11px] font-black border border-amber-400/40">
                      Moderate Risk
                    </span>
                  </div>
                  <div className="space-y-1.5 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                    <span className="font-bold text-emerald-300 block">🌿 Bio-Remedy Protocol:</span>
                    <span className="text-slate-200 text-[11px] block leading-relaxed font-medium">
                      Spray Pseudomonas fluorescens @ 5 ml/L + Neem Seed Kernel Extract (NSKE 5%) during morning hours.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pulsewater' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
                    <Droplets className="w-3.5 h-3.5 text-sky-600" />
                    <span>Real-Time Soil Telemetry</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                    Plot-by-Plot Telemetry & Valve Actuators
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Probe moisture levels across Zone A (Sugarcane), Zone B (Paddy), and Zone C (Ragi).
                    Observe automated solenoid valve triggers and 7-day water telemetry analytics.
                  </p>
                  <Link
                    to="/pulsewater"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-teal-700 text-white font-extrabold text-xs shadow-md hover:shadow-glow-blue transition-transform hover:scale-105"
                  >
                    <span>Open PulseWater Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 rounded-3xl p-6 text-white text-xs space-y-4 shadow-lg border border-sky-500/30">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span>Zone C — Ragi Dryland</span>
                    <span className="text-rose-400 font-black text-base">33% (Critical Low)</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span>Target Optimum Moisture</span>
                    <span className="text-sky-300 font-bold">45%</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sky-300">Solenoid Actuator</div>
                      <div className="text-[11px] text-slate-400">Interactive toggle in app</div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-sky-500/30 text-sky-200 border border-sky-400/40 text-[10px] font-black">
                      Ready to Flow
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'assistant' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
                    <BotMessageSquare className="w-3.5 h-3.5 text-teal-600" />
                    <span>Agronomy Knowledge Base</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                    Conversational Farm Agronomist
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Ask questions on Jeevamrutha preparation, sugarcane drip scheduling, fertilizer split
                    applications, and central PMKSY micro-irrigation subsidies.
                  </p>
                  <Link
                    to="/assistant"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-700 to-emerald-800 text-white font-extrabold text-xs shadow-md transition-transform hover:scale-105"
                  >
                    <span>Converse with Assistant</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-slate-900 rounded-3xl p-6 text-white text-xs space-y-3 shadow-lg border border-emerald-500/30">
                  <div className="bg-white/10 rounded-2xl p-3 text-emerald-200 font-semibold border border-white/10">
                    "What subsidies are available for micro-irrigation?"
                  </div>
                  <div className="bg-white/5 rounded-2xl p-3.5 text-slate-200 leading-relaxed text-[11px] border border-white/5">
                    "🏛️ PMKSY offers up to <strong>90% subsidy</strong> for small & marginal farmers in Karnataka. Apply with RTC/Pahani copy at your local Raitha Samparka Kendra."
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'weather' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                    <CloudSun className="w-3.5 h-3.5 text-amber-600" />
                    <span>Microclimate Radar</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                    Mandya Weather & Spray Advisor
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Live temperature (29°C), 64% humidity, and wind velocity projections to plan your
                    foliar spraying before afternoon convective rainfall.
                  </p>
                  <Link
                    to="/weather"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-emerald-800 text-white font-extrabold text-xs shadow-md hover:shadow-glow-gold transition-transform hover:scale-105"
                  >
                    <span>Check 7-Day Forecast</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-gradient-to-br from-amber-950 via-slate-900 to-emerald-950 rounded-3xl p-6 text-white text-xs space-y-3.5 shadow-lg border border-amber-500/30">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span>Current Temperature</span>
                    <span className="text-amber-400 font-black text-xl">29°C</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span>Spray Window Advisory</span>
                    <span className="text-emerald-400 font-black">Favorable until 11:30 AM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Precipitation Chance</span>
                    <span className="text-sky-300 font-bold">35% afternoon showers</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* High-Impact CTA Banner with Farm Textures */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-950 via-forest-900 to-teal-950 py-20 text-white text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Built for Karnataka Smallholder Farmers</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Ready to Experience Intelligent Agriculture?
          </h2>

          <p className="text-sm sm:text-base text-emerald-200/90 max-w-xl mx-auto leading-relaxed font-medium">
            Test KrishiPulse right in your browser. All field zones, sensors, and crop records are
            fully functional and persistent offline.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-emerald-950 font-black text-sm shadow-xl shadow-amber-500/30 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>Open Farmer Dashboard Now</span>
              <ArrowRight className="w-4 h-4 text-emerald-950" />
            </Link>
          </div>
        </div>
      </section>

      {/* Polished Footer */}
      <footer className="bg-white border-t border-emerald-100 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-900 flex items-center justify-center text-white shadow-md">
              <Sprout className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-sm">KrishiPulse 🌱</span>
              <p className="text-[11px] text-slate-400">
                Empowering Every Farmer with Intelligent Agriculture.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-slate-700">
            <Link to="/dashboard" className="hover:text-emerald-800 transition">Dashboard</Link>
            <Link to="/cropvision" className="hover:text-emerald-800 transition">CropVision</Link>
            <Link to="/pulsewater" className="hover:text-emerald-800 transition">PulseWater</Link>
            <Link to="/assistant" className="hover:text-emerald-800 transition">AI Assistant</Link>
            <Link to="/weather" className="hover:text-emerald-800 transition">Weather</Link>
            <Link to="/crops" className="hover:text-emerald-800 transition">My Crops</Link>
            <Link to="/profile" className="hover:text-emerald-800 transition">Profile</Link>
          </div>

          <div className="text-center md:text-right text-[11px] text-slate-400">
            <div>Mandya Demonstration Edition • React 18 + Vite + Tailwind</div>
            <div className="mt-1 flex items-center justify-center md:justify-end gap-1">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
              <span>for Indian Farmers</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
