import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Power, Droplets, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SoilMoistureWidget: React.FC = () => {
  const { zones, toggleValve } = useApp();

  const activeZonesCount = zones.filter((z) => z.valveStatus === 'Open').length;
  const criticalZonesCount = zones.filter(
    (z) => z.status === 'Critical Low' || z.status === 'Irrigation Needed'
  ).length;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-sky-700 flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-sky-600" />
              <span>PulseWater Probes</span>
            </span>
            <h3 className="text-base font-black text-slate-900">Soil Moisture & Solenoid Valves</h3>
          </div>
          <span className="text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200 px-3 py-1 rounded-full">
            {activeZonesCount} Valve{activeZonesCount !== 1 ? 's' : ''} Open
          </span>
        </div>

        {/* Zones List with Glowing Gauges */}
        <div className="space-y-3.5 my-2">
          {zones.map((zone) => {
            const isCritical = zone.status === 'Critical Low';
            const isNeeded = zone.status === 'Irrigation Needed';
            const isOpen = zone.valveStatus === 'Open';

            const barGradient = isCritical
              ? 'bg-gradient-to-r from-rose-500 to-red-600'
              : isNeeded
              ? 'bg-gradient-to-r from-amber-400 to-orange-500'
              : 'bg-gradient-to-r from-emerald-400 to-teal-500';

            return (
              <div
                key={zone.id}
                className={`p-3.5 rounded-2xl transition border ${
                  isOpen
                    ? 'bg-sky-50/50 border-sky-300 ring-1 ring-sky-200'
                    : 'bg-slate-50/70 border-slate-200/80 hover:border-emerald-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="font-extrabold text-slate-900 truncate pr-2">
                    {zone.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 text-sm">
                      {zone.currentMoisture}%
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">
                      (target {zone.targetMoisture}%)
                    </span>
                  </div>
                </div>

                {/* Animated Moisture Bar */}
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden mb-2.5 p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${barGradient}`}
                    style={{ width: `${Math.min(zone.currentMoisture, 100)}%` }}
                  />
                </div>

                {/* Valve action footer */}
                <div className="flex items-center justify-between text-[11px]">
                  <span
                    className={`font-bold ${
                      isCritical
                        ? 'text-rose-600'
                        : isNeeded
                        ? 'text-amber-600'
                        : 'text-emerald-700'
                    }`}
                  >
                    Status: {zone.status}
                  </span>

                  <button
                    onClick={() => toggleValve(zone.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black transition shadow-xs ${
                      isOpen
                        ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-glow-blue'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>{isOpen ? 'Valve Open' : 'Turn On Valve'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-600 font-medium">
          {criticalZonesCount > 0 ? (
            <span className="text-amber-600 font-bold">
              ⚠️ {criticalZonesCount} zone{criticalZonesCount > 1 ? 's' : ''} require watering
            </span>
          ) : (
            'All soil moisture levels adequate'
          )}
        </span>
        <Link
          to="/pulsewater"
          className="font-extrabold text-sky-700 hover:text-sky-800 flex items-center gap-1 transition group"
        >
          <span>PulseWater Analytics</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
