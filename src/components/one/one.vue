<template>
  <div class="container">
    <ul ref="list">
      <li v-for="item in list" :key="item.id" @click="handleClickItem(item.id)">
        <p class="time">{{item.date}}</p>
        <p class="volume">{{item.title}}</p>
        <img :src="item.img_url" :alt="item.picture_author">
        <p class="author" v-html="item.picture_author"></p>
        <h4 v-html="item.content"></h4>
        <p class="source" v-html="item.text_authors"></p>
      </li>
    </ul>
    <loading v-show="singleInAjax"></loading>
  </div>
</template>

<script>
import { getOneListByPageIndex } from 'api/one/one'
import mixinScrollLoad from 'base/scroll-load/scroll-load'

export default {
  mixins: [mixinScrollLoad],
  name: 'one',
  methods: {
    _getListAjax: getOneListByPageIndex,
  },
}
</script>

<style lang="stylus" scoped>
  ul
    background-color #f6f6f6

    li
      background-color #ffffff
      margin-bottom 10px
      padding-bottom 30px
      box-shadow 0 0.0625em 0 0 rgba(230, 230, 230, 0.5)

      &:last-of-type
        margin-bottom 0

      .time
        color rgba(0, 0, 0, .6)
        font-size 20px
        line-height 22px
        text-align center
        padding-top 16px
        font-family 'Courier New'

      .volume, .source, .author
        margin-top 4px
        color #808080
        font-size 10px
        line-height 14px
        text-align center

      img 
        margin 10px 0
        width 100%

      .author
        margin-top 20px

      h4
        color rgba(0, 0, 0, .6)
        font-size 14px
        line-height 26px
        margin 20px 20px 18px

      .source
        margin-top 0
        margin 0 20px

  .slide-enter-active, .slide-leave-active
    transition all .3s ease

  .slide-enter, .slide-leave-to
    transform translate3d(0, 100%, 0)
    opacity 0
</style>
