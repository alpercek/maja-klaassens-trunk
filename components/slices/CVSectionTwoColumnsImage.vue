<template>
  <section class="cv_section">
    <prismic-rich-text
      :field="slice.primary.title1"
      class="header"
    />
    <table class="items">
      <tbody>
        <tr
          v-for="row in slice.items"
          :key="$prismic.asText(row.column1)"
          @mouseenter="$emit('hovering', row.image.url)"
          @mouseleave="$emit('hovering', false)"
          class="cursor-pointer"
        >
          <td :class="{ small: $prismic.asText(row.column_1).length <= 5 }">
            <prismic-rich-text :field="row.column_1" />
          </td>
          <td>
            <prismic-rich-text :field="row.column_2" />
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
    }
  }
}
</script>