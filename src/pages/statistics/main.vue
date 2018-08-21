<template>
  <div id="dl_statistics">
    <el-container>
      <!-- <el-aside>
        <ul class="news">
          <li v-for='(value,key) in lists' :key='key' @click="change(key,value.value)" :class='{bg:changed==key}'>{{value.label}}</li>
            </ul>
      </el-aside> -->
      <router-view></router-view>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      changed: 0,
      lists: [
        {
          label: '平台收支情况',
          value: 'Payment'
        },
        {
          label: '商品销售情况',
          value: 'Sale'
        },
        {
          label: '店铺销量统计',
          value: 'Quantity'
        },
        {
          label: '会员购买统计',
          value: 'Buy'
        }
      ]
    }
  },
  methods: {
    change (index, item) {
      this.changed = index
      this.$router.push({name: item})
    }
  }
}
</script>
<style lang="less" scoped>
#dl_statistics{
  height: 100%;
}
.el-container{
  height: 100%;
}
.el-aside{
  width: 200px!important;
  height: 100%;
  border-right:1px solid #dddddd;
}
.news{
  height: 100%;
  li {
    text-align: center;
    height: 33px;
    line-height: 33px;
    padding-left: 10px;
  }
}
.bg{
  background: #bbbbbb;
}
</style>
