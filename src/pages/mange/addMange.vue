<template>
  <div id="addMange">
    <el-breadcrumb separator-class='el-icon-arrow-right'>
      <el-breadcrumb-item :to="{ path: '/' }">平台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/Mange'}">管理员列表</el-breadcrumb-item>
      <el-breadcrumb-item>新增修改管理员权限</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="form">
        <el-form :inline = true ref="form" :model="sizeForm" label-width="90px" size="mini">
          <el-form-item label="管理员名称">
            <el-input v-model="sizeForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="sizeForm.pass"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="sizeForm.contact"></el-input>
          </el-form-item>
          <el-button type="success" class="select">搜索</el-button>
        </el-form>
        <div class="svip">
          <label>超级管理权限：</label>
          <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </div>
        <el-form :inline = true ref="form" :model="selectForm" label-width="120px" size="mini">
          <label>分站 ：</label>
          <el-form-item label="（省）直辖市">
            <el-select v-model="selectForm.pro" placeholder="全部">
              <el-option label="山西" value="开始时间"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-select v-model="selectForm.city" placeholder="全部">
              <el-option label="忻州" value="开始时间"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="success" class="select">搜索</el-button>
        </el-form>
        <div class="right">
          <label>权限：</label>
          <el-checkbox-group v-model="checkedCities1" class="icon">
            <el-checkbox v-for="right in rights" :label="right" :key="right">{{right}}</el-checkbox>
          </el-checkbox-group>
        </div>
    </div>
  </div>
</template>
<style type="text/css" lang="less" scoped>
  .form{
    margin-top:50px;
    .select{
      height: 30px;
      line-height: 5px;
    }
    .svip{
      margin-bottom: 18px;
    }
    .right{
      margin-top:10px;
      .icon{
        display: inline-block;
        width: 500px;
        label{
          width: 50px;
          margin-left:50px;
        }
      }
    }
  }
</style>
<script type="text/javascript">
export default {
  data () {
    return {
      sizeForm: {
        name: '',
        pass: '',
        contact: ''
      },
      value2: true,
      selectForm: {
        pro: '',
        city: ''
      },
      rights: ['控制台', '操作日志', '商品', '店铺', '会员', '订单', '厨房', '网站', '统计', '管理员管理', '客服'],
      checkedCities1: ['控制台']
    }
  }
}
</script>
