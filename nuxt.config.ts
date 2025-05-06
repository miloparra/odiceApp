import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'logo/iconBlack.png' }
      ]
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/css/app.css", "flag-icons/css/flag-icons.min.css"],
  runtimeConfig: {
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_TO: process.env.SMTP_TO,
  },
  modules: ["@nuxt/fonts"],
  plugins: ['~/plugins/fontawesome.js']
})