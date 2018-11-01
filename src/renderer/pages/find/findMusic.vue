<template>
<div class="findMusic">
    <div class="routers" @click="toRoute">
        <a href="#" data-v-url="/page/findMusic/index/recommend">推荐</a>
        <a href="#">排行榜</a>
        <a href="#">歌单</a>
        <a href="#">主播音乐</a>
        <a href="#">最新音乐</a>
    </div>
    <div class="showPages">
        <router-view></router-view>
    </div>
</div>
</template>
<script>
    export default {
        name: 'findMusic',
        data(){
            return {}
        },
        methods:{
            toRoute(e){
                this.$router.push(e.target.dataset.vUrl)
            }
        }
    }
</script>
<style lang="scss" scoped>
.findMusic, .routers{
    width: 100%;
}
.showPages{
    height: 100%;
    padding: 0 10px;
    overflow: auto;
}
.findMusic{
    display: flex;
    flex-direction: column;
}
.routers {
    display: flex;
    justify-content: space-around;
    // padding: 0 80px;
    height: 45px;
    align-items: center;
    border-bottom: 1px solid darkgrey;
    a {
        text-decoration: none;
        color: black;
    }
    a:visited {
        color: red;
    }
}
</style>

