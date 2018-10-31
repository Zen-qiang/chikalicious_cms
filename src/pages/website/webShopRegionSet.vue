<template>
  <div>
    <Form ref='formInline' :model='formInline' :rules='ruleInline'>
      <FormItem prop='title'>
        <Input type='text' v-model='formInline.title' placeholder='title' />
      </FormItem>
      <FormItem>
        <input id='fileinput' style='display:block' @change='uploading($event)' type='file' accept='image/*' />
        <img :src='src' :style="{width: src ? '100px' : '', height: src ? '100px' : ''}"/>
      </FormItem>
        <FormItem>
          <editor :value='formInline.content' :isClear='isClear' @change="change"></editor>
      </FormItem>
      <FormItem>
          <Button type='primary' @click="handleSubmit('formInline')">保存</Button>
      </FormItem>
    </Form>
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
      src: '',
      isClear: false,
      formInline: {
        title: '',
        file: '',
        content: '',
        id: ''
      },
      ruleInline: {
        title: [{ required: true, message: '请输入新闻标题', trigger: 'blur' }],
        content: [
          { required: true, message: '请输入新闻内容', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (this.routerParams) this.getNewInfo()
  },
  computed: {
    routerParams () {
      return this.$route.params.id
    }
  },
  methods: {
    change (data) {
      console.log(data)
      this.formInline.content = data
    },
    getNewInfo () {
      // this.loading = true
      this.$axios.get('/product/queryNewsById', {
        params: {
          id: this.routerParams
        }
      }).then(res => {
        console.log(res.data)
        // this.loading = false
        if (res.data.code === 666) {
          this.formInline.title = res.data.data.title
          this.formInline.file = res.data.data.surfacePlot
          this.formInline.content = res.data.data.content
          this.formInline.id = res.data.data.id
        }
      }).catch(err => {
        console.log(err)
        // this.loading = false
      })
    },
    uploading (event) {
      this.formInline.file = event.target.files[0]
      // 获取文件
      var windowURL = window.URL || window.webkitURL
      this.formInline.file = event.target.files[0] // 创建图片文件的url
      this.src = windowURL.createObjectURL(event.target.files[0])
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        let formData = new FormData()
        formData.append('id', this.formInline.id)
        formData.append('title', this.formInline.title)
        formData.append('file', this.formInline.file)
        formData.append('content', this.formInline.content)
        console.log(formData.get('file'))
        if (valid) {
          this.$axios({
            url: '/product/saveNews',
            method: 'post',
            data: {
              id: this.formInline.id,
              title: this.formInline.title,
              content: this.formInline.content
            }
            // headers: {'Content-Type': 'multipart/form-databoundary=21'}
          }).then(result => {
            let code = result.data.code
            if (code === 666) {
              this.$Message.success('保存成功')
              this.$router.replace('/CakeNews')
            } else {
              this.$Message.warning(result.data.message)
            }
          }).catch(err => {
            this.loading = false
            console.log(err)
            this.$Message.error('系统异常,请联系管理员')
          })
        } else {
          this.$Message.error('请补全表单!')
        }
      })
    }
  }
}
</script>
