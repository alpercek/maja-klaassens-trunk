<template>
  <div class="slider-container">
    <div
      ref="slider"
      class="slider"
      :class="{ left: direction === -1, right: direction === 1 }"
      @mousemove="changeCursor"
      @click="navigate"
    >
      <div
        v-for="(slide, index) in publication.data.spreads"
        :id="`s-${index}`"
        :key="index"
        class="slide"
      >
        <img class="slide-image" :src="slide.spread.url" />
      </div>
    </div>

    <div class="bottom">
      <div class="bullets">
        <div
          v-for="(slide, index) in publication.data.spreads"
          :key="index"
          class="bullet"
          :class="{ active: index === active}"
          @click="slideTo(index)"
        />
      </div>
      <div class="title md:inline-block sm:w-2/3">
        <figcaption>
          {{ activeSlide.spread.alt }}
          <!-- <prismic-rich-text class="text-right" :field="publication.data.title" /> -->
        </figcaption>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Publication',
  props: {
    publication: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      active: 0,
      direction: 1,
      cursor: null
    }
  },
  computed: {
    activeSlide () {
      return this.publication.data.spreads[this.active]
    }
  },
  methods: {
    slideTo (index) {
      this.active = index
      const el = this.$refs.slider.querySelector(`#s-${index}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    navigate () {
      if (this.active > 0 && this.direction === -1) {
        this.slideTo(this.active + this.direction)
      } else if (this.active < this.publication.data.spreads.length - 1 && this.direction === 1) {
        this.slideTo(this.active + this.direction)
      }
    },
    changeCursor (e) {
      if (e.layerX < e.currentTarget.clientWidth / 2) {
        if (this.direction !== 'left') {
          this.direction = -1
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (this.direction !== 'right') {
          this.direction = 1
        }
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.slider-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-flow: column nowrap;

  .slider {
    position: relative;
    width: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    white-space: nowrap;
    scroll-snap-type: x mandatory;

    &.left {
      cursor: w-resize;
    }

    &.right {
      cursor: e-resize;
    }

    .slide {
      scroll-snap-align: start end;
      display: inline-block;
      vertical-align: top;
      position: relative;
      width: 100%;
      height: 100%;

      img {
        width: 100%;
      }

      .slide-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: 0px 0px;
      }
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
  }
  .bullets {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    .bullet {
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin: 0 3px;
      transition: all 0.2s ease;
      background-color: #aaa;

      &.active {
        background-color: black;
      }
    }
  }
}

</style>
