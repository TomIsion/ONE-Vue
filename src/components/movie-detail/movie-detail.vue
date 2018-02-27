<template>
  <div class="movie-details container">
    <loading v-if="!detail"></loading>
    <template v-if="detail">
      <swiper
        class="swiper"
        :imgs="detail.arrSwiper"
        :title="detail.title"
      ></swiper>
      <article
        class="movie-details-container"
        ref="article" 
        v-html="detail.htmlContent">
      </article>
    </template>
  </div>
</template>

<script>
import Swiper from 'base/swiper/swiper'
import Loading from 'base/loading/loading'
import { mapState, mapMutations, mapActions } from 'vuex'
import store from 'store/index'
import { find } from 'common/js/dom'

export default {
  computed: {
    ...mapState('movie', ['detail']),
  },
  watch: {
    detail(newVal) {
      if (newVal) {
        // 初始化底部交互
        this.setFooter({
          ...this.detail,
          type: this.type,
        })

        // 渲染页面
        this.$nextTick(() => {
          this.articleImages = find(this.$refs['article'], '.one-gif')
          this._bindGif()
        })
      }
    },
  },
  activated() {
    const path = this.$route.path

    const reg = new RegExp(`/(.+)/(\\d+)`)
    const result = reg.exec(path)

    if (result) {
      const type = result[1]      
      const id = result[2]

      if (type && id) {
        this.type = type
        this.getDetailInfo(id)
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch('movie/getDetailInfo', to.params.id)

    next()
  },
  beforeRouteUpdate(to, from, next) {
    // 切换上一篇、下一篇
    this.hideFooter()
    this.getDetailInfo(to.params.id)
    next()
  },
  deactivated() {
    this.leaveDetail()
    this.hideFooter()
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
      Array.prototype.forEach.call(
        this.articleImages,
        ele => ele.addEventListener('click', this._changeSrc)
      )
    },
    ...mapMutations('footer', {
      setFooter: 'SET_FOOTER',
      hideFooter: 'HIDE_FOOTER',
    }),
    ...mapMutations('movie', {
      leaveDetail: 'RESET_DETAIL',
    }),
    ...mapActions('movie', ['getDetailInfo']),
  },
  components: {
    Swiper,
    Loading,
  }
}
</script>

<style lang="stylus">
  .swiper
    height 210px

  article.movie-details-container
    padding-bottom 50px


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