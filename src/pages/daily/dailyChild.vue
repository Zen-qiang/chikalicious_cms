<template>
  <div id="daily_child">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">平台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/Daily'}">操作日志</el-breadcrumb-item>
      <el-breadcrumb-item>日志列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="form">
      <el-form :inline = true ref="form" :model="sizeForm" label-width="100px">
        <el-form-item label="店铺分站：">
          <el-select clearable v-model="sizeForm.name" placeholder="全部">
            <el-option label="山西" value="开始时间"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select clearable v-model="sizeForm.region" placeholder="全部">
            <el-option label="忻州" value="开始时间"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="success">搜索</el-button>
      </el-form>
      <div class="table">
        <el-table :data="tableData" border>
          <el-table-column prop="time" label="操作时间" width="320">
          </el-table-column>
          <el-table-column prop="operate" label="操作内容" width="320">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      sizeForm: {
        name: '',
        region: ''
      },
      tableData: [
        {
          time: '2018-01-10 12:00',
          operate: '登录'
        }
      ]
    }
  }
}
</script>
<style type="text/css" lang="less" scoped>
  .form{
    margin-top:50px;
    .table{
      margin-top: 50px
    }
  }
</style>
