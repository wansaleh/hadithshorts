/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',

  theme: {
    extend: {
      fontFamily: {
        sans: ['SF Pro Text', 'Inter var', ...defaultTheme.fontFamily.sans],
        head: ['SF Pro Display', 'Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
