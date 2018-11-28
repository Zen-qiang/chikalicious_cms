<template>
  <div class="index">
    <Layout class="my-layout">
      <Header class="my-header">
        <Menu mode="horizontal" theme="primary" class="fx fx-bt">
          <div class="layout-logo">Chikalicious商城</div>
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
            <Submenu v-if="menu.item.show"  v-for="(menu, index) of menusMock" :key="index" :name="index">
              <template slot="title">
                  <Icon type="ios-navigate"></Icon>
                  <span :class="{'redPoint': menu.item.title === '订单' && hasPoint}">{{menu.item.title}}</span>
              </template>
              <MenuItem
                v-for="(subMenu, idx) of menu.subItems"
                :key="index + '-' + idx"
                :name="index + '-' + idx"
                :to="subMenu.path"
                v-if="!subMenu.children && subMenu.show"
              ><span>{{subMenu.label}}</span><i class="redNumber" v-if="menu.item.title === '订单' && fmOrderNumber[idx]">{{fmOrderNumber[idx]}}</i></MenuItem>
            </Submenu>
            <!-- <Submenu name="kf">
              <template slot="title">
                  <Icon type="ios-navigate"></Icon>
                  <span  @click="toCustomService()">客服</span>
              </template>
              <MenuItem name="" ></MenuItem>
            </Submenu> -->
            <audio ref="notice" src="http://chikalicious-oss.oss-cn-shanghai.aliyuncs.com/web_content/remind.mp3"></audio>
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
// import menusMock from '../../mock/menusMock.js'
import PopBox from '../../components/PopBox.vue'
export default {
  name: 'index',
  components: {
    PopBox
  },
  data () {
    return {
      menusMock: JSON.parse(localStorage.getItem('menusMock')),
      selectMenu_index: 0,
      showPopbox: false,
      userName: localStorage.getItem('session-token'),
      orderNumber: [0, 0, 0],
      auObj: null,
      timer: null
      // permissions: JSON.parse(localStorage.getItem('permissions')),
      // roles: JSON.parse(localStorage.getItem('roles'))
    }
  },
  created () {
    this.getListIng()
  },
  destroyed () {
    if (this.timer) clearInterval(this.timer)
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
    },
    hasPoint () {
      return this.orderNumber.some(item => {
        return item
      })
    },
    fmOrderNumber () {
      return this.orderNumber.map(item => {
        return item > 99 ? '99+' : item
      })
    }
  },
  methods: {
    getListIng () {
      if (localStorage.getItem('role') !== 'ADMIN') {
        this.timer = setInterval(() => {
          this.$axios.get('/admin/queryRemindMessage', {}).then(res => {
            if (res.data.code === 666) {
              // 是否播放音频
              let isAudio = false
              // 门店管理员
              if (localStorage.getItem('role') === 'SHOP') {
                this.orderNumber = [res.data.data.cakeRemindCount, res.data.data.snackRemindCount, res.data.data.kitChenCount]
                if (res.data.data.cakeRemindCount !== 0) {
                  isAudio = true
                  this.$Notice.info({
                    title: '蛋糕订单',
                    desc: '您有' + res.data.data.cakeRemindCount + '新订单'
                  })
                }
                if (res.data.data.comRemindCount !== 0) {
                  isAudio = true
                  this.$Notice.info({
                    title: '确认收货',
                    desc: '您有' + res.data.data.comRemindCount + '笔订单确认收货'
                  })
                }
              }
              // 厨房管理员
              if (localStorage.getItem('role') === 'KITCHEN') {
                if (res.data.data.kitChenCount !== 0) {
                  this.orderNumber = [0, 0, res.data.data.kitChenCount]
                  this.$Notice.info({
                    title: '厨房订单',
                    desc: '您有' + res.data.data.kitChenCount + '新订单'
                  })
                  isAudio = true
                }
              }
              if (isAudio) {
                this.$nextTick(() => {
                  this.$refs.notice.play()
                })
              }
            }
          }).catch(err => {
            console.log(err)
          })
        }, 60000)
      }
    },
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
          this.$axios.get('/logout').then(res => {
            window.localStorage.clear()
            this.$router.replace({name: 'Login'})
          }).catch(err => {
            console.error(err)
          })
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
.redPoint {
  display: inline-block;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    right: -8px;
    width: 8px;
    height: 8px;
    top: 0;
    border-radius: 100%;
    background: #ea3715;
  }
}
.redNumber {
  position: absolute;
  display: inline-block;
  width: 22px;
  height: 22px;
  text-align: center;
  background: #ea3715;
  border-radius: 100%;
  color: #fff;
  font-size: 12px;
  line-height: 22px;
  margin-left: 4px;
  font-style: normal;
  transform: scale(.8);
}
</style>
