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
  Zap,
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

  // Sample presets for quick testing with rich SVG illustrations
  const samplePresets = [
    {
      label: 'Paddy Leaf Blast',
      crop: 'Paddy',
      sampleIndex: 0,
      badge: 'Moderate',
      badgeVariant: 'warning' as const,
      color: 'from-amber-600 to-emerald-800',
    },
    {
      label: 'Sugarcane Red Rot',
      crop: 'Sugarcane',
      sampleIndex: 1,
      badge: 'Severe',
      badgeVariant: 'danger' as const,
      color: 'from-rose-600 to-red-900',
    },
    {
      label: 'Tomato Early Blight',
      crop: 'Tomato',
      sampleIndex: 2,
      badge: 'Mild',
      badgeVariant: 'info' as const,
      color: 'from-orange-500 to-amber-700',
    },
    {
      label: 'Healthy Crop Foliage',
      crop: 'General',
      sampleIndex: 3,
      badge: 'Healthy',
      badgeVariant: 'success' as const,
      color: 'from-emerald-600 to-teal-800',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setSelectedFileName(file.name);
        runSimulation(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (presetIndex: number, label: string) => {
    setSelectedFileName(`Preset: ${label}`);
    const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0B2A1E" />
          <stop offset="50%" stop-color="#144A34" />
          <stop offset="100%" stop-color="#1E6B47" />
        </linearGradient>
        <radialGradient id="lesionGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#F59E0B" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)" />
      
      <!-- Leaf Veins & Organic Shape -->
      <path d="M300 60 C 420 120, 460 250, 300 340 C 140 250, 180 120, 300 60 Z" fill="#2E8B57" opacity="0.85" />
      <path d="M300 60 C 390 120, 430 240, 300 340 C 200 240, 220 120, 300 60 Z" fill="#34D399" opacity="0.6" />
      <line x1="300" y1="60" x2="300" y2="340" stroke="#064E3B" stroke-width="5" stroke-linecap="round" />
      <path d="M300 120 Q 360 140 400 160" stroke="#064E3B" stroke-width="2.5" />
      <path d="M300 180 Q 360 200 410 220" stroke="#064E3B" stroke-width="2.5" />
      <path d="M300 140 Q 240 160 200 180" stroke="#064E3B" stroke-width="2.5" />
      <path d="M300 210 Q 240 230 190 250" stroke="#064E3B" stroke-width="2.5" />

      <!-- Simulated Lesion spots -->
      <circle cx="340" cy="180" r="28" fill="url(#lesionGlow)" />
      <ellipse cx="340" cy="180" rx="16" ry="10" fill="#78350F" opacity="0.85" />
      <ellipse cx="260" cy="220" rx="14" ry="8" fill="#78350F" opacity="0.75" />

      <text x="300" y="360" font-family="system-ui, sans-serif" font-size="20" font-weight="900" fill="#ffffff" text-anchor="middle">
        ${label} Specimen
      </text>
      <text x="300" y="385" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#A7F3D0" text-anchor="middle">
        Calibrated Agronomic Pathology • Mandya Sandbox
      </text>
    </svg>`;
    const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgData)}`;
    setSelectedImage(dataUrl);
    runSimulation(presetIndex);
  };

  const runSimulation = (catalogIndex: number) => {
    setIsAnalyzing(true);
    setDiagnosis(null);
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
            <span className="text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 py-0.5 rounded-full shadow-xs">
              Computer Vision Module
            </span>
            <span className="text-xs text-emerald-800 font-bold">• Simulated AI Pathology</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            CropVision AI Diagnostic
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl font-medium">
            Scan crop foliage or test with agronomic field presets to identify lesion signatures,
            pathogens, and actionable organic/chemical treatment regimens.
          </p>
        </div>

        {selectedImage && (
          <button
            onClick={resetScanner}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-emerald-200 rounded-xl hover:bg-emerald-50 transition shadow-sm w-fit"
          >
            <RefreshCw className="w-4 h-4 text-emerald-600" />
            <span>Scan New Specimen</span>
          </button>
        )}
      </div>

      {/* Prominent Simulated Disclaimer Alert */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 flex items-start gap-3.5 text-xs leading-relaxed shadow-xs">
        <div className="p-2 rounded-xl bg-amber-200/60 text-amber-900 flex-shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
        </div>
        <div>
          <span className="font-black text-amber-950 text-sm">
            Demonstration Mode Notice — Simulated Diagnosis Only:
          </span>
          <p className="text-amber-900/90 mt-0.5 font-medium">
            This module runs a deterministic mock interface for hackathon demonstration. No paid cloud APIs, external LLM endpoints, or credit tokens are used. For official field diagnosis in Mandya, confirm with the local Raitha Samparka Kendra.
          </p>
        </div>
      </div>

      {/* Main Grid: Upload & Presets (Left) + Diagnostic Results (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Left Column: Image Uploader & Preset Selector (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm">
            <h3 className="font-black text-base text-slate-900 mb-3 flex items-center justify-between">
              <span>Crop Photo Specimen</span>
              {selectedFileName && (
                <span className="text-[11px] font-bold text-emerald-700 truncate max-w-[150px] bg-emerald-50 px-2 py-0.5 rounded-full">
                  {selectedFileName}
                </span>
              )}
            </h3>

            {/* Upload Box with Dropzone Animation */}
            {!selectedImage ? (
              <label className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition bg-gradient-to-b from-emerald-50/40 to-teal-50/20 hover:from-emerald-50/80 hover:to-teal-50/50 group shadow-xs">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-md shadow-emerald-900/20">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <span className="text-sm font-black text-slate-900 group-hover:text-emerald-800 transition">
                  Click or drag crop photograph
                </span>
                <span className="text-xs text-slate-500 mt-1 max-w-xs font-medium">
                  Supports JPG, PNG, WEBP (Leaf, stem, or earhead closeup)
                </span>
              </label>
            ) : (
              <div className="relative rounded-3xl overflow-hidden border border-emerald-300 bg-slate-950 shadow-md group">
                <img
                  src={selectedImage}
                  alt="Crop Specimen Preview"
                  className="w-full h-64 object-cover object-center"
                />

                {/* Laser scan line overlay when analyzing */}
                {isAnalyzing && (
                  <>
                    <div className="scan-line" />
                    <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                      <div className="w-14 h-14 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin mb-3"></div>
                      <span className="font-black text-sm tracking-wide text-emerald-300 flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span>Scanning Lesion Geometry...</span>
                      </span>
                      <span className="text-xs text-slate-300 mt-1 font-medium">
                        Extracting simulated chlorosis vectors
                      </span>
                    </div>
                  </>
                )}

                {!isAnalyzing && (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-3.5 text-white text-xs flex items-center justify-between">
                    <span className="font-bold text-emerald-300">Specimen Loaded</span>
                    <label className="text-[11px] font-black bg-white/20 hover:bg-white/30 px-3 py-1 rounded-xl cursor-pointer transition">
                      Change Photo
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
                <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>One-Click Test Presets</span>
                </span>
                <span className="text-[10px] text-emerald-800 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-full">
                  Instant Test
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3 font-medium">
                Select a simulated specimen to inspect instant neural analysis:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {samplePresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => handleSelectPreset(preset.sampleIndex, preset.label)}
                    className="p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/60 text-left transition text-xs flex flex-col justify-between group shadow-2xs hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-extrabold text-slate-900 group-hover:text-emerald-900">
                        {preset.label}
                      </span>
                      <Badge variant={preset.badgeVariant} size="sm">
                        {preset.badge}
                      </Badge>
                    </div>
                    <span className="text-[11px] text-slate-500 font-semibold">
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
            <div className="bg-white rounded-3xl p-10 border border-emerald-100 shadow-sm flex flex-col items-center justify-center text-center h-full min-h-[440px]">
              <div className="w-18 h-18 rounded-3xl bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-800 flex items-center justify-center mb-4 shadow-sm">
                <ScanLine className="w-9 h-9 text-emerald-700" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                Awaiting Crop Foliage Specimen
              </h3>
              <p className="text-xs text-slate-500 max-w-md leading-relaxed mb-6 font-medium">
                Upload a plant leaf photo or click one of the calibrated demonstration presets on the left.
                The diagnostic engine will evaluate confidence metrics, symptom markers, and treatments.
              </p>
              <button
                onClick={() => handleSelectPreset(0, 'Paddy Leaf Blast')}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-xs shadow-md shadow-emerald-900/20 transition-all hover:scale-105"
              >
                Load Sample: Paddy Leaf Blast
              </button>
            </div>
          )}

          {isAnalyzing && (
            <div className="bg-white rounded-3xl p-10 border border-emerald-100 shadow-sm flex flex-col items-center justify-center text-center h-full min-h-[440px]">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin mb-4"></div>
              <h3 className="text-lg font-black text-slate-900">
                Running Simulated Vision Pipeline...
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm font-medium">
                Parsing chlorosis index, lesion border geometry, and localized fungal signatures...
              </p>
            </div>
          )}

          {diagnosis && !isAnalyzing && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
              {/* Header Title & Confidence Pill */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
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
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
                    {diagnosis.diseaseName}
                  </h2>
                  <p className="text-xs text-slate-500 italic mt-0.5 font-medium">
                    Pathogen Signature: {diagnosis.scientificName}
                  </p>
                </div>

                {/* Glowing Confidence Pill */}
                <div className="sm:text-right bg-gradient-to-br from-emerald-50 to-teal-50 px-5 py-3 rounded-2xl border border-emerald-200/90 shadow-xs">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                    Diagnostic Confidence
                  </span>
                  <div className="text-3xl font-black text-emerald-950 tracking-tight">
                    {diagnosis.confidence}%
                  </div>
                </div>
              </div>

              {/* Identified Symptoms */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  <span>Observed Symptoms & Indicators</span>
                </h4>
                <div className="bg-slate-50/80 rounded-2xl p-4 space-y-2 text-xs text-slate-700 border border-slate-200/80 font-medium">
                  {diagnosis.symptoms.map((symptom, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0"></span>
                      <span>{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Treatment Protocols Tabs */}
              <div>
                <div className="flex border-b border-slate-200 mb-3.5 text-xs font-black">
                  <button
                    onClick={() => setActiveTab('organic')}
                    className={`pb-3 px-4 border-b-2 transition flex items-center gap-1.5 ${
                      activeTab === 'organic'
                        ? 'border-emerald-700 text-emerald-900 bg-emerald-50/40 rounded-t-xl'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Leaf className="w-4 h-4 text-emerald-600" />
                    <span>Organic Remedies</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('chemical')}
                    className={`pb-3 px-4 border-b-2 transition flex items-center gap-1.5 ${
                      activeTab === 'chemical'
                        ? 'border-teal-700 text-teal-900 bg-teal-50/40 rounded-t-xl'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                    <span>Chemical Treatments</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('prevention')}
                    className={`pb-3 px-4 border-b-2 transition flex items-center gap-1.5 ${
                      activeTab === 'prevention'
                        ? 'border-amber-700 text-amber-900 bg-amber-50/40 rounded-t-xl'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Prevention</span>
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/50 to-teal-50/30 border border-emerald-100 text-xs text-slate-800 space-y-3 font-medium">
                  {activeTab === 'organic' && (
                    <>
                      <div className="font-black text-emerald-950 text-xs mb-1">
                        🌿 Recommended Bio-Control & Traditional Inputs:
                      </div>
                      {diagnosis.organicRemedies.map((remedy, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{remedy}</span>
                        </div>
                      ))}
                    </>
                  )}

                  {activeTab === 'chemical' && (
                    <>
                      <div className="font-black text-slate-900 text-xs mb-1">
                        🧪 Threshold Chemical Advisory (Follow safety guidelines):
                      </div>
                      {diagnosis.chemicalTreatments.map((treatment, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>{treatment}</span>
                        </div>
                      ))}
                    </>
                  )}

                  {activeTab === 'prevention' && (
                    <>
                      <div className="font-black text-slate-900 text-xs mb-1">
                        🛡️ Agronomic Farm Practices to Stop Recurrence:
                      </div>
                      {diagnosis.preventiveMeasures.map((measure, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span>{measure}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              {/* Local Extension Support */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between font-medium">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  <span>Physical confirmation? Contact <strong>Raitha Samparka Kendra, Maddur</strong>.</span>
                </div>
                <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
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
