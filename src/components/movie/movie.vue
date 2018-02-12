<template>
  <div class="container" ref="scrollContainer">
    <ul ref="list">
      <li v-for="item in list" :key="item.id" @click="handleClickItem(item.id)">
        <p class="type">- 影视 -</p>
        <h2 v-html="item.storytitle"></h2>
        <p class="author" v-html="`文 / ${item.user_name}`"></p>
        <div class="pic-placeholder">
          <div>
            <img v-lazy="item.detailcover" :alt="item.title">
          </div>
        </div>
        <dl>
          <dt v-html="item.officialstory"></dt>
          <dd v-html="`—— 关于《${item.title}》`"></dd>
        </dl>
        <p class="time">{{ dateFormat(item.maketime, 'YYYY/MM/DD') }}</p>
      </li>
    </ul>
    <loading v-show="singleInAjax"></loading>
  </div>
</template>

<script>
import mixinScrollLoad from 'base/mixins/scroll-load'
import mixinKeepScroll from 'base/mixins/keep-scroll'
import { dateFormat } from 'common/js/date'
import { mapActions, mapState, mapMutations } from 'vuex' 

export default {
  mixins: [mixinScrollLoad, mixinKeepScroll],
  name: 'movie',
  computed: {
    ...mapState('movie', {
      singleInAjax: state => state.loading,
    }),
    ...mapState('movie', [
      'list',
      'finished',
      'scrollTop',
      'scrollLeft',
    ])
  },
  created() {
    this.dateFormat = dateFormat

    if (this.list.length === 0) {
      this._getList()
    }
  },
  methods: {
    _getList() {
      this.getMovieInfo()
    },
    ...mapActions('movie', [
      'getMovieInfo',
    ]),
    ...mapMutations('movie', {
      _savePosition: 'SAVE_SCROLL_POSITION',
    }),
  },
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/func.stylus'

  ul
    background-color #f6f6f6

    li
      background-color #ffffff
      margin-bottom 10px
      padding-bottom 20px
      box-shadow 0 0.0625em 0 0 rgba(230, 230, 230, 0.5)

    &:last-of-type
      margin-bottom 0

      .type
        font-size 14px
        line-height 26px
        padding 10px 0 15px
        text-align center
        color rgba(0, 0, 0, .6)

      h2
        color #000000
        font-size 22px
        margin 0 20px
        line-height 31px
        overflow-text(2)

      .author
        font-size 16px
        line-height 30px
        margin 5px 20px 0
        color rgba(0, 0, 0, .6)
        overflow-text(1)
      
      .pic-placeholder
        padding 29px 0
        height 220px
        background-image url('../../assets/images/movie-item-bg.png')
        background-size cover

        > div
          height 200px
          position relative
          box-shadow rgba(230, 230, 230, 0.5) 0px 0px 5px 3px
          border-radius 4px
          overflow hidden
          margin 10px 20px

        img
          height 100%
          width auto
          position absolute
          left 50%
          transform translate3d(-50%, 0, 0)
      
      dl
        font-size 14px
        color rgba(0, 0, 0, .6)
        line-height 26px
        margin 10px 20px 0

        dt
          overflow-text(5)
        
        dd
          margin-top 3px
          text-align right
          overflow-text(1)

      .time
        font-size 12px
        margin 20px 20px 0
        color #808080
        line-height 18px
</style>
