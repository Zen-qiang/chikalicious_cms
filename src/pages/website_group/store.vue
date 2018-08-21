<template>
  <div id="store">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">平台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/Wesite'}">网站</el-breadcrumb-item>
      <el-breadcrumb-item>店铺</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="form">
      <el-tabs v-model="activeName2" type="card">
        <el-tab-pane label="店铺列表" name="first">
          <el-form :inline = true ref="form" :model="sizeForm" label-width="80px">
            <el-form-item label="店铺标题">
              <el-input v-model="sizeForm.name"></el-input>
            </el-form-item>
            <el-date-picker v-model="value3" type="datetime" placeholder="开始时间" default-time="12:00:00">
            </el-date-picker>
            <el-button type="success">搜索</el-button>
            <el-button type="success"  @click="$router.push({name: 'aStore'})">+添加店铺</el-button>
          </el-form>
          <el-table :data="tableData" border>
            <el-table-column prop="number" label="序号" width="170">
          </el-table-column>
          <el-table-column prop="title" label="店铺标题" width="230">
          </el-table-column>
          <el-table-column prop="time" label="发布时间" width="210">
          </el-table-column>
          <el-table-column label="操作" width="190">
            <template slot-scope="scope">
              <el-button type="text" size="small">修改</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        </el-tab-pane>
        <el-tab-pane label="城市设置" name="second">
          <el-form :model="ruleForm" :inline=true ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="城市名字：" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="province">
              <el-select v-model="ruleForm.pro" placeholder="省（直辖市）" clearable>
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" prop="city">
              <el-select v-model="ruleForm.city" placeholder="城市" clearable>
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-row class="button">
              <el-button type="success" @click="$router.push({name: 'aNews'})">+添加店铺</el-button>
            </el-row>
          </el-form>
          <el-table :data="selectData" border>
            <el-table-column prop="number" label="序号" width="170">
          </el-table-column>
          <el-table-column prop="address" label="店铺地址" width="230">
          </el-table-column>
          <el-table-column prop="specific" label="详细地址" width="250">
          </el-table-column>
          <el-table-column label="操作" width="225">
            <template slot-scope="scope">
              <el-button type="text" size="small">修改</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .form{
    margin-top:50px;
    .select{
      height: 30px;
      line-height: 5px
    }
    .menu{
      font-size: 14px;
      letter-spacing: -8px;
      li{
        width: 24%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        display: inline-block;
        letter-spacing: normal;
      }
    }
    .title{
      margin-top:50px;
      li{
        border-bottom: 1px solid #ddd
      }
    }
    .button{
      width: 100%;
      text-align: right;
    }
  }
</style>
<script type="text/javascript">
export default {
  data () {
    return {
      activeName2: 'first',
      value3: '',
      sizeForm: {
        name: '',
        region: ''
      },
      ruleForm: {
        pro: '',
        city: ''
      },
      tableData: [
        {
          number: 1,
          title: '美康粉黛旗舰店',
          time: '2018-09-23'
        },
        {
          number: 2,
          title: '美康粉黛旗舰店',
          time: '2018-09-15'
        }
      ],
      selectData: [
        {
          number: 1,
          address: '上海市静安区',
          specific: '南京路步行街115弄C座1503'
        }
      ]
    }
  }
}
</script>
