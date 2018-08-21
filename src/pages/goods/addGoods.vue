<template>
  <div id="addGoods">

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">平台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/product'}">商品</el-breadcrumb-item>
      <el-breadcrumb-item>新增商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" class="form" label-width="80px" size="mini">
      <el-form-item label="商品名称">
        <el-input  placeholder="名称至少3位最多不超过50个汉字 *必填" rules></el-input>
      </el-form-item>
    </el-form>
    <label class="labe">商品分类：</label>
    <el-checkbox>备选项1</el-checkbox>
    <el-checkbox>备选项</el-checkbox>
    <el-checkbox>备选项1</el-checkbox>
    <el-checkbox>备选项</el-checkbox>
    <label class="labe"></label>
    <el-checkbox>备选项1</el-checkbox>
    <el-checkbox>备选项</el-checkbox>
    <el-checkbox>备选项1</el-checkbox>
    <el-checkbox>备选项</el-checkbox>
    <div class="rule">
      <label>商品规格：</label>
      <el-switch v-model="value4" class="setWidth" active-color="#13ce66" inactive-color="#ff4949" active-text="6寸">
      </el-switch>
      <el-form :inline=true style="display:inline-block" ref="form" class="demo-form-inline" label-width="100px" size="mini">
      <el-form-item label="原价（元）">
        <el-input style="width:60px" placeholder="230"></el-input>
      </el-form-item>
       <el-form-item label="优惠价（元）">
        <el-input style="width:60px" placeholder="230"></el-input>
      </el-form-item>
    </el-form>
      <label class="labe"></label>
      <el-switch v-model="value"  class="setWidth" active-color="#13ce66" inactive-color="#ff4949" active-text="10寸">
      </el-switch>
      <el-form :inline=true style="display:inline-block" ref="form" class="demo-form-inline" label-width="100px" size="mini">
      <el-form-item label="原价（元）">
        <el-input style="width:60px" placeholder="230"></el-input>
        </el-form-item>
        <el-form-item label="优惠价（元）">
        <el-input style="width:60px" placeholder="230"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="upload_picture">
      <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <span>图片支持JPG、PNG，建议使用800*800尺寸，默认不超过1M</span>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'GoodMange',
  data () {
    return {
      value4: true,
      value: true,
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
<style type="text/css" lang="less" scoped>
  #addGoods{
   width: 515px;
   .form{
    margin-top:50px;
   }
   .labe{
    width: 80px;
    display: inline-block;
   }
   .setWidth{
    width: 80px;
   }
   .rule{
    margin-top:50px;
   }
   .upload_picture{
    margin-top:50px;
    span{
      font-size: 12px;
    }
   }
  }
</style>
