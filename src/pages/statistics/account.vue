<template>
  <div id="dl-acc">
    <el-breadcrumb separator-class='el-icon-arrow-right'>
      <el-breadcrumb-item :to="{ path: '/' }">平台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/Total'}">统计</el-breadcrumb-item>
      <el-breadcrumb-item>平台收支情况</el-breadcrumb-item>
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
        <el-form :inline=true :model="formInline">
          <el-form-item label="时间区间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="开始时间" v-model="formInline.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="结束时间" v-model="formInline.date2" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-form>
        <el-form :model="message" :inline=true>
          <el-form-item label="店铺位置">
            <el-select clearable v-model="message.position" placeholder="浙江">
              <el-option label="江苏" value="time"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="city">
            <el-select clearable v-model="message.city" placeholder="杭州">
              <el-option label="淮安" value="time"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="success" @click="show">搜索</el-button>
        </el-form>
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
      </div>
      <div class="year">
        <el-row>
          <el-button type="success" plain>年度</el-button>
          <el-button type="success">2016</el-button>
          <el-button type="success" plain>2017</el-button>
        </el-row>
      </div>
      <el-table :data="tableData" border>
        <el-table-column prop="month" label="月份" width="132">
        </el-table-column>
        <el-table-column prop="money" label="平台总营业额（元）" width="212">
        </el-table-column>
        <el-table-column prop="quantity" label="平台总订单数（件）" width="276">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style type="text/css" lang="less" scoped>
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
      margin-top: 50px;
    }
    .year{
       margin-top: 50px;
    }
    .line{
      text-align: center;
    }
    .city{
      margin-left:23px;
    }
  }
</style>
<script type="text/javascript">
export default {
  data () {
    return {
      formInline: {
        date1: '',
        date2: ''
      },
      message: {
        position: '',
        city: ''
      },
      tableData: [
        {
          moth: 1,
          money: 13500,
          quantity: 400
        }
      ]
    }
  },
  methods: {
    show () {
      alert('正在搜索')
    }
  }
}
</script>
