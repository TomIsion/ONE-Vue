import axios from 'axios'

/**
 * 音乐模块是 2016年1月 之后才开始有的
 * 所以年月需要控制到 2016 年 1 月之前，之后接口将会返回空列表
 */
const date = new Date()
let year = date.getFullYear()
let month = date.getMonth() + 1

// 获取音乐列表
async function getMusicList () {
  const arr = await axios.get(
    `http://v3.wufazhuce.com:8000/api/music/bymonth/${year}-${month}`
  ).then(res => res.data)
    .then(data => data.res === 0 ? data.data : undefined)
    .then(arr => {
      month--
    
      if (month === 0) {
        month = 12
        year = year - 1
      }
    
      return arr
    })
    .catch(() => [])

  return arr
}

// 获取音乐详细信息异步
async function getMusicDetail (id) {
  const data = await axios.get(`http://v3.wufazhuce.com:8000/api/music/detail/${id}`)
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
  getList: getMusicList,
  getDetail: getMusicDetail,
}