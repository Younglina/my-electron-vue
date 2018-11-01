import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Home').default,
      children: [
        {
          path: '/page/findMusic/:name',
          component: require('@/pages/find/findMusic').default,
          children: [
            {
              path: 'recommend',
              component: require('@/pages/find/find_childs/Recommend').default,
            }
          ]
        },
      ]
    },
    
    {
      path: '*',
      redirect: '/'
    }
  ]
})
