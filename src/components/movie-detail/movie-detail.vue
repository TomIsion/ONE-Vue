<template>
  <div class="movie-details container">
    <article class="movie-details-container" v-html="content" ref="article"></article>
  </div>
</template>

<script>
import { getMovieDetailById } from 'api/movie/movie'

export default {
  data() {
    return {
      content: '',
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
        const regex = /(<div class="one-movie-header-box[\s\S]*?)(?=\s*<script)/
        this.content = regex.exec(res.data.html_content)[1]

        this.$nextTick(() => {
          this.articleImages = this.$refs.article.querySelectorAll('.one-gif')
          this._bindGif()
        })
      })
    },
  }
}
</script>

<style lang="stylus">
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

