<template>
  <div>
    <Orders :tabs="tabs" :columns="columns" :type="type" :queryFrom="queryFrom" ref="orders" @acceptOrders="acceptOrders" @productionFinish="productionFinish"></Orders>
  </div>
</template>
<script>
import Orders from '../../components/orders.vue'
export default {
  name: 'kitchenOrders',
  components: {
    Orders
  },
  data () {
    return {
      tabs: [{
        label: '未接订单',
        name: 'WAITTING_ACCEPTED'
      }, {
        label: '制作中',
        name: 'ACCEPTED'
      }, {
        label: '已完成',
        name: 'COMPLETED'
      }],
      columns: [{
        type: 'selection',
        width: 50
      }, {
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
        key: 'productionStatus'
      }, {
        title: '操作',
        align: 'center',
        width: 110,
        // key: 'name',
        render: this.operationRender
      }],
      type: 'CAKE',
      queryFrom: 'kitchen',
      ids: []
    }
  },
  created () {
  },
  methods: {
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
                  name: 'KitchenOrderDetail',
                  params: {
                    id: params.row.orderID,
                    type: this.type,
                    from: 'kitchen'
                  }
                })
              }
            }
          }, '查看详情')
        ])
      )
      // 未接受订单显示接受、打印订单按钮
      if (params.row.productionStatusEn === 'WAITTING_ACCEPTED') {
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
                  this.ids = []
                  this.ids.push(params.row.orderID)
                  this.acceptOrders(this.ids)
                }
              }
            }, '接受')
          ])
        )
      }
      // 厨房未打印订单显示打印订单按钮，打印订单同时接受订单
      if (params.row.productionStatusEn !== 'COMPLETED') {
        if (params.row.kitchenPrinted) {
          childrens.push(
            h('p', [
              h('Button', {
                props: {
                  // type: 'success',
                  size: 'small',
                  disabled: true
                },
                style: {
                  marginTop: '5px'
                }
              }, '订单已打印')
            ])
          )
        } else {
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
                    this.printOrder(params.row.orderID)
                  }
                }
              }, '打印订单')
            ])
          )
        }
      }
      // 制作中订单显示已完成按钮
      if (params.row.productionStatusEn === 'ACCEPTED') {
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
                  this.ids = []
                  this.ids.push(params.row.orderID)
                  this.productionFinish(this.ids)
                }
              }
            }, '已完成')
          ])
        )
      }
      return h('div', { style: { textAlign: 'center' } }, childrens)
    },
    /**
     * @name 接受订单
     * @param 订单ID数组
     */
    acceptOrders (ids) {
      this.$Modal.confirm({
        title: '是否接受订单',
        onOk: () => {
          this.$axios.post('/order/acceptOrders', {
            idsJson: JSON.stringify(ids)
          }).then(res => {
            if (res.data.code !== 666) {
              this.$Message.warning(res.data.message)
            } else {
              this.$refs.orders.queryOrders()
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
    productionFinish (ids) {
      this.$Modal.confirm({
        title: '是否确认已完成',
        onOk: () => {
          this.$axios.post('/order/productionFinish', {
            idsJson: JSON.stringify(ids)
          }).then(res => {
            if (res.data.code !== 666) {
              this.$Message.warning(res.data.message)
            } else {
              this.$refs.orders.queryOrders()
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
    printOrder (id) {
      this.$Modal.confirm({
        title: '是否打印订单',
        onOk: () => {
          this.$Notice.success({
            title: '订单正在打印..'
          })
          window.open(window.location.origin + '/PrintOrderDetail?id=' + this.params.id)
        }
      })
    }
  }
}
</script>
