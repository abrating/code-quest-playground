/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // "Code Quest" theme — deep slate base, indigo focus, emerald success, amber warning
        surface: {
          950: '#0b0f19',
          900: '#0f172a',
          800: '#161f33',
          700: '#1e293b',
        },
        brand: {
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
        },
        success: {
          400: '#34d399',
          500: '#10b981',
        },
        warn: {
          400: '#fbbf24',
        },
        danger: {
          400: '#f87171',
          500: '#ef4444',
        },
      },
      fontFamily: {
        mono: ['"Fira Code"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(99, 102, 241, 0.35)',
        'glow-success': '0 0 20px rgba(16, 185, 129, 0.35)',
      },
    },
  },
  plugins: [],
};
