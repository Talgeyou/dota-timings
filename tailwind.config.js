const { nextui } = require('@nextui-org/theme');

module.exports = {
  content: [
    './src/renderer/**/*.{js,jsx,ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {},
  variants: {},
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: 'transparent',
          },
        },
        dark: {
          colors: {
            background: 'transparent',
          },
        },
      },
    }),
  ],
};
