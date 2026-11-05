import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Bell, User, CloudSun, Menu, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavbarProps {
  onMobileMenuToggle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMobileMenuToggle }) => {
  const { profile, weather } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Mobile Toggle & Brand for small screens */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 md:hidden">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-white shadow-sm">
              <Sprout className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <span className="font-bold text-base text-emerald-950 tracking-tight">KrishiPulse</span>
            </div>
          </Link>

          {/* Location breadcrumb on desktop */}
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-medium text-slate-700">{profile.location}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">Taluk: {profile.taluk}</span>
          </div>
        </div>

        {/* Right side items */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Quick weather pill */}
          <Link
            to="/weather"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200/60 text-xs text-emerald-900 transition"
          >
            <CloudSun className="w-4 h-4 text-emerald-600" />
            <span className="font-bold">{weather.temp}°C</span>
            <span className="text-slate-500">{weather.condition}</span>
          </Link>

          {/* Notifications button */}
          <div className="relative">
            <button
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative transition"
              title="Recent Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
            </button>
          </div>

          {/* Farmer profile chip */}
          <Link
            to="/profile"
            className="flex items-center gap-2.5 pl-2 sm:pl-3 py-1 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-800 to-teal-700 flex items-center justify-center text-white font-semibold text-sm shadow-sm ring-2 ring-emerald-100">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-slate-800 leading-tight">
                {profile.name}
              </div>
              <div className="text-[11px] text-emerald-700 font-medium">
                {profile.kisanId}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
