import { css, on, off } from 'common/js/dom'

const findScrollContainer = ele => {
  let parent = ele.parentElement

  while (parent) {
    if (!parent.parentElement) {
      break
    } else if (css(parent, 'overflow-y') === 'scroll' || css(parent, 'overflowY') === 'auto') {
      break
    } else {
      parent = parent.parentElement
    }
  }

  return parent
}

const lazyLoad = {
  install(Vue, options) {
    const src = (options && options.src) || 'http://image.wufazhuce.com/list-paceholder.png'

    Vue.directive('lazy', {
      inserted(el, binding) {
        // 找到滚动容器
        const domContainer = findScrollContainer(el)

        // 获得预加载的图片
        const ownLazySrc = el.getAttribute('src') || src
        el.setAttribute('src', ownLazySrc)

        const eventBind = event => _bind(event)
        eventBind._id = Math.random()
        
        const _bind = event => {
          // 滚动容器的高度
          // 滚动容器的上部距离
          // 当前元素的上部距离
          const heightContainer = domContainer.getBoundingClientRect().height
          const topContainer = domContainer.getBoundingClientRect().top
          const topCurrent = el.getBoundingClientRect().top

          if (topCurrent - topContainer < heightContainer * 1.6) {
            el.setAttribute('src', binding.value)

            off(domContainer, 'scroll', eventBind)
          }
        }

        on(domContainer, 'scroll', eventBind)

        eventBind()
      }
    })
  }
}

export default lazyLoad