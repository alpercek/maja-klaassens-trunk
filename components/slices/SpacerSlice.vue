<template>
  <div class="spacer" :class="`h-0 md:height-${field.primary.height_tablet} lg:height-${field.primary.height} xl:height-${field.primary.height_xl}`" />
</template>

<script>
import utils from "@/mixins/utils"
export default {
  name: 'SpacerSlice',
  mixins: [utils],
  props: {
    field: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.spacer {
  @apply hidden;

  @screen md {
    @apply block;
  }
}
</style>
