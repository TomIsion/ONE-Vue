import axios from 'axios'
import { appParams } from '../config'

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

export function getMovieDetailById(id) {
  return axios.get(
    `http://v3.wufazhuce.com:8000/api/movie/htmlcontent/${id}`,
    {
      params: appParams,
    }
  ).then(res => res.data)
}