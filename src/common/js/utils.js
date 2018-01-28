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