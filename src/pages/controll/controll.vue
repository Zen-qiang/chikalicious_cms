<template>
   <div id="dl-console">
    <el-container>
        <!-- <el-aside>
            <ul class="news">
                <li @click="change" :class="{bg:active}">控制台</li>
            </ul>
        </el-aside> -->
        <router-view></router-view>
    </el-container>
   </div>
</template>
<script>
export default {
  name: 'Controll',
  data () {
    return {
      active: true
    }
  },
  methods: {
    change: function () {
      this.active = true
      this.$router.push({name: 'ConChild'})
    }
  }
}
</script>
<style lang="less" scoped>
  #dl-console{
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
  li{
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
