import axios from 'axios'

const listUrl = 'http://v3.wufazhuce.com:8000/api/movie/list/'
const detailUrl = 'http://v3.wufazhuce.com:8000/api/movie/detail/'
const detailStoryUrl = 'http://v3.wufazhuce.com:8000/api/movie/'

let id = 0

export function getMovieList() {
  return axios.get(`${listUrl}${id}`)
    .then(res => res.data)
    .then(res => {
      if (res.res === 0) {
        if (res.data.length === 0) {
          return []
        } else {
          return Promise.all(res.data.map(item => getMovieDetailById(item.id)))
            .then(res => res.filter(item => Object.keys(item).length > 0))
        }
      } else {
        return []
      }
    })
}

function getMovieDetailById(id) {
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