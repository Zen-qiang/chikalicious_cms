<template>
  <div class="cakeNews">
    <!-- <router-link to="/CakeNews/CakeNewsAdd">toAdd</router-link> -->
    <head-search @hander-search="search">
      <div class="cakeNews-searchContent fx">
        <p>
          <span>新闻标题：</span>
          <Input v-model="newsTitle" placeholder="Enter something..." clearable style="width: 200px" />
        </p>
        <p>
          <span>发布时间：</span>
          <DatePicker type="date" format="yyyy-MM-dd" placeholder="Select date" style="width: 200px" v-model="newsTime"></DatePicker>
        </p>
      </div>
    </head-search>
    <section class="cakeNews-container">
      <div>
        <Button type="primary" icon="md-add" :to="{name: 'CakeNewsAdd'}">添加新闻</Button>
      </div>
      <div class="cakeNews-container-content">
        <Table border :loading="loading" :columns="columns" :data="newsData"></Table>
      </div>
      <div class="cakeNews-container-page">
        <Page :total="total" :page-size="limit" :current="offset + 1" @on-change="pageChange" show-elevator />
      </div>
    </section>
  </div>
</template>
<script>
import HeadSearch from '../../components/HeadSearch.vue'
export default {
  name: 'cakeNews',
  components: {
    HeadSearch
  },
  data () {
    return {
      newsTitle: null,
      newsTime: null,
      newsData: [],
      total: 0,
      offset: 0,
      limit: 10,
      loading: false,
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
          title: '新闻标题',
          key: 'title',
          align: 'center',
          tooltip: true
        },
        {
          title: '发布时间',
          key: 'releaseTime',
          align: 'center',
          tooltip: true,
          render: (h, params) => {
            return h('div', [
              h('span', this.$moment(params.row.releaseTime).format('YYYY-MM-DD / hh:mm'))
            ])
          }
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
                    this.$router.push(`/CakeNews/CakeNewsAdd/${params.row.id}`)
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
  computed: {
    releaseTime () {
      return this.newsTime ? this.$moment(this.newsTime).format('YYYY-MM-DD') : null
    }
  },
  created () {
    this.getNewsData()
  },
  methods: {
    getNewsData () {
      this.loading = true
      this.$axios.get('/product/queryNews', {
        params: {
          offset: this.offset,
          limit: this.limit,
          title: this.newsTitle ? this.newsTitle : null,
          releaseTime: this.releaseTime ? this.releaseTime : null
        }
      }).then(res => {
        this.loading = false
        if (res.data.code === 0) {
          this.newsData = res.data.rows
          this.total = res.data.total
        }
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    search () {
      this.offset = 0
      this.getNewsData()
    },
    deleteNews (id) {
      this.$Modal.confirm({
        title: '确定删除该新闻吗？',
        onOk: () => {
          this.$axios.post('/product/deleteNewsById', {id: id}).then(res => {
            console.log(res)
            this.$Message.success('This is a success tip')
            this.getNewsData()
          }).catch(err => {
            console.log(err)
            this.$Message.error('This is an error tip')
          })
        }
      })
    },
    pageChange (index) {
      console.log(index)
      this.offset = index - 1
      this.getNewsData()
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
