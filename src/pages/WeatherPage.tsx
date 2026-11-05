import React, { useState } from 'react';
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
  RefreshCw,
  MapPin,
  Clock,
  Navigation,
} from 'lucide-react';

const PRESET_LOCATIONS = [
  { name: 'Mandya (Maddur Taluk)', district: 'Mandya', state: 'Karnataka', lat: 12.5842, lon: 77.0427 },
  { name: 'Bengaluru Rural (Doddaballapur)', district: 'Bengaluru Rural', state: 'Karnataka', lat: 13.2929, lon: 77.5401 },
  { name: 'Mysuru (Nanjangud)', district: 'Mysuru', state: 'Karnataka', lat: 12.1197, lon: 76.6787 },
  { name: 'Belagavi (Athani Sugar Belt)', district: 'Belagavi', state: 'Karnataka', lat: 16.7328, lon: 75.0592 },
  { name: 'Shimoga (Bhadravathi)', district: 'Shimoga', state: 'Karnataka', lat: 13.8407, lon: 75.7039 },
  { name: 'Pune (Baramati)', district: 'Pune', state: 'Maharashtra', lat: 18.1517, lon: 74.5771 },
];

export const WeatherPage: React.FC = () => {
  const { weather, profile, updateProfile, refreshWeather, isLoadingWeather } = useApp();
  const [selectedPreset, setSelectedPreset] = useState(profile.district);

  const handleLocationChange = async (preset: typeof PRESET_LOCATIONS[0]) => {
    setSelectedPreset(preset.district);
    const updated = {
      ...profile,
      district: preset.district,
      state: preset.state,
      location: `${preset.name}, ${preset.district}`,
      latitude: preset.lat,
      longitude: preset.lon,
    };
    updateProfile(updated);
  };

  const handleUseBrowserGPS = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = Number(pos.coords.latitude.toFixed(4));
          const lon = Number(pos.coords.longitude.toFixed(4));
          const updated = {
            ...profile,
            location: `GPS Field Location (${lat}, ${lon})`,
            latitude: lat,
            longitude: lon,
          };
          updateProfile(updated);
        },
        (err) => {
          alert('Location access denied or unavailable. Using default Mandya coordinates.');
        }
      );
    }
  };

  const getForecastIcon = (iconName: string) => {
    switch (iconName) {
      case 'sun':
        return <Sun className="w-6 h-6 text-amber-solar animate-pulse" />;
      case 'cloud-rain':
        return <CloudRain className="w-6 h-6 text-cyan-ice" />;
      case 'cloud-lightning':
        return <CloudLightning className="w-6 h-6 text-indigo-400" />;
      case 'cloud':
        return <Cloud className="w-6 h-6 text-ivory-400" />;
      case 'cloud-sun':
      default:
        return <CloudSun className="w-6 h-6 text-amber-solar" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden noir-card border border-noir-700/80 shadow-noir-elevated p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-cyan-moisture/15 text-cyan-ice border border-cyan-moisture/30 shadow-glow-cyan">
                <CloudSun className="w-5 h-5" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-ice">
                Satellite Open-Meteo Integration
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ivory-100 tracking-tight">
              Weather & Spray Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-ivory-300 mt-1 max-w-2xl leading-relaxed">
              Hyper-local precipitation radar, spray drift window verification, and irrigation postponement advisory.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleUseBrowserGPS}
              className="px-3.5 py-2 rounded-xl bg-noir-850 hover:bg-noir-800 text-ivory-300 border border-noir-700 text-xs font-mono flex items-center justify-center gap-1.5 transition"
              title="Detect GPS Coordinates"
            >
              <Navigation className="w-3.5 h-3.5 text-lime-accent" />
              <span>Detect GPS</span>
            </button>

            <button
              onClick={refreshWeather}
              disabled={isLoadingWeather}
              className="px-4 py-2 rounded-xl bg-lime-accent text-noir-950 font-mono font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-lime-glow transition shadow-glow-lime disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-noir-950 ${isLoadingWeather ? 'animate-spin' : ''}`} />
              <span>{isLoadingWeather ? 'Fetching...' : 'Sync Weather'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* LOCATION PRESETS BAR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-mono text-ivory-400 whitespace-nowrap mr-1 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-lime-accent" />
          <span>Taluk Select:</span>
        </span>
        {PRESET_LOCATIONS.map((loc) => (
          <button
            key={loc.district}
            onClick={() => handleLocationChange(loc)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition whitespace-nowrap ${
              selectedPreset === loc.district
                ? 'bg-lime-accent/20 border border-lime-accent/50 text-lime-glow font-bold'
                : 'bg-noir-850 border border-noir-700 text-ivory-300 hover:bg-noir-800'
            }`}
          >
            {loc.name}
          </button>
        ))}
      </div>

      {/* MAIN CURRENT WEATHER DISPLAY */}
      <div className="rounded-3xl noir-card p-6 sm:p-8 border border-noir-700 shadow-noir-card relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-noir-700">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-lime-accent">
                {profile.location}
              </span>
              <span className="text-ivory-400 text-xs font-mono">
                ({profile.latitude.toFixed(2)}° N, {profile.longitude.toFixed(2)}° E)
              </span>
            </div>
            <div className="text-3xl sm:text-5xl font-mono font-black text-ivory-100 mt-2">
              {weather.temp}°C
            </div>
            <p className="text-xs text-lime-glow font-mono font-semibold mt-1">
              {weather.condition} • Feels like {weather.feelsLike}°C
            </p>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-noir-850 text-cyan-ice border border-cyan-moisture/40">
              {weather.isLive ? 'Open-Meteo Live Stream' : 'Calibrated Local Model'}
            </span>
            <div className="text-[11px] font-mono text-ivory-400 flex items-center sm:justify-end gap-1 pt-2">
              <Clock className="w-3.5 h-3.5 text-ivory-400" />
              <span>Last Synchronized: {weather.lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Current Weather KPI Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          <div className="p-4 rounded-2xl bg-noir-850 border border-noir-700 text-center">
            <div className="flex items-center justify-center gap-1.5 text-cyan-ice text-xs mb-1">
              <Droplets className="w-4 h-4" />
              <span>Relative Humidity</span>
            </div>
            <div className="text-2xl font-bold text-ivory-100">{weather.humidity}%</div>
            <span className="text-[10px] text-ivory-400">Canopy Moisture</span>
          </div>

          <div className="p-4 rounded-2xl bg-noir-850 border border-noir-700 text-center">
            <div className="flex items-center justify-center gap-1.5 text-emerald-bright text-xs mb-1">
              <Wind className="w-4 h-4" />
              <span>Wind Speed</span>
            </div>
            <div className="text-2xl font-bold text-ivory-100">{weather.windSpeed} km/h</div>
            <span className="text-[10px] text-ivory-400">Direction: {weather.windDirection}</span>
          </div>

          <div className="p-4 rounded-2xl bg-noir-850 border border-noir-700 text-center">
            <div className="flex items-center justify-center gap-1.5 text-amber-solar text-xs mb-1">
              <CloudRain className="w-4 h-4" />
              <span>Rain Probability</span>
            </div>
            <div className="text-2xl font-bold text-ivory-100">{weather.rainfallChance}%</div>
            <span className="text-[10px] text-ivory-400">{weather.rainfallMm} mm Expected</span>
          </div>

          <div className="p-4 rounded-2xl bg-noir-850 border border-noir-700 text-center">
            <div className="flex items-center justify-center gap-1.5 text-lime-accent text-xs mb-1">
              <Thermometer className="w-4 h-4" />
              <span>Soil Temperature</span>
            </div>
            <div className="text-2xl font-bold text-ivory-100">{weather.soilTemp}°C</div>
            <span className="text-[10px] text-ivory-400">10cm Root Depth</span>
          </div>
        </div>

        {/* Agricultural Spray Advisory Banner */}
        <div
          className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 ${
            weather.sprayAdvisory.recommended
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-amber-solar/10 border-amber-solar/30 text-amber-300'
          }`}
        >
          {weather.sprayAdvisory.recommended ? (
            <ShieldCheck className="w-5 h-5 text-emerald-bright flex-shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-solar flex-shrink-0 mt-0.5" />
          )}
          <div>
            <span className="font-bold font-mono text-sm block">
              {weather.sprayAdvisory.recommended
                ? 'Optimal Agricultural Spray Window Active'
                : 'Unfavorable Spray Conditions — Chemical Washing Risk'}
            </span>
            <p className="text-xs text-ivory-200 mt-1">{weather.sprayAdvisory.reason}</p>
          </div>
        </div>
      </div>

      {/* 7-DAY FORECAST GRID */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-lime-accent" />
          <h2 className="text-base font-bold text-ivory-100">7-Day Agricultural Forecast</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {weather.forecast7Days?.map((day, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl noir-card border border-noir-700 text-center space-y-2 hover:border-lime-accent/40 transition shadow-noir-card"
            >
              <div className="text-xs font-mono font-bold text-lime-glow">{day.day}</div>
              <div className="text-[10px] font-mono text-ivory-400">{day.date}</div>

              <div className="py-2 flex justify-center">{getForecastIcon(day.iconName)}</div>

              <div className="text-sm font-mono font-bold text-ivory-100">
                {day.tempMax}° / <span className="text-ivory-400 font-normal">{day.tempMin}°</span>
              </div>

              <div className="text-[10px] text-cyan-ice font-mono flex items-center justify-center gap-0.5">
                <Umbrella className="w-3 h-3" />
                <span>{day.rainChance}%</span>
              </div>

              <div className="text-[10px] text-ivory-400 font-mono truncate">{day.condition}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
