<template>
  <div>
    <Form ref='formInline' :model='formInline' :rules='ruleInline' :label-width="100">
      <FormItem prop='title' label="标题">
        <Input type='text' v-model='formInline.title' placeholder='title' />
      </FormItem>
      <FormItem label="封面图">
        <input id='fileinput' style='display:block' @change='uploading($event, 1)' type='file' accept='image/*' />
        <img :src='coverSrc' :style="{width: coverSrc ? '100px' : '', height: coverSrc ? '100px' : ''}"/>
      </FormItem>
       <FormItem label="封面hover图">
        <input id='fileinput' style='display:block' @change='uploading($event, 2)' type='file' accept='image/*' />
        <img :src='hoverUrlSrc' :style="{width: hoverUrlSrc ? '100px' : '', height: hoverUrlSrc ? '100px' : ''}"/>
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
      src: '',
      isClear: false,
      coverSrc: '',
      hoverUrlSrc: '',
      showPreview: false,
      formInline: {
        title: '',
        surfacePlotFile: '',
        hoverFile: '',
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
      return this.$lodash.map([{src: this.coverSrc}, {src: this.hoverUrlSrc}], 'src')
    }
  },
  methods: {
    change (data) {
      this.formInline.content = data
    },
    toShowPreview () {
      if (this.coverSrc === null || this.hoverUrlSrc === null) {
        this.$Message.warning('请上传图片')
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
          this.formInline.content = res.data.data.content
          this.formInline.id = res.data.data.id
          this.hoverUrlSrc = res.data.data.hoverUrl
          this.coverSrc = res.data.data.surfacePlot
        }
      }).catch(err => {
        console.log(err)
        // this.loading = false
      })
    },
    uploading (event, index) {
      // 获取文件
      var windowURL = window.URL || window.webkitURL
      if (index === 1) {
        this.formInline.surfacePlotFile = event.target.files[0] // 创建图片文件的url
        this.coverSrc = windowURL.createObjectURL(event.target.files[0])
      } else {
        this.formInline.hoverFile = event.target.files[0] // 创建图片文件的url
        this.hoverUrlSrc = windowURL.createObjectURL(event.target.files[0])
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        let formData = new FormData()
        formData.append('id', this.formInline.id)
        formData.append('title', this.formInline.title)
        formData.append('surfacePlotFile', this.formInline.surfacePlotFile)
        formData.append('hoverUrlFile', this.formInline.hoverFile)
        formData.append('content', this.formInline.content)
        formData.append('type', 'ARTS')
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
              this.$router.replace('/WebArtManagrer')
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
