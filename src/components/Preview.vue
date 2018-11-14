<template>
  <div class="preview" v-if="showPreview">
    <div class="preview-container" v-click-outside="handerOutClick" style="text-align: center">
      <br/><br/><br/>
      <sapn v-html="title" style="font-size:30px;"/>
      <div class="preview-imgs">
        <p v-for="(item, index) of imgs" :key="index"><img width="350" height="200" :src="item" style="margin-top:30px;margin-bottom:15px;"><br/></p>
      </div>
      <div class="preview-content" v-html="content" style="margin-top:30px;margin-bottom:30px;">
      </div>
    </div>
  </div>
</template>
<script>
import clickOutside from '../directives/myclickoutside'
export default {
  name: 'preview',
  props: {
    showPreview: {
      type: Boolean,
      default: false,
      required: true
    },
    imgs: {
      type: Array
    },
    content: {
      type: String
    },
    title: {
      type: String
    }
  },
  directives: {
    clickOutside
  },
  methods: {
    handerOutClick () {
      this.$emit('update:showPreview', false)
    }
  }
}
</script>
<style lang="scss">
.preview {
  position: fixed;
  background: rgba($color: #000000, $alpha: .6);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  &-container {
    width: 800px;
    margin: 20px auto;
    border-radius: 4px;
    background: #fff;
  }
  &-imgs {
    text-align: center;
    img {
      vertical-align: middle;
    }
  }
  &-content {
    text-align: center;
  }
}
</style>
