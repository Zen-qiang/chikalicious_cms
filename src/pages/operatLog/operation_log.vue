<template>
  <div class="cakeNews">
        <head-search @hander-search="search">
      <div class="cakeNews-searchContent fx">
        <p>地址:</p>
        <p><region-select @getCurrentCity="getCurrentCity" @getCurrentProvince="getCurrentProvince"></region-select></p>
      </div>
    </head-search>
    <section class="cakeNews-container" style="margin-top:30px">
      <div class="cakeNews-container-content">
        <Table border :loading="loading" :columns="columns" :data="logDate"></Table>
      </div>
      <div class="cakeNews-container-page">
        <Page :total="total" :page-size="limit" size="small" show-elevator show-sizer show-total @on-change="changePage" @on-page-size-change="changePageSize"/>
      </div>
    </section>
  </div>
</template>
<script>
import HeadSearch from '../../components/HeadSearch.vue'
import RegionSelect from '../../components/RegionSelect.vue'
export default {
  name: 'classify',
  components: {
    HeadSearch,
    RegionSelect
  },
  data () {
    return {
      logDate: [],
      total: 0,
      offset: 0,
      limit: 10,
      loading: false,
      cityId: null,
      columns: [
        {
          title: '操作时间',
          key: 'actionTime',
          align: 'center',
          tooltip: true
        },
        {
          title: '操作内容',
          key: 'actionType',
          align: 'center',
          tooltip: true
        },
        {
          title: '操作人',
          key: 'userName',
          align: 'center',
          tooltip: true
        }
      ]
    }
  },
  created () {
    this.getLogData()
  },
  methods: {
    getLogData () {
      this.loading = true
      this.$axios.get('/admin/querylogsByRole', {
        params: {
          offset: this.offset,
          limit: this.limit,
          cityId: this.cityId
        }
      }).then(res => {
        this.loading = false
        if (res.data.code === 0) {
          this.logDate = res.data.rows
          this.total = res.data.total
        }
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    changePage (page) {
      this.offset = page
      this.getLogData()
    },
    changePageSize (pageSize) {
      this.limit = pageSize
      this.getLogData()
    },
    search () {
      this.offset = 0
      this.getLogData()
    },
    getCurrentCity (data) {
      this.cityId = data
      this.getLogData()
    },
    getCurrentProvince (data) {
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
