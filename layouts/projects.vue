<template>
  <div class="index">
    <Navigation />

    <swiper
      id="swiper"
      ref="swiper"
      :options="swiperOptions"
      class="slider"
      @ready="onSwiper"
      @slideChangeTransitionEnd="onSlideChangeTransitionEnd"
    >
      <swiper-slide
        class="px-4"
        v-for="work in works"
        :key="work.uid"
      >
        <div class="flex justify-between select-none">
          <prismic-rich-text class="paragraph font-medium mb-4" :field="work.data.title" />

          <div class="controls w-32 flex justify-end whitespace-nowrap">
            <Previous
              :title="previousTitle"
              @prev="prevSlide()"
              @prevTitle="showPrevTitle()"
              @resetTitle="title = ''"
            />
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            <Next
              :title="nextTitle"
              @next="nextSlide()"
              @nextTitle="showNextTitle()"
              @resetTitle="title = ''"
            />
          </div>
        </div>
        <Slices @load="resize" :slices="work.data.body" />

        <p class="sm:hidden text-center w-full paragraph select-none" style="opacity: 0.2">
          <span>←</span> &nbsp;&nbsp;Swipe for more&nbsp;&nbsp; <span>→</span>
        </p>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue"
import Next from "@/components/Next.vue"
import Previous from "@/components/Previous.vue"
import Slices from '@/components/slices/Slices.vue'

export default {
  name: 'Projects',
  head () {
    return {
      title: 'Projects'
    }
  },
  components: { Navigation, Slices, Next, Previous },
  async fetch () {
    const result = await this.$prismic.api.query(
      this.$prismic.predicates.at('document.type','work'),
      { pageSize: 100 }
    )
    this.works = result.results
    this.swiperOptions.initialSlide = await this.works.map(w => w.uid).indexOf(this.$route.params.project)
  },
  data () {
    return {
      title: '',
      slideIndex: -1,
      works: [],
      swiperOptions: {
        speed: 1,
        initialSlide: 0,
        autoHeight: true,
        observer: true,
        observeParents: true,
        on: {
          slideChangeTransitionEnd () {
            this.params.speed = 500
          }
        }
      }
    }
  },
  methods: {
    resize () {
      this.$refs.swiper.swiper.update()
    },
    nextSlide () {
      this.$refs.swiper.swiper.slideNext()
    },
    prevSlide () {
      this.$refs.swiper.swiper.slidePrev()
    },
    showNextTitle () {
      this.title = this.nextTitle
    },
    showPrevTitle () {
      this.title = this.prevTitle
    },
    async onSwiper () {
      this.title = ''
      if (this.works.length === 0) {
        const result = await this.$prismic.api.query(
          this.$prismic.predicates.at('document.type','work'),
          { pageSize: 100 }
        )

        this.works = result.results
      }

      await this.$nextTick()
      const index = this.works.map(w => w.uid).indexOf(this.$route.params.project)
      this.$refs.swiper.swiper.slideTo(index)
      this.slideIndex = index
      console.log(this.$refs.swiper)
      this.$refs.swiper.swiper.update()
    },
    onSlideChangeTransitionEnd (e) {
      this.slideIndex = this.$refs.swiper.swiper.activeIndex
      if (this.slideIndex > -1) {
        const uid = this.works[this.slideIndex].uid
        if (!this.$route.path.includes(uid)) {
          this.$router.replace(`/${uid}`)
        }
      }
    }
  },
  computed: {
    previousTitle () {
      if (this.previousIndex > -1 && this.previousProject) {
        return this.$prismic.asText(this.previousProject.data.title)
      }

      return ''
    },
    previousProject () {
      if (this.previousIndex > -1) {
        return this.works[this.previousIndex]
      }

      return null
    },
    nextProject () {
      if (this.nextIndex > -1) {
        return this.works[this.nextIndex + 1]
      }

      return null
    },
    nextTitle () {
      if (this.nextIndex > -1 && this.nextProject) {
        return this.$prismic.asText(this.nextProject.data.title)
      }

      return ''
    },
    previousIndex () {
      if (this.slideIndex > -1) {
        return this.slideIndex - 1
      }

      return -1
    },
    nextIndex () {
      if (this.slideIndex > -1) {
        return this.slideIndex + 1
      }

      return -1
    },
    firstSlide () {
      if (this.$refs.swiper) {
        return this.slideIndex === 0
      }

      return this.$refs.swiper
    },
    lastSlide () {
      if (this.$refs.swiper) {
        return this.slideIndex === this.works.length - 1
      }

      return this.$refs.swiper
    }
  }
}
</script>

<style lang="postcss">
/* purgecss start ignore */
@import 'swiper/dist/css/swiper.css';
@import url('~assets/css/grid.css');
/* purgecss end ignore */

* {
  @apply font-sans;
}

html {
  overflow-x: hidden;
  /* height: 100%; I commented out this declaration because it messes up your scrolling */
}

body {
  height: 100%;
  overflow: auto;
}



</style>

