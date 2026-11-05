import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CropStatusSummary: React.FC = () => {
  const { crops } = useApp();

  return (
    <div className="rounded-3xl noir-card p-6 border border-noir-700/80 shadow-noir-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-lime-accent">
            Field Stand Summary
          </span>
          <h3 className="text-base font-bold text-ivory-100 mt-0.5">Active Crop Holdings</h3>
        </div>
        <Link
          to="/crops"
          className="text-xs text-lime-accent hover:underline font-mono font-bold flex items-center gap-1"
        >
          <span>Manage Crops</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-3">
        {crops.map((crop) => {
          const isOptimal = crop.health === 'Optimal';

          return (
            <div
              key={crop.id}
              className="p-3.5 rounded-2xl bg-noir-850 border border-noir-700 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-lime-accent/15 text-lime-accent border border-lime-accent/30 flex items-center justify-center font-bold">
                  <Sprout className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-ivory-100">{crop.name}</h4>
                  <p className="text-[11px] text-ivory-400 font-mono">
                    {crop.variety} • {crop.areaAcres} Acres ({crop.growthStage})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border ${
                    isOptimal
                      ? 'bg-emerald-500/15 text-emerald-bright border-emerald-500/30'
                      : 'bg-amber-solar/15 text-amber-solar border-amber-solar/30'
                  }`}
                >
                  {crop.health}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
