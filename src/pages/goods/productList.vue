<template>
  <div id="dl-list">
     <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">平台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/product'}">商品</el-breadcrumb-item>
      <el-breadcrumb-item>上架商品列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-container>
        <el-form class="flex" ref="form" :model="sizeForm" label-width="80px">
        <el-form-item label="省份">
         <el-select clearable v-model="sizeForm.name" placeholder="省（直辖市）">
            <el-option label="山西" value="省"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select clearable v-model="sizeForm.region" placeholder="市">
            <el-option label="忻州" value="忻州"></el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-button type="success">搜索</el-button>
        </el-row>
      </el-form>
      </el-container>
     <el-tabs  class="mediu" type="card" @tab-click="handleClick">
      <el-tab-pane label="上架商品" name="first">
        <span class="total">共345件上架商品</span>
        <el-form class="flex" label-width="80px">
        <el-form-item label="商品分类">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input></el-input>
        </el-form-item>
        <el-row>
          <el-button type="success">搜索</el-button>
        </el-row>
      </el-form>
      <el-button type="success" plain>批量下架</el-button>
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
            <el-table-column prop="classfiy" label="分类" width="120">
            </el-table-column>
            <el-table-column label="价格" width="130">
              <template slot-scope="scope">
                <span>原价：{{scope.row.price}}</span><br>
                <span>优惠价：{{scope.row.sale}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button type="text" size="small">修改</el-button>
                <el-button type="text" size="small">下架</el-button>
                <el-button type="text" size="small">显示到页面</el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-tab-pane>
      <el-tab-pane label="显示到首页商品" name="second">
         <span class="total">共345件上架商品</span>
          <el-form class="flex" label-width="110px">
          <el-form-item label="商品分类">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="是否显示在首页">
            <el-select clearable v-model="sizeForm.show" placeholder="全部">
              <el-option label="前五张" value="前五张"></el-option>
            </el-select>
          </el-form-item>
          <el-row>
            <el-button type="success">搜索</el-button>
          </el-row>
        </el-form>
        <el-button type="success" plain>批量下架</el-button>
        <el-table :data="showData" border style="width:100%">
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
            <el-table-column prop="classfiy" label="分类" width="120">
            </el-table-column>
            <el-table-column label="价格" width="130">
              <template slot-scope="scope">
                <span>原价：{{scope.row.price}}</span><br>
                <span>优惠价：{{scope.row.sale}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button type="text" size="small">修改</el-button>
                <el-button type="text" size="small">下架</el-button>
                <el-button type="text" size="small">显示到页面</el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-tab-pane>
      <el-tab-pane label="已下架商品" name="third">角色管理</el-tab-pane>
     </el-tabs>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'ProductList',
  data () {
    return {
      radio2: 1,
      radio3: 1,
      sizeForm: {
        name: '',
        region: '',
        show: ''
      },
      tableData: [
        {
          url: '../../../static/img/86.jpg',
          sname: '提拉米苏仙境',
          store: '甜甜圈国度',
          pro: '山西',
          city: '忻州',
          classfiy: '分类一',
          price: 50,
          sale: 30
        }
      ],
      showData: [
        {
          url: '../../../static/img/86.jpg',
          sname: '提拉米苏仙境',
          store: '甜甜圈国度',
          pro: '山西',
          city: '忻州',
          classfiy: '分类一',
          price: 50,
          sale: 30
        }
      ]
    }
  },
  methods: {
    handleClick: function () {

    }
  }
}
</script>
<style type="text/css" lang="less" scoped>
.btn{
  height: 30px;
  line-height: 7px;
}
.mediu{
  margin-top:100px;
}
.set{
    width: 100%;
  }
.height{
  height: 30px;
}
#down{
  margin: -13px 0 0 30px;
  height: 20px;
}
.total{
  display: block;
  font-size: 14px;
  padding-left: 10px;
}
.add{
  float: right;
  margin-top:20px;
}
.flex{
  margin-top:30px;
  width: 100%;
  display: flex;
  justify-content:space-between;
}
</style>
