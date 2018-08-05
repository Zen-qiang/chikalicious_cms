<template>
  <div id="dl_website">
    website.vue
    <span @click="$router.push({name: 'News'})">go to news</span>
    <span @click="$router.push({name: 'Product'})">go to product</span>
    <router-view></router-view>
  </div>
</template>
