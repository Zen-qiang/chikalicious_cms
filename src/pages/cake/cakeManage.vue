<template>
  <div class="cakeNews">
    <div class="cakeNews-searchContent fx">
      <p>地址:</p>
      <p><region-select @getCurrentCity="getCurrentCity" @getCurrentProvince="getCurrentProvince"></region-select></p>
    </div>
    <section class="cakeNews-container" style="margin-top:30px">
      <div>
        <RadioGroup v-model="buttonSize" type="button">
            <span @click="changeProductType(1)">
              <Radio label="large" @click="changeProductType('5')">上架商品</Radio>
            </span>
            <span @click="changeProductType(0)">
              <Radio label="default">已下架商品</Radio>
            </span>
        </RadioGroup>
      </div>
      <div>
      <head-search @hander-search="search">
        <div class="cakeNews-searchContent fx">
          <p>
            <span>商品名称：</span>
            <Input v-model="productName" placeholder="请输入商品名称" clearable style="width: 200px" />
          </p>
          <p class="fx">
            <span  style="white-space: nowrap">商品类别：</span>
            <product-type-select @getProductType="getProductType"  v-bind:provinceId="provinceId" v-bind:cityId="cityId" v-bind:productType="this.cake"></product-type-select>
          </p>
          <p>
            <span>是否首页商品：</span>
            <i-switch v-model="isIndexProduct" @on-change="changeIsIndexSatus"/>
          </p>
        </div>
      </head-search>
      </div>
      <div>
        <Button type="success" icon="md-add" :to="{name: 'ProductAdd', params: {type: 'CAKE'}}">添加商品</Button>
        <Button type="error" @click="deleteProductByIds()" >批量{{productTypeText}}商品</Button>
      </div>
      <div class="cakeNews-container-content">
        <Table border @on-selection-change='selectionClick' ref="selection" :loading="loading" :columns="columns" :data="ProductData"></Table>
      </div>
      <div class="cakeNews-container-page">
        <Page :total="total" :page-size="limit" :current="offset + 1" @on-change="pageChange" show-elevator />
      </div>
    </section>
    <Modal
        v-model="recommendTypeModel"
        title="选择推荐类型"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>
          <RadioGroup v-model="recommendType">
            <Radio label="5">新品推荐</Radio>
            <Radio label="6">人气爆款</Radio>
          </RadioGroup>
        </p>
      </Modal>
  </div>
</template>
<script>
import HeadSearch from '../../components/HeadSearch.vue'
import RegionSelect from '../../components/RegionSelect.vue'
import ProductTypeSelect from '../../components/ProductTypeSelect.vue'
import { notBlank } from '../../mixin/mixin'
export default {
  name: 'productManage',
  components: {
    RegionSelect,
    HeadSearch,
    ProductTypeSelect
  },
  mixins: [notBlank],
  data () {
    return {
      provinceId: null,
      cityId: null,
      ProductData: [],
      id: null,
      ids: [],
      total: 0,
      offset: 0,
      limit: 10,
      loading: false,
      productName: null,
      fkCategoryId: null,
      buttonSize: 'large',
      productType: 1,
      productTypeText: '下架',
      isIndexProduct: false,
      productTypeSelect: '',
      recommendType: null,
      recommendTypeModel: false,
      columns: [{
        type: 'selection',
        width: 60,
        align: 'center'
      },
      {
        title: '序号',
        key: 'index',
        align: 'center',
        width: 60,
        render: (h, params) => {
          return h('div', [h('strong', 1 + params.index + this.offset * this.limit)])
        }
      },
      {
        title: '商品名称',
        key: 'name',
        align: 'center',
        tooltip: true
      },
      {
        title: '店铺名称',
        key: 'shopName',
        align: 'center',
        tooltip: true
      },
      {
        title: '分站省',
        key: 'proveniceName',
        align: 'center',
        tooltip: true
      },
      {
        title: '分站市',
        key: 'cityName',
        align: 'center',
        tooltip: true
      },
      {
        title: '原价',
        key: 'originalPrice',
        align: 'center',
        tooltip: true
      },
      {
        title: '优惠价',
        key: 'preferentialPrice',
        align: 'center',
        tooltip: true
      },
      {
        title: '操作',
        key: 'action',
        align: 'center',
        width: 230,
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'success',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.$router.push({
                    name: 'ProductAdd',
                    params: {
                      id: params.row.id,
                      cityId: params.row.cityId,
                      type: 'CAKE'
                    }
                  })
                }
              }
            }, '修改'),
            h('Button', {
              props: {
                type: 'info',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  console.log(params.row.onSale)
                  let status = params.row.onSale ? '2' : '1'
                  let text = params.row.onSale ? '下架' : '上架'
                  this.updateProductStatus(params.row.id, status, text)
                }
              }
            }, params.row.onSale ? '下架' : '重新上架'),
            h('Button', {
              props: {
                type: params.row.onSale ? ((params.row.recommend || params.row.hotProduct) ? 'error' : 'success') : 'error',
                size: 'small'
              },
              on: {
                click: () => {
                  let status = params.row.onSale ? ((params.row.recommend || params.row.hotProduct) ? '4' : '5') : '7'
                  let text = params.row.onSale ? ((params.row.recommend || params.row.hotProduct) ? '取消首页显示' : '推荐上首页') : '删除'
                  if (status !== '5') {
                    this.updateProductStatus(params.row.id, status, text)
                  } else {
                    this.id = params.row.id
                    this.recommendTypeModel = true
                  }
                }
              }
            }, params.row.onSale ? ((params.row.recommend || params.row.hotProduct) ? '取消首页显示' : '推荐上首页') : '删除')
          ])
        }
      }]
    }
  },
  created () {
    this.getProductData()
  },
  methods: {
    search () {
      this.offset = 0
      this.getProductData()
    },
    getProductData () {
      this.loading = true
      this.$axios.get('/product/queryProduct', {
        params: {
          offset: this.offset,
          limit: this.limit,
          provinceId: this.provinceId ? this.provinceId : null,
          // provinceId: 34,
          cityId: this.cityId ? this.cityId : null,
          type: this.cake,
          productStatus: this.productType,
          name: this.productName,
          recommend: this.isIndexProduct ? 1 : null,
          fkCategoryId: this.fkCategoryId
        }
      }).then(res => {
        this.loading = false
        if (res.data.code === 0) {
          this.ProductData = res.data.rows
          this.total = res.data.total
        }
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    updateProductStatus (id, type, text) {
      this.$Modal.confirm({
        title: '确定' + text + '该商品？',
        onOk: () => {
          this.$axios({
            url: '/product/updateProductStatusById',
            method: 'post',
            data: {
              _method: 'put',
              id: id,
              type: type
            }
          }).then(result => {
            let code = result.data.code
            if (code === 666) {
              this.$Message.success(text + '成功')
              this.getProductData()
            } else {
              this.$Message.warning(result.data.message)
            }
          }).catch(err => {
            this.loading = false
            console.log(err)
            this.$Message.error('操作失败')
          })
        }
      })
    },
    pageChange (index) {
      this.offset = index - 1
      this.getProductData()
    },
    getCurrentCity (data) {
      this.cityId = data
      this.getProductData()
    },
    getCurrentProvince (data) {
      this.provinceId = data
      this.getProductData()
    },
    changeIsIndexSatus (status) {
      this.isIndexProduct = status
      this.getProductData()
    },
    changeProductType (data) {
      if (data === 1) {
        this.productTypeText = '下架'
      } else {
        this.productTypeText = '删除'
      }
      this.productType = data
      this.getProductData()
    },
    getProductType (data) {
      this.fkCategoryId = data
      this.getProductData()
    },
    selectionClick (data) {
      for (var j = 0; j < data.length; j++) {
        this.ids.push(data[j].id)
      }
    },
    deleteProductByIds () {
      this.$Modal.confirm({
        title: '确定' + this.productTypeText + '所选商品吗？',
        onOk: () => {
          this.$axios({
            url: '/product/deleteProductByIds',
            method: 'post',
            data: {
              _method: 'delete',
              idsString: JSON.stringify(this.ids),
              // 2为下架 7为删除
              type: this.productType === 1 ? '2' : '7'
            }
          }).then(result => {
            let code = result.data.code
            if (code === 666) {
              this.$Message.success(this.productTypeText + '成功')
              this.getProductData()
            } else {
              this.$Message.warning(result.data.message)
            }
          }).catch(err => {
            this.loading = false
            console.log(err)
            this.$Message.error('登陆失败')
          })
        }
      })
    },
    ok () {
      if (this.$lodash.isNull(this.recommendType)) {
        this.$Message.info('请选择推荐类型')
      } else {
        this.$axios({
          url: '/product/updateProductStatusById',
          method: 'post',
          data: {
            _method: 'put',
            id: this.id,
            type: this.recommendType
          }
        }).then(result => {
          let code = result.data.code
          if (code === 666) {
            this.$Message.success('推荐上首页成功')
            this.getProductData()
          } else {
            this.$Message.warning(result.data.message)
          }
        }).catch(err => {
          this.loading = false
          console.log(err)
          this.$Message.error('操作失败')
        })
      }
    },
    cancel () {
      this.recommendType = null
    }
  }
}
</script>
<style lang="scss" scoped>
.cakeNews {
  &-searchContent {
    p {
      margin-right: 20px;
    }
  }
  &-container {
    > div {
      padding-bottom: 20px;
    }
    &-page {
      text-align: center;
    }
  }
}
</style>
