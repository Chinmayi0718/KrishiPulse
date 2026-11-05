import React from 'react';
import { Link } from 'react-router-dom';
import { ScanLine, BotMessageSquare, Droplets, Landmark, TrendingUp, CloudSun } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const actions = [
    {
      to: '/assistant',
      label: 'Pulse AI Assistant',
      desc: 'Gemini agronomy chat',
      icon: BotMessageSquare,
      color: 'text-lime-accent',
      border: 'hover:border-lime-accent/40',
    },
    {
      to: '/cropvision',
      label: 'Scan Leaf Lesion',
      desc: 'Multimodal CV diagnosis',
      icon: ScanLine,
      color: 'text-emerald-bright',
      border: 'hover:border-emerald-500/40',
    },
    {
      to: '/schemes',
      label: 'Schemes Centre',
      desc: 'Track DBT applications',
      icon: Landmark,
      color: 'text-amber-solar',
      border: 'hover:border-amber-solar/40',
    },
    {
      to: '/mandi',
      label: 'Mandi APMC Prices',
      desc: 'Wholesale benchmarks',
      icon: TrendingUp,
      color: 'text-lime-glow',
      border: 'hover:border-lime-accent/40',
    },
    {
      to: '/pulsewater',
      label: 'Irrigation Valve',
      desc: 'ESP32 solenoid control',
      icon: Droplets,
      color: 'text-cyan-ice',
      border: 'hover:border-cyan-moisture/40',
    },
    {
      to: '/weather',
      label: 'Spray Radar',
      desc: 'Open-Meteo rain alerts',
      icon: CloudSun,
      color: 'text-amber-solar',
      border: 'hover:border-amber-solar/40',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <Link
            key={act.to}
            to={act.to}
            className={`p-4 rounded-2xl noir-card border border-noir-700/80 ${act.border} transition-all duration-200 hover:-translate-y-1 shadow-noir-card group text-left`}
          >
            <div className={`p-2.5 rounded-xl bg-noir-850 border border-noir-700 w-fit mb-2.5 ${act.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-ivory-100 group-hover:text-lime-glow transition">
              {act.label}
            </div>
            <div className="text-[10px] text-ivory-400 font-mono mt-0.5 truncate">{act.desc}</div>
          </Link>
        );
      })}
    </div>
  );
};
