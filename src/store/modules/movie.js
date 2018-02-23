import { getMovieList, getMovieContentById, getPreviousAndNextId } from 'api/movie/movie'
import { getStorageInfo, saveStorageInfo } from 'common/js/utils'
import { dateFormat } from 'common/js/date'

const name = 'one_movie'
const date = dateFormat()

const mutationTypes = {
  BEGIN_GET_MOVIE: 'BEGIN_GET_MOVIE',
  APPEND_MOVIE_LIST: 'APPEND_MOVIE_LIST',
  GET_MOVIE_DETAIL: 'GET_MOVIE_DETAIL',
  CHANGE_MOVIE_DETAIL: 'CHANGE_MOVIE_DETAIL',
  SAVE_SCROLL_POSITION: 'SAVE_SCROLL_POSITION',
  LEAVE_DETAIL: 'LEAVE_DETAIL',
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
  [mutationTypes.GET_MOVIE_DETAIL](state) {
    state.detail = undefined
  },
  [mutationTypes.CHANGE_MOVIE_DETAIL](state, payload) {
    state.detail = payload
  },
  [mutationTypes.SAVE_SCROLL_POSITION](state, { scrollLeft, scrollTop }) {
    state.scrollLeft = scrollLeft
    state.scrollTop = scrollTop
  },
  [mutationTypes.LEAVE_DETAIL](state) {
    state.detail = undefined
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
  scrollLeft: 0,
  scrollTop: 0,
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
  async getDetailInfo({ state, commit }, id) {
    commit(mutationTypes.GET_MOVIE_DETAIL)

    const { htmlContent, arrSwiper, title, shareList } = await getMovieContentById(id)
    let nextId, prevId

    const item = state.list.find(item => item.id === id)

    if (item) {
      nextId = item.next_id
      prevId = item.previous_id
    } else {
      ({ nextId, prevId } = await getPreviousAndNextId(id))
    }

    commit(mutationTypes.CHANGE_MOVIE_DETAIL, {
      html_content: htmlContent,
      arr_swiper: arrSwiper,
      title: title,
      shareList,
      nextId,
      prevId,
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}