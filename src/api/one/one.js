import axios from 'axios'

let month = new Date().getMonth() + 1
let year = new Date().getFullYear()

const listUrl = 'http://v3.wufazhuce.com:8000/api/hp/bymonth/'
const detailUrl = 'http://v3.wufazhuce.com:8000/api/hp/feeds/'
const footerUrl = '/api/footer'

async function getOneList() {
  const data = await axios.get(`${listUrl}${year}-${month}`)
    .then(res => res.data)
    .then(info => info.res === 0 ? info.data : [])
    .catch(() => [])

  month = month - 1

  if (month === 0) {
    year = year - 1
    month = 12
  }

  return data
}

async function getOneDetail(id) {
  const data = await Promise.all([
    getOneFooter(id),
    await axios.get(`${detailUrl}${id}`)
      .then(res => res.data)
      .then(info => info.res === 0 ? info.data : undefined)
      .catch(() => undefined)
  ]).then(([objFooter, objDetail]) => ({
    ...objFooter,
    ...objDetail,
  }))

  return data
}

async function getOneFooter(id) {
  const footer = await axios.get(footerUrl, {
    params: {
      type: 'one',
      id,
    }
  }).then(res => res.data)

  return footer
}

export default {
  getList: getOneList,
  getDetail: getOneDetail,
}