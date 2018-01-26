import * as MutationTypes from './mutation-types'

export default {
  [MutationTypes.GET_MUSIC_INFO] (state) {
    state.music.loading = true
  },
  [MutationTypes.APPEND_MUSIC_INFO] (state, payload) {
    state.music = {
      ...state.music,
      loading: false,
      info: [
        ...state.music.info,
        ...payload,
      ],
    }
  },
  [MutationTypes.NO_LEFT_MUSIC_INFO] (state) {
    state.music = {
      ...state.music,
      loading: false,
      finished: true,
    }
  },
  [MutationTypes.CHANGE_MUSIC_DETAIL_ID] (state) {
    state.music.detail = undefined
  },
  [MutationTypes.SET_MUSIC_DETAIL] (state, payload) {
    state.music.detail = payload
  },
}