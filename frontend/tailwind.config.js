/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      colors: {
        saffron: {
          DEFAULT: '#FF6B00',
          50: '#fff0e5',
          100: '#ffdbb8',
          500: '#FF6B00',
          600: '#e65c00',
        },
        maroon: {
          DEFAULT: '#4A0E1F',
          400: '#68152B',
          500: '#4A0E1F',
          600: '#3B0918',
        },
        gold: {
          DEFAULT: '#FFD166',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
