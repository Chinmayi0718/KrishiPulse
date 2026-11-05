import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  onClick?: () => void;
  badge?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBgColor = 'bg-lime-accent/15',
  iconColor = 'text-lime-accent',
  trend,
  onClick,
  badge,
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl noir-card p-5 border border-noir-700/80 shadow-noir-card transition-all duration-200 hover:-translate-y-1 hover:border-lime-accent/40 ${
        onClick ? 'cursor-pointer hover:shadow-glow-lime' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-ivory-400">
              {title}
            </span>
            {badge && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lime-accent/15 text-lime-glow border border-lime-accent/30">
                {badge}
              </span>
            )}
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-extrabold text-ivory-100 tracking-tight">
            {value}
          </div>
          {subtitle && <p className="text-xs text-ivory-400 font-mono">{subtitle}</p>}
        </div>

        <div className={`p-3 rounded-xl border border-noir-700 ${iconBgColor} ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {trend && (
        <div className="mt-3 pt-3 border-t border-noir-700 flex items-center justify-between text-xs font-mono">
          <span className={trend.isPositive ? 'text-emerald-bright font-bold' : 'text-amber-solar font-bold'}>
            {trend.value}
          </span>
          {trend.label && <span className="text-ivory-400">{trend.label}</span>}
        </div>
      )}
    </div>
  );
};
