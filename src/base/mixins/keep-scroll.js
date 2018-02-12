import { on, off } from 'common/js/dom'
import { debunce } from 'common/js/utils'

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
      if (!this._debunceFunc) {
        this._debunceFunc = debunce(this._savePosition, 100) 
      }

      const currentTarget = event.currentTarget
      this._debunceFunc({ scrollLeft: currentTarget.scrollLeft, scrollTop: currentTarget.scrollTop })
    },
  },
}

export default mixinKeepScroll