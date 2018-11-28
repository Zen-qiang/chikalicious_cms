<template>
  <div>
    <Form ref='formInline' :model='formInline' :rules='ruleInline' :label-width="100">
      <FormItem label="店铺名称" prop='name'>
        <Input type='text' v-model='formInline.name' placeholder='店铺名称' />
      </FormItem>
      <FormItem label="店铺英文名称" prop='label'>
        <Input type='text' v-model='formInline.label' placeholder='店铺名称' />
      </FormItem>
      <FormItem label="地址" prop='fkRegionId'>
        <Row :gutter="16">
          <Col span="8">
            <Select v-model="provinceId" filterable clearable @on-change="getCityListByProvince()" placeholder="请选择省份">
                <Option v-for="item in provinceList" :value="item.id" :key="item.id">{{ item.value }}</Option>
              </Select>
              </Col>
              <Col span="8">
              <Select v-model="formInline.fkRegionId" filterable clearable placeholder="请选择城市">
                <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.value }}</Option>
              </Select>
              </Col>
              </Row>
      </FormItem>
      <FormItem label="详细地址" prop='address'>
        <Input type='text' v-model='formInline.address' placeholder='详细地址' />
      </FormItem>
      <FormItem label="联系电话" prop='contactNumber'>
        <Input type='text' v-model='formInline.contactNumber' placeholder='联系电话' />
      </FormItem>
      <FormItem label="营业时间" prop='businessHours'>
        <Input type='text' v-model='formInline.businessHours' placeholder='联系电话' />
      </FormItem>
      <FormItem label="封面图">
        <input id='fileinput' style='display:block' @change='uploading($event, 1)' type='file' accept='image/*' />
        <img :src='coverSrc' :style="{width: coverSrc ? '100px' : '', height: coverSrc ? '100px' : ''}"/>
      </FormItem>
       <FormItem label="封面hover图">
        <input id='fileinput' style='display:block' @change='uploading($event, 2)' type='file' accept='image/*' />
        <img :src='hoverUrlSrc' :style="{width: hoverUrlSrc ? '100px' : '', height: hoverUrlSrc ? '100px' : ''}"/>
      </FormItem>
        <FormItem  label="店铺描述" prop='description'>
          <div><editor :value='formInline.description' :isClear='isClear' @change="change"></editor></div>
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
      coverSrc: '',
      hoverUrlSrc: '',
      isClear: false,
      provinceId: '',
      provinceList: [],
      cityList: [],
      formInline: {
        name: '',
        address: '',
        fkRegionId: null,
        contactNumber: '',
        content: '',
        id: '',
        businessHours: null,
        cover: null,
        hoverUrl: null,
        label: null
      },
      ruleInline: {
        name: [{ required: true, message: '请输入店铺名称', trigger: 'blur' }],
        label: [{ required: true, message: '请输入店铺英文名称', trigger: 'blur' }],
        fkRegionId: [{required: true, message: '请输入店铺地址', trigger: 'change', type: 'number'}],
        address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
        contactNumber: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        businessHours: [{required: true, message: '请输入营业时间', trigger: 'blur'}]
      }
    }
  },
  created () {
    this.getProvinceList()
    if (this.routerParams) this.getShopInfo()
  },
  computed: {
    routerParams () {
      return this.$route.params.id
    }
  },
  methods: {
    change (data) {
      this.formInline.description = data
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
          this.formInline.label = res.data.data.label
          this.formInline.businessHours = res.data.data.businessHours
          this.formInline.address = res.data.data.address
          this.provinceId = res.data.data.provinceId
          this.getCityListByProvince()
          this.formInline.fkRegionId = res.data.data.fkRegionId
          this.formInline.contactNumber = res.data.data.contactNumber
          this.formInline.description = res.data.data.description
          this.formInline.releaseFormTime = res.data.data.createdTime
          this.coverSrc = res.data.data.cover
          this.hoverUrlSrc = res.data.data.hoverUrl
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
        this.formInline.cover = event.target.files[0] // 创建图片文件的url
        this.coverSrc = windowURL.createObjectURL(event.target.files[0])
      } else {
        this.formInline.hoverUrl = event.target.files[0] // 创建图片文件的url
        this.hoverUrlSrc = windowURL.createObjectURL(event.target.files[0])
      }
    },
    getProvinceList () {
      this.$axios.get('/common/queryRegionByRole', {
        params: {
        }
      }).then(res => {
        if (res.data.code === 666) {
          this.provinceList = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getCityListByProvince () {
      this.formInline.fkRegionId = null
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
        var formData = new FormData()
        formData.append('shopType', 'WEBSITESHOP')
        formData.append('id', this.id)
        formData.append('name', this.formInline.name)
        formData.append('label', this.formInline.label)
        formData.append('businessHours', this.formInline.businessHours)
        formData.append('address', this.formInline.address)
        formData.append('fkRegionId', this.formInline.fkRegionId)
        formData.append('contactNumber', this.formInline.contactNumber)
        formData.append('description', this.formInline.description)
        formData.append('coverFile', this.formInline.cover)
        formData.append('hoverFile', this.formInline.hoverUrl)
        if (valid) {
          this.$axios({
            url: '/shop/saveShop',
            method: 'post',
            data: formData,
            processData: false,
            contentType: false,
            headers: {'Content-Type': 'multipart/form-data'}
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
