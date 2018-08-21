<template>
  <div id="vip_child">
  <div class="head">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">平台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/Vip'}">会员</el-breadcrumb-item>
      <el-breadcrumb-item>普通会员</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="手机号码">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="会员昵称">
          <el-input v-model="formInline.region"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
        <div class="table">
          <el-table :data="showData" border>
            <el-table-column prop="id" label="用户ID" width="123">
            </el-table-column>
            <el-table-column prop="name" label="会员名称" width="156">
            </el-table-column>
            <el-table-column prop="number" label="手机号" width="172">
            </el-table-column>
            <el-table-column prop="product" label="购买商品" width="206">
            </el-table-column>
          </el-table>
        </div>
        <el-pagination layout="prev, pager, next" :total="1000">
        </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      },
      showData: [
        {
          id: 1,
          name: 'tb227676',
          number: 18521943151,
          product: '甜甜圈'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
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
  }
  .flex{
    margin-top:30px;
    width: 100%;
    display: flex;
    justify-content:space-between;
  }
</style>
