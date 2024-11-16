/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
        '21/9': '21 / 9',
      },
      spacing: {
        '3px': '3px',
      },
    },
  },
  plugins: [],
}
