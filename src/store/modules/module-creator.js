import { getStorageInfo, saveStorageInfo } from 'common/js/utils'
import { dateFormat } from 'common/js/date'

const mutationTypes = {
  BEGIN_GET_LIST: 'BEGIN_GET_LIST',
  APPEND_LIST: 'APPEND_LIST',
  SET_DETAIL_ID: 'SET_DETAIL_ID',
  RESET_DETAIL: 'RESET_DETAIL',
  CHANGE_DETAIL: 'CHANGE_DETAIL',
  SAVE_SCROLL_POSITION: 'SAVE_SCROLL_POSITION',
}

const getInitInfo = () => {
  const info = getStorageInfo(name)

  if (info && dateFormat() === info.date) {
    return info.data
  } else {
    return []
  }
}

export function moduleCreator(localStorageName, api) {
  const state = {
    scrollLeft: 0,
    scrollTop: 0,
    loading: false,
    finished: false,
    list: getInitInfo(),
    detail: undefined,
    detailId: undefined,
  }

  const mutations = {
    [mutationTypes.BEGIN_GET_LIST](state) {
      state.loading = true
    },
    [mutationTypes.APPEND_LIST](state, payload) {
      state.loading = false

      if (payload.length === 0) {
        state.finished = true
      }

      state.list = [
        ...state.list,
        ...payload,
      ]
  
      // 每次数据变化保存到 localStorage 中
      saveStorageInfo(localStorageName, {
        date: dateFormat(),
        data: state.list,
      })
    },
    [mutationTypes.SET_DETAIL_ID](state, payload) {
      state.detailId = payload
    },
    [mutationTypes.RESET_DETAIL](state) {
      state.detail = undefined
      state.detailId = undefined
    },
    [mutationTypes.CHANGE_DETAIL](state, payload) {
      state.detail = payload
    },
    [mutationTypes.SAVE_SCROLL_POSITION](state, { scrollLeft, scrollTop }) {
      state.scrollLeft = scrollLeft
      state.scrollTop = scrollTop
    },
  }
  
  const actions = {
    async getListInfo({ state, commit }) {
      commit(mutationTypes.BEGIN_GET_LIST)

      const list = state.list
      const id = list.length === 0 ? 0 : list.pop().id
      const arr = await api.getList(id)

      commit(mutationTypes.APPEND_LIST, arr)
    },
    async getDetailInfo({ state, commit }, id) {
      if (id === state.detailId) {
        return
      }

      commit(mutationTypes.RESET_DETAIL)
      commit(mutationTypes.SET_DETAIL_ID, id)      

      const detail = await api.getDetail(id)

      commit(mutationTypes.CHANGE_DETAIL, {
        ...detail,
      })
    }
  }

  return {
    namespaced: true,
    state,
    actions,
    mutations,
  }
}