import axios from 'axios'

let month = new Date().getMonth() + 1
let year = new Date().getFullYear()

const listUrl = 'http://v3.wufazhuce.com:8000/api/question/bymonth/'
const detailUrl = 'http://v3.wufazhuce.com:8000/api/question/'

async function getQuestionList() {
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

async function getQuestionDetail(id) {
  const data = await axios.get(`${detailUrl}${id}`)
    .then(res => res.data)
    .then(info => info.res === 0 ? info.data : {})
    .then(data => ({
      ...data,
      nextId: data.previous_id,
      prevId: data.next_id,
      shareList: data.share_list,
    }))
    .catch(() => {})

  return data
}

export default {
  getList: getQuestionList,
  getDetail: getQuestionDetail,
}