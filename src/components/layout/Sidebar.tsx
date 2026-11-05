import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ScanLine,
  Droplets,
  BotMessageSquare,
  CloudSun,
  Sprout,
  User,
  Home,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { crops } = useApp();

  const navItems = [
    {
      to: '/dashboard',
      label: 'Farmer Dashboard',
      icon: LayoutDashboard,
      badge: undefined,
      color: 'text-emerald-600',
    },
    {
      to: '/cropvision',
      label: 'CropVision AI',
      icon: ScanLine,
      badge: 'Simulated',
      badgeColor: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
      color: 'text-teal-600',
    },
    {
      to: '/pulsewater',
      label: 'PulseWater',
      icon: Droplets,
      badge: 'Sensors',
      badgeColor: 'bg-sky-100 text-sky-800 border border-sky-200',
      color: 'text-sky-600',
    },
    {
      to: '/assistant',
      label: 'AI Farmer Assistant',
      icon: BotMessageSquare,
      badge: 'Demo',
      badgeColor: 'bg-teal-100 text-teal-800 border border-teal-200',
      color: 'text-emerald-600',
    },
    {
      to: '/weather',
      label: 'Weather & Spray',
      icon: CloudSun,
      badge: undefined,
      color: 'text-amber-600',
    },
    {
      to: '/crops',
      label: 'My Crops',
      icon: Sprout,
      badge: `${crops.length} Active`,
      badgeColor: 'bg-lime-100 text-lime-900 border border-lime-200',
      color: 'text-lime-600',
    },
    {
      to: '/profile',
      label: 'Farmer Profile',
      icon: User,
      badge: undefined,
      color: 'text-slate-600',
    },
  ];

  return (
    <aside className="w-64 bg-white/95 backdrop-blur border-r border-emerald-100 flex flex-col h-full select-none shadow-sm">
      {/* Brand Header */}
      <div className="p-5 border-b border-emerald-100/80 flex items-center justify-between bg-gradient-to-r from-emerald-50/50 via-white to-transparent">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-800 via-forest-800 to-teal-900 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 group-hover:rotate-3 transition-transform">
            <Sprout className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-emerald-950 tracking-tight">
                KrishiPulse
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-2 py-0.5 rounded-full shadow-xs">
                🌱 v1.0
              </span>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold truncate flex items-center gap-1">
              <span>Intelligent Agriculture</span>
              <Sparkles className="w-2.5 h-2.5 text-amber-500" />
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-emerald-800/60 flex items-center justify-between">
          <span>Core Modules</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-800 to-forest-800 text-white shadow-md shadow-emerald-900/25 translate-x-1'
                    : 'text-slate-600 hover:text-emerald-950 hover:bg-emerald-50/70'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-xl transition ${
                        isActive ? 'bg-white/15 text-emerald-200' : 'bg-slate-100 ' + item.color
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-emerald-700/80 text-white border border-emerald-500/40'
                          : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}

        <div className="pt-4 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-emerald-800/60">
          General
        </div>

        <Link
          to="/"
          onClick={onClose}
          className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-600 hover:text-emerald-950 hover:bg-emerald-50/70 transition"
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-xl bg-slate-100 text-slate-500">
              <Home className="w-4 h-4" />
            </div>
            <span>Public Landing Page</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </Link>
      </div>

      {/* Footer Info Box with Farm Scenic Theme */}
      <div className="p-3.5 border-t border-emerald-100">
        <div className="relative overflow-hidden p-3.5 rounded-2xl bg-gradient-to-br from-emerald-950 via-forest-900 to-teal-950 text-white shadow-md">
          <div className="relative z-10">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Offline Verified</span>
            </div>
            <p className="text-[11px] text-emerald-200/90 leading-relaxed font-medium">
              Mandya, Karnataka simulation running locally with zero paid API overhead.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-15 translate-x-2 translate-y-2 pointer-events-none">
            <Sprout className="w-16 h-16 text-emerald-400" />
          </div>
        </div>
      </div>
    </aside>
  );
};
