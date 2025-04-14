/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        grad_start: '#CCB6FF',
        grad_end: '#986BFF',
        button: '#C0B5F8',
        correct: '#1EC751',
        wrong: '#E93030',
        highlight: '#7740F2',
      },
    },
  },
  plugins: [],
};
