import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('components/index/index'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('components/search/search'),
    },
    {
      path: '/one/:id',
      name: 'one-detail',
      component: () => import('components/one/one'),
    },
    {
      path: '/one',
      name: 'one',
      component: () => import('components/one-detail/one-detail'),
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('components/article/article'),
    },
    {
      path: '/music/:id',
      name: 'music-detail',
      component: () => import('components/music-detail/music-detail'),
    },
    {
      path: '/music',
      name: 'music',
      component: () => import('components/music/music'),
    },
    {
      path: '/movie/:id',
      name: 'movie-detail',
      component: () => import('components/movie-detail/movie-detail'),
    },
    {
      path: '/movie',
      name: 'movie',
      component: () => import('components/movie/movie'),
    },
    {
      path: '/apps',
      name: 'apps-download',
      component: () => import('components/apps/apps'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('components/about/about'),
    }
  ],
})

router.beforeResolve((to, from, next) => {
  // 判断是前往终页
  const reg = new RegExp(`/(.+)/(\\d+)`)
  const result = reg.exec(to.path)

  if (!result) {
    next()
  } else {
    const name = result[1]
    const id = result[2]

    if (name && id !== undefined) {
      store.dispatch(`${name}/getDetailInfo`, id).then(() => next())
    } else {
      next()
    }
  }
})

export default router
