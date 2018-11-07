<template>
  <div class="cakeNews">
    <!-- <router-link to="/CakeNews/CakeNewsAdd">toAdd</router-link> -->
    <head-search @hander-search="search">
      <div class="cakeNews-searchContent fx">
        <p>
          <span>店铺名称：</span>
          <Input v-model="shopName" placeholder="店铺名称" clearable style="width: 200px" />
        </p>
        <p>
          <span>时间区段：</span>
          <DatePicker type="date" format="yyyy-MM-dd" placeholder="起始时间" style="width: 200px" v-model="startTime"></DatePicker>——
          <DatePicker type="date" format="yyyy-MM-dd" placeholder="结束时间" style="width: 200px" v-model="endTime"></DatePicker>
        </p>
      </div>
    </head-search>
    <section class="cakeNews-container">
      <div class="cakeNews-searchContent fx">
      <p>地址:</p>
      <p><region-select @getCurrentCity="getCurrentCity" @getCurrentProvince="getCurrentProvince"></region-select></p>
      </div>
      <div class="cakeNews-container-content">
        <Table border :loading="loading" :columns="columns" :data="saleCountData"></Table>
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
      saleCountData: [],
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
        title: '营业额',
        key: 'amt',
        align: 'center',
        sortable: true,
        tooltip: true
      },
      {
        title: '销售数量',
        key: 'qty',
        align: 'center',
        sortable: true,
        tooltip: true
      }]
    }
  },
  computed: {
    releaseStartTime () {
      return this.startTime ? this.$moment(this.startTime).format('YYYY-MM-DD') : null
    },
    releaseEndTime () {
      return this.endTime ? this.$moment(this.endTime).format('YYYY-MM-DD') : null
    }
  },
  created () {
    this.getProductSaleAmtAndQtyData()
  },
  methods: {
    getProductSaleAmtAndQtyData () {
      this.loading = true
      this.$axios.get('/product/searchProductSaleAmtAndQty', {
        params: {
          offset: this.page,
          limit: this.pageSize,
          title: this.newsTitle ? this.newsTitle : null,
          startTime: this.releaseStartTime ? this.releaseStartTime : null,
          endTime: this.releaseEndTime ? this.releaseEndTime : null,
          shopName: this.shopName,
          sortBy: this.sortBy,
          regionId: this.cityId,
          productType: 'CAKE'
        }
      }).then(res => {
        this.loading = false
        if (res.data.code === 0) {
          this.saleCountData = res.data.rows
          this.total = res.data.total
        }
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    search () {
      this.page = 0
      this.getProductSaleAmtAndQtyData()
    },
    changePage (page) {
      this.page = page
      this.getProductSaleAmtAndQtyData()
    },
    changePageSize (pageSize) {
      this.pageSize = pageSize
      this.getProductSaleAmtAndQtyData()
    },
    getCurrentCity (data) {
      this.cityId = data
      this.getProductSaleAmtAndQtyData()
    },
    getCurrentProvince (data) {
      this.provinceId = data
      this.getProductSaleAmtAndQtyData()
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
