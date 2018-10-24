export default [
  // {
  //   item: { title: '控制台' },
  //   subItems: [
  //     { label: '普通商品列表' },
  //     { label: '商品分类' },
  //     { label: '商品品牌' }
  //   ]
  // },
  // {
  //   item: { title: '操作日志' },
  //   subItems: [
  //     { label: '' }
  //   ]
  // },
  {
    item: { title: '蛋糕' },
    subItems: [
      { label: '蛋糕分类', path: '/CakeClassify', name: 'CakeClassify' },
      { label: '各地区蛋糕管理', path: '/CakeManage', name: 'CakeManage' },
      { label: '各地区首页管理', path: '/CakeHomepages', name: 'CakeHomepages' },
      { label: '新闻管理', path: '/CakeNews', name: 'CakeNews' },
      { label: '编辑新闻', path: '/CakeNews/CakeNewsAdd', name: 'CakeNewsAdd', children: true }
    ]
  },
  {
    item: { title: '零食' },
    subItems: [
      { label: '零食分类', path: '/SnacksClassify', name: 'SnacksClassify' },
      { label: '各地区零食管理', path: '/SnacksManage', name: 'SnacksManage' },
      { label: '各地区首页管理', path: '/SnacksHomepages', name: 'SnacksHomepages' }
    ]
  },
  {
    item: { title: '订单' },
    subItems: [
      { label: '蛋糕订单管理', path: '/CakeOrders', name: 'CakeOrders' },
      { label: '零食订单管理', path: '/SnackOrders', name: 'SnackOrders' },
      { label: '订单详情', path: '/CakeOrders/CakeOrderDetail', name: 'CakeOrderDetail', children: true },
      { label: '订单详情', path: '/SnackOrders/SnackOrderDetail', name: 'SnackOrderDetail', children: true }
    ]
  },
  {
    item: { title: '店铺' },
    subItems: [
      { label: '地区管理', path: '/ShopRegionManage', name: 'ShopRegionManage' },
      { label: '地址管理', path: '/ShopList', name: 'ShopList' }
    ]
  },
  {
    item: { title: '会员' },
    subItems: [
      { label: '会员管理', path: '/MemberManage', name: 'MemberManage' }
    ]
  },
  // {
  //   item: { title: '订单' },
  //   subItems: [
  //     { label: '' }
  //   ]
  // },
  // {
  //   item: { title: '厨房' },
  //   subItems: [
  //     { label: '' }
  //   ]
  // },
  // {
  //   item: { title: '网站' },
  //   subItems: [
  //     { label: '' }
  //   ]
  // },
  // {
  //   item: { title: '统计' },
  //   subItems: [
  //     { label: '' }
  //   ]
  // },
  // {
  //   item: { title: '管理员管理' },
  //   subItems: [
  //     { label: '' }
  //   ]
  // },
  // {
  //   item: { title: '客服' },
  //   subItems: [
  //     { label: '' }
  //   ]
  // }
]
