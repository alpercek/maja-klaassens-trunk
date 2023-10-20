import pr from '~/plugins/prismic/queries'

export const state = () => ({
  // Add the keys of single types if you wanna get them
  cv: null,
  home: null,
  multiple: []
})

export const actions = {
  async GET_SINGLE ({ commit }, type) {
    commit('SET_SINGLE', {
      data: await pr.getSingleton(type),
      type
    })
  },
  async GET_SINGLE_REPEATABLE ({ commit }, config) {
    commit('SET_SINGLE', await pr.getSingleRepeatable(config.type, config.uid))
  },
  async GET_REPEATABLE ({ commit }, type) {
    commit('SET_MULTIPLE', {
      data: await pr.getRepeatable(type),
      type
    })
  }
}

export const mutations = {
  SET_SINGLE (state, data) {
    state[data.type] = data.data
  },
  SET_MULTIPLE (state, data) {
    state[`${data.type}s`] = data.data
  }
}
