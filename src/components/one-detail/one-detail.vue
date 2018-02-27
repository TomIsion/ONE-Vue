<template>
  <div class="one-details container">
    <div class="details-container" v-if="detail">
      <img :src="detail.img_url" alt="">
      <div class="description clear">
        <span>{{ detail.volume + detail.item_id }}</span>
        <span v-html="detail.title + ' | ' + detail.pic_info"></span>
      </div>
      <div class="time">
        <p class="day">{{ dateFormat(detail.post_date, 'DD') }}</p>
        <p class="month">{{ detail.post_date | formatTime }}</p>
        <div class="sep-line"></div>
      </div>
      <div class="text" v-html="detail.forward"></div>
      <download></download>
    </div>
    <loading v-if="!detail"></loading>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import store from 'store/index'
import Download from 'base/download/download'
import Loading from 'base/loading/loading'
import { dateFormat } from 'common/js/date'

export default {
  computed: {
    ...mapState('one', ['detail']),
  },
  watch: {
    detail(newVal) {
      if (newVal) {
        // 初始化底部交互
        this.setFooter({
          ...this.detail,
          shareList: this.detail.share_list,
          type: this.type,
        })
      }
    },
  },
  created() {
    this.dateFormat = dateFormat
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
    // 从列表来终页时 可以预先加载数据
    store.dispatch('one/getDetailInfo', to.params.id)

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
  filters: {
    formatTime(val) {
      const month2Eng = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

      return `${month2Eng[dateFormat(val, 'M')]}. ${dateFormat(val, 'YYYY')}`
    },
  },
  methods: {
    ...mapActions('one', ['getDetailInfo']),
    ...mapMutations('one', {
      leaveDetail: 'RESET_DETAIL',
    }),
    ...mapMutations('footer', {
      setFooter: 'SET_FOOTER',
      hideFooter: 'HIDE_FOOTER',
    })
  },
  components: {
    Download,
    Loading,
  },
}
</script>

<style lang="stylus" scoped>
  .details-container
    background-color #ffffff
    padding-bottom 100px

    img 
      width 100%
    
    .description
      margin 10px 0 20px
      padding 0 20px
      font-size 13px
      height 32px
      line-height 32px
      overflow hidden

      > span 
        float left
        width 50%

        &:last-of-type
          text-align right
      
    .time
      .day
        font-size 48px
        line-height 48px
        font-family Serif 
        color #000000
        text-align center

      .month
        margin-bottom 10px
        font-size 14px
        text-align center
        line-height 32px
        color #000000

      .sep-line
        margin 20px auto
        width 30%
        height 1px
        background-color #eeeeee

    .text
      margin-bottom 40px
      padding 0 20px
      font-size 16px
      line-height 26px
      color #000000
</style>