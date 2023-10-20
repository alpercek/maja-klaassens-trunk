<template>
  <span
    @click="$emit('next')"
    class="cursor-pointer"
    @mouseenter="$emit('nextTitle')"
    @mouseleave="$emit('resetTitle')"
  >
    →
  </span>
</template>

<script>
export default {
  name: 'Previous'
}
</script>