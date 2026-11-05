import React from 'react';
import { Link } from 'react-router-dom';
import { CloudSun, Droplet, Wind, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WeatherWidget: React.FC = () => {
  const { weather, profile } = useApp();

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Live Field Weather (Simulated)
            </span>
            <h3 className="text-base font-bold text-slate-800">
              {profile.district}, {profile.state}
            </h3>
          </div>
          <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Simulated
          </span>
        </div>

        {/* Big Temperature Display */}
        <div className="flex items-center justify-between my-2">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500">
              <CloudSun className="w-8 h-8" />
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {weather.temp}°C
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {weather.condition} • Feels like {weather.feelsLike}°C
              </p>
            </div>
          </div>
        </div>

        {/* Weather Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 text-center">
          <div className="p-2.5 rounded-xl bg-slate-50">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
              <Droplet className="w-3.5 h-3.5 text-sky-500" />
              <span>Humidity</span>
            </div>
            <span className="text-sm font-bold text-slate-800">{weather.humidity}%</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
              <Wind className="w-3.5 h-3.5 text-teal-500" />
              <span>Wind</span>
            </div>
            <span className="text-sm font-bold text-slate-800">{weather.windSpeed} km/h</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
              <Droplet className="w-3.5 h-3.5 text-blue-500" />
              <span>Rain Chance</span>
            </div>
            <span className="text-sm font-bold text-slate-800">{weather.rainfallChance}%</span>
          </div>
        </div>

        {/* Spray Window Advisory */}
        <div className="mt-4 p-3 rounded-xl bg-emerald-50/70 border border-emerald-100/90 flex items-start gap-2.5 text-xs">
          {weather.sprayAdvisory.recommended ? (
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <span className="font-bold text-emerald-950">Spray Advisory: </span>
            <span className="text-emerald-800">{weather.sprayAdvisory.reason}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-400">7-day forecast available</span>
        <Link
          to="/weather"
          className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition"
        >
          <span>View Forecast</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
