<template>
  <Tabs type="card">
                <TabPane label="banner管理">
<div class="cakeNews">
    <section class="cakeNews-container">
      <div>
        <Button type="primary" icon="md-add" @click="addRegionShopModel = true">添加banner图片</Button>
      </div>
      <div class="cakeNews-container-content">
        <Table border :loading="loading" :columns="columns" :data="bannerDataInfo"></Table>
      </div>
      <div class="cakeNews-container-page">
        <Page :total="total" :page-size="limit" size="small" show-elevator show-sizer show-total @on-change="changePage" @on-page-size-change="changePageSize"/>
      </div>
    </section>
  </div>
  </TabPane>
      <TabPane label="推荐商品展示">
        <div class="cakeNews">
    <section class="cakeNews-container">
      <div>
        <Button type="primary" icon="md-add" :to="{name: 'WebsiteProductAdd', params: {type: 'CAKE'}}" >新增商品</Button>
            <span>是否首页商品：</span>
            <i-switch v-model="isIndexProduct" @on-change="changeIsIndexSatus"/>
      </div>
      <div class="cakeNews-container-content">
        <Table border :columns="recommendColumns" :data="recommendDataInfo"></Table>
      </div>
      <div class="cakeNews-container-page">
          <Page :total="recommendTotal" :page-size="recommendLimit" size="small" show-elevator show-sizer show-total @on-change="changeRecommendPage" @on-page-size-change="changeRecommendPageSize" />
      </div>
    </section>
    <Modal
        v-model="addRegionShopModel"
        title="保存banner图片">
        <Form ref='formInline' :model='formInline' :rules='ruleInline' :label-width="80">
            <FormItem prop='bannerDescription' label="banner描述">
              <Input type='text' v-model='formInline.bannerDescription' placeholder='banner描述' />
            </FormItem>
            <FormItem label="banner图">
              <input style='display:block' @change='uploading($event, 1)' type='file' accept='image/*' />
              <img :src='formInline.bannerSrc' :style="{width: formInline.bannerSrc ? '100px' : '', height: formInline.bannerSrc ? '100px' : ''}"/>
            </FormItem>
            <FormItem label="hover图">
              <input style='display:block' @change='uploading($event, 2)' type='file' accept='image/*' />
              <img :src='formInline.hoverSrc' :style="{width: formInline.hoverSrc ? '100px' : '', height: formInline.hoverSrc ? '100px' : ''}"/>
            </FormItem>
            <FormItem prop='redirectUrl' label="跳转地址">
              <Input type='text' v-model='formInline.redirectUrl' placeholder='跳转地址' />
            </FormItem>
            <FormItem prop='orderno' label="排序">
              <Input type='text' v-model='formInline.orderno' placeholder='请填写排序' />
            </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="addRegionShopModel=false">取消</Button>
          <Button type="primary" size="large" @click="ok">确定</Button>
        </div>
      </Modal>

      <Modal
        v-model="addremcondModel"
        title="编辑商品">
        <Form ref='productFormInline' :model='productFormInline' :rules='productRuleInline' :label-width="80">
            <FormItem prop='name' label="商品名称">
              <Input type='text' v-model='productFormInline.name' placeholder='商品名称' />
            </FormItem>
             <FormItem label="商品图片">
              <input style='display:block' @change='uploading($event, 3)' type='file' accept='image/*' />
              <img :src='productFormInline.src' :style="{width: productFormInline.src ? '100px' : '', height: productFormInline.src ? '100px' : ''}"/>
            </FormItem>
            <FormItem label="hover图">
              <input style='display:block' @change='uploading($event, 4)' type='file' accept='image/*' />
              <img :src='productFormInline.hoverSrc' :style="{width: productFormInline.hoverSrc ? '100px' : '', height: productFormInline.hoverSrc ? '100px' : ''}"/>
            </FormItem>
            <FormItem prop='redirectUrl' label="跳转地址">
              <Input type='text' v-model='productFormInline.redirectUrl' placeholder='跳转地址' />
            </FormItem>
            <FormItem prop='orderno' label="排序">
              <Input type='text' v-model='productFormInline.orderno' placeholder='请填写排序' />
            </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="addremcondModel=false">取消</Button>
          <Button type="primary" size="large" @click="recommendok">确定</Button>
        </div>
      </Modal>
  </div>
      </TabPane>
  </Tabs>
</template>
<script>
import { notBlank } from '../../mixin/mixin'
export default {
  name: 'WebBannerList',
  components: {
  },
  mixins: [notBlank],
  data () {
    return {
      bannerDataInfo: [],
      recommendDataInfo: [],
      total: 0,
      offset: 0,
      limit: 10,
      recommendTotal: 0,
      recommendOffset: 0,
      recommendLimit: 10,
      isIndexProduct: false,
      loading: false,
      addRegionShopModel: false,
      addremcondModel: false,
      id: null,
      formInline: {
        id: null,
        bannerDescription: null,
        bannerSrc: null,
        bannerImg: null,
        hoverSrc: null,
        hoverImg: null,
        redirectUrl: null,
        orderno: null
      },
      productFormInline: {
        name: null,
        image: null,
        src: null,
        hoverSrc: null,
        hoverImg: null,
        redirectUrl: null,
        orderno: null
      },
      productRuleInline: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        image: [{ required: true, message: '请选择名称', trigger: 'blur' }],
        redirectUrl: [{ required: true, message: '请输入跳转地址', trigger: 'blur' }],
        orderno: [{required: true, message: '请选择排序', trigger: 'blur'}]
      },
      ruleInline: {
        name: [{ required: true, message: '请输入banner描述', trigger: 'blur' }],
        redirectUrl: [{ required: true, message: '请输入跳转地址', trigger: 'blur' }],
        orderno: [{required: true, message: '请输入排序', trigger: 'blur'}]
      },
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
          title: 'banner描述',
          key: 'bannerDescription',
          align: 'center',
          tooltip: true
        },
        {
          title: '跳转链接',
          key: 'redirectUrl',
          align: 'center',
          tooltip: true
        },
        {
          title: 'banner图片',
          align: 'center',
          render: (h, params) => {
            return h('div', {
              style: {
                display: 'table-cell',
                padding: '10px'
              }
            }, [
              h('img', {
                style: {
                  width: '120px',
                  verticalAlign: 'middle',
                  textAlign: 'center',
                  marginRight: '5px'
                },
                attrs: {
                  src: params.row.bannerUrl
                }
              })
            ])
          }
        },
        {
          title: 'hover图片',
          align: 'center',
          render: (h, params) => {
            return h('div', {
              style: {
                display: 'table-cell',
                padding: '10px'
              }
            }, [
              h('img', {
                style: {
                  width: '120px',
                  verticalAlign: 'middle',
                  textAlign: 'center',
                  marginRight: '5px'
                },
                attrs: {
                  src: params.row.hoverUrl
                }
              })
            ])
          }
        },
        {
          title: '排序',
          key: 'orderno',
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
                    this.$axios.get('/product/searchBannerById', {
                      params: {
                        bannerId: params.row.id
                      }
                    }).then(res => {
                      if (res.data.code === 0) {
                        this.id = res.data.banner.id
                        this.formInline.bannerDescription = res.data.banner.bannerDescription
                        this.formInline.bannerSrc = res.data.banner.bannerUrl
                        this.formInline.hoverSrc = res.data.banner.hoverUrl
                        this.formInline.redirectUrl = res.data.banner.redirectUrl
                        this.formInline.orderno = res.data.banner.orderno
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
                    this.deleteShopById(params.row.id, 'id')
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      recommendColumns: [
        {
          title: '序号',
          key: 'index',
          align: 'center',
          width: 60,
          render: (h, params) => {
            return h('div', [
              h('strong', 1 + params.index)
            ])
          }
        },
        {
          title: '商品名称',
          key: 'name',
          align: 'center',
          tooltip: true
        },
        {
          title: '商品图片',
          align: 'center',
          render: (h, params) => {
            return h('div', {
              style: {
                display: 'table-cell',
                padding: '10px'
              }
            }, [
              h('img', {
                style: {
                  width: '120px',
                  verticalAlign: 'middle',
                  textAlign: 'center',
                  marginRight: '5px'
                },
                attrs: {
                  src: params.row.imageUrl
                }
              })
            ])
          }
        },
        {
          title: 'hover图片',
          align: 'center',
          render: (h, params) => {
            return h('div', {
              style: {
                display: 'table-cell',
                padding: '10px'
              }
            }, [
              h('img', {
                style: {
                  width: '120px',
                  verticalAlign: 'middle',
                  textAlign: 'center',
                  marginRight: '5px'
                },
                attrs: {
                  src: params.row.hoverUrl
                }
              })
            ])
          }
        },
        {
          title: '排序',
          key: 'orderNo',
          align: 'center',
          tooltip: true
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 160,
          render: (h, params) => {
            if (this.isIndexProduct) {
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
                      this.addremcondModel = true
                      this.$axios.get('/product/searchRecommendProductById', {
                        params: {
                          id: params.row.id
                        }
                      }).then(res => {
                        if (res.data.code === 666) {
                          this.id = res.data.data.id
                          this.productFormInline.name = res.data.data.name
                          this.productFormInline.orderno = res.data.data.orderNo
                          this.productFormInline.src = res.data.data.imageUrl
                          this.productFormInline.hoverSrc = res.data.data.hoverUrl
                          this.productFormInline.redirectUrl = res.data.data.redirectUrl
                        }
                      }).catch(err => {
                        console.log(err)
                        this.loading = false
                      })
                    }
                  }
                }, '编辑')
              ])
            } else if (!params.row.recommend) {
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
                      this.$router.push({
                        name: 'WebsiteProductAdd',
                        params: {
                          id: params.row.id,
                          type: 'CAKE'
                        }
                      })
                    }
                  }
                }, '修改'),
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
                      this.$Modal.confirm({
                        title: '确定推荐该商品上首页吗？',
                        onOk: () => {
                          this.$axios({
                            url: '/product/updateWebSiteProductStatusById',
                            method: 'post',
                            data: {
                              _method: 'put',
                              id: params.row.id
                            }
                          }).then(result => {
                            let code = result.data.code
                            if (code === 666) {
                              this.$Message.success('操作成功')
                              this.getRecommendDataInfo()
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
                    }
                  }
                }, '推荐上首页')
              ])
            } else {
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
                      this.$router.push({
                        name: 'WebsiteProductAdd',
                        params: {
                          id: params.row.id,
                          type: 'CAKE'
                        }
                      })
                    }
                  }
                }, '修改')
              ])
            }
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
    this.getBannerDataInfo()
    this.getRecommendDataInfo()
  },
  watch: {
    addRegionShopModel (newVal, oldVal) {
      if (!newVal) this.cancel()
    },
    addremcondModel (newVal, oldVal) {
      if (!newVal) this.recommendcancel()
    }
  },
  methods: {
    getBannerDataInfo () {
      this.loading = true
      this.$axios.get('/product/searchBanner', {
        params: {
          offset: this.offset,
          limit: this.limit
        }
      }).then(res => {
        this.loading = false
        if (res.data.code === 0) {
          this.bannerDataInfo = res.data.rows
          this.total = res.data.total
        }
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    getRecommendDataInfo () {
      this.$axios.get('/product/searchRecommendProduct', {
        params: {
          offset: this.recommendOffset,
          limit: this.recommendLimit,
          recommend: this.isIndexProduct
        }
      }).then(res => {
        this.loading = false
        if (res.data.code === 0) {
          this.recommendDataInfo = res.data.rows
          this.recommendTotal = res.data.total
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changeIsIndexSatus (status) {
      this.offset = 0
      this.getRecommendDataInfo()
    },
    deleteShopById (id, type) {
      let messageText = '是否删除该banner'
      this.$Modal.confirm({
        title: messageText,
        onOk: () => {
          this.$axios({
            url: '/product/deleteBanner',
            method: 'post',
            data: {
              _method: 'delete',
              bannerId: id,
              type: type
            }
          }).then(result => {
            let code = result.data.code
            if (code === 666) {
              this.$Message.success('删除成功')
              this.getBannerDataInfo()
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
    recommendPageChange (index) {
      this.regionSetOffset = index - 1
      this.getShopDataInfo()
    },
    recommendok () {
      this.$refs['productFormInline'].validate(valid => {
        if (this.$lodash.isNull(this.id) && (this.$lodash.isNull(this.productFormInline.image) || this.$lodash.isNull(this.productFormInline.hoverImg))) {
          this.$Message.info('请上传文件')
        } else if (valid) {
          let formData = new FormData()
          formData.append('id', this.id)
          formData.append('name', this.productFormInline.name)
          formData.append('orderNo', this.productFormInline.orderno)
          formData.append('productMainImg', this.productFormInline.image)
          formData.append('hoverImg', this.productFormInline.hoverImg)
          formData.append('redirectUrl', this.productFormInline.redirectUrl)
          this.$axios({
            url: '/product/updateRecommendProduct',
            method: 'post',
            headers: {'Content-Type': 'multipart/form-data'},
            data: formData
          }).then(result => {
            let code = result.data.code
            if (code === 666) {
              this.$Message.success('保存成功')
              this.addremcondModel = false
              this.getRecommendDataInfo()
            } else {
              this.$Message.warning(result.data.message)
            }
          }).catch(err => {
            console.log(err)
            this.$Message.error('系统异常,请联系管理员')
          })
        }
      })
    },
    uploading (event, index) {
      // 获取文件
      var windowURL = window.URL || window.webkitURL
      if (index === 1) {
        this.formInline.bannerImg = event.target.files[0] // 创建图片文件的url
        this.formInline.bannerSrc = windowURL.createObjectURL(event.target.files[0])
      } else if (index === 2) {
        this.formInline.hoverImg = event.target.files[0] // 创建图片文件的url
        this.formInline.hoverSrc = windowURL.createObjectURL(event.target.files[0])
      } else if (index === 3) {
        this.productFormInline.image = event.target.files[0] // 创建图片文件的url
        this.productFormInline.src = windowURL.createObjectURL(event.target.files[0])
      } else if (index === 4) {
        this.productFormInline.hoverImg = event.target.files[0] // 创建图片文件的url
        this.productFormInline.hoverSrc = windowURL.createObjectURL(event.target.files[0])
      }
    },
    recommendcancel () {
      this.$refs['productFormInline'].resetFields()
      this.id = null
      this.productFormInline.name = null
      this.productFormInline.orderno = null
      this.productFormInline.image = null
      this.productFormInline.src = null
      this.productFormInline.hoverImg = null
      this.productFormInline.hoverSrc = null
      this.productFormInline.redirectUrl = null
    },
    ok () {
      this.$refs['formInline'].validate(valid => {
        if (this.$lodash.isNull(this.id) && (this.$lodash.isNull(this.formInline.bannerImg) || this.$lodash.isNull(this.formInline.hoverImg))) {
          this.$Message.info('请上传文件')
        } else if (valid) {
          let formData = new FormData()
          formData.append('id', this.id)
          formData.append('bannerDescription', this.formInline.bannerDescription)
          formData.append('redirectUrl', this.formInline.redirectUrl)
          formData.append('orderno', this.formInline.orderno)
          formData.append('bannerImg', this.formInline.bannerImg)
          formData.append('hoverImg', this.formInline.hoverImg)
          this.$axios({
            url: '/product/saveBanner',
            method: 'post',
            headers: {'Content-Type': 'multipart/form-data'},
            data: formData
          }).then(result => {
            let code = result.data.code
            if (code === 666) {
              this.$Message.success('保存成功')
              this.addRegionShopModel = false
              this.getBannerDataInfo()
            } else {
              this.$Message.warning(result.data.message)
            }
          }).catch(err => {
            console.log(err)
            this.$Message.error('系统异常,请联系管理员')
          })
        }
      })
    },
    cancel () {
      this.$refs['formInline'].resetFields()
      this.id = null
      this.formInline.bannerDescription = null
      this.formInline.orderno = null
      this.formInline.bannerSrc = null
      this.formInline.bannerImg = null
      this.formInline.hoverImg = null
      this.formInline.hoverSrc = null
      this.formInline.redirectUrl = null
      this.formInline.orderno = null
    },
    /**
     * @name  切换页码
     * @param page  当前页码
     */
    changePage (page) {
      this.offset = page
      this.getBannerDataInfo()
    },
    /**
     * @name  切换每页显示数量
     * @param pageSize  当前每页显示数量
     */
    changePageSize (pageSize) {
      this.limit = pageSize
      this.getBannerDataInfo()
    },
    /**
     * @name  切换页码
     * @param page  当前页码
     */
    changeRecommendPage (page) {
      this.recommendOffset = page
      this.getRecommendDataInfo()
    },
    /**
     * @name  切换每页显示数量
     * @param pageSize  当前每页显示数量
     */
    changeRecommendPageSize (pageSize) {
      this.recommendLimit = pageSize
      this.getRecommendDataInfo()
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
