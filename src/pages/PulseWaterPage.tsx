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
  Cpu,
  AlertTriangle,
  Code2,
  Battery,
  Thermometer,
  ShieldAlert,
  ArrowRight,
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

export const PulseWaterPage: React.FC = () => {
  const { zones, toggleValve, triggerIrrigation, isSimulatedSensorMode, toggleSimulatedSensorMode } = useApp();
  const [activeChartTab, setActiveChartTab] = useState<'consumption' | 'comparison'>('consumption');
  const [selectedDuration, setSelectedDuration] = useState<number>(30);

  const activeValvesCount = zones.filter((z) => z.valveStatus === 'Open').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden noir-card border border-noir-700/80 shadow-noir-elevated p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-cyan-moisture/15 text-cyan-ice border border-cyan-moisture/30 shadow-glow-cyan">
                <Droplets className="w-5 h-5" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-ice">
                IoT Soil Moisture Telemetry
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ivory-100 tracking-tight">
              PulseWater Irrigation Mesh
            </h1>
            <p className="text-xs sm:text-sm text-ivory-300 mt-1 max-w-2xl leading-relaxed">
              Multi-zone capacitive soil moisture monitoring, automated solenoid valve control, and precision water usage
              tracking powered by ESP32 microcontrollers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
            <button
              onClick={toggleSimulatedSensorMode}
              className={`px-4 py-2.5 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 transition ${
                isSimulatedSensorMode
                  ? 'bg-cyan-moisture/20 border-cyan-moisture/40 text-cyan-ice shadow-glow-cyan'
                  : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-bright'
              }`}
            >
              <Radio className="w-4 h-4 animate-pulse" />
              <span>{isSimulatedSensorMode ? 'Simulated Sensor Mode' : 'Hardware Stream Active'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* HARDWARE ISOLATION WARNING */}
      <div className="p-4 rounded-2xl bg-amber-solar/10 border border-amber-solar/30 flex items-start gap-3 text-xs text-amber-300 leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-amber-solar flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-mono uppercase font-bold text-amber-200">
            Hardware Electrical Safety Rule:
          </strong>{' '}
          Do not power pump motors directly from ESP32 GPIO pins. Microcontroller pins can only supply 12mA. Always use
          an optically isolated 5V relay module with flyback diode protection to drive 230V AC or 12V DC solenoids.
        </div>
      </div>

      {/* ZONE TELEMETRY CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-ice animate-pulse" />
            <h2 className="text-base font-bold text-ivory-100">Active Sensor Probes & Zones</h2>
          </div>
          <span className="text-xs font-mono text-ivory-400">
            {activeValvesCount} of {zones.length} Valves Open
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {zones.map((zone) => {
            const isCritical = zone.status === 'Critical Low';
            const isAttention = zone.status === 'Irrigation Needed';
            const isOpen = zone.valveStatus === 'Open';

            return (
              <div
                key={zone.id}
                className="rounded-3xl noir-card p-5 border border-noir-700/80 shadow-noir-card flex flex-col justify-between hover:border-cyan-moisture/40 transition space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-noir-800 text-ivory-300 border border-noir-700">
                      {zone.id.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-ivory-400">
                      <span className="flex items-center gap-0.5">
                        <Thermometer className="w-3 h-3 text-amber-solar" />
                        {zone.soilTemp}°C
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Battery className="w-3 h-3 text-emerald-bright" />
                        {zone.batteryLevel || 92}%
                      </span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-ivory-100">{zone.name}</h3>
                  <p className="text-[11px] text-ivory-400 font-mono mt-0.5">{zone.crop}</p>

                  {/* Moisture Big Readout */}
                  <div className="my-4 flex items-baseline justify-between">
                    <div>
                      <span className="text-3xl font-mono font-black text-ivory-100">
                        {zone.currentMoisture}%
                      </span>
                      <span className="text-xs font-mono text-ivory-400 ml-1.5">
                        / Target {zone.targetMoisture}%
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        isCritical
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : isAttention
                          ? 'bg-amber-solar/20 text-amber-solar border-amber-solar/40'
                          : 'bg-lime-accent/20 text-lime-glow border-lime-accent/40'
                      }`}
                    >
                      {zone.status}
                    </span>
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full bg-noir-800 h-2.5 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isCritical
                          ? 'bg-rose-500'
                          : isAttention
                          ? 'bg-amber-solar'
                          : 'bg-lime-accent'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(10, zone.currentMoisture))}%` }}
                    />
                  </div>

                  <div className="text-[11px] text-ivory-300 font-mono flex items-center justify-between">
                    <span>Last run: {zone.lastWatered}</span>
                    <span>{zone.areaAcres} Ac</span>
                  </div>
                </div>

                {/* Valve Controls & Action */}
                <div className="pt-3 border-t border-noir-700/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => toggleValve(zone.id)}
                    className={`flex-1 py-2 px-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition ${
                      isOpen
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-glow-amber'
                        : 'bg-noir-800 border-noir-700 text-ivory-200 hover:text-cyan-ice hover:border-cyan-moisture/40'
                    }`}
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>{isOpen ? 'Close Valve' : 'Open Valve'}</span>
                  </button>

                  <button
                    onClick={() => triggerIrrigation(zone.id, selectedDuration)}
                    className="p-2 rounded-xl bg-cyan-moisture/20 hover:bg-cyan-moisture/30 border border-cyan-moisture/40 text-cyan-ice transition"
                    title={`Trigger ${selectedDuration} min irrigation burst`}
                  >
                    <Clock className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ANALYTICS CHARTS & INGESTION CODE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Water Consumption Chart */}
        <div className="lg:col-span-2 rounded-3xl noir-card p-6 border border-noir-700 shadow-noir-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-ice" />
                <h3 className="text-base font-bold text-ivory-100">Water Consumption Analytics</h3>
              </div>
              <p className="text-xs text-ivory-400 font-mono mt-0.5">
                Daily Liters Applied vs Weather-Optimized Target Liters
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={() => setActiveChartTab('consumption')}
                className={`px-3 py-1.5 rounded-xl border transition ${
                  activeChartTab === 'consumption'
                    ? 'bg-cyan-moisture/20 border-cyan-moisture/40 text-cyan-ice font-bold'
                    : 'bg-noir-850 border-noir-700 text-ivory-400'
                }`}
              >
                Consumption Area
              </button>
              <button
                onClick={() => setActiveChartTab('comparison')}
                className={`px-3 py-1.5 rounded-xl border transition ${
                  activeChartTab === 'comparison'
                    ? 'bg-cyan-moisture/20 border-cyan-moisture/40 text-cyan-ice font-bold'
                    : 'bg-noir-850 border-noir-700 text-ivory-400'
                }`}
              >
                Zone Comparison
              </button>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              {activeChartTab === 'consumption' ? (
                <AreaChart data={MOCK_WATER_USAGE}>
                  <defs>
                    <linearGradient id="waterLiters" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1d372c" vertical={false} />
                  <XAxis dataKey="date" stroke="#675f50" tick={{ fill: '#9d9482', fontSize: 11, fontFamily: 'monospace' }} />
                  <YAxis stroke="#675f50" tick={{ fill: '#9d9482', fontSize: 11, fontFamily: 'monospace' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0b1611',
                      borderColor: '#2b4f40',
                      borderRadius: '12px',
                      color: '#f4efe4',
                      fontFamily: 'monospace',
                      fontSize: '12px',
                    }}
                  />
                  <Area type="monotone" dataKey="litersUsed" stroke="#06b6d4" strokeWidth={2.5} fill="url(#waterLiters)" name="Actual Liters" />
                  <Area type="monotone" dataKey="targetLiters" stroke="#a3e635" strokeDasharray="4 4" strokeWidth={1.5} fill="none" name="Target Budget" />
                </AreaChart>
              ) : (
                <BarChart data={zones.map((z) => ({ name: z.id.toUpperCase(), moisture: z.currentMoisture, target: z.targetMoisture }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1d372c" vertical={false} />
                  <XAxis dataKey="name" stroke="#675f50" tick={{ fill: '#9d9482', fontSize: 11, fontFamily: 'monospace' }} />
                  <YAxis stroke="#675f50" tick={{ fill: '#9d9482', fontSize: 11, fontFamily: 'monospace' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0b1611',
                      borderColor: '#2b4f40',
                      borderRadius: '12px',
                      color: '#f4efe4',
                      fontFamily: 'monospace',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="moisture" fill="#06b6d4" name="Current Moisture %" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="target" fill="#a3e635" name="Target %" radius={[6, 6, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 1 Col: ESP32 Hardware Webhook Integration Guide */}
        <div className="rounded-3xl noir-card p-6 border border-noir-700 shadow-noir-card space-y-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-lime-accent" />
            <h3 className="text-sm font-bold text-ivory-100">ESP32 Ingestion Guide</h3>
          </div>

          <p className="text-ivory-400 text-[11px] leading-relaxed">
            Configure your field NodeMCU or ESP32 Wi-Fi module to send telemetry every 5 minutes:
          </p>

          <div className="p-3 rounded-2xl bg-noir-950 border border-noir-700 overflow-x-auto text-[10px] text-lime-glow space-y-1">
            <div className="text-ivory-400"># HTTP Post Request Sample</div>
            <div>curl -X POST http://localhost:5000/api/sensors/readings \</div>
            <div>&nbsp;&nbsp;-H "X-Device-Token: krishipulse-esp32-secret-2026" \</div>
            <div>&nbsp;&nbsp;-H "Content-Type: application/json" \</div>
            <div>&nbsp;&nbsp;-d '&#123;</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;"zone_id": "zone-1",</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;"soil_moisture": 42.5,</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;"temperature": 27.8,</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;"humidity": 68.2</div>
            <div>&nbsp;&nbsp;&#125;'</div>
          </div>

          <div className="text-[11px] text-ivory-300 space-y-1 pt-1">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-lime-accent" />
              <span>Token validated automatically</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-lime-accent" />
              <span>Database persists to Supabase</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
