const lazyLoad = {
  install(Vue, options) {
    const src = options || 'http://image.wufazhuce.com/list-paceholder.png'
    const arr = []

    const windowHeight = window.innerHeight

    window.addEventListener('scroll', e => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].single) {
        } else {
          if (arr[i].el.getBoundingClientRect().top < windowHeight * 1.5) {
            arr[i].single = true
            arr[i].el.setAttribute('src', arr[i].src)
          }
        }
      }
    })

    Vue.directive('lazy', {
      inserted(el, binding) {
        const top = el.getBoundingClientRect().top

        arr.push({
          el,
          src: binding.value,
          single: false,
        })
        
        if (top < windowHeight * 1.5) {
          el.setAttribute('src', binding.value)
        } else {
          el.setAttribute('src', src)
        }
      }
    })
  }
}

export default lazyLoad