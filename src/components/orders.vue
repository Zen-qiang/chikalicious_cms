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
    <Modal v-model="showExpress">
      <div style="text-align:center;padding:10px">
        <p>订单编号：<span>{{currentOrder.orderNumber}}</span></p>
        <p>确认发货，请填写订单详情</p>
      </div>
      <Row style="text-align:center;margin:10px">
        <Col span="6">快递选择：</Col>
        <Col span="12">
          <Select v-model="expressParams.expressCompany" style="width:200px" filterable>
            <Option v-for="(item, index) in expressCompanyList" :value="item" :key="index">{{ item }}</Option>
          </Select>
        </Col>
        <Col span="6">
          <Icon type="md-medical" /><span style="margin-left:10px;color:red">必填</span>
        </Col>
      </Row>
      <Row style="text-align:center;margin:10px">
        <Col span="6">快递单号：</Col>
        <Col span="12">
          <Input v-model="expressParams.wayBillNum" style="width: 200px" clearable />
        </Col>
        <Col span="6">
          <Icon type="md-medical" /><span style="margin-left:10px;color:red">必填</span>
        </Col>
      </Row>
      <div slot="footer">
        <Button type="success" size="large" long @click="confirmDelivery">确认发货</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import HeadSearch from './HeadSearch.vue'
import RegionSelect from './RegionSelect.vue'
export default {
  name: 'orders',
  props: ['tabs', 'columns', 'type', 'expressCompanyList'],
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
        pageSize: 10
      },
      orderList: [],
      total: 0,
      showExpress: false,
      expressParams: {},
      currentOrder: {}
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
    },
    showExpressModal (currentOrder) {
      this.currentOrder = currentOrder
      this.showExpress = true
    },
    confirmDelivery () {
      this.expressParams.orderID = this.currentOrder.orderID
      this.$axios.post('/order/confirmDelivery', this.expressParams).then(res => {
        if (res.data.code === -1) {
          this.$Message.warning(res.data.message)
        } else {
          this.queryOrders()
          this.showExpress = false
          this.$Message.success('操作成功')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
