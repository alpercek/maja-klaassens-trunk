<template>
  <section v-if="!$fetchState.pending" class="index about">
    <section class="w-full block mb-12 md:mb-0 md:hidden">
      <img :src="headerImage" alt="" class="header_image max-w-screen-md">
    </section>

    <section class=" md:w-1/2 md:pr-8 max-w-xl">
      <TextualSlices
        @hovering="handleHovering"
        :body="page.data.body"
      />
    </section>

    <section class="w-full md:min-w-1/2 hidden md:block md:pr-24">
      <img :src="headerImage" alt="" class="header_image max-w-screen-md">
    </section>
  </section>
</template>

<script>
import Lightbox from '@/components/Lightbox'
import TextualSlices from '@/components/slices/TextualSlices'

export default {
  name: 'Text',
  components: {
    Lightbox,
    TextualSlices
  },
  head () {
    return {
      title: 'Text'
    }
  },
  data () {
    return {
      hovering: false,
      page: null,
      publications: [],
      activeLightbox: null,
      initialSlide: -1
    }
  },
  computed: {
    headerImage () {
      if (this.hovering) {
        return this.hovering
      } else {
        return this.page.data.header_image.Large.url
      }
    }
  },
  methods: {
    handleHovering (e) {
      this.hovering = e
    }
  },
  async fetch () {
    this.page = await this.$prismic.api.getSingle('text')
  }
}
</script>

<style lang="postcss">

</style>
