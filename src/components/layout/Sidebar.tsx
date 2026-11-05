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
  Landmark,
  TrendingUp,
  Cpu,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { crops, applications } = useApp();

  const navItems = [
    {
      to: '/dashboard',
      label: 'Command Centre',
      icon: LayoutDashboard,
      badge: undefined,
      color: 'text-lime-accent',
    },
    {
      to: '/assistant',
      label: 'Pulse AI Agronomist',
      icon: BotMessageSquare,
      badge: 'Gemini 1.5',
      badgeColor: 'bg-lime-accent/15 text-lime-glow border border-lime-accent/30',
      color: 'text-lime-accent',
    },
    {
      to: '/cropvision',
      label: 'PulseVision AI',
      icon: ScanLine,
      badge: 'Vision',
      badgeColor: 'bg-emerald-500/15 text-emerald-bright border border-emerald-500/30',
      color: 'text-emerald-bright',
    },
    {
      to: '/pulsewater',
      label: 'PulseWater IoT',
      icon: Droplets,
      badge: 'ESP32',
      badgeColor: 'bg-cyan-moisture/15 text-cyan-ice border border-cyan-moisture/30',
      color: 'text-cyan-ice',
    },
    {
      to: '/schemes',
      label: 'Schemes Centre',
      icon: Landmark,
      badge: `${applications.length} Tracked`,
      badgeColor: 'bg-amber-solar/15 text-amber-solar border border-amber-solar/30',
      color: 'text-amber-solar',
    },
    {
      to: '/mandi',
      label: 'Mandi Intelligence',
      icon: TrendingUp,
      badge: 'APMC Feed',
      badgeColor: 'bg-emerald-500/15 text-emerald-bright border border-emerald-500/30',
      color: 'text-emerald-bright',
    },
    {
      to: '/weather',
      label: 'Weather & Spray',
      icon: CloudSun,
      badge: 'Live',
      badgeColor: 'bg-cyan-moisture/15 text-cyan-ice border border-cyan-moisture/30',
      color: 'text-cyan-ice',
    },
    {
      to: '/crops',
      label: 'Crops & Calendar',
      icon: Sprout,
      badge: `${crops.length} Active`,
      badgeColor: 'bg-lime-accent/15 text-lime-glow border border-lime-accent/30',
      color: 'text-lime-accent',
    },
    {
      to: '/profile',
      label: 'Farmer Profile',
      icon: User,
      badge: undefined,
      color: 'text-ivory-300',
    },
  ];

  return (
    <aside className="w-64 bg-noir-900 border-r border-noir-700/80 flex flex-col h-full select-none shadow-noir-card z-30">
      {/* Brand Header */}
      <div className="p-4 border-b border-noir-700/80 flex items-center justify-between bg-gradient-to-r from-noir-850 via-noir-900 to-transparent">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-accent via-emerald-neon to-cyan-deep flex items-center justify-center text-noir-950 font-black shadow-glow-lime group-hover:scale-105 group-hover:rotate-3 transition-transform">
            <Sprout className="w-5 h-5 text-noir-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-ivory-100 tracking-tight">KrishiPulse</span>
            </div>
            <p className="text-[10px] text-lime-accent font-mono uppercase tracking-widest flex items-center gap-1">
              <span>Monsoon Noir</span>
              <Sparkles className="w-2.5 h-2.5 text-lime-accent" />
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-ivory-400 flex items-center justify-between">
          <span>Intelligence Suite</span>
          <span className="w-1.5 h-1.5 rounded-full bg-lime-accent animate-pulse"></span>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-noir-800 text-lime-glow border border-noir-700 border-l-2 border-l-lime-accent shadow-glow-lime'
                    : 'text-ivory-300 hover:text-ivory-100 hover:bg-noir-800/60'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-1.5 rounded-lg transition ${
                        isActive ? 'bg-lime-accent/15 text-lime-accent' : 'bg-noir-800/80 ' + item.color
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}

        <div className="pt-4 px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-ivory-400">
          Platform
        </div>

        <Link
          to="/"
          onClick={onClose}
          className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-ivory-300 hover:text-ivory-100 hover:bg-noir-800/60 transition"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-noir-800/80 text-ivory-400">
              <Home className="w-4 h-4" />
            </div>
            <span>Monsoon Noir Landing</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-ivory-400" />
        </Link>
      </div>

      {/* Footer Info Box with IoT Hardware Gateway Badge */}
      <div className="p-3 border-t border-noir-700/80">
        <div className="p-3 rounded-xl bg-noir-850 border border-noir-700 text-ivory-200">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-lime-glow">
              <Cpu className="w-3.5 h-3.5 text-lime-accent" />
              <span>ESP32 Gateway</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-lime-accent animate-ping" />
          </div>
          <p className="text-[10px] text-ivory-400 font-mono leading-relaxed">
            POST /api/sensors/readings
            <br />
            Status: Telemetry Stream Active
          </p>
        </div>
      </div>
    </aside>
  );
};
