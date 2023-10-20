<template>
  <div class="overlay">
    <div @click="$emit('close')" class="close">
      ×
    </div>
    <figure
      :key="work.id"
      @mousemove="handleMouseMove"
      v-touch:swipe="handleFingerDown"
      class="overlay-figure"
    >
      <template v-for="(field, i) in work.data.body">
        <ImageSlice
          v-if="field.slice_type === 'image'"
          :style="{
            objectPosition: `${navPosition.x}% ${navPosition.y}%`
          }"
          :key="i"
          :field="field"
          original
        />
        <VideoSlice
          v-else
          :key="i"
          :field="field"
        />
      </template>
      <figcaption class="caption">
        {{ $prismic.asText(work.data.description) }}
      </figcaption>
    </figure>
  </div>
</template>

<script>
import ImageSlice from '@/components/slices/ImageSlice'
import VideoSlice from '@/components/slices/VideoSlice'

export default {
  name: 'Overlay',
  components: {
    ImageSlice,
    VideoSlice
  },
  props: {
    work: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      zoomed: true,
      navPosition: {
        x: 50,
        y: 50
      }
    }
  },
  methods: {
    handleFingerDown (e) {
      this.handleMouseMove(e)
    },
    handleMouseMove (e) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left // x position within the element.
      const y = e.clientY - rect.top // y position within the element.

      this.navPosition.x = (x / rect.width) * 100
      this.navPosition.y = (y / rect.height) * 100
    }
  }
}
</script>

<style lang="postcss" scoped>
@keyframes loading {
  from {
    background: #ffffff;
  }
  to {
    background: #dddddd;
  }
}

.overlay {
  @apply w-screen h-screen fixed z-10 top-0 left-0 bg-white;

  * {
    @apply bg-transparent;
  }

  .close {
    @apply font-sans fixed top-0 right-0 mr-6 mt-2 z-10 text-2xl cursor-pointer;
  }

  .overlay-figure {
    @apply h-full w-full p-0 flex flex-col justify-center;

    img[lazy=loading] {
      @apply w-screen h-screen;
      animation: loading 1s ease infinite alternate;
    }

    .image {
      @apply w-full h-full;
      object-fit: none;
      transform: scale(1);
    }

    .caption {
      @apply fixed font-sans bottom-0 left-0 w-full text-center pb-4 z-10 text-sm;

      @screen sm {
        @apply text-xl;
      }

      div p {
        @apply mx-auto my-0 text-center;
      }
    }
  }
}
</style>
