<template>
  <img src="../../assets/images/ajax-loader.gif" alt="">
</template>

<style lang="stylus" scoped>
  @import '~common/css/variable.stylus'

  img 
    width 46px
    height 46px
    display block
    position fixed
    top 50%
    left 50%
    transform translate(-50%, -50%)
    opacity .28
    // z-index $searchIndex
</style>