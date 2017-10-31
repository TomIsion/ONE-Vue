import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index/index'
import Search from 'components/search/search'
import One from 'components/one/one'
import OneDetail from 'components/one-detail/one-detail'
import Article from 'components/article/article'
import Music from 'components/music/music'
import Movie from 'components/movie/movie'
import Apps from 'components/apps/apps'
import About from 'components/about/about'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
    {
      path: '/one/:id',
      name: 'one-detail',
      component: OneDetail,
    },
    {
      path: '/one',
      name: 'one',
      component: One,
    },
    {
      path: '/article',
      name: 'article',
      component: Article,
    },
    {
      path: '/music',
      name: 'music',
      component: Music,
    },
    {
      path: '/movie',
      name: 'movie',
      component: Movie,
    },
    {
      path: '/apps',
      name: 'apps-download',
      component: Apps,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    }
  ]
})
