<template>
  <div id="order">
     <el-container>
        <el-aside>
            <ul class="news">
                <li :class="{bg:changed==index}" v-for="(item,index) in list" :key = index @click="change(item, index)">{{item.value}}</li>
            </ul>
        </el-aside>
        <router-view></router-view>
    </el-container>
  </div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      changed: 0,
      list: [
        {
          name: 'OrderMange',
          value: '订单管理'
        }
      ]
    }
  },
  methods: {
    change (item, index) {
      this.changed = index
      this.$router.push({name: item.name})
    }
  }
}
</script>
<style type="text/css" lang="less" scoped>
  #order{
    height: 100%;
  }
  .el-container{
    height: 100%
  }
  .el-aside{
    width: 200px!important;
    height: 100%;
     border:1px solid #ddd;
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
.title{
  margin-top: 50px;
  .search{
    height: 30px;
    line-height: 5px;
  }
}
 .table{
    margin: 10px 0;
    span{
      display: block;
      margin-bottom: 40px;
      font-size: 12px;
    }
    .menu{
      width: 100%;
      margin-top:20px;
      li{
        font-size: 14px;
        width: 22%;
        float: left;
      }
    }
  }
  .cnt{
  width: 100%;
  li{
    font-size: 14px;
    width: 22%;
    height: 40px;
    line-height: 53px;
    float: left;
    border-bottom: 1px solid #ccc;
  }
}
</style>
