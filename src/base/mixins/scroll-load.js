import { on, off } from 'common/js/dom'
import Loading from 'base/loading/loading'

const CONTAINER_NAME = 'scrollContainer'
const LIST_NAME = 'list'

const mixinScrollLoad = {
  mounted() {
    on(this.$refs[CONTAINER_NAME], 'scroll', this._bindScroll)
  },
  beforeDestroy() {
    off(this.$refs[CONTAINER_NAME], 'scroll', this._bindScroll)
  },
  methods: {
    handleClickItem(id) {
      this.$router.push({
        path: `/${this.$options.name}/${id}`
      })
    },
    _bindScroll() {
      const elementList = this.$refs[LIST_NAME]
      const windowHeight = window.innerHeight
      const scrollHeight = this.$refs[CONTAINER_NAME].scrollTop
      const listHeight = elementList.clientHeight + 40

      if (windowHeight + scrollHeight + windowHeight / 2 > listHeight && !this.loading) {
        this._getList({
          singleInit: false,
          index: this.list[this.list.length - 1].id,
        })
      }
    },
  },
  components: {
    Loading,
  },
}

export default mixinScrollLoad