<template>
  <Tabs type="card">
                <TabPane label="店铺列表">
<div class="cakeNews">
    <head-search @hander-search="search">
      <div class="cakeNews-searchContent fx">
      <p>店铺:</p>
      <p><Input v-model="shopName" placeholder="请输入店铺名称" clearable style="width: 200px" /></p>
      <p>发布时间:</p>
      <P><DatePicker type="date" format="yyyy-MM-dd" placeholder="Select date" style="width: 200px" v-model="newsTime"></DatePicker></P>
    </div>
    </head-search>
    <section class="cakeNews-container">
      <div>
        <Button type="primary" icon="md-add" to="/WebShopList/WebShopAdd" >新建店铺</Button>
      </div>
      <div class="cakeNews-container-content">
        <Table border :loading="loading" :columns="columns" :data="shopDataInfo"></Table>
      </div>
      <div class="cakeNews-container-page">
        <Page :total="total" :page-size="limit" size="small" show-elevator show-sizer show-total @on-change="changePage" @on-page-size-change="changePageSize"/>
      </div>
    </section>
  </div>
  </TabPane>
      <TabPane label="城市设置">
        <div class="cakeNews">
    <section class="cakeNews-container">
      <div>
        <Button type="primary" icon="md-add" @click="addRegionShopModel = true" >新建店铺</Button>
      </div>
      <div class="cakeNews-container-content">
        <Table border :columns="regionSetColumns" :data="regionSetInfo"></Table>
      </div>
      <div class="cakeNews-container-page">
        <Page :total="regionSetTotal" :page-size="regionSetLimit" size="small" show-elevator show-sizer show-total @on-change="regionChangePage" @on-page-size-change="regionChangePageSize"/>
      </div>
    </section>
    <Modal
        v-model="addRegionShopModel"
        title="保存商品分类"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>
        <Row>
        <Col span="4">店铺地址:</Col>
        <Col span="20">
          <Row :gutter="16">
            <Col span="8">
              <Select v-model="provinceId" filterable clearable @on-change="getCityListByProvince()" placeholder="请选择省份">
                <Option v-for="item in provinceList" :value="item.id" :key="item.id">{{ item.value }}</Option>
              </Select>
            </Col>
            <Col span="8">
              <Select v-model="cityId" filterable clearable @on-change="$emit('getCurrentCity', cityId)" placeholder="请选择城市">
                <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.value }}</Option>
              </Select>
            </Col>
          </Row>
        </Col>
    </Row>
        </p>
        <p>
          <label>
            <span style="margin-right:10px;">详细地址</span>
            <Button type="primary" @click="add" shape="circle" icon="md-add-circle"></Button>
            <div class="fx" v-for="(name, index) in addressForm" :key="index" style="margin-bottom:10px">
              <Input v-model="name.name" style="width:50%;"/>
              <Button type="primary" @click="deleteItem(index)" shape="circle" icon="md-remove-circle"></Button>
              <br/>
            </div>
          </label>
        </p>
        <br/>
      </Modal>
  </div>
      </TabPane>
  </Tabs>
</template>
<script>
import { notBlank } from '../../mixin/mixin'
import HeadSearch from '../../components/HeadSearch.vue'
export default {
  name: 'WebShopList',
  components: {
    HeadSearch
  },
  mixins: [notBlank],
  data () {
    return {addressForm: [{ name: '' }],
      provinceId: null,
      cityId: null,
      shopName: '',
      shopDataInfo: [],
      regionSetInfo: [],
      provinceList: [],
      cityList: [],
      total: 0,
      offset: 0,
      limit: 10,
      regionSetTotal: 0,
      regionSetOffset: 0,
      regionSetLimit: 10,
      loading: false,
      addRegionShopModel: false,
      id: null,
      fkRegionId: null,
      name: null,
      newsTime: null,
      address: null,
      cityAddress: [],
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
          title: '店铺标题',
          key: 'name',
          align: 'center',
          tooltip: true
        },
        {
          title: '发布时间',
          key: 'createdTime',
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
                    // this.$router.push(`/CakeNews/CakeNewsAdd/${params.row.id}`)
                    this.$router.push({
                      name: 'WebShopAdd',
                      params: {
                        id: params.row.id
                      }
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
                    this.deleteShopById(params.row.id, 'id')
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      regionSetColumns: [
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
          title: '店铺地址',
          key: 'address',
          align: 'center',
          tooltip: true
        },
        {
          title: '详细地址',
          key: 'detailAddress',
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
                    this.addRegionShopModel = true
                    this.getProvinceList()
                    this.$axios.get('/shop/searchShopByRegionId', {
                      params: {
                        regionId: params.row.regionId
                      }
                    }).then(res => {
                      if (res.data.code === 666) {
                        this.addressForm = []
                        for (var key in res.data.data.shopList) {
                          this.addressForm.push({name: res.data.data.shopList[key].address})
                        }
                        console.log(this.addressForm)
                        this.provinceId = res.data.data.provinceId
                        this.getCityListByProvince()
                        this.cityId = res.data.data.regionId
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
                    this.deleteShopById(params.row.regionId, 'fk_region_id')
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
  beforeRouteLeave (to, from, next) {
    this.$destroy()
    next()
  },
  computed: {
    releaseTime () {
      return this.newsTime ? this.$moment(this.newsTime).format('YYYY-MM-DD') : null
    }
  },
  created () {
    this.getShopDataInfo()
    this.getRegionSetShopDataInfo()
    this.getProvinceList()
  },
  methods: {
    search () {
      this.offset = 0
      this.getShopDataInfo()
    },
    add () {
      this.addressForm.push({name: ''})
    },
    deleteItem (index) {
      this.addressForm.splice(index, 1)
      console.log(index)
    },
    getRoleInfo () {
      this.$axios.get('/admin/queryAllRole', {
        params: {
        }
      }).then(res => {
        if (res.data.code === 666) {
          this.roleInfoList = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getProvinceList () {
      this.$axios.get('/common/queryRegionByRole', {
        params: {
        }
      }).then(res => {
        if (res.data.code === 666) {
          this.provinceList = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getCityListByProvince () {
      this.cityId = null
      this.$axios.get('/common/queryCityIdByProvinceId', {
        params: {
          provinceId: this.provinceId
        }
      }).then(res => {
        if (res.data.code === 666) {
          this.cityList = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getShopDataInfo () {
      this.loading = true
      this.$axios.get('/shop/searchShopInfo', {
        params: {
          offset: this.offset,
          limit: this.limit,
          provinceId: this.provinceId ? this.provinceId : '',
          // provinceId: 34,
          searchDate: this.releaseTime ? this.releaseTime : null,
          searchCondition: this.shopName
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
    getRegionSetShopDataInfo () {
      this.$axios.get('/shop/searchShopAddress', {
        params: {
          offset: this.regionSetOffset,
          limit: this.regionSetLimit
        }
      }).then(res => {
        this.loading = false
        if (res.data.code === 0) {
          this.regionSetInfo = res.data.rows
          this.regionSetTotal = res.data.total
        }
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    deleteShopById (id, type) {
      let messageText = ''
      if (type === 'fk_region_id') {
        messageText = '确定删除城市下店铺'
      } else {
        messageText = '确定删除该店铺'
      }
      this.$Modal.confirm({
        title: messageText,
        onOk: () => {
          this.$axios({
            url: '/shop/removeShopById',
            method: 'post',
            data: {
              _method: 'put',
              id: id,
              type: type
            }
          }).then(result => {
            let code = result.data.code
            if (code === 666) {
              this.$Message.success('删除成功')
              if (type === 'fk_region_id') {
                this.getRegionSetShopDataInfo()
              } else {
                this.getShopDataInfo()
              }
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
      this.offset = page
      this.getShopDataInfo()
    },
    changePageSize (pageSize) {
      this.limit = pageSize
      this.getShopDataInfo()
    },
    regionChangePage (page) {
      this.offset = page
      this.getRegionSetShopDataInfo()
    },
    regionChangePageSize (pageSize) {
      this.limit = pageSize
      this.getRegionSetShopDataInfo()
    },
    getInputCurrentCity (data) {
      this.fkRegionId = data
    },
    ok () {
      if (this.$lodash.isNull(this.cityId) || this.$lodash.isNull(this.addressForm[0].name)) {
        this.$Message.info('请补全表单')
      } else {
        for (var key in this.addressForm) {
          this.cityAddress.push({address: this.addressForm[key].name})
        }
        this.$axios({
          url: '/shop/saveCityProfile',
          method: 'post',
          data: {
            id: this.id,
            regionId: this.cityId,
            cityAddress: JSON.stringify(this.cityAddress)
          }
        }).then(result => {
          let code = result.data.code
          if (code === 666) {
            this.$Message.success('保存成功')
            this.getRegionSetShopDataInfo()
          } else {
            this.$Message.warning(result.data.message)
          }
        }).catch(err => {
          console.log(err)
          this.$Message.error('系统异常,请联系管理员')
        })
      }
      this.cancel()
    },
    cancel () {
      this.addressForm = [{ name: '' }]
      this.name = null
      this.provinceId = null
      this.cityList = []
      this.cityId = null
      this.id = null
      this.cityAddress = []
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
