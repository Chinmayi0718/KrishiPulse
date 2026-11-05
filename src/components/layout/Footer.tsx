import React from 'react';
import { Sprout, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-noir-900/90 border-t border-noir-700/80 mt-auto py-8 px-4 sm:px-6 lg:px-8 text-xs text-ivory-400 z-10 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-lime-accent to-emerald-neon flex items-center justify-center text-noir-950 font-black shadow-glow-lime">
            <Sprout className="w-3.5 h-3.5 text-noir-950" />
          </div>
          <span className="font-bold text-ivory-100">KrishiPulse</span>
          <span className="text-noir-600">•</span>
          <span className="text-ivory-300 font-mono text-[11px]">Every farming decision, in one place.</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
          <Link to="/dashboard" className="text-ivory-300 hover:text-lime-accent transition">Command</Link>
          <Link to="/assistant" className="text-ivory-300 hover:text-lime-accent transition">Pulse AI</Link>
          <Link to="/cropvision" className="text-ivory-300 hover:text-lime-accent transition">PulseVision</Link>
          <Link to="/pulsewater" className="text-ivory-300 hover:text-lime-accent transition">PulseWater</Link>
          <Link to="/schemes" className="text-ivory-300 hover:text-lime-accent transition">Schemes Centre</Link>
          <Link to="/mandi" className="text-ivory-300 hover:text-lime-accent transition">Mandi APMC</Link>
          <Link to="/weather" className="text-ivory-300 hover:text-lime-accent transition">Weather</Link>
          <Link to="/crops" className="text-ivory-300 hover:text-lime-accent transition">Crops & Calendar</Link>
          <Link to="/profile" className="text-ivory-300 hover:text-lime-accent transition">Profile</Link>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-ivory-400 font-mono">
          <Sparkles className="w-3 h-3 text-lime-accent" />
          <span>Monsoon Noir • Open-Meteo & Gemini Integrated</span>
        </div>
      </div>
    </footer>
  );
};
