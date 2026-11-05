import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ScanLine, Droplets, BotMessageSquare, Sprout } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const items = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/cropvision', label: 'CropVision', icon: ScanLine },
    { to: '/pulsewater', label: 'Water', icon: Droplets },
    { to: '/assistant', label: 'Assistant', icon: BotMessageSquare },
    { to: '/crops', label: 'My Crops', icon: Sprout },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 px-2 py-1.5 shadow-lg">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 rounded-lg text-[10px] font-semibold transition ${
                  isActive
                    ? 'text-emerald-800'
                    : 'text-slate-500 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1 rounded-lg mb-0.5 ${
                      isActive ? 'bg-emerald-100 text-emerald-800' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
