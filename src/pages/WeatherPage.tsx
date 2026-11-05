import React from 'react';
import { useApp } from '../context/AppContext';
import {
  CloudSun,
  Droplets,
  Wind,
  Sun,
  CloudRain,
  CloudLightning,
  Cloud,
  Thermometer,
  ShieldCheck,
  AlertTriangle,
  Umbrella,
  Calendar,
  Sparkles,
} from 'lucide-react';

export const WeatherPage: React.FC = () => {
  const { weather, profile } = useApp();

  const getForecastIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-8 h-8 text-amber-500 animate-pulse" />;
      case 'CloudRain':
        return <CloudRain className="w-8 h-8 text-sky-500" />;
      case 'CloudLightning':
        return <CloudLightning className="w-8 h-8 text-indigo-500" />;
      case 'Cloud':
        return <Cloud className="w-8 h-8 text-slate-400" />;
      case 'SunCloud':
      default:
        return <CloudSun className="w-8 h-8 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-0.5 rounded-full shadow-xs">
              Microclimate Radar
            </span>
            <span className="text-xs text-amber-900 font-bold">• Simulated Agricultural Forecast</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Weather & Spraying Advisory
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl font-medium">
            Simulated hyper-local weather conditions for {profile.location}, Mandya District.
            Plan fertilizer spraying windows, irrigation postponement, and harvesting with confidence.
          </p>
        </div>
      </div>

      {/* Main Current Weather Card with Sunrise Gradient */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-forest-900 to-amber-950 text-white p-7 sm:p-9 shadow-lg border border-amber-500/20">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-400/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date().toLocaleDateString('en-IN', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <span>•</span>
              <span>Mandya Agro-station (Simulated)</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400 via-orange-400 to-amber-600 flex items-center justify-center text-white shadow-xl shadow-amber-500/30">
                <CloudSun className="w-14 h-14" />
              </div>
              <div>
                <div className="text-5xl sm:text-6xl font-black tracking-tight text-white drop-shadow-sm">
                  {weather.temp}°C
                </div>
                <div className="text-sm text-amber-200 font-extrabold mt-1">
                  {weather.condition} • Feels like {weather.feelsLike}°C
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Pills with Glowing Accents */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs text-sky-200 mb-1 font-bold">
                <Droplets className="w-4 h-4 text-sky-300" />
                <span>Humidity</span>
              </div>
              <div className="text-2xl font-black">{weather.humidity}%</div>
              <div className="text-[10px] text-emerald-200/80 mt-0.5 font-medium">Moderate vapor</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs text-teal-200 mb-1 font-bold">
                <Wind className="w-4 h-4 text-teal-300" />
                <span>Wind Velocity</span>
              </div>
              <div className="text-2xl font-black">{weather.windSpeed} km/h</div>
              <div className="text-[10px] text-emerald-200/80 mt-0.5 font-medium">{weather.windDirection}</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs text-blue-200 mb-1 font-bold">
                <Umbrella className="w-4 h-4 text-blue-300" />
                <span>Rainfall</span>
              </div>
              <div className="text-2xl font-black">{weather.rainfallMm} mm</div>
              <div className="text-[10px] text-emerald-200/80 mt-0.5 font-medium">{weather.rainfallChance}% chance</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs text-amber-200 mb-1 font-bold">
                <Thermometer className="w-4 h-4 text-amber-300" />
                <span>Soil Temp</span>
              </div>
              <div className="text-2xl font-black">{weather.soilTemp}°C</div>
              <div className="text-[10px] text-emerald-200/80 mt-0.5 font-medium">At 15cm depth</div>
            </div>
          </div>
        </div>
      </div>

      {/* Spray Window & Farming Operations Advisory with Rich Contrast */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <div className="bg-white rounded-3xl p-7 border border-emerald-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-800 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Spray Window Intelligence</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">
              Is it a good time to spray fertilizers or pesticides?
            </h3>
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 my-3">
              <div className="flex items-center gap-2 font-black text-emerald-950 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Favorable Window Open Until 11:30 AM</span>
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                {weather.sprayAdvisory.reason} Low wind drift hazard ensures droplets settle on foliage without chemical evaporation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs pt-4 border-t border-slate-100 font-medium">
            <div>
              <span className="text-slate-400 block text-[11px]">Recommended Wind Speed:</span>
              <span className="font-extrabold text-slate-800">&lt; 15 km/h (Current: 11 km/h)</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">UV Index Hazard:</span>
              <span className="font-extrabold text-slate-800">{weather.uvIndex} (Moderate)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-7 border border-emerald-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-700 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Monsoon Precipitation Outlook</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">
              Showers Predicted on Friday & Saturday
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed my-3 font-medium">
              Simulated meteorological model indicates afternoon convective thunderstorms across Mandya and Maddur on Friday and Saturday (65%–80% rain chance).
            </p>
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1 font-medium">
              <div className="font-black text-amber-900">Agronomic Actions Recommended:</div>
              <div>• Postpone heavy furrow flood irrigation on Thursday.</div>
              <div>• Ensure field drainage trenches in paddy wetlands are clear of debris.</div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between font-medium">
            <span>Air Quality Index: {weather.airQuality}</span>
            <span>Sunrise: {weather.sunrise} • Sunset: {weather.sunset}</span>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Extended Horizon
            </span>
            <h3 className="text-xl font-black text-slate-900">7-Day Simulated Agro-Forecast</h3>
          </div>
          <span className="text-xs text-emerald-800 font-extrabold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Mandya District
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5">
          {weather.forecast7Days.map((f, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-between transition-all duration-200 hover:scale-105 ${
                idx === 0
                  ? 'bg-gradient-to-b from-amber-50/80 to-emerald-50/80 border-amber-300 ring-2 ring-amber-200 shadow-xs'
                  : 'bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-emerald-300 shadow-2xs'
              }`}
            >
              <div>
                <span className="text-xs font-black text-slate-900 block">{f.day}</span>
                <span className="text-[10px] text-slate-400 font-bold">{f.date}</span>
              </div>

              <div className="my-3.5">{getForecastIcon(f.iconName)}</div>

              <div>
                <div className="text-sm font-black text-slate-900">
                  {f.tempMax}° / <span className="text-slate-400 font-normal">{f.tempMin}°</span>
                </div>
                <div className="text-[10px] text-slate-600 font-bold mt-1 truncate max-w-[80px]">
                  {f.condition}
                </div>
                <div className="text-[11px] font-black text-sky-600 mt-1">
                  💧 {f.rainChance}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
