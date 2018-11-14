<template>
  <div class="cakeNews">
    <section class="cakeNews-container" style="margin-top:30px">
      <Tabs @on-click="activeTab">
        <TabPane label="未读"  name="0" ></TabPane>
        <TabPane label="已读"  name="1" ></TabPane>
    </Tabs>
    <Button type="error" @click="deleteEmailByIds()" >批量删除</Button>
      <div class="cakeNews-container-content">
        <Table border @on-selection-change='selectionClick' ref="selection" :loading="loading" :columns="columns" :data="emailListDate"></Table>
      </div>
      <div class="cakeNews-container-page">
        <Page :total="total" :page-size="limit" size="small" show-elevator show-sizer show-total @on-change="changePage" @on-page-size-change="changePageSize"/>
      </div>
    </section>
    <Drawer :closable="false" width="640" v-model="emailDrawer">
            <br/>
            <br/>
            <p :style="pStyle">发件人：{{byNickName}}</p>
            <p :style="pStyle">邮箱：{{emailAddress}}</p>
            <p :style="pStyle">主题：{{subject}}</p>
            <p :style="pStyle">发件时间：{{sendTime}}</p>
            <p :style="pStyle">邮件内容：</p>
            <div class="demo-drawer-profile">
              {{content}}
            </div>
        </Drawer>
  </div>
</template>
<script>
export default {
  name: 'emailList',
  components: {
  },
  data () {
    return {
      emailListDate: [],
      ids: [],
      total: 0,
      offset: 0,
      limit: 10,
      loading: false,
      isRead: false,
      isDelete: false,
      byNickName: null,
      emailAddress: null,
      subject: null,
      content: null,
      sendTime: null,
      emailDrawer: false,
      pStyle: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px'
      },
      columns: [
        {
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
            return h('div', [
              h('strong', 1 + params.index + this.offset * this.limit)
            ])
          }
        },
        {
          title: '发件人',
          key: 'emailAddress',
          align: 'center',
          tooltip: true
        },
        {
          title: '主题',
          key: 'subject',
          align: 'center',
          tooltip: true
        },
        {
          title: '详细信息',
          key: 'subject',
          align: 'center',
          tooltip: true
        },
        {
          title: '发送时间',
          key: 'sendTime',
          align: 'center',
          tooltip: true
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 150,
          render: (h, params) => {
            if (!params.row.isRead) {
              return h('div', [
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
                      this.viewEmail(params)
                    }
                  }
                }, '查看详情'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    marginTop: '2px'
                  },
                  on: {
                    click: () => {
                      this.updateEmail(params.row.emailId, 'READ')
                    }
                  }
                }, '已读'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    marginTop: '2px'
                  },
                  on: {
                    click: () => {
                      this.updateEmail(params.row.emailId, 'DELETE')
                    }
                  }
                }, '删除')
              ])
            } else {
              return h('div', [
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
                      this.viewEmail(params)
                    }
                  }
                }, '查看详情'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    marginTop: '2px'
                  },
                  on: {
                    click: () => {
                      this.updateEmail(params.row.emailId, 'DELETE')
                    }
                  }
                }, '删除')
              ])
            }
          }
        }
      ]
    }
  },
  watch: {
    addProductTypeModel (newVal, oldVal) {
      if (!newVal) this.cancel()
    }
  },
  created () {
    this.getEmailListData()
  },
  methods: {
    getEmailListData () {
      this.loading = true
      this.$axios.get('/us/searchEamilList', {
        params: {
          page: this.offset,
          size: this.limit,
          isRead: this.isRead,
          isDelete: false
        }
      }).then(res => {
        this.loading = false
        if (res.data.code === 0) {
          this.emailListDate = res.data.rows
          this.total = res.data.total
        }
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    updateEmail (id, column) {
      let idsArr = []
      let text = null
      if (column === 'READ') {
        text = '标记为已读'
      } else {
        text = '删除'
      }
      this.$Modal.confirm({
        title: '确定' + text + '该邮件吗？',
        onOk: () => {
          idsArr.push(id)
          this.$axios({
            url: '/us/updateIsReadOrIsDelete',
            method: 'post',
            data: {
              _method: 'put',
              columnName: column,
              booleanValue: true,
              idList: JSON.stringify(idsArr)
            }
          }).then(result => {
            let code = result.data.code
            if (code === 666) {
              this.$Message.success(text + '成功')
              this.getEmailListData()
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
    selectionClick (data) {
      for (var j = 0; j < data.length; j++) {
        this.ids.push(data[j].emailId)
      }
    },
    deleteEmailByIds () {
      if (this.ids === null || this.ids.length === 0) {
        this.$Message.error('请至少选中一行')
      } else {
        this.$Modal.confirm({
          title: '确定删除所选邮件吗',
          onOk: () => {
            this.$axios({
              url: '/us/updateIsReadOrIsDelete',
              method: 'post',
              data: {
                _method: 'put',
                columnName: 'DELETE',
                booleanValue: true,
                idList: JSON.stringify(this.ids)
              }
            }).then(result => {
              let code = result.data.code
              if (code === 666) {
                this.$Message.success('删除成功')
                this.ids = []
                this.getEmailListData()
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
      }
    },
    activeTab (name) {
      this.isRead = name
      this.getEmailListData()
    },
    viewEmail (params) {
      this.emailDrawer = true
      this.byNickName = params.row.byNickName
      this.subject = params.row.subject
      this.content = params.row.content
      this.emailAddress = params.row.emailAddress
      this.sendTime = params.row.sendTime
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
