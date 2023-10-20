<template>
  <nav class="navigation" v-if="!$fetchState.pending">
    <nuxt-link tag="h1" class="link home paragraph" to="/">
      Maja Klaassens
    </nuxt-link>

    <template v-if="home.data.menu.length > 1">
      <div
        @click="toggleMenu"
        :class="{ 'is-active': menuOpen }"
        tabindex="0"
        aria-label="menu"
        class="sm:hidden absolute right-0 z-30 hamburger hamburger--minus"
        type="button"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner" />
        </span>
      </div>

      <transition name="fade">
        <div
          v-if="menuOpen"
          class="fixed top-0 inset-0 bg-white px-4 py-2 w-full sm:hidden"
        >
          <ul>
            <li @click="toggleMenu">
              <nuxt-link
                :class="{ active: $route.path === '/' }"
                tag="h1"
                class="link paragraph home"
                to="/"
              >
                Works
              </nuxt-link>
            </li>
            <li
              @click="toggleMenu"
              v-for="link in home.data.menu"
              :key="link.id"
              :class="{ underline: activeRoute(link) }"
            >
              <prismic-link :field="link.page">
                {{ $prismic.asText(getTitle(link)) }}
              </prismic-link>
            </li>
          </ul>
        </div>
      </transition>
    </template>

    <ul class="sm:flex list-none" :class="{ hidden: home.data.menu.length > 1 }">
      <li
        v-for="link in home.data.menu"
        :key="link.id"
        :class="{ underline: activeRoute(link) }"
        class="pl-4"
      >
        <prismic-link :field="link.page">
          {{ $prismic.asText(getTitle(link)) }}
        </prismic-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import linkResolver from '~/plugins/prismic/link-resolver'

export default {
  name: 'Navigation',
  async fetch () {
    this.home = await this.$prismic.api.getSingle('home')

    this.links = await Promise.all(this.home.data.menu.map(menuItem => {
      return this.$prismic.api.getByID(menuItem.page.id)
    }))
  },
  data () {
    return {
      menuOpen: false,
      home: null,
      links: null
    }
  },
  methods: {
    getTitle (doc) {
      return this.links.find(l => l.id === doc.page.id).data.title
    },
    activeRoute (doc) {
      return this.$route.path === linkResolver(doc.page)
    },
    toggleMenu () {
      this.menuOpen = !this.menuOpen
    }
  },
}
</script>

<style lang="postcss" scoped>
.navigation {
  @apply fixed left-0 top-0 px-4 py-2 w-full flex flex-row justify-between z-50;

  * {
    @apply cursor-pointer;
  }

  .home {
    @apply font-sans;
    vertical-align: top;
  }

  .about {
    @apply font-sans text-base;
  }

  .link:not(.home) {
    @apply inline-block;

    &.active {
      text-decoration: underline;
    }
  }
}

.hamburger {
  @apply px-3 py-0;
  transform: scale(0.7);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
