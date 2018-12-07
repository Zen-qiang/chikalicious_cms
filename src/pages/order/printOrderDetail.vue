<template>
  <div>
  <div id="subOutputRank-print">
   <Row>
      <Col span="2"> &nbsp;</Col>
    </Row>
    <Row>
      <Col span="2"> &nbsp;</Col>
      <h1 style="font-size:16px">订单详情</h1>
    </Row>
    <Divider/>
    <Row>
      <Col span="2">
        &nbsp;
      </Col>
      <Col span="3">
        <h2>订单信息：</h2>
      </Col>
      <Col span="6">
        <Row><span>订单编号：</span><span>{{data.orderNumber}}</span></Row>
        <Row><span>买家信息：</span><span>{{data.consigneeName}}</span></Row>
        <Row><span>买家留言：</span><span>{{data.note}}</span></Row>
      </Col>
      <Col span="6">
        <Row><span>交易号：</span><span>{{data.orderNumber}}</span></Row>
        <Row><span>下单时间：</span><span>{{data.orderTime}}</span></Row>
        <Row><span>提货时间：</span><span>{{data.extractTime}}</span></Row>
      </Col>
    </Row>
    <Divider/>
    <Row>
      <Col span="2">
      &nbsp;
      </Col>
      <Col span="3">
        <h2>商品信息：</h2>
      </Col>
      <Col span="6">
        <Row v-for="(item, index) of data.product" :key="index" >
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
      <Col span="6">
        <Row><span>店铺区域：</span><span>{{data.shop}}</span></Row>
        <Row><span>店铺详细地址：</span><span>{{data.address}}</span></Row>
      </Col>
    </Row>
    <Divider/>
    <Row>
      <Col span="2">&nbsp;</Col>
      <Col span="3"><h2>是否需要发票：</h2></Col><Col span="8"><p>{{data.needInvoice}}</p></Col>
    </Row>
    <Row>
      <Col span="2">&nbsp;</Col>
      <Col span="3"><h2>名称：</h2></Col><Col span="8"><p>{{data.invoiceTitle}}</p></Col>
    </Row>
    <Row>
      <Col span="2">&nbsp;</Col>
      <Col span="3"><h2>纳税人识别号：</h2></Col><Col span="8"><p>{{data.invoiceNo}}</p></Col></Row>
    <Row>
      <Col span="2">&nbsp;</Col>
      <Col span="3"><h2>地址、电话：</h2></Col><Col span="8"><p>{{data.invoiceAddress}}</p></Col>
    </Row>
    <Row>
      <Col span="2">&nbsp;</Col>
      <Col span="3"><h2>开户行及账号：</h2></Col><Col span="8"><p>{{data.invoiceBankAccount}}</p></Col>
    </Row>
    <Row v-if="showExpressInfo">
      <Col span="2">&nbsp;</Col>
      <Col span="3"><h2>物流公司：</h2></Col><Col span="8"><p>{{data.expressCompany}}</p></Col>
    </Row>
    <Row v-if="showExpressInfo">
      <Col span="2">&nbsp;</Col>
      <Col span="3"><h2>物流单号：</h2></Col><Col span="8"><p>{{data.waybillNum}}</p></Col>
    </Row>
    <Row>
      <Col span="2">&nbsp;</Col>
      <Col span="3"><h2>订单状态：</h2></Col>
      <Col span="2"><span>{{from === 'kitchen' ? data.productionStatus : data.status}}</span></Col>
    </Row>
    </div>
    <Button type="success" size="small" @click="printOrderDetail">打印订单</Button>
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
        id: this.$route.query.id
      },
      expressParams: {},
      expressCompanyList: ['顺丰速运', '圆通速递', '中通快递', '百世快递', '韵达速递', '申通快递', '天天快递', '德邦快递', '邮政EMS'],
      type: this.$route.query.type,
      from: this.$route.query.from,
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
      console.log(this.params.id)
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
          setTimeout(this.printOrderDetail, 1000)
          // this.printOrderDetail()
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
              this.printOrderDetail()
              this.$Message.success('订单打印成功')
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    printOrderDetail () {
      let subOutputRankPrint = document.getElementById('subOutputRank-print')
      let newContent = subOutputRankPrint.innerHTML
      // let oldContent = document.body.innerHTML
      document.body.innerHTML = newContent
      window.print()
      // this.showPrintButton = true
      // window.location.reload();
      // document.body.innerHTML = oldContent;
      return false
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
<style lang="scss" scoped>
body {
  text-align: center;
  // font-size: 18px;
}
#subOutputRank-print {
  position: absolute;
  width: 1000px;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
