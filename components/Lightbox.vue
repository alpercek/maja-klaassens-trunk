<template>
  <div class="lightbox">
    <div @click="$emit('close', id)" class="close">
      <p class="font-sans text-2xl">
        ×
      </p>
    </div>

    <div class="controls">
      <p :disabled="activeIndex === 0" @click="prev" class="button previous">
        previous
      </p>
      <p :disabled="activeIndex === slides.length - 1" @click="next" class="button next">
        next
      </p>
    </div>

    <swiper
      id="swiper"
      ref="swiper"
      :options="swiperOptions"
      @init="slideChange"
      @slideChange="slideChange"
      v-if="id === 'works'"
      :class="{ 'bg-white': id === 'works' }"
      class="slider"
    >
      <swiper-slide v-for="(slide, i) in slides" :key="'a' + slide.id + i" class="slide">
        <template v-for="(field, j) in slide.data.body">
          <ZoomImageSlice
            v-if="field.slice_type === 'image'"
            :key="j"
            :field="field"
          />
          <VideoSlice
            v-else
            :key="j"
            :field="field"
          />
        </template>
      </swiper-slide>
    </swiper>

    <swiper
      id="swiper"
      ref="swiper"
      v-else
      :options="swiperOptions"
      @init="slideChange"
      @click="handleClick"
      @slideChange="slideChange"
      class="slider"
    >
      <swiper-slide v-for="(item, i) in slides" :key="'a' + item.id + i" class="slide">
        <img :src="uncompressed(item.spread.Large.url)" alt="" class="image">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import ZoomImageSlice from '@/components/slices/ZoomImageSlice'
import VideoSlice from '@/components/slices/VideoSlice'
import utils from "@/mixins/utils"
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '~/tailwind.config.js'

export default {
  name: 'Lightbox',
  mixins: [utils],
  components: {
    ZoomImageSlice,
    VideoSlice
  },
  props: {
    id: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      required: false,
      default: undefined
    },
    initialSlide: {
      type: Number,
      required: false,
      default: 0
    },
    slides: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      config: resolveConfig(tailwindConfig),
      activeIndex: 0,
      showInfo: false
    }
  },
  computed: {
    swiperOptions () {
      return {
        initialSlide: this.initialSlide
      }
    }
  },
  mounted () {
    this.activeIndex = this.initialSlide
  },
  methods: {
    slideChange () {
      this.activeIndex = this.$refs.swiper.swiper.activeIndex
    },
    handleClick (e) {
      if (!this.$refs.swiper.swiper.animating) {
        if (e.screenX > window.innerWidth / 2) {
          this.next()
        } else {
          this.prev()
        }
      }
    },
    prev () {
      this.$refs.swiper.swiper.slidePrev()
    },
    next () {
      this.$refs.swiper.swiper.slideNext()
    }
  }
}
</script>

<style lang="postcss">
.lightbox {
  @apply fixed inset-0 w-full bg-white z-10;

  .close {
    @apply fixed right-0 top-0 mt-2 mr-4 text-black z-30 cursor-pointer;
  }

  .controls {
    @apply fixed bottom-0 w-full pt-2 px-6 cursor-pointer flex flex-row flex-nowrap justify-between items-end z-30 text-base;

    p {
      @apply mb-4 font-sans;
    }

    .button {
      &[disabled],
      &:active {
        color: #555;
      }
    }
  }

  .slider {
    @apply relative inset-0 w-screen h-screen z-20;

    .slide {
      @apply w-full;

      .image {
        @apply w-full h-full cursor-pointer p-4;
        object-position: center;
        object-fit: contain;

        @screen sm {
          @apply cursor-default pt-4 pr-12 pb-20 pl-4;
        }
        /* border: 1px solid black; */
      }
    }
  }
}
</style>
