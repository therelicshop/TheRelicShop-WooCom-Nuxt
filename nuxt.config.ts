// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'nuxt-graphql-client',
    '@nuxt/icon',
    '@nuxtjs/i18n'
  ],
  nitro: {
    preset: process.env.NITRO_PRESET || 'vercel'
  },
  runtimeConfig: {
    public: {
      GQL_HOST: process.env.GQL_HOST,
      APP_HOST: process.env.APP_HOST,
      PRODUCTS_PER_PAGE: process.env.NUXT_PUBLIC_PRODUCTS_PER_PAGE,
      IMAGE_DOMAINS: process.env.NUXT_IMAGE_DOMAINS?.split(',').map(d => d.trim()),
      SITE_NAME: process.env.SITE_NAME
    }
  },
  image: {
    provider: process.env.NUXT_IMAGE_PROVIDER || 'vercel',
    domains: process.env.NUXT_IMAGE_DOMAINS?.split(',').map(d => d.trim()) || []
  }
})
