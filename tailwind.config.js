// tailwind.config.js
module.exports = {
    purge: [
      "./src/style.css",
      "./src/**/*.{vue,js}",
      "./index.html"
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {},
      colors: {
        text: "#000",
        white: "#fff",
        background: "#f5f5f5",
        primary: "#f15060",
        secondary: "#BEB6F2",

      },
      fontSize:{
        'xs': '.75rem',
        'sm': '.875rem ',
        'tiny': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
        '8xl': '6rem',
        '8xl': '6rem',
        'number': '20rem',
      }
    },

    variants: {
      extend: {},
    },
    plugins: [],
  };