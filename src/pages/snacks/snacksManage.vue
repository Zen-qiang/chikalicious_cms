<template>
  <div>
    <product-manage v-bind:productCategoryType="type"></product-manage>
  </div>
</template>

<script>
import ProductManage from '../cake/productManage.vue'
export default {
  name: 'snacksManage',
  components: {
    ProductManage
  },
  data () {
    return {
      type: 'SNACK'
    }
  }
}
</script>
