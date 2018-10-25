<template>
  <div class="cakeNews">
    <!-- <router-link to="/CakeNews/CakeNewsAdd">toAdd</router-link> -->
    <Row style="background:#eee;padding:20px">
        <Col span="11">
            <Card :bordered="false">
                <p slot="title">今日总营业额（元）</p>
                <p>{{todayAmt}}</p>
            </Card>
        </Col>
        <Col span="11" offset="2">
            <Card shadow>
                <p slot="title">平台总订单件数（件）</p>
                <p>{{todayQty}}</p>
            </Card>
        </Col>
    </Row>
    <br/>
    <head-search @hander-search="search">
      <div class="cakeNews-searchContent fx">
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
      <Row style="background:#eee;padding:20px">
        <Col span="11">
            <Card :bordered="false">
                <p slot="title">当前总营业额（元）</p>
                <p>{{nowAmt}}</p>
            </Card>
        </Col>
        <Col span="11" offset="2">
            <Card shadow>
                <p slot="title">当前订单件数（件）</p>
                <p>{{nowQty}}</p>
            </Card>
        </Col>
    </Row>
    <br/>
    <Tabs @on-click="activeTab">
        <TabPane :label="''+yearValue"  :name="''+yearValue"></TabPane>
        <TabPane :label="''+(yearValue-1)" :name="''+(yearValue-1)"></TabPane>
        <TabPane :label="''+(yearValue-2)" :name="''+(yearValue-2)"></TabPane>
    </Tabs>
      <div class="cakeNews-container-content">
        <Table border :loading="loading" :columns="columns" :data="saleCountData"></Table>
      </div>
    </section>
  </div>
</template>

<script>
import HeadSearch from '../../components/HeadSearch.vue'
import RegionSelect from '../../components/RegionSelect.vue'
export default {
  name: 'platFromSaleCount',
  components: {
    HeadSearch,
    RegionSelect
  },
  data () {
    return {
      provinceId: null,
      cityId: null,
      startTime: null,
      endTime: null,
      saleCountData: [],
      total: 0,
      page: 0,
      sortBy: null,
      todayAmt: '',
      todayQty: '',
      nowAmt: '',
      nowQty: '',
      pageSize: 10,
      yearValue: 1 * this.$moment(new Date()).format('YYYY'),
      searchYearValue: 1 * this.$moment(new Date()).format('YYYY'),
      columns: [{
        title: '月份',
        key: 'month',
        align: 'center',
        tooltip: true
      },
      {
        title: '营业额',
        key: 'amt',
        align: 'center',
        tooltip: true
      },
      {
        title: '销售数量',
        key: 'orderNum',
        align: 'center',
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
    this.getTodaySaleAmtAndQtyData()
    this.getNowSaleAmtAndQtyData()
    this.getYearSaleAmtAndQtyData()
  },
  methods: {
    getTodaySaleAmtAndQtyData () {
      this.loading = true
      this.$axios.get('/product/searchAmtAndOrderNumByCondition', {
        params: {
          isSum: true
        }
      }).then(res => {
        this.loading = false
        if (res.data.code === 666) {
          this.todayAmt = res.data.data.amt
          this.todayQty = res.data.data.orderNum
        }
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    getYearSaleAmtAndQtyData () {
      this.$axios.get('/product/searchYearAmtAndOrderNum', {
        params: {
          yearValue: this.searchYearValue
        }
      }).then(res => {
        this.loading = false
        if (res.data.code === 666) {
          this.saleCountData = res.data.data
        }
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    getNowSaleAmtAndQtyData () {
      this.$axios.get('/product/searchAmtAndOrderNumByCondition', {
        params: {
          isSum: false,
          startTime: this.releaseStartTime ? this.releaseStartTime : null,
          endTime: this.releaseEndTime ? this.releaseEndTime : null,
          regionId: this.cityId
        }
      }).then(res => {
        this.loading = false
        if (res.data.code === 666) {
          this.nowAmt = res.data.data.amt
          this.nowQty = res.data.data.orderNum
        }
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    search () {
      this.page = 0
      this.getNowSaleAmtAndQtyData()
    },
    getCurrentCity (data) {
      this.cityId = data
      this.getNowSaleAmtAndQtyData()
    },
    getCurrentProvince (data) {
      this.provinceId = data
    },
    activeTab (name) {
      this.searchYearValue = 1 * name
      this.getYearSaleAmtAndQtyData()
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
