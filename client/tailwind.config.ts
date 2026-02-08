/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        border: 'var(--border)',
        gold: {
          DEFAULT: '#C49B4B',
          light: '#D4AF5A',
          lighter: '#F0D48A',
          dark: '#A07B30',
          50: 'rgba(196, 155, 75, 0.05)',
          100: 'rgba(196, 155, 75, 0.1)',
          200: 'rgba(196, 155, 75, 0.2)',
          300: 'rgba(196, 155, 75, 0.3)',
        },
        dark: {
          DEFAULT: '#09090B',
          50: '#18181B',
          100: '#111113',
          200: '#0E0E10',
          300: '#0A0A0C',
        },
      },
    },
  },
};
