import axios from 'axios'

const listUrl = 'http://v3.wufazhuce.com:8000/api/movie/list/'
const detailUrl = 'http://v3.wufazhuce.com:8000/api/movie/detail/'
const detailStoryUrl = 'http://v3.wufazhuce.com:8000/api/movie/'
const contentUrl = 'http://v3.wufazhuce.com:8000/api/movie/htmlcontent/'

export function getMovieList(id = 0) {
  return axios.get(`${listUrl}${id}`)
    .then(res => res.data)
    .then(res => {
      if (res.res === 0) {
        if (res.data.length === 0) {
          return []
        } else {
          return Promise.all(res.data.map(item => getMovieListDetailById(item.id)))
            .then(res => res.filter(item => Object.keys(item).length > 0))
        }
      } else {
        return []
      }
    })
}

function getMovieListDetailById(id) {
  return Promise.all([
    axios.get(`${detailUrl}${id}`).then(res => res.data),
    axios.get(`${detailStoryUrl}${id}/story/1/0`).then(res => res.data),
  ]).then(res => {
    const obj = {}

    if (res[0].res === 0) {
      Object.assign(obj, res[0].data)
    }

    if (res[1].res === 0) {
      const objStory = res[1].data.data[0]

      obj.storytitle = objStory.title
      obj.content = objStory.content
      obj.praisenum = objStory.praisenum
      obj.user_name = objStory.user && objStory.user.user_name
    }

    return obj
  })
}

export function getMovieContentById(id) {
  return axios.get(`${contentUrl}${id}`)
    .then(res => res.data)
    .then(res => {
      if (res.res === 0) {
        const data = res.data
        // 正则获取文章正文
        const htmlContent = /(<div class="one-title-box"[\s\S]*?)(?=\s*<script)/.exec(data.html_content)[1]
        // 正则获取轮播图
        const arrSwiper = []
        const regSwiper = /class="swiper-slide" style="background-image:url\((.*?)(?=\)"\sdata-src)/g
        let temp
        while ((temp = regSwiper.exec(data.html_content))) {
          if (temp[1]) {
            arrSwiper.push(temp[1])
          }
        }

        return {
          htmlContent,
          arrSwiper,
        }
      } else {
        return {}
      }
    })
}