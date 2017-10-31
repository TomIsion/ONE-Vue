function isPassive() {
  let supportsPassiveOption = false
  try {
    addEventListener('test', null, Object.defineProperty({}, 'passive', {
      get() {
        supportsPassiveOption = true
      },
    }))
  } catch (e) {}
  return supportsPassiveOption
}

const singlePassive = isPassive()
const scrollListener = e => e.preventDefault()

// 阻止全局滚动
const preventScroll = () => {
  // ref https://github.com/WICG/EventListenerOptions/pull/30
  document.addEventListener('touchmove', scrollListener, singlePassive ? {
    capture: false,
    passive: false,
  } : false)
}

// 允许全局滚动
const premitScroll = () => {
  document.removeEventListener('touchmove', scrollListener, singlePassive ? {
    capture: false,
    passive: false,
  } : false)
}

export { preventScroll, premitScroll, isPassive }