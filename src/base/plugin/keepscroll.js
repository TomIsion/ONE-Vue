import { on } from 'common/js/dom'

const ATTR_NAME = 'data-scroll-position'

const keepScroll = {
  install(Vue, options) {
    Vue.directive('keep-scroll-position', {
      inserted(el, binding, vnode) {
        on(el, 'scroll', e => {
          el.setAttribute(ATTR_NAME, `${el.scrollLeft}+${el.scrollTop}`)
        })

        vnode.context.$on('hook:activated', () => {
          let data = el.getAttribute(ATTR_NAME)
          if (data) {
            data = data.split('+')
            el.scrollLeft = data[0]
            el.scrollTop = data[1]
          }
        })
      },
    })
  }
}

export default keepScroll