<template>
  <div class="works slices">
    <template v-for="(work, i) in works">
      <div
        v-if="work.solo"
        :key="work.id + 'break-before' + i"
        class="break"
      />
      <Work
        class="slice"
        :key="work.id + i"
        :work="work"
        :class="classString(work.width_tablet, work.width, work.width_xl)"
        @show="handleNavigate"
      />
      <div
        v-if="work.solo"
        :key="work.id + 'break-after' + i"
        class="break"
      />
    </template>
  </div>
</template>

<script>
import Lightbox from '@/components/Lightbox'
import grid from '@/mixins/grid'
import Work from '@/components/Work'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '~/tailwind.config.js'

export default {
  name: 'Works',
  components: {
    Work
  },
  mixins: [grid],
  props: {
    works: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      config: resolveConfig(tailwindConfig),
      activeIndex: -1,
      initialSlide: -1
    }
  },
  computed: {
    activeWork () {
      return this.works[this.activeIndex]
    }
  },
  methods: {
    handleNavigate (url) {
      if (url) {
        this.$router.push(url)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>

.works {
  .work {
    @apply cursor-pointer;

    img {
      @apply w-full;
      cursor: cursor;
    }

    figcaption {
      @apply pt-1;
    }
  }

  .break {
    flex-basis: 100%;
    height: 0;
  }
}
</style>
