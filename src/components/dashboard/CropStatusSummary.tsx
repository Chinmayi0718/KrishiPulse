import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowRight, Lightbulb, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const CropStatusSummary: React.FC = () => {
  const { crops } = useApp();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Crops Table Card (2 Cols) */}
      <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800/70 flex items-center gap-1">
                <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                <span>Field Inventory</span>
              </span>
              <h3 className="text-base font-black text-slate-900">Active Crop Inventory</h3>
            </div>
            <Link
              to="/crops"
              className="text-xs font-black text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
            >
              <span>Manage Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="pb-3">Crop & Variety</th>
                  <th className="pb-3">Stage</th>
                  <th className="pb-3">Area</th>
                  <th className="pb-3">Health</th>
                  <th className="pb-3 text-right">Harvest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {crops.map((crop) => (
                  <tr key={crop.id} className="hover:bg-emerald-50/40 transition">
                    <td className="py-3.5 font-bold text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                          <Sprout className="w-4 h-4 text-emerald-700" />
                        </div>
                        <div>
                          <div>{crop.name}</div>
                          <span className="text-[10px] text-slate-400 font-semibold">
                            {crop.variety}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 text-slate-700 font-semibold">
                      {crop.growthStage}
                    </td>
                    <td className="py-3.5 font-black text-slate-900">
                      {crop.areaAcres} Ac
                    </td>
                    <td className="py-3.5">
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
                    <td className="py-3.5 text-right font-bold text-slate-600">
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

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>
            Total cultivated: <strong className="text-slate-800">{crops.reduce((acc, c) => acc + c.areaAcres, 0)} Acres</strong>
          </span>
          <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">
            ✅ All zones irrigated
          </span>
        </div>
      </div>

      {/* AI Agricultural Insights Card (1 Col) with Rich Emerald Gradients */}
      <div className="bg-gradient-to-br from-emerald-950 via-forest-900 to-teal-950 text-white rounded-3xl p-6 sm:p-7 shadow-md flex flex-col justify-between border border-emerald-500/20 relative overflow-hidden">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-2xl bg-white/10 text-amber-300 backdrop-blur">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Agronomy Intelligence</span>
                </span>
                <h3 className="text-base font-black text-white">Smart Farm Insights</h3>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-2.5 py-0.5 rounded-full">
              Simulated
            </span>
          </div>

          <div className="space-y-3.5 my-3 text-xs leading-relaxed">
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-amber-200">Zone C Moisture Deficit</p>
                <p className="text-slate-200 text-[11px] mt-0.5 font-medium leading-snug">
                  Ragi soil moisture is at 33%. Turn on sprinkler valve for 60 min to protect earhead grain filling.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-emerald-200">Optimal Spraying Window</p>
                <p className="text-slate-200 text-[11px] mt-0.5 font-medium leading-snug">
                  Atmospheric wind speed is 11 km/h. Suitable for foliar bio-control application on paddy blast.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-emerald-800/80 flex items-center justify-between text-xs font-semibold">
          <span className="text-emerald-200/80">Need expert advice?</span>
          <Link
            to="/assistant"
            className="font-black text-amber-300 hover:text-amber-200 flex items-center gap-1 transition"
          >
            <span>Ask Assistant</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
