import React from 'react';
import { Sprout, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-800 flex items-center justify-center text-white">
            <Sprout className="w-3.5 h-3.5 text-emerald-300" />
          </div>
          <span className="font-bold text-slate-800">KrishiPulse 🌱</span>
          <span className="text-slate-300">|</span>
          <span>Empowering Every Farmer with Intelligent Agriculture</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <Link to="/dashboard" className="hover:text-emerald-700 transition">Dashboard</Link>
          <Link to="/cropvision" className="hover:text-emerald-700 transition">CropVision AI</Link>
          <Link to="/pulsewater" className="hover:text-emerald-700 transition">PulseWater</Link>
          <Link to="/assistant" className="hover:text-emerald-700 transition">AI Assistant</Link>
          <Link to="/weather" className="hover:text-emerald-700 transition">Weather</Link>
          <Link to="/crops" className="hover:text-emerald-700 transition">My Crops</Link>
          <Link to="/profile" className="hover:text-emerald-700 transition">Profile</Link>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          <span>for Indian Farmers • Mandya Demo Edition</span>
        </div>
      </div>
    </footer>
  );
};
