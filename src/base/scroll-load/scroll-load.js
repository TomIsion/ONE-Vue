import { isPassive } from 'common/js/switchScroll'
import Loading from 'base/loading/loading'

const CONTAINER_NAME = 'scrollContainer'
const LIST_NAME = 'list'

const mixinScrollLoad = {
  mounted() {
    // this._getList({
    //   singleInit: true,
    // })

    this.$refs[CONTAINER_NAME].addEventListener('scroll', this._bindScroll, isPassive ? {
      capture: false,
      passive: false,
    } : false)
  },
  beforeDestroy() {
    this._removeHandleScroll()
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

      if (windowHeight + scrollHeight + windowHeight / 2 > listHeight && !this.singleInAjax) {
        this._getList({
          singleInit: false,
          index: this.list[this.list.length - 1].id,
        })
      }
    },
    _removeHandleScroll() {
      this.$refs[CONTAINER_NAME].removeEventListener('scroll', this._bindScroll, isPassive ? {
        capture: false,
        passive: false,
      } : false)
    },
  },
  components: {
    Loading,
  },
}

export default mixinScrollLoad