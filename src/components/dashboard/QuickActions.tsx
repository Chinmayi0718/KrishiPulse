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
      color: 'from-emerald-700 to-emerald-900',
      iconBg: 'bg-emerald-600/30 text-emerald-200',
    },
    {
      to: '/pulsewater',
      label: 'Check Soil Moisture',
      desc: 'Sensor telemetries',
      icon: Droplets,
      color: 'from-teal-700 to-teal-900',
      iconBg: 'bg-teal-600/30 text-teal-200',
    },
    {
      to: '/assistant',
      label: 'Ask AI Agronomist',
      desc: 'Demo farming guidance',
      icon: BotMessageSquare,
      color: 'from-emerald-800 to-green-950',
      iconBg: 'bg-emerald-600/30 text-emerald-200',
    },
    {
      to: '/crops',
      label: 'Add / View Crops',
      desc: 'Manage acreage & harvest',
      icon: PlusCircle,
      color: 'from-slate-800 to-slate-900',
      iconBg: 'bg-slate-700/50 text-slate-300',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <Link
            key={act.label}
            to={act.to}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${act.color} text-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${act.iconBg} backdrop-blur`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/80 bg-white/10 px-2 py-0.5 rounded-full">
                Quick Action
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base leading-tight group-hover:text-emerald-200 transition">
              {act.label}
            </h4>
            <p className="text-xs text-white/70 mt-1 font-medium">{act.desc}</p>
          </Link>
        );
      })}
    </div>
  );
};
