const express = require('express')
const axios = require('axios')
const crawler = require('crawler')
const xmlreader = require('xmlreader')
const http = require('http')

const apiRoutes = express.Router()

const getCookie = (cookie, name) => cookie.replace(/\s/, '').split(';')
  .reduce((pre, cur) => {
    pre[cur.split('=')[0]] = cur.split('=')[1]
    return pre
  }, {})[name]

let _token = undefined
let PHPSESSID = undefined

apiRoutes.get('/api/list', function (request, response) {
  const path = request.path
  const params = request.query
  const type = params.type
  const index = params.index

  // 获取页面上的用户信息
  var c = new crawler({
    maxConnections: 10,
    callback: function (error, res, done) {
      if (error) {
        console.log(error)
      } else {
        if (!_token) _token = /One.token\s=\s\'(\w+)\'/.exec(res.body)[1]
        if (!PHPSESSID) PHPSESSID = getCookie(res.headers['set-cookie'][0], 'PHPSESSID')

        axios.get(
          `http://m.wufazhuce.com/${type}/ajaxlist/${index}`, {
            params: {
              _token,
            },
            headers: {
              Host: 'm.wufazhuce.com',
              Referer: 'http://m.wufazhuce.com',
              Cookie: `PHPSESSID=${PHPSESSID}`,
            },
          }
        )
        .then(res => {
          response.json(res.data)
        })
        .catch(err => console.log(err))
      }
      done()
    }
  })

  c.queue('http://m.wufazhuce.com/one')
})

apiRoutes.get('/api/footer', function (request, response) {
  const params = request.query
  const type = params.type
  const id = params.id

  var c = new crawler({
    maxConnections: 10,
    callback: function (error, res, done) {
      if (error) {
        console.log(error)
      } else {
        if (type === 'one') {
          const regPreviousId = /(?:dataSource\.previousPageUrl=["']{1}[^;\d]*)(\d*)(?=["']{1})/gm
          const regNextId = /(?:dataSource\.nextPageUrl=["']{1}[^;\d]*)(\d*)(?=["']{1})/gm
          const regBasicInfo = /(?:dataSource\.url=['"]{1})([^'"]*)[\s\S]*(?:dataSource\.title=['"]{1})([^'"]*)[\s\S]*(?:dataSource\.image_url=['"]{1})([^'"]*)/gm
          const regContent = /(?:dataSource\.content=['"]{1})([^'"]*)/gm
          const regSummary = /(?:dataSource\.summary=['"]{1})([^'"]*)/gm

          const objPreviousId = regPreviousId.exec(res.body)
          const objNextId = regNextId.exec(res.body)
          const objBasicInfo = regBasicInfo.exec(res.body)
          const objContent = regContent.exec(res.body)
          const objSummary = regSummary.exec(res.body)

          response.json({
            query: params,
            previousId: objPreviousId && objPreviousId[1],
            nextId: objNextId && objNextId[1],
            share: {
              url: objBasicInfo && objBasicInfo[1],
              title: objBasicInfo && objBasicInfo[2],
              content: objContent && objContent[1],
              summary: objSummary && objSummary[1],
              image: objBasicInfo && objBasicInfo[3],
            },
          })
        } else if (type === 'movie') {
          const regPreviousId = /(?:dataSource\.previousPageUrl = ["']{1}[^;\d]*)(\d*)(?=["']{1})/gm
          const regNextId = /(?:dataSource\.nextPageUrl = ["']{1}[^;\d]*)(\d*)(?=["']{1})/gm

          const objPreviousId = regPreviousId.exec(res.body)
          const objNextId = regNextId.exec(res.body)

          response.json({
            query: params,
            previousId: objPreviousId && objPreviousId[1],
            nextId: objNextId && objNextId[1],
          })
        }
      }
      done()
    }
  })

  c.queue(`http://m.wufazhuce.com/${type}/${id}`)
})

const toTxt = str => {
  const RexStr = /(&lt;|&gt;|&quot;|&#39;|&#039;|&amp;)/g
  return str.replace(
    RexStr,
    MatchStr => {
      switch (MatchStr) {
        case "&lt;":
          return "<"
          break
        case "&gt;":
          return ">"
          break
        case "&quot;":
          return '\"'
          break
        case "&#39;":
          return "'"
          break
        case "&#039;":
          return "'"
          break
        case "&amp;":
          return "&"
          break
        default:
          break
      }
    }
  )
}

const getMp3Location = str => {
  try {
    var a1 = parseInt(str.charAt(0)),
      a2 = str.substring(1),
      a3 = Math.floor(a2.length / a1),
      a4 = a2.length % a1,
      a5 = [],
      a6 = 0,
      a7 = '',
      a8 = ''
    for (; a6 < a4; ++a6) {
      a5[a6] = a2.substr((a3 + 1) * a6, (a3 + 1));
    }
    for (; a6 < a1; ++a6) {
      a5[a6] = a2.substr(a3 * (a6 - a4) + (a3 + 1) * a4, a3)
    }
    for (var i = 0, a5_0_length = a5[0].length; i < a5_0_length; ++i) {
      for (var j = 0, a5_length = a5.length; j < a5_length; ++j) {
        a7 += a5[j].charAt(i)
      }
    }
    a7 = decodeURIComponent(a7)
    for (var i = 0, a7_length = a7.length; i < a7_length; ++i) {
      a8 += a7.charAt(i) === '^' ? '0' : a7.charAt(i)
    }
    return a8
  } catch (e) {
    return false
  }

}

const parseArtist = track => {
  if (track.artist.hasOwnProperty('text')) {
    return toTxt(track.artist.text())
  } else if (track.artist_name.hasOwnProperty('text')) {
    return toTxt(track.artist_name.text())
  } else {
    return '未知艺术家'
  }
}

apiRoutes.get('/api/songs', function (request, response) {
  const params = request.query
  const id = params.id

  http.get(
    `http://www.xiami.com/song/playlist/id/${id}/object_name/default/object_id/0`,
    resp => {
      resp.setEncoding('utf8')

      let xml = ''

      resp.on('data', data => xml += data)
      resp.on('end', () => {
        xmlreader.read(xml, (err, res) => {
          if (err !== null) {
            response.json({
              res: 1,
              message: '服务器报错'
            })

            return
          }

          if (!res || !res.playlist) {
            response.json({
              res: 1,
              message: '没找到相关信息，该歌曲很可能已经从虾米下架'
            })

            return
          }

          const xiamiRealSong = {}

          xiamiRealSong.title = toTxt(res.playlist.trackList.track.title.text())
          xiamiRealSong.artist = parseArtist(res.playlist.trackList.track)
          xiamiRealSong.album = toTxt(res.playlist.trackList.track.album_name.text())
          xiamiRealSong.url = getMp3Location(res.playlist.trackList.track.location.text())

          if (typeof res.playlist.trackList.track.lyric_url.text !== 'undefined') {
            xiamiRealSong.lyricUrl = toTxt(res.playlist.trackList.track.lyric_url.text())
          } else {
            xiamiRealSong.lyricUrl = null
          }

          // 封面处理
          let cover
          let coverpath = res.playlist.trackList.track.pic.text()
          let coverReg = /http:\/\/[a-zA-Z0-9-.-\/-_]+.(jpg|jpeg|png|gif|bmp)/g
          let json

          // 正则替换小的封面为大封面
          if (coverReg.test(coverpath)) {
            coverpath.replace(coverReg, function (s, value) {
              cover = s.replace('_1', '')
            })
          }
          xiamiRealSong.cover = cover

          response.json({
            res: 0,
            data: xiamiRealSong,
          })
        })
      })
    }
  )
})

module.exports = apiRoutes
