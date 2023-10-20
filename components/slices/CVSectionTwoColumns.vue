<template>
  <section class="cv_section">
    <prismic-rich-text
      :field="slice.primary.title1"
      class="header"
    />
    <table class="items">
      <tbody>
        <tr
          v-for="row, j in slice.items"
          :key="j"
        >
          <td :class="{ small: $prismic.asText(row.column_1).length <= 5 }">
            <a
              v-if="row.file"
              target="_blank"
              :href="row.file.url"
            >
              <prismic-rich-text :field="row.column_1" />
            </a>
            <prismic-rich-text
              v-else
              :field="row.column_1"
            />
          </td>
          <td>
            <a
              v-if="row.file"
              target="_blank"
              :href="row.file.url"
            >
              <prismic-rich-text :field="row.column_2" />
            </a>
            <prismic-rich-text
              v-else
              :field="row.column_2"
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
    }
  }
}
</script>