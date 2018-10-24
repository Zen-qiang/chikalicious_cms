<template>
  <div>
    <product-manage v-bind:productCategoryType="type"></product-manage>
  </div>
</template>

<script>
import ProductManage from '../cake/productManage.vue'
export default {
  name: 'cakeManage',
  components: {
    ProductManage
  },
  data () {
    return {
      type: 'CAKE'
    }
  }
}
</script>
