import * as MutationTypes from './mutation-types'
import { getMusicListByStep } from 'api/music/music'

export default {
  getMusicInfo(context, { page, pageIndex }) {
    context.commit(MutationTypes.GET_MUSIC_INFO)

    getMusicListByStep(page, pageIndex).then(res => {
      context.commit(MutationTypes.APPEND_MUSIC_INFO, res)
    })
  }
}