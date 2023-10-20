<template>
  <span
    @click="$emit('prev')"
    class="cursor-pointer"
    @mouseenter="$emit('prevTitle')"
    @mouseleave="$emit('resetTitle')"
  >
    ←
  </span>
</template>

<script>
export default {
  name: 'Previous',
  data () {
    return {
      tooltip: false
    }
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    showTooltip () {
      this.tooltip = true
    }
  }
}
</script>

<style lang="postcss" scoped>
.tooltip {
  width: 100vw;
  text-align: right;
  pointer-events: none;
  white-space: nowrap;
}
</style>