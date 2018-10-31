<template>
  <div>
    <section class="cakeNews-container">
      <Row>
        <Col span="2">管理员名称</Col>
        <Col span="10"><Input type='text' v-model='userName' placeholder='请输入管理员名称' /></Col>
    </Row>
    <br/>
    <Row>
        <Col span="2">密码</Col>
        <Col span="10"><Input type='text' v-model='password' placeholder='请输入密码' /></Col>
    </Row>
    <br/>
    <Row>
        <Col span="2">联系方式</Col>
        <Col span="10"><Input type='text' v-model='phoneNo' placeholder='请输入联系方式' /></Col>
    </Row>
    <br/>
    <Row>
        <Col span="2">角色:</Col>
        <Col span="10">
          <Select v-model="fkUserRole" filterable clearable placeholder="请选择角色">
            <Option v-for="item in roleInfoList" :value="item.id" :key="item.id">{{ item.description }}</Option>
          </Select>
        </Col>
    </Row>
    <br/>
    <Row>
        <Col span="2">分站:</Col>
        <Col span="10">
          <Row :gutter="16">
            <Col span="12">
              <Select v-model="provinceId" filterable clearable @on-change="getCityListByProvince()" placeholder="请选择省份">
                <Option v-for="item in provinceList" :value="item.id" :key="item.id">{{ item.value }}</Option>
              </Select>
            </Col>
            <Col span="12">
              <Select v-model="cityId" filterable clearable @on-change="$emit('getCurrentCity', cityId)" placeholder="请选择城市">
                <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.value }}</Option>
              </Select>
            </Col>
          </Row>
        </Col>
    </Row>
    <br/>
    <Row>
        <Col span="2">权限:</Col>
        <Col span="10">
          <CheckboxGroup v-model="permissionId">
            <Checkbox v-for="permissionInfo in permissionInfoList" :label="permissionInfo.id" :key="permissionInfo.id" style="margin-right:20px">{{permissionInfo.name}}</Checkbox>
          </CheckboxGroup>
        </Col>
    </Row>
    <br/>
    <Button type='primary' @click="handleSubmit()">保存</Button>
    </section>
  </div>
</template>
<script>
import RegionSelect from '../../components/RegionSelect.vue'
export default {
  components: {
    RegionSelect
  },
  data () {
    return {
      password: '',
      userName: '',
      phoneNo: '',
      fkUserRole: '',
      provinceId: '',
      provinceList: [],
      cityList: [],
      cityId: '',
      permissionInfoList: [],
      permissionId: [],
      roleInfoList: [],
      id: null
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
        console.log(res.data)
        // this.loading = false
        if (res.data.code === 666) {
          this.userName = res.data.data.userName
          this.password = res.data.data.password
          this.phoneNo = res.data.data.phoneNo
          this.fkUserRole = res.data.data.fkUserRole
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
    handleSubmit () {
      this.$axios({
        url: '/admin/saveAdminUser',
        method: 'post',
        data: {
          userName: this.userName,
          password: this.password,
          phoneNo: this.phoneNo,
          fkUserRole: this.fkUserRole,
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
  }
}
</script>
