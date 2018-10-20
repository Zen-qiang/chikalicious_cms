import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('../pages/login/login.vue')
const Index = () => import('../pages/index/index.vue')
// 蛋糕 [蛋糕分类 各地区蛋糕管理 各地区首页管理 新闻管理]
const CakeClassify = () => import(/* webpackChunkName: "group-cake" */ '../pages/cake/cakeClassify.vue')
const CakeManage = () => import(/* webpackChunkName: "group-cake" */ '../pages/cake/cakeManage.vue')
const CakeHomepages = () => import(/* webpackChunkName: "group-cake" */ '../pages/cake/cakeHomepages.vue')
const CakeNews = () => import(/* webpackChunkName: "group-cake" */ '../pages/cake/cakeNews.vue')
const CakeNewsAdd = () => import(/* webpackChunkName: "group-cake" */ '../pages/cake/cakeNews_add.vue')
// 零食 [零食分类 各地区零食管理 各地区首页管理]
const SnacksClassify = () => import(/* webpackChunkName: "group-snacks" */ '../pages/snacks/snacksClassify.vue')
const SnacksManage = () => import(/* webpackChunkName: "group-snacks" */ '../pages/snacks/snacksManage.vue')
const SnacksHomepages = () => import(/* webpackChunkName: "group-snacks" */ '../pages/snacks/snacksHomepages.vue')
// 订单
const CakeOrders = () => import(/* webpackChunkName: "group-order" */ '../pages/order/cakeOrders.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      redirect: '/CakeClassify',
      children: [
        // 蛋糕
        {
          path: '/CakeClassify',
          name: 'CakeClassify',
          component: CakeClassify,
          meta: {
            title: '蛋糕分类'
          }
        },
        {
          path: '/CakeManage',
          name: 'CakeManage',
          component: CakeManage,
          meta: {
            title: '各地区蛋糕管理'
          }
        },
        {
          path: '/CakeHomepages',
          name: 'CakeHomepages',
          component: CakeHomepages,
          meta: {
            title: '各地区首页管理'
          }
        },
        {
          path: '/CakeNews',
          name: 'CakeNews',
          component: CakeNews,
          meta: {
            title: '新闻管理'
          }
        },
        {
          path: '/CakeNews/CakeNewsAdd',
          name: 'CakeNewsAdd',
          component: CakeNewsAdd,
          meta: {
            title: '添加新闻'
          },
          alias: '/CakeNews/CakeNewsAdd/:id'
        },
        // 零食
        {
          path: '/snacksClassify',
          name: 'SnacksClassify',
          component: SnacksClassify,
          meta: {
            title: '零食分类'
          }
        },
        {
          path: '/snacksManage',
          name: 'SnacksManage',
          component: SnacksManage,
          meta: {
            title: '各地区零食管理'
          }
        },
        {
          path: '/snacksHomepages',
          name: 'SnacksHomepages',
          component: SnacksHomepages,
          meta: {
            title: '各地区首页管理'
          }
        },
        // 订单
        {
          path: '/CakeOrders',
          name: 'CakeOrders',
          component: CakeOrders,
          meta: {
            title: '订单管理'
          }
        }
      ]
    }
  ]
})
