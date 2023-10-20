<template>
  <div class="w-full" v-if="!$fetchState.pending">
    <component
      v-for="(slice, i) in filteredBody"
      :key="i"
      :is="mappings[slice.slice_type]"
      v-bind="{
        slice,
        publications
      }"
      @hovering="handleHovering"
    />
  </div>
</template>

<script>
import CVSectionPress from "@/components/slices/CVSectionPress"
import CVSectionPublications from "@/components/slices/CVSectionPublications"
import CVSectionSimple from "@/components/slices/CVSectionSimple"
import CVSectionTwoColumns from "@/components/slices/CVSectionTwoColumns"
import CVSectionTwoColumnsImage from "@/components/slices/CVSectionTwoColumnsImage"

export default {
  name: 'TextualSlices',
  components: {
    CVSectionPress,
    CVSectionPublications,
    CVSectionSimple,
    CVSectionTwoColumns,
    CVSectionTwoColumnsImage
  },
  props: {
    body: {
      type: Array,
      required: true
    },
    rightColumn: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  async fetch () {
    this.about = await this.$prismic.api.getSingle('about')

    const promises = []

    this.about.data.body.forEach((item) => {
      if (item.slice_type === 'cv_section__publications_') {
        item.items.forEach((i) => {
          promises.push(this.$prismic.api.getByID(i.publication.id))
        })
      }
    })

    this.publications = await Promise.all(promises)
  },
  data () {
    return {
      mappings: {
        'press': CVSectionPress,
        'cv_section__publications_': CVSectionPublications,
        'cv_section__simple_': CVSectionSimple,
        'cv_section__two_columns_': CVSectionTwoColumns,
        'cv_section__two_columns_image': CVSectionTwoColumnsImage
      },
      publications: []
    }
  },
  computed: {
    filteredBody () {
      return this.body.filter(slice => {
        let title = this.$prismic.asText(slice.primary.title1).toLowerCase()

        if (this.rightColumn) {
          // return slice.slice_type === 'publications' || title === 'press' || title === 'stipends / awards'
          return slice.slice_type === 'publications' || title === 'publications' || title === 'press' || title === 'stipends / awards' || slice.slice_type === 'press'
        } else {
          return slice.slice_type !== 'press' && title !== 'press' && title !== 'stipends / awards' && title !== 'publications'
        }
      })
    }
  },
  methods: {
    handleHovering (id) {
      this.$emit('hovering', id)
    },
    getMyPublication (id) {
      return this.publications.find((p) => p.id === id)
    }
  }
}
</script>