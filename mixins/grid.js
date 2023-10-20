export default {
  data () {
    return {
      smClassList: [
        'sm:basis-full',
        'sm:basis-4--5',
        'sm:basis-3--4',
        'sm:basis-2--3',
        'sm:basis-3--5',
        'sm:basis-1--2',
        'sm:basis-2--5',
        'sm:basis-1--3',
        'sm:basis-1--4',
        'sm:basis-1--5'
      ],
      mdClassList: [
        'md:basis-full',
        'md:basis-4--5',
        'md:basis-3--4',
        'md:basis-2--3',
        'md:basis-3--5',
        'md:basis-1--2',
        'md:basis-2--5',
        'md:basis-1--3',
        'md:basis-1--4',
        'md:basis-1--5'
      ],
      xlClassList: [
        'xl:basis-full',
        'xl:basis-4--5',
        'xl:basis-3--4',
        'xl:basis-2--3',
        'xl:basis-3--5',
        'xl:basis-1--2',
        'xl:basis-2--5',
        'xl:basis-1--3',
        'xl:basis-1--4',
        'xl:basis-1--5'
      ]
    }
  },
  methods: {
    classString (sm, md, xl) {
      if (sm) {
        sm = sm.replace('/', '--')
      }
      if (md) {
        md = md.replace('/', '--')
      }
      if (xl) {
        xl = xl.replace('/', '--')
      }
      const smClass = this.smClassList.find((className) => {
        return className.includes(sm)
      })
      const mdClass = this.mdClassList.find((className) => {
        return className.includes(md)
      })
      const xlClass = this.xlClassList.find((className) => {
        return className.includes(xl)
      })

      return `basis-full ${smClass} ${mdClass} ${xlClass}`
    }
  }
}