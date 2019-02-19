import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/', 
      redirect: '/page/findMusic/index/recommend',
      name: 'home',
      component: require('../components/Home').default,
      children: [
        {
          path: '/page/findMusic/:name',
          component: require('../pages/find/findMusic').default,
          children: [
            {
              path: 'recommend',
              name: 'recommend',
              component: require('../pages/find/find_childs/Recommend').default,
            },
            {
              path: 'rank',
              name: 'rank',
              component: require('../pages/find/find_childs/Rank').default,
            },
            {
              path: 'musics',
              name: 'musics',
              component: require('../pages/find/find_childs/Musicpage').default,
            },
            {
              path: 'newest',
              name: 'newest',
              component: require('../pages/find/find_childs/Newest').default,
            }
          ]
        },
        {
          path: '/page/myLikes/:name',
          component: require('../pages/myLikes/myLike').default,
        },
        {
          path: '/page/my/:name',
          component: require('../pages/my/My').default,
        },
        {
          path: '/page/myInfo',
          name:'info',
          component: require('../pages/my/info').default,
        },
        {
          path: '/page/Playing',
          component: require('../pages/playing/Playing').default
        }
      ]
    },
    
    {
      path: '*',
      redirect: '/'
    }
  ]
})
