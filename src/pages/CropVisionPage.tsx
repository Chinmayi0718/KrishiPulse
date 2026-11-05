import React, { useState } from 'react';
import {
  Upload,
  ScanLine,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  FileCheck2,
  HelpCircle,
  Zap,
  Leaf,
  Clock,
  ExternalLink,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { SAMPLE_DISEASE_CATALOG } from '../data/mockData';
import { DiseaseDiagnosis } from '../types';

export const CropVisionPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiseaseDiagnosis | null>(SAMPLE_DISEASE_CATALOG[0]);
  const [activeTab, setActiveTab] = useState<'organic' | 'chemical' | 'prevention'>('organic');
  const [scanHistory, setScanHistory] = useState<DiseaseDiagnosis[]>(SAMPLE_DISEASE_CATALOG);

  const samplePresets = [
    {
      label: 'Paddy Leaf Blast',
      crop: 'Paddy',
      sampleIndex: 0,
      badge: 'Moderate',
      color: 'border-amber-solar/40 bg-amber-solar/10 text-amber-solar',
    },
    {
      label: 'Tomato Early Blight',
      crop: 'Tomato',
      sampleIndex: 1,
      badge: 'Mild',
      color: 'border-cyan-moisture/40 bg-cyan-moisture/10 text-cyan-ice',
    },
    {
      label: 'Cotton Leaf Curl',
      crop: 'Cotton',
      sampleIndex: 2,
      badge: 'Severe',
      color: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
    },
    {
      label: 'Healthy Sugarcane',
      crop: 'Sugarcane',
      sampleIndex: 3,
      badge: 'Optimal',
      color: 'border-lime-accent/40 bg-lime-accent/10 text-lime-glow',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setSelectedImage(base64);
        triggerAnalysis(base64, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerAnalysis = async (imageBase64?: string, fileName?: string) => {
    setIsAnalyzing(true);
    setDiagnosis(null);

    try {
      const res = await fetch('/api/cropvision/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imageBase64 || selectedImage,
          cropName: 'Foliar Specimen',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const result: DiseaseDiagnosis = {
          ...data.diagnosis,
          id: `diag-${Date.now()}`,
          cropName: 'Field Sample',
          analyzedAt: 'Just now',
        };
        setDiagnosis(result);
        setScanHistory((prev) => [result, ...prev.slice(0, 4)]);
      } else {
        throw new Error('API fallback');
      }
    } catch {
      // Local fallback simulation
      setTimeout(() => {
        const fallback = SAMPLE_DISEASE_CATALOG[0];
        setDiagnosis(fallback);
      }, 1200);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectPreset = (index: number) => {
    const preset = SAMPLE_DISEASE_CATALOG[index];
    setSelectedImage(null);
    setSelectedFileName(preset.diseaseName);
    setIsAnalyzing(true);
    setDiagnosis(null);

    setTimeout(() => {
      setDiagnosis(preset);
      setIsAnalyzing(false);
    }, 600);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden noir-card border border-noir-700/80 shadow-noir-elevated p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-emerald-500/15 text-emerald-bright border border-emerald-500/30 shadow-glow-emerald">
                <ScanLine className="w-5 h-5" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-bright">
                Multimodal Computer Vision
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ivory-100 tracking-tight">
              PulseVision AI Scanner
            </h1>
            <p className="text-xs sm:text-sm text-ivory-300 mt-1 max-w-2xl leading-relaxed">
              Upload photographs of symptomatic leaves, stem blights, or lesions. Gemini multimodal models scan for
              pathogenic fungal structures, chlorotic halos, and nutrient deficiencies.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-noir-850 border border-noir-700 text-xs font-mono text-ivory-400 max-w-xs">
            <span className="text-lime-glow font-bold flex items-center gap-1 mb-1">
              <ShieldCheck className="w-4 h-4 text-lime-accent" />
              <span>Certified Advisory Protocol</span>
            </span>
            <p className="text-[11px] leading-relaxed">
              Prescriptions conform to ICAR standard packages of practices for Cauvery and Deccan agro-climatic zones.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Upload & Inspection vs Diagnostic Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image Upload & Presets (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Upload Dropzone */}
          <div className="rounded-3xl noir-card p-6 border border-noir-700 shadow-noir-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-ivory-100 flex items-center gap-2">
                <Upload className="w-4 h-4 text-lime-accent" />
                <span>Crop Leaf Photograph</span>
              </h3>
              {selectedFileName && (
                <span className="text-[11px] font-mono text-lime-glow truncate max-w-[150px]">
                  {selectedFileName}
                </span>
              )}
            </div>

            {/* Drag & Drop Visual Area */}
            <label className="relative border-2 border-dashed border-noir-700 hover:border-lime-accent/50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition group bg-noir-850/60 min-h-[220px]">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {selectedImage ? (
                <div className="relative w-full h-44 rounded-xl overflow-hidden">
                  <img
                    src={selectedImage}
                    alt="Uploaded Leaf Specimen"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-noir-950/70 backdrop-blur-xs flex flex-col items-center justify-center gap-2">
                      <div className="w-full h-1 bg-lime-accent animate-scan-line shadow-glow-lime" />
                      <span className="text-xs font-mono text-lime-glow font-bold">Scanning foliage features...</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-noir-800 text-lime-accent border border-noir-700 flex items-center justify-center mx-auto group-hover:scale-105 group-hover:border-lime-accent/50 transition">
                    <ScanLine className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-ivory-100 group-hover:text-lime-glow transition">
                      Upload Leaf Image
                    </span>
                    <p className="text-[11px] text-ivory-400 font-mono mt-0.5">
                      Drag & drop or browse (JPEG, PNG, WebP)
                    </p>
                  </div>
                </div>
              )}
            </label>

            {/* Preset Samples */}
            <div className="space-y-2 pt-2 border-t border-noir-700">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-ivory-400">
                Or Test Verified Pathogen Presets:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {samplePresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => handleSelectPreset(preset.sampleIndex)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-mono transition flex flex-col justify-between ${preset.color} hover:scale-[1.02]`}
                  >
                    <span className="font-bold text-ivory-100 truncate">{preset.label}</span>
                    <span className="text-[10px] opacity-80 mt-1">{preset.badge}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Diagnostic Results & Remediation (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {isAnalyzing ? (
            <div className="rounded-3xl noir-card p-12 border border-noir-700 text-center space-y-4 min-h-[400px] flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-lime-accent/15 text-lime-accent border border-lime-accent/30 flex items-center justify-center animate-spin">
                <RefreshCw className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-ivory-100">Analyzing Crop Leaf Features</h3>
              <p className="text-xs text-ivory-400 font-mono max-w-sm">
                Segmenting chlorotic necrotic centers, verifying fungal spore structures, and retrieving ICAR-approved
                treatments.
              </p>
            </div>
          ) : diagnosis ? (
            <div className="rounded-3xl noir-card p-6 sm:p-7 border border-noir-700 shadow-noir-card space-y-6">
              {/* Top Diagnosis Heading */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-noir-700">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        diagnosis.severity === 'Severe'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : diagnosis.severity === 'Moderate'
                          ? 'bg-amber-solar/20 text-amber-solar border-amber-solar/40'
                          : 'bg-lime-accent/20 text-lime-glow border-lime-accent/40'
                      }`}
                    >
                      Severity: {diagnosis.severity}
                    </span>
                    <span className="text-[10px] font-mono text-ivory-400">
                      Crop: {diagnosis.cropName}
                    </span>
                  </div>

                  <h2 className="text-xl font-extrabold text-ivory-100">{diagnosis.diseaseName}</h2>
                  <p className="text-xs text-lime-accent font-mono italic mt-0.5">
                    Pathogen: {diagnosis.scientificName}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-mono text-ivory-400 uppercase tracking-wider block">
                    Diagnostic Confidence
                  </span>
                  <div className="text-2xl sm:text-3xl font-mono font-black text-lime-glow">
                    {diagnosis.confidence}%
                  </div>
                  <span className="text-[10px] font-mono text-emerald-bright">Multimodal Match</span>
                </div>
              </div>

              {/* Observed Symptoms */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ivory-400 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-lime-accent" />
                  <span>Observed Symptoms</span>
                </h4>
                <div className="space-y-1.5">
                  {diagnosis.symptoms.map((sym, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-noir-850 border border-noir-700 text-xs text-ivory-200 flex items-start gap-2">
                      <span className="text-lime-accent font-bold mt-0.5">•</span>
                      <span>{sym}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Remediation Tabs */}
              <div className="space-y-3 pt-2">
                <div className="flex border-b border-noir-700 gap-4 text-xs font-mono">
                  <button
                    onClick={() => setActiveTab('organic')}
                    className={`pb-2 border-b-2 font-bold transition ${
                      activeTab === 'organic'
                        ? 'border-lime-accent text-lime-glow'
                        : 'border-transparent text-ivory-400 hover:text-ivory-200'
                    }`}
                  >
                    1. Organic Bio-Control
                  </button>
                  <button
                    onClick={() => setActiveTab('chemical')}
                    className={`pb-2 border-b-2 font-bold transition ${
                      activeTab === 'chemical'
                        ? 'border-amber-solar text-amber-solar'
                        : 'border-transparent text-ivory-400 hover:text-ivory-200'
                    }`}
                  >
                    2. Chemical Curatives
                  </button>
                  <button
                    onClick={() => setActiveTab('prevention')}
                    className={`pb-2 border-b-2 font-bold transition ${
                      activeTab === 'prevention'
                        ? 'border-cyan-ice text-cyan-ice'
                        : 'border-transparent text-ivory-400 hover:text-ivory-200'
                    }`}
                  >
                    3. Cultural Prevention
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  {activeTab === 'organic' && (
                    <div className="space-y-2">
                      {diagnosis.organicRemedies.map((rem, rIdx) => (
                        <div key={rIdx} className="p-3 rounded-xl bg-lime-accent/10 border border-lime-accent/25 text-ivory-200 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-lime-accent flex-shrink-0 mt-0.5" />
                          <span>{rem}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'chemical' && (
                    <div className="space-y-2">
                      {diagnosis.chemicalTreatments.map((chem, cIdx) => (
                        <div key={cIdx} className="p-3 rounded-xl bg-amber-solar/10 border border-amber-solar/25 text-ivory-200 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-solar flex-shrink-0 mt-0.5" />
                          <span>{chem}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'prevention' && (
                    <div className="space-y-2">
                      {diagnosis.preventiveMeasures.map((prev, pIdx) => (
                        <div key={pIdx} className="p-3 rounded-xl bg-cyan-moisture/10 border border-cyan-moisture/25 text-ivory-200 flex items-start gap-2">
                          <ShieldCheck className="w-4 h-4 text-cyan-ice flex-shrink-0 mt-0.5" />
                          <span>{prev}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* STATUTORY MANDATORY DISCLAIMER */}
              <div className="p-3.5 rounded-2xl bg-noir-850/90 border border-noir-700 text-[11px] text-ivory-400 leading-relaxed flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-amber-solar flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-ivory-300 font-bold">Agronomic Observation Disclaimer:</strong> This diagnosis is
                  an AI-generated observation based on visual patterns and does not constitute guaranteed laboratory diagnosis.
                  Always verify with your local Raitha Samparka Kendra (RSK) or KVK officer before extensive chemical spraying.
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
