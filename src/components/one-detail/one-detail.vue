<template>
  <div class="one-details container">
    <div class="details-container">
      <div class="scroll-container">
        <img @load="handleImageLoad" :src="detailInfo.img" alt="">
        <div class="description clear">
          <span>{{ detailInfo.volume }}</span>
          <span v-html="detailInfo.anthor"></span>
        </div>
        <div class="time">
          <p class="day">{{ detailInfo.day }}</p>
          <p class="month">{{ detailInfo.month }}</p>
          <div class="sep-line"></div>
        </div>
        <div class="text" v-html="detailInfo.text"></div>
        <download></download>
      </div>
    </div>
  </div>
</template>

<script>
import Download from 'base/download/download'

import IScroll from 'iscroll'
import { dateFormat } from 'common/js/date'
import { preventScroll, premitScroll } from 'common/js/switchScroll' 
import { getOneDetailById } from 'api/one/one'

export default {
  data() {
    return {
      detailInfo: {},
    }
  },
  mounted() {
    preventScroll()
    this._getOneDetailById(this.$route.params.id)
  },
  beforeDestroy() {
    premitScroll()
  },
  methods: {
    handleImageLoad() {
      if (this.detailInfo.img) {
        // 初始化 IScroll
        new IScroll('.details-container', {
          mouseWheel: true,
        })
      }
    },
    _getOneDetailById(id) {
      const month2Eng = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

      getOneDetailById(id)
        .then(res => {
          if (res.res === 0) {
            const data = res.data

            this.detailInfo = {
              img: data.img_url,
              volume: data.volume,
              anthor: `${data.title} | ${data.pic_info}`,
              day: dateFormat(data.post_data, 'D'),
              month: `${month2Eng[dateFormat(data.post_data, 'M')]}. ${dateFormat(data.post_data, 'YYYY')}`,
              text: data.forward,
            }
          } else {

          }
        })
        .catch(err => console.log(err))
    }
  },
  components: {
    Download,
  },
}
</script>

<style lang="stylus" scoped>
  .one-details
    position fixed
    left 0
    top 0
    bottom 0
    right 0

  .details-container
    box-sizing border-box
    background-color #ffffff
    height 100%

    .scroll-container
      padding-bottom 150px

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


