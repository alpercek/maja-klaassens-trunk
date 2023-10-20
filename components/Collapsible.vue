<template>
  <div class="collapsible container" :class="{ open: open }">
    <span @click="toggle" class="header">
      <slot name="title" />
    </span>
    <transition @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave" name="accordion">
      <div v-show="open || alwaysOpen" class="collapsible">
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Collapsible',
  props: {
    alwaysOpen: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      open: false
    }
  },
  methods: {
    beforeEnter (el) {
      el.style.height = '0'
    },
    enter (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    beforeLeave (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    leave (el) {
      el.style.height = '0'
    },
    toggle () {
      this.open = !this.open
    }
  }
}
</script>

<style lang="postcss">
.collapsible {
  transition: 150ms ease-out;
  overflow: hidden;

  &.open {
    @apply mb-24;
  }

  &.container {
    margin-bottom: $size-2;
  }

  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: $size-2;
    cursor: pointer;

    .icon {
      width: $size-2;
      flex-basis: $size-2;
      flex-shrink: 0;
      text-align: center;
    }
  }
}
</style>
