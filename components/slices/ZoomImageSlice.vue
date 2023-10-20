<template>
  <div
    @click="handleZoom"
    @mousemove="scrollThrough"
    :class="{ zoomed: zoomed }"
    class="zoom-container"
  >
    <img
      :src="field.primary.image1.url"
      :width="`${field.primary.image1.dimensions.width}px`"
      :height="`${field.primary.image1.dimensions.height}px`"
      :class="{ zoomed: zoomed }"
      class="image"
    >
  </div>
</template>

<script>
export default {
  name: 'ZoomImageSlice',
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      zoomed: false
    }
  },
  methods: {
    scrollThrough (e) {
      const rect = this.$el.getBoundingClientRect()
      const x = e.clientX - rect.left // x position within the element.
      const y = e.clientY - rect.top // y position within the element.

      const fracX = (x / rect.width)
      const fracY = (y / rect.height)

      const toX = fracX * (this.$el.scrollWidth - rect.width)
      const toY = fracY * (this.$el.scrollHeight - rect.height)

      this.scrollTo(toX, toY)
    },
    scrollTo (x, y) {
      this.$nextTick(() => {
        this.$el.scrollLeft = x
        this.$el.scrollTop = y
      })
    },
    handleZoom (e) {
      const rect = this.$el.getBoundingClientRect()
      const x = e.clientX - rect.left // x position within the element.
      const y = e.clientY - rect.top // y position within the element.

      const fracX = (x / rect.width)
      const fracY = (y / rect.height)

      this.zoomed = !this.zoomed

      this.$nextTick(() => {
        const toX = fracX * (this.$el.scrollWidth - rect.width)
        const toY = fracY * (this.$el.scrollHeight - rect.height)

        this.scrollTo(toX, toY)
      })
    }
  }
}
</script>

<style lang="postcss">
.zoom-container {
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  cursor: zoom-in !important;

  &.zoomed {
    @apply bg-black;
  }

  .image {
    width: 100%;
    object-fit: contain;
    cursor: zoom-in !important;

    &.zoomed {
      padding: 0 !important;
      margin: 0 !important;
      width: unset !important;
      height: unset !important;
      object-fit: unset !important;
      max-width: none !important;
      cursor: zoom-out !important;
    }
  }
}
</style>
