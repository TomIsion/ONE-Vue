import { GET_MUSIC_INFO, APPEND_MUSIC_INFO } from './mutation-types'

export default {
  [GET_MUSIC_INFO] (state) {
    state.music.loading = true
  },
  [APPEND_MUSIC_INFO] (state, payload) {
    state.music = {
      loading: false,
      info: [
        ...state.music.info,
        ...payload,
      ]
    }
  }
}