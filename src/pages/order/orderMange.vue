<template>
  <div id="order_des">
     <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">平台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/kitchen'}">厨房</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="address">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="活动区域">
            <el-select clearable v-model="formInline.name" placeholder="地址">
              <el-option label="山西" value="shanxi"></el-option>
              <el-option label="北京" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select clearable v-model="formInline.region" placeholder="活动区域">
              <el-option label="忻州" value="xinzhou"></el-option>
              <el-option label="昌平" value="changping"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
          <el-button type="success">查询</el-button>
          </el-form-item>
        </el-form>
    </div>
    <div class="card">
      <el-tabs type="card">
        <el-tab-pane label="全部订单" name="first">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="订单编号">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="收货人手机号">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="店铺名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="下单时间">
            <el-col :span="11">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="formInline.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">----</el-col>
            <el-col :span="11">
              <el-date-picker type="datetime" placeholder="选择时间" v-model="formInline.date2" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
          <el-button type="success">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="dataComplex" style="width: 100%">
          <el-table-column type="expand">
            <el-table :data="showData" border style="width:100%">
              <el-table-column label="商品信息" width="120">
                <template slot-scope="scope">
                  <img :src="scope.row.url" height="30px"><br>
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column label="商品规格" width="90">
                <template slot-scope="scope">
                  <span>{{scope.row.size}}</span><br>
                  <span>{{scope.row.quanty}}</span>
                </template>
              </el-table-column>
              <el-table-column label="买家名称" width="120">
                <template slot-scope="scope">
                  <span>{{scope.row.tel}}</span><br>
                  <span>{{scope.row.family}}</span>
                </template>
              </el-table-column>
              <el-table-column label="餐具信息" width="120">
                <template slot-scope="scope">
                  <span>蜡烛：{{scope.row.candle}}</span><br>
                  <span>餐具：{{scope.row.tableware}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="account" label="订单金额" width="90">
              </el-table-column>
              <el-table-column prop="state" label="订单状态" width="100">
              </el-table-column>
              <el-table-column prop="storename" label="店铺名称" width="150">
              </el-table-column>
              <el-table-column label="操作" width="73">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="go">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-table-column>
        <el-table-column label="订单编号" prop="ordernum">
        </el-table-column>
        <el-table-column label="交易编号" prop="transaction">
        </el-table-column>
        <el-table-column label="下单时间" prop="orderEnd">
        </el-table-column>
      </el-table>
        </el-tab-pane>
        <el-tab-pane label="待收货" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="制作中" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="已完成" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formInline: {
        region: '',
        name: '',
        date1: '',
        date2: ''
      },
      dataComplex: [
        {
          ordernum: 33232333,
          transaction: 97807878,
          orderEnd: 34344234
        }
      ],
      showData: [
        {
          url: '../../../static/img/86.jpg',
          name: '冰雪米其林',
          size: '6寸',
          quanty: '1件',
          tel: 13935040154,
          family: 'gumin',
          candle: '需要',
          tableware: '10份',
          account: 3333,
          state: '制作中',
          storename: '卡路里我的天敌'
        }
      ]
    }
  },
  methods: {
    go () {
      this.$router.push({name: 'OrderDescrible'})
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
  .fenge{
    display: inline-block;
    height: 20px;
    width: 20px;
    border-bottom:1px solid #ddd;
  }
  .menu{
    margin-top:10px;
    li{
      display: inline-block;
      width: 12%;
      text-align:center;
      font-size: 14px;
    }
  }
  .content{
    border:1px solid #ddd;
    .message{
      height: 40px;
      font-size: 14px;
      border-bottom: 1px solid #ddd;
      line-height: 40px;
      p{
        width: 30%;
        text-align: center;
        margin-right: 10px;
        display: inline-block;
      }
    }
    .order_content{
      li{
        display: inline-block;
        width:11%;
        height: 60px;
        text-align: center;
        font-size: 14px;
        margin-right: 5px;
        overflow: hidden;
        word-break:keep-all;
        span{
          display: inline-block;
        }
        img{
           display: inline-block;
          margin-top:5px;
        }
        p:nth-child(1){
          padding-top: 20px;
        }
      }
      .btn{
          display: inline-block;
          margin-top:30px;
        }
    }
  }
</style>
