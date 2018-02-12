<template>
  <div class="nav-menu">
    <div class="hover" v-show="singeInnerShow" @click="handleHoverClick"></div>
    <transition name="wipe">
      <nav v-show="singeInnerShow">
        <ul>
          <li
            v-for="item in router"
            :key="item.path"
            @click="handleNavClick(item.path)"
          >{{item.text}}</li>
        </ul>
      </nav>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      singeInnerShow: false,
    }
  },
  props: {
    singleShow: {
      type: Number,
    },
  },
  watch: {
    singleShow(singleNew) {
      this.singeInnerShow = singleNew
    }
  },
  created() {
    this.router = [
      {
        text: '图文',
        path: '/one',
      },
      {
        text: '阅读',
        path: '/article',
      },
      {
        text: '音乐',
        path: '/music',
      },
      {
        text: '影视',
        path: '/movie',
      },
      {
        text: 'App下载',
        path: '/apps',
      },
      {
        text: '关于',
        path: '/about',
      },
    ]
  },
  methods: {
    handleHoverClick() {
      this.singeInnerShow = false
    },
    handleNavClick(path) {
      this.singeInnerShow = false
      this.$router.push({ path })
    },
  },
}
</script>

<style lang="stylus" scoped>
  .hover
    position fixed
    top 0
    left 0
    bottom 0
    right 0

  nav 
    position fixed
    top 0
    left 0
    width 188px
    height 100%
    box-sizing border-box
    padding-top 30px
    background-color #ffffff
    box-shadow 5px 0 5px rgba(0, 0, 0, .15)

    li
      height 52px
      line-height 52px
      text-align center
      font-size 16px
      color rgba(0, 0, 0, 0.6)
      text-shadow none
      font-weight light

  .wipe-enter-active, .wipe-leave-active
    transition all ease 200ms

  .wipe-enter, .wipe-leave-to
    transform translate3d(-100%, 0, 0)
</style>


