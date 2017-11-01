<template>
  <div class="container">
    <ul ref="list">
      <li v-for="item in list" :key="item.item_id" @click="handleClickItem(item.item_id)">
        <p class="type">- 影视 -</p>
        <h2 v-html="item.title"></h2>
        <p class="author" v-html="`文 / ${item.author.user_name}`"></p>
        <div class="pic-placeholder">
          <div>
            <img v-lazy="item.img_url" :alt="item.subtitle">
          </div>
        </div>
        <dl>
          <dt v-html="item.forward"></dt>
          <dd v-html="`—— 关于《${item.subtitle}》`"></dd>
        </dl>
        <p class="time">{{ dateFormat(item.post_date, 'YYYY/MM/DD') }}</p>
      </li>
    </ul>
    <loading v-show="singleInAjax"></loading>
  </div>
</template>

<script>
import { getMovieListByPageIndex } from 'api/movie/movie'
import mixinScrollLoad from 'base/scroll-load/scroll-load'
import { dateFormat } from 'common/js/date'

export default {
  mixins: [mixinScrollLoad],
  name: 'movie',
  created() {
    this.dateFormat = dateFormat
  },
  methods: {
    _getListAjax: getMovieListByPageIndex,
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
          overflow-text(2)
        
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
