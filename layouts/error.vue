<template>
  <section class="error-container">
    <h1 v-if="error.statusCode === 404">
      Page not found
    </h1>
    <h1 v-else>
      We're very sorry; An error occurred
    </h1>
    <template v-if="error">
      <h2>
        Error: {{ error.statusCode }}
      </h2>
      <p>
        {{ error.message }}
      </p>
    </template>
    <nuxt-link to="/">
      Take me home
    </nuxt-link>
  </section>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  }
  // layout: 'default' // you can set a custom layout for the error page
}
</script>
