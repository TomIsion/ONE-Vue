<template>
  <div
    class="container"
    ref="scrollContainer">
    <div ref="list">
      <dl
        v-for="item in list"
        :key="item.id"
        @click="handleClickItem(item.id)">
        <dt>
          <p class="sub">- 音乐 -</p>
          <h2 v-html="item.story_title"></h2>
          <p class="author" v-html="`文 / ${item.author_list[0].user_name}`"></p>
        </dt>
        <dd>
          <div class="cover">
            <div>
              <i v-if="item.music_id.indexOf('wufazhuce') === -1" class="icon-xiami"></i>
              <img class="music-cover" src="../../assets/images/music-list-placeholder.png" v-lazy="item.cover" alt="">
              <img class="circle" src="../../assets/images/circle-btn.png" alt="">
            </div>
          </div>
          <p class="music" v-html="item.title"></p>
          <p class="sub-title" v-html="`—— ${item.album}`"></p>
        </dd>
      </dl>
    </div>
    <loading v-show="loading"></loading>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import mixinScrollLoad from 'base/mixins/scroll-load'
import mixinKeepScroll from 'base/mixins/keep-scroll'

export default {
  name: 'music',
  mixins: [mixinScrollLoad, mixinKeepScroll],
  computed: {
    ...mapState('music', ['loading', 'list', 'scrollTop', 'scrollLeft']),
  },
  created() {
    if (this.list.length === 0) {
      this._getList()
    }
  },
  methods: {
    _getList() {
      this.getListInfo()
    },
    ...mapActions('music', ['getListInfo']),
    ...mapMutations('music', {
      _savePosition: 'SAVE_SCROLL_POSITION',
    }),
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/func.stylus'

  .container
    background-color #f6f6f6

  dl
    background-color #ffffff
    margin-bottom 10px
    box-shadow 0 0.0625em 0 0 rgba(230, 230, 230, 0.5)

    dt
      .sub
        color rgba(0, 0, 0, .6)
        line-height 22px
        font-size 12px
        padding 9px 0 13px
        text-align center
      
      h2
        font-size 18px
        line-height 26px
        margin 0 20px
        max-height 52px
        overflow-text(2)

      .author
        color rgba(0, 0, 0, .6)
        margin 0 20px
        line-height 26px
        font-size 13px
        padding 9px 0 13px

    dd
      padding-bottom 20px

      .cover
        height 205px
        margin 9px 0
        background-image url('../../assets/images/music-list-right.png')
        background-size contain
        background-repeat no-repeat
        background-position top right
        position relative

        > div
          height 100%
          margin-right 60px
          position relative
          border-radius 0 100px 100px 0
          box-shadow 0 0 0.625em 0.125em rgba(230, 230, 230, 0.5)

          .music-cover
            height 193px
            width 193px
            border-radius 50%
            position absolute
            top 6px
            right 6px

          .circle
            position absolute
            top 83px
            right 83px
            width 38px
            height 38px

          i
            position absolute
            bottom 6px
            left 20px
            color #ff5100
            font-size 22px

      .music
        font-size 12px
        color #808080
        line-height 17px
        margin 20px 20px 0
        overflow-text(1)

      .sub-title
        color rgba(0, 0, 0, .6)
        line-height 22px
        font-size 12px
        margin 3px 20px 0
        overflow-text(2)

      .time
        font-size 12px
        color #808080
        line-height 17px
        margin 0 20px
        padding 21px 0 30px
</style>
