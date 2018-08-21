<template>
  <div id="dl-news" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">平台</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/website'}">商品</el-breadcrumb-item>
        <el-breadcrumb-item>新闻管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="form">
        <el-form :inline = true ref="form" :model="sizeForm" label-width="80px">
          <el-form-item label="新闻标题">
            <el-input v-model="sizeForm.name"></el-input>
          </el-form-item>
          <el-form-item label="发布时间">
            <el-select v-model="sizeForm.region" placeholder="开始时间">
              <el-option label="开始时间" value="开始时间"></el-option>
            </el-select>
          </el-form-item>
            <el-button type="success">搜索</el-button>
        </el-form>
      </div>
      <el-row>
        <el-button class="add" @click="go" type="success">+添加新闻</el-button>
      </el-row>
      <el-table :data="showData" border style="width:100%">
        <el-table-column prop="number" label="序号" width="145">
        </el-table-column>
        <el-table-column prop="title" label="新闻标题" width="205">
        </el-table-column>
        <el-table-column prop="time" label="发表时间" width="192">
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
<style type="text/css" lang="less" scoped>
  .select{
    height: 30px;
    line-height: 5px;
  }
  .form{
    margin-top: 50px;
  }
  .add{
     float: right;
     margin-top: 50px;
  }
</style>
<script type="text/javascript">
export default{
  name: 'News',
  data () {
    return {
      sizeForm: {
        name: '',
        region: ''
      },
      showData: [
        {
          number: 1,
          title: '庆祝新中国成立69周年',
          time: '2018-03-23 21:55'
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
    },
    go () {
      this.$router.push({name: 'aNews'})
    }
  }
}
</script>
