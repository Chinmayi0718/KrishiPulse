import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Bell, User, CloudSun, Menu, MapPin, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavbarProps {
  onMobileMenuToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMobileMenuToggle }) => {
  const { profile, weather } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-emerald-100/80 shadow-xs">
      <div className="px-4 sm:px-6 lg:px-8 h-17 flex items-center justify-between">
        {/* Left: Mobile Toggle & Brand for small screens */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 md:hidden group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-800 via-forest-800 to-teal-900 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-emerald-950 tracking-tight">KrishiPulse</span>
            </div>
          </Link>

          {/* Location breadcrumb on desktop */}
          <div className="hidden md:flex items-center gap-2.5 text-xs bg-emerald-50/80 text-emerald-950 px-3.5 py-1.5 rounded-full border border-emerald-200/80 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 animate-bounce" style={{ animationDuration: '3s' }} />
            <span className="font-bold">{profile.location}</span>
            <span className="text-emerald-300">•</span>
            <span className="text-emerald-700 font-medium">Taluk: {profile.taluk}</span>
            <span className="text-[10px] bg-emerald-200/60 text-emerald-900 font-bold px-1.5 py-0.5 rounded">
              Cauvery Basin
            </span>
          </div>
        </div>

        {/* Right side items */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Quick weather pill */}
          <Link
            to="/weather"
            className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-50 to-emerald-50 hover:from-amber-100 hover:to-emerald-100 border border-amber-200/60 text-xs transition shadow-xs group"
          >
            <div className="p-1 rounded-lg bg-amber-100 text-amber-600 group-hover:rotate-12 transition-transform">
              <CloudSun className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900">{weather.temp}°C</span>
              <span className="text-slate-500 ml-1.5">{weather.condition}</span>
            </div>
          </Link>

          {/* Notifications button */}
          <div className="relative">
            <button
              className="p-2.5 text-slate-600 hover:text-emerald-900 hover:bg-emerald-50 rounded-xl relative transition"
              title="Recent Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white animate-pulse"></span>
            </button>
          </div>

          {/* Farmer profile chip with glowing avatar */}
          <Link
            to="/profile"
            className="flex items-center gap-2.5 pl-2 sm:pl-3 py-1 rounded-2xl hover:bg-emerald-50/80 transition border border-transparent hover:border-emerald-200/70"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 via-forest-700 to-teal-800 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-emerald-900/20 ring-2 ring-emerald-200">
              <User className="w-5 h-5 text-emerald-100" />
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-extrabold text-slate-900 leading-tight">
                {profile.name}
              </div>
              <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                <span>{profile.kisanId}</span>
                <Sparkles className="w-3 h-3 text-amber-500" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
