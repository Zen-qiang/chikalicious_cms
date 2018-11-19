<template>
  <div>
    <editor :value='content' :isClear='isClear' @change="change"></editor>
    <Button type='primary' @click="handleSubmit()">保存</Button>
  </div>
</template>
<script>
import Editor from '../../components/Editor.vue'
export default {
  components: {
    Editor
  },
  data () {
    return {
      isClear: false,
      content: null
    }
  },
  created () {
    this.getUserAgreementInfo()
  },
  methods: {
    change (data) {
      this.content = data
    },
    getUserAgreementInfo () {
      // this.loading = true
      this.$axios.get('/api/user/queryUserAgreement', {
        params: {
        }
      }).then(res => {
        // this.loading = false
        if (res.data.code === 666) {
          this.content = res.data.data.value
        }
      }).catch(err => {
        console.log(err)
        // this.loading = false
      })
    },
    handleSubmit () {
      let formData = new FormData()
      formData.append('content', this.content)
      console.log(this.content)
      if (this.content === null) {
        this.$Message.error('请填写内容!')
      } else {
        this.$axios({
          url: '/admin/updateUserAgreement',
          method: 'post',
          headers: {'Content-Type': 'multipart/form-data'},
          data: formData
        }).then(result => {
          let code = result.data.code
          if (code === 666) {
            this.$Message.success('保存成功')
          } else {
            this.$Message.warning(result.data.message)
          }
        }).catch(err => {
          this.loading = false
          console.log(err)
          this.$Message.error('系统异常,请联系管理员')
        })
      }
    }
  }
}
</script>
