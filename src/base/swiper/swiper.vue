<template>
  <div class="swiper-wrapper">
    <ul
      class="swiper-items-container"
      ref="container"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <li
        v-for="(item, index) in imgs" :key="`${item}-${index}`"
        :class="{ active: index === 0 || imgs.length === 1 }"
        :style="{ 'background-image': `url(${item})` }"
        ref="items"
      >
      </li>
    </ul>
    <p class="title" v-html="title"></p>
  </div>
</template>

<script>
import { addClass, removeClass } from 'common/js/dom'

export default {
  props: {
    imgs: Array,
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      direction: 0,
      currentIndex: 0,
    }
  },
  watch: {
    direction(newDirection) {
      if (newDirection > 0) {
        // 向前翻页
        const beforeIndex = this.currentIndex - 1 === -1 ? this.$refs.items.length - 1 : this.currentIndex - 1
        addClass(this.$refs.items[beforeIndex], 'before')
      } else if (newDirection < 0) {
        // 向后翻页
        const afterIndex = this.currentIndex + 1 === this.$refs.items.length ? 0 : this.currentIndex + 1
        addClass(this.$refs.items[afterIndex], 'after')
      }
    },
  },
  created() {
    this.X = 0
    this._X = 0
    this.singleInTransition = false
  },
  mounted() {
    this._getWindowWidth()
    this._initSize()
  },
  methods: {
    handleTouchStart(e) {
      if (this.imgs.length === 1 || this.singleInTransition === true) {
        return false
      }

      this.X = e.touches[0].pageX
    },
    handleTouchMove(e) {
      if (this.imgs.length === 1 || this.singleInTransition === true) {
        return false
      }

      this._X = e.touches[0].pageX
      const dis = this._X - this.X
      this.direction = dis > 0 ? 1 : -1

      this.$refs.container.style.transform = `translate3d(${dis}px, 0, 0)`
    },
    handleTouchEnd(e) {
      if (this.imgs.length === 1 || this.singleInTransition === true) {
        return false
      }

      const dis = this._X - this.X

      if (Math.abs(dis) / this.windowWidth > 0.3) {
        // 可以滑动
        this.$refs.container.style.transition = `all ease 200ms`
        this.$refs.container.style.transform = `translate3d(${this.windowWidth * this.direction}px, 0, 0)`

        if (this.currentIndex - this.direction === -1) {
          this.currentIndex = this.$refs.items.length - 1
        } else if (this.currentIndex - this.direction === this.$refs.items.length) {
          this.currentIndex = 0
        } else {
          this.currentIndex = this.currentIndex - this.direction
        }
      } else {
        // 没有触发阈值
        this.$refs.container.style.transition = `all ease 200ms`
        this.$refs.container.style.transform = `translate3d(0, 0, 0)`
      }

      this._bindTransitionEnd()
    },
    _reset() {
      this.X = 0
      this._X = 0
      this.direction = 0
      removeClass(this.$refs.items, 'active before after')
      addClass(this.$refs.items[this.currentIndex], 'active')
      this.$refs.container.style.transition = ''
      this.$refs.container.style.transform = ''
    },
    _handleTransitionEnd() {
      this.singleInTransition = false
      this._reset()

      this.$refs.container.removeEventListener('transitionend', this._handleTransitionEnd)
    },
    _bindTransitionEnd() {
      this.singleInTransition = true

      this.$refs.container.addEventListener('transitionend', this._handleTransitionEnd)
    },
    _getWindowWidth() {
      this.windowWidth = window.innerWidth
    },
    _initSize() {
      this.$refs.container.style.width = `${this.windowWidth * 3}px`
      this.$refs.container.style.left = `-${this.windowWidth}px`
    },
  },
}
</script>

<style lang="stylus" scoped>
  .swiper-wrapper
    position relative
    overflow hidden

    > p
      position absolute
      bottom 10px
      width 100%
      text-align center
      color #ffffff
      font-size 12px

    .swiper-items-container
      height 100%
      position absolute
      top 0

      > li
        height 100%
        width 33.33333%
        background-color #000000
        background-size contain
        background-position center center
        position absolute
        left 0
        top 100%

        &.active
          left 33.33333%
          top 0

        &.before
          left 0
          top 0

        &.after
          left 66.66666%
          top 0
</style>


