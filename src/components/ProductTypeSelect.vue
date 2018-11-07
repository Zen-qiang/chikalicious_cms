<template>
  <div>
      <Select v-model="fkCategoryId" filterable clearable @on-change="$emit('getProductType',fkCategoryId)" placeholder="请选择分类">
          <Option v-for="item in porductTypeList" :value="item.id" :key="item.id">{{ item.value }}</Option>
      </Select>
  </div>
</template>
<script>
export default {
  name: 'ProductTypeSelect',
  data () {
    return {
      fkCategoryId: null,
      porductTypeList: []
    }
  },
  created () {
    this.getPorductTypeList()
  },
  props: {
    provinceId: {
      type: String,
      required: false
    },
    cityId: {
      type: String,
      required: false
    },
    productType: {
      type: String,
      required: false
    }
  },
  methods: {
    getPorductTypeList () {
      this.$axios.get('/product/queryProductCategoryByType', {
        params: {
          type: this.productType
          // provinceId: 34,
          // cityId: this.cityId
        }
      }).then(res => {
        if (res.data.code === 666) {
          this.porductTypeList = res.data.data
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
