<template>
<div class="findMusic">
    <!-- <div class="routers" @click="toRoute">
        <a href="#" data-v-url="/page/findMusic/index/recommend">推荐</a>
        <a href="#" data-v-url="/page/findMusic/index/rank">排行榜</a>
        <a href="#" data-v-url="/page/findMusic/index/musics">歌单</a>
        <a href="#">主播音乐</a>
        <a href="#" data-v-url="/page/findMusic/index/newest">最新音乐</a>
    </div> -->
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
                console.log(e.target.dataset.vUrl)
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
    overflow: auto;
}
.findMusic{
    display: flex;
    flex-direction: column;
}
.routers {
    height: 45px;
    line-height: 45px;
    text-align: center;
    border-bottom: 1px solid darkgrey;
    a {
        text-decoration: none;
        color: black;
        font-size: 14px;
        margin: 0 30px;
        font-weight: bold;
    }
    a:hover {
        color: red;
    }
}
</style>

