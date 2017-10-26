<template>
  <section>
    <header>
      <i class="icon-category" @click="handleNavClick"></i>
      <h1 v-html="defaultTitle"></h1>
      <i class="icon-search"></i>
    </header>
    <main-nav :singleShow="singleNavShow"></main-nav>
  </section>
</template>

<script>
import MainNav from 'base/nav/nav'

export default {
  data() {
    return {
      singleNavShow: 0,
    }
  },
  created() {
    this.defaultTitle = '一个'
  },
  methods: {
    handleNavClick() {
      this.singleNavShow = this.singleNavShow + 1
    }
  },
  components: {
    MainNav,
  },
}
</script>

<style lang="stylus" scoped>
@import '~common/css/variable.stylus'

section
  position fixed
  top 0
  left 0
  width 100%
  height 40px
  background-color #ffffff
  z-index $navIndex

  header
    height 40px
    line-height 40px
    color #333
    text-align center
    display flex
    flex-direction row
    flex-wrap nowrap
    justify-content space-between

    i 
      width 40px
      font-size 20px

      &.icon-category
        font-size 22px

    h1
      font-size 18px
</style>


