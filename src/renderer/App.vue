<template>
  <div id="app" oncontextmenu="return false" onselectstart="return false" oncopy="return false">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'elc-vue'
  }
</script>

<style lang='scss'>
@import './assets/_comstyle.scss';
  /* CSS */
  html, body, #app{
    height: 100%;
    margin: 0;
    overflow: hidden;
  }
  body{
    font-family: 'Source Sans Pro', sans-serif;
  }

body{
  // color: $brand-primary;
}
</style>
