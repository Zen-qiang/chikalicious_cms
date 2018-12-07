<template>
  <div>
    <Orders :tabs="tabs" :columns="columns" :type="type" ref="orders"></Orders>
  </div>
</template>
<script>
import Orders from '../../components/orders.vue'
export default {
  name: 'cakeOrders',
  components: {
    Orders
  },
  data () {
    return {
      tabs: [{
        label: '全部订单',
        name: ''
      }, {
        label: '制作中',
        name: 'IN_PRODUCTUIN'
      }, {
        label: '待收货',
        name: 'WAITING_EXTRACT'
      }, {
        label: '已完成',
        name: 'COMPLETED'
      }],
      columns: [{
        title: '店铺名称',
        sortable: true,
        width: 200,
        align: 'center',
        key: 'shop'
      }, {
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
        title: '提货时间',
        sortable: true,
        align: 'center',
        width: 200,
        key: 'extractTime'
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
        title: '餐具信息',
        align: 'center',
        width: 120,
        key: 'name',
        render: (h, params) => {
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
        title: '店铺名称',
        sortable: true,
        width: 200,
        align: 'center',
        key: 'shop'
      }, {
        title: '操作',
        align: 'center',
        width: 100,
        // key: 'name',
        render: this.operationRender
      }],
      type: 'CAKE'
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
                  name: 'CakeOrderDetail',
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
      // 待收货显示确认收货
      if (params.row.statusEn === 'WAITING_EXTRACT') {
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
