import { isPassive } from 'common/js/switchScroll'
import Loading from 'base/loading/loading'

const mixinScrollLoad = {
  created() {
    this._getList()
    
    window.addEventListener('scroll', this._bindScroll, isPassive ? {
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
      const elementList = this.$refs.list
      const windowHeight = window.innerHeight
      const windowScrollHeight = window.scrollY
      const listHeight = elementList.clientHeight + 40

      if (windowHeight + windowScrollHeight + windowHeight / 2 > listHeight && !this.singleInAjax) {
        this._getList(this.list[this.list.length - 1].id)
      }
    },
    _removeHandleScroll() {
      window.removeEventListener('scroll', this._bindScroll, isPassive ? {
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