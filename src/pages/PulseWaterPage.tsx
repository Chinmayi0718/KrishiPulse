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
  Sparkles,
  Waves,
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

  const totalWaterSavedEstimate = 18400;
  const activeValvesCount = zones.filter((z) => z.valveStatus === 'Open').length;

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-sky-500 to-blue-600 text-white px-3 py-0.5 rounded-full shadow-xs">
              IoT Telemetry Array
            </span>
            <span className="text-xs text-sky-800 font-bold">• Simulated Field Sensor Mesh</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            PulseWater Smart Irrigation
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl font-medium">
            Real-time simulated soil moisture monitoring, automated solenoid valve actuators, and precision
            water consumption telemetry for Mandya farm plots.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-sky-200 text-xs font-black text-slate-800 shadow-xs">
            <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>4 Simulated Probes Active</span>
          </div>
        </div>
      </div>

      {/* Hardware Disclaimer */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-sky-50 to-teal-50 border border-sky-200 flex items-start gap-3.5 text-xs leading-relaxed shadow-xs">
        <div className="p-2 rounded-xl bg-sky-200/60 text-sky-900 flex-shrink-0 mt-0.5">
          <Info className="w-5 h-5 text-sky-700" />
        </div>
        <div>
          <span className="font-black text-sky-950 text-sm">
            Simulated Sensor Telemetry Notice:
          </span>
          <p className="text-sky-900/90 mt-0.5 font-medium">
            Soil capacitive readings, flow liters, and valve states rendered below are simulated deterministically inside the client application. No physical microcontrollers (e.g. ESP32, LoRaWAN) are currently attached to field soil.
          </p>
        </div>
      </div>

      {/* Top Telemetry Stats with Color Gradients */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-black uppercase tracking-wider text-slate-600">Active Valves</span>
            <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700">
              <Power className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">
            {activeValvesCount} of {zones.length} Open
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-sensor-pulse"></span>
            <span>Automated solenoid valves ready</span>
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-black uppercase tracking-wider text-slate-600">Est. Water Saved</span>
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
            {totalWaterSavedEstimate.toLocaleString()} L
          </div>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            vs. conventional unmonitored flood
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-black uppercase tracking-wider text-slate-600">Average Soil Moisture</span>
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">
            {Math.round(
              zones.reduce((s, z) => s + z.currentMoisture, 0) / (zones.length || 1)
            )}%
          </div>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            Target across plots: 45% - 65%
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-black uppercase tracking-wider text-slate-600">Probe Health</span>
            <div className="p-2.5 rounded-xl bg-teal-100 text-teal-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">
            100% Online
          </div>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            4 nodes • Solar battery 94%
          </p>
        </div>
      </div>

      {/* Field Zones Grid with Interactive Valve Toggles */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Plot-by-Plot Telemetry
            </span>
            <h3 className="text-lg font-black text-slate-900">Field Irrigation Zones & Valve Actuators</h3>
          </div>
          <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Click button to toggle simulated valve
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {zones.map((zone) => {
            const isCritical = zone.status === 'Critical Low';
            const isNeeded = zone.status === 'Irrigation Needed';
            const isOpen = zone.valveStatus === 'Open';

            const barGradient = isCritical
              ? 'bg-gradient-to-r from-rose-500 to-red-600'
              : isNeeded
              ? 'bg-gradient-to-r from-amber-400 to-orange-500'
              : 'bg-gradient-to-r from-emerald-400 to-teal-500';

            return (
              <div
                key={zone.id}
                className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-300 shadow-sm hover:shadow-card-hover ${
                  isOpen
                    ? 'border-sky-300 ring-2 ring-sky-200 bg-gradient-to-br from-sky-50/40 via-white to-teal-50/30'
                    : 'border-slate-200/90 hover:border-emerald-300'
                }`}
              >
                {/* Zone Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-lg text-slate-950">{zone.name}</h4>
                      <Badge
                        variant={
                          isCritical ? 'danger' : isNeeded ? 'warning' : 'success'
                        }
                        size="sm"
                      >
                        {zone.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      Crop: <strong className="text-slate-800">{zone.crop}</strong> • Area: {zone.areaAcres} Acres
                    </p>
                  </div>

                  <button
                    onClick={() => toggleValve(zone.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs transition-all duration-200 shadow-xs ${
                      isOpen
                        ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-glow-blue scale-105'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                    }`}
                  >
                    <Power className="w-4 h-4" />
                    <span>{isOpen ? 'Valve Open (Flowing)' : 'Turn On Valve'}</span>
                  </button>
                </div>

                {/* Animated Water flow wave indicator if valve is open */}
                {isOpen && (
                  <div className="mb-3 px-3 py-1.5 rounded-xl bg-sky-100/80 border border-sky-300 text-sky-900 text-xs font-bold flex items-center justify-between animate-pulse">
                    <span className="flex items-center gap-1.5">
                      <Waves className="w-4 h-4 text-sky-600" />
                      <span>Water flowing through drip lateral emitter line</span>
                    </span>
                    <span className="text-[10px] uppercase font-black bg-sky-200 px-2 py-0.5 rounded">Active</span>
                  </div>
                )}

                {/* Moisture Gauge Progress */}
                <div className="my-4">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-500 font-bold">Soil Capacitive Moisture</span>
                    <span className="font-black text-slate-950 text-sm">
                      {zone.currentMoisture}%{' '}
                      <span className="text-slate-400 font-normal text-xs">
                        (target: {zone.targetMoisture}%)
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${barGradient}`}
                      style={{ width: `${Math.min(zone.currentMoisture, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Telemetry Metrics */}
                <div className="grid grid-cols-3 gap-2.5 py-3 px-3.5 rounded-2xl bg-slate-50 text-xs border border-slate-200 font-medium">
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-bold">
                      Recommendation
                    </span>
                    <span className="font-black text-slate-900 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-sky-600" />
                      {zone.recommendedDurationMin > 0 ? `${zone.recommendedDurationMin} mins` : 'None (Saturated)'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-bold">
                      Water Req.
                    </span>
                    <span className="font-black text-slate-900 flex items-center gap-1 mt-0.5">
                      <Droplets className="w-3.5 h-3.5 text-teal-600" />
                      {zone.estimatedWaterLiters > 0 ? `${zone.estimatedWaterLiters.toLocaleString()} L` : '0 L'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-bold">
                      Last Event
                    </span>
                    <span className="font-semibold text-slate-700 truncate block mt-0.5">
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
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-sky-700">
              7-Day Telemetry Trends
            </span>
            <h3 className="text-xl font-black text-slate-900">
              Water Consumption vs. Irrigation Target
            </h3>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl text-xs font-black">
            <button
              onClick={() => setActiveChartTab('consumption')}
              className={`px-4 py-2 rounded-xl transition ${
                activeChartTab === 'consumption'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Liters Used (Area)
            </button>
            <button
              onClick={() => setActiveChartTab('efficiency')}
              className={`px-4 py-2 rounded-xl transition ${
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
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => `${val / 1000}k L`}
                />
                <Tooltip
                  formatter={(val: number) => [`${val.toLocaleString()} Liters`, 'Liters Used']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #bae6fd', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.1)' }}
                />
                <Area
                  type="monotone"
                  dataKey="litersUsed"
                  stroke="#0284c7"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#waterColor)"
                  name="Water Consumed"
                />
              </AreaChart>
            ) : (
              <BarChart data={MOCK_WATER_USAGE} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => `${val / 1000}k L`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0' }}
                />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10, fontWeight: 600 }} />
                <Bar dataKey="litersUsed" name="Actual Liters" fill="#0284c7" radius={[6, 6, 0, 0]} />
                <Bar dataKey="targetLiters" name="Target Budget" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2 font-medium">
          <span>
            💡 Notice drop on <strong>02 Nov</strong> due to natural rainfall interception (3.2 mm rain).
          </span>
          <span className="font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Estimated weekly water savings efficiency: +24%
          </span>
        </div>
      </div>
    </div>
  );
};
