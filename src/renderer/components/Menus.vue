<template>
<div class="menus">
    <div class="menuUl">
        <ul>
            <li class="titleLi">
                <span>推荐</span>
            </li>
            <li data-v-name="findMusic/index" @click="toPage">
                <i class="iconfont icon-yinle"></i>
                <span>发现音乐</span>
            </li>
            <li>
                <i class="iconfont icon-tubiaozhizuomobanyihuifu-"></i>
                <span>私人FM</span>
            </li>
            <li>
                <i class="iconfont icon-desktop"></i>
                <span>MV</span>
            </li>
            <li>
                <i class="iconfont icon-user"></i>
                <span>朋友</span>
            </li>
        </ul>
        <ul>
            <li class="titleLi">
                <span>我的音乐</span>
            </li>
            <li>
                <i class="iconfont icon-yinle"></i>
                <span>iTunes音乐</span>
            </li>
            <li>
                <i class="iconfont icon-tubiaozhizuomobanyihuifu-"></i>
                <span>下载的音乐</span>
            </li>
            <li>
                <i class="iconfont icon-desktop"></i>
                <span>我的歌手</span>
            </li>
            <li>
                <i class="iconfont icon-user"></i>
                <span>我的电台</span>
            </li>
        </ul>
        <ul>
            <li class="titleLi">
                <span>创建的歌单</span>
            </li>
            <li>
                <i class="iconfont icon-yinle"></i>
                <span>我喜欢的音乐</span>
            </li>
        </ul>
        <ul>
            <li class="titleLi">
                <span>收藏的歌单</span>
            </li>
            <li>
                <i class="iconfont icon-yinle"></i>
                <span>收藏的歌单1</span>
            </li>
            <li>
                <i class="iconfont icon-yinle"></i>
                <span>收藏的歌单2</span>
            </li>
            <li>
                <i class="iconfont icon-yinle"></i>
                <span>收藏的歌单3</span>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
export default {
    name: 'menus',
    methods: {
        toPage(e){
            console.log('/page/'+e.target.dataset.vName)
            this.$router.push('/page/'+e.target.dataset.vName);
        }
    }
}
</script>
<style lang="scss" scoped>
.menus{
     width: 200px;
    overflow: auto;
    border-right: 1px solid gray;
    height: 100%;
    .menuUl{
        display: flex;
        flex-direction: column;
    }
}
ul {
    list-style: none;
    line-height: 30px;
    margin: 0;
    padding-left: 20px;
    font-size: 14px;
    .titleLi {
            margin-left: -25px;
            font-size: 12px;
            color: darkgray;
    }
    li {
        span {
            margin-left: 10px;
        }
    }
}
</style>
