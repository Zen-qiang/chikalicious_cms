<template>
  <div id="index">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">平台</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/website'}">网站</el-breadcrumb-item>
        <el-breadcrumb-item>首页</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tab">
      <el-tabs v-model="activeName2" type="card">
        <el-tab-pane label="banner管理" name="first">
          <el-row class="button">
            <el-button type="success">+添加banner图</el-button>
          </el-row>
          <el-table :data="selectData" border align="center">
            <el-table-column prop="number" label="序号" width="120">
          </el-table-column>
          <el-table-column prop="discrible" label="banner描述" width="230">
          </el-table-column>
          <el-table-column prop="url" label="banner图片" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.url" height="30px">
            </template>
          </el-table-column>
          <el-table-column prop="link" label="跳转链接" width="128">
          </el-table-column>
          <el-table-column prop="grade" label="排序" width="120">
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small">修改</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
          </el-table>
          <div class="change" :class="{none:changed}">
            <div id="dl_aNews">
              <div class="titlenew">
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
          </div>
        </el-tab-pane>
        <el-tab-pane label="推荐品展示" name="second">
          <ul class="menu title">
            <li>商品名称</li>
            <li>商品图片</li>
            <li>排序</li>
            <li>链接地址</li>
            <li>操作</li>
          </ul>
          <ul class="menu">
            <li>提拉米苏仙境</li>
            <li><img src="../../assets/images/86.jpg" height="30px"></li>
            <li>1</li>
            <li>http://baidu.com</li>
            <li>
              <span><a href="javascript:;">删除</a></span>
              <span><a href="javascript:;" @click="change">修改</a></span>
            </li>
          </ul>
          <div id="dl_aNews">
            <div class="titlenew">
              <el-form :inline=true label-width="80px" size="mini">
                <el-form-item label="商品名称">
                  <el-input></el-input>
                </el-form-item>
              </el-form>
              <label class="labe">图片:</label>
                <el-upload class="inline" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview">
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl2" alt="">
                </el-dialog>
            </div>
            <span class="font">图片支持JPG、PNG，建议使用800*800尺寸，默认不超过1M</span>
            <div class="news_cnt">
              <el-form size="mini" :label-position="labelPosition" label-width="100px" style="width:200px">
                <el-form-item label="跳转链接：">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="排序：">
                  <el-input></el-input>
                </el-form-item>
              </el-form>
            </div>
            <el-row>
              <el-button type="success" plain>发布</el-button>
              <el-button type="success" plain>取消</el-button>
              <el-button type="success">预览</el-button>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName2: 'first',
      changed: true,
      labelPosition: 'right',
      dialogImageUrl: '',
      dialogImageUrl2: '',
      dialogVisible: false,
      selectData: [
        {
          number: 1,
          discrible: 'U盾哦哦啊死扶欧舒丹',
          url: '../../../static/img/86.jpg',
          link: 0,
          grade: 3
        }
      ]
    }
  },
  methods: {
    change () {
      this.changed = false
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove () {
    }
  }
}
</script>
<style lang="less" scoped>
  #index{
    width: 900px;
  }
  .tab{
    margin-top:50px;
    .button{
      width: 100%;
      text-align: right;
    }
    .menu{
      letter-spacing: -8px;
      li{
        width: 15%;
        height: 30px;
        text-align: center;
        line-height: 30px;
        display: inline-block;
        letter-spacing: normal;
      }
    }
    .title{
      margin-top:50px;
      li{
        border-bottom: 1px solid #ddd;
      }
    }
    .none{
      display: none;
    }
     .titlenew{
    margin-top: 50px;
    .inline{
      display: inline-block;
    }
  }
  .font{
    font-size: 12px;
  }
  .news_cnt{
    margin-top:50px;
  }
}
</style>
