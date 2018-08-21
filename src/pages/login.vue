<template>
  <div id="dl_login">
    <div class="login_box">
      <div class="login_font">
        <div>用户名</div>
        <el-input v-model="username" placeholder="请输入用户名"></el-input>
      </div>
      <div class="login_font" >
        <div>密码</div>
        <input id="pass" v-model="password" placeholder="请输入密码">
      </div>
      <el-button type="success" @click="$router.replace({name: 'Index'})">登录</el-button>
    </div>
  </div>
</template>
<script>
import { Button, Input } from 'element-ui'
export default {
  name: 'Login',
  component: {
    Button,
    Input
  },
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>
<style lang="less" scoped>
#dl_login{
  position: relative;
  width: 100%;
  max-width: 1366px;
  height: 100%;
  text-align: center;
  background: url(../assets/images/86.jpg) top center;
    .login_box{
      position: absolute;
      bottom: 5%;
      left:0;
      right: 0;
    width: 200px;
    margin: 0 auto;
    background: #ddd;
     .login_font{
    margin-top:0;
     width: 100%;
      height: 40px;
      margin-bottom: 10px;
      line-height: 40px;
     &>div{
      width: 50px;
     }
      #pass{
      position: absolute;
      width: 70%;
      height:40px;
      right: 0;
      top:50px;
      border:1px solid #dcdfe6;
      font-size: 14px;
      padding:0 15px;
      color:#606266;
    }
     #pass::placeholder{
      color:#ccc;
     }
    .el-input{
      position: absolute;
      width: 70%;
      top:0px;
      right: 1px;
    }
    }
    .el-button{
      margin-top:20px;
    }
  }
}

</style>
