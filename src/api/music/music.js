import axios from 'axios'
import { appParams } from '../config'

let arr4Id

// 分页获取对应的数组
const splitArr = (arr, page, pageIndex) => {
  return arr.splice(page * pageIndex, page)
}

// 获取所有的音乐 id 数组
const getArr4Id = () => axios.get(
  'http://v3.wufazhuce.com:8000/api/all/list/4',
  {
    params: appParams,
  }
)
.then(res => res.data)
.then(res => {
  // 获取所有的 id 数组
  const htmlContent = res.html_content
  const reg4Id = /"list":\[(.*?)(?=\])/gm
  let temp

  const arrStrList = []
  while ((temp = reg4Id.exec(htmlContent))) {
    if (temp[1] !== undefined) {
      arrStrList.push(temp[1])
    }
  }
  const arrInfoList = `[${arrStrList.join(',')}]`
  return JSON.parse(arrInfoList)
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

    if (data.platform === '1') {
      // 判断音乐源是虾米音乐 需要获取真实的音乐地址
      return new Promise((resolve, reject) => {
        axios.get('/api/songs', {
          params: {
            id: data.music_id,
          }
        })
        .then(res => res.data)
        .then(data => {
          if (data.res === 0) {
            objMusicDetail.music_id = data.data
          }

          resolve(objMusicDetail)
        })
      })
    } else {
      return objMusicDetail
    }
  }
})

export function getMusicListByStep(page, pageIndex) {
  return new Promise((resolve, reject) => {
    if (!arr4Id) {
      getArr4Id().then(arr => {
        arr4Id = arr

        resolve(splitArr(arr4Id, page, pageIndex))
      })
    } else {
      resolve(splitArr(arr4Id, page, pageIndex))
    }
  }).then(arr => Promise.all(arr.map(item => getMusicDetail(item))))
}

export { getMusicDetail }