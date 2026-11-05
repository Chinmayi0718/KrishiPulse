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
} from 'lucide-react';

export const WeatherPage: React.FC = () => {
  const { weather, profile } = useApp();

  const getForecastIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-6 h-6 text-amber-500" />;
      case 'CloudRain':
        return <CloudRain className="w-6 h-6 text-sky-500" />;
      case 'CloudLightning':
        return <CloudLightning className="w-6 h-6 text-indigo-500" />;
      case 'Cloud':
        return <Cloud className="w-6 h-6 text-slate-400" />;
      case 'SunCloud':
      default:
        return <CloudSun className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
              Microclimate Radar
            </span>
            <span className="text-xs text-slate-500">• Simulated Agricultural Forecast</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Weather & Spraying Advisory
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Simulated hyper-local weather conditions for {profile.location}, Mandya District.
            Plan fertilization, pesticide spraying, and harvesting windows with confidence.
          </p>
        </div>
      </div>

      {/* Main Current Weather Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
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

            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 shadow-inner backdrop-blur">
                <CloudSun className="w-12 h-12" />
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                  {weather.temp}°C
                </div>
                <div className="text-sm text-emerald-200 font-medium mt-1">
                  {weather.condition} • Feels like {weather.feelsLike}°C
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-emerald-200 mb-1">
                <Droplets className="w-4 h-4 text-sky-300" />
                <span>Humidity</span>
              </div>
              <div className="text-xl font-bold">{weather.humidity}%</div>
              <div className="text-[10px] text-emerald-300/80 mt-0.5">Moderate vapor</div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-emerald-200 mb-1">
                <Wind className="w-4 h-4 text-teal-300" />
                <span>Wind Velocity</span>
              </div>
              <div className="text-xl font-bold">{weather.windSpeed} km/h</div>
              <div className="text-[10px] text-emerald-300/80 mt-0.5">{weather.windDirection}</div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-emerald-200 mb-1">
                <Umbrella className="w-4 h-4 text-blue-300" />
                <span>Precipitation</span>
              </div>
              <div className="text-xl font-bold">{weather.rainfallMm} mm</div>
              <div className="text-[10px] text-emerald-300/80 mt-0.5">{weather.rainfallChance}% chance</div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-emerald-200 mb-1">
                <Thermometer className="w-4 h-4 text-amber-300" />
                <span>Soil Temp</span>
              </div>
              <div className="text-xl font-bold">{weather.soilTemp}°C</div>
              <div className="text-[10px] text-emerald-300/80 mt-0.5">At 15cm depth</div>
            </div>
          </div>
        </div>
      </div>

      {/* Spray Window & Farming Operations Advisory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Spray Window Intelligence</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Is it a good time to spray fertilizers or pesticides?
            </h3>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 my-3">
              <div className="flex items-center gap-2 font-bold text-emerald-900 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Favorable Window Open Until 11:30 AM</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                {weather.sprayAdvisory.reason} Low wind drift hazard ensures droplets settle on foliage without chemical evaporation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-100">
            <div>
              <span className="text-slate-400 block text-[11px]">Recommended Wind Speed:</span>
              <span className="font-semibold text-slate-700">&lt; 15 km/h (Current: 11 km/h)</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">UV Index Hazard:</span>
              <span className="font-semibold text-slate-700">{weather.uvIndex} (Moderate)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Weekend Weather Outlook</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Upcoming Showers on Friday & Saturday
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed my-3">
              Simulated meteorological model indicates afternoon convective thunderstorms across Mandya and Maddur on Friday and Saturday (65%–80% rain chance).
            </p>
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 space-y-1">
              <div className="font-bold">Agronomic Actions Recommended:</div>
              <div>• Postpone heavy furrow flood irrigation on Thursday.</div>
              <div>• Ensure field drainage trenches in paddy wetlands are clear of debris.</div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between">
            <span>Air Quality Index: {weather.airQuality}</span>
            <span>Sunrise: {weather.sunrise} • Sunset: {weather.sunset}</span>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast Grid */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Extended Horizon
            </span>
            <h3 className="text-lg font-bold text-slate-900">7-Day Simulated Agro-Forecast</h3>
          </div>
          <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
            Mandya District
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {weather.forecast7Days.map((f, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-between transition ${
                idx === 0
                  ? 'bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-200'
                  : 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-100/60'
              }`}
            >
              <div>
                <span className="text-xs font-bold text-slate-800 block">{f.day}</span>
                <span className="text-[10px] text-slate-400 font-medium">{f.date}</span>
              </div>

              <div className="my-3">{getForecastIcon(f.iconName)}</div>

              <div>
                <div className="text-sm font-extrabold text-slate-800">
                  {f.tempMax}° / <span className="text-slate-400 font-normal">{f.tempMin}°</span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium mt-1 truncate max-w-[80px]">
                  {f.condition}
                </div>
                <div className="text-[10px] font-bold text-sky-600 mt-1">
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
