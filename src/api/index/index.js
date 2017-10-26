import axios from 'axios'
import { appParams } from '../config'

const indexUrl = 'http://v3.wufazhuce.com:8000/api/channel/one/0/地球'

export function getIndexInfo() {
  return axios.get(
    indexUrl,
    {
      params: appParams,
    },
  ).then(res => res.data)
}