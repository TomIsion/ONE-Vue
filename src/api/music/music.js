import axios from 'axios'

/**
 * 音乐模块是 2016年1月 之后才开始有的
 * 所以年月需要控制到 2016 年 1 月之前，之后接口将会返回空列表
 */
const date = new Date()
let year = date.getFullYear()
let month = date.getMonth() + 1

// 获取音乐列表
const getMusicList = () => axios.get(
  `http://v3.wufazhuce.com:8000/api/music/bymonth/${year}-${month}`
)
.then(res => res.data)
.then(data => data.res === 0 ? data.data : undefined)
.then(arr => {
  month--

  if (month === 0) {
    month = 12
    year = year - 1
  }

  return arr
})

// 获取音乐详细信息异步
const getMusicDetail = item => axios.get(
  `http://v3.wufazhuce.com:8000/api/music/detail/${item.id}`
)
.then(res => res.data)
.then(data => data.res === 0 ? data.data : undefined)
.then(data => {
  if (data === undefined) {
    return undefined
  } else {
    const objMusicDetail = {
      listInfo: item,
      ...data,
    }

    return objMusicDetail
  }
})

export function getMusicListByStep() {
  if (year === 2015 && month === 12) {
    return Promise.resolve(undefined)
  } else {
    return getMusicList()
  }
}

export { getMusicDetail }