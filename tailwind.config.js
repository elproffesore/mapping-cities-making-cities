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
        background: "#EBE7DE",
        primary: "#BEB6F2",
        secondary: "#E25029",
        vprimary: "#2F8D59",
        vsecondary: "#242021",
      }
    },

    variants: {
      extend: {},
    },
    plugins: [],
  };