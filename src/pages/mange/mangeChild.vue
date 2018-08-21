<template>
  <div id="mange">
    <el-breadcrumb separator-class='el-icon-arrow-right'>
      <el-breadcrumb-item :to="{ path: '/' }">平台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/Mange'}">管理员</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">
      <el-row class="personBut">
        <el-button type="success" @click="$router.push({name: 'AddMange'})">+新增管理员</el-button>
      </el-row>
      <span>共3位管理员</span>
      <el-table :data="tableData" border style="width:100%">
            <el-table-column prop="id" label="序号" width="130">
            </el-table-column>
            <el-table-column prop="name" label="管理员名称" width="130">
            </el-table-column>
            <el-table-column prop="pass" label="密码" width="130">
            </el-table-column>
            <el-table-column prop="tel" label="联系方式" width="130">
            </el-table-column>
            <el-table-column prop="fenzhan" label="分站" width="130">
            </el-table-column>
            <el-table-column prop="right" label="权限" width="128">
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .title{
    font-size: 14px;
    width: 900px;
    margin-top: 50px;
    .personBut{
      text-align: right;
      margin-bottom: 10px;
    }
  }
</style>
<script type="text/javascript">
export default {
  data () {
    return {
      tableData: [
        {
          id: 1,
          name: '冰吻',
          pass: 'abcdfjasklfjkd',
          tel: 132323434,
          fenzhan: '上海',
          right: '店铺、订单'
        }
      ]
    }
  }
}
</script>
