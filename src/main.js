import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App'
import router from './router'
import store from './store/index'

import LazyLoad from 'base/plugin/lazyload'

import 'common/css/index.stylus'

sync(store, router)

Vue.config.productionTip = false
Vue.use(LazyLoad)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
