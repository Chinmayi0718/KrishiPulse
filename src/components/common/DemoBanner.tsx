import React from 'react';
import { RotateCcw, Sparkles, Sprout } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DemoBanner: React.FC = () => {
  const { resetDemoData } = useApp();

  return (
    <div className="relative bg-gradient-to-r from-emerald-950 via-forest-900 to-teal-950 text-emerald-100 px-4 py-2.5 text-xs border-b border-emerald-600/40 shadow-sm overflow-hidden">
      {/* Background glowing shimmer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/15 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-glow-green"></span>
          </span>
          <div className="flex items-center gap-1.5 font-medium">
            <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
              Simulated Farm Sandbox
            </span>
            <span className="text-white hidden md:inline font-semibold">
              Mandya Agro-Telemetry Mesh
            </span>
            <span className="text-emerald-200/90 hidden lg:inline">
              • Calibrated local datasets for Cauvery basin • Zero paid API costs
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] bg-white/10 text-emerald-200 px-2.5 py-0.5 rounded-full border border-white/15">
            <Sprout className="w-3 h-3 text-emerald-300" />
            <span>4.5 Acres Live</span>
          </div>
          <button
            onClick={() => {
              if (window.confirm('Reset all demo crops, profile, and sensor values to default demonstration seed data?')) {
                resetDemoData();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1 text-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-lg transition shadow-sm hover:shadow-glow-green"
            title="Reset to default mock state"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
