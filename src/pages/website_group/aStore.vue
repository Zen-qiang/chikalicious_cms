<template>
  <div id="dl_aNews">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">平台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/website'}">网站</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/website/news'}">新闻</el-breadcrumb-item>
      <el-breadcrumb-item>添加店铺</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">
      <el-form :inline=true label-width="80px" size="mini">
        <el-form-item label="店铺名称">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <label class="labe">封面图:</label>
       <el-upload class="inline" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview">
        <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
    <span class="font">图片支持JPG、PNG，建议使用800*800尺寸，默认不超过1M</span>
    <div class="news_cnt">
       <label class="labe">店铺内容:</label>
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
    .labe{
      padding-left: 10px;
      margin-right: 10px;
    }
  }
  .font{
    font-size: 12px;
  }
  .news_cnt{
    margin: 10px 0;
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
      dialogImageUrl: '',
      dialogVisible: false,
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
