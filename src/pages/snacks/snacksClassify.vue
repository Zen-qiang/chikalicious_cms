<template>
  <div>
    <cake-classify v-bind:productType="type"></cake-classify>
  </div>
</template>

<script>
import CakeClassify from '../cake/classify.vue'
export default {
  name: '',
  components: {
    CakeClassify
  },
  data () {
    return {
      type: 'SNACK'
    }
  }
}
</script>
