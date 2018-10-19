<template>
  <div class="popBox" :class="{active: showPopbox}" v-click-outside="handerOutClick">
    <slot></slot>
  </div>
</template>
<script>
import clickOutside from '../directives/myclickoutside'
export default {
  name: 'popBox',
  props: {
    showPopbox: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  directives: {
    clickOutside
  },
  methods: {
    handerOutClick () {
      this.$emit('update:showPopbox', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.popBox {
  position: absolute;
  top: 100%;
  right: -30px;
  width: auto;
  background: #fff;
  padding: 4px;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0,0,0,.2);
  filter: drop-shadow(0 1px 6px rgba(0,0,0,.2));
  white-space: nowrap;
  margin-top: 2px;
  visibility: hidden;
  transform: translateY(6px);
  opacity: .6;
  &.active {
    visibility: visible;
    transform: translateY(0);
    opacity: 1;
    transition: all .3s;
  }
  &::after {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 7px 7px;
    border-color: #fff;
    border-right-color: transparent;
    border-left-color: transparent;
    position: absolute;
    top: -7px;
    left: 50%;
    margin-left: -7px;
  }
}
</style>
