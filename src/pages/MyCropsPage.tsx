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
} from 'lucide-react';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';

export const MyCropsPage: React.FC = () => {
  const { crops, addCrop, updateCrop, deleteCrop, profile } = useApp();
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
    if (!formData.expectedHarvest) errors.expectedHarvest = 'Harvest date is required';
    if (formData.areaAcres <= 0) errors.areaAcres = 'Acreage must be greater than 0';
    if (formData.plantingDate && formData.expectedHarvest && formData.expectedHarvest < formData.plantingDate) {
      errors.expectedHarvest = 'Harvest date cannot be before planting date';
    }
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
    if (window.confirm(`Are you sure you want to remove "${name}" from your active crops inventory?`)) {
      deleteCrop(id);
    }
  };

  const totalAcres = crops.reduce((sum, c) => sum + c.areaAcres, 0);

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-lime-600 to-emerald-700 text-white px-3 py-0.5 rounded-full shadow-xs">
              Field Portfolio
            </span>
            <span className="text-xs text-emerald-800 font-bold">• {crops.length} Registered Crops</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Crop Inventory
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Track crop life cycles, planting dates, growth stages, and acreage distribution across {profile.location}.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xs shadow-md shadow-emerald-900/20 transition-all hover:scale-105 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Crop</span>
        </button>
      </div>

      {/* Acreage Distribution Bar with Eye-Catching Gradients */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
          <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Total Farm Acreage Allocation</span>
          </span>
          <span className="text-xs font-black text-slate-900">
            {totalAcres.toFixed(1)} / {profile.totalLandAcres} Acres Utilized (
            {Math.round((totalAcres / profile.totalLandAcres) * 100)}%)
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden flex border border-slate-200 p-0.5">
          {crops.map((c, idx) => {
            const colors = [
              'bg-gradient-to-r from-emerald-600 to-teal-600',
              'bg-gradient-to-r from-teal-500 to-cyan-500',
              'bg-gradient-to-r from-amber-500 to-orange-500',
              'bg-gradient-to-r from-sky-500 to-blue-500',
              'bg-gradient-to-r from-lime-500 to-emerald-500',
            ];
            const widthPct = (c.areaAcres / profile.totalLandAcres) * 100;
            return (
              <div
                key={c.id}
                className={`h-full rounded-full ${colors[idx % colors.length]}`}
                style={{ width: `${widthPct}%` }}
                title={`${c.name}: ${c.areaAcres} Acres`}
              />
            );
          })}
        </div>
        <div className="flex flex-wrap gap-4 mt-4 text-xs text-slate-600 font-semibold">
          {crops.map((c, idx) => {
            const dotColors = ['bg-emerald-600', 'bg-teal-500', 'bg-amber-500', 'bg-sky-500', 'bg-lime-500'];
            return (
              <div key={c.id} className="flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded-full ${dotColors[idx % dotColors.length]}`} />
                <span>
                  {c.name}: <strong className="text-slate-900">{c.areaAcres} Ac</strong>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Crops Cards Grid */}
      {crops.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-emerald-100 shadow-sm max-w-md mx-auto">
          <div className="w-18 h-18 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
            <Sprout className="w-9 h-9" />
          </div>
          <h3 className="text-lg font-black text-slate-900 mb-1">No Crops Added Yet</h3>
          <p className="text-xs text-slate-500 mb-6 font-medium">
            Get started by recording your standing crops, varieties, and expected harvests.
          </p>
          <button
            onClick={openAddModal}
            className="px-6 py-3 rounded-2xl bg-emerald-800 text-white font-black text-xs"
          >
            Add Your First Crop
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crops.map((crop) => (
            <div
              key={crop.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-md shadow-emerald-900/20 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                      <Sprout className="w-6 h-6 text-emerald-200" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-slate-900 leading-tight">
                        {crop.name}
                      </h3>
                      <p className="text-xs text-emerald-800 font-bold">{crop.variety}</p>
                    </div>
                  </div>

                  <Badge
                    variant={
                      crop.health === 'Optimal'
                        ? 'success'
                        : crop.health === 'Attention'
                        ? 'warning'
                        : 'danger'
                    }
                  >
                    {crop.health}
                  </Badge>
                </div>

                {/* Growth Stage Progress */}
                <div className="my-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between text-xs mb-2 font-bold">
                    <span className="text-slate-500">Stage:</span>
                    <span className="text-emerald-900 font-extrabold">{crop.growthStage}</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5 h-2">
                    {['Sowing', 'Vegetative', 'Flowering', 'Maturity', 'Harvesting'].map((stg) => {
                      const stages = ['Sowing', 'Vegetative', 'Flowering', 'Maturity', 'Harvesting'];
                      const currentIdx = stages.indexOf(crop.growthStage);
                      const stageIdx = stages.indexOf(stg);
                      const isCompleted = stageIdx <= currentIdx;

                      return (
                        <div
                          key={stg}
                          className={`rounded-full h-full transition ${
                            isCompleted ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-slate-200'
                          }`}
                          title={stg}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Details list */}
                <div className="space-y-2 text-xs text-slate-600 mb-4 font-medium">
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Cultivated Area:</span>
                    </span>
                    <span className="font-black text-slate-900">{crop.areaAcres} Acres</span>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Field Location:</span>
                    </span>
                    <span className="font-bold text-slate-800">{crop.fieldLocation}</span>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Planted Date:</span>
                    </span>
                    <span className="font-semibold text-slate-800">
                      {new Date(crop.plantingDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1.5">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Est. Harvest:</span>
                    </span>
                    <span className="font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {new Date(crop.expectedHarvest).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  {crop.notes && (
                    <div className="mt-2.5 p-3 bg-slate-50 rounded-xl text-[11px] text-slate-600 italic border border-slate-100">
                      "{crop.notes}"
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3.5 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEditModal(crop)}
                  className="p-2 text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition"
                  title="Edit Crop Record"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(crop.id, crop.name)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                  title="Delete Crop"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Crop Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCropId ? 'Edit Crop Record' : 'Register New Crop'}
        subtitle="Manage field acreage, variety, planting schedules, and health parameters."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Crop Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Sugarcane, Paddy, Tomato"
                className={`w-full px-3 py-2 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  formErrors.name ? 'border-rose-400' : 'border-slate-300'
                }`}
              />
              {formErrors.name && (
                <span className="text-[11px] text-rose-500 mt-0.5 block">{formErrors.name}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Variety / Hybrid *
              </label>
              <input
                type="text"
                value={formData.variety}
                onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                placeholder="e.g. Co 86032, Jaya, GPU 28"
                className={`w-full px-3 py-2 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  formErrors.variety ? 'border-rose-400' : 'border-slate-300'
                }`}
              />
              {formErrors.variety && (
                <span className="text-[11px] text-rose-500 mt-0.5 block">{formErrors.variety}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Cultivated Area (Acres) *
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={formData.areaAcres}
                onChange={(e) =>
                  setFormData({ ...formData, areaAcres: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Growth Stage
              </label>
              <select
                value={formData.growthStage}
                onChange={(e) =>
                  setFormData({ ...formData, growthStage: e.target.value as GrowthStage })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white font-medium"
              >
                <option value="Sowing">Sowing</option>
                <option value="Vegetative">Vegetative</option>
                <option value="Flowering">Flowering</option>
                <option value="Maturity">Maturity</option>
                <option value="Harvesting">Harvesting</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Health Status
              </label>
              <select
                value={formData.health}
                onChange={(e) =>
                  setFormData({ ...formData, health: e.target.value as HealthStatus })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white font-medium"
              >
                <option value="Optimal">Optimal (Healthy)</option>
                <option value="Attention">Attention Needed</option>
                <option value="Critical">Critical Issue</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Planting Date *
              </label>
              <input
                type="date"
                value={formData.plantingDate}
                onChange={(e) => setFormData({ ...formData, plantingDate: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Expected Harvest Date *
              </label>
              <input
                type="date"
                value={formData.expectedHarvest}
                onChange={(e) => setFormData({ ...formData, expectedHarvest: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Field Location / Plot Name
            </label>
            <input
              type="text"
              value={formData.fieldLocation}
              onChange={(e) => setFormData({ ...formData, fieldLocation: e.target.value })}
              placeholder="e.g. North Field Plot #1, Canal Side"
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Notes & Agronomy Remarks
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Fertilizer schedule, intercropping, seed treatment details..."
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-black bg-gradient-to-r from-emerald-700 to-teal-700 text-white rounded-xl shadow-md transition"
            >
              {editingCropId ? 'Save Changes' : 'Add to Inventory'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
