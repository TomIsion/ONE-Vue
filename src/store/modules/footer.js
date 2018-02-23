const state = {
  nextId: 0,
  prevId: 0,
  show: false,
  type: '',
  shareList: {},
}

const mutationTypes = {
  HIDE_FOOTER: 'HIDE_FOOTER',
  SET_FOOTER: 'SET_FOOTER',
}

const mutations = {
  [mutationTypes.HIDE_FOOTER](state) {
    state.show = false
    state.nextId = 0
    state.prevId = 0
    state.type = ''
    state.shareList = {}
  },
  [mutationTypes.SET_FOOTER](state, { nextId, prevId, type, shareList }) {
    state.show = true
    state.nextId = nextId
    state.prevId = prevId
    state.type = type
    state.shareList = shareList
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}