<template>
  <div class="main">
    <Navigation />
    <nuxt />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'Default',
  components: {
    Navigation
  }
}
</script>

<style lang="postcss">
/* purgecss start ignore */
@import url('~assets/css/grid.css');
/* purgecss end ignore */

* {
  @apply font-sans;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
}

p {
  max-width: 75ch;
  /* @apply mb-6; */
}

.main {
  @apply mx-4 my-2;
}

@import 'swiper/dist/css/swiper.css';

</style>
