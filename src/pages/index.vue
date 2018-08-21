<template>
  <div id="dl_index">
    <el-container>
      <el-header>chikalicious商城</el-header>
      <el-container>
        <el-aside>
          <el-menu class="el-menu-vertical-demo" default-active="1-1">
            <el-submenu :index="''+ (index+1)" v-for="(item, index) in items" :key="index">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">{{item.label}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="(index+1) + '-' + (i+1)" v-for="(it, i) in item.sublist" :key="i" @click="go(it.router)">{{it.label}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <router-view></router-view>
      </el-container>
    </el-container>
    <!-- <span @click="$router.push({name: 'Website'})">go to website</span> -->
  </div>
</template>
<script>
export default {
  name: 'Index',
  data () {
    return {
      items: [
        {
          label: '控制台',
          sublist: [{
            label: '控制台',
            router: '/console/conChild'
          }]
        },
        {
          label: '操作日志',
          sublist: [{
            label: '操作日志',
            router: '/daily/dailyChild'
          }]
        },
        {
          label: '网站',
          sublist: [{
            label: '新闻',
            router: '/website/news'
          },
          {
            label: '商品',
            router: '/website/good'
          },
          {
            label: '店铺',
            router: '/website/websitestore'
          },
          {
            label: '首页',
            router: '/website/website_index'
          },
          {
            label: '关于我们',
            router: '/website/aboutus'
          },
          {
            label: '联系我们',
            router: '/website/contact'
          }]
        },
        {
          label: '商品',
          sublist: [{
            label: '上架商品列表',
            router: '/product/productList'
          },
          {
            label: '新增修改商品',
            router: '/product/goodMange'
          },
          {
            label: '商品分类',
            router: '/product/goodClassify'
          },
          {
            label: '新闻管理',
            router: '/product/news'
          }]
        },
        {
          label: '会员',
          sublist: [
            {
              label: '普通会员',
              router: '/vip/vipchild'
            }
          ]
        },
        {
          label: '订单',
          sublist: [
            {
              label: '订单管理',
              router: '/order/orderMange'
            }
          ]
        },
        {
          label: '厨房',
          sublist: [
            {
              label: '订单管理',
              router: '/order/orderMange'
            }
          ]
        },
        {
          label: '店铺',
          sublist: [
            {
              label: '地区设置',
              router: '/store/set'
            },
            {
              label: '店铺地址',
              router: '/store/store_add'
            }
          ]
        },
        {
          label: '统计',
          sublist: [
            {
              label: '平台收支情况',
              router: '/total/paymment'
            },
            {
              label: '商品销售情况',
              router: '/total/sale'
            },
            {
              label: '店铺销量统计',
              router: '/total/quantity'
            },
            {
              label: '会员购买统计',
              router: '/total/buy'
            }
          ]
        },
        {
          label: '管理员管理',
          sublist: [
            {
              label: '管理员列表',
              router: '/mange/mangeChild'
            }
          ]
        },
        {
          label: '客服',
          sublist: [
            {
              label: '客服列表',
              router: '/service/serviceChid'
            }
          ]
        }
      ]
    }
  },
  methods: {
    go (router) {
      this.$router.push({path: router})
    }
  }
}
</script>
<style lang="less" scoped>
.el-header{
  line-height: 60px;
  background: #f7e7e6;
}
</style>
