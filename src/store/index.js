import Vue from 'vue'
import Vuex from 'vuex'
import one from './modules/one'
import movie from './modules/movie'
import question from './modules/question'
import music from './modules/music'
import footer from './modules/footer'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    one,
    movie,
    question,
    music,
    footer,
  }
})