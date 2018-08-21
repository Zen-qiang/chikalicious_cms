<template>
  <div id="good_cla">
     <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">平台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/product'}">商品</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="address">
      <el-container>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="地址">
            <el-select clearable v-model="formInline.region" placeholder="活动区域">
              <el-option label="山西" value="shanghai"></el-option>
              <el-option label="上海" value="beijing"></el-option>
            </el-select>
            <el-select clearable v-model="formInline.name" placeholder="活动区域">
              <el-option label="忻州" value="shanghai"></el-option>
              <el-option label="浦东" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button id="success" type="success">搜索</el-button>
      </el-container>
    </div>
    <el-row class="add">
        <el-button type="success">+添加新闻</el-button>
    </el-row>
    <el-table :data="showData" border>
      <el-table-column prop="number" label="序号" width="140">
      </el-table-column>
      <el-table-column label="背景图片" width="150">
        <template slot-scope="scope">
          <img :src ='scope.row.url' height="30px"><br>
        </template>
      </el-table-column>
      <el-table-column prop="classfiy" label="分类名称" width="140">
      </el-table-column>
      <el-table-column label="操作" width="130">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dele">修改</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formInline: {
        region: '',
        name: ''
      },
      showData: [
        {
          number: 1,
          url: '../../../static/img/86.jpg',
          classfiy: '分类一'
        }
      ]
    }
  },
  methods: {
    dele () {
      this.$confirm('此操作将永久删除，您确定吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    }
  }
}
</script>
<style type="text/css" lang="less" scoped>
  .address{
    margin-top: 50px;
    #success{
      height: 40px;
      line-height: 15px;
    }
  }
  .add{
    margin:50px 0 20px 455px;
  }
</style>
