import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  Calendar,
  Building2,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  BarChart3,
  Scale,
  Info,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { MANDI_RECORDS } from '../data/mockData';
import { MandiRecord } from '../types';

export const MandiPage: React.FC = () => {
  const [selectedRecord, setSelectedRecord] = useState<MandiRecord>(MANDI_RECORDS[0]);
  const [searchFilter, setSearchFilter] = useState('');

  const filteredRecords = MANDI_RECORDS.filter(
    (r) =>
      r.commodity.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.marketName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.district.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl noir-card p-6 sm:p-8 border border-noir-700/80 shadow-noir-elevated">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-bright border border-emerald-500/40 shadow-glow-emerald">
                <TrendingUp className="w-5 h-5" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-bright">
                Agmarknet & eNAM Market Intelligence
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ivory-100 tracking-tight">
              Mandi APMC Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-ivory-300 mt-1 max-w-2xl leading-relaxed">
              Real-time daily modal, minimum, and maximum commodity wholesale prices across Karnataka and major
              inter-state agricultural trading yards.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-noir-850 border border-noir-700 max-w-xs text-xs font-mono">
            <div className="flex items-center gap-1.5 text-lime-glow font-bold mb-1">
              <ShieldCheck className="w-4 h-4 text-lime-accent" />
              <span>APMC Data Compliance</span>
            </div>
            <p className="text-[11px] text-ivory-400 leading-relaxed">
              Price points calibrated against Agmarknet official bulletins. Labelled demonstration feed for hackathon
              evaluation.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Commodity Selection & Historical Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Commodities List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-ivory-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search commodity or market..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-noir-850 border border-noir-700 text-ivory-100 placeholder-ivory-400 text-xs focus:outline-none focus:border-lime-accent/50"
            />
          </div>

          <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
            {filteredRecords.map((item) => {
              const isSelected = selectedRecord.id === item.id;
              const isUp = item.trend === 'up';
              const isDown = item.trend === 'down';

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedRecord(item)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-noir-800 border-lime-accent/50 shadow-glow-lime'
                      : 'bg-noir-850/80 border-noir-700 hover:bg-noir-800/60 hover:border-noir-600'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-ivory-100">{item.commodity}</h4>
                      <p className="text-[11px] text-ivory-400 font-mono flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3 text-ivory-400" />
                        <span>{item.marketName}</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-mono font-extrabold text-lime-glow">
                        ₹{item.modalPrice.toLocaleString('en-IN')}
                      </div>
                      <div className="flex items-center justify-end gap-1 text-[10px] font-mono mt-0.5">
                        {isUp ? (
                          <span className="text-emerald-bright flex items-center">
                            <TrendingUp className="w-3 h-3" /> +{item.percentChange}%
                          </span>
                        ) : isDown ? (
                          <span className="text-rose-400 flex items-center">
                            <TrendingDown className="w-3 h-3" /> {item.percentChange}%
                          </span>
                        ) : (
                          <span className="text-ivory-400 flex items-center">
                            <Minus className="w-3 h-3" /> Steady
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-ivory-400 font-mono mt-3 pt-2 border-t border-noir-700/60">
                    <span>Range: ₹{item.minPrice} - ₹{item.maxPrice}</span>
                    <span>{item.priceUnit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: In-Depth Market Analysis & Historical Chart */}
        <div className="lg:col-span-2 space-y-6">
          {/* Selected Record Spotlight Card */}
          <div className="rounded-3xl noir-card p-6 border border-noir-700/80 shadow-noir-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-noir-700">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-lime-accent/15 text-lime-glow">
                    {selectedRecord.variety}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-noir-800 text-ivory-400 border border-noir-700">
                    {selectedRecord.state}
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-ivory-100">{selectedRecord.commodity}</h2>
                <p className="text-xs text-ivory-300 font-mono mt-0.5">
                  Market Yard: {selectedRecord.marketName} ({selectedRecord.district} District)
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] font-mono text-ivory-400 uppercase tracking-wider block">
                  Today's Modal Price
                </span>
                <div className="text-2xl sm:text-3xl font-mono font-black text-lime-glow">
                  ₹{selectedRecord.modalPrice.toLocaleString('en-IN')}
                </div>
                <span className="text-xs font-mono text-ivory-400">{selectedRecord.priceUnit}</span>
              </div>
            </div>

            {/* 3 Price Stat Highlights */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-noir-850 border border-noir-700 text-center">
                <div className="text-[10px] font-mono text-ivory-400 uppercase">Minimum Price</div>
                <div className="text-base sm:text-lg font-mono font-bold text-ivory-200 mt-0.5">
                  ₹{selectedRecord.minPrice.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-ivory-400 font-mono">Floor Quote</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-noir-850 border border-noir-700 text-center">
                <div className="text-[10px] font-mono text-ivory-400 uppercase">Modal (Average)</div>
                <div className="text-base sm:text-lg font-mono font-bold text-lime-glow mt-0.5">
                  ₹{selectedRecord.modalPrice.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-lime-accent font-mono">Benchmark</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-noir-850 border border-noir-700 text-center">
                <div className="text-[10px] font-mono text-ivory-400 uppercase">Maximum Price</div>
                <div className="text-base sm:text-lg font-mono font-bold text-emerald-bright mt-0.5">
                  ₹{selectedRecord.maxPrice.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-ivory-400 font-mono">Premium Grade</div>
              </div>
            </div>

            {/* Historical 30-Day Recharts Chart */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-lime-accent" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-ivory-200">
                    30-Day Modal Price Trajectory
                  </span>
                </div>
                <span className="text-[10px] font-mono text-ivory-400">
                  Arrivals: {selectedRecord.arrivalQuantityTonnes} Tonnes
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedRecord.historical30Days || []}>
                    <defs>
                      <linearGradient id="mandiGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a3e635" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#a3e635" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1d372c" vertical={false} />
                    <XAxis
                      dataKey="date"
                      stroke="#675f50"
                      tick={{ fill: '#9d9482', fontSize: 11, fontFamily: 'monospace' }}
                      axisLine={{ stroke: '#1d372c' }}
                    />
                    <YAxis
                      stroke="#675f50"
                      tick={{ fill: '#9d9482', fontSize: 11, fontFamily: 'monospace' }}
                      domain={['auto', 'auto']}
                      axisLine={{ stroke: '#1d372c' }}
                      tickFormatter={(val) => `₹${val}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0b1611',
                        borderColor: '#2b4f40',
                        borderRadius: '12px',
                        color: '#f4efe4',
                        fontFamily: 'monospace',
                        fontSize: '12px',
                      }}
                      formatter={(val: any) => [`₹${val} / Quintal`, 'Modal Price']}
                    />
                    <Area
                      type="monotone"
                      dataKey="modalPrice"
                      stroke="#a3e635"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#mandiGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Selling Advisory Box */}
            <div className="p-4 rounded-2xl bg-noir-850/90 border border-noir-700 flex items-start gap-3 text-xs">
              <Sparkles className="w-5 h-5 text-lime-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-ivory-100">Market Intelligence Recommendation</h4>
                <p className="text-ivory-300 mt-0.5 leading-relaxed">
                  Arrival volumes for {selectedRecord.commodity} at {selectedRecord.marketName} are currently moderate
                  ({selectedRecord.arrivalQuantityTonnes} Tonnes). With a 30-day upward momentum of{' '}
                  <span className="text-lime-glow font-bold">+{selectedRecord.percentChange}%</span>, holding stock for
                  graded sorting before dispatching to APMC yard is advised.
                </p>
                <div className="text-[10px] text-ivory-400 font-mono mt-2">
                  Official Source: {selectedRecord.source} • Reported {selectedRecord.reportedDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
