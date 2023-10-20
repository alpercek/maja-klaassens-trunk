<script>
export default {
  name: 'Project',
  layout: 'projects',
  async fetch () {
    const project = await this.$prismic.getByUID('work', this.$route.params.project)
    this.title = await this.$prismic.asText(project.data.title)
  },
  data () {
    return {
      project: null
    }
  },
  head () {
    return {
      title: this.title
    }
  }
}
</script>
