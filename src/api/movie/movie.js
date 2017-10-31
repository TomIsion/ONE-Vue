import axios from 'axios'
// import { appParams } from '../config'

const listUrl = '/api/list'

export function getMovieListByPageIndex(index) {
  return axios.get(
    listUrl,
    {
      params: {
        type: 'movie',
        index,
      },
    }
  ).then(res => res.data)
}