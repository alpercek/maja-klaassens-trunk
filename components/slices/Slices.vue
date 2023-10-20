<template>
  <div class="slices">
    <component
      class="mb-8 slice"
      v-for="(slice, i) in slices"
      :class="classString(slice.primary.width_tablet, slice.primary.width, slice.primary.width_xl)"
      v-bind:is="mappings[slice.slice_type]"
      v-bind="{
        field: slice,
        captions: true
      }"
      @loaded="onLoad"
      :key="i + 'a'"
    />
  </div>
</template>

<script>
import grid from "@/mixins/grid"
import SpacerSlice from '@/components/slices/SpacerSlice.vue'
import ImageSlice from '@/components/slices/ImageSlice.vue'
import VideoSlice from '@/components/slices/VideoSlice.vue'
import TextSlice from '@/components/slices/TextSlice.vue'
import GridLayoutSlice from '@/components/slices/GridLayoutSlice.vue'

export default {
  name: 'Slices',
  mixins: [grid],
  components: {
    SpacerSlice,
    ImageSlice,
    VideoSlice,
    TextSlice,
    GridLayoutSlice
  },
  props: {
    slices: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      mappings: {
        spacer: 'SpacerSlice',
        image: 'ImageSlice',
        video: 'VideoSlice',
        text: 'TextSlice',
        'text-with-image': 'GridLayoutSlice'
      }
    }
  },
  methods: {
    onLoad () {
      this.$emit('load')
    }
  }
}
</script>
