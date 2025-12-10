/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#1f2024',
        card: '#ffffff',
        primary: '#7e6fe5',
        primaryAccent: '#9a81ff',
        textMain: '#2c2d31',
      },
    },
  },
  plugins: [],
}
