<template>
  <section v-if="!$fetchState.pending" class="index flex flex-col md:flex-row about">
    <section class="md:px-0 w-full md:w-1/2 md:pr-8 max-w-xl">
      <section class="flex-col md:flex-row flex mb-12">
        <div class="w-full mb-4 md:mb-0 md:w-1/2" style="min-width: 200px;">
          <prismic-rich-text class="paragraph" :field="about.data.bio" />
        </div>

        <div class="w-full mb-4 md:mb-0 md:min-w-1/2 pr-4">
          <prismic-rich-text class="paragraph" :field="about.data.address" />
        </div>
      </section>

      <section class="w-full block mb-12 md:mb-0 md:hidden">
        <img :src="headerImage" alt="" class="header_image">
      </section>

      <TextualSlices
        class="pr-4"
        @hovering="handleHovering"
        :body="about.data.body"
      />
    </section>

    <section class="w-full md:w-1/2 hidden md:block md:pr-24">
      <div class="relative switchable block">
        <img
          v-if="headerImage && typeof headerImage !== 'object'"
          :src="headerImage"
          :alt="headerImageAlt"
          class="header_image"
        >
        <Publication
          v-else
          :publication="headerImage"
        />
      </div>
      <TextualSlices
        class="pr-4"
        rightColumn
        @hovering="handleHovering"
        :body="about.data.body"
      />
    </section>

    <TextualSlices
      class="pr-4 md:hidden"
      rightColumn
      @hovering="handleHovering"
      :body="about.data.body"
    />
  </section>
</template>

<script>
import Lightbox from '@/components/Lightbox'
import TextualSlices from '@/components/slices/TextualSlices'
import Publication from '@/components/Publication'

export default {
  name: 'About',
  components: {
    Lightbox,
    TextualSlices,
    Publication
  },
  head () {
    let meta = false

    if (this.about?.data) {
      const content = this.$prismic.asText(this.about?.data?.bio_seo)

      meta = [
        { hid: 'og:description', property: 'og:description', content },
        { hid: 'description', name: 'description', content },
        { hid: 'twitter.description', name: 'twitter.description', content }
      ]
    }
    return {
      title: 'About',
      meta
    }
  },
  data () {
    return {
      hovering: false,
      about: null,
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
        return this.about.data.header_image.Large.url
      }
    },
    headerImageAlt () {
      if (this.hovering) {
        return ''
      } else {
        return this.about.data.header_image.alt
      }
    }
  },
  methods: {
    handleHovering (e) {
      this.hovering = e
    }
  },
  async fetch () {
    this.about = await this.$prismic.api.getSingle('about')
  }
}
</script>

<style lang="postcss">

.about {
  display: flex;
  flex-flow: column;

  @screen md {
    flex-flow: row;
  }
}

.switchable {
  aspect-ratio: 4 / 3;
  margin-bottom: theme('spacing.4');
}

.switchable .header_image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: bottom left;
}
</style>
