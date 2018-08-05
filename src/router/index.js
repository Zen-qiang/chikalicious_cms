import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// 登录页面
const Login = r => require.ensure([], () => r(require('@/pages/login')), 'login')
const Index = r => require.ensure([], () => r(require('@/pages/index')), 'index')
// 网站group
const Website = () => import(/* webpackChunkName: "group-website" */ '@/pages/website_group/website.vue')
const News = () => import(/* webpackChunkName: "group-website" */ '@/pages/website_group/news.vue')
const Product = () => import(/* webpackChunkName: "group-website" */ '@/pages/website_group/product.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
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
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'website',
          name: 'Website',
          component: Website,
          children: [
            {
              path: 'news',
              name: 'News',
              component: News
            },
            {
              path: 'product',
              name: 'Product',
              component: Product
            }
          ]
        }
      ]
    }
  ]
})
