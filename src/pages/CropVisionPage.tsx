import React, { useState } from 'react';
import {
  Upload,
  ScanLine,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Leaf,
  ShieldCheck,
  FileCheck2,
  HelpCircle,
} from 'lucide-react';
import { SAMPLE_DISEASE_CATALOG } from '../data/mockData';
import { DiseaseDiagnosis } from '../types';
import { Badge } from '../components/common/Badge';

export const CropVisionPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiseaseDiagnosis | null>(null);
  const [activeTab, setActiveTab] = useState<'organic' | 'chemical' | 'prevention'>('organic');

  // Sample presets for quick testing
  const samplePresets = [
    {
      label: 'Paddy Leaf Blast',
      crop: 'Paddy',
      sampleIndex: 0,
      imagePlaceholder: '🌾 Sample Paddy Leaf with spindle lesions',
      badge: 'Moderate',
      badgeVariant: 'warning' as const,
    },
    {
      label: 'Sugarcane Red Rot',
      crop: 'Sugarcane',
      sampleIndex: 1,
      imagePlaceholder: '🎋 Sample Cane Stem with internal discoloration',
      badge: 'Severe',
      badgeVariant: 'danger' as const,
    },
    {
      label: 'Tomato Early Blight',
      crop: 'Tomato',
      sampleIndex: 2,
      imagePlaceholder: '🍅 Sample Tomato Leaf with concentric target rings',
      badge: 'Mild',
      badgeVariant: 'info' as const,
    },
    {
      label: 'Healthy Crop Foliage',
      crop: 'General',
      sampleIndex: 3,
      imagePlaceholder: '🌱 Clean Green Foliage without lesions',
      badge: 'Healthy',
      badgeVariant: 'success' as const,
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setSelectedFileName(file.name);
        runSimulation(0); // Pick default simulated diagnostic result for uploaded custom photo
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (presetIndex: number, label: string) => {
    setSelectedFileName(`Preset: ${label}`);
    // Generate an illustrative SVG canvas data URL for the preset image
    const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1B4332" />
          <stop offset="100%" stop-color="#2D6A4F" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)" />
      <circle cx="300" cy="180" r="110" fill="#40916C" opacity="0.4" />
      <path d="M300 90 C 370 140, 390 220, 300 270 C 210 220, 230 140, 300 90 Z" fill="#74C69D" opacity="0.75" />
      <line x1="300" y1="90" x2="300" y2="270" stroke="#1B4332" stroke-width="4" />
      <text x="300" y="330" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">
        ${label} (Demonstration Specimen)
      </text>
      <text x="300" y="360" font-family="system-ui, sans-serif" font-size="14" fill="#A7F3D0" text-anchor="middle">
        Simulated Field Sample • Mandya Agronomy Test Bench
      </text>
    </svg>`;
    const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgData)}`;
    setSelectedImage(dataUrl);
    runSimulation(presetIndex);
  };

  const runSimulation = (catalogIndex: number) => {
    setIsAnalyzing(true);
    setDiagnosis(null);
    // Simulate neural inference network time
    setTimeout(() => {
      setDiagnosis(SAMPLE_DISEASE_CATALOG[catalogIndex % SAMPLE_DISEASE_CATALOG.length]);
      setIsAnalyzing(false);
    }, 1200);
  };

  const resetScanner = () => {
    setSelectedImage(null);
    setSelectedFileName('');
    setDiagnosis(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
              Computer Vision Module
            </span>
            <span className="text-xs text-slate-500">• Simulated AI Disease Diagnostic</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            CropVision AI Diagnostic
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Upload field crop foliage or test with calibrated agronomic presets to identify symptoms,
            pathogens, and actionable organic/chemical remedies.
          </p>
        </div>

        {selectedImage && (
          <button
            onClick={resetScanner}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition shadow-sm w-fit"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Scan New Specimen</span>
          </button>
        )}
      </div>

      {/* Prominent Simulated Disclaimer Alert */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3 text-xs leading-relaxed">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-900 text-sm">
            Demonstration Mode Notice — Simulated Diagnosis Only:
          </span>
          <p className="text-amber-800 mt-0.5">
            This module runs a deterministic mock interface for hackathon demonstration purposes. No live computer vision models, cloud APIs, or paid inference servers are queried. For physical crop disease verification in Karnataka, always seek confirmation from your local Raitha Samparka Kendra or Krishi Vigyan Kendra agronomists.
          </p>
        </div>
      </div>

      {/* Main Grid: Upload & Presets (Left) + Diagnostic Results (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image Uploader & Preset Selector (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="font-bold text-base text-slate-800 mb-3 flex items-center justify-between">
              <span>Crop Photo Input</span>
              {selectedFileName && (
                <span className="text-[11px] font-normal text-slate-400 truncate max-w-[150px]">
                  {selectedFileName}
                </span>
              )}
            </h3>

            {/* Upload Box */}
            {!selectedImage ? (
              <label className="border-2 border-dashed border-emerald-300/80 hover:border-emerald-500 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition bg-emerald-50/30 hover:bg-emerald-50/60 group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-110 transition shadow-sm">
                  <Upload className="w-8 h-8 text-emerald-700" />
                </div>
                <span className="text-sm font-bold text-slate-800 group-hover:text-emerald-800 transition">
                  Click or drag crop photograph
                </span>
                <span className="text-xs text-slate-400 mt-1 max-w-xs">
                  Supports JPG, PNG, WEBP (Leaf, stem, or earhead closeup)
                </span>
              </label>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group">
                <img
                  src={selectedImage}
                  alt="Crop Specimen Preview"
                  className="w-full h-64 object-cover object-center"
                />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                    <div className="w-12 h-12 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin mb-3"></div>
                    <span className="font-bold text-sm tracking-wide text-emerald-300">
                      Simulating Neural Diagnostics...
                    </span>
                    <span className="text-xs text-slate-400 mt-1">
                      Extracting simulated lesion patterns
                    </span>
                  </div>
                )}
                {!isAnalyzing && (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 to-transparent p-3 text-white text-xs flex items-center justify-between">
                    <span className="font-medium text-emerald-200">Image Loaded Preview</span>
                    <label className="text-[11px] font-bold bg-white/20 hover:bg-white/30 px-2 py-1 rounded cursor-pointer transition">
                      Change File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* Quick Demo Presets */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Quick Demo Test Presets
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  1-Click Test
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Don't have a crop photo handy? Choose a simulated Indian crop specimen:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {samplePresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => handleSelectPreset(preset.sampleIndex, preset.label)}
                    className="p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left transition text-xs flex flex-col justify-between group"
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-bold text-slate-800 group-hover:text-emerald-900">
                        {preset.label}
                      </span>
                      <Badge variant={preset.badgeVariant} size="sm">
                        {preset.badge}
                      </Badge>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Crop: {preset.crop}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Simulated Diagnostic Breakdown (7 Cols) */}
        <div className="lg:col-span-7">
          {!diagnosis && !isAnalyzing && (
            <div className="bg-white rounded-2xl p-10 border border-slate-200/80 shadow-sm flex flex-col items-center justify-center text-center h-full min-h-[420px]">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <ScanLine className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                Awaiting Crop Specimen
              </h3>
              <p className="text-xs text-slate-500 max-w-md leading-relaxed mb-6">
                Upload a leaf photo or pick one of the demonstration presets on the left.
                The simulated diagnosis engine will generate confidence metrics, symptom signatures,
                and ICAR-aligned treatment protocols.
              </p>
              <button
                onClick={() => handleSelectPreset(0, 'Paddy Leaf Blast')}
                className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-900/10 transition"
              >
                Load Sample: Paddy Leaf Blast
              </button>
            </div>
          )}

          {isAnalyzing && (
            <div className="bg-white rounded-2xl p-10 border border-slate-200/80 shadow-sm flex flex-col items-center justify-center text-center h-full min-h-[420px]">
              <div className="w-14 h-14 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin mb-4"></div>
              <h3 className="text-base font-bold text-slate-800">
                Running Simulated Vision Pipeline...
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Parsing chlorosis index, lesion border geometry, and localized fungal signatures...
              </p>
            </div>
          )}

          {diagnosis && !isAnalyzing && (
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
              {/* Header Title & Confidence */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Crop: {diagnosis.cropName}
                    </span>
                    <Badge
                      variant={
                        diagnosis.isHealthy
                          ? 'success'
                          : diagnosis.severity === 'Severe'
                          ? 'danger'
                          : diagnosis.severity === 'Moderate'
                          ? 'warning'
                          : 'info'
                      }
                    >
                      {diagnosis.isHealthy ? 'Healthy Specimen' : `${diagnosis.severity} Severity`}
                    </Badge>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {diagnosis.diseaseName}
                  </h2>
                  <p className="text-xs text-slate-500 italic mt-0.5">
                    Scientific / Pathogen: {diagnosis.scientificName}
                  </p>
                </div>

                {/* Confidence Pill */}
                <div className="sm:text-right bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-200/70">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                    Simulated Confidence
                  </span>
                  <div className="text-2xl font-extrabold text-emerald-900 tracking-tight">
                    {diagnosis.confidence}%
                  </div>
                </div>
              </div>

              {/* Identified Symptoms */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  <span>Observed Symptoms & Indicators</span>
                </h4>
                <div className="bg-slate-50 rounded-xl p-3.5 space-y-2 text-xs text-slate-700 border border-slate-100">
                  {diagnosis.symptoms.map((symptom, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0"></span>
                      <span>{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Treatment Protocols Tabs */}
              <div>
                <div className="flex border-b border-slate-200 mb-3 text-xs font-bold">
                  <button
                    onClick={() => setActiveTab('organic')}
                    className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 ${
                      activeTab === 'organic'
                        ? 'border-emerald-700 text-emerald-900'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Organic Remedies</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('chemical')}
                    className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 ${
                      activeTab === 'chemical'
                        ? 'border-emerald-700 text-emerald-900'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    <span>Chemical Treatments</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('prevention')}
                    className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 ${
                      activeTab === 'prevention'
                        ? 'border-emerald-700 text-emerald-900'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Preventive Measures</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100/70 text-xs text-slate-700 space-y-2.5">
                  {activeTab === 'organic' && (
                    <>
                      <div className="font-bold text-emerald-950 text-xs mb-1">
                        🌿 Recommended Bio-Control & Traditional Inputs:
                      </div>
                      {diagnosis.organicRemedies.map((remedy, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{remedy}</span>
                        </div>
                      ))}
                    </>
                  )}

                  {activeTab === 'chemical' && (
                    <>
                      <div className="font-bold text-slate-900 text-xs mb-1">
                        🧪 Threshold Chemical Advisory (Follow safety guidelines):
                      </div>
                      {diagnosis.chemicalTreatments.map((treatment, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>{treatment}</span>
                        </div>
                      ))}
                    </>
                  )}

                  {activeTab === 'prevention' && (
                    <>
                      <div className="font-bold text-slate-900 text-xs mb-1">
                        🛡️ Agronomic Farm Practices to Stop Recurrence:
                      </div>
                      {diagnosis.preventiveMeasures.map((measure, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span>{measure}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              {/* Local Agronomy Extension Support */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  <span>Need local confirmation? Visit <strong>Raitha Samparka Kendra, Maddur</strong>.</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                  Free Extension
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
