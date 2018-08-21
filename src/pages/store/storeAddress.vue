<template>
  <div id="store_add">
    <el-breadcrumb separator-class='el-icon-arrow-right'>
      <el-breadcrumb-item :to="{ path: '/' }">平台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/store'}">店铺</el-breadcrumb-item>
      <el-breadcrumb-item>店铺地址设置</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm" :inline="true">
        <el-form-item label="店铺名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="province">
          <el-select  clearable v-model="ruleForm.pro" placeholder="省（直辖市）">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="city">
          <el-select clearable v-model="ruleForm.city" placeholder="城市">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
          <el-button type="success" @click="submitForm">+新建店铺</el-button>
      </el-form>
    </div>
    <div class="storelist">
      <ul class="list">
        <li>店铺列表</li>
      </ul>
      <div>
        <el-form :model="search" :rules="rules" :inline=true ref="search" label-width="70px" class="demo-form-inline">
        <el-form-item label="店铺名" prop="name">
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
        <el-table-column prop="number" label="序号" width="140">
        </el-table-column>
        <el-table-column prop="name" label="店铺名称" width="300">
        </el-table-column>
        <el-table-column prop="pro" label="地址-省" width="196">
        </el-table-column>
        <el-table-column prop="city" label="地址-市" width="165">
        </el-table-column>
         <el-table-column  label="操作"  width="124">
          <template slot-scope="scope">
            <el-button type="text" size="small">删除</el-button>
          </template>
    </el-table-column>
      </el-table>
    </div>
  </div>
</template>
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
          number: 1,
          name: '美康粉黛官方旗舰店',
          pro: '江苏省',
          city: '淮安市'
        }
      ],
      rules: {
        name: [
          {required: true, message: '输入店铺名', trigger: 'blur'},
          {min: 3, message: '长度大于3个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm () {
      alert('提交成功！')
    },
    searchForm () {
      alert('正在搜索...')
    }
  }
}
</script>
<style type="text/css" lang="less" scoped>
  .title{
    margin-top: 50px;
    .button{
      width: 50%;
      text-align: center;
    }
  }
  .storelist{
    font-size: 14px;
    .search{
      height: 30px;
      line-height: 5px;
    }
    .list {
       margin: 10px 0;
      li{
        text-align: center;
      }
    }
    .content,.for{
      li{
        width: 19%;
        height: 30px;
        line-height: 30px;
        display: inline-block;
        text-align: center;
      }
    }
  }
</style>
