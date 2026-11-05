import React from 'react';
import { Info, RotateCcw, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DemoBanner: React.FC = () => {
  const { resetDemoData } = useApp();

  return (
    <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-emerald-100 px-4 py-2 text-xs md:text-sm border-b border-emerald-700/50 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span className="text-white font-semibold">Simulated Demo Environment:</span>
            <span className="text-emerald-200 hidden md:inline">
              Running entirely locally with fictional farmer & telemetry datasets for Mandya, Karnataka. No live hardware, paid APIs, or cloud models attached.
            </span>
            <span className="text-emerald-200 md:hidden">
              Local simulated data active.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[11px] bg-emerald-950/60 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700/60">
            <Info className="w-3 h-3" />
            <span>Mock Mode</span>
          </div>
          <button
            onClick={() => {
              if (window.confirm('Reset all demo crops, profile, and sensor values to default demonstration seed data?')) {
                resetDemoData();
              }
            }}
            className="flex items-center gap-1 px-2.5 py-1 text-xs bg-emerald-700/80 hover:bg-emerald-600 text-white font-medium rounded transition shadow-sm"
            title="Reset to default mock state"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
