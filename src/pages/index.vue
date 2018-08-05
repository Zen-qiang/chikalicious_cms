<template>
  <div id="dl_index">
    <header>header</header>
    <main>main
      <span @click="$router.push({name: 'Website'})">go to website</span>
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
export default {
  name: 'Index'
}
</script>
<style lang="less" scoped>
</style>
