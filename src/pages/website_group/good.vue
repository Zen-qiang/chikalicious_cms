<template>
  <div id="dl_good">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">平台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/website'}">网站</el-breadcrumb-item>
      <el-breadcrumb-item >商品</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">
      <el-tabs type="card">
        <el-tab-pane label="商品列表" name="first">
          <el-button type="success" plain>批量删除</el-button>
          <el-table :data="tableData" border style="width:100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="商品名称" width="130">
              <template slot-scope="scope">
                <img :src ='scope.row.url' height="30px"><br>
                <span>{{scope.row.sname}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="store" label="店铺" width="130">
            </el-table-column>
            <el-table-column prop="pro" label="分站-省" width="130">
            </el-table-column>
            <el-table-column prop="city" label="分站-市" width="130">
            </el-table-column>
            <el-table-column prop="classfiy" label="分类" width="130">
            </el-table-column>
            <el-table-column prop="price" label="价格" width="130">
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button type="text" size="small">修改</el-button>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="二维码设置" name="second">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
         <span class="size">图片支持JPG、PNG，建议使用800*800尺寸，默认不超过1M</span>
         <el-row class="save">
          <el-button type="success" @click="save">保存</el-button>
         </el-row>
        </el-tab-pane>
        <el-tab-pane label="新增商品" name="third">
          <div class="add">
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
              <el-switch class="setWidth" v-model="value4" active-color="#13ce66" inactive-color="#ff4949" active-text="6寸">
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
              <el-switch v-model="value" class="setWidth" active-color="#13ce66" inactive-color="#ff4949" active-text="10寸">
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
              <label class="labe">商品描述：</label>
              <el-upload style="display:inline-block" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePreview" >
              <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog><br>
              <span>图片支持JPG、PNG，建议使用800*800尺寸，默认不超过1M</span>
            </div>
            <div class="rule">
              <el-form :inline="true" :model="form" class="demo-form-inline" size="mini">
                <label>商品销售区域：</label>
                <el-form-item>
                  <el-select v-model="form.region" placeholder="省（直辖市）">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="form.name" placeholder="市">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                </el-form>
            </div>
            <div class="rule">
              <el-row>
                <el-button type="success" plain>取消</el-button>
                <el-button type="success" plain>发布</el-button>
                <el-button type="success">预览</el-button>
              </el-row>

            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<style type="text/css" lang="less" scoped>
  .title{
    margin-top:50px;
    .btn{
      margin-left:12px;
    }
    .flex{
      align-items:center;
    }
  }
.save{
  margin-top:50px;
  text-align: center;
}
.size{
  font-size: 12px;
  color: #333;
}
.add{
  width: 550px;
  .labe{
    width: 80px;
    display: inline-block;
   }
   .rule{
    margin-top:50px;
   }
   .setWidth{
    width: 80px;
   }
   .upload_picture{
    margin-top:50px;
    span{
      font-size: 12px;
    }
  }
}
</style>
<script type="text/javascript">
export default {
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      value: true,
      value4: true,
      form: {
        name: '',
        region: ''
      },
      tableData: [
        {
          url: '../../../static/img/86.jpg',
          sname: '提拉米苏仙境',
          store: '甜甜圈国度',
          pro: '山西',
          city: '忻州',
          classfiy: '分类一',
          price: 50
        }
      ]
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
    save () {
      this.$confirm('此操作将保存该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>
