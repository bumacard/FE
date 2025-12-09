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
      boxShadow: {
        card: '0 16px 40px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
