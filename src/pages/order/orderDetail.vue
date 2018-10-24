<template>
  <div>
    <h1 style="font-size:16px">订单详情</h1>
    <Divider/>
    <Row>
      <Col span="2">
        <h2>订单信息：</h2>
      </Col>
      <Col span="8">
        <Row><span>订单编号：</span><span>{{data.orderNumber}}</span></Row>
        <Row><span>订单编号：</span><span>{{data.orderNumber}}</span></Row>
        <Row><span>买家信息：</span><span>{{data.consigneeName}}</span></Row>
        <Row><span>买家留言：</span><span>{{data.note}}</span></Row>
      </Col>
      <Col span="8">
        <Row><span>交易号：</span><span>{{data.orderNumber}}</span></Row>
        <Row><span>下单时间：</span><span>{{data.orderTime}}</span></Row>
      </Col>
    </Row>
    <Divider/>
    <Row>
      <Col span="2">
        <h2>商品信息：</h2>
      </Col>
      <Col span="8">
        <Row v-for="(item, index) of data.product" :key="index" >
          <Col span="7">
            <img :src="item.imageUrl" style="width: 120px" />
          </Col>
          <Col span="16">
            <p>{{item.title}}</p>
            <Row>价格(元)：<span>{{item.price}}</span></Row>
            <Row>数量(件)：<span>{{item.number}}</span></Row>
            <Row>规格：<span>{{item.spec}}</span></Row>
            <Row v-if="!showExpressInfo">蜡烛：<span>{{item.needCandle}}</span></Row>
            <Row v-if="!showExpressInfo">餐具(份)：<span>{{item.tablewareNum}}</span></Row>
          </Col>
          <Divider v-if="data.product && data.product.length > 1"/>
        </Row>
      </Col>
      <Col span="8">
        <Row><span>店铺区域：</span><span>{{data.shop}}</span></Row>
        <Row><span>店铺详细地址：</span><span>{{data.address}}</span></Row>
      </Col>
    </Row>
    <Divider/>
    <Row><Col span="2"><h2>是否需要发票：</h2></Col><Col span="8"><p>{{data.needInvoice}}</p></Col></Row>
    <Row><Col span="2"><h2>发票抬头：</h2></Col><Col span="8"><p>{{data.invoiceTitle}}</p></Col></Row>
    <Row v-if="showExpressInfo"><Col span="2"><h2>物流公司：</h2></Col><Col span="8"><p>{{data.expressCompany}}</p></Col></Row>
    <Row v-if="showExpressInfo"><Col span="2"><h2>物流单号：</h2></Col><Col span="8"><p>{{data.waybillNum}}</p></Col></Row>
    <Row><Col span="2"><h2>订单状态：</h2></Col><Col span="2"><span>{{data.status}}</span></Col><Button type="success" v-if="showExtractButton" size="small" @click="confirmReceipt">确认收货</Button></Row>
  </div>
</template>
<script>
export default {
  name: 'orderDetail',
  components: {
  },
  data () {
    return {
      // 参数
      params: {
        id: this.$route.params.id
      },
      type: this.$route.params.type,
      data: {},
      showExtractButton: false,
      showExpressInfo: false
    }
  },
  created () {
    this.queryOrderById()
  },
  methods: {
    queryOrderById () {
      if (!this.params.id) return
      this.$axios.get('/order/queryOrderById', {
        params: this.params
      }).then(res => {
        // console.log(res.data)
        if (res.data.code === 666) {
          this.data = res.data.data
          this.showExtractButton = this.data.statusEn === 'WAITING_EXTRACT'
          if (this.data && this.data.product && this.data.product.length > 0) {
            this.showExpressInfo = this.type === 'SNACK'
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    confirmReceipt () {
      this.$Modal.confirm({
        title: '是否确认已收货',
        content: '是否确认已收货？',
        onOk: () => {
          this.$axios.post('/order/confirmReceipt', {
            orderID: this.params.id
          }).then(res => {
            if (res.data.code === -1) {
              this.$Message.warning(res.data.message)
            } else {
              this.queryOrderById()
              this.$Message.success('操作成功')
              this.$Modal.remove()
            }
          }).catch(err => {
            console.log(err)
          })
        },
        onCancel: () => {
        }
      })
    }
  }
}
</script>
