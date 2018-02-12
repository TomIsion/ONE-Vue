<template>
  <div class="movie-details container">
    <swiper
      class="swiper"
      :imgs="detail.arr_swiper"
      :title="detail.title"
    ></swiper>
    <article class="movie-details-container" ref="article" v-html="detail.html_content">
    </article>
  </div>
</template>

<script>
import Swiper from 'base/swiper/swiper'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('movie', [
      'detail',
    ])
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
  },
  components: {
    Swiper,
  }
}
</script>

<style lang="stylus">
  .swiper
    height 210px

  article.movie-details-container
    .one-title-box
      margin 30px 20px 0
      line-height 40px
      font-size 28px
      font-weight bold
      color #000000

    .one-simple-author-box
      font-style 14px
      margin 20px 20px 30px
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

