<template>
  <div class="cakeNews">
    <head-search @hander-search="search">
      <div class="cakeNews-searchContent fx">
      <p>手机号码:</p>
      <p><Input v-model="numberPhone" placeholder="请输入手机号码" clearable style="width: 200px" /></p>
      <p>会员昵称:</p>
      <p><Input v-model="name" placeholder="请输入会员昵称" clearable style="width: 200px" /></p>
    </div>
    </head-search>
    <section class="cakeNews-container">
      <div class="cakeNews-container-content">
        <Table border :loading="loading" :columns="columns" :data="merberDataInfo"></Table>
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
  name: 'merberManage',
  components: {
    HeadSearch
  },
  data () {
    return {
      numberPhone: '',
      merberDataInfo: [],
      total: 0,
      offset: 0,
      limit: 10,
      loading: false,
      name: '',
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
          title: '用户id',
          key: 'id',
          align: 'center',
          tooltip: true
        },
        {
          title: '会员昵称',
          key: 'nickName',
          align: 'center',
          tooltip: true
        },
        {
          title: '手机号码',
          key: 'phoneNo',
          align: 'center',
          tooltip: true
        },
        {
          title: '购买商品数',
          key: 'orderNum',
          align: 'center',
          tooltip: true
        }
      ]
    }
  },
  created () {
    this.getMerberDataInfo()
  },
  methods: {
    search () {
      this.offset = 0
      this.getMerberDataInfo()
    },
    getMerberDataInfo () {
      this.loading = true
      this.$axios.get('/member/queryMember', {
        params: {
          offset: this.offset,
          limit: this.limit,
          name: this.name,
          numberPhone: this.numberPhone
        }
      }).then(res => {
        this.loading = false
        if (res.data.code === 0) {
          this.merberDataInfo = res.data.rows
          this.total = res.data.total
        }
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    pageChange (index) {
      this.offset = index - 1
      this.getMerberDataInfo()
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
