import * as MutationTypes from './mutation-types'
import { getMusicListByStep, getMusicDetail } from 'api/music/music'

export default {
  getMusicInfo(context, { singleInit }) {
    if (singleInit && context.state.music.info.length > 0) {
      // 什么都不做
    } else {
      context.commit(MutationTypes.GET_MUSIC_INFO)

      getMusicListByStep().then(res => {
        if (res === undefined) {
          context.commit(MutationTypes.NO_LEFT_MUSIC_INFO)
        } else {
          context.commit(MutationTypes.APPEND_MUSIC_INFO, res)      
        }
      })
    }
  },
  getMusicDetail(context, { id }) {
    context.commit(MutationTypes.CHANGE_MUSIC_DETAIL_ID)

    getMusicDetail({ id })
      .then(
        data => context.commit(MutationTypes.SET_MUSIC_DETAIL, data)
      )
  },
}