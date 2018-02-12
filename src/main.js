import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App'
import router from './router'
import store from './store/index'

import lazyLoad from 'base/plugin/lazyload'
import keepScroll from 'base/plugin/keepscroll'

import 'common/css/index.stylus'

sync(store, router)

Vue.config.productionTip = false
Vue.use(lazyLoad)
Vue.use(keepScroll)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
