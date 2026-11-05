import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ScanLine, Droplets, BotMessageSquare, Landmark } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const items = [
    { to: '/dashboard', label: 'Command', icon: LayoutDashboard },
    { to: '/assistant', label: 'Pulse AI', icon: BotMessageSquare },
    { to: '/cropvision', label: 'Vision', icon: ScanLine },
    { to: '/pulsewater', label: 'Water', icon: Droplets },
    { to: '/schemes', label: 'Schemes', icon: Landmark },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-noir-900/95 backdrop-blur-xl border-t border-noir-700/80 px-2 py-1.5 shadow-noir-card">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 rounded-xl text-[10px] font-mono transition ${
                  isActive
                    ? 'text-lime-accent font-bold'
                    : 'text-ivory-400 hover:text-ivory-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1 rounded-lg mb-0.5 transition ${
                      isActive ? 'bg-lime-accent/15 text-lime-glow shadow-glow-lime' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4" />
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
