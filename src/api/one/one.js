import axios from 'axios'
import { appParams } from '../config'

const listUrl = '/api/list'

export function getOneListByPageIndex(index) {
  return axios.get(
    listUrl,
    {
      params: {
        type: 'one',
        index,
      },
    }
  ).then(res => res.data)
}

export function getOneDetailById(id) {
  return axios.get(
    `http://v3.wufazhuce.com:8000/api/hp/feeds/${id}/%E5%9C%B0%E7%90%83`,
    {
      params: appParams,
    }
  ).then(res => res.data)
}