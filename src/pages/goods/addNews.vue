<template>
  <div id="add_news">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">平台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/product'}">商品</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/product/NewsMange'}">新闻</el-breadcrumb-item>
      <el-breadcrumb-item>添加新闻</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">
      <el-form :inline=true label-width="80px" size="mini">
        <el-form-item label="新闻标题">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <label class="labe">封面图:</label>
       <el-upload class="inline" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
    <span class="font">图片支持JPG、PNG，建议使用800*800尺寸，默认不超过1M</span>
    <div class="news_cnt">
       <label class="labe">新闻内容:</label>
    </div>
    <el-row>
      <el-button type="success" plain>发布</el-button>
      <el-button type="success" plain>取消</el-button>
      <el-button type="success">预览</el-button>
    </el-row>
  </div>
</template>
<style type="text/css" lang="less" scoped>
  .title{
    margin-top: 50px;
    .inline{
      display: inline-block;
    }
  }
  .font{
    font-size: 12px;
  }
  .news_cnt{
    margin: 10px 0;
    height: 200px;
    background: red;
  }
</style>
<script type="text/javascript">
export default {
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove () {
    }
  }
}
</script>
