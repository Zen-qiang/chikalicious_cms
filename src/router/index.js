import Vue from 'vue'
import Router from 'vue-router'

// 登录页面
const Login = r => require.ensure([], () => r(require('@/pages/login')), 'login')
const Index = r => require.ensure([], () => r(require('@/pages/index')), 'index')
// 网站group
const Website = () => import(/* webpackChunkName: "website_group" */ '@/pages/website_group/website.vue')
const News = () => import(/* webpackChunkName: "website_group" */'@/pages/website_group/news.vue')
const aNews = () => import(/* webpackChunkName: "website_group" */'@/pages/website_group/aNews.vue')
const aStore = () => import(/* webpackChunkName: "website_group" */'@/pages/website_group/aStore.vue')
const Good = () => import(/* webpackChunkName: "website_group" */'@/pages/website_group/good.vue')
const websiteStore = () => import(/* webpackChunkName: "website_group" */'@/pages/website_group/store.vue')
const websiteIndex = () => import(/* webpackChunkName: "website_group" */'@/pages/website_group/index.vue')
const Aboutus = () => import(/* webpackChunkName: "website_group" */'@/pages/website_group/aboutus.vue')
const Contact = () => import(/* webpackChunkName: "website_group" */'@/pages/website_group/contact.vue')
// 商品
const Product = () => import(/* webpackChunkName: "goods" */'@/pages/goods/product.vue')
const ProductList = () => import(/* webpackChunkName: "goods" */'@/pages/goods/productList.vue')
const GoodMange = () => import(/* webpackChunkName: "goods" */'@/pages/goods/addGoods.vue')
const GoodClassify = () => import(/* webpackChunkName: "goods" */'@/pages/goods/goodClassify.vue')
const NewsMange = () => import(/* webpackChunkName: "goods" */'@/pages/goods/news.vue')
const AddNews = () => import(/* webpackChunkName: "goods" */'@/pages/goods/addNews.vue')
// 控制台
const Console = () => import(/* webpackChunkName: "controll" */'@/pages/controll/Controll.vue')
const ConChild = () => import(/* webpackChunkName: "controll" */'@/pages/controll/conChild.vue')
// 会员
const Vip = () => import(/* webpackChunkName: "vip" */'@/pages/vip/vip.vue')
const VipChild = () => import(/* webpackChunkName: "vip" */'@/pages/vip/vipchild.vue')
// 订单
const Order = () => import(/* webpackChunkName: "order" */'@/pages/order/order.vue')
const OrderMange = () => import(/* webpackChunkName: "order" */'@/pages/order/orderMange.vue')
const OrderDescrible = () => import(/* webpackChunkName: "order" */'@/pages/order/orderDescrible.vue')
// 厨房
const Kitchen = () => import(/* webpackChunkName: "kitchen" */'@/pages/kitchen/kitchen.vue')
const KitchenOrder = () => import(/* webpackChunkName: "kitchen" */'@/pages/kitchen/kitchenOrder.vue')
// 店铺
const Set = () => import(/* webpackChunkName: "store" */'@/pages/store/set.vue')
const storeAdd = () => import(/* webpackChunkName: "store" */'@/pages/store/storeAddress.vue')
const Store = () => import(/* webpackChunkName: "store" */'@/pages/store/store.vue')
// 统计
const Total = () => import(/* webpackChunkName: "statistics" */'@/pages/statistics/main.vue')
const Payment = () => import(/* webpackChunkName: "statistics" */'@/pages/statistics/account.vue')
const Sale = () => import(/* webpackChunkName: "statistics" */'@/pages/statistics/sale.vue')
const Quantity = () => import(/* webpackChunkName: "statistics" */'@/pages/statistics/quantity.vue')
const Buy = () => import(/* webpackChunkName: "statistics" */'@/pages/statistics/buy.vue')
// 管理员管理
const Mange = () => import(/* webpackChunkName: "mange" */'@/pages/mange/mange.vue')
const MangeChild = () => import(/* webpackChunkName: "mange" */'@/pages/mange/mangeChild.vue')
const AddMange = () => import(/* webpackChunkName: "mange" */'@/pages/mange/addMange.vue')
// 客服
const Service = () => import(/* webpackChunkName: "service" */'@/pages/service/Service.vue')
const ServiceChild = () => import(/* webpackChunkName: "service" */'@/pages/service/serviceChild.vue')
// 日志
const Daily = () => import(/* webpackChunkName: "daily" */'@/pages/daily/daily.vue')
const DailyChild = () => import(/* webpackChunkName: "daily" */'@/pages/daily/dailyChild.vue')
Vue.use(Router)

export default new Router({
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
      path: '/',
      name: 'Index',
      component: Index,
      redirect: to => {
        return '/console/conChild'
      },
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
              path: 'anews',
              name: 'aNews',
              component: aNews
            },
            {
              path: 'good',
              name: 'Good',
              component: Good
            },
            {
              path: 'websitestore',
              name: 'websiteStore',
              component: websiteStore
            },
            {
              path: 'astore',
              name: 'aStore',
              component: aStore
            },
            {
              path: 'website_index',
              name: 'websiteIndex',
              component: websiteIndex
            },
            {
              path: 'aboutus',
              name: 'Aboutus',
              component: Aboutus
            },
            {
              path: 'contact',
              name: 'Contact',
              component: Contact
            }
          ]
        },
        {
          path: 'product',
          name: 'Product',
          component: Product,
          children: [
            {
              path: 'productList',
              name: 'ProductList',
              component: ProductList
            },
            {
              path: 'goodMange',
              name: 'GoodMange',
              component: GoodMange
            },
            {
              path: 'goodClassify',
              name: 'GoodClassify',
              component: GoodClassify
            },
            {
              path: 'news',
              name: 'NewsMange',
              component: NewsMange
            },
            {
              path: 'addNews',
              name: 'AddNews',
              component: AddNews
            }
          ]
        },
        {
          path: 'console',
          name: 'Console',
          component: Console,
          children: [
            {
              path: 'conChild',
              name: 'ConChild',
              component: ConChild
            }
          ]
        },
        {
          path: 'vip',
          name: 'Vip',
          component: Vip,
          children: [
            {
              path: 'vipchild',
              name: 'VipChild',
              component: VipChild
            }
          ]
        },
        {
          path: 'order',
          name: 'Order',
          component: Order,
          children: [
            {
              path: 'orderMange',
              name: 'OrderMange',
              component: OrderMange
            },
            {
              path: 'orderDescrible',
              name: 'OrderDescrible',
              component: OrderDescrible
            }
          ]
        },
        {
          path: 'kitchen',
          name: 'Kitchen',
          component: Kitchen,
          redirect: to => {
            return '/Kitchen/kitchenOrder'
          },
          children: [
            {
              path: 'kitchenOrder',
              name: 'KitchenOrder',
              component: KitchenOrder
            }
          ]
        },
        {
          path: 'store',
          name: 'Store',
          component: Store,
          children: [
            {
              path: 'set',
              name: 'Set',
              component: Set
            },
            {
              path: 'store_add',
              name: 'storeAdd',
              component: storeAdd
            }
          ]
        },
        {
          path: 'total',
          name: 'Total',
          component: Total,
          children: [
            {
              path: 'paymment',
              name: 'Payment',
              component: Payment
            },
            {
              path: 'sale',
              name: 'Sale',
              component: Sale
            },
            {
              path: 'quantity',
              name: 'Quantity',
              component: Quantity
            },
            {
              path: 'buy',
              name: 'Buy',
              component: Buy
            }
          ]
        },
        {
          path: 'mange',
          name: 'Mange',
          component: Mange,
          children: [
            {
              path: 'mangeChild',
              name: 'MangeChild',
              component: MangeChild
            },
            {
              path: 'addMange',
              name: 'AddMange',
              component: AddMange
            }
          ]
        },
        {
          path: 'service',
          name: 'Service',
          component: Service,
          children: [
            {
              path: 'serviceChid',
              name: 'ServiceChild',
              component: ServiceChild
            }
          ]
        },
        {
          path: 'daily',
          name: 'Daily',
          component: Daily,
          children: [
            {
              path: 'dailyChild',
              name: 'DailyChild',
              component: DailyChild
            }
          ]
        }
      ]
    }
  ]
})
