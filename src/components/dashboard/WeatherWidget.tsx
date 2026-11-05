import React from 'react';
import { Link } from 'react-router-dom';
import { CloudSun, Droplet, Wind, ArrowRight, ShieldCheck, AlertTriangle, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WeatherWidget: React.FC = () => {
  const { weather, profile } = useApp();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800/70 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Microclimate Radar</span>
            </span>
            <h3 className="text-base font-black text-slate-900">
              {profile.district}, {profile.state}
            </h3>
          </div>
          <span className="text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200/80 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Simulated</span>
          </span>
        </div>

        {/* Big Temperature Display with Sun Glow */}
        <div className="flex items-center justify-between my-3 p-4 rounded-2xl bg-gradient-to-r from-amber-50/70 via-emerald-50/50 to-teal-50/50 border border-amber-200/60">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md shadow-amber-500/25">
              <CloudSun className="w-9 h-9" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {weather.temp}°C
              </div>
              <p className="text-xs text-emerald-800 font-bold">
                {weather.condition} • Feels like {weather.feelsLike}°C
              </p>
            </div>
          </div>
        </div>

        {/* Weather Metrics Grid */}
        <div className="grid grid-cols-3 gap-2.5 mt-4 pt-3 border-t border-slate-100 text-center">
          <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-100">
            <div className="flex items-center justify-center gap-1 text-sky-700 text-xs mb-1 font-bold">
              <Droplet className="w-3.5 h-3.5 text-sky-500" />
              <span>Humidity</span>
            </div>
            <span className="text-base font-black text-slate-900">{weather.humidity}%</span>
          </div>

          <div className="p-3 rounded-2xl bg-teal-50/70 border border-teal-100">
            <div className="flex items-center justify-center gap-1 text-teal-700 text-xs mb-1 font-bold">
              <Wind className="w-3.5 h-3.5 text-teal-500" />
              <span>Wind</span>
            </div>
            <span className="text-base font-black text-slate-900">{weather.windSpeed} km/h</span>
          </div>

          <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100">
            <div className="flex items-center justify-center gap-1 text-blue-700 text-xs mb-1 font-bold">
              <Droplet className="w-3.5 h-3.5 text-blue-500" />
              <span>Rain Chance</span>
            </div>
            <span className="text-base font-black text-slate-900">{weather.rainfallChance}%</span>
          </div>
        </div>

        {/* Spray Window Advisory */}
        <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/90 flex items-start gap-2.5 text-xs">
          {weather.sprayAdvisory.recommended ? (
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <span className="font-black text-emerald-950">Spray Window Advisory: </span>
            <span className="text-emerald-800 font-medium">{weather.sprayAdvisory.reason}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium">7-day microclimate horizon</span>
        <Link
          to="/weather"
          className="font-extrabold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition group"
        >
          <span>View Forecast Radar</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
