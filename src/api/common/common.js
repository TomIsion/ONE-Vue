import axios from 'axios'

const footerUrl = '/api/footer'

export function getFooterInfo(type, id) {
  return axios.get(
    footerUrl,
    {
      params: {
        type,
        id,
      }
    }
  ).then(res => res.data)
}