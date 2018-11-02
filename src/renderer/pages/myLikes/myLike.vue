<template>
    <div
        v-loading='loading'
        element-loading-text='加载中'
        element-loading-spinner='el-icon-loading'
        element-loading-background='white'
    >
    <div></div>
</div>
</template>
<script>
export default {
    name:'',
    data(){
        return {
            loading: true
            }
        }
    }
</script>
<style lang='scss' scoped>
    
</style>