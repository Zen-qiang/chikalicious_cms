<template>
  <div>
    <Row :gutter="16">
      <Col span="12">
        <Select v-model="provinceId" filterable clearable @on-change="getCityListByProvince()" placeholder="请选择省份" :disabled="provinceDisable" :transfer="true">
          <Option v-for="item in provinceList" :value="item.id" :key="item.id">{{ item.value }}</Option>
        </Select>
      </Col>
      <Col span="12">
        <Select v-model="cityId" filterable clearable @on-change="returnCurrentCity(cityId, index)" placeholder="请选择城市" :disabled="cityDisable" :transfer="true">
          <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.value }}</Option>
        </Select>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  name: 'RegionSelect',
  // props: ['type', 'index'],
  props: {
    type: {
      type: String
    },
    index: {
      type: Number
    },
    pid: {
      type: Number,
      default: -1
    },
    cid: {
      type: Number,
      default: -1
    }
  },
  watch: {
    provinceId: function (n, o) {
      this.getCityListByProvince()
    },
    cityId: function (n, o) {
      this.returnCurrentCity(n, this.index)
    }
  },
  data () {
    return {
      provinceId: -1,
      provinceList: [],
      cityId: -1,
      cityList: [],
      provinceDisable: this.type === 'SNACK' || false,
      cityDisable: this.type === 'SNACK' || false
    }
  },
  created () {
    this.getProvinceList()
  },
  methods: {
    getProvinceList () {
      this.$axios.get('/common/queryRegionByRole', {}).then(res => {
        if (res.data.code === 666) {
          this.provinceList = res.data.data
          if (this.provinceList && this.provinceList.length) {
            console.log('provinceList loaded, set value')
            this.provinceId = this.pid
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    returnCurrentCity (cityId, index) {
      this.$emit('getCurrentCity', cityId, index)
    },
    getCityListByProvince () {
      // this.cityId = null
      this.cityList = []
      this.$emit('getCurrentProvince', this.provinceId)
      this.$axios.get('/common/queryCityIdByProvinceId', {
        params: {
          provinceId: this.provinceId
        }
      }).then(res => {
        if (res.data.code === 666) {
          this.cityList = res.data.data
          if (this.cityList && this.cityList.length) {
            console.log('cityList loaded, set value')
            this.cityId = this.cid
          }
          // this.$emit('getCurrentCity', this.cityId, this.index)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    // this.provinceId = this.pid
  }
}
</script>
<style lang="scss" scoped>
</style>
