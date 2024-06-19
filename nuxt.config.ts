// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // runtime config with env variables and exposed via useRuntimeConfig()
  runtimeConfig:{},
  modules: [
    "@nuxtjs/tailwindcss"
  ],
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  css: ["~/assets/css/tailwind.css"]
})