import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Crop, GrowthStage, HealthStatus } from '../types';
import {
  Sprout,
  Plus,
  Pencil,
  Trash2,
  Calendar,
  Layers,
  MapPin,
  Sparkles,
  BookOpen,
  Droplets,
  ShieldAlert,
  CheckCircle2,
  ExternalLink,
  X,
  TrendingUp,
} from 'lucide-react';
import { CROP_CALENDAR_DATA } from '../data/mockData';

const GROWTH_STAGES: GrowthStage[] = ['Sowing', 'Vegetative', 'Flowering', 'Maturity', 'Harvesting'];

export const MyCropsPage: React.FC = () => {
  const { crops, addCrop, updateCrop, deleteCrop, profile } = useApp();
  const [activeTab, setActiveTab] = useState<'holdings' | 'calendar'>('holdings');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCropId, setEditingCropId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    variety: '',
    plantingDate: '',
    growthStage: 'Vegetative' as GrowthStage,
    areaAcres: 1.0,
    health: 'Optimal' as HealthStatus,
    expectedHarvest: '',
    fieldLocation: '',
    notes: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const openAddModal = () => {
    setEditingCropId(null);
    setFormData({
      name: '',
      variety: '',
      plantingDate: new Date().toISOString().split('T')[0],
      growthStage: 'Vegetative',
      areaAcres: 1.0,
      health: 'Optimal',
      expectedHarvest: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      fieldLocation: 'North Field Plot #2',
      notes: '',
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (crop: Crop) => {
    setEditingCropId(crop.id);
    setFormData({
      name: crop.name,
      variety: crop.variety,
      plantingDate: crop.plantingDate,
      growthStage: crop.growthStage,
      areaAcres: crop.areaAcres,
      health: crop.health,
      expectedHarvest: crop.expectedHarvest,
      fieldLocation: crop.fieldLocation,
      notes: crop.notes || '',
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Crop name is required';
    if (!formData.variety.trim()) errors.variety = 'Variety is required';
    if (!formData.plantingDate) errors.plantingDate = 'Planting date is required';
    if (!formData.expectedHarvest) errors.expectedHarvest = 'Expected harvest is required';
    if (formData.areaAcres <= 0) errors.areaAcres = 'Area must be greater than 0';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingCropId) {
      updateCrop(editingCropId, formData);
    } else {
      addCrop(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name} from your active crop registry?`)) {
      deleteCrop(id);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden noir-card border border-noir-700/80 shadow-noir-elevated p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-lime-accent/15 text-lime-accent border border-lime-accent/30 shadow-glow-lime">
                <Sprout className="w-5 h-5" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-lime-accent">
                Field Crop Lifecycle & Knowledge
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ivory-100 tracking-tight">
              My Crops & Crop Calendar
            </h1>
            <p className="text-xs sm:text-sm text-ivory-300 mt-1 max-w-2xl leading-relaxed">
              Track growth stages, planting schedules, harvest forecasts, and explore ICAR scientific stage-by-stage
              management guidelines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openAddModal}
              className="px-5 py-2.5 rounded-xl bg-lime-accent text-noir-950 font-mono font-bold text-xs flex items-center gap-2 hover:bg-lime-glow transition shadow-glow-lime"
            >
              <Plus className="w-4 h-4 text-noir-950" />
              <span>Register New Crop</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-noir-700 space-x-2">
        <button
          onClick={() => setActiveTab('holdings')}
          className={`pb-3 px-4 text-xs sm:text-sm font-semibold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'holdings'
              ? 'border-lime-accent text-lime-glow font-bold'
              : 'border-transparent text-ivory-400 hover:text-ivory-200'
          }`}
        >
          <Sprout className="w-4 h-4" />
          <span>Active Plots ({crops.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('calendar')}
          className={`pb-3 px-4 text-xs sm:text-sm font-semibold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'calendar'
              ? 'border-lime-accent text-lime-glow font-bold'
              : 'border-transparent text-ivory-400 hover:text-ivory-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>ICAR Crop Calendar & Guidelines</span>
        </button>
      </div>

      {/* TAB 1: ACTIVE FIELD PLOTS */}
      {activeTab === 'holdings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {crops.map((crop) => {
            const currentStageIdx = GROWTH_STAGES.indexOf(crop.growthStage);
            const isOptimal = crop.health === 'Optimal';

            return (
              <div
                key={crop.id}
                className="rounded-3xl noir-card p-6 border border-noir-700/80 shadow-noir-card hover:border-lime-accent/40 transition flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-ivory-100">{crop.name}</h3>
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                            isOptimal
                              ? 'bg-emerald-500/15 text-emerald-bright border-emerald-500/30'
                              : 'bg-amber-solar/15 text-amber-solar border-amber-solar/30'
                          }`}
                        >
                          {crop.health}
                        </span>
                      </div>
                      <p className="text-xs text-lime-accent font-mono mt-0.5">
                        {crop.variety} • {crop.areaAcres} Acres ({crop.fieldLocation})
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(crop)}
                        className="p-1.5 rounded-lg bg-noir-850 hover:bg-noir-800 text-ivory-300 hover:text-lime-accent border border-noir-700 transition"
                        title="Edit Crop Details"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(crop.id, crop.name)}
                        className="p-1.5 rounded-lg bg-noir-850 hover:bg-noir-800 text-ivory-300 hover:text-rose-400 border border-noir-700 transition"
                        title="Delete Crop"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Growth Stage Horizontal Stepper */}
                  <div className="my-4 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-ivory-400">Growth Stage:</span>
                      <span className="text-lime-glow font-bold">{crop.growthStage}</span>
                    </div>

                    <div className="grid grid-cols-5 gap-1 pt-1">
                      {GROWTH_STAGES.map((stg, sIdx) => {
                        const isPastOrCurrent = sIdx <= currentStageIdx;
                        const isCurrent = sIdx === currentStageIdx;

                        return (
                          <div key={stg} className="flex flex-col items-center">
                            <div
                              className={`w-full h-2 rounded-full mb-1 transition ${
                                isCurrent
                                  ? 'bg-lime-accent shadow-glow-lime'
                                  : isPastOrCurrent
                                  ? 'bg-emerald-500'
                                  : 'bg-noir-800'
                              }`}
                            />
                            <span
                              className={`text-[9px] font-mono truncate text-center ${
                                isCurrent ? 'text-lime-glow font-bold' : 'text-ivory-500'
                              }`}
                            >
                              {stg}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Planting & Harvest Dates */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono p-3 rounded-2xl bg-noir-850 border border-noir-700">
                    <div>
                      <span className="text-[10px] text-ivory-400 block">Sown On</span>
                      <span className="font-semibold text-ivory-200">{crop.plantingDate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-ivory-400 block">Expected Harvest</span>
                      <span className="font-semibold text-lime-glow">{crop.expectedHarvest}</span>
                    </div>
                  </div>

                  {crop.notes && (
                    <p className="text-xs text-ivory-300 italic mt-3 bg-noir-850/50 p-2.5 rounded-xl border border-noir-700/50">
                      "{crop.notes}"
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: ICAR CROP CALENDAR & KNOWLEDGE CENTRE */}
      {activeTab === 'calendar' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-noir-850 border border-noir-700 text-xs text-ivory-300 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-lime-accent flex-shrink-0" />
            <span>
              Official stage-by-stage agronomy guides compiled from Indian Council of Agricultural Research (ICAR) and
              University of Agricultural Sciences (UAS) Bengaluru.
            </span>
          </div>

          <div className="space-y-6">
            {CROP_CALENDAR_DATA.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl noir-card p-6 sm:p-7 border border-noir-700 shadow-noir-card space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-noir-700">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-lime-accent/15 text-lime-glow">
                        Season: {item.season}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-noir-800 text-cyan-ice border border-noir-700">
                        Water: {item.waterRequirement}
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-ivory-100 mt-1">{item.cropName}</h3>
                    <p className="text-xs text-ivory-400 font-mono mt-0.5">
                      Best Sowing Window: {item.bestSowingWindow} • Lifecycle: {item.durationDays} Days
                    </p>
                  </div>

                  <span className="text-xs text-lime-accent font-mono">ICAR Protocol</span>
                </div>

                {/* Stage-by-Stage Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  {item.stages.map((stg, sIdx) => (
                    <div key={sIdx} className="p-3.5 rounded-2xl bg-noir-850 border border-noir-700 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-lime-glow">
                        <span>{stg.stage}</span>
                        <span className="text-[10px] text-ivory-400 font-normal">{stg.dayRange}</span>
                      </div>

                      <ul className="space-y-1 text-ivory-300 text-[11px]">
                        {stg.keyActions.map((act, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-1.5">
                            <span className="text-lime-accent font-bold">•</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-2 border-t border-noir-700 text-[10px] text-amber-solar italic">
                        Critical: {stg.criticalCare}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fertilizer & Pest Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3.5 rounded-2xl bg-noir-850/80 border border-noir-700">
                    <span className="text-[10px] font-mono text-lime-accent font-bold uppercase tracking-wider block mb-1">
                      Fertilizer & Nutrition Dosage
                    </span>
                    <p className="text-ivory-200 leading-relaxed">{item.fertilizerSchedule}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-noir-850/80 border border-noir-700">
                    <span className="text-[10px] font-mono text-amber-solar font-bold uppercase tracking-wider block mb-1">
                      Integrated Pest Management (IPM)
                    </span>
                    <p className="text-ivory-200 leading-relaxed">{item.majorPestsAndControl}</p>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-ivory-400 pt-2 border-t border-noir-700 flex items-center justify-between">
                  <span>Source: {item.icarAdvisoryRef}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT CROP */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-950/80 backdrop-blur-md animate-in fade-in">
          <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-lg bg-noir-900 border border-noir-700 rounded-3xl p-6 sm:p-8 shadow-noir-elevated space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg bg-noir-800 text-ivory-400 hover:text-ivory-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-ivory-100">
              {editingCropId ? 'Edit Crop Details' : 'Register New Crop Holding'}
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-ivory-400 font-mono mb-1">Crop Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sugarcane, Paddy, Finger Millet"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 text-xs focus:outline-none focus:border-lime-accent/50"
                />
                {formErrors.name && <span className="text-rose-400 text-[10px]">{formErrors.name}</span>}
              </div>

              <div>
                <label className="block text-ivory-400 font-mono mb-1">Variety / Hybrid</label>
                <input
                  type="text"
                  placeholder="e.g. Co 86032, Jaya, GPU-28"
                  value={formData.variety}
                  onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 text-xs focus:outline-none focus:border-lime-accent/50"
                />
                {formErrors.variety && <span className="text-rose-400 text-[10px]">{formErrors.variety}</span>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-ivory-400 font-mono mb-1">Area (Acres)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.areaAcres}
                    onChange={(e) => setFormData({ ...formData, areaAcres: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 text-xs focus:outline-none focus:border-lime-accent/50"
                  />
                </div>

                <div>
                  <label className="block text-ivory-400 font-mono mb-1">Current Growth Stage</label>
                  <select
                    value={formData.growthStage}
                    onChange={(e) => setFormData({ ...formData, growthStage: e.target.value as GrowthStage })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 text-xs focus:outline-none focus:border-lime-accent/50"
                  >
                    {GROWTH_STAGES.map((stg) => (
                      <option key={stg} value={stg}>
                        {stg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-ivory-400 font-mono mb-1">Planting Date</label>
                  <input
                    type="date"
                    value={formData.plantingDate}
                    onChange={(e) => setFormData({ ...formData, plantingDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 text-xs focus:outline-none focus:border-lime-accent/50"
                  />
                </div>

                <div>
                  <label className="block text-ivory-400 font-mono mb-1">Expected Harvest Date</label>
                  <input
                    type="date"
                    value={formData.expectedHarvest}
                    onChange={(e) => setFormData({ ...formData, expectedHarvest: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 text-xs focus:outline-none focus:border-lime-accent/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-ivory-400 font-mono mb-1">Field Plot Location</label>
                <input
                  type="text"
                  placeholder="e.g. North Canal Plot #1"
                  value={formData.fieldLocation}
                  onChange={(e) => setFormData({ ...formData, fieldLocation: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 text-xs focus:outline-none focus:border-lime-accent/50"
                />
              </div>

              <div>
                <label className="block text-ivory-400 font-mono mb-1">Agronomic Notes</label>
                <textarea
                  rows={2}
                  placeholder="Notes on fertigation, pest history, intercropping..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 text-xs focus:outline-none focus:border-lime-accent/50"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-noir-700 flex justify-end gap-2 text-xs font-mono">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-noir-800 text-ivory-300 hover:bg-noir-750"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-lime-accent text-noir-950 font-bold hover:bg-lime-glow transition shadow-glow-lime"
              >
                {editingCropId ? 'Save Changes' : 'Register Crop'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
