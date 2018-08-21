<template>
  <div id="about_us">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">平台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/website'}">网站</el-breadcrumb-item>
      <el-breadcrumb-item>关于我们</el-breadcrumb-item>
    </el-breadcrumb>
      <div class="upload">
        <label class="labe">商品描述：</label>
          <el-upload style="display:inline-block" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePreview" >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog><br>
          <span class="discrible">图片仅支持Gif、Png</span>
      </div>
      <div class="careful">
        <label>详情描述：</label>
        <div class="fontDescrible">
          <textarea class="text" :style="{color: colored,fontFamily: selected,fontSize: sized+'px',lineHeight: lineheight,fontWeight: bold,fontStyle: italic,textDecoration: under,textAlign: zuo}"></textarea>
          <div class="fontStyle">
            <label>颜色</label>
            <input type="color" v-model="colored">
            <select class="fontType" v-model="selected">
              <option disabled value="">请选择</option>
              <option>微软雅黑</option>
              <option>宋体</option>
              <option>华文楷体</option>
            </select>
            <select class="fontSize fontType" v-model="sized">
              <option disabled value="">请选择</option>
              <option>20</option>
              <option>25</option>
              <option>30</option>
            </select>
            <select class="fontType" v-model="lineheight">
              <option disabled value="">请选择</option>
              <option>1.5</option>
              <option>2</option>
              <option>3</option>
            </select>
            <div class="icon">
              <img src="../../assets/icon/bold.png" height="20px" @click="boldfunc">
              <img src="../../assets/icon/itatic.png" height="20px" @click="italicFunc">
              <img src="../../assets/icon/underline.png" height="20px" @click="underFunc">
              <img src="../../assets/icon/left.png" height="20px" @click="leftFunc">
              <img src="../../assets/icon/center.png" height="20px" @click="centerFunc">
              <img src="../../assets/icon/right.png" height="20px" @click="rightFunc">
              <label>
                <img src="../../assets/icon/pic.png" height="20px">
                <input type="file" style="display:none">
              </label>
              <label>
                <img src="../../assets/icon/video.png" height="20px">
                <input type="file" style="display:none">
              </label>
            </div>
          </div>
        </div>
        <el-row>
          <el-button type="success" plain>发布</el-button>
          <el-button type="success" plain>取消</el-button>
          <el-button type="success">预览</el-button>
        </el-row>
      </div>
  </div>
</template>
<style type="text/css" lang="less" scoped>
  .upload{
    margin-top:50px;
    font-size: 14px;
    .labe{
      width: 80px;
      display: inline-block;
    }
    .discrible{
      display: inline-block;
      padding-top: 20px;
      padding-left: 100px;
    }
  }
  .fontDescrible{
    .text{
      width: 500px;
      height: 200px;
    }
    .fontStyle{
      display: inline-block;
      .fontType{
        height: 23px;
        font-size: 14px;
      }
    }
    .icon{
      margin-top: 20px;
    }
  }
</style>
<script type="text/javascript">
export default {
  data () {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      dialogImageUrl2: '',
      colored: '',
      selected: '',
      sized: '',
      lineheight: '',
      bold: '',
      italic: '',
      under: '',
      zuo: ''
    }
  },
  methods: {
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlePreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    boldfunc () {
      this.bold = 'bold'
    },
    italicFunc () {
      this.italic = 'italic'
    },
    underFunc () {
      this.under = 'underline'
    },
    leftFunc () {
      this.zuo = 'left'
    },
    centerFunc () {
      this.zuo = 'center'
    },
    rightFunc () {
      this.zuo = 'right'
    }
  }
}
</script>
