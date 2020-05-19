import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/indexpage'
},
{
  path: '/login',
  component: () =>
      import ( /* webpackChunkName: "login" */ '../components/page/Login.vue'),
  meta: {
      title: '登录'
  }
},
{
  path: '/register',
  component:()=>
  import (/* webpackChunkName: "register" */'../components/page/Register.vue'),
  meta:{
    title:'注册'
  }
},
{
  path: '/404',
  component: () =>
  import (/* webpackChunkName: "404" */'../components/page/404.vue'),
  meta:{
    title:'404'
  }
},
{
  path: '/indexlayout',
  component: () =>
      import ( /* webpackChunkName: "indexlayout" */ '../components/common/IndexLayout.vue'),
  children: [{
          path: '/indexpage',
          component: () =>
              import ( /* webpackChunkName: "indexpage" */ '../components/page/IndexPage.vue'),
          meta: {
              title: '首页'
          }
      }
  ]
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
