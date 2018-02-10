<template>
  <div id="app">
    <header-bar></header-bar>
    <router-view></router-view>
    <my-footer></my-footer>
  </div>
</template>

<script>
import HeaderBar from 'base/header/header'
import MyFooter from 'base/footer/footer'

export default {
  components: {
    HeaderBar,
    MyFooter,
  }
}
</script>

<style lang="stylus">
  html
  body
    width 100%
    height 100%

  #app
    width 100%
    height 100%

  .container
    padding-top 40px
    height 100%
    box-sizing border-box
    overflow-y scroll
</style>