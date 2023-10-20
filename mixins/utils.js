export default {
  data () {
    return {
      window: {
        width: 0,
        height: 0
      }
    }
  },
  methods: {
    /**
     * @param {Number} num
     * @param {Number} inMin
     * @param {Number} inMax
     * @param {Number} outMin
     * @param {Number} outMax
     */
    mapValues (num, inMin, inMax, outMin, outMax) {
      return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
    },
    handleResize () {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    },
    uncompressed (url) {
      url = url.replace(/\?.*$/, '')
      return url
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  }
}
