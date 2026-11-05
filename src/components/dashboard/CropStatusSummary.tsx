import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowRight, Lightbulb, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const CropStatusSummary: React.FC = () => {
  const { crops } = useApp();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Crops Table Card (2 Cols) */}
      <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Acreage Overview
              </span>
              <h3 className="text-base font-bold text-slate-800">Active Crop Inventory</h3>
            </div>
            <Link
              to="/crops"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Manage Crops</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="pb-2.5">Crop & Variety</th>
                  <th className="pb-2.5">Stage</th>
                  <th className="pb-2.5">Area</th>
                  <th className="pb-2.5">Health</th>
                  <th className="pb-2.5 text-right">Harvest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {crops.map((crop) => (
                  <tr key={crop.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3 font-semibold text-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                          <Sprout className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div>{crop.name}</div>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {crop.variety}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-slate-600 font-medium">
                      {crop.growthStage}
                    </td>
                    <td className="py-3 font-bold text-slate-700">
                      {crop.areaAcres} Acres
                    </td>
                    <td className="py-3">
                      <Badge
                        variant={
                          crop.health === 'Optimal'
                            ? 'success'
                            : crop.health === 'Attention'
                            ? 'warning'
                            : 'danger'
                        }
                        size="sm"
                      >
                        {crop.health}
                      </Badge>
                    </td>
                    <td className="py-3 text-right font-medium text-slate-500">
                      {new Date(crop.expectedHarvest).toLocaleDateString('en-IN', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Total cultivated: <strong>{crops.reduce((acc, c) => acc + c.areaAcres, 0)} Acres</strong>
          </span>
          <span className="text-emerald-700 font-medium">
            ✅ All crops mapped to irrigation zones
          </span>
        </div>
      </div>

      {/* AI Agricultural Insights Card (1 Col) */}
      <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-white/10 text-emerald-300 backdrop-blur">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  Daily Agronomy Intelligence
                </span>
                <h3 className="text-base font-bold text-white">Smart Farm Insights</h3>
              </div>
            </div>
            <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 px-2 py-0.5 rounded-full">
              Simulated
            </span>
          </div>

          <div className="space-y-3.5 my-3 text-xs leading-relaxed">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-200">Ragi Plot Moisture Low</p>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Zone C soil moisture has reached 33%. Turn on sprinkler valve for 60 min to protect grain filling.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-200">Optimal Morning Spray Window</p>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Atmospheric wind speed is 11 km/h. Suitable for foliar Pseudomonas application on paddy blast.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-emerald-800/80 flex items-center justify-between text-xs">
          <span className="text-emerald-300/80">Need specialized advice?</span>
          <Link
            to="/assistant"
            className="font-bold text-white hover:text-emerald-200 flex items-center gap-1 transition"
          >
            <span>Ask Assistant</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
