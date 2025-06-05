export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@unocss/nuxt",
    "nuxt-quasar-ui",
    "@pinia/nuxt",
    "@vueuse/motion/nuxt",
  ],
  css: [
    "quasar/dist/quasar.prod.css",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["quasar"],
  },

  runtimeConfig: {
    public: {
      motion: {
        directives: {
          "pop-bottom": {
            initial: {
              scale: 0,
              opacity: 0,
              y: 100,
            },
            visible: {
              scale: 1,
              opacity: 1,
              y: 0,
            },
          },
        },
      },
    },
  },
});
