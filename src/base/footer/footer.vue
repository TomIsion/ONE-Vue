<template>
  <footer :style="{zIndex: show ? 101 : 99}" @scroll.stop.prevent="handleScroll">
    <div class="footer-container">
      <span>上一篇</span>
      <i class="icon-share" @click="handleShareClick"></i>
      <span>下一篇</span>
    </div>
    <transition name="fade">
      <div class="hover" v-show="show" @click="handleHoverClick"></div>
    </transition>
    <transition name="slide">
      <div class="share-container" v-show="show">
        <a target="_blank" :href="weiboUrl">
          <i class="icon-weibo"></i>
        </a>
        <a target="_blank" :href="kongjianUrl">
          <i class="icon-kongjian"></i>
        </a>
        <a target="_blank" :href="qqUrl">
          <i class="icon-qq"></i>
        </a>
        <a>
          <i class="icon-wechat"></i>
        </a>
      </div>
    </transition>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    }
  },
  props: {
    text: String,
    title: String,
    image: String,
    url: String,
  },
  computed: {
    weiboUrl() {
      return `http://service.weibo.com/share/share.php?url=http%3A%2F%2Fweibo.com%2Fp%2F100404157874&title=${this.text}&pic=${this.image}&appkey=1156389752`
    },
    kongjianUrl() {
      return `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=${this.text}&title=${this.title}&url=${this.url}&pics=${this.image}&otype=share`
    },
    qqUrl() {
      return `http://connect.qq.com/widget/shareqq/index.html?desc=&summary=${this.text}&title=${this.title}&url=${this.url}&pics=${this.image}`
    },
  },
  methods: {
    handleShareClick() {
      this.show = true
    },
    handleHoverClick() {
      this.show = false
    },
    handleScroll() {
      console.log(111)
    },
  },
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/variable.stylus'

  footer
    position fixed
    left 0
    bottom 0
    width 100%
    height 50px

    .footer-container
      box-shadow 0px 2px 4px rgba(0, 0, 0, .5)
      display flex
      justify-content space-between
      color #333333
      font-size 16px
      background-color rgba(255, 255, 255, .9)
      
      span 
        display inline-block
        width 100px
        line-height 50px
        text-align center

      i 
        font-size 20px
        line-height 50px
    
    .hover
      position fixed
      top 0
      left 0
      bottom 0
      right 0
      background-color rgba(255, 255, 255, .5)
    
    .share-container
      position absolute
      left 0
      bottom 0
      width 100%
      height 85px
      padding-top 10px
      box-sizing border-box
      display flex
      justify-content space-around
      background-color #ffffff

      > a
        width 66px
        height 66px
        line-height 63px
        font-size 35px
        text-align center
        box-sizing border-box
        border 1px solid #ffffff
        border-radius 50%

        &:nth-of-type(1)
          border-color #ff763b
          color #ff763b

        &:nth-of-type(2)
          border-color #febe3d
          color #febe3d
          font-size 45px
          line-height 60px
        
        &:nth-of-type(3)
          border-color #56b6e7
          color #56b6e7
          font-size 43px
          line-height 55px
        
        &:nth-of-type(4)
          border-color #7bc549
          color #7bc549
          font-size 35px

  .fade-enter-active, .fade-leave-active
    transition all .3s

  .fade-enter, .fade-leave-to
    opacity 0

  .slide-enter-active, .slide-leave-active
    transition all .3s ease

  .slide-enter, .slide-leave-to
    transform translate3d(0, 100%, 0)
    opacity 0
</style>