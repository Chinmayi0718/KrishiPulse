import React from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { QuickActions } from '../components/dashboard/QuickActions';
import { WeatherWidget } from '../components/dashboard/WeatherWidget';
import { SoilMoistureWidget } from '../components/dashboard/SoilMoistureWidget';
import { CropStatusSummary } from '../components/dashboard/CropStatusSummary';
import {
  MapPin,
  Calendar,
  Layers,
  Droplets,
  Activity,
  CheckCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { profile, crops, zones } = useApp();

  const totalAcres = crops.reduce((sum, c) => sum + c.areaAcres, 0);
  const activeValves = zones.filter((z) => z.valveStatus === 'Open').length;
  const healthyCrops = crops.filter((c) => c.health === 'Optimal').length;
  const avgMoisture = Math.round(
    zones.reduce((sum, z) => sum + z.currentMoisture, 0) / (zones.length || 1)
  );

  return (
    <div className="space-y-6">
      {/* Personalized Greeting Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-500/10 pointer-events-none rounded-r-3xl transform skew-x-12"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-500/30 text-emerald-200 px-3 py-1 rounded-full border border-emerald-400/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-sensor-pulse"></span>
                Kisan Portal • Active Field Session
              </span>
              <span className="text-xs text-emerald-300 hidden sm:inline">
                ID: {profile.kisanId}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Namaskara, {profile.name}! 🙏
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200 max-w-2xl leading-relaxed">
              Welcome to your daily farm command center for{' '}
              <strong className="text-white">{profile.location}</strong>. All field telemetry,
              soil moisture arrays, and agronomic insights have been updated.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 text-xs">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur border border-white/10">
              <Calendar className="w-3.5 h-3.5 text-emerald-300" />
              <span>
                {new Date().toLocaleDateString('en-IN', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-emerald-300" />
              <span>
                {profile.taluk}, {profile.district}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Launch Buttons */}
      <QuickActions />

      {/* Core Farm Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Cultivated Land"
          value={`${totalAcres} / ${profile.totalLandAcres} Ac`}
          subtitle={`Red Sandy Loam • ${profile.irrigationType}`}
          icon={Layers}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-700"
          trend={{ value: `${crops.length} Crops`, isPositive: true, label: 'planted' }}
        />

        <StatCard
          title="Average Soil Moisture"
          value={`${avgMoisture}%`}
          subtitle="Sensor array across 4 field zones"
          icon={Droplets}
          iconBgColor="bg-sky-50"
          iconColor="text-sky-700"
          badge="Live telemetry"
          trend={{
            value: zones.some((z) => z.status === 'Critical Low') ? 'Alert' : 'Normal',
            isPositive: !zones.some((z) => z.status === 'Critical Low'),
            label: 'moisture trend',
          }}
        />

        <StatCard
          title="Irrigation Network"
          value={activeValves > 0 ? `${activeValves} Active` : 'All Closed'}
          subtitle={`Drip & Sprinkler automated zones`}
          icon={Activity}
          iconBgColor="bg-teal-50"
          iconColor="text-teal-700"
          trend={{
            value: `${zones.length} Total Zones`,
            isPositive: true,
            label: 'monitored',
          }}
        />

        <StatCard
          title="Crop Health Status"
          value={`${healthyCrops} / ${crops.length} Optimal`}
          subtitle="Paddy attention flagged (blast risk)"
          icon={CheckCircle}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-700"
          trend={{
            value: '1 Warning',
            isPositive: false,
            label: 'leaf blast risk',
          }}
        />
      </div>

      {/* Weather & Soil Moisture Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeatherWidget />
        <SoilMoistureWidget />
      </div>

      {/* Crop Inventory & Insights */}
      <CropStatusSummary />

      {/* Recent Alerts & Notifications Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-800">Recent Field Alerts & Broadcasts</h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">Updated 10m ago</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/60 text-slate-800">
            <div className="flex items-center gap-2 font-bold text-amber-900 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Irrigation Required in Zone C</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Soil moisture in the Ragi plot is at 33% (target 45%). Recommend activating Zone C sprinkler.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-slate-800">
            <div className="flex items-center gap-2 font-bold text-emerald-900 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Spray Window Open</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Mandya weather favorable for foliar spray until 11:30 AM before wind velocity increases.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-200/60 text-slate-800">
            <div className="flex items-center gap-2 font-bold text-sky-900 mb-1">
              <Info className="w-3.5 h-3.5 text-sky-600" />
              <span>PMKSY Scheme Window</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Applications open for 90% micro-irrigation subsidy at Maddur Raitha Samparka Kendra.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
