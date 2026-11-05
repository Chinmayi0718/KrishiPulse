import React from 'react';

export const MonsoonNoirAtmosphere: React.FC<{
  showGrid?: boolean;
  showContours?: boolean;
  intensity?: 'subtle' | 'medium' | 'high';
}> = ({ showGrid = true, showContours = true, intensity = 'medium' }) => {
  const opacityVal = intensity === 'subtle' ? 0.4 : intensity === 'high' ? 0.9 : 0.65;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
      style={{ opacity: opacityVal }}
      aria-hidden="true"
    >
      {/* Ambient Radial Fog Lights */}
      <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[140px]" />
      <div className="absolute top-1/3 -right-20 w-[550px] h-[550px] rounded-full bg-lime-accent/8 blur-[160px]" />
      <div className="absolute -bottom-20 left-1/3 w-[700px] h-[500px] rounded-full bg-cyan-moisture/8 blur-[180px]" />

      {/* Topographic Contours SVG */}
      {showContours && (
        <svg
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <path
            d="M-100 200 C 300 120, 600 320, 1100 180 C 1300 120, 1500 260, 1600 220"
            fill="none"
            stroke="#a3e635"
            strokeWidth="0.8"
            strokeDasharray="4 8"
          />
          <path
            d="M-100 340 C 320 240, 700 480, 1200 310 C 1400 250, 1550 360, 1600 320"
            fill="none"
            stroke="#10b981"
            strokeWidth="0.75"
          />
          <path
            d="M-100 480 C 250 380, 550 590, 1050 440 C 1350 340, 1500 500, 1600 460"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="0.6"
            strokeDasharray="6 12"
          />
          <path
            d="M-100 640 C 400 520, 800 720, 1250 580 C 1450 530, 1550 630, 1600 600"
            fill="none"
            stroke="#10b981"
            strokeWidth="0.8"
          />
          <path
            d="M-100 780 C 300 690, 650 880, 1150 720 C 1380 660, 1520 800, 1600 760"
            fill="none"
            stroke="#a3e635"
            strokeWidth="0.5"
            strokeDasharray="3 6"
          />
        </svg>
      )}

      {/* Subtle Coordinate Crosshair Grid */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #a3e635 1px, transparent 1px), linear-gradient(to bottom, #a3e635 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      )}

      {/* Atmospheric Monsoon Rain Streaks (Soft particles) */}
      <div className="absolute top-10 left-[15%] w-[1px] h-14 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-rain-fall" style={{ animationDelay: '0.2s', animationDuration: '2.5s' }} />
      <div className="absolute top-24 left-[35%] w-[1px] h-20 bg-gradient-to-b from-transparent via-lime-accent/30 to-transparent animate-rain-fall" style={{ animationDelay: '1.1s', animationDuration: '3.2s' }} />
      <div className="absolute top-16 left-[65%] w-[1px] h-16 bg-gradient-to-b from-transparent via-emerald-400/35 to-transparent animate-rain-fall" style={{ animationDelay: '0.7s', animationDuration: '2.8s' }} />
      <div className="absolute top-32 left-[82%] w-[1px] h-12 bg-gradient-to-b from-transparent via-cyan-300/30 to-transparent animate-rain-fall" style={{ animationDelay: '1.9s', animationDuration: '3.5s' }} />
    </div>
  );
};
