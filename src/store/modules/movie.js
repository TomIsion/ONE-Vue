import { getMovieList } from 'api/movie/movie'
import { getStorageInfo, saveStorageInfo } from 'common/js/utils'
import { dateFormat } from 'common/js/date'

const name = 'one_movie'
const date = dateFormat()

const mutationTypes = {
  BEGIN_GET_MOVIE: 'BEGIN_GET_MOVIE',
  APPEND_MOVIE_LIST: 'APPEND_MOVIE_LIST',
}

const mutations = {
  [mutationTypes.BEGIN_GET_MOVIE](state) {
    state.loading = true
  },
  [mutationTypes.APPEND_MOVIE_LIST](state, payload) {
    state.loading = false

    if (payload.length === 0) {
      state.finished = true
    }

    state.list = [
      ...state.list,
      ...payload,
    ]

    // 每次数据变化保存到 localStorage 中
    saveStorageInfo(name, {
      date,
      data: state.list,
    })
  },
}

const getInitInfo = () => {
  const info = getStorageInfo(name)

  if (info && date === info.date) {
    return info.data
  } else {
    return []
  }
}

const state = {
  loading: false,
  finished: false,
  list: getInitInfo(),
  detail: undefined,
}

const actions = {
  getMovieInfo({ state, commit }, payload) {
    commit(mutationTypes.BEGIN_GET_MOVIE)

    const list = state.list
    const id = list.length === 0 ? 0 : list[list.length - 1].id

    getMovieList(id).then(arr => {
      commit(mutationTypes.APPEND_MOVIE_LIST, arr)
    })
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}