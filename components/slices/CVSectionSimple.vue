<template>
  <section
    class="cv_section"
  >
    <prismic-rich-text
      v-if="$prismic.asText(item.primary.title) !== ''"
      :field="slice.primary.title"
      class="header"
    />
    <prismic-rich-text :field="slice.primary.text" />
  </section>
</template>

<script>
export default {
  name: 'CVSectionSimple',
  props: {
    slice: {
      type: Object,
      required: true
    }
  }
}
</script>