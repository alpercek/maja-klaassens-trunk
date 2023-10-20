<template>
  <div class="relative px-3">
    <transition name="fade">
      <prismic-rich-text class="textSlice paragraph md:pl-4" :field="field.primary.description1" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TextSlice',
  props: {
    field: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.textSlice {
  max-width: 50ch;
}
</style>