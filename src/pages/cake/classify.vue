<template>
  <div class="cakeNews">
      <div>
        <Button type="primary" icon="md-add" @click="addProductTypeModel = true" >添加商品分类</Button>
      </div>
    <section class="cakeNews-container" style="margin-top:30px">
      <div class="cakeNews-container-content">
        <Table border :loading="loading" :columns="columns" :data="productTypeDate"></Table>
      </div>
      <div class="cakeNews-container-page">
        <Page :total="total" :page-size="limit" size="small" show-elevator show-sizer show-total @on-change="changePage" @on-page-size-change="changePageSize"/>
      </div>
    </section>
    <Modal
        v-model="addProductTypeModel"
        title="保存商品分类">
        <p>
          <label>
            <span style="margin-right:10px;">分类名称</span>
            <Input v-model="typeName" placeholder="请填写分类名称" clearable style="width: 200px" />
          </label>
        </p>
        <br/>
        <p>
          <label>
            <span style="margin-right:10px;">序号</span>
            <Input v-model="seq" placeholder="请填写序号" clearable style="width: 200px" />
            </label>
        </p>
        <div slot="footer">
          <Button type="text" size="large" @click="addProductTypeModel=false">取消</Button>
          <Button type="primary" size="large" @click="ok">确定</Button>
        </div>
      </Modal>
  </div>
</template>
<script>
import { notBlank } from '../../mixin/mixin'
export default {
  name: 'classify',
  components: {
  },
  mixins: [notBlank],
  data () {
    return {
      productTypeDate: [],
      ids: [],
      total: 0,
      offset: 0,
      limit: 10,
      loading: false,
      addProductTypeModel: false,
      typeName: null,
      seq: null,
      id: null,
      columns: [
        {
          title: '序号',
          key: 'seq',
          align: 'center',
          tooltip: true
        },
        {
          title: '分类名称',
          key: 'value',
          align: 'center',
          tooltip: true
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 160,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.addProductTypeModel = true
                    this.$axios.get('/product/queryProductTypeById', {
                      params: {
                        id: params.row.id
                      }
                    }).then(res => {
                      if (res.data.code === 666) {
                        this.typeName = res.data.data.value
                        this.seq = res.data.data.seq
                        this.id = res.data.data.id
                      }
                    }).catch(err => {
                      console.log(err)
                      this.loading = false
                    })
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'text'
                },
                on: {
                  click: () => {
                    this.deleteNews(params.row.id)
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
    }
  },
  props: {
    productType: {
      type: String,
      required: false
    }
  },
  watch: {
    addProductTypeModel (newVal, oldVal) {
      if (!newVal) this.cancel()
    }
  },
  created () {
    this.getProductTypeData()
  },
  methods: {
    getProductTypeData () {
      this.loading = true
      this.$axios.get('/product/queryProductType', {
        params: {
          offset: this.offset,
          limit: this.limit,
          type: this.productType
        }
      }).then(res => {
        this.loading = false
        if (res.data.code === 0) {
          this.productTypeDate = res.data.rows
          this.total = res.data.total
        }
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    deleteNews (id) {
      this.$Modal.confirm({
        title: '确定删除该分类吗？',
        onOk: () => {
          this.ids.push(id)
          this.$axios({
            url: '/product/deleteProductTypeByIds',
            method: 'post',
            data: {
              _method: 'delete',
              idsString: JSON.stringify(this.ids)
            }
          }).then(result => {
            let code = result.data.code
            if (code === 666) {
              this.$Message.success('删除成功')
              this.getProductTypeData()
            } else {
              this.$Message.warning(result.data.message)
            }
          }).catch(err => {
            this.loading = false
            console.log(err)
            this.$Message.error('删除失败')
          })
        }
      })
    },
    changePage (page) {
      this.offset = page - 1
      this.getProductTypeData()
    },
    changePageSize (pageSize) {
      this.limit = pageSize
      this.getProductTypeData()
    },
    getCurrentCity (data) {
      this.cityId = data + ''
      this.getProductTypeData()
    },
    ok () {
      if (!this.typeName && !this.seq) {
        this.$Message.info('请补全表单')
      } else {
        this.$axios({
          url: '/product/saveProductType',
          method: 'post',
          data: {
            id: this.id,
            value: this.typeName,
            seq: this.seq,
            type: this.productType
          }
        }).then(result => {
          let code = result.data.code
          if (code === 666) {
            this.$Message.success('保存成功')
            this.getProductTypeData()
            this.addProductTypeModel = false
          } else {
            this.$Message.warning(result.data.message)
          }
        }).catch(err => {
          console.log(err)
          this.$Message.error('系统异常,请联系管理员')
        })
      }
    },
    cancel () {
      this.id = null
      this.typeName = null
      this.seq = null
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
