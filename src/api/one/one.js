import axios from 'axios'

const oneListUrl = '/api/list'

export function getOneListByPageIndex(index) {
  return axios.get(
    oneListUrl,
    {
      params: {
        type: 'one',
        index,
      },
    }
  ).then(res => res.data)
}