<template>
  <div>
        <Row :gutter="12">
           <Button type="primary" @click="add" shape="circle" icon="md-add-circle"></Button>
           <br/>
           <Col span="6" v-for="(name, index) in addressForm" :key="index">
            <input style='display:block' @change='uploading($event,index)' type='file' accept='image/*' />
            <img :src='name.src' :style="{width: name.src ? '200px' : '', height: name.src ? '200px' : ''}"/>
            <Button type="primary" v-show="index === 1" @click="deleteItem(index)" shape="circle" icon="md-remove-circle"></Button>
           </Col>
        </Row>
          <editor :isClear='isClear' :value='content' @change="change" ></editor>
          <Button type='primary' @click="handleSubmit('formInline')">保存</Button>
          <Button type="primary" @click="showPreview = true">预览</Button>
          <preview :imgs="imgs" :content="content" :showPreview.sync="showPreview"></preview>
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
      addressForm: [{src: null, file: null}],
      isClear: false,
      content: null,
      showPreview: false
    }
  },
  computed: {
    imgs () {
      return this.$lodash.map(this.addressForm, 'src')
    }
  },
  methods: {
    change (data) {
      this.content = data
    },
    uploading (event, index) {
      // 获取文件
      var windowURL = window.URL || window.webkitURL
      this.addressForm.file = event.target.files[0] // 创建图片文件的url
      this.addressForm[index].src = windowURL.createObjectURL(event.target.files[0])
    },
    deleteItem (index) {
      if (this.addressForm.length > 0) {
        this.addressForm.splice(index, 1)
      } else {
        this.$Message.warning('至少需要一张图片')
      }
      console.log(index)
    },
    add () {
      this.addressForm.push({src: null, file: null})
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        // let formData = new FormData()
        // formData.append('id', this.formInline.id)
        // formData.append('title', this.formInline.title)
        // formData.append('file', this.formInline.file)
        // formData.append('content', this.formInline.content)
        // console.log(formData.get('file'))
        if (this.formInline.file === null) {
          this.$Message.error('请选择文件!')
        } else if (valid) {
          this.$axios({
            url: '/product/saveNews',
            method: 'post',
            headers: {'Content-Type': 'multipart/form-data'}
            // data: formData
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
