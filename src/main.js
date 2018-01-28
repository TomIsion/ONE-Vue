import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

import LazyLoad from 'base/plugin/lazyload'

import 'common/css/index.stylus'

Vue.config.productionTip = false
Vue.use(LazyLoad)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
