<template>
  <div id="sale">
    <el-breadcrumb separator-class='el-icon-arrow-right'>
      <el-breadcrumb-item :to="{ path: '/' }">平台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/store'}">店铺</el-breadcrumb-item>
      <el-breadcrumb-item>店铺销量统计</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">
      <div class="storelist">
      <div>
        <el-form :model="search" :inline=true ref="search" label-width="70px" class="demo-ruleForm">
        <el-form-item label="店铺名称" prop="name">
          <el-input v-model="search.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="province">
          <el-select clearable v-model="search.pro" placeholder="省（直辖市）">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="city">
          <el-select clearable v-model="search.city" placeholder="城市">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="success" @click="searchForm">立即搜索</el-button>
      </el-form>
      </div>
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="排名" width="140">
        </el-table-column>
        <el-table-column prop="name" label="商品名称" width="300">
        </el-table-column>
        <el-table-column prop="money" label="营业额（元)" width="263">
        </el-table-column>
        <el-table-column prop="quantity" label="销售数量" width="215">
        </el-table-column>
      </el-table>
    </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  #sale{
    width: 100%;
  }
  .title{
    margin-top: 50px;
    .button{
      text-align: center;
    }
  }
  .storelist{
    font-size: 14px;
    .list {
       margin: 10px 0;
      li{
        text-align: center;
      }
    }
  }
</style>
<script>
export default {
  data () {
    return {
      ruleForm: {
        pro: '',
        name: '',
        city: ''
      },
      search: {
        pro: '',
        name: '',
        city: ''
      },
      tableData: [
        {
          id: 1,
          name: '美康粉黛官方旗舰店',
          money: 13500,
          quantity: 400
        }
      ]
    }
  },
  methods: {
    searchForm () {
      alert('正在搜索')
    }
  }
}
</script>
