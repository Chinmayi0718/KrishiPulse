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
    },
    {
      to: '/cropvision',
      label: 'CropVision AI',
      icon: ScanLine,
      badge: 'Simulated',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      to: '/pulsewater',
      label: 'PulseWater',
      icon: Droplets,
      badge: 'Sensors',
      badgeColor: 'bg-sky-100 text-sky-800',
    },
    {
      to: '/assistant',
      label: 'AI Farmer Assistant',
      icon: BotMessageSquare,
      badge: 'Demo',
      badgeColor: 'bg-teal-100 text-teal-800',
    },
    {
      to: '/weather',
      label: 'Weather & Spray',
      icon: CloudSun,
      badge: undefined,
    },
    {
      to: '/crops',
      label: 'My Crops',
      icon: Sprout,
      badge: crops.length.toString(),
      badgeColor: 'bg-slate-100 text-slate-700',
    },
    {
      to: '/profile',
      label: 'Farmer Profile',
      icon: User,
      badge: undefined,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-900 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
            <Sprout className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-emerald-950 tracking-tight">
                KrishiPulse
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium truncate">
              Intelligent Agriculture
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Core Modules
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-sm shadow-emerald-900/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? 'text-emerald-200' : 'text-slate-500'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-emerald-700 text-white'
                          : item.badgeColor || 'bg-slate-100 text-slate-700'
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

        <div className="pt-4 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          General
        </div>

        <Link
          to="/"
          onClick={onClose}
          className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition"
        >
          <div className="flex items-center gap-3">
            <Home className="w-5 h-5 text-slate-400" />
            <span>Public Landing Page</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </Link>
      </div>

      {/* Footer Info Box */}
      <div className="p-4 border-t border-slate-100">
        <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100/80">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Demo Mode Verified</span>
          </div>
          <p className="text-[11px] text-emerald-800/80 leading-relaxed">
            Local simulated data for Mandya, Karnataka. Fully functional offline.
          </p>
        </div>
      </div>
    </aside>
  );
};
