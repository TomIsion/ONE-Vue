<template>
  <div id="app">
    <header-bar></header-bar>
    <router-view></router-view>
    <transition name="slide">
      <my-footer v-show="showFooter"></my-footer>
    </transition>
  </div>
</template>

<script>
import HeaderBar from 'base/header/header'
import MyFooter from 'base/footer/footer'

export default {
  computed: {
    showFooter() {
      return !!this.$route.params.id
    },
  },
  components: {
    HeaderBar,
    MyFooter,
  }
}
</script>

<style lang="stylus">
  .container
    padding-top 40px
</style>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition all .2s ease

  .slide-enter, .slide-leave-to
    transform translate3d(0, 100%, 0)
    opacity 0
</style>
