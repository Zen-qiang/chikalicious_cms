<template>
  <div>
    <Form ref='formInline' :model='formInline' :rules='ruleInline'>
      <FormItem prop='name'>
        <Input type='text' v-model='formInline.name' placeholder='店铺名称' />
      </FormItem>
      <FormItem prop='fkRegionId'>
        <Input type='text' v-model='formInline.fkRegionId' placeholder='店铺地址' />
      </FormItem>
      <FormItem prop='address'>
        <Input type='text' v-model='formInline.address' placeholder='详细地址' />
      </FormItem>
      <FormItem prop='contactNumber'>
        <Input type='text' v-model='formInline.contactNumber' placeholder='联系电话' />
      </FormItem>
      <FormItem prop='releaseFormTime'>
        <DatePicker type="date" format="yyyy-MM-dd" placeholder="Select date" style="width: 200px" v-model="formInline.releaseFormTime"></DatePicker>
      </FormItem>
      <FormItem>
        <input id='fileinput' style='display:block' @change='uploading($event)' type='file' accept='image/*' />
        <img :src='src' :style="{width: src ? '100px' : '', height: src ? '100px' : ''}"/>
      </FormItem>
        <FormItem prop='description'>
          <editor :value='formInline.description' :isClear='isClear' @change="change"></editor>
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
        name: '',
        address: '',
        fkRegionId: null,
        contactNumber: '',
        file: '',
        content: '',
        id: '',
        releaseFormTime: null
      },
      ruleInline: {
        name: [{ required: true, message: '请输入店铺名称', trigger: 'blur' }],
        fkRegionId: [{ required: true, message: '请输入店铺地址', trigger: 'blur' }],
        address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
        contactNumber: [{ required: true, message: '请输入联系电话', trigger: 'blur' }]
      }
    }
  },
  created () {
    if (this.routerParams) this.getShopInfo()
  },
  computed: {
    routerParams () {
      return this.$route.params.id
    },
    releaseTime () {
      return this.formInline.releaseFormTime ? this.$moment(this.formInline.releaseFormTime).format('YYYY-MM-DD') : null
    }
  },
  methods: {
    change (data) {
      this.formInline.content = data
    },
    getShopInfo () {
      // this.loading = true
      this.$axios.get('/shop/queryShopById', {
        params: {
          id: this.routerParams
        }
      }).then(res => {
        // this.loading = false
        if (res.data.code === 666) {
          this.id = res.data.data.id
          this.formInline.name = res.data.data.name
          this.formInline.address = res.data.data.address
          this.formInline.fkRegionId = res.data.data.fkRegionId
          this.formInline.contactNumber = res.data.data.contactNumber
          this.formInline.description = res.data.data.description
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
        var formData = new FormData()
        formData.append('id', this.id)
        formData.append('name', this.formInline.name)
        formData.append('address', this.formInline.address)
        formData.append('fkRegionId', this.formInline.fkRegionId)
        formData.append('contactNumber', this.formInline.contactNumber)
        formData.append('description', this.formInline.description)
        // formData.append('files[]', this.formInline.file)
        if (valid) {
          this.$axios({
            url: '/shop/saveShop',
            method: 'post',
            data: formData,
            processData: false,
            contentType: false,
            headers: {'Content-Type': 'multipart/form-databoundary=21'}
          }).then(result => {
            let code = result.data.code
            if (code === 666) {
              this.$Message.success('保存成功')
              this.$router.replace('/WebShopList')
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
