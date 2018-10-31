<template>
  <div class="cakeNews">
    <section class="cakeNews-container">
      <CheckboxGroup v-model="checkIds">
        <div class="fx"  style="min-height:40px;border:1px solid #cceff5;background:#eef3f7">
          <div style="width:15%;margin-left:20px;text-align:center;">
            <h2>省</h2>
          </div>
          <div style="width:85%;margin-left:10px;border-left:1px solid #cceff5;text-align:center;">
            <h2>市</h2>
          </div>
        </div>
        <div v-for="regionInfo in regionDataInfoList" :key="regionInfo.provinceId" class="fx"  style="min-height:40px;border:1px solid #cceff5;background:#fafcfd">
          <div style="width:15%;margin-left:20px;">
            <Checkbox  :label="regionInfo.provinceId"  style="margin-right:20px">{{regionInfo.provinceValue}}</Checkbox>
          </div>
          <div style="width:85%;margin-left:10px;border-left:1px solid #cceff5;">
            <Checkbox  v-for="regionCityInfo in regionInfo.citys" :label="regionCityInfo.ctiyId" :key="regionCityInfo.ctiyId"  style="margin:15px">{{regionCityInfo.ctiyValue}}</Checkbox>
          </div>
        </div>
    </CheckboxGroup>
    <Button type='primary' @click="regionSubmit()">保存</Button>
    </section>
  </div>
</template>
<script>
export default {
  name: 'shopRegionManage',
  components: {
  },
  data () {
    return {
      regionDataInfoList: [],
      checkIds: [34]
    }
  },
  created () {
    this.regionDataInfo()
  },
  methods: {
    regionDataInfo () {
      this.$axios.get('/shop/queryRegion', {
      }).then(res => {
        if (res.data.code === 666) {
          this.regionDataInfoList = res.data.data
          let defaultChecked = this.regionDataInfoList.filter(item => {
            return item.provinceIsCheck
          })
          defaultChecked.forEach(item => {
            let defaultCtiyChecked = item.citys.filter(cityItem => {
              return cityItem.ctiyIsCheck
            })
            defaultCtiyChecked.forEach(cityCheckItem => {
              this.checkIds.push(cityCheckItem.ctiyId)
            })
            this.checkIds.push(item.provinceId)
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    regionSubmit () {
      this.$axios({
        url: '/shop/updateRegionCheck',
        method: 'post',
        data: {
          checkIds: JSON.stringify(this.checkIds)
        }
      }).then(result => {
        let code = result.data.code
        if (code === 666) {
          this.$Message.success('保存成功')
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
<style lang="scss" scoped>
.cakeNews {
  &-searchContent {
    p {
      margin-right: 20px;
    }
  }
  &-container {
    > div {
      padding-bottom: 20px;
    }
    &-page {
      text-align: center;
    }
  }
}
</style>
