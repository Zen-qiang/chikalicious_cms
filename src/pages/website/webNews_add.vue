<template>
  <div>
    <Form ref='formInline' :model='formInline' :rules='ruleInline' :label-width="80">
      <FormItem prop='title' label="标题">
        <Input type='text' v-model='formInline.title' placeholder='title' />
      </FormItem>
      <FormItem label="封面图">
        <input id='fileinput' style='display:block' @change='uploading($event)' type='file' accept='image/*' />
        <img :src='src' :style="{width: src ? '100px' : '', height: src ? '100px' : ''}"/>
      </FormItem>
        <FormItem  label="新闻内容">
          <editor :value='formInline.content' :isClear='isClear' @change="change"></editor>
      </FormItem>
      <FormItem>
          <Button type='primary' @click="handleSubmit('formInline')">保存</Button>
          <Button type="primary" @click="toShowPreview()">预览</Button>
          <preview :imgs="imgs" :title="formInline.title" :content="formInline.content" :showPreview.sync="showPreview"></preview>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import Editor from '../../components/Editor.vue'
import Preview from '../../components/Preview'
export default {
  components: {
    Editor,
    Preview
  },
  data () {
    return {
      src: null,
      isClear: false,
      showPreview: false,
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
    },
    imgs () {
      return this.$lodash.map([{src: this.src}], 'src')
    }
  },
  methods: {
    change (data) {
      this.formInline.content = data
    },
    toShowPreview () {
      if (this.src === null) {
        this.$Message.warning('至少需要一张图片')
      } else {
        this.showPreview = true
      }
    },
    getNewInfo () {
      // this.loading = true
      this.$axios.get('/product/queryNewsById', {
        params: {
          id: this.routerParams
        }
      }).then(res => {
        // this.loading = false
        if (res.data.code === 666) {
          this.formInline.title = res.data.data.title
          this.formInline.file = res.data.data.surfacePlot
          this.formInline.content = res.data.data.content
          this.formInline.id = res.data.data.id
          this.src = res.data.data.surfacePlot
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
        formData.append('surfacePlotFile', this.formInline.file)
        formData.append('content', this.formInline.content)
        formData.append('type', 'NEWS')
        if (valid) {
          this.$axios({
            url: '/product/saveNews',
            method: 'post',
            headers: {'Content-Type': 'multipart/form-data'},
            data: formData
          }).then(result => {
            let code = result.data.code
            if (code === 666) {
              this.$Message.success('保存成功')
              this.$router.replace('/WebNewsManagrer')
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
