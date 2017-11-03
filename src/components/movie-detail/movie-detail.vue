<template>
  <div class="movie-details container">
    <swiper
      class="swiper"
      :imgs="swiper.imgs"
      :title="swiper.title"
    ></swiper>
    <article class="movie-details-container" v-html="content" ref="article"></article>
    <loading
      v-if="singleLoading"
    ></loading>
  </div>
</template>

<script>
import Swiper from 'base/swiper/swiper'
import Loading from 'base/loading/loading'

import { getMovieDetailById } from 'api/movie/movie'

export default {
  data() {
    return {
      content: '',
      swiper: {
        imgs: [],
        title: '',
      },
      singleLoading: true,
    }
  },
  created() {
    this.articleImages = []
  },
  mounted() {
    this._getMovieDetailById(this.$route.params.id)
  },
  beforeDestory() {
    this._removeGif()
  },
  methods: {
    _changeSrc(event) {
      const ele = event.currentTarget

      if (!ele.getAttribute('replace')) {
        ele.setAttribute('src', ele.getAttribute('data-gif-src'))
        ele.setAttribute('replace', '1')
      }
    },
    _bindGif() {
      Array.prototype.forEach.call(this.articleImages, ele => {
        ele.addEventListener('click', this._changeSrc)
      })
    },
    _removeGif() {
      Array.prototype.forEach.call(this.articleImages, ele => {
        ele.removeAddEventListener('click', this._changeSrc)
      })
    },
    _getMovieDetailById(id) {
      getMovieDetailById(id).then(res => {
        // 正则获取影视正文
        const regContent = /(<div class="one-title-box"[\s\S]*?)(?=\s*<script)/
        this.content = regContent.exec(res.data.html_content)[1]

        // 正则获取 swiper 图片背景
        const regSwiperImgs = /class="swiper-slide" style="background-image:url\(([\S]*)(?=\)"\sdata-src)/g
        let _arr
        const arrSwiperImage = []
        while (
          (_arr = regSwiperImgs.exec(res.data.html_content)) !== null
        ) {
          arrSwiperImage.push(_arr[1])
        }

        // 正则获取相关影视名称
        const regMovieName = /class="one-movie-swipe-title">([\s\S]*?)(?=<\/span>)/
        const strMovieName = regMovieName.exec(res.data.html_content)[1].trim()

        this.swiper = {
          title: strMovieName,
          imgs: arrSwiperImage,
        }

        this.$nextTick(() => {
          this.articleImages = this.$refs.article.querySelectorAll('.one-gif')
          this._bindGif()

          this.singleLoading = false
        })
      })
    },
  },
  components: {
    Loading,
    Swiper,
  }
}
</script>

<style lang="stylus">
  .swiper
    height 210px

  article.movie-details-container
    .one-movie-header-box
      height 210px

    .one-title-box
      margin 30px 20px 0
      line-height 40px
      font-size 28px
      font-weight bold
      color #000000

    .one-simple-author-box
      font-style 14px
      margin 40px 20px 30px
      line-height 32px
      text-align center

    .one-content-box
      margin 0 20px
      line-height 26px
      margin-bottom 80px

      p
        margin-bottom 20px
        line-height 26px
        font-size 16px

      @media (-webkit-min-device-pixel-ratio: 2) and (max-device-width: 667px) and (min-device-width: 375px)
        p
          font-size 18px
          font-weight 300
          line-height 30px

      strong
        font-weight bold

      i
        font-style italic

      .one-img-container-no-note
        margin-bottom 15px

      img
        width 100%

    .one-editor-box, .one-copyright-box
      color #808080
      font-style oblique
      margin 20px
      font-size 12px
</style>

