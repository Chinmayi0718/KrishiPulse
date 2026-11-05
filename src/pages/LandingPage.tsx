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
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cropvision' | 'pulsewater' | 'assistant' | 'weather'>('cropvision');

  const featureCards = [
    {
      title: 'CropVision AI',
      subtitle: 'Simulated Computer Vision',
      desc: 'Instant leaf lesion diagnosis, pathogen identification, and dual organic & chemical remedy protocols.',
      icon: ScanLine,
      color: 'from-emerald-700 to-emerald-900',
      badge: 'Vision Tech',
      link: '/cropvision',
    },
    {
      title: 'PulseWater Telemetry',
      subtitle: 'Precision Soil Moisture',
      desc: 'Plot-by-plot soil moisture tracking, automated valve actuators, and 24%+ water savings.',
      icon: Droplets,
      color: 'from-teal-700 to-teal-900',
      badge: 'IoT Mesh',
      link: '/pulsewater',
    },
    {
      title: 'AI Farmer Assistant',
      subtitle: 'Knowledgebase Chatbot',
      desc: '24/7 agricultural guidance covering pest management, Jeevamrutha preparation, and PMKSY subsidies.',
      icon: BotMessageSquare,
      color: 'from-emerald-800 to-slate-900',
      badge: 'Local AI',
      link: '/assistant',
    },
    {
      title: 'Weather & Spray Radar',
      subtitle: 'Hyper-local Agro-Forecast',
      desc: 'Simulated 7-day microclimate projections, wind velocity alerts, and optimal morning spraying windows.',
      icon: CloudSun,
      color: 'from-amber-700 to-emerald-950',
      badge: 'Radar',
      link: '/weather',
    },
    {
      title: 'My Crop Portfolio',
      subtitle: 'Farm Acreage Management',
      desc: 'Full CRUD tracking of planting dates, growth stages, harvest projections, and acreage allocation.',
      icon: Layers,
      color: 'from-slate-800 to-slate-950',
      badge: 'Management',
      link: '/crops',
    },
    {
      title: 'Kisan Identity & Dialect',
      subtitle: 'Localized Farmer Profile',
      desc: 'Calibrated for Mandya, Karnataka with support for Kannada, Hindi, and English regional dialects.',
      icon: Globe2,
      color: 'from-emerald-900 to-teal-950',
      badge: 'Localized',
      link: '/profile',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-slate-800 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Demo Notification */}
      <div className="bg-emerald-950 text-emerald-200 px-4 py-2 text-xs text-center border-b border-emerald-800 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
        <span>
          <strong>KrishiPulse Hackathon Preview:</strong> 100% local mock data • Zero paid APIs • Offline-ready for Indian Farmers
        </span>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-900 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-900/10">
              <Sprout className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <span className="font-extrabold text-xl text-emerald-950 tracking-tight block">
                KrishiPulse
              </span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block -mt-1">
                Intelligent Agriculture
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-emerald-800 transition">Features</a>
            <a href="#how-it-works" className="hover:text-emerald-800 transition">How It Works</a>
            <a href="#modules" className="hover:text-emerald-800 transition">Modules</a>
            <a href="#stats" className="hover:text-emerald-800 transition">Impact</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-900/20 transition flex items-center gap-2 group"
            >
              <span>Launch Farmer App</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-bold border border-emerald-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Empowering Every Farmer with Intelligent Agriculture</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.12]">
              Smarter Decisions for Indian Farmers with{' '}
              <span className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 bg-clip-text text-transparent">
                KrishiPulse
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              An all-in-one smart agriculture platform engineered for smallholders. From AI-assisted
              crop disease detection and soil moisture telemetry to localized spray advisories and
              government subsidy assistance—all offline-ready and simulated for Mandya, Karnataka.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl shadow-emerald-900/20 transition flex items-center justify-center gap-2 group"
              >
                <span>Launch Farmer Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/cropvision"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm transition flex items-center justify-center gap-2"
              >
                <ScanLine className="w-4 h-4 text-emerald-700" />
                <span>Test CropVision Scanner</span>
              </Link>
            </div>

            {/* Highlights row */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 pt-6">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Paid API Keys Required</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Persistent LocalStorage State</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Mobile, Tablet & Desktop Responsive</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Banner */}
      <section id="stats" className="border-y border-slate-200 bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-900">24%+</div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Average Water Conserved (Simulated)
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-900">94.2%</div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Disease Pattern Match Accuracy
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-900">4.5 Ac</div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Calibrated Mandya Field Baseline
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-900">₹0</div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Zero Cloud Costs • Pure Frontend
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Full Startup Platform Architecture
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              Engineered for Every Stage of the Farming Cycle
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              From soil preparation and planting schedules to pest intervention and water management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((feat) => {
              const Icon = feat.icon;
              return (
                <Link
                  key={feat.title}
                  to={feat.link}
                  className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-200 hover:-translate-y-1 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition">
                        <Icon className="w-6 h-6 text-emerald-700" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition">
                      {feat.title}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-700 mb-2">
                      {feat.subtitle}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
                    <span>Open Module</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Workflow */}
      <section id="how-it-works" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Intuitive 4-Step Flow
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              How KrishiPulse Works in the Field
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-800 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-md">
                1
              </div>
              <h4 className="font-bold text-base text-slate-900">Define Farm Profile</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Enter your location (Mandya, Karnataka), total land acreage, soil type, and preferred language dialect.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-800 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-md">
                2
              </div>
              <h4 className="font-bold text-base text-slate-900">Monitor Soil & Weather</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Check simulated telemetry across field zones. View soil capacitive moisture and 7-day weather rain probabilities.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-800 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-md">
                3
              </div>
              <h4 className="font-bold text-base text-slate-900">Diagnose Plant Health</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Capture foliage photos or choose demo presets in CropVision to detect blast, red rot, or blight with treatment advice.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-800 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-md">
                4
              </div>
              <h4 className="font-bold text-base text-slate-900">Automate Water & Advice</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Toggle automated valves in PulseWater, converse with the AI agronomist, and check government subsidy eligibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Module Showcase */}
      <section id="modules" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Interactive Preview
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              Experience the Product Modules
            </h2>
          </div>

          {/* Module Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {[
              { id: 'cropvision', label: '🌿 CropVision AI', to: '/cropvision' },
              { id: 'pulsewater', label: '💧 PulseWater IoT', to: '/pulsewater' },
              { id: 'assistant', label: '🤖 AI Assistant', to: '/assistant' },
              { id: 'weather', label: '🌦️ Weather Radar', to: '/weather' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                  activeTab === tab.id
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Interactive Card Preview */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md max-w-4xl mx-auto">
            {activeTab === 'cropvision' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Demonstration Vision Diagnostic
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1 mb-3">
                    Paddy Leaf Blast (*Magnaporthe oryzae*)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Instantly detects spindle-shaped lesions, assesses moderate disease severity (94.2% confidence),
                    and recommends *Pseudomonas fluorescens* organic spray alongside ICAR chemical thresholds.
                  </p>
                  <Link
                    to="/cropvision"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs"
                  >
                    <span>Try CropVision Simulator</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="bg-emerald-950 rounded-2xl p-6 text-white text-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="font-semibold text-emerald-300">Confidence Score</span>
                    <span className="font-extrabold text-emerald-400">94.2%</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="font-semibold text-emerald-300">Severity</span>
                    <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">Moderate</span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-semibold text-emerald-300 block">Organic Bio-Remedy:</span>
                    <span className="text-slate-300 text-[11px] block">
                      Pseudomonas fluorescens @ 5 ml/L + Neem Seed Kernel Extract 5%.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pulsewater' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                    Precision Soil Moisture
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1 mb-3">
                    Plot-by-Plot Telemetry & Valve Toggles
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Monitor Zone A (Sugarcane), Zone B (Paddy), and Zone C (Ragi). When soil moisture dips below
                    threshold, trigger automated valve actuators and observe simulated water savings.
                  </p>
                  <Link
                    to="/pulsewater"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-700 text-white font-bold text-xs"
                  >
                    <span>Open PulseWater Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="bg-slate-900 rounded-2xl p-6 text-white text-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span>Zone C — Ragi Dryland</span>
                    <span className="text-rose-400 font-bold">33% (Critical Low)</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span>Target Moisture</span>
                    <span className="text-sky-300 font-bold">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Valve Actuator</span>
                    <span className="bg-white/10 text-white px-2 py-0.5 rounded text-[10px] font-bold">Interactive in App</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'assistant' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                    Conversational Agronomist
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1 mb-3">
                    Pre-seeded ICAR Domain Intelligence
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Ask questions regarding sugarcane irrigation, Jeevamrutha preparation, pest threshold sprays, and
                    government subsidies like PMKSY 90% micro-irrigation support.
                  </p>
                  <Link
                    to="/assistant"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-800 text-white font-bold text-xs"
                  >
                    <span>Chat with Demo Assistant</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="bg-slate-850 bg-slate-900 rounded-2xl p-5 text-white text-xs space-y-2.5">
                  <div className="bg-white/10 rounded-xl p-3 text-emerald-200">
                    "What government subsidies are available for micro-irrigation?"
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-slate-300 leading-relaxed text-[11px]">
                    "PMKSY provides up to 90% subsidy for small & marginal farmers in Karnataka. Apply via Seva Sindhu with Pahani copy."
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'weather' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                    Spray Window Intelligence
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1 mb-3">
                    Hyper-local Mandya Weather Radar
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Real-time temperature (29°C), 64% humidity, wind velocity (11 km/h), and morning spray advisories.
                    Plan your farm labor ahead of convective afternoon rains.
                  </p>
                  <Link
                    to="/weather"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-700 text-white font-bold text-xs"
                  >
                    <span>Check 7-Day Forecast</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="bg-slate-900 rounded-2xl p-6 text-white text-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span>Current Temperature</span>
                    <span className="text-amber-400 font-extrabold text-base">29°C</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span>Spray Window</span>
                    <span className="text-emerald-400 font-bold">Favorable until 11:30 AM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Rain Probability</span>
                    <span className="text-sky-300 font-bold">35% afternoon showers</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Explore the Future of Indian Agriculture?
          </h2>
          <p className="text-sm sm:text-base text-emerald-200 max-w-xl mx-auto leading-relaxed">
            Experience KrishiPulse right in your browser. All data is seeded and editable with instant localStorage persistence.
          </p>
          <div className="pt-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-emerald-950 hover:bg-emerald-50 font-extrabold text-sm shadow-xl transition"
            >
              <span>Open Farmer Dashboard Now</span>
              <ArrowRight className="w-4 h-4 text-emerald-900" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-900 flex items-center justify-center text-white">
              <Sprout className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-sm">KrishiPulse 🌱</span>
              <p className="text-[11px] text-slate-400">
                Empowering Every Farmer with Intelligent Agriculture.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
            <Link to="/dashboard" className="hover:text-emerald-800 transition">Dashboard</Link>
            <Link to="/cropvision" className="hover:text-emerald-800 transition">CropVision</Link>
            <Link to="/pulsewater" className="hover:text-emerald-800 transition">PulseWater</Link>
            <Link to="/assistant" className="hover:text-emerald-800 transition">AI Assistant</Link>
            <Link to="/weather" className="hover:text-emerald-800 transition">Weather</Link>
            <Link to="/crops" className="hover:text-emerald-800 transition">My Crops</Link>
            <Link to="/profile" className="hover:text-emerald-800 transition">Profile</Link>
          </div>

          <div className="text-center md:text-right text-[11px] text-slate-400">
            <div>Mandya Demonstration Edition • React + Vite + Tailwind</div>
            <div className="mt-1 flex items-center justify-center md:justify-end gap-1">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
              <span>for Indian Farmers</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
