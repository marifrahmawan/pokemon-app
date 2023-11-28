/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      screens: {
        '2xl': '1920px',
      },
    },
    extend: {
      backgroundImage: {
        'pokemon-habitat': "url('/src/assets/d9spuwer2c491.webp')",
      },
      colors: {
        'hot-cinnamon': {
          50: '#fdf8ef',
          100: '#fbefd9',
          200: '#f7dbb1',
          300: '#f1c280',
          400: '#eba04c',
          500: '#e68429',
          600: '#d2691e',
          700: '#b3521b',
          800: '#8f421d',
          900: '#73381b',
          950: '#3e1b0c',
        },
        'black-bean': {
          50: '#f0f9f1',
          100: '#daf1db',
          200: '#b7e3bb',
          300: '#87ce92',
          400: '#55b266',
          500: '#339649',
          600: '#237838',
          700: '#1c602e',
          800: '#194c27',
          900: '#153f21',
          950: '#07170c',
        },
      },
    },
  },
  plugins: [],
};
