import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Power, ArrowRight, Radio, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SoilMoistureWidget: React.FC = () => {
  const { zones, toggleValve, isSimulatedSensorMode } = useApp();

  return (
    <div className="rounded-3xl noir-card p-6 border border-noir-700/80 shadow-noir-card flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-ice flex items-center gap-1">
              <Radio className="w-3 h-3 text-cyan-moisture animate-pulse" />
              <span>ESP32 PulseWater Hub</span>
            </span>
            <h3 className="text-base font-bold text-ivory-100 mt-0.5">
              Soil Moisture Telemetry
            </h3>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-moisture/15 text-cyan-ice border border-cyan-moisture/30">
            {zones.filter((z) => z.valveStatus === 'Open').length} Valves Open
          </span>
        </div>

        {/* Zones List with Real-Time Moisture Bars */}
        <div className="space-y-3 my-2">
          {zones.slice(0, 3).map((zone) => {
            const isCritical = zone.status === 'Critical Low';
            const isAttention = zone.status === 'Irrigation Needed';
            const isOpen = zone.valveStatus === 'Open';

            return (
              <div
                key={zone.id}
                className="p-3.5 rounded-2xl bg-noir-850 border border-noir-700 hover:border-noir-600 transition"
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <div>
                    <span className="font-bold text-ivory-100">{zone.name}</span>
                    <span className="text-[11px] text-ivory-400 font-mono block">{zone.crop}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm font-mono font-extrabold ${
                        isCritical
                          ? 'text-rose-400'
                          : isAttention
                          ? 'text-amber-solar'
                          : 'text-lime-glow'
                      }`}
                    >
                      {zone.currentMoisture}%
                    </span>

                    <button
                      onClick={() => toggleValve(zone.id)}
                      className={`p-1.5 rounded-xl border text-xs font-mono transition flex items-center gap-1 ${
                        isOpen
                          ? 'bg-cyan-moisture/25 border-cyan-ice text-cyan-ice shadow-glow-cyan'
                          : 'bg-noir-800 border-noir-700 text-ivory-400 hover:text-ivory-100'
                      }`}
                      title={isOpen ? 'Close Solenoid Valve' : 'Open Solenoid Valve'}
                    >
                      <Power className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Progress Moisture Bar */}
                <div className="w-full bg-noir-700 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isCritical
                        ? 'bg-rose-500'
                        : isAttention
                        ? 'bg-amber-solar'
                        : 'bg-lime-accent'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(10, zone.currentMoisture))}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-noir-700">
        <Link
          to="/pulsewater"
          className="text-xs text-cyan-ice hover:underline font-mono font-bold flex items-center justify-between group"
        >
          <span>PulseWater IoT Hub & Ingestion Docs</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
