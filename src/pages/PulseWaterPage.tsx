import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_WATER_USAGE } from '../data/mockData';
import {
  Droplets,
  Power,
  TrendingDown,
  Info,
  Clock,
  Radio,
  CheckCircle2,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { Badge } from '../components/common/Badge';

export const PulseWaterPage: React.FC = () => {
  const { zones, toggleValve } = useApp();
  const [activeChartTab, setActiveChartTab] = useState<'consumption' | 'efficiency'>('consumption');

  const totalWaterSavedEstimate = 18400; // liters in simulated season
  const activeValvesCount = zones.filter((z) => z.valveStatus === 'Open').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full">
              IoT Telemetry Array
            </span>
            <span className="text-xs text-slate-500">• Simulated Field Sensor Mesh</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            PulseWater Smart Irrigation
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Real-time simulated soil moisture monitoring, automated valve actuators, and precision
            water consumption tracking for Mandya farm plots.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>4 Simulated Probes Active</span>
          </div>
        </div>
      </div>

      {/* Hardware Disclaimer */}
      <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200 flex items-start gap-3 text-xs leading-relaxed">
        <Info className="w-5 h-5 text-sky-700 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-sky-950 text-sm">
            Simulated Sensor Telemetry Notice:
          </span>
          <p className="text-sky-800 mt-0.5">
            Soil capacitive readings, flow liters, and valve states rendered below are generated locally by the demonstration simulation engine. No physical microcontrollers (e.g. ESP32, LoRaWAN node) are currently attached to physical field soil.
          </p>
        </div>
      </div>

      {/* Top Telemetry Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase tracking-wider">Active Valves</span>
            <Power className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-slate-800">
            {activeValvesCount} of {zones.length} Open
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Automated solenoid valves ready</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase tracking-wider">Est. Water Saved</span>
            <TrendingDown className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700">
            {totalWaterSavedEstimate.toLocaleString()} L
          </div>
          <p className="text-xs text-slate-500 mt-2">
            vs. conventional unmonitored flood
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase tracking-wider">Average Soil Moisture</span>
            <Droplets className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-slate-800">
            {Math.round(
              zones.reduce((s, z) => s + z.currentMoisture, 0) / (zones.length || 1)
            )}%
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Target across plots: 45% - 65%
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase tracking-wider">Probe Health</span>
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-slate-800">
            100% Online
          </div>
          <p className="text-xs text-slate-500 mt-2">
            4 nodes • Solar battery 94%
          </p>
        </div>
      </div>

      {/* Field Zones Grid with Interactive Valve Toggles */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Plot-by-Plot Telemetry
            </span>
            <h3 className="text-lg font-bold text-slate-800">Irrigation Zones & Valve Actuators</h3>
          </div>
          <span className="text-xs text-slate-500">Click button to toggle simulated valve</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {zones.map((zone) => {
            const isCritical = zone.status === 'Critical Low';
            const isNeeded = zone.status === 'Irrigation Needed';
            const isOpen = zone.valveStatus === 'Open';

            return (
              <div
                key={zone.id}
                className={`bg-white rounded-2xl p-6 border transition-all duration-200 shadow-sm ${
                  isOpen
                    ? 'border-sky-300 ring-1 ring-sky-200 bg-sky-50/20'
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {/* Zone Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-slate-900">{zone.name}</h4>
                      <Badge
                        variant={
                          isCritical ? 'danger' : isNeeded ? 'warning' : 'success'
                        }
                        size="sm"
                      >
                        {zone.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Crop: <strong className="text-slate-700">{zone.crop}</strong> • Area: {zone.areaAcres} Acres
                    </p>
                  </div>

                  <button
                    onClick={() => toggleValve(zone.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition shadow-sm ${
                      isOpen
                        ? 'bg-sky-600 text-white hover:bg-sky-700'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                    }`}
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>{isOpen ? 'Valve Open (Flowing)' : 'Turn On Valve'}</span>
                  </button>
                </div>

                {/* Moisture Gauge Progress */}
                <div className="my-4">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-500 font-medium">Capacitive Moisture</span>
                    <span className="font-extrabold text-slate-900">
                      {zone.currentMoisture}%{' '}
                      <span className="text-slate-400 font-normal">
                        (target: {zone.targetMoisture}%)
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isCritical
                          ? 'bg-rose-500'
                          : isNeeded
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(zone.currentMoisture, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Telemetry Metrics */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-xl bg-slate-50 text-xs border border-slate-100">
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-semibold">
                      Recommendation
                    </span>
                    <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-sky-600" />
                      {zone.recommendedDurationMin > 0 ? `${zone.recommendedDurationMin} mins` : 'None (Saturated)'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-semibold">
                      Water Req.
                    </span>
                    <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <Droplets className="w-3 h-3 text-teal-600" />
                      {zone.estimatedWaterLiters > 0 ? `${zone.estimatedWaterLiters.toLocaleString()} L` : '0 L'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-semibold">
                      Last Event
                    </span>
                    <span className="font-medium text-slate-700 truncate block mt-0.5">
                      {zone.lastWatered}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Water Usage Analytics with Recharts */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              7-Day Telemetry Trends
            </span>
            <h3 className="text-lg font-bold text-slate-800">
              Water Consumption vs. Irrigation Target
            </h3>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveChartTab('consumption')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeChartTab === 'consumption'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Liters Used (Area)
            </button>
            <button
              onClick={() => setActiveChartTab('efficiency')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeChartTab === 'efficiency'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Target vs Actual (Bars)
            </button>
          </div>
        </div>

        {/* Recharts Container */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {activeChartTab === 'consumption' ? (
              <AreaChart data={MOCK_WATER_USAGE} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="waterColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => `${val / 1000}k L`}
                />
                <Tooltip
                  formatter={(val: number) => [`${val.toLocaleString()} Liters`, 'Liters Used']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                />
                <Area
                  type="monotone"
                  dataKey="litersUsed"
                  stroke="#0284c7"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#waterColor)"
                  name="Water Consumed"
                />
              </AreaChart>
            ) : (
              <BarChart data={MOCK_WATER_USAGE} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => `${val / 1000}k L`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                <Bar dataKey="litersUsed" name="Actual Liters" fill="#0284c7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="targetLiters" name="Budget Target" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <span>
            💡 Notice drop on <strong>02 Nov</strong> due to natural rainfall interception (3.2 mm rain).
          </span>
          <span className="font-semibold text-emerald-700">
            Estimated weekly water savings efficiency: +24%
          </span>
        </div>
      </div>
    </div>
  );
};
