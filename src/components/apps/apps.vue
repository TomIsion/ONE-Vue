<template>
  <div class="container" :style="{ height: `${leftHeight}px` }">
    <download class="detail"></download>
  </div>
</template>

<script>
import Download from 'base/download/download'

export default {
  data() {
    return {
      leftHeight: 'auto',
    }
  },
  created() {
    this.leftHeight = window.innerHeight - 40
  },
  components: {
    Download,
  },
}
</script>


<style lang="stylus" scoped>
  .container
    background-color #f6f6f6

    .detail
      margin-top 50%
</style>
