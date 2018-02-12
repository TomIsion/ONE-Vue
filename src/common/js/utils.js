export function getStorageInfo(name) {
  return window.localStorage
    ? window.localStorage.getItem(name)
      ? JSON.parse(window.localStorage.getItem(name))
      : null 
    : null
}

export function saveStorageInfo(name, value) {
  window.localStorage && window.localStorage.setItem(name, JSON.stringify(value))
}

/**
 * 函数节流
 * 单位时间内不会重复触发
 * @param {Function} fn 
 * @param {Number} timeout 
 */
export function throttle(fn, timeout) {
  let single = true
  let result

  return function(...args) {
    if (single) {
      single = false
      setTimeout(() => {
        single = true
        result = fn.apply(this, args)
      }, timeout)
    }
    return result
  }
}

/**
 * 函数防抖
 * 单位时间内连续触发只会失效最后一次
 * @param {Function} fn 
 * @param {Number} timeout 
 */
export function debunce(fn, timeout) {
  let timer = null
  let result

  return function(...args) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      result = fn.apply(this, args)
    }, timeout)

    return result
  }
}