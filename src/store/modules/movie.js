import { getMovieList, getMovieContentById } from 'api/movie/movie'
import { getStorageInfo, saveStorageInfo } from 'common/js/utils'
import { dateFormat } from 'common/js/date'

const name = 'one_movie'
const date = dateFormat()

const mutationTypes = {
  BEGIN_GET_MOVIE: 'BEGIN_GET_MOVIE',
  APPEND_MOVIE_LIST: 'APPEND_MOVIE_LIST',
  CHANGE_MOVIE_DETAIL: 'CHANGE_MOVIE_DETAIL',
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
  [mutationTypes.CHANGE_MOVIE_DETAIL](state, payload) {
    state.detail = state.list.find(item => item.id === `${payload}`)
  }
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
  getMovieInfo({ state, commit }) {
    commit(mutationTypes.BEGIN_GET_MOVIE)

    const list = state.list
    const id = list.length === 0 ? 0 : list[list.length - 1].id

    getMovieList(id).then(arr => {
      commit(mutationTypes.APPEND_MOVIE_LIST, arr)
    })
  },
  getDetailInfo({ state, commit }, id) {
    const item = state.list.find(ele => ele.id === `${id}`)

    if (item.html_content) {
      // 表示已经初始化过
      commit(mutationTypes.CHANGE_MOVIE_DETAIL, id)
      return Promise.resolve()
    } else {
      return getMovieContentById(id).then(data => {
        item.html_content = data.htmlContent
        item.arr_swiper = data.arrSwiper

        commit(mutationTypes.CHANGE_MOVIE_DETAIL, id)
        return Promise.resolve()
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}