<template>
  <div>
    <Form ref='formInline' :model='formInline' :rules='ruleInline'>
      <FormItem prop='title'>
        <Input type='text' v-model='formInline.title' placeholder='title' />
      </FormItem>
      <FormItem prop='title'>
      <Row :gutter="16">
          <Col span="8">
            <Select v-model="provinceId" filterable clearable @on-change="getCityListByProvince()" placeholder="请选择省份">
                <Option v-for="item in provinceList" :value="item.id" :key="item.id">{{ item.value }}</Option>
              </Select>
              </Col>
              <Col span="8">
              <Select v-model="cityId" filterable clearable @on-change="$emit('getCurrentCity', cityId)" placeholder="请选择城市">
                <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.value }}</Option>
              </Select>
              </Col>
              </Row>
       </FormItem>
      <FormItem prop='type'>
        <Select v-model="formInline.type" filterable clearable placeholder="请选择类型" >
          <Option  value="href" key="href">跳转链接</Option>
          <Option  value="pdt" key="pdt">跳转页面</Option>
        </Select>
      </FormItem>
       <FormItem prop='target'>
        <Input type='text' v-model='formInline.target' placeholder='跳转链接'   />
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
      provinceId: null,
      provinceList: [],
      cityList: [],
      cityId: null,
      formInline: {
        title: '',
        file: null,
        content: '',
        id: '',
        type: null,
        target: null
      },
      ruleInline: {
        title: [{ required: true, message: '请输入新闻标题', trigger: 'blur' }],
        // target: [{ required: true, message: '请输入跳转链接', trigger: 'blur' }],
        // type: [{required: true, message: '请选择类型', trigger: 'change'}],
        content: [{required: true, message: '请输入新闻内容', trigger: 'blur'}]
      }
    }
  },
  created () {
    if (this.routerParams) this.getNewsInfo()
    this.getProvinceList()
  },
  computed: {
    routerParams () {
      return this.$route.params.id
    }
  },
  methods: {
    change (data) {
      this.formInline.content = data
    },
    getNewsInfo () {
      // this.loading = true
      this.$axios.get('/product/queryRegionCarouselById', {
        params: {
          id: this.routerParams
        }
      }).then(res => {
        // this.loading = false
        if (res.data.code === 666) {
          this.formInline.title = res.data.data.name
          // this.formInline.file = res.data.data.imageUrl
          this.formInline.content = res.data.data.content
          this.formInline.type = res.data.data.type
          this.formInline.target = res.data.data.target
          this.formInline.id = res.data.data.id
          this.cityId = res.data.data.cityId
          this.provinceId = res.data.data.provinceId
          this.src = res.data.data.imageUrl
          this.getCityListByProvince()
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
    getProvinceList () {
      this.$axios.get('/common/queryRegionByRole', {
        params: {}
      }).then(res => {
        if (res.data.code === 666) {
          this.provinceList = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getCityListByProvince () {
      this.$axios.get('/common/queryCityIdByProvinceId', {
        params: {
          provinceId: this.provinceId
        }
      }).then(res => {
        if (res.data.code === 666) {
          this.cityList = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        let formData = new FormData()
        formData.append('id', this.formInline.id)
        formData.append('name', this.formInline.title)
        formData.append('type', this.formInline.type)
        formData.append('target', this.formInline.target)
        formData.append('file', this.formInline.file)
        formData.append('fkRegionId', this.cityId)
        formData.append('content', this.formInline.content)
        if (this.formInline.file === null && this.formInline.id === null) {
          this.$Message.error('请选择文件!')
        } else if (valid) {
          this.$axios({
            url: '/product/saveRegionCarouse',
            method: 'post',
            headers: {'Content-Type': 'multipart/form-data'},
            data: formData
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
