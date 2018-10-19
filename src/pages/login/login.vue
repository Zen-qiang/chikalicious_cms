<template>
  <div class="login">
    <h1>CHIKALICIOUS</h1>
    <Card shadow class="login-content">
      <p>
        <label class="fx">
          <Input ref="usn" v-model="userName" prefix="ios-person" placeholder="请输入用户名" clearable autofocus/>
        </label>
      </p>
      <p>
        <label class="fx">
          <Input ref="psw" v-model="password" prefix="ios-unlock" placeholder="请输入密码" type="password" clearable @keyup.native.enter="login"/>
        </label>
      </p>
      <p>
        <Button type="primary" long :loading="loading" @click="login">
          <span v-if="!loading">登陆</span>
          <span v-else>正在登陆</span>
        </Button>
      </p>
      <p class="login-content-alert" v-show="alertText"><Alert type="warning" show-icon class="login-content-alert-el">{{alertText}}</Alert></p>
    </Card>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      userName: '',
      password: '',
      loading: false,
      alertText: ''
    }
  },
  methods: {
    login () {
      this.alertText = ''
      if (this.userName === '') {
        this.alertText = '请输入用户名'
        this.$nextTick(() => {
          this.$refs.usn.focus()
        })
        return
      }
      if (this.password === '') {
        this.alertText = '请输入密码'
        this.$nextTick(() => {
          this.$refs.psw.focus()
        })
        return
      }
      this.loading = true
      this.$axios.get('/login', {
        params: {
          userName: this.userName,
          password: this.password
        }
      }).then(result => {
        this.loading = false
        let code = result.data.code
        if (code === 666) {
          this.$Message.success('登陆成功')
          this.$router.replace('Index')
        } else {
          this.$Message.warning(result.data.message)
        }
      }).catch(err => {
        this.loading = false
        console.log(err)
        this.$Message.error('登陆失败')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  min-height: 100vh;
  padding-top: 200px;
  background: linear-gradient(to top, #ee9ca7, #ffdde1);
  h1 {
    text-align: center;
    margin-bottom: 40px;
    font-size: 30px;
  }
  &-content {
    width: 360px;
    margin: 0 auto;
    border: 1px solid #eee;
    border-radius: 8px;
    background: rgba($color: #ffffff, $alpha: .6);
    box-shadow: 0 0 10px #ffdde1;
    p {
      padding: 10px 0;
    }
    label span {
      width: 60px;
    }
    .login-content-alert {
      padding: 0;
      &-el {
        margin: 0;
      }
    }
  }
}
</style>
