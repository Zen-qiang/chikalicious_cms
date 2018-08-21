<template>
  <div id="set">
    <el-container>
        <!-- <el-aside>
            <ul class="news">
                <li v-for='(value,key) in heads' :key='key' @click="change(key,value.value)" :class='{bg:changed==key}'>{{value.label}}</li>
            </ul>
        </el-aside> -->
        <router-view></router-view>
    </el-container>
  </div>
</template>
<style lang="less" scoped>
#set{
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
<script>
export default {
  data () {
    return {
      changed: 0,
      heads: [
        {
          label: '地区设置',
          value: 'Set'
        },
        {
          label: '店铺地址设置',
          value: 'storeAdd'
        }
      ]
    }
  },
  methods: {
    change (index, value) {
      this.changed = index
      this.$router.push({name: value})
    }
  }
}
</script>
