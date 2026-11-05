import React from 'react';
import { RotateCcw, Sparkles, Sprout, Radio } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DemoBanner: React.FC = () => {
  const { resetDemoData, isSimulatedSensorMode, toggleSimulatedSensorMode } = useApp();

  return (
    <div className="relative bg-noir-900 border-b border-noir-700/80 text-ivory-200 px-4 py-2 text-xs overflow-hidden z-40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-accent"></span>
          </span>
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-lime-accent/15 text-lime-glow font-mono font-bold px-2 py-0.5 rounded border border-lime-accent/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-lime-accent" />
              MONSOON NOIR v2.4
            </span>
            <span className="text-ivory-100 hidden md:inline font-semibold">
              Cauvery Basin Agricultural Command Centre
            </span>
            <span className="text-ivory-400 hidden lg:inline font-mono text-[11px]">
              • IoT Telemetry + Gemini 1.5 Flash + Open-Meteo Weather
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleSimulatedSensorMode}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-mono rounded-lg border transition ${
              isSimulatedSensorMode
                ? 'bg-cyan-moisture/15 border-cyan-moisture/30 text-cyan-ice'
                : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-bright'
            }`}
          >
            <Radio className="w-3 h-3 animate-pulse" />
            <span>{isSimulatedSensorMode ? 'Simulated Telemetry' : 'Hardware Stream'}</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset all crops, profile, and telemetry records to default demo state?')) {
                resetDemoData();
              }
            }}
            className="flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-mono bg-noir-800 hover:bg-noir-750 text-ivory-200 border border-noir-700 hover:border-lime-accent/40 rounded-lg transition"
            title="Reset to default seed state"
          >
            <RotateCcw className="w-3 h-3 text-lime-accent" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
