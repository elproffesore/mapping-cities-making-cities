// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // runtime config with env variables and exposed via useRuntimeConfig()
  runtimeConfig:{
  },
  app: {
    baseURL: process.env.NODE_ENV == 'development' ?'/':'/mapping-cities-making-cities-final-project/',
  },
  modules: [
    "@nuxtjs/tailwindcss"
  ],
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  css: ["~/assets/css/tailwind.css"],
})