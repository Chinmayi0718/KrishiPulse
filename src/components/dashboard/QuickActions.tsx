import React from 'react';
import { Link } from 'react-router-dom';
import { ScanLine, Droplets, BotMessageSquare, PlusCircle } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const actions = [
    {
      to: '/cropvision',
      label: 'Scan Crop Leaf',
      desc: 'Simulated AI diagnosis',
      icon: ScanLine,
      color: 'from-emerald-700 via-forest-800 to-teal-900',
      iconBg: 'bg-white/20 text-white',
      badge: 'Vision AI',
    },
    {
      to: '/pulsewater',
      label: 'Check Soil Moisture',
      desc: 'Probe sensor mesh',
      icon: Droplets,
      color: 'from-sky-600 via-cyan-700 to-blue-900',
      iconBg: 'bg-white/20 text-white',
      badge: 'IoT Sensors',
    },
    {
      to: '/assistant',
      label: 'Ask AI Agronomist',
      desc: 'Demo farming advice',
      icon: BotMessageSquare,
      color: 'from-teal-700 via-emerald-800 to-green-950',
      iconBg: 'bg-white/20 text-white',
      badge: 'Local AI',
    },
    {
      to: '/crops',
      label: 'Add / View Crops',
      desc: 'Acreage & harvests',
      icon: PlusCircle,
      color: 'from-amber-600 via-orange-700 to-emerald-950',
      iconBg: 'bg-white/20 text-white',
      badge: '4.5 Acres',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <Link
            key={act.label}
            to={act.to}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${act.color} text-white p-5 shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group`}
          >
            {/* Subtle glow circle */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/10 blur-xl group-hover:scale-150 transition-transform pointer-events-none" />

            <div className="flex items-center justify-between mb-3 relative z-10">
              <div className={`p-3 rounded-2xl ${act.iconBg} backdrop-blur shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-200 bg-white/15 backdrop-blur px-2.5 py-0.5 rounded-full border border-white/10">
                {act.badge}
              </span>
            </div>
            <h4 className="font-black text-sm sm:text-base leading-tight group-hover:text-amber-200 transition relative z-10">
              {act.label}
            </h4>
            <p className="text-xs text-emerald-100/80 mt-1 font-semibold relative z-10">{act.desc}</p>
          </Link>
        );
      })}
    </div>
  );
};
