/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['"Courier Prime"', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        parchment: '#FAF6EE',
        ink: '#1E252B',
      },
      boxShadow: {
        'paper-sm': '1px 2px 0px rgba(30, 37, 43, 0.2)',
        'paper-md': '3px 4px 0px rgba(30, 37, 43, 0.25)',
        'paper-lg': '6px 8px 0px rgba(30, 37, 43, 0.35)',
      }
    },
  },
  plugins: [],
}
