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
      <Col span="6">
        <Row><span>交易号：</span><span>{{data.orderNumber}}</span></Row>
        <Row><span>下单时间：</span><span>{{data.orderTime}}</span></Row>
      </Col>
      <Col span="2">
        <Button type="success" v-if="showPrintButton" size="small" @click="printOrder">打印订单</Button>
      </Col>
    </Row>
    <Divider/>
    <Row>
      <Col span="2">
        <h2>商品信息：</h2>
      </Col>
      <Col span="12">
        <Row v-for="(item, index) of data.product" :key="index" >
          <Col span="7" style="width:130px">
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
    <Row>
      <Col span="2"><h2>订单状态：</h2></Col>
      <Col span="2"><span>{{from === 'kitchen' ? data.productionStatus : data.status}}</span></Col>
      <Button type="success" v-if="showExtractButton" size="small" @click="confirmReceipt">确认收货</Button>
      <Button type="success" v-if="showDeliveryButton" size="small" @click="showExpressModal">确认发货</Button>
      <Button type="success" v-if="showAcceptedButton" size="small" @click="acceptOrders">确认接受</Button>
      <Button type="success" v-if="showFinishButton" size="small" @click="productionFinish">确认完成</Button>
    </Row>
    <!-- 物流模态框 -->
    <Modal v-model="showExpressDialog">
      <div style="text-align:center;padding:10px">
        <p>订单编号：<span>{{data.orderNumber}}</span></p>
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
      expressParams: {},
      expressCompanyList: ['顺丰速运', '圆通速递', '中通快递', '百世快递', '韵达速递', '申通快递', '天天快递', '德邦快递', '邮政EMS'],
      type: this.$route.params.type,
      from: this.$route.params.from,
      data: {},
      showExtractButton: false,
      showAcceptedButton: false,
      showFinishButton: false,
      showExpressInfo: false,
      showPrintButton: false,
      showDeliveryButton: false,
      showExpressDialog: false
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
          this.showAcceptedButton = (this.data.productionStatusEn === 'WAITTING_ACCEPTED') && (this.from === 'kitchen')
          this.showFinishButton = (this.data.productionStatusEn === 'ACCEPTED') && (this.from === 'kitchen')
          this.showPrintButton = (this.data.kitchenPrinted === false) && (this.from === 'kitchen')
          this.showDeliveryButton = (this.type === 'SNACK') && (!this.data.waybillNum)
          this.showExtractButton = (this.data.statusEn === 'WAITING_EXTRACT') && (this.from !== 'kitchen') && !this.showDeliveryButton
          this.showExpressInfo = this.type === 'SNACK'
        }
      }).catch(err => {
        console.log(err)
      })
    },
    confirmReceipt () {
      this.$Modal.confirm({
        title: '是否确认已收货',
        onOk: () => {
          this.$axios.post('/order/confirmReceipt', {
            orderID: this.params.id
          }).then(res => {
            if (res.data.code !== 666) {
              this.$Message.warning(res.data.message)
            } else {
              this.queryOrderById()
              this.$Message.success('操作成功')
            }
          }).catch(err => {
            console.log(err)
          })
        },
        onCancel: () => {
        }
      })
    },
    /**
     * @name 接受订单
     * @param 订单ID数组
     */
    acceptOrders () {
      this.$Modal.confirm({
        title: '是否接受订单',
        onOk: () => {
          this.$axios.post('/order/acceptOrders', {
            idsJson: JSON.stringify([this.params.id])
          }).then(res => {
            if (res.data.code !== 666) {
              this.$Message.warning(res.data.message)
            } else {
              this.queryOrderById()
              this.$Message.success('接受订单成功')
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    /**
     * @name  完成订单
     * @param orderID 订单ID
     */
    productionFinish () {
      this.$Modal.confirm({
        title: '是否确认已完成',
        onOk: () => {
          this.$axios.post('/order/productionFinish', {
            idsJson: JSON.stringify([this.params.id])
          }).then(res => {
            if (res.data.code !== 666) {
              this.$Message.warning(res.data.message)
            } else {
              this.queryOrderById()
              this.$Message.success('订单已完成')
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    /**
     * @name 打印订单
     * @param orderId 订单ID
     */
    printOrder () {
      this.$Modal.confirm({
        title: '是否打印订单',
        onOk: () => {
          this.$Notice.success({
            title: '订单正在打印..'
          })
          this.$axios.post('/order/printOrder', {
            idsJson: JSON.stringify([this.params.id])
          }).then(res => {
            if (res.data.code !== 666) {
              this.$Message.warning(res.data.message)
            } else {
              this.queryOrderById()
              this.$Message.success('订单打印成功')
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    /**
     * @name 显示物流模态框
     * @param currentOrder 当前订单
     */
    showExpressModal () {
      this.showExpressDialog = true
    },
    /**
     * @name 确认发货
     */
    confirmDelivery () {
      this.expressParams.orderID = this.data.orderID
      this.$axios.post('/order/confirmDelivery', this.expressParams).then(res => {
        if (res.data.code !== 666) {
          this.$Message.warning(res.data.message)
        } else {
          this.queryOrderById()
          this.showExpressDialog = false
          this.$Message.success('操作成功')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
