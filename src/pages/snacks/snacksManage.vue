<template>
  <div class="cakeNews">
    <section class="cakeNews-container" style="margin-top:30px">
      <div>
         <Tabs type="card"  @on-click="activeTab">
            <TabPane  label="上架商品" name="1"></TabPane>
            <TabPane  label="已下架商品" name="0"></TabPane>
        </Tabs>
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
            <product-type-select @getProductType="getProductType"  v-bind:productType="this.snake"></product-type-select>
          </p>
          <p>
            <span>是否首页商品：</span>
            <i-switch v-model="isIndexProduct" @on-change="changeIsIndexSatus"/>
          </p>
        </div>
      </head-search>
      </div>
      <div>
        <Button type="primary" icon="md-add" :to="{name: 'ProductAdd', params: {type: 'SNACK'}}">添加商品</Button>
        <Button type="error" @click="deleteProductByIds()" >批量{{productTypeText}}商品</Button>
      </div>
      <div class="cakeNews-container-content">
        <Table border @on-selection-change='selectionClick' ref="selection" :loading="loading" :columns="columns" :data="ProductData"></Table>
      </div>
      <div class="cakeNews-container-page">
        <Page :total="total" :page-size="pageSize" size="small" show-elevator show-sizer show-total @on-change="changePage" @on-page-size-change="changePageSize" />
      </div>
    </section>
        <Modal
        v-model="recommendTypeModel"
        title="选择推荐类型">
        <p>
          <span>推荐类型：</span>
          <RadioGroup v-model="recommendType">
            <Radio label="5">新品推荐</Radio>
            <Radio label="6">人气爆款</Radio>
          </RadioGroup>
        </p>
        <br/>
        <p>
           <span  v-if="recommendType === '5'" >推荐位置：</span>
            <Select v-model="recommendIndex" v-if="recommendType === '5'" filterable clearable  placeholder="请推荐位置">
              <Option value="1">左上一</Option>
              <Option value="2">中上</Option>
              <Option value="3">中下</Option>
              <Option value="4">右</Option>
            </Select>
        </p>
        <p>
          推荐商品图片:<input id='fileinput' style='display:block' @change='uploading($event)' type='file' accept='image/*' />
          <img :src='src' :style="{width: src ? '100px' : '', height: src ? '100px' : ''}"/>
        </p>
        <div slot="footer">
          <Button type="text" size="large" @click="recommendTypeModel=false">取消</Button>
          <Button type="primary" size="large" @click="ok">确定</Button>
      </div>
      </Modal>
  </div>
</template>
<script>
import HeadSearch from '../../components/HeadSearch.vue'
import ProductTypeSelect from '../../components/ProductTypeSelect.vue'
import { notBlank } from '../../mixin/mixin'
export default {
  name: 'snacksManage',
  components: {
    HeadSearch,
    ProductTypeSelect
  },
  mixins: [notBlank],
  data () {
    return {
      ProductData: [],
      ids: [],
      total: 0,
      page: 1,
      pageSize: 10,
      loading: false,
      productName: null,
      fkCategoryId: null,
      buttonSize: 'large',
      productType: 1,
      productTypeText: '下架',
      isIndexProduct: false,
      recommendTypeModel: false,
      recommendType: null,
      productTypeSelect: '',
      recommendIndex: null,
      src: '',
      file: null,
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
          return h('div', [h('strong', 1 + params.index)])
        }
      },
      {
        title: '商品名称',
        key: 'name',
        align: 'center',
        tooltip: true
      },
      {
        title: '分类',
        key: 'value',
        align: 'center',
        tooltip: true
      },
      {
        title: '规格',
        key: 'specValue',
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
                      type: 'SNACK'
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
                type: params.row.onSale ? (params.row.recommend ? 'error' : 'success') : 'error',
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
            }, params.row.onSale ? (params.row.recommend ? '取消首页显示' : '推荐上首页') : '删除')
          ])
        }
      }]
    }
  },
  created () {
    this.getProductData()
  },
  watch: {
    recommendTypeModel (val) {
      if (!val) this.cancel()
    },
    recommendType (val) {
      if (val === '6' || val === null) this.recommendIndex = null
    }
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
          offset: this.page,
          limit: this.pageSize,
          type: this.snake,
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
              // _method: 'put',
              id: id,
              type: type,
              index: this.recommendIndex
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
    uploading (event) {
      // 获取文件
      var windowURL = window.URL || window.webkitURL
      this.file = event.target.files[0] // 创建图片文件的url
      this.src = windowURL.createObjectURL(event.target.files[0])
    },
    changePage (page) {
      this.page = page
      this.getProductData()
    },
    changePageSize (pageSize) {
      this.pageSize = pageSize
      this.getProductData()
    },
    changeIsIndexSatus (status) {
      this.isIndexProduct = status
      this.getProductData()
    },
    activeTab (name) {
      // 1 上架商品 0  为下架商品
      if (name === '1') {
        this.productTypeText = '下架'
      } else {
        this.productTypeText = '删除'
      }
      this.productType = name
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
      } else if (this.$lodash.isNull(this.file)) {
        this.$Message.info('请选择文件')
      } else {
        let form = new FormData()
        // form.append('_method','put')
        form.append('id', this.id)
        form.append('type', this.recommendType)
        form.append('file', this.file)
        form.append('index', this.recommendIndex)
        this.$axios({
          url: '/product/updateProductStatusById',
          headers: {'Content-Type': 'multipart/form-data'},
          method: 'post',
          data: form
        }).then(result => {
          let code = result.data.code
          if (code === 666) {
            this.$Message.success('推荐上首页成功')
            this.recommendTypeModel = false
            this.getProductData()
          } else {
            this.$Message.warning(result.data.message)
          }
        }).catch(err => {
          // this.loading = false
          console.log(err)
          this.$Message.error('操作失败')
        })
      }
    },
    cancel () {
      this.recommendType = null
      this.file = null
      this.src = null
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
