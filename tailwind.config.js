/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,css}",  // Inclut les fichiers .html et .js dans le dossier src
  ],
  theme: {
    extend: {
      animation: {
        ondes: 'onde 15s infinite',
      },
      keyframes: {
        onde: {
          '0%' : { transform: 'scale(1)'},
          '50%' : { transform: 'scale(0.9)'},
          '100%' : { transform: 'scale(1)'},
        },
      },
      spacing: {
        '128':'32rem',
      },
      fontFamily: {
        amarante: ['"Amarante"', 'serif'],
        chonburi: ['"Chonburi"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
      }
    },
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

