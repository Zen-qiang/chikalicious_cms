<template>
  <div>
    <Orders :tabs="tabs" :columns="columns" :type="type" :expressCompanyList="expressCompanyList" ref="snackOrders"></Orders>
  </div>
</template>
<script>
import Orders from '../../components/orders.vue'
export default {
  name: 'snackOders',
  components: {
    Orders
  },
  data () {
    return {
      tabs: [{
        label: '全部订单',
        name: ''
      }, {
        label: '待付款',
        name: 'WAITING_PAYMENT'
      }, {
        label: '待收货',
        name: 'WAITING_EXTRACT'
      }, {
        label: '已完成',
        name: 'COMPLETED'
      }],
      expressCompanyList: ['顺丰速运', '圆通速递', '中通快递', '百世快递', '韵达速递', '申通快递', '天天快递', '德邦快递', '邮政EMS'],
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
        width: 140,
        key: 'orderTime'
      }, {
        title: '商品信息',
        align: 'center',
        width: 300,
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
                verticalAlign: 'middle',
                textAlign: 'center',
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
        width: 120,
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
        width: 120,
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
        title: '收货地址',
        align: 'center',
        width: 120,
        key: 'address'
      }, {
        title: '订单金额',
        sortable: true,
        width: 120,
        align: 'center',
        key: 'amount'
      }, {
        title: '订单状态',
        sortable: true,
        width: 120,
        align: 'center',
        key: 'status'
      }, {
        title: '操作',
        align: 'center',
        width: 100,
        render: this.operationRender
      }],
      type: 'SNACK'
    }
  },
  created () {
  },
  methods: {
    /**
     * @name  确认收货
     * @param orderID 订单ID
     */
    confirmReceipt (orderID) {
      this.$Modal.confirm({
        title: '是否确认已收货',
        onOk: () => {
          this.$axios.post('/order/confirmReceipt', {
            orderID: orderID
          }).then(res => {
            if (res.data.code !== 666) {
              this.$Message.warning(res.data.message)
            } else {
              this.$refs.orders.queryOrders()
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
     * @name  操作列渲染
     */
    operationRender (h, params) {
      let childrens = []
      childrens.push(
        h('p', [
          h('Button', {
            props: {
              type: 'success',
              size: 'small'
            },
            on: {
              click: () => {
                this.$router.push({
                  name: 'SnackOrderDetail',
                  params: {
                    id: params.row.orderID,
                    type: this.type
                  }
                })
              }
            }
          }, '查看详情')
        ])
      )
      // 待收货并且没有快递单号，显示确认发货
      if (params.row.statusEn === 'WAITING_EXTRACT' && !params.row.waybill_num) {
        childrens.push(
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
                  // console.log(params.row.statusEn)
                  this.$refs.snackOrders.showExpressModal(params.row)
                }
              }
            }, '确认发货')
          ])
        )
      }
      // 待收货并且有快递单号显示确认收货
      if (params.row.statusEn === 'WAITING_EXTRACT' && params.row.waybill_num) {
        childrens.push(
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
                  this.confirmReceipt(params.row.orderID)
                }
              }
            }, '确认收货')
          ])
        )
      }
      return h('div', { style: { textAlign: 'center' } }, childrens)
    }
  }
}
</script>
