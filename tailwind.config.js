/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        grad_start: '#CCB6FF',
        grad_end: '#986BFF',
        light_bg: '#C0B5F8',
        border_light: '#D7D2F2',
        correct: '#1EC751',
        wrong: '#D82B2B',
        highlight: '#7740F2',
      },
    },
  },
  plugins: [],
};
