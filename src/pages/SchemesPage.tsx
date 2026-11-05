import React, { useState } from 'react';
import {
  Landmark,
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  FileText,
  AlertCircle,
  PlusCircle,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  X,
  FileCheck2,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOVERNMENT_SCHEMES, SCHEME_UPDATES } from '../data/mockData';
import { GovernmentScheme, SchemeApplication, ApplicationStatus } from '../types';
import { AnimatedCounter } from '../components/common/AnimatedCounter';

const STATUS_PIPELINE: { status: ApplicationStatus; color: string; label: string }[] = [
  { status: 'Interested', color: 'bg-slate-500/20 text-ivory-300 border-slate-500/40', label: '1. Interested' },
  { status: 'Eligibility Verification', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40', label: '2. Eligibility Check' },
  { status: 'Documents Pending', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40', label: '3. Docs Pending' },
  { status: 'Ready to Apply', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40', label: '4. Ready' },
  { status: 'Applied', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40', label: '5. Applied' },
  { status: 'Under Review', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40', label: '6. Under Review' },
  { status: 'Approved', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', label: '7. Approved' },
  { status: 'Benefit Received', color: 'bg-lime-accent/25 text-lime-glow border-lime-accent/50', label: '8. Benefit Credited' },
];

export const SchemesPage: React.FC = () => {
  const {
    savedSchemeIds,
    toggleSaveScheme,
    applications,
    addApplication,
    updateApplicationStatus,
    readUpdateIds,
    markUpdateRead,
    language,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedSchemeForModal, setSelectedSchemeForModal] = useState<GovernmentScheme | null>(null);
  const [showApplyModal, setShowApplyModal] = useState<GovernmentScheme | null>(null);
  const [activeTab, setActiveTab] = useState<'directory' | 'tracker' | 'updates'>('directory');

  // New Application Form State
  const [appNumber, setAppNumber] = useState('');
  const [appNotes, setAppNotes] = useState('');
  const [appInitialStatus, setAppInitialStatus] = useState<ApplicationStatus>('Interested');

  // Filter schemes
  const categories = ['All', 'Financial', 'Insurance', 'Irrigation', 'Equipment', 'Soil & Inputs', 'Millets', 'Infrastructure'];
  const levels = ['All', 'Central', 'Karnataka State'];

  const filteredSchemes = GOVERNMENT_SCHEMES.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || scheme.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Calculate analytics
  const totalSaved = savedSchemeIds.length;
  const inProgressApps = applications.filter(
    (a) => a.status !== 'Approved' && a.status !== 'Benefit Received' && a.status !== 'Rejected'
  ).length;
  const totalBenefitsReceived = applications.reduce((sum, a) => sum + (a.benefitReceivedAmount || 0), 0);

  const handleStartTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showApplyModal) return;

    const newApp: Omit<SchemeApplication, 'id'> = {
      schemeId: showApplyModal.id,
      schemeName: showApplyModal.name,
      category: showApplyModal.category,
      applicationNumber: appNumber.trim() || `KP-${Date.now().toString().slice(-6)}`,
      status: appInitialStatus,
      appliedDate: new Date().toISOString().split('T')[0],
      notes: appNotes.trim() || 'Tracked through KrishiPulse Government Schemes Centre.',
      documentsChecklist: showApplyModal.requiredDocuments.map((doc) => ({
        name: doc,
        submitted: false,
      })),
      timeline: [
        {
          status: appInitialStatus,
          date: new Date().toISOString().split('T')[0],
          note: 'Farmer initiated tracking in KrishiPulse pipeline.',
        },
      ],
    };

    addApplication(newApp);
    setShowApplyModal(null);
    setAppNumber('');
    setAppNotes('');
    setActiveTab('tracker');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl noir-card p-6 sm:p-8 border border-noir-700/80 shadow-noir-elevated">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-amber-solar/20 text-amber-solar border border-amber-solar/40 shadow-glow-amber">
                <Landmark className="w-5 h-5" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-solar">
                National & Karnataka Farmer Welfare
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ivory-100 tracking-tight">
              Government Schemes Centre
            </h1>
            <p className="text-xs sm:text-sm text-ivory-300 mt-1 max-w-2xl leading-relaxed">
              Curated official agricultural subsidies, DBT grants, irrigation aids, and crop insurance schemes with live
              stage-by-stage application tracking.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-noir-850 border border-noir-700 text-left">
              <div className="text-[11px] font-mono text-ivory-400">Directory</div>
              <div className="text-xl font-mono font-black text-lime-glow">
                <AnimatedCounter value={GOVERNMENT_SCHEMES.length} />
              </div>
              <div className="text-[10px] text-ivory-400">Verified Schemes</div>
            </div>

            <div className="p-3 rounded-2xl bg-noir-850 border border-noir-700 text-left">
              <div className="text-[11px] font-mono text-ivory-400">Bookmarked</div>
              <div className="text-xl font-mono font-black text-ivory-100">
                <AnimatedCounter value={totalSaved} />
              </div>
              <div className="text-[10px] text-ivory-400">Saved by Farmer</div>
            </div>

            <div className="p-3 rounded-2xl bg-noir-850 border border-noir-700 text-left">
              <div className="text-[11px] font-mono text-ivory-400">In Pipeline</div>
              <div className="text-xl font-mono font-black text-cyan-ice">
                <AnimatedCounter value={inProgressApps} />
              </div>
              <div className="text-[10px] text-ivory-400">Active Applications</div>
            </div>

            <div className="p-3 rounded-2xl bg-noir-850 border border-noir-700 text-left">
              <div className="text-[11px] font-mono text-ivory-400">Total DBT</div>
              <div className="text-xl font-mono font-black text-lime-accent">
                <AnimatedCounter value={totalBenefitsReceived} prefix="₹" />
              </div>
              <div className="text-[10px] text-ivory-400">Disbursed to Date</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-noir-700 space-x-2">
        <button
          onClick={() => setActiveTab('directory')}
          className={`pb-3 px-4 text-xs sm:text-sm font-semibold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'directory'
              ? 'border-lime-accent text-lime-glow font-bold'
              : 'border-transparent text-ivory-400 hover:text-ivory-200'
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>Scheme Directory ({filteredSchemes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('tracker')}
          className={`pb-3 px-4 text-xs sm:text-sm font-semibold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'tracker'
              ? 'border-lime-accent text-lime-glow font-bold'
              : 'border-transparent text-ivory-400 hover:text-ivory-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Application Tracker ({applications.length})</span>
          {inProgressApps > 0 && (
            <span className="w-2 h-2 rounded-full bg-cyan-ice animate-pulse" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('updates')}
          className={`pb-3 px-4 text-xs sm:text-sm font-semibold transition border-b-2 flex items-center gap-2 ${
            activeTab === 'updates'
              ? 'border-lime-accent text-lime-glow font-bold'
              : 'border-transparent text-ivory-400 hover:text-ivory-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Verified Updates & Feeds</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-solar/20 text-amber-solar">
            {SCHEME_UPDATES.length}
          </span>
        </button>
      </div>

      {/* TAB 1: SCHEME DIRECTORY */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-ivory-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search schemes by name, keyword (e.g. Drip, PM-KISAN, Millets, Soil)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-noir-850 border border-noir-700 text-ivory-100 placeholder-ivory-400 text-xs focus:outline-none focus:border-lime-accent/60 transition shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory-400 hover:text-ivory-100"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono transition whitespace-nowrap ${
                    selectedLevel === lvl
                      ? 'bg-lime-accent/20 border border-lime-accent/50 text-lime-glow font-bold'
                      : 'bg-noir-850 border border-noir-700 text-ivory-300 hover:bg-noir-800'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Category Chips Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition whitespace-nowrap flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? 'bg-noir-750 text-lime-glow border border-lime-accent/40 shadow-glow-lime'
                    : 'bg-noir-850/80 text-ivory-300 border border-noir-700 hover:bg-noir-800'
                }`}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Scheme Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSchemes.map((scheme) => {
              const isSaved = savedSchemeIds.includes(scheme.id);
              const isApplied = applications.some((a) => a.schemeId === scheme.id);

              return (
                <div
                  key={scheme.id}
                  className="rounded-3xl noir-card p-5 border border-noir-700/80 hover:border-lime-accent/40 transition-all flex flex-col justify-between group shadow-noir-card hover:-translate-y-1"
                >
                  <div>
                    {/* Header Tags */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-lime-accent/15 text-lime-glow border border-lime-accent/30">
                          {scheme.code}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-noir-800 text-ivory-400 border border-noir-700">
                          {scheme.level}
                        </span>
                      </div>

                      <button
                        onClick={() => toggleSaveScheme(scheme.id)}
                        className={`p-1.5 rounded-lg border transition ${
                          isSaved
                            ? 'bg-amber-solar/20 border-amber-solar/40 text-amber-solar'
                            : 'bg-noir-800 border-noir-700 text-ivory-400 hover:text-ivory-100'
                        }`}
                        title={isSaved ? 'Remove bookmark' : 'Bookmark this scheme'}
                      >
                        {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Scheme Title */}
                    <h3 className="text-base font-bold text-ivory-100 group-hover:text-lime-glow transition line-clamp-1">
                      {language === 'kn' && scheme.nameKannada ? scheme.nameKannada : language === 'hi' && scheme.nameHindi ? scheme.nameHindi : scheme.name}
                    </h3>
                    <p className="text-[11px] text-ivory-400 font-mono mt-0.5 mb-3">{scheme.targetAudience}</p>

                    {/* Financial Benefit Callout */}
                    <div className="p-3 rounded-2xl bg-noir-850/90 border border-noir-700/80 text-xs mb-3">
                      <div className="text-[10px] uppercase font-mono tracking-wider text-lime-accent font-bold mb-0.5">
                        Financial Subsidy / Benefit
                      </div>
                      <p className="text-ivory-100 font-semibold line-clamp-2 leading-relaxed">
                        {scheme.financialBenefit}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-ivory-300 line-clamp-2 leading-relaxed mb-4">
                      {scheme.description}
                    </p>
                  </div>

                  {/* Actions & Footer */}
                  <div className="pt-3 border-t border-noir-700/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedSchemeForModal(scheme)}
                      className="text-xs text-ivory-300 hover:text-lime-accent font-medium flex items-center gap-1 transition"
                    >
                      <span>Full Criteria</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setShowApplyModal(scheme)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                        isApplied
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
                          : 'bg-lime-accent/15 text-lime-glow border border-lime-accent/30 hover:bg-lime-accent/25 hover:shadow-glow-lime'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>In Pipeline</span>
                        </>
                      ) : (
                        <>
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>Track Application</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: APPLICATION TRACKER PIPELINE */}
      {activeTab === 'tracker' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-noir-850 border border-noir-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-lime-accent" />
              <span className="text-ivory-200">
                Self-reported farmer tracker for official central & state portal submissions.
              </span>
            </div>
            <button
              onClick={() => setActiveTab('directory')}
              className="text-lime-accent hover:underline font-mono text-[11px]"
            >
              + Add another scheme to pipeline
            </button>
          </div>

          {applications.length === 0 ? (
            <div className="text-center py-16 noir-card rounded-3xl border border-noir-700 p-8">
              <Landmark className="w-12 h-12 text-noir-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-ivory-100">No Applications In Tracker</h3>
              <p className="text-xs text-ivory-400 mt-1 max-w-sm mx-auto">
                Explore the scheme directory and click "Track Application" to monitor documentation, submissions, and DBT disbursements.
              </p>
              <button
                onClick={() => setActiveTab('directory')}
                className="mt-4 px-4 py-2 rounded-xl bg-lime-accent/20 text-lime-glow border border-lime-accent/40 text-xs font-mono font-bold"
              >
                Browse Government Schemes
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="rounded-3xl noir-card p-5 sm:p-6 border border-noir-700/80 shadow-noir-card space-y-4"
                >
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-noir-700">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-noir-800 text-ivory-300 border border-noir-700">
                          {app.category}
                        </span>
                        <span className="text-xs font-mono text-lime-accent font-bold">
                          App #: {app.applicationNumber}
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-ivory-100 mt-1">{app.schemeName}</h3>
                    </div>

                    {/* Status Pill & Selector */}
                    <div className="flex items-center gap-2">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          updateApplicationStatus(app.id, e.target.value as ApplicationStatus, 'Farmer manually progressed pipeline stage.')
                        }
                        className="px-3 py-1.5 rounded-xl bg-noir-800 border border-noir-700 text-xs font-mono font-bold text-ivory-100 focus:outline-none focus:border-lime-accent/50 cursor-pointer"
                      >
                        {STATUS_PIPELINE.map((st) => (
                          <option key={st.status} value={st.status}>
                            {st.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Horizontal Stage Progress Stepper */}
                  <div className="overflow-x-auto pb-2 scrollbar-none">
                    <div className="flex items-center min-w-[620px] gap-1">
                      {STATUS_PIPELINE.map((stage, idx) => {
                        const currentStageIdx = STATUS_PIPELINE.findIndex((s) => s.status === app.status);
                        const isPastOrCurrent = idx <= currentStageIdx;
                        const isCurrent = idx === currentStageIdx;

                        return (
                          <div key={stage.status} className="flex-1 flex flex-col items-center">
                            <div
                              className={`w-full h-1.5 rounded-full mb-1.5 transition ${
                                isCurrent
                                  ? 'bg-lime-accent shadow-glow-lime'
                                  : isPastOrCurrent
                                  ? 'bg-emerald-500'
                                  : 'bg-noir-800'
                              }`}
                            />
                            <span
                              className={`text-[9px] font-mono text-center whitespace-nowrap ${
                                isCurrent
                                  ? 'text-lime-glow font-bold'
                                  : isPastOrCurrent
                                  ? 'text-ivory-300'
                                  : 'text-ivory-500'
                              }`}
                            >
                              {stage.status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                    {/* Documents checklist */}
                    <div className="p-3.5 rounded-2xl bg-noir-850 border border-noir-700 space-y-2">
                      <div className="text-[11px] font-mono text-ivory-400 font-bold uppercase tracking-wider flex items-center justify-between">
                        <span>Required Documents Checklist</span>
                        <FileCheck2 className="w-3.5 h-3.5 text-lime-accent" />
                      </div>
                      <div className="space-y-1.5">
                        {app.documentsChecklist?.map((doc, dIdx) => (
                          <div key={dIdx} className="flex items-center justify-between text-xs text-ivory-200">
                            <span>{doc.name}</span>
                            <span className="text-[10px] font-mono text-lime-accent font-bold">
                              {doc.submitted ? '✓ Ready' : 'Pending'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline Log */}
                    <div className="p-3.5 rounded-2xl bg-noir-850 border border-noir-700 space-y-2">
                      <div className="text-[11px] font-mono text-ivory-400 font-bold uppercase tracking-wider flex items-center justify-between">
                        <span>Status Timeline</span>
                        <Calendar className="w-3.5 h-3.5 text-amber-solar" />
                      </div>
                      <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                        {app.timeline?.map((entry, tIdx) => (
                          <div key={tIdx} className="text-xs text-ivory-300 flex items-start gap-2">
                            <span className="font-mono text-[10px] text-ivory-400">{entry.date}:</span>
                            <span className="text-ivory-200 font-semibold">[{entry.status}]</span>
                            <span className="text-ivory-400 text-[11px] truncate">{entry.note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Notes & Benefit Display */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs pt-2 text-ivory-300">
                    <p className="italic text-ivory-400">"{app.notes}"</p>
                    {app.benefitReceivedAmount ? (
                      <div className="font-mono text-lime-glow font-bold">
                        Disbursed: ₹{app.benefitReceivedAmount.toLocaleString('en-IN')}
                      </div>
                    ) : (
                      <div className="font-mono text-ivory-400 text-[11px]">
                        Target Disbursement: {app.estimatedDisbursementDate || 'Pending review'}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: VERIFIED SCHEME UPDATES FEED */}
      {activeTab === 'updates' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-noir-850 border border-noir-700 text-xs text-ivory-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-lime-accent" />
            <span>
              Official gazette releases, DBT disbursement notices, and deadline extensions vetted from central and state portals.
            </span>
          </div>

          <div className="space-y-3">
            {SCHEME_UPDATES.map((update) => {
              const isRead = readUpdateIds.includes(update.id);

              return (
                <div
                  key={update.id}
                  onClick={() => markUpdateRead(update.id)}
                  className={`p-5 rounded-3xl border transition shadow-noir-card cursor-pointer ${
                    isRead
                      ? 'bg-noir-900/60 border-noir-700/70 text-ivory-400'
                      : 'bg-noir-850 border-noir-700 text-ivory-200 hover:border-lime-accent/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-lime-accent/15 text-lime-glow border border-lime-accent/30">
                        {update.schemeCode}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-solar">
                        [{update.updateType}]
                      </span>
                      {!isRead && (
                        <span className="w-2 h-2 rounded-full bg-lime-accent animate-ping" />
                      )}
                    </div>
                    <div className="text-[11px] font-mono text-ivory-400">
                      Verified: {update.verifiedTimestamp}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-ivory-100 mb-1">{update.title}</h3>
                  <p className="text-xs text-ivory-300 leading-relaxed mb-3">{update.summary}</p>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-noir-700/80">
                    <span className="text-[11px] font-mono text-ivory-400">Published: {update.publishedDate}</span>
                    <a
                      href={update.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-lime-accent hover:underline flex items-center gap-1 font-mono text-[11px]"
                    >
                      <span>Official Source Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL: SCHEME FULL DETAILS */}
      {selectedSchemeForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-noir-900 border border-noir-700 rounded-3xl p-6 sm:p-8 shadow-noir-elevated max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setSelectedSchemeForModal(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg bg-noir-800 text-ivory-400 hover:text-ivory-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-lime-accent/15 text-lime-glow">
                  {selectedSchemeForModal.code}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-noir-800 text-ivory-400 border border-noir-700">
                  {selectedSchemeForModal.level}
                </span>
              </div>
              <h2 className="text-xl font-bold text-ivory-100">{selectedSchemeForModal.name}</h2>
              {selectedSchemeForModal.nameKannada && (
                <div className="text-xs text-lime-accent font-medium mt-0.5">
                  {selectedSchemeForModal.nameKannada}
                </div>
              )}
            </div>

            {/* Financial Benefit */}
            <div className="p-4 rounded-2xl bg-noir-850 border border-noir-700">
              <span className="text-[10px] font-mono font-bold text-lime-accent uppercase tracking-wider">
                Direct Benefit / Financial Subsidy
              </span>
              <p className="text-sm font-semibold text-ivory-100 mt-1">{selectedSchemeForModal.financialBenefit}</p>
            </div>

            {/* Eligibility Criteria */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ivory-400">
                Eligibility Criteria
              </h4>
              <ul className="space-y-1.5 text-xs text-ivory-300">
                {selectedSchemeForModal.eligibilityCriteria.map((crit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-lime-accent font-bold mt-0.5">•</span>
                    <span>{crit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Documents */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ivory-400">
                Mandatory Documentation
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedSchemeForModal.requiredDocuments.map((doc, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-noir-850 border border-noir-700 flex items-center gap-2 text-ivory-200">
                    <FileText className="w-3.5 h-3.5 text-amber-solar" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Process */}
            <div className="space-y-1.5 text-xs">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ivory-400">
                Application Workflow
              </h4>
              <p className="text-ivory-300 leading-relaxed">{selectedSchemeForModal.applicationProcess}</p>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-noir-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href={selectedSchemeForModal.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-noir-800 hover:bg-noir-750 text-ivory-200 border border-noir-700 text-xs font-mono flex items-center justify-center gap-1.5"
              >
                <span>Open Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => {
                  const scheme = selectedSchemeForModal;
                  setSelectedSchemeForModal(null);
                  setShowApplyModal(scheme);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-lime-accent text-noir-950 font-bold text-xs font-mono flex items-center justify-center gap-2 hover:bg-lime-glow transition shadow-glow-lime"
              >
                <PlusCircle className="w-4 h-4 text-noir-950" />
                <span>Add to My Application Tracker</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD APPLICATION TO TRACKER */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-950/80 backdrop-blur-md animate-in fade-in">
          <form
            onSubmit={handleStartTracking}
            className="relative w-full max-w-lg bg-noir-900 border border-noir-700 rounded-3xl p-6 sm:p-8 shadow-noir-elevated space-y-5"
          >
            <button
              type="button"
              onClick={() => setShowApplyModal(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg bg-noir-800 text-ivory-400 hover:text-ivory-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-mono text-lime-accent font-bold uppercase tracking-wider">
                Track Application
              </span>
              <h2 className="text-lg font-bold text-ivory-100 mt-0.5">{showApplyModal.name}</h2>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-ivory-400 font-mono mb-1">
                  Application / Acknowledgement Reference # (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. KA-MDY-2026-90412 or Grama One Token"
                  value={appNumber}
                  onChange={(e) => setAppNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 text-xs focus:outline-none focus:border-lime-accent/50"
                />
              </div>

              <div>
                <label className="block text-ivory-400 font-mono mb-1">Current Pipeline Stage</label>
                <select
                  value={appInitialStatus}
                  onChange={(e) => setAppInitialStatus(e.target.value as ApplicationStatus)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 text-xs focus:outline-none focus:border-lime-accent/50"
                >
                  {STATUS_PIPELINE.map((st) => (
                    <option key={st.status} value={st.status}>
                      {st.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-ivory-400 font-mono mb-1">Farmer Notes / Grama One Center</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Applied via Maddur RSK centre. ADH inspection pending for soil test report."
                  value={appNotes}
                  onChange={(e) => setAppNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-noir-850 border border-noir-700 text-ivory-100 text-xs focus:outline-none focus:border-lime-accent/50"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-noir-700 flex justify-end gap-2 text-xs font-mono">
              <button
                type="button"
                onClick={() => setShowApplyModal(null)}
                className="px-4 py-2 rounded-xl bg-noir-800 text-ivory-300 hover:bg-noir-750"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-lime-accent text-noir-950 font-bold hover:bg-lime-glow transition shadow-glow-lime"
              >
                Start Tracking
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
