import { mapState, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      getAvailable: 'locale/GET_AVAILABLE_LOCALES'
    }),
    setLocale () {
      const locale = this.$cookie.get('locale')
      if (!locale) {
        this.initLocale()
      }
    },
    initLocale () {
      this.$cookie.set('locale', this.locale.available[0].id)
    }
  },
  computed: {
    ...mapState(['locale'])
  },
  mounted () {
    this.getAvailable()
      .then((res) => {
        this.setLocale()
      })
  }
}
