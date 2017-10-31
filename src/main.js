import Vue from 'vue'
import App from './App'
import router from './router'

import LazyLoad from 'base/plugin/lazyload'

import 'common/css/index.stylus'

Vue.config.productionTip = false
Vue.use(LazyLoad)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
