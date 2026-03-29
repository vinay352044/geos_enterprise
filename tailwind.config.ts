import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0D1B3E',
          light: '#12235A',
          50: '#E8EDF5',
          100: '#C5D2E8',
          500: '#0D1B3E',
          600: '#0A1530',
          700: '#070F22',
        },
        crimson: {
          DEFAULT: '#8E1B2D',
          dark: '#6B1321',
        },
        amber: {
          DEFAULT: '#F0A500',
          dark: '#C98B00',
        },
        electric: {
          DEFAULT: '#2563EB',
          light: '#3B82F6',
        },
        slate: {
          DEFAULT: '#334155',
          muted: '#64748B',
        },
        accent: {
          DEFAULT: '#1E3A8A',
          light: '#2563EB',
        },
        success: '#166534',
        warning: '#92400E',
        error: '#991B1B',
        'bg-light': '#F5F8FF',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      spacing: {
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '48px',
        '6': '64px',
        '7': '96px',
        '8': '128px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          '2xl': '1400px',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
