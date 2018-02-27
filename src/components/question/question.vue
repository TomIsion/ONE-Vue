<template>
  <div
    class="container"
    ref="scrollContainer">
    <ul ref="list">
      <li
        v-for="item in list"
        :key="item.question_id"      
        @click="handleClickItem(item.question_id)">
        <p class="time">
          {{dateFormat(item.question_makettime, 'YYYY / MM / DD')}}
        </p>  
        <dl class="ask">
          <dt v-html="getUserDescription(item.asker_list)"></dt>
          <dd>
            <p v-html="item.question_title"></p>
          </dd>
        </dl>
        <dl class="answer">
          <dt v-html="getUserDescription(item.author_list)"></dt>
          <dd>
            <p v-html="item.answer_content"></p>
          </dd>
        </dl>
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
  name: 'question',
  mixins: [mixinScrollLoad, mixinKeepScroll],
  computed: {
    ...mapState('question', ['loading', 'list', 'scrollTop', 'scrollLeft']),
  },
  created() {
    if (this.list.length === 0) {
      this._getList()
    }

    this.getUserDescription = arr => {
      if (arr.length === 0) {
        return '佚名：'
      } else if (arr.length === 1) {
        return `${arr[0].user_name}${arr[0].wb_name ? `<i>${arr[0].wb_name}</i>` : ''}：`
      } else {
        return `${arr[0].user_name}${arr[0].wb_name ? `<i>${arr[0].wb_name}</i>` : ''} 等：`
      }
    }

    this.dateFormat = dateFormat
  },
  methods: {
    _getList() {
      this.getListInfo()
    },
    ...mapActions('question', ['getListInfo']),
    ...mapMutations('question', {
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
    padding 0 25px 10px 30px
    box-shadow 0 0.0625em 0 0 rgba(230, 230, 230, 0.5)

    .time
      color rgba(0, 0, 0, .6)
      font-size 20px
      line-height 22px
      text-align center
      padding-top 16px
      font-family 'Courier New'
      margin-bottom 20px

    dl
      margin-bottom 18px
      width 80%
      position relative

      &:after
        content "“"
        position absolute
        color rgba(0, 0, 0, .6)
        font-size 30px
        top -6px
        left -20px

      dt
        font-size 12px
        color #808080
        line-height 18px
        margin-bottom 5px

      dd
        font-size 14px
        color rgba(0, 0, 0, .6)
        line-height 20px

      &.answer
        margin-left 20%
        text-align right

        &:after
          content "”"
          right -15px
          left auto
</style>


