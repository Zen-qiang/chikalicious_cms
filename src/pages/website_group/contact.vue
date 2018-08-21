<template>
  <div id="contact">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">平台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/website'}">网站</el-breadcrumb-item>
      <el-breadcrumb-item>联系我们</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tab">
      <el-tabs v-model="activeName">
        <el-tab-pane label="未读" name="first">
          <el-button type="success" plain>批量删除</el-button>
          <el-table :data="tableData" border>
          <el-table-column type="selection" width="60"></el-table-column>
          <el-table-column prop="person" label="发件人" width="100">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="160">
          </el-table-column>
          <el-table-column prop="theme" label="主题" width="130">
          </el-table-column>
          <el-table-column prop="specific" label="详细信息" width="180">
          </el-table-column>
          <el-table-column prop="time" label="发布时间" width="133">
          </el-table-column>
          <el-table-column label="操作" min-width="135">
            <template slot-scope="scope">
              <el-button type="text" size="small">查看详情</el-button>
              <el-button type="text" size="small">已读</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
          <div class="message">
            <label>
              <span>发件人：</span>
              <span>hdisfhaskhf</span>
            </label><br>
            <label>
              <span>邮箱：</span>
              <span>11677638263@163.com</span>
            </label><br>
            <label>
              <span>主题：</span>
              <span>9er8w9r8</span>
            </label><br>
            <label>
              <span>详细内容：</span>
            </label>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已读" name="second">
          <el-button type="success" plain>批量删除</el-button>
          <el-table :data="selectData" border>
          <el-table-column type="selection" width="60"></el-table-column>
          <el-table-column prop="person" label="发件人" width="100">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="160">
          </el-table-column>
          <el-table-column prop="theme" label="主题" width="130">
          </el-table-column>
          <el-table-column prop="specific" label="详细信息" width="180">
          </el-table-column>
          <el-table-column prop="time" label="发布时间" width="133">
          </el-table-column>
          <el-table-column label="操作" width="135">
            <template slot-scope="scope">
              <el-button type="text" size="small">查看详情</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
          <div class="message">
            <label>
              <span>发件人：</span>
              <span>hdisfhaskhf</span>
            </label><br>
            <label>
              <span>邮箱：</span>
              <span>11677638263@163.com</span>
            </label><br>
            <label>
              <span>主题：</span>
              <span>9er8w9r8</span>
            </label><br>
            <label>
              <span>详细内容：</span>
            </label>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<style type="text/css" lang="less" scoped>
  .tab{
    margin-top: 50px;
    width: 900px;
    .flex{
      align-items:center;
      .btn{
        margin-left:12px;
      }
    }
    .message{
      width: 300px;
      height: 300px;
      margin-top:50px;
      padding-top: 10px;
      padding-left: 10px;
      border:1px solid #ddd;
      font-size: 14px;
    }
  }
</style>
<script type="text/javascript">
export default {
  data () {
    return {
      activeName: 'first',
      tableData: [
        {
          person: 'connie',
          email: '1156510825@qq.com',
          theme: '买甜品赢大奖',
          specific: 'dfsoffsldfkfds',
          time: '2018-09-27'
        }
      ],
      selectData: [
        {
          person: 'gumin',
          email: '1156510825@qq.com',
          theme: '买甜品赢大奖',
          specific: 'dfsoffsldfkfds',
          time: '2018-09-27'
        }
      ]
    }
  }
}
</script>
