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
      <TabPane v-for="(item, index) of tabs" :label="item.label" :name="item.name" :key="index"></TabPane>
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
        <Page :total="total" :page-size="params.pageSize" size="small" show-elevator show-sizer show-total @on-change="changePage" @on-page-size-change="changePageSize" />
      </Col>
    </Row>
  </div>
</template>
<script>
import HeadSearch from './HeadSearch.vue'
import RegionSelect from './RegionSelect.vue'
export default {
  name: 'orders',
  props: ['tabs', 'columns', 'type'],
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
        type: this.type,
        page: 1,
        pageSize: 7
      },
      orderList: [],
      total: 0
    }
  },
  created () {
    // console.log(this.params)
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
        // console.log(res)
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
