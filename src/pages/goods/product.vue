<template>
  <div id="dl-product">
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
<script type="text/javascript">
export default{
  name: 'Product',
  data () {
    return {
      changed: 0,
      lists: [
        {
          label: '上架商品列表',
          value: 'ProductList'
        },
        {
          label: '新增修改商品',
          value: 'GoodMange'
        },
        {
          label: '商品分类',
          value: 'GoodClassify'
        },
        {
          label: '新闻管理',
          value: 'NewsMange'
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
<style lang="less" scoped>
#dl_website{
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
