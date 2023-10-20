<template>
  <div class="grid-layout-slice relativ w-full">
    <div :class="`grid-with-image ${columnClass} gap-4`">
      <prismic-rich-text
        ref="text"
        class="column-content"
        :field="field.primary.description1"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GridLayoutSlice',
  props: {
    field: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true,
      default: 'Two Columns'
    }
  },
  computed: {
    columnClass () {
      const classes = ['columns-2', 'columns-3', 'columns-4', 'columns-5']
      return classes[this.field.primary.columns - 2]
    }
  },
  methods: {
    placeImage () {
      const imageElement = new Image()
      imageElement.src = this.field.primary.image.url
      imageElement.alt = this.field.primary.image.alt
      // Make sure the image is loaded before balancing the columns, so we can calc height
      imageElement.addEventListener('load', this.balanceColumns)
      imageElement.classList.add('mb-4')

      let column = 1
      let offset = this.$refs.text.firstChild.offsetLeft

      for (const kid of this.$refs.text.children) {
        /**
         * If the offset is different, this means we cann establish a column has been spanned
         */
        if (offset !== kid.offsetLeft) {
          offset = kid.offsetLeft
          column++
        }


        if (column === Number(this.field.primary.column)) {
          const parentNode = kid.parentNode
          parentNode.insertBefore(imageElement, kid)
          break
        }
      }
    },
    balanceColumns () {
      // 1. find the tallest column
      let offset = this.$refs.text.firstChild.offsetLeft
      let i = 0
      let column = 0
      const sizes = []

      for (const kid of this.$refs.text.children) {
        const { height } = kid.getBoundingClientRect()

        if (offset !== kid.offsetLeft) {
          offset = kid.offsetLeft
          column++
        }

        sizes.push({ 
          tag: kid.tagName,
          i,
          column,
          height
        })

        i++
      }

      let columnSizes = {}
      for (let i = 0; i < this.field.primary.columns; i++) columnSizes[i] = 0

      sizes.forEach(size => {
        columnSizes[size.column] += size.height
      })

      // 2. See if the first child is shorter than the column that needs to be spaced out
      const maxSize = Math.max(...Object.values(columnSizes))
      console.log(Object.values(columnSizes))

      // 3. Move everything leftwards from there, skipping the inserted image
    }
  },
  mounted () {
    this.placeImage()
  }
}
</script>

<style lang="postcss">
.grid-with-image {
  /* display: grid; */
  /* grid-template-columns: 1fr 1fr; */
  /* grid-auto-rows: auto; */
}

.column-content > * {
  @apply mb-2;
  /* background: red; */
  break-inside: avoid;
}

@screen md {
  .columns-1 {
    column-gap: theme('spacing.4');
    column-count: 1;
  }

  .columns-2 {
    column-gap: theme('spacing.4');
    column-count: 2;
  }

  .columns-3 {
    column-gap: theme('spacing.4');
    column-count: 3;
  }

  .columns-4 {
    column-gap: theme('spacing.4');
    column-count: 4;
  }

  .columns-5 {
    column-gap: theme('spacing.4');
    column-count: 5;
  }
}
</style>