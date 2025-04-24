// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL
    }
  },
  modules: [
    '@pinia/nuxt'
  ],
  plugins: [
    '~/plugins/axios.ts',
    '~/plugins/auth.ts',
    '~/plugins/preferences.ts',
    '~/plugins/motion.ts'
  ],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  experimental: {
    renderJsonPayloads: false
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
