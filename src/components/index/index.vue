<template>
  <div>
    <section
      class="full-section"
      ref="fullSection"
      :style="{ backgroundImage: `url(${fullSectionInfo.img})` }"
    >
      <div class="hover">
        <div class="info">
          <p class="day">{{ fullSectionInfo.day }}</p>
          <p class="line">{{ fullSectionInfo.volume }} | {{ fullSectionInfo.time }}</p>
          <p class="title" v-html="fullSectionInfo.title"></p>
        </div>
        <div class="icon-drop-container" @click.stop="handleDrop">
          <i class="icon-drop"></i>
        </div>
      </div>
    </section>
    <section class="list">
      <ul>
        <li
          v-for="item in listSectionInfo"
          :key="item.id"
        >
          <dl>
            <dt>
              <p class="highlight type" v-html="item.type"></p>
              <h1 v-html="item.title"></h1>
              <p class="author" v-if="item.author" v-html="item.author"></p>
            </dt>
            <dd>
              <p class="text" v-html="item.text"></p>
              <p class="highlight">阅读全文</p>
            </dd>
          </dl>
        </li>
      </ul>
    </section>
    <section>
      <img src="../../assets/images/rest.png" alt="" class="rest">
      <p>------ 没有更多内容啦，休息一下吧 ------</p>
    </section>
    <a class="backup" target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010502000462">
      <img src="../../assets/images/beian.png" alt="">
      <p>沪公网安备 31010502000462号</p>
    </a>
  </div>
</template>

<script>
import { getIndexInfo } from 'api/index/index'
import { dateFormat } from 'common/js/date'

export default {
  data() {
    return {
      fullSectionInfo: {},
      listSectionInfo: [],
    }
  },
  mounted() {
    this._getIndexInfo()
    this._setFullSection()
  },
  methods: {
    handleDrop() {
      window.scroll(0, this.windowHeight - 40)
    },
    _getIndexInfo() {
      getIndexInfo().then(res => {
        if (res.res === 0) {
          const data = res.data
          const fullSectionInfo = data.content_list[0]

          const month2Eng = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          const id2Type = ['图&nbsp;&nbsp;&nbsp;文', '阅&nbsp;&nbsp;&nbsp;读', '连&nbsp;&nbsp;&nbsp;载', '问&nbsp;&nbsp;&nbsp;答', '音&nbsp;&nbsp;&nbsp;乐', '影&nbsp;&nbsp;&nbsp;视']

          this.fullSectionInfo = {
            img: fullSectionInfo.img_url,
            volume: fullSectionInfo.volume,
            title: fullSectionInfo.forward,
            day: dateFormat(fullSectionInfo.date, 'D'),
            time: `${month2Eng[dateFormat(fullSectionInfo.date, 'M')]}. ${dateFormat(fullSectionInfo.date, 'YYYY')}`,
            id: fullSectionInfo.item_id,
          }

          this.listSectionInfo = data.content_list.splice(1, data.content_list.length - 1)
            .filter(item => item.category !== '8')
            .map(item => ({
              id: item.item_id,
              type: `${id2Type[item.category]} |`,
              title: item.title,
              text: item.forward,
              author: item.author.user_name ? `作者 / ${item.author.user_name}` : false,
            }))
        } else {

        }
      })
    },
    _setFullSection() {
      this.windowHeight = window.innerHeight
      this.$refs.fullSection.style.height = `${this.windowHeight}px`
    },
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/func.stylus'

  .full-section
    width 100%
    position relative
    background-size cover
    background-position center center
    background-repeat no-repeat

    .hover
      position absolute
      top 0
      right 0
      bottom 0
      left 0
      background linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8))

    .icon-drop-container
      position absolute
      left 0
      bottom 4px
      width 100%
      text-align center
      color #fff
      font-size 35px
      height 36px
      line-height 36px
    
    .info
      position absolute
      left 0
      bottom 38px
      width 100%
      color #ffffff
      box-sizing border-box
      padding 0 20px

      .day
        height 48px
        line-height 48px
        font-size 48px
        font-family Serif

      .line
        font-size 19px
        line-height 32px

      .title
        line-height 26px
        max-height 78px
        font-size 16px
        overflow-text(3)

  .list
    li
      padding 0 20px
      margin 20px 0 70px

      .highlight
        color #29a7e2

      dt
        .type
          font-size 13px
          line-height 32px
          height 32px

        h1
          font-size 28px
          color #000000
          font-weight bold
          line-height 1.4

        .author
          padding 0 20px
          color #000000
          font-size 13px
          line-height 32px

      dd
        .text
          margin-top 10px
          line-height 26px
          max-height 78px
          font-size 16px
          font-weight lighter
          overflow-text(3)

        .highlight
          height 32px
          line-height 32px
          margin-top 3px

  .rest
    width 43px
    height 44px
    margin 20px auto
    display block

    & + p
      color #c9c9c9
      font-size 14px
      line-height 24px
      margin-bottom 40px
      text-align center

  .backup
    padding 20px 0 30px
    text-align center
    display block

    img 
      width 20px
      height 20px
      display inline-block
      vertical-align text-bottom
      line-height 20px

    p
      margin-left 5px
      font-size 16px
      line-height 20px
      color #939393
      display inline-block
</style>
