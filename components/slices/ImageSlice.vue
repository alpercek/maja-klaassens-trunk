<template>
  <figure>
    <img
      v-lazy="original ? uncompressed(field.primary.image1.url) : uncompressed(field.primary.image1.Huge.url)"
      @load="onLoad"
      class="image"
      alt=""
    >
    <figcaption v-if="captions">
      {{ field.primary.image1.alt }}
    </figcaption>
  </figure>
</template>

<script>
import utils from "@/mixins/utils"
export default {
  name: 'ImageSlice',
  mixins: [utils],
  props: {
    field: {
      type: Object,
      required: true
    },
    original: {
      type: Boolean,
      required: false,
      default: false
    },
    captions: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    onLoad () {
      this.$emit('loaded')
    }
  }
}
</script>

<style lang="postcss" scoped>
img[lazy=loading] {
  height: 400px;
}
</style>
