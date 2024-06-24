// tailwind.config.js
module.exports = {
    mode: "jit",
    purge: [
      "./components/**/*.{vue,js}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {},
      colors: {
        text: "#000",
        white: "#fff",
        background: "#ccc",
        primary: "#f00",
        secondary: "#00f",
      }
    },

    variants: {
      extend: {},
    },
    plugins: [],
  };