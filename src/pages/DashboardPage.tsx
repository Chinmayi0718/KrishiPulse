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
  Sparkles,
  Sun,
  Sprout,
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
    <div className="space-y-7">
      {/* Scenic Farm Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg border border-emerald-500/20 bg-gradient-to-r from-emerald-950 via-forest-900 to-teal-950 text-white p-7 sm:p-9">
        {/* Background farm atmospheric glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-400/20 via-emerald-500/10 to-transparent pointer-events-none" />
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-10 translate-y-10">
          <Sprout className="w-80 h-80 text-emerald-300" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider bg-gradient-to-r from-emerald-500/40 to-teal-500/40 text-emerald-200 px-3.5 py-1 rounded-full border border-emerald-400/40 flex items-center gap-2 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-sensor-pulse"></span>
                <span>Active Field Session</span>
              </span>
              <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kisan ID: {profile.kisanId}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-sm">
              Namaskara, {profile.name}! 🙏
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed font-medium">
              Daily agronomic command center for your <strong className="text-white">{profile.location}</strong> farm holding.
              All sensor probes, drip lines, and microclimate feeds are updated.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2.5 text-xs">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/15 shadow-xs font-semibold">
              <Calendar className="w-4 h-4 text-emerald-300" />
              <span>
                {new Date().toLocaleDateString('en-IN', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/15 shadow-xs font-semibold">
              <MapPin className="w-4 h-4 text-amber-300" />
              <span>
                {profile.taluk}, {profile.district} (Cauvery Basin)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Colorful Quick Action Launchers */}
      <QuickActions />

      {/* Core Farm Metrics Cards with Aesthetic Gradient Glows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Cultivated Land"
          value={`${totalAcres} / ${profile.totalLandAcres} Ac`}
          subtitle={`Red Sandy Loam • ${profile.irrigationType}`}
          icon={Layers}
          iconBgColor="bg-emerald-100"
          iconColor="text-emerald-800"
          trend={{ value: `${crops.length} Active Crops`, isPositive: true, label: 'planted' }}
        />

        <StatCard
          title="Average Soil Moisture"
          value={`${avgMoisture}%`}
          subtitle="4 telemetry probe nodes"
          icon={Droplets}
          iconBgColor="bg-sky-100"
          iconColor="text-sky-700"
          badge="Live telemetry"
          trend={{
            value: zones.some((z) => z.status === 'Critical Low') ? 'Alert in Zone C' : 'Healthy',
            isPositive: !zones.some((z) => z.status === 'Critical Low'),
            label: 'moisture level',
          }}
        />

        <StatCard
          title="Irrigation Network"
          value={activeValves > 0 ? `${activeValves} Active Valves` : 'All Closed'}
          subtitle="Solenoid drip & sprinkler valves"
          icon={Activity}
          iconBgColor="bg-teal-100"
          iconColor="text-teal-800"
          trend={{
            value: `${zones.length} Zones`,
            isPositive: true,
            label: 'monitored',
          }}
        />

        <StatCard
          title="Crop Health Status"
          value={`${healthyCrops} / ${crops.length} Optimal`}
          subtitle="1 Attention flagged (Leaf blast)"
          icon={CheckCircle}
          iconBgColor="bg-amber-100"
          iconColor="text-amber-800"
          trend={{
            value: 'Paddy alert',
            isPositive: false,
            label: 'blast warning',
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

      {/* Recent Alerts Feed with Eye-Catching Highlights */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-800 shadow-xs">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Live Field Alerts & Agronomic Broadcasts
              </h3>
              <p className="text-xs text-slate-500 font-medium">Automatic telemetry triggers</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Updated 5m ago
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-200/80 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-amber-950 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
              <span>Irrigation Required in Zone C</span>
            </div>
            <p className="text-slate-700 text-[11px] leading-relaxed font-medium">
              Ragi plot soil moisture is at 33% (target 45%). Recommend activating Zone C sprinkler.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/60 border border-emerald-200/80 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-emerald-950 mb-1.5">
              <Sun className="w-4 h-4 text-emerald-600" />
              <span>Optimal Spraying Window</span>
            </div>
            <p className="text-slate-700 text-[11px] leading-relaxed font-medium">
              Mandya weather favorable for foliar spraying until 11:30 AM before wind velocity picks up.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50/60 border border-sky-200/80 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-sky-950 mb-1.5">
              <Info className="w-4 h-4 text-sky-600" />
              <span>PMKSY Subsidy Scheme</span>
            </div>
            <p className="text-slate-700 text-[11px] leading-relaxed font-medium">
              Applications open for 90% micro-irrigation subsidy at Maddur Raitha Samparka Kendra.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
