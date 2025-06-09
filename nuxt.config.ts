export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@unocss/nuxt",
    "nuxt-quasar-ui",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@hypernym/nuxt-anime",
    "@vueuse/motion/nuxt",
    "@nuxt/image",
  ],
  css: [
    "quasar/dist/quasar.prod.css",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["quasar"],
  },
});
