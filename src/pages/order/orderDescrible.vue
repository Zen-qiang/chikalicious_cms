<template>
  <div id="dl_decscible">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">平台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/product'}">订单</el-breadcrumb-item>
      <el-breadcrumb-item>订单详情</el-breadcrumb-item>
    </el-breadcrumb>
    <h2 class="title">订单详情</h2>
      <div class="specific">
        <p class="ddxx">订单信息：</p>
        <span>订单编号：<span>13xxxxxx</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>交易号：<span>13xxxxxx</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>买家信息：<span>TINA</span></span>
        <div class="child">
          <span>下单时间：<span>15:00</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>买家留言：<span>ERWRWR</span></span>
        </div>
      </div>
      <div class="specific">
        <p class="ddxx">商品信息：</p>
        <span>商品名：<span>日式蛋糕</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <img src="../../assets/images/86.jpg" height="40px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>店铺区域：<span>TINA</span></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>价格：<span>ERWRWR</span></span>
        <div class="childern">
          <span>店铺地址：<span>浦东新区张江高科技园区</span></span><br>
          <span>价格（元）：<span>ERWRWR</span></span><br>
          <span>数量（件）：<span>ERWRWR</span></span><br>
          <span>规格：<span>ERWRWR</span></span><br>
          <span>蜡烛：<span>ERWRWR</span></span><br>
          <span>餐具数（份）：<span>ERWRWR</span></span><br>
          <span>是否需要发票：<span>ERWRWR</span></span>
        </div>
      </div>
      <div class="specific">
        <p class="ddxx">订单状态：</p>
        <span>待收货</span>
         <el-button id="success" type="success">确认收货</el-button>
      </div>
  </div>
</template>
<style type="text/css" lang="less" scoped>
  .title{
    padding-top: 50px;
    font-size: 26px;
    font-weight: bold;
  }
    .specific{
      font-size: 14px;
      color: #333;
      line-height: 50px;
      .ddxx{
        display: inline-block;
        height: 50px;
      }
      .child{
        padding-left: 80px;
      }
      .childern{
        width: 360px;
        padding-left: 80px;
      }
    }
</style>
