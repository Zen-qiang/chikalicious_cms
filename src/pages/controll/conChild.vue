<template>
  <div id="con-child">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">平台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/console'}">控制台</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="cnt">
      <div class="cnt_first">
        <p>
          <span>今日销售总额</span><br><br>
          <span>0</span>
        </p>
        <p>
          <span>今日订单总数</span><br><br>
          <span>0</span>
        </p>
      </div>
      <div class="cnt_second">
        <span>订单</span>
        <h2>
          <span>制作中</span>
          <span>待收货</span>
          <span>已添加</span>
        </h2><br><br>
        <h3>
          <span>0</span>
          <span>0</span>
          <span>0</span>
        </h3>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .cnt{
    width: 100%;
    margin-top:50px;
    .cnt_first{
      text-align: center;
      font-size: 14px;
      p:first-child{
        width:150px;
        height: 70px;
        padding-top: 10px;
        margin-right: 50px;
        display: inline-block;
        background: #f7e7e6;
        border:1px solid #999;
      }
      p:nth-child(2){
         width:150px;
        height: 70px;
        padding-top: 10px;
        display: inline-block;
        background: #ccc;
        border:1px solid #999;
      }
    }
    .cnt_second{
      font-size: 14px;
      margin-top:10px;
      width: 350px;
      height: 200px;
      border:1px solid #999;
      h2{
        padding-top: 50px;
        text-align: center;
        span{
          margin-right: 50px;
        }
      }
      h3{
         text-align: center;
        span{
          display: inline-block;
          width: 42px;
          margin-right: 50px;
        }
      }
    }
  }
</style>
