<template>
  <div id="app">
    <header-bar></header-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderBar from 'base/header/header'

export default {
  components: {
    HeaderBar,
  }
}
</script>

<style lang="stylus">
  .container
    padding-top 40px
</style>