/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        noir: {
          950: '#030705', // deepest void
          900: '#07100b', // midnight monsoon forest
          850: '#0b1611', // charcoal backdrop
          800: '#10211a', // card deep surface
          750: '#162b22', // elevated card
          700: '#1d372c', // card border / hover
          600: '#2b4f40',
          500: '#3c6e5a',
        },
        lime: {
          accent: '#a3e635', // electric lime
          glow: '#bef264',
          dim: '#4d7c0f',
        },
        emerald: {
          neon: '#10b981',
          bright: '#34d399',
          dark: '#064e3b',
          glow: 'rgba(16, 185, 129, 0.4)',
        },
        cyan: {
          moisture: '#06b6d4',
          ice: '#22d3ee',
          deep: '#0e7490',
        },
        amber: {
          solar: '#f59e0b',
          harvest: '#d97706',
        },
        ivory: {
          100: '#fdfbf7', // warm crisp ivory
          200: '#f4efe4', // primary text
          300: '#ded5c3', // secondary text
          400: '#9d9482', // muted labels
          500: '#675f50', // dark subtitles
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'noir-card': '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        'noir-elevated': '0 16px 48px -8px rgba(0, 0, 0, 0.7), inset 0 1px 0 0 rgba(163, 230, 53, 0.1)',
        'glow-lime': '0 0 30px -5px rgba(163, 230, 53, 0.35)',
        'glow-emerald': '0 0 35px -5px rgba(16, 185, 129, 0.4)',
        'glow-cyan': '0 0 30px -5px rgba(6, 182, 212, 0.35)',
        'glow-amber': '0 0 30px -5px rgba(245, 158, 11, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'float-reverse': 'float-reverse 8s ease-in-out infinite',
        'scan-line': 'scanLine 3s ease-in-out infinite',
        'rain-fall': 'rainFall 1.2s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(0%)', opacity: '0.2' },
          '50%': { transform: 'translateY(100%)', opacity: '0.8' },
          '100%': { transform: 'translateY(0%)', opacity: '0.2' },
        },
        rainFall: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '50%': { opacity: '0.6' },
          '100%': { transform: 'translateY(100px)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}