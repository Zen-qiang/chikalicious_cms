<template>
  <div>
    <head-search @hander-search="queryOrders">
      <Row :gutter="8">
        <Col span="24">
          <RegionSelect @getCurrentCity="getCurrentCity" @getCurrentProvince="getCurrentProvince"></RegionSelect>
        </Col>
      </Row>
    </head-search>
    <Tabs type="card" v-model="params.orderStatus" @on-click="activeTab">
      <TabPane label="全部订单" name=""></TabPane>
      <TabPane label="制作中" name="IN_PRODUCTUIN"></TabPane>
      <TabPane label="待收货" name="WAITING_EXTRACT"></TabPane>
      <TabPane label="已完成" name="COMPLETED"></TabPane>
    </Tabs>
    <Row :gutter="8">
      <Col :lg="6">
        <span style="width: 120px">订单编号：</span>
        <Input v-model="params.orderNumber" placeholder="" clearable style="width: 200px" />
      </Col>
      <Col :lg="6">
        <span style="width: 120px">收货人手机：</span>
        <Input v-model="params.phoneNum" placeholder="" clearable style="width: 200px" />
      </Col>
      <Col :lg="6">
        <span style="width: 120px">店铺名称：</span>
        <Input v-model="params.shopName" placeholder="" clearable style="width: 200px" />
      </Col>
      <Col :lg="6">
        <span style="width: 120px">下单时间：</span>
        <DatePicker format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="" style="width: 200px" :transfer="true" @on-change="getOrderDate"></DatePicker>
      </Col>
    </Row>
    <Row style="margin-top: 10px">
      <Table border ref="selection" :columns="columns" :data="orderList" :loading="loading"></Table>
    </Row>
    <Row style="margin-top: 10px">
      <Col span="8" offset="8">
        <Page :total="total" :page-size="params.pageSize" size="small" show-elevator show-total @on-change="changePage" @on-page-size-change="changePageSize" />
      </Col>
    </Row>
  </div>
</template>
<script>
import HeadSearch from '../../components/HeadSearch.vue'
import RegionSelect from '../../components/RegionSelect.vue'
export default {
  name: 'cakeOrders',
  components: {
    HeadSearch,
    RegionSelect
  },
  data () {
    return {
      loading: false,
      // 参数
      params: {
        // 当前省份
        provinceId: null,
        // 当前城市
        cityId: null,
        // 订单编号
        orderNumber: '',
        // 收货人手机
        phoneNum: '',
        // 店铺名称
        shopName: '',
        // 下单时间
        startDate: null,
        endDate: null,
        // 订单类型
        orderStatus: '',
        type: 'CAKE',
        page: 1,
        pageSize: 7
      },
      columns: [{
        title: '订单编号',
        sortable: true,
        align: 'center',
        width: 120,
        key: 'orderNumber'
      }, {
        title: '交易号',
        sortable: true,
        align: 'center',
        width: 120,
        key: 'orderNumber'
      }, {
        title: '下单时间',
        sortable: true,
        align: 'center',
        width: 120,
        key: 'orderTime'
      }, {
        title: '商品信息',
        align: 'center',
        width: 250,
        render: (h, params) => {
          return h('div', {
            style: {
              display: 'table-cell',
              padding: '10px'
            }
          }, [
            h('img', {
              style: {
                width: '80px',
                height: '80px',
                verticalAlign: 'middle',
                marginRight: '5px'
              },
              attrs: {
                src: params.row.product[0].imageUrl
              }
            }),
            h('span', params.row.product[0].title)
          ])
        }
      }, {
        title: '商品规格',
        align: 'center',
        sortable: true,
        render: (h, params) => {
          return h('div', {
            style: {
              textAlign: 'center'
            }
          }, [
            h('p', params.row.product[0].spec),
            h('p', params.row.product[0].number + '件')
          ])
        }
      }, {
        title: '买家信息',
        sortable: true,
        align: 'center',
        render: (h, params) => {
          return h('div', {
            style: {
              textAlign: 'center'
            }
          }, [
            h('p', params.row.consigneePhoneNum),
            h('p', params.row.consigneeName)
          ])
        }
      }, {
        title: '餐具信息',
        align: 'center',
        key: 'name',
        render: (h, params) => {
          console.log(params.row)
          return h('div', {
            style: {
              textAlign: 'center'
            }
          }, [
            h('p', '蜡烛：' + params.row.product[0].needCandle),
            h('p', '餐具：' + params.row.product[0].tablewareNum + '份')
          ])
        }
      }, {
        title: '订单金额',
        sortable: true,
        align: 'center',
        key: 'amount'
      }, {
        title: '订单状态',
        sortable: true,
        align: 'center',
        key: 'status'
      }, {
        title: '店铺名称',
        sortable: true,
        align: 'center',
        key: 'shop'
      }, {
        title: '操作',
        align: 'center',
        width: 100,
        // key: 'name',
        render: (h, params) => {
          return h('div', {
            style: {
              textAlign: 'center'
            }
          }, [
            h('p', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                on: {
                  click: () => {
                    // this.show(params.index)
                  }
                }
              }, '查看详情')
            ]),
            h('p', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginTop: '5px'
                },
                on: {
                  click: () => {
                    // this.show(params.index)
                  }
                }
              }, '确认收货')
            ])
          ])
        }
      }],
      orderList: [],
      total: 0
    }
  },
  created () {
    this.queryOrders()
  },
  methods: {
    getCurrentProvince (provinceId) {
      this.params.provinceId = provinceId
    },
    getCurrentCity (cityId) {
      this.params.cityId = cityId
    },
    getOrderDate (daterange) {
      this.params.startDate = daterange[0]
      this.params.endDate = daterange[1]
    },
    changePage (page) {
      this.params.page = page
      this.queryOrders()
    },
    changePageSize (pageSize) {
      this.params.pageSize = pageSize
      this.queryOrders()
    },
    activeTab (name) {
      this.params.orderStatus = name
      this.queryOrders()
    },
    queryOrders () {
      this.loading = true
      this.$axios.get('/order/queryOrder', {
        params: this.params
      }).then(res => {
        this.loading = false
        console.log(res)
        if (res.data.code === 666) {
          this.total = res.data.data.total
          this.orderList = res.data.data.list
        }
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    }
  }
}
</script>
