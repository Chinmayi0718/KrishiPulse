import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { QuickActions } from '../components/dashboard/QuickActions';
import { WeatherWidget } from '../components/dashboard/WeatherWidget';
import { SoilMoistureWidget } from '../components/dashboard/SoilMoistureWidget';
import { CropStatusSummary } from '../components/dashboard/CropStatusSummary';
import {
  MapPin,
  Calendar,
  Layers,
  Droplets,
  Activity,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Sprout,
  Landmark,
  TrendingUp,
  BotMessageSquare,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { MANDI_RECORDS } from '../data/mockData';

export const DashboardPage: React.FC = () => {
  const { profile, crops, zones, applications, language } = useApp();

  const totalAcres = crops.reduce((sum, c) => sum + c.areaAcres, 0);
  const activeValves = zones.filter((z) => z.valveStatus === 'Open').length;
  const avgMoisture = Math.round(
    zones.reduce((sum, z) => sum + z.currentMoisture, 0) / (zones.length || 1)
  );
  const totalDisbursed = applications.reduce((sum, a) => sum + (a.benefitReceivedAmount || 0), 0);

  const greeting =
    language === 'kn'
      ? `ನಮಸ್ಕಾರ, ${profile.name}! 🙏`
      : language === 'hi'
      ? `नमस्ते, ${profile.name}! 🙏`
      : `Namaskara, ${profile.name}! 🙏`;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* MONSOON NOIR HERO COMMAND CENTRE BANNER */}
      <div className="relative rounded-3xl overflow-hidden noir-card border border-noir-700/80 shadow-noir-elevated p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold bg-lime-accent/15 text-lime-glow px-3 py-1 rounded-full border border-lime-accent/30 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-lime-accent animate-ping" />
                <span>Command Centre Active</span>
              </span>
              <span className="text-xs font-mono font-bold text-amber-solar bg-amber-solar/15 px-3 py-1 rounded-full border border-amber-solar/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kisan ID: {profile.kisanId}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-ivory-100">
              {greeting}
            </h1>

            <p className="text-xs sm:text-sm text-ivory-300 max-w-2xl leading-relaxed">
              Real-time agro-telemetry, Gemini 1.5 agronomist, and scheme tracker for your{' '}
              <strong className="text-ivory-100 font-semibold">{profile.location}</strong> farm holding.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-ivory-400">
              <span className="flex items-center gap-1 text-ivory-300">
                <MapPin className="w-3.5 h-3.5 text-lime-accent" />
                <span>Taluk: {profile.taluk} (GPS Calibrated)</span>
              </span>
              <span>•</span>
              <span>Soil: {profile.soilType}</span>
              <span>•</span>
              <span className="text-cyan-ice">Irrigation: {profile.irrigationType}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
            <Link
              to="/assistant"
              className="px-4 py-2.5 rounded-xl bg-lime-accent text-noir-950 font-mono font-bold text-xs flex items-center justify-center gap-2 hover:bg-lime-glow transition shadow-glow-lime"
            >
              <BotMessageSquare className="w-4 h-4 text-noir-950" />
              <span>Ask Pulse AI</span>
            </Link>

            <Link
              to="/schemes"
              className="px-4 py-2.5 rounded-xl bg-noir-850 hover:bg-noir-800 text-ivory-200 border border-noir-700 text-xs font-mono font-medium flex items-center justify-center gap-2 transition"
            >
              <Landmark className="w-4 h-4 text-amber-solar" />
              <span>Schemes Centre</span>
            </Link>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS BAR */}
      <QuickActions />

      {/* 4 CORE KPI STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Crop Land"
          value={`${totalAcres.toFixed(1)} / ${profile.totalLandAcres} Ac`}
          subtitle={`${crops.length} Registered field plots`}
          icon={Sprout}
          badge="Optimal Vigour"
          iconBgColor="bg-lime-accent/15"
          iconColor="text-lime-accent"
          trend={{ value: '100% Sown', isPositive: true, label: 'Kharif + Rabi' }}
        />

        <StatCard
          title="Soil Moisture Avg"
          value={`${avgMoisture}%`}
          subtitle={`${activeValves} Solenoid Valves Open`}
          icon={Droplets}
          badge="ESP32 Stream"
          iconBgColor="bg-cyan-moisture/15"
          iconColor="text-cyan-ice"
          trend={{ value: 'Drip Active', isPositive: true, label: 'Zone A & C' }}
        />

        <StatCard
          title="Schemes Pipeline"
          value={`${applications.length} Active`}
          subtitle={`₹${totalDisbursed.toLocaleString('en-IN')} DBT Received`}
          icon={Landmark}
          badge="Verified"
          iconBgColor="bg-amber-solar/15"
          iconColor="text-amber-solar"
          trend={{ value: 'PM-KISAN + PMKSY', isPositive: true, label: 'Tracked' }}
        />

        <StatCard
          title="Mandi APMC Index"
          value="₹2,150"
          subtitle="Tomato (Mandya APMC)"
          icon={TrendingUp}
          badge="Upward"
          iconBgColor="bg-emerald-500/15"
          iconColor="text-emerald-bright"
          trend={{ value: '+6.4% 30d', isPositive: true, label: 'Strong arrival' }}
        />
      </div>

      {/* CORE DUAL WIDGETS: WEATHER & TELEMETRY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeatherWidget />
        <SoilMoistureWidget />
      </div>

      {/* BOTTOM ROW: ACTIVE CROPS & MANDI INTELLIGENCE SNAPSHOT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CropStatusSummary />
        </div>

        {/* Mandi APMC Quick Watchlist */}
        <div className="rounded-3xl noir-card p-6 border border-noir-700/80 shadow-noir-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-bright flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>APMC Market Ticker</span>
                </span>
                <h3 className="text-base font-bold text-ivory-100 mt-0.5">Wholesale Benchmarks</h3>
              </div>
              <Link to="/mandi" className="text-xs text-lime-accent hover:underline font-mono font-bold">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {MANDI_RECORDS.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-noir-850 border border-noir-700 flex items-center justify-between text-xs"
                >
                  <div>
                    <h4 className="font-bold text-ivory-100">{item.commodity}</h4>
                    <p className="text-[10px] text-ivory-400 font-mono">{item.marketName}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-lime-glow">
                      ₹{item.modalPrice.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] font-mono text-emerald-bright">
                      +{item.percentChange}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-noir-700">
            <Link
              to="/mandi"
              className="text-xs text-lime-accent hover:underline font-mono font-bold flex items-center justify-between group"
            >
              <span>Explore 30-Day Agmarknet Trends</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
