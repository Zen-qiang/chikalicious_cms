<template>
  <div>
    <Row style="background:#eee;padding:20px">
        <Col span="8">
            <Card :bordered="false">
              <p slot="title">今日销售总额</p>
                <p>&nbsp;</p>
                <p style="font-size:24px;">{{amount}}</p>
                <p>&nbsp;</p>
            </Card>
        </Col>
        <Col span="8" offset="2">
            <Card shadow>
              <p slot="title">今日订单数</p>
                <p>&nbsp;</p>
                <p style="font-size:24px;">{{allOrderConut}}</p>
                <p>&nbsp;</p>
            </Card>
        </Col>
    </Row>
    <br/><br/>
    <p style="font-size:20px;">订单</p>
    <br/><br/>
    <Row>
        <Col span="6">
            <Card>
                <p slot="title">制作中</p>
                <p>{{proDuctuinlistCount}}</p>
            </Card>
        </Col>
        <Col span="6" offset="2">
            <Card dis-hover>
                <p slot="title">待收货</p>
                <p>{{wattingExtractCount}}</p>
            </Card>
        </Col>
        <Col span="6" offset="3">
            <Card dis-hover>
                <p slot="title">已完成</p>
                <p>{{completedExtractCount}}</p>
            </Card>
        </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'ConsoleInfo',
  data () {
    return {
      countData: 'CAKE',
      amount: null,
      completedExtractCount: null,
      paidMentCount: null,
      proDuctuinlistCount: null,
      wattingExtractCount: null,
      wattingPayCount: null,
      allOrderConut: null
    }
  },
  created () {
    this.getProductTypeData()
  },
  methods: {
    getProductTypeData () {
      this.$axios.get('/admin/queryConsoleInfo', {
        params: {
        }
      }).then(res => {
        if (res.data.code === 666) {
          this.countData = res.data.data
          this.amount = res.data.data.amount === null ? 0 : res.data.data.amount
          this.completedExtractCount = res.data.data.completedExtractCount
          this.paidMentCount = res.data.data.paidMentCount
          this.proDuctuinlistCount = res.data.data.proDuctuinlistCount
          this.wattingExtractCount = res.data.data.wattingExtractCount
          this.wattingPayCount = res.data.data.wattingPayCount
          this.allOrderConut = res.data.data.allOrderConut
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
