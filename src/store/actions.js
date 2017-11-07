import * as MutationTypes from './mutation-types'
import { getMusicListByStep, getMusicDetail } from 'api/music/music'

export default {
  getMusicInfo(context, { page, pageIndex }) {
    context.commit(MutationTypes.GET_MUSIC_INFO)

    getMusicListByStep(page, pageIndex).then(res => {
      context.commit(MutationTypes.APPEND_MUSIC_INFO, res)
    })
  },
  getMusicDetail(context, { id }) {
    context.commit(MutationTypes.CHANGE_MUSIC_DETAIL_ID)

    if (context.state.music.info.find(item => item.id === id)) {
      context.commit(
        MutationTypes.SET_MUSIC_DETAIL,
        context.state.music.info.find(item => item.id === id)
      )
    } else {
      getMusicDetail({ id })
        .then(
          data => context.commit(MutationTypes.SET_MUSIC_DETAIL, data)
        )
    }
  },
}