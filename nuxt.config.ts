// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // runtime config with env variables and exposed via useRuntimeConfig()
  runtimeConfig:{},

  modules: ["@nuxtjs/tailwindcss"],
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  }
})