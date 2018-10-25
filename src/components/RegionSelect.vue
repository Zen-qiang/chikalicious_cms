<template>
  <div>
    <Row :gutter="16">
      <Col span="12">
        <Select v-model="provinceId" filterable clearable @on-change="getCityListByProvince()" placeholder="请选择省份" :disabled="provinceDisable">
          <Option v-for="item in provinceList" :value="item.id" :key="item.id">{{ item.value }}</Option>
        </Select>
      </Col>
      <Col span="12">
        <Select v-model="cityId" filterable clearable @on-change="$emit('getCurrentCity', cityId)" placeholder="请选择城市" :disabled="cityDisable">
          <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.value }}</Option>
        </Select>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  name: 'RegionSelect',
  props: ['type'],
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
      this.$emit('getCurrentProvince', this.provinceId)
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
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
