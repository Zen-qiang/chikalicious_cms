<template>
  <div class="headSearch">
    <div class="fx">
      <div class="headSearch-content">
        <slot></slot>
      </div>
      <div class="headSearch-btn">
        <Button type="primary" @click.native="$emit('hander-search')">搜索</Button>
      </div>
    </div>
    <Divider></Divider>
  </div>
</template>

<style lang="scss" scoped>
.headSearch {
  height: 80px;
  &-btn {
    padding: 0 40px;
  }
}
</style>
