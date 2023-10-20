<template>
  <img
    v-lazy="original ? uncompressed(field.primary.image1.url) : uncompressed(field.primary.image1.Huge.url)"
    class="image"
    alt=""
  >
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
    }
  }
}
</script>

<style lang="postcss">
@keyframes loading {
  from {
    background: #ffffff;
  }
  to {
    background: #dddddd;
  }
}

img[lazy=loading] {
  @apply w-screen h-screen;
  animation: loading 1s ease infinite alternate;
}
</style>
