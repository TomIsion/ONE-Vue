import { on, off } from 'common/js/dom'

const CONTAINER_NAME = 'scrollContainer'

const mixinKeepScroll = {
  mounted() {
    this.$refs[CONTAINER_NAME].scrollLeft = this.scrollLeft || 0    
    this.$refs[CONTAINER_NAME].scrollTop = this.scrollTop || 0

    on(this.$refs[CONTAINER_NAME], 'scroll', this._rememberPosition)
  },
  activated() {
    this.$refs[CONTAINER_NAME].scrollLeft = this.scrollLeft || 0    
    this.$refs[CONTAINER_NAME].scrollTop = this.scrollTop || 0
  },
  beforeDestroy() {
    off(this.$refs[CONTAINER_NAME], 'scroll', this._rememberPosition)
  },
  methods: {
    _rememberPosition(event) {
      // @todos
      // 这里需要做节流
      this._savePosition({scrollLeft: event.currentTarget.scrollLeft, scrollTop: event.currentTarget.scrollTop})
    },
  },
}

export default mixinKeepScroll