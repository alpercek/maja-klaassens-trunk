<template>
  <section class="cv_section">
    <prismic-rich-text
      :field="slice.primary.title1"
      class="header"
    />
    <table class="items">
      <tbody>
        <tr
          v-for="(p, i) in slice.items"
          :key="i"
          @mouseenter="$emit('hovering', getMyPublication(p.publication.id))"
          @click="$emit('hovering', getMyPublication(p.publication.id))"
          class="cursor-pointer"
        >
          <td :class="{ small: $prismic.asText(getMyPublication(p.publication.id).data.year).length <= 5 }">
            <prismic-rich-text
              :field="getMyPublication(p.publication.id).data.year"
              :key="p.publication.id + 'title'"
            />
          </td>
          <td>
            <prismic-rich-text
              :field="getMyPublication(p.publication.id).data.title"
              :key="p.publication.id + 'title'"
              class="underline"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  name: 'CVSectionSimple',
  props: {
    slice: {
      type: Object,
      required: true
    },
    publications: {
      type: Array,
      required: true
    }
  },
  methods: {
    getMyPublication (id) {
      return this.publications.find((p) => p.id === id)
    }
  }
}
</script>