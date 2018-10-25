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
const ProductAdd = () => import(/* webpackChunkName: "group-cake" */ '../pages/cake/product_add.vue')
// 零食 [零食分类 各地区零食管理 各地区首页管理]
const SnacksClassify = () => import(/* webpackChunkName: "group-snacks" */ '../pages/snacks/snacksClassify.vue')
const SnacksManage = () => import(/* webpackChunkName: "group-snacks" */ '../pages/snacks/snacksManage.vue')
const SnacksHomepages = () => import(/* webpackChunkName: "group-snacks" */ '../pages/snacks/snacksHomepages.vue')
// 订单
const CakeOrders = () => import(/* webpackChunkName: "group-order" */ '../pages/order/cakeOrders.vue')
const SnackOrders = () => import(/* webpackChunkName: "group-order" */ '../pages/order/snackOrders.vue')
const KitchenOrders = () => import(/* webpackChunkName: "group-order" */ '../pages/order/kitchenOrders.vue')
const OrderDetail = () => import(/* webpackChunkName: "group-order" */ '../pages/order/orderDetail.vue')
// 店铺
const ShopList = () => import(/* webpackChunkName: "group-order" */ '../pages/shop/shopList.vue')
const ShopRegionManage = () => import(/* webpackChunkName: "group-order" */ '../pages/shop/shopRegionManage.vue')
// 会员
const MemberManage = () => import(/* webpackChunkName: "group-order" */ '../pages/merber/memberManage.vue')
// 统计
const PlatFromSaleCount = () => import(/* webpackChunkName: "group-order" */ '../pages/count/platFromSaleCount.vue')
const ShopSaleCount = () => import(/* webpackChunkName: "group-order" */ '../pages/count/shopSaleCount.vue')
const CakeSaleCount = () => import(/* webpackChunkName: "group-order" */ '../pages/count/cakeSaleCount.vue')
const SnackSaleCount = () => import(/* webpackChunkName: "group-order" */ '../pages/count/snackSaleCount.vue')
const MerberSaleCount = () => import(/* webpackChunkName: "group-order" */ '../pages/count/merberSaleCount.vue')
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
            title: '蛋糕分类',
            requiresAuth: true
          }
        },
        {
          path: '/CakeManage',
          name: 'CakeManage',
          component: CakeManage,
          meta: {
            title: '各地区蛋糕管理',
            requiresAuth: true
          }
        },
        {
          path: '/CakeHomepages',
          name: 'CakeHomepages',
          component: CakeHomepages,
          meta: {
            title: '各地区首页管理',
            requiresAuth: true
          }
        },
        {
          path: '/CakeNews',
          name: 'CakeNews',
          component: CakeNews,
          meta: {
            title: '新闻管理',
            requiresAuth: true
          }
        },
        {
          path: '/CakeManage/ProductAdd',
          name: 'ProductAdd',
          component: ProductAdd,
          meta: {
            title: '保存商品'
          }
        },
        {
          path: '/CakeNews/CakeNewsAdd',
          name: 'CakeNewsAdd',
          component: CakeNewsAdd,
          meta: {
            title: '添加新闻',
            requiresAuth: true
          },
          alias: '/CakeNews/CakeNewsAdd/:id'
        },
        // 零食
        {
          path: '/snacksClassify',
          name: 'SnacksClassify',
          component: SnacksClassify,
          meta: {
            title: '零食分类',
            requiresAuth: true
          }
        },
        {
          path: '/snacksManage',
          name: 'SnacksManage',
          component: SnacksManage,
          meta: {
            title: '各地区零食管理',
            requiresAuth: true
          }
        },
        {
          path: '/snacksHomepages',
          name: 'SnacksHomepages',
          component: SnacksHomepages,
          meta: {
            title: '各地区首页管理',
            requiresAuth: true
          }
        },
        // 订单
        {
          path: '/CakeOrders',
          name: 'CakeOrders',
          component: CakeOrders,
          meta: {
            title: '蛋糕订单管理',
            requiresAuth: true
          }
        },
        {
          path: '/SnackOrders',
          name: 'SnackOrders',
          component: SnackOrders,
          meta: {
            title: '零食订单管理',
            requiresAuth: true
          }
        },
        {
          path: '/KitchenOrders',
          name: 'KitchenOrders',
          component: KitchenOrders,
          meta: {
            title: '厨房订单管理',
            requiresAuth: true
          }
        },
        {
          path: '/CakeOrders/CakeOrderDetail',
          name: 'CakeOrderDetail',
          component: OrderDetail,
          meta: {
            title: '订单详情',
            requiresAuth: true
          }
        },
        {
          path: '/SnackOrders/SnackOrderDetail',
          name: 'SnackOrderDetail',
          component: OrderDetail,
          meta: {
            title: '订单详情',
            requiresAuth: true
          }
        },
        {
          path: '/KitchenOrders/KitchenOrderDetail',
          name: 'KitchenOrderDetail',
          component: OrderDetail,
          meta: {
            title: '订单详情',
            requiresAuth: true
          }
        },
        // 店铺
        {
          path: '/ShopList',
          name: 'ShopList',
          component: ShopList,
          meta: {
            title: '店铺地址管理',
            requiresAuth: true
          }
        },
        {
          path: '/ShopRegionManage',
          name: 'ShopRegionManage',
          component: ShopRegionManage,
          meta: {
            title: '店铺地区管理',
            requiresAuth: true
          }
        },
        // 会员
        {
          path: '/MemberManage',
          name: 'MemberManage',
          component: MemberManage,
          meta: {
            title: '会员管理',
            requiresAuth: true
          }
        },
        // 统计
        {
          path: '/CakeSaleCount',
          name: 'CakeSaleCount',
          component: CakeSaleCount,
          meta: {
            title: '蛋糕销量情况',
            requiresAuth: true
          }
        },
        {
          path: '/SnackSaleCount',
          name: 'SnackSaleCount',
          component: SnackSaleCount,
          meta: {
            title: '零食销量情况',
            requiresAuth: true
          }
        },
        {
          path: '/ShopSaleCount',
          name: 'ShopSaleCount',
          component: ShopSaleCount,
          meta: {
            title: '店铺销量统计',
            requiresAuth: true
          }
        },
        {
          path: '/MerberSaleCount',
          name: 'MerberSaleCount',
          component: MerberSaleCount,
          meta: {
            title: '会员销量统计',
            requiresAuth: true
          }
        },
        {
          path: '/PlatFromSaleCount',
          name: 'PlatFromSaleCount',
          component: PlatFromSaleCount,
          meta: {
            title: '平台收支情况',
            requiresAuth: true
          }
        }
      ]
    }
  ]
})
