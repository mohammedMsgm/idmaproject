/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eefaff',
          100: '#dcf3ff',
          200: '#b9e9ff',
          300: '#7ddaff',
          400: '#38c4ff',
          500: '#0ca7f1',
          600: '#0087cf',
          700: '#006ca7',
          800: '#005d8a',
          900: '#064f72',
          950: '#04304a',
        },
        secondary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        accent: {
          50: '#fff8ed',
          100: '#ffeed3',
          200: '#ffd9a5',
          300: '#ffbf6d',
          400: '#ff9a36',
          500: '#ff7a11',
          600: '#ff5a00',
          700: '#cc4102',
          800: '#a1340b',
          900: '#822e0c',
          950: '#461403',
        },
      },
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [],
};