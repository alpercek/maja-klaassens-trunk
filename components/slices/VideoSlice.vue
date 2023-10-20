<template>
  <div class="w-full">
    <!-- VIMEO -->
    <iframe
      v-if="field.primary.embed.provider_name === 'Vimeo'"
      :src="`https://player.vimeo.com/video/${field.primary.embed.video_id}`"
      :width="width"
      :height="height"
      frameborder="0"
      webkitAllowFullScreen
      mozallowfullscreen
      allowFullScreen
    />
    <iframe
      v-else-if="field.primary.embed.provider_name === 'YouTube'"
      :src="youtubeUrl(field.primary.embed.html)"
      :width="width"
      :height="height"
      frameborder="0"
      webkitAllowFullScreen
      mozallowfullscreen
      allowFullScreen
    />
    <figcaption v-if="field.primary.caption" class="caption text-right mt-2">
      {{ $prismic.asText(field.primary.caption) }}
    </figcaption>
  </div>
</template>

<script>
export default {
  name: 'VideoSlice',
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      width: 0,
      height: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.calcSize()
    })
    window.addEventListener('resize', this.calcSize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.calcSize)
  },
  methods: {
    youtubeUrl (html) {
      if (html) {
        const reg = /src="([^"]*)"/g
        const string = html.match(reg)[0].replace('src="', '').replace('"', '')
        return string
      } else {
        return ''
      }
    },
    calcSize () {
      let computedStyle = getComputedStyle(this.$el);

      // let elementHeight = element.clientHeight;  // height with padding
      let elementWidth = this.$el.clientWidth;   // width with padding

      // elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
      elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);

      const ratio = this.field.primary.embed.height / this.field.primary.embed.width
      this.width = elementWidth
      this.height = this.width * ratio
    }
  }
}
</script>

<style lang="postcss" scoped>
.embed-container {
  @apply w-full;
  position: relative !important;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;

}
.embed-container iframe,
object,
embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
