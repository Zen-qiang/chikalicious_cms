<template>
  <div>
    <section class="cakeNews-container">
      <Form ref='formInline' :model='formInline' :rules='ruleInline' :label-width="100">
      <FormItem label="管理员名称" prop='userName'>
        <Input type='text' v-model='formInline.userName' placeholder='请输入管理员名称' />
      </FormItem>
      <FormItem label="密码"  prop='password'>
        <Input type='text' v-model='formInline.password' placeholder='请输入密码' />
      </FormItem>
      <FormItem label="联系方式" prop='phoneNo'>
        <Input type='text' v-model='formInline.phoneNo' placeholder='请输入联系方式' />
      </FormItem>
      <FormItem label="角色" prop='fkUserRole'>
          <Select v-model="formInline.fkUserRole"  @on-change="changUserRole()" placeholder="请选择角色">
            <Option v-for="item in roleInfoList" :value="item.id" :key="item.id">{{ item.description }}</Option>
          </Select>
      </FormItem>
      <FormItem label="分站" prop='title' v-show="isNotRoot">
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
      <FormItem label="权限" prop='title' v-show="isNotRoot">
          <CheckboxGroup v-model="permissionId">
            <Checkbox v-for="permissionInfo in permissionInfoList" :label="permissionInfo.id" :key="permissionInfo.id" style="margin-right:20px">{{permissionInfo.name}}</Checkbox>
          </CheckboxGroup>
      </FormItem>
    </Form>
    <Button type='primary' @click="handleSubmit('formInline')">保存</Button>
    </section>
  </div>
</template>
<script>
import RegionSelect from '../../components/RegionSelect.vue'
export default {
  name: 'adminAdd',
  components: {
    RegionSelect
  },
  data () {
    return {
      formInline: {
        password: '',
        userName: '',
        phoneNo: '',
        fkUserRole: ''
      },
      provinceId: '',
      provinceList: [],
      cityList: [],
      cityId: null,
      permissionInfoList: [],
      permissionId: [],
      roleInfoList: [],
      isNotRoot: true,
      id: null,
      ruleInline: {
        userName: [{ required: true, message: '请输入管理员名称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        phoneNo: [{ required: true, message: '请输入电话号码', trigger: 'blur' }],
        fkUserRole: [{required: true, message: '请输入选择角色', trigger: 'change', type: 'number'}]
      }
    }
  },
  created () {
    if (this.routerParams) this.getAdminInfo()
    this.getProvinceList()
    this.getPermissionInfo()
    this.getRoleInfo()
  },
  computed: {
    routerParams () {
      return this.$route.params.id
    }
  },
  methods: {
    getAdminInfo () {
      // this.loading = true
      this.$axios.get('/admin/queryUserById', {
        params: {
          id: this.routerParams
        }
      }).then(res => {
        // console.log(res.data)
        // this.loading = false
        if (res.data.code === 666) {
          this.formInline.userName = res.data.data.userName
          this.formInline.password = res.data.data.password
          this.formInline.phoneNo = res.data.data.phoneNo
          this.formInline.fkUserRole = res.data.data.fkUserRole
          this.permissionId = res.data.data.permissionId
          this.id = res.data.data.id
          this.provinceId = res.data.data.provinceId
          this.getCityListByProvince()
          this.cityId = res.data.data.cityId
        }
      }).catch(err => {
        console.log(err)
        // this.loading = false
      })
    },
    getPermissionInfo () {
      this.$axios.get('/admin/queryAllPermission', {
        params: {
        }
      }).then(res => {
        if (res.data.code === 666) {
          this.permissionInfoList = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getRoleInfo () {
      this.$axios.get('/admin/queryAllRole', {
        params: {
        }
      }).then(res => {
        if (res.data.code === 666) {
          this.roleInfoList = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
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
    changUserRole () {
      if (this.formInline.fkUserRole === 1) {
        this.isNotRoot = false
        this.cityId = null
        this.provinceId = ''
        this.getCityListByProvince()
        this.permissionId = []
      } else {
        this.isNotRoot = true
      }
    },
    getCityListByProvince () {
      this.cityId = null
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
        if (this.isNotRoot && (this.permissionId.length === 0 || this.$lodash.isNull(this.cityId))) {
          this.$Message.error('非超级管理员必须选择地区以及权限')
        } else if (valid) {
          this.$axios({
            url: '/admin/saveAdminUser',
            method: 'post',
            data: {
              userName: this.formInline.userName,
              password: this.formInline.password,
              phoneNo: this.formInline.phoneNo,
              fkUserRole: this.formInline.fkUserRole,
              regionId: this.cityId,
              permissionIds: JSON.stringify(this.permissionId),
              id: this.id
            }
            // headers: {'Content-Type': 'multipart/form-databoundary=21'}
          }).then(result => {
            let code = result.data.code
            if (code === 666) {
              this.$Message.success('保存成功')
              this.$router.replace('/AdminList')
            } else {
              this.$Message.warning(result.data.message)
            }
          }).catch(err => {
            this.loading = false
            console.log(err)
            this.$Message.error('系统异常,请联系管理员')
          })
        }
      })
    }
  }
}
</script>
