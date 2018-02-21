const state = {
  nextId: 0,
  beforeId: 0,
  show: false,
  type: '',
}

const mutationTypes = {
  HIDE_FOOTER: 'HIDE_FOOTER',
  SET_FOOTER: 'SET_FOOTER',
}

const mutations = {
  [mutationTypes.HIDE_FOOTER](state) {
    state.show = false
  },
  [mutationTypes.SET_FOOTER](state, { nextId, beforeId, type }) {
    state.show = true
    state.nextId = nextId
    state.beforeId = beforeId
    state.type = type
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}