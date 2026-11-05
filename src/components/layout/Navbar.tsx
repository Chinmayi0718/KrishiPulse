import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout,
  Bell,
  User,
  CloudSun,
  Menu,
  MapPin,
  Sparkles,
  Globe,
  Radio,
  CheckCircle,
  X,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SCHEME_UPDATES } from '../../data/mockData';

interface NavbarProps {
  onMobileMenuToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMobileMenuToggle }) => {
  const { profile, weather, language, setLanguage, isSimulatedSensorMode, toggleSimulatedSensorMode } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const langLabels: Record<string, { label: string; native: string }> = {
    en: { label: 'English', native: 'English' },
    kn: { label: 'Kannada', native: 'ಕನ್ನಡ' },
    hi: { label: 'Hindi', native: 'हिन्दी' },
  };

  return (
    <header className="sticky top-0 z-40 bg-noir-900/85 backdrop-blur-2xl border-b border-noir-700/80 shadow-noir-card">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Mobile Menu Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 text-ivory-300 hover:text-lime-accent hover:bg-noir-800 rounded-xl transition"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 md:hidden group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lime-accent via-emerald-neon to-cyan-deep flex items-center justify-center text-noir-950 font-black shadow-glow-lime">
              <Sprout className="w-4 h-4 text-noir-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base text-ivory-100 tracking-tight">KrishiPulse</span>
              <span className="text-[9px] text-lime-accent uppercase tracking-widest font-mono">Monsoon Noir</span>
            </div>
          </Link>

          {/* GPS Location & Field Telemetry Badge */}
          <div className="hidden md:flex items-center gap-2.5 text-xs bg-noir-800/90 text-ivory-200 px-3.5 py-1.5 rounded-full border border-noir-700 shadow-inner">
            <div className="relative flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-lime-accent" />
              <div className="absolute w-4 h-4 rounded-full bg-lime-accent/40 animate-ping" />
            </div>
            <MapPin className="w-3.5 h-3.5 text-lime-accent" />
            <span className="font-semibold text-ivory-100">{profile.village || profile.location}</span>
            <span className="text-noir-600">•</span>
            <span className="text-ivory-300 font-mono text-[11px]">{profile.district}, {profile.state}</span>
            <span className="text-[10px] bg-lime-accent/15 text-lime-glow font-mono font-bold px-1.5 py-0.5 rounded border border-lime-accent/30">
              GPS Active
            </span>
          </div>

          {/* IoT Telemetry State Pill */}
          <button
            onClick={toggleSimulatedSensorMode}
            title="Click to toggle ESP32 Hardware vs Sensor Simulation Stream"
            className="hidden xl:flex items-center gap-1.5 text-[11px] bg-noir-800/80 hover:bg-noir-750 text-ivory-300 px-2.5 py-1 rounded-lg border border-noir-700 transition"
          >
            <Radio className={`w-3 h-3 ${isSimulatedSensorMode ? 'text-cyan-ice animate-pulse' : 'text-emerald-bright'}`} />
            <span className="font-mono">{isSimulatedSensorMode ? 'Simulated Telemetry' : 'ESP32 Gateway Online'}</span>
          </button>
        </div>

        {/* Right side navigation items */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Weather Capsule */}
          <Link
            to="/weather"
            className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-noir-800/90 hover:bg-noir-750 border border-noir-700 hover:border-lime-accent/40 text-xs transition shadow-noir-card group"
          >
            <div className="p-1 rounded-md bg-amber-solar/20 text-amber-solar group-hover:rotate-12 transition-transform">
              <CloudSun className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-bold text-ivory-100">{weather.temp}°C</span>
              <span className="text-ivory-400 ml-1.5 font-normal">{weather.condition}</span>
            </div>
            {weather.isLive && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-neon animate-pulse" title="Live Open-Meteo API Feed" />
            )}
          </Link>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-noir-800/90 hover:bg-noir-750 border border-noir-700 text-xs text-ivory-200 transition font-medium"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-lime-accent" />
              <span className="font-mono text-ivory-100">{langLabels[language]?.native || 'EN'}</span>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl bg-noir-850 border border-noir-700 shadow-noir-elevated py-1.5 z-50">
                {(['en', 'kn', 'hi'] as const).map((langKey) => (
                  <button
                    key={langKey}
                    onClick={() => {
                      setLanguage(langKey);
                      setShowLangMenu(false);
                    }}
                    className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between transition ${
                      language === langKey
                        ? 'bg-lime-accent/15 text-lime-glow font-bold'
                        : 'text-ivory-300 hover:bg-noir-800 hover:text-ivory-100'
                    }`}
                  >
                    <span>{langLabels[langKey].native}</span>
                    <span className="text-[10px] text-ivory-400 font-mono">({langLabels[langKey].label})</span>
                    {language === langKey && <CheckCircle className="w-3.5 h-3.5 text-lime-accent" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-ivory-300 hover:text-lime-accent hover:bg-noir-800 rounded-xl relative transition border border-transparent hover:border-noir-700"
              title="Official Scheme Updates & Advisory Feed"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-lime-accent rounded-full animate-pulse shadow-glow-lime"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-noir-850 border border-noir-700 shadow-noir-elevated p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-noir-700">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-lime-accent" />
                    <span className="text-xs font-bold text-ivory-100 uppercase tracking-wider font-mono">
                      Official Alerts & Feeds
                    </span>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-ivory-400 hover:text-ivory-100 text-xs"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {SCHEME_UPDATES.slice(0, 3).map((up) => (
                    <div
                      key={up.id}
                      className="p-2.5 rounded-xl bg-noir-800/80 border border-noir-700/80 hover:border-lime-accent/30 transition text-left"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-lime-accent/15 text-lime-glow font-bold">
                          {up.schemeCode}
                        </span>
                        <span className="text-[10px] text-ivory-400 font-mono">{up.verifiedTimestamp}</span>
                      </div>
                      <h4 className="text-xs font-semibold text-ivory-100 line-clamp-1">{up.title}</h4>
                      <p className="text-[11px] text-ivory-300 mt-1 line-clamp-2 leading-relaxed">{up.summary}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-3 mt-3 border-t border-noir-700 flex justify-between items-center text-xs">
                  <Link
                    to="/schemes"
                    onClick={() => setShowNotifications(false)}
                    className="text-lime-accent hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>View Scheme Centre</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                  <span className="text-[10px] text-ivory-400 font-mono">Government Verified</span>
                </div>
              </div>
            )}
          </div>

          {/* Farmer Profile Avatar & Kisan ID */}
          <Link
            to="/profile"
            className="flex items-center gap-2.5 pl-1.5 sm:pl-2.5 py-1 rounded-2xl hover:bg-noir-800/80 transition border border-transparent hover:border-noir-700"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-noir-700 via-noir-800 to-noir-900 border border-lime-accent/40 flex items-center justify-center text-ivory-100 font-bold text-xs shadow-glow-lime">
              <User className="w-4 h-4 text-lime-accent" />
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-extrabold text-ivory-100 leading-tight">
                {profile.name}
              </div>
              <div className="text-[10px] text-lime-accent font-mono font-bold flex items-center gap-1">
                <span>{profile.kisanId}</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
