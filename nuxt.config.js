import headTags from './plugins/headTags'
require('dotenv').config()

export default {
  ssr: false,
  target: 'static',
  components: true,
  env: {
    prismicRoot: process.env.PRISMIC_ROOT
  },
  server: {
    // host: '0.0.0.0',
    port: 3000
  },
  /*
  ** Headers of the page
  */
  head: {
    ...headTags(),
    link: [
      {
        rel: 'preload',
        href: '/fonts/SuisseBPIntl-Regular.eot',
        as: 'font',
        type: 'font/eot',
        crossorigin: true
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vue-touch.js', ssr: false },
    { src: '~/plugins/vue-lazyload.js', ssr: false },
    { src: '~/plugins/meta', ssr: false },
    { src: '~/plugins/vue-swiper.js', ssr: false }
  ],
  storybook: {
    stories: ['~/components/**/*.stories.js'],
    stories: ['~/components/**/*.mdx']
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/postcss8',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/prismic',
    '@nuxtjs/gtm',
    ['vue-scrollto/nuxt', { offset: -80 }]
  ],
  /**
   * Module / plugin css
   */
  gtm: {
    id: 'GTM-TWSGW54'
  },
  // css: [{ src: './node_modules/swiper/dist/swiper.min.css', lang: 'css' }],
  /**
   * Prismic setup
   */
  prismic: {
    endpoint: process.env.PRISMIC_ROOT,
    modern: false,
    linkResolver: '~/plugins/prismic/link-resolver.js',
    htmlSerializer: '~/plugins/prismic/html-serializer'
  },
  /**
   * Languages
   */
  // i18n: {
  //   locales: ['en', 'nl'],
  //   parsePages: false,
  //   pages: {
  //     preview: {
  //       nl: false,
  //       en: false
  //     }
  //   },
  //   defaultLocale: 'en',
  //   vueI18n: {
  //     fallbackLocale: 'en'
  //   }
  // },
  /*
  ** Build configuration
  */
  build: {
    /**
     * Nested PostCSS
     */
    postcss: {
      plugins: {
        'postcss-nested': {}
      }
    },

    /*
    ** You can extend webpack config here
    */
    extend (config) {
      /*
      ** Allow Rich Text Fields
      */
      config.resolve.alias.vue$ = 'vue/dist/vue.esm.js'
      config.resolve.extensions = ['*', '.js', '.vue', '.json']
      /*
      ** SVG Support
      */
      // const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))

      // svgRule.test = /\.(png|jpe?g|gif|webp)$/

      // config.module.rules.push({
      //   test: /\.svg$/,
      //   loader: 'vue-svg-loader', // `vue-svg` for webpack 1.x
      // })
    }
  }
}
