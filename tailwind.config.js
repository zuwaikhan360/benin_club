/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#FBFBFB',
      black: '#131112',
      red: '#D8261E',
      gray: '#979798',
      grey: '#F5F5F5',
      pink: '#F5B5A5',
      green: '#5fdba7 ',
      yellow: '#f7cb73',
    },
    extend: {
      backgroundImage: {
        footer: "url('/images/image3.jpg')",
      },
    },
  },
  plugins: [],
};
