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
import menusMock from '../../mock/menusMock.js'
export default {
  name: 'login',
  data () {
    return {
      userName: '',
      password: '',
      loading: false,
      alertText: '',
      permissions: null,
      roles: null,
      menusMock: menusMock,
      redirect: 'Index'
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
      this.$axios({
        url: '/login',
        method: 'post',
        data: {
          userName: this.userName,
          password: this.password
        }
      }).then(result => {
        this.loading = false
        let code = result.data.code
        if (code === 666) {
          window.localStorage.setItem('session-token', this.userName)
          // console.log(result.data)
          if (result.data.data.permissions) {
            this.permissions = result.data.data.permissionSet
            // window.localStorage.setItem('permissions', JSON.stringify(result.data.data.permissionSet))
          }
          if (result.data.data.roles) {
            this.roles = result.data.data.roleSet
            // window.localStorage.setItem('roles', JSON.stringify(result.data.data.roleSet))
          }
          this.processMenuMock()
          window.localStorage.setItem('menusMock', JSON.stringify(this.menusMock))
          window.localStorage.setItem('provinceId', result.data.data.provinceId)
          window.localStorage.setItem('cityId', result.data.data.cityId)
          window.localStorage.setItem('role', this.roles[0])
          this.$Message.success('登陆成功')
          this.$router.replace({name: this.redirect})
        } else {
          this.$Message.warning(result.data.message)
        }
      }).catch(err => {
        this.loading = false
        console.log(err)
        this.$Message.error('登陆失败')
      })
    },
    processMenuMock () {
      this.menusMock.forEach(menu => {
        let show = false
        menu.subItems.forEach(subItem => {
          subItem.show = false
          if (this.permissions.indexOf(subItem.name) > -1 || (this.roles[0] === 'ADMIN')) {
            subItem.show = true
            if (this.redirect === 'Index') {
              this.redirect = subItem.name
            }
            show = true
          }
        })
        menu.item.show = show
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
