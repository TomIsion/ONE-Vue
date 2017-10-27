<template>
  <div class="container">
    <ul>
      <li>
        <p class="time"></p>
        <p class="volume"></p>  
        <img src="" alt="">
        <p class="author"></p>
        <h4></h4>
        <p class="source"></p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getOneListByPageIndex } from 'api/one/one'

export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this._getOneList()
  },
  methods: {
    _getOneList(index = 0) {
      getOneListByPageIndex(index)
        .then(res => {
          if (res.res === 0) {
            console.log(res.data)
          }
        })
    }
  },
}
</script>

<style lang="stylus" scoped>
  ul
    li
      .time
        color rgba(0, 0, 0, .6)
        font-size 20px
        line-height 22px
        text-align center
        padding-top 16px
        font-family 'Courier New'

      .volume, .source
        margin-top 4px
        color #808080
        font-size 10px
        line-height 14px
        text-align center

      img 
        margin 10px 0
        width 100%

      .author
        margin 20px 20px 18px
        line-height 26px
        font-size 14px
        color rgba(0, 0, 0, .6)

      .source
        margin-top 0
        margin 0 20px
</style>
