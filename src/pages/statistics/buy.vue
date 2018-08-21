<template>
  <div id="sale">
    <el-breadcrumb separator-class='el-icon-arrow-right'>
      <el-breadcrumb-item :to="{ path: '/' }">平台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/store'}">店铺</el-breadcrumb-item>
      <el-breadcrumb-item>会员购买统计</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">
      <div class="storelist">
      <div>
        <el-form :model="search" :inline="true" ref="search" label-width="100px" class="demo-ruleForm">
          <el-form-item label="时间区间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="开始时间" v-model="search.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="结束时间" v-model="search.date2" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          </el-form>
            <el-form :model="fillForm" :inline="true" ref="fillForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="手机号码" prop="number">
              <el-input v-model="fillForm.number"></el-input>
            </el-form-item>
            <el-form-item label="会员名字" prop="name">
              <el-input v-model="fillForm.name"></el-input>
            </el-form-item>
            <el-button type="success" @click="searchForm">立即搜索</el-button>
          </el-form>
        </div>
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="排名" width="140">
        </el-table-column>
        <el-table-column prop="name" label="会员昵称" width="240">
        </el-table-column>
        <el-table-column prop="tel" label="手机号码" width="230">
        </el-table-column>
        <el-table-column prop="quantity" label="订单数" width="150">
        </el-table-column>
        <el-table-column prop="account" label="购买金额" width="150">
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
    .line{
      text-align: center;
    }
  }
</style>
<script>
export default {
  data () {
    return {
      search: {
        date1: '',
        date2: ''
      },
      fillForm: {
        number: '',
        name: ''
      },
      tableData: [
        {
          id: 1,
          name: 'tb227676',
          account: 13500,
          quantity: 400,
          tel: 13935040154
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
