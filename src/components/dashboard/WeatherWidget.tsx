import React from 'react';
import { Link } from 'react-router-dom';
import { CloudSun, Droplet, Wind, ArrowRight, ShieldCheck, AlertTriangle, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WeatherWidget: React.FC = () => {
  const { weather, profile } = useApp();

  return (
    <div className="rounded-3xl noir-card p-6 border border-noir-700/80 shadow-noir-card flex flex-col justify-between relative overflow-hidden">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-lime-accent flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-lime-accent" />
              <span>Open-Meteo Microclimate</span>
            </span>
            <h3 className="text-base font-bold text-ivory-100 mt-0.5">
              {profile.district}, {profile.state}
            </h3>
          </div>
          <span className="text-xs font-mono font-bold bg-noir-850 text-cyan-ice border border-cyan-moisture/40 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-cyan-ice animate-pulse"></span>
            <span>{weather.isLive ? 'Live API' : 'Simulated'}</span>
          </span>
        </div>

        {/* Big Temperature Display */}
        <div className="flex items-center justify-between my-3 p-4 rounded-2xl bg-noir-850 border border-noir-700">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-solar/20 text-amber-solar border border-amber-solar/40 flex items-center justify-center shadow-glow-amber">
              <CloudSun className="w-8 h-8" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-mono font-black text-ivory-100 tracking-tight">
                {weather.temp}°C
              </div>
              <p className="text-xs text-lime-glow font-mono font-medium">
                {weather.condition} • Feels like {weather.feelsLike}°C
              </p>
            </div>
          </div>
        </div>

        {/* Weather Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-noir-700 text-center font-mono">
          <div className="p-2.5 rounded-xl bg-noir-850 border border-noir-700">
            <div className="flex items-center justify-center gap-1 text-cyan-ice text-[11px] mb-0.5">
              <Droplet className="w-3 h-3" />
              <span>Humidity</span>
            </div>
            <span className="text-sm font-bold text-ivory-100">{weather.humidity}%</span>
          </div>

          <div className="p-2.5 rounded-xl bg-noir-850 border border-noir-700">
            <div className="flex items-center justify-center gap-1 text-emerald-bright text-[11px] mb-0.5">
              <Wind className="w-3 h-3" />
              <span>Wind</span>
            </div>
            <span className="text-sm font-bold text-ivory-100">{weather.windSpeed} km/h</span>
          </div>

          <div className="p-2.5 rounded-xl bg-noir-850 border border-noir-700">
            <div className="flex items-center justify-center gap-1 text-amber-solar text-[11px] mb-0.5">
              <span>Rain</span>
            </div>
            <span className="text-sm font-bold text-ivory-100">{weather.rainfallChance}%</span>
          </div>
        </div>

        {/* Agricultural Spray Advisory Banner */}
        <div
          className={`mt-4 p-3 rounded-2xl border text-xs leading-relaxed flex items-start gap-2.5 ${
            weather.sprayAdvisory.recommended
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-amber-solar/10 border-amber-solar/30 text-amber-300'
          }`}
        >
          {weather.sprayAdvisory.recommended ? (
            <ShieldCheck className="w-4 h-4 text-emerald-bright flex-shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-solar flex-shrink-0 mt-0.5" />
          )}
          <div>
            <span className="font-bold font-mono">
              {weather.sprayAdvisory.recommended ? 'Spray Window Safe' : 'Foliar Spray Postponed'}
            </span>
            <p className="text-[11px] text-ivory-300 mt-0.5">{weather.sprayAdvisory.reason}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-noir-700">
        <Link
          to="/weather"
          className="text-xs text-lime-accent hover:underline font-mono font-bold flex items-center justify-between group"
        >
          <span>View 7-Day Precision Forecast</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
