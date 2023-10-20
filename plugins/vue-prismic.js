import Vue from 'vue'
import PrismicVue from 'prismic-vue'
import linkResolver from '~/plugins/prismic/link-resolver'
import htmlSerializer from '~/plugins/prismic/html-serializer'

// Add this before the new Vue instance
Vue.use(PrismicVue, {
  endpoint: process.env.PRISMIC_ROOT || process.env.prismicRoot,
  linkResolver,
  htmlSerializer
})
