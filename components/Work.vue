<template>
  <div
    @click="$emit('show', `/${work.uid}`)"
    class="work"
  >
    <component
      v-if="banner.slice_type !== 'text'"
      v-bind:is="mappings[banner.slice_type]"
      v-bind="{
        field: banner,
        captions: true
      }"
    />
    <figcaption class="caption paragraph">
      {{ $prismic.asText(work.data.title) }}
      <!-- <span v-if="banner.slice_type === 'image'">
        {{ banner.primary.image1.alt }}
      </span> -->
    </figcaption>
  </div>
</template>

<script>
import LazyImageSlice from '@/components/slices/LazyImageSlice'
import VideoSlice from '@/components/slices/VideoSlice'

export default {
  name: 'Work',
  components: {
    LazyImageSlice,
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
      mappings: {
        image: 'LazyImageSlice',
        video: 'VideoFileSlice'
      }
    }
  },
  computed: {
    banner () {
      return this.work.data.body[0]
    }
  }
}
</script>

<style lang="postcss" scoped>
.work {
  @apply mb-8;

  .image {
    @apply w-full;
  }
}

@screen sm {
  .caption {
    padding-left: 6px;
    @apply text-left mt-0;
  }
}
</style>
