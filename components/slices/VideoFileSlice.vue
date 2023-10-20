<template>
  <div class="">
    <video :src="field.primary.video.url" autoplay controls loop />
  </div>
</template>

<script>
export default {
  name: 'VideoFileSlice',
  props: {
    field: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
/* heyyyy there */
</style>
