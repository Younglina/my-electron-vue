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

<style>
  /* CSS */
  html, body, #app{
    height: 100%;
    margin: 0;
    overflow: hidden;
  }
  body{
    -webkit-app-region: drag;
    font-family: 'Source Sans Pro', sans-serif;
  }
</style>
