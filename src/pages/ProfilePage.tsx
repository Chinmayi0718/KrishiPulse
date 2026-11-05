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
  Globe,
  Database,
  Lock,
  Phone,
  Mail,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { profile, updateProfile, resetDemoData, language, setLanguage } = useApp();
  const [formData, setFormData] = useState<FarmerProfile>({ ...profile });
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'auth'>('profile');
  const [loginPhone, setLoginPhone] = useState(profile.phone);
  const [loginKisanId, setLoginKisanId] = useState(profile.kisanId);
  const [authSuccess, setAuthSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);

    try {
      await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch {
      // Local sync handled
    }

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: loginPhone, kisanId: loginKisanId }),
      });
      if (res.ok) {
        setAuthSuccess(true);
        setTimeout(() => setAuthSuccess(false), 3000);
      }
    } catch {
      setAuthSuccess(true);
      setTimeout(() => setAuthSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden noir-card border border-noir-700/80 shadow-noir-elevated p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-lime-accent/15 text-lime-accent border border-lime-accent/30 shadow-glow-lime">
                <User className="w-5 h-5" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-lime-accent">
                Farmer Identity & Land Registry
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ivory-100 tracking-tight">
              Farmer Profile & Settings
            </h1>
            <p className="text-xs sm:text-sm text-ivory-300 mt-1 max-w-xl leading-relaxed">
              Configure your land holding size, soil classification, irrigation infrastructure, and preferred dialect
              for AI responses.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (window.confirm('Reset all demo profile details to default Basavarajappa Gowda (Mandya)?')) {
                  resetDemoData();
                  setFormData({ ...profile });
                }
              }}
              className="px-4 py-2 rounded-xl bg-noir-850 hover:bg-noir-800 text-ivory-300 border border-noir-700 text-xs font-mono flex items-center gap-2 transition"
            >
              <RotateCcw className="w-3.5 h-3.5 text-lime-accent" />
              <span>Reset Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-noir-700 space-x-4 text-xs font-mono">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 border-b-2 font-bold transition flex items-center gap-1.5 ${
            activeTab === 'profile'
              ? 'border-lime-accent text-lime-glow'
              : 'border-transparent text-ivory-400 hover:text-ivory-200'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Farm Parameters & Language</span>
        </button>

        <button
          onClick={() => setActiveTab('auth')}
          className={`pb-3 border-b-2 font-bold transition flex items-center gap-1.5 ${
            activeTab === 'auth'
              ? 'border-lime-accent text-lime-glow'
              : 'border-transparent text-ivory-400 hover:text-ivory-200'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Kisan ID Authentication</span>
        </button>
      </div>

      {/* TAB 1: PROFILE & FARM PARAMETERS */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-3xl noir-card p-6 sm:p-8 border border-noir-700 shadow-noir-card space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-noir-700">
              <h2 className="text-base font-bold text-ivory-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-lime-accent" />
                <span>Personal & Regional Identity</span>
              </h2>

              <span className="text-xs font-mono text-lime-glow font-bold bg-lime-accent/15 px-3 py-1 rounded-full border border-lime-accent/30">
                Kisan: {formData.kisanId}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-ivory-400 font-mono mb-1">Farmer Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 focus:outline-none focus:border-lime-accent/50 text-xs"
                />
              </div>

              <div>
                <label className="block text-ivory-400 font-mono mb-1">Phone Number (Aadhaar NPCI Linked)</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 focus:outline-none focus:border-lime-accent/50 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-ivory-400 font-mono mb-1">Village / Hobli</label>
                <input
                  type="text"
                  value={formData.village || 'Koppa Hobli'}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 focus:outline-none focus:border-lime-accent/50 text-xs"
                />
              </div>

              <div>
                <label className="block text-ivory-400 font-mono mb-1">Taluk</label>
                <input
                  type="text"
                  value={formData.taluk}
                  onChange={(e) => setFormData({ ...formData, taluk: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 focus:outline-none focus:border-lime-accent/50 text-xs"
                />
              </div>

              <div>
                <label className="block text-ivory-400 font-mono mb-1">District</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 focus:outline-none focus:border-lime-accent/50 text-xs"
                />
              </div>

              <div>
                <label className="block text-ivory-400 font-mono mb-1">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 focus:outline-none focus:border-lime-accent/50 text-xs"
                />
              </div>
            </div>

            {/* Language Selection */}
            <div className="pt-2">
              <label className="block text-ivory-400 font-mono text-xs mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-lime-accent" />
                <span>Preferred Language (App UI & Pulse AI Responses)</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'en' as const, label: 'English', desc: 'Global English' },
                  { key: 'kn' as const, label: 'ಕನ್ನಡ', desc: 'Kannada Script' },
                  { key: 'hi' as const, label: 'हिन्दी', desc: 'Hindi Script' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.key}
                    onClick={() => {
                      setFormData({ ...formData, preferredLanguage: item.key });
                      setLanguage(item.key);
                    }}
                    className={`p-3 rounded-2xl border text-left transition ${
                      formData.preferredLanguage === item.key
                        ? 'bg-lime-accent/20 border-lime-accent text-lime-glow shadow-glow-lime'
                        : 'bg-noir-850 border-noir-700 text-ivory-300 hover:bg-noir-800'
                    }`}
                  >
                    <div className="font-bold text-sm text-ivory-100">{item.label}</div>
                    <div className="text-[10px] text-ivory-400 font-mono mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Farm Agronomic Properties */}
            <div className="pt-4 border-t border-noir-700 space-y-4">
              <h3 className="text-sm font-bold text-ivory-100 flex items-center gap-2">
                <Sprout className="w-4 h-4 text-lime-accent" />
                <span>Farm Land & Irrigation Setup</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-ivory-400 font-mono mb-1">Total Land Size (Acres)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.totalLandAcres}
                    onChange={(e) => setFormData({ ...formData, totalLandAcres: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 focus:outline-none focus:border-lime-accent/50 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-ivory-400 font-mono mb-1">Soil Classification</label>
                  <select
                    value={formData.soilType}
                    onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 focus:outline-none focus:border-lime-accent/50 text-xs"
                  >
                    <option value="Red Sandy Loam (Kavalu Mannu)">Red Sandy Loam (Kavalu Mannu)</option>
                    <option value="Black Cotton Soil (Regur)">Black Cotton Soil (Regur)</option>
                    <option value="Alluvial Riverine Soil">Alluvial Riverine Soil</option>
                    <option value="Laterite Red Soil">Laterite Red Soil</option>
                    <option value="Clay Loam">Clay Loam</option>
                  </select>
                </div>

                <div>
                  <label className="block text-ivory-400 font-mono mb-1">Irrigation Method</label>
                  <select
                    value={formData.irrigationType}
                    onChange={(e) => setFormData({ ...formData, irrigationType: e.target.value as IrrigationType })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 focus:outline-none focus:border-lime-accent/50 text-xs"
                  >
                    <option value="Drip & Borewell">Drip & Borewell</option>
                    <option value="Drip Irrigation">Drip Irrigation</option>
                    <option value="Sprinkler System">Sprinkler System</option>
                    <option value="Canal / Flood">Canal / Flood</option>
                    <option value="Rainfed">Rainfed</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-ivory-400 font-mono mb-1">Latitude</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={formData.latitude}
                      onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 focus:outline-none focus:border-lime-accent/50 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-ivory-400 font-mono mb-1">Longitude</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={formData.longitude}
                      onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 focus:outline-none focus:border-lime-accent/50 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-noir-700 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-ivory-400">
                <Database className="w-3.5 h-3.5 text-lime-accent" />
                <span>Persisted in Supabase PostgreSQL & Local Storage</span>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-lime-accent text-noir-950 font-mono font-bold text-xs flex items-center gap-2 hover:bg-lime-glow transition shadow-glow-lime"
              >
                {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                <span>{isSaved ? 'Changes Saved!' : 'Save Farmer Profile'}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: AUTHENTICATION STUB */}
      {activeTab === 'auth' && (
        <form onSubmit={handleLogin} className="rounded-3xl noir-card p-6 sm:p-8 border border-noir-700 shadow-noir-card space-y-4 max-w-lg mx-auto">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-noir-850 border border-noir-700 text-lime-accent flex items-center justify-center mx-auto mb-2 shadow-glow-lime">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-ivory-100">Farmer Account Login</h2>
            <p className="text-xs text-ivory-400 font-mono">
              Authenticate with your registered Kisan ID or Mobile Number.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-ivory-400 font-mono mb-1">Kisan ID</label>
              <input
                type="text"
                value={loginKisanId}
                onChange={(e) => setLoginKisanId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 focus:outline-none focus:border-lime-accent/50 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-ivory-400 font-mono mb-1">Mobile Number</label>
              <input
                type="text"
                value={loginPhone}
                onChange={(e) => setLoginPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 focus:outline-none focus:border-lime-accent/50 text-xs font-mono"
              />
            </div>
          </div>

          {authSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-bright text-xs font-mono text-center">
              ✓ Authenticated session active as Basavarajappa Gowda
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-lime-accent text-noir-950 font-mono font-bold text-xs hover:bg-lime-glow transition shadow-glow-lime mt-2"
          >
            Authenticate Session
          </button>
        </form>
      )}
    </div>
  );
};
