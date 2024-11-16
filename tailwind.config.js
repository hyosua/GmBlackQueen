/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,css}",  // Inclut les fichiers .html et .js dans le dossier src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-transparent',
    'opacity-25',
    'bg-white',
    'shadow-lg',
    'text-red-950',
    'bg-white/20',
    'bg-red-400',
    'text-zinc-950',
    'text-white'
  ],
}

