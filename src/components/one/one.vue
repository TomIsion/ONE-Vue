<template>
  <div
    class="container"
    ref="scrollContainer">
    <ul ref="list">
      <li
        v-for="item in list"
        :key="item.hpcontent_id"
        @click="handleClickItem(item.hpcontent_id)">
        <p class="time">
          {{dateFormat(item.date, 'YYYY / MM / DD')}}
        </p>
        <p class="volume">{{item.hp_title}}</p>
        <img
          v-lazy="item.hp_img_original_url"
          :alt="item.hp_author">
        <p class="author" v-html="item.hp_author"></p>
        <h4 v-html="removeAuthor(item.hp_content)"></h4>
        <p class="source" v-html="item.text_authors"></p>
      </li>
    </ul>
    <loading v-show="loading"></loading>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import mixinScrollLoad from 'base/mixins/scroll-load'
import mixinKeepScroll from 'base/mixins/keep-scroll'
import { dateFormat } from 'common/js/date'

export default {
  name: 'one',  
  mixins: [mixinScrollLoad, mixinKeepScroll],
  computed: {
    ...mapState('one', ['loading', 'list', 'scrollTop', 'scrollLeft']),
  },
  created() {
    this.removeAuthor = val => val.replace(/[from|by].+?$/g, '')
    this.dateFormat = dateFormat
    
    if (this.list.length === 0) {
      this._getList()
    }
  },
  methods: {
    _getList() {
      this.getListInfo()
    },
    ...mapActions('one', ['getListInfo']),
    ...mapMutations('one', {
      _savePosition: 'SAVE_SCROLL_POSITION',
    }),
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
