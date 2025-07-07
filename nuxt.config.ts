import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Michel Droubay | Odicé - Assistant immigration',
      htmlAttrs: {
        lang: 'fr'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },

        // Description globale
        {
          name: 'description',
          content: 'Odicé est une structure fondée par Michel Droubay, spécialiste en droit international, qui accompagne les personnes étrangères dans leurs démarches d’immigration en France.'
        },
        {
          name: 'keywords',
          content: 'Odicé, immigration France, Michel Droubay, droit des étrangers, titre de séjour, visa, naturalisation, droit international'
        },
        { name: 'author', content: 'Michel Droubay - Odicé' },

        // Open Graph
        { property: 'og:title', content: 'Odicé - Aide à l’immigration en France' },
        {
          property: 'og:description',
          content: 'Odicé accompagne les étrangers dans leur projet d’installation en France, avec un suivi personnalisé assuré par Michel Droubay.'
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://odice.fr' }, // ← mets ton domaine ici
        { property: 'og:image', content: 'https://odice.fr/og-image.jpg' }, // ← image de partage

        // Twitter Cards
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Odicé - Assistant immigration | Michel Droubay' },
        {
          name: 'twitter:description',
          content: 'Conseils et accompagnement pour les démarches d’immigration en France par Michel Droubay.'
        },
        { name: 'twitter:image', content: 'https://odice.fr/og-image.jpg' }
      ],
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
  ssr: true,
  runtimeConfig: {
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_TO: process.env.SMTP_TO,
    public: {
      CONTENTFUL_SPACE_ID: process.env.NUXT_PUBLIC_CONTENTFUL_SPACE_ID,
      CONTENTFUL_ENVIRONMENT: process.env.NUXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
      CONTENTFUL_ACCESS_TOKEN: process.env.NUXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
    }
  },
  modules: ["@nuxt/fonts"],
  plugins: ['~/plugins/fontawesome.js']
})