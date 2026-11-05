import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Power } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SoilMoistureWidget: React.FC = () => {
  const { zones, toggleValve } = useApp();

  const activeZonesCount = zones.filter((z) => z.valveStatus === 'Open').length;
  const criticalZonesCount = zones.filter(
    (z) => z.status === 'Critical Low' || z.status === 'Irrigation Needed'
  ).length;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              PulseWater Telemetry
            </span>
            <h3 className="text-base font-bold text-slate-800">Field Soil Moisture & Valves</h3>
          </div>
          <span className="text-[11px] font-semibold bg-sky-50 text-sky-700 px-2.5 py-1 rounded-full border border-sky-100">
            {activeZonesCount} Valve{activeZonesCount !== 1 ? 's' : ''} Active
          </span>
        </div>

        {/* Zones List */}
        <div className="space-y-3 my-2">
          {zones.map((zone) => {
            const isCritical = zone.status === 'Critical Low';
            const isNeeded = zone.status === 'Irrigation Needed';
            const barColor = isCritical
              ? 'bg-rose-500'
              : isNeeded
              ? 'bg-amber-500'
              : 'bg-emerald-500';

            return (
              <div
                key={zone.id}
                className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-slate-200 transition"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="font-semibold text-slate-800 truncate pr-2">
                    {zone.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">
                      {zone.currentMoisture}%
                    </span>
                    <span className="text-[10px] text-slate-400">
                      (target {zone.targetMoisture}%)
                    </span>
                  </div>
                </div>

                {/* Moisture Bar */}
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                    style={{ width: `${Math.min(zone.currentMoisture, 100)}%` }}
                  />
                </div>

                {/* Valve action footer */}
                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span
                    className={`font-medium ${
                      isCritical
                        ? 'text-rose-600'
                        : isNeeded
                        ? 'text-amber-600'
                        : 'text-emerald-600'
                    }`}
                  >
                    Status: {zone.status}
                  </span>

                  <button
                    onClick={() => toggleValve(zone.id)}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold transition shadow-sm ${
                      zone.valveStatus === 'Open'
                        ? 'bg-sky-600 text-white hover:bg-sky-700'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Power className="w-3 h-3" />
                    <span>{zone.valveStatus === 'Open' ? 'Valve Open' : 'Open Valve'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500">
          {criticalZonesCount > 0 ? (
            <span className="text-amber-600 font-semibold">
              ⚠️ {criticalZonesCount} zone{criticalZonesCount > 1 ? 's' : ''} require watering
            </span>
          ) : (
            'All soil moisture levels adequate'
          )}
        </span>
        <Link
          to="/pulsewater"
          className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition"
        >
          <span>PulseWater Analytics</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
