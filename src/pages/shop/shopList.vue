<template>
  <div class="cakeNews">
    <head-search @hander-search="search">
      <div class="cakeNews-searchContent fx">
      <p>店铺:</p>
      <p><Input v-model="shopName" placeholder="请输入店铺名称" clearable style="width: 200px" /></p>
      <p>地址:</p>
      <p><region-select @getCurrentCity="getCurrentCity" @getCurrentProvince="getCurrentProvince"></region-select></p>
    </div>
    </head-search>
    <section class="cakeNews-container">
      <div>
        <Button type="primary" icon="md-add" @click="addProductTypeModel = true" >新建店铺</Button>
      </div>
      <div class="cakeNews-container-content">
        <Table border :loading="loading" :columns="columns" :data="shopDataInfo"></Table>
      </div>
      <div class="cakeNews-container-page">
        <Page :total="total" :page-size="limit" :current="offset + 1" @on-change="pageChange" show-elevator />
      </div>
    </section>
    <Modal
        v-model="addProductTypeModel"
        title="保存商品分类"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>
          <label>
            <span style="margin-right:10px;">店铺名称</span>
            <Input v-model="name" placeholder="请填写店铺名称" clearable style="width: 200px" />
          </label>
        </p>
        <p>
          <label>
            <span style="margin-right:10px;">门店地址</span>
            <Input v-model="address" placeholder="门店地址" clearable style="width: 200px" />
          </label>
        </p>
        <p>
          <label>
            <span style="margin-right:10px;">联系电话</span>
            <Input v-model="contactNumber" placeholder="联系电话" clearable style="width: 200px" />
          </label>
        </p>
        <br/>
        <p>
          <label>
            <span style="margin-right:10px;">城市</span>
                <region-select @getCurrentCity="getInputCurrentCity"></region-select>
            </label>
        </p>
      </Modal>
  </div>
</template>
<script>
import RegionSelect from '../../components/RegionSelect.vue'
import { notBlank } from '../../mixin/mixin'
import HeadSearch from '../../components/HeadSearch.vue'
export default {
  name: 'cakeNews',
  components: {
    RegionSelect,
    HeadSearch
  },
  mixins: [notBlank],
  data () {
    return {
      provinceId: null,
      cityId: null,
      shopName: '',
      shopDataInfo: [],
      total: 0,
      offset: 0,
      limit: 10,
      loading: false,
      addProductTypeModel: false,
      id: null,
      fkRegionId: null,
      name: null,
      address: null,
      contactNumber: null,
      columns: [
        {
          title: '序号',
          key: 'index',
          align: 'center',
          width: 60,
          render: (h, params) => {
            return h('div', [
              h('strong', 1 + params.index + this.offset * this.limit)
            ])
          }
        },
        {
          title: '店铺名称',
          key: 'name',
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
                on: {
                  click: () => {
                    this.deleteShopById(params.row.id)
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
  created () {
    this.getShopDataInfo()
  },
  methods: {
    search () {
      this.offset = 0
      this.getShopDataInfo()
    },
    getShopDataInfo () {
      this.loading = true
      this.$axios.get('/shop/queryShop', {
        params: {
          offset: this.offset,
          limit: this.limit,
          provinceId: this.provinceId ? this.provinceId : '',
          // provinceId: 34,
          cityId: this.cityId ? this.cityId : null,
          name: this.shopName
        }
      }).then(res => {
        this.loading = false
        if (res.data.code === 0) {
          this.shopDataInfo = res.data.rows
          this.total = res.data.total
        }
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    deleteShopById (id) {
      this.$Modal.confirm({
        title: '确定删除该店铺吗？',
        onOk: () => {
          this.$axios({
            url: '/shop/deleteShopById',
            method: 'post',
            data: {
              _method: 'delete',
              id: id
            }
          }).then(result => {
            let code = result.data.code
            if (code === 666) {
              this.$Message.success('删除成功')
              this.getShopDataInfo()
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
    pageChange (index) {
      this.offset = index - 1
      this.getShopDataInfo()
    },
    getCurrentCity (data) {
      this.cityId = data
      this.getShopDataInfo()
    },
    getCurrentProvince (data) {
      this.provinceId = data
      this.getShopDataInfo()
    },
    getInputCurrentProvince (data) {

    },
    getInputCurrentCity (data) {
      this.fkRegionId = data
    },
    ok () {
      if (this.$lodash.isNull(this.id) && this.$lodash.isNull(this.fkRegionId)) {
        this.$Message.info('请选择城市')
      } else if (!this.name) {
        this.$Message.info('请补全表单')
      } else {
        this.$axios({
          url: '/shop/saveShop',
          method: 'post',
          data: {
            id: this.id,
            fkRegionId: this.fkRegionId,
            name: this.name,
            address: this.address,
            contactNumber: this.contactNumber
          }
        }).then(result => {
          let code = result.data.code
          if (code === 666) {
            this.$Message.success('保存成功')
            this.getProductTypeData()
          } else {
            this.$Message.warning(result.data.message)
          }
        }).catch(err => {
          this.loading = false
          console.log(err)
          this.$Message.error('系统异常,请联系管理员')
        })
        this.cancel()
      }
    },
    cancel () {
      this.id = null
      this.name = null
      this.address = null
      this.contactNumber = null
      this.fkRegionId = null
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
