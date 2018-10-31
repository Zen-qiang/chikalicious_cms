<template>
  <div class="cakeNews">
    <!-- <router-link to="/CakeNews/CakeNewsAdd">toAdd</router-link> -->
    <section class="cakeNews-container">
      <div>
        <Button type="primary" icon="md-add"  to="/AdminList/AdminAdd">新增管理员</Button>
      </div>
      <div class="cakeNews-container-content">
        <Table border :loading="loading" :columns="columns" :data="adminListData"></Table>
      </div>
      <div class="cakeNews-container-page">
        <Page :total="total" :page-size="pageSize" size="small" show-elevator show-sizer show-total @on-change="changePage" @on-page-size-change="changePageSize" />
      </div>
    </section>
  </div>
</template>

<script>
import HeadSearch from '../../components/HeadSearch.vue'
import RegionSelect from '../../components/RegionSelect.vue'
export default {
  name: 'cakeNews',
  components: {
    HeadSearch,
    RegionSelect
  },
  data () {
    return {
      shopName: null,
      startTime: null,
      endTime: null,
      adminListData: [],
      total: 0,
      page: 0,
      sortBy: null,
      pageSize: 10,
      loading: false,
      columns: [{
        title: '序号',
        key: 'index',
        align: 'center',
        width: 60,
        render: (h, params) => {
          return h('div', [
            h('strong', 1 + params.index + this.page * this.pageSize)
          ])
        }
      },
      {
        title: '管理员名称',
        key: 'userName',
        align: 'center',
        tooltip: true
      },
      {
        title: '密码',
        key: 'password',
        align: 'center',
        tooltip: true
      },
      {
        title: '联系方式',
        key: 'phoneNo',
        align: 'center',
        tooltip: true
      },
      {
        title: '分站',
        key: 'value',
        align: 'center',
        tooltip: true
      },
      {
        title: '权限',
        key: 'permissionName',
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
                  this.$router.push({
                    name: 'AdminAdd',
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
                  this.deleteUser(params.row.id)
                }
              }
            }, '删除')
          ])
        }
      }]
    }
  },
  computed: {
  },
  created () {
    this.getAdminListData()
  },
  methods: {
    getAdminListData () {
      this.loading = true
      this.$axios.get('/admin/queryAdminList', {
        params: {
          offset: this.page,
          limit: this.pageSize
        }
      }).then(res => {
        this.loading = false
        if (res.data.code === 0) {
          this.adminListData = res.data.rows
          this.total = res.data.total
        }
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    deleteUser (id) {
      this.$Modal.confirm({
        title: '确定删除该管理员吗？',
        onOk: () => {
          this.$axios({
            url: '/admin/deleteUserById',
            method: 'post',
            data: {
              _method: 'delete',
              id: id
            }
          }).then(result => {
            let code = result.data.code
            if (code === 666) {
              this.$Message.success('删除成功')
              this.getAdminListData()
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
      this.page = page
      this.getAdminListData()
    },
    changePageSize (pageSize) {
      this.pageSize = pageSize
      this.getAdminListData()
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
    >div {
      padding-bottom: 20px;
    }
    &-page {
      text-align: center;
    }
  }
}
</style>
