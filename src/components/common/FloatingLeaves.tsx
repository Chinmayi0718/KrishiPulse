import React from 'react';

export const FloatingLeaves: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Leaf 1 - top left */}
      <div className="absolute top-12 left-[8%] animate-float-slow opacity-60">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-emerald-500/50">
          <path
            d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Leaf 2 - top right floating gold/amber leaf */}
      <div className="absolute top-24 right-[12%] animate-float-reverse opacity-70">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" className="text-amber-400/60">
          <path
            d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"
            fill="currentColor"
            opacity="0.4"
          />
          <path
            d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Leaf 3 - mid left */}
      <div className="absolute top-[48%] left-[4%] animate-float-reverse opacity-50" style={{ animationDelay: '1.5s' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-lime-500/50">
          <path
            d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Leaf 4 - bottom right */}
      <div className="absolute bottom-16 right-[7%] animate-float-slow opacity-60" style={{ animationDelay: '2.5s' }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-emerald-400/60">
          <path
            d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Glowing atmospheric dust motes */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
    </div>
  );
};
