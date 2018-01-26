<template>
  <div class="music-detail-container">
    <div class="header">
      <div>
        <div class="place-holder">
          <img v-show="!singleInAjax" :src="music && music.cover" alt="">
        </div>
        <div class="play button"></div>
      </div>
    </div>
    <div class="article">
      <p class="music-info" v-html="music && `${music.title} · ${music.author.user_name}&nbsp;&nbsp;|&nbsp;&nbsp;${music.album}`"></p>
      <i class="icon-music-words"></i>
      <h1 v-html="music && music.story_title"></h1>
      <p class="author" v-html="music && `文 / ${music.author_list[0].user_name}`"></p>
      <div class="content" v-html="music && music.story"></div>
    </div>
    <loading v-show="singleInAjax"></loading>
  </div>
</template>

<style lang="stylus" scoped>
  .music-detail-container
    position relative

    .header
      height 356px
      position relative
      
      > div
        position absolute
        top -134px        
        left -186px
        width 490px
        height 490px
        background-color #ffffff
        box-shadow 0 0 20px 5px rgba(230, 230, 230, 0.6)
        border-radius 50%

        .place-holder
          position absolute
          top 18px
          left 18px
          width 454px
          height 454px
          border-radius 50%
          background-image url('../../assets/images/music-list-placeholder.png')
          background-size cover
          background-repeat no-repeat

          img
            width 100%
            height 100%
            border-radius 50%
      
      div.button
        position absolute
        top 50%
        left 50%
        margin -36px 0 0 -36px
        width 72px
        height 72px
        background-size 100% 100%

        &.play
          background-image url('../../assets/images/music-detail-play.png')

        &.pause
          background-image url('../../assets/images/music-detail-pause.png')

    .article
      margin 30px 20px 0

      .music-info
        color #333333
        font-size 14px
        text-align center
        margin-bottom 10px

      .icon-music-words
        color #333333
        font-size 14px
        display block
        text-align center
        margin-bottom 20px

      h1
        font-size 28px
        font-weight bold
        line-height 1.3
        text-align center

      .author
        font-size 14px
        margin 40px 0 30px
        text-align center

      .content
        line-height 26px
        color #333333
        font-size 16px
</style>

<style lang="stylus">
  .music-detail-container
    .content
      h2
        font-size 20px
        margin 30px 0

      p
        margin 10px 0
        text-align justify

      strong 
        font-weight bold

      .fr-ft-ns, .fr-pspace-a0
        font-size 14px
        margin 5px 0
</style>

<script>
import { mapState, mapActions } from 'vuex'
import Loading from 'base/loading/loading'

export default {
  data() {
    return {
      singleInAjax: true,
    }
  },
  computed: {
    ...mapState({
      music: state => state.music.detail,
    })
  },
  watch: {
    music(newValue) {
      if (newValue === undefined) {
        this.singleInAjax = true
      } else {
        this.singleInAjax = false
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm._getMusicDetail({
        id: to.params.id,
      })
    })
  },
  beforeRouteUpdate(to, from, next) {
    // 下部导航切换效果
    this._getMusicDetail({
      id: to.params.id,
    })

    next()
  },
  methods: {
    ...mapActions({
      _getMusicDetail: 'getMusicDetail',
    })
  },
  components: {
    Loading,
  },
}
</script>