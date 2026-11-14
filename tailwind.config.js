/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta original do projeto
        brand: {
          DEFAULT: '#d946ef',
          dark: '#a21caf',
        },
        plum: {
          900: '#2D0140',
          800: '#250036',
          700: '#660273',
          600: '#A305A6',
          500: '#6b21a8',
          400: '#7e22ce',
          300: '#7c3aed',
        },
        ink: { DEFAULT: '#1f2937', soft: '#4b5563' },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        stars: "url('/img/fundo_estrelado.jpg')",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
      boxShadow: {
        glow: '0 10px 30px -10px rgba(217, 70, 239, 0.6)',
      },
    },
  },
  plugins: [],
};
