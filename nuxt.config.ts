// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          api: "modern",
        },
      },
    },
  },

  modules: ["@nuxt/fonts", "@vueuse/nuxt", "nuxt-bezier", "@nuxt/image"],
  css: ["@/assets/css/font.css"],
});
