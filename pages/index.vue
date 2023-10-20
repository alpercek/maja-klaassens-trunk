<template>
  <section v-if="!$fetchState.pending" class="index">
    <Works :works="sortedWorks" />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Works from '@/components/Works'

export default {
  name: 'Index',
  components: {
    Works
  },
  head () {
    return {
      title: 'Home'
    }
  },
  data () {
    return {
      home: null,
      works: []
    }
  },
  computed: {
    ...mapState(['pages']),
    sortedWorks () {
      if (!this.home) return

      return this.home.data.works.map((w) => {
        const work = this.works.find((work) => {
          return work.id === w.work.id
        })
        return {
          width: w.width,
          width_tablet: w.width_tablet,
          width_xl: w.width_xl,
          solo: w.solo,
          ...work
        }
      })
    }
  },
  async fetch () {
    this.works = await this.$prismic.api.getSingle('home')
      .then((response) => {
        this.home = response

        const promises = []

        response.data.works.forEach((work) => {
          promises.push(this.$prismic.api.getByID(work.work.id))
        })

        return Promise.all(promises)
      })
  }
}
</script>

<style lang="postcss">
.index {
  @apply pt-20 pb-12 px-0;

  @screen sm {
    @apply pt-24;
  }
}

</style>
