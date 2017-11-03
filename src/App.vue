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
  .container
    padding-top 40px
</style>