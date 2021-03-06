export default [
  {
    item: { title: '控制台' },
    subItems: [
      {label: '控制台', path: '/ConsoleInfo', name: 'ConsoleInfo'}
    ]
  },
  {
    item: { title: '操作日志' },
    subItems: [
      { label: '操作日志', path: '/OperationLog', name: 'OperationLog' }
    ]
  },
  {
    item: { title: '蛋糕' },
    subItems: [
      { label: '蛋糕分类', path: '/CakeClassify', name: 'CakeClassify' },
      { label: '各地区蛋糕管理', path: '/CakeManage', name: 'CakeManage' },
      // { label: '各地区首页管理', path: '/CakeHomepages', name: 'CakeHomepages' },
      { label: '新闻管理', path: '/CakeNews', name: 'CakeNews' },
      { label: '编辑新闻', path: '/CakeNews/CakeNewsAdd', name: 'CakeNewsAdd', children: true },
      { label: '新增/修改商品', path: '/CakeManage/ProductAdd', name: 'ProductAdd', children: true }
    ]
  },
  {
    item: { title: '周边' },
    subItems: [
      { label: '周边分类', path: '/SnacksClassify', name: 'SnacksClassify' },
      { label: '各地区周边管理', path: '/SnacksManage', name: 'SnacksManage' }
      // { label: '各地区首页管理', path: '/SnacksHomepages', name: 'SnacksHomepages' }
    ]
  },
  {
    item: { title: '订单' },
    subItems: [
      { label: '蛋糕订单管理', path: '/CakeOrders', name: 'CakeOrders' },
      { label: '周边订单管理', path: '/SnackOrders', name: 'SnackOrders' },
      { label: '厨房订单管理', path: '/KitchenOrders', name: 'KitchenOrders' },
      { label: '订单详情', path: '/CakeOrders/CakeOrderDetail', name: 'CakeOrderDetail', children: true },
      { label: '订单详情', path: '/SnackOrders/SnackOrderDetail', name: 'SnackOrderDetail', children: true },
      { label: '订单详情', path: '/KitchenOrders/KitchenOrderDetail', name: 'KitchenOrderDetail', children: true }
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
      { label: '会员', path: '/MemberManage', name: 'MemberManage' },
      { label: '用户协议', path: '/UserAgreement', name: 'UserAgreement' }
    ]
  },
  {
    item: { title: '统计' },
    subItems: [
      { label: '平台销量情况', path: '/PlatFromSaleCount', name: 'PlatFromSaleCount' },
      { label: '蛋糕销售情况', path: '/CakeSaleCount', name: 'CakeSaleCount' },
      { label: '周边销售情况', path: '/SnackSaleCount', name: 'SnackSaleCount' },
      { label: '店铺销量统计', path: '/ShopSaleCount', name: 'ShopSaleCount' },
      { label: '会员购买统计', path: '/MerberSaleCount', name: 'MerberSaleCount' }
    ]
  },
  {
    item: { title: '管理员管理' },
    subItems: [
      { label: '管理员列表', path: '/AdminList', name: 'AdminList' }
    ]
  },
  {
    item: { title: '网站' },
    subItems: [
      { label: '新闻管理', path: '/WebNewsManagrer', name: 'WebNewsManagrer' },
      { label: '店铺', path: '/WebShopList', name: 'WebShopList' },
      { label: '艺术管理', path: '/WebArtManagrer', name: 'WebArtManagrer' },
      { label: '首页', path: '/BannerManagrer', name: 'BannerManagrer' },
      { label: '联系我们', path: '/LinkUs', name: 'LinkUs' },
      { label: '关于我们', path: '/AboutUs', name: 'AboutUs' }
    ]
  }
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
