import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FarmerProfile, IrrigationType } from '../types';
import {
  User,
  Save,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
  Layers,
  Sprout,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { profile, updateProfile, resetDemoData } = useApp();
  const [formData, setFormData] = useState<FarmerProfile>({ ...profile });
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-7 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-3 py-0.5 rounded-full shadow-xs">
              Kisan Registry
            </span>
            <span className="text-xs text-emerald-800 font-bold">• Mandya Agricultural Division</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Farmer Profile & Farm Settings
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Personalize your agronomic recommendations, land parameters, irrigation systems, and preferred dialect.
          </p>
        </div>

        <button
          onClick={() => {
            if (window.confirm('Reset all demo profile details to default Ramesh Gowda (Mandya)?')) {
              resetDemoData();
              setFormData({ ...profile });
            }
          }}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 bg-white border border-emerald-200 rounded-xl hover:bg-emerald-50 transition shadow-xs w-fit"
        >
          <RotateCcw className="w-4 h-4 text-emerald-600" />
          <span>Reset Demo Account</span>
        </button>
      </div>

      {/* Main Profile Card with Vibrant Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-9 border border-emerald-100 shadow-sm relative overflow-hidden">
        {/* Profile Avatar Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-7 border-b border-slate-100">
          <div className="w-22 h-22 rounded-3xl bg-gradient-to-br from-emerald-800 via-forest-800 to-teal-900 flex items-center justify-center text-white shadow-xl shadow-emerald-950/20 ring-4 ring-emerald-100">
            <User className="w-12 h-12 text-emerald-200" />
          </div>
          <div className="text-center sm:text-left space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{formData.name}</h2>
              <span className="text-xs font-extrabold bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-200 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Verified Kisan</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 font-semibold flex items-center justify-center sm:justify-start gap-1">
              <span>Kisan ID:</span>
              <strong className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">{formData.kisanId}</strong>
              <span>• RSK Maddur Registered</span>
            </p>
            <p className="text-xs text-emerald-800 font-extrabold flex items-center justify-center sm:justify-start gap-2">
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" />
                <span>{formData.totalLandAcres} Total Acres</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Sprout className="w-3.5 h-3.5" />
                <span>{formData.soilType}</span>
              </span>
            </p>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="mt-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">
                Farmer Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">
                Mobile Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">
                State
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">
                District
              </label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">
                Taluk / Block
              </label>
              <input
                type="text"
                value={formData.taluk}
                onChange={(e) => setFormData({ ...formData, taluk: e.target.value })}
                className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">
                Village / Field Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">
                Preferred Interface Dialect / Language
              </label>
              <select
                value={formData.preferredLanguage}
                onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white font-semibold"
              >
                <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
                <option value="English">English</option>
                <option value="Hindi">हिन्दी (Hindi)</option>
                <option value="Telugu">తెలుగు (Telugu)</option>
                <option value="Tamil">தமிழ் (Tamil)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">
                Total Land Holding (Acres)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                value={formData.totalLandAcres}
                onChange={(e) =>
                  setFormData({ ...formData, totalLandAcres: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">
                Primary Soil Classification
              </label>
              <input
                type="text"
                value={formData.soilType}
                onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">
                Primary Irrigation System
              </label>
              <select
                value={formData.irrigationType}
                onChange={(e) =>
                  setFormData({ ...formData, irrigationType: e.target.value as IrrigationType })
                }
                className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white font-semibold"
              >
                <option value="Drip Irrigation">Drip Irrigation (Micro-irrigation)</option>
                <option value="Sprinkler System">Sprinkler System</option>
                <option value="Canal / Flood">Canal / Flood Inundation</option>
                <option value="Rainfed">Rainfed (Dryland)</option>
              </select>
            </div>
          </div>

          <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
            {isSaved ? (
              <span className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-300 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Profile updated & persisted locally!</span>
              </span>
            ) : (
              <span className="text-xs text-slate-400 font-medium">
                Persisted in local browser storage.
              </span>
            )}

            <button
              type="submit"
              className="flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-emerald-700 via-forest-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xs shadow-md shadow-emerald-950/20 transition hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
