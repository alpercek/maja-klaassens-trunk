import Vue from 'vue'

const pages = {
  index: {
    title: 'Home'
  },
  about: {
    title: 'About'
  }
}

Vue.prototype.$metaForAll = (page) => {
  return pages[page]
}
