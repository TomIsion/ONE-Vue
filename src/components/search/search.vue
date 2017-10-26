<template>
  <div class="search-container">
    <header>
      <i class="icon-close"></i>
      <i class="icon-search"></i>      
      <input type="text" placeholder="输入作者或者标题关键字">
    </header>
    <main>
      <ul>
        <li></li>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
@import '~common/css/variable.stylus'

.search-container
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  display flex
  flex-direction column
  background-color #ffffff
  z-index $searchIndex

  header
    height 40px
    box-sizing border-box
    padding 0 5px 0 15px
    display flex
    flex-direction row-reverse
    color #333

    i 
      width 40px
      height 40px
      line-height 40px
      display inline-block
      text-align center
      font-size 20px

      &.icon-close
        font-size 22px

      &.icon-search
        color #00b7ee

    input 
      font-size 15px
      flex-grow 1
      outline 0
      color #333

  main
    background-color rgba(37, 37, 37, .5)
    flex-grow 1
</style>