import React from 'react';

export const FarmSceneBackground: React.FC<{ className?: string; opacity?: number }> = ({
  className = '',
  opacity = 0.9,
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      style={{ opacity }}
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B2A1E" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#144A34" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1C5E43" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="sunGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="hillBack" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1A5339" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0D3524" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="hillMid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#226E4B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#10422D" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="hillFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2E8B57" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#134731" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="fieldRows" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Golden Sun & Radiant Corona */}
        <circle cx="1150" cy="140" r="130" fill="url(#sunGlow)" />
        <circle cx="1150" cy="140" r="50" fill="#FBBF24" opacity="0.8" />
        <circle cx="1150" cy="140" r="65" stroke="#FDE68A" strokeWidth="2" strokeDasharray="6 8" opacity="0.6" />

        {/* Distant Rolling Hills / Terraces */}
        <path
          d="M0 260 C 320 210, 560 300, 920 230 C 1180 180, 1340 240, 1440 220 L 1440 600 L 0 600 Z"
          fill="url(#hillBack)"
        />

        {/* Windmill Silhouette */}
        <g transform="translate(1020, 140) scale(0.65)" opacity="0.5">
          <line x1="40" y1="120" x2="40" y2="40" stroke="#E2E8F0" strokeWidth="3" />
          <circle cx="40" cy="40" r="4" fill="#E2E8F0" />
          <line x1="40" y1="40" x2="10" y2="20" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="40" y1="40" x2="70" y2="20" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="40" y1="40" x2="40" y2="75" stroke="#CBD5E1" strokeWidth="2" />
        </g>

        {/* Mid-Ground Contour & Paddy Bunds */}
        <path
          d="M0 340 C 260 300, 480 380, 840 310 C 1100 260, 1320 340, 1440 300 L 1440 600 L 0 600 Z"
          fill="url(#hillMid)"
        />

        {/* Foreground Crop Ridges & Furrows */}
        <path
          d="M0 430 C 340 380, 680 470, 1040 400 C 1260 360, 1380 410, 1440 390 L 1440 600 L 0 600 Z"
          fill="url(#hillFront)"
        />

        {/* Stylized Furrow Lines (Crop planting rows) */}
        <path d="M120 460 Q 400 420 700 450 T 1300 420" stroke="url(#fieldRows)" strokeWidth="3" strokeDasharray="12 10" />
        <path d="M80 500 Q 420 450 780 490 T 1400 460" stroke="url(#fieldRows)" strokeWidth="3.5" strokeDasharray="14 12" />
        <path d="M40 545 Q 460 490 860 535 T 1440 505" stroke="url(#fieldRows)" strokeWidth="4" strokeDasharray="16 14" />
      </svg>
    </div>
  );
};
