<template>
  <section class="cv_section">
    <prismic-rich-text
      :field="slice.primary.title1"
      class="header"
    />
    <template v-for="row in slice.items">
      <table
        :key="$prismic.asText(row.title1)"
        class="items"
      >
        <tbody>
          <tr>
            <td class="small">
              <prismic-rich-text :field="row.year" />
            </td>
            <td>
              <prismic-rich-text :field="row.title1" />
            </td>
          </tr>
          <tr>
            <td class="small" />
            <td>
              <prismic-rich-text
                class="ml-6 md:ml-0"
                :key="`a${row.title1}`"
                :field="row.paragraph"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </template>
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