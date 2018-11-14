<template>
  <div class="index">
    <Layout class="my-layout">
      <Header class="my-header">
        <Menu mode="horizontal" theme="primary" class="fx fx-bt">
          <div class="layout-logo">Chikslicious商城</div>
          <div class="layout-nav">
            <div @click.stop="showPopbox = !showPopbox">
              <span style="margin-right:10px">{{userName}}</span>
              <Avatar icon="ios-person" />
            </div>
            <pop-box :showPopbox.sync="showPopbox">
              <CellGroup @on-click="popBoxClick">
                <Cell name="logout">
                  <Icon type="md-power" slot="icon"/>
                  退出登陆
                </Cell>
              </CellGroup>
            </pop-box>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu :active-name="openNames + '-' + activeName" theme="light" width="auto" :open-names="[openNames]"  @on-select="getSelect">
            <Submenu v-for="(menu, index) of menusMock" :key="index" :name="index">
              <template slot="title">
                  <Icon type="ios-navigate"></Icon>
                  {{menu.item.title}}
              </template>
              <MenuItem
                v-for="(subMenu, idx) of menu.subItems"
                :key="index + '-' + idx"
                :name="index + '-' + idx"
                :to="subMenu.path"
                v-if="!subMenu.children"
              >{{subMenu.label}}</MenuItem>
            </Submenu>
            <Submenu name="" target='www.baidu.com' to='www.baidu.com' replace='www.baidu.com'>
              <template slot="title">
                  <Icon type="ios-navigate"></Icon>
                  <span  @click="toCustomService()">
                  客服
                  </span>
              </template>
              <MenuItem name="" ></MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>{{firstBreadcrumb.item.title}}</BreadcrumbItem>
            <BreadcrumbItem v-for="(breadcrumb, index) of this.filterBreadcrumbs" :key="index" :to="breadcrumb.path">{{breadcrumb.label}}</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
              <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import menusMock from '../../mock/menusMock.js'
import PopBox from '../../components/PopBox.vue'
export default {
  name: 'index',
  components: {
    PopBox
  },
  data () {
    return {
      menusMock: menusMock,
      selectMenu_index: 0,
      showPopbox: false,
      userName: localStorage.getItem('session-token')
    }
  },
  computed: {
    // 左侧菜单选中
    firstBreadcrumb () {
      let selected = this.menusMock.find((item, index) => {
        return index === this.selectMenu_index
      })
      return selected
    },
    // 当前路由数组
    breadcrumbs () {
      let arr = this.$lodash.split(this.$route.fullPath, '/')
      return this.$lodash.compact(arr)
    },
    // menusMock扁平化
    flatMapMenus () {
      return this.$lodash.flatMapDeep(this.menusMock, item => [item.subItems])
    },
    // 面包屑
    filterBreadcrumbs () {
      let arr = []
      this.breadcrumbs.forEach(element => {
        let obj = this.$lodash.find(this.flatMapMenus, o => o.name === element)
        if (obj) arr.push(obj)
      })
      return arr
    },
    firstRouterName () {
      return this.$lodash.head(this.breadcrumbs)
    },
    openNames () {
      return this.menusMock.findIndex(item => {
        return item.subItems.find(sub => sub.name === this.firstRouterName)
      })
    },
    activeName () {
      return this.menusMock[this.openNames].subItems.findIndex(item => item.name === this.firstRouterName)
    }
  },
  methods: {
    getSelect (val) {
      let index = this.$lodash.head(this.$lodash.split(val, '-', 1))
      this.selectMenu_index = this.$lodash.toNumber(index)
    },
    toCustomService () {
      // 微信客服
      window.open('https://mpkf.weixin.qq.com/', '_blank')
    },
    popBoxClick (name) {
      switch (name) {
        case 'logout':
          this.$router.replace('/Login')
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  min-height: 100vh;
}
.my-layout {
  border: 1px solid #d7dde4;
  position: relative;
  border-radius: 4px;
  min-height: 100vh;
}
.my-header {
  .ivu-menu-light {
    background: inherit;
  }
}
.layout-logo{
  line-height: 30px;
  font-size: 24px;
  font-weight: 600;
}
.layout-nav {
  position: relative;
}
</style>
