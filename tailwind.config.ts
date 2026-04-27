import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0e17',
        'bg-alt': '#0d1321',
        primary: '#00e5ff',
        secondary: '#ff2d78',
        tertiary: '#b388ff',
        'text-main': '#f0f0f0',
        'text-muted': '#a0aec0',
        success: '#00e676',
        danger: '#ff1744',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
