export default defineNuxtConfig({

  // Get all the pages, components, composables and plugins from the parent theme
  extends: ['./woonuxt_base'],

  components: [{ path: './components', pathPrefix: false }],

  // Runtime configurations
  runtimeConfig: {
    public: {
      siteUrl: process.env.APP_HOST || 'http://localhost:3000',
      siteName: process.env.SITE_NAME || 'The Relic Shop',
      siteVersion: '1.0.0',
    }
  },

  // Image handling configuration
  image: {
    domains: (process.env.NUXT_IMAGE_DOMAINS || '').split(',').map(d => d.trim()),
    provider: process.env.NUXT_IMAGE_PROVIDER || 'ipx',
    ipx: {
      modifiers: {
        quality: 80,
      },
      domains: ['shop.therelic.blog'],
    },
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536
    },
    presets: {
      avatar: {
        modifiers: {
          format: 'webp',
          width: 50,
          height: 50
        }
      },
      product: {
        modifiers: {
          format: 'webp',
          width: 500,
          height: 500
        }
      },
      thumbnail: {
        modifiers: {
          format: 'webp',
          width: 200,
          height: 200
        }
      },
      logo: {
        modifiers: {
          format: 'webp',
          width: 250,
          height: 100
        }
      },
      banner: {
        modifiers: {
          format: 'webp',
          width: 1200,
          height: 400
        }
      }
    },
    // Allow direct remote URLs for WordPress media
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shop.therelic.blog',
        pathname: '/wp-content/uploads/**',
      }
    ]
  },

  /**
   * Depending on your servers capabilities, you may need to adjust the following settings.
   * It will affect the build time but also increase the reliability of the build process.
   * If you have a server with a lot of memory and CPU, you can remove the following settings.
   * @property {number} concurrency - How many pages to prerender at once
   * @property {number} interval - How long to wait between prerendering pages
   * @property {boolean} failOnError - This stops the build from failing but the page will not be statically generated
   */
  nitro: {
    prerender: {
      concurrency: 10,
      interval: 1000,
      failOnError: false,
    },
    minify: true
  },
  
  // Add support for route rules to handle WordPress media files
  routeRules: {
    '/wp-content/**': {
      proxy: { to: 'https://shop.therelic.blog/wp-content/**' },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Cache-Control': 'public, max-age=86400', // 1 day cache
      }
    },
    // Special route for media & uploads
    '/wp-content/uploads/**': {
      headers: {
        'Cache-Control': 'public, max-age=604800', // 7 days cache
        'Access-Control-Allow-Origin': '*',
      },
      proxy: { to: 'https://shop.therelic.blog/wp-content/uploads/**' }
    },
    // Special route for product images
    '/wp-content/uploads/woocommerce-product-images/**': {
      headers: {
        'Cache-Control': 'public, max-age=2592000', // 30 days cache
        'Access-Control-Allow-Origin': '*',
      },
      proxy: { to: 'https://shop.therelic.blog/wp-content/uploads/woocommerce-product-images/**' }
    }
  }
});
