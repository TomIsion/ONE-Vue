const testSupportPassive = () => {
  let support = false

  try {
    window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
      get() {
        support = true
      }
    }))
  } catch (e) {}

  return support
}

const supportPassive = testSupportPassive()

const css = (ele, name) => {
  // @to-check
  return typeof getComputedStyle === 'undefined'
    ? ele.style[name]
    : getComputedStyle(ele, null).getPropertyValue(name)
}

const on = (ele, event, cb, capture = false) => {
  ele.addEventListener(event, cb, supportPassive ? {
    capture,
    passive: true,
  } : capture)
}

const off = (ele, event, cb, capture = false) => {
  ele.removeEventListener(event, cb, supportPassive ? {
    capture,
    passive: true,
  } : capture)
}

export {
  css,
  on,
  off,
}