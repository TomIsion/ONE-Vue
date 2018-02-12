import { isPassive } from './switchScroll'

export function setStyle(ele, objStyles) {

}

export function addClass(ele, className) {
  const beforeClassName = ele.className
  if (beforeClassName.indexOf(className) === -1) {
    ele.className = `${beforeClassName} ${className}`
  }
}

export function removeClass(ele, className) {
  const eles = ele.length === undefined ? [ele] : ele
  for (let i = 0; i < eles.length; i++) {
    const item = eles[i]
    const beforeClassName = item.className
    const reg = new RegExp(
      `[${className.split(/\s+/).map(item => `(?:\\s${item}\\s)`).join('')}]`,
      'g'
    )
    item.className = beforeClassName.replace(reg, ' ').replace(/\s+/, ' ')
  }
}

const supportPassive = isPassive()

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