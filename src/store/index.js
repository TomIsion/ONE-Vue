import Vue from 'vue'
import Vuex from 'vuex'
import movie from './modules/movie'
import footer from './modules/footer'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    movie,
    footer,
  }
})